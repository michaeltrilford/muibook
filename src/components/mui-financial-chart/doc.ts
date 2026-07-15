import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FinancialChart: {
    title: "Financial Chart",
    description: "Financial Chart presents interactive OHLCV market data as candlesticks or an area series.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-financial-chart/index.ts"],
    website: ["https://muibook.com/financial-chart"],
    guides: [""],
    usage: { list: ["Use candlesticks when open, high, low, and close values matter; use area for a simpler price trend.", "Compose Financial Chart inside Card when the chart needs a framed surface; Financial Chart remains unframed so it can also fit existing panels and full-width layouts.", "Assign data through the host data property rather than serializing large market datasets into HTML attributes.", "Keep the TradingView logo enabled by default. In a chart cluster, use attribution='none' to remove repeated logos only when the containing experience provides one visible TradingView attribution and the required NOTICE information."] },
    accessibility: { designerList: ["Do not rely on positive and negative color alone; retain price and change text in the summary."], engineerList: ["Provide a meaningful symbol and currency. Financial Chart maintains a live textual summary of the visible data."] },
    anatomy: { image: "", list: ["Instrument summary", "Range controls", "Price pane", "Volume pane", "Price scale", "Time scale"] },
    variants: { items: [] },
    stories: { items: [
      { key: "candlestick", title: "Candlestick", list: ["Use for detailed market analysis where the relationship between open, high, low, and close values is important.", "Volume is rendered in a separate pane and uses the same positive and negative direction as each candle.", "This lead example keeps attribution='logo'; the remaining page examples use attribution='none' to avoid repetition within the chart cluster."] },
      { key: "area-compact", title: "Area: Compact", list: ["Use a compact chart cluster to compare positive, negative, and neutral semantic treatments at a glance.", "Each chart uses the same OHLCV data contract; trend changes the area line and fill without transforming the market data.", "Remove repeated attribution only when the containing experience provides one visible TradingView attribution and the required NOTICE information."] },
      { key: "area-positive", title: "Area: Positive", list: ["Use the positive area treatment when the complete trend carries a known positive outcome.", "Do not infer positive meaning from the final value alone; applications should select the treatment from the surrounding financial context.", "Pair the color treatment with values, labels, or supporting text so color is not the only status indicator."] },
      { key: "area-negative", title: "Area: Negative", list: ["Use the negative area treatment when the complete trend carries a known negative outcome.", "Do not infer negative meaning from the final value alone; applications should select the treatment from the surrounding financial context.", "Pair the color treatment with values, labels, or supporting text so color is not the only status indicator."] },
      { key: "area-neutral", title: "Area: Neutral", list: ["Use the neutral area treatment when the chart should communicate shape without positive or negative status.", "Keep the same OHLCV data contract so applications can switch presentation or trend treatment without transforming market data.", "Use header-stroke='none' when the toolbar and chart should read as one uninterrupted region."] },
      { key: "states", title: "States", list: ["Use loading while market data is being requested, error for a failed request, and the automatic empty state when no data is available."] },
    ] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Range Input", link: "https://guides.muibook.com/range-input" }, { name: "Status", link: "https://guides.muibook.com/status" }] },
    rules: [],
    behaviour: { list: ["The chart resizes with its host and redraws when Muibook brand or theme attributes change.", "Range controls filter local data and emit financial-chart-range-change for applications that fetch range-specific data.", "The update method supports streaming replacement of the latest interval without replacing the complete dataset."] },
    writing: { list: ["Use recognized market symbols, explicit currencies, and concise interval labels."] },
  },
};
