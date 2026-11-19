/* =========================================
   Birzumda — заказ на сайте (order.html#s-taqdimot)
   1 Услуга → 2 Данные → 3 Подтверждение (вход, промокод, цена) → 4 Оплата и чек
   ========================================= */

const O = {
  uz: { title: '📝 Buyurtma berish', support: 'Texnik yordam:',
        st1: '1/4 · Xizmatni tanlang', st2: "2/4 · Ish haqida ma'lumot", st3: '3/4 · Tasdiqlash', st4: "4/4 · To'lov",
        who: 'Kim uchun?', s: '🎓 Talaba', t: '👩‍🏫 Ustoz', svc: 'Ish turi', pkg: 'Paket', next: 'Davom etish →', back: '← Orqaga',
        topic: 'Mavzu *', topic_ph: "Masalan: Sun'iy intellekt ta'limda", details: "Qo'shimcha talablar", details_ph: 'Slaydlar soni, til, dizayn, o‘qituvchi talablari...',
        urgent: '⚡ Shoshilinch (+50%)', urgent_s: 'Odatdagidan tezroq tayyorlanadi', turtle: "🐢 Toshbaqa o'qituvchi", turtle_s: "Gapiradigan va darsni tushuntiradigan qahramon (+{sum})",
        need_topic: 'Mavzuni yozing', login_t: 'Davom etish uchun Telegram orqali kiring', login_h: 'Tayyor ish shu Telegram akkauntga keladi',
        login_only: 'Kirish faqat mybirzumda.uz saytida ishlaydi', promo: 'Promokod', apply: "Qo'llash", promo_ok: 'Promokod qabul qilindi ✅', promo_bad: 'Promokod topilmadi ❌',
        price: 'Narx', disc: 'Chegirma', total: "To'lash kerak", deal: 'Narxni admin yozadi', confirm: '✅ Buyurtmani tasdiqlash',
        start_bot: 'Avval botni oching va «Start» bosing — tayyor ish o‘sha yerga keladi', open_bot: '🤖 Botni ochish', retry: '🔁 Qayta urinish',
        pay_t: "Kartaga o'tkazing", pay_sum: 'Summa', copy: 'Nusxa', copied: 'Nusxalandi ✅', owner: 'Karta egasi',
        cheque: '🧾 Chekni yuklang', cheque_s: "To'lov chekining rasmini yoki PDF faylini tanlang", send: 'Chekni yuborish', sending: 'Yuborilmoqda…',
        done: 'Chek yuborildi! 🎉', done_s: "To'lov tekshirilgach ish boshlanadi. Tayyor ish @Birzumda_Tayyorla_bot ga keladi.",
        quote_done: "So'rov qabul qilindi! 🎉", quote_s: 'Narxni botda yozamiz — @Birzumda_Tayyorla_bot ni kuzating.',
        cabinet: '👤 Kabinetim', new_order: '➕ Yangi buyurtma', order_n: 'Buyurtma', err: "Xatolik, keyinroq urinib ko'ring", big: 'Fayl juda katta (10 MB gacha)' },
  ru: { title: '📝 Оформление заказа', support: 'Техподдержка:',
        st1: '1/4 · Выберите услугу', st2: '2/4 · Данные о работе', st3: '3/4 · Подтверждение', st4: '4/4 · Оплата',
        who: 'Для кого?', s: '🎓 Студент', t: '👩‍🏫 Преподаватель', svc: 'Вид работы', pkg: 'Пакет', next: 'Далее →', back: '← Назад',
        topic: 'Тема *', topic_ph: 'Например: Искусственный интеллект в образовании', details: 'Дополнительные требования', details_ph: 'Количество слайдов, язык, дизайн, требования преподавателя...',
        urgent: '⚡ Срочно (+50%)', urgent_s: 'Сделаем быстрее обычного', turtle: '🐢 Черепаха-учитель', turtle_s: 'Говорящий герой, который объясняет урок (+{sum})',
        need_topic: 'Напишите тему', login_t: 'Чтобы продолжить, войдите через Telegram', login_h: 'Готовая работа придёт в этот Telegram-аккаунт',
        login_only: 'Вход работает только на сайте mybirzumda.uz', promo: 'Промокод', apply: 'Применить', promo_ok: 'Промокод принят ✅', promo_bad: 'Промокод не найден ❌',
        price: 'Цена', disc: 'Скидка', total: 'К оплате', deal: 'Цену напишет админ', confirm: '✅ Подтвердить заказ',
        start_bot: 'Сначала откройте бота и нажмите «Start» — готовая работа придёт туда', open_bot: '🤖 Открыть бота', retry: '🔁 Повторить',
        pay_t: 'Переведите на карту', pay_sum: 'Сумма', copy: 'Копия', copied: 'Скопировано ✅', owner: 'Владелец карты',
        cheque: '🧾 Загрузите чек', cheque_s: 'Выберите фото чека или PDF', send: 'Отправить чек', sending: 'Отправка…',
        done: 'Чек отправлен! 🎉', done_s: 'После проверки оплаты работа начнётся. Готовая работа придёт в @Birzumda_Tayyorla_bot.',
        quote_done: 'Запрос принят! 🎉', quote_s: 'Цену напишем в боте — следите за @Birzumda_Tayyorla_bot.',
        cabinet: '👤 Мой кабинет', new_order: '➕ Новый заказ', order_n: 'Заказ', err: 'Ошибка, попробуйте позже', big: 'Файл слишком большой (до 10 МБ)' },
  en: { title: '📝 Place an order', support: 'Support:',
        st1: '1/4 · Choose a service', st2: '2/4 · About the work', st3: '3/4 · Confirm', st4: '4/4 · Payment',
        who: 'Who is it for?', s: '🎓 Student', t: '👩‍🏫 Teacher', svc: 'Type of work', pkg: 'Plan', next: 'Next →', back: '← Back',
        topic: 'Topic *', topic_ph: 'e.g. Artificial intelligence in education', details: 'Extra requirements', details_ph: 'Number of slides, language, design, teacher requirements...',
        urgent: '⚡ Urgent (+50%)', urgent_s: 'Done faster than usual', turtle: '🐢 Turtle teacher', turtle_s: 'A talking character who explains the lesson (+{sum})',
        need_topic: 'Please enter a topic', login_t: 'Log in with Telegram to continue', login_h: 'The finished work will arrive in this Telegram account',
        login_only: 'Login works only on mybirzumda.uz', promo: 'Promo code', apply: 'Apply', promo_ok: 'Promo code applied ✅', promo_bad: 'Promo code not found ❌',
        price: 'Price', disc: 'Discount', total: 'To pay', deal: 'The admin will set the price', confirm: '✅ Confirm order',
        start_bot: 'Open the bot and tap «Start» first — the finished work is delivered there', open_bot: '🤖 Open bot', retry: '🔁 Try again',
        pay_t: 'Transfer to card', pay_sum: 'Amount', copy: 'Copy', copied: 'Copied ✅', owner: 'Card holder',
        cheque: '🧾 Upload the receipt', cheque_s: 'Choose a photo of the receipt or a PDF', send: 'Send receipt', sending: 'Sending…',
        done: 'Receipt sent! 🎉', done_s: 'Work starts once the payment is checked. The result arrives in @Birzumda_Tayyorla_bot.',
        quote_done: 'Request received! 🎉', quote_s: "We'll send the price in the bot — watch @Birzumda_Tayyorla_bot.",
        cabinet: '👤 My account', new_order: '➕ New order', order_n: 'Order', err: 'Error, please try again later', big: 'File is too large (max 10 MB)' }
};
const o = (k) => (O[state.lang] || O.uz)[k];
const L = () => state.lang;

