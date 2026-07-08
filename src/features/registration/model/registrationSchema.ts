import { z } from 'zod'

export const registrationSchema = z.object({
  programSlug: z.string().min(1, 'Vui lòng chọn giải đấu hoặc workshop'),
  programTitle: z.string().min(1, 'Vui lòng chọn giải đấu hoặc workshop'),
  programType: z.enum(['competition', 'workshop']),
  ticketTypes: z.array(z.enum(['competitor', 'audience']))
    .min(1, 'Vui lòng chọn ít nhất một loại vé'),
  fullName: z.string().trim().min(2, 'Vui lòng nhập họ và tên'),
  stageName: z.string().trim().optional(),
  dateOfBirth: z.string().min(1, 'Vui lòng chọn ngày sinh'),
  phone: z.string().trim().regex(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại chưa đúng định dạng'),
  email: z.email('Email chưa đúng định dạng'),
  socialLink: z.union([
    z.literal(''),
    z.url('Vui lòng nhập đường dẫn Instagram/Facebook hợp lệ'),
  ]),
  city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  category: z.enum(['solo', 'duo', 'team']).optional(),
  danceStyle: z.string().optional(),
  crewName: z.string().trim().optional(),
  experience: z.string().optional(),
  note: z.string().trim().max(500, 'Ghi chú tối đa 500 ký tự').optional(),
  acceptedTerms: z.literal(true, { message: 'Bạn cần đồng ý với điều lệ cuộc thi' }),
}).superRefine((data, context) => {
  if (data.programType !== 'competition' || !data.ticketTypes.includes('competitor')) return

  const requiredCompetitorFields: Array<[keyof typeof data, string]> = [
    ['stageName', 'Vui lòng nhập tên thi đấu'],
    ['crewName', 'Vui lòng nhập crew/nhóm/studio'],
    ['category', 'Vui lòng chọn bảng thi'],
    ['danceStyle', 'Vui lòng chọn thể loại nhảy'],
    ['experience', 'Vui lòng chọn kinh nghiệm'],
  ]

  requiredCompetitorFields.forEach(([field, message]) => {
    if (!data[field]) {
      context.addIssue({ code: 'custom', path: [field], message })
    }
  })
})

export type RegistrationData = z.infer<typeof registrationSchema>
export type TicketType = RegistrationData['ticketTypes'][number]
