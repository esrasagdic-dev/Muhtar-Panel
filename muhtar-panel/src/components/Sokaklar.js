import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { MapPin, Plus, Trash2, X, Search } from 'lucide-react';

const Sokaklar = () => {
    const [sokaklar, setSokaklar] = useState([]);
    const [modalAcik, setModalAcik] = useState(false);
    const [aramaMetni, setAramaMetni] = useState('');

    // Backend'deki SokakEkleDto (Ad) ile tam uyumlu
    const [yeniSokak, setYeniSokak] = useState({ ad: '' });

    useEffect(() => { fetchSokaklar(); }, []);

    const fetchSokaklar = () => {
        api.get('/Sokaklar')
            .then(res => {
                // Backend'den gelen veriyi işle
                const data = res.data.$values || res.data;
                setSokaklar(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error("Veri çekme hatası:", err));
    };

    const handleSokakKaydet = (e) => {
        e.preventDefault();
        api.post('/Sokaklar', yeniSokak)
            .then(() => {
                setModalAcik(false);
                setYeniSokak({ ad: '' });
                fetchSokaklar();
            })
            .catch(err => alert("Ekleme hatası: " + err.message));
    };

    const handleSokakSil = (id) => {
        if (window.confirm("Bu sokağı listeden silmek istediğinize emin misiniz?")) {
            api.delete(`/Sokaklar/${id}`).then(fetchSokaklar);
        }
    };

    // Arama filtresi: Sokak listesinde hızlıca bulmak için
    const filtrelenmişSokaklar = sokaklar.filter(s =>
        s.ad.toLowerCase().includes(aramaMetni.toLowerCase())
    );

    return (
        <div className="p-4 bg-light min-vh-100">
            {/* ÜST BAŞLIK VE ARAMA ALANI */}
            <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <div>
                        <h2 className="fw-bold mb-1 text-primary">📍 Mahalle Sokakları</h2>
                        <p className="text-muted mb-0">Ömerağa Mahallesi sokak listesini yönetin.</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center w-100 w-md-auto">
                        <div className="input-group flex-nowrap" style={{ minWidth: '250px' }}>
                            <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3">
                                <Search size={18} className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 rounded-end-pill py-2"
                                placeholder="Sokak adı ile ara..."
                                value={aramaMetni}
                                onChange={(e) => setAramaMetni(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary px-4 rounded-pill d-flex align-items-center gap-2 shadow-sm" onClick={() => setModalAcik(true)}>
                            <Plus size={18} /> <span>Ekle</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* SOKAK KARTLARI LİSTESİ */}
            <div className="row">
                {filtrelenmişSokaklar.map((sokak) => (
                    <div key={sokak.id} className="col-md-4 col-lg-3 mb-4">
                        <div className="card h-100 border-0 shadow-sm hover-shadow transition-all rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                                        <MapPin className="text-primary" size={24} />
                                    </div>
                                    <button
                                        className="btn btn-link text-danger p-0"
                                        onClick={() => handleSokakSil(sokak.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <h5 className="fw-bold text-dark mb-1">{sokak.ad}</h5>
                                <small className="text-muted">Ömerağa Mah. / Tepebaşı</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SOKAK EKLEME MODALI (Daha modern tasarım) */}
            {modalAcik && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal p-4 rounded-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold mb-0">Yeni Sokak Kaydı</h4>
                            <button className="btn btn-light rounded-circle" onClick={() => setModalAcik(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSokakKaydet}>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Sokak / Cadde Adı</label>
                                <input
                                    required
                                    autoFocus
                                    placeholder="Örn: Cengiz Topel Caddesi"
                                    className="form-control form-control-lg rounded-3"
                                    value={yeniSokak.ad}
                                    onChange={e => setYeniSokak({ ad: e.target.value })}
                                />
                                <div className="form-text mt-2">Dilekçelerde görünecek tam adı yazın.</div>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-light w-100 py-2" onClick={() => setModalAcik(false)}>İptal</button>
                                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Listeye Ekle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sokaklar;