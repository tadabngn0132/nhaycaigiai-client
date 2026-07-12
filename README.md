# NCG 3.0 client

Tài liệu tổng quan cấu trúc và trách nhiệm mã nguồn: [ARCHITECTURE.md](./ARCHITECTURE.md).

Ứng dụng sử dụng Redux Toolkit + React Redux để quản lý registration state dùng
xuyên các route đăng ký, thanh toán và xác nhận.

> Hiện form đăng ký đã gọi API server và được lưu bằng Prisma/PostgreSQL. Danh
> sách chương trình/nhân sự vẫn là dữ liệu tĩnh; QR và bước xác minh thanh toán
> vẫn là mock. Xem bảng trạng thái chi tiết trong [ARCHITECTURE.md](./ARCHITECTURE.md#3-trạng-thái-tích-hợp-dữ-liệu).

## Chạy local

Chạy API server ở cổng `3000`, sau đó chạy client:

```bash
npm install
npm run dev
```

Trong môi trường phát triển, Vite tự chuyển tiếp các request `/api` tới
`http://localhost:3000`.

Khi API được deploy ở domain khác, tạo file `.env`:

```env
VITE_API_URL=https://api.example.com/api
```

Không cần khai báo `VITE_API_URL` nếu frontend và API dùng chung domain và API
được phục vụ dưới đường dẫn `/api`.
