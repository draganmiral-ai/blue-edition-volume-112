# Periwinkle, Pink, Onyx, Saffron, Emerald, Maroon & Blue / Volume 112

A quiet, single continuous-scroll digital editorial site by Dragan Andric,
containing seven colour-themed editions back to back. No galleries, no
accounts, no forms — one calm scroll through all seven.

**Live site:** https://draganmiral-ai.github.io/blue-edition-volume-112/

## Concept

**Periwinkle Edition / Volume 112** opens the site: a quiet story about an
unhurried letter, three days of rest, and the slow return of attention to
silence. The page begins almost colourless — warm ivory, a centred title,
then a single revealed line — before a large hero photograph brightens by
only a few imperceptible percent as the visitor scrolls. The full poem
follows, each stanza fading upward independently with generous space around
it, then a small unlabelled sequence of the remaining photographs, presented
without captions or grid, like walls in a quiet exhibition. After a long
pause, "A Note on Truth" explains — as a revelation, not a disclaimer — that
every photograph began as a real moment, gently translated through AI rather
than replaced by it. The edition ends simply, on a centred credit line, and
hands off into **Pink Edition / Volume 112**: a typographic and interactive
love letter, built entirely from colour, type, translucent layers, and
light — no photographs. The page begins almost colourless and, as the
visitor scrolls, pink gradually enters the environment: first as a small
point of light, then a blush, then translucent colour, warmth, and
atmosphere, before softening again into a final quiet field. A gradual
colour-handover carries the visitor into **Onyx Edition / Volume 112**: a
four-image nocturne about a day spent at home, held by a small dark room
while a fire kept burning on a screen — deliberately the shortest edition,
treated as a four-movement chamber piece. Each chapter after its cover
emerges through **the Aperture**: the photograph begins clipped to a narrow
vertical slit, as if the eye is still adjusting to a dark room, and widens
open as the visitor scrolls into it. A second colour-handover transition —
the last candle flame warming into a horizon — carries the visitor into
**Saffron Edition / Volume 112**: a poetic single-image essay built from one
photograph — a city intersection at a red light, sunset breaking through a
cloud-filled sky — and one poem, "To My Imaginary Lover." The poem unfolds
across seven quiet chapters, crops of the same photograph reframing it each
time, before a third transition carries the visitor into **Emerald Edition /
Volume 112**: a cinematic visual essay about preserving an inner centre
while ordinary life moves, blurs, and accelerates around it. Six short
reflective fragments — never explaining themselves — mark the moments where
the external noise gives way to something steadier, closing on a single
wordless walking photograph. A fourth transition carries the visitor into
**Maroon Edition / Volume 112**: a fashion-magazine-inspired editorial study
in maroon, burgundy, oxblood, cream, and gold, pausing on a dedicated
Persian-inspired prayer interlude, then closing on its own single wordless
photograph. A fifth transition carries the visitor into **Blue Edition /
Volume 112**, a photo-book paced study in navy, cobalt, ivory, and concrete
across five plates and a closing colophon.

Each edition is deliberately distinct in feel — Periwinkle is unhurried,
tender, and quietly convalescent; Pink is feminine, magical, and quietly
playful; Onyx is dark, still, and concentrated; Saffron is luminous,
spacious, and literary; Emerald is dark, kinetic, and reflective; Maroon is
tactile, layered, and magazine-led; Blue is spacious, architectural, and
restrained — but all seven share the same craftsmanship, typographic
discipline, and editorial restraint. Periwinkle, Pink, Onyx, Saffron,
Emerald, and Maroon each use their own isolated CSS namespace and colour
variables (`pw-`/`--pw-*`, `p-`/`--p-*`, `o-`/`--o-*`, `s-`/`--s-*`,
`e-`/`--e-*`, and `m-`/`--m-*` respectively) so none can regress the others'
design.

All visible text on the site is either the approved title/credit for each
edition, wording that already appears inside the photographs themselves
(the Onyx cover's embedded title and closing line, `STAY STRONG`, the
handwritten blessing, `THE FOUNTAINS`, `BELIEVE`, `KEEP FAITH`), the
Periwinkle poem and its Note on Truth, the Saffron poem, or a small number
of approved reflective sentences (Pink, Onyx, Emerald). No promotional
copy, captions, or dedications were added — the final photograph of Onyx,
Emerald, and Maroon is intentionally left completely wordless, Pink's own
final line is its last visible text, Saffron carries no copy beyond its
title and the poem itself, and Periwinkle ends on nothing but its own
credit line.

