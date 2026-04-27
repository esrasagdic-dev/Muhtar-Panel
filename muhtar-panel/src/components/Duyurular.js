import React, { useEffect, useState, useRef } from 'react';
import api from '../api/api';
import { Plus, Trash2, X, AlertCircle, Share2, Download } from 'lucide-react';
import html2canvas from 'html2canvas'; // npm install html2canvas yapmış olman lazım
import '../css/Sakinler.css';

const Duyurular = () => {
    const [duyurular, setDuyurular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAcik, setModalAcik] = useState(false);
    const durumRef = useRef(null);
    const [seciliDuyuru, setSeciliDuyuru] = useState(null);

    const [yeniDuyuru, setYeniDuyuru] = useState({
        baslik: '',
        icerik: '',
        oncelikliMi: false
    });

    useEffect(() => { fetchDuyurular(); }, []);

    const fetchDuyurular = () => {
        api.get('/Duyurular')
            .then(res => {
                const data = res.data.$values || res.data;
                setDuyurular(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Duyurular alınamadı:", err);
                setLoading(false);
            });
    };

    // GÖRSEL DURUM OLUŞTURMA FONKSİYONU
    const handleDurumGorsellestir = async (duyuru) => {
        setSeciliDuyuru(duyuru);

        // State'in güncellenip DOM'a yansıması için kısa bir bekleme
        setTimeout(async () => {
            if (durumRef.current) {
                try {
                    const canvas = await html2canvas(durumRef.current, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: "#1e3a8a"
                    });

                    const image = canvas.toDataURL("image/png");
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = `Omeraga_Muhtarlik_Durum_${duyuru.baslik}.png`;
                    link.click();
                } catch (error) {
                    console.error("Görsel oluşturma hatası:", error);
                    alert("Görsel oluşturulurken bir hata oluştu.");
                }
            }
        }, 200);
    };

    const handleDuyuruKaydet = (e) => {
        e.preventDefault();
        api.post('/Duyurular', yeniDuyuru)
            .then(() => {
                setModalAcik(false);
                setYeniDuyuru({ baslik: '', icerik: '', oncelikliMi: false });
                fetchDuyurular();
            })
            .catch(err => {
                alert("Duyuru eklenemedi!");
            });
    };

    const handleDuyuruSil = (id) => {
        if (window.confirm("Bu duyuruyu kaldırmak istiyor musunuz?")) {
            api.delete(`/Duyurular/${id}`).then(() => fetchDuyurular());
        }
    };

    return (
        <div className="sakinler-wrapper">
            <div className="page-header">
                <div className="header-title">
                    <h2>📢 Mahalle Duyuruları</h2>
                    <p>Önemli gelişmeleri buradan paylaşabilirsiniz.</p>
                </div>
                <button className="btn-add" onClick={() => setModalAcik(true)}>
                    <Plus size={18} /> <span>Duyuru Oluştur</span>
                </button>
            </div>

            <div className="table-container">
                {loading ? (
                    <p>Duyurular yükleniyor...</p>
                ) : duyurular.length > 0 ? (
                    <div className="row mt-3">
                        {duyurular.map((d) => (
                            <div key={d.id} className="col-12 col-md-6 col-lg-4 mb-3">                                <div className={`card shadow-sm border-start border-4 ${d.oncelikliMi ? 'border-danger' : 'border-primary'}`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h5 className="card-title fw-bold">
                                            {d.oncelikliMi && <AlertCircle size={18} className="text-danger me-2" />}
                                            {d.baslik}
                                        </h5>
                                        <div className="d-flex gap-2">
                                            {/* YENİ GÖRSEL DURUM BUTONU */}
                                            <button
                                                className="btn btn-success btn-sm d-flex align-items-center gap-1"
                                                style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
                                                onClick={() => handleDurumGorsellestir(d)}
                                                title="WhatsApp Durum Görseli Oluştur"
                                            >
                                                <Download size={14} /> Durum
                                            </button>

                                            <button className="btn btn-outline-danger btn-sm border-0" onClick={() => handleDuyuruSil(d.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="card-text text-muted small mt-2">{d.icerik}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="badge bg-light text-dark border">
                                            {new Date(d.yayinTarihi).toLocaleDateString('tr-TR')}
                                        </span>
                                        {d.oncelikliMi && <span className="text-danger fw-bold small">ACİL</span>}
                                    </div>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-5 bg-light rounded">Duyuru bulunmuyor.</div>
                )}
            </div>

            {/* --- GİZLİ DURUM ŞABLONU (Resme Dönüşen Kısım) --- */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <div
                    ref={durumRef}
                    style={{
                        width: '1080px',
                        height: '1920px',
                        background: 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '100px',
                        color: 'white',
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ fontSize: '45px', letterSpacing: '4px', marginBottom: '20px', color: '#fbbf24' }}>
                        TC TEPEBAŞI BELEDİYESİ
                    </div>
                    <div style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '60px', borderBottom: '4px solid #fbbf24', pb: '20px' }}>
                        ÖMERAĞA MAHALLESİ MUHTARLIĞI
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '60px', borderRadius: '40px', width: '100%' }}>
                        <h1 style={{ fontSize: '110px', fontWeight: '900', marginBottom: '50px', lineHeight: '1.2' }}>
                            {seciliDuyuru?.baslik.toUpperCase()}
                        </h1>
                        <p style={{ fontSize: '55px', lineHeight: '1.5', fontWeight: '300' }}>
                            {seciliDuyuru?.icerik}
                        </p>
                    </div>

                    <div style={{ marginTop: '80px', fontSize: '40px', fontStyle: 'italic', opacity: 0.8 }}>
                        📅 {new Date().toLocaleDateString('tr-TR')}
                    </div>

                    <div style={{ position: 'absolute', bottom: '100px', width: '100%', fontSize: '30px', opacity: 0.5 }}>
                        Muhtarlık Dijital Bilgilendirme Sistemi
                    </div>
                </div>
            </div>

            {/* MODAL KISMI (Aynı Kaldı) */}
            {modalAcik && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <div className="modal-header">
                            <h3>Yeni Duyuru Yayınla</h3>
                            <X size={20} onClick={() => setModalAcik(false)} style={{ cursor: 'pointer' }} />
                        </div>
                        <form onSubmit={handleDuyuruKaydet}>
                            <div className="modal-body mt-3">
                                <input
                                    required
                                    placeholder="Duyuru Başlığı"
                                    className="form-input"
                                    value={yeniDuyuru.baslik}
                                    onChange={e => setYeniDuyuru({ ...yeniDuyuru, baslik: e.target.value })}
                                />
                                <textarea
                                    required
                                    placeholder="Duyuru İçeriği"
                                    className="form-input"
                                    style={{ height: '100px' }}
                                    value={yeniDuyuru.icerik}
                                    onChange={e => setYeniDuyuru({ ...yeniDuyuru, icerik: e.target.value })}
                                />
                                <div className="form-check mt-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="oncelikCheck"
                                        checked={yeniDuyuru.oncelikliMi}
                                        onChange={e => setYeniDuyuru({ ...yeniDuyuru, oncelikliMi: e.target.checked })}
                                    />
                                    <label className="form-check-label" htmlFor="oncelikCheck">Önemli / Öncelikli Duyuru</label>
                                </div>
                            </div>
                            <div className="modal-footer mt-4">
                                <button type="button" className="btn-cancel" onClick={() => setModalAcik(false)}>İptal</button>
                                <button type="submit" className="btn-save">Yayınla</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Duyurular;