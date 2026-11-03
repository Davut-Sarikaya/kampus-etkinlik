// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// 10 Adet Sayfa Bileşeni
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import AdminPage from './pages/AdminPage';
import EventFormPage from './pages/EventFormPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <header>
        <Header title="Kampüs Etkinlikleri" text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." />
        <Navigation />
      </header>
      
      <main>
        <Routes>
          {/* TOPLAM 10 ADET ROUTER TANIMLANDI */}
          <Route path="/" element={<HomePage />} />                    {/* 1 */}
          <Route path="/events" element={<EventsPage />} />            {/* 2 */}
          <Route path="/events/:id" element={<EventDetailPage />} />   {/* 3 */}
          <Route path="/admin" element={<AdminPage />} />              {/* 4 */}
          <Route path="/admin/new" element={<EventFormPage />} />      {/* 5 */}
          <Route path="/admin/:id/edit" element={<EventFormPage />} /> {/* 6 */}
          <Route path="/login" element={<LoginPage />} />              {/* 7 */}
          <Route path="/register" element={<RegisterPage />} />        {/* 8 */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* 9 */}
          <Route path="*" element={<NotFoundPage />} />                {/* 10 */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;