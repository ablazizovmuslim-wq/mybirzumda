/* =========================================
   Birzumda — логика сайта
   ========================================= */

// CONFIG, state, api(), toast() и др. — в core.js

// ---------- 2. Переводы (UZ / RU / EN) ----------
const T = {
  uz: {
    h1a: 'Hammasi', h1b: 'bir zumda', hero_sub2: "Telegram botlar va sayt: video yuklash, taqdimot va kurs ishi, stiker, valyuta kursi va boshqalar — hammasi bir joyda.",
    wall_title: 'Botlarimiz', wall_sub: 'Har biri bitta ishni bajaradi va Telegram ichida ochiladi.', nav_bots: 'Botlar',
    show_sub: "Taqdimot, portfolio, kurs ishi va mustaqil ish — 32 ta dizayn shablonidan. Narxi 20 000 so'mdan.", show_prices: 'Paketlar va narxlar',
    how_title: 'Saytda buyurtma berish', how1: 'Ishni tanlang', how1s: 'Xizmat, paket, mavzu va muddat', how2: 'Telegram orqali kiring',
    how2s: 'Parolsiz, bitta tugma bilan', how3: "To'lang va kuting", how3s: 'Chek tasdiqlangach, tayyor ish botga keladi',
    foot_tag: "Telegram botlar oilasi. Andijon, O'zbekiston.", foot_bots: 'Botlar', foot_site: 'Sayt', soon: 'Tez orada', free: 'Bepul', open: 'Ochish', more: 'Batafsil',
    tools_title: 'Foydali botlar', tools_sub: 'Bepul, tez va Telegram ichida',
    nav_services: 'Xizmatlar', bn_services: 'Xizmatlar', search_ph: 'Nima kerak? Masalan: slayd, kurs ishi, video', search_btn: 'Qidirish',
    popular_title: 'Mashhur xizmatlar', popular_sub: "Saytning o'zida buyurtma bering — tayyor ish Telegram'ga keladi", all_services: 'Barcha xizmatlar →',
    order_btn: 'Buyurtma berish', nothing: "Hech narsa topilmadi — boshqacha yozib ko'ring", tags: ['Slayd', 'Kurs ishi', 'Portfolio', 'Mustaqil ish', 'Video yuklash'],
    themes_main: 'ASOSIY', themes_new: 'YANGI JONLI', themes_pro: 'BIRZUMDA TAYYORLA USLUBIDA',
    more: 'Batafsil: qanday ishlaydi va narxlar →',
    copied: 'Havola nusxalandi ✅', share_text: "Birzumda — Telegram botlar", lite_auto: "Telefoningiz uchun yengil rejim yoqildi 🍃",
    anim: 'Animatsiyalar', anim_full: "To'liq", anim_lite: 'Yengil',
    reset: 'Sozlamalarni tiklash', bn_home: 'Asosiy', bn_projects: 'Botlar', bn_reviews: 'Fikrlar',
    qr_hint: "Kamerani QR kodga qarating — bot ochiladi", close: 'Yopish',
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
    yukla_desc: 'Instagram, YouTube, Pinterest, TikTok va Facebookʼdan videolarni bir zumda yuklab oling.',
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
    h1a: 'Всё', h1b: 'в один миг', hero_sub2: 'Telegram-боты и сайт: скачать видео, презентации и курсовые, стикеры, курс валют и многое другое — всё в одном месте.',
    wall_title: 'Наши боты', wall_sub: 'Каждый делает одно дело и открывается прямо в Telegram.', nav_bots: 'Боты',
    show_sub: 'Презентации, портфолио, курсовые и самостоятельные — 32 шаблона дизайна. Цена от 20 000 сум.', show_prices: 'Пакеты и цены',
    how_title: 'Заказ на сайте', how1: 'Выберите работу', how1s: 'Услуга, пакет, тема и срок', how2: 'Войдите через Telegram',
    how2s: 'Без пароля, одной кнопкой', how3: 'Оплатите и ждите', how3s: 'После проверки чека готовая работа придёт в бота',
    foot_tag: 'Семья Telegram-ботов. Андижан, Узбекистан.', foot_bots: 'Боты', foot_site: 'Сайт', soon: 'Скоро', free: 'Бесплатно', open: 'Открыть', more: 'Подробнее',
    tools_title: 'Полезные боты', tools_sub: 'Бесплатно, быстро и прямо в Telegram',
    nav_services: 'Услуги', bn_services: 'Услуги', search_ph: 'Что нужно? Например: слайды, курсовая, видео', search_btn: 'Найти',
    popular_title: 'Популярные услуги', popular_sub: 'Заказывайте прямо на сайте — готовая работа придёт в Telegram', all_services: 'Все услуги →',
    order_btn: 'Заказать', nothing: 'Ничего не найдено — попробуйте иначе', tags: ['Слайды', 'Курсовая', 'Портфолио', 'Самостоятельная', 'Скачать видео'],
    themes_main: 'ОСНОВНЫЕ', themes_new: 'НОВЫЕ ЖИВЫЕ', themes_pro: 'В СТИЛЕ BIRZUMDA TAYYORLA',
    more: 'Подробнее: как работает и цены →',
    copied: 'Ссылка скопирована ✅', share_text: 'Birzumda — Telegram-боты', lite_auto: 'Для вашего телефона включён лёгкий режим 🍃',
    anim: 'Анимации', anim_full: 'Полные', anim_lite: 'Лёгкие',
    reset: 'Сбросить настройки', bn_home: 'Главная', bn_projects: 'Боты', bn_reviews: 'Отзывы',
    qr_hint: 'Наведите камеру на QR-код — откроется бот', close: 'Закрыть',
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
    yukla_desc: 'Скачивайте видео из Instagram, YouTube, Pinterest, TikTok и Facebook в один миг.',
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
    h1a: 'Everything', h1b: 'in an instant', hero_sub2: 'Telegram bots and a website: video downloads, presentations and papers, stickers, exchange rates and more — all in one place.',
    wall_title: 'Our bots', wall_sub: 'Each one does one job and opens right inside Telegram.', nav_bots: 'Bots',
    show_sub: 'Presentations, portfolios, term papers and assignments — 32 design templates. From 20,000 sum.', show_prices: 'Plans and prices',
    how_title: 'Ordering on the website', how1: 'Choose the work', how1s: 'Service, plan, topic and deadline', how2: 'Log in with Telegram',
    how2s: 'No password, one tap', how3: 'Pay and relax', how3s: 'Once the receipt is checked, the work arrives in the bot',
    foot_tag: 'A family of Telegram bots. Andijan, Uzbekistan.', foot_bots: 'Bots', foot_site: 'Website', soon: 'Soon', free: 'Free', open: 'Open', more: 'Details',
    tools_title: 'Handy bots', tools_sub: 'Free, fast and right inside Telegram',
    nav_services: 'Services', bn_services: 'Services', search_ph: 'What do you need? e.g. slides, term paper, video', search_btn: 'Search',
    popular_title: 'Popular services', popular_sub: 'Order right on the site — the finished work arrives in Telegram', all_services: 'All services →',
    order_btn: 'Order', nothing: 'Nothing found — try other words', tags: ['Slides', 'Term paper', 'Portfolio', 'Assignment', 'Video download'],
    themes_main: 'MAIN', themes_new: 'NEW LIVE', themes_pro: 'BIRZUMDA TAYYORLA STYLE',
    more: 'Details: how it works & prices →',
    copied: 'Link copied ✅', share_text: 'Birzumda — Telegram bots', lite_auto: 'Light mode turned on for your phone 🍃',
    anim: 'Animations', anim_full: 'Full', anim_lite: 'Light',
    reset: 'Reset settings', bn_home: 'Home', bn_projects: 'Bots', bn_reviews: 'Reviews',
    qr_hint: 'Point your camera at the QR code to open the bot', close: 'Close',
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
    yukla_desc: 'Download videos from Instagram, YouTube, Pinterest, TikTok and Facebook in an instant.',
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

// ---------- 4. 8 тем с живым фоном ----------
const THEMES = [
  { id: 'kosmos', em: '🌌', prev: 'linear-gradient(135deg,#07060b,#4c1d95)', name: { uz: 'Kosmos', ru: 'Космос', en: 'Space' } },
  { id: 'light',  em: '☀️', prev: 'linear-gradient(135deg,#f5f3fb,#c4b5fd)', name: { uz: 'Kunduzgi', ru: 'Дневная', en: 'Daylight' } },
  { id: 'okean',  em: '🌊', prev: 'linear-gradient(135deg,#021420,#0891b2)', name: { uz: 'Okean', ru: 'Океан', en: 'Ocean' } },
  { id: 'neon',   em: '🕹', prev: 'linear-gradient(135deg,#0a0014,#ff2bd6 70%,#22d3ee)', name: { uz: 'Neon', ru: 'Неон', en: 'Neon' } },
  { id: 'qish',   em: '❄️', prev: 'linear-gradient(135deg,#0b1220,#60a5fa)', name: { uz: 'Qish', ru: 'Зима', en: 'Winter' } },
  { id: 'lava',   em: '🔥', prev: 'linear-gradient(135deg,#120604,#f97316)', name: { uz: 'Lava', ru: 'Лава', en: 'Lava' } },
  { id: 'orman',  em: '🌿', prev: 'linear-gradient(135deg,#04110a,#22c55e)', name: { uz: "O'rmon", ru: 'Лес', en: 'Forest' } },
  { id: 'sakura', em: '🌸', prev: 'linear-gradient(135deg,#fff1f5,#ec4899)', name: { uz: 'Sakura', ru: 'Сакура', en: 'Sakura' } },
  // PRO — как шаблоны Birzumda Tayyorla
  { id: 'synth',   pro: 1, em: '🌆', prev: 'linear-gradient(180deg,#0d0221 45%,#ff6ad5 60%,#b14bff)', name: { uz: 'Sintveyv', ru: 'Синтвейв', en: 'Synthwave' } },
  { id: 'rings',   pro: 1, em: '💫', prev: 'radial-gradient(circle at 50% 50%,#7dd3fc 0 6%,#020818 7% 20%,#3b82f6 21% 23%,#020818 24% 40%,#3b82f6 41% 43%,#020818 44%)', name: { uz: 'Halqalar', ru: 'Кольца', en: 'Rings' } },
  { id: 'circuit', pro: 1, em: '🔌', prev: 'linear-gradient(90deg,transparent 48%,#22c55e 49% 51%,transparent 52%),linear-gradient(0deg,transparent 48%,#22c55e 49% 51%,transparent 52%),#02110a', name: { uz: 'Mikrosxema', ru: 'Микросхема', en: 'Circuit' } },
  { id: 'fire',    pro: 1, em: '🌋', prev: 'linear-gradient(160deg,#140500 40%,#f97316 75%,#fb7185)', name: { uz: "Olov to'lqini", ru: 'Огненная волна', en: 'Fire wave' } },
  { id: 'hex',     pro: 1, em: '🔷', prev: 'linear-gradient(135deg,#021316,#0f766e 60%,#5eead4)', name: { uz: 'Olti burchak', ru: 'Соты', en: 'Hexagon' } },
  { id: 'bolt',    pro: 1, em: '⚡', prev: 'linear-gradient(135deg,#0d0a00 50%,#eab308 70%,#fde047)', name: { uz: 'Chaqmoq', ru: 'Молния', en: 'Lightning' } },
  { id: 'holo',    pro: 1, em: '🌈', prev: 'linear-gradient(120deg,#f3f0ff,#a5f3fc,#f9a8d4,#c4b5fd)', name: { uz: 'Golografik', ru: 'Голограмма', en: 'Holographic' } },
  // YANGI — 8 ta jonli tema
  { id: 'aurora', nw: 1, em: '✨', prev: 'linear-gradient(170deg,#020b14 30%,#10b981 60%,#a78bfa)', name: { uz: "Qutb shafag'i", ru: 'Северное сияние', en: 'Aurora' } },
  { id: 'matrix', nw: 1, em: '💻', prev: 'repeating-linear-gradient(90deg,#000a03 0 9px,#16a34a 9px 11px),#000a03', name: { uz: 'Matritsa', ru: 'Матрица', en: 'Matrix' } },
  { id: 'warp',   nw: 1, em: '🚀', prev: 'radial-gradient(circle,#e0e7ff 0 4%,#6366f1 12%,#00010a 60%)', name: { uz: 'Giperfazo', ru: 'Гиперпрыжок', en: 'Hyperspace' } },
  { id: 'rain',   nw: 1, em: '🌧', prev: 'repeating-linear-gradient(100deg,#060b16 0 8px,#38bdf8 8px 9px),#060b16', name: { uz: "Yomg'ir", ru: 'Дождь', en: 'Rain' } },
  { id: 'lamp',   nw: 1, em: '🫧', prev: 'radial-gradient(circle at 30% 70%,#fb923c 0 18%,transparent 19%),radial-gradient(circle at 70% 30%,#f43f5e 0 22%,#12020c 23%)', name: { uz: 'Lava lampa', ru: 'Лава-лампа', en: 'Lava lamp' } },
  { id: 'dna',    nw: 1, em: '🧬', prev: 'linear-gradient(135deg,#010d14 40%,#06b6d4 65%,#f472b6)', name: { uz: 'DNK', ru: 'ДНК', en: 'DNA' } },
  { id: 'galaxy', nw: 1, em: '🪐', prev: 'radial-gradient(circle,#f0abfc 0 5%,#a855f7 20%,#05010f 62%)', name: { uz: 'Galaktika', ru: 'Галактика', en: 'Galaxy' } },
  { id: 'party',  nw: 1, em: '🎉', prev: 'conic-gradient(#f59e0b,#ec4899,#22d3ee,#a3e635,#f59e0b)', name: { uz: 'Bayram', ru: 'Праздник', en: 'Party' } }
];

function renderThemeList() {
  const card = th => `
    <button class="theme-card${th.pro ? ' pro' : ''}${th.id === state.theme ? ' active' : ''}" data-theme-set="${th.id}" style="--prev:${th.prev}">
      <span class="em">${th.em}</span>${th.name[state.lang] || th.name.uz}
    </button>`;
  $('#themeList').innerHTML =
    `<p class="theme-group">${t('themes_new')} <b>NEW</b></p>` + THEMES.filter(x => x.nw).map(card).join('') +
    `<p class="theme-group">${t('themes_main')}</p>` + THEMES.filter(x => !x.pro && !x.nw).map(card).join('') +
    `<p class="theme-group">${t('themes_pro')} <b>PRO</b></p>` + THEMES.filter(x => x.pro).map(card).join('');
}

// смена темы с круговой анимацией от места нажатия
function setTheme(id, e) {
  const apply = () => {
    state.theme = id; save('theme', id);
    document.documentElement.dataset.theme = id;
    $$('[data-theme-set]').forEach(b => b.classList.toggle('active', b.dataset.themeSet === id));
    FX.setTheme(id);
  };
  if (document.startViewTransition && e && state.fx === 'full') {
    document.documentElement.style.setProperty('--vx', e.clientX + 'px');
    document.documentElement.style.setProperty('--vy', e.clientY + 'px');
    document.startViewTransition(apply);
  } else apply();
}

$('#themeList').addEventListener('click', e => {
  const b = e.target.closest('[data-theme-set]');
  if (b) setTheme(b.dataset.themeSet, e);
});

function applyAccent() {
  document.documentElement.dataset.accent = state.accent;
  $$('[data-accent-set]').forEach(b => b.classList.toggle('active', b.dataset.accentSet === state.accent));
  FX.refreshColors();
}
$$('[data-accent-set]').forEach(b => b.addEventListener('click', () => {
  state.accent = b.dataset.accentSet; save('accent', state.accent); applyAccent();
}));

// ---------- 5. Язык ----------
function applyLang() {
  document.documentElement.lang = state.lang;
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  $$('[data-i18n-html]').forEach(el => el.innerHTML = t(el.dataset.i18nHtml));
  $$('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $$('[data-lang-set]').forEach(b => b.classList.toggle('active', b.dataset.langSet === state.lang));
  $('#langQuick').textContent = state.lang.toUpperCase();
  renderThemeList();
  renderStatuses();
  renderReviews();
  renderLogin();
  if ($('#wall')) renderBots();
}
function setLang(l) { state.lang = l; save('lang', l); applyLang(); }
$$('[data-lang-set]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.langSet)));
// быстрая кнопка языка в шапке: UZ → RU → EN → UZ
$('#langQuick').addEventListener('click', () => setLang({ uz: 'ru', ru: 'en', en: 'uz' }[state.lang]));

// ---------- 6. Анимации (полные / лёгкие) ----------
state.fx = load('fx', '');           // '' = ещё не решили → проверим телефон

function applyFx() {
  const full = state.fx !== 'lite';
  document.documentElement.classList.toggle('lite', !full);
  FX.setEnabled(full);
  $$('[data-fx-set]').forEach(b => b.classList.toggle('active', b.dataset.fxSet === (full ? 'full' : 'lite')));
}

$$('[data-fx-set]').forEach(b => b.addEventListener('click', () => {
  state.fx = b.dataset.fxSet; save('fx', state.fx); applyFx();
}));

// автопроверка: тянет ли телефон живые анимации
async function autoFx() {
  if (state.fx) return;                                   // человек уже выбрал сам
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || deviceIsWeak()) {
    state.fx = 'lite'; applyFx(); return;
  }
  const fps = await measureFps(3000);
  if (fps < 40) {                                         // тормозит → лёгкий режим
    state.fx = 'lite'; save('fx', 'lite'); applyFx();
    toast(t('lite_auto'));
  }
}

$('#resetBtn').addEventListener('click', () => {
  ['theme', 'accent', 'lang', 'fx'].forEach(k => save(k, null));
  location.reload();
});

// ---------- 7. Панель настроек ----------
function toggleSettings(open) {
  $('#settings').classList.toggle('open', open);
  $('#overlay').classList.toggle('show', open);
}
$('#settingsBtn').addEventListener('click', () => toggleSettings(true));
$('#closeSettings').addEventListener('click', () => toggleSettings(false));
$('#overlay').addEventListener('click', () => toggleSettings(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleSettings(false); closeQr(); } });

// ---------- 7б. Полезные кнопки ----------
const botUrl = (bot) => 'https://t.me/' + bot;

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast(t('copied')); }
  catch { toast(text); }                                  // если копирование запрещено — показываем ссылку
}

