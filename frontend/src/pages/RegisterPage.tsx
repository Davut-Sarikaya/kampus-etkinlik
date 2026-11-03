// src/pages/RegisterPage.tsx
import { useState } from 'react';

function RegisterPage() {
  // Kullanıcının yazdığı bilgileri tutacağımız yer
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // İleride buraya boşlukları kontrol etme (hata mesajları) kodunu ekleyeceğiz
    console.log("Kayıt olmak isteyen:", formData);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <form onSubmit={handleSubmit} noValidate>
        
        <div className="form-grup">
          <label htmlFor="name">Ad Soyad</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="form-grup">
          <label htmlFor="passwordConfirm">Şifre (tekrar)</label>
          <input
            type="password"
            id="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Kayıt ol
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
         <a href="/login" style={{ color: 'var(--renk-ana)' }}>
            Zaten hesabın var mı? Giriş yap
         </a>
      </div>
    </div>
  );
}

export default RegisterPage;