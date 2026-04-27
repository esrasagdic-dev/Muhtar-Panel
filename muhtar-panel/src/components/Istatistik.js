import React from 'react';
import { Users, Home, Activity, DollarSign, MapPin, AlertCircle, Navigation } from 'lucide-react';
import '../css/Istatistik.css';

const Istatistik = ({ data }) => {
    if (!data) return null;

    // Ömerağa Mahallesi Google Maps Embed URL (Koordinat bazlı merkezleme)
    // Istatistik.js dosyasındaki ilgili değişkeni bu tam URL ile değiştir:

    // Istatistik.js dosyasındaki googleMapsUrl değişkenini tam olarak şununla değiştir:

    const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12255.334005703904!2d30.5050000!3d39.7780000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc3e06f976a31d%3A0xc6a827766324d9c7!2zw5ZtZXJhxJ_QsCwgMjYwNDAgVGVwZWJhxZ_EsS9Fc2tpc8OpaGly!5e0!3m2!1str!2str!4v1713680000000!5m2!1str!2str";

    return (
        <div className="container-fluid px-0">
            {/* Üst Bilgi Kartları */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-primary border-5">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded-3 text-primary">
                                <Users size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-0 small fw-bold">Toplam Nüfus</h6>
                                <h4 className="fw-bold mb-0 text-dark">{data.genelNufus.toLocaleString()}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-success border-5">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success">
                                <Home size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-0 small fw-bold">Konut Sayısı</h6>
                                <h4 className="fw-bold mb-0 text-dark">{data.genelKonutSayisi}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-warning border-5">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-warning bg-opacity-10 rounded-3 text-warning">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-0 small fw-bold">Nüfus Yoğunluğu</h6>
                                <h4 className="fw-bold mb-0 text-dark">{data.genelYogunluk} <small className="fs-6">k/km²</small></h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-info border-5">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-info bg-opacity-10 rounded-3 text-info">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-0 small fw-bold">Ort. Hane Geliri</h6>
                                <h4 className="fw-bold mb-0 text-dark">{data.genelHaneGeliri.toLocaleString()} ₺</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Sol Panel: CANLI GOOGLE HARİTASI */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 shadow-hover">
                        <div className="card-header bg-white py-3 border-0 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <Navigation className="text-danger" size={20} />
                                <h5 className="fw-bold mb-0">İnteraktif Mahalle Haritası</h5>
                            </div>
                            <span className="badge bg-light text-primary rounded-pill fw-normal px-3">
                                <MapPin size={14} className="me-1" /> Tepebaşı / Eskişehir
                            </span>
                        </div>
                        <div className="card-body p-0">
                            <iframe
                                title="Ömerağa Mahallesi Haritası"
                                src={googleMapsUrl}
                                width="100%"
                                height="520"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="map-iframe"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Sağ Panel: Sistem Kayıtları ve Sokaklar */}
                <div className="col-lg-4">
                    {/* Canlı Sistem Durumu */}
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h6 className="fw-bold text-secondary mb-3 d-flex align-items-center gap-2">
                            <AlertCircle size={18} className="text-primary" /> Sistemdeki Canlı Kayıtlar
                        </h6>
                        <hr className="mt-0 opacity-10" />
                        <div className="d-flex justify-content-between py-2 border-bottom border-light">
                            <span className="text-muted small">Kayıtlı Sakin Sayısı:</span>
                            <span className="fw-bold text-primary">{data.kayitliSakinSayisi}</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom border-light">
                            <span className="text-muted small">Engelli Sakinler:</span>
                            <span className="fw-bold text-danger">{data.engelliSakinSayisi}</span>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                            <span className="text-muted small">İhtiyaç Sahipleri:</span>
                            <span className="fw-bold text-warning">{data.ihtiyacSahibiSayisi}</span>
                        </div>
                    </div>

                    {/* En Kalabalık Sokaklar */}
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h6 className="fw-bold text-secondary mb-3">Sokak Nüfus Dağılımı</h6>
                        <hr className="mt-0 opacity-10" />
                        {data.enKalabalikSokaklar && data.enKalabalikSokaklar.length > 0 ? (
                            data.enKalabalikSokaklar.map((s, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded-3">
                                    <span className="text-dark small fw-medium">{s.sokak}</span>
                                    <span className="badge bg-white text-primary rounded-pill border shadow-sm">
                                        {s.kisiSayisi} Sakin
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-muted small italic">
                                Henüz sokak bazlı veri girişi yapılmadı.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Istatistik;