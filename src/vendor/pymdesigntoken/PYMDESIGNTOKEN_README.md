# PymDesignToken

Shared design tokens for pymmog. This is the visual language behind future web projects (mostly Next.js and Tailwind v4 on Vercel) and the SwiftUI apps: warm oat paper, deep forest dark, Geist Sans for headlines and UI, Geist Mono for metadata.

The source of truth is the two boards, light (**Design language / v.01**) and dark (**Design language / dark**). Printed hexes are copied exactly. Radii, type, hairlines, focus, and the muted-text fix are derived from the boards and called out below.

The package is installed from GitHub. It is not published to npm.

```json
"pymdesigntoken": "github:pymmog/PymDesignToken"
```

`dist/` is committed, so a consuming app does not need to build the package. [`tokens/tokens.json`](tokens/tokens.json) is the only token source. `npm run build` regenerates every file in `dist/`.

## Next.js and Tailwind v4

Load Geist with `next/font`. This package only names the families. It does not vendor font files.

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`app/globals.css`:

```css
@import "tailwindcss";
@import "pymdesigntoken/tailwind.css";
```

`tailwind.css` pulls in the custom properties and registers a Tailwind v4 `@theme inline` block. Utilities stay wired to those variables, so they follow the theme. The font stacks read `--font-geist-sans` and `--font-geist-mono` when `next/font` sets them, and fall back to the family names `Geist Sans`, `Geist`, and `Geist Mono`.

```html
<section class="bg-bg text-foreground font-sans">
  <p class="font-mono text-eyebrow tracking-eyebrow uppercase text-muted">Object / 001</p>
  <h1 class="text-display">Human feel.</h1>
  <div class="bg-surface border border-hairline rounded-card p-space-24">
    <a class="bg-primary text-on-primary rounded-control px-space-16 py-space-8">Explore the system ↗</a>
  </div>
</section>
```

| Class | Token |
| --- | --- |
| `bg-bg`, `bg-surface`, `bg-warm`, `bg-play`, `bg-primary`, `bg-status` | page, panel, feature, play, primary button, status |
| `text-foreground`, `text-muted`, `text-muted-accessible`, `text-on-light`, `text-on-primary` | ink roles |
| `border-hairline`, `border-secondary-border` | hairline rule, secondary button outline |
| `font-sans`, `font-mono` | Geist Sans, Geist Mono |
| `text-display`, `text-title`, `text-heading`, `text-ui`, `text-eyebrow` | type styles, including line height, tracking, and weight |
| `rounded-card`, `rounded-control`, `rounded-pill` | 2px, 4px, pill |
| `p-space-8`, `gap-space-16`, `p-space-24`, `p-space-48`, `p-space-96` | the printed spacing scale |

The `space-*` utilities do not replace Tailwind's numeric scale. `p-4` stays Tailwind's `p-4`. Use `p-space-16` for 16px.

Set the theme on `<html>`:

- `data-theme="light"` forces the light board, including when the OS is dark.
- `data-theme="dark"` forces the dark board.
- With no attribute, the page follows `prefers-color-scheme`, and a nested `data-theme` restyles that subtree.

### Plain CSS and the board components

Without Tailwind:

```css
@import "pymdesigntoken/tokens.css";
@import "pymdesigntoken/components.css";
```

`components.css` is optional. It matches the boards: a filled primary button, an outlined secondary button, the pill status badge (dot included), the mono eyebrow, and a 1px hairline frame.

```html
<a class="pym-btn" href="/explore">Explore the system ↗</a>
<a class="pym-btn pym-btn--secondary" href="/talk">Let's talk ↗</a>
<span class="pym-badge">Ready</span>
<p class="pym-eyebrow">Object / 001</p>
<article class="pym-hairline">…</article>
```

Put `text-on-light` on Beige and Sage panels. Put `text-muted-accessible` on small labels there. On the dark play panel (Moss), use `text` for eyebrows, not `text-muted`. The contrast section says why.

