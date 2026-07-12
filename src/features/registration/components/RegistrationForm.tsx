import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import type { HomeProgramItem } from '../../home/model/homeTypes'
import {
  type RegistrationData,
  registrationSchema,
} from '../model/registrationSchema'
import { getTicketPrice } from '../registrationOptions'
import { submitRegistration as submitRegistrationThunk } from '../store/registrationSlice'
import { CompetitionSection } from './CompetitionSection'
import { PersonalInfoSection } from './PersonalInfoSection'
import { TicketSelector } from './TicketSelector'

type RegistrationFormProps = {
  onSubmitted?: () => void
  selectedProgram: HomeProgramItem
}

export default function RegistrationForm({ onSubmitted, selectedProgram }: RegistrationFormProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSubmitting = useAppSelector((state) => state.registration.status === 'submitting')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      programSlug: selectedProgram.slug,
      programTitle: selectedProgram.title,
      programType: selectedProgram.type === 'workshop' ? 'workshop' : 'competition',
      ticketTypes: selectedProgram.type === 'workshop' ? ['audience'] : ['competitor'],
    },
  })
  const ticketTypes = useWatch({ control, name: 'ticketTypes' }) ?? []
  const isCompetitor = ticketTypes.includes('competitor')
  const isWorkshop = selectedProgram.type === 'workshop'

  async function submitRegistration(data: RegistrationData) {
    try {
      await dispatch(submitRegistrationThunk(data)).unwrap()
      toast.success('Đăng ký thành công')
      onSubmitted?.()
      navigate('/confirmation')
    } catch (error) {
      const message = typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Không thể gửi đăng ký. Vui lòng thử lại.'
      toast.error(message)
    }
  }

  return (
    <form className="w-full min-w-0" onSubmit={handleSubmit(submitRegistration)} noValidate>
      <input type="hidden" {...register('programSlug')} />
      <input type="hidden" {...register('programTitle')} />
      <input type="hidden" {...register('programType')} />
      <div className="mb-4 rounded-sm border border-[#cec9c1] bg-[#f8f6f1] px-3.5 py-3">
        <p className="text-[10px] font-bold tracking-[2px] text-[#c92c35] uppercase">
          {isWorkshop ? 'Workshop đã chọn' : 'Giải đấu đã chọn'}
        </p>
        <strong className="mt-1 block text-lg font-black uppercase">{selectedProgram.title}</strong>
        <span className="mt-1 block text-[13px] leading-6 text-[#716d67]">
          {selectedProgram.schedule} · {selectedProgram.location}
        </span>
      </div>
      {!isWorkshop && <TicketSelector register={register} error={errors.ticketTypes?.message} />}
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