// черновик заказа хранится в браузере, чтобы не потерять при обновлении
const draft = Object.assign({ step: 1, aud: 's', svc: '', pkg: '', topic: '', details: '', urgent: false, turtle: false, promo: '' },
  JSON.parse(load('draft', 'null') || 'null') || {});
let pay = JSON.parse(load('pay', 'null') || 'null');   // данные оплаты после создания заказа
let file = null;
const keep = () => save('draft', JSON.stringify(draft));

// услуга из ссылки: order.html#s-taqdimot
const m = location.hash.slice(1).match(/^(s|t)-([a-z]+)(?:-([a-z]+))?$/);   // order.html#s-taqdimot-pro
if (m) { Object.assign(draft, { aud: m[1], svc: m[2], pkg: m[3] || '', step: 1 }); pay = null; save('pay', null); }

const svcs = () => CAT.data.catalog[draft.aud].services;
const turtleOk = () => draft.aud === 's' && draft.svc === 'taqdimot';

function go(step) { draft.step = step; keep(); render(); scrollTo({ top: 0, behavior: 'smooth' }); }

// ---------- шаг 1: услуга ----------
function step1() {
  const list = svcs();
  if (!list[draft.svc]) draft.svc = Object.keys(list)[0];
  const s = list[draft.svc];
  if (s.packages && !s.packages[draft.pkg]) draft.pkg = Object.keys(s.packages)[1] || Object.keys(s.packages)[0];
  return `
    <div class="panel glass">
      <h2>${o('who')}</h2>
      <div class="segmented">${['s', 't'].map(a => `<button data-aud="${a}" class="${draft.aud === a ? 'active' : ''}">${o(a)}</button>`).join('')}</div>
      <h2>${o('svc')}</h2>
      <div class="choices">${Object.keys(list).map(k => {
        const i = svcInfo(draft.aud, k, L()), v = list[k];
        const from = v.packages ? Math.min(...Object.values(v.packages).map(p => p[1])) : v.price;
        return `<button class="choice${k === draft.svc ? ' active' : ''}" data-svc="${k}">
          <b>${SVC_ICONS[k] || '✨'} ${escapeHtml(i.name)}</b><span class="pr">${priceText(from, L(), !!v.packages)}</span></button>`;
      }).join('')}</div>
      ${s.packages ? `<h2>${o('pkg')}</h2><div class="choices">${Object.keys(s.packages).map(p => {
        const x = pkgInfo(draft.aud, draft.svc, p, L());
        return `<button class="choice${p === draft.pkg ? ' active' : ''}" data-pkg="${p}">
          <b>${escapeHtml(x.name)}</b><span class="pr">${priceText(x.price, L())}</span><small>${escapeHtml(x.desc)}</small></button>`;
      }).join('')}</div>` : `<p class="muted">${escapeHtml(svcInfo(draft.aud, draft.svc, L()).desc)}</p>`}
      <button class="btn btn-primary full" data-go="2">${o('next')}</button>
    </div>`;
}

