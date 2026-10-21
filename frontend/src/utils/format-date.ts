// src/utils/format-date.ts
export function formatDate(dateStr: string) {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
}