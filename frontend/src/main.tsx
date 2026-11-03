// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

// YENİ: Az önce yazdığımız Provider'ı içeri aktarıyoruz
import { EventProvider } from './context/EventContext.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider> {/* YENİ: Tüm uygulamayı Context ile sarmalıyoruz */}
        <App />
      </EventProvider>
    </BrowserRouter>
  </StrictMode>,
)