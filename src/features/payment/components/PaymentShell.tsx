import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function PaymentShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#111110] font-['Be_Vietnam_Pro',sans-serif] text-[#f4f1ea] [background:radial-gradient(circle_at_18%_18%,rgba(201,44,53,.13),transparent_28%),linear-gradient(145deg,#1a1918,#111110_58%)]">
      <header className="flex h-17 items-center justify-between border-b border-[#f4f1ea]/15 bg-[#111110]/85 px-3.5 min-[381px]:px-6 md:h-20 md:px-[5vw]">
        <Link className="flex items-center text-[21px] font-black tracking-[-1px] text-[#f4f1ea] no-underline md:text-[25px]" to="/">
          <span>NCG</span>
          <strong className="ml-1.5 rotate-[-8deg] rounded-full border-2 border-current p-1 text-[11px] text-[#df454d] md:text-sm">3.0</strong>
        </Link>
      </header>
      {children}
    </main>
  )
}
