/* =========================================
   Birzumda — живой фон (8 эффектов)
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
