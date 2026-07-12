# Client Manual Test

## 1. Phạm vi

Checklist này kiểm tra MVP registration-only trên trình duyệt:

- Chọn competition hoặc workshop.
- Validate form phía client.
- Gửi registration tới server thật.
- Redux nhận và persist registration.
- Chuyển thẳng tới confirmation, không qua payment/SePay.
- Reload confirmation vẫn giữ registration gần nhất.

Payment UI không nằm trong tiêu chí pass của MVP. Route `/payment` phải redirect
tới `/confirmation`.

## 2. Điều kiện trước khi test

1. PostgreSQL hoạt động và server đã cấu hình `DATABASE_URL`.
2. Chạy migration server.
3. Chạy server tại `http://localhost:3000`.
4. Chạy client tại URL Vite hiển thị, mặc định `http://localhost:5173`.
5. Vite proxy `/api` tới server hoặc `VITE_API_URL` trỏ đúng API.

Nên mở DevTools:

- Network: theo dõi `POST /api/registrations`.
- Application → Local Storage: theo dõi key `ncg30-current-registration`.
- Console: kiểm tra runtime error.

## 3. Bộ dữ liệu hợp lệ

### Competition competitor

| Field | Giá trị test |
| --- | --- |
| Chương trình | Morning Battle |
| Loại vé | Vé người đấu |
| Họ và tên | Nguyễn Minh Anh |
| Số điện thoại | 0912345678 |
| Email | minh.anh.competitor@example.com |
| Ngày sinh | 2000-05-20 |
| Instagram/Facebook | https://instagram.com/minhanh.dance |
| Tỉnh/thành phố | Hà Nội |
| Tên thi đấu | M.Anh |
| Crew/nhóm/studio | NCG Test Crew |
| Bảng thi | Solo |
| Thể loại nhảy | Hip-hop |
| Kinh nghiệm | 1–3 năm |
| Ghi chú | Manual test competitor registration |
| Đồng ý điều lệ | Có |

### Competition audience

| Field | Giá trị test |
| --- | --- |
| Chương trình | Evening Showcase |
| Loại vé | Vé người xem |
| Họ và tên | Trần Thu Hà |
| Số điện thoại | +84987654321 |
| Email | thu.ha.audience@example.com |
| Ngày sinh | 1998-11-15 |
| Instagram/Facebook | Để trống |
| Tỉnh/thành phố | TP. Hồ Chí Minh |
| Đồng ý điều lệ | Có |

Các field thi đấu không được yêu cầu khi chỉ chọn vé audience.

### Workshop

| Field | Giá trị test |
| --- | --- |
| Chương trình | Foundation Lab |
| Loại vé | Audience được chọn mặc định |
| Họ và tên | Lê Hoàng Nam |
| Số điện thoại | 0901123456 |
| Email | hoang.nam.workshop@example.com |
| Ngày sinh | 2002-01-10 |
| Instagram/Facebook | https://facebook.com/hoangnam.test |
| Tỉnh/thành phố | Đà Nẵng |
| Đồng ý điều lệ | Có |

## 4. Test cases chức năng

### C-01 — Competition registration thành công

1. Từ homepage, chọn Morning Battle.
2. Mở form đăng ký.
3. Nhập bộ dữ liệu competition competitor.
4. Submit.

Kết quả mong đợi:

- Nút submit chuyển sang trạng thái đang gửi và không submit lặp.
- Network có một `POST /api/registrations`, response HTTP 201.
- Toast hiển thị đăng ký thành công.
- URL chuyển thẳng tới `/confirmation`.
- Trang hiển thị đúng họ tên và registration code dạng `NCG30-...`.
- Không mở trang payment.
- Local Storage có `ncg30-current-registration`.

### C-02 — Workshop registration thành công

1. Chọn Foundation Lab.
2. Nhập bộ dữ liệu workshop.
3. Submit.

Kết quả mong đợi:

- Không hiển thị competition-only fields.
- Request thành công với `programType: workshop` và `ticketTypes: [audience]`.
- Chuyển tới confirmation.

### C-03 — Audience không cần competition fields

1. Mở form của một competition.
2. Chỉ chọn vé audience.
3. Điền bộ dữ liệu audience và submit.

Kết quả mong đợi:

- Tên thi đấu, crew, bảng thi, dance style và experience không còn bắt buộc.
- Registration được tạo thành công.

### C-04 — Hydrate Redux sau reload

1. Hoàn tất một registration.
2. Tại `/confirmation`, reload trình duyệt.

Kết quả mong đợi:

- Registration code và họ tên vẫn hiển thị.
- Không gọi lại POST registration.
- Redux hydrate dữ liệu từ localStorage.

### C-05 — URL payment cũ được bỏ qua

1. Truy cập trực tiếp `/payment`.

Kết quả mong đợi:

- Router redirect tới `/confirmation`.
- Không render QR hoặc thông tin chuyển khoản.

### C-06 — Confirmation khi chưa có registration

1. Xóa key `ncg30-current-registration` khỏi Local Storage.
2. Reload hoặc truy cập trực tiếp `/confirmation`.

Kết quả mong đợi:

- Hiển thị trạng thái “Chưa có đăng ký”.
- Có hướng dẫn quay lại chọn chương trình và hoàn thành form.
- Không crash vì dữ liệu `null`.

### C-07 — Server không hoạt động

1. Dừng server.
2. Điền form hợp lệ và submit.

Kết quả mong đợi:

- Không chuyển route.
- Toast báo không kết nối được server.
- Nút submit được bật lại.
- Redux registration status là `failed`.

## 5. Test cases validation

| ID | Dữ liệu không hợp lệ | Kết quả mong đợi |
| --- | --- | --- |
| V-01 | Họ tên `A` | Báo họ tên tối thiểu 2 ký tự |
| V-02 | Phone `12345` | Báo số điện thoại sai định dạng |
| V-03 | Phone `09123456789` | Báo số điện thoại sai định dạng |
| V-04 | Email `abc@` | Báo email sai định dạng |
| V-05 | Social link `instagram.com/test` | Báo URL không hợp lệ |
| V-06 | Không chọn thành phố | Báo field bắt buộc |
| V-07 | Không chọn ngày sinh | Báo field bắt buộc |
| V-08 | Không đồng ý điều lệ | Báo cần đồng ý điều lệ |
| V-09 | Competitor thiếu stage name | Báo tên thi đấu bắt buộc |
| V-10 | Competitor thiếu crew | Báo crew/nhóm/studio bắt buộc |
| V-11 | Competitor thiếu category | Báo bảng thi bắt buộc |
| V-12 | Competitor thiếu dance style | Báo thể loại nhảy bắt buộc |
| V-13 | Competitor thiếu experience | Báo kinh nghiệm bắt buộc |
| V-14 | Note dài hơn 500 ký tự | Báo ghi chú tối đa 500 ký tự |

Với validation client thất bại, không được phát sinh request POST.

## 6. Kiểm tra responsive cơ bản

Chạy các case chính ở ít nhất ba viewport:

- Mobile: 375 × 812.
- Tablet: 768 × 1024.
- Desktop: 1440 × 900.

Kiểm tra form/modal không tràn ngang, có thể scroll tới nút submit, validation
message không che input và confirmation code không vỡ layout.
