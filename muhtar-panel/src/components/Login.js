import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { User, Lock, LogIn, ShieldCheck } from 'lucide-react';
import '../css/Login.css';

// 1. ADIM: Fonksiyona { setIsAuthenticated } prop'unu ekledik
const Login = ({ setIsAuthenticated }) => {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setHata('');

    try {
      const response = await api.post('/Auth/login', {
        KullaniciAdi: kullaniciAdi,
        Sifre: sifre
      });

      if (response.data.basarili || response.data) {
        // Veriyi kaydet
        localStorage.setItem('user', JSON.stringify(response.data));

        // 2. ADRES: App.js'e girişin başarılı olduğunu söyle (Kritik nokta burası!)
        setIsAuthenticated(true);

        // 3. ADIM: Dashboard'a yönlendir
        console.log("Giriş Başarılı, Dashboard'a gidiliyor...");
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Login Hatası Detay:", err.response?.status);
      if (err.response?.status === 401) {
        setHata('Kullanıcı adı veya şifre hatalı!');
      } else {
        setHata('Sunucu bağlantı hatası!');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <div className="logo-icon">
            <ShieldCheck size={40} color="#6366f1" />
          </div>
          <h2>Muhtar Yönetim Portalı</h2>
          <p>Devam etmek için lütfen giriş yapın</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={kullaniciAdi}
              onChange={(e) => setKullaniciAdi(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Şifre"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              required
            />
          </div>

          {hata && <div className="error-message">{hata}</div>}

          <button type="submit" className="login-btn">
            <span>Giriş Yap</span>
            <LogIn size={20} />
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 Yazır Mahallesi Muhtarlığı</p>
        </div>
      </div>
    </div>
  );
};

export default Login;