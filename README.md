# Blue Edition / Volume 112

A quiet, single-page digital editorial photo book of five photographs by
Dragan Andric. No galleries, no accounts, no forms — one calm scroll through
five plates and a closing colophon.

**Live site:** _added after first deploy — see "Deployment" below_

## Concept

The edition explores how blue appears inside ordinary environments — deep
navy and cobalt, ivory and concrete, a trace of burgundy and warm amber —
moving from an industrial corridor, through a curated retail interior, an
intimate handwritten note, a graphic still life, and closing on a monumental
architectural column. The word **BLUE** is the recurring visual motif, used
sparingly: dominant on the cover, quiet everywhere else.

All visible text on the site is either the approved project title/credit, or
wording that already appears inside the photographs themselves (`STAY
STRONG`, the handwritten blessing, `THE FOUNTAINS`). No promotional copy or
invented captions were added.

## Technology

Plain, dependency-free **semantic HTML + CSS + vanilla JavaScript** — no
framework, no bundler, no build step. This was a deliberate choice for a
five-image single-page piece: it loads fast, has nothing to break, and
deploys to GitHub Pages with zero build tooling required.

- Responsive `<picture>` markup with WebP + JPEG sources and width-based
  `srcset`/`sizes`
- CSS custom properties for the full colour system
- A small vanilla JS file handling: reading-progress bar, "return to cover"
  button, optional arrow-key navigation between plates, and a subtle
  desktop-only parallax (all reduced-motion aware)

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

- `assets/images/originals/` — the five source photographs, unmodified,
  named `01-industrial-corridor.png` … `05-the-fountains.png`
- `assets/images/web/` — optimized derivatives used by the page, each as a
  `-large` (native resolution) and `-small` (720px, for narrow viewports)
  pair, in both `.webp` and `.jpg`

### Replacing or reordering photographs

1. Add your replacement file to `assets/images/originals/`.
2. Regenerate the `-large`/`-small` `.jpg`/`.webp` pairs into
   `assets/images/web/` (matching filenames), keeping the same portrait
   aspect-ratio conventions if possible.
3. Update the corresponding `<picture>` block in `index.html` — each of the
   five `<section class="plate plate--0N">` blocks is independent, so
   reordering means moving the whole `<section>` and updating its `01`–`05`
   folio marker.
4. Update the `alt` text to accurately describe the new image.

## Deployment (GitHub Pages)

This repository deploys via the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which uploads the repository root as a Pages
artifact on every push to `main` — no build step required. Enable it once
under the repository's **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

## Rights

The source code and the photographs have **separate rights** — see
[`LICENSE.md`](LICENSE.md). In short: the photographs remain the property of
Dragan Andric and may not be reproduced or reused without permission.
