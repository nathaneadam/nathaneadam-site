/* ==================================================================
   Lighting stage — a 3D head lit by three spot lights (key, fill, back)
   plus an overhead map you drag the lights around on.

   Used by learn/three-point-lighting.html. Logic only: every word the
   visitor reads comes in through opts.labels from the lesson's content
   file. Renders on demand (only when something changes), so a phone
   isn't burning battery on a still picture.

   Angles are degrees from the camera's line of sight. 0 = right beside
   the camera, +90 = camera right, -90 = camera left, 180 = directly
   behind the subject. Distance (r) is in map units, 35 to 88.
   ================================================================== */
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';

const IDS = ['key', 'fill', 'back'];
const COLORS = { key: '#ffd60a', fill: '#64d2ff', back: '#bf5af2' };
const HEIGHT_DEG = { low: -32, eye: 0, high: 35 };
const R_MIN = 35, R_MAX = 88, R_REF = 70;
const MAP_TO_3D = 0.42;          // one map unit in scene units
const STRENGTH = { key: 1, fill: 1, back: 3 }; // back light grazes, needs more
const BASE = 3.4;                // light reaching the face at R_REF, 100%
const SVGNS = 'http://www.w3.org/2000/svg';

export const START = {
  key:  { on: true,  a: 0,    r: 70, h: 'eye',  b: 100 },
  fill: { on: false, a: -40,  r: 70, h: 'eye',  b: 100 },
  back: { on: false, a: -150, r: 64, h: 'eye',  b: 100 },
};

const clone = (s) => JSON.parse(JSON.stringify(s));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const wrap = (a) => { a = ((a + 180) % 360 + 360) % 360 - 180; return a === -180 ? 180 : a; };

/* Light reaching the face from one light, relative to a 100% light at
   the reference distance. Inverse square, the same rule the renderer
   uses, so the ratio readout matches what you see. */
function reach(l) {
  const d = l.r / Math.cos(HEIGHT_DEG[l.h] * Math.PI / 180);
  return (l.b / 100) * (R_REF / d) ** 2;
}

/* Key-to-fill ratio: (key + fill) on the bright side over fill alone on
   the shadow side. Null when the fill is off. */
export function ratio(s) {
  if (!s.key.on || !s.fill.on || s.fill.b === 0) return null;
  const k = reach(s.key), f = reach(s.fill);
  return (k + f) / f;
}

/* Step checks the lesson engine looks up by id. */
export const checks = {
  'key-side': (s) => s.key.on && Math.abs(s.key.a) >= 25 && Math.abs(s.key.a) <= 65,
  'key-high': (s) => s.key.on && s.key.h === 'high' && Math.abs(s.key.a) >= 20 && Math.abs(s.key.a) <= 70,
  'fill-on':  (s) => s.fill.on && Math.sign(s.fill.a) !== Math.sign(s.key.a) && Math.abs(s.fill.a) <= 75,
  'ratio':    (s) => { const r = ratio(s); return r !== null && r >= 3 && r <= 6.5 && Math.sign(s.fill.a) !== Math.sign(s.key.a); },
  'back-on':  (s) => s.back.on && Math.abs(s.back.a) >= 120,
};

