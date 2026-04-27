import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Accessibility, Trash2, Heart } from 'lucide-react';
import '../css/EngelliSakinler.css';

const EngelliSakinler = () => {
    const [liste, setListe] = useState([]);
    const [yeni, setYeni] = useState({ adSoyad: '', tcNo: '', engelTuru: 'Bedensel', engelOrani: 0, kullandigiCihazlar: '', adres: '', telefon: '', ihtiyacNotu: '' });

    const veriGetir = async () => {
        const res = await api.get('/EngelliSakinler');
        setListe(res.data.$values || res.data);
    };

    useEffect(() => { veriGetir(); }, []);

    const handleKaydet = async () => {
        await api.post('/EngelliSakinler', yeni);
        setYeni({ adSoyad: '', tcNo: '', engelTuru: 'Bedensel', engelOrani: 0, kullandigiCihazlar: '', adres: '', telefon: '', ihtiyacNotu: '' });
        veriGetir();
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4 fw-bold text-info border-bottom pb-2">♿ Engelli Vatandaş Takip Paneli</h3>
            <div className="row">
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm border-0 bg-light">
                        <h6 className="fw-bold">Yeni Kayıt</h6>
                        <input className="form-control mb-2" placeholder="Ad Soyad" value={yeni.adSoyad} onChange={e => setYeni({ ...yeni, adSoyad: e.target.value })} />
                        <input className="form-control mb-2" placeholder="Engel Türü" value={yeni.engelTuru} onChange={e => setYeni({ ...yeni, engelTuru: e.target.value })} />
                        <input className="form-control mb-2" type="number" placeholder="Engel Oranı %" value={yeni.engelOrani} onChange={e => setYeni({ ...yeni, engelOrani: e.target.value })} />
                        <input className="form-control mb-2" placeholder="Telefon" value={yeni.telefon} onChange={e => setYeni({ ...yeni, telefon: e.target.value })} />
                        <textarea className="form-control mb-3" placeholder="İhtiyaç Notu" value={yeni.ihtiyacNotu} onChange={e => setYeni({ ...yeni, ihtiyacNotu: e.target.value })}></textarea>
                        <button className="btn btn-info w-100 text-white fw-bold" onClick={handleKaydet}>LİSTEYE EKLE</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card shadow-sm border-0 p-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Ad Soyad</th>
                                    <th>Engel Durumu</th>
                                    <th>Oran</th>
                                    <th>İhtiyaç Notu</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {liste.map(s => (
                                    <tr key={s.id}>
                                        <td className="fw-bold">{s.adSoyad}</td>
                                        <td>{s.engelTuru}</td>
                                        <td><span className={`badge ${s.engelOrani > 70 ? 'bg-danger' : 'bg-warning text-dark'}`}>%{s.engelOrani}</span></td>
                                        <td className="small text-muted">{s.ihtiyacNotu}</td>
                                        <td><button onClick={async () => { await api.delete(`/EngelliSakinler/${s.id}`); veriGetir(); }} className="btn btn-sm btn-outline-danger"><Trash2 size={14} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EngelliSakinler;