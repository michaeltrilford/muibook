import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ComparisonChart: {
    title: "Comparison Chart",
    description: "Comparison Chart aligns multiple financial time series for performance and forecast analysis.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-comparison-chart/index.ts"],
    website: ["https://muibook.com/comparison-chart"],
    guides: [""],
    usage: { list: ["Use indexed or percent mode when comparing assets with different units or price levels.", "Use absolute mode for series that share the same unit and scale, such as actual and forecast values.", "Limit simultaneous series so colors, labels, and crossings remain readable."] },
    accessibility: { designerList: ["Pair line colors with persistent text labels in the legend; do not rely on color alone."], engineerList: ["Provide label and compose a legend that names every supplied series.", "Keep TradingView attribution enabled unless the consuming page supplies the required visible attribution and NOTICE information."] },
    anatomy: { image: "", list: ["Optional header", "Composable legend", "Comparison plot", "Time scale", "Price scale", "Optional footer"] },
    variants: { items: [] },
    stories: { items: [
      { key: "indexed-performance", title: "Indexed Performance", list: ["Use indexed mode to compare relative performance from a shared starting value of 100.", "The component performs normalization independently for every supplied series."] },
      { key: "actual-forecast", title: "Actual and Forecast", list: ["Use absolute mode when actual and forecast data share the same unit and should retain their supplied values."] },
      { key: "modes", title: "Comparison Modes", list: ["Choose absolute for shared units, indexed for relative trajectories, and percent for explicit change from each series' starting value."] },
      { key: "states", title: "States", list: ["Use loading while data is requested, error for failed requests, and the automatic empty state when no usable series data is available."] },
    ] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Financial Chart", link: "https://guides.muibook.com/financial-chart" }, { name: "Financial Bar Chart", link: "https://guides.muibook.com/financial-bar-chart" }, { name: "Market Sparkline", link: "https://guides.muibook.com/market-sparkline" }] },
    rules: [],
    behaviour: { list: ["Series are sorted by time and transformed locally when mode changes.", "Theme palette colors are assigned by series order unless a series supplies an explicit CSS color.", "Interactive is opt-in so dashboard charts do not capture scrolling or pointer gestures by default."] },
    writing: { list: ["Use concise series names and state the comparison period or starting point in nearby content."] },
  },
};
