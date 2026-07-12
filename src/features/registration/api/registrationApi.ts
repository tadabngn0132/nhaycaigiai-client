import { getApiErrorMessage } from '../../../shared/api/getApiErrorMessage'
import { httpClient } from '../../../shared/api/httpClient'
import type { RegistrationData } from '../model/registrationSchema'
import type { RegistrationResponse } from '../model/registrationTypes'

function toRegistrationError(error: unknown) {
  return new Error(getApiErrorMessage(error), { cause: error })
}

export async function createRegistration(data: RegistrationData): Promise<RegistrationResponse> {
  try {
    const response = await httpClient.post<RegistrationResponse>('/registrations', data)
    return response.data
  } catch (error) {
    throw toRegistrationError(error)
  }
}

export async function getRegistration(registrationCode: string) {
  try {
    const response = await httpClient.get(`/registrations/${encodeURIComponent(registrationCode)}`)
    return response.data
  } catch (error) {
    throw toRegistrationError(error)
  }
}
