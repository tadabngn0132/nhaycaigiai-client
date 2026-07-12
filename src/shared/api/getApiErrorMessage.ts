import { AxiosError } from 'axios'

type ApiErrorResponse = {
  message?: string
  details?: Record<string, string>
}

export function getApiErrorMessage(error: unknown) {
  if (!(error instanceof AxiosError)) {
    return error instanceof Error ? error.message : 'Không thể kết nối máy chủ.'
  }

  const response = error.response?.data as ApiErrorResponse | undefined
  const validationMessage = response?.details && Object.values(response.details)[0]

  if (validationMessage) return validationMessage
  if (response?.message) return response.message
  if (error.code === 'ECONNABORTED') return 'Máy chủ phản hồi quá lâu. Vui lòng thử lại.'
  if (!error.response) return 'Không thể kết nối máy chủ. Vui lòng kiểm tra server đang chạy.'

  return 'Máy chủ đang bận. Vui lòng thử lại sau.'
}
