# Visual system

Three blues do the work. Everything else supports them. The system is deliberately narrow, because Express is a franchise network and consistency across 860 offices is the point.

Colour values here are the published values from the *Express Employment Professionals Brand Guide*, revised June 2026, a copy of which is in this folder as [express-brand-guide-2026-06.pdf](./express-brand-guide-2026-06.pdf). Web-layer values (neutrals, hover states, radii, container widths) are the values actually shipping on expresspros.com.au and expressfranchising.com.au. Every contrast figure below is computed by [scripts/check-contrast.mjs](../scripts/check-contrast.mjs) and fails the build if it stops being true.

## Colour

### Primary, the three blues

| Role | Hex | Pantone | CMYK | Character |
| --- | --- | --- | --- | --- |
| Light blue | `#0096D6` | PMS 2925 | 85 / 24 / 0 / 0 | Impressive, vibrant, trusting, open |
| Medium blue | `#0077C0` | PMS 2935 | 100 / 46 / 0 / 0 | Faithful, true, constant, dependable |
| Deep blue | `#005288` | PMS 2955 | 100 / 45 / 0 / 37 | Credible, classic, strong, professional, confident |

Sign vinyl equivalents, for anyone specifying physical signage: PMS 2955 is Avery Night Sky Blue A9584-T or 3M European Blue 3630-137 Translucent; PMS 2935 is Avery Pacific Blue A9566-T or 3M Bright Blue 3630-167; PMS 2925 is Avery Process Blue A9561-T or 3M Olympic Blue 3630-57.

### Secondary

Accent only. **Secondary colours are never used in the logo.**

| Role | Hex | CMYK | Where it earns its place |
| --- | --- | --- | --- |
| Grey | `#53565A` | 0 / 0 / 0 / 80 | Body copy. The brand guide names it for exactly this. |
| Green | `#5A9F51` | 84 / 9 / 100 / 1 | Success, growth statistics, the green-to-blue gradient |
| Purple | `#7E2B8A` | 50 / 100 / 1 / 0 | Employer-facing accents, franchise CTAs, two gradients |
| Orange | `#D5672C` | 0 / 74 / 100 / 0 | Warning states, the purple-to-orange gradient |
| Red | `#C6222B` | 1 / 100 / 97 / 1 | Errors, urgency, the Express Healthcare Staffing rule |
| Yellow | `#E9B632` | 1 / 30 / 100 / 0 | Highlight fills only. See the yellow rule below. |

### Gradients

Four pairings, and only four. The brand guide runs them vertically down a page edge behind or beside content; horizontal variants (`--palette-gradient-*-h`) exist for rules and banners.

- Green to blue
- Blue to purple
- Purple to orange
- Red to yellow

The blue in every gradient is light blue `#0096D6`, the lightest blue in the logo. A statistic or a pull quote set in large white type on a gradient is the brand's own device; use it rather than inventing a card style.

### Web neutrals

Not in the brand guide. These are the greys shipping on Express's own sites, captured so a new page matches an existing one.

| Token | Hex | Use |
| --- | --- | --- |
| `--palette-neutral-50` | `#F4F4F4` | Alternating section tint |
| `--palette-neutral-100` | `#EAEAEA` | Hairline rules and dividers |
| `--palette-neutral-200` | `#CACACA` | Input borders |
| `--palette-neutral-400` | `#959595` | Disabled text and icons. 3.00:1 on white, so non-text only. |
| `--palette-blue-deep-hover` | `#003E66` | Deep blue pressed state |
| `--palette-blue-deepest` | `#002944` | Full-bleed inverse ground |
| `--palette-purple-franchise` | `#6B1778` | The franchise site's CTA purple |

### Derived for accessibility

Three colours in `palette.accessible.*` are **not brand-guide colours**. They are the lightest shade of each secondary that clears 4.5:1 on both white and the `#F4F4F4` tint, so status text and gold accents can actually be read. Use them for text and icons; use the brand values for fills.

