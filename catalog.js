/* =========================================
   Birzumda — каталог услуг и поиск (главная, services.html, order.html)
   Данные берутся из бота Tayyorla (/api/site/catalog), запасная копия — tayyorla-catalog.json
   ========================================= */

const CAT = { data: null, items: [] };

// дополнительные слова для поиска (на всех языках, с ошибками)
const KEYWORDS = {
  taqdimot: 'slayd slide презентация prezentatsiya presentation pptx powerpoint taqdimod',
  mustaqil: 'mustaqil ish самостоятельная srs word referat',
  kurs: 'kurs ishi курсовая coursework term paper',
  maqola: 'maqola tezis статья тезис article thesis ilmiy',
  amaliy: 'amaliy laboratoriya лабораторная практическая lab hisobot',
  referat: 'referat реферат essay',
  portfolio: 'portfolio портфолио rezyume резюме cv',
  dars: 'dars ochiq dars урок открытый lesson slayd',
  oum: 'oum o\'quv uslubiy majmua умк методичка syllabus',
  ishlanma: 'ishlanma dars ishlanmasi разработка урока lesson plan',
  test: 'test savollar тест вопросы quiz',
  tadbir: 'tadbir ssenariy мероприятие сценарий event',
  boshqa: 'boshqa другое other',
  yukla: 'video yuklash скачать download instagram youtube tiktok pinterest facebook reels',
  lotin: 'lotin kirill кириллица латиница latin cyrillic alifbo transliteratsiya word',
  hisob: 'kurs valyuta dollar курс валют доллар qr kod кредит kredit kalkulyator calculator',
  stiker: 'stiker стикер sticker rasm фото photo',
  musiqa: 'musiqa mp3 музыка audio ovoz звук video'
};

const BOT_ITEMS = [
  { id: 'lotin', kind: 'bot', icon: '🔤', from: 0, url: 'https://t.me/Birzumda_Lotin_bot',
    names: { uz: 'Birzumda Lotin — kirill ↔ lotin', ru: 'Birzumda Lotin — кириллица ↔ латиница', en: 'Birzumda Lotin — Cyrillic ↔ Latin' },
    descs: { uz: "Matn va Word fayllarni bir zumda o'giradi — bepul", ru: 'Переводит текст и Word-файлы в один миг — бесплатно',
             en: 'Converts text and Word files instantly — free' } },
  { id: 'hisob', kind: 'bot', icon: '🧮', from: 0, url: 'https://t.me/Birzumda_Hisob_bot',
    names: { uz: 'Birzumda Hisob — kurs, QR, kredit', ru: 'Birzumda Hisob — курс, QR, кредит', en: 'Birzumda Hisob — rates, QR, loans' },
    descs: { uz: 'Markaziy bank kursi, konvertor, QR kod, kredit kalkulyatori', ru: 'Курс ЦБ, конвертер, QR-код, кредитный калькулятор',
             en: 'Central Bank rates, converter, QR codes, loan calculator' } },
  { id: 'stiker', kind: 'bot', icon: '🧩', from: 0, url: 'https://t.me/Birzumda_Stiker_bot',
    names: { uz: 'Birzumda Stiker — rasmdan stiker', ru: 'Birzumda Stiker — стикер из фото', en: 'Birzumda Stiker — photo to sticker' },
    descs: { uz: "Rasmdan stiker va o'z stikerpakingiz", ru: 'Стикеры из фото и свой стикерпак', en: 'Stickers from photos and your own pack' } },
  { id: 'musiqa', kind: 'bot', icon: '🎵', from: 0, url: 'https://t.me/Birzumda_Musiqa_bot',
    names: { uz: 'Birzumda Musiqa — videodan MP3', ru: 'Birzumda Musiqa — MP3 из видео', en: 'Birzumda Musiqa — MP3 from video' },
    descs: { uz: 'Video, dumaloq video va ovozli xabardan MP3', ru: 'MP3 из видео, кружков и голосовых', en: 'MP3 from videos, video notes and voice' } },
  { id: 'yukla', kind: 'bot', icon: '📥', from: 0, url: 'bot.html#yukla',
    names: { uz: 'Birzumda Yukla — video yuklash', ru: 'Birzumda Yukla — скачать видео', en: 'Birzumda Yukla — video download' },
    descs: { uz: 'Instagram, YouTube, Pinterest, TikTok, Facebook — bepul', ru: 'Instagram, YouTube, Pinterest, TikTok, Facebook — бесплатно',
             en: 'Instagram, YouTube, Pinterest, TikTok, Facebook — free' } }
];