Hover on `.pym-btn` mixes the fill 14% toward the label. That interaction is not on the boards. It stays well above the AA ratios of the resting buttons.

## JavaScript

```js
import { semantic, primitive, typeStyle } from "pymdesigntoken";

semantic.light.bg; // #F3EFE6
semantic.dark["button-primary-bg"]; // #CAD8C5
primitive.color.forest; // #19382B
primitive.space[16]; // 16px
typeStyle.display.fontSize; // 64px
```

Resolved JSON, including contrast results: `pymdesigntoken/tokens.json`.

## SwiftUI

Add `Tokens.swift` from the package (`pymdesigntoken/swift`, or `dist/Tokens.swift` in this repo) to the app target. Bundle the Geist and Geist Mono font files yourself and register them under the family names `Geist` and `Geist Mono`. Variable fonts honor `.weight`. If a static face does not, use the face name (`Geist-Medium`) instead of `Pym.Typography.sans`.

```swift
import SwiftUI

struct SignalHeader: View {
    var body: some View {
        VStack(alignment: .leading, spacing: Pym.Spacing.s16) {
            Text("OBJECT / 001")
                .font(Pym.Typography.eyebrow)
                .tracking(Pym.Tracking.eyebrow * 11)
                .foregroundStyle(Pym.Colors.textMuted.color)
            Text("Human feel.")
                .font(Pym.Typography.display)
                .tracking(Pym.Tracking.display * 64)
                .foregroundStyle(Pym.Colors.text.color)
        }
        .padding(Pym.Spacing.s24)
        .background(Pym.Colors.bg.color)
    }
}
```

`Pym.Colors.*.color` follows the system appearance. `color(for:)` takes an explicit `ColorScheme`. `Pym.Palette` holds the raw swatches (Forest, Moss, Sage, Oat, Beige, Brown, Forest Dark, Surface Dark, and the derived moss and hairlines). Tracking constants are ems. SwiftUI's `tracking` is in points, so multiply by the font size.

## Preview

[`preview/index.html`](preview/index.html) is a static board. It links `dist/tokens.css` and `dist/components.css` and loads Geist from a CDN so the page can show the family names. The package itself still does not contain font files. Open it over HTTP (fonts will not load from `file://` in every browser):

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173/preview/`. The Light / Dark control sets `data-theme`. `?theme=dark` opens the dark board directly.

## Changing a token

1. Edit [`tokens/tokens.json`](tokens/tokens.json). Primitives are raw values. Semantic tokens reference them with `{primitive.color.oat}` and have a `light` and a `dark` entry. Keep the two themes' keys in the same order.
2. Run `npm run build`. That rewrites `dist/` and the token tables in this README. Node 18 or newer is enough. There are no dependencies.
3. Run `npm run check`. It builds twice and fails if the second run changes a byte, if a required contrast pair slips, or if a known-failing board pair silently starts passing (update the note when that happens).
4. Commit `tokens/tokens.json`, `dist/`, and `README.md` together.

`npm publish` is blocked on purpose.

## Derived decisions

Printed values are the six light swatches, the dark Forest and Surface swatches, the shared Sage, Oat, Beige, and Brown, and the spacing steps 8, 16, 24, 48, and 96.

Everything else was read off the boards:

- **Radii.** Cards and swatches are 2px. Buttons are 4px. The status badge is a pill. UI chrome has no shadow (`shadow.none`).
- **Type.** Display is 64px, weight 500, line-height 0.95, tracking −0.04em. Card titles are 36px / −0.03em. The panel title is 22px. The wordmark is 22px at weight 600. Body is 16px. Buttons and nav are 14px medium. Eyebrows are 11px Geist Mono, uppercase, tracking 0.14em. The headlines are Medium, not bold.
- **Hairline.** 1px. Light is Forest at 18% (`rgba(25, 56, 43, 0.18)`, about `#CCCEC4` on Oat, ~1.39:1). Dark is Sage at 24% (`rgba(202, 216, 197, 0.24)`, about `#3D4B42` on Forest, ~1.87:1). These are soft rules, under the 3:1 bar on purpose. Secondary buttons do not use them. Their outlines are solid Forest (light) or solid Oat (dark), the same ink as the label, and both clear 3:1.
- **Surface.** Light panels sit on the same oat paper as the page. Dark panels use printed Surface `#1B2D23`.
- **Play panel, dark.** The dark board does not print a hex for that card. It reads as Moss `#47634D`. Oat type on Moss is 5.79:1.
- **Focus.** Not drawn on the boards. A 2px accent outline, offset 2px, so the ring sits on the page color outside a filled button. Forest on Oat and Sage on Forest both clear 3:1.
- **Button padding.** 12px vertical and 16px horizontal. 12px sits between the 8 and 16 space tokens and is a component metric, not a new space token. The badge dot is 7px Beige.

