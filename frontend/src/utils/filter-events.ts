// src/utils/filter-events.ts
import { type EventItem } from '../types/event';

export function filterEvents(
  events: EventItem[],
  searchText: string,
  category: string
): EventItem[] {
  const query = searchText.toLowerCase();
  
  return events.filter(e => {
    const textMatch = e.title.toLowerCase().includes(query) || e.location.toLowerCase().includes(query);
    const catMatch = category === '' || e.type === category;
    return textMatch && catMatch;
  });
}