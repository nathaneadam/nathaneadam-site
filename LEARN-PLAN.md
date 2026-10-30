# Learn — an interactive video production course for nathaneadam.com

Drafted 30 October 2026. Read it cold: it assumes you remember nothing from the chat.

## Two standing rules — set by Nathan, 30 October 2026

1. **Every mention gets a visual.** If the text names a light, a piece of
   gear, a setting, a number or a setup, there is a picture, drawing or
   diagram right beside it. Text alone is not finished.
2. **Gear gets a "See on Amazon" link** so students can click through. Use
   Amazon SEARCH links (`amazon.com/s?k=softbox+lighting+kit`), not single
   products: they never go dead and don't endorse a brand. Every page says
   so in its credit line. If Nathan sets up Amazon Associates later, add his
   tag to each link AND an affiliate disclosure line on the page.

## Status — 30 October 2026, night: all three pilot lessons built

- `learn/three-point-lighting.html` — now with a picture of the head lit by
  each light alone, gear drawings (softbox, LED panel, window, foam board,
  reflector, Fresnel, LED tube) with Amazon links, three ratio pictures
  (2:1, 4:1, 8:1), drawings in the home kit and an overhead diagram of the
  home setup. The light brightness was turned down (BASE 2.0) so the shadow
  side actually shows; the back light was turned up to match.
- `learn/levels-and-clipping.html` — a real voice through a pretend recorder:
  record level, 0 dBFS ceiling, recorder hiss, then an edit volume. Clipping
  stays red in the waveform when you turn it down, which is the lesson. Voice
  is the LibriVox Gettysburg Address (public domain), credited on the page.
  Two playable "which one can you fix?" clips, meter diagram, clean vs clipped
  close-ups, recorder/interface/camera/lav drawings, mic-distance diagram.
- `learn/aperture.html` — the same head in front of a bookshelf and string
  lights with depth-of-field blur (three.js BokehPass, bundled locally as
  `learn/vendor/three/addons/postprocessing.js`). f/1.4 to f/16, background
  distance, auto exposure with ISO grain. Labelled as a simulation on the page.
  **Accuracy note:** most phones have a FIXED aperture. The lesson teaches
  distance and Portrait mode for phones, A/Av mode for cameras. The plan text
  further down that mentions "the Blackmagic Camera app's aperture control"
  was wrong for iPhones; don't repeat it.
- `learn/index.html` shows all three as cards. `sitemap.xml` has 26 URLs.
- `learn-src/` holds the scripts that drew the gear and built the two new
  pages. Read its README before adding a lesson or a drawing.
- Checked at 1280px and 390px: every step and quiz works, no sideways
  scroll, no layout shift, every image has width/height.

**Next, per the pilot:** stop building. Put all three in front of a 1450
section for two weeks, then decide what to change before lesson four.

## Status — 30 October 2026, evening

**Pilot lesson 1 of 3 is built: three-point lighting.** Not pushed yet.