### Periwinkle Edition text

Periwinkle's poem and closing note are used in full and unaltered, split
across the edition's six sections in this order:

1. *Some letters arrive / exactly when we are ready / to read them.* — the
   almost-colourless opening, before the first image
2. The hero photograph (envelope, flowers, coffee, morning light), which
   brightens by only a few percent as it scrolls into view
3. The full poem "Periwinkle" — all 27 stanzas, each fading upward
   independently as its own moment
4. A small unlabelled sequence of the remaining photographs, presented
   without captions, cards, or a grid
5. "A Note on Truth" in full — explaining that every photograph began as a
   real moment, gently translated through AI to feel closer to how the
   moment felt, not to replace it
6. The closing credit line, "Edition 112 / Periwinkle," and nothing else

Both the poem and the Note on Truth live as plain `<p class="pw-poem__stanza">`
/ `<p class="pw-truth__stanza">` elements inside `index.html`. Edit the
wording there directly — there is no separate data file, and no line should
be added, paraphrased, or reordered.

### Pink Edition text and the Living Light

Pink Edition contains no photographs — the entire experience is typography,
colour, and light. Its approved lines appear exactly once each, in this
order:

1. *Some colours are seen. / Hers is felt.* — beside the opening cover
2. *She does not wear pink. / Pink happens around her.* — the largest
   typographic moment, section 2
3. *The room becomes softer.* / *Ordinary days begin to sparkle.* /
   *People remember how to be lighter.* / *Even seriousness loosens its
   grip.* — four independent fragments, section 3
4. *Some magic refuses to grow up.* — the Tinkerbell moment, section 4
5. *Her softness was never fragility. / It was the courage to remain
   tender / in a world that kept asking her not to.* — the emotional
   centre, section 5
6. *To Naz, / who never simply loved pink. / She taught it how to live.* —
   the love letter, section 6 (the only place her name appears)
7. *And somehow, the world blushes back.* — the final line, section 7

**The Living Light** (`.p-light`, inside a `position: sticky` `.p-light-track`
spanning the whole edition — the same technique as the Emerald Line) is a
small warm pink-and-gold point that stays present throughout Pink Edition.
Its resting position per chapter is driven by an `IntersectionObserver`
toggling an `at-{chapter}` class on the track, so it follows the same
"predetermined path" on every device. On fine-pointer devices only, a small
additional offset gently eases it toward the cursor (a continuous
`requestAnimationFrame` loop that starts/stops based on whether Pink Edition
is actually in view, so it never runs indefinitely in the background); a
tap on the Tinkerbell section gives it one brief pulse. None of this gates
the text, which reveals automatically on scroll regardless of interaction.
Under `prefers-reduced-motion: reduce`, the pointer-following and tap pulse
are skipped entirely and the light only changes position/opacity instantly
between chapters, with no drifting animation.

### The Aperture (Onyx)

Onyx's signature visual device: each of its three chapter images (not the
cover, whose title is embedded in the photo) starts clipped by CSS
`clip-path: inset()` to a narrow vertical slit and widens to the full image
as it scrolls into view, via the same progressive-enhancement
`.js-reveal-armed`/`.is-revealed` mechanism every other edition's reveal
uses. Fully visible immediately with JavaScript disabled or reduced motion
enabled — see `.o-aperture__image` in `assets/css/style.css`.

### Onyx reflective text

Exactly three fragments, each appearing once:

1. *Something remained lit behind the quiet.* — beside the reflection image
2. *The language gathered in the dark.* — beside the laptop image
3. *A little flame was enough.* — its own brief pause before the final,
   wordless candle photograph

### The Saffron poem

"To My Imaginary Lover" is used in full and unaltered, split across the
edition's chapters in this order — title page, then:

1. *Tonight, I met you at a red light... / Not in a dream... were happening
   above it.* — first movement, grounded in the city
2. *The light told me to wait. / So I waited.* — the central pause, its own
   nearly-empty section
3. *And somewhere between... with intention.* — the sky opens
4. *Until the day... that suddenly feels sacred.* — looking upward
5. *And when the road finally opens... it would not remain so forever.* —
   the final crossing, returning to the full photograph

The poem text lives as plain `<p class="s-poem__stanza">` elements inside
`index.html`, within each `<section class="s-poem s-poem--*">`. Edit the
wording there directly — there is no separate data file. The final line
("it would not remain so forever.") carries a subtle colour/italic emphasis
via `.s-poem__emphasis`; nothing else in the poem is styled differently.

