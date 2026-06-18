# Muibook Design

Mui is a token-led, theme-aware interface system. This portable guide contains the foundations, semantic decisions, and component mappings needed to create a recognizably Mui experience without access to other files.

## Design Direction

- Neutral, practical, and content-led.
- Dense and scannable, with strong type hierarchy and stable spacing.
- Depth comes from surface tone, borders, spacing, and restrained shadow.
- Saturated colour is reserved for focus, feedback, categorical distinction, and urgent actions.
- Light and dark themes preserve the same meaning and hierarchy; dark mode is not a simple inversion.
- Controls use direct labels, familiar behavior, and explicit interaction states.

## 1. Base Foundations

Base tokens are raw values without usage meaning. Semantic and component layers select from these foundations.

### Colour

Mui uses OKLCH for perceptually consistent ramps. Lower-numbered steps are lighter; higher-numbered steps are darker.

| Token | Value |
| --- | --- |
| `--black` | `#000000` |
| `--white` | `#ffffff` |

Black alpha tokens use suffixes 0, 5, 10, 20…100. White alpha tokens use 0, 10, 20…100. The suffix is the opacity percentage.

#### Grey

| Token | Value |
| --- | --- |
| `--grey-100` | `oklch(97.015% 0.00011 271.152)` |
| `--grey-150` | `oklch(94.047% 0.00009 271.152)` |
| `--grey-200` | `oklch(92.191% 0.0001 271.152)` |
| `--grey-300` | `oklch(84.522% 0.0001 271.152)` |
| `--grey-400` | `oklch(73.802% 0.00008 271.152)` |
| `--grey-500` | `oklch(62.675% 0.00007 271.152)` |
| `--grey-600` | `oklch(51.028% 0.00006 271.152)` |
| `--grey-700` | `oklch(44.953% 0.00005 271.152)` |
| `--grey-800` | `oklch(38.666% 0.00004 271.152)` |
| `--grey-900` | `oklch(32.109% 0.00004 271.152)` |
| `--grey-1000` | `oklch(25.197% 0.00003 271.152)` |
| `--grey-1100` | `oklch(17.764% 0.00002 271.152)` |
| `--grey-1200` | `oklch(11.492% 0.00001 271.152)` |

#### Feedback ramps

Each cell maps to `--{colour}-{step}`.

| Step | Red | Orange | Green | Blue |
| --- | --- | --- | --- | --- |
| 100 | `oklch(98% 0.03 25.0)` | `oklch(98% 0.03 71)` | `oklch(96.2% 0.034 145)` | `oklch(95.6% 0.022 250)` |
| 200 | `oklch(95% 0.10 25.0)` | `oklch(94% 0.07 71)` | `oklch(92% 0.075 145)` | `oklch(91% 0.045 250)` |
| 300 | `oklch(82% 0.14 25.0)` | `oklch(90% 0.11 71)` | `oklch(88% 0.120 145)` | `oklch(82% 0.091 250)` |
| 400 | `oklch(72% 0.17 25.0)` | `oklch(85% 0.14 71)` | `oklch(84.5% 0.160 145)` | `oklch(78.8% 0.105 250)` |
| 500 | `oklch(62% 0.19 25.0)` | `oklch(78% 0.16 71)` | `oklch(70% 0.220 145)` | `oklch(73% 0.130 245)` |
| 600 | `oklch(52% 0.19 25.0)` | `oklch(70% 0.16 71)` | `oklch(63% 0.200 145)` | `oklch(67% 0.150 249)` |
| 700 | `oklch(46% 0.19 25.0)` | `oklch(64% 0.16 71)` | `oklch(57% 0.180 145)` | `oklch(63% 0.155 249)` |
| 800 | `oklch(40% 0.19 25.0)` | `oklch(57% 0.16 71)` | `oklch(52% 0.160 145)` | `oklch(57% 0.167 251)` |
| 900 | `oklch(34% 0.19 25.0)` | `oklch(51% 0.16 71)` | `oklch(46% 0.140 145)` | `oklch(52% 0.178 253)` |
| 1000 | `oklch(28% 0.19 25.0)` | `oklch(45% 0.16 71)` | `oklch(42% 0.120 145)` | `oklch(48% 0.151 253)` |

