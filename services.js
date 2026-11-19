/* =========================================
   Birzumda — каталог услуг с поиском (services.html)
   ========================================= */

const S = {
  uz: { title: '🛒 Xizmatlar', ph: 'Qidirish: slayd, kurs ishi, portfolio, video...', support: 'Texnik yordam:',
        all: 'Hammasi', s: '🎓 Talabalar', t: '👩‍🏫 Ustozlar', bot: '🤖 Botlar', found: 'ta xizmat topildi', nothing: "Hech narsa topilmadi — boshqacha yozib ko'ring",
        order: 'Buyurtma berish', open: 'Botni ochish' },
  ru: { title: '🛒 Услуги', ph: 'Поиск: слайды, курсовая, портфолио, видео...', support: 'Техподдержка:',
        all: 'Все', s: '🎓 Студентам', t: '👩‍🏫 Преподавателям', bot: '🤖 Боты', found: 'услуг найдено', nothing: 'Ничего не найдено — попробуйте иначе',
        order: 'Заказать', open: 'Открыть бота' },
  en: { title: '🛒 Services', ph: 'Search: slides, term paper, portfolio, video...', support: 'Support:',
        all: 'All', s: '🎓 Students', t: '👩‍🏫 Teachers', bot: '🤖 Bots', found: 'services found', nothing: 'Nothing found — try other words',
        order: 'Order', open: 'Open bot' }
};
const s = (k) => (S[state.lang] || S.uz)[k];
let filter = 'all';

function render() {
  const L = state.lang;
  const items = searchCatalog($('#sQ').value, filter);
  $('#count').textContent = items.length ? `${items.length} ${s('found')}` : s('nothing');
  $('#grid').innerHTML = items.map((it, i) => `
    <a class="svc-card glass" href="${it.url}" style="animation: msgIn .4s ${i * 40}ms both">
      <span class="svc-ic">${it.icon}</span>
      <b>${escapeHtml(it.names[L])}</b>
      <p class="muted">${escapeHtml(it.descs[L] || '')}</p>
      <small class="muted">${it.aud === 's' ? s('s') : it.aud === 't' ? s('t') : s('bot')}</small>
      <span class="svc-price">${priceText(it.from, L, !!it.pkgs)}</span>
      <span class="btn btn-primary small">${it.kind === 'bot' ? s('open') : s('order')}</span>
    </a>`).join('');
}

function renderAll() {
  document.documentElement.lang = state.lang;
  $$('[data-s]').forEach(el => el.textContent = s(el.dataset.s));
  $('#sQ').placeholder = s('ph');
  $('#langQuick').textContent = state.lang.toUpperCase();
  $('#filters').innerHTML = ['all', 's', 't', 'bot'].map(f =>
    `<button type="button" class="tag${f === filter ? ' active' : ''}" data-f="${f}">${s(f)}</button>`).join('');
  render();
}

$('#filters').addEventListener('click', e => {
  const b = e.target.closest('[data-f]'); if (!b) return;
  filter = b.dataset.f; renderAll();
});
$('#sQ').addEventListener('input', render);
$('#sSearch').addEventListener('submit', e => e.preventDefault());
$('#langQuick').addEventListener('click', () => {
  state.lang = { uz: 'ru', ru: 'en', en: 'uz' }[state.lang]; save('lang', state.lang); renderAll();
});
$('#cabLink').hidden = !state.token;

// запрос с главной страницы
$('#sQ').value = load('q', ''); save('q', null);

FX.setTheme(state.theme);
FX.setEnabled(load('fx', '') !== 'lite');
loadCatalog().then(renderAll);
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }));
$$('.reveal').forEach(el => io.observe(el));
