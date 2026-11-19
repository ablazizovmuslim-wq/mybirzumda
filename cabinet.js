/* =========================================
   Birzumda — личный кабинет (cabinet.html)
   ========================================= */

const C = {
  uz: { logout: 'Chiqish', not_known: 'Siz hali Birzumda Tayyorla botidan foydalanmagansiz.', open_bot: 'Botni ochish',
        bonus: '💰 Bonus', weekly: '⚡ Haftalik promokod', free_works: '🎁 Bepul ishlar', copy: 'Nusxa olish', copied: 'Nusxa olindi ✅',
        ref_title: "👥 Do'stlarni taklif qiling", ref_text: "Do'stingiz havola orqali kelib birinchi to'lovni qilsa — sizga bonus beriladi.",
        invited: 'Taklif qilinganlar:', paid: "To'lov qilganlar:", orders: '📋 Buyurtmalarim', no_orders: "Hozircha buyurtmalar yo'q",
        until: 'gacha', error: "Ma'lumot yuklanmadi, keyinroq urinib ko'ring" },
  ru: { logout: 'Выйти', not_known: 'Вы ещё не пользовались ботом Birzumda Tayyorla.', open_bot: 'Открыть бота',
        bonus: '💰 Бонус', weekly: '⚡ Промокод недели', free_works: '🎁 Бесплатные работы', copy: 'Копировать', copied: 'Скопировано ✅',
        ref_title: '👥 Приглашайте друзей', ref_text: 'Если друг придёт по ссылке и сделает первую оплату — вы получите бонус.',
        invited: 'Приглашено:', paid: 'Оплатили:', orders: '📋 Мои заказы', no_orders: 'Заказов пока нет',
        until: 'до', error: 'Не удалось загрузить данные, попробуйте позже' },
  en: { logout: 'Log out', not_known: "You haven't used the Birzumda Tayyorla bot yet.", open_bot: 'Open bot',
        bonus: '💰 Bonus', weekly: '⚡ Weekly promo code', free_works: '🎁 Free works', copy: 'Copy', copied: 'Copied ✅',
        ref_title: '👥 Invite friends', ref_text: 'When a friend joins via your link and makes the first payment, you get a bonus.',
        invited: 'Invited:', paid: 'Paid:', orders: '📋 My orders', no_orders: 'No orders yet',
        until: 'until', error: 'Could not load data, please try again later' }
};
const c = (k) => (C[state.lang] || C.uz)[k];

// без входа сюда нельзя
if (!state.token) location.href = 'index.html';

document.documentElement.lang = state.lang;
$$('[data-c]').forEach(el => el.textContent = c(el.dataset.c));
$('#logoutBtn').onclick = () => logout();
$('#adminLink').hidden = !state.admin;

// профиль из данных Telegram
if (state.user) {
  $('#userName').textContent = state.user.first_name || 'Birzumda';
  $('#userHandle').textContent = state.user.username ? '@' + state.user.username : 'ID ' + state.user.id;
  $('#avatar').textContent = (state.user.first_name || '?')[0];
}

// кнопки «Копировать»
$$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
  const el = $('#' + btn.dataset.copy);
  try { await navigator.clipboard.writeText(el.value || el.textContent); toast(c('copied')); }
  catch { el.select?.(); }
}));

async function loadCabinet() {
  let d;
  try { d = await api('/api/site/me?lang=' + state.lang); }
  catch { return toast(c('error')); }

  $('#notKnown').hidden = d.known;
  $('#adminLink').hidden = !d.admin;
  $('#bonus').textContent = money(d.bonus);

  if (d.weekly_promo) {
    $('#promoBox').hidden = false;
    $('#promoCode').textContent = d.weekly_promo.code;
    $('#promoPct').textContent = `−${d.weekly_promo.percent}%`;
  }
  if (d.credits.length) {
    $('#creditsBox').hidden = false;
    $('#credits').textContent = d.credits.map(x => `${x.tier}: ${x.left}`).join(' · ');
  }

  $('#refLink').value = d.ref.link;
  $('#invited').textContent = d.ref.invited;
  $('#paid').textContent = d.ref.paid;

  $('#orders').innerHTML = d.orders.length
    ? d.orders.map(o => `
        <div class="order-row">
          <div>
            <b>#${o.id} · ${escapeHtml(o.title)}</b>
            <p class="muted">${escapeHtml(o.created_at)} · ${money(o.price)}</p>
          </div>
          <span class="pill st-${escapeHtml(o.status)}">${escapeHtml(o.status_text)}</span>
        </div>`).join('')
    : `<p class="muted">${c('no_orders')}</p>`;
}

loadCabinet();
