import RegistrationForm from '../components/forms/RegistrationForm'

export default function RegistrationPage() {
  return (
    <main>
      <header className="event-header">
        <a className="brand" href="/" aria-label="NCG 3.0">
          <span>NCG</span><strong>3.0</strong>
        </a>
        <span className="registration-status"><i /> Đang mở đăng ký</span>
      </header>

      <section className="registration-layout">
        <div className="form-panel">
          <div className="form-title">
            <p className="eyebrow">Registration form</p>
            <h2>Đăng ký dự thi</h2>
            <p>Điền đầy đủ thông tin bên dưới để giữ suất thi đấu tại NCG 3.0.</p>
          </div>
          <RegistrationForm />
        </div>
      </section>
      <footer><span>© 2026 NCG</span><span>Move loud. Dance proud.</span></footer>
    </main>
  )
}
