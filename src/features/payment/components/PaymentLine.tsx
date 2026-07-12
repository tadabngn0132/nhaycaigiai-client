type PaymentLineProps = {
  label: string
  value: string
  strong?: boolean
  accent?: boolean
}

export function PaymentLine({ label, value, strong, accent }: PaymentLineProps) {
  return (
    <div className="rounded-lg border border-[#ded9cf] bg-white px-3 py-2.5">
      <span className="block text-[10px] font-bold tracking-wider text-[#817c75] uppercase">{label}</span>
      <span className={`mt-1 block wrap-break-word text-[13px] ${strong ? 'font-extrabold' : 'font-semibold'} ${accent ? 'text-[#c92c35]' : 'text-[#181817]'}`}>
        {value}
      </span>
    </div>
  )
}
