# CLAUDE.md — context for working on nathaneadam.com

Read this before changing anything. It records decisions that were expensive to
reach, facts that were verified against primary sources, and a few traps in the
local setup.

Last updated: 1 September 2026, third session — **the site was turned into a
funnel for the diagnostic, and student testimonials went on.** Every one of
the 23 pages now asks the same thing in the same words, "Take the AI Career
Diagnostic"; the email became the second ask; five "nothing to sell" lines
were rewritten so they stay true the day a course exists; student voices
from thirteen years of course evaluations went on `index.html`, `about.html`
and the gate. See "The funnel" below, and `FUNNEL-PLAN.md`. **Two rules from
that section are the easy ones to break: the testimonials carry NO names,
on purpose, and the callout copy lives in exactly two places.** Still
unverified visually — Chrome will not open `file://` and the built-in
browser cannot either — so the phone check now covers the homepage and the
callouts as well as the diagnostic.

Earlier that day: **the site got its first
interactive tool.** `tools.html` plus a ten-question career diagnostic at
`tools/career-pivot.html`, Tools in every nav and footer, twenty-one sitemap
URLs, and two pre-existing broken footers fixed on the way past. Committed as
`44d1a24`. **Nobody has seen it rendered on a phone yet** — that is the first
job in a new session. See "The tools section" below before touching any of it,
especially the two rules that are easy to undo by accident: the copy all lives
in `tools/content.js`, and the thing must never start scoring people.

Earlier the same day (the Cost of Valor stand-in image replaced with a
real frame, so nothing on the site depicts something it isn't; both
bio-correction emails drafted and waiting on addresses; the two Amazon book
listings read, which closed three open questions and turned up two 2007 trade
notices and one wrong ISBN; and a second round of answers from Nathan that
named Brady Barnett as the Multi-Platinum.com co-founder and dated the LANDR
course and the Norville segment).

31 August, second session: the newsletter form wired to beehiiv and styled to
match; a second voice pass across the twelve project pages the first one only
skimmed; the Cost of Valor trailers moved to Nathan's own YouTube channel and
that page rewritten from a press release into his voice; the AI models used on
that film recorded; and the email-authentication job properly scoped for the
first time.

31 August, first session: a voice pass across every page, driven by a
writing profile built from the *Multi-Platinum Pro Tools* manuscript and four
years of sent email and saved as the `my-writing-style` skill; eight
`TODO (Nathan)` blocks closed with sourced facts; four wrong or unsupportable
claims corrected; every press source finally archived; five more photos placed;
and the discovery that the old DreamHost files are gone.

**If you are starting a new session, read "State as of 1 September 2026" near the
bottom first, then "Editorial rules". Load the `my-writing-style` skill before
drafting any copy.**

---

## What this is

A four-page static site. No framework, no build step. Plain HTML, one stylesheet,
and one small script for the mobile menu. That is deliberate: Nathan publishes
weekly and should never be blocked by a toolchain that rotted.

The Poppins webfont (Google Fonts) and the TED embed are the only outside
fetches; see the file list below. Everything else is local.

```
index.html        Homepage — positioning, proof bar, story, newsletter signup
about.html        The long story, 1999 to now
credits.html      Production, engineering, publishing, curriculum, teaching
speaking.html     TEDx embed, topics, talk history, press, booking
projects.html     Index of the long-form project write-ups
404.html          Branded not-found page. Vercel serves it automatically.
tools.html        Index of the interactive tools. Added 1 Sep 2026.
tools/            Interactive tools. Same ../ asset convention as projects/.
  career-pivot.html         The diagnostic: questions + the free read
  career-pivot-result.html  The gated full read. NOINDEX, and absent from
                            sitemap.xml on purpose — it is meaningless
                            without the answers in the visitor's own browser.
  content.js                EVERY WORD the visitor reads. Edit text here.
  diagnostic.js             Logic only. No copy in it.
  DIAGNOSTIC-DESIGN.md      Why the questions are the questions.
projects/         One page per project. Same template as the top-level pages
                  but with ../ asset paths — see CSS conventions below.
  cost-of-valor.html
  tedx-nashville.html      ~30 embedded talks in a grid
  grammy-camp.html
  ma-media-entertainment.html
  presleys-country-jubilee.html   ┐
  deborah-norville.html           │
  peter-pan.html                  │
  learn-master-guitar.html        │ Added 27 Aug 2026. One page per
  multi-platinum-com.html         │ substantive credits.html entry, so every
  live-from-virtual-reality.html  │ credit title on that page now links
  multi-platinum-pro-tools.html   │ somewhere. See "The credits build-out".
  mixers-toolkit.html             │
  covid-dissertation.html         │
  landr-pro-tools.html            ┘
css/site.css      Every style for every page
js/nav.js         Mobile menu toggle — the only script, loaded on every page
sitemap.xml       Twenty-one URLs, hand-maintained. New page means a new entry
                  here. career-pivot-result.html is deliberately absent.
robots.txt        Allows everything, points at the sitemap
images/           See images/README.md
press-archive/    Local text captures of articles the site links to. Gitignored
                  and never published — third-party copyright. See its README.
```

**Pages in `projects/` are one directory down**, so their `<link>`, `<script>`
and nav hrefs use `../`. Copying a top-level page as a starting point without
fixing those gives an unstyled page with dead navigation. The `404.html`
root-relative convention is a separate case — see **CSS conventions**.

**The only external things the browser fetches** are the Poppins webfont from
Google Fonts (every page), the TED embed on `speaking.html`, and — added
27 Aug 2026 — roughly thirty video embeds on `projects/tedx-nashville.html`
(29 YouTube, 3 TED). The `og:image` files are local. Nothing else phones home —
no analytics, no tag manager, no CDN scripts.

**The video embeds are the one place that policy bends, deliberately.** Two
things keep them from costing what they normally would:

- `youtube-nocookie.com`, not `youtube.com`, so nothing is set until a visitor
  actually presses play.
- `loading="lazy"` on every frame. Thirty eager iframes would fire thirty
  third-party requests before first paint. Removing it would be the single
  worst thing anyone could do to that page's load time.

If a privacy or performance review ever wants them gone, the replacement is a
click-to-load facade: a local thumbnail that swaps itself for the iframe. That
costs 30 more image files and some JS, which is why it wasn't done first.

## Deployment

| | |
|---|---|
| Source of truth | `~/Library/CloudStorage/Dropbox/nathaneadam-site` |
| GitHub | `github.com/nathaneadam/nathaneadam-site` (public) — **moved 26 Aug 2026** from `nathaneadam-del` |
| Host | Vercel, project `nathaneadam-site`, team slug `nathan-ea-dam` |
| Deploys | Automatically on push to `main`. ~1 minute. |
| Preview URL | `nathaneadam-site.vercel.app` |
| Live | `nathaneadam.com` → 308 → `www.nathaneadam.com` |

**Nathan pushes, not Claude.** Auth lives in his macOS keychain via GitHub
Desktop. Claude can commit locally; the push is his click.

### The repo move broke Vercel — 27 Aug 2026

The repo was moved from the `nathaneadam-del` account to `nathaneadam`. GitHub
redirects the old URL, so **git kept working and hid the problem**: pushes
succeeded, `git ls-remote` against either URL returned the same commits, and
nothing in the terminal suggested anything was wrong.

Vercel broke silently. Its project was still linked to
`nathaneadam-del/nathaneadam-site`, and Settings → Git showed
**"Error: Project Link not found."** The webhook stopped firing, so pushes
produced **no deployment at all** — not a failed one. The Deployments list
simply stopped at `7e2a099` (24 Aug) while three later commits sat on `main`.

**How to recognise this again.** The tell is a stale live site with *no*
corresponding failed build. If a deploy had broken, there would be a red entry
in Deployments. An empty list past a certain date means Vercel never heard about
the push at all — look at Settings → Git before debugging anything in the code.
Checking production against the `nathaneadam-site.vercel.app` preview is the
fast confirmation: if both serve identical stale content, it is not DNS, not
caching and not the domain.

**What actually fixed it — and what didn't.** Two separate faults were stacked,
which is why the first two attempts failed.

1. **GitHub side.** The Vercel GitHub App *was* installed on `nathaneadam`, but
   its Repository access was **"Only select repositories"** with just
   `showrunner-review` ticked. Vercel could not see `nathaneadam-site` at all.
   The trap: that option's fine print says *"Also includes public repositories
   (read-only)"*, and this repo **is** public — so it looks like it should be
   covered. Read-only is not enough. Vercel needs write access to register the
   deploy webhook. Fixed at `github.com/settings/installations` by switching to
   **All repositories**.

2. **Vercel side. `Reconnect` did not work.** It cleared the red error and
   displayed the right repo, but the card still read *"Connected Aug 23"* — it
   had restored a stale link record without registering a webhook. Pushes still
   produced nothing. What worked was **Disconnect, then connect fresh**:
   Settings → Git → Disconnect → GitHub → pick `nathaneadam/nathaneadam-site`.
   Deployment history, domains and DNS all survive; only the Git link is rebuilt.

**Connecting the repo does not deploy anything.** Vercel waits for the next
push. After reconnecting, the site stayed stale until a new commit went up —
which looks exactly like the connection still being broken. Make a commit and
push it before concluding anything is wrong.

Both steps are account-permission changes, so they are Nathan's clicks, like the
push.

### DNS — read before touching

DNS stays at **DreamHost**. Nameservers are deliberately *not* delegated to
Vercel. Only two records point at Vercel:

- apex `A` → `216.198.79.1`
- `www` `CNAME` → `05b8bf420d1ec53b.vercel-dns-017.com`

Everything else in that zone is Google Workspace and **must not move**: the
`aspmx.l.google.com` MX record plus `calendar`, `docs`, `mail`, `sites` and
`start` CNAMEs to `ghs.googlehosted.com`. If Vercel offers to take over the
nameservers, decline — moving the zone means recreating the MX by hand, and
missing it kills his email.

### Zone as actually observed, 24 Aug 2026

Queried against public resolvers rather than read off the DreamHost panel, so
this is what the world sees:

| Record | Value | Verdict |
|---|---|---|
| NS | `ns1/2/3.dreamhost.com` | As intended — not delegated to Vercel |
| A (apex) | `216.198.79.1` | Matches |
| `www` CNAME | `05b8bf420d1ec53b.vercel-dns-017.com` | Matches |
| MX | `0 aspmx.l.google.com` | **Mail survived the migration** |
| `mail` CNAME | `ghs.googlehosted.com` | Present |
| `calendar`, `docs`, `sites`, `start` | NXDOMAIN | **Gone.** Vanity redirects only; low impact, but the zone lost them |
| SPF (TXT at apex) | none | **Missing** |
| DKIM (`google._domainkey`) | none | **Missing** |
| DMARC (`_dmarc`) | none | **Missing** |

**The good news: `nathan@nathaneadam.com` receives mail.** The MX points at
Google Workspace and `aspmx.l.google.com` resolves. The thing most at risk during
the Vercel move came through. That said, it's a *lone* MX at priority 0 — Google's
own setup is either five records or the modern single `smtp.google.com` at
priority 1. One record works but has no failover.

**The bad news: the domain cannot authenticate outbound mail.** No SPF, no DKIM,
no DMARC. Since February 2024 Gmail and Yahoo require all three from bulk senders,
and even one-to-one mail from an unauthenticated domain gets filtered hard. This
matters right now for two reasons: the speaking page's booking CTA sends replies
from this address, and the whole launch plan is a weekly newsletter.

