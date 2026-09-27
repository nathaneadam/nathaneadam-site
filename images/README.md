# images/

All four original placeholder slots are filled. The dashed-placeholder system
that used to live here has been removed — every `<img>` now points at a real file.

## What's here

**Portraits and teaching**

| File | Where | Notes |
|---|---|---|
| `portrait.jpg` | Homepage hero | 2023 TEDx Nashville headshot, 1000×1249 (4:5). Shown **whole** — see the hero warning below |
| `nate-bargatze.jpg` | Homepage story section | With Nate Bargatze and four friends. 1200×882. Replaced `teaching.jpg` on 27 Aug 2026 at Nathan's request |
| `teaching.jpg` | **Unused** | Teaching at a board in a darkened studio. Kept in case a teaching photo is wanted back — it's the only one of him actually mid-lesson |
| `early-guitar.jpg` | About | Teenage Nathan with an electric guitar. Square. |
| `console.jpg` | About | Younger, at a large analog desk. Square, pairs with the above. |
| `grammy-camp.jpg` | About · **GRAMMY Camp band** · **Projects card** | Students around a console |
| `grammy-console.jpg` | About · **GRAMMY Camp pair** | Eight people at one desk. **Photo: Tiffany L.** |
| `grammy-camp-group.jpg` | Credits · **GRAMMY Camp pair** | Full GRAMMY Camp Nashville class |
| `grammy-speaking.jpg` | Speaking · **GRAMMY Camp plate** | With a mic at a GRAMMY Foundation backdrop. **Photo: Tiffany L.** |
| `students-studio.jpg` | Credits band · **Projects card (M.A.)** | 1600×1066 (3:2). Shown whole in `.band` — faces run from the very top of the frame to the very bottom. Safe to crop in a `.projectcard`, which is 3:2 already |

**Work and credits**

| File | Where |
|---|---|
| `presleys.jpg` | Presleys' Country Jubilee broadcast still |
| `norville.jpg` | MSNBC "Singing or Synching?" segment |
| `learn-master.jpg` | Gibson's Learn & Master Guitar boxed set |
| `book-multi-platinum.jpg` | Multi-Platinum Pro Tools |
| `book-mixers-toolkit.jpg` | Pro Tools 9: The Mixer's Toolkit |
| `multi-platinum.jpg` | Multi-Platinum.com course library |
| `grammy-pathways.jpg` | GRAMMY Career Pathways dashboard |
| `landr-course.jpg` | LANDR course page |
| `peter-pan.jpg` | Cathy Rigby is Peter Pan playbill |
| `nc5-ai.jpg` | Frame from the NewsChannel 5 story |

**Added 27 Aug 2026** — a batch Nathan supplied, placed where each made the
most sense rather than all in one gallery.

| File | Where | Notes |
|---|---|---|
| `vince-gill.jpg` | Credits, music pair | With Vince Gill, who is first on the roster line right above it |
| `capitol-studios.jpg` | Credits, music pair | Capitol Studios LA. Pairs with the above — both ~3:4 |
| `studio-console.jpg` | Credits, editing credit | Console with a band tracking beyond the glass |
| `live-from-vr.jpg` | Credits | **Fills a gap** — the *Live from Virtual Reality* credit had no image at all |
| `live-from-vr-2.jpg` | **Live from Virtual Reality** project pair | Second VR avatar frame. Was held as an alternate; placed 27 Aug 2026 — it and `live-from-vr.jpg` are both 1400×788, so they pair exactly |
| `shooting-video.jpg`, `shooting-video-2.jpg` | Credits pair | Current production work, both 3:2 |
| `grammy-camp-la.jpg` | GRAMMY Camp | A Weekends lab full of students at iMacs |
| `grammy-camp-weekend.jpg` | GRAMMY Camp pair | Group at the desk |
| `grammy-camp-nashville.jpg` | GRAMMY Camp pair | Him at the console, students behind |
| `grammy-camp-online.jpg` | GRAMMY Camp | Video-call grid — the COVID teaching that became the dissertation |
| `gits-fest.jpg` | GRAMMY Camp | GITS Fest promo card. 9:16, so it stands alone at 340px — **do not pair it with a landscape shot** |
| `tedx-talk-intro.jpg` | Speaking | Being introduced in the headset |
| `tedx-talk-close.jpg` | **Unused** | Square crop of the talk, kept as an alternate |
| `tedx-room-wide.jpg` | Speaking | The full room |
| `tedx-room.jpg` | TEDx project pair | Audience in the wood-panelled room |
| `tedx-panorama.jpg` | TEDx project band | True panorama, 4.8:1. Safe as a band *because* it was shot that way |
| `tedx-team-2019.jpg` | TEDx project pair | The team behind Bold + Brilliant, TEDWomen 2019 |
| `donald-miller.jpg` | TEDx project | With Donald Miller, whose talk is in the same page's grid |
| `vision-pro.jpg` | About | Apple Vision Pro. Carries the "still buying the thing early" argument |

