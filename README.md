# 🏛️ Muhtar Amca - Mahalle Yönetim Otomasyonu
Mahalle yönetim süreçlerini dijitalleştiren tam kapsamlı (Full-Stack) bir otomasyon sistemidir.

## 🚀 Teknolojiler
Bu proje modern web teknolojileri ve profesyonel yazılım mimarisi kullanılarak geliştirilmiştir:

* **Frontend:** React, Axios, Lucide Icons, Bootstrap (Responsive Design)
* **Backend:** .NET Core Web API (C#), Entity Framework Core
* **Veritabanı:** Microsoft SQL Server
* **Mimari:** Katmanlı Mimari (N-Tier Architecture), DTO Pattern

## ✨ Öne Çıkan Özellikler
* **Sakin Yönetimi:** Mahalle sakinlerinin detaylı kaydı, listelenmesi ve güncellenmesi.
* **Duyuru Sistemi:** Mahalle genelinde yapılacak duyuruların yönetimi.
* **İstatistik Paneli:** Dashboard üzerinden mahalle demografisine dair özet veriler.
* **Responsive Arayüz:** Hem masaüstü hem de mobil cihazlarda tam uyumlu çalışma.

## 🛠️ Kurulum ve Kullanım
Projeyi yerel bilgisayarınızda çalıştırmak için şu adımları izleyin:

1.  **Veritabanı:** `Database/` klasöründeki `.bak` dosyasını SQL Server'a "Restore" edin.
2.  **Backend:** `MuhtarOtomasyon.API` klasöründeki çözümü Visual Studio ile açın ve `appsettings.json` içindeki ConnectionString'i güncelleyip çalıştırın.
3.  **Frontend:** `muhtar-panel` klasöründe terminali açın:
    ```bash
    npm install
    npm start
    ```

---
**Geliştiren:** Esra - Bilgisayar Mühendisliği Öğrencisi