// ---------- шаг 2: данные ----------
function step2() {
  return `
    <div class="panel glass">
      <h2>${SVC_ICONS[draft.svc] || '✨'} ${escapeHtml(svcInfo(draft.aud, draft.svc, L()).name)}${draft.pkg ? ' · ' + escapeHtml(pkgInfo(draft.aud, draft.svc, draft.pkg, L()).name) : ''}</h2>
      <div class="field"><label>${o('topic')}</label><input id="fTopic" maxlength="300" value="${escapeHtml(draft.topic)}" placeholder="${o('topic_ph')}"></div>
      <div class="field"><label>${o('details')}</label><textarea id="fDetails" rows="4" maxlength="1000" placeholder="${o('details_ph')}">${escapeHtml(draft.details)}</textarea></div>
      <label class="switch"><input type="checkbox" id="fUrgent" ${draft.urgent ? 'checked' : ''}><span><b>${o('urgent')}</b><br><small class="muted">${o('urgent_s')}</small></span></label>
      ${turtleOk() ? `<label class="switch"><input type="checkbox" id="fTurtle" ${draft.turtle ? 'checked' : ''}><span><b>${o('turtle')}</b><br>
        <small class="muted">${o('turtle_s').replace('{sum}', priceText(CAT.data.catalog.turtle, L()))}</small></span></label>` : ''}
      <div class="row-btns"><button class="btn btn-ghost" data-go="1">${o('back')}</button><button class="btn btn-primary" data-go="3">${o('next')}</button></div>
    </div>`;
}

function readStep2() {
  draft.topic = $('#fTopic').value.trim();
  draft.details = $('#fDetails').value.trim();
  draft.urgent = $('#fUrgent').checked;
  draft.turtle = turtleOk() && !!$('#fTurtle')?.checked;
  keep();
}