$$('[data-copy-link]').forEach(b => b.addEventListener('click', () => copyText(botUrl(b.dataset.copyLink))));

$$('[data-share]').forEach(b => b.addEventListener('click', async () => {
  const url = botUrl(b.dataset.share);
  try { await navigator.share({ title: 'Birzumda', text: t('share_text'), url }); }
  catch (e) { if (e.name !== 'AbortError') copyText(url); }
}));

// QR-код: библиотека грузится только при первом нажатии
let qrLib;
function loadQrLib() {
  qrLib ??= new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    s.onload = ok; s.onerror = fail; document.head.appendChild(s);
  });
  return qrLib;
}
$$('[data-qr]').forEach(b => b.addEventListener('click', async () => {
  const url = botUrl(b.dataset.qr);
  $('#qrTitle').textContent = '@' + b.dataset.qr;
  $('#qrBox').innerHTML = '';
  $('#qrModal').classList.add('show');
  try {
    await loadQrLib();
    new QRCode($('#qrBox'), { text: url, width: 200, height: 200, colorDark: '#16121f', colorLight: '#ffffff' });
  } catch { $('#qrBox').textContent = url; }
}));
function closeQr() { $('#qrModal').classList.remove('show'); }
$('#qrClose').addEventListener('click', closeQr);
$('#qrModal').addEventListener('click', e => { if (e.target.id === 'qrModal') closeQr(); });

