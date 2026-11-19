/* =========================================
   Birzumda — страница бота (bot.html#yukla, bot.html#tayyorla)
   ========================================= */

const B = {
  uz: { back: '← Orqaga', open: 'Botni ochish', open_big: '🚀 Botni hoziroq ochish', how: '🎬 Qanday ishlaydi',
        packages: '💎 Paketlar va narxlar', info: 'ℹ️ Bot haqida', support: 'Texnik yordam:', online: 'online',
        copied: 'Nusxalandi ✅', free: 'Bepul', free_note: "Bot to'liq bepul — reklama faqat video ostida 💜",
        students: '🎓 Talabalar', teachers: '👩‍🏫 Ustozlar', order: 'Buyurtma berish', from: 'dan', deal: 'Kelishiladi',
        popular: '🔥 Ommabop', subs: '💎 Obuna — ko\'p ish, kam pul', subs_note: 'Obuna davomida avtomatik ishlar to\'lovsiz, boshqa ishlarga −{p}%',
        works: 'ta ish', days: 'kun', extras: '✨ Qo\'shimcha', urgent: '⚡ Shoshilinch buyurtma', turtle: "🐢 Toshbaqa o'qituvchi (talabalarga)",
        turtle_t: "Ustozlarga Professional va Premium'da bepul", fixes: '🔁 Tuzatishlar', fixes_v: 'Bepul', ref: "🎁 Do'st taklif qilsangiz", ref_v: 'Bonus',
        m_user: 'Bot nomi', m_channel: 'Kanal', m_lang: 'Tillar', m_support: 'Yordam', m_price: 'Narxi',
        live: 'Narxlar botdan jonli olinadi', status_on: 'Ishlayapti', share_text: 'Birzumda boti' },
  ru: { back: '← Назад', open: 'Открыть бота', open_big: '🚀 Открыть бота сейчас', how: '🎬 Как это работает',
        packages: '💎 Пакеты и цены', info: 'ℹ️ О боте', support: 'Техподдержка:', online: 'online',
        copied: 'Скопировано ✅', free: 'Бесплатно', free_note: 'Бот полностью бесплатный — реклама только под видео 💜',
        students: '🎓 Студентам', teachers: '👩‍🏫 Преподавателям', order: 'Заказать', from: 'от', deal: 'Договорная',
        popular: '🔥 Популярный', subs: '💎 Подписка — больше работ, меньше денег', subs_note: 'Во время подписки автоматические работы бесплатно, на остальные −{p}%',
        works: 'работ', days: 'дн.', extras: '✨ Дополнительно', urgent: '⚡ Срочный заказ', turtle: '🐢 Черепаха-учитель (студентам)',
        turtle_t: 'Преподавателям бесплатно в Professional и Premium', fixes: '🔁 Правки', fixes_v: 'Бесплатно', ref: '🎁 Пригласите друга', ref_v: 'Бонус',
        m_user: 'Бот', m_channel: 'Канал', m_lang: 'Языки', m_support: 'Поддержка', m_price: 'Цена',
        live: 'Цены берутся из бота в реальном времени', status_on: 'Работает', share_text: 'Бот Birzumda' },
  en: { back: '← Back', open: 'Open bot', open_big: '🚀 Open the bot now', how: '🎬 How it works',
        packages: '💎 Plans & prices', info: 'ℹ️ About the bot', support: 'Support:', online: 'online',
        copied: 'Copied ✅', free: 'Free', free_note: 'The bot is completely free — ads only under videos 💜',
        students: '🎓 Students', teachers: '👩‍🏫 Teachers', order: 'Order', from: 'from', deal: 'Negotiable',
        popular: '🔥 Popular', subs: '💎 Subscription — more works, less money', subs_note: 'While subscribed, automatic works are free; others −{p}%',
        works: 'works', days: 'days', extras: '✨ Extras', urgent: '⚡ Urgent order', turtle: '🐢 Turtle teacher (students)',
        turtle_t: 'Free for teachers in Professional and Premium', fixes: '🔁 Edits', fixes_v: 'Free', ref: '🎁 Invite a friend', ref_v: 'Bonus',
        m_user: 'Bot', m_channel: 'Channel', m_lang: 'Languages', m_support: 'Support', m_price: 'Price',
        live: 'Prices come live from the bot', status_on: 'Online', share_text: 'Birzumda bot' }
};
const b = (k) => (B[state.lang] || B.uz)[k];
const L = () => state.lang;

const botId = BOTS[location.hash.slice(1)] ? location.hash.slice(1) : 'tayyorla';
const BOT = BOTS[botId];
const url = 'https://t.me/' + BOT.username;
let catalog = null;        // данные Tayyorla: услуги, пакеты, подписки
let audience = 's';        // s = студенты, t = преподаватели
let demoTimer = null;

