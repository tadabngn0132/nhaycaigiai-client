import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../features/registration/registrationOptions'
import { getCurrentRegistration } from '../services/api'

export default function PaymentPage() {
  const navigate = useNavigate()
  const registration = getCurrentRegistration()

  if (!registration) {
    return (
      <SimpleShell>
        <div className="mx-auto max-w-xl rounded-xl bg-[#efede7] p-6 text-center text-[#181817]">
          <h1 className="text-2xl font-black uppercase">Chưa có đăng ký</h1>
          <p className="mt-3 text-sm text-[#716d67]">Vui lòng quay lại homepage và gửi form đăng ký trước.</p>
          <Link className="mt-5 inline-flex min-h-12 items-center justify-center rounded-sm border-b-3 border-[#c92c35] bg-[#111110] px-6 text-sm font-extrabold text-[#f4f1ea] uppercase no-underline" to="/">
            Về homepage
          </Link>
        </div>
      </SimpleShell>
    )
  }

  return (
    <SimpleShell>
      <section className="mx-auto grid max-w-280 gap-4 px-3 py-6 sm:px-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-6 lg:py-10">
        <div className="rounded-xl bg-[#efede7] p-4 text-[#181817] shadow-[0_28px_80px_rgba(0,0,0,.45)] sm:p-5">
          <p className="mb-2 text-[11px] font-bold tracking-[2.4px] text-[#c92c35] uppercase">Thanh toán đăng ký</p>
          <h1 className="mb-2 text-2xl font-black uppercase sm:text-3xl">Quét QR hoặc chuyển khoản</h1>
          <p className="max-w-2xl text-[13px] leading-relaxed text-[#67635d]">
            Đây là trang thanh toán demo. Thông tin bên dưới được tạo từ mock data sau khi người dùng hoàn tất form bắt buộc.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
            <div className="rounded-lg border border-[#d8d3ca] bg-white p-3 shadow-[0_10px_28px_rgba(17,17,16,.08)]">
              <div className="grid aspect-square grid-cols-7 gap-1 bg-white p-2">
                {Array.from({ length: 49 }).map((_, index) => {
                  const row = Math.floor(index / 7)
                  const col = index % 7
                  const finder = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
                  const pattern = finder || [3, 5, 9, 11, 14, 17, 19, 23, 25, 29, 31, 34, 38, 41, 45].includes(index)

                  return (
                    <span
                      className={`rounded-[2px] ${pattern ? 'bg-[#111110]' : 'bg-[#ece8df]'}`}
                      key={`${registration.registrationCode}-${index}`}
                    />
                  )
                })}
              </div>
              <span className="mt-3 block text-center text-[10px] font-bold tracking-wider text-[#817c75] uppercase">
                Mock QR
              </span>
            </div>

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

        <aside className="rounded-xl border border-[#f4f1ea]/15 bg-[#111110] p-4 text-[#f4f1ea] shadow-[0_28px_80px_rgba(0,0,0,.32)] sm:p-5">
          <p className="text-[11px] font-bold tracking-[2px] text-[#df454d] uppercase">Đơn đăng ký</p>
          <h2 className="mt-2 text-xl font-black uppercase">{registration.fullName}</h2>
          <div className="mt-5 rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/8 p-3">
            <span className="block text-[10px] tracking-wider text-[#aaa7a1] uppercase">Mã đăng ký</span>
            <strong className="mt-1 block text-2xl tracking-widest">{registration.registrationCode}</strong>
            <p className="mt-2 text-[12px] leading-relaxed text-[#d7d2c8]">
              Vé: {registration.ticketSummary || 'Vé tham gia'} · Email: {registration.email}
            </p>
          </div>
          <button
            className="mt-5 min-h-12 w-full rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-6 text-sm font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
            onClick={() => navigate('/confirmation')}
            type="button"
          >
            Skip payment
          </button>
          <Link className="mt-3 flex min-h-11 items-center justify-center rounded-sm border border-[#f4f1ea]/20 px-6 text-sm font-extrabold tracking-wide text-[#f4f1ea] uppercase no-underline transition hover:border-[#f4f1ea]/50" to="/">
            Về homepage
          </Link>
        </aside>
      </section>
    </SimpleShell>
  )
}

function SimpleShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:radial-gradient(circle_at_18%_18%,rgba(201,44,53,.13),transparent_28%),linear-gradient(145deg,#1a1918,#111110_58%)]">
      <header className="flex h-17 items-center justify-between border-b border-[#f4f1ea]/15 bg-[#111110]/85 px-3.5 min-[381px]:px-6 md:h-20 md:px-[5vw]">
        <Link className="flex items-center text-[21px] font-black tracking-[-1px] text-[#f4f1ea] no-underline md:text-[25px]" to="/">
          <span>NCG</span>
          <strong className="ml-1.5 rotate-[-8deg] rounded-full border-2 border-current p-1 text-[11px] text-[#df454d] md:text-sm">3.0</strong>
        </Link>
      </header>
      {children}
    </main>
  )
}

function PaymentLine({
  label,
  value,
  strong,
  accent,
}: {
  label: string
  value: string
  strong?: boolean
  accent?: boolean
}) {
  return (
    <div className="rounded-lg border border-[#ded9cf] bg-white px-3 py-2.5">
      <span className="block text-[10px] font-bold tracking-wider text-[#817c75] uppercase">{label}</span>
      <span className={`mt-1 block wrap-break-word text-[13px] ${strong ? 'font-extrabold' : 'font-semibold'} ${accent ? 'text-[#c92c35]' : 'text-[#181817]'}`}>
        {value}
      </span>
    </div>
  )
}