// полоса прокрутки сверху + кнопка «наверх» с кольцом
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  $('#progress').style.transform = `scaleX(${p})`;
  $('#totop').classList.toggle('show', scrollY > 500);
  $('#totopRing').style.strokeDashoffset = 151 - 151 * p;
}
addEventListener('scroll', onScroll, { passive: true });
$('#totop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// нижнее меню: подсвечиваем раздел, который сейчас на экране
const secIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id === 'about' || e.target.id === 'faq' ? 'reviews' : e.target.id;
    $$('.bnav a[data-sec]').forEach(a => a.classList.toggle('active', a.dataset.sec === id));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
['top', 'projects', 'reviews', 'about', 'faq'].forEach(id => $('#' + id) && secIo.observe($('#' + id)));

// 3D-наклон карточек за мышкой
$$('.card').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || state.fx === 'lite') return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg');
    card.style.setProperty('--rx', -((e.clientY - r.top) / r.height - .5) * 10 + 'deg');
    card.classList.add('tilt');
  });
  card.addEventListener('pointerleave', () => card.classList.remove('tilt'));
});

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
    el.closest('.live-pill').hidden = (v === null || v === undefined);
    if (!el.closest('.live-pill').hidden) shown++;
  });
  if (!shown) return;
  $('#live').hidden = false;

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
  $$('[data-star]').forEach(b => {
    b.classList.toggle('on', +b.dataset.star <= state.rating);
    b.classList.remove('pop');
    if (+b.dataset.star <= state.rating) { void b.offsetWidth; b.style.animationDelay = (b.dataset.star * 40) + 'ms'; b.classList.add('pop'); }
  });
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
  if (!state.token && onSiteDomain()) setTimeout(() => QuickLogin.prepare(), 1200);
  const go = state.token ? () => location.href = 'cabinet.html' : startLogin;
  const label = state.token ? t('cabinet') : t('login');
  const btn = $('#loginBtn');
  if (btn) { btn.querySelector('span').textContent = label; btn.onclick = go; }
  const bn = $('#bnavLogin');
  bn.querySelector('span').textContent = label;
  bn.onclick = (e) => { e.preventDefault(); if (!state.token) scrollTo({ top: 0, behavior: 'smooth' }); go(); };
}