## Contrast

Body text, muted text, and both buttons clear WCAG AA on the page and on Surface in both themes. Moss on Oat is 5.79:1. Sage on Forest is 11.58:1 and on Surface is 9.78:1. Oat on Brown, the status label, is 4.51:1, just inside AA, so the printed Brown and Oat stay as they are. The Beige dot on Brown is 3.28:1.

These board pairings do not clear AA. The colors stay in the palette. The semantic tokens point at a passing pair:

- **Oat on Beige is 1.37:1, Oat on Sage is 1.29:1.** The dark board reads as light type on the beige feature card. `text-on-light` is Forest `#19382B` in both themes (8.11:1 on Beige, 8.61:1 on Sage), which is already the light board's card title color. Use it for text on `surface-warm` and on the light play panel.
- **Moss on Beige is 4.21:1 and Moss on Sage is 4.47:1.** `text-muted` stays Moss, which passes on Oat. Small text on those light fills uses `text-muted-accessible` `#425E49` (Moss pulled 11% toward Forest): 4.55:1 on Beige, 4.83:1 on Sage, 6.25:1 on Oat.
- **Sage on Moss is 4.47:1.** Eyebrows on the dark play panel use `text` (Oat, 5.79:1), not `text-muted`.

## Token reference

<!-- tokens:start -->
<!-- Generated by scripts/build.mjs. Do not edit between the markers. -->

### Primitives

