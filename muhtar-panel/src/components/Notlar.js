import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { StickyNote, Plus, Trash2, Edit3, Calendar, Search, X } from 'lucide-react';
import '../css/Notlar.css';

const Notlar = () => {
    const [notlar, setNotlar] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalAcik, setModalAcik] = useState(false);

    // NotEkleDto ile uyumlu state
    const [yeniNot, setYeniNot] = useState({ baslik: '', icerik: '' });

    useEffect(() => {
        fetchNotlar();
    }, []);

    const fetchNotlar = () => {
        api.get('/Notlar')
            .then(res => {
                const data = res.data.$values || res.data;
                setNotlar(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error("Notlar yüklenemedi:", err));
    };

    const handleNotKaydet = (e) => {
        e.preventDefault();
        api.post('/Notlar', yeniNot)
            .then(() => {
                alert("Not başarıyla eklendi!");
                setModalAcik(false);
                setYeniNot({ baslik: '', icerik: '' });
                fetchNotlar(); // Listeyi yenile
            })
            .catch(err => {
                console.error("Not ekleme hatası:", err.response?.data);
                alert("Not kaydedilemedi!");
            });
    };

    const handleNotSil = (id) => {
        if (window.confirm("Bu notu silmek istediğinize emin misiniz?")) {
            api.delete(`/Notlar/${id}`)
                .then(() => fetchNotlar())
                .catch(() => alert("Silme işlemi başarısız!"));
        }
    };

    const filteredNotlar = notlar.filter(not =>
        (not.baslik || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="notlar-container">
            <header className="notlar-header">
                <div className="header-left">
                    <h1><StickyNote className="note-icon" /> Kişisel Notlarım</h1>
                    <div className="search-bar">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Notlarda ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {/* YENİ NOT EKLE BUTONU ARTIK ÇALIŞIYOR */}
                <button className="add-note-btn" onClick={() => setModalAcik(true)}>
                    <Plus size={20} /> <span>Yeni Not Ekle</span>
                </button>
            </header>

            <div className="notes-masonry">
                {filteredNotlar.length > 0 ? filteredNotlar.map((not) => (
                    <div key={not.id} className="note-card" style={{ '--note-color': '#ffd93d' }}>
                        <div className="note-pin"></div>
                        <div className="note-content">
                            <h3>{not.baslik}</h3>
                            <p>{not.icerik}</p>
                        </div>
                        <div className="note-footer">
                            <span className="note-date">
                                <Calendar size={12} /> {not.tarih} {/* Backend'den string formatta geliyor */}
                            </span>
                            <div className="note-actions">
                                <button className="action-btn edit"><Edit3 size={16} /></button>
                                <button className="action-btn delete" onClick={() => handleNotSil(not.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <div className="no-data">Henüz not eklenmemiş.</div>}
            </div>

            {/* NOT EKLEME MODALI */}
            {modalAcik && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <div className="modal-header">
                            <h3>Yeni Not Yaz</h3>
                            <X size={20} onClick={() => setModalAcik(false)} style={{ cursor: 'pointer' }} />
                        </div>
                        <form onSubmit={handleNotKaydet}>
                            <div className="modal-body mt-3">
                                <input
                                    required
                                    placeholder="Not Başlığı..."
                                    className="form-input"
                                    value={yeniNot.baslik}
                                    onChange={e => setYeniNot({ ...yeniNot, baslik: e.target.value })}
                                />
                                <textarea
                                    required
                                    placeholder="Not içeriğini buraya yazın..."
                                    className="form-input"
                                    style={{ height: '150px', resize: 'none' }}
                                    value={yeniNot.icerik}
                                    onChange={e => setYeniNot({ ...yeniNot, icerik: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer mt-3">
                                <button type="button" className="btn-cancel" onClick={() => setModalAcik(false)}>Vazgeç</button>
                                <button type="submit" className="btn-save">Notu Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notlar;