function startLogin() {
  if (!onSiteDomain()) return toast(t('login_soon'));
  QuickLogin.go(() => location.href = 'cabinet.html');
}

// ---------- 12б. Поиск услуг и популярные услуги ----------
function svcCard(it) {
  const L = state.lang;
  return `
    <a class="svc-card glass" href="${it.url}">
      <span class="svc-ic">${it.icon}</span>
      <b>${escapeHtml(it.names[L])}</b>
      <p class="muted">${escapeHtml(it.descs[L] || '')}</p>
      <span class="svc-price">${priceText(it.from, L, !!it.pkgs)}</span>
      <span class="btn btn-primary small">${it.kind === 'bot' ? t('open_bot') : t('order_btn')}</span>
    </a>`;
}

function renderSuggest() {
  const q = $('#heroQ').value.trim(), box = $('#suggest');
  if (!q) { box.hidden = true; return; }
  const res = searchCatalog(q).slice(0, 6);
  box.hidden = false;
  box.innerHTML = res.length ? res.map(it => `
    <a href="${it.url}" class="sg-row"><span>${it.icon}</span><span><b>${escapeHtml(it.names[state.lang])}</b>
      <small class="muted">${it.aud ? (it.aud === 's' ? '🎓' : '👩‍🏫') : '🤖'} ${priceText(it.from, state.lang, !!it.pkgs)}</small></span></a>`).join('')
    : `<p class="muted sg-empty">${t('nothing')}</p>`;
}