**Speaking and venue**

| File | Where |
|---|---|
| `tedx-stage.jpg` | Onstage in the VR headset |
| `tedx-letters.jpg` | The red TEDx letters. Also the TEDx project page band and its Projects card |
| `walnut-house.jpg`, `walnut-house-2.jpg` | The Walnut House, both 4:3 |
| `nc5-ai.jpg` | Frame from the NewsChannel 5 story. **Speaking page only now** — it stopped standing in for Cost of Valor on 1 Sep 2026 |

**Added 1 Sep 2026 — Cost of Valor**

Pulled from the two trailers on Nathan's own YouTube channel, which is what
finally made this possible. Both are 1280×720, so they pair with no ragged
columns, and both have `-sm` variants at 700×394.

| File | Where | Notes |
|---|---|---|
| `cost-of-valor-cinematic.jpg` | **Projects card** · `projects/cost-of-valor.html` pair | Helicopter crew chief in a flight helmet. Source: `youtu.be/BFTz21YJnBk`. Chosen for the card because the subject sits centre-frame and survives the 3:2 crop |
| `cost-of-valor-documentary.jpg` | `projects/cost-of-valor.html` pair | Gun crew at a treeline. Source: `youtu.be/OrWVRhjSDMM`. **Do not use this one in a card** — there is a face hard against the right edge that a 3:2 crop takes off |

Before this, `projects/cost-of-valor.html` had no images at all, which was the
only project page on the site in that state.

**Derived files, added 27 Aug 2026** with the ten new project pages. Nothing
here is a new photograph — each one is a crop or a mat of a file already listed
above, made because the original could not go where it was needed.

| File | From | Why it exists |
|---|---|---|
| `presleys-frame.jpg` | `presleys.jpg` | The original is a **YouTube screenshot** — player chrome, the video title across the top, black letterbox bars. Fine at 180px on `credits.html`, embarrassing as a 1008px `.band`. Cropped to just the video frame (942×390). Keep the original: `credits.html` still uses it |
| `*-card.jpg` (six) | Peter Pan playbill, both book covers, the LANDR and Multi-Platinum screenshots, the Norville frame | A `.projectcard .shot` is a hard 3:2 `object-fit:cover` box. A square playbill loses "Cathy Rigby" off the top; a 4:5 book cover loses the title and the authors; a wide screenshot loses its own edges. Each card variant sits the **whole** frame on a navy `#132a3e` field at 3:2, so nothing is cut |

The card mats are generated, not designed. To remake one:

```python
from PIL import Image
NAVY = (19, 42, 62)
im = Image.open('images/NAME.jpg').convert('RGB')
cw = max(im.width, 700); ch = round(cw*2/3)
if im.height > ch:
    im = im.resize((round(im.width*ch/im.height), ch), Image.LANCZOS)
c = Image.new('RGB', (cw, ch), NAVY)
c.paste(im, ((cw-im.width)//2, (ch-im.height)//2))
c.save('images/NAME-card.jpg', 'JPEG', quality=86, optimize=True, progressive=True)
```

**Use a card mat only when a crop would destroy information.** A letterboxed
photo looks worse than a cropped one, so a photograph that survives 3:2 should
just be cropped — `presleys-frame.jpg`, `live-from-vr.jpg`, `learn-master.jpg`
and `grammy-camp-online.jpg` all go into cards uncropped-by-mat and are fine.
The six that got mats are all type or artwork, where losing an edge loses a word.

**Social cards** — these two are never shown on the site. They exist only for
`og:image`, and they are the first thing anyone sees when the site is shared.

| File | Where |
|---|---|
| `og-card.jpg` | Homepage. Carries the hero headline. |
| `og-card-profile.jpg` | About, Credits, Speaking, every project page, `tools.html`, and the `Person` schema. Name and title, no campaign copy, so it doesn't go stale. |
| `og-card-diagnostic.jpg` | `tools/career-pivot.html` only. The question on the left, the same TEDx portrait on the right, built from `og-card.jpg` with Pillow on 1 Sep 2026. This is the URL Nathan shares, so it gets its own card. |

