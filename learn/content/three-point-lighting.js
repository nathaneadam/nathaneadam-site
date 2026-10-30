/* ==================================================================
   Three-point lighting — the words for the interactive parts.
   The guess, the guided steps, the famous looks and the quiz all live
   here. The rest of the lesson's prose is in the HTML page itself, so
   search engines and no-script readers get it too.
   Edit words here. learn/lesson.js and learn/demos/lighting.js hold
   logic only.
   ================================================================== */
window.LESSON = {
  slug: 'three-point-lighting',
  demo: './demos/lighting.js',
  media: 'media/',

  hook: {
    question: 'Same face. Same camera. Same settings. What changed in picture B?',
    options: [
      'A better camera setting',
      'It was colour graded afterwards',
      'Where the lights are',
    ],
    answer: 2,
    right: '<b>Yep.</b> Nothing about the camera changed, and nobody touched it in the edit.',
    wrong: '<b>Good guess, but no.</b> The camera and the edit are identical.',
    reveal: 'Picture A has one light sitting right next to the lens, like a phone flash. Picture B has three lights, each in its own spot. Move the lights and the face changes shape. That&rsquo;s the whole lesson, really.',
  },

  labels: {
    canvas: 'A 3D head lit by the lights on the map',
    map: 'Overhead map of the room. Drag the lights around the head.',
    pick: 'Choose a light',
    hint: 'Seen from above',
    loading: 'Loading the head&hellip;',
    noWebGL: 'This demo needs a browser with 3D graphics (WebGL) switched on. The pictures above show the same idea.',
    brightness: 'Brightness',
    height: 'Height',
    heights: { low: 'Below', eye: 'Eye level', high: 'Above' },
    names: { key: 'Key', fill: 'Fill', back: 'Back' },
    onWord: 'on', offWord: 'off', off: 'switched off',
    camera: 'Camera',
    backdrop: 'Back wall',
    where: { atCamera: 'Right beside the camera', fmt: '{deg}° camera {side}', right: 'right', left: 'left', behind: ', behind him' },
    ratioFmt: 'Key-to-fill ratio <b>{r}:1</b>',
    ratioNoFill: 'No fill: the shadow side gets nothing',
    ratioNoKey: 'Key light is off',
  },

  steps: {
    heading: 'Build it in five moves',
    reset: 'Start over',
    list: [
      {
        id: 'key-side', select: 'key',
        title: 'Move the key light off to one side',
        body: 'The yellow <b>Key</b> light is sitting right beside the camera. That&rsquo;s picture A: bright, flat, no shape. Drag it around the circle until it&rsquo;s somewhere between 30° and 60° to one side of the camera. Watch a shadow appear beside the nose.',
        done: 'There it is. The face has a shadow side now, and the shadow is what makes it look round.',
      },
      {
        id: 'key-high', select: 'key',
        title: 'Raise the key above eye level',
        body: 'Most light in real life comes from above us: the sun, the ceiling, a window. Set the key&rsquo;s height to <b>Above</b>. The shadow under the nose drops down toward the lip, which is where our eyes expect it.',
        done: 'That&rsquo;s your key light. Most of the look comes from this one light.',
      },
      {
        id: 'fill-on', select: 'fill',
        title: 'Turn on the fill, on the other side',
        body: 'The shadow side is pitch black. Dramatic, but probably not what you want for an interview. Switch on the blue <b>Fill</b> light and put it on the other side of the camera from the key.',
        done: 'Now you can see into the shadows.',
      },
      {
        id: 'ratio', select: 'fill',
        title: 'Turn the fill down',
        body: 'A fill as bright as the key flattens the face right back out. Pull the fill&rsquo;s brightness down, or drag it farther away, until the ratio under the picture reads somewhere between <b>3:1 and 6:1</b>.',
        done: 'The shadow side is darker, but you can still see into it. That&rsquo;s the balance.',
      },
      {
        id: 'back-on', select: 'back',
        title: 'Add the back light',
        body: 'Look at the back of his head. It disappears into the dark wall behind him. Switch on the purple <b>Back</b> light and drag it behind him, across from the key. Watch for a thin line of light along the edge of his head and ear.',
        done: 'That edge of light is what pulls him off the background.',
      },
    ],
    finished: '<b>That&rsquo;s three-point lighting.</b> Key for shape, fill for the shadows, back light for separation. Every look below is the same three lights, moved around. Tap one, then go back to the map and mess with it.',
  },

  looks: [
    { name: 'Phone flash',
      desc: 'One light right beside the lens. No shadows, so no shape. This is the passport photo.',
      state: { key: { on: true, a: 0, r: 70, h: 'eye', b: 100 }, fill: { on: false, a: -40, r: 70, h: 'eye', b: 100 }, back: { on: false, a: -150, r: 70, h: 'high', b: 100 } } },
    { name: 'Three-point',
      desc: 'The interview standard. Key high and about 45° off, fill on the other side and dimmer, back light behind and across from the key.',
      state: { key: { on: true, a: 42, r: 66, h: 'high', b: 100 }, fill: { on: true, a: -38, r: 76, h: 'eye', b: 30 }, back: { on: true, a: -145, r: 62, h: 'eye', b: 100 } } },
    { name: 'Rembrandt',
      desc: 'Named after the painter. Key high and well off to the side, very little fill. Look for the small triangle of light on the shadow-side cheek, under the eye.',
      state: { key: { on: true, a: 60, r: 60, h: 'high', b: 100 }, fill: { on: true, a: -30, r: 84, h: 'eye', b: 15 }, back: { on: false, a: -150, r: 70, h: 'high', b: 100 } } },
    { name: 'Split',
      desc: 'Key at 90°, nothing else. Half the face lit, half gone. Moody. Sometimes villainous.',
      state: { key: { on: true, a: 90, r: 62, h: 'eye', b: 100 }, fill: { on: false, a: -40, r: 70, h: 'eye', b: 100 }, back: { on: false, a: -150, r: 70, h: 'high', b: 100 } } },
    { name: 'Butterfly',
      desc: 'Key straight on and high above the camera, a little fill from below. The nose throws a small butterfly-shaped shadow just under it. Old Hollywood glamour.',
      state: { key: { on: true, a: 0, r: 62, h: 'high', b: 100 }, fill: { on: true, a: 0, r: 80, h: 'low', b: 25 }, back: { on: true, a: 180, r: 70, h: 'high', b: 70 } } },
    { name: 'Campfire',
      desc: 'Light from below. Almost nothing in real life lights us from underneath, except a campfire or a flashlight under the chin. That&rsquo;s exactly why it looks creepy.',
      state: { key: { on: true, a: 0, r: 58, h: 'low', b: 100 }, fill: { on: false, a: -40, r: 70, h: 'eye', b: 100 }, back: { on: false, a: -150, r: 70, h: 'high', b: 100 } } },
    { name: 'Rim only',
      desc: 'Just the back light. The face is gone and the edges glow. Music videos love this one.',
      state: { key: { on: false, a: 42, r: 66, h: 'high', b: 100 }, fill: { on: false, a: -40, r: 70, h: 'eye', b: 100 }, back: { on: true, a: 165, r: 60, h: 'high', b: 100 } } },
  ],

  quiz: {
    heading: 'Check yourself',
    questions: [
      {
        q: 'Which light does most of the work of shaping a face?',
        options: ['The key light', 'The fill light', 'The back light', 'The light on the camera'],
        answer: 0,
        explain: 'The key. It&rsquo;s the brightest light and it makes the shadows. Everything else adjusts what the key started.',
      },
      {
        q: 'Your key light is 45° camera right. Where does the fill usually go?',
        options: ['Right next to the key', 'Camera left, on the other side of the camera', 'Directly behind the subject', 'On the floor, pointing up'],
        answer: 1,
        explain: 'Opposite the key, on the other side of the camera. That way it lands on the shadow side the key made.',
      },
      {
        q: 'Her dark hair keeps disappearing into a dark background. Which light fixes that?',
        options: ['More fill', 'A brighter key', 'A back light', 'Turning the key off'],
        answer: 2,
        explain: 'A back light, behind her and high, traces an edge of light around her hair and shoulders. That edge is what separates her from the wall.',
      },
      {
        q: 'The director wants the scene to feel tense and mysterious. What do you change?',
        options: ['Turn the fill down so the ratio gets bigger', 'Turn the fill up to match the key', 'Move the key right next to the camera', 'Add a second back light'],
        answer: 0,
        explain: 'Less fill means darker shadows and a bigger ratio, something like 8:1. Matching the fill to the key does the opposite: flat and friendly.',
      },
      {
        q: 'You have one lamp and a sheet of white foam board. What&rsquo;s the board for?',
        options: ['Bouncing the lamp&rsquo;s light back into the shadow side', 'Putting behind the person as a back light', 'Holding in front of the lamp to make it brighter', 'Nothing. You need a second lamp.'],
        answer: 0,
        explain: 'A white board doesn&rsquo;t make light, it reflects it. Put it on the shadow side and it bounces some of the key back in. That&rsquo;s a fill for the price of a poster board.',
      },
    ],
    right: 'Right.',
    wrong: 'Not quite.',
    score: 'You got {n} of {t}.',
    perfect: 'All of them. You&rsquo;re ready to light a real face.',
    good: 'Close. Read the ones you missed, then try the map again.',
    retry: 'Take it again',
  },
};
