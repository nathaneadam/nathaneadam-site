# nathaneadam.com

Static site. One stylesheet, one small script, no build step.
Edit a file, commit, push — Vercel deploys within about a minute.

```
index.html        Homepage
about.html        The long story
credits.html      Production, engineering, publishing, curriculum, teaching
speaking.html     TEDx talk, topics, talk history, press, booking
projects.html     Card index of the project write-ups
tools.html        Card index of the interactive tools
404.html          Branded not-found page
projects/         Fourteen write-ups, one per substantive credit. These sit one
                  folder down, so their links use ../
tools/            The interactive tools, also one folder down (so, ../ again)
                  career-pivot.html         the diagnostic
                  career-pivot-result.html  the full read. noindex, not in the sitemap
                  content.js                every word the visitor reads
                  diagnostic.js             the logic. no copy in it
                  DIAGNOSTIC-DESIGN.md      why the questions are the questions
css/site.css      Every style for every page
js/nav.js         Mobile menu toggle — the only script on the site
images/           Photos — see images/README.md
press-archive/    Local copies of articles the site links to. Private, never
                  published — see its README
CLAUDE.md         Full project context, decisions, and open items
```

Loaded from outside: the Poppins webfont from Google Fonts, the video embeds on
the TEDx project page, and — since 31 Aug 2026 — the beehiiv subscribe form on
the homepage. If Google is ever unreachable the pages fall back to the system
sans and the layout is unaffected.

The beehiiv form is the one deliberate exception to this site's "nothing
third-party" habit: its loader pulls Google Tag Manager and sets a cookie. That
was weighed and accepted in exchange for beehiiv handling double opt-in, bot
filtering and unsubscribe. CLAUDE.md has the full reasoning and the alternative
that was rejected.

## How to change something

Open the file, edit it, save. In GitHub Desktop: write a short summary, click
**Commit to main**, then **Push origin**. That's the whole workflow.

There's no framework here on purpose. Any text editor works. Nothing to install,
nothing to keep updated, nothing that breaks in eighteen months when a dependency
goes stale.

## The homepage, top to bottom (as of 27 Sep 2026)

Hero, "Featured in" strip, proof bar, student quotes, then four sections in
full-width colour bands modelled on grahamcochrane.com: **Nobody is born a
tech person** (navy), **Why I'm doing this**, **Twenty minutes, then twenty
hours** (the learning ladder, with a photo collage), the diagnostic callout,
What you'll find here, **Introducing me at an event?** (the official bio, on
slate), and the newsletter signup.

**The bio in that last section is the official one.** Copy it from there when
anyone asks for a bio. His title is *Associate Professor of Film, Television,
and Media Production*; it changed on every page on 27 Sep 2026.

**Keep those sections short.** Text sits beside a photo, so the layout only
looks right when the text is about as tall as the photo. Roughly 100 to 150
words per section.

## Things that are easy to get wrong

**One stylesheet, every page.** `css/site.css` is shared. Changing a colour or a
base style hits every page at once — that's the point, but check more than one
page afterwards.

**Pages in `projects/` need `../` in their links.** They're one folder down, so
their stylesheet, script and nav links start `../`. Copying a top-level page as a
starting point and forgetting to fix those gives an unstyled page with dead
navigation — it looks badly broken, and the cause isn't obvious.

**Photo pairs need matching shapes.** Two images side by side (`.plate-pair`) run
ragged if one is portrait and the other landscape. Crop both to the same aspect
ratio first, or give the odd one out its own `figure.plate`. There's a script in
`images/README.md` that checks every pair on the site in one go — worth running
after adding photos, since a ragged pair isn't always obvious on a wide screen.

**The mobile nav.** Below 760px it collapses behind a hamburger button, run by
`js/nav.js`. It used to be hidden with nothing in its place, which left phones
with no navigation at all — so the collapsed state only applies once the script
has run. If the script fails the menu simply stays visible. Don't rewrite that as
a plain `display:none`.

**An image has to depict what it claims.** For five days the *Cost of Valor*
card on `projects.html` used a frame from the NewsChannel 5 story about a
different subject entirely. Nothing about it looked broken, which is exactly why
it survived — a picture that is thematically right and factually wrong reads as
fine on the page. Every image on the site was checked on 1 Sep 2026 and they all
now show what their caption says. Adding one means checking that again.

**Always look at a phone.** Every layout bug this site has shipped was a
small-screen bug that looked fine on a laptop: a portrait cropped through the
subject's forehead, a hero that never stacked, a group photo squeezed into a
letterbox. Resize the browser to about 390px wide before you commit. (Claude
can do this check itself by screenshotting the pages in its own sandbox; see
CLAUDE.md, "State as of 27 September 2026".)

**To change the diagnostic's wording, edit `tools/content.js` and nothing else.**
Every headline, question, answer and paragraph the visitor reads is a plain
string in that one file. `tools/diagnostic.js` is logic with no copy in it, so
the text can be rewritten without touching any code.

