import type { HomeProgramItem, PersonImage } from './model/homeTypes'

export type { HomeProgramItem, PersonImage } from './model/homeTypes'

const defaultTempImage = '/default-temp-image.png'

export const competitions: HomeProgramItem[] = [
  {
    slug: 'morning-battle',
    type: 'competition',
    title: 'Morning Battle',
    label: '22.08.2026',
    description: 'Chặng mở màn của Nhảy Cái Giải, dành cho dancer bước vào mùa thi với năng lượng đầu tiên.',
    meta: 'Morning · 22/08/2026',
    image: defaultTempImage,
    imageAlt: 'Morning battle at Nhảy Cái Giải',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Morning Battle',
    detailDescription: 'Chặng mở màn ngày 22/08/2026, tập trung vào vòng khởi động, tuyển chọn và tạo nhịp cho toàn bộ mùa sự kiện kéo dài đến tháng 03/2027.',
    schedule: '22/08/2026',
    location: 'Main stage',
    price: '299,000 VNĐ',
  },
  {
    slug: 'evening-showcase',
    type: 'competition',
    title: 'Evening Showcase',
    label: '12.12.2026',
    description: 'Chặng giữa mùa, nơi các dancer trình diễn bài dựng, concept và sự tiến bộ sau chuỗi workshop.',
    meta: 'Evening · 12/12/2026',
    image: defaultTempImage,
    imageAlt: 'Evening showcase at Nhảy Cái Giải',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Evening Showcase',
    detailDescription: 'Chặng showcase ngày 12/12/2026, nối giữa mùa workshop và giai đoạn nước rút, dành cho phần trình diễn có concept, đội hình và màu sắc sân khấu rõ ràng.',
    schedule: '12/12/2026',
    location: 'Main stage',
    price: '299,000 VNĐ',
  },
  {
    slug: 'midnight-final',
    type: 'competition',
    title: 'Midnight Final',
    label: '21.03.2027',
    description: 'Đêm chung kết khép lại mùa sự kiện, dành cho những màn battle và performance bùng nổ nhất.',
    meta: 'Midnight · 21/03/2027',
    image: defaultTempImage,
    imageAlt: 'Midnight final at Nhảy Cái Giải',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Midnight Final',
    detailDescription: 'Đêm chung kết ngày 21/03/2027, tổng kết hành trình từ Morning đến Midnight với các phần thi quyết định, performance đặc biệt và trao giải.',
    schedule: '21/03/2027',
    location: 'Main stage',
    price: '299,000 VNĐ',
  },
]

export const monthlyWorkshops: HomeProgramItem[] = [
  {
    slug: 'september-foundation-lab',
    type: 'workshop',
    title: 'Foundation Lab',
    label: '09.2026',
    description: 'Workshop tháng 09 giúp dancer củng cố groove, bounce và kỹ thuật nền tảng sau chặng Morning.',
    meta: 'Beginner friendly',
    image: defaultTempImage,
    imageAlt: 'Foundation dance workshop',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Foundation Lab · 09.2026',
    detailDescription: 'Buổi workshop tháng 09/2026 tập trung vào nền tảng chuyển động, nhịp, groove và cách luyện tập ổn định cho hành trình dài của mùa giải.',
    schedule: '09/2026',
    location: 'GDC Studio',
    price: '0 VNĐ',
  },
  {
    slug: 'october-choreo-class',
    type: 'workshop',
    title: 'Choreo Class',
    label: '10.2026',
    description: 'Workshop tháng 10 tập trung vào choreography, musicality, texture và cách dựng tổ hợp động tác.',
    meta: 'Open level',
    image: defaultTempImage,
    imageAlt: 'Choreography dance workshop',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Choreo Class · 10.2026',
    detailDescription: 'Buổi workshop tháng 10/2026 dành cho dancer muốn luyện khả năng bắt nhạc, xử lý texture và ghi nhớ tổ hợp choreography hiệu quả hơn.',
    schedule: '10/2026',
    location: 'GDC Studio',
    price: '0 VNĐ',
  },
  {
    slug: 'november-battle-mindset',
    type: 'workshop',
    title: 'Battle Mindset',
    label: '11.2026',
    description: 'Workshop tháng 11 về tư duy battle, cách vào cypher, chọn nhạc và phản ứng với đối thủ.',
    meta: 'Battle prep',
    image: defaultTempImage,
    imageAlt: 'Battle mindset workshop',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Battle Mindset · 11.2026',
    detailDescription: 'Buổi workshop tháng 11/2026 chuẩn bị cho chặng Evening, tập trung vào tinh thần thi đấu, chiến thuật vào vòng và cách giữ năng lượng khi battle.',
    schedule: '11/2026',
    location: 'GDC Studio',
    price: '0 VNĐ',
  },
  {
    slug: 'january-performance-day',
    type: 'workshop',
    title: 'Performance Day',
    label: '01.2027',
    description: 'Workshop tháng 01 rèn sân khấu, biểu cảm, formation và khả năng làm chủ spotlight.',
    meta: 'Stage practice',
    image: defaultTempImage,
    imageAlt: 'Performance dance workshop',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Performance Day · 01.2027',
    detailDescription: 'Buổi workshop tháng 01/2027 giúp dancer chuyển từ luyện tập sang trình diễn, hoàn thiện biểu cảm, formation và độ chắc khi đứng sân khấu.',
    schedule: '01/2027',
    location: 'GDC Studio',
    price: '0 VNĐ',
  },
  {
    slug: 'february-final-prep',
    type: 'workshop',
    title: 'Final Prep',
    label: '02.2027',
    description: 'Workshop tháng 02 tổng duyệt tư duy thi đấu, performance và chuẩn bị cho Midnight Final.',
    meta: 'Final prep',
    image: defaultTempImage,
    imageAlt: 'Final prep dance workshop',
    actionLabel: 'Xem chi tiết',
    detailTitle: 'Final Prep · 02.2027',
    detailDescription: 'Buổi workshop tháng 02/2027 là chặng chuẩn bị cuối trước Midnight Final, tập trung vào polish bài thi, mindset và khả năng kiểm soát sân khấu.',
    schedule: '02/2027',
    location: 'GDC Studio',
    price: '0 VNĐ',
  },
]

