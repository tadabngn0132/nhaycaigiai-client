# Client Architecture

## 1. Tổng quan

Client là ứng dụng React + TypeScript được build bằng Vite. Redux Toolkit và
React Redux quản lý state dùng xuyên component/route. Mã nguồn được tổ chức
theo hướng **feature-based**: phần dùng chung đặt trong `shared`, logic và UI
theo nghiệp vụ đặt trong `features`, còn `pages` chỉ ghép các feature thành màn
hình hoàn chỉnh.

Các nguyên tắc chính:

- `pages` điều phối màn hình và routing, không chứa logic nghiệp vụ chi tiết.
- `features/<feature>` sở hữu API, model, dữ liệu, utility và component của
  nghiệp vụ đó.
- `shared` chỉ chứa hạ tầng có thể dùng bởi nhiều feature.
- Component nhỏ nhận dữ liệu qua props, hạn chế tự gọi API hoặc đọc storage.
- Kiểu dữ liệu request/response được đặt gần feature sở hữu dữ liệu đó.
- Redux chỉ giữ state cần chia sẻ hoặc tồn tại xuyên route; field state của form
  và trạng thái UI cục bộ không mặc định đưa vào global store.

## 2. Luồng hoạt động chính

```text
main.tsx
  └─ Redux Provider
      └─ App.tsx (router)
      ├─ HomePage / ProgramDetailPage
      │   └─ chọn chương trình
      ├─ RegistrationPage / RegistrationModal
      │   └─ RegistrationForm
      │       └─ dispatch submitRegistration thunk
      │           └─ registrationApi.createRegistration()
      │               └─ httpClient POST /api/registrations
      │                   └─ response cập nhật registration slice
      │                       └─ store subscription persist localStorage
      ├─ /payment → redirect /confirmation (tương thích URL cũ)
      └─ ConfirmationPage
          └─ select state.registration.current và hiển thị kết quả
```

Trong môi trường development, request `/api/*` được Vite proxy tới
`http://localhost:3000`. Khi deploy API ở domain khác, cấu hình
`VITE_API_URL`.

## 3. Trạng thái tích hợp dữ liệu

Phạm vi MVP hiện tại là **registration-only, chưa tích hợp SePay**. Sau khi API
tạo registration thành công, client chuyển thẳng đến confirmation. Code UI
payment được giữ lại để phát triển sau nhưng không nằm trong active flow.

| Chức năng | Nguồn dữ liệu hiện tại | Trạng thái |
| --- | --- | --- |
| Gửi form đăng ký | `POST /api/registrations` qua Axios | API thật |
| Validate và lưu đăng ký | Server, Prisma và PostgreSQL | API thật |
| Mã đăng ký, số tiền, nội dung chuyển khoản | Registration response từ server | API thật |
| Thông tin tài khoản ngân hàng | Cấu hình server trả trong response | API thật/cấu hình |
| Email xác nhận | SMTP phía server | Thật khi server đã cấu hình SMTP |
| Danh sách giải đấu/workshop/merch | `features/home/homeData.ts` | Dữ liệu tĩnh phía client |
| Danh sách nhân sự/ban tổ chức | `features/home/homeData.ts` | Dữ liệu tĩnh phía client |
| Route `/payment` | Redirect tới `/confirmation` | Tạm bỏ qua trong MVP |
| Payment components | Vẫn còn trong `features/payment` | Dormant, không được route render |
| QR thanh toán | `PaymentQr.tsx` tạo pattern trình bày | Mock/dormant, không phải QR ngân hàng |
| SePay/xác minh thanh toán | Chưa gọi từ client | Ngoài phạm vi MVP |
| Giữ registration khi reload | Redux đồng bộ với localStorage | Cache client, không phải database |

### Giới hạn hiện tại

- Reload trình duyệt vẫn giữ registration gần nhất nhờ localStorage, nhưng dữ
  liệu chính thức nằm trong PostgreSQL phía server.
