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
        <aside className="event-intro">
          <p className="eyebrow">Dance competition · 2026</p>
          <h1>NHẢY CÁI<br /><em>GIẢI</em> 3.0</h1>
          <p className="intro-copy">Sàn đấu đã mở. Đăng ký để viết tiếp câu chuyện bằng từng chuyển động của bạn.</p>
          <dl className="event-meta">
            <div><dt>Ngày thi đấu</dt><dd>20.09.2026</dd></div>
            <div><dt>Địa điểm</dt><dd>Hà Nội, Việt Nam</dd></div>
            <div><dt>Hạn đăng ký</dt><dd>05.09.2026</dd></div>
          </dl>
        </aside>

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
