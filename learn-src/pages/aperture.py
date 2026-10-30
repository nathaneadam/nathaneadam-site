import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'common.py')).read())
META = dict(
    title='Aperture and depth of field: get the blurry background',
    h1='Aperture and depth of field',
    desc='A free interactive lesson. Open and close a lens from f/1.4 to f/16, move the background, and see why the blurry-background look happens. Works on a phone, about 20 minutes.',
    ogdesc='Open and close a lens from f/1.4 to f/16 and watch the background melt. A free 20-minute lesson.',
    og='og-aperture.jpg',
    ogalt='A 3D head in front of a blurred bookshelf and glowing string lights, with an aperture diagram.',
    three=True,
)
BODY = f'''
  <div class="pagehead wrap">
    <div class="eyebrow"><a href="./">Video basics</a> &middot; Camera</div>
    <h1>Aperture and depth of field</h1>
    <p class="lede">That soft, blurry background that makes a shot look expensive isn&rsquo;t a filter someone added later. It comes from a hole in the lens, and how big you make it.</p>
    <div class="lesson-meta"><span>About 20 minutes</span><span>Works on a phone</span><span>Free, no sign-up</span></div>
  </div>

  <!-- 1. Example first -->
  <section class="lesson-sec" id="guess">
    <div class="wrap">
      <p class="lesson-kicker">Start here</p>
      <h2>What changed?</h2>
      <div class="lesson-pair">
        <figure><img src="media/ap-a.jpg" width="800" height="600" alt="The head in front of a very blurry bookshelf with soft round lights."><figcaption><b>A.</b> Background soft</figcaption></figure>
        <figure><img src="media/ap-b.jpg" width="800" height="600" alt="The same head with the bookshelf behind him in sharp focus."><figcaption><b>B.</b> Background sharp</figcaption></figure>
      </div>
      <div class="lesson-q" id="lesson-hook">
        <h3>Same camera, same lens, same spot. What changed between picture A and picture B?</h3>
        <div class="lesson-opts"></div>
        <p class="lesson-reveal" hidden></p>
      </div>
    </div>
  </section>

  <!-- 2. Demo -->
  <section class="lesson-sec" id="stage">
    <div class="wrap">
      <p class="lesson-kicker">Try it</p>
      <h2>Open it. Close it.</h2>
      <div class="measure">
        <p>The same 3D head from the lighting lesson, now with a bookshelf and a string of lights behind him, seen through a pretend lens. Drag the <b>Aperture</b> slider and watch the background. The little drawing beside the f-number is the hole inside the lens opening and closing.</p>
      </div>
      <div id="lesson-demo">
        <noscript><p class="lesson-reveal">The demo needs JavaScript. The pictures on this page show the same idea.</p></noscript>
      </div>
      <div class="lesson-steps" id="lesson-steps"></div>
    </div>
  </section>

  <!-- 3. The hole -->
  <section class="lesson-sec" id="iris">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">What you just did</p>
        <h2>The aperture is a hole.</h2>
        <p>Inside every lens is a ring of thin metal blades, called the iris. They slide together to make the hole smaller, or apart to make it bigger. The size of that hole is the aperture, and it&rsquo;s measured in f-stops.</p>
      </div>
      <figure class="lesson-wide"><img src="media/gear/iris-stops.svg" width="360" height="140" alt="The lens opening at f/1.8, f/5.6 and f/16: wide open, middle, and tiny."><figcaption>Small number, big hole. Big number, tiny hole. It&rsquo;s backwards, and everybody thinks so the first time.</figcaption></figure>
      <div class="measure">
        <p>The f-number is a fraction (the lens&rsquo;s focal length divided by the width of the hole), which is why bigger numbers mean smaller holes. You don&rsquo;t need the math. You need the full stops in order: <b>f/1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22</b>. Each step to the right cuts the light in half. Each step to the left doubles it.</p>
      </div>
    </div>
  </section>

  <!-- 4. Depth of field -->
  <section class="lesson-sec" id="dof">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">Depth of field</p>
        <h2>How much is sharp.</h2>
        <p>Depth of field is how much of the picture, front to back, looks sharp. A wide aperture gives you a <b>shallow</b> depth of field: the face sharp, everything behind it soft. A tiny aperture gives you a <b>deep</b> one: sharp from front to back. Same head, same shelf:</p>
      </div>
      <div class="lesson-media three">
        <figure><img src="media/ap-f14.jpg" width="800" height="600" loading="lazy" alt="At f/1.4 the shelf is very blurry."><figcaption><b>f/1.4.</b> Shallow. Interviews, portraits, the expensive look.</figcaption></figure>
        <figure><img src="media/ap-f4.jpg" width="800" height="600" loading="lazy" alt="At f/4 the shelf is a little soft."><figcaption><b>f/4.</b> In between. You can still tell what&rsquo;s back there.</figcaption></figure>
        <figure><img src="media/ap-f16.jpg" width="800" height="600" loading="lazy" alt="At f/16 the shelf is sharp."><figcaption><b>f/16.</b> Deep. Groups, products, landscapes.</figcaption></figure>
      </div>
    </div>
  </section>

  <!-- 5. Distance -->
  <section class="lesson-sec" id="distance">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">The other half</p>
        <h2>Distance matters just as much.</h2>
        <p>The f-stop isn&rsquo;t the only thing that decides the blur. How far the background is behind the person matters just as much. Same f/2.8 in all three of these. Only the shelf moved:</p>
      </div>
      <div class="lesson-media three">
        <figure><img src="media/ap-near.jpg" width="800" height="600" loading="lazy" alt="With the shelf right behind him, it's almost sharp."><figcaption><b>Shelf close behind.</b> Barely blurry.</figcaption></figure>
        <figure><img src="media/ap-mid.jpg" width="800" height="600" loading="lazy" alt="With the shelf a few feet back, it's soft."><figcaption><b>A few feet back.</b> Soft.</figcaption></figure>
        <figure><img src="media/ap-far.jpg" width="800" height="600" loading="lazy" alt="With the shelf far back, it's very blurry."><figcaption><b>Far back.</b> Melted.</figcaption></figure>
      </div>
      <div class="measure">
        <p>This is the trick for phones. Most phone cameras have a fixed aperture: you can&rsquo;t change the hole at all. So you change the distances instead. Pull the person away from the wall, and move the phone closer to them.</p>
      </div>
      <figure class="lesson-wide"><img src="media/gear/dof-setup.svg" width="350" height="150" loading="lazy" alt="Seen from above. Top: person against the wall, phone far away, little blur. Bottom: person well away from the wall, phone close, lots of blur."><figcaption>Seen from above. Same phone, very different backgrounds.</figcaption></figure>
    </div>
  </section>

  <!-- 6. The trade-off -->
  <section class="lesson-sec" id="tradeoff">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">The catch</p>
        <h2>Light isn&rsquo;t free.</h2>
        <p>Close the aperture to get everything sharp and you&rsquo;re letting in far less light. From f/2.8 to f/16 is five stops, which is about 1/32 of the light. Something has to make that up. On auto, your camera usually raises the ISO, and high ISO brings grain.</p>
      </div>
      <div class="lesson-media">
        <figure><img src="media/ap-dark.jpg" width="800" height="600" loading="lazy" alt="At f/16 with nothing changed, the picture is nearly black."><figcaption><b>f/16, nothing else changed.</b> Five stops too dark.</figcaption></figure>
        <figure><img src="media/ap-grainy.jpg" width="800" height="600" loading="lazy" alt="At f/16 with auto exposure, bright again but grainy."><figcaption><b>f/16 on auto.</b> The camera went to ISO 12,800. Bright again, and grainy.</figcaption></figure>
      </div>
    </div>
  </section>

  <!-- 7. Gear -->
  <section class="lesson-sec" id="gear">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">What you&rsquo;ll shoot with</p>
        <h2>Where the aperture lives.</h2>
      </div>
      <div class="lesson-gear">
        {gear('camera', 'Camera', 'mirrorless+camera', 'A camera with interchangeable lenses', 'Turn the dial to A or Av and you pick the aperture')}
        {gear('prime-lens', '50mm f/1.8 lens', '50mm+f1.8+lens', 'A 50mm f/1.8 prime lens', 'Cheap, and opens wide. Get the one that fits your camera')}
        {gear('phone', 'Phone', None, 'A phone camera app', 'Usually a fixed aperture. Use distance, or Portrait mode')}
      </div>
      <div class="measure">
        <p style="font-size:15px;color:var(--ash);">Portrait and Cinematic modes on phones fake the blur in software. They&rsquo;re pretty good now, and they still get confused by hair and glasses. Real distance never does.</p>
      </div>
    </div>
  </section>

  <!-- 8. Try it at home -->
  <section class="lesson-sec" id="home">
    <div class="wrap">
      <div class="measure">
        <p class="lesson-kicker">Try it at home</p>
        <h2>Two shots, one friend.</h2>
      </div>
      <ol class="lesson-do">
        <li>Stand a friend right up against a wall with some stuff on it: a shelf, posters, lights. Back up and take a photo of their face.</li>
        <li>Now have them walk ten feet away from the wall. Walk up close to them so their face fills the same amount of the frame. Take another.</li>
        <li>If you have a camera, put it on A or Av, and take both shots again at the lowest f-number your lens has, then at f/11.</li>
        <li>Put them side by side. The blurriest background wins.</li>
      </ol>
    </div>
  </section>

  <!-- 9. Quiz -->
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

  <!-- 10. Next -->
  <section class="lesson-sec" id="next">
    <div class="wrap">
      <div class="lesson-next">
        <div>
          <p class="lesson-kicker">Up next in Camera</p>
          <h2>Shutter speed and frame rate.</h2>
          <p>The other way to control light, and why a spinning fan looks different at 1/50 and 1/1000. That lesson isn&rsquo;t built yet. If you&rsquo;d like to hear when it is, <a href="../index.html#join">get the weekly email</a>.</p>
        </div>
        <div class="btns">
          <div class="next-pair"><figure><img src="media/gear/camera.svg" width="160" height="120" alt="A camera" loading="lazy"><figcaption>Camera</figcaption></figure><figure><img src="media/gear/phone.svg" width="160" height="120" alt="A phone" loading="lazy"><figcaption>Phone</figcaption></figure></div>
          <a class="btn btn-cta" href="./">See the whole course</a>
        </div>
      </div>
      <p class="lesson-credits">The demo is a simulation, not a photograph. The head is <em>Infinite, 3D Head Scan</em> by Lee Perry-Smith, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">Creative Commons Attribution 3.0</a>, from the <a href="https://github.com/mrdoob/three.js/tree/r170/examples/models/gltf/LeePerrySmith" target="_blank" rel="noopener">three.js examples</a>. The 3D and the blur run on <a href="https://threejs.org/" target="_blank" rel="noopener">three.js</a>, stored on this site. The Amazon links are searches, not recommendations of one brand.</p>
    </div>
  </section>
'''
