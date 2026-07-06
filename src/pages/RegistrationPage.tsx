import RegistrationForm from '../features/registration/components/RegistrationForm'

export default function RegistrationPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:radial-gradient(circle_at_14%_18%,rgba(201,44,53,.13),transparent_28%),radial-gradient(circle_at_88%_76%,rgba(201,44,53,.08),transparent_25%),radial-gradient(circle_at_50%_-20%,#302f2d,transparent_42%),linear-gradient(145deg,#1a1918,#111110_58%)]">
      <header className="flex h-17 items-center justify-between border-b border-[#f4f1ea]/15 bg-[#111110]/75 px-3.5 min-[381px]:px-6 md:h-20 md:px-[5vw]">
        <a className="flex items-center text-[21px] font-black tracking-[-1px] no-underline md:text-[25px]" href="/" aria-label="NCG 3.0">
          <span>NCG</span>
          <strong className="ml-1.5 rotate-[-8deg] rounded-full border-2 border-current p-1 text-[11px] text-[#df454d] md:text-sm">
            3.0
          </strong>
        </a>
        <span className="max-w-28 text-right text-[10px] leading-snug tracking-wide text-[#ddd] uppercase md:max-w-none md:text-xs md:tracking-[1.5px]">
          <i className="mr-2 inline-block size-1.5 rounded-full bg-[#f4f1ea] shadow-[0_0_9px_rgba(244,241,234,.6)]" />
          Đang mở đăng ký
        </span>
      </header>

      <section className="mx-auto max-w-280 px-2.5 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-9">
        <div className="min-w-0 rounded-xl bg-[#efede7] p-3 text-[#181817] shadow-[0_28px_80px_rgba(0,0,0,.45)] sm:p-3.5">
          <div className="border-0 pb-3">
            <h2 className="m-0 text-lg font-extrabold tracking-tight sm:text-[19px]">Đăng ký dự thi</h2>
          </div>
          <RegistrationForm />
        </div>
      </section>
      <footer className="flex flex-col gap-2 border-t border-[#f4f1ea]/15 bg-[#111110]/75 px-[5vw] py-6 text-[10px] tracking-wider text-[#aaa7a1] uppercase sm:flex-row sm:justify-between">
        <span>© 2026 NCG</span>
        <span>Move loud. Dance proud.</span>
      </footer>
    </main>
  )
}