#### Categorical colours

Categorical colours distinguish peers without implying success, warning, or error. Each hue provides `--categorical-{hue}-200`, `--categorical-{hue}-800`, and the theme-aware alias `--categorical-{hue}`. For example, `--categorical-purple` resolves to `--categorical-purple-200` in light mode and `--categorical-purple-800` in dark mode.

| Hue | Light foundation (`200`) | Dark foundation (`800`) |
| --- | --- | --- |
| Purple | `oklch(69.998% 0.12881 306.598)` | `oklch(39.825% 0.15525 302.768)` |
| Violet | `oklch(68.7% 0.11278 294.579)` | `oklch(37.751% 0.1414 289.195)` |
| Pink | `oklch(75% 0.12171 349.037)` | `oklch(49.567% 0.17587 355.522)` |
| Magenta | `oklch(73.607% 0.1553 324.203)` | `oklch(46.026% 0.18151 324.267)` |
| Red | `oklch(69.219% 0.13185 21.008)` | `oklch(43.588% 0.15193 26.224)` |
| Orange | `oklch(78.978% 0.10803 55.747)` | `oklch(51.737% 0.12922 49.443)` |
| Amber | `oklch(88.238% 0.11573 91.663)` | `oklch(65.465% 0.13065 86.837)` |
| Yellow | `oklch(92.328% 0.116 104.198)` | `oklch(72.736% 0.14925 103.38)` |
| Lime | `oklch(84.773% 0.11998 130.068)` | `oklch(57.802% 0.13829 132.375)` |
| Green | `oklch(82.146% 0.10519 154.481)` | `oklch(55.196% 0.1248 150.768)` |
| Teal | `oklch(83.949% 0.08537 182.617)` | `oklch(57.358% 0.092 179.632)` |
| Cyan | `oklch(81.649% 0.07802 211.528)` | `oklch(54.656% 0.08505 214.39)` |
| Blue | `oklch(74.949% 0.09578 248.783)` | `oklch(45.925% 0.11981 252.499)` |
| Indigo | `oklch(69.039% 0.10593 274.775)` | `oklch(38.197% 0.13614 269.807)` |

### Typography

Family: `system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`. The root font size is 62.5%, so 1rem is approximately 10px.

| Token | Value | Approx px |
| --- | --- | --- |
| `--font-size-15` | `1.1rem` | 11px |
| `--font-size-25` | `1.2rem` | 12px |
| `--font-size-50` | `1.4rem` | 14px |
| `--font-size-100` | `1.6rem` | 16px |
| `--font-size-200` | `1.8rem` | 18px |
| `--font-size-300` | `2.1rem` | 21px |
| `--font-size-400` | `2.4rem` | 24px |
| `--font-size-500` | `3.6rem` | 36px |
| `--font-size-600` | `4.8rem` | 48px |
| `--font-size-700` | `6rem` | 60px |
| `--font-size-800` | `7.2rem` | 72px |
| `--font-size-900` | `8.4rem` | 84px |
| `--font-size-1000` | `9.6rem` | 96px |

| Token | Value | Use |
| --- | --- | --- |
| `--font-weight-400` | 400 | Regular body copy |
| `--font-weight-500` | 500 | Actions and medium emphasis |
| `--font-weight-600` | 600 | Strong labels |
| `--font-weight-700` | 700 | Headings and high emphasis |

Line-height tokens pair with the corresponding font-size step: `--line-height-15` `1.63636364`, `--line-height-25` `1.5`, `--line-height-50` `1.5`, `--line-height-100` `1.5`, `--line-height-200` `1.33333333`, `--line-height-225` `1.66666667`, `--line-height-300` `1.14285714`, `--line-height-400` `1.5`, `--line-height-500` `1.33333333`, `--line-height-600` `1.25`, `--line-height-700` `1.2`, `--line-height-800` `1.16666667`, `--line-height-900` `1.14285714`, `--line-height-1000` `1.125`.

### Spacing

