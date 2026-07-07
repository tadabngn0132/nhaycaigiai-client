import type { RegistrationData } from '../features/registration/model/registrationSchema'
import { getTicketSummary, getTicketTotal } from '../features/registration/registrationOptions'

export type BankInfo = {
  bankName: string
  accountNumber: string
  accountName: string
  branch: string
}

export type RegistrationResponse = {
  registrationCode: string
  amount: number
  transferContent: string
  bankInfo: BankInfo
  ticketSummary: string
  email: string
  fullName: string
}

const API_URL = import.meta.env.VITE_API_URL as string | undefined
const REGISTRATIONS_STORAGE_KEY = 'ncg30-registrations'
const CURRENT_REGISTRATION_STORAGE_KEY = 'ncg30-current-registration'

const MOCK_BANK_INFO: BankInfo = {
  bankName: 'Techcombank',
  accountNumber: '1903 2026 3000',
  accountName: 'CONG TY TO CHUC SU KIEN NCG',
  branch: 'Chi nhánh Hà Nội',
}

export async function createRegistration(data: RegistrationData): Promise<RegistrationResponse> {
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const registrationCode = `NCG30-${Date.now().toString().slice(-6)}`
    const registration: RegistrationResponse = {
      registrationCode,
      amount: getTicketTotal(data.ticketTypes),
      transferContent: `${registrationCode} ${data.fullName}`.toUpperCase(),
      bankInfo: MOCK_BANK_INFO,
      ticketSummary: getTicketSummary(data.ticketTypes),
      email: data.email,
      fullName: data.fullName,
    }
    const registrations: Array<RegistrationData & RegistrationResponse> = JSON.parse(
      localStorage.getItem(REGISTRATIONS_STORAGE_KEY) ?? '[]',
    )
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify([...registrations, { ...data, ...registration }]))
    setCurrentRegistration(registration)
    return registration
  }

  const response = await fetch(`${API_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Máy chủ đang bận. Vui lòng thử lại sau.')
  }

  const registration = await response.json() as RegistrationResponse
  setCurrentRegistration(registration)
  return registration
}

export function setCurrentRegistration(registration: RegistrationResponse) {
  localStorage.setItem(CURRENT_REGISTRATION_STORAGE_KEY, JSON.stringify(registration))
}

export function getCurrentRegistration(): RegistrationResponse | null {
  const rawRegistration = localStorage.getItem(CURRENT_REGISTRATION_STORAGE_KEY)

  if (!rawRegistration) return null

  try {
    return JSON.parse(rawRegistration) as RegistrationResponse
  } catch {
    localStorage.removeItem(CURRENT_REGISTRATION_STORAGE_KEY)
    return null
  }
}
