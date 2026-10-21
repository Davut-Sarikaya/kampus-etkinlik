// src/components/events/EventFilter.tsx
interface EventFilterProps {
    searchText: string;
    category: string;
    onSearchChange: (text: string) => void;
    onCategoryChange: (cat: string) => void;
}

function EventFilter({ searchText, category, onSearchChange, onCategoryChange }: EventFilterProps) {
    return (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <input 
                type="text" 
                placeholder="Etkinlik ara (Örn: Robotik)..." 
                style={{ flex: 1, minWidth: '200px' }}
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select 
                style={{ flex: 1, minWidth: '200px' }}
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">Tüm Kategoriler</option>
                <option value="seminer">Seminer</option>
                <option value="atolye">Atölye</option>
                <option value="konser">Konser</option>
                <option value="soylesi">Söyleşi</option>
            </select>
        </div>
    );
}

export default EventFilter;