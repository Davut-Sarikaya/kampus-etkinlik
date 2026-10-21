// src/components/layout/Navigation.tsx
import { type PageName } from '../../types/page';

interface NavigationProps {
    current: PageName;
    onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
    return (
        <nav>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                style={{ fontWeight: current === 'home' ? 'bold' : 'normal', textDecoration: current === 'home' ? 'underline' : 'none' }}
            >
                Ana Sayfa
            </a>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('events'); }}
                style={{ fontWeight: current === 'events' ? 'bold' : 'normal', textDecoration: current === 'events' ? 'underline' : 'none' }}
            >
                Etkinlikler
            </a>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('add'); }}
                style={{ fontWeight: current === 'add' ? 'bold' : 'normal', textDecoration: current === 'add' ? 'underline' : 'none' }}
            >
                Ekle
            </a>
        </nav>
    );
}
export default Navigation;