- Client chưa gọi SePay, payment gateway hoặc webhook ngân hàng.
- Trang confirmation chỉ xác nhận hồ sơ đăng ký đã được server ghi nhận, không
  xác nhận giao dịch thanh toán.
- Nếu SMTP chưa được cấu hình trên server, registration vẫn có thể được tạo
  nhưng email thực tế không được gửi.
- Khi chuyển danh sách chương trình sang API, cần thay `homeData.ts` bằng module
  API/query tương ứng và bổ sung trạng thái loading/error.

## 4. Folder structure

```text
client/
├─ public/                         Static assets
│  ├─ head/                       Ảnh trưởng các ban
│  ├─ leader/                     Ảnh leader
│  ├─ organizing-committee/       Ảnh ban tổ chức
│  └─ *.png, *.jpg, favicon.svg   Ảnh/banner dùng trực tiếp qua URL
├─ src/
│  ├─ app/                         Redux store và typed hooks
│  ├─ features/
│  │  ├─ home/
│  │  │  ├─ components/           UI trang chủ và danh sách chương trình
│  │  │  ├─ model/                Type thuộc feature home
│  │  │  └─ homeData.ts           Dữ liệu chương trình và nhân sự
│  │  ├─ payment/
│  │  │  └─ components/           Các khối UI của màn hình thanh toán
│  │  └─ registration/
│  │     ├─ api/                  Hàm giao tiếp registration API
│  │     ├─ components/           Form và các section đăng ký
│  │     ├─ config/               Option/dữ liệu cấu hình form
│  │     ├─ model/                Schema và response types
│  │     ├─ storage/              Truy cập localStorage
│  │     ├─ store/                Redux slice và async thunk
│  │     ├─ utils/                Hàm tính toán/format vé
│  │     ├─ formStyles.ts         Style helper của form
│  │     └─ registrationOptions.ts Barrel export tương thích
│  ├─ pages/                      Route-level components
│  ├─ shared/
│  │  └─ api/                     Hạ tầng HTTP dùng chung
│  ├─ App.tsx                     Router và global providers
│  ├─ index.css                   Global styles/Tailwind
│  └─ main.tsx                    Browser entry point
├─ .env.example                   Mẫu biến môi trường
├─ eslint.config.js               Quy tắc ESLint
├─ index.html                     HTML entry của Vite
├─ package.json                   Dependencies và npm scripts
├─ tsconfig*.json                 Cấu hình TypeScript
└─ vite.config.ts                 React, Tailwind và dev proxy
```

## 5. Trách nhiệm chi tiết

### `src/`

#### `main.tsx`

Điểm khởi chạy của ứng dụng. Mount React vào DOM, bật `StrictMode`, bọc ứng dụng
bằng Redux `Provider` và import global stylesheet.

### `src/app/`

Chứa cấu hình state management cấp ứng dụng.

#### `store.ts`

- Tạo Redux store bằng `configureStore`.
- Đăng ký `registrationReducer` dưới key `registration`.
- Export `RootState` và `AppDispatch` được suy ra trực tiếp từ store.
- Theo dõi thay đổi của registration hiện tại và persist vào localStorage.

Reducer của feature mới được đăng ký tại đây.

#### `hooks.ts`

Export `useAppDispatch` và `useAppSelector` đã gắn type. Component nên dùng hai
hook này thay vì gọi `useDispatch`/`useSelector` trực tiếp để giữ type inference
nhất quán.

#### `App.tsx`

Khai báo `BrowserRouter`, ánh xạ URL sang các page và cấu hình `Toaster` dùng
toàn ứng dụng.

Các route hiện tại:

| URL | Page | Vai trò |
| --- | --- | --- |
| `/` | `HomePage` | Trang chủ và danh sách chương trình |
| `/program/:slug` | `ProgramDetailPage` | Chi tiết một chương trình |
| `/registration` | `RegistrationPage` | Chọn chương trình để đăng ký |
| `/payment` | Redirect | URL tương thích; chuyển tới `/confirmation` |
| `/confirmation` | `ConfirmationPage` | Xác nhận đăng ký |

