# Express Employment Professionals ANZ, for agents

This repo is the canonical brand system for Express Employment Professionals in Australia and New Zealand. Read this file before you make anything.

## Non-negotiable rules

Break any of these and the output is wrong, regardless of how good it looks.

**Language**

1. **Australian English.** Customise, organisation, recognised, specialise, centre. Two exceptions only: the proper noun *Specialized Recruiting Group*, and copy quoted verbatim from Express Employment International.
2. **Dates are DD/MM/YYYY.** Money is AUD or NZD, and say which.
3. **Never call people "resources", "headcount", "units", or "bodies".** Express places *associates*, works with *client companies*, and serves *job seekers*.
4. **Never imply a job seeker pays a fee.** "You will never pay a fee for our services" is a standing commitment on nearly every job seeker page.
5. **Never write "guaranteed"** against a placement, an outcome, or franchise income.

**Colour**

6. **Light blue `#0096D6` is never a text colour.** 3.32:1 on white and 2.47:1 on deep blue. It is a mark, gradient, and large-graphic colour only.
7. **Yellow `#E9B632` is a fill that carries dark ink.** Never type, never a line, never a standalone signal on a light ground. 1.87:1 on white.
8. **Never put white text on brand green `#5A9F51` or brand orange `#D5672C`.** Both fail AA. Use `--brand-status-success` `#467C3F` and `--brand-status-warning` `#B35524` for text.
9. **Secondary colours never enter the logo.** No green X, no purple wordmark, ever.
10. **Only four gradients exist:** green to blue, blue to purple, purple to orange, red to yellow. Never invent a fifth.
11. **No muted text on a medium blue `#0077C0` ground.** White reaches only 4.77:1 there, so nothing dimmer clears AA. Use white, or move the block to deep blue.

**Logo**

12. **Four treatments and no others:** three blue, all deep blue, all black, all white. Never recoloured, boxed, outlined, shadowed, skewed, stretched, condensed, or placed on a pattern.
13. **Clear space equals 45% of the lock-up height** on all four sides, which is the top half of the stylised X. Nothing enters it.
14. **The trade mark symbol is `&reg;`.** Any Express logo carrying `SM` is discontinued artwork.
15. **Never assemble a tagline lock-up yourself.** The tagline is Myriad Pro Roman in `#0077C0`, title case, with `&trade;`, and it must come from Express as artwork.

**Register**

16. **Never mix the corporate and franchise registers on one page.** A page speaks to job seekers and employers, or to prospective Franchise Owners. Not both.
17. **One primary action per screen.** If a page asks two things, it is two pages.

**Statistics**

18. **Every number is attributed.** Express publishes several figures that do not agree with each other; see the sourced table in `brand/overview.md` and pick one, with its source.

## Reading order

| Job | Read, in this order |
| --- | --- |
| Anything at all | `brand/overview.md` |
| Visual work, a page, a deck, a component | `brand/visual-system.md`, then `tokens/tokens.css` |
| Copy of any kind | `brand/voice.md`, then `brand/messaging.md` |
| A service or product page | `brand/services.md`, then `brand/messaging.md` |
| An about or bios page | `brand/team.md` |
| Anything with images | `brand/photography.md` |
| Franchise material | `brand/visual-system.md` (the two registers), then `brand/services.md` (franchise offer) |

## If you need X, go to Y

| You need | Go to |
| --- | --- |
| A colour | `tokens/tokens.css`. Use the `--brand-*` semantic aliases, not `--palette-*`. |
| A colour in TypeScript | `tokens/tokens.ts` |
| A colour without the `#`, for PptxGenJS | `colorsNoHash` in `tokens/tokens.ts` |
| Tailwind v3 set up | `tailwind.preset.ts`. Keys are camelCase: `bg-brandActionPrimaryBg`. |
| Tailwind v4 set up | Import `tokens/tokens.css` and map the `--brand-*` vars in your `@theme` block. v4 dropped presets, so the preset file is v3 only. |
| The logo | `logo/svg/`. PNG equivalents with the same basenames are in `logo/png/`. |
| Fonts | `fonts/fonts.css`. Self-hosted, no network call. |
| Base styles for a page | `styles/globals.css`. One import brings fonts, tokens, and element defaults. |
| A button, card, hero, nav, footer, stat | `components/` |
| A whole page as a worked example | `examples/landing.tsx` |
| A proposal cover | `examples/proposal-cover.html` |
| A slide | `examples/title-slide.html` and `examples/content-slide.html` |
| To know how they sound | `brand/voice.md` |
| Approved copy you can lift | `brand/messaging.md` |
| To check a contrast pairing | `npm run check:contrast` |
| The official source of truth | `brand/express-brand-guide-2026-06.pdf` |

## Changing tokens

`tokens/tokens.json` is the only file you edit. `tokens.css`, `tokens.ts`, and `tailwind.preset.ts` are generated. Run `npm run verify` afterwards, which regenerates them, re-checks every documented contrast pairing, and typechecks the components. If a contrast pairing fails, fix the colour or fix the documentation. Do not silence the check.

## Switching register

```html
<body data-brand-mode="franchise">
```

Headings become Roboto Condensed, with h1 and h2 in uppercase and h3 and below staying sentence case. Body weight goes to 400 at 1.3rem, the primary action becomes purple `#6B1778` inverting to white on hover, radius drops to 5px, `inverse` grounds become medium blue, and the container widens to 1400px. Leave it off for everything else.

## Inverse sections

```html
<section data-brand-ground="inverse">
```

White text, headings, links, and focus ring on a deep blue ground. Three siblings change only what paints the ground: `inverse-strong` (deepest blue), `inverse-brand` (medium blue), and `inverse-none` for a block that paints its own, such as a gradient card or a photograph under an overlay. That is the only "dark mode" in this system, because Express does not have one.

## Calibration

**Headline, off brand.** "Unlock world-class talent with our innovative recruitment platform."
**Headline, on brand.** "Any position, any industry."

**Body, off brand.** "Express leverages a consultative methodology to seamlessly align top-tier resources with your evolving talent strategy."
**Body, on brand.** "The Express team will take the time to understand your business needs. We can connect you with screened and qualified workers across Office Services, Light Industrial, and Skilled Trades."

**CTA, off brand.** "Click here to learn more about our services."
**CTA, on brand.** "Find your local office."

**Statistic, off brand.** "Most companies say staffing works."
**Statistic, on brand.** "80% of companies that use staffing services say they find quality employees. American Staffing Association."

**Colour, off brand.** White 16px type on a `#0096D6` button.
**Colour, on brand.** White 16px type on a `#005288` button, hovering to `#003E66`.

## What this repo does not have

Say so rather than inventing a substitute.

- **No photography.** Express's images are licensed to Express, not to us. `brand/photography.md` gives the direction and tells you where to request files.
- **No mascot or character.** Express has none. The stylised X and the statistic-on-a-gradient do that job.
- **No tagline or URL logo lock-up as artwork.** Request from Marketing@ExpressPros.com.
- **No Specialized Recruiting Group or Express Healthcare Staffing artwork.** Official files are at ExpressPros.com/Logos.
- **No Proxima Nova or Myriad Pro font files.** Both are commercially licensed. Roboto is the approved web substitute for Proxima Nova, on Express's own instruction.
- **The standalone stylised X here carries no `&reg;`.** Fine for screen. For print, signage, or merchandise, request the official asset.
