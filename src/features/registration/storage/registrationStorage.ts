import type { RegistrationResponse } from '../model/registrationTypes'

const CURRENT_REGISTRATION_STORAGE_KEY = 'ncg30-current-registration'

export function setCurrentRegistration(registration: RegistrationResponse | null) {
  if (!registration) {
    localStorage.removeItem(CURRENT_REGISTRATION_STORAGE_KEY)
    return
  }

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
