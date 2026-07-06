import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createRegistration } from '../../../services/api'
import {
  type RegistrationData,
  registrationSchema,
} from '../model/registrationSchema'
import { getTicketPrice } from '../registrationOptions'
import { CompetitionSection } from './CompetitionSection'
import { PersonalInfoSection } from './PersonalInfoSection'
import { RegistrationSuccess } from './RegistrationSuccess'
import { TicketSelector } from './TicketSelector'

export default function RegistrationForm() {
  const [registrationCode, setRegistrationCode] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { ticketType: 'competitor' },
  })
  const ticketType = useWatch({ control, name: 'ticketType' })
  const isCompetitor = ticketType === 'competitor'

  async function submitRegistration(data: RegistrationData) {
    try {
      const result = await createRegistration(data)
      setRegistrationCode(result.registrationCode)
      toast.success('Đăng ký thành công!')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Không thể gửi đăng ký. Vui lòng thử lại.'
      toast.error(message)
    }
  }

  if (registrationCode) {
    return (
      <RegistrationSuccess
        registrationCode={registrationCode}
        onCreateAnother={() => setRegistrationCode('')}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(submitRegistration)} noValidate>
      <TicketSelector register={register} />
      <PersonalInfoSection ticketType={ticketType} register={register} errors={errors} />
      {isCompetitor && <CompetitionSection register={register} errors={errors} />}

      <label className={`terms${errors.acceptedTerms ? ' is-error' : ''}`}>
        <input type="checkbox" {...register('acceptedTerms')} />
        <span>
          Tôi xác nhận thông tin trên là chính xác và đồng ý với{' '}
          <a href="/rules" target="_blank" rel="noreferrer">điều lệ NCG 3.0</a>.
        </span>
      </label>
      {errors.acceptedTerms && (
        <p className="error-message terms-error">{errors.acceptedTerms.message}</p>
      )}

      <button className="primary-button submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Đang gửi hồ sơ...' : `Tiếp tục · ${getTicketPrice(ticketType)}`}
        <span aria-hidden="true">→</span>
      </button>
      <p className="privacy-note">
        Thông tin của bạn chỉ được sử dụng cho công tác tổ chức giải.
      </p>
    </form>
  )
}