// ---------- Боты: орбита, стена, витрина ----------
const WALL = [
  { id: 'yukla', big: 1, url: 'bot.html#yukla', tg: 'Birzumda_Yukla_bot', price: 0, color: '#3b82f6',
    name: 'Birzumda Yukla', d: { uz: 'Instagram, YouTube, Pinterest, TikTok va Facebook videolarini suv belgisiz yuklaydi',
      ru: 'Скачивает видео из Instagram, YouTube, Pinterest, TikTok и Facebook без водяных знаков',
      en: 'Downloads Instagram, YouTube, Pinterest, TikTok and Facebook videos without watermarks' } },
  { id: 'tayyorla', big: 1, url: 'bot.html#tayyorla', tg: 'Birzumda_Tayyorla_bot', price: 20000, color: '#a855f7',
    name: 'Birzumda Tayyorla', d: { uz: 'Taqdimot, portfolio, kurs ishi va mustaqil ish talabalar va ustozlar uchun',
      ru: 'Презентации, портфолио, курсовые и самостоятельные для студентов и преподавателей',
      en: 'Presentations, portfolios, term papers and assignments for students and teachers' } },
  { id: 'lotin', tg: 'Birzumda_Lotin_bot', price: 0, color: '#a855f7', name: 'Birzumda Lotin',
    d: { uz: "Kirill ↔ lotin: matn va Word fayllar", ru: 'Кириллица ↔ латиница: текст и Word', en: 'Cyrillic ↔ Latin: text and Word files' } },
  { id: 'hisob', tg: 'Birzumda_Hisob_bot', price: 0, color: '#10b981', name: 'Birzumda Hisob',
    d: { uz: 'Valyuta kursi, konvertor, QR kod, kredit', ru: 'Курс валют, конвертер, QR, кредит', en: 'Rates, converter, QR codes, loans' } },
  { id: 'stiker', tg: 'Birzumda_Stiker_bot', price: 0, color: '#f97316', name: 'Birzumda Stiker',
    d: { uz: "Rasmdan stiker va o'z stikerpakingiz", ru: 'Стикеры из фото и свой стикерпак', en: 'Stickers from photos and your own pack' } },
  { id: 'musiqa', tg: 'Birzumda_Musiqa_bot', price: 0, color: '#ec4899', name: 'Birzumda Musiqa',
    d: { uz: 'Videodan va ovozli xabardan MP3', ru: 'MP3 из видео и голосовых', en: 'MP3 from videos and voice messages' } },
  { id: 'eslatma', soon: 1, tg: 'Birzumda_Eslatma_bot', price: 0, color: '#eab308', name: 'Birzumda Eslatma',
    d: { uz: 'Eslatmalar va dars jadvali', ru: 'Напоминания и расписание', en: 'Reminders and timetable' } }
];
const TPLS = [1, 4, 7, 13, 15, 17, 19, 23, 25, 28];
const botHref = (b) => b.url || `https://t.me/${b.tg}`;
const ext = (b) => b.url ? '' : ' target="_blank" rel="noopener"';

