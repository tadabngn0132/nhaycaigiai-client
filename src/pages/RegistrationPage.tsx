import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeFooter } from '../features/home/components/HomeFooter'
import { HomeHeader } from '../features/home/components/HomeHeader'
import { ProgramChooserModal } from '../features/home/components/ProgramChooserModal'
import { registrationPrograms } from '../features/home/homeData'

export default function RegistrationPage() {
  const [chooserOpen, setChooserOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-x-clip bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:linear-gradient(145deg,#171615,#111110_58%)]">
      <HomeHeader onRegister={() => setChooserOpen(true)} />
      <section className="mx-auto max-w-280 px-3 py-12 sm:px-4 sm:py-16 lg:px-6">
        <p className="text-[11px] font-bold tracking-[2.4px] text-[#df454d] uppercase">
          Đăng ký
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl leading-none font-black uppercase sm:text-6xl">
          Chọn giải đấu hoặc workshop
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {registrationPrograms.map((program) => (
            <Link
              className="overflow-hidden rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/7 text-[#f4f1ea] no-underline transition hover:-translate-y-0.5 hover:border-[#f4f1ea]/35"
              key={program.slug}
              to={`/program/${program.slug}`}
            >
              <img
                alt={program.imageAlt}
                className="aspect-[16/10] w-full object-cover"
                src={program.image}
              />
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-[2px] text-[#df454d] uppercase">
                  {program.type === 'competition' ? 'Giải đấu' : 'Workshop'} · {program.label}
                </p>
                <strong className="mt-2 block text-xl font-black uppercase">{program.title}</strong>
                <span className="mt-3 block text-xs font-extrabold uppercase text-[#f4f1ea]">
                  Xem chi tiết
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <HomeFooter />
      <ProgramChooserModal open={chooserOpen} onClose={() => setChooserOpen(false)} />
    </main>
  )
}
