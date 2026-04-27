import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Building2, Phone, MapPin, User, Trash2 } from 'lucide-react';
import '../css/KamuKuruluslari.css';

const KamuKuruluslari = () => {
    const [kurumlar, setKurumlar] = useState([]);
    const [yeniKurum, setYeniKurum] = useState({ kurumAdi: '', kurumTuru: 'Okul', yetkiliKisi: '', telefon: '', adres: '' });

    const veriGetir = async () => {
        try {
            const res = await api.get('/KamuKurulusu');
            setKurumlar(res.data.$values || res.data);
        } catch (err) { console.error("Veri çekilemedi", err); }
    };

    useEffect(() => { veriGetir(); }, []);

    const handleEkle = async () => {
        if (!yeniKurum.kurumAdi) return alert("Kurum adını yazmalısın!");
        try {
            await api.post('/KamuKurulusu', yeniKurum);
            setYeniKurum({ kurumAdi: '', kurumTuru: 'Okul', yetkiliKisi: '', telefon: '', adres: '' });
            veriGetir();
        } catch (err) { alert("Ekleme hatası!"); }
    };

    const handleSil = async (id) => {
        if (window.confirm("Bu kurumu rehberden silmek istiyor musunuz?")) {
            await api.delete(`/KamuKurulusu/${id}`);
            veriGetir();
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4 fw-bold text-primary border-bottom pb-2">🏛️ Mahalle Kamu Kuruluşları Rehberi</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm border-0 border-top border-primary border-4">
                        <h6 className="fw-bold mb-3">Yeni Kurum Ekle</h6>
                        <input className="form-control mb-2" placeholder="Kurum Adı" value={yeniKurum.kurumAdi} onChange={e => setYeniKurum({ ...yeniKurum, kurumAdi: e.target.value })} />
                        <select className="form-select mb-2" value={yeniKurum.kurumTuru} onChange={e => setYeniKurum({ ...yeniKurum, kurumTuru: e.target.value })}>
                            <option value="Okul">🏫 Okul</option>
                            <option value="Cami">🕌 Cami</option>
                            <option value="Sağlık Ocağı">🏥 Sağlık Ocağı</option>
                            <option value="Karakol">👮 Karakol</option>
                        </select>
                        <input className="form-control mb-2" placeholder="Yetkili Kişi" value={yeniKurum.yetkiliKisi} onChange={e => setYeniKurum({ ...yeniKurum, yetkiliKisi: e.target.value })} />
                        <input className="form-control mb-2" placeholder="Telefon" value={yeniKurum.telefon} onChange={e => setYeniKurum({ ...yeniKurum, telefon: e.target.value })} />
                        <textarea className="form-control mb-3" placeholder="Adres" value={yeniKurum.adres} onChange={e => setYeniKurum({ ...yeniKurum, adres: e.target.value })}></textarea>
                        <button className="btn btn-primary w-100 fw-bold" onClick={handleEkle}>REHBERE KAYDET</button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        {kurumlar.map((k) => (
                            <div className="col-md-6 mb-3" key={k.id}>
                                <div className="card h-100 shadow-sm border-0 p-3">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="fw-bold text-primary">{k.kurumAdi}</h6>
                                        <button onClick={() => handleSil(k.id)} className="btn btn-sm text-danger"><Trash2 size={16} /></button>
                                    </div>
                                    <span className="badge bg-light text-dark mb-2 w-50">{k.kurumTuru}</span>
                                    <p className="small mb-1"><User size={14} className="me-1" /> {k.yetkiliKisi}</p>
                                    <p className="small mb-1"><Phone size={14} className="me-1" /> {k.telefon}</p>
                                    <p className="small text-muted"><MapPin size={14} className="me-1" /> {k.adres}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KamuKuruluslari;