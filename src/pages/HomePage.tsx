import { useState } from 'react'
import { RegistrationModal } from '../features/registration/components/RegistrationModal'

export default function HomePage() {
  const [registrationOpen, setRegistrationOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-x-clip bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:radial-gradient(circle_at_14%_18%,rgba(201,44,53,.13),transparent_28%),radial-gradient(circle_at_88%_76%,rgba(41,163,156,.10),transparent_24%),linear-gradient(145deg,#1a1918,#111110_58%)]">
      <header className="sticky top-0 z-20 flex h-17 items-center justify-between border-b border-[#f4f1ea]/15 bg-[#111110]/85 px-3.5 backdrop-blur min-[381px]:px-6 md:h-20 md:px-[5vw]">
        <a className="flex items-center text-[21px] font-black tracking-[-1px] no-underline md:text-[25px]" href="/" aria-label="NCG 3.0">
          <span>NCG</span>
          <strong className="ml-1.5 rotate-[-8deg] rounded-full border-2 border-current p-1 text-[11px] text-[#df454d] md:text-sm">
            3.0
          </strong>
        </a>
        <button
          className="min-h-10 rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-4 text-xs font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
          onClick={() => setRegistrationOpen(true)}
          type="button"
        >
          Đăng ký
        </button>
      </header>

      <section className="mx-auto grid max-w-300 gap-7 px-3 py-6 sm:px-4 sm:py-8 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-center lg:px-6 lg:py-10">
        <div className="min-w-0">
          <p className="mb-3 text-[11px] font-bold tracking-[2.6px] text-[#df454d] uppercase">
            Street dance event · Hà Nội · 18.08.2026
          </p>
          <h1 className="max-w-3xl text-[38px] leading-[.98] font-black tracking-tight uppercase sm:text-6xl lg:text-7xl">
            NCG 3.0 Dance Battle
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d7d2c8] sm:text-base">
            Sân chơi dành cho dancer và khán giả yêu nhịp phố: battle solo, duo, team, showcase khách mời và không gian giao lưu sau giải.
          </p>
          <div className="mt-6 grid gap-2.5 text-[13px] text-[#ede8dc] sm:grid-cols-3">
            <EventFact label="Thời gian" value="18:00 · 18/08" />
            <EventFact label="Địa điểm" value="NCG Arena" />
            <EventFact label="Vé từ" value="0 - 299K" />
          </div>
          <button
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-7 text-sm font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
            onClick={() => setRegistrationOpen(true)}
            type="button"
          >
            Đăng ký ngay
          </button>
        </div>

        <figure className="relative m-0 min-h-[420px] overflow-hidden rounded-xl border border-[#f4f1ea]/15 bg-[#1b1a19] shadow-[0_28px_80px_rgba(0,0,0,.42)] lg:min-h-[620px]">
          <img
            alt="Không khí sự kiện NCG 3.0 Dance Battle"
            className="absolute inset-0 size-full object-cover"
            src="/ncg-event-hero.png"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111110] to-transparent p-5 pt-24">
            <span className="text-[11px] font-bold tracking-[2px] text-[#f4f1ea] uppercase">Registration open</span>
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto grid max-w-300 gap-3 px-3 pb-10 sm:grid-cols-3 sm:px-4 lg:px-6">
        <InfoPanel title="01. Xem thông tin" description="Người tham gia nắm lịch, địa điểm, hạng mục vé và tinh thần sự kiện ngay trên homepage." />
        <InfoPanel title="02. Đăng ký trong modal" description="Bấm Đăng ký để mở form, điền thông tin bắt buộc, đóng bằng nút X hoặc bấm ra ngoài." />
        <InfoPanel title="03. Thanh toán demo" description="Sau khi gửi form, hệ thống chuyển sang trang thanh toán và có nút skip để tới confirmation." />
      </section>

      <footer className="flex flex-col gap-2 border-t border-[#f4f1ea]/15 bg-[#111110]/75 px-[5vw] py-6 text-[10px] tracking-wider text-[#aaa7a1] uppercase sm:flex-row sm:justify-between">
        <span>© 2026 NCG</span>
        <span>Move loud. Dance proud.</span>
      </footer>

      <RegistrationModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} />
    </main>
  )
}

function EventFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-[#df454d] bg-[#f4f1ea]/8 px-3 py-2.5">
      <span className="block text-[10px] font-bold tracking-wider text-[#aaa7a1] uppercase">{label}</span>
      <strong className="mt-1 block text-sm text-[#f4f1ea]">{value}</strong>
    </div>
  )
}

function InfoPanel({ title, description }: { title: string; description: string }) {
  return (
    <article className="rounded-lg border border-[#f4f1ea]/14 bg-[#f4f1ea]/7 p-4">
      <h2 className="text-sm font-extrabold uppercase">{title}</h2>
      <p className="mt-2 text-[13px] leading-6 text-[#c8c2b7]">{description}</p>
    </article>
  )
}
