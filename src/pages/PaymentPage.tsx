import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { EmptyRegistration } from '../features/payment/components/EmptyRegistration'
import { PaymentDetails } from '../features/payment/components/PaymentDetails'
import { PaymentShell } from '../features/payment/components/PaymentShell'
import { RegistrationSummary } from '../features/payment/components/RegistrationSummary'

export default function PaymentPage() {
  const navigate = useNavigate()
  const registration = useAppSelector((state) => state.registration.current)

  if (!registration) {
    return (
      <PaymentShell>
        <EmptyRegistration />
      </PaymentShell>
    )
  }

  return (
    <PaymentShell>
      <section className="mx-auto grid max-w-280 gap-4 px-3 py-6 sm:px-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-6 lg:py-10">
        <PaymentDetails registration={registration} />
        <RegistrationSummary
          registration={registration}
          onConfirm={() => navigate('/confirmation')}
        />
      </section>
    </PaymentShell>
  )
}