### The Emerald Line

Emerald's signature visual element is a single thin vertical line (`.e-line`)
that runs through the entire edition via `position: sticky`, sitting at
roughly 40% of the viewport width on desktop and closer to the left margin on
mobile (`--e-line-x`, set on `.e-edition` and overridden in a mobile media
query). It stays visually calm while the surrounding photographs and colours
change, gives the reflective text fragments something to align to, and
during the closing transition gradually hands off its colour from emerald to
burgundy as the edition changes.

### Emerald reflective text placement

The six approved sentences appear exactly once each, in this order:

1. *Something in me stays.* — beside the Emerald cover
2. *I return before the noise decides.* — after the external-motion sequence
3. *What is rooted does not rush.* — beside the rain-covered leaves
4. *The unseen still holds.* — aligned to the Emerald Line, believe spread
5. *I know where to find myself.* — set apart from the handwritten note
6. *I take the quiet with me.* — its own brief pause before the final image

### The Atmosphere System

A shared, config-driven ambient particle layer any edition can opt into by
adding `data-atmosphere="{type}"` to its edition wrapper — no per-edition
rendering code required. `ATMOSPHERE_CONFIG` in `assets/js/main.js` maps
each type (`sparkle`, `ember`, `dust-light`, `botanical-shadow`, `dust`,
plus the special-cased `texture`) to particle count, colours, size and
duration ranges, drift distance, and peak opacity; `initAtmosphere()` reads
every `[data-atmosphere]` element on the page once and populates it with a
`.atmosphere-layer` of `.atmosphere-particle` spans, each animated by a
single shared `@keyframes atmosphere-float` driven entirely by inline CSS
custom properties (`--drift-x`, `--drift-y`, `--particle-duration`,
`--particle-delay`, `--particle-peak-opacity`) — so no new CSS is needed to
add a new atmosphere, only a new config entry. Currently applied:

- Periwinkle (`dust`) — very soft floating dust, plus a single lavender
  petal (`.pw-petal-track` / `.pw-petal`) that drifts across the page at
  most once per visit, deliberately kept separate from the looping ambient
  particles since it must never repeat or become decorative
- Pink (`sparkle`) — small soft sparkles (in addition to the pre-existing
  Living Light)
- Onyx (`ember`) — tiny, almost-invisible warm amber embers
- Saffron (`dust-light`) — gentle warm light drifting like sunlight through
  dust
- Emerald (`botanical-shadow`) — slow, barely-visible floating leaf shadows
- Maroon (`texture`) — a single near-static `.atmosphere-texture` overlay
  rather than discrete particles, matching its Persian-inspired restraint
- Blue — intentionally has no atmosphere at all; it is meant to stay quiet

Every particle is `aria-hidden="true"` and purely decorative. The whole
system is skipped entirely under `prefers-reduced-motion: reduce` — no
particles are created, rather than created-but-frozen. Adding atmosphere to
a future edition means adding one new entry to `ATMOSPHERE_CONFIG` (or, for
a static-texture look, reusing the `texture` special case) and one
`data-atmosphere` attribute; the rendering code never needs to change.

### The Ambient Audio system

A reusable, strictly opt-in ambience system, off by default and never
autoplaying. `AUDIO_CONFIG` in `assets/js/main.js` holds one entry per
edition (`src`, `volume`, `loop`, `fadeMs`, `enabled`); `initAmbientAudio()`
checks whether *any* edition has a real, enabled track configured, and if
none do, it does not insert a toggle button at all — no broken or
non-functional control ever ships. When at least one track is configured,
a small toggle appears (`.ambient-audio-toggle`) only after the visitor's
first genuine interaction (scroll, click, or key press), stays off until
they explicitly turn it on, and cross-fades between edition tracks as the
visitor scrolls (reusing the same active-edition tracking that drives the
edition index highlighting).

**Current status:** no audio track has been supplied for any edition in
this repository, so every `AUDIO_CONFIG` entry has `enabled: false` and the
toggle is dormant site-wide — this is a genuine, disclosed limitation, not
a placeholder pretending to work. To add ambience to an edition, drop an
audio file under `assets/audio/`, set that edition's `src` to its path, and
flip `enabled: true`; nothing else in the system needs to change.

## Technology

