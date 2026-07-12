import { formatCurrency } from '../../registration/registrationOptions'
import type { RegistrationResponse } from '../../registration/model/registrationTypes'
import { PaymentLine } from './PaymentLine'
import { PaymentQr } from './PaymentQr'

export function PaymentDetails({ registration }: { registration: RegistrationResponse }) {
  return (
    <div className="rounded-xl bg-[#efede7] p-4 text-[#181817] shadow-[0_28px_80px_rgba(0,0,0,.45)] sm:p-5">
      <p className="mb-2 text-[11px] font-bold tracking-[2.4px] text-[#c92c35] uppercase">Thanh toán đăng ký</p>
      <h1 className="mb-2 text-2xl font-black uppercase sm:text-3xl">Quét QR hoặc chuyển khoản</h1>
      <p className="max-w-2xl text-[13px] leading-relaxed text-[#67635d]">
        Dùng đúng nội dung chuyển khoản bên dưới để ban tổ chức xác nhận đăng ký của bạn.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
        <PaymentQr registrationCode={registration.registrationCode} />
        <div className="grid gap-2.5">
          <PaymentLine label="Ngân hàng" value={registration.bankInfo.bankName} />
          <PaymentLine label="Số tài khoản" value={registration.bankInfo.accountNumber} strong />
          <PaymentLine label="Chủ tài khoản" value={registration.bankInfo.accountName} />
          <PaymentLine label="Chi nhánh" value={registration.bankInfo.branch} />
          <PaymentLine label="Số tiền" value={formatCurrency(registration.amount)} strong accent />
          <PaymentLine label="Nội dung CK" value={registration.transferContent} strong />
        </div>
      </div>
    </div>
  )
}
