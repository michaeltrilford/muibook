Available Components:

LAYOUT:
- VStack: slot, space, padding, alignX, alignY, height, width, fill, viewport, style. Use fill (100% width/height) inside bounded parents (CardBody, Drawer) or height for explicit lengths (e.g. "300px"). For bottom positioning, set fill/height on VStack and apply style="align-self: end;" to the slotted child.
- HStack: slot, space, padding, alignX, alignY, wrap, height, width, fill, viewport, style. Use wrap for compact inline relationships such as actions, chips, metadata, legends, and small toolbar groups that remain meaningful across multiple lines. Do not use wrapping HStack as the default for page regions, card collections, forms, or a deliberate horizontal-to-vertical layout change.
- Grid: slot, col, space, padding, alignX, alignY, height, width, fill, viewport, style
- Container: size (small|medium|large), center, style
- Responsive: variant (container|viewport), observe, breakpoint, breakpoint-low, breakpoint-high; slots show-below/show-middle/show-above
- Rule: length, weight (thin|thick|CSS size), direction (horizontal|vertical)

SURFACES:
- Card: size (none|small|medium|large), usage (grid|h-stack), style. Use CardBody for card content. Size propagates internal padding density to direct CardHeader, CardBody, and CardFooter sections; it does not control width. Use usage=grid on repeated Cards in Grid, or usage=h-stack in an HStack with aligny=stretch, when their headers and footers should align; direct children retain document order, CardBody receives the flexible row, and composed elements such as Rule remain auto-sized. Width is owned by Grid, HStack, Container, the parent layout, or an explicit constrained style.
- CardHeader: size (none|small|medium|large)
- CardBody: size (none|small|medium|large), style. Size controls internal padding, not Card width; medium is the default, small is compact, large is spacious, and none is edge-to-edge. Card-aware Tables, Accordions, and Slats remain edge-to-edge and inherit their content inset from Card size. At size=none, Slats retain their standard internal row inset while SlatGroup disables its negative alignment offset so rows stay within the Card border. This inset is alignment behavior, not a requirement to derive child density from Card size. Choose child size from the content, available width, readability, and touch-target needs. Treat Card Body size-offset stories as diagnostic references rather than canonical compositions. Medium is the safe default for complete Slat groups; avoid none or small Cards for them unless the content has been validated. Tables and Accordions can work across Card sizes when their content remains usable. Do not set size by default for SlatGroup layouts; leave props empty unless the user explicitly requests a spacing size.
- CardFooter: size (none|small|medium|large). A contained ButtonGroup removes top padding while preserving size-aware inline and bottom spacing.
- Dialog: open, width, max-height, hide-header, style. Use max-height to cap the complete surface while keeping the body scrollable. Use hide-header for unified/headerless dialogs such as confirmations, or when custom body content provides the heading and dismissal path.
- Drawer: open, variant (overlay|push|persistent|workspace), side (left|right), width, height, z-index, panel-padding (default|none), hide-header, breakpoint, style. Use panel-padding="none" only when the drawer panel content owns its edge-to-edge spacing; when panel-padding="none" is used for custom action stacks, add padding="var(--space-400)" to the inner action VStack. It does not affect the adjacent page region. For overlay, push, and persistent drawers, use open plus side to control visibility and placement. Push and persistent drawers use a direct plain child wrapper in slot="page" for adjacent page content; left-open, right-open, left-width, right-width, and the left/right slots are workspace-only. Use hide-header when drawer body content or a global app header provides the shell chrome. For a single side panel opened by a menu icon, prefer variant="push"; do not use workspace unless the UI is an advanced editor/canvas shell with independent left and right panels. Drawer can be the root when it owns the full shell. When a global top header spans above it, make HeaderBar and Drawer siblings in a zero-space VStack root and size Drawer height to the remaining shell region. Preserve any explicit Drawer width and apply the same value to HeaderBar left-width so its menu/identity region aligns with the Drawer below; do not recreate HeaderBar layout with a Grid and manual shell styles.
- Drawer workspace: variant=workspace, left-open, right-open, left-width, right-width, resize-rail, resize-min-drawer-width, resize-min-left-width, resize-min-right-width, resize-min-page-width, resize-close-threshold, height; slots left/page/right. Use when an editor/canvas has independent left and right panels around a central page. The page slot is also valid for push and persistent drawers; left/right slots and the paired left/right controls are workspace-only. Keep direct slot wrappers plain in HTML exports when possible.
- HeaderBar: size (x-small|small|medium|large), left-width, right-width, bottom-border, surface (default|transparent), resize-rail, resize-min-column-width, resize-min-main-width, style; slots left/default/right. Use for top application shell and workspace headers. Slot left for a drawer-aligned menu/branding column, slot right for a panel-aligned profile/action column, and the default slot for main page search/title/actions. When resize-rail is present, populated side columns receive keyboard-accessible rail tracks that update left-width or right-width and emit mui-header-bar-resize-start, mui-header-bar-resize, and mui-header-bar-resize-end. Synchronize adjacent Drawer width from these events and mirror Drawer width changes back to HeaderBar. Use Responsive around complete HeaderBar alternatives for viewport shell changes, and a nested Responsive variant=container in the main slot when search/actions should react to the main column's available width. HeaderBar applies usage=header-bar to descendant Buttons and Dropdowns. Unsized Dropdowns inherit HeaderBar size; standard profile Buttons fill the bar height with square edges; circular and Avatar-only Buttons keep their action footprint; and Avatar/AvatarChip content follows Button size with its avatar footprint mapped to the matching action token. Explicit child sizes remain valid overrides. Column padding is composable via slotted containers/stacks using their padding props. HeaderBar height does not otherwise prescribe child density; use the Header Bar Composition Density Guide for compact, standard, spacious, notification, search, Dropdown, and AvatarChip starting points.
- Slat: variant (row|header|action), size (x-small|small|medium|large), col, space; child slots accessory/start/end. Medium is the default size. Action Slats pass size to their internal Button so the interactive row follows the matching action height. Always explicitly assign variant="row" for standard row slats unless creating a header (variant="header"), interactive row (variant="action"), or custom layout. When Slat is in SlatGroup or CardBody, variant ("row"|"header"|"action") is required to trigger automatic layout and alignment styles. Use col="1fr auto" by default; do not invent custom columns from an image prompt unless the source clearly requires non-default column tracks. For multi-item progress rows with even alignment across rows, set col="minmax(0, 1fr) 7.5rem" (fixed end column for Status), put leading icon in slot="accessory", and in slot="start" use an HStack with a min-width label (e.g. style="min-width: 6rem;"), full-width Progress (style="width: 100%;"), and percentage label. Do not use header-start, header-end, row-start, row-end, action, or unslotted wrapper children. Put primary row content in a direct child with props.slot="start", trailing value/status/action content in a direct child with props.slot="end", and optional leading avatar/icon content in a direct child with props.slot="accessory".
- SlatGroup: usage. When SlatGroup is inside CardBody, leave CardBody size unset by default; CardBody detects SlatGroup and applies the correct card spacing automatically.
- SmartCard: state, number, variant, partner, type, logo, logo-height, bg-color, bg-image, inverted

