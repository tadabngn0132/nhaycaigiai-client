import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeFooter } from '../features/home/components/HomeFooter'
import { HomeHeader } from '../features/home/components/HomeHeader'
import { HomeProgramSection } from '../features/home/components/HomeProgramSection'
import { HeroBanner } from '../features/home/components/HeroBanner'
import { EventIntro } from '../features/home/components/EventIntro'
import { ProgramChooserModal } from '../features/home/components/ProgramChooserModal'
import { RegisterCta } from '../features/home/components/RegisterCta'
import { competitions, merchItems, monthlyWorkshops } from '../features/home/homeData'

export default function HomePage() {
  const navigate = useNavigate()
  const [chooserOpen, setChooserOpen] = useState(false)
  const openProgramChooser = () => setChooserOpen(true)
  const closeProgramChooser = () => setChooserOpen(false)

  return (
    <main className="min-h-screen overflow-x-clip bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:linear-gradient(145deg,#171615,#111110_58%)]">
      <HomeHeader onRegister={openProgramChooser} />
      <HeroBanner />
      <EventIntro />
      <HomeProgramSection
        eyebrow="Competitions"
        items={competitions}
        onAction={(item) => navigate(`/program/${item.slug}`)}
        title="Danh sách các giải đấu"
      />
      <HomeProgramSection
        eyebrow="Monthly Workshops"
        items={monthlyWorkshops}
        onAction={(item) => navigate(`/program/${item.slug}`)}
        shaded
        title="Workshop hàng tháng"
      />
      <HomeProgramSection
        eyebrow="Merch Store"
        items={merchItems}
        title="NCG Merch Drop"
      />
      <RegisterCta onRegister={openProgramChooser} />
      <HomeFooter />
      <ProgramChooserModal open={chooserOpen} onClose={closeProgramChooser} />
    </main>
  )
}