- `learn/index.html` — the course page. Lives at **nathaneadam.com/learn/**
  (an index file, so the short address works with no Vercel config).
  Six unit cards; only built lessons are linked, the rest say "Lessons coming".
- `learn/three-point-lighting.html` — the lesson. Guess first (two stills),
  then the 3D demo with five guided steps that tick off as you do them, then
  seven famous looks (phone flash, three-point, Rembrandt, split, butterfly,
  campfire, rim only), the rule, the ratio, try-it-at-home, a five-question quiz.
- `tools.html` gained a "Video basics" card under "For my students".
  `sitemap.xml` gained two URLs (24 now).
- **The nav was NOT changed yet.** Rename "Guides" to "Learn" once all three
  pilot lessons exist, not before.

**Three changes from the plan below, on purpose:**

1. **The lesson prose is in the HTML page, not the content file.** Only the
   words for the interactive parts (the guess, the steps, the looks, the quiz,
   the demo's labels) live in `learn/content/<slug>.js`. Prose in HTML means
   Google and no-script readers get it.
2. **Styles are in `learn/learn.css`, not `css/site.css`.** Loaded only on
   learn pages. That keeps it away from the other 23 pages, and keeps the
   Midnight roll-back ("delete from the banner to the end of site.css") from
   deleting it too. Every selector starts `.lx-`, `.lesson-` or `.course-`.
3. **The course page is `learn/index.html`, not `learn.html`.**

**The 3D head** is "Infinite, 3D Head Scan" by Lee Perry-Smith, **CC BY 3.0**,
taken from the three.js examples. Credited at the bottom of the lesson; the
licence is saved as `learn/media/head-LICENSE.txt`. **The credit must stay.**
It's a bald head with closed eyes, so a back light set "Above" washes over the
top of the skull; the back light defaults to eye level for that reason.

**three.js 0.170.0** is copied into `learn/vendor/three/` (MIT, licence
alongside). Loaded with an import map, only on 3D lesson pages. No CDN.

**Local preview needs a web server.** ES modules won't load from `file://`.
In Terminal: `cd` into the site folder, run `python3 -m http.server`, open
`localhost:8000/learn/`. On Vercel it just works.

**Checked** with Playwright at 1280px and 390px (iPhone 13 profile, touch):
every step advances, the quiz scores and saves, the course page shows
"Done", no sideways scroll at either width, every `<img>` has width/height.
**Not checked: a real phone's GPU.** The demo renders only when something
changes, so it should be light, but nobody has dragged a light with a real
thumb yet.

**Next:** lesson 2, levels and clipping (needs one clean 20-second voice
recording from Nathan), then lesson 3, aperture (needs the photo shoot below).

---

## What this is

A free, click-through course on video production basics. Each lesson
teaches one idea with a big visual demo you can touch, asks you to guess
before it shows you, and checks you with a short quiz at the end.

Who it's for: my students first (MDS 1450 and beyond), then anyone who
wants to be a creator. The point is a page I can hand anybody, any
semester, and a reason to send a friend to the site.

## Where the idea came from

**CyberCollege** (`cybercollege.com/tvp_ind.htm`), Ron Whittaker's free
online TV production course. I used it for years. The live site is gone.
The Wayback Machine has it, with good captures up to March 2026:
`web.archive.org/web/2012/http://www.cybercollege.com/tvp_ind.htm`

It had about 80 modules, text and photos, plus tests, crosswords and
word squares. The full module list is at the bottom of this file.

### What we can and can't take from it

- **Its copyright notice says all rights reserved**, and allows use
  only by reading it on CyberCollege's own site. No copying the text,
  no reusing the pictures, no hosting it ourselves.
- **What we can use is the topic list.** Topic titles are facts. It's a
  good checklist of what a beginner needs. Every word and every picture
  in our version gets written and drawn new.
- A credit line on the course page — "this course owes its shape to Ron
  Whittaker's CyberCollege" — with a link to the archived index. Linking
  is allowed, and it's the right thing to do.
- **About a third of it is dead.** Tape formats, linear editing, analog
  standards, satellite links, prompters. Those go. Phone cameras,
  vertical video, social audio levels and AI tools come in.

---

## One lesson, start to finish (the example)

Here is the aperture lesson, so the pattern is concrete:

1. **A picture first.** Two shots of the same person, same spot, same
   phone. One has a soft, blurry background. One has everything sharp.
   "Nothing moved. What changed?"
2. **Guess.** Three buttons: I moved closer / I changed the aperture /
   I zoomed in. No grade yet. Just commit to a guess.
3. **The demo.** A slider from f/1.8 to f/16 on a real series of photos.
   Drag it and the background sharpens. A little drawing of the iris
   closes beside it. The picture also gets darker, which sets up the
   exposure lesson.
4. **The rule, after the example.** Two sentences. Small f-number, big
   opening, blurry background. Big f-number, small opening, more in focus.
5. **Try it with your phone.** A two-minute assignment. Portrait mode, or
   a camera in A/Av mode. On most phones the aperture is fixed, so change
   the distances instead. Shoot both versions.
6. **Check.** Five questions. Every answer explains itself, right or wrong.
7. **Next.** The next lesson, and a link to practise in the Camera
   Simulator.

**The rules every lesson follows:**

- About **20 minutes**. That's the first rung of my ladder (20 min →
  20 hrs → 200 hrs → 2,000 hrs). Try every lesson; if one grabs you,
  that's your 20-hour deep dive. The course page can say so.
- **Example first, rule second.** Always.
- **Phone first.** Every demo works with a thumb, held upright, at 390px.
  Most visitors arrive on a phone. (Same reason the LUFS meter tool was
  killed.)
- **The demo is the star.** Big demo, small text. This is where the
  "visually beautiful" goes.

---

## The course map

Six units, 33 lessons. Each line is the lesson, then its demo.

### Unit 1 — The camera
1. **Exposure.** Three sliders (aperture, shutter, ISO) on a real photo
   series. A histogram and zebras react as you drag.
2. **Aperture and depth of field.** f-stop slider on real photos.
3. **Shutter speed and frame rate.** A spinning fan and a walking person
   drawn in code; change shutter speed and watch the blur. The 180-degree
   shutter rule. 24 vs 60 fps side by side.
4. **ND filters.** A sunny scene. You want f/2 and 1/50. How many stops
   of ND do you need?
5. **White balance and colour temperature.** Kelvin slider on a room lit
   by a window and a lamp. You can't make both look white. Pick one.
6. **Focal length and perspective.** A 3D scene with a dolly-zoom slider.
   A face at 18mm vs 85mm.
7. **Focus.** Pull focus between near, subject and far. Then send them
   to the Camera Simulator to practise all of Unit 1.

### Unit 2 — Framing
8. **Shot sizes.** One wide photo; a slider crops it from extreme wide to
   extreme close-up and names each size.
9. **Headroom, lead room, thirds.** Drag the subject around the frame.
   Guides light up when it's right.
10. **Camera height and angle.** A 3D figure you orbit around.
11. **Camera movement.** Pan, tilt, dolly, truck, handheld — in 3D, with
    the camera's view beside the overhead view.
12. **Vertical video and safe zones.** TikTok/Reels buttons laid over a
    9:16 frame. Drag your title and your face out from under them.

### Unit 3 — Light
13. **Hard and soft light.** A 3D head. One slider changes the size of
    the light. Watch the shadow edge go soft.
14. **Three-point lighting.** The same head. An overhead map you drag the
    key, fill and back light around. The face updates live.
15. **Lighting ratios.** Fill slider with a readout: 2:1, 4:1, 8:1. Sitcom
    to film noir in one drag.
16. **Window light and mixed colour.** Daylight from one side, a warm lamp
    from the other.
17. **Lighting on a budget.** What a $20 work light and a shower curtain do.

### Unit 4 — Sound
Students struggle most here, so this unit gets the best demos.
18. **Why sound matters more than picture.** Same clip twice, good picture
    with bad sound vs bad picture with good sound. A/B toggle.
19. **Microphone types and pickup patterns.** Overhead view. Drag a voice
    around the mic and hear it get louder and quieter. Omni, cardioid,
    shotgun, lav.
20. **Mic distance and the room.** A distance slider. Hear the voice get
    thinner and the room get louder.
21. **Levels and clipping.** A gain knob, a meter, and a voice. Push it
    too far and hear it break. Aim for the green.
22. **Dual-system sound and sync.** Two waveforms. Drag one until the
    clap lines up.
23. **Room tone, music and the mix.** Three faders: voice, music, room.
    Duck the music under the voice.

### Unit 5 — Editing
24. **Continuity and the 180-degree rule.** Overhead view of two people
    talking. Drag the camera across the line and watch the cut flip.
25. **Coverage.** Build a scene from wide, medium, close and cutaway tiles.
26. **J and L cuts.** A mini timeline. Drag the audio edit ahead of the
    picture edit and press play.
27. **Pacing and the Kuleshov effect.** Swap the middle shot. The same
    face reads as hungry, sad or in love.
28. **Colour correction basics.** Fix a bad shot using a waveform and a
    vectorscope.

### Unit 6 — Story and planning
29. **From idea to treatment.**
30. **Shot lists and the two-column script.**
31. **Interviewing for documentary.** On-axis vs off-axis eyeline, and
    what to ask first.
32. **Building a mini-doc.** Ties straight to the 1450 final project.
33. **Where AI fits in production.** Speech enhancement, captions, b-roll,
    music. What it does well and where it lies. My voice, my take.

---

## What the demos are made of

Three kinds. Each needs different work.

| Kind | Used for | Needs |
|---|---|---|
| **Drawn in code** (SVG / canvas) | meters, waveforms, timelines, pickup patterns, safe zones, overhead maps | Nothing. Claude builds it. |
| **3D** (three.js) | lighting head, dolly zoom, angles, movement, 180-degree rule | One free 3D head model with an open licence, credited on the page. |
| **Real photos and recordings** | exposure, aperture, white balance, shot sizes, Kuleshov, all of Unit 4's sound | **A shoot.** See below. |

**Real, not AI, for anything that shows what a camera or mic does.** These
pages teach what equipment actually does. A fake background blur would
show something no lens produces, which is the same kind of mistake as the
old Cost of Valor card image. AI images are fine for story and planning
examples, labelled as AI.

### The shoot (one afternoon)

- **Photos.** One person, one spot, tripod. Shoot the same frame at every
  full f-stop from f/1.8 to f/16 (exposure held with ND or shutter). Again
  at four focal lengths with the face the same size. Again at five white
  balance settings in a window-plus-lamp room. One wide shot at high
  resolution for the shot-size crop.
- **Sound.** One 20-second spoken line, recorded on a lav, a shotgun, a
  phone and a USB mic, at three distances, in a dead room and a live room.
  One clean recording also drives the gain and clipping demo in code.
- **Kuleshov.** One neutral close-up and three cutaways.

---

## How it's built

Same rules as the rest of the site. No framework, no build step, nothing
that phones home.

```
learn/index.html           The course page: units, progress, credit line
learn/
  <slug>.html              One page per lesson
  lesson.js                Shared engine: guesses, quizzes, progress
  content/<slug>.js        Words for the interactive parts. Prose is in the page.
  demos/<name>.js          One file per demo, reusable across lessons
  learn.css                Styles for learn pages only
  vendor/three/            three.js 0.170, loaded only by 3D lessons
  media/                   The shoot's photos and audio
```

- **Copy lives apart from code**, same as `tools/content.js`.
- **Progress is saved in the visitor's own browser.** No accounts, no
  server. If the browser blocks storage, the lesson still works.
- **No email gate, no quiz gate.** Free and open is what gets it shared.
- **Each lesson gets its own URL, its own share card (og:image) and a
  sitemap entry**, so a single lesson can be texted to a friend.
- **Midnight style**: black stage, Inter, the blue action colour.
- **Checked like everything else**: Playwright screenshots at 1280px and
  390px, zero layout shift, no sideways scroll, every demo used by touch.

## Where it sits on the site

- **Nav: rename "Guides" to "Learn."** The nav has only 20px to spare at
  780px, so there's no room to add a link. `learn.html` links to the
  course and to the software guides (`/softwareguides`), so nothing is lost.
  The "For my students" card on `tools.html` moves to `learn.html`.
- **End of each lesson: the next lesson first, then one email line**
  ("Get the next lesson when it's out"). **Not** the AI Career Diagnostic
  callout. A student learning white balance isn't asking about a career
  change. This breaks the "every page ends on the diagnostic" rule on
  purpose. The diagnostic button stays in the nav.

---

## The pilot — build three, then stop and watch

A narrow plan that ships beats 33 lessons that don't.

1. **Three-point lighting (lesson 14).** Build the lesson template here.
   It's the most visual lesson and needs no shoot, so it can start now.
   It's also the one most likely to get shared.
2. **Levels and clipping (lesson 21).** Sound is where students struggle
   most. Needs one clean voice recording, five minutes of work.
3. **Aperture and depth of field (lesson 2).** Needs the photo shoot.
   Do the shoot while 1 and 2 get built.

Then give all three to a 1450 section for two weeks. Ask them three
things in class: what you skipped, what you replayed, what still
confused you. Build the rest of the course from those answers.

---

## Appendix — CyberCollege's module list (titles only)

From the archived index, captured 26 Dec 2012. **Kept** means a lesson
above covers it in modern form. **Dropped** means the technology is gone.

- Production overview, proposals and treatments, holding viewer attention,
  production steps, scripts, scriptwriting, costing a production → **kept** (Unit 6)
- How the TV process works, world standards and HDTV → **folded into** frame rate (lesson 3)
- Lenses, distance and perspective, f-stops and focus, filters, lens
  attachments → **kept** (Unit 1)
- Principles of TV colour, maintaining video quality → **kept** (lessons 5, 28)
- Camera basics, colour balancing, shutter speeds, the viewfinder → **kept** (Unit 1)
- Camera prompters → **dropped**
- Composition, elements of composition I–III → **kept** (Unit 2)
- Graphics and virtual sets → **dropped for now**
- Hard and soft light, colour temperature, intensity, instruments, key,
  fill, back, background, ratios, special situations, altering
  appearance → **kept** (Unit 3)
- Television sound, microphones I–II, wireless, off-camera mics, digital
  audio, audio control, recording and editing → **kept** (Unit 4)
- Stereo to 5.1 → **dropped**
- Video recording media, consumer and pro formats, recorder operations → **dropped**
- Continuity editing, techniques, problems, technical continuity,
  editing guidelines I–II → **kept** (Unit 5)
- Linear/nonlinear, time-code, on-line/off-line editing → **dropped**
- Studio production, switchers, multi-camera remotes → **dropped for now** (a live-streaming unit with OBS could replace it later)
- Single-camera film-style production → **kept** (lesson 25)
- News and documentaries I–III → **kept** (lessons 31, 32)
- Satellite and microwave links → **dropped**
- Legal and ethical issues I–II → **later** (a music-rights and likeness lesson would fit Unit 6)
- Non-broadcast TV, careers I–II, a final word → **dropped** (the site already covers careers)
