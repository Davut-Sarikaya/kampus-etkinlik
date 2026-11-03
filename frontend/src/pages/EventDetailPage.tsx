// src/pages/EventDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/events';
import EventDetail from '../components/events/EventDetail';

function EventDetailPage() {
  // URL'deki "id" parametresini alıyoruz (örneğin: /events/event-1)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Bütün etkinlikler içinden, bu ID'ye sahip olanı buluyoruz
  const event = events.find(e => e.id === id);

  // Eğer yanlış bir ID girilmişse veya etkinlik yoksa
  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Etkinlik bulunamadı!</h2>
        <button onClick={() => navigate('/events')} className="btn-action">
          Listeye Dön
        </button>
      </div>
    );
  }

  return (
    <EventDetail 
      event={event} 
      onBack={() => navigate(-1)} // Geldiği sayfaya (geri) döner
      onEdit={(eventId) => navigate(`/admin/${eventId}/edit`)} // İleride yapacağımız güncelleme sayfasına gider
    />
  );
}

export default EventDetailPage;