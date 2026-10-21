// src/components/forms/EventForm.tsx
interface EventFormProps {
    onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
    return (
        <div id="form-wrapper">
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                Bu sprintte form sadece görünümdür, kayıt yapılmaz. Yıldızlı (*) alanlar zorunludur.
            </p>
            <form 
                id="event-form" 
                noValidate
                onSubmit={(e) => {
                    e.preventDefault(); // Sayfanın yenilenmesini engeller
                    onSubmit(); // Form gönderilince yukarıdaki (App) fonksiyona haber ver
                }}
            >
                <div className="form-grup">
                    <label htmlFor="etkinlikAdi">Etkinlik Adı *</label>
                    <input type="text" id="etkinlikAdi" name="title" required minLength={3} />
                </div>
                <div className="form-grup">
                    <label htmlFor="kategori">Kategori *</label>
                    <select id="kategori" name="category" required defaultValue="">
                        <option value="" disabled>Seçiniz</option>
                        <option value="seminer">Seminer</option>
                        <option value="atolye">Atölye</option>
                        <option value="konser">Konser</option>
                        <option value="soylesi">Söyleşi</option>
                    </select>
                </div>
                <div className="form-grup">
                    <label htmlFor="tarih">Tarih *</label>
                    <input type="date" id="tarih" name="date" required />
                </div>
                <div className="form-grup">
                    <label htmlFor="saat">Saat *</label>
                    <input type="time" id="saat" name="time" required />
                </div>
                <div className="form-grup">
                    <label htmlFor="yer">Yer *</label>
                    <input type="text" id="yer" name="location" required />
                </div>
                <div className="form-grup">
                    <label htmlFor="kontenjan">Kontenjan</label>
                    <input type="number" id="kontenjan" name="quota" />
                </div>
                <div className="form-grup">
                    <label htmlFor="aciklama">Açıklama</label>
                    <textarea id="aciklama" name="description" rows={4}></textarea>
                </div>
                <button type="submit">Kaydet / Güncelle</button>
            </form>
        </div>
    );
}

export default EventForm;