| Token | Hex | On white | On `#F4F4F4` |
| --- | --- | --- | --- |
| `--palette-accessible-green` | `#467C3F` | 4.98:1 | 4.53:1 |
| `--palette-accessible-orange` | `#B35524` | 4.95:1 | 4.50:1 |
| `--palette-accessible-gold` | `#8E6A0F` | 4.98:1 | 4.53:1 |

Two blue tints are derived the same way:

| Token | Hex | Use |
| --- | --- | --- |
| `--palette-blue-tint` | `#99D5EF` | Muted text on a **deep blue** ground, 5.12:1 |
| `--palette-blue-tint-light` | `#D9EFF9` | Rules and borders on any inverse ground. 4.01:1 on medium blue, 12.61:1 on deepest. |

## Contrast contract

Every pairing below is recomputed by `npm run check:contrast`.

| Pairing | Ratio | Passes |
| --- | --- | --- |
| Grey `#53565A` on white | 7.38:1 | AAA |
| Grey on `#F4F4F4` | 6.71:1 | AA |
| Deep blue on white | 8.20:1 | AAA |
| Medium blue on white | 4.77:1 | AA |
| White on deep blue | 8.20:1 | AAA |
| White on medium blue | 4.77:1 | AA |
| White on deepest blue `#002944` | 14.99:1 | AAA |
| `#99D5EF` on deep blue | 5.12:1 | AA |
| White on purple `#7E2B8A` | 8.08:1 | AAA |
| White on franchise purple `#6B1778` | 10.40:1 | AAA |
| White on red `#C6222B` | 5.73:1 | AA |
| Black on yellow `#E9B632` | 11.20:1 | AAA |
| `#D9EFF9` rule on medium blue | 4.01:1 | Non-text AA |

### Colour restrictions, absolute

These four combinations fail WCAG AA and appear in Express's own legacy stylesheet. Do not carry them into new work.

| Never | Ratio | Instead |
| --- | --- | --- |
| White text on light blue `#0096D6` | 3.32:1 | White on medium or deep blue |
| White text on green `#5A9F51` | 3.22:1 | White on `#467C3F`, or green as a fill with dark ink |
| White text on orange `#D5672C` | 3.62:1 | White on `#B35524` |
| Yellow `#E9B632` as text or a line on a light ground | 1.87:1 | `--palette-accessible-gold` `#8E6A0F` |

Further restrictions:

- **Light blue is never a text colour.** It is a mark colour, a gradient colour, and a large-format graphic colour. At body size it fails on white and fails badly on deep blue (2.47:1).
- **Yellow is a fill that carries dark ink**, never a standalone signal, never a line, never type on white.
- **Secondary colours never enter the logo.** No green X, no purple wordmark, ever.
- **Status is never colour alone.** Pair every status colour with an icon or a word.
- **There is no muted text tier on a medium blue `#0077C0` ground.** White itself only reaches 4.77:1 there, so no tint can clear 4.5:1 beneath it. In the franchise register `--brand-text-inverse-muted` therefore resolves to white. If a block genuinely needs two text tiers, move it onto deep blue.

## Typography

### Families

| Where | Family | Weights available here | Licence |
| --- | --- | --- | --- |
| Web, all body and corporate headings | **Roboto** | 300, 400, 500, 700, plus 300/400/700 italic | Apache 2.0, vendored in `fonts/roboto/` |
| Franchise-register headings | **Roboto Condensed** | 400, 700 | Apache 2.0, vendored in `fonts/roboto-condensed/` |
| Print and collateral | **Proxima Nova** | Full family | Mark Simonson Studio, commercial, **not vendored** |
| Tagline lock-up | **Myriad Pro Roman** | Roman | Adobe, **not vendored** |

Roboto is the correct substitute for Proxima Nova on screen; the brand guide says so explicitly. Do not substitute anything else, and do not reach for Proxima Nova on the web without a web licence.

