const ACTIVE_CELLS = [3, 5, 9, 11, 14, 17, 19, 23, 25, 29, 31, 34, 38, 41, 45]

export function PaymentQr({ registrationCode }: { registrationCode: string }) {
  return (
    <div className="rounded-lg border border-[#d8d3ca] bg-white p-3 shadow-[0_10px_28px_rgba(17,17,16,.08)]">
      <div className="grid aspect-square grid-cols-7 gap-1 bg-white p-2">
        {Array.from({ length: 49 }).map((_, index) => {
          const row = Math.floor(index / 7)
          const col = index % 7
          const isFinder = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
          const isActive = isFinder || ACTIVE_CELLS.includes(index)

          return (
            <span
              className={`rounded-[2px] ${isActive ? 'bg-[#111110]' : 'bg-[#ece8df]'}`}
              key={`${registrationCode}-${index}`}
            />
          )
        })}
      </div>
      <span className="mt-3 block text-center text-[10px] font-bold tracking-wider text-[#817c75] uppercase">
        Mock QR
      </span>
    </div>
  )
}
