type RegistrationSuccessProps = {
  registrationCode: string
  onCreateAnother: () => void
}

export function RegistrationSuccess({
  registrationCode,
  onCreateAnother,
}: RegistrationSuccessProps) {
  return (
    <div className="px-2.5 py-12 text-center sm:px-5 sm:pt-16 sm:pb-8" role="status">
      <div className="mx-auto mb-7 grid size-17 place-items-center rounded-full border-2 border-[#c92c35] bg-[#111110] text-[32px] text-[#f4f1ea]">
        ✓
      </div>
      <p className="mb-4.5 text-[11px] font-bold tracking-[2.4px] text-[#c92c35] uppercase">
        Hẹn gặp bạn tại sàn đấu
      </p>
      <h2 className="mb-4 text-[28px] font-black uppercase sm:text-4xl">Đăng ký thành công!</h2>
      <p className="mx-auto max-w-md text-[13px] leading-relaxed text-[#74716a]">
        Hồ sơ của bạn đã được ghi nhận. Hãy lưu lại mã đăng ký để tra cứu khi cần.
      </p>
      <div className="mx-auto my-7 max-w-xs border border-dashed border-[#aaa69b] p-5">
        <span className="block text-[10px] tracking-wider text-[#89867e] uppercase">Mã đăng ký</span>
        <strong className="mt-2 block text-2xl tracking-widest">{registrationCode}</strong>
      </div>
      <button
        className="min-h-12 rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#111110] px-6 text-sm font-extrabold tracking-wide text-[#f4f1ea] uppercase transition hover:-translate-y-0.5 hover:bg-[#222]"
        type="button"
        onClick={onCreateAnother}
      >
        Tạo đăng ký khác
      </button>
    </div>
  )
}