Plain, dependency-free **semantic HTML + CSS + vanilla JavaScript** — no
framework, no bundler, no build step. This was a deliberate choice: it loads
fast, has nothing to break, and deploys to GitHub Pages with zero build
tooling required.

- Responsive `<picture>` markup with WebP + JPEG sources and width-based
  `srcset`/`sizes` (every edition except Pink, which uses no images at all)
- CSS custom properties for seven isolated colour systems (Blue's original
  variables, plus separate `--pw-*`, `--m-*`, `--e-*`, `--s-*`, `--o-*`, and
  `--p-*` sets — six sampled from their own photographs, Pink's composed by
  eye since it has none)
- A small vanilla JS file handling: reading-progress bar, "return to top"
  button, a fixed edition index (`01 Periwinkle` / `02 Pink` / `03 Onyx` /
  `04 Saffron` / `05 Emerald` / `06 Maroon` / `07 Blue`) with keyboard- and
  screen-reader-accessible current-edition state, optional arrow-key
  navigation between plates/spreads, a progressive-enhancement
  reveal-on-scroll for Periwinkle, Pink, Onyx, Saffron, Emerald, and Maroon
  content (including Onyx's Aperture clip-path reveal), Pink's Living Light
  behaviour, a subtle desktop-only parallax on Blue's plates, the shared
  config-driven Atmosphere System and Periwinkle's one-shot petal drift, the
  optional Ambient Audio system, and a masthead auto-fit safety net that
  measures each oversized title word (including Emerald's vertical one)
  against its box and shrinks it if a given device's font metrics would
  otherwise clip it — all reduced-motion aware

## Local development

No install step is required. From the project root:

```bash
npm run dev
# or, without npm:
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Production build

There is no build step — `index.html` is the deployable site as-is.

## Image assets

- `assets/images/originals/` — all source photographs, unmodified:
  - Periwinkle: `periwinkle-hero-envelope`, `periwinkle-letter-reveal`,
    `periwinkle-envelopes-table`, `periwinkle-desk-laptop`
  - Pink: none — the entire edition is CSS/typography/light, no images
  - Onyx: `onyx-convalescence-cover`, `onyx-reflection`, `onyx-language`,
    `onyx-flame`
  - Saffron: `saffron-red-light-sky` (single image, reused with different
    CSS crops across the edition's chapters)
  - Emerald: `emerald-elevator-cover`, `emerald-sprinklers`,
    `emerald-rain-window`, `emerald-car-butterfly`, `emerald-rain-leaves`,
    `emerald-certificate-primary`, `emerald-certificate-detail`,
    `emerald-believe-primary`, `emerald-believe-detail`,
    `emerald-keep-faith`, `emerald-ordinary-ritual`,
    `emerald-walking-finale`
  - Maroon: `maroon-cover-ibrahim`, `maroon-light-object`,
    `maroon-walk-overhead`, `maroon-walk-motion`, `maroon-ring-detail`,
    `maroon-portfolio`, `maroon-bag-cabinet`, `maroon-shoes-sunlight`,
    `maroon-shoes-plants`, `maroon-prayer-interlude`,
    `maroon-slytherin-finale`
  - Blue: `01-industrial-corridor` … `05-the-fountains`
- `assets/images/web/` — optimized derivatives used by the page, each as a
  `-large` (native resolution) and `-small` (720px, for narrow viewports)
  pair, in both `.webp` and `.jpg`

### Replacing or reordering photographs

1. Add your replacement file to `assets/images/originals/`.
2. Regenerate the `-large`/`-small` `.jpg`/`.webp` pairs into
   `assets/images/web/` (matching filenames), keeping the same portrait
   aspect-ratio conventions if possible.
3. Update the corresponding `<picture>` block in `index.html`:
   - Periwinkle: the hero image lives in `<figure class="pw-hero__figure">`;
     the remaining photographs live as independent `<figure class="pw-gallery__figure">`
     elements inside `<section class="pw-gallery">` — reorder by moving the
     whole `<figure>`. No captions or grid should be added, by design.
   - Blue: each of the five `<section class="plate plate--0N">` blocks is
     independent — reorder by moving the whole `<section>` and updating its
     `01`–`05` folio marker.
   - Maroon: each `<section class="m-spread m-spread--*">` is independent —
     reorder by moving the whole `<section>` and updating its `m-folio`
     marker. The prayer `<section class="m-interlude">` and the wordless
     `<section class="m-finale">` must keep no folio, no heading, no
     caption, and no overlaid text by design.
   - Emerald: each `<section class="e-spread e-spread--*">` (plus the
     three-image `<section class="e-sequence">`) is independent — reorder
     the same way. The wordless `<section class="e-finale">` must keep no
     caption or overlaid text by design; the six `.e-text` reflective
     sentences should stay with their intended image per the table above.
   - Saffron: uses a single photograph reused across chapters via different
     `.s-poem__image` modifier classes (`--sky`, `--upward`, `--full`)
     controlling the crop/aspect-ratio — there is nothing to reorder unless
     a second Saffron photograph is added in the future.
   - Onyx: each `<section class="o-aperture o-aperture--*">` is independent
     — reorder the same way. The cover's embedded title/closing line must
     never be duplicated as overlaid HTML text, and the wordless
     `<section class="o-aperture o-finale">` must keep no caption or
     overlaid text by design.
   - Pink: has no photographs to reorder — see "Editing Pink Edition"
     below to change its copy or visual layers instead.
4. Update the `alt` text to accurately describe the new image.

### Editing Periwinkle Edition

The poem and the Note on Truth live as plain `<p class="pw-poem__stanza">`
/ `<p class="pw-truth__stanza">` elements inside `<section class="pw-poem">`
and `<section class="pw-truth">` in `index.html`. Only the approved,
exact wording should be used — do not add, paraphrase, or reorder stanzas.
The hero brighten-on-scroll effect is controlled by `.pw-hero__figure`'s
filter transition in `assets/css/style.css`; the single drifting petal is
`#pwPetal` inside `.pw-petal-track`, triggered once by the
`IntersectionObserver` in `assets/js/main.js` — see "The Atmosphere System"
above.

### Editing Pink Edition

All seven approved text moments live as plain `<p class="p-text ...">` /
`<p class="p-statement">` elements inside each
`<section class="p-section p-section--*">` (plus the opening
`<header class="p-cover">`) in `index.html`. Only the approved lines should
be used — do not add, paraphrase, or duplicate them, and do not repeat
Naz's name outside the love-letter section. The translucent `.p-bloom`
layers, the oversized `.p-fragment-letter`, and the Living Light
(`.p-light`) are Pink's only three recurring visual devices, by design —
see "Pink Edition text and the Living Light" above.

### Editing the reflective text (Onyx / Emerald)

The Onyx and Emerald sentences live as plain `<p class="o-text ...">` /
`<p class="e-text ...">` elements inside `index.html`. Only the approved
sentences for each edition should be used — do not add, paraphrase, or
duplicate them elsewhere on the page.

### How the Aperture works (Onyx)

See "The Aperture" above. To retune the reveal width, adjust the
`clip-path: inset()` values on `.js-reveal-armed .o-aperture__image` (and
its mobile override) in `assets/css/style.css`.

### How the Emerald Line works

See "The Emerald Line" above. To retune it, adjust the `--e-line-x` custom
property on `.e-edition` in `assets/css/style.css` (and its mobile override)
rather than editing individual section rules.

### Adding a future colour edition

Follow the Periwinkle, Pink, Onyx, Saffron, Emerald, or Maroon pattern
rather than Blue's: give the new edition its own CSS variable prefix (e.g.
`--g-*` for a green edition) and its own class namespace (`g-cover`,
`g-spread`, …) so it cannot regress the existing editions, add its own
entry to the `<nav class="edition-index">` list (updating the numbering for
every entry), and insert its markup, in scroll order, as the new first
child inside the shared `<main id="main">` if it should lead the site, or
wherever in the sequence it belongs otherwise. If the new edition should
have an ambient particle layer, add one entry to `ATMOSPHERE_CONFIG` in
`assets/js/main.js` and a matching `data-atmosphere="{type}"` attribute on
its wrapper — no rendering code needs to change. If it should have optional
ambience, add one entry to `AUDIO_CONFIG` with a real `src` and
`enabled: true` — see "The Ambient Audio system" above.

## Deployment (GitHub Pages)

This repository deploys via the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which uploads the repository root as a Pages
artifact on every push to `main` — no build step required. Enable it once
under the repository's **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

## Rights

The source code and the photographs have **separate rights** — see
[`LICENSE.md`](LICENSE.md). In short: all photographs and visual artworks
remain the property of Dragan Andric and may not be reproduced,
redistributed, or reused without permission. The poems "Periwinkle" and "To
My Imaginary Lover," and the "A Note on Truth" text, likewise remain the
property of their author and may not be reproduced, redistributed, or
reused without permission.
