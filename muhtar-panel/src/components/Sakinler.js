import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Search, UserPlus, Trash2, Edit, X } from 'lucide-react';
import '../css/Sakinler.css';

const Sakinler = () => {
    const [sakinler, setSakinler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAcik, setModalAcik] = useState(false);
    const [duzenlemeModu, setDuzenlemeModu] = useState(false);
    const [seciliId, setSeciliId] = useState(null);

    // DTO'ya tam uyumlu form yapısı
    const bosSakin = {
        tcNo: '',
        ad: '',
        soyad: '',
        telefon: '',
        haneId: 1, // Sayı olmalı! 
        engelDurumu: false,
        kanGrubu: ''
    };
    const [formVerisi, setFormVerisi] = useState(bosSakin);

    useEffect(() => { fetchSakinler(); }, []);

    const fetchSakinler = () => {
        api.get('/Sakinler').then(res => {
            const data = res.data.$values || res.data;
            setSakinler(Array.isArray(data) ? data : []);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    // KAYDET VE GÜNCELLE
    const handleKaydet = (e) => {
        e.preventDefault();

        // HaneId'yi sayıya çeviriyoruz (Backend int bekliyor)
        const gonderilecekVeri = { ...formVerisi, haneId: parseInt(formVerisi.haneId) || 1 };

        if (duzenlemeModu) {
            api.put(`/Sakinler/${seciliId}`, gonderilecekVeri)
                .then(() => {
                    alert("Güncellendi!");
                    kapatVeYenile();
                }).catch(err => console.error("Güncelleme hatası:", err.response?.data));
        } else {
            api.post('/Sakinler', gonderilecekVeri)
                .then(() => {
                    alert("Kaydedildi!");
                    kapatVeYenile();
                }).catch(err => console.error("Kayıt hatası:", err.response?.data));
        }
    };

    const kapatVeYenile = () => {
        setModalAcik(false);
        setFormVerisi(bosSakin);
        setDuzenlemeModu(false);
        fetchSakinler();
    };

    // DÜZENLEME MODUNU AÇ
    const handleEditClick = (sakin) => {
        setSeciliId(sakin.id);
        setDuzenlemeModu(true);
        // Liste DTO'sunda AdSoyad birleşik, onu ayırmamız lazım
        const isimler = sakin.adSoyad ? sakin.adSoyad.trim().split(' ') : ['', ''];
        setFormVerisi({
            tcNo: sakin.tcNo || '',
            ad: isimler[0] || '',
            soyad: isimler.slice(1).join(' ') || '',
            telefon: sakin.telefon || '',
            haneId: 1, // Liste DTO'sunda HaneId yoksa varsayılan 1
            engelDurumu: false,
            kanGrubu: ''
        });
        
        setModalAcik(true);
    };

    return (
        <div className="sakinler-wrapper">
            <div className="page-header d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <h2>Mahalle Sakinleri</h2>
                <button className="btn-add" onClick={() => { setDuzenlemeModu(false); setFormVerisi(bosSakin); setModalAcik(true); }}>
                    <UserPlus size={18} /> Yeni Sakin Ekle
                </button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>TC No</th>
                            <th>Ad Soyad</th>
                            <th>Telefon</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sakinler.map((s) => (
                            <tr key={s.id}>
                                <td>{s.tcNo}</td>
                                <td>{s.adSoyad}</td>
                                <td>{s.telefon}</td>
                                <td className="actions">
                                    <button className="action-btn edit" onClick={() => handleEditClick(s)}><Edit size={16} /></button>
                                    <button className="action-btn delete" onClick={() => {
                                        if (window.confirm("Silinsin mi?")) api.delete(`/Sakinler/${s.id}`).then(fetchSakinler);
                                    }}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalAcik && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <h3>{duzenlemeModu ? "Sakini Güncelle" : "Yeni Sakin Kaydı"}</h3>
                        <form onSubmit={handleKaydet}>
                            <input required placeholder="TC No" className="form-input" value={formVerisi.tcNo} onChange={e => setFormVerisi({ ...formVerisi, tcNo: e.target.value })} />
                            <input required placeholder="Ad" className="form-input" value={formVerisi.ad} onChange={e => setFormVerisi({ ...formVerisi, ad: e.target.value })} />
                            <input required placeholder="Soyad" className="form-input" value={formVerisi.soyad} onChange={e => setFormVerisi({ ...formVerisi, soyad: e.target.value })} />
                            <input placeholder="Telefon" className="form-input" value={formVerisi.telefon} onChange={e => setFormVerisi({ ...formVerisi, telefon: e.target.value })} />
                            <input type="number" placeholder="Hane ID" className="form-input" value={formVerisi.haneId} onChange={e => setFormVerisi({ ...formVerisi, haneId: e.target.value })} />

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setModalAcik(false)}>İptal</button>
                                <button type="submit" className="btn-save">{duzenlemeModu ? "Güncelle" : "Kaydet"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sakinler;