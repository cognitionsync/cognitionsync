---
# Extracted from code. Every value traces to a cited file.
source_of_truth: "client/src/index.css (:root) + tailwind.config.ts"
color_mode: light-only    # no dark: variant, no darkMode key, no .dark block
colors:      # HSL triplets (authoritative); hex = browser-computed, not the css comment
  background: "40 33% 96%"       # #F8F6F1 page bg
  foreground: "60 3% 8%"         # #151514 primary text
  card: "0 0% 100%"              # enclosed surface (= popover)
  secondary: "43 24% 93%"        # #F1EFE9 alt band (= muted = accent)
  muted-foreground: "50 5% 38%"  # #66645C body/secondary text
  primary: "221 83% 53%"         # #2463EB CTA fill (= brand = ring)
  primary-foreground: "0 0% 100%"
  brand-hover: "224 76% 48%"     # #1D4FD7 CTA hover only
  destructive: "0 72% 51%"       # #DC2828 form errors, destructive toast
  border: "42 21% 88%"           # #E7E3DA all hairlines
  input: "42 16% 84%"            # #DDD9D0 field borders only
  scrollbar-thumb: "42 12% 80%"  # hardcoded, not a token
fonts: { sans: "Inter (loaded 400 500 600 700)", mono: "JetBrains Mono (loaded 500 600)" }
radius: { base: 0.625rem, lg: 10px, md: 8px, sm: "6px (unused)", xl: "12px (Tailwind default, not token-derived)" }
elevation: { default: none, shadow-lg: "toast only" }
layout: { container: ".container-page = mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", section_padding: ".section-py = py-20 md:py-28", scroll_margin_top: 5rem, nav_height: 4rem }
motion:
  ease: "cubic-bezier(0.16, 1, 0.3, 1)"   # EASE, lib/motion.ts:4
  reveal: "opacity + 16px rise, 0.5s, once, viewport margin -80px"
  hover: 150ms
  reduced_motion: "all animation/transition forced to 0.001ms"
---

# Design System — CognitionSync

## Overview

Single-page marketing site. React 18 + Vite + Tailwind 3; shadcn/ui (`new-york`,
`neutral`) for form/accordion/toast primitives only. All copy lives in
[site.config.ts](site.config.ts); components carry styling only. Named "Ivory
Intelligence" ([index.css:6](client/src/index.css:6)): **warm-neutral, border-first,
single-accent** — ivory page, white cards, hairline borders instead of shadows, one
chromatic color reserved for actions.

## Colors

All colors are CSS custom properties in [index.css:5-38](client/src/index.css:5). No
raw hex or `rgb()` in any component.

| Role | Token | Uses |
|---|---|---|
| Primary text, headings, icons / secondary body text | `foreground` / `muted-foreground` | 28 ea |
| Tertiary text / de-emphasized meta | `foreground/70` / `foreground/40` | 3 / 2 |
| Card / enclosed surface | `card` | 5 |
| Alt section band / card hover fill | `secondary/30`,`/40` / `secondary/50` | 4 / 1 |
| Primary action fill / hover | `primary` / `brand-hover` | 5 / 4 |
| Inline accent text / all hairlines | `brand` / `border` | 2 / 17 |
| Error text, destructive toast | `destructive` | 2 |

Opacity modifiers (`/30 /40 /50 /70`) are the only way tints are made — never add a
variable for a lighter shade. `brand` is for *text* accents, `primary` for *filled*
backgrounds. Alternating sections use `bg-secondary/30`, full-width bands `/40`.

## Typography

Inter for everything; JetBrains Mono exclusively for uppercase micro-labels and
numerals ([index.html:20](client/index.html:20)). `body` sets `font-feature-settings:
"cv02","cv03","cv04","cv11"`.

