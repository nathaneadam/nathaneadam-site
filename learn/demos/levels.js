/* ==================================================================
   Levels demo — a voice recording run through a pretend recorder.

     voice ─► record level ─► + recorder hiss ─► 0 dBFS ceiling ─► edit volume ─► speakers

   The ceiling is a hard clip, exactly what a phone or camera does when
   you record too hot, so clipping you "record" here is baked in: turning
   the edit volume down afterwards makes it quieter, not cleaner. That's
   the point of the lesson.

   Logic only. Every word comes in through opts.labels.
   ================================================================== */
const HISS_DB = -66;           // the recorder's own noise, added after the record level
const REC = { min: -30, max: 14 };
const EDIT = { min: -12, max: 24 };

export const START = { rec: -27, edit: 0, played: false };

let xPeakDb = -1;              // loudest sample of the source, set once it's decoded
let absSorted = null;          // for "how much of it clipped"

const db = (g) => 20 * Math.log10(Math.max(g, 1e-9));
const gain = (d) => Math.pow(10, d / 20);
export const recordedPeak = (s) => Math.min(0, xPeakDb + s.rec);
export const clipped = (s) => xPeakDb + s.rec >= 0;
function clipFraction(s) {
  if (!absSorted || !clipped(s)) return 0;
  const thr = 1 / gain(s.rec);              // source level that hits the ceiling
  let lo = 0, hi = absSorted.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (absSorted[m] < thr) lo = m + 1; else hi = m; }
  return (absSorted.length - lo) / absSorted.length;
}

export const checks = {
  'played': (s) => s.played,
  'boost':  (s) => s.edit >= 15 && s.rec <= -18,
  'right':  (s) => Math.abs(s.edit) <= 3 && recordedPeak(s) >= -12.5 && recordedPeak(s) <= -5.5,
  'clip':   (s) => clipped(s) && clipFraction(s) > 0.002,
  'nofix':  (s) => clipped(s) && s.edit <= -9,
};