| Token | CSS variable | Value | Notes |
| --- | --- | --- | --- |
| color.forest | `--pym-color-forest` | `#19382B` | Printed. Light board Forest. |
| color.moss | `--pym-color-moss` | `#47634D` | Printed. Light board Moss. |
| color.sage | `--pym-color-sage` | `#CAD8C5` | Printed. Sage on both boards. |
| color.oat | `--pym-color-oat` | `#F3EFE6` | Printed. Oat on both boards. The light page is this warm paper. |
| color.beige | `--pym-color-beige` | `#DCCCB1` | Printed. Beige on both boards. Warm feature-panel fill. |
| color.brown | `--pym-color-brown` | `#8B6549` | Printed. Brown on both boards. Status badge fill. |
| color.forest-dark | `--pym-color-forest-dark` | `#101E18` | Printed. Dark board Forest. Deep page background. |
| color.surface-dark | `--pym-color-surface-dark` | `#1B2D23` | Printed. Dark board Surface. Lifted panels on the dark page. |
| color.moss-deep | `--pym-color-moss-deep` | `#425E49` | Derived. Moss #47634D pulled 11% toward Forest #19382B. Small text on Sage is 4.47:1 and on Beige is 4.21:1 with Moss, short of WCAG AA 4.5:1. This step clears both (4.83:1 on Sage, 4.55:1 on Beige, 6.25:1 on Oat) and stays in the moss family. |
| color.hairline-light | `--pym-color-hairline-light` | `rgba(25, 56, 43, 0.18)` | Derived. Forest #19382B at 18% opacity. On Oat it composites to about #CCCEC4 (~1.39:1). The boards use a soft 1px rule, not a 3:1 boundary. Button outlines use solid ink instead. |
| color.hairline-dark | `--pym-color-hairline-dark` | `rgba(202, 216, 197, 0.24)` | Derived. Sage #CAD8C5 at 24% opacity. On Forest #101E18 it composites to about #3D4B42 (~1.87:1). A visible hairline, deliberately under the 3:1 UI-boundary bar. |
| space.8 | `--pym-space-8` | `8px` | Printed spacing token. |
| space.16 | `--pym-space-16` | `16px` | Printed spacing token. |
| space.24 | `--pym-space-24` | `24px` | Printed spacing token. |
| space.48 | `--pym-space-48` | `48px` | Printed spacing token. |
| space.96 | `--pym-space-96` | `96px` | Printed spacing token. |
| radius.card | `--pym-radius-card` | `2px` | Derived. Cards, swatches, and panels are almost square, with a 2px corner. |
| radius.control | `--pym-radius-control` | `4px` | Derived. Primary and secondary buttons use a small 4px radius, not a pill. |
| radius.pill | `--pym-radius-pill` | `999px` | Derived. The status badge is fully rounded. |
| fontFamily.sans | `--pym-font-sans` | `var(--font-geist-sans, "Geist Sans"), "Geist", ui-sans-serif, system-ui, sans-serif` | Derived. Geist Sans for headlines and UI, by family name only. The var() slot is what next/font sets as --font-geist-sans. This package does not ship font files. |
| fontFamily.mono | `--pym-font-mono` | `var(--font-geist-mono, "Geist Mono"), "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` | Derived. Geist Mono for metadata, hexes, and uppercase tracked labels. |
| fontSize.display | `--pym-font-size-display` | `64px` | Derived. Hero display, tight and large: "Human feel." |
| fontSize.title | `--pym-font-size-title` | `36px` | Derived. Card headlines such as "A little unexpected." |
| fontSize.heading | `--pym-font-size-heading` | `22px` | Derived. Panel title "Design language / v.01" and the wordmark size. |
| fontSize.body | `--pym-font-size-body` | `16px` | Derived. Body and the hero lede. |
| fontSize.ui | `--pym-font-size-ui` | `14px` | Derived. Nav links and button labels. |
| fontSize.caption | `--pym-font-size-caption` | `12px` | Derived. Swatch names, hex codes, status label. |
| fontSize.eyebrow | `--pym-font-size-eyebrow` | `11px` | Derived. Mono labels such as OBJECT / 001 and 01. COLORS. |
| fontWeight.regular | `--pym-weight-regular` | `400` | Derived. Body, nav, captions. |
| fontWeight.medium | `--pym-weight-medium` | `500` | Derived. Display, titles, buttons. Geist Medium matches the boards better than bold. |
| fontWeight.semibold | `--pym-weight-semibold` | `600` | Derived. Wordmark "soft signal" is a step heavier than the panel title. |
| lineHeight.display | `--pym-leading-display` | `0.95` | Derived. Display lines sit tight, almost solid. |
| lineHeight.title | `--pym-leading-title` | `1.05` | Derived. Card headlines are tight but wrap cleanly. |
| lineHeight.heading | `--pym-leading-heading` | `1.2` | Derived. Panel titles and the wordmark. |
| lineHeight.body | `--pym-leading-body` | `1.5` | Derived. Reading text. |
| lineHeight.ui | `--pym-leading-ui` | `1.25` | Derived. Buttons and nav. |
| lineHeight.caption | `--pym-leading-caption` | `1.4` | Derived. Small sans labels. |
| lineHeight.eyebrow | `--pym-leading-eyebrow` | `1.35` | Derived. Mono eyebrows. |
| letterSpacing.display | `--pym-tracking-display` | `-0.04em` | Derived. Display is tightly tracked. |
| letterSpacing.title | `--pym-tracking-title` | `-0.03em` | Derived. Card headlines are tight, a little less than display. |
| letterSpacing.heading | `--pym-tracking-heading` | `-0.02em` | Derived. Panel titles. |
| letterSpacing.wordmark | `--pym-tracking-wordmark` | `-0.03em` | Derived. "soft signal" is tight. |
| letterSpacing.ui | `--pym-tracking-ui` | `-0.01em` | Derived. Button and nav labels are nearly neutral. |
| letterSpacing.normal | `--pym-tracking-normal` | `0em` | Derived. Body copy is not tracked. |
| letterSpacing.caption | `--pym-tracking-caption` | `0.02em` | Derived. Hex codes open up slightly. |
| letterSpacing.eyebrow | `--pym-tracking-eyebrow` | `0.14em` | Derived. Uppercase mono labels are widely tracked. |
| shadow.none | `--pym-shadow-none` | `none` | Derived. UI chrome on both boards is flat. The objects cast soft light, and that stays artwork, not a shadow token. |
| focus.width | `--pym-focus-width` | `2px` | Derived. Focus is a 2px outline. The boards do not draw a focus ring, so this follows the accent color and clears 3:1 against the page. |
| focus.offset | `--pym-focus-offset` | `2px` | Derived. The offset lets the ring sit outside filled buttons, on the page color, so a forest ring stays visible on a forest button. |

