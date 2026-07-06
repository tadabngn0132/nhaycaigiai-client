import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createRegistration } from '../../services/api'

const registrationSchema = z.object({
  ticketType: z.enum(['competitor', 'audience']),
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
}).superRefine((data, ctx) => {
  if (data.ticketType !== 'competitor') return
  const requiredFields: Array<[keyof typeof data, string]> = [
    ['stageName', 'Vui lòng nhập tên thi đấu'],
    ['crewName', 'Vui lòng nhập crew/nhóm/studio'],
    ['category', 'Vui lòng chọn bảng thi'],
    ['danceStyle', 'Vui lòng chọn thể loại nhảy'],
    ['experience', 'Vui lòng chọn kinh nghiệm'],
  ]
  requiredFields.forEach(([field, message]) => {
    if (!data[field]) ctx.addIssue({ code: 'custom', path: [field], message })
  })
})

export type RegistrationData = z.infer<typeof registrationSchema>

const fieldClass = (hasError: boolean) => `form-control${hasError ? ' is-error' : ''}`

export default function RegistrationForm() {
  const [registrationCode, setRegistrationCode] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { ticketType: 'competitor', acceptedTerms: undefined },
  })
  const ticketType = useWatch({ control, name: 'ticketType' })
  const ticketPrice = ticketType === 'competitor' ? '299.000đ' : '99.000đ'

  const onSubmit = async (data: RegistrationData) => {
    try {
      const result = await createRegistration(data)
      setRegistrationCode(result.registrationCode)
      toast.success('Đăng ký thành công!')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Không thể gửi đăng ký. Vui lòng thử lại.')
    }
  }

  if (registrationCode) {
    return (
      <div className="success-card" role="status">
        <div className="success-icon">✓</div>
        <p className="eyebrow">Hẹn gặp bạn tại sàn đấu</p>
        <h2>Đăng ký thành công!</h2>
        <p>Hồ sơ của bạn đã được ghi nhận. Hãy lưu lại mã đăng ký để tiếp tục thanh toán.</p>
        <div className="registration-code">
          <span>Mã đăng ký</span>
          <strong>{registrationCode}</strong>
        </div>
        <button className="primary-button" type="button" onClick={() => setRegistrationCode('')}>
          Tạo đăng ký khác
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="section-heading ticket-heading">
        <span>01</span>
        <div><h2>Chọn loại vé</h2><p>Chọn cách bạn sẽ tham gia NCG 3.0.</p></div>
      </div>
      <div className="ticket-grid">
        <label className="ticket-card">
          <input type="radio" value="competitor" {...register('ticketType')} />
          <span className="ticket-content">
            <i>Battle pass</i><strong>Vé người đấu</strong>
            <small>Tham gia thi đấu và vào cửa sự kiện</small>
            <b>299.000đ</b>
          </span>
        </label>
        <label className="ticket-card">
          <input type="radio" value="audience" {...register('ticketType')} />
          <span className="ticket-content">
            <i>Spectator pass</i><strong>Vé người xem</strong>
            <small>Vào cửa và theo dõi toàn bộ giải đấu</small>
            <b>99.000đ</b>
          </span>
        </label>
      </div>

      <div className="section-heading personal-heading">
        <div><h2>Thông tin cá nhân</h2></div>
      </div>

      <div className="field-grid personal-grid">
        <Field label="Họ và tên" required error={errors.fullName?.message}>
          <input className={fieldClass(!!errors.fullName)} placeholder="Nhập họ tên" autoComplete="name" {...register('fullName')} />
        </Field>
        <Field label="Số điện thoại" required error={errors.phone?.message}>
          <input className={fieldClass(!!errors.phone)} placeholder="Nhập số điện thoại" inputMode="tel" autoComplete="tel" {...register('phone')} />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <input type="email" className={fieldClass(!!errors.email)} placeholder="Nhập email" autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Ngày sinh" required error={errors.dateOfBirth?.message}>
          <input type="date" className={fieldClass(!!errors.dateOfBirth)} {...register('dateOfBirth')} />
        </Field>
        <Field label="Instagram/Facebook" hint="Nếu có" error={errors.socialLink?.message}>
          <input type="url" className={fieldClass(!!errors.socialLink)} placeholder="Link Instagram/Facebook" {...register('socialLink')} />
        </Field>
        <Field label="Tỉnh / Thành phố" required error={errors.city?.message}>
          <select className={fieldClass(!!errors.city)} defaultValue="" {...register('city')}>
            <option value="" disabled>-- Chọn tỉnh thành --</option>
            <option>Hà Nội</option><option>TP. Hồ Chí Minh</option><option>Đà Nẵng</option>
            <option>Hải Phòng</option><option>Cần Thơ</option><option>Huế</option>
            <option>Khác</option>
          </select>
        </Field>
        {ticketType === 'competitor' && <>
          <Field label="Tên thi đấu" required error={errors.stageName?.message}>
            <input className={fieldClass(!!errors.stageName)} placeholder="Nhập tên thi đấu" {...register('stageName')} />
          </Field>
          <Field label="Crew/nhóm/studio" required error={errors.crewName?.message}>
            <input className={fieldClass(!!errors.crewName)} placeholder="Nhập crew/nhóm/studio" {...register('crewName')} />
          </Field>
        </>}
      </div>

      {ticketType === 'competitor' && <>
      <div className="section-heading">
        <span>02</span>
        <div><h2>Nội dung thi đấu</h2><p>Chọn bảng đấu phù hợp nhất với bạn.</p></div>
      </div>

      <Field label="Bảng thi" required error={errors.category?.message}>
        <div className="choice-grid">
          {[['solo', 'Solo', '01 thí sinh'], ['duo', 'Duo', '02 thí sinh'], ['team', 'Team', '03–08 thí sinh']].map(([value, title, sub]) => (
            <label className="choice-card" key={value}>
              <input type="radio" value={value} {...register('category')} />
              <span><strong>{title}</strong><small>{sub}</small></span>
            </label>
          ))}
        </div>
      </Field>

      <div className="field-grid space-top">
        <Field label="Thể loại nhảy" required error={errors.danceStyle?.message}>
          <select className={fieldClass(!!errors.danceStyle)} defaultValue="" {...register('danceStyle')}>
            <option value="" disabled>Chọn thể loại</option>
            <option>Hip-hop</option><option>Choreography</option><option>Breaking</option>
            <option>Waacking</option><option>Popping</option><option>Open Style</option>
          </select>
        </Field>
        <Field label="Kinh nghiệm thi đấu" required error={errors.experience?.message}>
          <select className={fieldClass(!!errors.experience)} defaultValue="" {...register('experience')}>
            <option value="" disabled>Chọn kinh nghiệm</option>
            <option value="first-time">Lần đầu tham gia</option>
            <option value="under-1-year">Dưới 1 năm</option>
            <option value="1-3-years">1–3 năm</option>
            <option value="over-3-years">Trên 3 năm</option>
          </select>
        </Field>
        <Field label="Ghi chú" hint="Không bắt buộc" error={errors.note?.message}>
          <textarea className={fieldClass(!!errors.note)} placeholder="Điều BTC cần lưu ý..." rows={3} {...register('note')} />
        </Field>
      </div>
      </>}

      <label className={`terms${errors.acceptedTerms ? ' is-error' : ''}`}>
        <input type="checkbox" {...register('acceptedTerms')} />
        <span>Tôi xác nhận thông tin trên là chính xác và đồng ý với <a href="/rules" target="_blank">điều lệ NCG 3.0</a>.</span>
      </label>
      {errors.acceptedTerms && <p className="error-message terms-error">{errors.acceptedTerms.message}</p>}

      <button className="primary-button submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Đang gửi hồ sơ...' : `Tiếp tục · ${ticketPrice}`} <span aria-hidden="true">→</span>
      </button>
      <p className="privacy-note">Thông tin của bạn chỉ được sử dụng cho công tác tổ chức giải.</p>
    </form>
  )
}

function Field({ label, required, hint, error, children }: {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode
}) {
  return (
    <label className="field">
      <span className="field-label">{label}{required && <b> *</b>}{hint && <small>{hint}</small>}</span>
      {children}
      {error && <span className="error-message">{error}</span>}
    </label>
  )
}
