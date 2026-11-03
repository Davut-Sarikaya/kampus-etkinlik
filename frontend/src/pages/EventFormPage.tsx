// src/pages/EventFormPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

function EventFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id); // URL'de ID varsa güncelleme modundayız
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '', type: 'seminer', date: '', time: '',
    location: '', capacity: '', description: '', image: 'img/kariyer.svg'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit) {
      const eventToEdit = events.find(e => e.id === id);
      if (eventToEdit) {
        const [datePart, timePart] = eventToEdit.date.split('T'); // Tarih ve saati ayırdık
        setFormData({
          title: eventToEdit.title, type: eventToEdit.type,
          date: datePart || '', time: timePart || '',
          location: eventToEdit.location, capacity: eventToEdit.capacity.toString(),
          description: eventToEdit.description, image: eventToEdit.image
        });
      }
    }
  }, [id, isEdit, events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (formData.title.length < 3) newErrors.title = 'Etkinlik adı zorunludur.';
    if (!formData.date) newErrors.date = 'Tarih seçiniz.';
    if (!formData.time) newErrors.time = 'Saat seçiniz.';
    if (!formData.location) newErrors.location = 'Yer bilgisi zorunludur.';
    if (!formData.capacity || Number(formData.capacity) <= 0) newErrors.capacity = 'Geçerli bir kontenjan girin.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const submitData = {
        title: formData.title, type: formData.type,
        date: `${formData.date}T${formData.time}`, // Geri birleştiriyoruz
        location: formData.location, capacity: Number(formData.capacity),
        description: formData.description, image: formData.image
      };

      if (isEdit && id) updateEvent(id, submitData);
      else addEvent(submitData);
      
      navigate('/admin'); // İşlem bitince tabloya dön
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>{isEdit ? 'Etkinlik Güncelle' : 'Yeni Etkinlik Ekle'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        
        <div className="form-grup">
          <label>Etkinlik Adı</label>
          <input type="text" className={errors.title ? 'is-invalid' : ''} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          {errors.title && <div className="error-msg">{errors.title}</div>}
        </div>

        <div className="form-grup">
          <label>Kategori</label>
          <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
            <option value="seminer">Seminer</option>
            <option value="atolye">Atölye</option>
            <option value="soylesi">Söyleşi</option>
            <option value="yarisma">Yarışma</option>
          </select>
        </div>

        <div className="form-grup">
          <label>Tarih</label>
          <input type="date" className={errors.date ? 'is-invalid' : ''} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          {errors.date && <div className="error-msg">{errors.date}</div>}
        </div>

        <div className="form-grup">
          <label>Saat</label>
          <input type="time" className={errors.time ? 'is-invalid' : ''} value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
          {errors.time && <div className="error-msg">{errors.time}</div>}
        </div>

        <div className="form-grup">
          <label>Yer</label>
          <input type="text" className={errors.location ? 'is-invalid' : ''} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
          {errors.location && <div className="error-msg">{errors.location}</div>}
        </div>

        <div className="form-grup">
          <label>Kontenjan</label>
          <input type="number" className={errors.capacity ? 'is-invalid' : ''} value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} />
          {errors.capacity && <div className="error-msg">{errors.capacity}</div>}
        </div>

        <div className="form-grup">
          <label>Açıklama</label>
          <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
        </div>

        <button type="submit" style={{ backgroundColor: '#558b2f' }}>{isEdit ? 'Güncelle' : 'Kaydet'}</button>
        <button type="button" onClick={() => navigate('/admin')} style={{ marginLeft: '1rem', backgroundColor: '#666' }}>İptal</button>
      </form>
    </div>
  );
}

export default EventFormPage;