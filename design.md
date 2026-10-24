
# design.md — Repoverse Dashboard UI (reference-derived)

Source of truth: `repo.png` (2048 × 1536, 2× retina capture → **divide all pixel values below by 2 for CSS px**; the design is a ~1024 CSS-px-wide crop of a larger desktop layout).
Colors marked `sampled` were read from pixels; values marked `est.` are estimated from the screenshot; `inferred` = not visible in a static image.

> **Scope note.** The target Next.js project was not available in the workspace when this was written, so Section 7 (implementation mapping) is a *template* to be confirmed against the repo, not a description of it. Everything in Sections 1–6 comes from the screenshot.

---

## 1. Visual identity

**Aesthetic:** Clean, airy, light-mode developer-analytics dashboard. White surfaces, hairline borders, almost no shadows, one saturated accent (green) used for data and status. Reads as "calm productivity SaaS": lots of whitespace, medium-weight type, large numerals for KPIs.

**Hierarchy principles**

1. Numbers are the heroes (KPI values ≈ 32 px / 500).
2. Section titles are large but light-weight (≈ 22 px / 500), not bold.
3. Secondary text (labels, "Member Average", "Commit") is mid-gray, never colored.
4. Green is reserved for: brand, positive deltas, contribution heatmap, active/status dots, count badges, "Accept".
5. Red only for negative deltas and destructive actions ("Decline", "-9.0%").

### Colors (CSS px values unaffected)

| Token                         | Hex                                  | Use                                                                   |
| ----------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `canvas`                    | `#F2F1F6` (sampled)                | Area behind the app window (cool lavender-gray)                       |
| `surface`                   | `#FFFFFF` (sampled)                | Sidebar, buttons, right panel, inputs                                 |
| `surface-muted`             | `#FDFDFD` (sampled)                | Main content cards/strips (almost white)                              |
| `border`                    | `#EBEBEF` est.                     | Hairline 1 px dividers & button borders (≈ `#F0F0F0`–`#E8E8EC`) |
| `foreground`                | `#111111` est.                     | Headings, KPI numerals, nav labels                                    |
| `muted-foreground`          | `#8A8A94` est.                     | "Member Average", "Commit", month labels, section captions            |
| `caption`                   | `#9A9AA3` est.                     | Sidebar group labels ("MY DASHBOARD", "CODE SPACE") — uppercase      |
| `brand`                     | `#1FBF5B` est.                     | Repoverse logo + wordmark                                             |
| `success`                   | `#22A646` (sampled `#24A845`)    | Positive text, dark heatmap cell, check icons                         |
| `success-bg`                | `#E6F8EA` est.                     | Positive delta pill background                                        |
| `danger`                    | `#E5484D` est.                     | Negative text, "Decline"                                              |
| `danger-bg`                 | `#FFE8EA` (sampled)                | Negative delta pill background                                        |
| `neutral-pill-bg`           | `#F6F6F8` est.                     | "0.0%" pill                                                           |
| `status-red / green / blue` | `#F04438 / #22C55E / #2F6BFF` est. | Dots before "90 Hrs / 31 Hrs / 21 Hrs"                                |

**Heatmap ramp (5 levels, sampled/est.):**
`L0 #DFF7E3` · `L1 #A3E9B5` est. · `L2 #68DF87` (sampled) · `L3 #2FCB5A` est. · `L4 #22A646` (sampled)
Legend order, left→right: **More** (L4 → L1) **Less**, with the lightest swatch on the right.

**Gradients / glow / blur:** none. A thin ~3 px mint line (`#BAFFD5` sampled) runs along the top edge of the browser-window frame — decorative mockup chrome, **not part of the app UI**; omit.

### Typography

- Family: neo-grotesque sans, SF-Pro-like (Inter-class). **Use `Inter` via `next/font/google`** (nearest open match; the screenshot appears to be SF Pro / Inter). `inferred`
- Numerals are proportional, comma used as decimal separator in the mock data (`65,4`, `21.8%`, `69,3%`) — keep data as-is only if the project is localized; otherwise render with `.`.

