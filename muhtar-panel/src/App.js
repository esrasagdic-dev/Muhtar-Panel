import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Sakinler from './components/Sakinler';
import Duyurular from './components/Duyurular';
import Notlar from './components/Notlar';
import MuhtarIslem from './components/MuhtarIslem';
import Login from './components/Login';
import IhtiyacSahipleri from './components/IhtiyacSahipleri';
import KamuKuruluslari from './components/KamuKuruluslari';
import EngelliSakinler from './components/EngelliSakinler';
import DilekceOlusturucu from './components/DilekceOlusturucu';
import './App.css';
import Sokaklar from './components/Sokaklar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Giriş yapılmamışsa Login ekranına yönlendir
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar bileşenine yetki state'ini gönderiyoruz */}
        <Sidebar setIsAuthenticated={setIsAuthenticated} />

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sakinler" element={<Sakinler />} />
            <Route path="/sokaklar" element={<Sokaklar />} />
            <Route path="/duyurular" element={<Duyurular />} />
            <Route path="/muhtar-islem" element={<MuhtarIslem />} />
            <Route path="/notlar" element={<Notlar />} />

            {/* MODÜLLER */}
            <Route path="/ihtiyac-sahipleri" element={<IhtiyacSahipleri />} />
            <Route path="/kamu-kuruluslari" element={<KamuKuruluslari />} />
            <Route path="/engelli-takibi" element={<EngelliSakinler />} />

            {/* DİLEKÇE MODÜLÜ ROTASI */}
            <Route path="/dilekce-olustur" element={<DilekceOlusturucu />} />

            {/* Yanlış bir URL girilirse Dashboard'a dön */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;