**Do not act on this paragraph alone — see "Email authentication" under the state
section for the actual job.** The short version, corrected 31 Aug 2026: three
records at the apex fix Nathan's *Google Workspace* mail, and one of the three
cannot be written until a DKIM key is generated in the Workspace admin console.
The *newsletter* is a separate path. It only needs DNS at all if it should send
from his own domain rather than beehiiv's, and if so it is twelve records on a
subdomain, not three at the apex. Conflating the two is how a domain ends up with
two SPF records, which is worse than having none.

`nathaneadam.com` at DreamHost is set to **DNS Only** (hosting removed 23 Aug
2026). A pre-migration zone snapshot is in `DNS-BACKUP-before-vercel.txt`,
gitignored on purpose.

**The old site's files are gone — verified 31 Aug 2026.** An earlier version of
this file said his old files "still sit in `/home/adnstudios/nathaneadam`
including a `projects/` folder". That is no longer true, and anyone planning to
recover an asset from there should stop. Checked directly in the DreamHost panel
(Websites → SFTP Users & Files): **the user list is empty.** There is no
`adnstudios` user, only the Shared Unlimited plan card for `pdx1-shared-a4-04`,
which serves the two `thetorchbearer.org` subdomains. Removing hosting from the
domain took the SFTP user and its home directory with it.

Two follow-ons. **The "rotate the plaintext SFTP password" item is moot** — that
user no longer exists; it is struck from the list below. And **anything that
only existed on the old site is now only recoverable** from Nathan's own local
backups, from `web.archive.org` (blocked from the Cowork sandbox, so he has to
check it himself), or from a DreamHost support ticket if their backup retention
window is still open. The known casualty is a photo of Nathan with Cathy Rigby
that `projects/peter-pan.html` wants — see its TODO.

---

## Local setup traps

**Dropbox and git fight over `.git`.** Committing from a Linux sandbox leaves
`.git/*.lock` and `tmp_obj_*` files behind because Dropbox blocks the unlink.
Leftover lock files make git refuse later operations. After any sandbox commit:

```bash
find .git \( -name "*.lock" -o -name "tmp_obj_*" \) -delete
```

Deleting inside this folder needs the Cowork delete grant first
(`allow_cowork_file_delete`). GitHub Desktop writes natively and never hits this.

**Attachments auto-copy into `images/`.** Files the user uploads in chat appear
in `images/` alongside processed versions, originals and all. A 3.7MB PNG nearly
went into git history this way. Always `rm -f images/*.png images/*.jpeg` and
check `git status` before committing.

**Never commit `DNS-BACKUP-*.txt`.** Gitignored. It's an infrastructure inventory
and the repo is public.

---

## Findability and sharing — added 24 Aug 2026

A visitor-perspective review found that the design was finished but the plumbing
around it wasn't. Four things were fixed. Each is easy to undo by accident.

**`og:image` — the site had none.** All four pages declared
`twitter:card = summary_large_image` and supplied no image, so every link shared
to LinkedIn, X, Slack or iMessage rendered as a grey box. Two 1200×630 cards now
live in `images/` (see `images/README.md`). **The URL must be absolute.** A
relative path is silently ignored by every platform, which is how this went
unnoticed. Any new page needs the `og:image`, `og:image:width`, `og:image:height`
and `twitter:image` block copied across.

**Zero layout shift, and it must stay zero.** No `<img>` had `width`/`height`
attributes, so nothing reserved space and pages grew as images loaded — the
homepage by 507px, credits by 279, speaking by 225. Text slid out from under the
reader mid-scroll. All 24 images now carry their intrinsic dimensions and every
page measures **0px**. This is the easiest thing on the site to regress: one
`<img>` added without the attributes brings it back. The check:

```js
// with the page loaded
const before = document.body.scrollHeight;
[...document.images].forEach(i => i.loading = 'eager');
// wait ~1s, then
document.body.scrollHeight - before;   // must be 0
```

**Structured data.** `index.html` carries a JSON-LD `Person` block. Most of this
site's traffic will be people searching Nathan's name, and this is what Google
reads to build a knowledge panel. **The editorial rules below apply to it as much
as to visible copy** — every field traces to a source. Deliberately absent: the
doctorate's institution (not documented anywhere pointable) and any camp or
student count (those belong in prose, where they can be qualified). Don't put a
claim in the schema that isn't already on the page.

**External links open in a new tab.** All 15 of them (`target="_blank"
rel="noopener"`). They used to navigate away in the same tab, which meant a
visitor reading the proof section clicked one press link and the visit ended.
Internal links and `mailto:` are deliberately left alone.

**A note on the press links.** The Jamie Dunham interview, linked twice from
`speaking.html`, describes Nathan as an *assistant* professor with *"more than
100 Grammy camps"* — both of the numbers the editorial rules below exist to
correct. Nothing to fix in the markup; it needs fixing at the source. Same for
the Belmont faculty page. Worth re-reading a press link before adding it.

## Editorial rules

These exist because the numbers in Nathan's published bios contradict each other.
Hold the line.

- **Every claim traces to a source.** The talk list comes from his 2023 tenure and
  promotion CV. Press links were opened and verified. Nothing goes on the site
  that can't be pointed at.
- **Conservative numbers.** "50+ GRAMMY Camps" — his real count is 53 and rising.
  "25 years" of teaching, counted from Labette in 2001, not 26. Other published
  bios say 60+ and 100+ camps; those are wrong.
- **Awards attributed precisely.** The Telly for *Learn & Master Guitar* belongs
  to Legacy Learning Systems. The Acoustic Guitar Player's Choice Gold Award is
  on the box.
- **No unlinked press claims.** If there's no findable article, it stays off.
- **Photo credits.** Tiffany L. shot the GRAMMY Camp photos and is credited in the
  captions. Permission granted verbally; watermarks were cropped.

## Verified facts — don't re-research these

- **MEIEA 2026**, Denver, March 19–21. *The Assessment Pivot: Using Generative AI
  to Restore Academic Integrity.* Published in the Summit Proceedings —
  `meiea.org/resources/Proceedings/2026/MEIEA%20Summit%202026%20Adam.pdf`
- **MEIEA 2023**, Las Vegas, 23 March. A paper on audio faculty teaching through
  COVID, plus a roundtable, *The Computers Took Over at Midnight*.
- **MEIEA 2010** — he has presented there for sixteen years.
- **Utility Analytics Summit**, Nashville, 9 April 2024, 4:15–5:30pm. *Keynote,*
  General Session 1: *AI in Music: Revolution or Replacement?*
- **NewsChannel 5**, 18 April 2023, reported by Hannah McDonald. He was the
  story's expert.
- **WPLN** *This Is Nashville*, 25 May 2023. Billed first among five guests.
- **AES is a publication, not a talk** — *AES Journal Conference Summary*, 2016.
  His Belmont bio implies he presented at AES. Nothing supports that.
- **Career timeline**: BBA 1999 and MBA 2000 (Pittsburg State) → Labette
  Community College, chair of commercial music, 2001–2003 → MTSU 2003–2010 →
  Belmont 2010–present. He did *not* move to Nashville in 2000.
- **Peter Pan** was the Mansion Theater production in Branson, Missouri.
  `youtube.com/watch?v=K1PBskGJVl0`
- **TEDxNashville board member**, and he produced multicam shoots for other
  people's talks. The full list of talks he produced and edited is on
  `projects/tedx-nashville.html` — 34 speakers, 32 with verified links.
- **GRAMMY Foundation curriculum author** — *GRAMMY Career Pathways* (2018) and
  *GRAMMY Camp: Weekends* (2016).
- **The TEDx talk was 13 November 2017.** "Society of Fellows" and "Salon" are
  **both correct and not a contradiction** — confirmed by Nathan. The Society of
  Fellows was the event; "Salon" was TEDxNashville's name at the time for the
  smaller event format. The 2017 Belmont News piece uses the former, the site
  uses the latter. Don't try to reconcile these again.
- **His titles have changed, and old ones are not errors.** Assistant Professor
  of Audio Engineering Technology (2017, per Belmont News) → Professor of
  Emerging Media (2023, per WPLN) → Associate Professor of Media Production
  (2023–Sep 2026) → **Associate Professor of Film, Television, and Media
  Production** (current; confirmed by Nathan 27 Sep 2026 and changed on all
  23 pages, the JSON-LD, and both og cards that carry a title). All were
  accurate when published. This is
  separate from the genuinely wrong titles in circulation — see the editorial
  rules above; the problem ones are *"assistant professor of cinema, television
  and emerging media"* (Jamie Dunham) and the Belmont faculty page's claims.
- **GRAMMY Camp Weekends 2017** ran in San Antonio, San Diego and Los Angeles,
  with Best Buy Teen Tech Centers and the Boys and Girls Club, 80+ students
  across three tracks. Source: the 2017 Belmont News piece. Not yet on the site.

- **Nashville Film Festival Creators Conference, 25 Sep 2026.** Moderated the
  opening panel, *Balancing Innovation and Artistic Rights: AI in Music & Film*,
  10–11am at NMAAM, presented by Belmont's Curb College. Panelists: Jackie Jones
  (RIAA), Marc Rucker (SoundExchange), Charles Alexander (Launcher, ViNIL), Nikki
  Hexum (Human Consent Foundation). Source: the festival page, read 27 Sep 2026.
  On `speaking.html`. **No archive link yet** — Nathan to submit the URL to
  web.archive.org/save. The festival bills him as "Associate Professor of Film,
  Television, and Media Production"; the site keeps its own shorter title.

### Added 31 Aug 2026 — all confirmed by Nathan directly

- **Presleys' Country Jubilee: 2009–2015, episodes 1 through 142**, all cut by
  him personally, no post team. The site previously said the vague "140+"; use
  the exact 142. The show has since run twelve seasons, so his were the first
  six years, not the whole run. Official page: `presleys.com/rfd-tv`.
- **Peter Pan: 2009**, Mansion Theater, Branson. He **recorded, edited and
  mixed** the orchestral score — the site had said only "mixed" in one place and
  "recorded and mixed" in another, both underselling it. Tracked at the Mansion
  Studios on site. Orchestra size still unknown.
- **Gibson's Learn & Master Guitar: produced 2005–06. Ten discs, fourteen hours.**
  He shot *and* edited the whole series. Steve Krenz taught on camera.
  **TRAP:** `learnandmaster.com/guitar` currently advertises **20 DVDs, 40+
  hours, two Tellys and an AEGIS Award** — that is the CURRENT expanded edition,
  not his. Never import those numbers onto his pages.
- **The Telly is not a conflict.** The award was for educational video
  production; Nathan produced the entire series; Legacy Learning Systems
  submitted the entry and therefore holds the award. His 2023 CV's "Telly Award
  Winning Audio & Video Producer" is accurate and needs no correction. Both
  halves are now stated together on `credits.html` and the project page —
  either alone misleads.
- **Live from Virtual Reality: a Facebook Live series, 2017–2018, produced
  inside Facebook Spaces.** Two different products: Spaces is where it was made,
  Live is where it went out. Facebook Spaces shut down in 2019.
- **The LANDR course is one course, renamed.** It launched as *Producing
  Electronic Music in Pro Tools* (the CV title) and LANDR retitled it *Getting
  Started with Pro Tools* (the live title). Corroborated by LANDR's own preview
  URL, which still carries `courseid=edm-pro-tools`. Co-taught with Anthony
  Falcone, 102 lessons, ~4 hours. Production year still unknown.
- **The Jubilee guest artists were guests on the show**, not separate
  engineering credits. Nathan's 2011 author bio lists them as "albums, tracks,
  TV and radio spots for artists including…", which reads as separate session
  work and is misleading. They live on the Presleys page with the distinction
  stated outright. See open item 7 above re: "Carrie Tillis".
