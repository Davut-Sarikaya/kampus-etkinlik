// src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import { events } from './data/events';
import { filterEvents } from './utils/filter-events';

function App() {
  // Hangi sayfanın açık olduğunu tutan state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  
  // ADIM 12: Detay ve Güncelleme sayfası için hangi etkinliğin seçildiğini tutan State
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // ADIM 11: useEffect ile sayfa başlığını (sekme adını) dinamik değiştirme
  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (currentPage === 'home') title += " - Ana Sayfa";
    else if (currentPage === 'events') title += " - Etkinlikler";
    else if (currentPage === 'add') title += " - Ekle";
    else if (currentPage === 'detail') title += " - Detay";
    else if (currentPage === 'update') title += " - Güncelle";
    document.title = title; // Tarayıcı sekmesi güncellenir
  }, [currentPage]);

  // Sayfalar arası geçişi ve seçili ID'yi yöneten özel fonksiyonumuz
  const navigateTo = (page: string, id: string | null = null) => {
    setCurrentPage(page);
    setSelectedEventId(id);
    window.scrollTo(0, 0); // Sayfa değişince en üste kaydır
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        const upcomingEvents = events.slice(0, 2);
        return (
          <>
            <section>
              <h2>Uygulama Amacı</h2>
              <p>Kampüs içerisindeki tüm seminer, atölye ve kariyer etkinliklerini tek bir platform üzerinden takip etmenizi sağlamak.</p>
            </section>
            <section>
              <h2>Yaklaşan Etkinlikler</h2>
              <div className="grid-container ikili-grid">
                {upcomingEvents.map(ev => {
                  const catName = ev.type === 'seminer' ? 'Seminer' : ev.type === 'atolye' ? 'Atölye' : ev.type === 'soylesi' ? 'Söyleşi' : 'Konser';
                  const dateObj = new Date(ev.date);
                  const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
                  return (
                    <article className="card" key={ev.id}>
                      <h3>{ev.title}</h3>
                      <p><strong>Kategori:</strong> {catName}</p>
                      <p><strong>Tarih:</strong> <time dateTime={ev.date}>{dateStr}</time></p>
                      <p><strong>Yer:</strong> {ev.location}</p>
                      {/* Tıklanınca navigateTo ile 'detail' sayfasına ID'yi yolluyoruz */}
                      <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); navigateTo('detail', ev.id); }}>Detayları gör →</a>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        );

      case 'events':
        const filteredEvents = filterEvents(events, searchQuery, category);
        return (
          <>
            <h2>Tüm Etkinlikler</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Etkinlik ara (Örn: Robotik)..." 
                style={{ flex: 1, minWidth: '200px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select 
                style={{ flex: 1, minWidth: '200px' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Tüm Kategoriler</option>
                <option value="seminer">Seminer</option>
                <option value="atolye">Atölye</option>
                <option value="konser">Konser</option>
                <option value="soylesi">Söyleşi</option>
              </select>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
              {filteredEvents.length} etkinlik listeleniyor.
            </p>
            <section className="grid-container uclu-grid">
              {filteredEvents.length === 0 ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Aradığınız kritere uygun etkinlik bulunamadı.</p>
              ) : (
                filteredEvents.map(ev => {
                  const catName = ev.type === 'seminer' ? 'Seminer' : ev.type === 'atolye' ? 'Atölye' : ev.type === 'soylesi' ? 'Söyleşi' : 'Konser';
                  const dateObj = new Date(ev.date);
                  const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
                  return (
                    <article className="card" key={ev.id}>
                      <h3>{ev.title}</h3>
                      <p><strong>Kategori:</strong> {catName}</p>
                      <p><strong>Tarih:</strong> <time dateTime={ev.date}>{dateStr}</time></p>
                      <p><strong>Yer:</strong> {ev.location}</p>
                      <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); navigateTo('detail', ev.id); }}>Detayları gör →</a>
                    </article>
                  );
                })
              )}
            </section>
          </>
        );

      case 'detail':
        // State'deki ID'ye sahip etkinliği bul
        const ev = events.find(e => e.id === selectedEventId);
        
        if (!ev) return (
          <div>
            <p style={{ color: 'red', fontWeight: 'bold' }}>Hata: Etkinlik bulunamadı.</p>
            <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); navigateTo('events'); }}>← Listeye dön</a>
          </div>
        );
        
        const catNameDet = ev.type === 'seminer' ? 'Seminer' : ev.type === 'atolye' ? 'Atölye' : ev.type === 'soylesi' ? 'Söyleşi' : 'Konser';
        const dateObjDet = new Date(ev.date);
        const dateStrDet = dateObjDet.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
        const timeStrDet = dateObjDet.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        
        return (
          <>
            <h1>{ev.title}</h1>
            <div className="detay-grid">
              <figure>
                <img src={ev.image} alt={`${ev.title} afişi`} />
                <figcaption>Şekil: {ev.title} afişi</figcaption>
              </figure>
              <div>
                <dl>
                  <dt>Tarih</dt>
                  <dd><time dateTime={ev.date}>{dateStrDet}, {timeStrDet}</time></dd>
                  <dt>Yer</dt>
                  <dd>{ev.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{catNameDet}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{ev.capacity} Kişi</dd>
                </dl>
                <h2>Ayrıntılı Açıklama</h2>
                <p>{ev.description}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
              <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); navigateTo('events'); }}>← Listeye dön</a>
              <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); navigateTo('update', ev.id); }}>Bu etkinliği güncelle</a>
            </div>
          </>
        );

      // ADIM 13: Ekle ve Güncelle formlarının JSX'e çevrilmiş hali
      case 'add':
      case 'update':
        const isUpdate = currentPage === 'update';
        const editEvent = isUpdate ? events.find(e => e.id === selectedEventId) : null;
        
        return (
          <div id="form-wrapper">
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              {isUpdate ? "Alanlar mevcut etkinliğin bilgileriyle dolu gelir." : "Yıldızlı (*) alanlar zorunludur."} (JSON çıktısı gizlendi, form React State üzerinden yönetiliyor).
            </p>
            <form 
              id="event-form" 
              noValidate // HTML: novalidate -> JSX: noValidate
              onSubmit={(e) => {
                e.preventDefault();
                alert(isUpdate ? "Etkinlik başarıyla güncellendi (Arayüz simülasyonu)!" : "Etkinlik başarıyla eklendi (Arayüz simülasyonu)!");
                navigateTo('events'); // Başarılı olunca listeye atıyoruz
              }}
            >
              <div className="form-grup">
                {/* HTML: for -> JSX: htmlFor */}
                <label htmlFor="etkinlikAdi">Etkinlik Adı *</label>
                {/* HTML: minlength -> JSX: minLength | defaultValue ile kutuyu dolduruyoruz */}
                <input type="text" id="etkinlikAdi" name="title" required minLength={3} defaultValue={editEvent ? editEvent.title : ''} />
              </div>
              <div className="form-grup">
                <label htmlFor="kategori">Kategori *</label>
                <select id="kategori" name="category" required defaultValue={editEvent ? editEvent.type : ''}>
                  <option value="" disabled>Seçiniz</option>
                  <option value="seminer">Seminer</option>
                  <option value="atolye">Atölye</option>
                  <option value="konser">Konser</option>
                  <option value="soylesi">Söyleşi</option>
                </select>
              </div>
              <div className="form-grup">
                <label htmlFor="tarih">Tarih *</label>
                <input type="date" id="tarih" name="date" required defaultValue={editEvent ? editEvent.date.split('T')[0] : ''} />
              </div>
              <div className="form-grup">
                <label htmlFor="saat">Saat *</label>
                <input type="time" id="saat" name="time" required defaultValue={editEvent ? editEvent.date.split('T')[1] : ''} />
              </div>
              <div className="form-grup">
                <label htmlFor="yer">Yer *</label>
                <input type="text" id="yer" name="location" required defaultValue={editEvent ? editEvent.location : ''} />
              </div>
              <div className="form-grup">
                <label htmlFor="kontenjan">Kontenjan</label>
                <input type="number" id="kontenjan" name="quota" defaultValue={editEvent ? editEvent.capacity : ''} />
              </div>
              <div className="form-grup">
                <label htmlFor="aciklama">Açıklama</label>
                <textarea id="aciklama" name="description" rows={4} defaultValue={editEvent ? editEvent.description : ''}></textarea>
              </div>
              <button type="submit">{isUpdate ? 'Güncelle' : 'Kaydet'}</button>
            </form>
          </div>
        );

      default:
        return <h2>Sayfa Bulunamadı</h2>;
    }
  };

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <nav>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Ana Sayfa</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('events'); }}>Etkinlikler</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('add'); }}>Ekle</a>
        </nav>
      </header>
      <main>
        {renderPage()}
      </main>
      <footer>
        <p>AD SOYAD: Davut Sarıkaya ÖğrenciNo: 2416501057 2026</p>
      </footer>
    </>
  );
}

export default App;