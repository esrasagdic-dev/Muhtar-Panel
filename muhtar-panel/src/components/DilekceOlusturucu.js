import React, { useState } from 'react';
import api from '../api/api';
import { Printer, Save, FileText, CheckCircle } from 'lucide-react';
import '../css/Dilekce.css';

const DilekceOlusturucu = () => {
    const [seciliKurum, setSeciliKurum] = useState('');
    const [manuelKurum, setManuelKurum] = useState('');
    const [seciliKonu, setSeciliKonu] = useState('');
    const [manuelKonu, setManuelKonu] = useState('');
    const [ozelNot, setOzelNot] = useState('');
    const [kaydedildi, setKaydedildi] = useState(false);

    const bugun = new Date().toLocaleDateString('tr-TR');

    const kurumlar = [
        "Eskişehir Valiliği",
        "Tepebaşı Kaymakamlığı",
        "Odunpazarı Kaymakamlığı",
        "Eskişehir Büyükşehir Belediye Başkanlığı",
        "Tepebaşı Belediye Başkanlığı",
        "Odunpazarı Belediye Başkanlığı",
        "Eskişehir İl Emniyet Müdürlüğü",
        "Tepebaşı İlçe Emniyet Müdürlüğü",
        "Odunpazarı İlçe Emniyet Müdürlüğü",
        "OEDAŞ Bölge Müdürlüğü",
        "ESKİ Genel Müdürlüğü",
        "Türk Telekom Bölge Müdürlüğü",
        "Eskişehir Sosyal Yardımlaşma ve Dayanışma Vakfı",
        "KURUMU KENDİM YAZACAĞIM (DİĞER)"
    ];

    const konular = [
        { baslik: "Asfalt ve Yol Onarımı", metin: "Ömerağa Mahallesi sınırları içerisinde bulunan cadde ve sokaklarda meydana gelen bozulmalar, araç trafiğini ve yayalarımızın güvenliğini tehlikeye atmaktadır. Belirtilen bölgelerde gerekli asfalt yama ve onarım çalışmalarının yapılmasını talep ederim." },
        { baslik: "Sokak Aydınlatma Arızası", metin: "Mahallemizdeki bazı sokak lambalarının yanmaması nedeniyle bölgede güvenlik zafiyeti oluşmaktadır. Arızalı lambaların ivedilikle tespit edilerek onarılmasını bilgilerinize sunarım." },
        { baslik: "Sosyal Yardım Talebi", metin: "Mahallemizde ikamet eden ve maddi zorluk çeken vatandaşlarımızın durumlarının incelenerek, kurumunuz bünyesindeki yardım imkanlarından faydalandırılmasını arz ederim." },
        { baslik: "Güvenlik ve Devriye Talebi", metin: "Mahalle sakinlerimizden gelen şikayetler doğrultusunda, asayişin sağlanması amacıyla devriye ekiplerinin artırılmasını ve gerekli önlemlerin alınmasını arz ederim." },
        { baslik: "Çöp ve Temizlik Hizmetleri", metin: "Mahallemizde bulunan çöp konteynerlerinin boşaltılması ve çevresinin dezenfekte edilmesi hususunda gerekli hassasiyetin gösterilmesini rica ederim." },
        { baslik: "İlaçlama Talebi", metin: "Mahallemiz genelinde haşere ve sinek oluşumuna karşı periyodik ilaçlama çalışmalarının yapılmasını bilgilerinize arz ederim." },
        { baslik: "KONUYU KENDİM YAZACAĞIM (DİĞER)", metin: "" }
    ];

    const isKurumDiger = seciliKurum === "KURUMU KENDİM YAZACAĞIM (DİĞER)";
    const isKonuDiger = seciliKonu === "KONUYU KENDİM YAZACAĞIM (DİĞER)";

    const finalKurum = isKurumDiger ? manuelKurum : seciliKurum;
    const finalKonu = isKonuDiger ? manuelKonu : seciliKonu;
    const currentMetin = konular.find(k => k.baslik === seciliKonu)?.metin || "";

    const handleKaydet = async () => {
        const payload = {
            baslik: finalKonu,
            gonderilenKurum: finalKurum,
            icerik: currentMetin + (ozelNot ? "\n\n" + ozelNot : "")
        };
        try {
            await api.post('/Dilekce', payload);
            setKaydedildi(true);
            setTimeout(() => setKaydedildi(false), 3000);
        } catch (err) { alert("Hata oluştu!"); }
    };

    // Boş kağıt sorununu engellemek için küçük bir gecikmeli yazdırma
    const handleYazdir = () => {
        window.print();
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="row no-print mb-3">
                <div className="col-12 text-center">
                    <h3 className="fw-bold">Resmi Dilekçe Hazırlama</h3>
                </div>
            </div>

            <div className="row">
                {/* SOL PANEL: SEÇENEKLER */}
                <div className="col-md-4 no-print">
                    <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '20px', backgroundColor: '#fdfdfd' }}>
                        <h5 className="fw-bold text-primary border-bottom pb-2 mb-3">Dilekçe Ayarları</h5>

                        <div className="mb-3">
                            <label className="small fw-bold">Kurum:</label>
                            <select className="form-select mb-2 shadow-none" value={seciliKurum} onChange={e => setSeciliKurum(e.target.value)}>
                                <option value="">Seçiniz...</option>
                                {kurumlar.map((k, i) => <option key={i} value={k}>{k}</option>)}
                            </select>
                            {isKurumDiger && (
                                <input className="form-control form-control-sm border-primary animate__animated animate__fadeIn"
                                    placeholder="Kurum Adını Yazınız"
                                    value={manuelKurum} onChange={e => setManuelKurum(e.target.value)} />
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="small fw-bold">Konu:</label>
                            <select className="form-select mb-2 shadow-none" value={seciliKonu} onChange={e => setSeciliKonu(e.target.value)}>
                                <option value="">Seçiniz...</option>
                                {konular.map((k, i) => <option key={i} value={k.baslik}>{k.baslik}</option>)}
                            </select>
                            {isKonuDiger && (
                                <input className="form-control form-control-sm border-primary animate__animated animate__fadeIn"
                                    placeholder="Konuyu Yazınız"
                                    value={manuelKonu} onChange={e => setManuelKonu(e.target.value)} />
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="small fw-bold">Ek İçerik / Özel Not:</label>
                            <textarea className="form-control shadow-none" rows="5" placeholder="Dilekçe metnine eklenecek özel detaylar..."
                                value={ozelNot} onChange={e => setOzelNot(e.target.value)}></textarea>
                        </div>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary fw-bold" onClick={handleYazdir} disabled={!finalKurum || !finalKonu}>
                                <Printer size={18} className="me-2" /> A4 Yazdır
                            </button>
                            <button className="btn btn-success fw-bold" onClick={handleKaydet} disabled={!finalKurum || !finalKonu}>
                                {kaydedildi ? <CheckCircle size={18} className="me-2" /> : <Save size={18} className="me-2" />}
                                {kaydedildi ? "Kaydedildi" : "Sisteme Kaydet"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* SAĞ PANEL: A4 ÖNİZLEME */}
                <div className="col-md-8" id="printableArea">
                    {finalKurum && finalKonu ? (
                        <div className="dilekce-paper mx-auto shadow-lg bg-white">
                            {/* T.C. İbaresi */}
                            <div className="dilekce-tc text-center fw-bold">T.C.</div>
                            <div className="dilekce-header text-end">{bugun}</div>

                            <div className="dilekce-address text-center">
                                <h5 className="fw-bold text-uppercase">{finalKurum} MAKAMI'NA</h5>
                                <h5 className="fw-bold">ESKİŞEHİR</h5>
                            </div>

                            <div className="dilekce-subject">
                                <strong>KONU:</strong> {finalKonu} Hakkında.
                            </div>

                            <div className="dilekce-body">
                                <p>{currentMetin}</p>
                                {ozelNot && <p>{ozelNot}</p>}
                                <p className="mt-4">Gereğinin yapılmasını bilgilerinize saygılarımla arz ederim.</p>
                            </div>

                            <div className="dilekce-footer row mt-5">
                                <div className="col-6"></div>
                                <div className="col-6 text-center">
                                    <p className="mb-1 fw-bold">İbrahim SAĞDIÇ</p>
                                    <p className="mb-0 small">Eskişehir Tepebaşı</p>
                                    <p className="mb-0 small">Ömerağa Mahallesi Muhtarı</p>
                                    <p className="small text-muted mt-2">(İmza / Mühür)</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-5 border rounded bg-white text-muted">
                            <FileText size={50} className="mb-2 opacity-25" />
                            <p>Önizleme için sol taraftan kurum ve konu seçimi yapın.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DilekceOlusturucu;