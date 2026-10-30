# learn-src — how the Learn pages and drawings are made

Nothing on the site links here (Vercel will still serve them as plain files,
which is harmless). These are the scripts
that produced files in `learn/`. Run them with python3 from the site folder.

- `gear.py`, `gear2.py` — draw every gear illustration in `learn/media/gear/`
  (softbox, LED panel, window, foam board, reflector, Fresnel, LED tube, bare
  bulb, recorder, interface, lav, shotgun, phone, lens, camera, iris, meter,
  mic distance, home setup). One style for all of them. To add a drawing, add
  it here and rerun `python3 learn-src/gear2.py` (it runs gear.py first).
- `mkpage.py <slug>` — builds `learn/<slug>.html` from `pages/<slug>.py`,
  borrowing the head, nav and footer from `learn/three-point-lighting.html`.
  `three-point-lighting.html` itself was written by hand and is the template.
- `pages/common.py` — the `gear()` helper: a drawing, a caption, a short note
  and an Amazon SEARCH link.

The 3D stills (role-*.jpg, ratio-*.jpg, ap-*.jpg, tpl-*.jpg) were rendered from
the demos with Playwright by calling `window.lessonDemo.set(state)` and
screenshotting the stage. The audio clips come from the LibriVox Gettysburg
Address (public domain): seconds 35.9 to 49.5, high-passed, denoised,
normalised to -1 dBFS.