function renderBots() {
  const L = state.lang;
  // орбита: логотипы по кругу
  $('#orbitSpin').innerHTML = WALL.map((b, i) => `
    <button class="orb" style="--i:${i};--n:${WALL.length};--c:${b.color}" data-orb="${b.id}" aria-label="${b.name}">
      <span class="float"><img src="media/logos/${b.id}.webp" alt="" width="84" height="84"></span></button>`).join('');
  // стена ботов
  $('#wall').innerHTML = WALL.map(b => `
    <a class="tile${b.big ? ' big' : ''}${b.soon ? ' soon' : ''}" href="${b.soon ? '#projects' : botHref(b)}"${b.soon ? '' : ext(b)} style="--c:${b.color}">
      <img src="media/logos/${b.id}.webp" alt="" width="120" height="120" loading="lazy">
      <span class="tile-body">
        <b>${b.name}</b>
        <span class="muted">${escapeHtml(b.d[L])}</span>
        <span class="tile-foot">
          <span class="price">${b.soon ? t('soon') : b.price ? priceText(b.price, L, true) : t('free')}</span>
          ${b.id === 'yukla' || b.id === 'tayyorla' ? `<span class="status" data-status="${b.id}" hidden><i></i><em></em></span>` : ''}
        </span>
      </span>
    </a>`).join('');
  // витрина шаблонов Tayyorla
  $('#ribbon').innerHTML = TPLS.map(n => `<img src="media/tpl/s${n}.webp" alt="" width="560" height="315" loading="lazy">`).join('');
  $('#footBots').innerHTML = WALL.filter(b => !b.soon).map(b => `<li><a href="https://t.me/${b.tg}" target="_blank" rel="noopener">@${b.tg}</a></li>`).join('');
  $('#quickTags').innerHTML = t('tags').map(x => `<button type="button" class="tag">${x}</button>`).join('');
  renderStatuses();
}