| Token | Value | Approx px |
| --- | --- | --- |
| `--space-000` | `0` | 0px |
| `--space-025` | `0.2rem` | 2px |
| `--space-050` | `0.4rem` | 4px |
| `--space-100` | `0.6rem` | 6px |
| `--space-200` | `0.8rem` | 8px |
| `--space-300` | `1.2rem` | 12px |
| `--space-400` | `1.6rem` | 16px |
| `--space-500` | `2.4rem` | 24px |
| `--space-600` | `3.6rem` | 36px |
| `--space-700` | `4.8rem` | 48px |
| `--space-800` | `6rem` | 60px |

Use the nearest established step; do not invent intermediate spacing values.

### Radius And Stroke

| Radius token | Value |
| --- | --- |
| `--radius-000` | `0` |
| `--radius-100` | `4px` |
| `--radius-150` | `6px` |
| `--radius-200` | `8px` |
| `--radius-300` | `16px` |
| `--radius-400` | `24px` |
| `--radius-500` | `36px` |
| `--radius-600` | `48px` |

| Stroke token | Value |
| --- | --- |
| `--stroke-size-050` | `0.5px` |
| `--stroke-size-100` | `1px` |
| `--stroke-size-200` | `2px` |
| `--stroke-size-300` | `3px` |
| `--stroke-size-400` | `4px` |
| `--stroke-size-500` | `5px` |

### Motion

| Token | Duration | Use |
| --- | --- | --- |
| `--speed-100` | 100ms | Press, colour, and opacity response |
| `--speed-200` | 200ms | Default hover, focus, and small state change |
| `--speed-300` | 300ms | Disclosure and panel transition |
| `--speed-400` | 400ms | Larger entrance or exit |

Motion is short and purposeful. Prefer opacity, colour, and transform; respect reduced-motion preferences.

## 2. Semantic Tokens

Semantic tokens assign meaning and resolve raw foundations differently in light and dark themes.

### Text

| Semantic token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--text-color` | `--grey-900` | `--grey-200` | Body, label, and UI text |
| `--heading-text-color` | `--grey-1000` | `--grey-100` | Headings |
| `--text-color-optional` | `--grey-500` | `--grey-400` | Secondary and optional text |
| `--text-color-info` | `--blue-600` | `--blue-400` | Information |
| `--text-color-success` | `--green-600` | `--green-400` | Positive confirmation |
| `--text-color-warning` | `--orange-600` | `--orange-400` | Warning |
| `--text-color-error` | `--red-600` | `--red-400` | Error and urgent attention |

Body colour variants change meaning, not size or weight.

### Surface

| Semantic token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--surface` | `--grey-200` | `--grey-1000` | Base page |
| `--surface-elevated-100` | `--white` | `--grey-800` | Highest elevation |
| `--surface-elevated-200` | `--grey-100` | `--grey-900` | Secondary elevation |
| `--surface-elevated-300` | `--grey-200` | `--grey-1000` | Low-contrast elevation |
| `--surface-recessed-100` | `--grey-300` | `--grey-1000` | Subtle recess |
| `--surface-recessed-200` | `--grey-400` | `--grey-1100` | Deeper recess |
| `--backdrop-overlay` | `--black-opacity-70` | `--black-opacity-70` | Modal and drawer scrim |

### Border, Focus, And Shadow

| Token | Construction | Use |
| --- | --- | --- |
| `--border-color` | black 20% / white 20% | Theme-aware separation |
| `--outline-color` | `--blue-500` / `--blue-300` | Focus-visible signal |
| `--border-thin` | 1px solid border colour | Default separation |
| `--border-thick` | 2px solid border colour | Strong separation |
| `--outline-medium` | 3px outset outline colour | Default prominent focus |
| `--shadow-thin` | 0 4px 6px | Small lift |
| `--shadow-medium` | 0 6px 8px | Cards and floating panels |
| `--shadow-thick` | 0 24px 48px | Dialogs and major overlays |

Prefer surface contrast and borders before shadow.

### Feedback

The value order below is background / border / text.

| Intent | Light | Dark |
| --- | --- | --- |
| Neutral (`--feedback-neutral-*`) | white / black 20% / grey 900 | grey 800 / white 20% / grey 100 |
| Positive (`--feedback-positive-*`) | green 100 / 600 / 900 | green 800 / 400 / 100 |
| Info (`--feedback-info-*`) | blue 100 / 600 / 900 | blue 800 / 400 / 100 |
| Warning (`--feedback-warning-*`) | orange 100 / 600 / 900 | orange 800 / 400 / 100 |
| Attention (`--feedback-attention-*`) | red 100 / 600 / 900 | red 800 / 400 / 100 |