| Role                                                    | Size (CSS px, est.) | Weight           | Line-height | Tracking | Color              |
| ------------------------------------------------------- | ------------------- | ---------------- | ----------- | -------- | ------------------ |
| Page title ("Vektora")                                  | 22–23              | 500              | 1.2         | −0.01em | foreground         |
| Section title ("Project Contributors", "Member Status") | 22                  | 500              | 1.2         | −0.01em | foreground         |
| KPI value ("65,4")                                      | 32                  | 500              | 1.1         | −0.01em | foreground         |
| KPI label ("Contribute Rate")                           | 16–17              | 400–500         | 1.3         | 0        | `#3A3A42` est.   |
| Nav item                                                | 16                  | 400 (active 500) | 1.3         | 0        | foreground         |
| Table cell                                              | 15–16              | 400, name 500    | 1.3         | 0        | foreground / muted |
| Caption / sub-label                                     | 14–15              | 400              | 1.3         | 0        | muted-foreground   |
| Group label (uppercase)                                 | 12.5                | 400              | 1.2         | +0.02em  | caption            |
| Pill text (delta)                                       | 14                  | 400              | 1           | 0        | success/danger     |
| Tiny badge ("Private")                                  | 12                  | 400              | 1           | 0        | foreground         |

### Borders, radius, shadows

- Border: **1 px**, `border` token. Dividers between sections are full-bleed hairlines.
- Radius: buttons **10–12 px** (est. 20–24 px @2×); pills/badges **6–8 px**; heatmap cells **5–6 px** (≈ 12 px @2×, near-square rounded); avatars **full**; app window **16 px** (mockup chrome, omit).
- Shadow: buttons carry an almost imperceptible bottom shadow `0 1px 2px rgba(16,16,24,.04)`; cards/strips have **none**. No glow.

### Icons

Lucide-equivalent, **1.5 px stroke**, 18–20 px, color foreground (nav) or muted (inline). Rounded caps/joins. Mapping: Overview→`LayoutGrid`/`LayoutDashboard`, Repository→`PanelLeft`/`Book`, Database→`Database`, Projects→`Layers`, Packages→`Package`/`Database`, Member→`Users`, Analytics→`PanelLeft`/`BarChart3`, Settings→`Settings`, Profile→`CircleUser`, Work Preferences→`Upload`/`Share`, Recents Work→`Clock`, Date→`Calendar`, Plus→`Plus`, sync→`GitPullRequest`/`ArrowLeftRight`, bot→`Bot`, search→`Search`, Tags→`Tag`, Branch→`GitBranch`, By Member→`Users`, Project→`PanelTop`/`LayoutPanelTop`, Filter→`ListFilter`, Latest Activity→`Rocket`, Active Repository→`BookCheck`/`Book`, info→`Info` (in circle), commit timeline marker→`GitCommitHorizontal`.

### Images

Avatars are circular photo crops, `object-cover`, center/top-biased, **no ring** in lists (28–32 px), 40 px in activity feed (≈ 48 px @2× → 24–28 CSS px list rows and 20 px page-header stack). Header avatar group overlaps by ~6 px with a 2 px white ring. Project icons are 24 px circles (V logo on dark-green `#0E2A1F`, orange flame badge, photo).

---

## 2. Layout system