CONTENT:
- Heading: text, size (1|2|3|4|5|6), level (1|2|3|4|5|6|none), truncate, clamp. Use level=none only for prominent values or display text that does not introduce a section; use levels 1-6 for structural headings.
- Body: text, size (xx-small|x-small|small|medium|large), weight (regular|bold), variant (default|secondary|info|positive|warning|attention), truncate, clamp, style; use _Icon icon=mui-icon-info slot=before for lightweight inline guidance. Direct mui-link children automatically match the Body size.
- Span: text, style; supports inline children such as Link
- Code: size, scrollable
- Quote: default text
- Image: src, alt; slot caption
- Avatar: label, image, icon, size (x-small|small|medium|large), background, backgroundColor
- AvatarChip: primary, secondary, image, label, href, target, size (x-small|small|medium|large), usage (default|media-player); slots primary/secondary. Use for compact identity metadata with an avatar and one or two text/link lines. MediaPlayer applies usage=media-player automatically when slotted into media metadata. For Button and Dropdown composition, follow the Avatar Chip Profile Actions fragment.
- List: slot default
- ListItem: text, variant, size (x-small|small|medium|large), weight (regular|bold)
- _Icon: icon, size (xx-small|x-small|small|medium|large), color, slot. Before assigning an icon, inspect the available Muibook icon names and use an exact existing mui-icon-* value. If none semantically matches the requested concept, use icon=mui-icon-rectangle as the neutral Redactd fallback. Never invent an icon component or icon name.
- _Illustration: illustration, size (x-small|small|medium|large|x-large), color, slot
- Badge: required non-empty text, variant (neutral|positive|warning|attention|overlay), size (xx-small|x-small|small|medium|large), color (grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo|CSS background value). Always provide `props.text` as a non-empty string after trimming; if no meaningful visible label is available, omit the Badge node entirely. Secondary, default, and error are not Badge variants. Omit variant for the default neutral treatment. Use for compact non-interactive presentational metadata, counts, and lightweight state-like labels such as Offline, Online, Busy, Do not disturb, Beta, Default, IMG, or Shared when the surrounding UI already explains the object. Good inside cards, messages, chips, buttons, tabs, navigation, and hero or marketing surfaces. Use color to override the badge background only through theme-aware badge background tokens; do not use positive, warning, or attention just to get a different background colour.
- Status: text, variant (info|positive|warning|attention), color (grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo), size (x-small|small|medium); slots before/after. Use for compact object or workflow state labels such as Active, Draft, Pending, Review, Blocked, or Synced when the value is the primary state of a record, workflow, or system, especially in tables, slats, dashboards, and data-heavy pages. Use x-small next to badges or in very dense context rows. Status is non-interactive by default, but can be interactive when composed as a trigger or compact state action. Omit variant for default low-emphasis grey status; use variant for semantic feedback and color for non-semantic categorical labels. Use action only when the status is a trigger. Do not use for counts, helper text, paragraph guidance, page-level notices, or decorative metadata.
- Skeleton: loading, shape (line|rect|circle), size, animation (shimmer|pulse|none), lines, width, height, radius, gap, duration, line-widths, max-width, style
- Table: size (xx-small|x-small|small|medium|large), slot default. Use for dense desktop data layouts. Setting size on Table propagates the density to its owned heading and body Rows; medium is the default.
- RowGroup: heading; children Row.
- Row: columns, space, aligny (start|center|end|stretch), size (xx-small|x-small|small|medium|large); children Cell.
- Cell: action, alignx (start|center|end|space-between), aligny; children content or action controls.

