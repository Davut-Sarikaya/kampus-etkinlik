// src/context/EventContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type EventItem } from '../types/event';
import { events as initialEvents } from '../data/events';

// Context'in içinde neler olacak? Onların tiplerini tanımlıyoruz.
interface EventContextType {
  events: EventItem[]; // Tüm etkinlikler listesi
  addEvent: (event: Omit<EventItem, 'id'>) => void; // Yeni ekleme fonksiyonu
  updateEvent: (id: string, updatedEvent: Partial<EventItem>) => void; // Güncelleme fonksiyonu
  deleteEvent: (id: string) => void; // Silme fonksiyonu
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Uygulamamızı sarmalayacak Ana Sağlayıcı (Provider) Bileşeni
export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Verilerimizi (initialEvents) alıp bir State'e koyuyoruz ki güncelleyebilelim
  const [events, setEvents] = useState<EventItem[]>(initialEvents);

  // Ekleme Fonksiyonu
  const addEvent = (newEvent: Omit<EventItem, 'id'>) => {
    const created: EventItem = {
      ...newEvent,
      id: `event-${Date.now()}` // Benzersiz bir ID oluşturuyoruz
    };
    // Yeni etkinliği listenin en başına ekliyoruz
    setEvents((prev) => [created, ...prev]);
  };

  // Güncelleme Fonksiyonu
  const updateEvent = (id: string, updatedFields: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // Silme Fonksiyonu
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// İstediğimiz sayfadan verileri kolayca çekmek için özel bir Hook yazıyoruz
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents hooku, EventProvider içinde kullanılmalıdır.');
  }
  return context;
};