### Semantic tokens

Light and dark map the same names to different primitives. `surface` equals `bg` on light because the light board separates panels with a hairline, not a second fill.

| Token | CSS variable | Light | Dark | Notes |
| --- | --- | --- | --- | --- |
| `bg` | `--pym-bg` | `#F3EFE6` oat | `#101E18` forest-dark | Page background. Light is the oat paper. |
| `surface` | `--pym-surface` | `#F3EFE6` oat | `#1B2D23` surface-dark | Panels and the module card. On the light board they are the same oat paper as the page; a hairline separates them, not a second fill. |
| `text` | `--pym-text` | `#19382B` forest | `#F3EFE6` oat | Primary text. Headlines, nav, wordmark. |
| `text-muted` | `--pym-text-muted` | `#47634D` moss | `#CAD8C5` sage | Secondary text on oat: ledes, eyebrows, hex codes. Moss on Oat is 5.79:1. Do not use Moss for small text on Sage or Beige; use text-muted-accessible. |
| `text-muted-accessible` | `--pym-text-muted-accessible` | `#425E49` moss-deep | `#425E49` moss-deep | Accessible muted ink for small text on Sage and Beige. Keeps the Moss hue. Moss itself stays available as text-muted. |
| `text-on-light` | `--pym-text-on-light` | `#19382B` forest | `#19382B` forest | Text on Beige and on the light Sage play panel. Forest on Beige is 8.11:1 and on Sage is 8.61:1. Oat on those fills fails (1.37:1 and 1.29:1) and is not used. |
| `border` | `--pym-border` | `rgba(25, 56, 43, 0.18)` hairline-light | `rgba(202, 216, 197, 0.24)` hairline-dark | 1px hairline for cards, the sidebar rule, and swatch edges. |
| `accent` | `--pym-accent` | `#19382B` forest | `#CAD8C5` sage | Brand accent. Light uses Forest, the filled primary button. |
| `accent-contrast` | `--pym-accent-contrast` | `#F3EFE6` oat | `#101E18` forest-dark | Ink on the accent fill. Oat on Forest is 11.15:1. |
| `button-primary-bg` | `--pym-button-primary-bg` | `#19382B` forest | `#CAD8C5` sage | Filled primary button background. |
| `button-primary-text` | `--pym-button-primary-text` | `#F3EFE6` oat | `#101E18` forest-dark | Filled primary button label. |
| `button-primary-border` | `--pym-button-primary-border` | `#19382B` forest | `#CAD8C5` sage | Matches the fill so the primary and secondary buttons share a 1px border box. |
| `button-secondary-bg` | `--pym-button-secondary-bg` | `transparent` transparent | `transparent` transparent | Outlined secondary button. The page shows through. |
| `button-secondary-text` | `--pym-button-secondary-text` | `#19382B` forest | `#F3EFE6` oat | Secondary label uses the same ink as primary text. |
| `button-secondary-border` | `--pym-button-secondary-border` | `#19382B` forest | `#F3EFE6` oat | Solid Forest outline, not the hairline. Forest on Oat is 11.15:1, above the 3:1 UI-boundary bar. |
| `status-bg` | `--pym-status-bg` | `#8B6549` brown | `#8B6549` brown | Status pill fill. Printed Brown. |
| `status-text` | `--pym-status-text` | `#F3EFE6` oat | `#F3EFE6` oat | Status label. Oat on Brown is 4.51:1, just inside WCAG AA for normal text. The board color is kept. |
| `status-dot` | `--pym-status-dot` | `#DCCCB1` beige | `#DCCCB1` beige | The dot inside the pill. Beige on Brown is 3.28:1, above the 3:1 non-text bar. |
| `focus` | `--pym-focus` | `#19382B` forest | `#CAD8C5` sage | Focus ring color. Forest on Oat is 11.15:1. |
| `ticker-bg` | `--pym-ticker-bg` | `#CAD8C5` sage | `#1B2D23` surface-dark | The top HUMAN FEEL / SYSTEM THINKING band. |
| `ticker-text` | `--pym-ticker-text` | `#19382B` forest | `#CAD8C5` sage | Ticker ink. Forest on Sage is 8.61:1. |
| `surface-warm` | `--pym-surface-warm` | `#DCCCB1` beige | `#DCCCB1` beige | Feature panel. Beige in both themes, matching the warm card on both boards. |
| `surface-play` | `--pym-surface-play` | `#CAD8C5` sage | `#47634D` moss | Play panel. The light board fills it with Sage. |

