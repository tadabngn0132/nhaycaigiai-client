type RegistrationSuccessProps = {
  registrationCode: string
  onCreateAnother: () => void
}

export function RegistrationSuccess({
  registrationCode,
  onCreateAnother,
}: RegistrationSuccessProps) {
  return (
    <div className="success-card" role="status">
      <div className="success-icon">✓</div>
      <p className="eyebrow">Hẹn gặp bạn tại sàn đấu</p>
      <h2>Đăng ký thành công!</h2>
      <p>Hồ sơ của bạn đã được ghi nhận. Hãy lưu lại mã đăng ký để tiếp tục thanh toán.</p>
      <div className="registration-code">
        <span>Mã đăng ký</span>
        <strong>{registrationCode}</strong>
      </div>
      <button className="primary-button" type="button" onClick={onCreateAnother}>
        Tạo đăng ký khác
      </button>
    </div>
  )
}
