import { tripDay, tripDate } from './date.mjs';
const today = document.querySelector('#today-content');
function updateToday() {
  const day = tripDay();
  document.querySelectorAll('[data-today]').forEach(el => el.hidden = el.dataset.today !== day);
  if (day) {
    const section = document.getElementById(`day-${day}`);
    today.replaceChildren();
    const label = document.createElement('p'); label.className = 'eyebrow'; label.textContent = `Сегодня · ${day} октября`;
    const title = document.createElement('h2'); title.textContent = section.dataset.title;
    const summary = document.createElement('p'); summary.textContent = section.dataset.summary;
    const link = document.createElement('a'); link.className = 'button today-button'; link.href = `#day-${day}`; link.textContent = 'Открыть план дня ↗';
    today.append(label, title, summary, link);
  } else {
    const before = tripDate() < '2026-10-04';
    today.querySelector('.eyebrow').textContent = before ? 'Скоро · 4–9 октября' : 'Наш маршрут · 4–9 октября';
    const link = today.querySelector('a'); link.href = '#day-04'; link.textContent = 'К началу путешествия ↗';
    today.querySelector('h2').textContent = before ? 'Скоро отправляемся' : 'Шесть дней, которые останутся с нами';
    today.querySelector('p:not(.eyebrow)').textContent = before ? 'Старт 4 октября в 09:30 из Москвы. Всё нужное для поездки — на этой странице.' : 'Поездка 4–9 октября 2026 завершилась. Маршрут, места и рестораны сохранены ниже.';
  }
}
updateToday();
setInterval(updateToday, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateToday(); });
const links = [...document.querySelectorAll('.day-nav a[data-day]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!active) return;
    links.forEach(link => { if (link.hash === `#${active.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('.day-section').forEach(el => observer.observe(el));
}
