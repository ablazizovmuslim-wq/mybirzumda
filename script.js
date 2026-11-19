/* =========================================
   Birzumda — логика сайта
   ========================================= */

// CONFIG, state, api(), toast() и др. — в core.js

// ---------- 2. Переводы (UZ / RU / EN) ----------
const T = {
  uz: {
    cabinet: 'Kabinet', no_order: "Fikr qoldirish uchun avval bajarilgan buyurtmangiz bo'lishi kerak", error: 'Xatolik, keyinroq urinib ko\'ring',
    nav_projects: 'Loyihalar', nav_reviews: 'Fikrlar', nav_about: 'Biz haqimizda', nav_faq: 'Savollar',
    login: 'Kirish', settings: 'Sozlamalar', theme: 'Mavzu', dark: 'Tungi', light: 'Kunduzgi', color: 'Rang', language: 'Til',
    hero_badge: '⚡ Telegram botlar oilasi',
    hero_title: 'Hammasi <span class="grad">bir zumda</span>',
    hero_sub: 'Video yuklash, taqdimot va portfolio tayyorlash — barcha loyihalarimiz bir joyda.',
    hero_btn: "Loyihalarni ko'rish", hero_contact: "Bog'lanish",
    stat_users: 'foydalanuvchi', stat_downloads: 'video yuklandi', stat_orders: 'buyurtma bajarildi',
    projects_title: 'Loyihalarimiz', projects_sub: 'Har biri — bitta vazifani bir zumda bajaradi',
    status_check: 'Tekshirilmoqda', status_on: 'Ishlayapti', status_off: "Ta'mirda",
    yukla_desc: 'Instagram, TikTok, YouTube va boshqa saytlardan videolarni bir zumda yuklab oling.',
    yukla_f1: '✓ Suv belgisiz videolar', yukla_f2: '✓ Tez va bepul', yukla_f3: '✓ UZ / RU / EN tillarida',
    tayyorla_desc: 'Taqdimot, portfolio, kurs ishi va mustaqil ish — talabalar va ustozlar uchun.',
    tayyorla_f1: '✓ Animatsiyali taqdimotlar', tayyorla_f2: '✓ Tayyor ish darhol keladi', tayyorla_f3: '✓ Haftalik promokodlar',
    open_bot: 'Botni ochish',
    reviews_title: 'Mijozlar fikri', reviews_sub: 'Fikr faqat Telegram orqali kirgan foydalanuvchilardan',
    no_reviews: "Hozircha fikrlar yo'q. Birinchi bo'lib fikr qoldiring! ⭐",
    your_rating: 'Bahoyingiz:', review_ph: 'Fikringizni yozing...', send: 'Yuborish',
    need_login: 'Fikr qoldirish uchun avval Telegram orqali kiring',
    need_stars: 'Iltimos, yulduzcha bilan baholang',
    review_sent: 'Rahmat! Fikringiz tekshiruvdan keyin chiqadi',
    login_soon: "Telegram orqali kirish faqat mybirzumda.uz saytida ishlaydi",
    about_title: 'Biz haqimizda',
    about_p1: "Birzumda — Andijonda tug'ilgan brend. Maqsadimiz oddiy: odamlarning kundalik ishlarini Telegram ichida bir zumda hal qilish.",
    about_p2: 'Loyihalar asoschisi — Muhammaddovud Ablazizov, kompyuter injiniringi talabasi va dasturchi.',
    faq_title: "Ko'p beriladigan savollar",
    q1: 'Botlar bepulmi?', a1: "Birzumda Yukla to'liq bepul. Birzumda Tayyorla'da ishlar tarifga qarab pullik, lekin haftalik promokodlar bor.",
    q2: "Buyurtma qancha vaqtda tayyor bo'ladi?", a2: "To'lov tasdiqlangandan so'ng tayyor ish darhol botga yuboriladi.",
    q3: 'Saytga qanday kiraman?', a3: '"Kirish" tugmasini bosing va Telegram orqali tasdiqlang. Parol kerak emas.',
    q4: "Muammo bo'lsa kimga yozaman?", a4: 'Texnik yordam: @Abdulazizov_prince',
    support: 'Texnik yordam:'
  },
  ru: {
    cabinet: 'Кабинет', no_order: 'Отзыв можно оставить только после выполненного заказа', error: 'Ошибка, попробуйте позже',
    nav_projects: 'Проекты', nav_reviews: 'Отзывы', nav_about: 'О нас', nav_faq: 'Вопросы',
    login: 'Войти', settings: 'Настройки', theme: 'Тема', dark: 'Тёмная', light: 'Светлая', color: 'Цвет', language: 'Язык',
    hero_badge: '⚡ Семья Telegram-ботов',
    hero_title: 'Всё <span class="grad">в один миг</span>',
    hero_sub: 'Скачивание видео, презентации и портфолио — все наши проекты в одном месте.',
    hero_btn: 'Смотреть проекты', hero_contact: 'Связаться',
    stat_users: 'пользователей', stat_downloads: 'видео скачано', stat_orders: 'заказов выполнено',
    projects_title: 'Наши проекты', projects_sub: 'Каждый решает одну задачу в один миг',
    status_check: 'Проверка', status_on: 'Работает', status_off: 'На обслуживании',
    yukla_desc: 'Скачивайте видео из Instagram, TikTok, YouTube и других сайтов в один миг.',
    yukla_f1: '✓ Видео без водяных знаков', yukla_f2: '✓ Быстро и бесплатно', yukla_f3: '✓ На UZ / RU / EN',
    tayyorla_desc: 'Презентации, портфолио, курсовые и самостоятельные работы — для студентов и преподавателей.',
    tayyorla_f1: '✓ Анимированные презентации', tayyorla_f2: '✓ Готовая работа приходит сразу', tayyorla_f3: '✓ Промокоды каждую неделю',
    open_bot: 'Открыть бота',
    reviews_title: 'Отзывы клиентов', reviews_sub: 'Отзывы только от вошедших через Telegram',
    no_reviews: 'Пока отзывов нет. Оставьте первый! ⭐',
    your_rating: 'Ваша оценка:', review_ph: 'Напишите отзыв...', send: 'Отправить',
    need_login: 'Чтобы оставить отзыв, сначала войдите через Telegram',
    need_stars: 'Пожалуйста, поставьте оценку звёздами',
    review_sent: 'Спасибо! Отзыв появится после проверки',
    login_soon: 'Вход через Telegram работает только на сайте mybirzumda.uz',
    about_title: 'О нас',
    about_p1: 'Birzumda — бренд, рождённый в Андижане. Наша цель простая: решать ежедневные задачи людей прямо в Telegram, в один миг.',
    about_p2: 'Основатель проектов — Мухаммаддовуд Аблазизов, студент компьютерной инженерии и разработчик.',
    faq_title: 'Частые вопросы',
    q1: 'Боты бесплатные?', a1: 'Birzumda Yukla полностью бесплатный. В Birzumda Tayyorla работы платные по тарифам, но каждую неделю есть промокоды.',
    q2: 'Как быстро будет готов заказ?', a2: 'После подтверждения оплаты готовая работа сразу приходит в бота.',
    q3: 'Как войти на сайт?', a3: 'Нажмите «Войти» и подтвердите через Telegram. Пароль не нужен.',
    q4: 'Куда писать, если проблема?', a4: 'Техподдержка: @Abdulazizov_prince',
    support: 'Техподдержка:'
  },
  en: {
    cabinet: 'Account', no_order: 'You can leave a review only after a completed order', error: 'Error, please try again later',
    nav_projects: 'Projects', nav_reviews: 'Reviews', nav_about: 'About', nav_faq: 'FAQ',
    login: 'Log in', settings: 'Settings', theme: 'Theme', dark: 'Dark', light: 'Light', color: 'Color', language: 'Language',
    hero_badge: '⚡ A family of Telegram bots',
    hero_title: 'Everything <span class="grad">in an instant</span>',
    hero_sub: 'Video downloads, presentations and portfolios — all our projects in one place.',
    hero_btn: 'See projects', hero_contact: 'Contact',
    stat_users: 'users', stat_downloads: 'videos downloaded', stat_orders: 'orders completed',
    projects_title: 'Our projects', projects_sub: 'Each one does one job in an instant',
    status_check: 'Checking', status_on: 'Online', status_off: 'Maintenance',
    yukla_desc: 'Download videos from Instagram, TikTok, YouTube and more in an instant.',
    yukla_f1: '✓ No watermarks', yukla_f2: '✓ Fast and free', yukla_f3: '✓ In UZ / RU / EN',
    tayyorla_desc: 'Presentations, portfolios, coursework and assignments — for students and teachers.',
    tayyorla_f1: '✓ Animated presentations', tayyorla_f2: '✓ Finished work arrives right away', tayyorla_f3: '✓ Weekly promo codes',
    open_bot: 'Open bot',
    reviews_title: 'Customer reviews', reviews_sub: 'Reviews only from users logged in with Telegram',
    no_reviews: 'No reviews yet. Be the first! ⭐',
    your_rating: 'Your rating:', review_ph: 'Write your review...', send: 'Send',
    need_login: 'Log in with Telegram first to leave a review',
    need_stars: 'Please rate with stars',
    review_sent: 'Thanks! Your review will appear after moderation',
    login_soon: 'Telegram login works only on mybirzumda.uz',
    about_title: 'About us',
    about_p1: 'Birzumda is a brand born in Andijan. Our goal is simple: solve everyday tasks right inside Telegram, in an instant.',
    about_p2: 'Founder — Muhammaddovud Ablazizov, computer engineering student and developer.',
    faq_title: 'Frequently asked questions',
    q1: 'Are the bots free?', a1: 'Birzumda Yukla is completely free. Birzumda Tayyorla works are paid by plan, with weekly promo codes.',
    q2: 'How fast is an order ready?', a2: 'Once payment is confirmed, the finished work is sent to the bot right away.',
    q3: 'How do I log in?', a3: 'Tap "Log in" and confirm in Telegram. No password needed.',
    q4: 'Who do I contact if something breaks?', a4: 'Support: @Abdulazizov_prince',
    support: 'Support:'
  }
};