### Type styles

Sizes, line height, and tracking are derived from the boards. Family names are Geist Sans and Geist Mono, with the fallbacks in the primitive table.

| Style | Family | Size | Weight | Line height | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `display` | sans | `64px` | 500 | 0.95 | `-0.04em` | Hero display. "Human feel. System thinking." |
| `title` | sans | `36px` | 500 | 1.05 | `-0.03em` | Card headlines. |
| `heading` | sans | `22px` | 500 | 1.2 | `-0.02em` | Panel title. |
| `wordmark` | sans | `22px` | 600 | 1.2 | `-0.03em` | "soft signal" wordmark. |
| `body` | sans | `16px` | 400 | 1.5 | `0em` | Body copy and the hero lede. |
| `ui` | sans | `14px` | 500 | 1.25 | `-0.01em` | Buttons and nav. |
| `caption` | sans | `12px` | 400 | 1.4 | `0.02em` | Swatch names and the status label. |
| `eyebrow` | mono | `11px` | 500 | 1.35 | `0.14em` | Uppercase tracked mono labels. |

### Contrast checks

Ratios use the WCAG 2 relative-luminance formula. The build fails if a required pair drops below its minimum. Normal text needs 4.5:1. Non-text UI boundaries (the secondary outline, the status dot, the focus ring) need 3:1.