- **Both books' publisher pages** are now the citation of record, replacing
  ISBN-only references: `shop.elsevier.com/books/multi-platinum-pro-tools/adam/978-0-240-52023-0`
  and `shop.elsevier.com/books/pro-tools-9-the-mixers-toolkit/adam/978-0-240-81870-2`.
  *Multi-Platinum Pro Tools*: 8 chapters, 300+ colour illustrations, DVD with a
  real Nashville session in both pre-edited and final-mix form. *The Mixer's
  Toolkit*: 19 April 2011, 12 chapters, garage demo to radio-ready rock mix,
  with an interactive companion **website** rather than a disc. That
  DVD-to-website shift between the two books is a real argument and is now a
  section on the Mixer's Toolkit page.
- **Elsevier's own TOC misspells chapter 8 of the Mixer's Toolkit as "Vical
  Mixing".** Their typo, in print since 2011. Not ours to replicate.

### Added 1 Sep 2026 — from the two Amazon listings

- **Page counts:** *Multi-Platinum Pro Tools* **320 pages**; *The Mixer's
  Toolkit* **260 pages**. Both paperback, both Focal Press 1st editions.
- **The Mixer's Toolkit ISBN-13 is 978-0-240-81870-2.** The site had
  **978-0-240-81871-9** in two places and both were wrong; corrected 1 Sep.
- **Neither book is in print.** Both are used-only on Amazon. The first goes
  from **$3.02**; the second from **$48.82** with "only 1 left in stock". That
  inversion — shorter, newer book worth fifteen times the older one — is now a
  section on each page, with the probable dull explanation (smaller print run)
  stated rather than a flattering one.
- **Ratings:** 4.9 from 10 for the first, 4.6 from 38 for the second.
- **Two 2007 press notices, both about the FIRST book:** Barry Rudolph's *New
  Toys* column (April 2007) and *Lighting & Sound* (January 2007).
  **TRAP: Amazon files both blurbs under BOTH books.** They cannot be about the
  Mixer's Toolkit, which came out four years later, and the Rudolph one names
  *Multi-Platinum Pro Tools* outright. They live on
  `projects/multi-platinum-pro-tools.html` and both pages carry a comment
  saying not to move them.
- **`web_fetch` returns an empty shell on Amazon** and Chrome timed out on it.
  The built-in browser read both listings without trouble. Worth knowing before
  anyone spends time debugging the fetch.
- **The dissertation's method**, from the TSU repository abstract: a qualitative
  study, online survey of **25 faculty** plus follow-up focus groups, spanning
  spring and fall 2020, framed with **Community of Inquiry** (teaching, social
  and cognitive presence). The findings themselves are still not public.

---

## CSS conventions

One stylesheet, ten pages: six at the top level (`index`, `about`, `credits`,
`speaking`, `projects`, `404`) and four in `projects/`. A change to a token hits
every one of them — check more than one after editing, and check a project page
as well as a top-level page, since those resolve their assets differently.

**`404.html` links with root-relative paths** (`/css/site.css`, `/js/nav.js`,
`/about.html`) while the other four use relative ones. That's deliberate and must
stay: the 404 renders at whatever path the visitor typed, so a visitor landing on
`/projects/old/thing` would resolve `css/site.css` against `/projects/old/` and
get an unstyled page. The old DreamHost site had a `projects/` folder, so this is
a real path people will hit.

Design tokens live on `:root`: `--ink`, `--ink-soft`, `--paper`, `--paper-2`,
`--line`, `--deep` (navy), `--accent` (rust), `--cta` (orange), `--sky`.

**Typography — Poppins, changed from Georgia on 24 Aug 2026.** Nathan asked for a
sans to match grahamcochrane.com. Headings and display type use
`var(--font-display)`; body uses `var(--font-body)`. Never hardcode a font family
— every one of the eleven old `Georgia,serif` declarations now points at a token,
so the whole site changes from one line.

It is loaded from Google Fonts in all **five** `<head>`s with `display=swap` and
preconnects. The no-build-step rule still holds. The fallback stack after Poppins
is the system sans, deliberately — if Google is unreachable the site degrades to
a different sans, never back to a serif, so nothing about the layout shifts.
Removing the dependency means deleting three `<link>` tags per page and dropping
`"Poppins",` from one token.

Heading tracking is `-0.02em`, tighter than Georgia's `-0.01em`, because Poppins
is a wide geometric face and falls apart at display sizes without it.

Layout classes, in the order they were added:

| Class | Use |
|---|---|
| `.wrap` / `.wrap-wide` | Page gutters, 1060px max. Every left edge lines up. |
| `.pagehead` | Interior-page header, replaces the homepage hero |
| `.proof` | The horizontal stat bar |
| `figure.plate` | One photo with caption, inline in prose, 760px max |
| `.plate-pair` | Two photos side by side, stacks under 640px |
| `.credits li.with-shot` | Thumbnail beside a credit entry, stacks under 640px |
| `.band` | Big photo, uncropped, aligned to the text column. Used once, on `credits.html` |
| `.credit` | Photographer credit inside a caption |
| `.topics` | Two-column grid on the speaking page |
| `.topbar--dark` | Navy header. Homepage only |
| `.navtoggle` | Hamburger button. Hidden above 760px |
| `.herowrap` | Full-width navy band around the homepage hero |
| `.hero-figure` | Portrait plus the credential line beneath it |
| `.herocred` | Name and title under the portrait |
| `.logostrip` | "Featured in and on stage at" wordmarks |
| `.btn-cta` | The single orange call to action |
| `.notfound-links` | The page list on `404.html`. Used nowhere else. |
| `.videogrid` | Grid of embedded talks. Each cell reuses `.video`, which fixes 16:9 — that is what keeps layout shift at zero with ~30 iframes. Never swap it for a fixed height. |
| `.projectgrid` / `.projectcard` | Card grid on `projects.html`. Thumbnails crop to 3:2 with `object-fit:cover`, so unlike `.band` a wide crop here is intended — but pick images without faces at the frame edges. |

**Pair images must share an aspect ratio** or the columns run ragged. That's why
`early-guitar.jpg` and `console.jpg` are both square, and the Walnut House pair
are both 4:3.

**`.band` is no longer full-bleed** (changed 24 Aug 2026). It used to be `width:100%`
at a fixed 220–420px height with `object-fit:cover`, which on a wide monitor turned
`students-studio.jpg` (1600×1066, 3:2) into a ~4.6:1 letterbox — two thirds of the
height gone, heads cut off at both the top and the bottom of the frame. That photo
has faces at the very top *and* the very bottom, so no wide crop of it works. It now
shows the whole frame at `max-width:1008px`.

**1008px is not arbitrary**: it is the 1060px `.wrap` minus its two 26px gutters, so
the image's edges land exactly on the text column's edges. If the wrap width or
gutter ever changes, this number has to change with it.

### The padding-shorthand trap

`.pagehead` is always written `class="pagehead wrap"`. `.wrap` supplies the gutter as
`padding:0 26px`, and `.pagehead` used to say `padding:64px 0 44px` — same
specificity, later in the file, so its shorthand silently reset left/right to 0. The
header text on all three interior pages sat 26px left of every other left edge. Fixed
24 Aug 2026 by switching to `padding-top`/`padding-bottom` longhands.

**Any rule that also carries `.wrap` must use padding longhands.** A `padding`
shorthand will eat the gutter and break the alignment the whole site is built on.
Verified after the fix: eyebrow, h1, lede, proof bar, band image and credit headings
all report the same `getBoundingClientRect().left`.

### Responsive

Breakpoints at 820px (hero), 760px (nav), 700px (type and spacing), 640px (photo
pairs and credit rows), 560px, 420px.

**The nav is the thing to not break.** It was originally `display:none` under
760px, which left phones with no navigation at all.

It is now a **hamburger** below 760px (added 24 Aug 2026, to match
grahamcochrane.com), and the header stops being sticky on small screens. The
collapse is deliberately gated on `.js-nav`, a class `js/nav.js` puts on `<html>`:

- Script runs → `.js-nav` exists → nav collapses behind the button.
- Script fails or is blocked → no `.js-nav` → the nav just stays visible and
  wraps, exactly as before.

**Never write the collapsed state as an unconditional `display:none`.** That is
the original bug, and the gate is what stops it recurring. Verified at 390px:
button toggles, `aria-expanded` flips, icon morphs to an X, all four links reachable.

`nav.js` also closes the menu when a link is tapped, so the `#join` anchor doesn't
scroll away underneath an open menu.

Images use `srcset`/`sizes` with `-sm` variants at 700px wide, generated with
Pillow at quality 80. Phone page weight is roughly half desktop. Skip the variant
when the full file is already under ~780px — pointless bytes.

---

## Homepage sections added 27 Sep 2026

Nathan asked what from grahamcochrane.com was worth borrowing. Three sections
went on `index.html`, copy from his taste-interview answers (Personal Brand
project doc `claude/taste-interview-log.md`), beats approved before copy:

- `#problem` "Nobody is born a tech person." After the student quotes, before
  the story. States his real thesis (everyone who uses a computer keeps
  learning its tools; AI is the newest one), which the hero headline does not.
- `#ladder` "Twenty minutes, then twenty hours." After the story, before the
  diagnostic callout. The 20 min → 20 h → 100 h → 2,000 h ladder and the
  5%ers / 80%ers split. **The 5% figure is his classroom gut, about one
  student in twenty, and the copy says so. Never present it as research.**
  Both COVID-story students stay unnamed, by his choice.
- `#bio` "Introducing me at an event?" Above the signup. Long and short bios
  in third person, wording approved by Nathan. **This is the canonical bio.**
  Every fact is in the verified list above; "award-winning" is deliberately
  absent.

Graham's offer grid, challenge and podcast sections were skipped on purpose:
nothing is for sale yet, and there is no YouTube episode 1. Named endorsements
wait on consented quotes. CSS is appended at the end of `site.css`, scoped to
`.ladder-steps` / `.bio-*`. Rendered at 1280 and 390px: 0px layout shift, no
horizontal scroll.

## The tools section — built 1 Sep 2026

`tools.html` plus `tools/career-pivot.html`, a ten-question diagnostic. Twenty-one
sitemap URLs. "Tools" is now in the nav and footer of every page.

**Phone-first is why this tool and not a better one.** The first shortlist led
with a LUFS meter: drop in a mix, get integrated loudness and a verdict against
Spotify and Apple targets, all client-side via Web Audio. Higher search volume
and harder to fake than anything here. Nathan killed it on one observation, which
was right: **most visitors arrive on a phone, and nobody transfers a mix to their
phone to check its loudness.** Same objection removes the delivery-spec checker
and most of the BPM calculator. Anything requiring a file on a desktop is the
wrong shape for this audience. Re-read that before proposing tool ideas again.

**No backend, so no model.** Static site, no build step, no API keys. The tool
cannot read what somebody types and reason about it. It asks good questions and
uses a decision tree. That limit is stated here so nobody "fixes" it later by
adding a serverless function and an API key to a site whose whole premise is that
Nathan is never blocked by a toolchain that rotted.

**IT DOES NOT SCORE ANYBODY, AND MUST NOT START.** No percentage, no personality
type, no "your role is 68% exposed." There is no study behind a number like that
and inventing one is exactly the failure the editorial rules exist to prevent —
on a page whose whole subject is other people's careers. Every read is framed as
Nathan's opinion, and the caveat at the bottom of every result says outright that
it is not research. **Do not remove that caveat.** It uses the Mixer's Toolkit
against him (he was pleased to drop the DVD for a companion website; the website
is long gone and the DVD still works in every copy sold), which is what makes the
rest of the page credible.

**The framework**, for anyone extending it. Work is exposed when it is executing
somebody else's spec, judged on technical criteria, sourced through a
marketplace, priced per deliverable, and describable in words. It is durable when
it involves deciding what good means, being trusted by name, being accountable or
present, and being teachable. Six of the nine track-A questions score against
that. `middle` answers count for neither side on purpose, so a fence-sitter lands
in the middle read.

