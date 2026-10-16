# Design System: AI Agent Skills Registry

A minimal, quiet interface for browsing, comparing, and installing agent skills. The UI should recede so the content (skill names, descriptions, install commands) does the work.

## 1. Design Principles

1. **Minimal first.** Remove before adding. One idea per surface.
2. **Quiet typography.** Small, tight, and consistent. Hierarchy comes from weight and color, not size.
3. **Light and airy.** Soft neutral backgrounds, hairline borders, almost no shadows.
4. **Subtle motion.** Motion confirms an action; it never performs. Short, eased, and easily ignored.
5. **Content is the interface.** Skill names, versions, and commands are the primary visuals.

## 2. Typography

**Primary font:** [Geist](https://vercel.com/font) (fallback: Inter)
**Mono font:** Geist Mono (fallback: ui-monospace, SF Mono, Menlo)

```css
--font-sans: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
```

Recommended features: `font-feature-settings: "cv11", "ss01"` for Inter; `-webkit-font-smoothing: antialiased`.

### Type Scale (small by design)

| Token | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `--text-2xs` | 10px | 14px | 500 | 0.04em | Badges, overlines (uppercase) |
| `--text-xs` | 11px | 16px | 400 | 0 | Meta, captions, timestamps |
| `--text-sm` | 12px | 18px | 400 | 0 | Secondary text, table cells |
| `--text-base` | 13px | 20px | 400 | -0.005em | Body, descriptions, inputs |
| `--text-md` | 14px | 20px | 500 | -0.01em | Card titles, nav, buttons |
| `--text-lg` | 16px | 24px | 500 | -0.015em | Section headings |
| `--text-xl` | 20px | 28px | 500 | -0.02em | Page titles |
| `--text-2xl` | 28px | 34px | 500 | -0.025em | Hero heading (landing only) |

**Weights:** 400 regular, 500 medium, 600 semibold (rare). Avoid 700+.

## 3. Color Tokens

Light-first palette. Neutrals carry a very slight cool tint; a single soft accent is used sparingly.

### Neutrals

```css
--gray-0:  #FFFFFF;
--gray-25: #FCFCFD;
--gray-50: #F8F9FA;
--gray-100: #F1F3F5;
--gray-150: #E9ECEF;
--gray-200: #E2E5E9;
--gray-300: #D0D5DB;
--gray-400: #A8AFB8;
--gray-500: #7C8591;
--gray-600: #5B6470;
--gray-700: #3F4752;
--gray-800: #272D35;
--gray-900: #14181D;
```

### Accent (soft indigo)

```css
--accent-50:  #F4F5FF;
--accent-100: #E9EBFF;
--accent-200: #D5D9FD;
--accent-500: #6366F1;
--accent-600: #5457E0;
--accent-700: #4547C2;
```

### Semantic

```css
--success-bg: #EEFAF3;  --success-fg: #1F7A4D;  --success-border: #CDEEDB;
--warning-bg: #FFF8EB;  --warning-fg: #9A6410;  --warning-border: #F7E3B8;
--danger-bg:  #FEF1F1;  --danger-fg:  #B03A3A;  --danger-border:  #F6D3D3;
--info-bg:    #F0F6FF;  --info-fg:    #2F63B5;  --info-border:    #D1E1F8;
```

### Semantic Aliases

```css
--bg-page:        var(--gray-25);
--bg-surface:     var(--gray-0);
--bg-subtle:      var(--gray-50);
--bg-hover:       var(--gray-100);
--bg-selected:    var(--accent-50);

--text-primary:   var(--gray-900);
--text-secondary: var(--gray-600);
--text-tertiary:  var(--gray-500);
--text-disabled:  var(--gray-400);
--text-accent:    var(--accent-600);

--border-subtle:  var(--gray-150);
--border-default: var(--gray-200);
--border-strong:  var(--gray-300);
--border-focus:   var(--accent-500);
```

### Dark Mode (optional)

```css
[data-theme="dark"] {
  --bg-page: #0E1013;
  --bg-surface: #14171B;
  --bg-subtle: #1A1E23;
  --bg-hover: #20252B;
  --text-primary: #ECEEF1;
  --text-secondary: #A3ABB5;
  --text-tertiary: #7C8591;
  --border-subtle: #1F242A;
  --border-default: #272D35;
  --border-strong: #353C45;
  --bg-selected: #1B1D3A;
  --text-accent: #9A9DF8;
}
```

## 4. Spacing

4px base unit.

```css
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

**Layout**
- Max content width: `1120px` (reading width: `680px`)
- Page gutter: `16px` mobile, `24px` tablet, `32px` desktop
- Section spacing: `64px` to `96px`
- Card grid gap: `12px`

## 5. Radius (medium-rounded)

```css
--radius-xs: 4px;    /* badges, inline code */
--radius-sm: 6px;    /* small buttons, tags, inputs (compact) */
--radius-md: 8px;    /* default: buttons, inputs, cards */
--radius-lg: 12px;   /* large cards, modals, popovers */
--radius-full: 999px; /* avatars, pills (use sparingly) */
```

Default is `--radius-md` (8px). Do not mix more than two radii in one component.

## 6. Borders and Elevation

Prefer hairline borders to shadows.

```css
--border-width: 1px;

--shadow-xs: 0 1px 2px rgba(20, 24, 29, 0.04);
--shadow-sm: 0 1px 3px rgba(20, 24, 29, 0.05), 0 1px 2px rgba(20, 24, 29, 0.03);
--shadow-md: 0 4px 12px rgba(20, 24, 29, 0.06);
--shadow-lg: 0 12px 32px rgba(20, 24, 29, 0.08);   /* modals, command palette only */

--ring-focus: 0 0 0 3px rgba(99, 102, 241, 0.15);
```

| Level | Treatment | Use |
|---|---|---|
| 0 | none | Page background |
| 1 | 1px `--border-subtle` | Cards, tables |
| 2 | 1px `--border-default` + `--shadow-xs` | Hovered cards, inputs |
| 3 | 1px `--border-default` + `--shadow-md` | Dropdowns, popovers |
| 4 | `--shadow-lg` | Modals, command palette |

## 7. Motion

Subtle, fast, and purposeful. Honor `prefers-reduced-motion`.

```css
--duration-instant: 80ms;
--duration-fast: 120ms;
--duration-base: 180ms;
--duration-slow: 280ms;

--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Hover (color, bg, border) | `background-color, border-color, color` | 120ms | `--ease-standard` |
| Button press | `transform: scale(0.98)` | 80ms | `--ease-out` |
| Card hover | `border-color` + `translateY(-1px)` | 180ms | `--ease-out` |
| Dropdown / popover in | `opacity 0→1`, `translateY(-4px→0)` | 160ms | `--ease-out` |
| Modal in | `opacity`, `scale(0.98→1)` | 200ms | `--ease-out` |
| Page content in | `opacity 0→1`, `translateY(6px→0)` | 280ms | `--ease-out` |
| Skeleton shimmer | `background-position` | 1.6s linear infinite | linear |
| Copy confirmation | icon swap with fade | 150ms | `--ease-standard` |

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

Rules: no bounce or spring, no looping decorative animation, no parallax, stagger lists by 20ms max (cap at 6 items).

## 8. Iconography

- Set: [Lucide](https://lucide.dev) (or Geist Icons)
- Stroke: `1.5px`
- Sizes: `14px` inline, `16px` default, `20px` feature
- Color: `--text-tertiary` by default, `--text-primary` on hover/active

## 9. Components

### Button

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `--gray-900` | `#fff` | none |
| Secondary | `--bg-surface` | `--text-primary` | `--border-default` |
| Ghost | transparent | `--text-secondary` | none |
| Accent | `--accent-600` | `#fff` | none |

- Height: 28px (sm), 32px (md, default), 36px (lg)
- Padding: `0 12px`, gap `6px` with icon
- Font: `--text-base` (13px), weight 500
- Radius: `--radius-md`
- Hover: primary → `--gray-800`; secondary/ghost → `--bg-hover`
- Active: `scale(0.98)`
- Focus: `--ring-focus`

### Input / Search

- Height 32px, padding `0 10px`, font 13px
- Background `--bg-surface`, border `--border-default`, radius `--radius-md`
- Placeholder `--text-tertiary`
- Focus: border `--border-focus` + `--ring-focus`
- Global search shows a `⌘K` hint in a `--text-2xs` kbd badge

### Skill Card

The core unit of the registry.

```
┌────────────────────────────────────────┐
│ [icon]  skill-name              v1.2.0 │
│                                        │
│ One or two lines describing what the   │
│ skill does, clamped to 2 lines.        │
│                                        │
│ [tag] [tag]        ↓ 12.4k  ★ 320      │
└────────────────────────────────────────┘
```

- Background `--bg-surface`, border `1px --border-subtle`, radius `--radius-lg` (12px), padding `16px`
- Title: `--text-md` (14px / 500), mono optional for slug
- Description: `--text-sm` (12px), `--text-secondary`, 2-line clamp
- Meta row: `--text-xs` (11px), `--text-tertiary`
- Hover: border → `--border-default`, `translateY(-1px)`, `--shadow-xs`
- Icon tile: 28px square, `--bg-subtle`, `--radius-sm`

### Tag / Badge

- Height 20px, padding `0 6px`, font `--text-2xs`/`--text-xs`, weight 500
- Background `--bg-subtle`, text `--text-secondary`, border `--border-subtle`
- Radius `--radius-xs` (4px)
- Variants: `verified` (success), `deprecated` (warning), `new` (accent)

### Install Command (code block)

```
┌─────────────────────────────────────────┐
│ $ npx skills add acme/pdf-tools    [⧉] │
└─────────────────────────────────────────┘
```

- Background `--bg-subtle`, border `--border-subtle`, radius `--radius-md`
- Font `--font-mono` 12px, padding `10px 12px`
- Prompt `$` in `--text-tertiary`
- Copy button: ghost icon, swaps to a check for 1.5s on click

### Tabs

- Underline style, 32px height, `--text-base`, weight 500
- Inactive `--text-tertiary`, active `--text-primary` with a 1px bottom indicator in `--gray-900`
- Indicator slides over 180ms `--ease-out`

### Table / List Rows

- Row height 40px, `--text-sm`, bottom border `--border-subtle`
- Header: `--text-xs`, uppercase optional, `--text-tertiary`, weight 500
- Hover: `--bg-subtle`

### Navigation (top bar)

- Height 48px, background `--bg-page` with 80% opacity + `backdrop-filter: blur(8px)`
- Bottom border `--border-subtle`
- Logo wordmark 14px/600; links 13px/500 `--text-secondary` → `--text-primary` on hover
- Primary action ("Publish skill") as a small primary button, right-aligned

### Tooltip / Popover

- Background `--gray-900`, text `#fff`, 11px, padding `4px 8px`, radius `--radius-sm`
- Delay 300ms, fade 120ms

### Empty / Loading / Error States

- Skeletons use `--bg-subtle` → `--bg-hover` shimmer, same radius as the real element
- Empty states: single icon (20px), one line of `--text-base`, one ghost button. No illustrations.

## 10. Page Patterns

**Landing:** centered hero (28px heading, 13px subcopy in `--text-secondary`), a prominent search input (max 520px), a row of category pills, then a 3-column grid of featured skill cards.

**Browse:** left filter rail (220px, collapsible) with category, tags, and verified toggle; main column with a sort control and a 2 to 3 column card grid (list view as an alternative).

**Skill detail:** two-column layout. Main column (max 680px) holds the README rendered at 13px/20px. Right rail (260px) holds install command, version, author, license, stats, and links.

**Responsive breakpoints**

```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

Grid collapses 3 → 2 → 1 columns; the filter rail becomes a bottom sheet under `--bp-md`.

## 11. Voice and Content

- Lowercase slugs in mono (`pdf-tools`), sentence case everywhere else
- Short, literal copy: "Install", "Copy", "View source". No exclamation marks, no emoji in the UI.
- Numbers abbreviated: `12.4k`, `1.2m`
- Dates relative under 30 days ("3d ago"), absolute afterward

## 12. Accessibility

- Text contrast ≥ 4.5:1 for body (`--text-secondary` on `--bg-surface` passes; do not use `--text-tertiary` for essential text under 12px)
- Visible focus ring on every interactive element
- Hit targets ≥ 32px on desktop, 40px on touch
- Never rely on color alone for state (pair with icon or label)
- Respect `prefers-reduced-motion` and `prefers-color-scheme`

## 13. Starter CSS

```css
:root {
  /* font */
  --font-sans: "Geist", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* color */
  --bg-page: #FCFCFD;
  --bg-surface: #FFFFFF;
  --bg-subtle: #F8F9FA;
  --bg-hover: #F1F3F5;
  --text-primary: #14181D;
  --text-secondary: #5B6470;
  --text-tertiary: #7C8591;
  --border-subtle: #E9ECEF;
  --border-default: #E2E5E9;
  --accent: #5457E0;

  /* shape */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 120ms;
  --duration-base: 180ms;
}

html { font-family: var(--font-sans); font-size: 13px; line-height: 20px;
       color: var(--text-primary); background: var(--bg-page);
       -webkit-font-smoothing: antialiased; }

.card { background: var(--bg-surface); border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg); padding: 16px;
        transition: border-color var(--duration-base) var(--ease-out),
                    transform var(--duration-base) var(--ease-out); }
.card:hover { border-color: var(--border-default); transform: translateY(-1px); }

.btn { height: 32px; padding: 0 12px; border-radius: var(--radius-md);
       font-size: 13px; font-weight: 500;
       transition: background-color var(--duration-fast) ease, transform 80ms var(--ease-out); }
.btn:active { transform: scale(0.98); }
```

## 14. Tailwind Config Snippet

```js
// tailwind.config.js
export default {
  theme: {
    fontFamily: {
      sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['Geist Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
    },
    fontSize: {
      '2xs': ['10px', '14px'],
      xs: ['11px', '16px'],
      sm: ['12px', '18px'],
      base: ['13px', '20px'],
      md: ['14px', '20px'],
      lg: ['16px', '24px'],
      xl: ['20px', '28px'],
      '2xl': ['28px', '34px'],
    },
    borderRadius: { xs: '4px', sm: '6px', md: '8px', lg: '12px', full: '999px' },
    extend: {
      colors: {
        gray: {
          25: '#FCFCFD', 50: '#F8F9FA', 100: '#F1F3F5', 150: '#E9ECEF',
          200: '#E2E5E9', 300: '#D0D5DB', 400: '#A8AFB8', 500: '#7C8591',
          600: '#5B6470', 700: '#3F4752', 800: '#272D35', 900: '#14181D',
        },
        accent: { 50: '#F4F5FF', 100: '#E9EBFF', 200: '#D5D9FD', 500: '#6366F1', 600: '#5457E0', 700: '#4547C2' },
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
};
```
