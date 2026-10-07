import { events } from './data.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const container = document.getElementById('event-detail-container');

if (!id) {
    container.innerHTML = '<p style="color:red; font-weight:bold;">Hata: URL\'de etkinlik ID\'si bulunamadı.</p><br><a href="etkinlikler.html" class="link-btn">← Listeye dön</a>';
} else {
    const ev = events.find(e => e.id === id);
    
    if (!ev) {
        container.innerHTML = '<p style="color:red; font-weight:bold;">Hata: Aradığınız etkinlik veritabanında bulunamadı.</p><br><a href="etkinlikler.html" class="link-btn">← Listeye dön</a>';
    } else {
        const catName = ev.type === 'seminer' ? 'Seminer' : ev.type === 'atolye' ? 'Atölye' : ev.type === 'soylesi' ? 'Söyleşi' : 'Konser';
        
        const dateObj = new Date(ev.date);
        const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
        const timeStr = dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        container.innerHTML = `
            <h1>${ev.title}</h1>
            <div class="detay-grid">
                <figure>
                    <img src="${ev.image}" alt="${ev.title} afişi">
                    <figcaption>Şekil: ${ev.title} afişi</figcaption>
                </figure>
                <div>
                    <dl>
                        <dt>Tarih</dt>
                        <dd><time datetime="${ev.date}">${dateStr}, ${timeStr}</time></dd>
                        <dt>Yer</dt>
                        <dd>${ev.location}</dd>
                        <dt>Kategori</dt>
                        <dd>${catName}</dd>
                        <dt>Kontenjan</dt>
                        <dd>${ev.capacity} Kişi</dd>
                    </dl>
                    <h2>Ayrıntılı Açıklama</h2>
                    <p>${ev.description}</p>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center; margin-top: 2rem;">
                <a href="etkinlikler.html" class="link-btn">← Listeye dön</a>
                <a href="etkinlik-guncelle.html?id=${ev.id}" class="link-btn" style="font-size:0.9rem;">Bu etkinliği güncelle</a>
            </div>
        `;
    }
}