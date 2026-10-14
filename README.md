# Kampüs Etkinlikleri - React & TypeScript Sprint 4

Canlı Proje (Vercel):https://frontend-eosin-seven-34.vercel.app

Bu proje, Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği öğrencisi Davut Sarıkaya (2416501057) tarafından Web Teknolojileri ve Programlama dersi kapsamında geliştirilmiştir. Daha önceki sprintlerde saf HTML/JS ile hazırlanan Kampüs Etkinlikleri projesi, bu sprintte Vite, React ve TypeScript altyapısına modernize edilmiştir.

## Kullanılan Teknolojiler
* Vite (Hızlı derleme ve geliştirme ortamı)
* React 18 (Bileşen tabanlı arayüz mimarisi)
* TypeScript (Güçlü veri tipleri ve hata önleme)
* CSS3 (Özel tasarlanmış duyarlı stiller)
* Vercel (Bulut ortamında canlı dağıtım)

## Proje Özellikleri
1. Dinamik Sayfa Yönetimi (State): Ekstra bir router kütüphanesi kullanılmadan, useState ile sayfa geçişleri (Ana Sayfa, Etkinlikler, Ekle, Detay, Güncelle) anlık olarak yönetilmektedir.
2. Saf Filtreleme Fonksiyonları: Arama ve kategori filtrelemeleri, DOM'a bağımlı olmayan saf (pure) TypeScript fonksiyonlarıyla gerçekleştirilir.
3. Side-Effect Yönetimi: useEffect hook'u ile kullanıcı sayfalar arasında gezinirken tarayıcı sekme başlıkları dinamik olarak güncellenir.
4. Form ve Veri Yönetimi: Etkinlik ekleme ve güncelleme formları JSX formatına uyarlanmış, seçilen etkinliğin verileri form alanlarına otomatik doldurularak simüle edilmiştir.

## Yerel Ortamda Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için sırasıyla şu adımları izleyin:

git clone https://github.com/Davut-Sarikaya/kampus-etkinlik.git
cd kampus-etkinlik/frontend
npm install
npm run dev

Öğrenci Bilgileri:  
Ad Soyad: Davut Sarıkaya  
Öğrenci No: 2416501057  
Bölüm: Bilgisayar Mühendisliği