**Nobody is told they're fine.** The low-exposure read names a different risk
(somebody with the same taste and faster execution underneath, who says yes to
three times the work) rather than congratulating them. A diagnostic that pats
two-thirds of its takers on the head is a horoscope.

**Track B is deliberately unscored.** Every early-career visitor gets the same
read, because the diagnosis genuinely is the same for all of them: the bottom
rung was the *learning* rung. Only the 90-day move changes, and that comes off
the AI-adoption question. Do not add scoring to track B to make it feel fancier.

### The gate — HARD as of 1 Sep 2026

**The second beehiiv form exists and the real gate is live.** `GATE.mode` is
`"beehiiv"` and `GATE.formUuid` is `712946f7-3291-4efe-b002-6c65f0458621`.
The form is named **"Diagnostic gate - career pivot result"**, is separate
from the homepage form (`11848ad5-...`), and its post-subscribe redirect
points at `https://www.nathaneadam.com/tools/career-pivot-result.html`.
**The "Remove emails from the redirect URL" toggle is ON** — beehiiv would
otherwise append the subscriber's address to that URL as a query parameter.
Leave it on.

**The skip link is gone, and it went for the right reason.** In beehiiv mode
subscribing *is* how you reach the result, so nobody dead-ends. If this ever
reverts to `soft`, the skip link comes back with it: a gate that cannot be
enforced must not pretend otherwise.

**Two things settled that this file recorded as unknown.** A Launch-plan form
*can* take a custom redirect (the option is "Redirect to an external website"
under the form's Settings tab) — though note the account was on a **Max
trial, day 2 of 14** when this was checked, so if the redirect option
disappears after the trial that is the reason, and the answer is the soft
gate again rather than a broken one. And beehiiv's menu now *does* have a
**Grow** section; the note below saying it does not is stale.

**An unplanned privacy win.** In beehiiv mode the diagnostic no longer embeds
beehiiv's loader at all — it links out to the hosted form instead. So the
tool now loads **zero** third-party scripts and sets no cookie. Only the
homepage does.

Styling notes, since the gate sits on the light `--paper-2` card and NOT on
the navy band the homepage form lives in: field is white with an `#E0D9CF`
border, `#141618` text, Poppins 17px, radius 5; button is `#EF8C1F` with
`#1B1206` text, Poppins Bold 17px, radius 5. Form width is **Fill**, not the
400px default, so it behaves on a phone. Title and subtitle are switched off,
because `C.gate.heading` and `C.gate.body` already say it.

### The old soft-gate note, kept for the reasoning

Nathan chose a real email gate. The honest mechanism needs one thing that does
not exist yet, so `GATE.mode` in `diagnostic.js` ships as `"soft"`: the subscribe
form shows, with a visible "no thanks, show me the rest anyway" link under it.

**To switch on the real gate, Nathan needs to create a SECOND beehiiv subscribe
form** and set its post-subscribe redirect to
`https://www.nathaneadam.com/tools/career-pivot-result.html`, then paste that
form's UUID into `GATE.formUuid` and flip `GATE.mode` to `"beehiiv"`.

**It must be a second form, not the homepage one.** The redirect is a property of
the form, not of the link, so reusing UUID `11848ad5-…` would send homepage
subscribers to the diagnostic's results page as well. That would be nonsense.

**Never ship `mode:"beehiiv"` before that redirect is configured** — every person
who subscribed would dead-end on beehiiv with no way back to their result, which
is worse than no gate. And never fake it: an unlock button that works whether or
not somebody subscribed is the same species of lie as the old `action="#"` form
that told real visitors their address wasn't saved.

Whether a Launch-plan form supports a custom redirect at all is **unverified**.
If it doesn't, the soft gate is the answer and the tool is already correct.

**One good property of the current build:** the beehiiv loader, and therefore the
site's only third-party tracking, is injected only when somebody reaches the end
of the diagnostic. A visitor who reads the intro and leaves is never tracked. The
homepage cannot say that.

### Two footer bugs fixed in passing

`projects/cost-of-valor.html` and `projects/ma-media-entertainment.html` had
footers with **no Projects link at all**, unlike the other twelve project pages.
Pre-existing, unrelated to this work, found by a coverage count rather than by
looking. Both now carry Projects and Tools like everything else.

### What was verified

The logic was exercised headlessly with jsdom, not by reading it: every read
branch, all seven craft substitutions, all three 90-day variants, both tracks,
the back button, the empty-result state, and a browser with `localStorage`
throwing on access. All 23 HTML files parse under a strict non-recovering lxml
parse. Every class the script emits has a CSS rule. All 39 selectors in the tools
CSS block are scoped to `.q-` or `.tool-`, so none of it can reach the other
twenty pages. Prose em dashes introduced: zero.

**Not verified: how any of it actually looks.** Chrome was not running, and the
built-in browser cannot open `file://`. Nobody has seen this rendered at 390px.
That is the first thing to do next session, and the `.q-card` `min-height` is the
thing most likely to be wrong — it exists so the card does not jump between
questions of different lengths and slide the buttons out from under a moving
thumb.

## The funnel — built 1 Sep 2026

Nathan intends to offer coaching or courses on AI fluency eventually, so the
site's job changed from "professor with a newsletter" to "get people to take
the diagnostic, which collects the email." The plan and the reasoning are in
`FUNNEL-PLAN.md`; the model was grahamcochrane.com, copied for four things
only: one ask in the same words everywhere, a free *thing* rather than "join
my list", the email captured inside the thing, and every page ending on the
ask. Not copied: the offer grid, scarcity, countdowns. **Coaching and
courses stay off the site until something is actually for sale.**

What changed:

- **The nav button on all 23 pages** is `Take the AI Career Diagnostic`
  (`class="nav-cta"`), pointing at `tools/career-pivot.html` with the right
  relative path per directory. Nathan chose that label over the shorter
  "Take the diagnostic". Do not vary the words page to page.
- **The homepage hero's orange button is the diagnostic**; the email is the
  ghost button. The lede now ends with the ask.
- **`.tool-callout`**, one component, on the homepage between the story and
  "What you'll find here" and before the footer of all 18 interior pages
  (`.tool-callout--foot`). **Its copy lives in two places only**: the
  homepage block in `index.html` and the identical block in the 18 interior
  files, which were written by one script from one template. Editing one
  project page's callout and not the other seventeen is the obvious trap.
- **Five "nothing to sell" lines rewritten.** Nathan's correction on the
  first draft: a plain fact, then stop. No clever turn after it. "I have
  tenure, so none of this has to pay the bills by Friday." Full stop. The
  struck lines are recorded in `FUNNEL-PLAN.md` so nobody reinvents them.
- **`404.html`'s primary button** is the diagnostic. A dead URL from the old
  site is exactly a former student.
- **`tools/career-pivot.html` has its own og:image**, `og-card-diagnostic.jpg`,
  because that is the URL Nathan will post to former students. Built from
  `og-card.jpg` with Pillow; Poppins is installed in the sandbox.
- **The gate** got a button label that says what happens ("Send me the full
  read"), one student quote, and the result page a closing block that asks
  the reader to reply to the welcome email with their craft. **The gate is
  still soft** — the second beehiiv form is still Nathan's click.

### The testimonials — READ BEFORE TOUCHING

Nathan supplied 13 years of Belmont course evaluations as one 360-page PDF
(Fall 2013 to Fall 2025, ~4,000 comments). Thirty were shortlisted into
`TESTIMONIALS-SHORTLIST.md` with term, course and the page each came from.
Three are on `index.html` under the proof bar (`.voices`), seven on
`about.html` (`.voices-run`), one at the gate (`C.gate.quote`).

**They are attributed to course and term, never to a name, and that is a
decision, not a gap.** The evaluations are anonymous. Nathan offered a list
of ~80 former students' names to attach to the quotes; it was declined,
because nobody knows who wrote which comment and a guessed attribution on a
public site is a fabrication a real person could spot on their own name.
The one line above the block on both pages says they are anonymous and that
this is why he trusts them. **Do not add names to these.** The honest route
to named testimonials is to email former students for fresh, consented
lines; that email is drafted nowhere yet and is on the list below.

Every quote is verbatim, typos included, with trims marked. The PDF is not
in the repo (it is Nathan's, and it names courses and terms that could
identify students in small sections); it lives in his uploads. **One
attribution caution** is recorded in the shortlist: a Fall 2016 report has
no term on its title page and some of its comments recur inside the Fall
2017 report. Quotes from it are labelled Fall 2016.

**The style profile gained three things from this session**, all saved into
the `my-writing-style` skill (which is the ground truth, not this file):

- **Move 1b, "after a plain fact, stop."** The corollary to the overstate-
  then-walk-it-back move, and the failure that actually happens in practice.
  Overstatement earns a walk-back; a fact that is already carrying the point
  earns silence. Both struck lines are recorded there as examples.
- **Disclosure has to survive its own expiry date.** "Nothing to sell you"
  was struck not because it was false but because it was going to become
  false. The durable version names a structural fact (tenure) instead of
  making a promise about the future.
- **Attribution is a biographical fact.** Do not put a name on words unless
  you know that person said them; the testimonials decision is the worked
  example.

The old stale line in that profile — quoting "I have tenure and nothing to
sell you, which makes me harder to bribe" as live site copy — was corrected
in the same pass.

## Open items

**Design direction — decided and built, 23 Aug 2026.** Nathan asked to restyle
toward grahamcochrane.com. He chose the middle path over a full clone.

Built, over 23–24 Aug:

- Dark navy top bar on the homepage only (`.topbar--dark`)
- Full-width navy hero band (`.herowrap`), portrait right on desktop and centred
  on phones. The portrait originally bled off the bottom edge behind a mask; that
  was dropped on 24 Aug when the credential line moved underneath it.
- One loud orange CTA, `#ef8c1f` with near-black text → the newsletter anchor
- A typographic "Featured in and on stage at" strip (`.logostrip`)
- Poppins throughout, replacing Georgia
- A hamburger menu below 760px (`js/nav.js`)
- Visitor-first hero copy, with the name and title under the photo

Deliberately **not** built at the time: testimonial cards and the three-card
offer grid. **Testimonials went on 1 Sep 2026** once there was a real source
(thirteen years of course evaluations) — see "The funnel" above. The offer
grid stays off until there is something for sale. The professor position is
the asset; don't dress it as a coaching launch before it is one.

All new CSS is appended at the end of `site.css` under its own banner and scoped
to `.topbar--dark` / `.herowrap` / `.logostrip`, so interior pages are untouched.
The exceptions are deliberate and shared: the font tokens, the `.pagehead` gutter
fix and the hamburger, all of which apply site-wide.
The `--cta`, `--cta-hover` and `--sky` tokens are new on `:root`.

Two constraints not to undo:

1. **The CTA button uses dark text (`#1b1206`), not white.** White on that orange
   is ~2.9:1 and fails contrast. This was checked.
2. **The hero bleed reverts below 820px.** A bottom-aligned photo in a stacked
   single column leaves a gap, and the mask is turned off there.

**The specificity trap in `.herowrap` — read before touching the hero.** The base
stacking rule is plain `.hero-grid` (specificity 0,1,0) inside `@media(max-width:820px)`.
Every homepage override is `.herowrap .hero-grid` (0,2,0), which **wins regardless of
the media query**. The first version of this restyle set the desktop two-column grid
without restating `grid-template-columns:1fr` in the mobile block, so phones kept a
two-column hero: the headline broke to five words-per-line and the portrait was
crushed into a side column. Shipped live before it was caught. Every `.herowrap`
override needs its mobile counterpart restated explicitly.

The phone hero is a centred stack, matching the reference: headline, lede capped at
`34ch`, full-width CTA, then the portrait whole at `min(100%,300px)`.

**The credential line moved under the portrait** (24 Aug 2026). It used to be an
`.eyebrow` above the headline — "DR. NATHAN ADAM · ASSOCIATE PROFESSOR OF MEDIA
PRODUCTION, BELMONT UNIVERSITY" — which meant the first thing a visitor read was
Nathan's job title. It is now `.herocred`, sitting beneath the photo in both
layouts, so the headline leads. Nathan asked for this explicitly; don't move it back.

The portrait also stopped bleeding off the bottom edge, because the credit line now
occupies that space. The bottom mask is gone with it — it never worked well anyway,
since `portrait.jpg` has a white TEDx backdrop that faded to white, not to navy.

**Homepage copy is visitor-first, not bio-first.** Rewritten 24 Aug 2026 on the same
instruction. The headline addresses the reader's fear ("It's not too late to reinvent
your career with AI"), and the lede names who the site is for before it says anything
about Nathan. The old lede opened "I spent 25 years…". If the copy gets revised, keep
the second person in the headline — that is the whole point of the change.

**Mobile hero crop — fixed 24 Aug 2026, don't reintroduce.** The base `.hero-shot`
rule forces `aspect-ratio:3/2` below 820px. `portrait.jpg` is 1000×1249 (4:5), so
`object-fit:cover` discarded about 47% of its height and cut the top of his head
off on every phone. This was live for a while. The `.herowrap` override now sets
`aspect-ratio:auto` with `object-fit:contain` and caps the box at 300px wide, so
the photo is shown whole and centred. **Any new photo dropped into the hero must
be checked on a phone** — a fixed aspect-ratio plus `cover` will silently crop
whatever you give it.

The strip is text wordmarks, not logo files — no trademark assets, and every name
is a verified appearance. Adding a name means adding a source.

**The newsletter form — RESOLVED 31 Aug 2026.** Recorded here because the failure
is worth remembering. The hero button, the nav link and the whole bottom section
all funnel to `#join`, and for a week that form posted to `action="#"`. It was
worse than saving nothing: submitting it returned *"Preview mode — the form is
not connected yet. Your address was not saved."* on the live site, to a real
visitor who had just done the one thing the page asks of them. Found by actually
submitting it against production on 24 Aug rather than by reading the markup,
which is the only reason it was found at all. It is now wired to beehiiv — see
"The newsletter form" below. Nothing on the page blocks a launch now.

**The projects section — built 27 Aug 2026.** Four write-ups under `projects/`
plus a card index at `projects.html`, added to the nav and footer of all six
pages and to `sitemap.xml` (now nine URLs).

The reasoning, since it will come up again: Nathan asked whether he needed a
blog CMS for SEO. He doesn't. Static HTML is what Google prefers to crawl, the
publishing cadence is project-driven rather than daily, and a CMS would mean a
database and an admin panel on a site deliberately built with no build step. New
project means a new file from the same template — cheaper than maintaining a CMS.

One decision worth keeping: the TEDx page is a **single** page listing all 34
speakers, not 34 thin pages. Better internal linking, and it surfaces on searches
pairing Nathan's name with any of those speakers.

**The credits build-out — 27 Aug 2026.** Ten more project pages, one per
substantive entry on `credits.html`, so every credit title on that page now
links somewhere. Nineteen sitemap URLs at the time; twenty-one now, after the
tools section.

Three things about this batch that matter more than the pages themselves:

**These pages started out mostly TODO, and that was the honest state of them.**
Every one carried a `TODO (Nathan)` block naming exactly what was missing. The
site had a one-line credit for each of these and nothing else — no dates, no
links, no outcome. Rather than write around the gaps convincingly, each page
argues from what is actually sourced and then says, in the markup, what it
needs. **Do not fill these in by inference.** The reason the editorial rules
exist is that Nathan's published bios already contain numbers nobody can trace;
a plausible paragraph on this site becomes the next bio's wrong fact.

*Status as of 1 Sep 2026: most of those blocks are closed. Seven remain across
the whole site — the current list is under "Waiting on Nathan" below. Grep for
the string rather than trusting any count in this file, including that one.*

**The three most valuable — all closed 31 Aug 2026.** Kept here because the
resolutions record facts, not just status.

1. ~~**`covid-dissertation.html` — a link.**~~ **Done.** The record is
   `digitalscholarship.tnstate.edu/dissertations/AAI29256098/`. Its abstract also
   supplied the method the page had been missing: a qualitative study, online
   survey of **25 faculty** plus follow-up focus groups, spanning spring and fall
   2020, framed with **Community of Inquiry** (teaching, social and cognitive
   presence). `index.html`'s JSON-LD now carries Tennessee State in `alumniOf`;
   the "institution deliberately omitted" note is gone with it. Still open on
   that page: the findings themselves (the published abstract states none) and
   the committee chair.
2. ~~**`deborah-norville.html` — a link to the segment.**~~ **Closed as
   unresolvable.** Nathan confirms the segment aired ~22 years ago and is no
   longer online; the YouTube upload carrying the 820,000 count was taken down.
   Per his decision the figure is **kept but qualified** in all three places it
   appears — "a YouTube upload of the segments passed 820,000 views before it
   came down." `images/norville.jpg` is now the only evidence of it we hold, and
   the figcaption says so. Do not restore the bare number.
3. ~~**`multi-platinum-com.html` — what happened to the company.**~~ **Done.**
   Still live and selling on Thinkific with no new products in several years;
   `multi-platinum.com` redirects to `multi-platinum.thinkific.com` (**note the
   hyphen** — `multiplatinum.com` is a different, dead address). The page now has
   a "Where it is now" section. **Founded 2006.** Nathan first said 2005, tying
   it to the book's publication; the book is confirmed as **2006** (Focal Press,
   ISBN 9780240520230), and shown that, he confirmed 2006 for the company as
   well. Do not revert this to 2005 without asking him again. The "50+ courses
   produced" figure reconciles with the 33 currently listed — older courses have
   been retired, and the page now says so.

   **The month is genuinely unsettled — don't pin it.** Elsevier's own page
   headers the book "1st Edition, 28 July 2006" and then says "Published:
   13 October 2009" in its product details (almost certainly the ebook
   reissue); the Amazon listing is dated 2006-08-10. An earlier note in this
   file said "August 2006" with more confidence than the sources support. The
   site claims the year only, which is all that is defensible.

