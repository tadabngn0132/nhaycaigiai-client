export function fieldClass(hasError: boolean) {
  const baseClass = [
    'min-h-12 w-full min-w-0 rounded-lg border bg-[#f8f6f1] px-3 py-2.5',
    'text-base text-[#181817] outline-none transition',
    'md:min-h-11 md:text-[13px]',
    'focus:border-[#c92c35] focus:ring-3 focus:ring-[#c92c35]/10',
  ].join(' ')

  return `${baseClass} ${hasError ? 'border-[#a9272e]' : 'border-[#cec9c1]'}`
}
