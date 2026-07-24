import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The JSON AST specific rules
const jsonRules = `Output JSON tree nodes with:
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
25. Use col="1fr auto" as the default col for Slat. Do not invent a custom Slat column string from an image prompt unless the source clearly requires non-default column tracks; the default Slat columns are preferred for accessory/start/end compositions.
26. For a single side drawer opened from a menu or hamburger icon, prefer Drawer variant="push" with open and side. The side property (left or right) should match the position of the menu icon trigger. Persistent drawers are for content that stays adjacent/visible and usually do not need a menu trigger. Use workspace only for advanced editor or canvas shells with independent left/right panels around a central page. Do not use left-open, right-open, left-width, right-width, page, left, or right for overlay, push, or persistent drawers; those controls and slots are workspace-only.
27. CSS length props and style values must include valid units or CSS functions. For height, width, max-height, min-height, padding, margin, gap, and similar CSS lengths, output values such as "320px", "20rem", "100%", "100vh", "auto", or "var(--space-500)"; never output bare numeric strings such as "320" or "20" unless the component API explicitly documents a number scale for that prop.
28. Prefer Slat over an ad hoc HStack for row-like wireframe items with primary content on the left and secondary metadata, value, status, timestamp, badge, count, or action on the right. Use SlatGroup for repeated rows such as activity feeds, settings rows, account details, notifications, transaction lists, project updates, search results, or compact records. Put primary content in slot="start" and trailing metadata/action in slot="end". Always explicitly set variant="row" on standard Slat items unless creating a section header (variant="header"), interactive row (variant="action"), or custom layout; Slat items inside SlatGroup or CardBody rely on explicit variant ("row", "header", or "action") for correct automatic alignment and card/group styles.
29. For top-and-bottom positioning inside VStack (such as pushing a footer or action button to the bottom), set fill or height on VStack and apply style="align-self: end;" to the slotted child. Use fill when VStack sits inside a bounded parent (e.g. CardBody, Drawer, or Dialog); use height when specifying an explicit length (e.g. height="300px").
30. Explicitly define layout boundaries to prevent unpredictable canvas rendering. For VStack and HStack, always output width="auto" and height="auto" unless a specific dimension or fill is required.
31. For Grid, never leave col empty. It defaults to two columns (1fr 1fr), so omitting it can lead to unexpected layouts.
32. For Dialog and Drawer, omit width and height properties to inherit their design system defaults (350px and 320px respectively) unless explicitly overriding them for a specific use case.
33. When composing a user profile or avatar pattern, use AvatarChip (with image, label, and primary/secondary slotted Body) rather than constructing a custom avatar layout. If the profile pattern requires a menu or dropdown, wrap the AvatarChip inside a Button (with variant="secondary" and slot="action") inside a Dropdown, and use Menu with Buttons for the dropdown actions.`;

const muiscanRules = `MUI SCAN NORMALIZATION RULES:
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
- For Badge: preserve variant="neutral"; do NOT convert "neutral" to "secondary"

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
- Do not invent wrappers when the target already supports text`;

// Read the curated components
const jsonComponents = fs.readFileSync(path.join(__dirname, '../src/knowledge/fragments/json-components.md'), 'utf8');

// Read the shared chart data
const chartData = fs.readFileSync(path.join(__dirname, '../src/knowledge/fragments/chart-data.md'), 'utf8');

// Read the shared design assets
const designAssets = fs.readFileSync(path.join(__dirname, '../src/knowledge/fragments/design-assets.md'), 'utf8');

// Helper to escape strings for injection into a javascript template literal
const escapeTemplate = (str) => {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
};

// Generate the final file contents
const finalOutput = `// ==========================================
// DO NOT EDIT THIS FILE MANUALLY
// This file is auto-generated by scripts/build-json-rules.mjs
// Content is compiled from src/knowledge/fragments and muiscan mappings.
// ==========================================

export const rules = \`
Generate MUIBOOK component as JSON Trees.

${escapeTemplate(jsonRules)}

${escapeTemplate(muiscanRules)}

${escapeTemplate(jsonComponents)}

## Structured Chart Data
${escapeTemplate(chartData)}

${escapeTemplate(designAssets)}
\`;
`;

const rulesPath = path.join(__dirname, '../src/knowledge/json-rules.ts');
fs.writeFileSync(rulesPath, finalOutput);
console.log('Successfully injected JSON rules into src/knowledge/json-rules.ts');