state.rating = 0;
const t = (key) => T[state.lang][key] || T.uz[key] || key;

// ---------- 4. Применение темы, цвета и языка ----------
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $$('[data-theme-set]').forEach(b => b.classList.toggle('active', b.dataset.themeSet === state.theme));
}

function applyAccent() {
  document.documentElement.dataset.accent = state.accent;
  $$('[data-accent-set]').forEach(b => b.classList.toggle('active', b.dataset.accentSet === state.accent));
}

function applyLang() {
  document.documentElement.lang = state.lang;
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  $$('[data-i18n-html]').forEach(el => el.innerHTML = t(el.dataset.i18nHtml));
  $$('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $$('[data-lang-set]').forEach(b => b.classList.toggle('active', b.dataset.langSet === state.lang));
  renderStatuses();
  renderReviews();
  if ($('#loginBtn')) renderLogin();
}

$$('[data-theme-set]').forEach(b => b.addEventListener('click', () => {
  state.theme = b.dataset.themeSet; save('theme', state.theme); applyTheme();
}));
$$('[data-accent-set]').forEach(b => b.addEventListener('click', () => {
  state.accent = b.dataset.accentSet; save('accent', state.accent); applyAccent();
}));
$$('[data-lang-set]').forEach(b => b.addEventListener('click', () => {
  state.lang = b.dataset.langSet; save('lang', state.lang); applyLang();
}));

// ---------- 5. Открытие / закрытие панели настроек ----------
function toggleSettings(open) {
  $('#settings').classList.toggle('open', open);
  $('#overlay').classList.toggle('show', open);
}
$('#settingsBtn').addEventListener('click', () => toggleSettings(true));
$('#closeSettings').addEventListener('click', () => toggleSettings(false));
$('#overlay').addEventListener('click', () => toggleSettings(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleSettings(false); });

// ---------- 7. Анимированный фон с частицами ----------
function startParticles() {
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let w, h, dots;

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    const count = Math.min(70, Math.floor(w * h / 18000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .6
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.globalAlpha = .7;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    // линии между близкими точками
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.globalAlpha = (1 - dist / 120) * .25;
          ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  resize();
  addEventListener('resize', resize);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) frame();
}

// ---------- 8. Плавное появление при прокрутке ----------
function startReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));
}