// ---------- 1. Шапка бота ----------
function renderHero() {
  document.title = BOT.name + ' — Birzumda';
  $('#botIcon').textContent = BOT.icon;
  $('#botName').textContent = BOT.name;
  $('#botNick').textContent = '@' + BOT.username;
  $('#botDesc').textContent = BOT.desc[L()];
  $('#phoneName').textContent = BOT.name;
  $('#botOpen').href = $('#botOpen2').href = url;
}

$('#botNick').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('@' + BOT.username); toast(b('copied')); } catch { toast('@' + BOT.username); }
});
$('#botShare').addEventListener('click', async () => {
  try { await navigator.share({ title: BOT.name, text: b('share_text'), url }); }
  catch (e) { if (e.name !== 'AbortError') { try { await navigator.clipboard.writeText(url); toast(b('copied')); } catch { toast(url); } } }
});

// ---------- 2. Шаги ----------
function renderSteps() {
  $('#steps').innerHTML = BOT.steps[L()].map(([ic, title, text], i) => `
    <li class="step" style="--d:${i * 120}ms">
      <span class="step-ic">${ic}</span>
      <div><b>${i + 1}. ${escapeHtml(title)}</b><p class="muted">${escapeHtml(text)}</p></div>
    </li>`).join('');
}

// ---------- 3. Живая демо-переписка (или видео, если есть) ----------
function runDemo() {
  clearTimeout(demoTimer);
  const chat = $('#chat');
  if (BOT.video) {
    chat.innerHTML = `<video src="${BOT.video}" controls playsinline muted loop class="demo-video"></video>`;
    return;
  }
  const msgs = BOT.demo[L()];
  chat.innerHTML = '';
  let i = 0;
  const next = () => {
    if (i >= msgs.length) { demoTimer = setTimeout(runDemo, 3500); return; }   // по кругу
    const [who, text] = msgs[i++];
    const isBot = who !== 'u';
    // «печатает…» перед ответом бота
    const typing = isBot ? Object.assign(document.createElement('div'), { className: 'msg bot typing', innerHTML: '<i></i><i></i><i></i>' }) : null;
    if (typing) { chat.appendChild(typing); chat.scrollTop = chat.scrollHeight; }
    demoTimer = setTimeout(() => {
      typing?.remove();
      const m = document.createElement('div');
      m.className = 'msg ' + (who === 'u' ? 'me' : 'bot') + (who === 'k' ? ' kb' : '') + (who === 'v' || who === 'f' ? ' media' : '');
      m.textContent = text;
      chat.appendChild(m);
      chat.scrollTop = chat.scrollHeight;
      demoTimer = setTimeout(next, 900);
    }, isBot ? 900 : 300);
  };
  next();
}

// ---------- 4. Пакеты ----------
const price = (n) => n == null ? b('deal') : n.toLocaleString('ru-RU') + " so'm";

function tr(aud, svc, pkg) {
  // перевод названий и описаний из каталога бота
  const base = catalog.catalog[aud].services[svc];
  const t = catalog.catalog.i18n?.[L()]?.[aud]?.services?.[svc];
  if (pkg) {
    const p = base.packages[pkg], tp = t?.packages?.[pkg];
    return { name: tp ? tp[0] : p[0], price: p[1], desc: tp ? tp[1] : p[2] };
  }
  return { name: t?.name || base.name, price: base.price, desc: t?.desc || base.desc };
}

function renderPackages() {
  const box = $('#packages');
  if (botId === 'yukla') {
    box.innerHTML = `
      <div class="pkg-grid one">
        <div class="pkg glass featured">
          <span class="pkg-badge">💜 100%</span>
          <h3>${b('free')}</h3>
          <div class="pkg-price">0 so'm</div>
          <ul>${BOT.free[L()].map(x => `<li>✓ ${escapeHtml(x)}</li>`).join('')}</ul>
          <a class="btn btn-primary full" href="${url}" target="_blank" rel="noopener">${b('open')}</a>
        </div>
      </div>
      <p class="muted center">${b('free_note')}</p>`;
    return;
  }
  if (!catalog) { box.innerHTML = '<p class="muted center">…</p>'; return; }

  const c = catalog.catalog;
  const svcs = Object.keys(c[audience].services);
  const withPkgs = svcs.filter(s => c[audience].services[s].packages);
  const single = svcs.filter(s => !c[audience].services[s].packages);

  box.innerHTML = `
    <div class="segmented tabs">
      <button data-aud="s" class="${audience === 's' ? 'active' : ''}">${b('students')}</button>
      <button data-aud="t" class="${audience === 't' ? 'active' : ''}">${b('teachers')}</button>
    </div>

    ${withPkgs.map(s => `
      <h3 class="pkg-title">${escapeHtml(tr(audience, s).name)}</h3>
      <div class="pkg-grid">
        ${Object.keys(c[audience].services[s].packages).map((p, i) => {
          const x = tr(audience, s, p);
          return `
          <div class="pkg glass${i === 1 ? ' featured' : ''}" style="--d:${i * 100}ms">
            ${i === 1 ? `<span class="pkg-badge">${b('popular')}</span>` : ''}
            <h3>${escapeHtml(x.name)}</h3>
            <div class="pkg-price">${price(x.price)}</div>
            <ul>${x.desc.split(',').map(d => `<li>✓ ${escapeHtml(d.trim())}</li>`).join('')}</ul>
            <a class="btn ${i === 1 ? 'btn-primary' : 'btn-ghost'} full" href="order.html#${audience}-${s}-${p}">${b('order')}</a>
          </div>`;
        }).join('')}
      </div>`).join('')}

    <div class="glass block price-list">
      ${single.map(s => {
        const x = tr(audience, s);
        return `<a class="order-row" href="order.html#${audience}-${s}"><div><b>${escapeHtml(x.name)}</b><p class="muted">${escapeHtml(x.desc || '')}</p></div>
                <span class="pill">${price(x.price)} →</span></a>`;
      }).join('')}
    </div>

    ${catalog.subs?.length ? `
      <h3 class="pkg-title">${b('subs')}</h3>
      <p class="muted center">${b('subs_note').replace('{p}', catalog.sub_disc)}</p>
      <div class="pkg-grid four">
        ${catalog.subs.map((s, i) => `
          <div class="pkg glass small${s.id === 'month' ? ' featured' : ''}" style="--d:${i * 80}ms">
            ${s.id === 'month' ? `<span class="pkg-badge">${b('popular')}</span>` : ''}
            <h3>${escapeHtml(s.name[L()] || s.name.uz)}</h3>
            <div class="pkg-price">${price(s.price)}</div>
            <p class="muted">${s.works} ${b('works')} · ${s.days} ${b('days')}</p>
          </div>`).join('')}
      </div>` : ''}

    <div class="glass block price-list">
      <h3>${b('extras')}</h3>
      <div class="order-row"><b>${b('urgent')}</b><span class="pill">+${Math.round(c.urgent * 100)}%</span></div>
      <div class="order-row"><div><b>${b('turtle')}</b><p class="muted">${b('turtle_t')}</p></div><span class="pill">+${price(c.turtle)}</span></div>
      <div class="order-row"><b>${b('fixes')}</b><span class="pill">${b('fixes_v')}</span></div>
      <div class="order-row"><b>${b('ref')}</b><span class="pill">${b('ref_v')} 🎁</span></div>
    </div>
    <p class="muted center">🔄 ${b('live')}</p>`;

  box.querySelectorAll('[data-aud]').forEach(btn => btn.addEventListener('click', () => {
    audience = btn.dataset.aud; renderPackages();
  }));
}

async function loadCatalog() {
  if (botId !== 'tayyorla') return;
  try { catalog = await api('/api/site/catalog'); }                      // свежие цены из бота
  catch {
    try { catalog = await (await fetch(BOT.catalog)).json(); } catch { /* нет данных */ }  // запасная копия
  }
  renderPackages();
}

// ---------- 5. Информация о боте ----------
function renderMeta() {
  const rows = [
    [b('m_user'), `<a href="${url}" target="_blank" rel="noopener">@${BOT.username}</a>`],
    BOT.channel ? [b('m_channel'), `<a href="https://t.me/${BOT.channel}" target="_blank" rel="noopener">@${BOT.channel}</a>`] : null,
    [b('m_lang'), '🇺🇿 UZ · 🇷🇺 RU · 🇬🇧 EN'],
    [b('m_price'), botId === 'yukla' ? b('free') : `${b('from')} 20 000 so'm`],
    [b('m_support'), '<a href="https://t.me/Abdulazizov_prince" target="_blank" rel="noopener">@Abdulazizov_prince</a>']
  ].filter(Boolean);
  $('#meta').innerHTML = rows.map(([k, v]) => `<div class="meta"><span class="muted">${k}</span><b>${v}</b></div>`).join('');
}

// ---------- 6. Статус бота ----------
async function loadStatus() {
  try {
    const s = await api('/api/site/stats');
    if (s.status?.[botId]) {
      $('#botStatus').hidden = false;
      $('#botStatus').classList.add('online');
      $('#botStatus em').textContent = b('status_on');
    }
  } catch { /* сервер недоступен — статус скрыт */ }
}

// ---------- 7. Язык, тема, анимации ----------
function renderAll() {
  document.documentElement.lang = L();
  $$('[data-b]').forEach(el => el.textContent = b(el.dataset.b));
  $('#langQuick').textContent = L().toUpperCase();
  renderHero(); renderSteps(); renderPackages(); renderMeta(); runDemo();
}
$('#langQuick').addEventListener('click', () => {
  state.lang = { uz: 'ru', ru: 'en', en: 'uz' }[L()]; save('lang', state.lang); renderAll();
});
addEventListener('hashchange', () => location.reload());

addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: .1 });
$$('.reveal').forEach(el => io.observe(el));

FX.setTheme(state.theme);
FX.setEnabled(load('fx', '') !== 'lite');
$('#year').textContent = new Date().getFullYear();
renderAll();
loadCatalog();
loadStatus();