const SVC_ICONS = { taqdimot: '📊', mustaqil: '📝', kurs: '📚', maqola: '📰', amaliy: '🧪', referat: '📄', portfolio: '💼',
                    dars: '🎓', oum: '📘', ishlanma: '🗂', test: '✅', tadbir: '🎉', boshqa: '✨' };

async function loadCatalog() {
  if (CAT.data) return CAT;
  try { CAT.data = await api('/api/site/catalog'); }
  catch { try { CAT.data = await (await fetch('tayyorla-catalog.json')).json(); } catch { CAT.data = null; } }
  buildIndex();
  return CAT;
}

// перевод названия услуги / пакета
function svcInfo(aud, svc, lang) {
  const c = CAT.data.catalog, base = c[aud].services[svc], t = c.i18n?.[lang]?.[aud]?.services?.[svc];
  return { name: t?.name || base.name, desc: t?.desc || base.desc || '' };
}
function pkgInfo(aud, svc, pkg, lang) {
  const c = CAT.data.catalog, p = c[aud].services[svc].packages[pkg], t = c.i18n?.[lang]?.[aud]?.services?.[svc]?.packages?.[pkg];
  return { name: t ? t[0] : p[0], price: p[1], desc: t ? t[1] : p[2] };
}

function buildIndex() {
  CAT.items = [];
  if (CAT.data) {
    const c = CAT.data.catalog;
    for (const aud of ['s', 't']) {
      for (const [svc, v] of Object.entries(c[aud].services)) {
        const prices = v.packages ? Object.values(v.packages).map(p => p[1]) : [v.price];
        const names = {}, descs = {};
        for (const l of ['uz', 'ru', 'en']) { const i = svcInfo(aud, svc, l); names[l] = i.name; descs[l] = i.desc; }
        CAT.items.push({ id: `${aud}-${svc}`, kind: 'service', aud, svc, icon: SVC_ICONS[svc] || '✨', names, descs,
                         from: prices.every(p => p == null) ? null : Math.min(...prices.filter(p => p != null)),
                         pkgs: v.packages ? Object.keys(v.packages) : null, url: `order.html#${aud}-${svc}` });
      }
    }
  }
  CAT.items.push(...BOT_ITEMS);
}

const norm = (s) => String(s || '').toLowerCase().replace(/[ʼ'‘’`]/g, '').replace(/\s+/g, ' ').trim();

// поиск: каждое слово запроса должно найтись в названии, описании или ключевых словах
function searchCatalog(q, filter = 'all') {
  const words = norm(q).split(' ').filter(Boolean);
  return CAT.items
    .filter(it => filter === 'all' || (filter === 'bot' ? it.kind === 'bot' : it.aud === filter))
    .map(it => {
      const hay = norm([...Object.values(it.names), ...Object.values(it.descs), KEYWORDS[it.svc || it.id] || ''].join(' '));
      const name = norm(Object.values(it.names).join(' '));
      let score = 0;
      for (const w of words) {
        if (name.includes(w)) score += 3;
        else if (hay.includes(w)) score += 1;
        else return null;
      }
      return { it, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map(x => x.it);
}

function priceText(n, lang, isFrom = false) {
  if (n == null) return { uz: 'Kelishiladi', ru: 'Договорная', en: 'Negotiable' }[lang];
  if (n === 0) return { uz: 'Bepul', ru: 'Бесплатно', en: 'Free' }[lang];
  const s = n.toLocaleString('ru-RU');
  if (!isFrom) return `${s} so'm`;
  return { uz: `${s} so'mdan`, ru: `от ${s} сум`, en: `from ${s} sum` }[lang];
}
