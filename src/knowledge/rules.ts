export const rules = String.raw`
Generate MUIBOOK component trees as JSON.

Output JSON tree nodes with:
- type: component type
- id: unique descriptive id
- props: component props
- children: child nodes, or []

CRITICAL RULES:
1. Always return ONLY valid JSON - no markdown, no code blocks, no explanations
2. Every node MUST have: type, id, props, and children
3. IDs must be unique across the entire tree
4. Use descriptive IDs that reflect the component's purpose
5. Card content must be inside direct child CardBody.
6. Container components can have children.
7. Leaf components use children: [].
8. Props must match the component API.
9. Root additions use Container with center=true and size=medium.
10. Button and Link text stays on the component; do not wrap in Body.
11. Put visual backgrounds on layout style or SmartCard bg props.
12. SmartCard props use kebab-case: bg-image, bg-color, logo-height.
13. Normalize scanned Muibook/Figma names to Redactd component types before output.
14. Do not use Message as a styled paragraph, inline note, or form helper. Message is only for persistent page-level notices with a heading and slotted body content.
15. In Redactd JSON trees, slot placement belongs inside props, matching Muibook/MuiScan output. Example: { type: "VStack", props: { "slot": "start", ... }, children: [...] }. Do not put slot as a top-level node field.
16. Do not add CardBody.props.size just because CardBody contains SlatGroup. SlatGroup inside CardBody already triggers card-aware spacing; only use size=none when the user explicitly asks for an edge-to-edge card layout.
17. For equal Grid columns, use col="repeat(N, minmax(0, 1fr))". Do not use a numeric column count or repeat bare tracks such as "1fr 1fr 1fr"; minmax(0, 1fr) prevents content from forcing tracks wider than the Grid.
18. Layout spacing props such as space and padding must use complete CSS token references such as "var(--space-400)". Do not output "space-400", "400", or other bare scale values. Use "var(--space-000)" for zero spacing.
19. Prefer Responsive variant=container for reusable components and compositions so they react to available parent space. Use viewport responsiveness only for page-level or app-shell decisions that genuinely depend on the browser viewport.
20. Card does not have a size scale. Card width comes from its Grid, Container, parent layout, or an explicit style when a constrained reading or form width is required. CardBody size controls internal padding only: medium is the default, small is compact, large is spacious, and none is edge-to-edge. Repeated Cards should normally receive width from Grid rather than individual Card styles.
21. For repeated Card clusters in a Grid, size CardBody padding to column density: 1-up leaves CardBody size unset (default medium); 2-up leaves size unset (medium) on larger widths, adjusting down via Responsive at smaller breakpoints if needed; 3-up uses size="small"; 4-up uses size="small", or size="none" with custom padding via a space token (e.g. var(--space-300)) when edge-to-edge control is required.
22. In Drawer navigation, compose nav items as Button or Link with align="start", variant="tertiary" as the default (non-prominent) emphasis, and a slot="before" _Icon matching the item's meaning. Use mui-icon-rectangle as a generic placeholder icon only when no semantically matching icon exists.
23. When composing Muibook charts in Redactd, populate the structured Data field through props.data, or the Series field through props.series for ComparisonChart. Redactd owns passing that value to the Muibook component. FinancialChart uses { time, open, high, low, close, volume? }. MarketSparkline and FinancialBarChart use { time, value }. ComparisonChart uses { id, label, color?, data: [{ time, value }] }. Keep dates and numeric values as JSON values, sort points chronologically, and provide a coherent illustrative dataset when the user requests a populated chart without supplying data.
24. Use slots for content projection, not as the only control for significant chrome or layout decisions in generated/editor output. When a component exposes an explicit public attr such as hide-header, use that attr instead of relying only on omitted or present slotted content. Runtime attrs such as has-header and has-footer are dynamic metadata, not authored source props.
25. Leave Slat col unset by default. Do not invent a custom Slat column string from an image prompt unless the source clearly requires non-default column tracks; the default Slat columns are preferred for accessory/start/end compositions.
26. For a single side drawer opened from a menu or hamburger icon, prefer Drawer variant="push" with open and side. Persistent drawers are for content that stays adjacent/visible and usually do not need a menu trigger. Use workspace only for advanced editor or canvas shells with independent left/right panels around a central page. Do not use left-open, right-open, left-width, right-width, page, left, or right for overlay, push, or persistent drawers; those controls and slots are workspace-only.
27. CSS length props and style values must include valid units or CSS functions. For height, width, max-height, min-height, padding, margin, gap, and similar CSS lengths, output values such as "320px", "20rem", "100%", "100vh", "auto", or "var(--space-500)"; never output bare numeric strings such as "320" or "20" unless the component API explicitly documents a number scale for that prop.
28. Prefer Slat over an ad hoc HStack for row-like wireframe items with primary content on the left and secondary metadata, value, status, timestamp, badge, count, or action on the right. Use SlatGroup for repeated rows such as activity feeds, settings rows, account details, notifications, transaction lists, project updates, search results, or compact records. Put the primary content in slot="start" and the trailing metadata/action in slot="end".

MUI SCAN NORMALIZATION RULES:
- Normalize muiscan to Redactd types before output
- Final JSON cannot contain mui-*, raw span, TEXT, or text node types
- Core mappings:
  - mui-v-stack -> VStack
  - mui-h-stack -> HStack
  - mui-button -> Button
  - mui-link -> Link
  - mui-input -> Input
  - mui-select -> Select
  - mui-avatar-chip -> AvatarChip
  - mui-media-player -> MediaPlayer
  - mui-video-thumbnail -> VideoThumbnail
  - mui-model-viewer -> ModelViewer
  - mui-table -> Table
  - mui-row-group -> RowGroup
  - mui-row -> Row
  - mui-cell -> Cell
  - span -> Span
  - mui-icon-[name] -> _Icon with props.icon = "mui-icon-[name]"
  - mui-illustration-[name] -> _Illustration with props.illustration = "mui-illustration-[name]"
- Preserve hierarchy, spacing, slots, key props, and valid style strings
- Preserve icon slots:
  - slot=before -> props.slot = "before"
  - slot=after -> props.slot = "after"
  - if an icon is the only child of Button, Link, or Chip, keep it as the default child

TEXT NODE RULES FOR MUISCAN:
- TEXT is input-only; collapse into the nearest valid Redactd text model
- Collapse TEXT -> props.text for:
  - mui-body -> Body.props.text
  - mui-heading -> Heading.props.text
  - mui-button -> Button.props.text
  - mui-link -> Link.props.text
  - mui-tab-item -> TabItem.props.text
  - mui-list-item -> ListItem.props.text
- For span:
  - convert to Span
  - consume direct TEXT into Span.props.text
  - keep inline children such as Link nested inside the same Span
- Exceptions:
  - mui-badge: consume TEXT as the badge's direct rendered text; preserve before/after slot children; do not invent Body
  - mui-status: consume TEXT as the status's direct rendered text; preserve before/after icon slot children; do not invent Body, Badge, or Message inside Status
  - mui-chip: consume TEXT as the chip's direct rendered text; preserve before/after slot children; do not invent Body
  - mui-alert: preserve variant/label, convert default content to Span, consume TEXT into Span.props.text, keep inline children such as Link, do not invent Body
  - mui-message: map scanned heading directly to Message.props.heading, preserve variant/icon/size, keep remaining children as default message content; if there is no supporting body content, prefer Body or FormMessage instead of Message
- Do not invent wrappers when the target already supports text

Available Components:

LAYOUT:
- VStack: slot, space, padding, alignX, alignY, height, width, fill, viewport, style
- HStack: slot, space, padding, alignX, alignY, height, width, fill, viewport, style
- Grid: slot, col, space, padding, alignX, alignY, height, width, fill, viewport, style
- Container: size (small|medium|large), center, style
- Responsive: variant (container|viewport), observe, breakpoint, breakpoint-low, breakpoint-high; slots show-below/show-middle/show-above
- Rule: length, weight (thin|thick|CSS size), direction (horizontal|vertical)

SURFACES:
- Card: use CardBody for card content. Card has no size prop; width is owned by Grid, Container, the parent layout, or an explicit constrained style.
- CardHeader: none
- CardBody: size (none|small|medium|large), style. Size controls internal padding, not Card width; medium is the default, small is compact, large is spacious, and none is edge-to-edge. Do not set size by default for SlatGroup layouts; leave props empty unless the user explicitly requests a spacing size.
- CardFooter: none
- Dialog: open, width, content-max-height, hide-header, style. Use hide-header for unified/headerless dialogs such as confirmations, or when custom body content provides the heading and dismissal path.
- Drawer: open, variant (overlay|push|persistent|workspace), side (left|right), width, z-index, drawer-space, hide-header, breakpoint, style. For overlay, push, and persistent drawers, use open plus side to control visibility and placement; do not use left-open, right-open, left-width, right-width, page, left, or right. Use hide-header when drawer body content provides a custom header composition or custom dismissal controls. For a single side panel opened by a menu icon, prefer variant="push"; do not use workspace unless the UI is an advanced editor/canvas shell with independent side panels.
- Drawer workspace: variant=workspace, left-open, right-open, left-width, right-width, resize-rail, resize-min-drawer-width, resize-min-left-width, resize-min-right-width, resize-min-page-width, resize-close-threshold, height; slots left/page/right. Use when an editor/canvas has independent left and right panels around a central page. left-open/right-open and left/right/page slots are workspace-only. Keep direct slot wrappers plain in HTML exports when possible.
- Slat: variant, col, space; child slots accessory/start/end. Leave col unset by default; do not invent custom columns from an image prompt unless the source clearly requires non-default column tracks. Do not use header-start, header-end, row-start, row-end, action, or unslotted wrapper children. Put primary row content in a direct child with props.slot="start", trailing value/status/action content in a direct child with props.slot="end", and optional leading avatar/icon content in a direct child with props.slot="accessory".
- SlatGroup: usage. When SlatGroup is inside CardBody, leave CardBody size unset by default; CardBody detects SlatGroup and applies the correct card spacing automatically.
- SmartCard: state, number, variant, partner, type, logo, logo-height, bg-color, bg-image, inverted

CHART DATA PROPERTIES:
- FinancialChart data: [{ time: string|number, open: number, high: number, low: number, close: number, volume?: number }]
- MarketSparkline data: [{ time: string|number, value: number }]
- FinancialBarChart data: [{ time: string|number, value: number }]
- ComparisonChart series: [{ id: string, label: string, color?: string, data: [{ time: string|number, value: number }] }]
- In Redactd trees, put these arrays directly in props.data or props.series. This populates the Data or Series control in the Redactd UI; Redactd handles passing the value to the underlying Muibook component. Do not JSON-stringify the array or generate JavaScript assignment code.
- Use ISO YYYY-MM-DD dates for daily illustrative data unless the user provides another valid time format. Keep values numeric, order data chronologically, and include enough points to make the requested trend visible.

FINANCIAL CHART TREE EXAMPLE:
{
  "id": "btc_price_chart",
  "type": "FinancialChart",
  "props": {
    "symbol": "BTC/USD",
    "currency": "USD",
    "type": "candlestick",
    "data": [
      { "time": "2026-06-01", "open": 102.4, "high": 104.8, "low": 101.7, "close": 103.9, "volume": 18400000 },
      { "time": "2026-06-02", "open": 103.9, "high": 105.2, "low": 102.8, "close": 104.5, "volume": 16900000 },
      { "time": "2026-06-03", "open": 104.5, "high": 106.1, "low": 103.6, "close": 105.8, "volume": 21300000 }
    ]
  },
  "children": []
}

CONTENT:
- Heading: text, size (1|2|3|4|5|6), level (1|2|3|4|5|6|none), truncate, clamp. Use level=none only for prominent values or display text that does not introduce a section; use levels 1-6 for structural headings.
- Body: text, size (xx-small|x-small|small|medium|large), weight (regular|bold), variant (default|secondary|info|positive|warning|attention), truncate, clamp, style; use _Icon icon=mui-icon-info slot=before for lightweight inline guidance
- Span: text, style; supports inline children such as Link
- Code: size, scrollable
- Quote: default text
- Image: src, alt; slot caption
- Avatar: label, image, icon, size (x-small|small|medium|large), background, backgroundColor
- AvatarChip: primary, secondary, image, label, href, target, size (x-small|small|medium|large), usage (default|media-player); slots primary/secondary. Use for compact identity metadata with an avatar and one or two text/link lines. MediaPlayer applies usage=media-player automatically when slotted into media metadata.
- List: slot default
- ListItem: text, variant, size (x-small|small|medium|large), weight (regular|bold)
- _Icon: icon, size (xx-small|x-small|small|medium|large), color, slot
- _Illustration: illustration, size (x-small|small|medium|large|x-large), color, slot
- Badge: text, variant (default|neutral|positive|warning|error|overlay), color (grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo|CSS background value). Use for compact non-interactive presentational metadata, counts, and lightweight state-like labels such as Offline, Online, Busy, Do not disturb, Beta, Default, IMG, or Shared when the surrounding UI already explains the object. Good inside cards, messages, chips, buttons, tabs, navigation, and hero or marketing surfaces. Use color to override the badge background only through theme-aware badge background tokens; do not use positive, warning, or attention just to get a different background colour.
- Status: text, variant (info|positive|warning|attention), color (grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo), size (x-small|small|medium); slots before/after. Use for compact object or workflow state labels such as Active, Draft, Pending, Review, Blocked, or Synced when the value is the primary state of a record, workflow, or system, especially in tables, slats, dashboards, and data-heavy pages. Use x-small next to badges or in very dense context rows. Status is non-interactive by default, but can be interactive when composed as a trigger or compact state action. Omit variant for default low-emphasis grey status; use variant for semantic feedback and color for non-semantic categorical labels. Use action only when the status is a trigger. Do not use for counts, helper text, paragraph guidance, page-level notices, or decorative metadata.
- Skeleton: loading, shape (line|rect|circle), size, animation (shimmer|pulse|none), lines, width, height, radius, gap, duration, line-widths, max-width, style
- Table: slot default. Use for dense desktop data layouts.
- RowGroup: heading; children Row.
- Row: columns, size (x-small|small|medium); children Cell.
- Cell: action, align-y; children content or action controls.

ACCORDION:
- AccordionBlock: heading, level (1|2|3|4|5|6), size, detail-space
- AccordionInline: heading, level (1|2|3|4|5|6)
- AccordionGroup: slot default

FORMS AND INPUTS:
- FormSection: heading, hide-label, style
- FormSectionFooter: slot, style
- FormGroup: heading, variant (vertical|horizontal), hide-label, style
- Field: label, variant (default|success|warning|error), message, hide-label, size (x-small|small|medium|large), optional, style
- FormMessage: text, size (x-small|small|medium|large), weight (regular|bold), variant (secondary|info|positive|warning|attention), style
- Input: label, type (text|email|password|number|tel|url), placeholder, value, id, name, disabled, hide-label, variant (default|error), size (x-small|small|medium|large), optional, max-length; slots before/after
- Textarea: label, placeholder, value, name, id, variant (default|success|warning|error), size (x-small|small|medium|large), rows, optional, hide-label, max-length, disabled, style
- Select: label, placeholder, options, value, id, name, disabled, variant (default|error), size (x-small|small|medium|large), appearance (native|custom), selected-content (rich|label), col, space, max-height, padding-block, padding-inline. Use options for simple data selects; use Option children only when appearance=custom needs rich composed native option content.
- Option: value, label; children can contain layout/content for Select appearance=custom. Keep Option inside Select only.
- Checkbox: text, checked, id, disabled, indeterminate, size (x-small|small|medium|large)
- Radio: text, checked, disabled, id, name, value, aria-label, size (x-small|small|medium|large)
- RadioGroup: name, value, label, size (x-small|small|medium|large), optional, hide-label, disabled
- Switch: label, checked, disabled, size (x-small|small|medium|large)
- RangeInput: min, max, value, step, bubble, bubble-format (time), disabled
- ChipInput: label, placeholder, size (x-small|small|medium|large), placement (before|after), breakpoint, allow-custom, mobile-stack, hide-label, disabled, options, value, id
- FileUpload: acceptedFileTypes, currentFileName
- Addon: text, size (x-small|small|medium|large), slot (before|after), style

ACTIONS:
- Button: text, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (100|200|300|400|500), disabled, aria-label; slots default/before/after
- ButtonGroup: slot default, right, style
- Link: text, href, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (100|200|300|400|500), target, download, weight (regular|bold), disabled; slots default/before/after
- Dropdown: size (x-small|small|medium|large), zindex, position, vertical-position, persistent; slot action plus one direct Menu child. Dropdown enforces its size on the trigger and Menu. Do not place menu actions directly inside Dropdown.
- Menu: size (x-small|small|medium|large); direct Body, Button, Link, Input, Select, DatePicker, TimePicker, Textarea, SearchInput, RangeInput, and ChipInput children inherit Menu size. Menu applies size-based inset padding only to direct form-control hosts, without changing the Menu container inset. Direct Body receives action padding; Button and Link receive joined corner treatment.
- Chip: text, active, dismiss, usage; slots default/before/after. Chip labels truncate when constrained; keep text short and let icons/dismiss controls remain visible.
- ChipRail: size, aria-label; children Chip. Use for horizontally scrollable filters and category rails.

NAVIGATION:
- TabBar: speed, controlsPosition, stroke (border|none), active-inset, radius; slots default/controls
- TabItem: text, icon, active, id
- TabController: slot default
- TabPanel: item
- Stepper: direction (horizontal|vertical), activeStep
- Step: title
- CarouselController: slot default, style
- CarouselPanel: item, style

FEEDBACK:
- Message: heading, variant (neutral|positive|info|warning|attention), icon, size (small|medium|large); slot default. Use only for persistent page-level or section-level notices. Always provide a concise heading plus default slot body content, usually Body/List/Link. Do not use for inline guidance, styled text blocks, or form helper text.
- Alert: variant (success|info|warning|error), label; slots default/action
- Loader: loading, animation (pulsate|fade-in|translate), direction (up|right|down|left), duration; slot default
- Spinner: size (xx-small|x-small|small|medium|large|x-large|xx-large), color, duration, label, style
- Progress: progress, state

MEDIA:
- MediaPlayer: src, type (video|audio|youtube|soundcloud), controls (player|none), poster, artwork, media-title, height, waveform, center-play, loading, autoplay, muted, loop; slots meta-before/meta-after. Use meta-before for AvatarChip/title metadata and meta-after for overlay actions such as Subscribe or Buy now. Use variant=overlay on Button/Link actions when over video or artwork.
- VideoThumbnail: src, src-light, src-dark, src-mui-light, src-mui-dark, src-jal-light, src-jal-dark, src-ana-light, src-ana-dark, src-sensei-light, src-sensei-dark, src-paperclip-light, src-paperclip-dark, alt, play, overlay. Use inside video cards when the thumbnail needs to react to brand and light/dark theme.
- ModelViewer: src, ios-src, poster, alt, controls, camera-controls, auto-rotate, ar, loading; slots default/poster. Always include alt and fallback content when a model is important to understanding the page.

PROMPT COMPONENTS:
- Prompt: placeholder, value, rows, enter-submit, fan-open, disabled, loading, loading-label, context-mode (icon|chip), preview-dialog-width, preview-dialog-title, preview-overflow-to-preview, preview-threshold-chars, preview-auto-clickable, preview-loading, preview-loading-label, preview-scrollbar, error-message, debug, effects-off, color-top-start, color-top-mid, color-top-end, color-top-accent, color-layout, style
- ChatMessage: size (x-small|small|medium|large), variant (default|ghost), density (default|compact), style
- PreviewChip: value, badge, label, bg-image, image-tint, accent, inverted, show-text, badge-only, animated, loading, loading-label, clickable, animation-mode, style
- ActionToggle: mode (icon|chip), style

PRESENTATION:
- SlideFrame: title, footer-text, ratio (16:9|4:3|1:1|3:2|9:16), present, active-section, padding, variant (default|plain), radius, notes-open, hide-header, hide-footer, hide-counter, allow-add-section, fullscreen, scroll, style

SPACING VALUES:
000, 025, 050, 100, 200, 300, 400, 500, 600, 700, 800
Use 100-300 for tight/form spacing and 400-800 for layout.

ASSETS:
Use real Muibook asset paths:
- Base path: 'https://muibook.com/images/'
- Logos: 'logo.png', 'guides.svg', 'mui.svg'
- Backgrounds: 'placeholder.png', 'snowy-mint.png', 'buttercup.png', 'sapphire.png', 'crystal.png', 'premier.png', 'diamond.png'
- Partners: 'mastercard.svg', 'visa-black.svg', 'visa-white.svg', 'amex.svg', 'emerald.svg', 'ruby.svg', 'sapphire.svg'

FORMATTING:
- SmartCard number: last four digits only (e.g. 1234).

`;
