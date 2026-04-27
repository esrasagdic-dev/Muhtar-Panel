import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../css/IhtiyacSahipleri.css'; // Özel CSS dosyasını çağırdık

const IhtiyacSahipleri = () => {
    const [liste, setListe] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [yeniKayit, setYeniKayit] = useState({
        adSoyad: '',
        tcNo: '',
        telefon: '',
        adres: '',
        gelir: '',
        evDurumu: 'Kira',
        arabaVarMi: 'Hayır'
    });

    // 1. VERİLERİ BACKEND'DEN ÇEK
    const verileriYukle = async () => {
        try {
            const res = await api.get('/IhtiyacSahipleri');
            // .NET'teki $values referans döngüsü koruması varsa onu ayıklıyoruz
            const data = res.data.$values || res.data;
            setListe(Array.isArray(data) ? data : []);
            setYukleniyor(false);
        } catch (err) {
            console.error("Liste yüklenirken hata oluştu:", err);
            setYukleniyor(false);
        }
    };

    useEffect(() => {
        verileriYukle();
    }, []);

    // 2. KAYDETME İŞLEMİ (Backend DTO ile %100 Uyumlu)
    const handleKaydet = async () => {
        // Validasyon: Ad Soyad ve TC boş olamaz
        if (!yeniKayit.adSoyad.trim() || !yeniKayit.tcNo.trim()) {
            alert("Esra, lütfen Ad Soyad ve TC alanlarını doldur!");
            return;
        }

        // Backend'deki IhtiyacSahibiDto yapısına tam uygun obje:
        const gonderilecekVeri = {
            adSoyad: yeniKayit.adSoyad,
            tcNo: yeniKayit.tcNo,
            telefon: yeniKayit.telefon || "",
            adres: yeniKayit.adres || "",
            gelir: parseFloat(yeniKayit.gelir) || 0, // Sayıya çevirdik (decimal için önemli)
            evDurumu: yeniKayit.evDurumu,
            arabaVarMi: yeniKayit.arabaVarMi
        };

        try {
            const response = await api.post('/IhtiyacSahipleri', gonderilecekVeri);

            if (response.status === 200 || response.status === 201) {
                alert("Kayıt Eskişehir listesine başarıyla eklendi!");
                // Formu sıfırla
                setYeniKayit({
                    adSoyad: '', tcNo: '', telefon: '', adres: '',
                    gelir: '', evDurumu: 'Kira', arabaVarMi: 'Hayır'
                });
                // Listeyi anlık güncelle
                verileriYukle();
            }
        } catch (err) {
            console.error("Ekleme Hatası:", err.response?.data);
            const hataMesaji = err.response?.data?.message || "Veri gönderilirken bir hata oluştu. Backend DTO yapısını kontrol et!";
            alert("Hata: " + hataMesaji);
        }
    };

    // 3. KAYIT SİLME
    const handleSil = async (id) => {
        if (window.confirm("Bu kaydı listeden silmek istediğinize emin misiniz?")) {
            try {
                await api.delete(`/IhtiyacSahipleri/${id}`);
                verileriYukle();
            } catch (err) {
                alert("Silme işlemi başarısız oldu.");
            }
        }
    };

    if (yukleniyor) return <div className="p-5 text-center">Eskişehir Sosyal Yardım Verileri Yükleniyor...</div>;

    return (
        <div className="container-fluid mt-4 ihtiyac-container">
            <h3 className="mb-4 fw-bold text-danger border-bottom pb-3">
                🚩 Eskişehir İhtiyaç Sahibi Takip Paneli
            </h3>

            <div className="row">
                {/* SOL: VERİ GİRİŞ FORMU */}
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-top border-danger border-4 bg-white">
                        <h5 className="fw-bold mb-4 text-dark">Yeni Yardım Kaydı</h5>

                        <div className="mb-3">
                            <label className="small fw-bold text-muted">Ad Soyad</label>
                            <input type="text" className="form-control"
                                value={yeniKayit.adSoyad} onChange={e => setYeniKayit({ ...yeniKayit, adSoyad: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label className="small fw-bold text-muted">TC Kimlik No</label>
                            <input type="text" className="form-control" maxLength="11"
                                value={yeniKayit.tcNo} onChange={e => setYeniKayit({ ...yeniKayit, tcNo: e.target.value })} />
                        </div>

                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="small fw-bold text-muted">Telefon</label>
                                <input type="text" className="form-control" placeholder="05xx"
                                    value={yeniKayit.telefon} onChange={e => setYeniKayit({ ...yeniKayit, telefon: e.target.value })} />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="small fw-bold text-muted">Aylık Gelir (₺)</label>
                                <input type="number" className="form-control"
                                    value={yeniKayit.gelir} onChange={e => setYeniKayit({ ...yeniKayit, gelir: e.target.value })} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="small fw-bold text-muted">Açık Adres</label>
                            <textarea className="form-control" rows="2"
                                value={yeniKayit.adres} onChange={e => setYeniKayit({ ...yeniKayit, adres: e.target.value })}></textarea>
                        </div>

                        <div className="row">
                            <div className="col-6 mb-4">
                                <label className="small fw-bold text-muted">Ev Durumu</label>
                                <select className="form-select" value={yeniKayit.evDurumu} onChange={e => setYeniKayit({ ...yeniKayit, evDurumu: e.target.value })}>
                                    <option value="Kira">🏠 Kira</option>
                                    <option value="Ev Sahibi">🔑 Ev Sahibi</option>
                                </select>
                            </div>
                            <div className="col-6 mb-4">
                                <label className="small fw-bold text-muted">Araç Var mı?</label>
                                <select className="form-select" value={yeniKayit.arabaVarMi} onChange={e => setYeniKayit({ ...yeniKayit, arabaVarMi: e.target.value })}>
                                    <option value="Hayır">❌ Yok</option>
                                    <option value="Evet">🚗 Var</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-danger w-100 fw-bold py-2 shadow-sm" onClick={handleKaydet}>
                            SİSTEME KAYDET
                        </button>
                    </div>
                </div>

                {/* SAĞ: TABLO LİSTESİ */}
                <div className="col-md-8">
                    <div className="card p-3 shadow-sm border-0">
                        <h5 className="fw-bold mb-3 text-secondary border-bottom pb-2">Kayıtlı Listesi ({liste.length} Kişi)</h5>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sakin Bilgisi</th>
                                        <th>Gelir</th>
                                        <th>Varlıklar</th>
                                        <th>İletişim</th>
                                        <th className="text-center">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {liste.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="fw-bold">{item.adSoyad}</div>
                                                <small className="text-muted">{item.tcNo}</small>
                                            </td>
                                            <td>
                                                <span className="badge bg-success">{item.gelir} ₺</span>
                                            </td>
                                            <td>
                                                <div className="small">🏠 {item.evDurumu}</div>
                                                <div className="small">🚗 Araç: {item.arabaVarMi}</div>
                                            </td>
                                            <td>
                                                <div className="small fw-bold text-primary">{item.telefon}</div>
                                                <div className="small text-muted">{item.adres.substring(0, 25)}...</div>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleSil(item.id)}>
                                                    🗑️ Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {liste.length === 0 && (
                                        <tr><td colSpan="5" className="text-center py-5 text-muted">Henüz bir ihtiyaç sahibi kaydı eklenmemiş.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IhtiyacSahipleri;