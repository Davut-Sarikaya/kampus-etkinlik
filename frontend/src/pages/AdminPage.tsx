// src/pages/AdminPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { formatDate } from '../utils/format-date';

function AdminPage() {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();

  // HOCANIN İSTEDİĞİ: Silmeden önce onay çalışıyor maddesi
  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(`"${title}" etkinliğini silmek istediğinizden emin misiniz?`);
    if (confirmed) {
      deleteEvent(id); // Onay verilirse Context'ten sil
    }
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <button 
        className="btn-action" 
        onClick={() => navigate('/admin/new')} 
        style={{ marginBottom: '1.5rem', backgroundColor: '#558b2f' }}
      >
        + Yeni etkinlik
      </button>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--renk-ana)', color: 'white' }}>
              <th style={{ padding: '1rem' }}>Etkinlik</th>
              <th style={{ padding: '1rem' }}>Tarih</th>
              <th style={{ padding: '1rem' }}>Kategori</th>
              <th style={{ padding: '1rem' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td style={{ padding: '1rem', color: '#333', fontWeight: '500' }}>{event.title}</td>
                <td style={{ padding: '1rem', color: '#555' }}>{formatDate(event.date)}</td>
                <td style={{ padding: '1rem', textTransform: 'capitalize', color: '#555' }}>
                  {event.type === 'soylesi' ? 'Söyleşi' : event.type === 'atolye' ? 'Atölye' : event.type}
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/admin/${event.id}/edit`} className="btn-action" style={{ backgroundColor: '#558b2f', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                    Düzenle
                  </Link>
                  <button 
                    onClick={() => handleDelete(event.id, event.title)} 
                    style={{ backgroundColor: '#c62828', padding: '0.4rem 0.8rem', fontSize: '0.9rem', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;