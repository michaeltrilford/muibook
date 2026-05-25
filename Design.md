# Design

Muibook is documented here as a dark-mode design system. The generated CSS files remain the source of truth:

- `src/tokens/css/mui-brand.css` defines primitive brand tokens.
- `public/css/mui-tokens.css` maps primitives into semantic, theme, and component tokens.
- `public/css/mui-reset.css` applies the base page defaults.
- `public/css/mui-base.css` applies baseline native element styling.
- `src/muibook/css/app.css` defines the Muibook app brand yellow scale.

## Base Theme

The root document uses the Mui token stack:

- Font family: `--font-family`
- Root font size: `--root-font-size: 62.5%`
- Text color: `--text-color`
- Line height: `--text-line-height`
- Focus outline: `--outline-thick`

The root scale makes `1rem` equal to roughly `10px`, so `1.6rem` maps to `16px`.

## Dark Mode Surface

Dark mode is declared with `html[data-theme="dark"]` and maps the base surface system to dark neutrals:

| Token | Maps to |
| --- | --- |
| `--surface` | `--grey-1000` |
| `--surface-elevated-100` | `--grey-800` |
| `--surface-elevated-200` | `--grey-900` |
| `--surface-elevated-300` | `--grey-1000` |
| `--surface-recessed-alpha` | `--black-opacity-30` |
| `--surface-recessed-100` | `--grey-1000` |
| `--surface-recessed-200` | `--grey-1100` |
| `--surface-recessed-300` | `--grey-1200` |
| `--backdrop-overlay` | `--black-opacity-70` |

Dark component backgrounds follow these same surface aliases where possible.

## Mui Brand Yellow

The Muibook app brand uses a yellow-to-orange scale:

| Token | Value |
| --- | --- |
| `--mui-brand-100` | `#fffde7` |
| `--mui-brand-200` | `#fff59d` |
| `--mui-brand-300` | `#ffeb3b` |
| `--mui-brand-400` | `#ffd600` |
| `--mui-brand-500` | `#ffbb00` |
| `--mui-brand-600` | `#ffa500` |
| `--mui-brand-700` | `#ff9800` |

`--mui-brand-300` is used as the main Muibook yellow accent in the app theme.

## Typography

Base typography uses system fonts:

```css
--font-family: system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

Primitive font sizes:

| Token | Value | Approx px |
| --- | ---: | ---: |
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

Text sizing aliases:

| Token | Maps to |
| --- | --- |
| `--text-font-size-xs` | `--font-size-25` |
| `--text-font-size-s` | `--font-size-50` |
| `--text-font-size-m` | `--font-size-100` |
| `--text-font-size-l` | `--font-size-200` |
| `--text-font-size` | `--text-font-size-m` |

Font weights:

| Token | Value |
| --- | ---: |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semi-bold` | `600` |
| `--font-weight-bold` | `700` |

Heading aliases:

| Token | Size | Line height |
| --- | --- | --- |
| `--heading-font-size-100` | `--font-size-600` | `--line-height-600` |
| `--heading-font-size-200` | `--font-size-500` | `--line-height-500` |
| `--heading-font-size-300` | `--font-size-400` | `--line-height-400` |
| `--heading-font-size-400` | `--font-size-300` | `--line-height-300` |
| `--heading-font-size-500` | `--font-size-200` | `--line-height-200` |
| `--heading-font-size-600` | `--font-size-100` | `--line-height-100` |

## Dark Mode Color

Dark mode maps semantic text and feedback tokens to lighter foreground colors on dark surfaces:

| Token | Dark mode map |
| --- | --- |
| `--text-color` | `--grey-200` |
| `--text-color-success` | `--green-400` |
| `--text-color-warning` | `--orange-400` |
| `--text-color-error` | `--red-400` |
| `--text-color-optional` | `--grey-400` |
| `--outline-color` | `--blue-300` |
| `--border-color` | `--white-opacity-20` |

Dark feedback tokens:

| Purpose | Border | Background | Icon | Text |
| --- | --- | --- | --- | --- |
| Neutral | `--white-opacity-20` | `--grey-800` | `--grey-200` | `--grey-100` |
| Positive | `--green-400` | `--green-800` | `--green-200` | `--green-100` |
| Info | `--blue-400` | `--blue-800` | `--blue-200` | `--blue-100` |
| Warning | `--orange-400` | `--orange-800` | `--orange-200` | `--orange-100` |
| Attention | `--red-400` | `--red-800` | `--red-200` | `--red-100` |

## Spacing

Spacing is tokenized on a small rem scale:

| Token | Value | Approx px |
| --- | ---: | ---: |
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

## Radius

| Token | Value |
| --- | ---: |
| `--radius-000` | `0` |
| `--radius-100` | `4px` |
| `--radius-150` | `6px` |
| `--radius-200` | `8px` |
| `--radius-300` | `16px` |
| `--radius-400` | `24px` |
| `--radius-500` | `36px` |
| `--radius-600` | `48px` |

## Component Examples

Alert sizing is component-token driven and theme-neutral:

| Token | Maps to |
| --- | --- |
| `--alert-radius` | `--radius-100` |
| `--alert-padding-small` | `--space-200` |
| `--alert-padding-medium` | `--space-300` |
| `--alert-padding-large` | `--space-400` |
| `--alert-gap-horizontal-mobile` | `--space-300` |
| `--alert-gap-horizontal-desktop` | `--space-100` |

Action sizing uses shared button/link sizing tokens:

| Size | Padding token | Icon-only size |
| --- | --- | --- |
| X-small | `--action-padding-x-small` | `--action-icon-only-size-x-small` |
| Small | `--action-padding-small` | `--action-icon-only-size-small` |
| Medium | `--action-padding` | `--action-icon-only-size` |
| Large | `--action-padding-large` | `--action-icon-only-size-large` |

## Maintenance Notes

- Keep this document focused on the dark-mode design direction.
- Keep Figma variables aligned with the CSS token names where possible.
- Use local Figma-only variables only when Figma needs a value that cannot map cleanly to a code token.
