/* =========================================
   Birzumda — общий код для всех страниц
   (index.html, cabinet.html, admin.html)
   ========================================= */

// ---------- 1. Настройки сайта ----------
const CONFIG = {
  // сервер Birzumda Tayyorla на Railway (там же API сайта: /api/site/...)
  API_URL: 'https://bot-production-24253578.up.railway.app',
  SITE_HOST: 'mybirzumda.uz',          // вход через Telegram работает только на этом домене
  LOGIN_BOT: 'MyBirzumda_bot',        // бот для входа «Birzumda» (в BotFather: /setdomain → mybirzumda.uz)
  ORDER_BOT: 'Birzumda_Tayyorla_bot'  // бот, куда приходят готовые работы
};

// ---------- 2. Хранение в браузере ----------
function load(key, fallback) {
  try { return localStorage.getItem('bz_' + key) || fallback; } catch { return fallback; }
}
function save(key, value) {
  try {
    if (value === null) localStorage.removeItem('bz_' + key);
    else localStorage.setItem('bz_' + key, value);
  } catch { /* браузер запретил — не страшно */ }
}

const state = {
  theme: load('theme', 'kosmos'),
  accent: load('accent', 'auto'),
  lang: load('lang', 'uz'),          // при первом заходе всегда узбекский
  token: load('token', ''),          // токен входа (выдаёт наш сервер)
  user: JSON.parse(load('user', 'null')),
  admin: load('admin', '') === '1'
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// тема и цвет применяются сразу, на любой странице
const THEME_IDS = ['kosmos', 'light', 'okean', 'neon', 'qish', 'lava', 'orman', 'sakura',
                   'synth', 'rings', 'circuit', 'fire', 'hex', 'bolt', 'holo'];
if (!THEME_IDS.includes(state.theme)) state.theme = state.theme === 'light' ? 'light' : 'kosmos';
document.documentElement.dataset.theme = state.theme;
if (load('fx', '') === 'lite') document.documentElement.classList.add('lite');
document.documentElement.dataset.accent = state.accent;

// ---------- 3. Запросы к серверу ----------
async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (state.token) headers.Authorization = 'Bearer ' + state.token;
  const res = await fetch(CONFIG.API_URL + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) logout(false);          // токен устарел
  if (!res.ok) throw Object.assign(new Error(data.error || res.status), { code: data.error, status: res.status });
  return data;
}

// ---------- 4. Вход / выход ----------
function saveLogin(data) {
  state.token = data.token; state.user = data.user; state.admin = !!data.admin;
  save('token', data.token); save('user', JSON.stringify(data.user)); save('admin', data.admin ? '1' : null);
}

function logout(reload = true) {
  state.token = ''; state.user = null; state.admin = false;
  save('token', null); save('user', null); save('admin', null);
  if (reload) location.href = 'index.html';
}

// ---------- 5. Уведомление (toast) ----------
let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

// ---------- 6. Мелочи ----------
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const money = (n) => (n || 0).toLocaleString('ru-RU') + " so'm";

// ---------- 7. Анимация нажатий: волна, искры, вибрация ----------
const TAP = '.btn, .icon-btn, .card, .segmented button, .theme-card, .colors button, .bnav a, .mini-btn';

document.addEventListener('pointerdown', e => {
  const el = e.target.closest(TAP);
  if (!el) return;
  // волна от пальца
  const r = el.getBoundingClientRect();
  const w = document.createElement('span');
  w.className = 'ripple';
  w.style.left = (e.clientX - r.left) + 'px';
  w.style.top = (e.clientY - r.top) + 'px';
  w.style.setProperty('--s', Math.max(r.width, r.height) / 8);
  el.appendChild(w);
  setTimeout(() => w.remove(), 650);
  // лёгкая вибрация на телефоне
  try { navigator.vibrate?.(8); } catch { /* нет вибрации — не страшно */ }
});

// искры у главных кнопок
document.addEventListener('click', e => {
  const el = e.target.closest('.btn-primary, .theme-card, .stars-input button');
  if (!el || document.documentElement.classList.contains('lite')) return;
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('i');
    const a = (Math.PI * 2 * i) / 10, d = 30 + Math.random() * 30;
    s.className = 'spark';
    s.style.left = e.clientX - 3 + 'px';
    s.style.top = e.clientY - 3 + 'px';
    s.style.setProperty('--dx', Math.cos(a) * d + 'px');
    s.style.setProperty('--dy', Math.sin(a) * d + 'px');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
});

// ---------- 8. Вход через Telegram (виджет) ----------
// Работает только на mybirzumda.uz (домен привязан в BotFather)
const onSiteDomain = () => location.hostname.replace(/^www\./, '') === CONFIG.SITE_HOST;

function tgLogin(box, onDone) {
  if (!onSiteDomain()) return false;
  window.onTelegramAuth = async (user) => {
    try {
      const data = await api('/api/site/auth', { method: 'POST', body: JSON.stringify(user) }); // сервер проверяет подпись
      saveLogin(data);
      onDone?.(data);
    } catch { toast('Error'); }
  };
  box.innerHTML = '';
  const s = document.createElement('script');
  s.src = 'https://telegram.org/js/telegram-widget.js?22';
  s.async = true;
  s.dataset.telegramLogin = CONFIG.LOGIN_BOT;
  s.dataset.size = 'large';
  s.dataset.radius = '12';
  s.dataset.onauth = 'onTelegramAuth(user)';
  s.dataset.requestAccess = 'write';
  box.appendChild(s);
  return true;
}
