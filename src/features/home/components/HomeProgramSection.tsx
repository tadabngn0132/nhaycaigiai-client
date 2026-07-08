import type { HomeProgramItem } from '../homeData'
import { SectionHeading } from './SectionHeading'

type HomeProgramSectionProps = {
  eyebrow: string
  title: string
  items: HomeProgramItem[]
  shaded?: boolean
  onAction?: (item: HomeProgramItem) => void
}

export function HomeProgramSection({
  eyebrow,
  title,
  items,
  shaded,
  onAction,
}: HomeProgramSectionProps) {
  const content = (
    <>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const cardContent = (
            <>
              <img
                alt={item.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/68 to-[#111110]/10" />
              <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-4 text-left sm:p-5">
                <div className="mb-auto flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold tracking-[2px] text-[#f4f1ea] uppercase drop-shadow">
                    {item.label}
                  </p>
                  <span className="grid min-h-10 w-30 shrink-0 place-items-center rounded-sm border border-[#f4f1ea]/35 bg-[#111110]/35 px-2 py-1 text-center text-[10px] leading-4 font-bold tracking-wide text-[#f4f1ea] uppercase backdrop-blur-sm [text-wrap:balance]">
                    {item.meta}
                  </span>
                </div>
                <h3 className="text-2xl leading-tight font-black text-[#f4f1ea] uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#e7e2d8]">{item.description}</p>
              </div>
            </>
          )

          return (
            <article
              className="group relative overflow-hidden rounded-lg border border-[#f4f1ea]/15 bg-[#181817] transition hover:border-[#f4f1ea]/35"
              key={item.title}
            >
              {onAction ? (
                <button
                  aria-label={`Xem chi tiết ${item.title}`}
                  className="block h-full w-full cursor-pointer border-0 bg-transparent p-0 text-inherit"
                  onClick={() => onAction(item)}
                  type="button"
                >
                  {cardContent}
                </button>
              ) : (
                cardContent
              )}
            </article>
          )
        })}
      </div>
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