Icons use step 600 in light mode and 200 in dark mode; neutral uses grey 600/200.

### Action

| Variant | Light | Dark | Use |
| --- | --- | --- | --- |
| Primary (`--action-primary-*`) | grey 900 background, white text | grey 200 background, grey 900 text | Main action |
| Secondary (`--action-secondary-*`) | transparent, grey 800 border, grey 900 text | transparent, grey 200 border, grey 100 text | Alternate action |
| Tertiary (`--action-tertiary-*`) | transparent, grey 900 text | transparent, grey 100 text | Low emphasis |
| Overlay (`--action-overlay-*`) | black 60% background, white text | same fixed overlay | Controls over media |
| Attention (`--action-attention-*`) | red 500 background, white text | red 600 background, white text | Destructive or urgent action |

### Form

Inputs, textareas, selects, prompts, checkboxes, and radios share `--form-default-*`, `--form-success-*`, `--form-warning-*`, and `--form-error-*` text and border roles. Every control needs default, hover, focus-visible, disabled, and validation states.

## 3. Component Tokens And Mappings

Components consume semantic systems or apply component-specific mappings:

`base value → semantic intent → component token → rendered state`

### Typography Components

| Component role | Token mapping | Result |
| --- | --- | --- |
| Body xx-small | `--text-font-size-xxs` → 11px / 1.5 | Dense supporting text |
| Body x-small | `--text-font-size-xs` → 12px / 1.5 | Small supporting text |
| Body small | `--text-font-size-s` → 14px / 1.5 | Compact body |
| Body medium | `--text-font-size-m` → 16px / 1.5 | Default body |
| Body large | `--text-font-size-l` → 18px / 1.667 | Large body |
| H1 | `--heading-font-size-100` → 48px / 1.25 | Major page title |
| H2 | `--heading-font-size-200` → 36px / 1.333 | Page title |
| H3 | `--heading-font-size-300` → 24px / 1.5 | Section title |
| H4 | `--heading-font-size-400` → 21px / 1.143 | Subsection |
| H5 | `--heading-font-size-500` → 18px / 1.333 | Component heading |
| H6 | `--heading-font-size-600` → 16px / 1.5 | Compact heading |

Headings use weight 700. Preserve semantic H1–H6 order even when a different visual size is applied.

### Identity, Metadata, And Feedback

| Component mapping | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `--avatar-background-{hue}` | `--categorical-{hue}` → 200 | `--categorical-{hue}` → 800 | Single-fill identity colour |
| Avatar state | Grey/green/orange/red 200 | Grey/green/orange/red 900 | Neutral/positive/warning/attention fill |
| `--badge-background-neutral` | Grey 200 | Grey 400 | Low-emphasis metadata |
| Badge semantic | Lightened green/orange/red 300 | Bright green/orange/red 400 | Semantic metadata |
| `--badge-background-{hue}` | Tuned categorical 200 tint | Bright categorical 200 with dark text | Categorical metadata remains light |
| `--status-{intent}-*` | 100 background, 500 border, 1000 text | 900 background, 300 border, 100 text; warning uses orange 1000 | Structured semantic state |
| `--status-{hue}-*` | Pale 200-derived background, 200 border, 800-derived text | Dark 800-derived background, 200 border/text | Structured categorical state |
| Alert and Message | Direct Feedback mapping | Direct Feedback mapping | Full contextual feedback |

Avatar is identity, Badge is metadata, and Status is structured state. Do not render them as interchangeable coloured pills.

### Controls And Selection

| Component mapping | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `--input-background` | White; disabled grey 100 | Grey 900; disabled grey 800 | Field surface |
| `--checkbox-*` | White; checked grey 900 with grey 200 icon | Grey 900; checked grey 200 with grey 900 icon | Neutral multiple selection |
| `--radio-*` | White; checked grey 900 | Grey 900; checked grey 200 | Neutral single selection |
| `--switch-*` | Grey 300 track, green 500 checked, white thumb | Grey 600 track, green 500 checked, black thumb | Binary off/on state |
| `--link-text-color-default*` | Grey 900; hover/focus 1000 | Grey 200; hover/focus 100 | Inline action |
| `--tab-*` | Grey 200 inactive, white active, dark active text | Grey 1100 inactive, grey 700 active, white text | Selected navigation |
| `--chip-*` | White, grey 200–300 borders, dark active edge | Grey 800, grey 600–700 borders, pale active edge | Interactive compact object |
| `--addon-background` | Grey 100 | Grey 1000 | Attached control surface |