| Role | Spec | Uses |
|---|---|---|
| Hero H1 | `clamp(2.5rem, 5vw, 4.25rem)` / 1.05 / `-0.03em` / 600 | 1 |
| Section H2 | `text-3xl sm:text-4xl` (30→36px) / 600 / `tracking-tight` | 4 |
| Blockquote / case metric H3 | `text-xl sm:text-2xl` 500 / `text-2xl` 600 | 1 ea |
| Card title H3 | `text-base`–`text-lg` / 600 | 5 |
| Lead paragraph | `text-lg leading-relaxed` (18px / 1.625) | 6 |
| Body, labels, buttons | `text-sm` (14px); 500 when interactive | 31 |
| Mono eyebrow | `text-xs` / 500 / uppercase / `tracking-[0.16em]` | 4 |

`leading-relaxed` (1.625) is the default for prose — 13 uses vs 2 `leading-tight`
(H2) and 1 `leading-snug`. `h1–h4` get `tracking-tight` + `text-wrap: balance`; `p`
gets `text-wrap: pretty` ([index.css:57](client/src/index.css:57)). Weights in use:
400, 500 (17×), 600 (11×) — **700 is loaded but never used.**

## Layout & Spacing

- Every section is `<section class="section-py">` wrapping one `.container-page` —
  8 of 9. Hero is the exception: `pt-36 pb-20 md:pt-44 md:pb-28`, to clear the nav.
- Heading rhythm is fixed by `SectionHeading`: eyebrow → `mt-3` H2 → `mt-4`
  subtitle → `mt-14` content. Reused verbatim in contact and about sections.
- Measure caps: `max-w-2xl` headings, `max-w-3xl` hero/FAQ/quote, `max-w-xl` form.
- Card grids are `md:grid-cols-3 gap-6`. The services grid instead uses `gap-px`
  over `bg-border` to render 1px seams between white cells.
- Spacing values used: 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 28;
  `mt-3` (9×), `mt-5` (6×), `mt-4` (5×) dominate. Icons are `h-4 w-4` (9×) at
  `strokeWidth={1.5}` (6×); section icons `h-6 w-6`.

## Elevation & Depth

Depth comes from **borders and background steps, never shadows**: (1) hairline
`border-border` — `border-t` (7×) separates sections, `border-y` (2×) wraps bands,
`divide-y` for lists; (2) background step — `bg-card` white on `bg-background`
ivory, or `bg-secondary/30` bands; (3) backdrop blur — nav only, past 8px scroll:
`bg-background/80 backdrop-blur-md`. `.card-surface` is commented "Border-first card
(no default shadow)" ([index.css:104](client/src/index.css:104)); the only
`shadow-*` in the repo is `shadow-lg` on the toast.

## Shapes

`rounded-lg` (10px, `--radius`) for buttons and icon buttons (8 uses); `rounded-xl`
(12px) for cards (2); `rounded-md` (8px) for shadcn inputs and toast (4); `999px` for
the scrollbar thumb only. No pills, no circles. One decorative texture: `.bg-dots`, a
`radial-gradient` dot at `foreground/0.06` on a 22px grid, hero only, masked out 70%.

## Components

**Primary button** ([hero-section.tsx:53](client/src/components/hero-section.tsx:53))
— `rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground
transition-colors duration-150 hover:bg-brand-hover`, `disabled:opacity-60`; trailing
`ArrowRight h-4 w-4` slides `group-hover:translate-x-0.5`. **Secondary** — same box
with `border border-border bg-card text-foreground hover:bg-secondary`. Nav CTA is
the compact variant: `px-4 py-2`.

**Card** (`.card-surface`) — `rounded-xl border border-border bg-card
transition-colors duration-150`, padded `p-7`. Hover is a border darken
(`hover:border-foreground/20`) **or** a fill (`hover:bg-secondary/50`) — never both,
never a shadow or a lift.

**Input / Textarea** — `h-10` / `min-h-[80px]`, `rounded-md border border-input
bg-background px-3 py-2`. Focus is `focus-visible:ring-2 ring-ring ring-offset-2`,
the only focus treatment in the repo. Disabled: `cursor-not-allowed opacity-50`.

**Reveal** ([reveal.tsx](client/src/components/primitives/reveal.tsx)) — the single
scroll animation: opacity 0→1, y 16→0, 0.5s, `EASE`, `once: true`. Grids stagger
children 0.06–0.09s. No other entrance effect exists.

