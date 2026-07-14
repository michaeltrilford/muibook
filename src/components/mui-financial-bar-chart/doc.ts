import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FinancialBarChart: {
    title: "Financial Bar Chart",
    description: "Financial Bar Chart presents periodic financial or economic values as a time-based histogram.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-financial-bar-chart/index.ts"],
    website: ["https://muibook.com/financial-bar-chart"],
    guides: [""],
    usage: { list: ["Use for time-based values such as inflation, interest rates, trading volume, revenue, returns, and cash flow.", "Use neutral when direction is communicated by magnitude; use directional when values above and below a baseline carry different meaning.", "Use a Table or List when exact comparison matters more than the pattern over time."] },
    accessibility: { designerList: ["Pair the chart with a clear title, unit, and latest value; do not rely on bar color alone."], engineerList: ["Provide label and the appropriate value-format and currency.", "Keep TradingView attribution enabled unless the consuming page supplies the required visible attribution and NOTICE information."] },
    anatomy: { image: "", list: ["Optional header", "Histogram plot", "Time scale", "Price scale", "Optional footer"] },
    variants: { items: [] },
    stories: { items: [
      { key: "economic-indicator", title: "Economic Indicator", list: ["Use a neutral histogram for periodic indicators where the height and progression of each period are primary.", "Compose the latest value and release context with Muibook components in the header and footer slots."] },
      { key: "directional", title: "Directional", list: ["Use directional bars for returns, profit and loss, or net cash flow around a meaningful baseline."] },
      { key: "scale", title: "Scale Options", list: ["Keep both scales for analysis, retain only time for compact trends, or hide both when surrounding UI already communicates units and period."] },
      { key: "states", title: "States", list: ["Use loading while data is requested, error for failed requests, and the automatic empty state when no data is available."] },
    ] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Market Sparkline", link: "https://guides.muibook.com/market-sparkline" }, { name: "Financial Chart", link: "https://guides.muibook.com/financial-chart" }] },
    rules: [],
    behaviour: { list: ["The chart resizes with its host using the chart engine's native auto-size behavior.", "Directional bars compare each value with baseline and render the baseline as a price line.", "Interactive is opt-in so dashboard charts do not capture scrolling or pointer gestures by default."] },
    writing: { list: ["Name the indicator and unit explicitly, and distinguish actual, forecast, and estimated values in surrounding content."] },
  },
};
