import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  MarketSparkline: {
    title: "Market Sparkline",
    description: "Market Sparkline presents a compact financial or economic trend inside composed Muibook interfaces.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-market-sparkline/index.ts"],
    website: ["https://muibook.com/market-sparkline"],
    guides: [""],
    usage: { list: ["Use for compact market summaries where direction and shape matter more than exact axis inspection.", "Compose Sparkline inside Card when it needs a framed dashboard surface; the component remains unframed for use within existing panels.", "Compose headings, values, badges, and actions through Muibook components in the header and footer slots.", "Use Financial Chart when users need scales, ranges, OHLC values, or detailed analysis."] },
    accessibility: { designerList: ["Always pair the visual trend with a textual value or change indicator; color and line direction are supplemental."], engineerList: ["Provide label for the generated chart summary.", "Keep TradingView attribution enabled unless the consuming page supplies the required visible attribution and NOTICE information."] },
    anatomy: { image: "", list: ["Optional header", "Compact plot", "Optional footer"] },
    variants: { items: [] },
    stories: { items: [
      { key: "market-overview", title: "Market Overview", list: ["Compose Sparkline with existing Muibook typography and layout components rather than duplicating summary UI inside the chart.", "Auto trend compares the first and latest values and selects the positive or negative theme treatment."] },
      { key: "types", title: "Types", list: ["Use area for a prominent trend, line for the quietest presentation, and baseline when movement above and below a reference value matters."] },
      { key: "states", title: "States", list: ["Use loading while data is requested, error for failed requests, and the automatic empty state when no data is available."] },
    ] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Financial Chart", link: "https://guides.muibook.com/financial-chart" }, { name: "Card", link: "https://guides.muibook.com/card" }] },
    rules: [],
    behaviour: { list: ["The plot resizes with its host using the chart engine's native auto-size behavior.", "Changing type, trend, baseline, or theme redraws the series without changing the supplied data.", "Interactive is opt-in so compact dashboard charts do not capture scrolling or pointer gestures by default."] },
    writing: { list: ["Use recognized instrument names, symbols, currencies, and concise change labels."] },
  },
};