// ---------- шаг 3: вход, промокод, итог ----------
function step3() {
  if (!state.token) {
    return `
      <div class="panel glass login-box">
        <h2>🔐 ${o('login_t')}</h2>
        <p class="muted">${o('login_h')}</p>
        <div id="tgBox"></div>
        <button class="btn btn-ghost" data-go="2">${o('back')}</button>
      </div>`;
  }
  return `
    <div class="panel glass summary">
      <h2>${SVC_ICONS[draft.svc] || '✨'} ${escapeHtml(svcInfo(draft.aud, draft.svc, L()).name)}${draft.pkg ? ' · ' + escapeHtml(pkgInfo(draft.aud, draft.svc, draft.pkg, L()).name) : ''}</h2>
      <p class="muted">«${escapeHtml(draft.topic)}»${draft.urgent ? ' · ⚡' : ''}${draft.turtle ? ' · 🐢' : ''}</p>
      <div class="copy-row"><input id="fPromo" placeholder="${o('promo')}" value="${escapeHtml(draft.promo)}" maxlength="32">
        <button class="btn btn-ghost" id="applyPromo">${o('apply')}</button></div>
      <div id="calc"><p class="muted">…</p></div>
      <div id="orderMsg"></div>
      <div class="row-btns"><button class="btn btn-ghost" data-go="2">${o('back')}</button><button class="btn btn-primary" id="confirmBtn">${o('confirm')}</button></div>
    </div>`;
}

const payload = () => ({ aud: draft.aud, svc: draft.svc, pkg: draft.pkg, topic: draft.topic, details: draft.details,
                         deadline: draft.urgent ? 'urgent' : 'normal', turtle: draft.turtle, promo: draft.promo });

async function loadPrice(showPromo) {
  try {
    const p = await api('/api/site/price', { method: 'POST', body: JSON.stringify(payload()) });
    if (showPromo && draft.promo) toast(p.promo_ok ? o('promo_ok') : o('promo_bad'));
    $('#calc').innerHTML = p.quote ? `<div class="order-row total"><b>${o('total')}</b><span>${o('deal')}</span></div>` : `
      <div class="order-row"><b>${o('price')}</b><span>${priceText(p.full_price, L())}</span></div>
      ${p.discount ? `<div class="order-row"><b>${o('disc')}</b><span>−${priceText(p.discount, L())}</span></div>` : ''}
      <div class="order-row total"><b>${o('total')}</b><span>${priceText(p.price, L())}</span></div>`;
  } catch (e) {
    if (e.status === 401) return render();
    $('#calc').innerHTML = `<p class="muted">${o('err')}</p>`;
  }
}

async function createOrder() {
  const btn = $('#confirmBtn');
  btn.disabled = true;
  try {
    pay = await api('/api/site/order', { method: 'POST', body: JSON.stringify(payload()) });
    save('pay', JSON.stringify(pay));
    go(4);
  } catch (e) {
    btn.disabled = false;
    if (e.code === 'start_bot') {
      $('#orderMsg').innerHTML = `
        <div class="notice glass"><span>${o('start_bot')}</span>
          <a class="btn btn-primary" href="https://t.me/${CONFIG.ORDER_BOT}?start=site" target="_blank" rel="noopener">${o('open_bot')}</a></div>`;
      btn.textContent = o('retry');
    } else toast(o('err'));
  }
}

// ---------- шаг 4: оплата и чек ----------
function step4() {
  if (!pay) return step3();
  if (pay.quote) return doneBox(o('quote_done'), o('quote_s'));
  return `
    <div class="panel glass">
      <h2>🧾 ${o('order_n')} #${pay.oid} · ${o('pay_t')}</h2>
      <div class="card-box">
        <small class="muted">${o('pay_sum')}</small>
        <div class="pkg-price">${priceText(pay.price, L())}</div>
        <div class="card-num" id="cardNum">${escapeHtml(pay.card)}</div>
        <small>${o('owner')}: <b>${escapeHtml(pay.owner)}</b></small>
        <button class="btn btn-ghost small" id="copyCard">📋 ${o('copy')}</button>
      </div>
      <label class="drop" id="drop">
        <b>${o('cheque')}</b><br><small class="muted">${o('cheque_s')}</small>
        <input type="file" id="fFile" accept="image/*,application/pdf" hidden>
        <div id="preview"></div>
      </label>
      <button class="btn btn-primary full" id="sendCheque" disabled>${o('send')}</button>
    </div>`;
}

function doneBox(title, text) {
  return `
    <div class="panel glass done-box">
      <div class="big">✅</div>
      <h2>${title}</h2>
      <p class="muted">${text}</p>
      <div class="row-btns" style="width:100%">
        <a class="btn btn-ghost" href="cabinet.html">${o('cabinet')}</a>
        <button class="btn btn-primary" id="newOrder">${o('new_order')}</button>
      </div>
    </div>`;
}

