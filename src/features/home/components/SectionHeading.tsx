type SectionHeadingProps = {
  eyebrow: string
  title: string
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold tracking-[2.4px] text-[#df454d] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-2xl leading-tight font-black uppercase sm:text-4xl">{title}</h2>
    </div>
  )
}
