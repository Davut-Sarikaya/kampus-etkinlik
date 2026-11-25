# Kampüs Etkinlik API

Üniversite kampüsündeki seminer, atölye, söyleşi ve yarışma gibi etkinliklerin yönetilmesini sağlayan RESTful API servisi. Node.js, Express ve MongoDB (Mongoose) kullanılarak geliştirilmiştir.

## Proje Yapısı

```text
kampus-etkinlik/
├── backend/
│   ├── requests/
│   │   ├── Kampus API.json       # Postman test koleksiyonu
│   │   └── run-results.json      # Collection Runner / Newman test çıktısı
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # MongoDB bağlantı modülü
│   │   ├── controllers/
│   │   │   └── event-controller.js
│   │   ├── data/
│   │   │   └── seed-events.js    # Örnek başlangıç verileri
│   │   ├── models/
│   │   │   └── event-model.js    # Mongoose Event şeması
│   │   ├── routes/
│   │   │   └── event-routes.js
│   │   ├── utils/
│   │   │   └── date.js           # GG-AA-YYYY tarih dönüşüm yardımcıları
│   │   ├── app.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── README.md

Kurulum ve Çalıştırma
1.  Proje dizinine geçin ve bağımlılıkları yükleyin:
     cd backend
     npm install
2. .env.example dosyasını örnek alarak backend/.env dosyasını oluşturun ve kendi MongoDB bağlantı adresinizi tanımlayın:
     PORT=3000
     MONGODB_URI=mongodb://127.0.0.1:27017/kampus
3. Örnek verileri veritabanına yükleyin (tekrar çalıştırıldığında mevcut kayıtları temizleyip 6 örnek etkinlik ekler):
     npm run seed
4. Geliştirme sunucusunu başlatın:
     npm run dev
API Sözleşmesi
Tüm tarih alanları API istek ve yanıtlarında GG-AA-YYYY (ör. 15-10-2026) biçimindedir.

Hata yanıtları standart olarak { "error": { "message": "..." } } yapısında döner.

Method,Endpoint,Açıklama,Başarılı,Hata,Durum
GET,/health,Sunucu sağlık kontrolü,200,-,çalışıyor
GET,/events,Tüm etkinlikleri tarihe göre sıralı listeler,200,-,çalışıyor
GET,/events?search=&category=,Başlıkta arama ve kategoriye göre filtreleme yapar,200,-,çalışıyor
GET,/events/upcoming,Bugün ve sonraki etkinlikleri tarihe göre listeler,200,-,çalışıyor
GET,/events/:id,Belirtilen ID'ye sahip tek etkinliği getirir,200,404,çalışıyor
POST,/events,Yeni etkinlik oluşturur,201,400,çalışıyor
PATCH,/events/:id,Etkinliğin gönderilen alanlarını kısmi günceller,200,"400, 404",çalışıyor
DELETE,/events/:id,Etkinliği veritabanından siler (gövde dönmez),204,404,çalışıyor

Testler
Sunucu çalışırken Postman Collection Runner üzerinden backend/requests/Kampus API.json koleksiyonu ile veya
terminalden Newman kullanılarak tüm uç noktalar test edilebilir:

newman run [https://webdersi.vercel.app/test.json](https://webdersi.vercel.app/test.json)

GitHub üzerinden dosyayı kaydedip commitledikten sonra, bilgisayarındaki klasör ile GitHub'daki son halinin
birebir aynı kalması için VS Code terminalinde ana dizindeyken **`git pull`** çalıştırmayı unutma[cite: 16].