**The diagnostic must never start scoring people.** No percentage, no
personality type, no "your role is 68% exposed." There is no study behind a
number like that, and inventing one on a page about other people's careers is
the exact failure the editorial rules below exist to catch. Every read is framed
as Nathan's opinion, and the caveat at the bottom of every result says outright
that it isn't research. **Don't delete that caveat** — it's the thing that makes
the rest of the page credible.

**The newsletter form is beehiiv's, not ours.** It renders inside a cross-origin
iframe, so `site.css` cannot touch it. Its colours and font were matched by hand
in beehiiv's builder (Subscribers → Subscribe forms). If the signup box ever
stops matching the page, the fix is in beehiiv, not in this repo. `.beehiiv-form`
in `site.css` reserves 52px for it — if the form's height changes there, change
that number here too.

## Where everything lives

- **Repo** — `github.com/nathaneadam/nathaneadam-site` (moved here 26 Aug 2026
  from the `nathaneadam-del` account)
- **Host** — Vercel, deploys automatically from `main`
- **Domain** — DNS stays at DreamHost; only the apex `A` record and `www` CNAME
  point at Vercel, so the Google Workspace email records are never touched
- **Newsletter** — beehiiv, free Launch plan, publication "Nathan's Newsletter".
  Form UUID `11848ad5-53ac-456d-8cec-428670527667`

**The diagnostic's email gate is real** (since 1 Sep 2026). It uses a
**second** beehiiv form, "Diagnostic gate - career pivot result", UUID
`712946f7-3291-4efe-b002-6c65f0458621`, whose post-subscribe redirect points at
`/tools/career-pivot-result.html`. It has to be a second form because the
redirect belongs to the form, not to the link: reusing the homepage UUID would
send homepage subscribers to a diagnostic results page. If the gate ever has to
go back to soft (`GATE.mode = "soft"`), the "show me anyway" link must come back
with it. Never fake it with an unlock button that works whether or not somebody
subscribed.

**Email authentication is deliberately undone.** `nathaneadam.com` has no SPF, no
DKIM and no DMARC. Inbound mail works — the Google Workspace MX survived the
Vercel migration — but nothing sent from the domain is authenticated.

This is a decision, not an oversight, and it is **not** a launch blocker. The
newsletter sends from beehiiv's own authenticated domain and never touches this
zone. What stays unauthenticated is Nathan's personal Workspace mail, which
matters mainly for replies to the speaking page's booking CTA.

If it is ever revisited, the highest-value single action is the SPF record on its
own — one TXT at the apex, no Google Workspace admin trip needed:

```
Type: TXT    Host: @    Value: v=spf1 include:_spf.google.com ~all
```

CLAUDE.md has the rest, including a trap worth knowing about if DMARC is ever
added: pointing its `rua=` reports at a Gmail address silently does not work.

**If a push doesn't show up on the live site**, check Vercel → Settings → Git
before looking at anything in the code. Moving the repo between GitHub accounts
broke the deploy webhook once, and it broke *silently* — pushes succeeded,
nothing errored, and the Deployments list simply stopped growing. The giveaway is
a stale site with **no failed build**: a build that fails leaves a red entry, so
an empty list means Vercel never heard about the push. CLAUDE.md has the full
diagnosis and the fix that actually worked.

## The editorial rules this site follows

Written down because they were expensive to work out.

- Every claim traces to a source. The talk list comes from the 2023 tenure and
  promotion CV; press links were opened and checked.
- Conservative numbers. "50+ GRAMMY Camps" (real count 53), "25 years" of teaching
  from 2001. Bios elsewhere say 60+ and 100+ — those are wrong and should be
  corrected at the source.
- Awards attributed precisely — **both halves**. The Telly for *Learn & Master
  Guitar* was for educational video production. Nathan produced the entire
  series; Legacy Learning Systems submitted the entry and therefore holds the
  award. State both. Either one alone misleads, and an earlier version of this
  file gave only Legacy's half, which undersold him.
- No unlinked press claims. Every press source on the site now carries an
  "Archived copy" link as well as a live one.
- Photographers credited by name.
- Never invent a plausible-sounding detail. Two got caught on 31 Aug that
  nobody had ever checked: a "mortgage" (his house is paid off) and "three
  decades" of teaching (it is 25 years, and the site's own proof bar said so).
- Check a number even when it looks copied rather than invented. The Mixer's
  Toolkit ISBN was wrong in two places until 1 Sep 2026 — one digit off, and
  the correct value was sitting in the `<a href>` on the same line.
- Dated facts need their date written down. The used book prices on both book
  pages say "September 2026" on purpose. If anyone refreshes them, move the date
  with the number or drop both.

Open questions are marked `TODO (Nathan)` in the HTML. `CLAUDE.md` has the full
list plus what's worth fixing on the Belmont faculty page and in the bio sent to
conferences.

## Writing anything in Nathan's voice

There is a saved skill called **`my-writing-style`**, built from the
*Multi-Platinum Pro Tools* manuscript and four years of his sent email. Load it
before drafting copy, a newsletter issue, a post or an email.

**Do not use this site's copy as a style reference.** Much of it was AI-drafted
before the 31 Aug voice pass, and even the rewritten copy is downstream of the
profile rather than a source for it. The book and his email are the sources.