// ---------- 9. Счётчики (живые цифры) ----------
function animateNumber(el, target) {
  const start = performance.now(), dur = 1600;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * eased).toLocaleString('ru-RU') + (p === 1 ? '+' : '');
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

async function loadStats() {
  let stats;
  try { stats = await api('/api/site/stats'); } catch { return; } // нет сервера — блок цифр скрыт
  botStatus = { ...botStatus, ...(stats.status || {}) };
  renderStatuses();

  let shown = 0;
  $$('[data-count]').forEach(el => {
    const v = stats[el.dataset.count];
    el.closest('.stat').hidden = (v === null || v === undefined);
    if (!el.closest('.stat').hidden) shown++;
  });
  if (!shown) return;
  $('.stats').hidden = false;

  // запускаем счёт, когда блок появился на экране
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateNumber(e.target, stats[e.target.dataset.count] || 0);
      io.unobserve(e.target);
    });
  });
  $$('[data-count]').forEach(el => io.observe(el));
}

// ---------- 10. Статус ботов 🟢 / 🔴 ----------
let botStatus = { yukla: null, tayyorla: null }; // null = не знаем → значок скрыт

function renderStatuses() {
  $$('[data-status]').forEach(el => {
    const s = botStatus[el.dataset.status];
    el.hidden = (s === null || s === undefined);
    el.classList.toggle('online', s === true);
    el.classList.toggle('offline', s === false);
    el.querySelector('em').textContent = s === true ? t('status_on') : s === false ? t('status_off') : t('status_check');
  });
}

