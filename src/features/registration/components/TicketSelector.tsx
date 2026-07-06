import type { UseFormRegister } from 'react-hook-form'
import type { RegistrationData } from '../model/registrationSchema'
import { TICKETS } from '../registrationOptions'
import { SectionHeading } from './SectionHeading'

type TicketSelectorProps = {
  register: UseFormRegister<RegistrationData>
}

export function TicketSelector({ register }: TicketSelectorProps) {
  return (
    <>
      <SectionHeading
        number="01"
        title="Chọn loại vé"
        description="Chọn cách bạn sẽ tham gia NCG 3.0."
        className="ticket-heading"
      />
      <div className="ticket-grid">
        {TICKETS.map((ticket) => (
          <label className="ticket-card" key={ticket.value}>
            <input type="radio" value={ticket.value} {...register('ticketType')} />
            <span className="ticket-content">
              <i>{ticket.badge}</i>
              <strong>{ticket.title}</strong>
              <small>{ticket.description}</small>
              <b>{ticket.price}</b>
            </span>
          </label>
        ))}
      </div>
    </>
  )
}
