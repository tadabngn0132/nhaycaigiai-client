import type { PersonImage } from '../model/homeTypes'

type PeopleGridProps = {
  people: PersonImage[]
  variant?: 'default' | 'large'
}

export function PeopleGrid({ people, variant = 'default' }: PeopleGridProps) {
  return (
    <div className={`mt-6 grid gap-4 ${variant === 'large' ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
      {people.map((person) => (
        <article className="overflow-hidden rounded-lg border border-[#f4f1ea]/15 bg-[#f4f1ea]/7" key={person.image}>
          <div className={`${variant === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]'} bg-[#1d1b1a]`}>
            <img
              alt={person.alt}
              className="size-full object-cover"
              src={person.image}
            />
          </div>
        </article>
      ))}
    </div>
  )
}
