import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { fieldClass } from '../formStyles'
import type { RegistrationData } from '../model/registrationSchema'
import {
  COMPETITION_CATEGORIES,
  DANCE_STYLES,
  EXPERIENCE_LEVELS,
} from '../registrationOptions'
import { FormField } from './FormField'

type CompetitionSectionProps = {
  register: UseFormRegister<RegistrationData>
  errors: FieldErrors<RegistrationData>
}

export function CompetitionSection({ register, errors }: CompetitionSectionProps) {
  return (
    <fieldset className="mb-6 min-w-0 rounded-sm border border-[#cec9c1] px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
      <legend className="max-w-[calc(100%-8px)] rounded bg-[#111110] px-3 py-2 text-[13px] font-bold whitespace-normal text-[#f4f1ea] shadow-[inset_3px_0_#c92c35,0_4px_10px_rgba(17,17,16,.12)]">
        Thông tin đăng ký
      </legend>
      <FormField label="Bảng thi" required error={errors.category?.message}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {COMPETITION_CATEGORIES.map((category) => (
            <label className="relative" key={category.value}>
              <input className="peer sr-only" type="radio" value={category.value} {...register('category')} />
              <span className="flex cursor-pointer flex-col rounded-lg border border-[#cec9c1] bg-[#f8f6f1] px-3 py-2.5 transition peer-checked:border-[#111110] peer-checked:bg-[#111110] peer-checked:text-[#f4f1ea] peer-checked:shadow-[inset_0_-3px_#c92c35] peer-focus-visible:ring-3 peer-focus-visible:ring-[#c92c35]/25">
                <strong className="text-sm">{category.title}</strong>
                <small className="mt-1 text-[11px] text-[#8b8982]">{category.description}</small>
              </span>
            </label>
          ))}
        </div>
      </FormField>
      <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <FormField label="Thể loại nhảy" required error={errors.danceStyle?.message}>
          <select className={fieldClass(!!errors.danceStyle)} defaultValue="" {...register('danceStyle')}>
            <option value="" disabled>Chọn thể loại</option>
            {DANCE_STYLES.map((style) => <option key={style}>{style}</option>)}
          </select>
        </FormField>
        <FormField label="Kinh nghiệm thi đấu" required error={errors.experience?.message}>
          <select className={fieldClass(!!errors.experience)} defaultValue="" {...register('experience')}>
            <option value="" disabled>Chọn kinh nghiệm</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option value={level.value} key={level.value}>{level.label}</option>
            ))}
          </select>
        </FormField>
        <div className="md:col-span-2">
          <FormField label="Ghi chú" hint="Không bắt buộc" error={errors.note?.message}>
            <textarea className={fieldClass(!!errors.note)} placeholder="Điều BTC cần lưu ý..." rows={3} {...register('note')} />
          </FormField>
        </div>
      </div>
    </fieldset>
  )
}
