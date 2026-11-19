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
                   'synth', 'rings', 'circuit', 'fire', 'hex', 'bolt', 'holo',
                   'aurora', 'matrix', 'warp', 'rain', 'lamp', 'dna', 'galaxy', 'party'];
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

// Вход без номера телефона: сайт → бот (/start login_X) → «✅ Ha, kiraman» → кабинет
const QL_TX = {
  uz: { btn: 'Telegram orqali kirish', hint: "Raqam kerak emas — bot ochiladi, bitta tugma va tayyor",
        wait: "Telegram'da «✅ Ha, kiraman» tugmasini bosing", open: "Botni ochish", cancel: 'Bekor qilish',
        exp: "Vaqt tugadi — qaytadan bosing", ok: 'Xush kelibsiz' },
  ru: { btn: 'Войти через Telegram', hint: 'Без номера телефона — откроется бот, одна кнопка и готово',
        wait: 'Нажмите в Telegram «✅ Да, войти»', open: 'Открыть бота', cancel: 'Отмена',
        exp: 'Время вышло — нажмите ещё раз', ok: 'Добро пожаловать' },
  en: { btn: 'Log in with Telegram', hint: 'No phone number — the bot opens, one tap and done',
        wait: 'Tap «✅ Yes, log me in» in Telegram', open: 'Open the bot', cancel: 'Cancel',
        exp: 'Time is up — tap again', ok: 'Welcome' }
};
const TG_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.3.2 1.5-.7l2.7-12.7c.3-1.1-.4-1.6-1.1-1.3L3.8 10.8c-1.1.4-1.1 1-.2 1.3l4.1 1.3 9.6-6c.5-.3.9-.1.5.2"/></svg>';

const QuickLogin = (() => {
  let ses = null, prep = null, timer = 0, done = null, sheet = null;
  const tx = () => QL_TX[state.lang] || QL_TX.uz;
  const mobile = () => matchMedia('(pointer: coarse)').matches;
  const httpsLink = () => `https://t.me/${CONFIG.ORDER_BOT}?start=${ses.start}`;
  const appLink = () => `tg://resolve?domain=${CONFIG.ORDER_BOT}&start=${ses.start}`;
  const fresh = () => ses && Date.now() < ses.until;

  function prepare() {                        // заранее берём одноразовый код, чтобы клик сразу открыл бота
    if (fresh()) return Promise.resolve(ses);
    prep = prep || api('/api/site/login/start', { method: 'POST', body: JSON.stringify({ lang: state.lang }) })
      .then(d => (ses = { ...d, until: Date.now() + (d.ttl - 20) * 1000 }))
      .catch(() => (ses = null))
      .finally(() => { prep = null; });
    return prep;
  }

  function showSheet() {
    sheet?.remove();
    sheet = document.createElement('div');
    sheet.className = 'ql-sheet';
    sheet.innerHTML = `<div class="ql-card glass">
        <div class="ql-orb">${TG_ICON}</div>
        <b class="ql-msg">${tx().wait}</b>
        <span class="ql-dots"><i></i><i></i><i></i></span>
        <a class="btn btn-tg ql-open" target="_blank" rel="noopener" href="${ses ? httpsLink() : '#'}">${TG_ICON}<span>${tx().open}</span></a>
        <button class="btn btn-ghost small ql-cancel" type="button">${tx().cancel}</button>
      </div>`;
    document.body.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('on'));
    sheet.querySelector('.ql-cancel').onclick = close;
    sheet.addEventListener('click', e => { if (e.target === sheet) close(); });
  }
  function close() { clearTimeout(timer); sheet?.remove(); sheet = null; done = null; }

  async function poll() {
    clearTimeout(timer);
    if (!sheet || !ses) return;
    try {
      const r = await api(`/api/site/login/check?t=${encodeURIComponent(ses.token)}&k=${encodeURIComponent(ses.key)}`);
      if (r.token) {
        const cb = done; ses = null; close(); saveLogin(r);
        toast(`✅ ${tx().ok}, ${r.user?.first_name || ''}!`); try { navigator.vibrate?.(30); } catch { /* — */ }
        return cb?.(r);
      }
    } catch (e) {
      if (e.status === 410) {                  // код устарел — сразу готовим новый
        ses = null; sheet.querySelector('.ql-msg').textContent = tx().exp;
        await prepare(); if (ses && sheet) sheet.querySelector('.ql-open').href = httpsLink();
      }
    }
    timer = setTimeout(poll, document.hidden ? 3000 : 1500);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && sheet) poll(); });

  // клик по «Kirish»: открываем бота синхронно (иначе браузер заблокирует)
  function go(onDone) {
    done = onDone;
    if (fresh()) {
      if (mobile()) location.href = appLink(); else window.open(httpsLink(), '_blank', 'noopener');
      showSheet(); poll();
    } else {
      showSheet();
      prepare().then(() => {
        if (!sheet) return;
        if (!ses) {                                       // сервер без быстрого входа → виджет
          const card = sheet.querySelector('.ql-card'), cb = done;
          card.querySelector('.ql-dots').remove(); card.querySelector('.ql-open').remove();
          card.querySelector('.ql-msg').textContent = tx().btn;
          const box = document.createElement('div'); card.insertBefore(box, card.querySelector('.ql-cancel'));
          widgetLogin(box, (d) => { sheet = null; cb?.(d); });
          return;
        }
        sheet.querySelector('.ql-open').href = httpsLink();
        poll();
      });
    }
  }
  return { prepare, go };
})();

// запасной вариант: старый виджет Telegram (если сервер ещё без быстрого входа)
function widgetLogin(box, onDone) {
  window.onTelegramAuth = async (user) => {
    try {
      const data = await api('/api/site/auth', { method: 'POST', body: JSON.stringify(user) });
      saveLogin(data); document.querySelector('.ql-sheet')?.remove(); onDone?.(data);
    } catch { toast('Error'); }
  };
  box.innerHTML = '';
  const s = document.createElement('script');
  s.src = 'https://telegram.org/js/telegram-widget.js?22'; s.async = true;
  Object.assign(s.dataset, { telegramLogin: CONFIG.LOGIN_BOT, size: 'large', radius: '12',
                             onauth: 'onTelegramAuth(user)', requestAccess: 'write' });
  box.appendChild(s);
}

// кнопка входа внутри блока (страница заказа)
function tgLogin(box, onDone) {
  if (!onSiteDomain()) return false;
  const T = QL_TX[state.lang] || QL_TX.uz;
  box.innerHTML = `<button class="btn btn-tg ql-btn" type="button">${TG_ICON}<span>${T.btn}</span></button>
    <p class="muted ql-hint">${T.hint}</p>`;
  box.querySelector('.ql-btn').onclick = () => QuickLogin.go(onDone);
  QuickLogin.prepare();
  return true;
}
