/* ==================================================================
   Levels and clipping — the words for the interactive parts.
   Prose is in learn/levels-and-clipping.html. Logic is in
   learn/lesson.js and learn/demos/levels.js.
   ================================================================== */
window.LESSON = {
  slug: 'levels-and-clipping',
  demo: './demos/levels.js',
  media: 'media/',

  hook: {
    question: 'One of these was recorded too quietly. One was recorded too loud. Which one can you rescue in the edit?',
    options: ['A, the quiet one', 'B, the loud one', 'Both of them', 'Neither'],
    answer: 0,
    right: '<b>Yep.</b> You can turn A up.',
    wrong: '<b>Close, but no.</b> Only A can be rescued.',
    reveal: 'Turn A up and it&rsquo;s usable, with a little hiss coming up with it. B is clipped: the loudest words hit the recorder&rsquo;s ceiling and got cut off flat. That damage is in the file now. Turning it down later just gives you quieter damage.',
  },

  labels: {
    wave: 'The waveform of the recording',
    loading: 'Loading the recording&hellip;',
    noWebGL: 'This demo needs a browser that can play audio with JavaScript. The two recordings above show the same idea.',
    play: 'Play', stop: 'Stop',
    rec: 'Record level',
    edit: 'Volume in the edit',
    ceiling: '0 dBFS, the ceiling',
    tagPeak: 'Loudest peak {d} dBFS.',
    low: 'Too quiet',
    good: 'Right in the zone',
    hot: 'Getting hot',
    tagClip: 'Clipped. {p}% of it hit the ceiling',
    note: 'The record level is the knob on the recorder, before anything is saved. The edit volume is what you change afterwards in Premiere. No sound on an iPhone? Flip the silent switch off.',
  },

  steps: {
    heading: 'Five moves',
    reset: 'Start over',
    list: [
      {
        id: 'played',
        title: 'Press play',
        body: 'This is the recording as it came off the recorder. Press <b>Play</b>, listen, and watch the meter and the waveform.',
        done: 'Quiet, right? The loudest words barely reach the middle of the meter.',
      },
      {
        id: 'boost',
        title: 'Turn it up in the edit',
        body: 'This is what most people try first. Drag <b>Volume in the edit</b> up to +15 dB or more, then play it again. Listen to the gaps between the words.',
        done: 'Louder. So is the hiss underneath. When you turn up a quiet recording, you turn up everything in it.',
      },
      {
        id: 'right',
        title: 'Fix it at the source instead',
        body: 'Put the edit volume back to about 0. Now raise the <b>Record level</b> until the loudest peak lands between <b>&minus;12 and &minus;6 dBFS</b>, the green zone on the meter. Play it.',
        done: 'That&rsquo;s a good recording. Loud enough that the hiss stays buried, with room to spare for someone who laughs.',
      },
      {
        id: 'clip',
        title: 'Now push it too far',
        body: 'Keep raising the record level until the waveform turns red and the meter hits 0. Play it and listen to the loudest words.',
        done: 'Hear the crackle? That&rsquo;s clipping. The tops of the wave got cut off flat.',
      },
      {
        id: 'nofix',
        title: 'Try to fix it in the edit',
        body: 'Leave the record level where it is. Pull <b>Volume in the edit</b> down to &minus;9 dB or lower and play it again.',
        done: 'Quieter. Still crackly. The red parts are still red. The flat tops are baked into the file, and no fader brings them back.',
      },
    ],
    finished: '<b>That&rsquo;s gain staging.</b> Set the level when you record, aim for peaks between &minus;12 and &minus;6, and you&rsquo;ll rarely need to rescue anything. Try the presets below and compare them back to back.',
  },

  looks: [
    { name: 'Too quiet', desc: 'Peaks around &minus;28 dBFS. Usable, but everything you do to it later brings the hiss up too.', state: { rec: -27, edit: 0 } },
    { name: 'Quiet, boosted later', desc: 'The same quiet recording, turned up 20 dB in the edit. Loud enough now, and listen to the hiss between the words.', state: { rec: -27, edit: 20 } },
    { name: 'Just right', desc: 'Peaks around &minus;9 dBFS. Strong voice, buried hiss, room to spare.', state: { rec: -8, edit: 0 } },
    { name: 'Clipped', desc: 'Recorded 10 dB too hot. The loudest words crackle.', state: { rec: 10, edit: 0 } },
    { name: 'Clipped, turned down', desc: 'The clipped recording pulled down 12 dB in the edit. Quieter, still broken.', state: { rec: 10, edit: -12 } },
  ],

  quiz: {
    heading: 'Check yourself',
    questions: [
      {
        q: 'When you record a voice, where should the loudest peaks land on the meter?',
        options: ['Around &minus;30 dBFS', 'Between &minus;12 and &minus;6 dBFS', 'Right at 0 dBFS', 'Above 0, so it&rsquo;s nice and loud'],
        answer: 1,
        explain: 'Between &minus;12 and &minus;6. Loud enough to bury the hiss, with room left over for a laugh or a shout.',
      },
      {
        q: 'What happens when a recording hits 0 dBFS?',
        options: ['It just gets louder', 'The tops of the wave get cut off flat, and you hear distortion', 'The recorder automatically turns itself down', 'Nothing, as long as it&rsquo;s short'],
        answer: 1,
        explain: '0 dBFS is the ceiling. Anything louder gets chopped off flat, and that crackle is recorded into the file.',
      },
      {
        q: 'You recorded too quietly and turn it up 20 dB in Premiere. What else gets 20 dB louder?',
        options: ['Nothing else', 'The background hiss and room noise', 'Only the music track', 'The video'],
        answer: 1,
        explain: 'Everything in the recording comes up together, including the hiss and the room. That&rsquo;s why you fix the level at the source.',
      },
      {
        q: 'Your interview clipped on the loudest answers. What&rsquo;s the real fix?',
        options: ['Turn the clip down in the edit', 'Export at a higher quality', 'Record it again with the level turned down', 'Add music over it'],
        answer: 2,
        explain: 'Clipping can&rsquo;t be turned back down. Repair plug-ins can soften it a little, but the real fix is another take with the level lower.',
      },
      {
        q: 'What&rsquo;s the best way to get more voice and less room into a recording?',
        options: ['Move the mic closer to the mouth', 'Turn up your headphones', 'Raise the edit volume', 'Record at a higher sample rate'],
        answer: 0,
        explain: 'Distance. A mic close to the mouth hears a lot of voice and very little room, so you can run the level lower and still sound full.',
      },
    ],
    right: 'Right.',
    wrong: 'Not quite.',
    score: 'You got {n} of {t}.',
    perfect: 'All of them. Your next interview is going to sound great.',
    good: 'Close. Read the ones you missed, then try the demo again.',
    retry: 'Take it again',
  },
};
