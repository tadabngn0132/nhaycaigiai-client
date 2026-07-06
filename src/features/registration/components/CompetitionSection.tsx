import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { fieldClass } from '../formStyles'
import type { RegistrationData } from '../model/registrationSchema'
import {
  COMPETITION_CATEGORIES,
  DANCE_STYLES,
  EXPERIENCE_LEVELS,
} from '../registrationOptions'
import { FormField } from './FormField'
import { SectionHeading } from './SectionHeading'

type CompetitionSectionProps = {
  register: UseFormRegister<RegistrationData>
  errors: FieldErrors<RegistrationData>
}

export function CompetitionSection({ register, errors }: CompetitionSectionProps) {
  return (
    <>
      <SectionHeading
        number="02"
        title="Nội dung thi đấu"
        description="Chọn bảng đấu phù hợp nhất với bạn."
      />
      <FormField label="Bảng thi" required error={errors.category?.message}>
        <div className="choice-grid">
          {COMPETITION_CATEGORIES.map((category) => (
            <label className="choice-card" key={category.value}>
              <input type="radio" value={category.value} {...register('category')} />
              <span>
                <strong>{category.title}</strong>
                <small>{category.description}</small>
              </span>
            </label>
          ))}
        </div>
      </FormField>
      <div className="field-grid space-top">
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
        <FormField label="Ghi chú" hint="Không bắt buộc" error={errors.note?.message}>
          <textarea className={fieldClass(!!errors.note)} placeholder="Điều BTC cần lưu ý..." rows={3} {...register('note')} />
        </FormField>
      </div>
    </>
  )
}
