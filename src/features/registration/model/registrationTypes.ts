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
  programTitle: string
  programType: 'competition' | 'workshop'
  email: string
  fullName: string
}
