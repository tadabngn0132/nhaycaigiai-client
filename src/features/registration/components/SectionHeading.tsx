type SectionHeadingProps = {
  number?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  number,
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      {number && <span>{number}</span>}
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}
