/* =========================================
   Birzumda — живой фон (23 темы)
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
    synth: 'synth', rings: 'rings', circuit: 'circuit', fire: 'waves', hex: 'hex', bolt: 'lightning', holo: 'holo',
    // YANGI
    aurora: 'aurora', matrix: 'matrix', warp: 'warp', rain: 'rain', lamp: 'lamp', dna: 'dna', galaxy: 'galaxy', party: 'confetti',
    // PREMIUM
    salyut: 'fireworks', meteor: 'meteor', tunnel: 'tunnel', radar: 'radar', eq: 'equalizer',
    lantern: 'lanterns', gears: 'gears', atom: 'atom', city: 'city', hilol: 'hilol',
    // ASOSIY +10
    sahro: 'fireflies', kofe: 'bubbles', zumrad: 'constellation', yoqut: 'embers', oltin: 'snow',
    muz: 'bubbles', limon: 'bubbles', binafsha: 'petals', tun: 'constellation', marjon: 'bubbles',
    // YANGI JONLI +10
    kaleido: 'kaleido', dengiz: 'sea', kapalak: 'butterfly', tuynuk: 'blackhole', yurak: 'hearts',
    bulut: 'clouds', uchqun: 'sparkle', mayatnik: 'pendulum', spiro: 'spiro', koi: 'koi'
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

  // ===== YANGI 8 ta effekt =====
  const GLYPHS = 'アイウエオカキクケコサシスセソタチツテト0123456789BIRZUMDA';
  Object.assign(MODES, {
    aurora: { // переливающиеся ленты северного сияния + звёзды
      density: 20000,
      make: () => ({ x: R() * w, y: R() * h, r: R() * 1.2 + .3, ph: R() * 6 }),
      step() {},
      draw(p) { dot(p.x, p.y, p.r, '#ffffff', .25 + Math.sin(t / 30 + p.ph) * .25); },
      after() {
        ctx.globalCompositeOperation = 'lighter';
        const bands = [[c1, .28, 0], [c2, .22, 2.1], ['#22d3ee', .14, 4.2]];
        for (const [col, base, k] of bands) {
          for (const [lw, a] of [[90, .05], [44, .08], [14, .16]]) {
            ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
            for (let x = -20; x <= w + 20; x += 16) {
              const y = h * base + Math.sin(x * .004 + t * .008 + k) * 46 + Math.sin(x * .011 - t * .013 + k) * 18;
              x < 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        }
        ctx.globalCompositeOperation = 'source-over';
      }
    },
    matrix: { // падающие столбцы символов
      density: 16000, max: 70,
      make: (init) => ({ x: Math.floor(R() * (w / 18)) * 18 + 4, y: init ? R() * h : -R() * 200, v: 1.5 + R() * 2.5,
                         len: 8 + (R() * 12 | 0), ch: Array.from({ length: 20 }, () => GLYPHS[R() * GLYPHS.length | 0]) }),
      step(p, i) { p.y += p.v; if (R() < .05) p.ch[R() * p.len | 0] = GLYPHS[R() * GLYPHS.length | 0];
                   if (p.y - p.len * 18 > h) parts[i] = this.make(false); },
      draw(p) {
        ctx.font = '15px monospace';
        for (let k = 0; k < p.len; k++) {
          const y = p.y - k * 18; if (y < -18 || y > h + 18) continue;
          ctx.globalAlpha = k ? (1 - k / p.len) * .55 : .95;
          ctx.fillStyle = k ? c1 : '#d9ffe4';
          ctx.fillText(p.ch[k], p.x, y);
        }
      }
    },
    warp: { // гиперпрыжок: звёзды летят на зрителя
      density: 9000, max: 160,
      make: (init) => ({ x: (R() - .5) * w * 2, y: (R() - .5) * h * 2, z: init ? R() * w : w, pz: 0 }),
      step(p, i) { p.pz = p.z; p.z -= 7 + (Math.sin(t / 240) + 1) * 5; if (p.z < 2) { parts[i] = this.make(false); parts[i].pz = w; } },
      draw(p) {
        const cx = w / 2, cy = h / 2, f = Math.min(w, h) * .5;
        const sx = cx + p.x / p.z * f, sy = cy + p.y / p.z * f, px = cx + p.x / p.pz * f, py = cy + p.y / p.pz * f;
        const a = Math.min(1, (1 - p.z / w) * 1.4);
        ctx.globalAlpha = a; ctx.strokeStyle = a > .7 ? '#ffffff' : c2; ctx.lineWidth = Math.max(1, (1 - p.z / w) * 3.5);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      },
      after() { const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * .35);
        g.addColorStop(0, c1); g.addColorStop(1, 'transparent'); ctx.globalAlpha = .12; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
    },
    rain: { // косой дождь и круги от капель
      density: 7000, max: 140,
      make: (init) => ({ x: R() * (w + 200) - 100, y: init ? R() * h : -R() * 100, len: 10 + R() * 18, v: 9 + R() * 7 }),
      step(p, i) { p.y += p.v; p.x += p.v * .18;
        if (p.y > h * (.75 + R() * .25)) { (extra.spl ||= []).push({ x: p.x, y: p.y, r: 1 }); parts[i] = this.make(false); } },
      draw(p) { ctx.globalAlpha = .45; ctx.strokeStyle = c2; ctx.lineWidth = 1.1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.len * .18, p.y - p.len); ctx.stroke(); },
      after() {
        const sp = extra.spl || []; ctx.strokeStyle = c1; ctx.lineWidth = 1;
        for (const q of sp) { q.r += .9; ctx.globalAlpha = Math.max(0, .5 - q.r / 40);
          ctx.beginPath(); ctx.ellipse(q.x, q.y, q.r, q.r * .3, 0, 0, 7); ctx.stroke(); }
        extra.spl = sp.filter(q => q.r < 20).slice(-80);
      }
    },
    lamp: { // лава-лампа: светящиеся капли сливаются
      density: 70000, max: 14,
      make: () => ({ x: R() * w, y: R() * h, r: 60 + R() * 90, vx: (R() - .5) * .6, vy: (R() - .5) * .9, ph: R() * 6 }),
      step(p) { p.x += p.vx; p.y += p.vy + Math.sin(t / 90 + p.ph) * .4;
        if (p.x < -p.r || p.x > w + p.r) p.vx *= -1; if (p.y < -p.r || p.y > h + p.r) p.vy *= -1; },
      draw(p) {
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, p.ph > 3 ? c1 : c2); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = .38; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    },
    dna: { // вращающиеся спирали ДНК
      density: 30000,
      make: () => ({ x: R() * w, y: R() * h, r: R() * 1.4 + .4, vy: -.2 - R() * .4, ph: R() * 6 }),
      step(p) { p.y += p.vy; if (p.y < -5) p.y = h + 5; },
      draw(p) { dot(p.x, p.y, p.r, c2, .25 + Math.sin(t / 25 + p.ph) * .2); },
      after() {
        const rows = w > 700 ? [h * .3, h * .72] : [h * .26, h * .7], A = Math.min(70, h * .08), step = 22;
        rows.forEach((cy, ri) => {
          for (let x = -10, i = 0; x < w + 10; x += step, i++) {
            const ph = i * .32 + t * .025 + ri * 2, s = Math.sin(ph), z = Math.cos(ph);
            const y1 = cy + s * A, y2 = cy - s * A;
            ctx.globalAlpha = .12 + Math.abs(z) * .12; ctx.strokeStyle = c2; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
            dot(x, y1, 3 + z * 1.6, c1, .45 + z * .35); dot(x, y2, 3 - z * 1.6, c2, .45 - z * .35);
          }
        });
      }
    },
    galaxy: { // спиральная галактика вращается
      density: 3500, max: 320,
      make: () => { const arm = R() * 3 | 0, d = Math.pow(R(), .7);
        return { arm, d, a: arm * 2.094 + d * 5.5 + (R() - .5) * .6, r: R() * 1.8 + .7, ph: R() * 6 }; },
      step(p) { p.a += .0016 + .004 * (1 - p.d); },
      draw(p) {
        const R0 = Math.min(w, h) * .55, cx = w * .5, cy = h * .45, rr = p.d * R0;
        const x = cx + Math.cos(p.a) * rr, y = cy + Math.sin(p.a) * rr * .55;
        dot(x, y, p.r * 2.6, p.arm ? c1 : c2, .08); dot(x, y, p.r, p.d < .3 ? '#ffffff' : (p.arm ? c2 : c1), .55 + Math.sin(t / 30 + p.ph) * .35);
      },
      after() { const cx = w * .5, cy = h * .45, g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
        g.addColorStop(0, '#ffffff'); g.addColorStop(.25, c2); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = .35; ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, 90, 50, 0, 0, 7); ctx.fill(); }
    },
    confetti: { // праздничное конфетти с 3D-переворотом
      density: 12000, max: 110,
      make: (init) => ({ x: R() * w, y: init ? R() * h : -20, s: 5 + R() * 6, vy: 1 + R() * 1.8, rot: R() * 7, vr: (R() - .5) * .12,
                         fl: R() * 7, col: ['#f59e0b', '#ec4899', '#22d3ee', '#a3e635', '#8b5cf6', '#ffffff'][R() * 6 | 0] }),
      step(p, i) { p.y += p.vy; p.x += Math.sin(t / 40 + p.fl) * .9; p.rot += p.vr; p.fl += .08; if (p.y > h + 20) parts[i] = this.make(false); },
      draw(p) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.fl));
        ctx.globalAlpha = .85; ctx.fillStyle = p.col; ctx.fillRect(-p.s / 2, -p.s * .3, p.s, p.s * .6); ctx.restore(); }
    }
  });

  // ===== PREMIUM: ещё 10 эффектов =====
  const NONE = { density: 1e9, make: () => ({}), step() {}, draw() {} };
  const twinkle = (d = 9000) => ({
    density: d, max: 120,
    make: () => ({ x: R() * w, y: R() * h, r: R() * 1.3 + .3, ph: R() * 6 }),
    step() {},
    draw(p) { dot(p.x, p.y, p.r, '#ffffff', .2 + Math.abs(Math.sin(t / 40 + p.ph)) * .5); }
  });
  function glow(x, y, r, col, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col); g.addColorStop(1, 'transparent');
    ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
  Object.assign(MODES, {
    fireworks: { ...twinkle(14000), // салют: ракеты взлетают и раскрываются
      after() {
        const fw = extra.fw ||= { r: [], s: [] };
        if (t % 55 === 0 || (fw.r.length < 1 && R() < .02)) fw.r.push({ x: w * (.15 + R() * .7), y: h, vy: -(h / 85) - R() * 3,
          col: [c1, c2, '#ffffff', '#22d3ee', '#a3e635'][R() * 5 | 0] });
        ctx.lineWidth = 2;
        fw.r = fw.r.filter(r => {
          r.y += r.vy; r.vy += .14;
          ctx.globalAlpha = .8; ctx.strokeStyle = r.col; ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x, r.y - r.vy * 3); ctx.stroke();
          if (r.vy < -1) return true;
          const n = 46 + (R() * 30 | 0);
          for (let k = 0; k < n; k++) { const a = k / n * 6.283, v = 1.5 + R() * 2.8;
            fw.s.push({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 70 + R() * 30, col: r.col }); }
          return false;
        });
        fw.s = fw.s.filter(q => { q.x += q.vx; q.y += q.vy; q.vy += .035; q.vx *= .985; q.vy *= .985; q.life--;
          dot(q.x, q.y, 1.8, q.col, Math.min(1, q.life / 60)); return q.life > 0; }).slice(-900);
      }
    },
    meteor: { ...twinkle(6000), // звездопад: метеоры с хвостом
      after() {
        const ms = extra.m ||= [];
        if (R() < .035) { const v = 11 + R() * 7;
          ms.push({ x: R() * w * 1.2, y: -20 - R() * h * .2, vx: -v * .75, vy: v * .55, len: 90 + R() * 120, life: 1 }); }
        extra.m = ms.filter(m => {
          m.x += m.vx; m.y += m.vy; m.life -= .012;
          const k = m.len / Math.hypot(m.vx, m.vy), tx = m.x - m.vx * k, ty = m.y - m.vy * k;
          const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
          g.addColorStop(0, '#ffffff'); g.addColorStop(.25, c2); g.addColorStop(1, 'transparent');
          ctx.globalAlpha = m.life; ctx.strokeStyle = g; ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
          dot(m.x, m.y, 2.4, '#ffffff', m.life);
          return m.life > 0 && m.y < h + 50 && m.x > -200;
        });
      }
    },
    tunnel: { ...NONE, // неоновый тоннель: рамки летят на зрителя и крутятся
      after() {
        const cx = w / 2, cy = h * .45, M = Math.hypot(w, h) * .62, N = 16;
        ctx.lineWidth = 2;
        for (let i = 0; i < N; i++) {
          const z = ((i / N) + t * .0035) % 1, s = z * z * M;
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .004 + z * 2.2);
          ctx.globalAlpha = z * .7; ctx.strokeStyle = i % 2 ? c1 : c2;
          ctx.strokeRect(-s / 2, -s / 2, s, s); ctx.restore();
        }
        glow(cx, cy, 70, c2, .25);
      }
    },
    radar: { // радар: луч проходит, точки вспыхивают
      density: 22000, max: 30,
      make: () => ({ a: R() * 6.283, d: .15 + R() * .8 }),
      step() {},
      draw(p) {
        const cx = w / 2, cy = h * .45, Rr = Math.min(w, h) * .44, sw = (t * .02) % 6.283;
        const diff = ((sw - p.a) % 6.283 + 6.283) % 6.283, a = Math.max(0, 1 - diff / 3);
        const x = cx + Math.cos(p.a) * p.d * Rr, y = cy + Math.sin(p.a) * p.d * Rr;
        if (a > 0) { glow(x, y, 10, c2, a * .6); dot(x, y, 2.5, '#ffffff', a); }
      },
      before: true,
      after() {
        const cx = w / 2, cy = h * .45, Rr = Math.min(w, h) * .44, sw = (t * .02) % 6.283;
        ctx.strokeStyle = c1; ctx.lineWidth = 1;
        for (let k = 1; k <= 4; k++) { ctx.globalAlpha = .18; ctx.beginPath(); ctx.arc(cx, cy, Rr * k / 4, 0, 7); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(cx - Rr, cy); ctx.lineTo(cx + Rr, cy); ctx.moveTo(cx, cy - Rr); ctx.lineTo(cx, cy + Rr); ctx.stroke();
        for (let k = 0; k < 28; k++) { const a = sw - k * .025;
          ctx.globalAlpha = .32 * (1 - k / 28); ctx.strokeStyle = c2; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * Rr, cy + Math.sin(a) * Rr); ctx.stroke(); }
      }
    },
    equalizer: { // эквалайзер: столбики прыгают под «музыку»
      density: 20000, max: 40,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 10, vy: .4 + R() * .8, s: 10 + R() * 8, ch: '♪♫♬'[R() * 3 | 0] }),
      step(p, i) { p.y -= p.vy; if (p.y < -20) parts[i] = this.make(false); },
      draw(p) { ctx.globalAlpha = .3; ctx.fillStyle = c2; ctx.font = `${p.s}px sans-serif`; ctx.fillText(p.ch, p.x, p.y); },
      after() {
        const bw = w > 700 ? 16 : 11, n = Math.ceil(w / bw), H = h * .3;
        const g = ctx.createLinearGradient(0, h, 0, h - H); g.addColorStop(0, c1); g.addColorStop(1, c2);
        ctx.fillStyle = g;
        for (let i = 0; i < n; i++) {
          const v = (Math.sin(i * .31 + t * .06) + Math.sin(i * .13 - t * .09) + Math.sin(i * .77 + t * .17) * .6 + 2.6) / 5.2;
          const bh = Math.max(4, v * v * H);
          ctx.globalAlpha = .38; ctx.fillRect(i * bw + 1, h - bh, bw - 3, bh);
          ctx.globalAlpha = .7; ctx.fillRect(i * bw + 1, h - bh - 6, bw - 3, 3);
        }
      }
    },
    lanterns: { // небесные фонарики поднимаются
      density: 26000, max: 38,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 40, s: 9 + R() * 12, vy: .25 + R() * .55, ph: R() * 6 }),
      step(p, i) { p.y -= p.vy; p.x += Math.sin(t / 70 + p.ph) * .3; if (p.y < -40) parts[i] = this.make(false); },
      draw(p) {
        const fl = .8 + Math.sin(t / 9 + p.ph) * .12;
        glow(p.x, p.y, p.s * 3.2, c1, .28 * fl);
        const g = ctx.createLinearGradient(0, p.y - p.s, 0, p.y + p.s); g.addColorStop(0, c2); g.addColorStop(1, c1);
        ctx.globalAlpha = .85 * fl; ctx.fillStyle = g;
        ctx.beginPath(); ctx.moveTo(p.x - p.s * .55, p.y - p.s); ctx.lineTo(p.x + p.s * .55, p.y - p.s);
        ctx.lineTo(p.x + p.s * .42, p.y + p.s); ctx.lineTo(p.x - p.s * .42, p.y + p.s); ctx.closePath(); ctx.fill();
      }
    },
    gears: { ...NONE, // механизм: шестерёнки крутятся и цепляются
      init() {
        const u = Math.min(w, h) / 9;
        extra.g = [
          { x: w * .12, y: h * .22, r: u * 1.3, n: 14, d: 1 },
          { x: w * .12 + u * 2.55, y: h * .22 + u * .7, r: u * .95, n: 10, d: -1 },
          { x: w * .88, y: h * .78, r: u * 1.8, n: 20, d: 1 },
          { x: w * .88 - u * 2.95, y: h * .78 - u * .9, r: u * .9, n: 10, d: -1 },
          { x: w * .82, y: h * .16, r: u * .7, n: 8, d: 1 }];
      },
      after() {
        for (const g of extra.g || []) {
          const rot = t * .012 * g.d * (14 / g.n), tooth = g.r * .18;
          ctx.save(); ctx.translate(g.x, g.y); ctx.rotate(rot); ctx.beginPath();
          for (let i = 0; i < g.n; i++) { const a = i / g.n * 6.283, da = 6.283 / g.n;
            ctx.lineTo(Math.cos(a) * g.r, Math.sin(a) * g.r);
            ctx.lineTo(Math.cos(a + da * .15) * (g.r + tooth), Math.sin(a + da * .15) * (g.r + tooth));
            ctx.lineTo(Math.cos(a + da * .45) * (g.r + tooth), Math.sin(a + da * .45) * (g.r + tooth));
            ctx.lineTo(Math.cos(a + da * .6) * g.r, Math.sin(a + da * .6) * g.r); }
          ctx.closePath(); ctx.globalAlpha = .1; ctx.fillStyle = c1; ctx.fill();
          ctx.globalAlpha = .45; ctx.strokeStyle = c2; ctx.lineWidth = 2; ctx.stroke();
          ctx.beginPath(); ctx.arc(0, 0, g.r * .32, 0, 7); ctx.stroke();
          for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(k * 1.571) * g.r * .9, Math.sin(k * 1.571) * g.r * .9); ctx.globalAlpha = .2; ctx.stroke(); }
          ctx.restore();
        }
      }
    },
    atom: { ...twinkle(12000), // атом: электроны на трёх орбитах
      after() {
        const cx = w / 2, cy = h * .42, Rr = Math.min(w, h) * .34;
        glow(cx, cy, 60, c2, .45); dot(cx, cy, 9, '#ffffff', .9);
        for (let k = 0; k < 3; k++) {
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(k * 1.047 + t * .001);
          ctx.globalAlpha = .25; ctx.strokeStyle = c1; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.ellipse(0, 0, Rr, Rr * .34, 0, 0, 7); ctx.stroke();
          for (let j = 0; j < 8; j++) { const a = t * .035 * (1 + k * .2) + k * 2 - j * .06;
            dot(Math.cos(a) * Rr, Math.sin(a) * Rr * .34, j ? 3 - j * .3 : 4.5, j ? c2 : '#ffffff', j ? .5 - j * .06 : 1); }
          ctx.restore();
        }
      }
    },
    city: { ...twinkle(14000), // ночной город: окна загораются и гаснут
      init() {
        const b = []; let x = -10;
        while (x < w + 10) { const bw = 34 + R() * 60, bh = h * (.12 + R() * .3);
          const win = []; for (let yy = 12; yy < bh - 10; yy += 16) for (let xx = 7; xx < bw - 10; xx += 13) win.push({ x: xx, y: yy, on: R() < .35 });
          b.push({ x, bw, bh, win }); x += bw + 3; }
        extra.b = b;
      },
      after() {
        for (const b of extra.b || []) {
          ctx.globalAlpha = .82; ctx.fillStyle = '#04030c'; ctx.fillRect(b.x, h - b.bh, b.bw, b.bh);
          ctx.globalAlpha = .5; ctx.strokeStyle = c1; ctx.lineWidth = 1; ctx.strokeRect(b.x + .5, h - b.bh + .5, b.bw - 1, b.bh);
          for (const q of b.win) { if (R() < .0015) q.on = !q.on; if (!q.on) continue;
            ctx.globalAlpha = .75; ctx.fillStyle = c2; ctx.fillRect(b.x + q.x, h - b.bh + q.y, 6, 8); }
        }
      }
    },
    hilol: { ...twinkle(7000), // ночь с полумесяцем
      after() {
        const x = w * (w > 700 ? .82 : .76), y = h * .17, r = Math.min(64, w * .11);
        glow(x, y, r * 3, c1, .22);
        ctx.save(); ctx.globalAlpha = 1; ctx.fillStyle = c1; ctx.shadowColor = c1; ctx.shadowBlur = 30;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x + r * .42, y - r * .22, r * .88, 0, 7); ctx.fill(); ctx.restore();
        const sx = x - r * 1.5, sy = y + r * .1, s = 7 + Math.sin(t / 20) * 2;
        ctx.globalAlpha = .9; ctx.fillStyle = c2; ctx.beginPath();
        for (let k = 0; k < 10; k++) { const a = k * .628 - 1.571, rr = k % 2 ? s * .42 : s; ctx.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr); }
        ctx.closePath(); ctx.fill();
      }
    }
  });

  // ===== YANGI JONLI +10 =====
  Object.assign(MODES, {
    kaleido: { ...NONE, // калейдоскоп: симметричные узоры вращаются
      after() {
        const cx = w / 2, cy = h * .45, n = 12, Rr = Math.min(w, h) * .45;
        ctx.save(); ctx.translate(cx, cy); ctx.globalCompositeOperation = 'lighter';
        for (let k = 0; k < n; k++) {
          ctx.save(); ctx.rotate(k * 6.283 / n + t * .003); if (k % 2) ctx.scale(1, -1);
          for (let j = 0; j < 5; j++) {
            const d = Rr * (.18 + j * .17) * (1 + Math.sin(t * .01 + j) * .12), s = 16 + j * 10 + Math.sin(t * .02 + j) * 5;
            ctx.globalAlpha = .34; ctx.fillStyle = j % 2 ? c1 : c2;
            ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d + s, s * .6); ctx.lineTo(d + s * 2, 0); ctx.lineTo(d + s, -s * .25); ctx.closePath(); ctx.fill();
          }
          ctx.restore();
        }
        ctx.restore(); ctx.globalCompositeOperation = 'source-over';
      }
    },
    sea: { ...NONE, // море: слои волн
      after() {
        for (let L = 0; L < 5; L++) {
          const base = h * (.55 + L * .1), amp = 14 + L * 5, sp = .012 + L * .004;
          ctx.globalAlpha = .12 + L * .07; ctx.fillStyle = L % 2 ? c1 : c2; ctx.beginPath(); ctx.moveTo(0, h);
          for (let x = 0; x <= w + 10; x += 10)
            ctx.lineTo(x, base + Math.sin(x * .008 + t * sp + L) * amp + Math.sin(x * .021 - t * sp * 1.3) * amp * .4);
          ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
        }
      }
    },
    butterfly: { // бабочки машут крыльями
      density: 30000, max: 24,
      make: () => ({ x: R() * w, y: R() * h, vx: (R() - .5) * 1.2, vy: (R() - .5) * .8, s: 14 + R() * 14, ph: R() * 6, col: R() < .5 }),
      step(p) { p.x += p.vx + Math.sin(t / 50 + p.ph) * .6; p.y += p.vy + Math.cos(t / 40 + p.ph) * .5;
        if (p.x < -30) p.x = w + 30; if (p.x > w + 30) p.x = -30; if (p.y < -30) p.y = h + 30; if (p.y > h + 30) p.y = -30; },
      draw(p) {
        const f = Math.abs(Math.sin(t / 6 + p.ph)) * .8 + .2;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx) + 1.571);
        ctx.globalAlpha = .7; ctx.fillStyle = p.col ? c1 : c2;
        for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * p.s * .55 * f, -p.s * .2, p.s * .6 * f, p.s * .45, 0, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.ellipse(sx * p.s * .4 * f, p.s * .35, p.s * .38 * f, p.s * .3, 0, 0, 7); ctx.fill(); }
        ctx.globalAlpha = .9; ctx.fillStyle = '#fff'; ctx.fillRect(-1, -p.s * .5, 2, p.s); ctx.restore();
      }
    },
    blackhole: { // чёрная дыра: аккреционный диск затягивает частицы
      density: 3000, max: 300,
      make: () => ({ a: R() * 6.283, d: .2 + R() * .8, r: R() * 2 + .8 }),
      step(p) { p.a += .004 / (p.d * p.d + .05); p.d -= .0009; if (p.d < .12) { p.d = 1; p.a = R() * 6.283; } },
      draw(p) {
        const cx = w / 2, cy = h * .42, Rr = Math.min(w, h) * .75;
        dot(cx + Math.cos(p.a) * p.d * Rr, cy + Math.sin(p.a) * p.d * Rr * .38, p.r, p.d < .35 ? '#ffffff' : (p.d < .6 ? c2 : c1), Math.min(1, (1.1 - p.d)));
      },
      after() { const cx = w / 2, cy = h * .42, r = Math.min(w, h) * .07;
        glow(cx, cy, r * 3, c2, .35);
        ctx.globalAlpha = 1; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
        ctx.strokeStyle = c2; ctx.lineWidth = 2; ctx.globalAlpha = .8; ctx.stroke(); }
    },
    hearts: { // сердечки поднимаются
      density: 16000, max: 60,
      make: (init) => ({ x: R() * w, y: init ? R() * h : h + 20, s: 11 + R() * 16, vy: .4 + R() * .9, ph: R() * 6 }),
      step(p, i) { p.y -= p.vy; p.x += Math.sin(t / 50 + p.ph) * .4; if (p.y < -30) parts[i] = this.make(false); },
      draw(p) { const s = p.s * (1 + Math.sin(t / 12 + p.ph) * .08);
        ctx.globalAlpha = .55; ctx.fillStyle = p.ph > 3 ? c1 : c2; ctx.beginPath();
        ctx.moveTo(p.x, p.y + s * .35);
        ctx.bezierCurveTo(p.x - s, p.y - s * .4, p.x - s * .5, p.y - s, p.x, p.y - s * .45);
        ctx.bezierCurveTo(p.x + s * .5, p.y - s, p.x + s, p.y - s * .4, p.x, p.y + s * .35); ctx.fill(); }
    },
    clouds: { // светлое небо: плывут облака
      density: 60000, max: 14,
      make: (init) => ({ x: init ? R() * w : -200, y: R() * h * .8, s: 30 + R() * 50, v: .15 + R() * .35 }),
      step(p, i) { p.x += p.v; if (p.x - p.s * 3 > w) parts[i] = this.make(false); },
      draw(p) { ctx.globalAlpha = .75; ctx.fillStyle = '#ffffff';
        for (const [dx, dy, k] of [[0, 0, 1], [p.s * .9, -p.s * .25, .8], [p.s * 1.7, 0, .9], [p.s * .8, p.s * .25, .85]]) {
          ctx.beginPath(); ctx.arc(p.x + dx, p.y + dy, p.s * k, 0, 7); ctx.fill(); } },
      after() { glow(w * .85, h * .12, 140, c2, .35); }
    },
    sparkle: { // блёстки: искры-звёздочки вспыхивают
      density: 9000, max: 110,
      make: () => ({ x: R() * w, y: R() * h, s: 3 + R() * 7, ph: R() * 6, sp: .03 + R() * .05 }),
      step(p) { p.ph += p.sp; if (p.ph > 6.283) { p.ph = 0; p.x = R() * w; p.y = R() * h; } },
      draw(p) { const a = Math.max(0, Math.sin(p.ph)), s = p.s * a;
        if (a < .05) return;
        ctx.globalAlpha = a * .9; ctx.fillStyle = p.s > 7 ? '#ffffff' : (p.s > 5 ? c2 : c1); ctx.beginPath();
        ctx.moveTo(p.x, p.y - s * 2); ctx.quadraticCurveTo(p.x, p.y, p.x + s * 2, p.y); ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s * 2);
        ctx.quadraticCurveTo(p.x, p.y, p.x - s * 2, p.y); ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s * 2); ctx.fill(); }
    },
    pendulum: { ...twinkle(14000), // маятниковая волна
      after() {
        const n = w > 700 ? 24 : 15, top = 0, L0 = h * .32;
        for (let i = 0; i < n; i++) {
          const x = w * (i + .5) / n, L = L0 + i * (h * .018), ang = Math.sin(t * .03 * (51 + i) / 60) * .55;
          const bx = x + Math.sin(ang) * L * .35, by = top + Math.cos(ang) * L;
          ctx.globalAlpha = .18; ctx.strokeStyle = c2; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(bx, by); ctx.stroke();
          glow(bx, by, 16, i % 2 ? c1 : c2, .4); dot(bx, by, 5, '#ffffff', .85);
        }
      }
    },
    spiro: { ...NONE, // спирограф: светящийся узор рисуется сам
      after() {
        const cx = w / 2, cy = h * .45, Rr = Math.min(w, h) * .3, r = Rr * .37, d = Rr * .62;
        ctx.lineWidth = 2.6;
        for (let k = 0; k < 320; k++) {
          const a = (t - k) * .045, b = (t - k - 1) * .045;
          const p = (q) => [cx + (Rr - r) * Math.cos(q) + d * Math.cos((Rr - r) / r * q), cy + (Rr - r) * Math.sin(q) - d * Math.sin((Rr - r) / r * q)];
          const [x1, y1] = p(a), [x2, y2] = p(b);
          ctx.globalAlpha = (1 - k / 320) * .85; ctx.strokeStyle = k < 140 ? c2 : c1;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
      }
    },
    koi: { // карпы кои плавают по кругу
      density: 40000, max: 12,
      make: () => ({ x: R() * w, y: R() * h, a: R() * 6.283, v: .8 + R() * .8, s: 22 + R() * 16, turn: (R() - .5) * .02, col: R() < .5 }),
      step(p) { p.a += p.turn + Math.sin(t / 60 + p.s) * .01; p.x += Math.cos(p.a) * p.v; p.y += Math.sin(p.a) * p.v;
        if (p.x < -40) p.x = w + 40; if (p.x > w + 40) p.x = -40; if (p.y < -40) p.y = h + 40; if (p.y > h + 40) p.y = -40; },
      draw(p) {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
        const wag = Math.sin(t / 6 + p.s) * .35;
        ctx.globalAlpha = .75; ctx.fillStyle = p.col ? c1 : c2;
        ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .38, 0, 0, 7); ctx.fill();
        ctx.save(); ctx.translate(-p.s * .9, 0); ctx.rotate(wag);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-p.s * .7, -p.s * .4); ctx.lineTo(-p.s * .55, 0); ctx.lineTo(-p.s * .7, p.s * .4); ctx.closePath(); ctx.fill(); ctx.restore();
        ctx.globalAlpha = .5; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(p.s * .2, 0, p.s * .3, p.s * .16, 0, 0, 7); ctx.fill();
        ctx.restore();
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
    const count = Math.min(m.max || 90, Math.floor(w * h / m.density));
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
