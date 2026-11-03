// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    // Hocanın istediği form doğrulama (validation) kuralları
    if (!email.includes('@')) {
      newErrors.email = 'Geçerli bir e-posta girin.';
    }
    if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Giriş başarılı!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            className={errors.email ? 'is-invalid' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </div>

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            className={errors.password ? 'is-invalid' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </div>

        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
          Giriş yap
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
        <Link to="/forgot-password" style={{ color: 'var(--renk-ana)' }}>
          Şifremi unuttum
        </Link>
        <Link to="/register" style={{ color: 'var(--renk-ana)' }}>
          Hesabın yok mu? Kayıt ol
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;