One family name per typeface. Ask for `font-family: Roboto; font-weight: 700`, never `"Roboto Bold"`.

### Scale, corporate register

The vertical rhythm on expresspros.com.au sits on a 26px baseline: h1 to h3 all resolve to a 52px line, h4 to h6 to 26px. Keep it.

| Element | Size | Line height | Computed |
| --- | --- | --- | --- |
| h1 | 3rem / 48px | 1.0833 | 52px |
| h2 | 2.25rem / 36px | 1.4444 | 52px |
| h3 | 2rem / 32px | 1.625 | 52px |
| h4 | 1.5rem / 24px | 1.0833 | 26px |
| h5 | 1.25rem / 20px | 1.3 | 26px |
| h6 | 1rem / 16px | 1.625 | 26px |
| Body | 1rem / 16px | 1.625 | 26px |

Body weight is **300**. That is lighter than most systems and it is what gives Express pages their airy feel. Headings are 700.

### Scale, franchise register

| Element | Family | Size | Line height | Case |
| --- | --- | --- | --- | --- |
| h1 | Roboto Condensed 700 | 3.75rem / 60px (2.75rem ≤1024, 2.2rem ≤767) | 1 | Uppercase |
| h2 | Roboto Condensed 700 | 2.2rem (1.8rem ≤1024) | 1.2 | Uppercase |
| h3 | Roboto Condensed 700 | 1.5rem | 1.2 | Sentence case. Only h1 and h2 go uppercase. |
| Body | Roboto 400 | 1.3rem (1.1rem ≤1024, 1rem ≤767) | 1.5 | Sentence case |

## Shape and space

| Property | Corporate | Franchise |
| --- | --- | --- |
| Corner radius | 9px (`--radius-default`) | 5px (`--radius-sm`) |
| Content width | 1200px | 1400px |
| Button padding | 6.5px / 13px minimum, 24px horizontal in this system | 5px / 50px |
| Border | 1px, `#EAEAEA` hairlines | 3px solid, same colour as the fill |

Pills use `--radius-pill` (999px) for chips and badges. Avatars use `--radius-circle`. Shadows are quiet: `--shadow-card` for a resting card, `--shadow-raised` for a lifted surface. Elevation is not part of the Express language, so use it sparingly and let the hairline rules do the separating.

## Logo

### The four permitted treatments

The lock-up may be used in exactly four colour variations and no others.

1. **Three blue.** The default. Needs a light ground.
2. **All deep blue** (`#005288`).
3. **All black.**
4. **All white**, for any dark ground.

Each treatment exists in this repo as the full lock-up and as the standalone stylised X, in SVG and PNG, in `logo/`.

### Lock-up variants

Express publishes three arrangements: the logo alone, the logo with the tagline underneath, and the logo with `ExpressPros.com` underneath. Only the logo alone is vendored here. If you need the tagline or URL lock-up as artwork rather than as live text, request it from Marketing@ExpressPros.com. Do not assemble one by setting the tagline yourself, because it must be Myriad Pro Roman in PMS 2935 with the trade mark symbol.

### The stylised X

The X is a person in motion, formed from checkmarks. In most cases use the full lock-up; the X may stand alone on promotional items, or in campaign and event design where the full logo already appears elsewhere.

**One caveat on the files here.** The standalone X in `logo/svg/logo-icon-x-*.svg` is derived from the official lock-up artwork and does not carry the &reg; symbol. Express's own standalone X asset does. For screen use, favicons, avatars, and section furniture these files are fine. For print, signage, merchandise, or any public-facing standalone use, request the official asset from Marketing@ExpressPros.com.

### Clear space and size

- **Clear space** on all four sides equals the top half of the stylised X. Measured off the guide's own grid on page 12, that works out to **45% of the lock-up's height**, which is a generous margin by design. Nothing enters it. `Logo` exports `CLEAR_SPACE_RATIO` and `--brand-logo-clear-space-ratio` carries the same number.
- **Scale proportionally, always.** Never stretch the logo horizontally or vertically to fill a space.
- **Minimum size.** Express publishes no minimum, so this one is ours: below roughly 24px tall the "Employment Professionals" line closes up, and below 16px the stylised X stops reading as a person. `Logo` exports `MIN_HEIGHT_PX`.

