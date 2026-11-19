/* =========================================
   Birzumda — живой фон (8 эффектов) и маскот Zumik
   ========================================= */

// ---------- 1. Живой фон на canvas ----------
const FX = (() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, parts = [], mode = 'constellation', raf = 0, t = 0, enabled = true;
  let c1 = '#8b5cf6', c2 = '#c4b5fd';
  const R = Math.random;

  // какой эффект у какой темы
  const THEME_FX = {
    kosmos: 'constellation', light: 'bubbles', okean: 'bubbles', neon: 'grid',
    qish: 'snow', lava: 'embers', orman: 'fireflies', sakura: 'petals'
  };

  // каждый эффект: сколько частиц, как создать, как двигать, как рисовать
  const MODES = {
    constellation: {
      density: 18000,
      make: () => ({ x: R() * w, y: R() * h, vx: (R() - .5) * .4, vy: (R() - .5) * .4, r: R() * 1.8 + .6 }),
      step(p) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; },
      draw(p) { dot(p.x, p.y, p.r, c2, .7); },
      after() { // линии между близкими звёздами
        ctx.strokeStyle = c2;
        for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) { ctx.globalAlpha = (1 - d / 120) * .25; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
    },
    bubbles: {
      density: 26000,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 30, r: 4 + R() * 16, vy: .3 + R() * .8, ph: R() * 6 }),
      step(p, i) { p.y -= p.vy; p.x += Math.sin(t / 60 + p.ph) * .4; if (p.y < -40) parts[i] = this.make(false); },
      draw(p) {
        ctx.globalAlpha = .35; ctx.strokeStyle = c1; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.stroke();
        dot(p.x - p.r * .35, p.y - p.r * .35, p.r * .2, c2, .6);
      }
    },
    snow: {
      density: 9000,
      make: (init) => ({ x: R() * w, y: init ? R() * h : -10, r: .8 + R() * 2.8, vy: .4 + R() * 1.2, ph: R() * 6 }),
      step(p, i) { p.y += p.vy; p.x += Math.sin(t / 50 + p.ph) * .6; if (p.y > h + 10) parts[i] = this.make(false); },
      draw(p) { dot(p.x, p.y, p.r, '#ffffff', .8); }
    },
    embers: {
      density: 14000,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 10, r: .8 + R() * 2.4, vy: .6 + R() * 1.6, ph: R() * 6 }),
      step(p, i) { p.y -= p.vy; p.x += Math.sin(t / 30 + p.ph) * .8; if (p.y < -10) parts[i] = this.make(false); },
      draw(p) {
        const a = .5 + Math.sin(t / 6 + p.ph) * .4;
        dot(p.x, p.y, p.r * 3, c1, a * .15); dot(p.x, p.y, p.r, c2, a);
      }
    },
    fireflies: {
      density: 30000,
      make: () => ({ x: R() * w, y: R() * h, a: R() * 7, sp: .3 + R() * .5, ph: R() * 6 }),
      step(p) {
        p.a += (R() - .5) * .3; p.x += Math.cos(p.a) * p.sp; p.y += Math.sin(p.a) * p.sp;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      },
      draw(p) {
        const a = Math.max(0, Math.sin(t / 25 + p.ph));
        dot(p.x, p.y, 9, c2, a * .12); dot(p.x, p.y, 2.2, c2, a);
      }
    },
    petals: {
      density: 22000,
      make: (init) => ({ x: R() * w, y: init ? R() * h : -20, s: 5 + R() * 6, vy: .5 + R() * .9, rot: R() * 7, vr: (R() - .5) * .04, ph: R() * 6 }),
      step(p, i) { p.y += p.vy; p.x += Math.sin(t / 45 + p.ph) * 1.1; p.rot += p.vr; if (p.y > h + 20) parts[i] = this.make(false); },
      draw(p) {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = .75; ctx.fillStyle = c2;
        ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, 7); ctx.fill(); ctx.restore();
      }
    },
    grid: { // ретро-сетка Neon: горизонт и бегущие линии
      density: 40000,
      make: () => ({ x: R() * w, y: R() * h * .55, r: R() * 1.3 + .3, ph: R() * 6 }),
      step() {},
      draw(p) { dot(p.x, p.y, p.r, c2, .4 + Math.sin(t / 20 + p.ph) * .3); },
      after() {
        const hy = h * .62, cx = w / 2;
        ctx.lineWidth = 1.2;
        // солнце
        const g = ctx.createLinearGradient(0, hy - 160, 0, hy);
        g.addColorStop(0, c2); g.addColorStop(1, c1);
        ctx.globalAlpha = .35; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, hy, 110, Math.PI, 0); ctx.fill();
        // вертикальные линии в перспективе
        ctx.strokeStyle = c1;
        for (let i = -12; i <= 12; i++) {
          ctx.globalAlpha = .35; ctx.beginPath(); ctx.moveTo(cx + i * 40, hy); ctx.lineTo(cx + i * 260, h); ctx.stroke();
        }
        // горизонтальные линии бегут к зрителю
        for (let k = 0; k < 14; k++) {
          const z = ((k + (t % 60) / 60) / 14);
          const y = hy + (h - hy) * z * z;
          ctx.globalAlpha = .15 + z * .4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
      }
    }
  };

  function dot(x, y, r, color, a) {
    ctx.globalAlpha = Math.max(0, Math.min(1, a)); ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }

  function readColors() {
    const st = getComputedStyle(document.documentElement);
    c1 = st.getPropertyValue('--accent').trim() || c1;
    c2 = st.getPropertyValue('--accent-2').trim() || c2;
  }

  function build() {
    w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    const m = MODES[mode];
    const count = Math.min(90, Math.floor(w * h / m.density));
    parts = Array.from({ length: count }, () => m.make(true));
  }

  function frame() {
    raf = requestAnimationFrame(frame);
    t++;
    const m = MODES[mode];
    ctx.clearRect(0, 0, w, h);
    parts.forEach((p, i) => { m.step(p, i); m.draw(p); });
    if (m.after) m.after();
    ctx.globalAlpha = 1;
  }

  function stop() { cancelAnimationFrame(raf); raf = 0; }
  function start() { if (!raf && enabled && !document.hidden) frame(); }

  addEventListener('resize', build);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  return {
    setTheme(theme) {
      mode = THEME_FX[theme] || 'constellation';
      readColors(); build();
      if (!enabled) { ctx.clearRect(0, 0, w, h); }
    },
    refreshColors: readColors,
    setEnabled(on) { enabled = on; on ? start() : (stop(), ctx.clearRect(0, 0, w, h)); }
  };
})();

