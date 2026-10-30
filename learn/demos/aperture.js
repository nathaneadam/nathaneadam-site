/* ==================================================================
   Aperture demo — the same 3D head, a shelf and string lights behind
   him, and depth-of-field blur from three.js's BokehPass.

   Two things change with the f-stop, as they do on a real camera:
     1. How blurry the background is.
     2. How bright the picture is (each full stop halves or doubles the
        light). With "auto exposure" on, the camera raises or lowers ISO
        to keep the brightness, and high ISO adds grain.

   The blur amount follows the thin-lens rule of thumb: it grows with a
   wider aperture (smaller f-number) and with how far the background is
   behind the subject, and it levels off as the background goes far away.
   It's a simulation, said so on the page, not a photograph.

   Logic only. Every word comes in through opts.labels.
   ================================================================== */
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/three/addons/loaders/GLTFLoader.js';
import { EffectComposer, RenderPass, BokehPass, OutputPass } from '../vendor/three/addons/postprocessing.js';

export const STOPS = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16];
const BG = { near: 12, mid: 35, far: 90 };   // scene units behind the face (1 unit is about 3 cm)
const CAM_Z = 46, FOCUS = 44, BLUR_K = 0.2, REF_N = 2.8, BASE_ISO = 400;

export const START = { i: 2, bg: 'mid', auto: false };
export const checks = {
  'open':  (s) => s.i <= 1,
  'close': (s) => s.i >= 7,
  'auto':  (s) => s.auto && s.i >= 6,
  'far':   (s) => s.bg === 'far' && s.i <= 2,
};

const stopsOff = (n) => 2 * Math.log2(REF_N / n);        // + is brighter than the reference
export function iso(s) {
  if (!s.auto) return BASE_ISO;
  const raw = BASE_ISO * Math.pow(STOPS[s.i] / REF_N, 2);
  const nice = [100, 200, 400, 800, 1600, 3200, 6400, 12800];
  return nice.reduce((a, b) => (Math.abs(Math.log(b / raw)) < Math.abs(Math.log(a / raw)) ? b : a));
}