// клик по логотипу на орбите — карточка бота
$('#orbitSpin').addEventListener('click', e => {
  const o = e.target.closest('[data-orb]');
  if (!o) return;
  const b = WALL.find(x => x.id === o.dataset.orb), L = state.lang, card = $('#orbitCard');
  $$('.orb').forEach(x => x.classList.toggle('on', x === o));
  card.style.setProperty('--c', b.color);
  card.innerHTML = `<img src="media/logos/${b.id}.webp" alt="" width="56" height="56">
    <div><b>${b.name}</b><p class="muted">${escapeHtml(b.d[L])}</p></div>
    ${b.soon ? `<span class="price">${t('soon')}</span>` : `<a class="btn btn-primary small" href="${botHref(b)}"${ext(b)}>${t('open')}</a>`}`;
  card.hidden = false;
});

$('#heroQ').addEventListener('input', renderSuggest);
$('#heroQ').addEventListener('focus', renderSuggest);
document.addEventListener('click', e => { if (!e.target.closest('#heroSearch')) $('#suggest').hidden = true; });
$('#heroSearch').addEventListener('submit', e => {
  e.preventDefault();
  save('q', $('#heroQ').value.trim());
  location.href = 'services.html';
});
$('#quickTags').addEventListener('click', e => {
  const tag = e.target.closest('.tag'); if (!tag) return;
  $('#heroQ').value = tag.textContent; $('#heroQ').focus(); renderSuggest();
});
renderBots();
loadCatalog();

// ---------- 13. Запуск ----------
if (!THEMES.some(th => th.id === state.theme)) state.theme = 'kosmos';
document.documentElement.dataset.theme = state.theme;
applyAccent();
applyLang();
FX.setTheme(state.theme);
applyFx();
loadStats();
loadReviews();
$('#year').textContent = new Date().getFullYear();

addEventListener('load', () => {
  setTimeout(() => {
    $('#loader').classList.add('hide');
    $('#sign').classList.add('on');            // вывеска «включается» один раз
    startReveal();
    autoFx();
  }, 1000);
});