Three-column app shell inside a full-viewport white window, **no outer margin in production** (the screenshot's margin is mockup chrome).

```
┌─────────────┬───────────────────────────────────────────┬────────────────┐
│ Sidebar     │ Main                                       │ Activity rail  │
│ ≈ 203 px    │ flex-1                                     │ ≈ 280–300 px   │
│ (406 @2×)   │ (header 50px / toolbar 63px / content)     │ (cut off, est.)│
└─────────────┴───────────────────────────────────────────┴────────────────┘
```

| Measure (CSS px, est. from 2× → ÷2)         | Value                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Sidebar width                                  | **203** (x 0→203 within window; border-right 1 px)                                  |
| Sidebar padding                                | 12 px horizontal; nav items 40 px tall, 8 px radius                                        |
| Top header (title row) height                  | **50** (y 82→132 @1×, hairline below)                                              |
| Toolbar row height (Recents / date / actions)  | **~51** (control height **27–28** → 54–56 @2×)                             |
| Breadcrumb strip height                        | **~57** (hairline below)                                                             |
| KPI row height                                 | **~97** (4 equal columns, hairline below)                                            |
| Section header ("Project Contributors") height | **~56**                                                                              |
| Heatmap block                                  | 6 rows × 29 cols (visible), cell **14 px**, gap **6 px** (pitch ≈ 21 CSS px) |
| Table row height                               | **~40** with 1 px bottom border                                                      |
| Main horizontal padding                        | **16 px** (left edge of content at x≈261 @2× from main start 245)                  |
| Main ↔ right-rail divider                     | 1 px vertical hairline                                                                     |

- **Gutters:** content aligned to a single 16 px inset inside Main; every full-width section has its own hairline separator, so vertical rhythm is created by **borders, not margins** (sections are 0-gap stacked, internal padding 16 px).
- **KPI grid:** 4 columns, equal width (≈ 160 px each in the crop), each column: title + `…` menu on first row, "Member Average" caption row, then value left + delta pill right on a shared baseline.
- **Right rail:** vertical feed, each item ~58–64 px, 16 px inset, avatars 24 px at x=16, text begins x=48.

### Responsive behavior (inferred — not visible)

| Breakpoint | Behavior                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≥ 1280    | Full 3-column layout as shown                                                                                                                                        |
| 1024–1279 | Right rail becomes a collapsible drawer (toggle in header); sidebar stays 203 px                                                                                     |
| 768–1023  | Sidebar collapses to icon rail (the `                                                                                                                                |
| < 768      | Sidebar becomes a `Sheet` (shadcn); KPI grid 2×2; heatmap horizontally scrollable (`overflow-x-auto`, min-width kept); table → stacked rows (name + two stats) |

---

## 3. Component specifications

### 3.1 Sidebar

- Top: logo row (height 50, bottom hairline) — asterisk/burst glyph (24 px, brand green) + wordmark "Repoverse" (≈ 20 px / 500, brand green); right-aligned collapse button `ArrowLeftToLine`/`PanelLeftClose` 20 px, muted.
- Group labels: uppercase, 12.5 px, `caption`, 16 px above first item, 8 px below. Groups: **MY DASHBOARD**, **CODE SPACE**, **USER PROFILE**.
- Nav item: height 40, padding-x 12, radius 8, icon 20 px + 12 px gap + label 16 px. Default: foreground; hover: `bg-black/[0.03]`; **active** (Vektora/Marketplace in the screenshot): label weight 500, no filled background observed — use weight + full-opacity foreground. Focus: 2 px ring `ring-brand/40`.
- **Projects** item has a trailing chevron-down (muted) and expands to sub-items indented 32 px with 24 px circular project avatars; sub-item text 15.5 px; active sub-item = foreground 500.
- Footer: "REPOVERSE® COMMUNITY" tiny uppercase caption pinned bottom, 16 px inset.

### 3.2 Page header (row 1)

- Left: 28 px dark-green round logo + "Vektora" (22 / 500) + **segmented chip** "Code Space" (bg `#F4F4F6` est., radius 8, h 32, px 12, text 16).
- Right: overlapping avatar stack (4 × 20 px, −6 px overlap, 2 px white ring) + outlined **"Invite people"** button (h 34, px 14, radius 10, 1 px border, text 16).

### 3.3 Toolbar (row 2)

- Outlined buttons, **h 28 / px 10 / radius 8**, 1 px `border`, white bg, tiny shadow, icon 16 px + 6 px gap + label 15 px:
  `Recents Work`(clock), `January 2023 ▾`(calendar + chevron-down).
- Right cluster: 3 square icon buttons (h 28 w 28: `+`, sync, bot), then **search input** w ≈ 190 (visible), left `Search` icon, placeholder `Type / to search` with a `/` kbd hint.
- Hover: border → `#D8D8DE`, bg `#FAFAFB`. Focus: 2 px brand ring. Disabled: 50 % opacity.

### 3.4 Breadcrumb strip

- `Vektora Space` › `prime-marketplace-3.0` + **`Private`** badge (h 20, px 8, radius 6, 1 px border, 12 px text).
- Right: two outlined buttons with **count badge**: `Tags (7)` and `Branch (10)` — count is a 16 px green pill (`bg success`, white 11 px text, full radius).

### 3.5 KPI card (×4: Contribute / Commit / Hours / Work Rate)

- Title 16–17 px `#3A3A42` + `…` (MoreHorizontal, 20 px, muted) top-right.
- Caption "Member Average" 15 px muted.
- Value 32 px / 500 + delta pill: h 24, px 8, radius 6, 14 px.
  - Positive `+21.8%` → `text success` on `success-bg`.
  - Neutral `0.0%` → foreground on `neutral-pill-bg`, 1 px border.
  - Negative `-9.0%` → `text danger` on `danger-bg`.
- No card border/background; columns separated only by whitespace (padding 16).

### 3.6 Contribution heatmap ("Project Contributors")

- Header: title left; right `By Member ▾` outlined select (Users icon, h 28, radius 8).
- Month labels row (Jan…Aug), 15 px muted, positioned to column groups (≈ every 4 columns).
- Grid: **6 rows × 29 columns**, cell 14 × 14, gap 6, radius 5; 5 intensity levels (see ramp).
- Footer: left "How to Read Contribute ⓘ" (15 px, info icon green outline 16 px); right legend `More ■■■■■ Less` (cell 14 px, gap 6).
- Hover (inferred): `scale(1.15)` + tooltip (shadcn `Tooltip`) "N contributions on …".

### 3.7 Member Status table

- Header row: title + two outlined buttons `Project` (panel icon) and `Filter` (list-filter icon).
- Row: h 40, 1 px bottom border, columns (px from table-left, est.): Avatar+Name (0–160, 500) · `76 Contribute` (foreground 500, col 2) · `42 Commit` (muted) · status-dot + `90 Hrs ( Work in Repo )` (dot 8 px, "( Work in Repo )" muted) · right-aligned `69,3% WR` (value foreground, "WR" muted).
- Hover (inferred): `bg-black/[0.02]`.

### 3.8 Activity rail ("Latest Activity", "Active Repository")

- Section header: icon (green 18 px) + title 18 px / 500, hairline below.
- Date row: `GitCommitHorizontal` icon (green) + "12 January 2023" 17 px.
- Item: 24–28 px avatar, name + action sentence 16 px, **monospace-ish code chip** (h 22, px 8, radius 6, 1 px border, 14 px, e.g. `merchant_store_main_con…`), optional `Accept` (success text, `success-bg` tint, border) / `Decline` (danger) small buttons h 26, px 12, radius 8.
- Active Repository item: `Book` icon + "Vektora / prime-market…" (org foreground 500, repo muted) + description 14 px muted truncated.

---

## 4. Motion & interaction

*The reference is a static screenshot — all motion is `inferred`. Keep it subtle; this design is deliberately calm.*

| Interaction                 | Spec                                                                                                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hover on buttons / nav      | 150 ms `ease-out`, border + bg-color only. No transforms.                                                                                                                                    |
| Press                       | `active:scale-[0.98]`, 80 ms                                                                                                                                                                 |
| Page enter                  | Sections fade-up: `opacity 0→1, y 8→0`, **250 ms**, easing `[0.22,1,0.36,1]`, stagger 50 ms (sidebar → header → KPI → heatmap → table). Framer Motion `variants`, once only. |
| KPI count-up                | Optional; 600 ms ease-out, `useInView` — skip if the numbers come from live data frequently.                                                                                                |
| Heatmap                     | Cells fade/scale in column-by-column: delay `col * 12 ms`, 200 ms. Hover scale 1.15, 100 ms.                                                                                                 |
| Dropdowns (date, By Member) | shadcn `DropdownMenu`/`Select` defaults: fade + 4 px slide, 150 ms.                                                                                                                        |
| Projects expand             | Height animate (Radix `Collapsible`), 200 ms; chevron rotates 180°.                                                                                                                         |
| Sidebar collapse            | Width 203 → 64, 220 ms ease-in-out; labels fade out first.                                                                                                                                    |
| Activity feed items         | Slide-in from right 8 px when new item arrives, 200 ms.                                                                                                                                        |
| Reduced motion              | `@media (prefers-reduced-motion: reduce)` → disable all transforms/stagger; keep opacity-only 100 ms. Framer: `useReducedMotion()`.                                                       |
| Touch                       | No hover-only affordances; tooltips on tap.                                                                                                                                                    |

Do **not** add: parallax, glow cards, spotlight/aurora backgrounds, floating particles. The reference has none.

---

## 5. Design tokens

### 5.1 CSS variables (`globals.css`, Tailwind v4 `@theme` or v3 `:root` HSL — adapt to the project)

```css
:root {
  --background: 0 0% 100%;           /* #fff */
  --foreground: 240 6% 7%;           /* #111 */
  --card: 0 0% 99%;                  /* #FDFDFD */
  --card-foreground: 240 6% 7%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 6% 7%;
  --primary: 142 66% 38%;            /* success green  ~#22A646 */
  --primary-foreground: 0 0% 100%;
  --secondary: 240 14% 97%;          /* #F6F6F8 chips */
  --secondary-foreground: 240 6% 7%;
  --muted: 240 14% 97%;
  --muted-foreground: 240 4% 56%;    /* ~#8A8A94 */
  --accent: 240 10% 96%;
  --accent-foreground: 240 6% 7%;
  --destructive: 358 75% 59%;        /* ~#E5484D */
  --border: 240 8% 93%;              /* ~#ECECF0 */
  --input: 240 8% 91%;
  --ring: 142 66% 45%;
  --radius: 0.625rem;                /* 10px */

  --canvas: 250 17% 95%;             /* #F2F1F6 */
  --brand: 147 70% 43%;              /* logo green */
  --success-bg: 134 62% 94%;
  --danger-bg: 355 100% 95%;         /* #FFE8EA */
  --heat-0: #dff7e3; --heat-1: #a3e9b5; --heat-2: #68df87; --heat-3: #2fcb5a; --heat-4: #22a646;
  --sidebar-width: 203px;
  --rail-width: 296px;
  --ease-out-expo: cubic-bezier(.22,1,.36,1);
}
```

### 5.2 Scale tokens

- **Spacing base:** 4 px. Used: 4, 6, 8, 10, 12, 16, 24, 32. Section padding 16; control padding-x 10–14; heatmap gap 6.
- **Radius:** `sm 6` (pills, code chips) · `md 8` (nav, small buttons) · `lg 10` (buttons, inputs) · `full` (avatars, count badges).
- **Shadows:** `--shadow-btn: 0 1px 2px rgb(16 16 24 / .04)`; nothing else.
- **Container widths:** sidebar 203, rail 296, main fluid, min-width of main 640.
- **Font sizes (px):** 12 / 14 / 15 / 16 / 18 / 22 / 32.
- **Motion:** `--dur-fast 100ms`, `--dur-base 150ms`, `--dur-slow 250ms`; ease `--ease-out-expo`.
- **Breakpoints:** Tailwind defaults (`md 768`, `lg 1024`, `xl 1280`).

### 5.3 Component variants

- `Button`: `outline-sm` (h 28, shown everywhere in toolbars) · `outline-md` (h 34, "Invite people") · `icon-sm` (28 × 28).
- `Badge`: `outline` ("Private") · `count` (green, pill) · `delta-success|neutral|danger`.
- `Chip`: code chip, mono 14 px.

---

## 6. Page-by-page spec — Repo Dashboard (`/…/[project]` code-space overview)

Reference: `repo.png`, whole frame.

| # | Section                        | Composition                                                      | Acceptance criteria                                                                                                                         |
| - | ------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Sidebar**              | logo → 3 labeled groups → Projects expander → footer caption  | Width 203 ± 2 px; item height 40 ± 1; group labels uppercase 12–13 px gray; Projects chevron right-aligned; only 1 hairline right border |
| 2 | **Header**               | project logo + name + "Code Space" chip ‖ avatar stack + Invite | Height 50; title 22 px/500; chip radius 8; bottom hairline full width                                                                       |
| 3 | **Toolbar**              | 2 outlined buttons left ‖ 3 icon buttons + search right         | All controls h 28 ± 1; radius 8; gap 8; search shows `/` hint                                                                            |
| 4 | **Breadcrumb strip**     | crumbs + Private badge ‖ Tags(7) Branch(10)                     | Height ~57; count pills 16 px green; badge h 20                                                                                             |
| 5 | **KPI row**              | 4 equal columns                                                  | 4 columns equal ± 2 px; value 32 px/500; delta pills colored per sign; `…` menu top-right of each                                       |
| 6 | **Project Contributors** | title + By Member select; month labels; 6 × N heatmap; legend   | Cell 14 px, gap 6, radius 5; 5 colors from ramp; month labels align to column groups; legend right-aligned "More … Less"                   |
| 7 | **Member Status**        | title + Project/Filter buttons; row table                        | Row h 40; status dots 8 px red/green/blue; "WR" right-aligned and muted                                                                     |
| 8 | **Latest Activity rail** | date marker + 5 feed items                                       | Avatar 24–28 px circular; code chips bordered; Accept/Decline colored                                                                      |
| 9 | **Active Repository**    | list of repos with muted descriptions                            | Org name 500 + repo name muted; description truncates with ellipsis                                                                         |

**Global criteria:** no section has a drop shadow; page uses only white / near-white surfaces; green appears only in the places listed in §1; every full-width section ends with a 1 px hairline.

---

## 7. Implementation mapping (template — verify against repo)

| Concern                        | Plan                                                                                                                                                                                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonts                          | `Inter` via `next/font/google` in `app/layout.tsx`, set `--font-sans`                                                                                                                                                                                                                 |
| Tokens                         | Put §5.1 into `app/globals.css`; map in `tailwind.config`/`@theme` (`brand`, `canvas`, `heat-0..4`, `success-bg`, `danger-bg`)                                                                                                                                               |
| Shell                          | `app/(dashboard)/layout.tsx` → `<AppSidebar/>` + `<main>` + `<ActivityRail/>`; use shadcn `sidebar` for collapse/Sheet on mobile                                                                                                                                                   |
| shadcn primitives              | `button`, `badge`, `input`, `select`/`dropdown-menu`, `popover`+`calendar` (date picker), `tooltip`, `collapsible`, `avatar`, `separator`, `sheet`, `table`, `scroll-area`                                                                                        |
| New components (genuinely new) | `KpiCard`, `DeltaPill`, `ContributionHeatmap`, `MemberStatusTable`, `ActivityFeed`/`ActivityItem`, `CodeChip`                                                                                                                                                                   |
| Aceternity UI                  | **Mostly unnecessary** — the reference has no spotlight/glow/aurora. Only candidate: `Sidebar` (animated collapse) from Aceternity as an alternative to shadcn's; prefer shadcn. Do **not** use background effects, card-hover glows or text effects.                          |
| Motion                         | `framer-motion` (or `motion`) for stagger/enter + heatmap cell reveal only; CSS transitions for hover                                                                                                                                                                                     |
| Icons                          | `lucide-react`, `strokeWidth={1.5}`, size 18–20                                                                                                                                                                                                                                          |
| Dependencies to add if missing | `framer-motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*` via shadcn                                                                                                                                                                   |
| Compatibility notes            | Tailwind v3 vs v4 token syntax differs (HSL triplets vs `@theme`); Aceternity snippets assume `motion/react` or `framer-motion` — match installed package; Next App Router: keep heatmap/hover/animation components `"use client"`, keep data-fetching wrappers as server components |

### Preservation rules for the refactor

Keep all routes, data fetching, auth and state untouched; change only presentation (class names, layout wrappers, shared components). Map real data to `KpiCard`, `ContributionHeatmap` (bucket counts into 5 levels via quantiles), and `MemberStatusTable`.

---

## 8. Known uncertainties

1. Exact font (looks like SF Pro/Inter) and exact grays are estimated; sampled pixels were only reliable for the page bg, heatmap greens and pill backgrounds.
2. Right activity rail and the top-right toolbar are **cropped** in the screenshot — rail width (~296) and search width are estimates.
3. Active nav-item styling isn't visibly distinct beyond weight; a subtle `bg-black/[0.03]` is recommended but not observed.
4. All motion, hover, focus, and responsive behavior are inferred (static image).
5. Browser chrome (traffic lights, URL bar, mint top line, lavender backdrop) is mockup framing and intentionally excluded.
