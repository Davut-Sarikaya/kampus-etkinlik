// src/components/events/EventList.tsx
import { type EventItem } from '../../types/event';
import EventCard from './EventCard';

interface EventListProps {
    events: EventItem[];
    onShowDetail: (id: string) => void;
    emptyText?: string;
}

function EventList({ events, onShowDetail, emptyText = "Aradığınız kritere uygun etkinlik bulunamadı." }: EventListProps) {
    if (events.length === 0) {
        return <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>{emptyText}</p>;
    }

    return (
        <>
            {events.map((event) => (
                <EventCard 
                    key={event.id} // React için zorunlu benzersiz kimlik[cite: 8]
                    event={event} 
                    onShowDetail={onShowDetail} 
                />
            ))}
        </>
    );
}

export default EventList;