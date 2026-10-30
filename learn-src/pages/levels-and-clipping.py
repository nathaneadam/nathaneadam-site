import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'common.py')).read())
META = dict(
    title='Levels and clipping: set your audio level right',
    h1='Levels and clipping',
    desc='A free interactive lesson. Set the record level on a real voice recording, watch the meter, hear what clipping does, and learn why you can\'t fix it in the edit. About 20 minutes, works on a phone.',
    ogdesc='Set the level on a real recording, push it into clipping, and hear why the edit can\'t save it. A free 20-minute lesson.',
    og='og-levels-and-clipping.jpg',
    ogalt='A clipped audio waveform with red flat tops beside a level meter.',
)
BODY = f'''
  <div class="pagehead wrap">
    <div class="eyebrow"><a href="./">Video basics</a> &middot; Sound</div>
    <h1>Levels and clipping</h1>
    <p class="lede">Record too quietly and you fight hiss forever. Record too loud and it&rsquo;s broken for good. This lesson is about the one knob that decides which, and where to set it.</p>
    <div class="lesson-meta"><span>About 20 minutes</span><span>Turn your sound on</span><span>Free, no sign-up</span></div>
  </div>

  <!-- 1. Example first -->
  <section class="lesson-sec" id="guess">
    <div class="wrap">
      <p class="lesson-kicker">Start here</p>
      <h2>Which one can you fix?</h2>
      <div class="lesson-media">
        <figure>
          <img src="media/wave-quiet.svg" width="600" height="200" alt="Waveform A: tiny, far below the ceiling.">
          <figcaption><b>A.</b> Recorded too quietly</figcaption>
          <audio controls preload="none" src="media/audio/hook-quiet.mp3"></audio>
        </figure>
        <figure>
          <img src="media/wave-clipped.svg" width="600" height="200" alt="Waveform B: huge, slamming into the ceiling, with red flat tops.">
          <figcaption><b>B.</b> Recorded too loud</figcaption>
          <audio controls preload="none" src="media/audio/hook-clipped.mp3"></audio>
        </figure>
      </div>
      <div class="lesson-q" id="lesson-hook">
        <h3>One of these was recorded too quietly. One was recorded too loud. Which one can you rescue in the edit?</h3>
        <div class="lesson-opts"></div>
        <p class="lesson-reveal" hidden></p>
      </div>
    </div>
  </section>

  <!-- 2. Demo -->
  <section class="lesson-sec" id="stage">
    <div class="wrap">
      <p class="lesson-kicker">Try it</p>
      <h2>Set the level yourself.</h2>
      <div class="measure">
        <p>This is a real voice going through a pretend recorder. The <b>Record level</b> slider is the knob on the recorder. Whatever it does gets saved into the file. The <b>Volume in the edit</b> slider is what you&rsquo;d change later in Premiere. Green is a good level. Red means it clipped.</p>
      </div>
      <div id="lesson-demo">
        <noscript><p class="lesson-reveal">The demo needs JavaScript. The two recordings above show the same idea.</p></noscript>
      </div>
      <div class="lesson-steps" id="lesson-steps"></div>
    </div>
  </section>

  <!-- 3. The meter -->
  <section class="lesson-sec" id="meter">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">What you just did</p>
        <h2>Reading the meter.</h2>
        <p>Digital audio has a hard ceiling. It&rsquo;s called <b>0 dBFS</b> (decibels full scale), and nothing can be recorded louder than it. Meters count down from the ceiling, so the numbers are negative. &minus;6 means six decibels below the top.</p>
      </div>
      <figure class="lesson-wide"><img src="media/gear/meter.svg" width="360" height="110" alt="A level meter from -48 to 0 dBFS. Aim for peaks between -12 and -6. Zero is clipping."><figcaption>For a voice, aim for the loudest moments between &minus;12 and &minus;6.</figcaption></figure>
      <div class="measure">
        <p>Why not right up at 0? Because people get louder without warning. They laugh, they get excited, they lean in. The space between &minus;6 and 0 is room for that. Why not way down at &minus;30? Because every recorder adds a little hiss of its own. A strong signal buries it. A weak one makes you turn it up later, hiss and all.</p>
      </div>
    </div>
  </section>

  <!-- 4. Clipping -->
  <section class="lesson-sec" id="clipping">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">Up close</p>
        <h2>What clipping actually is.</h2>
        <p>Zoom way in on a sound wave and it&rsquo;s a smooth up-and-down line. Send it in too loud and the recorder can&rsquo;t follow it past the ceiling, so it draws a flat line instead. Those flat tops are what you hear as crackle.</p>
      </div>
      <div class="lesson-media">
        <figure><img src="media/zoom-clean.svg" width="300" height="170" loading="lazy" alt="A close-up of a clean wave with smooth, rounded peaks."><figcaption><b>Clean.</b> About 12 thousandths of a second of the voice. Smooth peaks, all under the dashed ceiling.</figcaption></figure>
        <figure><img src="media/zoom-clipped.svg" width="300" height="170" loading="lazy" alt="A close-up of a clipped wave with the peaks cut off flat at the ceiling."><figcaption><b>Clipped.</b> The same moment recorded too hot. The peaks are cut off flat at the ceiling.</figcaption></figure>
      </div>
      <div class="measure">
        <p>The recorder threw away the part of the wave above the ceiling. Turning it down later can&rsquo;t put back what was never saved. Repair plug-ins can guess at the missing tops and soften it a little. Another take is still the real fix.</p>
        <p><b>One caveat.</b> Some newer recorders save in <b>32-bit float</b>, which holds so much headroom that they&rsquo;re very hard to clip. Most phones and cameras don&rsquo;t record that way, so set your level like it matters. It usually does.</p>
      </div>
    </div>
  </section>

  <!-- 5. Where the knob is -->
  <section class="lesson-sec" id="gear">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">Where the knob is</p>
        <h2>Every recorder has one.</h2>
        <p>It goes by different names: gain, input level, record level, audio level. It always comes before the file gets saved, and that&rsquo;s the one you set.</p>
      </div>
      <div class="lesson-gear">
        {gear('recorder', 'Handheld recorder', 'handheld+audio+recorder', 'A handheld audio recorder', 'Level wheel or buttons on the side')}
        {gear('interface', 'USB audio interface', 'usb+audio+interface', 'A USB audio interface with gain knobs', 'One gain knob per mic')}
        {gear('shotgun-mic', 'Camera with a mic', 'shotgun+microphone+camera', 'A shotgun microphone on a camera', 'Audio level is in the camera menu')}
        {gear('recorder', '32-bit float recorder', '32+bit+float+audio+recorder', 'A handheld audio recorder', 'Very hard to clip')}
      </div>
      <div class="measure">
        <p class="lesson-kicker" style="margin-top:28px;">The best knob of all</p>
        <h2>Distance.</h2>
        <p>A mic close to the mouth hears a lot of voice and not much room. Move it farther away and you have to turn the level up to get the same voice, and the room, the air conditioner and the traffic come up with it. A clip-on lav mic six inches from the mouth beats an expensive mic across the room.</p>
      </div>
      <div class="lesson-media">
        <figure><img src="media/gear/mic-distance.svg" width="360" height="150" loading="lazy" alt="Close mic: strong voice, quiet room. Far mic: weak voice, loud room."><figcaption>Close: lots of voice, a little room. Far: a little voice, lots of room.</figcaption></figure>
        <figure class="lesson-solo"><img src="media/gear/lav-mic.svg" width="160" height="120" loading="lazy" alt="A clip-on lavalier microphone with its wireless transmitter"><figcaption><b>Lav mic.</b> Clips to a shirt, a hand-width below the chin. <a href="https://www.amazon.com/s?k=wireless+lavalier+microphone" target="_blank" rel="noopener nofollow">See on Amazon</a></figcaption></figure>
      </div>
    </div>
  </section>

  <!-- 6. Try it at home -->
  <section class="lesson-sec" id="home">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">Try it at home</p>
        <h2>Three takes with your phone.</h2>
        <p>Use any recording app on your phone, then drop the files into Premiere (or any editor) and look at the waveforms side by side.</p>
      </div>
      <ol class="lesson-do">
        <li>Hold the phone at arm&rsquo;s length and say one sentence at a normal volume.</li>
        <li>Hold it a hand-width from your mouth and say the same sentence the same way.</li>
        <li>Stay close and say it again, really loudly. Then laugh into it.</li>
        <li>Line up the three waveforms. Which one looks like each of these?</li>
      </ol>
      <div class="lesson-media three">
        <figure><img src="media/wave-quiet.svg" width="600" height="200" loading="lazy" alt="A tiny waveform."><figcaption><b>Too quiet.</b> Probably your arm&rsquo;s-length take.</figcaption></figure>
        <figure><img src="media/wave-good.svg" width="600" height="200" loading="lazy" alt="A healthy waveform with room below the ceiling."><figcaption><b>Just right.</b> Big, with room to spare.</figcaption></figure>
        <figure><img src="media/wave-clipped.svg" width="600" height="200" loading="lazy" alt="A clipped waveform, flat at the top."><figcaption><b>Clipped.</b> Flat tops where it hit the ceiling.</figcaption></figure>
      </div>
      <div class="measure"><p style="font-size:15px;color:var(--ash);">Most phone apps set the level automatically and duck when you get loud, so your clipped take might not clip. That&rsquo;s a good reason to learn an app that lets you set it yourself.</p></div>
    </div>
  </section>

  <!-- 7. Quiz -->
  <section class="lesson-sec" id="check">
    <div class="wrap">
      <p class="lesson-kicker">Five questions</p>
      <h2>Check yourself.</h2>
      <div class="lesson-quiz" id="lesson-quiz"></div>
      <div class="lesson-score" id="lesson-score" hidden>
        <h3></h3>
        <p></p>
        <button type="button" class="btn btn-ghost"></button>
      </div>
    </div>
  </section>

  <!-- 8. Next -->
  <section class="lesson-sec" id="next">
    <div class="wrap">
      <div class="lesson-next">
        <div>
          <p class="lesson-kicker">Up next in Sound</p>
          <h2>Microphones and pickup patterns.</h2>
          <p>Why a lav, a shotgun and a phone hear the same room so differently. That lesson isn&rsquo;t built yet. If you&rsquo;d like to hear when it is, <a href="../index.html#join">get the weekly email</a>.</p>
        </div>
        <div class="btns">
          <div class="next-pair"><figure><img src="media/gear/lav-mic.svg" width="160" height="120" alt="A lav mic" loading="lazy"><figcaption>Lav</figcaption></figure><figure><img src="media/gear/shotgun-mic.svg" width="160" height="120" alt="A shotgun mic" loading="lazy"><figcaption>Shotgun</figcaption></figure></div>
          <a class="btn btn-cta" href="./">See the whole course</a>
        </div>
      </div>
      <p class="lesson-credits">The voice is the opening of a <a href="https://archive.org/details/gettysburg_address_librivox" target="_blank" rel="noopener">LibriVox recording of the Gettysburg Address</a>, which is in the public domain. Thank you to its volunteer reader. The Amazon links are searches, not recommendations of one brand.</p>
    </div>
  </section>
'''