**One claim that is now checkable and wasn't before.** Pinning the founding year
at 2006 makes *"one of the first online training companies in music production"*
— which appears on `index.html`, `about.html`, `credits.html` and the project
page — a dateable claim rather than a vague one. Nobody has verified it against
what else existed in 2006. Worth Nathan's own gut check before the site gets more
traffic, since it is exactly the shape of claim the editorial rules exist for.

**`mixers-toolkit.html` is deliberately the thinnest page on the site.** The
repo has only ever recorded a title, a co-author, a publisher, a year and an
ISBN for that book. Everything else on the page is either carried over from the
first book's entry or is general fact about Pro Tools 9 itself, and the TODO
says so. If Nathan cannot supply detail, the right move is folding it into
`multi-platinum-pro-tools.html` as a section rather than leaving a page that
exists to fill a grid cell.

**`projects.html` is now grouped, not a flat grid.** Fourteen cards under four
`<h2>` headings — film and video, teaching and curriculum, instructional video
and courses, writing and research. The grid was designed for four cards; at
fourteen it needed the same categories `credits.html` already uses. A new page
goes in whichever group it belongs to, not at the end.

`.credits .t a` is new in `site.css` and is **not** the default link style. It
copies `.videogrid .t a` — inherited colour, hairline underneath, accent on
hover — because `.credits .t` is 20px display type and a real underline on a
two-line book title turns the whole list into a wall of rules. It also keeps a
linked title and an unlinked one at the same visual weight, which matters
because four entries on `credits.html` still have no page.

**`TODO (Nathan)` markers in the HTML** — search for that string:

1. `credits.html` — the Telly conflict. He says Legacy Learning holds it; his 2023
   CV claims it personally under Industry Qualifications. The CV and the site
   disagree and one is wrong.
2. `credits.html` — LANDR course title. Live page says *Getting Started with Pro
   Tools*; his CV says *Producing Electronic Music in Pro Tools*. Possibly two
   courses.
3. `speaking.html` — the *Nashville Ledger* mention is in his Belmont bio, absent
   from his CV, and no article was findable. Off the site until it has a link.
4. ~~`index.html` — newsletter form posts to `action="#"`.~~ **Done, 31 Aug 2026.
   Wired to beehiiv.** See "The newsletter form" below.
5. `index.html` — YouTube link held back until episode 1. The handle
   `@nathaneadam` was **not** claimed as of August 2026; an unrelated account sits
   at `@nathanadam1156`.
6. ~~`projects/cost-of-valor.html` — the two trailers link to LinkedIn posts on
   Gary Garrison's account.~~ **Done, 31 Aug 2026.** Both films are on Nathan's
   own YouTube channel and the page now points there:
   cinematic `youtu.be/BFTz21YJnBk`, documentary `youtu.be/OrWVRhjSDMM`.
   The LinkedIn URLs are gone. **One new TODO opened on that page in exchange:**
   which image and video models the team actually used. That is the single
   detail that would make the page useful to other people doing this work, and
   it was left out rather than guessed.

   YouTube descriptions for both videos were drafted in Nathan's voice on
   31 Aug and are in the chat transcript, not in the repo. If they need
   editing later, the facts in them all come from this page.
7. ~~**Three press URLs have no Wayback snapshot.**~~ **Done, 31 Aug 2026.**
   Nathan submitted all three by hand and every press source on the site now
   carries an "Archived copy" link. Captures: NewsChannel 5
   `web/20260901002048`, Belmont M.A. program page `web/20260901002027`, MEIEA
   2026 proceedings `web/20260901002025`. All eight archive links were also
   normalised from `http://` to `https://` in the same pass.

   **Note the save endpoint — and now the whole of `web.archive.org` — is
   blocked from the Cowork sandbox**, so archiving can never be automated from
   here and can't even be verified from here. It is always Nathan's click.

   **One loose end on the MEIEA capture.** It is keyed to the *wildapricot CDN*
   address the PDF redirects to, not to the `meiea.org` URL the site actually
   links and that any citation would use. Wayback replays fine, but a future
   lookup of the meiea.org address may find nothing. Worth resubmitting the
   clean `meiea.org/resources/Proceedings/2026/...` URL. The submitted URL also
   carried a ~1400-character signed AWS policy; the markup uses the truncated
   form, which resolves identically because Wayback serves its own stored bytes.
8. ~~`projects.html` — the **Cost of Valor card uses `nc5-ai.jpg`**, a frame
   from the NewsChannel 5 story rather than from the film.~~ **Done, 1 Sep
   2026.** The card now uses `cost-of-valor-cinematic.jpg`, a real frame from
   the cinematic reel, and `projects/cost-of-valor.html` gained a `.plate-pair`
   of both trailer frames — it had been the only project page with no images at
   all. `nc5-ai.jpg` stays on `speaking.html`, where it belongs. **Every image
   on the site now depicts what it claims to.**
   Do not put the *documentary* frame in a card: a face sits hard against the
   right edge and the 3:2 crop removes it.
9. `projects/grammy-camp.html` — the **2017 GRAMMY Camp Weekends** detail (San
   Antonio, San Diego, Los Angeles; Best Buy Teen Tech Centers and the Boys and
   Girls Club; 80+ students) is now used here and sourced to the 2017 Belmont
   News piece. If that page ever disappears, the archived copy is linked on the
   page and the full text is in `press-archive/belmont-news-tedx-2017.md`.

