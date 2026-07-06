import type { UseFormRegister } from 'react-hook-form'
import type { RegistrationData } from '../model/registrationSchema'
import { TICKETS } from '../registrationOptions'

type TicketSelectorProps = {
  register: UseFormRegister<RegistrationData>
  error?: string
}

export function TicketSelector({ register, error }: TicketSelectorProps) {
  return (
    <fieldset className="mb-6 min-w-0 rounded-sm border border-[#cec9c1] px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
      <legend className="max-w-[calc(100%-8px)] rounded bg-[#111110] px-3 py-2 text-[13px] font-bold whitespace-normal text-[#f4f1ea] shadow-[inset_3px_0_#c92c35,0_4px_10px_rgba(17,17,16,.12)]">
        Loại vé tham gia
      </legend>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {TICKETS.map((ticket) => (
          <label className="relative min-w-0" key={ticket.value}>
            <input className="peer sr-only" type="checkbox" value={ticket.value} {...register('ticketTypes')} />
            <span className="grid min-h-16 min-w-0 cursor-pointer grid-cols-1 rounded-lg border border-[#cec9c1] bg-[#f8f6f1] px-3 py-3 transition peer-checked:border-[#111110] peer-checked:bg-[#111110] peer-checked:text-[#f4f1ea] peer-checked:shadow-[inset_0_-4px_#c92c35] peer-focus-visible:ring-3 peer-focus-visible:ring-[#c92c35]/25 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-3.5">
              <i className="mb-1 text-[11px] font-bold tracking-wider text-[#c92c35] not-italic uppercase">
                {ticket.badge}
              </i>
              <strong className="col-start-1 text-[15px]">{ticket.title}</strong>
              <small className="col-start-1 mt-1 min-w-0 text-[11px] leading-snug text-[#85827a] peer-checked:text-[#aaa]">
                {ticket.description}
              </small>
              <b className="mt-2 text-base font-extrabold sm:col-start-2 sm:row-span-3 sm:row-start-1 sm:mt-0 sm:ml-3 sm:self-center">
                {ticket.price}
              </b>
            </span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-[11px] text-[#a9272e]">{error}</p>}
    </fieldset>
  )
}