#### `index.css`

Chứa style toàn cục, font, Tailwind import và các rule dùng chung. Không đặt
style chỉ dành riêng cho một component vào đây nếu có thể biểu diễn ngay trong
component.

### `src/shared/api/`

Hạ tầng HTTP không phụ thuộc một nghiệp vụ cụ thể.

#### `httpClient.ts`

Khởi tạo Axios instance dùng chung:

- Base URL lấy từ `VITE_API_URL`, mặc định là `/api`.
- Header JSON mặc định.
- Timeout request 15 giây.

Nếu cần interceptor cho token, logging hoặc refresh session, thêm tại đây.

#### `getApiErrorMessage.ts`

Chuyển lỗi Axios/HTTP thành message thân thiện cho UI. Hỗ trợ lỗi validation từ
`details`, message do server trả về, timeout và lỗi mất kết nối.

### `src/features/home/`

Sở hữu dữ liệu và UI của trang chủ/chương trình.

#### `model/homeTypes.ts`

- `HomeProgramItem`: cấu trúc competition, workshop và merch.
- `PersonImage`: cấu trúc ảnh nhân sự.

#### `homeData.ts`

Nguồn dữ liệu tĩnh hiện tại cho:

- Danh sách competitions.
- Danh sách monthly workshops.
- Danh sách merch.
- Danh sách chương trình được phép đăng ký.
- Danh sách nhân sự/ban tổ chức.
- Hàm `getProgramBySlug` để tìm chương trình từ route param.

Khi dữ liệu chương trình được chuyển sang API, thay phần truy xuất dữ liệu tại
feature này; component trình bày không nên phải đổi cấu trúc lớn.

#### `components/`

| File | Trách nhiệm |
| --- | --- |
| `HomeHeader.tsx` | Header trang chủ và action mở đăng ký |
| `HeroBanner.tsx` | Hero/banner chính |
| `EventIntro.tsx` | Phần giới thiệu sự kiện |
| `HomeProgramSection.tsx` | Render một section danh sách program/merch |
| `ProgramChooserModal.tsx` | Modal chọn chương trình trước khi đăng ký |
| `RegisterCta.tsx` | Call-to-action mở luồng đăng ký |
| `SectionHeading.tsx` | Heading dùng lại giữa các section |
| `PeopleGrid.tsx` | Grid ảnh nhân sự |
| `PeopleSection.tsx` | Section có heading và `PeopleGrid` |
| `StructureSection.tsx` | Sơ đồ/cấu trúc ban tổ chức |
| `HomeFooter.tsx` | Footer trang chủ |

### `src/features/registration/`

Sở hữu toàn bộ nghiệp vụ tạo đăng ký.

#### `api/registrationApi.ts`

Các request liên quan registration:

- `createRegistration(data)`: gửi `POST /registrations`, sau đó lưu response
  hiện tại để trang payment sử dụng.
- `getRegistration(code)`: lấy đăng ký qua `GET /registrations/:code`.

File này dùng `httpClient` và không chứa cấu hình Axios riêng.

#### `model/registrationSchema.ts`

Zod schema dùng validate form phía client. Đồng thời suy ra:

- `RegistrationData`: payload gửi server.
- `TicketType`: union type của loại vé.

Validation nghiệp vụ mới của form nên được thêm ở đây và đồng bộ với schema
phía server.

#### `model/registrationTypes.ts`

Định nghĩa dữ liệu server trả về:

- `BankInfo`.
- `RegistrationResponse`.

Không đặt type chỉ phục vụ component UI vào file này.

#### `storage/registrationStorage.ts`

Đóng gói việc hydrate/persist đăng ký hiện tại bằng `localStorage`. Store đọc
giá trị này khi khởi tạo và persist lại khi `state.registration.current` đổi.
Page và component không truy cập storage trực tiếp.

Storage này chỉ giúp giữ trạng thái giữa các route, không thay thế database của
server.