**Not on the site, but Nathan should fix at the source:**

- **His Belmont faculty page** is what other bios copy from. It says "over 60
  GRAMMY Camps", implies an AES presentation, and cites the *Nashville Ledger*.
- **The Jamie Dunham / Brand Wise interview**, which `speaking.html` links to
  twice as press, carries the worst version: *"assistant professor of cinema,
  television and emerging media"* and *"more than 100 Grammy camps."* Both wrong,
  both propagated from the conference bio. Worth asking her to correct it — the
  site's own proof section currently routes people to it.
- **Email authentication — the most urgent thing on this list.** Checked 24 Aug
  2026: inbound mail to `nathan@nathaneadam.com` works (the MX survived), but the
  domain has **no SPF, no DKIM and no DMARC**. See the zone table under
  **Deployment**. Nothing sent from this address is authenticated, which is a
  problem for the booking CTA and a serious one for a newsletter. Three DNS
  records plus a toggle in the Workspace admin console.
- **The bio he sends conferences** says "over 100 GRAMMY Camps" and *Assistant*
  Professor. That's where the inflated number came from.
- **A Resolve title card** reads "The **Asessment** Pivot" — one S short. Kept off
  the site until fixed.
- **His DreamHost SFTP password sits in plaintext** in the file-manager URL.
  Should be rotated, especially with recording-in-public planned.
- ~~**GitHub attribution.**~~ **Done, 26 Aug 2026.** The repo now lives at
  `github.com/nathaneadam/nathaneadam-site`. The side effect was breaking
  Vercel's Git link — see "The repo move broke Vercel" under **Deployment**.

## State as of 1 September 2026 — read this first in a new session

### The very latest: the tools section shipped

Built in the last session of 1 Sep and committed as `44d1a24`. Nathan pushed it
himself to check on his phone. **The one open loop is that phone check** — the
whole thing was verified logically (jsdom, every branch) and never verified
visually, because Chrome was not running and the built-in browser cannot open
`file://`. Ask him how it looked before building anything else.

Two follow-ons already queued, in order:

1. **The email gate is soft and wants a second beehiiv form** to become real.
   Details under "The gate" in the tools section above. This is Nathan's click,
   not a code change, and the tool is correct as-is until he makes it.
2. **The assignment redesign helper**, the second tool, was agreed but not
   started. Same shell and styling as the diagnostic, grounded in the MEIEA 2026
   assessment paper: the teacher says what their assignment currently asks
   students to hand in, and gets back a version built around process artifacts
   and defence instead of the final deliverable. Output is a copyable brief plus
   a rubric. `tools.html` already promises it in the "More coming" section, so
   either build it or edit that paragraph.

**A rejected idea worth not re-proposing.** The strongest tool on the original
shortlist was a client-side LUFS meter. Nathan killed it, correctly: visitors
arrive on phones and nobody moves a mix to a phone to check its loudness. That
objection also kills the delivery-spec checker and most of the BPM calculator.
Any tool that needs a file on a desktop is the wrong shape for this audience.

**One-paragraph version of everything before that:** unchanged from 31 Aug in the ways that matter — the
site is content-complete, in Nathan's voice, the newsletter form is collecting,
and there is no launch blocker. What changed on 1 Sep: **every image on the site
now depicts what it claims to** (the Cost of Valor stand-in is gone), **the two
bio-correction emails are drafted and waiting in Gmail** for addresses, and a
pass over the two Amazon book listings closed three open questions and turned up
**two press notices and one wrong ISBN nobody had caught**.

### What happened on 1 September 2026

**1. The Cost of Valor card image — closed.** `projects.html` used `nc5-ai.jpg`,
a frame from the NewsChannel 5 story, as the card for a film it is not from.
That was the only image on the site that lied, and it is now
`cost-of-valor-cinematic.jpg`, a real frame from the cinematic reel. Both
trailer thumbnails were pulled at 1280×720 from Nathan's own channel
(`img.youtube.com/vi/<id>/maxresdefault.jpg` — reachable from the sandbox,
unlike `web.archive.org`).

`projects/cost-of-valor.html` had **no images at all**, the only project page in
that state, and now carries both frames as a `.plate-pair`. They are both 16:9,
so the pair measures 0.0% off.

**The documentary frame must never go in a card.** There is a face hard against
the right edge that the 3:2 `object-fit:cover` crop takes off. The cinematic
frame is centre-weighted and survives it. That is why the card got the one it
got, and it is recorded in `images/README.md` too.

**2. The two bio-correction emails are drafted.** Both sit in Gmail as drafts,
written in his voice from `BIO-CORRECTIONS.md`. **Neither has a recipient** —
Jamie Dunham's address is nowhere in his mail, and no Belmont marketing or
communications contact was identified. He fills in the To field and sends. The
Belmont one still has a `[name]` placeholder in the greeting.

**3. Four questions Nathan answered, all now written into the site:**

- **Multi-Platinum.com is "co-founder", not "Founder".** Changed in six places
  across four files, plus "the one I started" → "the one we started" in the body
  prose of the project page. Who the co-founder was is **no longer open** —
  Nathan named **Brady Barnett** later the same day, and the project page now
  names him in the prose. See item 6 below; treat this as settled fact, not the
  guess it was for a few hours.
- **"One of the first online training companies in music production" stands.**
  Nathan confirmed it holds. It stays on `index.html`, `about.html`,
  `credits.html` and the project page unchanged. This closes the open question
  raised on 31 Aug; do not reopen it.
- **"Carrie Tillis" is correct as written.** It was omitted from the Presleys
  guest list because it resolves to no findable artist and looked like a
  transcription slip. Nathan confirmed the name. It is now on
  `projects/presleys-country-jubilee.html` and `credits.html`. **Do not
  "correct" it to Pam or Mel Tillis.** The same 2006 author bio appears verbatim
  on the Amazon listing, so the spelling is at least consistent across sources.
- **The Mixer's Toolkit gets to keep its own page.** Nathan supplied the Amazon
  listing instead of choosing to fold it into the first book, which was the
  right answer — see below.

**4. The Amazon listings were worth reading, and here is what came off them.**
Checked 1 Sep 2026 via the browser (`web_fetch` returns an empty shell on
Amazon; Chrome timed out; the built-in browser read both pages fine).

| | *Multi-Platinum Pro Tools* | *The Mixer's Toolkit* |
|---|---|---|
| Pages | 320 | 260 |
| Published | 10 Aug 2006 (Amazon) | 19 April 2011 |
| Rating | 4.9 from 10 | 4.6 from 38 |
| Amazon rank that day | #9,564,148 | #5,307,573 |
| In print? | **No** | **No** |
| Used price | **from $3.02**, 7 sellers | **from $48.82**, 7 sellers, "1 left" |

**The price inversion is real and is now a section on both pages.** The older,
longer book with a DVD in it goes for three dollars; the shorter, newer one
sells used for more than fifteen times that, fifteen years after publication.
The pages say so and explicitly decline to draw a flattering conclusion from it
— the likely explanation is a smaller print run. **These are prices and they
date fast.** Both pages name September 2026 on purpose. If anyone refreshes
them, move the date with the number or drop both.

**A WRONG ISBN was on the site in two places.** `projects/mixers-toolkit.html`'s
meta description and `credits.html` both said **978-0-240-81871-9**. The correct
print ISBN is **978-0-240-81870-2** — it matches Amazon's ISBN-13 and the
Elsevier URL the same pages were already linking. Both corrected. Worth noting
how it survived: the right value was sitting in the adjacent `<a href>` on the
same line.

**TWO PRESS NOTICES, and a trap in how Amazon serves them.** Amazon shows two
editorial-review blurbs on **both** book listings. They belong to the **first**
book only:

- **Barry Rudolph**, *New Toys* column, **April 2007** — names
  "Multi-Platinum Pro Tools by Nathan Adam and Brady Barnett" outright.
- ***Lighting & Sound***, **January 2007** — "Well recommended for those serious
  about software."

Both predate the Mixer's Toolkit (2011) by four years. They are now a section on
`projects/multi-platinum-pro-tools.html`, with HTML comments on **both** pages
warning against moving them. This is the site's first named trade-press notice
for either book.

**5. Verification run.** All **83** `<img>` elements checked against the actual
files: every one has `width`/`height` and every declared pair matches the file's
intrinsic size. All eleven `.plate-pair` groups measured; the only two above 6%
are the pre-existing TEDx pairs (5.4% and 5.3%) that CLAUDE.md already says to
leave alone. All eight edited pages parse clean under a strict (non-recovering)
lxml parse. No stray uploads in `images/`.

**6. A second round of answers, later the same day. Five more items closed.**

- **The Multi-Platinum.com co-founder is Brady Barnett.** Same partner and same
  year as the first book. `projects/multi-platinum-com.html` now names him in
  the prose and links his section on the book page. The question opened earlier
  that day is closed; do not treat it as a guess any more.
- **The LANDR course is "around 2018".** Given by Nathan as *"I believe 2018"*.
  LANDR's own page states no date and nothing else found does either, so this
  is recollection, not a document — which is exactly why the eyebrow hedges and
  no argument on the page rests on the year. **If a dated source turns up and
  disagrees, the source wins.**
- **The Norville segment was 2004**, given as *"I believe 2004"*. This one is
  sturdier than the LANDR date because the page's existing inference — "about
  22 years ago", and the MSNBC run — already pointed at 2004, so two
  independent routes agree. It also settles the old item 3: the segment came
  **two years before** the 2006 book, and the page now makes that its point.
- **The Peter Pan orchestra size is closed without an answer.** Asked directly;
  Nathan said it doesn't matter. The page never claimed one and still doesn't.
  Do not re-ask, and do not infer a number from a typical Branson pit.
- **The Mixer's Toolkit companion website is gone.** His words: *"the Mixers
  toolkit site is long gone."* That is now on the page rather than buried in a
  comment, because it sharpens the format argument the page already makes — the
  website died and the first book's DVD still works in every copy ever sold.
  **`projects/mixers-toolkit.html` now has no TODO blocks at all.**

**A stale TODO was deleted from `projects/learn-master-guitar.html`.** It asked
for the production years, the disc count and whether he shot the whole series —
all three answered on 31 Aug, on the page, and in the eyebrow. The block had
just survived the edit that answered it. Worth checking for this pattern
elsewhere: a TODO that outlives its answer is worse than no TODO, because it
sends the next session to ask a question that has already been asked.

**He declined the rest, and that is recorded rather than left hanging.** Asked
on 1 Sep about the remaining open items — the dissertation findings and
committee chair, who else worked on *Live from Virtual Reality*, the
Multi-Platinum Pro Tools print runs and whether the DVD material survives — his
answer was that these are ages ago. **Do not re-ask them in a new session.**
They stay in the markup as honest gaps, not as pending questions.

**One claim nobody has ever sourced, noticed 1 Sep and left alone.**
`projects/learn-master-guitar.html`'s lede says Learn & Master Guitar "reached
more than 100,000 students". That figure appears nowhere in this file's verified
facts and no source for it was found. It is pre-existing and was not touched,
but it is exactly the shape the editorial rules exist to catch, and it wants
either a source or Nathan's confirmation.

**Seven `TODO (Nathan)` blocks remain** (down from nine at the start of the day
and fifteen a week ago): a photograph on three pages, the Norville credit's
exact scope, the dissertation findings and committee chair, the *Live from
Virtual Reality* collaborators, and the Nashville Ledger item on
`speaking.html`. None is a claim the site is making without support.