### Never

Taken from the brand guide's own incorrect-usage page. All of these apply to every Express brand, not just this one.

- Never put a box, rule, or outline around the logo.
- Never skew, rotate, or add perspective.
- Never add a drop shadow, glow, or bevel.
- Never recolour it. Not pink, not gold, not a green X, not a two-tone experiment.
- Never outline the type or knock it out to a keyline.
- Never condense, extend, or otherwise distort it.
- Never place it on a busy pattern, a photograph without an overlay, or a ground that does not offer clear contrast. If the ground is dark, use the white version.
- Never use a logo carrying the `SM` service-mark symbol. Those are discontinued. The correct symbol is `&reg;`.

### Signage

The logo on exterior signage may only be produced in the three approved blues or all white. If a landlord's specification or a council code forces other colours, the Express logo may not go on that sign at all. Taglines and accent colours are not recommended on signage, because they change and the sign does not.

## Design elements

Three devices carry the brand beyond colour and type.

- **Job representation photography.** People in their actual work environments. See [photography.md](./photography.md).
- **Gradient fields.** One of the four pairings, running behind or beside content, usually along a page edge.
- **The repeating stylised X.** The X repeated in a single line, horizontal or vertical, as a quiet divider or margin texture. One line only, low contrast, and never close enough to a real logo to read as a second one. Implemented as `components/XBand.tsx`.

Statistics and quotes are set in large white type on a gradient, with the source credited. That is the brand's house treatment for a number, and it is why `components/StatCallout.tsx` exists.

## The two registers

The system runs in two modes. Set `data-brand-mode="franchise"` on a root element to switch.

| | Corporate (default) | Franchise |
| --- | --- | --- |
| Audience | Job seekers, employers | Prospective Franchise Owners |
| Live on | expresspros.com.au | expressfranchising.com.au |
| Headings | Roboto 700, sentence case | Roboto Condensed 700. h1 and h2 uppercase, h3 and below sentence case |
| Body weight | 300 | 400 |
| Primary action | Deep blue `#005288` | Purple `#6B1778`, inverting to white on hover |
| Ground | White, `#F4F4F4` tint, deep blue inverse | White, `#F1F1F1` tint, medium blue inverse |
| Radius | 9px | 5px |
| Container | 1200px | 1400px |

**Do not mix them on one page.** A page is either speaking to someone who wants a job or hires people, or to someone thinking about buying a franchise. The only place both appear is a footer link.

## Inverse grounds

Put `data-brand-ground` on any block and the text, headings, links, borders, and focus ring inside it flip to their inverse pairings. Four values, differing only in what paints the ground.

| Value | Ground | Use it for |
| --- | --- | --- |
| `inverse` | Deep blue `#005288` | The standard Express band, footers, closing CTAs |
| `inverse-strong` | Deepest blue `#002944` | Full-bleed sections, slide grounds |
| `inverse-brand` | Medium blue `#0077C0` | Stat tiles, the franchise site's block grid |
| `inverse-none` | Nothing | A block painting its own ground: a gradient card, or a photograph under an overlay |

Only the value-specific rule sets `background-color`, so a block painting its own ground never fights the stylesheet for it. In the franchise register `inverse` resolves to medium blue rather than deep blue, because that is the ground the franchise site uses.

There is no separate dark theme, because Express does not have one.

## Photograph overlays

Three overlays, in `--palette-overlay-*`, matching the treatments on the live site: `blue` for job seekers, `purple` for employers, `deep` for a neutral or franchise hero. Layer one over any hero photograph, then set `data-brand-ground="inverse"` on the block. Without an overlay, white type has no contrast you can measure, so the overlay is a requirement rather than a style.