#### `store/registrationSlice.ts`

Redux state của registration:

| Field | Ý nghĩa |
| --- | --- |
| `current` | Registration response hiện tại hoặc `null` |
| `status` | `idle`, `submitting`, `succeeded` hoặc `failed` |
| `error` | Message lỗi submit gần nhất |

File cung cấp:

- `submitRegistration`: async thunk gọi registration API.
- `clearRegistration`: xóa registration hiện tại và reset trạng thái.
- `clearRegistrationError`: chỉ xóa lỗi hiện tại.
- Reducer xử lý lifecycle pending/fulfilled/rejected của thunk.

#### `config/registrationOptions.ts`

Dữ liệu cấu hình tĩnh của form:

- Các loại vé.
- Thành phố.
- Bảng thi.
- Thể loại nhảy.
- Mức kinh nghiệm.

Chỉ đặt dữ liệu khai báo tại đây; logic tính toán đặt trong `utils`.

#### `utils/ticketUtils.ts`

Các hàm thuần liên quan vé:

- `getTicketPrice`.
- `getTicketTotal`.
- `formatCurrency`.
- `getTicketSummary`.

Các hàm này không truy cập React state, API hoặc localStorage.

#### `registrationOptions.ts`

Barrel file re-export config và ticket utilities. File này giữ các import hiện
tại hoạt động sau refactor. Code mới có thể import trực tiếp từ `config` hoặc
`utils` khi muốn thể hiện dependency rõ hơn.

#### `formStyles.ts`

Helper tạo class cho form field theo trạng thái hợp lệ/lỗi.

#### `components/`

| File | Trách nhiệm |
| --- | --- |
| `RegistrationForm.tsx` | Khởi tạo React Hook Form, dispatch submit thunk và điều phối các section |
| `RegistrationModal.tsx` | Dialog chứa form đăng ký |
| `PersonalInfoSection.tsx` | Các field thông tin cá nhân |
| `CompetitionSection.tsx` | Field chỉ dành cho người thi đấu |
| `TicketSelector.tsx` | Chọn loại vé |
| `FormField.tsx` | Wrapper label, hint và validation error dùng lại |
| `RegistrationSuccess.tsx` | UI thông báo đăng ký thành công có thể tái sử dụng |

### `src/features/payment/components/`

Chứa UI payment thử nghiệm để dùng ở giai đoạn tích hợp SePay sau. Feature này
hiện dormant: không được render bởi router và không tham gia luồng MVP.

| File | Trách nhiệm |
| --- | --- |
| `PaymentShell.tsx` | Layout nền và header của luồng payment |
| `EmptyRegistration.tsx` | Empty state khi không có registration trong storage |
| `PaymentDetails.tsx` | Khối thông tin ngân hàng, số tiền và QR |
| `PaymentLine.tsx` | Một dòng label/value trong thông tin chuyển khoản |
| `PaymentQr.tsx` | QR demo hiện tại; đây chưa phải QR ngân hàng thực |
| `RegistrationSummary.tsx` | Tóm tắt đơn và action chuyển sang confirmation |

### `src/pages/`

Page tương ứng với route. Page được phép đọc route params, điều hướng và ghép
feature components, nhưng nên tránh chứa chi tiết UI lớn hoặc request logic.

| File | Trách nhiệm |
| --- | --- |
| `HomePage.tsx` | Ghép các section trang chủ và điều phối program chooser |
| `ProgramDetailPage.tsx` | Đọc `slug`, tìm program và hiển thị chi tiết/registration modal |
| `RegistrationPage.tsx` | Màn hình chọn chương trình để đăng ký |
| `PaymentPage.tsx` | Page payment được giữ trong source nhưng hiện không được router render |
| `ConfirmationPage.tsx` | Select Redux state và hiển thị kết quả xác nhận cuối luồng |

### `public/`

Chứa asset được Vite phục vụ nguyên trạng từ root URL. Ví dụ
`public/hero-banner.png` được sử dụng bằng `/hero-banner.png`.

