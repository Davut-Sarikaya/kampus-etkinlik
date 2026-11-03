// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext'; // YENİ
import EventList from '../components/events/EventList';

function HomePage() {
  const navigate = useNavigate();
  const { events } = useEvents(); // YENİ: Veriyi merkezi depodan çekiyoruz

  return (
    <>
      <h2>Yaklaşan 2 Etkinlik</h2>
      <div className="grid-container ikili-grid">
        <EventList 
          events={events.slice(0, 2)} 
          onShowDetail={(id) => navigate(`/events/${id}`)} 
        />
      </div>
    </>
  );
}

export default HomePage;