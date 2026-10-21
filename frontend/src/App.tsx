// src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

// Veriler ve Tipler
import { events } from './data/events';
import { filterEvents } from './utils/filter-events';
import { type PageName } from './types/page';

// Layout Bileşenleri
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Etkinlik ve Form Bileşenleri
import EventList from './components/events/EventList';
import EventFilter from './components/events/EventFilter';
import EventDetail from './components/events/EventDetail';
import EventForm from './components/forms/EventForm';

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  // Hangi etkinliğin seçili olduğunu baştan buluyoruz (Sekme ve Header için)
  const currentEvent = events.find(e => e.id === selectedEventId);

  // SIDE-EFFECT: Sekme başlığını dinamik değiştirme (HOCANIN İSTEDİĞİ KISIM)
  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (currentPage === 'home') title += " - Ana Sayfa";
    else if (currentPage === 'events') title += " - Etkinlikler";
    else if (currentPage === 'add') title += " - Ekle";
    // Eğer detay sayfasındaysak ve etkinlik varsa, etkinliğin adını sekme başlığı yapıyoruz
    else if (currentPage === 'detail' && currentEvent) title += ` - ${currentEvent.title}`;
    else if (currentPage === 'update') title += " - Güncelle";
    
    document.title = title;
  }, [currentPage, currentEvent]);

  const go = (page: PageName, id: string | null = null) => {
    setCurrentPage(page);
    setSelectedEventId(id);
    window.scrollTo(0, 0); 
  };

  let mainContent = null;
  let headerText = "";
  // Header'ın ana başlığını tutan değişken (Varsayılan: Kampüs Etkinlikleri)
  let headerTitle = "Kampüs Etkinlikleri"; 

  if (currentPage === 'home') {
    headerText = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
    mainContent = (
      <>
        <h2>Yaklaşan 2 Etkinlik</h2>
        <div className="grid-container ikili-grid">
          <EventList events={events.slice(0, 2)} onShowDetail={(id) => go('detail', id)} />
        </div>
      </>
    );
  } 
  else if (currentPage === 'events') {
    const filteredEvents = filterEvents(events, searchText, category);
    headerText = "Kampüste düzenlenen tüm etkinlikler.";
    mainContent = (
      <>
        <EventFilter 
          searchText={searchText} category={category}
          onSearchChange={setSearchText} onCategoryChange={setCategory} 
        />
        <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
          {filteredEvents.length} etkinlik listeleniyor.
        </p>
        <div className="grid-container uclu-grid">
          <EventList events={filteredEvents} onShowDetail={(id) => go('detail', id)} />
        </div>
      </>
    );
  } 
  else if (currentPage === 'detail') {
    if (currentEvent) {
      // HOCANIN İSTEDİĞİ KISIM: Header başlığını etkinliğin adı yapıyoruz
      headerTitle = currentEvent.title; 
      mainContent = <EventDetail event={currentEvent} onBack={() => go('events')} onEdit={(id) => go('update', id)} />;
    }
  } 
  else if (currentPage === 'add' || currentPage === 'update') {
    headerText = currentPage === 'add' ? "Yeni bir etkinlik ekleyin." : "Mevcut etkinliği güncelleyin.";
    mainContent = <EventForm onSubmit={() => go('events')} />;
  }

  return (
    <>
      {/* Menüyü ve Başlığı yeşil arka planlı header etiketinin içine aldık */}
      <header>
        <Header title={headerTitle} text={headerText} />
        <Navigation current={currentPage} onNavigate={(p) => go(p)} />
      </header>
      <main>
        {mainContent}
      </main>
      <Footer />
    </>
  );
}

export default App;