## Do's and Don'ts

**Do** — add colors only as `hsl(var(--token))` behind a Tailwind semantic name;
separate sections with `border-t border-border` and alternate `bg-secondary/30`; use
`transition-colors duration-150` for hover (color is the only thing that changes,
plus a 2px icon nudge); reuse `SectionHeading` and `Reveal` rather than hand-rolling
heading rhythm or animation; put user-facing strings in [site.config.ts](site.config.ts),
never in a component; give every `<section>` an `id` — nav scroll targets need it.

**Don't** — none of these appear anywhere in the repo:
- No shadows on cards, buttons, or nav. No `hover:scale`, no `hover:-translate-y`.
- No decorative gradients; the only two are the hero dot texture and its fade mask.
- No second accent color, and no raw Tailwind palette classes (`blue-500`,
  `gray-200`) except the toast's `red-*` states.
- No dark mode — don't add `dark:` variants without adding a `.dark` token block.
- No `!important` outside the reduced-motion block; no inline `style` except the
  logo's animated `transform`.
- No weight 700, no italic except the NDA note, no uppercase except the eyebrow.

**Voice** (from [site.config.ts](site.config.ts)) — sentence case for headings,
subtitles, buttons, and errors; Title Case only for nav links, service names, and
industry labels. First person plural for the studio, second person for the reader,
present tense. Button labels are verb-first, 2–4 words, no terminal period ("Start a
conversation", "Book a 30-min call"). Validation messages are imperative, ≤6 words,
no period ("Enter a valid work email"); toast titles ≤3 words; subtitles 1–2
sentences, 20–35 words. Em dash (—) is the standard aside separator, en dash for
ranges ("4–10 weeks"), and the `…` character never three dots ("Sending…"). Claims
are hedged and concrete, never superlative: "Honest about what AI can — and can't —
do", "Client shared under NDA".

## Inconsistencies

Recorded, not normalized.

1. **Card radius is off-token.** `--radius` drives `rounded-lg/md/sm`, but `rounded-xl` is untouched Tailwind — buttons 10px, cards 12px, from two systems. [index.css:106](client/src/index.css:106), [tailwind.config.ts:7](tailwind.config.ts:7)
2. **`primary` and `brand` hold the identical value**, and single elements mix namespaces: `bg-primary … hover:bg-brand-hover`. [hero-section.tsx:56](client/src/components/hero-section.tsx:56)
3. **Eyebrow letter-spacing forks.** `.eyebrow` is `0.16em`; the same label is hand-rolled at `0.14em` in [work-section.tsx:33](client/src/components/work-section.tsx:33) and [footer.tsx:44](client/src/components/footer.tsx:44), and re-declared inline at 0.16em in [trust-strip.tsx:9](client/src/components/trust-strip.tsx:9) instead of using the class.
4. **Post-heading gap is `mt-14`** for grids (4×) but `mt-12` for the FAQ accordion ([faq-section.tsx:19](client/src/components/faq-section.tsx:19)) and contact form.
5. **Form fields are 16px, everything else 14px** — `Input`/`Textarea` keep the shadcn `text-base md:text-sm` default. [input.tsx:11](client/src/components/ui/input.tsx:11)
6. **Toast uses raw palette colors** (`red-300/50/400/600`), the only non-token colors in the repo. [toast.tsx:70](client/src/components/ui/toast.tsx:70)
7. **Accordion fights its own default:** the primitive sets `hover:underline`, its only consumer overrides with `no-underline hover:no-underline`. [accordion.tsx:33](client/src/components/ui/accordion.tsx:33), [faq-section.tsx:22](client/src/components/faq-section.tsx:22)
8. **Terminal periods on titles split 3/5.** With: hero headline, "Substance over spectacle.", "Let's build something that works." Without: "What we build", "Outcomes, not deliverables", "A clear path from problem to production", "Ways to work with us", "Questions we hear often". Toast titles split the same way.
9. **Two off-scale font sizes:** `text-[0.95rem]` ([faq-section.tsx:25](client/src/components/faq-section.tsx:25)) and `text-[1.05rem]` ([logo.tsx:81](client/src/components/logo.tsx:81)).
10. **Two divider colors.** `border-border` is standard (17×); approach steps use `border-foreground/15`. [approach-section.tsx:29](client/src/components/approach-section.tsx:29)
11. **Dead tokens:** `maxWidth.prose: 68ch` and `borderRadius.sm` are defined and never used; Inter 700 is loaded and never used. Separately, the logo's transition is off-system — inline `0.7s cubic-bezier(0.4, 0, 0.2, 1)` vs the site-wide `EASE`. [logo.tsx:64](client/src/components/logo.tsx:64)
13. **Straight apostrophes in copy** (11×) but curly `“ ”` around the blockquote. [work-section.tsx:44](client/src/components/work-section.tsx:44)
14. **Every hex comment in `:root` is 1–2 per channel off its own HSL** (measured in-browser): `--background` computes to `#F8F6F1` not `#F9F7F3`, `--foreground` `#151514` not `#141413`, `--primary` `#2463EB` not `#2563EB`, `--border` `#E7E3DA` not `#E6E3DC`, `--secondary` `#F1EFE9` not `#F1EFEA`. The HSL is authoritative; treat the comments as approximate. Consequence: `seo.themeColor: "#F9F7F3"` ([site.config.ts:56](site.config.ts:56)) does not match the rendered page background `#F8F6F1`.
15. TODO: `--input` (84% L) is darker than `--border` (88% L) — is the heavier field border intentional, or should fields use `--border`? And `secondary`/`muted`/`accent` are all `43 24% 93%` — meant to diverge later, or should two be dropped?

## Evidence

| Token | Value | Count | Primary file |
|---|---|---:|---|
| `text-sm` | 14px | 31 | body, labels, buttons |
| `text-foreground` / `text-muted-foreground` | `60 3% 8%` / `50 5% 38%` | 28 ea | all sections |
| `border-border` / `font-medium` | `42 21% 88%` / 500 | 17 ea | dividers; buttons, nav |
| `transition-colors` / `font-semibold` | — / 600 | 15 / 11 | all interactive; all headings |
| `.container-page` / `leading-relaxed` | `max-w-6xl px-5 sm:px-6 lg:px-8` / 1.625 | 13 ea | [index.css:87](client/src/index.css:87), prose |
| `h-4 w-4` / `mt-3` / `hover:text-foreground` | 16px / 0.75rem / — | 9 ea | icons, heading rhythm, links |
| `.section-py` / `rounded-lg` / `gap-2` | `py-20 md:py-28` / 10px / 0.5rem | 8 ea | [index.css:91](client/src/index.css:91), buttons |
| `duration-150` / `font-mono` / `border-t border-border` | 150ms / JetBrains Mono / — | 7 ea | hover, eyebrows, sections |
| `text-lg` / `text-xs` / `strokeWidth={1.5}` | 18px / 12px / — | 6 ea | leads, mono labels, icons |
| `bg-primary` / `bg-card` | `221 83% 53%` / `0 0% 100%` | 5 ea | CTA buttons, card surfaces |
| `text-3xl`+`sm:text-4xl` / `hover:bg-brand-hover` | 30→36px / `224 76% 48%` | 4 ea | H2, CTA hover |
| `.eyebrow` / `rounded-md` / `mt-14` | mono 12px 0.16em / 8px / 3.5rem | 4 ea | [index.css:100](client/src/index.css:100), inputs, grids |
| `.card-surface` / `p-7` | `rounded-xl border bg-card` / 1.75rem | 3 ea | [index.css:105](client/src/index.css:105) |
| `rounded-xl` / `text-brand` | 12px / `221 83% 53%` | 2 ea | cards, inline accent |
| `text-display` | `clamp(2.5rem,5vw,4.25rem)` | 1 | [hero-section.tsx:38](client/src/components/hero-section.tsx:38) |
| `shadow-lg` | Tailwind default | 1 | [ui/toast.tsx:29](client/src/components/ui/toast.tsx:29) |