ACCORDION:
- AccordionBlock: heading, level (1|2|3|4|5|6), size (xx-small|x-small|small|medium|large), detail-space. Level controls semantic document structure independently from size. Size controls heading typography, summary and detail spacing, and disclosure icon scale; medium is the default.
- AccordionInline: heading, level (1|2|3|4|5|6)
- AccordionGroup: slot default

FORMS AND INPUTS:
- FormSection: heading, hide-label, style
- FormSectionFooter: slot, style
- FormGroup: heading, variant (vertical|horizontal), hide-label, style
- Field: label, description, variant (default|success|warning|error), message, hide-label, size (x-small|small|medium|large), optional, style. Field forwards description to its primary slotted control; keep rich slot=description content inside that control.
- FormMessage: text, size (x-small|small|medium|large), weight (regular|bold), variant (secondary|info|positive|warning|attention), style
- Input: label, description, type (text|email|password|number|tel|url), placeholder, value, id, name, disabled, hide-label, variant (default|error), size (x-small|small|medium|large), align (start|center|end), input-mode (decimal|numeric|text|email|url|search|tel|none), optional, max-length; slots description/before/after/inside-start/inside-end. Use align="end" and input-mode="decimal" for quantitative values (amounts, rates, balances, quantities) with currency/unit symbols in slot="inside-start" and slot="inside-end". Use description for persistent neutral guidance above the control. Use slot=description with mui-body when the copy needs rich inline content such as mui-link; Input owns the generated aria-describedby association. Use Field message for validation or status below the control.
- Textarea: label, description, placeholder, value, name, id, variant (default|success|warning|error), size (x-small|small|medium|large), rows, optional, hide-label, max-length, disabled, style; slot description supports rich Body content
- Select: label, description, placeholder, options, value, id, name, disabled, variant (default|error), size (x-small|small|medium|large), appearance (native|custom), selected-content (rich|label), col, space, max-height, padding-block, padding-inline; slot description supports rich Body content. Use options for simple data selects; use Option children only when appearance=custom needs rich composed native option content.
- Option: value, label; children can contain layout/content for Select appearance=custom. Keep Option inside Select only.
- Checkbox: text, checked, id, disabled, indeterminate, size (x-small|small|medium|large)
- Radio: text, checked, disabled, id, name, value, aria-label, size (x-small|small|medium|large)
- RadioGroup: name, value, label, description, size (x-small|small|medium|large), optional, hide-label, disabled; slot description supports rich Body content
- Switch: label, checked, disabled, size (x-small|small|medium|large)
- RangeInput: min, max, value, step, bubble, bubble-format (time), disabled
- ColorInput: label, description, value, id, name, disabled, hide-label, hide-value, size (x-small|small|medium|large), gap, no-copy, copyable; slots description/before/after. Use for direct visual colour selection with a six-digit hexadecimal value. Slotted elements (such as mui-avatar, mui-badge, or custom swatches) automatically align to control height and inherit size.
- ChipInput: label, placeholder, size (x-small|small|medium|large), placement (before|after), breakpoint, allow-custom, mobile-stack, hide-label, disabled, options, value, id
- FileUpload: acceptedFileTypes, currentFileName
- Addon: text, size (x-small|small|medium|large), slot (before|after), style