// ---------- 2. Проверка: тянет ли телефон ----------
// 1) слабое железо → сразу лёгкий режим; 2) меряем FPS первые 3 секунды
function deviceIsWeak() {
  const mem = navigator.deviceMemory;          // ГБ памяти (есть в Chrome/Android)
  const cores = navigator.hardwareConcurrency;  // ядра процессора
  return (mem && mem < 3) || (cores && cores < 4);
}

function measureFps(ms = 3000) {
  return new Promise(resolve => {
    let frames = 0; const start = performance.now();
    (function tick(now) {
      frames++;
      if (now - start < ms) requestAnimationFrame(tick);
      else resolve(frames * 1000 / (now - start));
    })(start);
  });
}

// ---------- 3. Маскот Zumik — летает по экрану без рамки ----------
const Mascot = (() => {
  let el = null, raf = 0, x = 80, y = 160, tx = 0, ty = 0, vx = 0, vy = 0, t = 0, onTap = null;

  const SVG = `
  <svg viewBox="0 0 64 64">
    <defs><linearGradient id="zg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--accent-2)"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs>
    <g class="wing"><path d="M14 26c-10-6-12 4-6 8 4 2 8 0 10-2z" fill="#fff" opacity=".85"/></g>
    <path d="M38 4 14 36h14l-5 24 27-34H35z" fill="url(#zg)" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
    <ellipse class="eye" cx="27" cy="30" rx="2.6" ry="3.4" fill="#1b1033"/>
    <ellipse class="eye" cx="35" cy="30" rx="2.6" ry="3.4" fill="#1b1033"/>
    <circle cx="28" cy="29" r=".9" fill="#fff"/><circle cx="36" cy="29" r=".9" fill="#fff"/>
    <path d="M27 36q4 3 8 0" stroke="#1b1033" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </svg>`;

  function newTarget() { tx = 40 + Math.random() * (innerWidth - 110); ty = 90 + Math.random() * (innerHeight - 200); }

  function frame() {
    raf = requestAnimationFrame(frame);
    t++;
    const dx = tx - x, dy = ty - y;
    if (Math.hypot(dx, dy) < 30) newTarget();
    vx += dx * .0009; vy += dy * .0009;   // плавно поворачивает к цели
    vx *= .97; vy *= .97;
    x += vx; y += vy;
    const bob = Math.sin(t / 12) * 6;       // покачивание вверх-вниз
    el.style.transform = `translate(${x}px, ${y + bob}px) rotate(${vx * 4}deg)`;
    el.classList.toggle('flip', vx < 0);
    if (t % 6 === 0) trail(x + 32, y + 40 + bob);
  }

  function trail(px, py) {
    const s = document.createElement('i');
    s.className = 'trail'; s.style.left = px + 'px'; s.style.top = py + 'px';
    document.body.appendChild(s); setTimeout(() => s.remove(), 800);
  }

  function say(text) {
    const b = document.createElement('div');
    b.className = 'bubble'; b.textContent = text;
    b.style.left = Math.min(x + 50, innerWidth - 230) + 'px'; b.style.top = Math.max(y - 30, 70) + 'px';
    document.body.appendChild(b); setTimeout(() => b.remove(), 2600);
  }

  return {
    enable(tapHandler) {
      if (el) return;
      onTap = tapHandler;
      el = document.createElement('div');
      el.className = 'mascot'; el.innerHTML = SVG; el.setAttribute('aria-hidden', 'true');
      el.addEventListener('click', () => {
        el.classList.remove('spin'); void el.offsetWidth; el.classList.add('spin');
        vx += (Math.random() - .5) * 14; vy -= 6;   // отскакивает от пальца
        if (onTap) onTap();
      });
      document.body.appendChild(el);
      x = innerWidth * .2; y = innerHeight * .4; newTarget(); frame();
    },
    disable() { cancelAnimationFrame(raf); el?.remove(); el = null; },
    say,
    get on() { return !!el; }
  };
})();
