import type { HomeProgramItem } from '../../home/model/homeTypes'
import RegistrationForm from './RegistrationForm'

type RegistrationModalProps = {
  contextLabel?: string
  open: boolean
  onClose: () => void
  selectedProgram: HomeProgramItem
}

export function RegistrationModal({
  contextLabel,
  open,
  onClose,
  selectedProgram,
}: RegistrationModalProps) {
  if (!open) return null

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-[#111110]/78 px-2.5 py-4 backdrop-blur-sm sm:px-4"
      onMouseDown={onClose}
      role="dialog"
    >
      <div
        className="max-h-[min(92vh,900px)] w-full max-w-5xl overflow-y-auto rounded-xl bg-[#efede7] p-3 text-[#181817] shadow-[0_28px_90px_rgba(0,0,0,.55)] sm:p-4"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3 border-b border-[#d7d2c8] pb-3">
          <div>
            <p className="text-[10px] font-bold tracking-[2px] text-[#c92c35] uppercase">NCG 3.0</p>
            <h2 className="mt-1 text-xl font-black uppercase">Đăng ký tham gia</h2>
            {contextLabel && (
              <p className="mt-1 text-[12px] font-semibold text-[#716d67]">
                Dang ky: {contextLabel}
              </p>
            )}
          </div>
          <button
            aria-label="Đóng đăng ký"
            className="grid size-10 shrink-0 place-items-center rounded-sm border border-[#cec9c1] bg-[#f8f6f1] text-2xl leading-none text-[#181817] transition hover:border-[#111110]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <RegistrationForm selectedProgram={selectedProgram} onSubmitted={onClose} />
      </div>
    </div>
  )
}
