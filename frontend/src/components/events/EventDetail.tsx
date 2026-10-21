// src/components/events/EventDetail.tsx
import { type EventItem } from '../../types/event';

interface EventDetailProps {
    event: EventItem;
    onBack: () => void;
    onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
    const catNameDet = event.type === 'seminer' ? 'Seminer' : event.type === 'atolye' ? 'Atölye' : event.type === 'soylesi' ? 'Söyleşi' : 'Konser';
    const dateObjDet = new Date(event.date);
    const dateStrDet = dateObjDet.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    const timeStrDet = dateObjDet.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <h1>{event.title}</h1>
            <div className="detay-grid">
                <figure>
                    <img src={event.image} alt={`${event.title} afişi`} />
                    <figcaption>Şekil: {event.title} afişi</figcaption>
                </figure>
                <div>
                    <dl>
                        <dt>Tarih</dt>
                        <dd><time dateTime={event.date}>{dateStrDet}, {timeStrDet}</time></dd>
                        <dt>Yer</dt>
                        <dd>{event.location}</dd>
                        <dt>Kategori</dt>
                        <dd>{catNameDet}</dd>
                        <dt>Kontenjan</dt>
                        <dd>{event.capacity} Kişi</dd>
                    </dl>
                    <h2>Ayrıntılı Açıklama</h2>
                    <p>{event.description}</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
                <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>← Listeye dön</a>
                <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); onEdit(event.id); }}>Bu etkinliği güncelle</a>
            </div>
        </>
    );
}

export default EventDetail;