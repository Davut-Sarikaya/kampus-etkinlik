import { events } from './data.js';

const grid = document.getElementById('events-grid');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-filter');
const resultText = document.getElementById('result-text');

function renderEvents(eventsToRender) {
    if (!grid) return;
    grid.innerHTML = ''; 
    
    if (eventsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Etkinlik bulunamadı.</p>';
        if (resultText) resultText.textContent = '0 etkinlik bulundu.';
        return;
    }
    
    if (resultText) resultText.textContent = `${eventsToRender.length} etkinlik listeleniyor.`;

    eventsToRender.forEach(ev => {
        // data.js içerisindeki 'type' verisini Türkçe isme dönüştür
        let catName = ev.type === 'seminer' ? 'Seminer' : ev.type === 'atolye' ? 'Atölye' : ev.type === 'soylesi' ? 'Söyleşi' : 'Konser';
        
        // data.js içerisindeki '2026-10-12T14:00' formatını düzenle
        const dateObj = new Date(ev.date);
        const dateStr = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

        grid.innerHTML += `
            <article class="card">
                <h3>${ev.title}</h3>
                <p><strong>Kategori:</strong> ${catName}</p>
                <p><strong>Tarih:</strong> <time datetime="${ev.date}">${dateStr}</time></p>
                <p><strong>Yer:</strong> ${ev.location}</p>
                <a href="etkinlik-detay.html?id=${ev.id}" class="link-btn">Detayları gör →</a>
            </article>
        `;
    });
}

if (grid) {
    // HTML'de data-limit="2" kullanılarak ana sayfa tespit edilir
    const isIndex = grid.dataset.limit === '2';
    let initialEvents = isIndex ? events.slice(0, 2) : events;
    
    renderEvents(initialEvents);

    if (searchInput && categorySelect) {
        const filterEvents = () => {
            const query = searchInput.value.toLowerCase();
            const cat = categorySelect.value;
            
            const filtered = events.filter(e => {
                const textMatch = e.title.toLowerCase().includes(query) || e.location.toLowerCase().includes(query);
                const catMatch = cat === '' || e.type === cat;
                return textMatch && catMatch;
            });
            renderEvents(filtered);
        };

        searchInput.addEventListener('input', filterEvents);
        categorySelect.addEventListener('change', filterEvents);
    }
}