Shared action heights are 22px, 28px, 36px, 44px, and 56px for xx-small through large. Buttons and links use Action variants; tabs and compact controls reuse the same dimensions and focus language where appropriate.

### Surfaces And Content

| Component mapping | Light | Dark | Meaning |
| --- | --- | --- | --- |
| Card and Accordion | Elevated Surface and Border | Same semantic roles | Structured content group |
| `--dialog-background / --drawer-background` | White | Grey 800 | Highest overlay surface |
| `--dropdown-*` | Grey 100, black-alpha border/shadow, white hover | Grey 1000, black-alpha border/shadow, grey 900 hover | Floating menu |
| `--carousel-background` | White | Grey 700 | Carousel frame |
| `--slat-*` | Translucent white/elevated surfaces | Black-alpha/elevated surfaces | Row and card treatments |
| `--slide-frame-*` | Elevated 100 and semantic border | Same semantic roles | Presentation frame |
| `--code-background` | Elevated 200 | Elevated 200 | Code field |
| `--skeleton-*` | Elevated 200, white 70% highlight | Elevated 200, white 30% highlight | Loading placeholder |
| Icon / Illustration | Black default, white inverted | White default, black inverted | Theme-aware marks |

### Progress, Media, And Rich Interaction

| Component mapping | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `--progress-*` | Blue 600 bar, grey 200 track | Blue 500 bar, grey 700 track | Progress |
| `--stepper-*` | Grey 700 active, white inactive; orange 700 warning | White active, black inactive; orange/red 300 warning/error | Ordered progress |
| `--range-input-*` | Light Media Player roles | Dark Media Player roles | Range interaction |
| `--media-player-*` | Theme Surface and Text | Dark theme Surface and Text | Plain media controls |
| `--media-player-dark-*` | Fixed black/white overlays | Same fixed values | Controls over imagery/video |
| Video Thumbnail | Surface/Border plus fixed dark overlay action | Dark Surface plus fixed overlay action | Media preview |
| Prompt / Preview | Form, blue focus, elevated Surface, supplied accent | Dark equivalents, supplied accent | Rich input; accent is product-provided |

Geometry-only component tokens—Avatar sizes, Badge/Card/Dialog radius, Alert/Message padding, Chip/Tab sizing, Illustration sizes, Table row actions, and carousel offsets—map directly to Base foundations and do not require separate theme values.

## 4. Composition And Usage

### Layout

- Use vertical stacks for reading order and section rhythm.
- Use horizontal stacks for related controls, metadata, and short action groups.
- Use grids for repeated peers such as cards or metrics.
- Align content to shared edges; avoid isolated offsets.
- Start with whitespace before adding borders, surfaces, or shadows.
- Typical section spacing is 24–48px; component padding 12–24px; related-content gaps 8–12px.

### Responsive Behavior

- Collapse columns into a clear reading order.
- Let controls wrap before reducing text or target size.
- Keep primary actions visible and stable.
- Avoid overlap, clipped labels, horizontal page scrolling, and unexpected reordering.

### Accessibility And Interaction

- Use visible labels; placeholders do not replace labels.
- Never rely on colour, iconography, or motion alone.
- Keep focus-visible states prominent.
- Preserve control dimensions during loading.
- Keep overlay text and controls readable over varied imagery.
- Use tabular numerals for changing numeric values.

### Anti-patterns

- Do not introduce off-palette colours when an existing semantic or categorical role fits.
- Do not use categorical colour to imply success, warning, or error.
- Do not flatten hierarchy with one text size or weight.
- Do not overuse cards, borders, shadows, or rounded containers.
- Do not use optional text colour for essential content.
- Do not shrink controls or body text to force desktop layouts into narrow viewports.
- Do not mix unrelated visual treatments or add decoration without purpose.
