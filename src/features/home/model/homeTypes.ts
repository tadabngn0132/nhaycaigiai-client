export type PersonImage = {
  image: string
  alt: string
}

export type HomeProgramItem = {
  slug: string
  type: 'competition' | 'workshop' | 'merch'
  title: string
  label: string
  description: string
  meta: string
  image: string
  imageAlt: string
  actionLabel?: string
  detailTitle?: string
  detailDescription?: string
  schedule?: string
  location?: string
  price?: string
}
