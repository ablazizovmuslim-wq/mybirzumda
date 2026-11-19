/* =========================================
   Birzumda — админ-панель (admin.html)
   Доступ проверяет сервер: только ADMIN_ID из Railway
   ========================================= */

if (!state.token) location.href = 'index.html';

const STATUS_RU = {
  quote: '💬 Согласуем цену', new: '🕐 Ждёт оплаты', paid: '🧾 Проверка чека',
  work: '🛠 В работе', done: '✅ Сдан', rejected: '❌ Отклонён'
};

async function loadAdmin() {
  let d;
  try { d = await api('/api/site/admin'); }
  catch (err) {
    if (err.status === 403) { location.href = 'cabinet.html'; return; } // не админ
    return toast('Не удалось загрузить данные');
  }

  // цифры
  const byStatus = d.orders_by_status || {};
  const total = Object.values(byStatus).reduce((a, b) => a + b, 0);
  $('#users').textContent = d.users.toLocaleString('ru-RU');
  $('#usersToday').textContent = `+${d.users_today} сегодня`;
  $('#revenue').textContent = money(d.revenue);
  $('#revenueToday').textContent = `+${money(d.revenue_today)} сегодня`;
  $('#ordersTotal').textContent = total;
  $('#ordersStatus').textContent = Object.entries(byStatus)
    .map(([s, n]) => `${(STATUS_RU[s] || s).split(' ')[0]} ${n}`).join('  ');

  // отзывы на проверке
  $('#reviews').innerHTML = d.pending_reviews.length
    ? d.pending_reviews.map(r => `
        <div class="order-row">
          <div>
            <b>${escapeHtml(r.name || 'Клиент')}</b> <span class="stars">${'★'.repeat(r.stars)}</span>
            <p>${escapeHtml(r.text)}</p>
          </div>
          <button class="btn btn-primary small" data-approve="${r.order_id}">Опубликовать</button>
        </div>`).join('')
    : '<p class="muted">Новых отзывов нет</p>';

  // заказы
  $('#orders').innerHTML = d.last_orders.map(o => `
    <div class="order-row">
      <div>
        <b>#${o.id} · ${escapeHtml(o.title)}</b>
        <p class="muted">${escapeHtml(o.name || '')} ${o.username ? '@' + escapeHtml(o.username) : ''} · ${escapeHtml(o.created_at)} · ${money(o.price)}</p>
      </div>
      <span class="pill st-${escapeHtml(o.status)}">${STATUS_RU[o.status] || escapeHtml(o.status)}</span>
    </div>`).join('') || '<p class="muted">Заказов нет</p>';

  // промокоды
  $('#promos').innerHTML = d.promos.map(p => `
    <div class="order-row">
      <div><b><code>${escapeHtml(p.code)}</code> −${p.percent}%</b>
        <p class="muted">Использовано: ${p.used}${p.uses_left !== null ? ' · осталось ' + p.uses_left : ''}${p.expires_at ? ' · до ' + escapeHtml(p.expires_at) + ' UTC' : ''}</p>
      </div>
    </div>`).join('') || '<p class="muted">Нет активных промокодов</p>';
}

// «Опубликовать» отзыв на сайте
$('#reviews').addEventListener('click', async e => {
  const id = e.target.dataset.approve;
  if (!id) return;
  try {
    await api('/api/site/admin/review/' + id, { method: 'POST' });
    toast('Отзыв опубликован на сайте ✅');
    loadAdmin();
  } catch { toast('Ошибка'); }
});

$('#refreshBtn').onclick = loadAdmin;
loadAdmin();
