import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { fieldClass } from '../formStyles'
import type { RegistrationData, TicketType } from '../model/registrationSchema'
import { CITIES } from '../registrationOptions'
import { FormField } from './FormField'
import { SectionHeading } from './SectionHeading'

type PersonalInfoSectionProps = {
  ticketType: TicketType
  register: UseFormRegister<RegistrationData>
  errors: FieldErrors<RegistrationData>
}

export function PersonalInfoSection({ ticketType, register, errors }: PersonalInfoSectionProps) {
  const isCompetitor = ticketType === 'competitor'

  return (
    <>
      <SectionHeading title="Thông tin cá nhân" className="personal-heading" />
      <div className="field-grid personal-grid">
        <FormField label="Họ và tên" required error={errors.fullName?.message}>
          <input className={fieldClass(!!errors.fullName)} placeholder="Nhập họ tên" autoComplete="name" {...register('fullName')} />
        </FormField>
        <FormField label="Số điện thoại" required error={errors.phone?.message}>
          <input className={fieldClass(!!errors.phone)} placeholder="Nhập số điện thoại" inputMode="tel" autoComplete="tel" {...register('phone')} />
        </FormField>
        <FormField label="Email" required error={errors.email?.message}>
          <input type="email" className={fieldClass(!!errors.email)} placeholder="Nhập email" autoComplete="email" {...register('email')} />
        </FormField>
        <FormField label="Ngày sinh" required error={errors.dateOfBirth?.message}>
          <input type="date" className={fieldClass(!!errors.dateOfBirth)} {...register('dateOfBirth')} />
        </FormField>
        <FormField label="Instagram/Facebook" hint="Nếu có" error={errors.socialLink?.message}>
          <input type="url" className={fieldClass(!!errors.socialLink)} placeholder="Link Instagram/Facebook" {...register('socialLink')} />
        </FormField>
        <FormField label="Tỉnh / Thành phố" required error={errors.city?.message}>
          <select className={fieldClass(!!errors.city)} defaultValue="" {...register('city')}>
            <option value="" disabled>-- Chọn tỉnh thành --</option>
            {CITIES.map((city) => <option key={city}>{city}</option>)}
          </select>
        </FormField>
        {isCompetitor && (
          <>
            <FormField label="Tên thi đấu" required error={errors.stageName?.message}>
              <input className={fieldClass(!!errors.stageName)} placeholder="Nhập tên thi đấu" {...register('stageName')} />
            </FormField>
            <FormField label="Crew/nhóm/studio" required error={errors.crewName?.message}>
              <input className={fieldClass(!!errors.crewName)} placeholder="Nhập crew/nhóm/studio" {...register('crewName')} />
            </FormField>
          </>
        )}
      </div>
    </>
  )
}
