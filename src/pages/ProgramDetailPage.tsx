import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { HomeFooter } from '../features/home/components/HomeFooter'
import { HomeHeader } from '../features/home/components/HomeHeader'
import { ProgramChooserModal } from '../features/home/components/ProgramChooserModal'
import { getProgramBySlug } from '../features/home/homeData'
import { RegistrationModal } from '../features/registration/components/RegistrationModal'

export default function ProgramDetailPage() {
  const { slug } = useParams()
  const program = getProgramBySlug(slug)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [chooserOpen, setChooserOpen] = useState(false)

  if (!program || program.type === 'merch') {
    return <Navigate replace to="/" />
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:linear-gradient(145deg,#171615,#111110_58%)]">
      <HomeHeader onRegister={() => setChooserOpen(true)} />
      <section className="mx-auto grid max-w-280 gap-8 px-3 py-10 sm:px-4 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:px-6">
        <div>
          <Link
            className="text-xs font-extrabold tracking-wide text-[#df454d] uppercase no-underline hover:text-[#f4f1ea]"
            to="/"
          >
            ← Trang chủ
          </Link>
          <p className="mt-8 text-[11px] font-bold tracking-[2.4px] text-[#df454d] uppercase">
            {program.type === 'competition' ? 'Giải đấu' : 'Workshop'} · {program.label}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-none font-black uppercase sm:text-6xl">
            {program.detailTitle ?? program.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-8 text-[#d7d2c8] sm:text-lg">
            {program.detailDescription ?? program.description}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Lịch', program.schedule],
              ['Địa điểm', program.location],
              ['Phí', program.price],
            ].map(([label, value]) => (
              <div className="border border-[#f4f1ea]/15 bg-[#f4f1ea]/7 p-4" key={label}>
                <p className="text-[10px] font-bold tracking-[2px] text-[#df454d] uppercase">{label}</p>
                <strong className="mt-2 block text-sm leading-6 text-[#f4f1ea]">{value}</strong>
              </div>
            ))}
          </div>
          <button
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-8 text-sm font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
            onClick={() => setRegistrationOpen(true)}
            type="button"
          >
            Đăng ký {program.type === 'competition' ? 'giải đấu' : 'workshop'}
          </button>
        </div>
        <figure className="overflow-hidden rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/6 lg:sticky lg:top-26 lg:self-start">
          <img
            alt={program.imageAlt}
            className="aspect-[16/10] h-full w-full object-cover lg:aspect-[4/5]"
            src={program.image}
          />
        </figure>
      </section>
      <HomeFooter />
      <RegistrationModal
        contextLabel={program.title}
        open={registrationOpen}
        selectedProgram={program}
        onClose={() => setRegistrationOpen(false)}
      />
      <ProgramChooserModal open={chooserOpen} onClose={() => setChooserOpen(false)} />
    </main>
  )
}