**The diagnostic reuses the profile card, and probably shouldn't forever.**
`tools/career-pivot.html` is the most shareable page on the site — it's a
two-minute quiz, which is the thing people actually send to a colleague — and it
currently shares as a photo of Nathan with his job title on it. A card carrying
the tool's own question ("Which half of your work is actually at risk?") would
almost certainly do better. Not done yet because it needs designing, not because
it was overlooked. `tools/career-pivot-result.html` deliberately has no og tags
at all: it's `noindex`, and there is nothing there to share.

Both are 1200×630 — the size LinkedIn, X, Slack and iMessage all crop from.
They're generated, not photographed: `portrait.jpg` flush right, a navy gradient
over its left edge, Poppins text on `--deep`. The script that built them is in
the 24 Aug 2026 commit message. Two things to know before regenerating:

- **PIL has no Poppins SemiBold.** The site's headings are weight 600; the only
  weights installed are Regular, Medium and Bold. The cards use Bold, which is
  slightly heavier than the site — correct for a card viewed as a thumbnail.
- **`og:image` must be an absolute URL** in the markup. A relative path silently
  produces a blank card on every platform, which is the bug these fixed.

Regenerate only if the hero headline changes. Keep the filenames — platforms
cache aggressively by URL, and a new name means every previously shared link
keeps the old card.

## The 31 Aug 2026 batch

Five photographs Nathan added. They arrived with spaces in the filenames and
were about to be committed unreferenced; renamed to the convention below and
placed by what each actually evidences.

| File | Dimensions | Where it went and why |
|---|---|---|
| `mansion-studios-gatlin.jpg` | 640×480 | `projects/peter-pan.html`. The Mansion Studios room where the 2009 orchestral score was tracked, with Larry Gatlin. The page had asked for a session photo since it was written. Caption says it is the room — **not** that the frame is from the Peter Pan sessions, which nobody has confirmed. Under 780px, so no `-sm`. |
| `multi-platinum-dave-aron.jpg` | 1280×853 | `projects/multi-platinum-com.html`. Shooting a hip-hop mixing course with Dave Aron, Snoop Dogg's engineer. That page claims it put working engineers on camera; this is the claim, pictured. |
| `grammy-camp-haywood-sanders.jpg` | 1008×575 | `projects/grammy-camp.html`. With Shannon Sanders and Dave Haywood of Lady Antebellum. The page had plenty of students-at-consoles and nothing showing the industry guests. |
| `walnut-control-room.jpg` | 1200×533 | `about.html`, Walnut House section. |
| `walnut-live-room.jpg` | 1300×272 | `about.html`, below it. |

**The two Walnut House shots are deliberately not a `.plate-pair`.** Control room
is 2.25:1 and the live room is 4.78:1 — nowhere near matching, and pairing them
would run the columns ragged. They are stacked as two solo `.plate` figures
instead. If a third Walnut House image ever arrives, check its ratio before
pairing it with either.

## Conventions

**`-sm` variants** are 700px wide, quality 80, referenced via `srcset`. Generate
one whenever a new image is wider than about 780px:

```python
from PIL import Image
im = Image.open('images/NAME.jpg').convert('RGB')
sm = im.resize((700, int(im.height*700/im.width)), Image.LANCZOS)
sm.save('images/NAME-sm.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
```

Then add to the markup:

```html
<img src="images/NAME.jpg"
     srcset="images/NAME-sm.jpg 700w, images/NAME.jpg 1400w"
     sizes="(max-width:640px) 92vw, 390px"
     alt="…" loading="lazy">
```

**The hero photo — check it on a phone.** This is the one that keeps biting.
`portrait.jpg` is 4:5, and the base `.hero-shot` rule sets a fixed
`aspect-ratio` with `object-fit:cover`. Any photo dropped in there gets cropped
to that box silently — for a while the live site cut the top of Nathan's head off
on every phone, and nothing about the desktop view hinted at it. The homepage now
overrides the box to show the image whole, but a *new* photo can still land back
in the cropped path. Resize the browser to ~390px and look before committing.

**Project cards crop; `.band` does not.** Added 27 Aug 2026 with
`projects.html`. A `.projectcard .shot` is a fixed 3:2 box with
`object-fit:cover`, so it *will* crop whatever you give it — that is intended
here, unlike `figure.band`, where cropping was the bug. The consequence is the
same either way: **pick card images whose subject sits away from the frame
edges.** `students-studio.jpg` is safe in a card because the card is 3:2 and so
is the file; a 4:5 portrait in that slot would lose its top and bottom.

**RESOLVED 1 Sep 2026 — every image on the site now shows what it claims to.**
The Cost of Valor card used to use `nc5-ai.jpg`, a frame from the NewsChannel 5
story rather than from the film, because that project had no photography of its
own. It now uses `cost-of-valor-cinematic.jpg`, an actual frame from the
cinematic reel. `nc5-ai.jpg` stays where it belongs, on `speaking.html`.

