/* =========================================
   Birzumda — общий код для всех страниц
   (index.html, cabinet.html, admin.html)
   ========================================= */

// ---------- 1. Настройки сайта ----------
const CONFIG = {
  // сервер Birzumda Tayyorla на Railway (там же API сайта: /api/site/...)
  API_URL: 'https://bot-production-24253578.up.railway.app',
  SITE_HOST: 'mybirzumda.uz',          // вход через Telegram работает только на этом домене
  LOGIN_BOT: 'Birzumda_Tayyorla_bot'   // бот для входа (в BotFather: /setdomain → mybirzumda.uz)
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
  theme: load('theme', 'dark'),
  accent: load('accent', 'purple'),
  lang: load('lang', 'uz'),          // при первом заходе всегда узбекский
  token: load('token', ''),          // токен входа (выдаёт наш сервер)
  user: JSON.parse(load('user', 'null')),
  admin: load('admin', '') === '1'
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// тема и цвет применяются сразу, на любой странице
document.documentElement.dataset.theme = state.theme;
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
