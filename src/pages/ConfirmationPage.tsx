import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export default function ConfirmationPage() {
  const registration = useAppSelector((state) => state.registration.current)

  return (
    <main className="grid min-h-screen place-items-center bg-[#111110] px-3 py-8 font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:radial-gradient(circle_at_20%_18%,rgba(201,44,53,.16),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(41,163,156,.10),transparent_26%),linear-gradient(145deg,#1a1918,#111110_58%)]">
      <section className="w-full max-w-2xl rounded-xl bg-[#efede7] p-5 text-center text-[#181817] shadow-[0_28px_80px_rgba(0,0,0,.45)] sm:p-8">
        <div className="mx-auto mb-6 grid size-17 place-items-center rounded-full border-2 border-[#c92c35] bg-[#111110] text-[32px] text-[#f4f1ea]">
          ✓
        </div>
        <p className="mb-3 text-[11px] font-bold tracking-[2.4px] text-[#c92c35] uppercase">NCG 3.0</p>
        <h1 className="text-[28px] font-black uppercase sm:text-4xl">
          {registration ? 'Đăng ký thành công' : 'Chưa có đăng ký'}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-[#74716a]">
          {registration
            ? `Hồ sơ của bạn đã được ghi nhận. Thông tin xác nhận sẽ được gửi tới ${registration.email} nếu hệ thống email được bật. Vui lòng lưu mã đăng ký bên dưới.`
            : 'Vui lòng chọn chương trình và hoàn thành form đăng ký trước.'}
        </p>
        {registration && (
          <div className="mx-auto my-7 max-w-sm border border-dashed border-[#aaa69b] p-5">
            <span className="block text-[10px] tracking-wider text-[#89867e] uppercase">Mã đăng ký</span>
            <strong className="mt-2 block text-2xl tracking-widest">{registration.registrationCode}</strong>
            <span className="mt-2 block text-[12px] text-[#716d67]">{registration.fullName}</span>
          </div>
        )}
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#111110] px-6 text-sm font-extrabold tracking-wide text-[#f4f1ea] uppercase no-underline transition hover:-translate-y-0.5 hover:bg-[#222]"
          to="/"
        >
          Về homepage
        </Link>
      </section>
    </main>
  )
}
