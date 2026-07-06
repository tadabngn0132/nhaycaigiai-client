import type { RegistrationData } from '../components/forms/RegistrationForm'

type RegistrationResponse = { registrationCode: string }

const API_URL = import.meta.env.VITE_API_URL as string | undefined

export async function createRegistration(data: RegistrationData): Promise<RegistrationResponse> {
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const registrationCode = `NCG30-${Date.now().toString().slice(-6)}`
    const registrations = JSON.parse(localStorage.getItem('ncg30-registrations') ?? '[]')
    localStorage.setItem('ncg30-registrations', JSON.stringify([...registrations, { ...data, registrationCode }]))
    return { registrationCode }
  }

  const response = await fetch(`${API_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Máy chủ đang bận. Vui lòng thử lại sau.')
  return response.json()
}