Worth keeping the general warning even though the specific case closed: a card
image that is thematically right and factually wrong is very easy to ship,
because nothing about it looks broken. It survived five days here.

**Rules of thumb**

- `.band` is no longer full-bleed. It shows the whole frame, capped at 1008px so
  its edges line up with the text column. A wide crop of a group photo cuts
  somebody's head off; that's exactly what it used to do.
- Images in a `.plate-pair` must share an aspect ratio.
- **Every `<img>` needs `width` and `height` attributes** giving the *intrinsic*
  pixel size of the file in `src` — not the display size. `img{height:auto}` in
  site.css means the CSS still controls how big it renders; the attributes only
  tell the browser the aspect ratio so it can reserve the space before the file
  arrives. Without them the homepage grew 507px as images loaded and text slid
  out from under the reader. Every page measured a 0px shift when last checked;
  adding an image without these attributes puts that back. The same reasoning is
  why the video grid on the TEDx project page wraps each iframe in a fixed 16:9
  `.video` box — thirty embeds with no reserved height would be the worst version
  of this bug the site has had.
- **`sizes` must match the real box width**, or the browser picks the wrong
  source file. The hero declared `400px` for a box that measures `460px`, and
  the credits band declared `100vw` for a box capped at `1008px`. Measure with
  `getBoundingClientRect().width` rather than guessing from the CSS.
- Every image needs real `alt` text. All of them currently have it.
- JPEG only. If you have a PNG photo, convert rather than renaming the `src`.
- Credit the photographer in the caption using `<span class="credit">`.

**Watch out:** files you attach in chat get copied into this folder
automatically, originals and all. Delete strays before committing — a 3.7MB PNG
nearly ended up in git history permanently.

## Check images before committing

These three checks caught two real bugs during the 27 Aug batch — a ragged pair
and a wrong dimension — neither of which was obvious by eye on a laptop. Run
them from the repo root after adding or swapping any image.

```python
import re, glob
from PIL import Image

files = glob.glob('*.html') + glob.glob('projects/*.html')

# 1. Every <img> declares width and height
for f in files:
    h = open(f).read()
    tot = len(re.findall(r'<img ', h))
    ok  = len(re.findall(r'<img [^>]*width="\d+" height="\d+"', h))
    if tot != ok: print(f'{f}: only {ok}/{tot} have dimensions')

# 2. Declared dimensions match the actual file (wrong ones defeat the purpose)
for f in files:
    for m in re.finditer(r'<img src="(?:\.\./)?(images/[^"]+)"[^>]*width="(\d+)" height="(\d+)"', open(f).read()):
        p, w, ht = m.group(1), int(m.group(2)), int(m.group(3))
        if Image.open(p).size != (w, ht):
            print(f'{f}: {p} declared {w}x{ht}, actually {Image.open(p).size}')

# 3. Both images in a .plate-pair share an aspect ratio
for f in files:
    for pair in re.findall(r'<div class="plate-pair">(.*?)</div>', open(f).read(), re.S):
        imgs = re.findall(r'src="(?:\.\./)?(images/[^"]+)"', pair)
        if len(imgs) == 2:
            r = [w/h for w, h in (Image.open(i).size for i in imgs)]
            if abs(r[0]-r[1])/max(r) >= 0.08: print(f'{f}: ragged pair {imgs}')
```

Then look at the page at ~390px wide. The checks catch arithmetic; they don't
catch a face cropped out of frame.

## Rights

The Tiffany L. photographs are used with her permission; watermarks were cropped
and she's credited on-page. The Peter Pan playbill is the production's
promotional artwork — standard practice for illustrating a credit, but it isn't
Nathan's image. A still from the performance video would be safer if that ever
matters.

**Added 27 Sep 2026** — screenshots of the Nashville Film Festival site, cropped
from Nathan's own browser captures. Both are on `speaking.html`, first entry
under Selected talks.

| File | Where | Notes |
|---|---|---|
| `nff-creators-conference.jpg` | Speaking, thumbnail | Festival hero art with "2026 Creators Conference". Browser chrome and site nav cropped out. 760×321, no `-sm` needed |
| `nff-ai-panel.jpg` (+ `-sm`) | Speaking, plate inside the same entry | The program listing: panel title, description, Nathan as moderator. Cropped above the first panelist so nobody else's photo is on the site |

**27 Sep 2026** — `og-card.jpg` and `og-card-profile.jpg` had "Associate
Professor of Media Production" baked into the image. Repainted with the new
title (Poppins Regular, same size, colour and baselines as the original text).
`og-card-diagnostic.jpg` carries no title and was left alone.
