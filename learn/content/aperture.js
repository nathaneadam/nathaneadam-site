/* ==================================================================
   Aperture and depth of field — the words for the interactive parts.
   Prose is in learn/aperture.html. Logic is in learn/lesson.js and
   learn/demos/aperture.js.
   ================================================================== */
window.LESSON = {
  slug: 'aperture',
  demo: './demos/aperture.js',
  media: 'media/',

  hook: {
    question: 'Same camera, same lens, same spot. What changed between picture A and picture B?',
    options: ['B was zoomed in', 'B used a different aperture', 'B was blurred in the edit', 'The person moved'],
    answer: 1,
    right: '<b>Yep.</b> Only the aperture changed.',
    wrong: '<b>Good guess, but no.</b> Nothing moved and nobody touched it in the edit.',
    reveal: 'Picture A was shot at f/1.4, a wide-open lens. Picture B was shot at f/16, a tiny opening. A wide opening blurs the background. A tiny one keeps it sharp. That&rsquo;s depth of field.',
  },

  labels: {
    canvas: 'A 3D head in front of a bookshelf, seen through a simulated lens',
    loading: 'Loading the scene&hellip;',
    noWebGL: 'This demo needs a browser with 3D graphics (WebGL) switched on. The pictures on this page show the same idea.',
    aperture: 'Aperture (f-stop)',
    bg: 'Background',
    bgNames: { near: 'Close', mid: 'Middle', far: 'Far' },
    auto: 'Auto exposure',
    wide: 'Wide open: lots of light',
    middle: 'Halfway',
    narrow: 'Tiny opening: little light',
    readOk: 'Exposure: just right',
    readBright: 'Exposure: <b>{n} stops too bright</b>',
    readDark: 'Exposure: <b>{n} stops too dark</b>',
    readAuto: 'Auto exposure: camera set <b>ISO {iso}</b>',
    note: 'A simulation of a lens on a camera, not a photograph. The blur follows the same rules a real lens does.',
  },

  steps: {
    heading: 'Four moves',
    reset: 'Start over',
    list: [
      {
        id: 'open',
        title: 'Open the aperture all the way',
        body: 'Drag the <b>Aperture</b> slider to <b>f/1.4 or f/2</b>. Small number, big opening. Watch the bookshelf and the string lights behind him.',
        done: 'The background melts and the lights turn into soft circles. Notice the picture got brighter too. A bigger opening lets in more light.',
      },
      {
        id: 'close',
        title: 'Now close it down to f/16',
        body: 'Drag the slider all the way to <b>f/16</b>. Big number, tiny opening.',
        done: 'Everything is sharp now, front to back. And it&rsquo;s dark. A tiny opening lets in very little light.',
      },
      {
        id: 'auto',
        title: 'Let the camera fix the brightness',
        body: 'Stay at f/11 or f/16 and switch on <b>Auto exposure</b>. That&rsquo;s what your phone does without asking.',
        done: 'Bright again. To get there the camera cranked the ISO way up. Look closely: the picture is grainy now. Every fix costs something.',
      },
      {
        id: 'far',
        title: 'Move the background back',
        body: 'Set the aperture to <b>f/2.8</b>. Now switch the <b>Background</b> from Close to Middle to Far and watch the shelf.',
        done: 'Same f-stop, much blurrier background. How far the background is behind the person matters as much as the f-number. That&rsquo;s the trick phone shooters use.',
      },
    ],
    finished: '<b>That&rsquo;s depth of field.</b> Wide aperture and a far-away background for that blurry look. Small aperture when you need everything sharp. Try the presets below.',
  },

  looks: [
    { name: 'Portrait', desc: 'f/1.4 with the background far away. The classic blurry-background interview or headshot.', state: { i: 0, bg: 'far', auto: true } },
    { name: 'Interview', desc: 'f/2.8 with the shelf a little way back. The face is sharp, the room is still readable but soft.', state: { i: 2, bg: 'mid', auto: true } },
    { name: 'Everything sharp', desc: 'f/11. Product shots, group shots, landscapes. Anything where the background is part of the story.', state: { i: 6, bg: 'mid', auto: true } },
    { name: 'Too close to the wall', desc: 'f/1.4 but the background is close behind him. Even wide open, there&rsquo;s not much blur. Move people away from walls.', state: { i: 0, bg: 'near', auto: true } },
  ],

  quiz: {
    heading: 'Check yourself',
    questions: [
      {
        q: 'Which of these f-stops lets in the most light?',
        options: ['f/1.8', 'f/5.6', 'f/11', 'f/22'],
        answer: 0,
        explain: 'The smallest number is the biggest opening. f/1.8 lets in far more light than f/22.',
      },
      {
        q: 'You want the background behind your interview subject to be soft and blurry. Which do you pick?',
        options: ['f/2', 'f/8', 'f/16', 'It doesn&rsquo;t matter'],
        answer: 0,
        explain: 'A wide aperture like f/2 gives a shallow depth of field: the face sharp, the background soft.',
      },
      {
        q: 'You go from f/2.8 to f/4. What happens to the light coming through the lens?',
        options: ['It doubles', 'It gets cut in half', 'It stays the same', 'It goes up a little'],
        answer: 1,
        explain: 'f/2.8 to f/4 is one full stop. Each full stop toward bigger numbers cuts the light in half.',
      },
      {
        q: 'You&rsquo;re shooting a group of people standing at different distances. You want all of them sharp. Which do you pick?',
        options: ['f/1.4', 'f/2', 'f/8 to f/11', 'The widest your lens goes'],
        answer: 2,
        explain: 'A smaller aperture like f/8 or f/11 gives a deep depth of field, so people near and far are all in focus.',
      },
      {
        q: 'Most phone cameras have a fixed aperture. How else can you get a blurrier background?',
        options: ['Raise the ISO', 'Move the person away from the wall and get closer to them', 'Turn on HDR', 'Use the flash'],
        answer: 1,
        explain: 'Distance. Move the person away from the background and move the camera closer to the person. Portrait mode can also fake it in software.',
      },
    ],
    right: 'Right.',
    wrong: 'Not quite.',
    score: 'You got {n} of {t}.',
    perfect: 'All of them. Go blur some backgrounds.',
    good: 'Close. Read the ones you missed, then try the slider again.',
    retry: 'Take it again',
  },
};