- `head/`: ảnh trưởng các ban, chia tiếp theo từng ban.
- `leader/`: ảnh leader.
- `organizing-committee/`: ảnh trưởng/phó ban tổ chức.
- Các file ảnh ở root: banner, favicon, ảnh placeholder và sơ đồ tổ chức.

Không import asset trong `public` bằng đường dẫn filesystem từ TypeScript.

## 6. File cấu hình ở root

| File | Trách nhiệm |
| --- | --- |
| `.env.example` | Ví dụ cấu hình `VITE_API_URL` |
| `.gitignore` | Loại node_modules, dist, log và file local khỏi Git |
| `eslint.config.js` | Cấu hình lint TypeScript/React |
| `index.html` | HTML entry chứa DOM root cho React |
| `package.json` | Dependencies và scripts `dev`, `build`, `lint`, `preview` |
| `package-lock.json` | Khóa phiên bản dependency; không chỉnh tay |
| `tsconfig.json` | TypeScript project references |
| `tsconfig.app.json` | Cấu hình TypeScript cho source React/browser |
| `tsconfig.node.json` | Cấu hình TypeScript cho Vite config/Node context |
| `vite.config.ts` | Plugin React, Tailwind và proxy `/api` trong development |
| `README.md` | Hướng dẫn cài đặt, chạy local và cấu hình API |

`node_modules/` và `dist/` là output sinh tự động, không phải source và không
được commit.

## 7. Quy ước mở rộng

Khi thêm chức năng mới:

1. Tạo `features/<feature-name>` nếu đó là một nghiệp vụ độc lập.
2. Đặt API call trong `features/<feature>/api`.
3. Đặt schema/type nghiệp vụ trong `features/<feature>/model`.
4. Đặt component chỉ thuộc feature trong `features/<feature>/components`.
5. Chỉ chuyển component/util sang `shared` khi ít nhất nhiều feature thực sự
   cần dùng và nó không phụ thuộc nghiệp vụ cụ thể.
6. Giữ page nhỏ: đọc URL/state cấp route và ghép các component.
7. Không gọi Axios trực tiếp từ component nếu request có thể đóng gói trong API
   module của feature.
8. Không truy cập trực tiếp storage key ngoài module `storage`.
9. Dùng `useAppDispatch` và `useAppSelector` thay cho hook React Redux chưa gắn
   type.
10. Async workflow dùng chung nên đặt trong feature thunk; API module chỉ chịu
    trách nhiệm HTTP và không tự cập nhật Redux/localStorage.

## 8. Redux state management

### State hiện tại

```text
RootState
└─ registration
   ├─ current: RegistrationResponse | null
   ├─ status: idle | submitting | succeeded | failed
   └─ error: string | null
```

### Quy trình submit registration

```text
RegistrationForm
  └─ dispatch(submitRegistration(formData)).unwrap()
      ├─ pending  → status = submitting, error = null
      ├─ API OK   → current = response, status = succeeded
      └─ API lỗi  → status = failed, error = message
```

Sau khi `current` thay đổi, subscription trong `app/store.ts` đồng bộ dữ liệu
vào localStorage. Khi reload trang, initial state của slice được hydrate từ
storage.

### State không đưa vào Redux

- Giá trị và validation của form: React Hook Form quản lý hiệu quả hơn.
- Modal chỉ dùng trong một page: giữ bằng `useState` gần nơi sử dụng.
- Route param như program slug: React Router là nguồn dữ liệu chính.

Chỉ chuyển các state trên vào Redux nếu phát sinh nhu cầu chia sẻ thực tế giữa
nhiều nhánh component hoặc nhiều route.

### Hướng dependency mong muốn

```text
pages
  └─ features
      └─ shared
```

`shared` không import ngược từ `features`; feature này cũng nên hạn chế import
file nội bộ của feature khác, ngoại trừ type hoặc public API được chủ động chia
sẻ.
