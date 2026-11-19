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
    qish: 'snow', lava: 'embers', orman: 'fireflies', sakura: 'petals',
    // PRO — как шаблоны Birzumda Tayyorla
    synth: 'synth', rings: 'rings', circuit: 'circuit', fire: 'waves', hex: 'hex', bolt: 'lightning', holo: 'holo'
  };
  let bgColor = '#000', extra = {};

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

  // ===== PRO-эффекты =====
  Object.assign(MODES, {
    synth: { // неоновый пол + полосатое солнце
      density: 30000,
      make: () => ({ x: R() * w, y: R() * h * .5, r: R() * 1.2 + .3, ph: R() * 6 }),
      step() {},
      draw(p) { dot(p.x, p.y, p.r, '#ffffff', .3 + Math.sin(t / 25 + p.ph) * .3); },
      after() {
        const hy = h * .6, cx = w / 2, sr = Math.min(170, w * .28);
        const g = ctx.createLinearGradient(0, hy - sr, 0, hy);
        g.addColorStop(0, '#ffd36a'); g.addColorStop(.5, c2); g.addColorStop(1, c1);
        ctx.globalAlpha = .55; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, hy, sr, Math.PI, 0); ctx.fill();
        ctx.globalAlpha = 1; ctx.fillStyle = bgColor;          // полосы на солнце
        for (let k = 0; k < 7; k++) { const y = hy - sr * .45 + k * (sr * .07) + k * k * .9; ctx.fillRect(cx - sr, y, sr * 2, 2 + k * .9); }
        ctx.strokeStyle = c2; ctx.lineWidth = 1.3;
        for (let i = -16; i <= 16; i++) { ctx.globalAlpha = .4; ctx.beginPath(); ctx.moveTo(cx + i * 30, hy); ctx.lineTo(cx + i * 300, h); ctx.stroke(); }
        for (let k = 0; k < 16; k++) {
          const z = (k + (t % 50) / 50) / 16, y = hy + (h - hy) * z * z;
          ctx.globalAlpha = .12 + z * .5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
        ctx.globalAlpha = .9; ctx.strokeStyle = c1; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(w, hy); ctx.stroke();
      }
    },
    rings: { // кольца расходятся из нескольких центров
      density: 1e9,
      init() {
        extra.centers = Array.from({ length: w > 700 ? 3 : 2 }, (_, i) => ({ x: w * (.2 + .6 * R()), y: h * (.2 + .6 * R()), off: i * 60 }));
        extra.dots = Array.from({ length: Math.min(50, w * h / 25000) }, () => ({ x: R() * w, y: R() * h, ph: R() * 6 }));
      },
      make: () => ({}), step() {}, draw() {},
      after() {
        ctx.lineWidth = 1.6;
        for (const c of extra.centers) {
          for (let k = 0; k < 5; k++) {
            const r = ((t + c.off + k * 70) % 350) + 10, a = 1 - r / 360;
            ctx.globalAlpha = a * .55; ctx.strokeStyle = k % 2 ? c2 : c1;
            ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, 7); ctx.stroke();
          }
          dot(c.x, c.y, 4, c2, .9);
        }
        for (const d of extra.dots) dot(d.x, d.y, 1.3, c2, .3 + Math.sin(t / 30 + d.ph) * .3);
      }
    },
    circuit: { // дорожки платы и бегущие импульсы
      density: 1e9,
      init() {
        const step = 40, n = Math.min(26, Math.floor(w * h / 45000) + 6);
        extra.paths = Array.from({ length: n }, () => {
          let x = Math.round(R() * w / step) * step, y = Math.round(R() * h / step) * step;
          const pts = [[x, y]]; let dir = Math.floor(R() * 4);
          for (let i = 0; i < 6 + R() * 6; i++) {
            if (R() < .45) dir = (dir + (R() < .5 ? 1 : 3)) % 4;
            const len = step * (1 + Math.floor(R() * 3));
            x += [len, 0, -len, 0][dir]; y += [0, len, 0, -len][dir];
            pts.push([x, y]);
          }
          let L = 0; for (let i = 1; i < pts.length; i++) L += Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]);
          return { pts, L, pos: R() * L, sp: 1 + R() * 2 };
        });
      },
      make: () => ({}), step() {}, draw() {},
      after() {
        ctx.lineWidth = 1.5; ctx.strokeStyle = c1;
        for (const p of extra.paths) {
          ctx.globalAlpha = .22; ctx.beginPath(); ctx.moveTo(...p.pts[0]); p.pts.forEach(q => ctx.lineTo(...q)); ctx.stroke();
          dot(...p.pts[0], 3, c1, .5); dot(...p.pts[p.pts.length - 1], 3, c1, .5);
          p.pos = (p.pos + p.sp) % p.L;                         // импульс бежит по дорожке
          let rest = p.pos;
          for (let i = 1; i < p.pts.length; i++) {
            const [ax, ay] = p.pts[i - 1], [bx, by] = p.pts[i], seg = Math.abs(bx - ax) + Math.abs(by - ay);
            if (rest <= seg) { const k = rest / seg, x = ax + (bx - ax) * k, y = ay + (by - ay) * k; dot(x, y, 9, c2, .15); dot(x, y, 2.6, c2, 1); break; }
            rest -= seg;
          }
        }
      }
    },
    waves: { // огненные волны + искры
      density: 22000,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 10, r: .8 + R() * 2, vy: .5 + R() * 1.2, ph: R() * 6 }),
      step(p, i) { p.y -= p.vy; p.x += Math.sin(t / 30 + p.ph) * .6; if (p.y < -10) parts[i] = this.make(false); },
      draw(p) { dot(p.x, p.y, p.r, c2, .4 + Math.sin(t / 8 + p.ph) * .3); },
      after() {
        for (let k = 0; k < 6; k++) {
          const g = ctx.createLinearGradient(0, 0, w, 0);
          g.addColorStop(0, c1); g.addColorStop(.5, c2); g.addColorStop(1, c1);
          ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.globalAlpha = .18 + k * .06;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 12) {
            const y = h * (.68 + k * .05) + Math.sin(x / (160 + k * 30) + t / (40 - k * 3) + k) * (24 + k * 6);
            x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.stroke();
        }
      }
    },
    hex: { // соты: сетка рисуется один раз, светятся отдельные ячейки
      density: 1e9,
      init() {
        const s = 30, hw = Math.sqrt(3) * s, off = document.createElement('canvas');
        off.width = w; off.height = h; const o = off.getContext('2d');
        o.strokeStyle = c1; o.globalAlpha = .18; o.lineWidth = 1;
        extra.cells = [];
        for (let row = 0, y = 0; y < h + s * 2; row++, y += s * 1.5) {
          for (let x = (row % 2) * hw / 2; x < w + hw; x += hw) {
            hexPath(o, x, y, s - 2); o.stroke();
            if (R() < .06) extra.cells.push({ x, y, ph: R() * 6, sp: .01 + R() * .03 });
          }
        }
        extra.off = off; extra.s = s;
      },
      make: () => ({}), step() {}, draw() {},
      after() {
        ctx.globalAlpha = 1; ctx.drawImage(extra.off, 0, 0);
        for (const c of extra.cells) {
          const a = Math.max(0, Math.sin(t * c.sp + c.ph));
          ctx.globalAlpha = a * .35; ctx.fillStyle = c1; hexPath(ctx, c.x, c.y, extra.s - 2); ctx.fill();
          ctx.globalAlpha = a; ctx.strokeStyle = c2; ctx.lineWidth = 1.5; ctx.stroke();
        }
      }
    },
    lightning: { // золотые молнии со вспышкой
      density: 26000,
      make: () => ({ x: R() * w, y: R() * h, r: R() * 1.2 + .3, ph: R() * 6 }),
      step() {},
      draw(p) { dot(p.x, p.y, p.r, c2, .25 + Math.sin(t / 30 + p.ph) * .2); },
      after() {
        if (!extra.bolt && R() < .012) {                  // новая молния
          const pts = [[R() * w, -10]]; let [x, y] = pts[0]; const end = h * (.4 + R() * .5);
          while (y < end) { x += (R() - .5) * 60; y += 15 + R() * 25; pts.push([x, y]); }
          extra.bolt = { pts, life: 1 };
        }
        if (extra.bolt) {
          const b = extra.bolt;
          ctx.globalAlpha = b.life * .08; ctx.fillStyle = c2; ctx.fillRect(0, 0, w, h);       // вспышка
          for (const [lw, col, a] of [[8, c1, .25], [2.5, c2, 1]]) {
            ctx.globalAlpha = b.life * a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
            ctx.moveTo(...b.pts[0]); b.pts.forEach(q => ctx.lineTo(...q)); ctx.stroke();
          }
          b.life -= .04; if (b.life <= 0) extra.bolt = null;
        }
      }
    },
    holo: { // переливающиеся пузыри
      density: 40000,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 80, r: 20 + R() * 60, vy: .2 + R() * .5, hue: R() * 360, ph: R() * 6 }),
      step(p, i) { p.y -= p.vy; p.x += Math.sin(t / 80 + p.ph) * .5; p.hue = (p.hue + .4) % 360; if (p.y < -150) parts[i] = this.make(false); },
      draw(p) {
        const g = ctx.createRadialGradient(p.x - p.r * .3, p.y - p.r * .3, p.r * .1, p.x, p.y, p.r);
        g.addColorStop(0, `hsla(${p.hue},90%,85%,.55)`); g.addColorStop(.7, `hsla(${(p.hue + 60) % 360},90%,75%,.25)`);
        g.addColorStop(1, `hsla(${(p.hue + 120) % 360},90%,70%,0)`);
        ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
    }
  });

  function hexPath(c, x, y, s) {
    c.beginPath();
    for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i + Math.PI / 6; c[i ? 'lineTo' : 'moveTo'](x + s * Math.cos(a), y + s * Math.sin(a)); }
    c.closePath();
  }

  function dot(x, y, r, color, a) {
    ctx.globalAlpha = Math.max(0, Math.min(1, a)); ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }

  function readColors() {
    const st = getComputedStyle(document.documentElement);
    c1 = st.getPropertyValue('--accent').trim() || c1;
    c2 = st.getPropertyValue('--accent-2').trim() || c2;
    bgColor = st.getPropertyValue('--bg').trim() || bgColor;
  }

  function build() {
    w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    const m = MODES[mode];
    const count = Math.min(90, Math.floor(w * h / m.density));
    parts = Array.from({ length: count }, () => m.make(true));
    extra = {};
    m.init?.();
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
    refreshColors() { readColors(); if (MODES[mode].init) build(); },
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
