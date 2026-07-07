import { useState } from 'react'
import { HomeFooter } from '../features/home/components/HomeFooter'
import { HomeHeader } from '../features/home/components/HomeHeader'
import { HeroBanner } from '../features/home/components/HeroBanner'
import { EventIntro } from '../features/home/components/EventIntro'
import { PeopleSection } from '../features/home/components/PeopleSection'
import { RegisterCta } from '../features/home/components/RegisterCta'
import { StructureSection } from '../features/home/components/StructureSection'
import {
  communicationsHeads,
  eventHeads,
  leaders,
  organizingCommittee,
  publicRelationsHeads,
} from '../features/home/homeData'
import { RegistrationModal } from '../features/registration/components/RegistrationModal'

export default function HomePage() {
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const openRegistration = () => setRegistrationOpen(true)
  const closeRegistration = () => setRegistrationOpen(false)

  return (
    <main className="min-h-screen overflow-x-clip bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:linear-gradient(145deg,#171615,#111110_58%)]">
      <HomeHeader onRegister={openRegistration} />
      <HeroBanner />
      <EventIntro />
      <StructureSection />
      <PeopleSection
        eyebrow="Organizing Committee"
        people={organizingCommittee}
        title="Head & Vice-head"
        variant="large"
      />
      <PeopleSection
        eyebrow="Leader Of Cluster"
        people={leaders}
        shaded
        title="Cluster Leaders"
      />
      <PeopleSection
        eyebrow="Communications Heads"
        people={communicationsHeads}
        title="Communications"
      />
      <PeopleSection
        eyebrow="Events Heads"
        people={eventHeads}
        shaded
        title="Events"
      />
      <PeopleSection
        eyebrow="Public Relations Heads"
        people={publicRelationsHeads}
        title="Public Relations"
      />
      <RegisterCta onRegister={openRegistration} />
      <HomeFooter />
      <RegistrationModal open={registrationOpen} onClose={closeRegistration} />
    </main>
  )
}
