type HomeHeaderProps = {
  onRegister: () => void
}

export function HomeHeader({ onRegister }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-17 items-center justify-between border-b border-[#f4f1ea]/15 bg-[#111110]/85 px-3.5 backdrop-blur min-[381px]:px-6 md:h-20 md:px-[5vw]">
      <a className="flex items-center text-[20px] font-black tracking-tight no-underline md:text-[24px]" href="/" aria-label="Nhảy Cái Giải">
        NHẢY CÁI GIẢI
      </a>
      <button
        className="min-h-10 rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-4 text-xs font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
        onClick={onRegister}
        type="button"
      >
        Đăng ký
      </button>
    </header>
  )
}
