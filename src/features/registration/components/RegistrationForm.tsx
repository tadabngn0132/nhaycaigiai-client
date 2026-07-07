import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { createRegistration } from '../../../services/api'
import {
  type RegistrationData,
  registrationSchema,
} from '../model/registrationSchema'
import { getTicketPrice } from '../registrationOptions'
import { CompetitionSection } from './CompetitionSection'
import { PersonalInfoSection } from './PersonalInfoSection'
import { TicketSelector } from './TicketSelector'

type RegistrationFormProps = {
  onSubmitted?: () => void
}

export default function RegistrationForm({ onSubmitted }: RegistrationFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { ticketTypes: ['competitor'] },
  })
  const ticketTypes = useWatch({ control, name: 'ticketTypes' })
  const isCompetitor = ticketTypes.includes('competitor')

  async function submitRegistration(data: RegistrationData) {
    try {
      await createRegistration(data)
      toast.success('Đã tạo thông tin thanh toán')
      onSubmitted?.()
      navigate('/payment')
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Không thể gửi đăng ký. Vui lòng thử lại.'
      toast.error(message)
    }
  }

  return (
    <form className="w-full min-w-0" onSubmit={handleSubmit(submitRegistration)} noValidate>
      <TicketSelector register={register} error={errors.ticketTypes?.message} />
      <PersonalInfoSection ticketTypes={ticketTypes} register={register} errors={errors} />
      {isCompetitor && <CompetitionSection register={register} errors={errors} />}

      <div className="mb-4 flex min-h-12 flex-col items-start justify-between gap-1 rounded-lg border border-[#cec9c1] bg-[#f8f6f1] px-3.5 py-2.5 text-[13px] text-[#716d67] min-[381px]:flex-row min-[381px]:items-center">
        <span>Thành tiền:</span>
        <strong className="text-[17px] text-[#c92c35]">{getTicketPrice(ticketTypes)}</strong>
      </div>
      <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#5f5d57]">
        <input className="mt-0.5 size-[18px] shrink-0 accent-[#c92c35]" type="checkbox" {...register('acceptedTerms')} />
        <span className="wrap-break-word">
          Tôi xác nhận thông tin trên là chính xác và đồng ý với{' '}
          <a className="font-bold text-[#181817] underline-offset-2 hover:underline" href="/rules" target="_blank" rel="noreferrer">
            điều lệ NCG 3.0
          </a>.
        </span>
      </label>
      {errors.acceptedTerms && (
        <p className="mt-1 ml-7 text-[11px] text-[#a9272e]">{errors.acceptedTerms.message}</p>
      )}

      <button
        className="mt-4.5 flex min-h-12 w-full items-center justify-center rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#111110] px-6 text-sm font-extrabold tracking-wide text-[#f4f1ea] uppercase transition hover:-translate-y-0.5 hover:bg-[#222] disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Đang gửi hồ sơ...' : 'Gửi đăng ký'}
      </button>
      <p className="mt-3 text-center text-[11px] text-[#817c75]">
        Thông tin của bạn chỉ được sử dụng cho công tác tổ chức giải.
      </p>
    </form>
  )
}
