# Maroon & Blue Edition / Volume 112

A quiet, single continuous-scroll digital editorial site by Dragan Andric,
containing two colour-themed editions back to back. No galleries, no
accounts, no forms — one calm scroll through both.

**Live site:** https://draganmiral-ai.github.io/blue-edition-volume-112/

## Concept

**Maroon Edition / Volume 112** opens the site: a fashion-magazine-inspired
editorial study in maroon, burgundy, oxblood, cream, and gold, moving through
personal objects, jewellery, movement, and private spaces before closing on
a single wordless photograph. The visitor then scrolls through a quiet
colour-handover transition into **Blue Edition / Volume 112**, a photo-book
paced study in navy, cobalt, ivory, and concrete across five plates and a
closing colophon.

The two editions are deliberately distinct in feel — Maroon is tactile,
layered, and magazine-led; Blue is spacious, architectural, and restrained —
but share the same craftsmanship, typographic discipline, and editorial
restraint. Maroon uses its own isolated `m-`-prefixed CSS namespace and
colour variables so it can never regress Blue's existing design.

All visible text on the site is either the approved title/credit for each
edition, or wording that already appears inside the photographs themselves
(`STAY STRONG`, the handwritten blessing, `THE FOUNTAINS`). No promotional
copy, captions, or dedications were added — the final Maroon photograph in
particular is intentionally left completely wordless.

## Technology

Plain, dependency-free **semantic HTML + CSS + vanilla JavaScript** — no
framework, no bundler, no build step. This was a deliberate choice: it loads
fast, has nothing to break, and deploys to GitHub Pages with zero build
tooling required.

- Responsive `<picture>` markup with WebP + JPEG sources and width-based
  `srcset`/`sizes`
- CSS custom properties for two isolated colour systems (Blue's original
  variables, plus a separate `--m-*` set sampled from the Maroon photographs)
- A small vanilla JS file handling: reading-progress bar, "return to top"
  button, a fixed edition index (`01 Maroon` / `02 Blue`) with keyboard- and
  screen-reader-accessible current-edition state, optional arrow-key
  navigation between plates/spreads, a progressive-enhancement reveal-on-
  scroll for Maroon imagery, and a subtle desktop-only parallax on Blue's
  plates — all reduced-motion aware

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
  - Maroon: `maroon-cover-ibrahim`, `maroon-light-object`,
    `maroon-walk-overhead`, `maroon-walk-motion`, `maroon-ring-detail`,
    `maroon-portfolio`, `maroon-bag-cabinet`, `maroon-shoes-sunlight`,
    `maroon-shoes-plants`, `maroon-slytherin-finale`
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
   - Maroon: each `<section class="m-spread m-spread--*">` (plus the
     wordless `<section class="m-finale">`) is independent — reorder the
     same way, updating the `m-folio` marker. The finale section must keep
     no folio, no caption, and no overlaid text by design.
4. Update the `alt` text to accurately describe the new image.

### Adding a future colour edition

Follow the Maroon Edition's pattern rather than Blue's: give the new edition
its own CSS variable prefix (e.g. `--g-*` for a green edition) and its own
class namespace (`g-cover`, `g-spread`, …) so it cannot regress the existing
editions, add its own entry to the `<nav class="edition-index">` list, and
insert its markup, in scroll order, inside the shared `<main id="main">`.

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
redistributed, or reused without permission.
