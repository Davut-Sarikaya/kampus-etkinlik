// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--renk-ana)' }}>404</h1>
      <h2>Aradığınız sayfa bulunamadı!</h2>
      <Link to="/" className="btn-action" style={{ marginTop: '1rem', display: 'inline-block' }}>Ana Sayfaya Dön</Link>
    </div>
  );
}

export default NotFoundPage;