| Pair | Foreground | Background | Ratio | Minimum | Result |
| --- | --- | --- | --- | --- | --- |
| Light body text on page | `#19382B` | `#F3EFE6` | 11.15:1 | 4.5 | Pass |
| Light muted text on page | `#47634D` | `#F3EFE6` | 5.79:1 | 4.5 | Pass |
| Light accessible muted on page | `#425E49` | `#F3EFE6` | 6.25:1 | 4.5 | Pass |
| Light accessible muted on beige | `#425E49` | `#DCCCB1` | 4.55:1 | 4.5 | Pass |
| Light accessible muted on sage | `#425E49` | `#CAD8C5` | 4.83:1 | 4.5 | Pass |
| Light card title on beige | `#19382B` | `#DCCCB1` | 8.11:1 | 4.5 | Pass |
| Light card title on sage | `#19382B` | `#CAD8C5` | 8.61:1 | 4.5 | Pass |
| Light primary button | `#F3EFE6` | `#19382B` | 11.15:1 | 4.5 | Pass |
| Light secondary button label | `#19382B` | `#F3EFE6` | 11.15:1 | 4.5 | Pass |
| Light secondary button border | `#19382B` | `#F3EFE6` | 11.15:1 | 3 | Pass |
| Status label on brown | `#F3EFE6` | `#8B6549` | 4.51:1 | 4.5 | Pass |
| Status dot on brown | `#DCCCB1` | `#8B6549` | 3.28:1 | 3 | Pass |
| Light focus ring on page | `#19382B` | `#F3EFE6` | 11.15:1 | 3 | Pass |
| Light ticker | `#19382B` | `#CAD8C5` | 8.61:1 | 4.5 | Pass |
| Light accent pair | `#F3EFE6` | `#19382B` | 11.15:1 | 4.5 | Pass |
| Dark body text on page | `#F3EFE6` | `#101E18` | 14.99:1 | 4.5 | Pass |
| Dark body text on surface | `#F3EFE6` | `#1B2D23` | 12.65:1 | 4.5 | Pass |
| Dark muted text on page | `#CAD8C5` | `#101E18` | 11.58:1 | 4.5 | Pass |
| Dark muted text on surface | `#CAD8C5` | `#1B2D23` | 9.78:1 | 4.5 | Pass |
| Dark play panel title (oat on moss) | `#F3EFE6` | `#47634D` | 5.79:1 | 4.5 | Pass |
| Dark feature panel title (forest on beige) | `#19382B` | `#DCCCB1` | 8.11:1 | 4.5 | Pass |
| Dark accessible muted on beige | `#425E49` | `#DCCCB1` | 4.55:1 | 4.5 | Pass |
| Dark primary button | `#101E18` | `#CAD8C5` | 11.58:1 | 4.5 | Pass |
| Dark secondary button label on page | `#F3EFE6` | `#101E18` | 14.99:1 | 4.5 | Pass |
| Dark secondary button label on surface | `#F3EFE6` | `#1B2D23` | 12.65:1 | 4.5 | Pass |
| Dark secondary button border on page | `#F3EFE6` | `#101E18` | 14.99:1 | 3 | Pass |
| Dark secondary button border on surface | `#F3EFE6` | `#1B2D23` | 12.65:1 | 3 | Pass |
| Dark status label | `#F3EFE6` | `#8B6549` | 4.51:1 | 4.5 | Pass |
| Dark focus ring on page | `#CAD8C5` | `#101E18` | 11.58:1 | 3 | Pass |
| Dark focus ring on surface | `#CAD8C5` | `#1B2D23` | 9.78:1 | 3 | Pass |
| Dark ticker | `#CAD8C5` | `#1B2D23` | 9.78:1 | 4.5 | Pass |
| Dark accent pair | `#101E18` | `#CAD8C5` | 11.58:1 | 4.5 | Pass |

### Board pairs that fail, and what to use instead

The failing board colors stay in the palette. The semantic text tokens point at a passing pair, and the failure stays documented here.

| Pair | Colors | Ratio | What to use |
| --- | --- | --- | --- |
| Oat on Beige | `#F3EFE6` on `#DCCCB1` | 1.37:1 | The dark board reads as light type on the beige feature card. That pair is about 1.37:1. text-on-light keeps Forest #19382B (8.11:1), which is the light board's card title color. Oat stays the dark text token for Forest and Surface only. |
| Oat on Sage | `#F3EFE6` on `#CAD8C5` | 1.29:1 | About 1.29:1. The light play panel uses Forest, not Oat. |
| Moss on Beige | `#47634D` on `#DCCCB1` | 4.21:1 | 4.21:1, short of AA for small text. text-muted stays Moss for use on Oat (5.79:1). Small text on Beige uses text-muted-accessible #425E49 (4.55:1). |
| Moss on Sage | `#47634D` on `#CAD8C5` | 4.47:1 | 4.47:1, just under 4.5. Small text on the light play panel uses text-muted-accessible #425E49 (4.83:1). |
| Sage on Moss | `#CAD8C5` on `#47634D` | 4.47:1 | 4.47:1. The dark play panel is Moss. Eyebrows there use text (Oat, 5.79:1), not text-muted (Sage). |

<!-- tokens:end -->
