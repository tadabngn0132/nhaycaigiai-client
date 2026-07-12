import type { PersonImage } from '../model/homeTypes'
import { PeopleGrid } from './PeopleGrid'
import { SectionHeading } from './SectionHeading'

type PeopleSectionProps = {
  eyebrow: string
  title: string
  people: PersonImage[]
  shaded?: boolean
  variant?: 'default' | 'large'
}

export function PeopleSection({
  eyebrow,
  title,
  people,
  shaded,
  variant,
}: PeopleSectionProps) {
  const content = (
    <>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <PeopleGrid people={people} variant={variant} />
    </>
  )

  if (shaded) {
    return (
      <section className="border-y border-[#f4f1ea]/12 bg-[#f4f1ea]/6 py-12 sm:py-16">
        <div className="mx-auto max-w-280 px-3 sm:px-4 lg:px-6">{content}</div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-280 px-3 py-12 sm:px-4 sm:py-16 lg:px-6">
      {content}
    </section>
  )
}