**A note for whoever next runs the em-dash check.** It reported 24 prose em
dashes, which looks alarming and is almost entirely noise: 22 of them are the
`<p class="fmeta">` footer that appears on every page ("Dr. Nathan Adam —
professor of media production…") plus two "— Nathan" sign-offs. Those are
separators, not the style violation. **The check must exclude the footer, not
just filter to `<p>`** — the 31 Aug caution in this file said to filter to `<p>`
and stop there, which is not enough. After excluding it, exactly two real ones
existed on 1 Sep: one introduced that day on `projects/mixers-toolkit.html` and
fixed immediately, and one pre-existing on
`projects/ma-media-entertainment.html` that was left alone.

### State as of 31 August 2026

**If you are picking this up cold, the one-paragraph version:** the site is
content-complete and written in Nathan's voice across all twenty pages, and the
newsletter form is wired to beehiiv and collecting addresses. **There is no
launch blocker left.** Email authentication was called one in this file for a
week; that stopped being true when Nathan chose beehiiv's sending domain on
31 Aug, because the newsletter no longer sends from `nathaneadam.com` at all.
SPF/DKIM/DMARC remain undone by decision, not by oversight — see "Email
authentication" above for what that actually costs (narrow: his personal mail
and the booking CTA) and the one-record version if he ever wants it. Everything
else on the waiting list is small.

Where things actually stand, so the next session doesn't have to reconstruct it.

**31 Aug was a voice pass plus a fact-gathering pass.** Two things happened, and
the second matters more than the first.

**1. The site is now written in Nathan's voice, not in generic personal-brand
prose.** A writing profile was built from two real corpora — the *Multi-Platinum
Pro Tools* manuscript and roughly four years of his sent email — and saved as a
skill called `my-writing-style`. **Load it before drafting anything he will
publish or send.** It is the ground truth, not this file and not the site copy.

The short version of what makes his voice his: he overstates and then plainly
admits he overstated ("Ok, that's overstating things a bit" — his own
correction, not a paraphrase); he uses ellipses as a drumroll; he names a
rhetorical device while using it ("I'm known as the king of bad analogies"); he
frames rules as preference, never law; and he writes `:)`, never a unicode
emoji, in both a published Focal Press textbook and 2026 email. He also names
products rather than categories — "Pro Tools LE", not "an audio card" — which is
the correction he made to the first draft and the fastest way to spot copy that
has drifted off-voice.

**Do not use the pre-31-Aug site copy as a style reference.** Most of it was
AI-drafted. The book and his email are the sources.

**2. Eight `TODO (Nathan)` blocks were closed with facts from Nathan**, and
several of those facts corrected things the site was getting wrong. See
"Verified facts" above — the new entries are marked 31 Aug.

**Live and verified:** all six top-level pages plus **fourteen** project pages,
the Projects link in every nav and footer, nineteen sitemap URLs (twenty-one
since the tools section), and — new on
31 Aug — an "Archived copy" link on **every** press source, not just six of
them. Every substantive credit title on `credits.html` links to a write-up.

**Four claims were corrected on 31 Aug. Do not reintroduce them:**

- **"a mortgage" → "a house."** Nathan's house is paid off. The word "mortgage"
  had been on `index.html` and `about.html` as a plausible-sounding stand-in for
  real-life obligation that nobody had checked. This is the exact failure mode
  the editorial rules exist to prevent, sitting on his own site.
- **"three decades in" → "twenty-five years in"** on `about.html`. The old
  phrasing contradicted the site's own proof bar, which counts 25 years from
  Labette in 2001.
- **The 820,000 Norville views are now qualified** everywhere. See open item 2
  under "The credits build-out".
- **An unsourced date was removed** from `speaking.html` — the AI-in-music topic
  had said "the Autotune fight of 2003", which nothing supports. The sentence
  works without a year.

**The photography is no longer thin.** Twenty images were added and placed on
27 Aug — see "Photography" below. Every `<img>` on every page carries width and
height, every `.plate-pair` was checked for matching aspect ratios, and the
declared dimensions were verified against the actual files. If you add images,
re-run those three checks; a ragged pair and a missing dimension both shipped
briefly during that batch and were caught by checking rather than by looking.

**The homepage story photo changed** on 27 Aug at Nathan's request — from
`teaching.jpg` to the Nate Bargatze shot. Worth knowing that the surrounding
copy argues "I taught people through the last technology shift," which the old
photo illustrated literally and the new one does not. `teaching.jpg` is still in
the folder if that ever wants reverting, and `vision-pro.jpg` (now on About)
would also carry that argument.

**Waiting on Nathan, in rough priority order:**

0. **Look at the diagnostic on a phone.** Added 1 Sep, top of the list because
   it is the only thing about the tools build that was never checked. Everything
   else about it was verified headlessly. See "The tools section" above.
0b. ~~A second beehiiv subscribe form.~~ **Done 1 Sep 2026.** The hard gate
   is live; see "The gate" in the tools section. **Nathan has not submitted a
   test address**, so the redirect is configured but unproven end to end.
   That is the one thing left to check on this.

1. **Email authentication — DEFERRED by decision, 31 Aug 2026.** Not a blocker.
   Nathan chose beehiiv's sending domain, so the newsletter is authenticated by
   beehiiv and never touches this zone. The remaining SPF/DKIM/DMARC records
   cover only his personal Workspace mail and the speaking page's booking CTA.
   He explicitly opted out of the record changes for now, accepting that a
   future move to his own sending domain would restart beehiiv's Smart Warming.
   **If he ever raises it again, the single highest-value action is the SPF
   record alone** — one TXT at the apex, no Workspace admin trip required. See
   "Email authentication" above; the `rua` trap documented there still applies
   if DMARC is ever added.
2. ~~**The beehiiv endpoint.**~~ **Done 31 Aug 2026** — see "The newsletter form"
   above. This makes item 1 urgent rather than merely important: the form now
   collects addresses, and the domain still cannot authenticate a message sent
   to any of them.
3. ~~Three Wayback submissions~~ **Done 31 Aug.** All press sources archived.
4. **The two bio corrections — drafted 1 Sep 2026, waiting on addresses.**
   Both are in Gmail: *"Quick correction to my bio on the Brand Wise post?"* and
   *"Bio update for my faculty profile"*. Neither has a recipient, because Jamie
   Dunham's address is nowhere in his mail and no Belmont comms contact was
   found. He adds the To field, fills the `[name]` placeholder in the Belmont
   one, and sends. This is the last thing on the list actively pointing wrong
   facts at other people.
