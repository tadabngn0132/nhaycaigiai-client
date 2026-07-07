import { SectionHeading } from './SectionHeading'

export function StructureSection() {
  return (
    <section className="border-y border-[#f4f1ea]/12 bg-[#f4f1ea]/6 py-12 sm:py-16">
      <div className="mx-auto max-w-280 px-3 sm:px-4 lg:px-6">
        <SectionHeading eyebrow="Structure" title="Organizing Committee Structure" />
        <figure className="mt-6 overflow-hidden rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/6">
          <img
            alt="Organizing committee structure"
            className="w-full object-contain"
            src="/organizing-committee-structure.jpg"
          />
        </figure>
      </div>
    </section>
  )
}
