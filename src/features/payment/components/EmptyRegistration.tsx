import { Link } from 'react-router-dom'

export function EmptyRegistration() {
  return (
    <div className="mx-auto max-w-xl rounded-xl bg-[#efede7] p-6 text-center text-[#181817]">
      <h1 className="text-2xl font-black uppercase">Chưa có đăng ký</h1>
      <p className="mt-3 text-sm text-[#716d67]">Vui lòng quay lại homepage và gửi form đăng ký trước.</p>
      <Link className="mt-5 inline-flex min-h-12 items-center justify-center rounded-sm border-b-3 border-[#c92c35] bg-[#111110] px-6 text-sm font-extrabold text-[#f4f1ea] uppercase no-underline" to="/">
        Về homepage
      </Link>
    </div>
  )
}
