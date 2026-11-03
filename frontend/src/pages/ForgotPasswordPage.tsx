// src/pages/ForgotPasswordPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      setSuccess(false);
    } else {
      setError('');
      setSuccess(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Şifremi Unuttum</h2>
      {success ? (
        <div className="success-box">Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!</div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grup">
            <label>E-posta Adresiniz</label>
            <input type="email" className={error ? 'is-invalid' : ''} value={email} onChange={e => setEmail(e.target.value)} />
            {error && <div className="error-msg">{error}</div>}
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Sıfırlama Bağlantısı Gönder</button>
        </form>
      )}
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Link to="/login" style={{ color: 'var(--renk-ana)', fontSize: '0.9rem' }}>Giriş sayfasına dön</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;