5. ~~**Cost of Valor trailers on his own channel**~~ **Done 31 Aug (links) and
   1 Sep (the card image and the page's first photographs).**
6. **Seven `TODO (Nathan)` blocks remain**, verified by grep on 1 Sep 2026 —
   down from nine that morning and fifteen a week earlier. They sit in
   `projects/multi-platinum-pro-tools.html`, `learn-master-guitar.html`,
   `deborah-norville.html`, `peter-pan.html`, `covid-dissertation.html`,
   `live-from-virtual-reality.html` and `speaking.html`. None are claims the
   site is making without support — they are a photograph, a credit's exact
   scope, the dissertation findings, a collaborator list and the Nashville
   Ledger item. The site no longer asserts anything it cannot point at.
7. ~~**Two small factual questions raised 31 Aug.**~~ **Both answered 1 Sep
   2026 by Nathan. Do not reopen either.**
   - `"Carrie Tillis"` is **correct as written** and is now in the guest list on
     `projects/presleys-country-jubilee.html` and `credits.html`. Do not
     "correct" it to Pam or Mel Tillis.
   - *"One of the first online training companies in music production"* **holds**
     and stays as written on all four pages.

   ~~**One new question opened in exchange:** who was the co-founder?~~
   **Answered the same day: Brady Barnett.** Confirmed by Nathan, and now named
   in the prose on `projects/multi-platinum-com.html`. Same partner and same
   year as the first book.

### Email authentication — NOT a launch blocker. Read before touching DNS.

**Status: nothing is done, and that is now an accepted state, not an emergency.**
`nathaneadam.com` has no SPF, no DKIM and no DMARC. Inbound mail works (the
Google Workspace MX survived the Vercel move). Nothing outbound is authenticated.

**This file called it "the launch blocker" for a week. That was wrong from the
moment Nathan chose beehiiv's sending domain (31 Aug 2026), and the label is
struck.** The newsletter — the thing the whole launch depends on — goes out under
beehiiv's own authenticated domain. It does not touch `nathaneadam.com` and does
not care what is in this zone. **The site can launch with this section entirely
undone.**

What remains unauthenticated is Nathan's *personal* Workspace mail,
`nathan@nathaneadam.com`. The concrete cost is narrow and worth stating plainly
rather than inflating: the speaking page's booking CTA sends replies from that
address, and unauthenticated mail is filtered more aggressively, so a conference
organiser's reply could land in spam. Low probability, real consequence.

**The February 2024 Gmail/Yahoo requirements cited below apply to BULK senders**
(thousands of messages a day). One-to-one mail from a professor is not that. An
earlier version of this file used those rules to argue urgency for Nathan's
personal mail. That was a stretch.

**The cheap 80% is one record.** SPF alone needs no Workspace admin trip, no DKIM
key, and no prerequisites — it is a single TXT at the apex and it delivers most
of the deliverability benefit. If only one thing is ever done here, do that one.
DKIM and DMARC are the fiddly ones and can wait indefinitely.

**There are TWO separate sending paths and they need different work.** An earlier
version of this file said "three DNS records plus a toggle in Workspace admin,"
which only ever described the first one. Verified against beehiiv's own custom
domain documentation, 31 Aug 2026.

**Path A — Google Workspace mail.** `nathan@nathaneadam.com`, which is what the
speaking page's booking CTA sends replies from. Three pieces:

| Record | Host | Value |
|---|---|---|
| TXT | `@` (apex) | `v=spf1 include:_spf.google.com ~all` |
| TXT | `google._domainkey` | generated in Workspace admin — see below |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@nathaneadam.com` |

**THE `rua` TRAP — this is why the address above is on his own domain.** Nathan
first asked for reports at `nathaneadam@gmail.com`. That does not work. Under RFC
7489, sending DMARC reports for `nathaneadam.com` to an address at a *different*
domain requires the receiving domain to publish an authorization record — here,
`nathaneadam.com._report._dmarc.gmail.com`. Gmail does not publish those for
arbitrary domains, so most reporters silently drop the reports. The result is a
DMARC record that looks correct and delivers no visibility whatsoever.

The fix keeps what he actually wanted: point `rua` at an address on
`nathaneadam.com`, then forward that address to his Gmail inside Workspace.
Reports arrive in the inbox he wanted, and they are authorized to arrive.
**`dmarc@nathaneadam.com` has to exist** (alias or group) before the record is
worth publishing.

**DKIM cannot be added from DreamHost alone.** The key is generated in the Google
Workspace admin console (Apps → Google Workspace → Gmail → Authenticate email),
which outputs the TXT value, and *then* it goes in DreamHost. Generate first, or
that trip to the DNS panel only gets two of the three records in.

**Start DMARC at `p=none`.** That is monitor-only. Going straight to
`p=reject` before SPF and DKIM are confirmed passing will silently bin his own
mail. Tighten later, once the `rua` reports come back clean.

**Path B — the beehiiv newsletter. DECIDED 31 Aug 2026: not doing it.** Nathan
chose to send from beehiiv's own subdomain for launch. beehiiv's authentication
carries those messages, deliverability is fine, and it costs **zero DNS records**.
This is the right call for launch and it means Path A is the entire job.

Revisit only if he wants his own sending address on the newsletter later. Note
that switching restarts Smart Warming, so it is cheaper to decide once. If it
ever does come up, here is what it involves:

- **Twelve DNS records**, generated by beehiiv, not three.
- **DMARC is mandatory** for any beehiiv custom domain, not optional.
- **Use a subdomain** (`newsletter.nathaneadam.com` or similar). beehiiv
  recommends this outright when the root domain already carries regular mail,
  which is exactly this situation.
- **Smart Warming takes 4–8 weeks** to build sending reputation, so this wants
  doing well before a launch, not the week of.
- **DreamHost is supported by Entri**, beehiiv's automated DNS setup, so the
  manual route may not be necessary.

**THE TRAP: a domain may have only ONE SPF TXT record.** Two valid-looking SPF
records do not merge — they invalidate SPF entirely and are worse than having
none. If Path A's Google SPF is at the apex and beehiiv later wants SPF at the
apex too, they must be merged into a single record, not both added. Keeping
beehiiv on a subdomain sidesteps this completely, which is the other reason to
use one.

**Order of operations, as agreed 31 Aug 2026.** Path B is off the table, so this
is now the whole job:

1. **In Google Workspace admin** — create `dmarc@nathaneadam.com` (alias or
   group) and forward it to `nathaneadam@gmail.com`. Then Apps → Google
   Workspace → Gmail → Authenticate email, generate the DKIM key, and copy the
   TXT value it produces. **Both of these are Nathan's clicks and both must
   happen before the DreamHost visit.**
2. **In DreamHost** — add the three TXT records above. Additive only. **Do not
   touch the MX record or the `ghs.googlehosted.com` CNAMEs**; the zone table
   under "Deployment" is what the world currently sees, and his email depends on
   the MX surviving. Nathan logs in; Claude can fill the records.
3. **Back in Workspace admin** — click "Start authentication" for DKIM once the
   record has propagated. Generating the key does nothing on its own.
4. **Wait, then verify.** Send a message to a Gmail address, open it, and check
   "Show original" for `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.
5. **Leave DMARC at `p=none`.** Tighten to `quarantine` and later `reject` only
   after the `rua` reports show weeks of clean passes. Going straight to
   `p=reject` before SPF and DKIM are confirmed will bin his own mail.

### The newsletter form — wired 31 Aug 2026

`index.html` posts to beehiiv now. The old `action="#"` placeholder is gone,
along with the JS handler that told real visitors their address wasn't saved.

**Form UUID `11848ad5-53ac-456d-8cec-428670527667`**, publication "Nathan's
Newsletter". Builder path is **Subscribers → Subscribe forms**
(`/subscribe_forms`, with an underscore; `/subscribe-forms` 404s). An earlier
note here said the "Grow" menu does not exist — **it does**, as of 1 Sep 2026.
There is a second form now; see "The gate" above.

**It is a cross-origin iframe, not our markup.** `site.css` cannot style it. It
was matched by hand in beehiiv's builder and verified against the live render at
`subscribe-forms.beehiiv.com/<uuid>`:

| | value |
|---|---|
| input bg / border | `#0E2131` / `#40586C` 1px |
| input text / placeholder | `#FFFFFF` / `#8BA0B1` |
| button bg / text | `#EF8C1F` / `#1B1206` |
| font, size, radius | Poppins, 17px, 5px |
| button weight | 600 (Semi Bold) |
| measured height | 52px |

**The button text is dark on purpose.** White on `#EF8C1F` is ~2.9:1 and fails
contrast; beehiiv's builder defaults to white. Check this first if the form is
ever rebuilt there.

**The form's own title and subtitle are switched OFF.** The `<h2>` and `<p>`
above it already say that. Turning them on duplicates the copy.

**Two costs accepted deliberately, after weighing them with Nathan:**

1. **The loader pulls Google Tag Manager and sets a `bhv_attribution` cookie.**
   This is the only third-party tracking on the site and it breaks the stated
   "no analytics, no tag manager" policy above. Accepted in exchange for beehiiv
   handling double opt-in, bot filtering and unsubscribe — none of which we
   would want to rebuild and maintain on a site whose whole premise is that
   Nathan is never blocked by a toolchain that rotted.
2. **It cannot hold 0px layout shift on its own**, because the iframe measures
   itself after load and reports height back by `postMessage`. `.beehiiv-form`
   in `site.css` reserves **52px** to absorb it. **If the form's height changes
   in beehiiv, change that number too.**

**The alternative that was rejected**, and why it may still be worth revisiting:
a Vercel serverless function at `/api/subscribe.js` calling beehiiv's API with a
key in an env var. API access **is** included on the free Launch plan (verified
against beehiiv's own pricing page, 31 Aug 2026 — "API access, Launch: Yes"; the
Launch exclusion is only the *Send* API, which is unrelated). That route keeps
the styling native, adds no tracking and no cookie, and holds layout shift at
zero. It was rejected because it means owning custom code that can break
silently, and rebuilding the opt-in plumbing. Revisit only if the tag manager
becomes a real objection.

**Free-plan branding: there is none on the form.** Checked the live render
directly — no "powered by beehiiv" in the DOM text. The Max-only "Remove beehiiv
Branding" feature covers the hosted newsletter and website, not the embed.

**Still required before launch:** SPF, DKIM and DMARC. See item 1 under "Waiting
on Nathan". A working form pointed at a domain that cannot authenticate a single
message is the most likely cause of the first issue landing in spam.

### The second voice pass — 31 Aug 2026, later the same day

The first pass that day covered `index` and `about` properly and touched the
project pages lightly. A measurement showed how lightly. First-person density
per 100 words of body prose, which is the fastest proxy for whether a page
sounds like him:

| | before | after |
|---|---|---|
| `index.html` | 4.9 | 4.9 (benchmark, untouched) |
| `about.html` | 3.8 | 3.8 (benchmark, untouched) |
| `projects/mixers-toolkit.html` | **0.1** | 1.6 |
| `projects/cost-of-valor.html` | **0.0** | 1.6 |
| `projects/peter-pan.html` | 0.7 | 1.4 |
| `projects/ma-media-entertainment.html` | 0.9 | 1.5 |
| `projects/multi-platinum-pro-tools.html` | 0.9 | 1.5 |

`cost-of-valor.html` was the worst on the site: 577 words about his own project
with **zero** first-person pronouns in them, written like a press release. It
was fully rewritten.

**Three cautions for anyone repeating this measurement.**

1. **The obvious regex undercounts.** These pages use `&rsquo;` for
   apostrophes, so `I've` and `I'm` do not match a naive pattern. Decode the
   entities and strip HTML comments before counting, or the first run will
   badly misreport. It did here, and nearly sent a rewrite at pages that were
   already fine.
2. **Density is a smell test, not a target.** `projects/tedx-nashville.html`
   and `projects/live-from-virtual-reality.html` still read at 0.5, and both
   are fine — the first is 34 speaker names and the second is caption-heavy.
   The prose in them is his. Do not pad a page to move a number.
3. **Em dash counts over-report the same way.** Most em dashes on the site are
   in `<cite>` separators, `<title>` tags, footers and list dividers, which are
   legitimate typography. Only prose em dashes are the style violation. Filter
   to `<p>` before judging. After this pass, prose em dashes across all twenty
   pages number **zero**.

**One invented detail was written and caught before it shipped.** A draft of
`peter-pan.html` said the walk from the console to the stage "was about ninety
seconds." Nothing supports that. The page now says only that tracking happened
in the same building, which is sourced. Recording it here because it is exactly
the failure mode the editorial rules exist to prevent, and it happened on the
same day the rules were being applied on purpose.

**What was deliberately not done.** `credits.html` stays a roster at Nathan's
explicit direction — 0.0 first person, and correct that way. The entries are a
list of what he did; voice belongs in the project write-ups they link to.

**No `:)` on `cost-of-valor.html`, on purpose.** The style profile calls for
roughly one per piece. That page is about dead helicopter pilots. Tone beats
the checklist.

**Good next moves if he asks what's worth doing — revised a third time on
1 Sep 2026, after the funnel build.** In rough order:

1. **Hear how the homepage, the callouts and the diagnostic look on his
   phone**, and fix whatever he says. Nothing from 1 Sep has been seen
   rendered. The `.voices-grid` at three columns and the `.q-card`
   `min-height` are the likeliest offenders.
2. **The welcome email** in beehiiv, in his voice: deliver "the rest", ask
   one question (what's your craft?). The result page now promises this
   question, so the default beehiiv welcome is a broken promise.
3. **The LinkedIn post** announcing the diagnostic to former students, and
   the email to a handful of them asking for a named line.
4. **The assignment redesign helper**, which `tools.html` currently promises.
5. Then the small pre-existing items: send the two bio-correction emails once he
   has the addresses, get a still from the *Learn & Master Guitar* shoot, and
   either source or drop the unsourced "more than 100,000 students" figure on
   that page.

Everything above the line items is settled: the newsletter form was wired on
31 Aug, SPF/DKIM/DMARC is a deliberate deferral rather than a task, and the Cost
of Valor links stopped being fragile when the trailers moved to Nathan's own
channel.

---

## Photography — status after the 27 Aug and 31 Aug batches

Nathan supplied twenty images on 27 Aug and five more on 31 Aug. They were placed
by what each actually evidences rather than collected into a gallery; the full
table of what went where is in `images/README.md`.

**The 31 Aug five closed three real gaps**, and arrived with spaces in their
filenames, about to be committed unreferenced. Renamed to the convention,
`-sm` variants generated, placed:

- `mansion-studios-gatlin.jpg` → `projects/peter-pan.html`. The room the 2009
  score was tracked in, with Larry Gatlin. That page had wanted a session photo
  since it was written. The caption says it is **the room**, not that the frame
  is from the Peter Pan sessions — nobody has confirmed that.
- `multi-platinum-dave-aron.jpg` → `projects/multi-platinum-com.html`. Shooting
  a hip-hop mixing course with Dave Aron, Snoop Dogg's engineer. That page
  claims it put working engineers on camera; this is the claim, pictured.
- `grammy-camp-haywood-sanders.jpg` → `projects/grammy-camp.html`. With Shannon
  Sanders and Dave Haywood of Lady Antebellum. The page had many
  students-at-consoles and nothing showing the industry guests.
- `walnut-control-room.jpg` and `walnut-live-room.jpg` → `about.html`,
  **stacked as two solo plates, deliberately not a pair.** 2.25:1 against
  4.78:1 would run the columns ragged.

**Two pre-existing pairs are marginally ragged** and were left alone: the TEDx
pair on `speaking.html` (1.77 vs 1.68) and one on
`projects/tedx-nashville.html` (1.42 vs 1.50). Both are ~5% off, which is a
10–15px step at phone width. Fixing means cropping, which changes what the
photos show, so it wants a human eye rather than a script.

**Gaps that closed:**

- ***Live from Virtual Reality*** had no image at all. It now has one, and it's
  the only picture of that credit in existence as far as this repo knows.
- **The COVID teaching** — the video-call grid shot is the work the dissertation
  studied. It earned its own section on the GRAMMY Camp page ("When it went
  online") rather than sitting as a caption, because the research is the reason
  that period matters.
- **Vince Gill** is named first on the credits roster and is now pictured
  directly beneath it.
- **Donald Miller** appears on the TEDx project page, where his talk is already
  embedded in the grid — the photo and the video reinforce each other.

**Still text-only, which is fine:** the AES Journal piece, and the dissertation
itself as a document (as opposed to the teaching it studied).

**Two frames deliberately unused**, held as alternates: `live-from-vr-2.jpg` and
`tedx-talk-close.jpg`.

~~**The one image that lies:** `nc5-ai.jpg` doubles as the Cost of Valor card.~~
**Closed 1 Sep 2026 — nothing on the site lies now.** The card is a real frame
from the cinematic reel and `nc5-ai.jpg` is back to being only the NewsChannel 5
still on `speaking.html`. See open item 8.

Worth keeping the lesson even though the case closed: a card image that is
thematically right and factually wrong is easy to ship, because nothing about
it looks broken. This one survived five days and was only caught because it had
been written down.
