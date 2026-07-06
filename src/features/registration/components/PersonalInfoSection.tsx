import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { fieldClass } from '../formStyles'
import type { RegistrationData, TicketType } from '../model/registrationSchema'
import { CITIES } from '../registrationOptions'
import { FormField } from './FormField'

type PersonalInfoSectionProps = {
  ticketTypes: TicketType[]
  register: UseFormRegister<RegistrationData>
  errors: FieldErrors<RegistrationData>
}

export function PersonalInfoSection({ ticketTypes, register, errors }: PersonalInfoSectionProps) {
  const isCompetitor = ticketTypes.includes('competitor')

  return (
    <fieldset className="mb-6 min-w-0 rounded-sm border border-[#cec9c1] px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
      <legend className="max-w-[calc(100%-8px)] rounded bg-[#111110] px-3 py-2 text-[13px] font-bold whitespace-normal text-[#f4f1ea] shadow-[inset_3px_0_#c92c35,0_4px_10px_rgba(17,17,16,.12)]">
        Thông tin cá nhân
      </legend>
      <div className={`grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-6 [&>label]:lg:col-span-2 ${isCompetitor ? '[&>label:nth-last-child(-n+2)]:lg:col-span-3' : ''}`}>
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
    </fieldset>
  )
}
