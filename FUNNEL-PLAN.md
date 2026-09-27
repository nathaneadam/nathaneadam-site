# Funnel plan — turning the site toward the diagnostic

Drafted 1 September 2026 and **built the same day**, commits `f64c853` and
`7d609d4`. This file is now the record of what was decided and why, not a
proposal. Everything below is on the site unless a line says otherwise.

**What is still open**, so it does not get lost at the bottom of a long file:

1. Nathan has not seen any of this rendered. Chrome will not open `file://`
   and neither will the built-in browser, so the phone check is owed.
2. Nathan has not submitted a test address through the gate. The redirect is
   configured but unproven end to end.
3. The beehiiv welcome email is still the default. The result page now
   promises it asks "what's your craft?", so until that email is written the
   site makes a promise beehiiv does not keep.

## The shape

Graham Cochrane's site does four things well, and only four matter here:

1. One primary ask, repeated on every page, in the same words. His is "Work
   with Graham". Ours becomes **the diagnostic**.
2. The free thing is a *thing*, not "join my list". His is a five-day
   challenge. Ours is a two-minute read on which half of your work is at
   risk. People take a tool; they don't take a newsletter.
3. The email is captured *inside* the free thing, not beside it.
4. Every page ends by pointing at the ask. Nobody hits a footer and stops.

The funnel, in order:

```
LinkedIn post / former student / Google
        → tools/career-pivot.html   (ten questions, free half of the read)
        → email gate                (beehiiv form #2, hard gate)
        → career-pivot-result.html  (the useful half)
        → welcome email             (beehiiv automation, not built yet)
        → weekly email              (the relationship)
        → coaching / course         (someday. Not mentioned on the site until real.)
```

What we do **not** copy from Graham: the offer grid (nothing for sale),
"only available here", countdown timers. The professor position is the
asset. The moment the site looks like a coaching launch it loses the thing
that makes people trust the diagnostic.

**Testimonials are back in.** CLAUDE.md rejected them on 23 Aug because
there was nothing sourced. Nathan has thirteen years of Belmont course
evaluations, which is a different thing entirely: they are proof of the one
claim the diagnostic rests on, that he can teach this.

**They went on with NO names, and that is the decision, not a shortcut.**
The first draft of this plan said each quote needed a real name. That was
wrong, and it was corrected before anything shipped. The evaluations are
anonymous — nobody knows which student wrote which comment. Nathan offered a
roster of ~80 former students' names to attach; attaching them would have
been a fabrication a real person could spot on their own name. So each quote
carries its course and term, and one line above the block says they are
anonymous and that this is why he trusts them.

Built: three on `index.html` under the proof bar (`.voices`), seven on
`about.html` (`.voices-run`), one at the gate (`C.gate.quote`). Picked for
specificity, not praise. Shortlist of thirty is in
`TESTIMONIALS-SHORTLIST.md`.

The honest route to *named* testimonials is still open and still worth
doing: email a dozen former students Nathan actually remembers and ask for a
fresh, consented line. That email is not drafted yet.

**The CTA label everywhere is "Take the AI Career Diagnostic".** Not
"Take the diagnostic", which Nathan judged too weak to carry a page. Same
words on all 23 pages; do not vary it.

**A voice rule came out of this session and belongs in the style profile:**
after a plain fact, stop. Two proposed lines were struck for adding a clever
turn to a fact that was already doing the work — "which makes me harder to
bribe than most people writing about it" and "I'd rather say it out loud
than hide it in a footnote". Both facts stayed; both turns went.

## The gate — DONE, 1 Sep 2026

The gate is real. Form #2 exists (`712946f7-3291-4efe-b002-6c65f0458621`,
named "Diagnostic gate — career pivot result"), its redirect points at the
result page, and `GATE.mode` is `"beehiiv"`. The "no thanks, show me anyway"
link is gone, because subscribing is now how you reach the result and nobody
dead-ends.

Details worth keeping:

- **"Remove emails from the redirect URL" is ON.** beehiiv otherwise appends
  the subscriber's address to the redirect as a query parameter, which puts
  a real person's email into browser history and any referrer header. Leave
  it on.
- **The redirect option does exist** — "Redirect to an external website",
  under the form's Settings tab. But the account was on a **Max trial, day 2
  of 14** when this was set up. If the option disappears when the trial
  ends, that is the reason, and the answer is the soft gate again rather
  than a wall with nothing behind it.
- **The measurement bonus is real:** beehiiv reports subscribers per form,
  so diagnostic signups are countable separately from homepage ones. That is
  the only measurement this site has.
- **A privacy win nobody planned.** In beehiiv mode the diagnostic links out
  to the hosted form instead of embedding beehiiv's loader, so the tool now
  loads zero third-party scripts and sets no cookie. Only the homepage does.

**Untested:** no address has been submitted through it. Run yourself through
the diagnostic with a real email and confirm you land on the result page.

## The five "nothing to sell" lines — all rewritten

Each rewrite had to be true today and still true the day a course exists.
The trick was keeping the *point* (no hype, no incentive to oversell) and
dropping the *promise* (never selling anything, ever).

| Where | Was | Now on the site |
|---|---|---|
| `index.html` story | "…who cracked the code last Tuesday and has a course to sell you." | "…who cracked the code last Tuesday." (the sentence loses nothing) |
| `index.html` card 3 | "I have tenure and nothing to sell you, which makes me harder to bribe…" | "I have tenure, so none of this has to pay the bills by Friday." |
| `tools.html` lede | "Nothing here is a lead magnet with a course bolted to the back of it." | "The first half of every result is free. The rest comes with the weekly email." |
| `tools.html` meta description | "…none of them try to sell you a course." | "…they run in your browser, and the full read comes with the weekly email." |
| `index.html` newsletter section | "No hype, no income screenshots, no promises to 10x your life." | Kept. Still true, still will be. |

