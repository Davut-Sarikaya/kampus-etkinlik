// src/components/events/EventCard.tsx
import { type EventItem } from '../../types/event';
import { formatDate } from '../../utils/format-date';

interface EventCardProps {
    event: EventItem;
    onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
    // Kategoriyi güzel isme çevirme
    const catName = event.type === 'seminer' ? 'Seminer' : event.type === 'atolye' ? 'Atölye' : event.type === 'soylesi' ? 'Söyleşi' : 'Konser';

    return (
        <article className="card">
            <h3>{event.title}</h3>
            <p><strong>Kategori:</strong> {catName}</p>
            <p><strong>Tarih:</strong> <time dateTime={event.date}>{formatDate(event.date)}</time></p>
            <p><strong>Yer:</strong> {event.location}</p>
            <a href="#" className="link-btn" onClick={(e) => { 
                e.preventDefault(); 
                onShowDetail(event.id); // Tıklanınca App'e bu id'yi gönderiyoruz
            }}>Detayları gör →</a>
        </article>
    );
}

export default EventCard;