export async function mount(root, opts) {
  const L = opts.labels;
  let state = Object.assign({}, opts.start || START);
  const listeners = [];

  root.classList.add('au');
  root.innerHTML = `
    <div class="au-screen">
      <canvas class="au-wave" aria-label="${L.wave}"></canvas>
      <div class="au-tag"></div>
      <div class="au-loading">${L.loading}</div>
    </div>
    <div class="au-meter" aria-hidden="true">
      <div class="au-bar"><i class="au-fill"></i><i class="au-hold"></i><i class="au-zone"></i></div>
      <div class="au-scale">${[-48, -36, -24, -18, -12, -6, 0].map((d) => `<span style="left:${(d + 48) / 48 * 100}%">${d}</span>`).join('')}</div>
    </div>
    <div class="au-controls">
      <button type="button" class="au-play" disabled><span class="au-icon"></span><span class="au-plab">${L.play}</span></button>
      <label class="au-fader au-rec"><span>${L.rec}</span><input type="range" min="${REC.min}" max="${REC.max}" step="1"><output></output></label>
      <label class="au-fader au-edit"><span>${L.edit}</span><input type="range" min="${EDIT.min}" max="${EDIT.max}" step="1"><output></output></label>
    </div>
    <p class="au-note">${L.note}</p>`;

  const canvas = root.querySelector('.au-wave');
  const tag = root.querySelector('.au-tag');
  const loading = root.querySelector('.au-loading');
  const fill = root.querySelector('.au-fill');
  const hold = root.querySelector('.au-hold');
  const playBtn = root.querySelector('.au-play');
  const pLab = root.querySelector('.au-plab');
  const recIn = root.querySelector('.au-rec input'), recOut = root.querySelector('.au-rec output');
  const editIn = root.querySelector('.au-edit input'), editOut = root.querySelector('.au-edit output');

  /* ---------- audio ---------- */
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* older Safari */ }
  const res = await fetch(opts.media + 'audio/voice.mp3');
  const bytes = await res.arrayBuffer();
  const buf = await new Promise((ok, bad) => ctx.decodeAudioData(bytes, ok, bad));
  const data = buf.getChannelData(0);
  let pk = 0; for (let i = 0; i < data.length; i++) { const a = Math.abs(data[i]); if (a > pk) pk = a; }
  xPeakDb = db(pk);
  absSorted = Float32Array.from(data, Math.abs).sort();

  // per-pixel min/max of the source, for drawing
  const COLS = 900, mins = new Float32Array(COLS), maxs = new Float32Array(COLS);
  { const seg = Math.floor(data.length / COLS);
    for (let c = 0; c < COLS; c++) { let lo = 1, hi = -1; for (let i = c * seg; i < (c + 1) * seg; i++) { const v = data[i]; if (v < lo) lo = v; if (v > hi) hi = v; } mins[c] = lo; maxs[c] = hi; } }

  // white noise for the recorder's hiss
  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  { const n = noise.getChannelData(0); for (let i = 0; i < n.length; i++) n[i] = (Math.random() * 2 - 1) * 1.7; }

  const recG = ctx.createGain(), hissG = ctx.createGain(), sum = ctx.createGain();
  const ceiling = ctx.createWaveShaper(); ceiling.curve = new Float32Array([-1, 1]); // straight line; anything past ±1 is held at ±1
  const editG = ctx.createGain(), an = ctx.createAnalyser();
  an.fftSize = 2048;
  hissG.gain.value = gain(HISS_DB);
  recG.connect(sum); hissG.connect(sum); sum.connect(ceiling); ceiling.connect(editG); editG.connect(an); an.connect(ctx.destination);

  let src = null, hissSrc = null, t0 = 0, raf = 0, holdDb = -60;
  function applyGains() {
    const t = ctx.currentTime;
    recG.gain.setTargetAtTime(gain(state.rec), t, 0.015);
    editG.gain.setTargetAtTime(gain(state.edit), t, 0.015);
  }
  function stop() {
    if (src) { src.onended = null; try { src.stop(); } catch (e) {} src = null; }
    if (hissSrc) { try { hissSrc.stop(); } catch (e) {} hissSrc = null; }
    cancelAnimationFrame(raf); raf = 0;
    root.classList.remove('au-playing'); pLab.textContent = L.play;
    fill.style.width = '0%'; draw();
  }
  async function play() {
    await ctx.resume();
    stop();
    applyGains();
    src = ctx.createBufferSource(); src.buffer = buf; src.connect(recG);
    hissSrc = ctx.createBufferSource(); hissSrc.buffer = noise; hissSrc.loop = true; hissSrc.connect(hissG);
    t0 = ctx.currentTime; holdDb = -60;
    src.start(); hissSrc.start();
    src.onended = () => stop();
    root.classList.add('au-playing'); pLab.textContent = L.stop;
    if (!state.played) { state.played = true; emit(); }
    tick();
  }
  const tdata = new Float32Array(an.fftSize);
  function tick() {
    an.getFloatTimeDomainData(tdata);
    let p = 0; for (let i = 0; i < tdata.length; i++) { const a = Math.abs(tdata[i]); if (a > p) p = a; }
    const d = Math.max(-48, Math.min(0, db(p)));
    holdDb = Math.max(holdDb - 0.4, d);
    fill.style.width = ((d + 48) / 48 * 100).toFixed(1) + '%';
    fill.dataset.zone = d >= -0.5 ? 'clip' : d > -6 ? 'hot' : d >= -12 ? 'good' : 'low';
    hold.style.left = ((holdDb + 48) / 48 * 100).toFixed(1) + '%';
    draw((ctx.currentTime - t0) / buf.duration);
    raf = requestAnimationFrame(tick);
  }
  playBtn.addEventListener('click', () => (src ? stop() : play()));
  recIn.addEventListener('input', () => { state.rec = +recIn.value; changed(); });
  editIn.addEventListener('input', () => { state.edit = +editIn.value; changed(); });

  /* ---------- drawing ---------- */
  const g2 = canvas.getContext('2d');
  function draw(head) {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (!W || !H) return;
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    const mid = H / 2, A = H / 2 - 16 * dpr;
    g2.clearRect(0, 0, W, H);
    // the ceiling, and the -6 and -12 lines
    g2.setLineDash([4 * dpr, 4 * dpr]); g2.lineWidth = dpr;
    [[1, '#636366'], [gain(-6), '#3a3a3c'], [gain(-12), '#2c2c2e']].forEach(([v, c]) => {
      g2.strokeStyle = c; g2.beginPath();
      g2.moveTo(0, mid - v * A); g2.lineTo(W, mid - v * A); g2.moveTo(0, mid + v * A); g2.lineTo(W, mid + v * A); g2.stroke();
    });
    g2.setLineDash([]);
    g2.fillStyle = '#8e8e93'; g2.font = `${11 * dpr}px Inter, system-ui, sans-serif`;
    g2.fillText(L.ceiling, 6 * dpr, mid - A - 5 * dpr);
    const rg = gain(state.rec), eg = gain(state.edit), h = gain(HISS_DB) * 3;
    const bw = W / COLS;
    for (let c = 0; c < COLS; c++) {
      const recHi = maxs[c] * rg + h, recLo = mins[c] * rg - h;
      const hit = recHi >= 1 || recLo <= -1;
      let hi = Math.min(1, recHi) * eg, lo = Math.max(-1, recLo) * eg;
      const over = hi > 1 || lo < -1;
      hi = Math.min(hi, 1); lo = Math.max(lo, -1);
      g2.fillStyle = hit || over ? '#ff453a' : (head !== undefined && c / COLS < head ? '#30d158' : '#2fae55');
      g2.fillRect(c * bw, mid - hi * A, Math.max(bw, dpr), Math.max((hi - lo) * A, dpr));
    }
    if (head !== undefined && head >= 0 && head <= 1) {
      g2.fillStyle = '#f5f5f7'; g2.fillRect(head * W, 0, 1.5 * dpr, H);
    }
  }
  new ResizeObserver(() => draw()).observe(canvas);

  /* ---------- readouts ---------- */
  function sync() {
    recIn.value = state.rec; editIn.value = state.edit;
    recOut.textContent = (state.rec > 0 ? '+' : '') + state.rec + ' dB';
    editOut.textContent = (state.edit > 0 ? '+' : '') + state.edit + ' dB';
    const pkRec = recordedPeak(state);
    const outPk = Math.min(0, pkRec + state.edit);
    hold.style.left = ((Math.max(-48, outPk) + 48) / 48 * 100).toFixed(1) + '%';
    if (clipped(state)) {
      tag.dataset.zone = 'clip';
      tag.textContent = L.tagClip.replace('{p}', (clipFraction(state) * 100).toFixed(1));
    } else {
      const shown = Math.round(pkRec);
      tag.dataset.zone = pkRec > -6 ? 'hot' : pkRec >= -12.5 ? 'good' : 'low';
      tag.textContent = L.tagPeak.replace('{d}', shown) + ' ' + (pkRec > -6 ? L.hot : pkRec >= -12.5 ? L.good : L.low);
    }
    if (src) applyGains();
    draw();
  }
  function emit() { const snap = Object.assign({}, state); listeners.forEach((fn) => fn(snap)); }
  function changed() { sync(); emit(); }

  loading.hidden = true;
  playBtn.disabled = false;
  root.classList.add('au-ready');
  sync();

  return {
    get state() { return Object.assign({}, state); },
    set(next) { const played = 'played' in next ? next.played : state.played; state = Object.assign({}, next, { played }); changed(); },
    select() {},
    onChange(fn) { listeners.push(fn); },
  };
}
