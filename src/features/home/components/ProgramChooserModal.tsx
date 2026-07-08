import { Link } from 'react-router-dom'
import { registrationPrograms } from '../homeData'

type ProgramChooserModalProps = {
  open: boolean
  onClose: () => void
}

export function ProgramChooserModal({ open, onClose }: ProgramChooserModalProps) {
  if (!open) return null

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-[#111110]/78 px-3 py-4 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <div
        className="flex max-h-[calc(100vh-32px)] w-full max-w-4xl flex-col rounded-lg bg-[#efede7] p-4 text-[#181817] shadow-[0_28px_90px_rgba(0,0,0,.55)] sm:p-5"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex shrink-0 items-start justify-between gap-3 border-b border-[#d7d2c8] pb-3">
          <div>
            <p className="text-[10px] font-bold tracking-[2px] text-[#c92c35] uppercase">Chọn nội dung</p>
            <h2 className="mt-1 text-xl font-black uppercase">Đăng ký giải đấu / workshop</h2>
          </div>
          <button
            aria-label="Đóng"
            className="grid size-10 shrink-0 place-items-center rounded-sm border border-[#cec9c1] bg-[#f8f6f1] text-2xl leading-none transition hover:border-[#111110]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="grid min-h-0 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
          {registrationPrograms.map((program) => (
            <Link
              className="group grid min-h-34 rounded-sm border border-[#d7d2c8] bg-[#f8f6f1] p-3.5 text-[#181817] no-underline transition hover:-translate-y-0.5 hover:border-[#111110] hover:shadow-[inset_0_-3px_#c92c35]"
              key={program.slug}
              onClick={onClose}
              to={`/program/${program.slug}`}
            >
              <span className="text-[10px] font-bold tracking-[2px] text-[#c92c35] uppercase">
                {program.type === 'competition' ? 'Giải đấu' : 'Workshop'} · {program.label}
              </span>
              <strong className="mt-2 text-lg font-black uppercase">{program.title}</strong>
              <span className="mt-2 text-sm leading-6 text-[#716d67]">{program.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