export async function mount(root, opts) {
  const L = opts.labels;
  let state = Object.assign({}, opts.start || START);
  const listeners = [];

  root.classList.add('lx', 'ap');
  root.innerHTML = `
    <div class="lx-view">
      <canvas class="lx-canvas" aria-label="${L.canvas}"></canvas>
      <div class="ap-grain"></div>
      <div class="lx-loading">${L.loading}</div>
      <div class="lx-ratio ap-read" aria-live="polite"></div>
    </div>
    <div class="lx-side">
      <div class="lx-panel ap-panel">
        <div class="ap-top">
          <svg class="ap-iris" viewBox="-50 -50 100 100" aria-hidden="true">
            <circle r="46" class="ap-ring"/><circle r="40" class="ap-blades"/><polygon class="ap-hole"/>
          </svg>
          <div><div class="ap-f"></div><div class="ap-fsub"></div></div>
        </div>
        <label class="ap-slider"><span>${L.aperture}</span>
          <input type="range" min="0" max="${STOPS.length - 1}" step="1" aria-label="${L.aperture}">
          <div class="ap-ticks">${STOPS.map((n) => `<span>${n}</span>`).join('')}</div>
        </label>
        <div class="lx-row lx-height"><span>${L.bg}</span><div class="lx-seg ap-bg" role="radiogroup" aria-label="${L.bg}">
          ${['near', 'mid', 'far'].map((k) => `<button type="button" role="radio" data-bg="${k}">${L.bgNames[k]}</button>`).join('')}
        </div></div>
        <div class="lx-row">
          <label class="lx-switch"><input type="checkbox" class="ap-auto"><span class="lx-track"></span><span>${L.auto}</span></label>
          <div class="lx-where ap-iso"></div>
        </div>
      </div>
      <p class="au-note">${L.note}</p>
    </div>`;

  const view = root.querySelector('.lx-view');
  const canvas = root.querySelector('.lx-canvas');
  const loading = root.querySelector('.lx-loading');
  const read = root.querySelector('.ap-read');
  const grain = root.querySelector('.ap-grain');
  const hole = root.querySelector('.ap-hole');
  const fEl = root.querySelector('.ap-f'), fSub = root.querySelector('.ap-fsub');
  const slider = root.querySelector('.ap-slider input');
  const autoSw = root.querySelector('.ap-auto');
  const isoEl = root.querySelector('.ap-iso');
  root.style.setProperty('--sel', '#ffd60a');

  slider.addEventListener('input', () => { state.i = +slider.value; changed(); });
  autoSw.addEventListener('change', () => { state.auto = autoSw.checked; changed(); });
  root.querySelectorAll('.ap-bg button').forEach((b) => b.addEventListener('click', () => { state.bg = b.dataset.bg; changed(); }));

  // grain texture, made once
  { const c = document.createElement('canvas'); c.width = c.height = 160; const g = c.getContext('2d');
    const im = g.createImageData(160, 160);
    for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0); grain.style.backgroundImage = `url(${c.toDataURL()})`; }

  /* ---------- 3D ---------- */
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' }); }
  catch (e) { root.classList.add('lx-nogl'); loading.textContent = L.noWebGL; throw e; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0908);
  const camera = new THREE.PerspectiveCamera(13, 4 / 3, 1, 600);
  camera.position.set(0, 1.4, CAM_Z); camera.lookAt(0, 0.9, 0);

  // light on the face: key, fill, rim (no shadows, to keep phones happy)
  const key = new THREE.DirectionalLight(0xfff1e0, 3); key.position.set(30, 20, 30); scene.add(key);
  const fill = new THREE.DirectionalLight(0xdfe9ff, 0.55); fill.position.set(-30, 4, 25); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 1.6); rim.position.set(-20, 18, -30); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x221a14, 0.25));

  // the background: wall, a shelf of boxes, books, a string of lights
  const bg = new THREE.Group(); scene.add(bg);
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.MeshStandardMaterial({ color: 0x3a2f27, roughness: 1 }));
  wall.position.z = -3; bg.add(wall);
  const bgLight = new THREE.PointLight(0xffd7a0, 9, 0, 1.2); bgLight.position.set(0, 10, 8); bg.add(bgLight);
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const palette = [0x6e4630, 0x334a58, 0x9c8152, 0x55613f, 0x7f3a30, 0xa8a196, 0x252e38];
  for (let row = 0; row < 3; row++) {
    const y = -9 + row * 7.5;
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(56, 0.6, 4), new THREE.MeshStandardMaterial({ color: 0x3b2c22, roughness: .9 }));
    shelf.position.set(0, y - 0.3, 0); bg.add(shelf);
    for (let x = -26; x < 26;) {
      const w = 0.8 + rnd() * 1.6, h = 3 + rnd() * 3.2;
      const book = new THREE.Mesh(new THREE.BoxGeometry(w, h, 3), new THREE.MeshStandardMaterial({ color: palette[Math.floor(rnd() * palette.length)], roughness: .8 }));
      book.position.set(x + w / 2, y + h / 2, 0); bg.add(book);
      x += w + (rnd() < .12 ? 3 + rnd() * 4 : 0.1);
    }
  }
  const bulbMat = new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(6, 3.6, 1.4) });
  for (let k = 0; k <= 26; k++) {
    const t = k / 26, x = -30 + t * 60, y = 8.2 - 3 * Math.sin(Math.PI * t) + Math.sin(t * 9) * .3;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), bulbMat); b.position.set(x, y, 2.5); bg.add(b);
  }

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bokeh = new BokehPass(scene, camera, { focus: FOCUS, aperture: 0.001, maxblur: 0.07 });
  composer.addPass(bokeh);
  composer.addPass(new OutputPass());

  let ready = false, needs = false;
  const tex = new THREE.TextureLoader();
  const map = tex.load(opts.media + 'head-color.jpg', request); map.colorSpace = THREE.SRGBColorSpace;
  const nrm = tex.load(opts.media + 'head-normal.jpg', request);
  new GLTFLoader().load(opts.media + 'head.glb', (gltf) => {
    const mesh = gltf.scene.children[0];
    mesh.material = new THREE.MeshStandardMaterial({ map, normalMap: nrm, normalScale: new THREE.Vector2(0.8, -0.8), roughness: 0.58 });
    const c = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
    mesh.position.sub(c); scene.add(mesh);
    ready = true; loading.hidden = true; root.classList.add('lx-ready'); sync();
  }, undefined, () => { loading.textContent = L.noWebGL; });

  new ResizeObserver(() => {
    const w = view.clientWidth, h = view.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); composer.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix(); request();
  }).observe(view);

  function request() {
    if (needs) return; needs = true;
    requestAnimationFrame(() => { needs = false; composer.render(); });
  }

  /* ---------- sync ---------- */
  function sync() {
    const N = STOPS[state.i], d = BG[state.bg];
    // background placement, scaled so it fills the frame the same at any distance
    bg.position.z = -d;
    const s = (CAM_Z + d) / (CAM_Z + BG.mid); bg.scale.setScalar(s);
    // blur: thin-lens rule of thumb, turned into BokehPass's per-unit factor
    const blur = BLUR_K / N * (d / (CAM_Z + d));
    bokeh.uniforms.aperture.value = blur / (CAM_Z + d - FOCUS);
    // brightness
    const off = stopsOff(N);
    renderer.toneMappingExposure = state.auto ? 1 : Math.pow(2, off);
    const isoV = iso(state);
    grain.style.opacity = state.auto ? Math.max(0, Math.min(.2, (Math.log2(isoV / 1600)) * .06)).toFixed(2) : 0;

    // UI
    slider.value = state.i;
    fEl.textContent = 'f/' + N;
    fSub.textContent = N <= 2 ? L.wide : N >= 11 ? L.narrow : L.middle;
    const r = 38 * Math.sqrt(1.4 / N) * 0.95 + 2;
    hole.setAttribute('points', Array.from({ length: 8 }, (_, k) => { const a = k / 8 * Math.PI * 2 + .2; return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`; }).join(' '));
    root.querySelectorAll('.ap-bg button').forEach((b) => b.setAttribute('aria-checked', b.dataset.bg === state.bg));
    autoSw.checked = state.auto;
    isoEl.textContent = 'ISO ' + isoV.toLocaleString();
    if (state.auto) read.innerHTML = L.readAuto.replace('{iso}', isoV.toLocaleString());
    else if (Math.abs(off) < 0.5) read.innerHTML = L.readOk;
    else read.innerHTML = (off > 0 ? L.readBright : L.readDark).replace('{n}', Math.abs(Math.round(off)));
    request();
  }
  function changed() { sync(); const snap = Object.assign({}, state); listeners.forEach((fn) => fn(snap)); }
  sync();

  return {
    get state() { return Object.assign({}, state); },
    set(next) { state = Object.assign({}, next); changed(); },
    select() {},
    onChange(fn) { listeners.push(fn); },
    get ready() { return ready; },
  };
}
