export function fieldClass(hasError: boolean) {
  return `form-control${hasError ? ' is-error' : ''}`
}
