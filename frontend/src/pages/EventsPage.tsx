// src/pages/EventsPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext'; // YENİ
import { filterEvents } from '../utils/filter-events';
import EventList from '../components/events/EventList';
import EventFilter from '../components/events/EventFilter';

function EventsPage() {
  const navigate = useNavigate();
  const { events } = useEvents(); // YENİ: Veriyi merkezi depodan çekiyoruz
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const filteredEvents = filterEvents(events, searchText, category);

  return (
    <>
      <EventFilter 
        searchText={searchText} 
        category={category}
        onSearchChange={setSearchText} 
        onCategoryChange={setCategory} 
      />
      <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
        {filteredEvents.length} etkinlik listeleniyor.
      </p>
      <div className="grid-container uclu-grid">
        <EventList 
          events={filteredEvents} 
          onShowDetail={(id) => navigate(`/events/${id}`)} 
        />
      </div>
    </>
  );
}

export default EventsPage;