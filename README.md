# 🚀 Kampüs Etkinlikleri Platformu

Bu proje, Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği **Web Teknolojileri ve Programlama** dersi kapsamında geliştirilmekte olan, kampüs içi etkinliklerin paylaşıldığı ve yönetildiği kapsamlı bir web platformudur.

---

## 📂 Proje Mimarisi ve Sprintler

Proje, her sprintte aşamalı olarak geliştirilen modüler bir yapıya sahiptir:

* **`backend/`**: Express.js ile geliştirilmiş RESTful API sunucusu. Etkinlik yönetimi, kategori filtreleme ve veri doğrulama işlemlerini gerçekleştirir.
  * **`src/data/`**: Bellek üzerinde (in-memory) çalışan özgün SDÜ etkinlik verileri (`events.js`).
  * **`src/controllers/`**: İstek mantığını yöneten fonksiyonlar (`event-controller.js`).
  * **`src/routes/`**: API uç noktalarını yönlendiren rotalar (`event-routes.js`).
  * **`requests/`**: Postman test koleksiyonu yedekleri (`kampus-api.json`).
* **`frontend/`**: Kullanıcı arayüzü ve sayfa tasarımları.
* **`sprint1/` - `sprint3/`**: Ders kapsamında tamamlanan önceki aşamalar ve prototipler.

---

## 🛠️ Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js, ES Modules (`type: module`), Cors, Dotenv
* **Test & API Araçları:** Postman (Collection v2.1)
* **Sürüm Kontrolü:** Git & GitHub (`sprint-07` tag sürüm takibiyle)
