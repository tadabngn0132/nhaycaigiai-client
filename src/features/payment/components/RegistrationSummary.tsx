import { Link } from 'react-router-dom'
import type { RegistrationResponse } from '../../registration/model/registrationTypes'

type RegistrationSummaryProps = {
  registration: RegistrationResponse
  onConfirm: () => void
}

export function RegistrationSummary({ registration, onConfirm }: RegistrationSummaryProps) {
  return (
    <aside className="rounded-xl border border-[#f4f1ea]/15 bg-[#111110] p-4 text-[#f4f1ea] shadow-[0_28px_80px_rgba(0,0,0,.32)] sm:p-5">
      <p className="text-[11px] font-bold tracking-[2px] text-[#df454d] uppercase">Đơn đăng ký</p>
      <h2 className="mt-2 text-xl font-black uppercase">{registration.fullName}</h2>
      <div className="mt-5 rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/8 p-3">
        <span className="block text-[10px] tracking-wider text-[#aaa7a1] uppercase">
          {registration.programType === 'workshop' ? 'Workshop' : 'Giải đấu'}
        </span>
        <strong className="mt-1 block text-lg uppercase">{registration.programTitle}</strong>
      </div>
      <div className="mt-3 rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/8 p-3">
        <span className="block text-[10px] tracking-wider text-[#aaa7a1] uppercase">Mã đăng ký</span>
        <strong className="mt-1 block text-2xl tracking-widest">{registration.registrationCode}</strong>
        <p className="mt-2 text-[12px] leading-relaxed text-[#d7d2c8]">
          Vé: {registration.ticketSummary || 'Vé tham gia'} · Email: {registration.email}
        </p>
      </div>
      <button
        className="mt-5 min-h-12 w-full rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-6 text-sm font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
        onClick={onConfirm}
        type="button"
      >
        Xác nhận thanh toán
      </button>
      <Link className="mt-3 flex min-h-11 items-center justify-center rounded-sm border border-[#f4f1ea]/20 px-6 text-sm font-extrabold tracking-wide text-[#f4f1ea] uppercase no-underline transition hover:border-[#f4f1ea]/50" to="/">
        Về homepage
      </Link>
    </aside>
  )
}