export const merchItems: HomeProgramItem[] = [
  {
    slug: 'ncg-event-tee',
    type: 'merch',
    title: 'NCG Event Tee',
    label: 'Merch',
    description: 'Áo thun sự kiện form dễ mặc, in nhận diện Nhảy Cái Giải cho dancer và supporter.',
    meta: 'S / M / L / XL',
    image: defaultTempImage,
    imageAlt: 'Nhảy Cái Giải event tee',
    actionLabel: 'Đặt merch',
    detailTitle: 'NCG Event Tee',
    detailDescription: 'Áo thun sự kiện dành cho dancer và supporter muốn mang tinh thần Nhảy Cái Giải trong các buổi workshop, rehearsal và ngày thi đấu.',
    schedule: 'Mở bán xuyên suốt mùa giải',
    location: 'NCG merch booth',
    price: 'Liên hệ tại booth',
  },
  {
    slug: 'dance-tote',
    type: 'merch',
    title: 'Dance Tote',
    label: 'Merch',
    description: 'Túi vải gọn nhẹ để mang giày, nước và đồ tập trong những ngày workshop hoặc thi đấu.',
    meta: 'Limited drop',
    image: defaultTempImage,
    imageAlt: 'Nhảy Cái Giải dance tote',
    actionLabel: 'Đặt merch',
    detailTitle: 'Dance Tote',
    detailDescription: 'Túi vải gọn nhẹ để mang giày, nước, khăn và đồ tập trong những ngày workshop hoặc thi đấu.',
    schedule: 'Mở bán theo từng drop',
    location: 'NCG merch booth',
    price: 'Liên hệ tại booth',
  },
  {
    slug: 'sticker-pack',
    type: 'merch',
    title: 'Sticker Pack',
    label: 'Merch',
    description: 'Bộ sticker nhận diện cho laptop, bình nước và battle notebook.',
    meta: 'Combo 6 miếng',
    image: defaultTempImage,
    imageAlt: 'Nhảy Cái Giải sticker pack',
    actionLabel: 'Đặt merch',
    detailTitle: 'Sticker Pack',
    detailDescription: 'Bộ sticker nhận diện Nhảy Cái Giải cho laptop, bình nước, battle notebook và các món đồ tập cá nhân.',
    schedule: 'Có sẵn tại sự kiện',
    location: 'NCG merch booth',
    price: 'Combo 6 miếng',
  },
]

export const registrationPrograms = [...competitions, ...monthlyWorkshops]
export const allPrograms = [...registrationPrograms, ...merchItems]

export function getProgramBySlug(slug: string | undefined) {
  return allPrograms.find((program) => program.slug === slug)
}

export const organizingCommittee: PersonImage[] = [
  {
    image: '/organizing-committee/organizing-committee-head.jpg',
    alt: 'Organizing Committee Head',
  },
  {
    image: '/organizing-committee/organizing-committee-vice-head.jpg',
    alt: 'Organizing Committee Vice-head',
  },
]

export const leaders: PersonImage[] = [
  {
    image: '/leader/communication-leader.jpg',
    alt: 'Communications Leader',
  },
  {
    image: '/leader/events-leader.jpg',
    alt: 'Events Leader',
  },
  {
    image: '/leader/public-relations-leader.jpg',
    alt: 'Public Relations Leader',
  },
]

export const communicationsHeads: PersonImage[] = [
  {
    image: '/head/communications/communication-head.jpg',
    alt: 'Communication Head',
  },
  {
    image: '/head/communications/content-head.jpg',
    alt: 'Content Head',
  },
  {
    image: '/head/communications/design-head.jpg',
    alt: 'Design Head',
  },
  {
    image: '/head/communications/media-head.jpg',
    alt: 'Media Head',
  },
]

export const eventHeads: PersonImage[] = [
  {
    image: '/head/events/event-head.jpg',
    alt: 'Event Head',
  },
  {
    image: '/head/events/human-resources-head.jpg',
    alt: 'Human Resources Head',
  },
  {
    image: '/head/events/logistics-head.jpg',
    alt: 'Logistics Head',
  },
  {
    image: '/head/events/setup-decor-head.jpg',
    alt: 'Setup Decor Head',
  },
]

export const publicRelationsHeads: PersonImage[] = [
  {
    image: '/head/public-relations/contestant-head.jpg',
    alt: 'Contestant Head',
  },
  {
    image: '/head/public-relations/finance-head.jpg',
    alt: 'Finance Head',
  },
  {
    image: '/head/public-relations/press-relations-head.jpg',
    alt: 'Press Relations Head',
  },
  {
    image: '/head/public-relations/public-relations-head.jpg',
    alt: 'Public Relations Head',
  },
]
