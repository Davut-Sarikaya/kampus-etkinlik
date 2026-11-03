// src/components/layout/Navigation.tsx
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? 'active-link' : ''} end>
                Ana Sayfa
            </NavLink>
            <NavLink to="/events" className={({ isActive }: { isActive: boolean }) => isActive ? 'active-link' : ''}>
                Etkinlikler
            </NavLink>
            <NavLink to="/admin" className={({ isActive }: { isActive: boolean }) => isActive ? 'active-link' : ''}>
                Yönetim
            </NavLink>
            <NavLink to="/login" className={({ isActive }: { isActive: boolean }) => isActive ? 'active-link' : ''}>
                Giriş
            </NavLink>
        </nav>
    );
}

export default Navigation;