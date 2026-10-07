import { events } from './data.js';

const form = document.getElementById('event-form');
const messageDiv = document.getElementById('form-message');
const warningBox = document.getElementById('no-id-warning');
const formWrapper = document.getElementById('form-wrapper');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const isUpdatePage = window.location.pathname.includes('guncelle');

if (isUpdatePage) {
    if (id) {
        const ev = events.find(e => e.id === id);
        if (ev && form) {
            // "2026-10-12T14:00" metnini tarih ve saat olarak ikiye böl
            const dateParts = ev.date.split('T'); 
            
            document.getElementById('etkinlikAdi').value = ev.title;
            document.getElementById('kategori').value = ev.type;
            document.getElementById('tarih').value = dateParts[0];
            document.getElementById('saat').value = dateParts[1];
            document.getElementById('yer').value = ev.location;
            document.getElementById('aciklama').value = ev.description;
            document.getElementById('kontenjan').value = ev.capacity;
        }
    } else {
        if (formWrapper) formWrapper.style.display = 'none';
        if (warningBox) warningBox.style.display = 'block';
    }
}

if (form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let isValid = true;
        messageDiv.innerHTML = ''; 
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData);
            
            // Veri nesnesini hocanın data.js'deki isimlendirmesine uyumlu oluştur
            const formattedObj = {
                id: isUpdatePage ? id : `event-${Math.floor(Math.random() * 1000) + 7}`,
                title: dataObj.title,
                type: dataObj.category, 
                date: `${dataObj.date}T${dataObj.time}`,
                location: dataObj.location,
                capacity: Number(dataObj.quota),
                description: dataObj.description,
                image: 'afis.jpg'
            };
            
            const formattedJson = JSON.stringify(formattedObj, null, 2);
            messageDiv.innerHTML = `
                <div class="success-box">
<strong>Etkinlik oluşturuldu (bu sprintte kaydedilmez):</strong>
${formattedJson}
                </div>
            `;
            
            if (!isUpdatePage) form.reset(); 
        }
    });
}