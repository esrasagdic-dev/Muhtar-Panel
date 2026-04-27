import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutDashboard, RefreshCcw } from 'lucide-react';
import Istatistik from '../components/Istatistik';
import '../css/Istatistik.css';

const Dashboard = () => {
    const [veriler, setVeriler] = useState(null);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [hata, setHata] = useState(null);

    // API'den verileri çeken ana fonksiyon
    const veriGetir = async () => {
        setYukleniyor(true);
        try {
            const response = await axios.get('https://localhost:7034/api/Istatistik/ozet');
            setVeriler(response.data);
            setHata(null);
        } catch (err) {
            console.error("Veri çekme hatası:", err);
            setHata("Sunucuya bağlanılamadı. Lütfen backend'in çalıştığından emin olun.");
        } finally {
            setYukleniyor(false);
        }
    };

    useEffect(() => {
        veriGetir();
    }, []);

    return (
        <div className="dashboard-wrapper min-vh-100 pb-5" style={{ backgroundColor: '#f4f7f6' }}>
            {/* Üst Menü / Navbar */}
            <div className="bg-white border-bottom shadow-sm mb-4">
                <div className="container-fluid py-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <LayoutDashboard className="text-primary" size={28} />
                        <h4 className="fw-bold mb-0 text-dark">Ömerağa Mahallesi Yönetim Paneli</h4>
                    </div>
                    <button
                        onClick={veriGetir}
                        className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 rounded-pill px-3"
                        disabled={yukleniyor}
                    >
                        <RefreshCcw size={16} className={yukleniyor ? "animate-spin" : ""} />
                        Verileri Tazele
                    </button>
                </div>
            </div>

            <div className="container-fluid px-4">
                {/* Durum Ekranları (Yükleniyor / Hata) */}
                {yukleniyor && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted fw-medium">Veriler güncelleniyor...</p>
                    </div>
                )}

                {hata && (
                    <div className="alert alert-danger rounded-4 shadow-sm d-flex align-items-center gap-3">
                        <span>⚠️</span> {hata}
                    </div>
                )}

                {/* ANA İÇERİK: Tüm görselleştirme Istatistik.js içinde yapılıyor */}
                {!yukleniyor && !hata && veriler && (
                    <Istatistik data={veriler} />
                )}
            </div>

            {/* Footer */}
            {!yukleniyor && veriler && (
                <div className="container-fluid mt-5 text-center text-muted small border-top pt-3">
                    Son Veri Güncelleme: <span className="fw-bold">{veriler.sonGuncellemeTarihi}</span>
                </div>
            )}
        </div>
    );
};

export default Dashboard;