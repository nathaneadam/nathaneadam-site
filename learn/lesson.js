/* ==================================================================
   lesson.js — the shared engine for every lesson in learn/.

   Reads window.LESSON (set by learn/content/<slug>.js) and wires up:
     #lesson-hook    the "guess first" question
     #lesson-demo    the demo, loaded from LESSON.demo
     #lesson-steps   guided steps, checked against the demo's state
     #lesson-quiz    the end-of-lesson quiz
   Any of those can be missing; the engine skips what isn't there.

   Progress lives in the visitor's own browser only (localStorage),
   wrapped so a blocked or private browser still gets a working lesson.
   No words in this file. They all come from the content file.
   ================================================================== */
const C = window.LESSON;
const $ = (s, r = document) => r.querySelector(s);
const STORE = 'nea-learn-v1';

const progress = {
  read() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } },
  save(patch) {
    try {
      const all = this.read();
      all[C.slug] = Object.assign({}, all[C.slug], patch);
      localStorage.setItem(STORE, JSON.stringify(all));
    } catch (e) { /* storage blocked: the lesson still works */ }
  },
  get() { return this.read()[C.slug] || {}; },
};

/* One multiple-choice card. Used by the hook and by every quiz question. */
function choice(host, q, onAnswer) {
  const opts = host.querySelector('.lesson-opts');
  const out = host.querySelector('.lesson-reveal');
  q.options.forEach((text, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.innerHTML = text;
    b.addEventListener('click', () => {
      const right = i === q.answer;
      [...opts.children].forEach((x, j) => {
        x.disabled = true;
        if (j === q.answer) x.classList.add('is-right');
        else if (j === i) x.classList.add('is-wrong');
        else x.classList.add('is-dim');
      });
      onAnswer(right, out);
    });
    opts.appendChild(b);
  });
}

/* ---------- hook ---------- */
const hook = $('#lesson-hook');
if (hook && C.hook) {
  hook.querySelector('h3').innerHTML = C.hook.question;
  choice(hook, C.hook, (right, out) => {
    out.innerHTML = (right ? C.hook.right : C.hook.wrong) + ' ' + C.hook.reveal;
    out.hidden = false;
  });
}

/* ---------- quiz ---------- */
const quiz = $('#lesson-quiz');
function buildQuiz() {
  const Q = C.quiz, t = Q.questions.length;
  let answered = 0, correct = 0;
  quiz.innerHTML = '';
  const score = $('#lesson-score');
  score.hidden = true;
  Q.questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'lesson-q';
    card.innerHTML = `<div class="n">${i + 1} / ${t}</div><h3>${q.q}</h3><div class="lesson-opts"></div><p class="lesson-reveal" hidden></p>`;
    quiz.appendChild(card);
    choice(card, q, (right, out) => {
      answered++; if (right) correct++;
      out.innerHTML = `<b>${right ? Q.right : Q.wrong}</b> ${q.explain}`;
      out.hidden = false;
      if (answered === t) {
        score.querySelector('h3').textContent = Q.score.replace('{n}', correct).replace('{t}', t);
        score.querySelector('p').innerHTML = correct === t ? Q.perfect : Q.good;
        score.hidden = false;
        const best = Math.max(progress.get().quizBest || 0, correct);
        progress.save({ quizBest: best, quizOf: t, done: true });
      }
    });
  });
}
if (quiz && C.quiz) {
  buildQuiz();
  $('#lesson-score button').textContent = C.quiz.retry;
  $('#lesson-score button').addEventListener('click', () => {
    buildQuiz();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---------- demo + guided steps ---------- */
const stage = $('#lesson-demo');
if (stage && C.demo) {
  import(C.demo).then(async (mod) => {
    const demo = await mod.mount(stage, { labels: C.labels, media: C.media, start: mod.START });
    window.lessonDemo = demo; // handy from the console, and how the preview stills are made
    const stepsHost = $('#lesson-steps');
    if (!stepsHost || !C.steps) return;

    const S = C.steps;
    stepsHost.innerHTML = `
      <div class="lesson-steps-top"><h3>${S.heading}</h3><button type="button" class="lesson-link">${S.reset}</button></div>
      <ol>${S.list.map((s) => `<li><div class="t">${s.title}</div><div class="b">${s.body}</div><div class="d">${s.done}</div></li>`).join('')}</ol>
      <div class="lesson-done" hidden>${S.finished}</div>
      <div class="lesson-looks" hidden></div>
      <div class="lesson-lookdesc" hidden aria-live="polite"></div>`;
    const items = [...stepsHost.querySelectorAll('li')];
    const doneEl = $('.lesson-done', stepsHost);
    const looksEl = $('.lesson-looks', stepsHost);
    const descEl = $('.lesson-lookdesc', stepsHost);
    let at = 0;

    function paint() {
      items.forEach((li, i) => {
        li.classList.toggle('is-done', i < at);
        li.classList.toggle('is-now', i === at);
      });
      const finished = at >= S.list.length;
      doneEl.hidden = !finished; looksEl.hidden = !finished; descEl.hidden = !finished;
    }
    function enter(i) {
      at = i; paint();
      const s = S.list[at];
      if (s && s.select) demo.select(s.select);
    }

    // Each step must be done in order, and a step only counts once the
    // demo's state passes its check.
    demo.onChange((state) => {
      let moved = false;
      while (at < S.list.length && mod.checks[S.list[at].id] && mod.checks[S.list[at].id](state)) { at++; moved = true; }
      if (moved) {
        if (at >= S.list.length) progress.save({ built: true });
        enter(at);
      }
    });

    (C.looks || []).forEach((look) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = look.name; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        looksEl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        descEl.innerHTML = look.desc;
        demo.set(look.state, 'key');
      });
      looksEl.appendChild(b);
    });

    $('.lesson-link', stepsHost).addEventListener('click', () => {
      looksEl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
      descEl.innerHTML = '';
      at = 0;
      demo.set(mod.START, 'key');
      enter(0);
    });

    // Someone who already built it on a past visit gets the looks straight away.
    if (progress.get().built) { at = S.list.length; paint(); }
    else enter(0);
  }).catch(() => {
    stage.classList.add('lx-nogl');
    stage.innerHTML = `<p class="lesson-reveal">${C.labels.noWebGL}</p>`;
  });
}