Nathan's correction, 1 Sep: no clever turn after the plain fact. State it and
stop. (Struck: "harder to bribe than most people writing about it", "I'd
rather say it out loud than hide it in a footnote".)

"I don't sell or share your address" stays everywhere. That one is a
privacy statement, not a business one.

## Page by page

### Nav and footer, all 23 files

The nav button changed from **Get the weekly email** to **Take the AI Career
Diagnostic**, pointing at `tools/career-pivot.html` with the right relative
path per directory. The email stays reachable from the footer, the homepage
section, and the gate itself. One ask in the nav, same words on every page.

### `index.html`

- Hero headline unchanged. Lede gains the ask: *"For experienced
  professionals who suspect the AI wave already came and went without them.
  It didn't. Start with ten questions about how you actually get paid and
  I'll tell you which half of your work is exposed and which half isn't.
  About two minutes."*
- Buttons: orange **Take the AI Career Diagnostic**, ghost **Get the weekly
  email**. The orange one moved; it used to be the email.
- New section between the story and "What you'll find here", styled like
  the existing cards, not a new component: a single block for the
  diagnostic with a one-line description and the same orange button.
  This is the Graham "lead magnet block" without the tablet mockup.
- Card 3 rewrite, above.
- Newsletter section keeps its form, gains one line: *"Already took the
  diagnostic? This is where the rest of it lives."*

### `tools.html`

- Lede and meta rewrite, above.
- The diagnostic card gets an actual button, not just a linked heading.
- "More coming" stays. It promises the assignment helper; either build it
  or leave the paragraph, but don't add anything else there.

### `tools/content.js` (every word of the diagnostic)

- Intro lede *"No email needed to start"* stays. It's true and it's a
  reason to start.
- Gate button: "Show me the rest" → **"Send me the full read"**. It says what
  happens.
- Gate body: tighten so the value is listed before the ask, which it
  already mostly does.
- Result page gets a closing block: *"The welcome email asks one question:
  what's your craft? Reply to it. I read every one, and it's how I decide
  what to write about next."* This is the cheapest customer research a
  future course could have, and it makes the first email a conversation.
- The caveat stays, verbatim. It's what makes the rest believable.

### `about.html`, `credits.html`, `projects.html`, all 14 project pages

Add one shared callout before each footer, one class, one CSS rule scoped
to `.tool-callout` so it can't reach anything else:

> **Wondering which half of your own work is at risk?**
> Ten questions, about two minutes, and my honest read. No score, because a
> score would be a number I made up.
> [Take the diagnostic]

Existing end-of-page button rows (Full credits / Speaking & press) stay
underneath it. The callout is the ask; those are navigation.

### `speaking.html`

Different visitor, different ask. Booking stays primary. Gets the callout
above the footer like everything else and nothing more.

### `404.html`

Primary button → the diagnostic. Somebody who typed a dead URL from the old
site is exactly a former student.

### Share card — built

`images/og-card-diagnostic.jpg`, 1200×630, made from `og-card.jpg` with
Pillow (Poppins is installed in the sandbox). The question on the navy left
half, the same TEDx portrait on the right. `tools/career-pivot.html` points
at it; every other page keeps `og-card-profile.jpg`.

## Not on the site, but it's the rest of the funnel

- **The welcome email.** beehiiv sends one automatically. Right now it's
  presumably the default. It should be in your voice, deliver the "here's
  the rest" promise, and ask the one question. I can draft it.
- **The LinkedIn post** announcing the diagnostic to former students. I can
  draft that too.
- **Coaching and courses stay off the site** until there is something to
  buy. The editorial rules apply to offers as much as to camp counts: no
  claim before it's real. When it is real, it gets its own page and the
  "What you'll find here" cards become the offer grid Graham has.

## What happened, and what is next

Done on 1 Sep 2026, in two commits:

- `f64c853` — the funnel: nav CTA on 23 pages, hero, callouts, the five
  rewritten lines, testimonials, share card, 404.
- `7d609d4` — the gate: form #2 built in beehiiv, `GATE.mode` flipped, skip
  link gone.

Next, in order:

1. **Nathan:** push, then look at the homepage and the diagnostic on a
   phone. The `.voices-grid` at three columns and the `.q-card`
   `min-height` are the likeliest things to be wrong.
2. **Nathan:** run yourself through the diagnostic with a real address and
   confirm the redirect lands on the result page.
3. **Claude:** draft the beehiiv welcome email in his voice — deliver "the
   rest", ask the one question. This is the outstanding promise.
4. **Claude:** draft the LinkedIn post announcing the diagnostic to former
   students, and the email asking a dozen of them for a named line.
5. **Claude:** the assignment redesign helper, which `tools.html` promises.

## Update, 27 Sep 2026: more borrowed from Graham

Nathan asked what else on grahamcochrane.com was worth taking. Three sections
went on `index.html`, then the whole middle of the page was restyled to
Graham's layout (full-width colour bands, text beside photos, two-tone
headlines):

- **Problem section**, "Nobody is born a tech person." Graham's is "We all want
  a life of fulfillment…". Nathan's states his real thesis, which the hero
  headline does not.
- **Personal message**, "Twenty minutes, then twenty hours." Graham's is "A
  Message From Graham". Nathan's is the learning ladder and the 5%er / 80%er
  split, with a photo collage.
- **Official bio**, "Introducing me at an event?" Graham's is "About Graham
  Cochrane". Nathan's exists so organisers stop copying wrong numbers.

**Still deliberately not copied:** the offer grid ("How Graham Can Help You"),
the $10K challenge, and the podcast block. Same reasons as above: nothing is
for sale yet, and there is no YouTube episode 1. Named endorsements like
Graham's wait on consented quotes from former students.

The diagnostic callout now sits right after the ladder section, whose last
line leads into it ("The diagnostic below takes two.").
