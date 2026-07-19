import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  MarketSparkline: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["header","footer"],
    },
    title: "Market Sparkline",
    description: "Market Sparkline presents a compact financial or economic trend inside composed Muibook interfaces.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-market-sparkline/index.ts"],
    website: ["https://muibook.com/market-sparkline"],
    guides: [""],
    usage: { list: ["Use for compact market summaries where direction and shape matter more than exact axis inspection.", "Compose Sparkline inside Card when it needs a framed dashboard surface; the component remains unframed for use within existing panels.", "Provide time/value objects through the data property. When composing Muibook UI in Redactd, populate the structured Data field through props.data; Redactd passes it to the component.", "Compose headings, values, badges, and actions through Muibook components in the header and footer slots.", "In a chart cluster, use attribution='none' to remove repeated TradingView logos only when the containing experience provides one visible attribution and the required NOTICE information.", "Use Financial Chart when users need scales, ranges, OHLC values, or detailed analysis."] },
    accessibility: { designerList: ["Always pair the visual trend with a textual value or change indicator; color and line direction are supplemental."], engineerList: ["Provide label for the generated chart summary.", "Keep TradingView attribution enabled unless the consuming page supplies the required visible attribution and NOTICE information."] },
    anatomy: { image: "", list: ["Optional header", "Compact plot", "Optional footer"] },
    variants: { items: [] },
    stories: { items: [
      { key: "market-overview", title: "Market Overview", list: ["Compose Sparkline with existing Muibook typography and layout components rather than duplicating summary UI inside the chart.", "Use Card Body size none when the Sparkline header and footer own the cluster's internal spacing.", "Use Heading level none for the prominent market value because it is display text, not a section heading.", "Auto trend compares the first and latest values and selects the positive or negative theme treatment.", "This cluster uses attribution='none' on every Sparkline; the containing product experience must provide the required visible attribution and NOTICE information elsewhere."] },
      { key: "small-card", title: "Sparkline: Small Card", list: ["Use a wrapping horizontal Stack when multiple Sparkline Cards should share a row and move onto separate rows as space narrows.", "Use a two-column composition inside each Card when the trend and supporting market summary should carry equal visual weight.", "Use Card Body size small for compact paired content.", "Use Link variant unstyled when the entire Card navigates to one destination; do not place other interactive controls inside the Card.", "Use Heading level none for the prominent market value because it is display text, not a section heading."] },
      { key: "large-card", title: "Sparkline: Large Card", list: ["Use a full-width Sparkline when the trend is the primary content of a larger dashboard card.", "Use Card Body size medium to create balanced separation around the summary and chart.", "Use Heading level none for prominent instrument and market values because they are display text, not section headings."] },
      { key: "trend-colours", title: "Trend Colours", list: ["Use positive and negative only when direction carries meaning; use neutral when the Sparkline should communicate shape without a directional status.", "Use trend='auto' for data-driven direction, or set an explicit trend when the surrounding domain determines the semantic treatment.", "Always pair trend color with visible text because color alone must not communicate status."] },
      { key: "types", title: "Types", list: ["Use area for a prominent trend, line for the quietest presentation, and baseline when movement above and below a reference value matters.", "Compose a compact header through the Sparkline header slot when each chart type needs an adjacent title and supporting label."] },
      { key: "states", title: "States", list: ["Use loading while data is requested, error for failed requests, and the automatic empty state when no data is available."] },
    ] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Financial Chart", link: "https://guides.muibook.com/financial-chart" }, { name: "Card", link: "https://guides.muibook.com/card" }] },
    rules: [],
    behaviour: { list: ["The plot resizes with its host using the chart engine's native auto-size behavior.", "Changing type, trend, baseline, or theme redraws the series without changing the supplied data.", "Interactive is opt-in so compact dashboard charts do not capture scrolling or pointer gestures by default."] },
    writing: { list: ["Use recognized instrument names, symbols, currencies, and concise change labels."] },
  },
};
