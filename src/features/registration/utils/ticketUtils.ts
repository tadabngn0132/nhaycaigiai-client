import type { TicketType } from '../model/registrationSchema'
import { TICKETS } from '../config/registrationOptions'

export function getTicketPrice(ticketTypes: TicketType[]) {
  return formatCurrency(getTicketTotal(ticketTypes))
}

export function getTicketTotal(ticketTypes: TicketType[]) {
  return TICKETS
    .filter((ticket) => ticketTypes.includes(ticket.value))
    .reduce((sum, ticket) => sum + ticket.priceValue, 0)
}

export function formatCurrency(value: number) {
  return `${value.toLocaleString('vi-VN')} VNĐ`
}

export function getTicketSummary(ticketTypes: TicketType[]) {
  return TICKETS
    .filter((ticket) => ticketTypes.includes(ticket.value))
    .map((ticket) => ticket.title)
    .join(' + ')
}