// ---------- 11. Отзывы со звёздами ----------
let reviews = []; // этап 2: загружаются с сервера

function renderReviews() {
  const box = $('#reviewsList');
  if (!reviews.length) {
    box.innerHTML = `<p class="empty glass">${t('no_reviews')}</p>`;
    return;
  }
  box.innerHTML = reviews.map(r => `
    <div class="review glass">
      <div class="review-head">
        <div class="avatar">${escapeHtml(r.name[0] || '?')}</div>
        <div><b>${escapeHtml(r.name)}</b><div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div></div>
      </div>
      <p>${escapeHtml(r.text)}</p>
    </div>`).join('');
}

async function loadReviews() {
  try { reviews = await api('/api/site/reviews'); } catch { /* сервер недоступен */ }
  renderReviews();
}

// выбор звёзд
$$('[data-star]').forEach(btn => btn.addEventListener('click', () => {
  state.rating = +btn.dataset.star;
  $$('[data-star]').forEach(b => b.classList.toggle('on', +b.dataset.star <= state.rating));
}));

$('#reviewForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!state.token) return toast(t('need_login'));
  if (!state.rating) return toast(t('need_stars'));
  try {
    await api('/api/site/reviews', {
      method: 'POST',
      body: JSON.stringify({ stars: state.rating, text: $('#reviewText').value.trim() })
    });
    toast(t('review_sent'));
    $('#reviewText').value = '';
  } catch (err) {
    toast(err.code === 'no_order' ? t('no_order') : t('error'));
  }
});

// ---------- 12. Вход через Telegram ----------
// Виджет Telegram работает только на домене, привязанном в BotFather (/setdomain)
function renderLogin() {
  const btn = $('#loginBtn');
  if (state.token) {
    btn.querySelector('span').textContent = t('cabinet');
    btn.onclick = () => location.href = 'cabinet.html';
  } else {
    btn.querySelector('span').textContent = t('login');
    btn.onclick = startLogin;
  }
}

function startLogin() {
  if (location.hostname.replace(/^www\./, '') !== CONFIG.SITE_HOST) return toast(t('login_soon'));
  const box = document.createElement('div');
  box.className = 'tg-login';
  const s = document.createElement('script');
  s.src = 'https://telegram.org/js/telegram-widget.js?22';
  s.async = true;
  s.dataset.telegramLogin = CONFIG.LOGIN_BOT;
  s.dataset.size = 'large';
  s.dataset.onauth = 'onTelegramAuth(user)';
  box.appendChild(s);
  $('#loginBtn').replaceWith(box);
}

window.onTelegramAuth = async function (user) {
  try {
    const data = await api('/api/site/auth', { method: 'POST', body: JSON.stringify(user) }); // сервер проверяет подпись
    saveLogin(data);
    location.href = 'cabinet.html';
  } catch { toast(t('error')); }
};

// ---------- 13. Запуск ----------
applyTheme();
applyAccent();
applyLang();
renderLogin();
startParticles();
loadStats();
loadReviews();
$('#year').textContent = new Date().getFullYear();

addEventListener('load', () => {
  setTimeout(() => {
    $('#loader').classList.add('hide');
    startReveal();
  }, 1000);
});