ACTIONS:
- Button: text, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), usage (input|header-bar), stroke (border|ring), stroke-ring-size (100|200|300|400|500), disabled, aria-label; slots default/before/after/badge
- ButtonGroup: slot default, right, style
- Link: text, href, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (100|200|300|400|500), target, download, weight (regular|bold), disabled; slots default/before/after
- Dropdown: size (x-small|small|medium|large), usage (header-bar), zindex, position, vertical-position, persistent; slot action plus one direct Menu child. Dropdown enforces its size on the trigger and Menu. With usage=header-bar, an unsized Dropdown inherits HeaderBar size and passes the context to its trigger. Do not place menu actions directly inside Dropdown. Follow the Avatar Chip Profile Actions fragment for profile triggers.
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
- MediaPlayer: src, type (video|audio|youtube|soundcloud), controls (player|none), poster, artwork, media-title, height, no-radius, waveform, center-play, loading, autoplay, muted, loop; slots meta-before/meta-after. Use no-radius only for flush or edge-to-edge compositions where the containing surface owns the corner treatment. Use meta-before for AvatarChip/title metadata and meta-after for overlay actions such as Subscribe or Buy now. Use variant=overlay on Button/Link actions when over video or artwork.
- VideoThumbnail: src, src-light, src-dark, src-mui-light, src-mui-dark, src-jal-light, src-jal-dark, src-ana-light, src-ana-dark, src-sensei-light, src-sensei-dark, src-paperclip-light, src-paperclip-dark, alt, play, overlay. Use inside video cards when the thumbnail needs to react to brand and light/dark theme.
- ModelViewer: src, ios-src, poster, alt, controls, camera-controls, auto-rotate, ar, loading; slots default/poster. Always include alt and fallback content when a model is important to understanding the page.

PROMPT COMPONENTS:
- Prompt: placeholder, value, rows, enter-submit, fan-open, disabled, loading, loading-label, context-mode (icon|chip), preview-dialog-width, preview-dialog-title, preview-overflow-to-preview, preview-threshold-chars, preview-auto-clickable, preview-loading, preview-loading-label, preview-scrollbar, error-message, debug, effects-off, color-top-start, color-top-mid, color-top-end, color-top-accent, color-layout, style
- ChatMessage: size (x-small|small|medium|large), variant (default|ghost), density (default|compact), style
- PreviewChip: value, badge, label, bg-image, image-tint, accent, inverted, show-text, badge-only, animated, loading, loading-label, clickable, animation-mode, style
- ActionToggle: mode (icon|chip), style

PRESENTATION:
- SlideFrame: title, footer-text, ratio (16:9|4:3|1:1|3:2|9:16), present, active-section, padding, variant (default|plain), radius, notes-open, hide-header, hide-footer, hide-counter, allow-add-section, fullscreen, scroll, style

CHARTS:
- ComparisonChart: mode (absolute|indexed|percent), label, scale (both|time|price|none), height, currency, value-format (currency|percent|decimal), interactive, attribution (logo|none), series; slots header/legend/footer. When embedding in a Card, always use Card size="none" usage="grid" > CardBody size="none" > ComparisonChart. Never use CardHeader or table headers above/inside charts; ComparisonChart provides its own native padded slot="header" region and plot divider strokes. Compose the chart header with an HStack (alignX="space-between", alignY="center", space="var(--space-300)") containing a section Heading on the start/left and action controls (such as a small secondary Button with trailing mui-icon-down-chevron) on the end/right.
- FinancialBarChart: label, value-format (currency|percent|decimal), height, scale (both|time|price|none), interactive, data; slots header/footer. When embedding in a Card, use Card size="none" usage="grid" > CardBody size="none" > FinancialBarChart with slot="header".
- FinancialChart: label, height, data; slot header. For candlestick/OHLC market data.
- MarketSparkline: label, height, scale (none|both|time|price), interactive, data; slot header. Compact sparkline trend.
