export function tripDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Minsk', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = type => parts.find(part => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function tripDay(now = new Date()) {
  const date = tripDate(now);
  return date >= '2026-10-04' && date <= '2026-10-09' ? date.slice(-2) : null;
}
