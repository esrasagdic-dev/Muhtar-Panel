import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../css/MuhtarIslem.css';

const MuhtarIslem = () => {
    const [yeniIslem, setYeniIslem] = useState({ sakinId: '', islemAdi: '', harcTutari: 0 });
    const [sListesi, setSListesi] = useState([]);
    const [iListesi, setIListesi] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);

    const verileriYukle = async () => {
        try {
            const sRes = await api.get('/MuhtarIslem/sakinler-listesi');
            const sData = sRes.data.$values || sRes.data;
            setSListesi(Array.isArray(sData) ? sData : []);

            const iRes = await api.get('/MuhtarIslem');
            const iData = iRes.data.$values || iRes.data;
            setIListesi(Array.isArray(iData) ? iData : []);

            setYukleniyor(false);
        } catch (err) {
            console.error("Veri yükleme hatası:", err);
            setYukleniyor(false);
        }
    };

    useEffect(() => {
        verileriYukle();
    }, []);

    // ESKİŞEHİR AYARLI YAZDIRMA FONKSİYONU
    const belgeYazdir = (islem) => {
        const yazdirPenceresi = window.open('', '_blank');
        yazdirPenceresi.document.write(`
            <html>
                <head>
                    <title>Resmi Belge - Eskişehir Muhtarlık</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; padding: 50px; line-height: 1.6; color: #000; }
                        .baslik { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; }
                        .icerik { font-size: 19px; text-align: justify; }
                        .muhur { margin-top: 70px; text-align: right; font-weight: bold; padding-right: 50px; }
                    </style>
                </head>
                <body>
                    <div class="baslik">
                        <h2 style="margin:0;">T.C. ESKİŞEHİR VALİLİĞİ</h2>
                        <h3 style="margin:5px 0;">MAHALLE MUHTARLIĞI MAKAMI</h3>
                    </div>
                    <div class="icerik">
                        <p><b>Sayı:</b> BE-26/${islem.id || '001'}</p>
                        <p><b>Tarih:</b> ${new Date(islem.islemTarihi).toLocaleDateString('tr-TR')}</p>
                        <br/>
                        <p style="text-indent: 50px;">
                            Eskişehir ili mahalle sakinlerimizden <b>${islem.sakinAdSoyad}</b> adına düzenlenen 
                            <b>${islem.islemAdi}</b>, muhtarlığımızın sistem kayıtlarına uygun olarak tanzim edilmiştir.
                        </p>
                        <p>İşbu resmi belge, ilgili makamlara ibraz edilmek üzere onaylanarak teslim edilmiştir.</p>
                    </div>
                    <div class="muhur">
                        <p>Mühür ve İmza</p>
                        <p>Mahalle Muhtarı</p>
                        <p>ESKİŞEHİR</p>
                    </div>
                </body>
            </html>
        `);
        yazdirPenceresi.document.close();
        yazdirPenceresi.print();
    };

    const localKaydet = async () => {
        if (!yeniIslem.sakinId || !yeniIslem.islemAdi) {
            alert("Lütfen bir sakin ve işlem türü seçin!");
            return;
        }

        const gonderilecekVeri = {
            sakinId: parseInt(yeniIslem.sakinId),
            islemAdi: yeniIslem.islemAdi,
            kategori: "Evrak",
            harcTutari: 0,
            aciklama: "Eskişehir Sistem Kaydı",
            evrakKayitNo: Math.floor(1000 + Math.random() * 9000).toString()
        };

        try {
            await api.post('/MuhtarIslem', gonderilecekVeri);
            alert("İşlem Eskişehir kayıtlarına başarıyla eklendi!");
            setYeniIslem({ ...yeniIslem, sakinId: '' });
            verileriYukle();
        } catch (err) {
            alert("Kaydedilirken bir hata oluştu!");
        }
    };

    if (yukleniyor) return <div className="p-5 text-center">Eskişehir Veri Sistemi Yükleniyor...</div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm border-0 bg-light">
                        <h5 className="mb-4 fw-bold text-primary border-bottom pb-2">⚡ Yeni İşlem Kaydı</h5>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Sakin Seçin</label>
                            <select
                                className="form-select"
                                value={yeniIslem.sakinId}
                                onChange={(e) => setYeniIslem({ ...yeniIslem, sakinId: e.target.value })}
                            >
                                <option value="">--- Sakin Listesi ---</option>
                                {sListesi.map((s) => (
                                    <option key={s.id} value={s.id}>{s.adSoyad}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Hizmet Türü</label>
                            <select
                                className="form-select"
                                value={yeniIslem.islemAdi}
                                onChange={(e) => setYeniIslem({ ...yeniIslem, islemAdi: e.target.value })}
                            >
                                <option value="">--- Seçiniz ---</option>
                                <option value="İkametgah Belgesi">🏠 İkametgah</option>
                                <option value="Fakirlik Belgesi">📄 Fakirlik Belgesi</option>
                                <option value="Nüfus Kayıt Örneği">👨‍👩‍👧‍👦 Nüfus Kayıt</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 py-2 fw-bold" onClick={localKaydet}>KAYDET</button>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card p-3 shadow-sm border-0">
                        <h5 className="mb-3 fw-bold text-secondary border-bottom pb-2">📂 İşlem Arşivi</h5>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sakin</th>
                                        <th>İşlem</th>
                                        <th>Tarih</th>
                                        <th className="text-center">Yazdır</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {iListesi.map((i, index) => (
                                        <tr key={i.id || index}>
                                            <td className="fw-bold">{i.sakinAdSoyad}</td>
                                            <td><span className="badge bg-info text-dark">{i.islemAdi}</span></td>
                                            <td>{new Date(i.islemTarihi).toLocaleDateString('tr-TR')}</td>
                                            <td className="text-center">
                                                <button className="btn btn-sm btn-outline-dark" onClick={() => belgeYazdir(i)}>🖨️ Yazdır</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MuhtarIslem;