export async function mount(root, opts) {
  const L = opts.labels;
  let state = clone(opts.start || START);
  let selected = 'key';
  const listeners = [];

  /* ---------- DOM ---------- */
  root.classList.add('lx');
  root.innerHTML = `
    <div class="lx-view">
      <canvas class="lx-canvas" aria-label="${L.canvas}"></canvas>
      <div class="lx-loading">${L.loading}</div>
      <div class="lx-ratio" aria-live="polite"></div>
    </div>
    <div class="lx-side">
      <div class="lx-mapwrap">
        <svg class="lx-map" viewBox="-140 -100 280 200" role="group" aria-label="${L.map}"></svg>
        <div class="lx-hint">${L.hint}</div>
      </div>
      <div class="lx-pick" role="tablist" aria-label="${L.pick}"></div>
      <div class="lx-panel">
        <div class="lx-row">
          <label class="lx-switch"><input type="checkbox"><span class="lx-track"></span><span class="lx-on-lab"></span></label>
          <div class="lx-where"></div>
        </div>
        <label class="lx-row lx-bright"><span>${L.brightness}</span><input type="range" min="0" max="100" step="5"><output></output></label>
        <div class="lx-row lx-height"><span>${L.height}</span><div class="lx-seg" role="radiogroup" aria-label="${L.height}"></div></div>
      </div>
    </div>`;

  const view = root.querySelector('.lx-view');
  const canvas = root.querySelector('.lx-canvas');
  const loading = root.querySelector('.lx-loading');
  const ratioEl = root.querySelector('.lx-ratio');
  const svg = root.querySelector('.lx-map');
  const pick = root.querySelector('.lx-pick');
  const sw = root.querySelector('.lx-switch input');
  const onLab = root.querySelector('.lx-on-lab');
  const whereEl = root.querySelector('.lx-where');
  const bright = root.querySelector('.lx-bright input');
  const brightOut = root.querySelector('.lx-bright output');
  const seg = root.querySelector('.lx-seg');

  IDS.forEach((id) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'lx-chip'; b.dataset.id = id;
    b.setAttribute('role', 'tab');
    b.innerHTML = `<i style="--c:${COLORS[id]}"></i>${L.names[id]}`;
    b.addEventListener('click', () => { selected = id; sync(); });
    pick.appendChild(b);
  });
  ['low', 'eye', 'high'].forEach((h) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.h = h; b.textContent = L.heights[h];
    b.setAttribute('role', 'radio');
    b.addEventListener('click', () => { state[selected].h = h; changed(); });
    seg.appendChild(b);
  });
  sw.addEventListener('change', () => { state[selected].on = sw.checked; changed(); });
  bright.addEventListener('input', () => { state[selected].b = +bright.value; changed(); });

  /* ---------- overhead map ---------- */
  const el = (name, attrs, parent) => {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const bg = el('rect', { x: -140, y: -100, width: 280, height: 200, fill: 'transparent', class: 'lx-bg' }, svg);
  [40, 64, 88].forEach((r) => el('circle', { r, class: 'lx-ring' }, svg));
  el('line', { x1: 0, y1: 12, x2: 0, y2: 86, class: 'lx-axis' }, svg);
  const backdrop = el('line', { x1: -60, y1: -96, x2: 60, y2: -96, class: 'lx-backdrop' }, svg);
  const bdl = el('text', { x: 0, y: -88, class: 'lx-small', 'text-anchor': 'middle' }, svg); bdl.textContent = L.backdrop;
  void backdrop;
  const beams = el('g', {}, svg);
  // subject: a head seen from above, nose pointing at the camera
  el('ellipse', { cx: 0, cy: 0, rx: 10, ry: 12, class: 'lx-head' }, svg);
  el('path', { d: 'M-3 11 L0 16 L3 11 Z', class: 'lx-head' }, svg);
  // camera
  const cam = el('g', { transform: 'translate(0 93)' }, svg);
  el('rect', { x: -9, y: -3, width: 18, height: 10, rx: 2, class: 'lx-cam' }, cam);
  el('path', { d: 'M-5 -3 L-7 -8 L7 -8 L5 -3 Z', class: 'lx-cam' }, cam);
  const cl = el('text', { x: 15, y: 5, class: 'lx-small' }, cam); cl.textContent = L.camera;

  const nodes = {};
  IDS.forEach((id) => {
    const beam = el('path', { class: 'lx-beam', fill: COLORS[id] }, beams);
    const g = el('g', { class: 'lx-light', tabindex: 0, role: 'slider', 'data-id': id }, svg);
    el('circle', { r: 20, class: 'lx-hit' }, g);
    el('circle', { r: 14.5, class: 'lx-sel' }, g);
    const dot = el('circle', { r: 10, class: 'lx-dot', style: `--c:${COLORS[id]}` }, g);
    const t = el('text', { y: 3.6, 'text-anchor': 'middle', class: 'lx-letter' }, g); t.textContent = L.names[id][0];
    const h = el('text', { y: 23, 'text-anchor': 'middle', class: 'lx-small lx-hlab' }, g);
    nodes[id] = { g, dot, beam, h };

    g.addEventListener('pointerdown', (e) => { e.stopPropagation(); selected = id; startDrag(e); });
    g.addEventListener('focus', () => { if (selected !== id) { selected = id; sync(); } });
    g.addEventListener('keydown', (e) => {
      const l = state[id];
      const step = e.shiftKey ? 15 : 5;
      if (e.key === 'ArrowLeft') l.a = wrap(l.a - step);
      else if (e.key === 'ArrowRight') l.a = wrap(l.a + step);
      else if (e.key === 'ArrowUp') l.r = clamp(l.r - 4, R_MIN, R_MAX);
      else if (e.key === 'ArrowDown') l.r = clamp(l.r + 4, R_MIN, R_MAX);
      else if (e.key === ' ' || e.key === 'Enter') l.on = !l.on;
      else return;
      e.preventDefault(); changed();
    });
  });

  // Tapping empty floor moves the selected light there — easier than
  // hitting a small dot with a thumb.
  bg.addEventListener('pointerdown', (e) => { startDrag(e); });

  let dragId = null;
  function toMap(e) {
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function moveTo(e) {
    const p = toMap(e);
    const l = state[dragId];
    l.r = clamp(Math.hypot(p.x, p.y), R_MIN, R_MAX);
    l.a = Math.round(Math.atan2(p.x, p.y) * 180 / Math.PI);
    changed();
  }
  function startDrag(e) {
    dragId = selected;
    try { svg.setPointerCapture(e.pointerId); } catch (err) { /* synthetic or already-ended pointer */ }
    root.classList.add('lx-dragging');
    moveTo(e);
  }
  svg.addEventListener('pointermove', (e) => { if (dragId) moveTo(e); });
  const end = () => { dragId = null; root.classList.remove('lx-dragging'); };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);

  function where(l) {
    const a = Math.abs(l.a);
    if (a <= 4) return L.where.atCamera;
    const side = l.a > 0 ? L.where.right : L.where.left;
    return L.where.fmt.replace('{deg}', a).replace('{side}', side) + (a > 100 ? L.where.behind : '');
  }

  /* ---------- 3D ---------- */
  let renderer, scene, camera, lights = {}, needs = false, ready = false;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
  } catch (err) {
    root.classList.add('lx-nogl');
    loading.textContent = L.noWebGL;
    renderer = null;
  }

  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    camera = new THREE.PerspectiveCamera(11.5, 4 / 3, 1, 400);
    camera.position.set(0, 1.6, 46);
    camera.lookAt(0, 1.1, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 0.02));

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(260, 160),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 1 })
    );
    wall.position.z = -22; wall.receiveShadow = true;
    scene.add(wall);

    IDS.forEach((id) => {
      const s = new THREE.SpotLight(0xffffff, 0, 0, Math.PI / 8, 0.65, 2);
      s.castShadow = true;
      s.shadow.mapSize.set(1024, 1024);
      s.shadow.bias = -0.0004;
      s.shadow.normalBias = 0.03;
      s.shadow.camera.near = 4; s.shadow.camera.far = 120;
      s.target.position.set(0, 1.4, 0);
      scene.add(s); scene.add(s.target);
      lights[id] = s;
    });

    const tex = new THREE.TextureLoader();
    const base = opts.media;
    const map = tex.load(base + 'head-color.jpg', request);
    map.colorSpace = THREE.SRGBColorSpace;
    const nrm = tex.load(base + 'head-normal.jpg', request);
    new GLTFLoader().load(base + 'head.glb', (gltf) => {
      const mesh = gltf.scene.children[0];
      mesh.material = new THREE.MeshStandardMaterial({
        map, normalMap: nrm, normalScale: new THREE.Vector2(0.8, -0.8), roughness: 0.58, metalness: 0,
      });
      mesh.castShadow = true; mesh.receiveShadow = true;
      const box = new THREE.Box3().setFromObject(mesh);
      const c = box.getCenter(new THREE.Vector3());
      mesh.position.sub(c);
      scene.add(mesh);
      ready = true;
      loading.hidden = true;
      root.classList.add('lx-ready');
      request();
      if (opts.onReady) opts.onReady();
    }, undefined, () => { loading.textContent = L.noWebGL; });

    const ro = new ResizeObserver(() => {
      const w = view.clientWidth, h = view.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      request();
    });
    ro.observe(view);
  }

  function request() {
    if (!renderer || needs) return;
    needs = true;
    requestAnimationFrame(() => { needs = false; renderer.render(scene, camera); });
  }

  function place3D() {
    if (!renderer) return;
    IDS.forEach((id) => {
      const l = state[id], s = lights[id];
      const d = l.r * MAP_TO_3D;
      const rad = l.a * Math.PI / 180;
      const el = HEIGHT_DEG[l.h] * Math.PI / 180;
      s.position.set(d * Math.sin(rad), 1.4 + d * Math.tan(el), d * Math.cos(rad));
      const dist = s.position.distanceTo(s.target.position);
      const dRef = R_REF * MAP_TO_3D;
      // intensity so the face receives BASE at R_REF/100%, falling off by inverse square
      s.intensity = l.on ? (l.b / 100) * BASE * STRENGTH[id] * dRef * dRef : 0;
      s.visible = l.on && l.b > 0;
      void dist;
    });
    request();
  }

  /* ---------- sync UI ---------- */
  function sync() {
    IDS.forEach((id) => {
      const l = state[id], n = nodes[id];
      const rad = l.a * Math.PI / 180;
      const x = l.r * Math.sin(rad), y = l.r * Math.cos(rad);
      n.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      n.g.classList.toggle('is-off', !l.on);
      n.g.classList.toggle('is-selected', id === selected);
      n.g.setAttribute('aria-label', `${L.names[id]}: ${l.on ? where(l) : L.off}`);
      n.g.setAttribute('aria-valuenow', l.a);
      n.h.textContent = l.h === 'eye' ? '' : (l.h === 'high' ? '▲' : '▼');
      // beam: a soft wedge from the light toward the head
      const len = Math.hypot(x, y), ux = -x / len, uy = -y / len;
      const px = -uy, py = ux, spread = 9;
      const ex = ux * (len - 13), ey = uy * (len - 13);
      n.beam.setAttribute('d', `M${x.toFixed(1)} ${y.toFixed(1)} L${(x + ex + px * spread).toFixed(1)} ${(y + ey + py * spread).toFixed(1)} L${(x + ex - px * spread).toFixed(1)} ${(y + ey - py * spread).toFixed(1)} Z`);
      n.beam.style.opacity = l.on ? (0.08 + 0.22 * l.b / 100).toFixed(2) : 0;
    });
    pick.querySelectorAll('.lx-chip').forEach((b) => {
      const id = b.dataset.id;
      b.setAttribute('aria-selected', id === selected);
      b.classList.toggle('is-off', !state[id].on);
    });
    const l = state[selected];
    root.style.setProperty('--sel', COLORS[selected]);
    sw.checked = l.on;
    onLab.textContent = `${L.names[selected]} ${l.on ? L.onWord : L.offWord}`;
    whereEl.textContent = where(l);
    bright.value = l.b; brightOut.textContent = l.b + '%';
    bright.disabled = !l.on;
    seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', b.dataset.h === l.h));

    const r = ratio(state);
    if (!state.key.on) ratioEl.textContent = L.ratioNoKey;
    else if (r === null) ratioEl.textContent = L.ratioNoFill;
    else ratioEl.innerHTML = L.ratioFmt.replace('{r}', r < 10 ? (Math.round(r * 2) / 2).toString() : Math.round(r));
    place3D();
  }

  function changed() {
    sync();
    const snap = clone(state);
    listeners.forEach((fn) => fn(snap));
  }

  sync();

  return {
    get state() { return clone(state); },
    set(next, sel) { state = clone(next); if (sel) selected = sel; changed(); },
    select(id) { selected = id; sync(); },
    onChange(fn) { listeners.push(fn); },
    get ready() { return ready; },
  };
}
