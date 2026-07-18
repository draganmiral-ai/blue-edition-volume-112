# Onyx, Saffron, Emerald, Maroon & Blue / Volume 112

A quiet, single continuous-scroll digital editorial site by Dragan Andric,
containing five colour-themed editions back to back. No galleries, no
accounts, no forms — one calm scroll through all five.

**Live site:** https://draganmiral-ai.github.io/blue-edition-volume-112/

## Concept

**Onyx Edition / Volume 112** opens the site: a four-image nocturne about a
day spent at home, held by a small dark room while a fire kept burning on a
screen. It is deliberately the shortest edition — four photographs, three
short reflective fragments, nothing more — treated as a four-movement
chamber piece rather than padded out to match the others. Each chapter after
the cover emerges through **the Aperture**: the photograph begins clipped to
a narrow vertical slit, as if the eye is still adjusting to a dark room, and
widens open as the visitor scrolls into it. A colour-handover transition —
the last candle flame warming into a horizon — carries the visitor into
**Saffron Edition / Volume 112**: a poetic single-image essay built from one
photograph — a city intersection at a red light, sunset breaking through a
cloud-filled sky — and one poem, "To My Imaginary Lover." The poem unfolds
across seven quiet chapters, crops of the same photograph reframing it each
time, before a second colour-handover transition carries the visitor into
**Emerald Edition / Volume 112**: a cinematic visual essay about preserving
an inner centre while ordinary life moves, blurs, and accelerates around it.
Six short reflective fragments — never explaining themselves — mark the
moments where the external noise gives way to something steadier, closing on
a single wordless walking photograph. A third transition carries the visitor
into **Maroon Edition / Volume 112**: a fashion-magazine-inspired editorial
study in maroon, burgundy, oxblood, cream, and gold, pausing on a dedicated
Persian-inspired prayer interlude, then closing on its own single wordless
photograph. A fourth transition carries the visitor into **Blue Edition /
Volume 112**, a photo-book paced study in navy, cobalt, ivory, and concrete
across five plates and a closing colophon.

Each edition is deliberately distinct in feel — Onyx is dark, still, and
concentrated; Saffron is luminous, spacious, and literary; Emerald is dark,
kinetic, and reflective; Maroon is tactile, layered, and magazine-led; Blue
is spacious, architectural, and restrained — but all five share the same
craftsmanship, typographic discipline, and editorial restraint. Onyx,
Saffron, Emerald, and Maroon each use their own isolated CSS namespace and
colour variables (`o-`/`--o-*`, `s-`/`--s-*`, `e-`/`--e-*`, and `m-`/`--m-*`
respectively) so none can regress the others' design.

All visible text on the site is either the approved title/credit for each
edition, wording that already appears inside the photographs themselves
(the Onyx cover's embedded title and closing line, `STAY STRONG`, the
handwritten blessing, `THE FOUNTAINS`, `BELIEVE`, `KEEP FAITH`), the Saffron
poem, or — for Onyx and Emerald — a small number of approved reflective
sentences. No promotional copy, captions, or dedications were added — the
final photograph of Onyx, Emerald, and Maroon is intentionally left
completely wordless, and Saffron carries no copy beyond its title and the
poem itself.

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

## Technology

Plain, dependency-free **semantic HTML + CSS + vanilla JavaScript** — no
framework, no bundler, no build step. This was a deliberate choice: it loads
fast, has nothing to break, and deploys to GitHub Pages with zero build
tooling required.

- Responsive `<picture>` markup with WebP + JPEG sources and width-based
  `srcset`/`sizes`
- CSS custom properties for five isolated colour systems (Blue's original
  variables, plus separate `--m-*`, `--e-*`, `--s-*`, and `--o-*` sets each
  sampled from their own photographs)
- A small vanilla JS file handling: reading-progress bar, "return to top"
  button, a fixed edition index (`01 Onyx` / `02 Saffron` / `03 Emerald` /
  `04 Maroon` / `05 Blue`) with keyboard- and screen-reader-accessible
  current-edition state, optional arrow-key navigation between
  plates/spreads, a progressive-enhancement reveal-on-scroll for Onyx,
  Saffron, Emerald, and Maroon imagery (including Onyx's Aperture clip-path
  reveal), a subtle desktop-only parallax on Blue's plates, and a masthead
  auto-fit safety net that measures each oversized title word (including
  Emerald's vertical one) against its box and shrinks it if a given device's
  font metrics would otherwise clip it — all reduced-motion aware

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
4. Update the `alt` text to accurately describe the new image.

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

Follow the Onyx, Saffron, Emerald, or Maroon pattern rather than Blue's: give
the new edition its own CSS variable prefix (e.g. `--g-*` for a green
edition) and its own class namespace (`g-cover`, `g-spread`, …) so it cannot
regress the existing editions, add its own entry to the
`<nav class="edition-index">` list (updating the numbering for every entry),
and insert its markup, in scroll order, as the new first child inside the
shared `<main id="main">` if it should lead the site, or wherever in the
sequence it belongs otherwise.

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
redistributed, or reused without permission. The poem "To My Imaginary
Lover" likewise remains the property of its author and may not be
reproduced, redistributed, or reused without permission.