function pickFile(f) {
  if (!f) return;
  if (f.size > 10 * 1024 * 1024) return toast(o('big'));
  file = f;
  $('#preview').innerHTML = f.type.startsWith('image/') ? `<img src="${URL.createObjectURL(f)}" alt="">` : `<p>📄 ${escapeHtml(f.name)}</p>`;
  $('#sendCheque').disabled = false;
}

async function sendCheque() {
  const btn = $('#sendCheque');
  btn.disabled = true; btn.textContent = o('sending');
  const fd = new FormData();
  fd.append('file', file);
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/site/order/${pay.oid}/cheque`, {
      method: 'POST', headers: { Authorization: 'Bearer ' + state.token }, body: fd });
    if (!res.ok && res.status !== 409) throw new Error(res.status);
    pay.sent = true; save('pay', JSON.stringify(pay));
    $('#stage').innerHTML = doneBox(o('done'), o('done_s'));
    bindDone();
  } catch { btn.disabled = false; btn.textContent = o('send'); toast(o('err')); }
}

function bindDone() {
  $('#newOrder')?.addEventListener('click', () => {
    pay = null; save('pay', null);
    Object.assign(draft, { topic: '', details: '', promo: '', urgent: false, turtle: false });
    go(1);
  });
}

// ---------- отрисовка ----------
function render() {
  document.documentElement.lang = L();
  $$('[data-o]').forEach(el => el.textContent = o(el.dataset.o));
  $('#langQuick').textContent = L().toUpperCase();
  $('#cabLink').hidden = !state.token;
  if (!CAT.data) return;
  if (pay && draft.step < 4) draft.step = 4;
  const st = draft.step;
  $$('#stepsBar span').forEach((x, i) => x.classList.toggle('on', i < st));
  $('#stepLabel').textContent = o('st' + st);
  $('#stage').innerHTML = pay?.sent ? doneBox(o('done'), o('done_s')) : [step1, step2, step3, step4][st - 1]();

  if (pay?.sent || (st === 4 && pay?.quote)) return bindDone();
  if (st === 3 && !state.token) {
    if (!tgLogin($('#tgBox'), () => render())) $('#tgBox').innerHTML = `<p class="muted">${o('login_only')}</p>`;
  }
  if (st === 3 && state.token) {
    loadPrice(false);
    $('#applyPromo').onclick = () => { draft.promo = $('#fPromo').value.trim().toUpperCase(); keep(); loadPrice(true); };
    $('#confirmBtn').onclick = createOrder;
  }
  if (st === 4 && pay && !pay.quote) {
    $('#fFile').onchange = (e) => pickFile(e.target.files[0]);
    const drop = $('#drop');
    drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
    drop.ondragleave = () => drop.classList.remove('over');
    drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('over'); pickFile(e.dataTransfer.files[0]); };
    $('#sendCheque').onclick = sendCheque;
    $('#copyCard').onclick = async (e) => {
      e.preventDefault();
      try { await navigator.clipboard.writeText(pay.card.replace(/\s/g, '')); toast(o('copied')); } catch { toast(pay.card); }
    };
  }
}

$('#stage').addEventListener('click', (e) => {
  const a = e.target.closest('[data-aud]'), s = e.target.closest('[data-svc]'), p = e.target.closest('[data-pkg]'), g = e.target.closest('[data-go]');
  if (a) { draft.aud = a.dataset.aud; draft.svc = ''; draft.pkg = ''; keep(); render(); }
  else if (s) { draft.svc = s.dataset.svc; draft.pkg = ''; draft.turtle = false; keep(); render(); }
  else if (p) { draft.pkg = p.dataset.pkg; keep(); render(); }
  else if (g) {
    const to = +g.dataset.go;
    if (draft.step === 2) { readStep2(); if (to === 3 && draft.topic.length < 2) return toast(o('need_topic')); }
    go(to);
  }
});

$('#langQuick').addEventListener('click', () => {
  if (draft.step === 2) readStep2();
  state.lang = { uz: 'ru', ru: 'en', en: 'uz' }[L()]; save('lang', state.lang); render();
});

FX.setTheme(state.theme);
FX.setEnabled(load('fx', '') !== 'lite');
loadCatalog().then(render);
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }));
$$('.reveal').forEach(el => io.observe(el));
