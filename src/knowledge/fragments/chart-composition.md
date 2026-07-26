Chart headers are composable named-slot regions, not a fixed subcomponent or required anatomy.
Build them from the Muibook layout and content components that fit the information the user asks
for. The examples below are starting points to adapt, simplify, reorder, or extend; do not reproduce
every child merely because it appears in an example.

- Put the outer header layout directly inside `MarketSparkline`, `FinancialBarChart`, or
  `ComparisonChart` with `props.slot: "header"`. Slot placement stays inside `props`, never on the
  node itself.
- Start with the smallest useful hierarchy: a visible title and optional supporting copy. Add an
  instrument badge, current value, change, units, forecast, release date, actions, or other context
  only when it supports the requested chart.
- Use `VStack` for vertically grouped title, value, and supporting text. Use `HStack` for related
  inline metadata or to place two meaningful groups at opposite sides of a wider header. Allow
  wrapping when a split header or legend may run out of horizontal space.
- Use `Heading` with `level: "none"` for prominent values or display labels that should not create a
  document section. Use a semantic heading level when the chart title introduces a real section in
  the surrounding page hierarchy.
- Keep the chart's accessible `label` even when the same idea is visible in the composed header.
  Pair trends and series colors with text; color and plot shape must not carry the meaning alone.
- Market Sparkline defaults to `scale: "none"` so both axes stay hidden, including when it is
  interactive. Set `scale` to `both`, `time`, or `price` only when the compact trend needs a visible
  reference axis. Financial Bar Chart and Comparison Chart default to `scale: "both"`. Across all
  three components, the value/price scale appears on the right and the time scale along the bottom;
  `scale` controls which axes are visible and does not reposition them.
- `ComparisonChart` also exposes a `legend` slot. A compact legend may sit beside the title inside
  the header; use a separate child with `props.slot: "legend"` when the legend needs its own row or
  independent layout. Whichever placement is chosen, label every supplied series and keep legend
  colors consistent with the series.
- `FinancialBarChart` and `ComparisonChart` provide their own padded header region. Add local
  padding to a Market Sparkline header only when its surrounding Card or layout does not already
  provide the needed inset. Do not copy example padding or spacing without considering the parent.
- Use `header-stroke` on Financial Bar Chart or Comparison Chart only when the requested composition
  should visually join the populated header to the plot without the default divider.

Example Market Sparkline header with instrument context and a current value:

```json
{
  "id": "dollar_index_sparkline",
  "type": "MarketSparkline",
  "props": {
    "label": "US Dollar index three month trend",
    "height": "10rem",
    "data": [
      { "time": "2026-06-01", "value": 100.72 },
      { "time": "2026-06-02", "value": 101.04 },
      { "time": "2026-06-03", "value": 101.28 }
    ]
  },
  "children": [
    {
      "id": "dollar_index_header",
      "type": "VStack",
      "props": {
        "slot": "header",
        "space": "var(--space-000)",
        "width": "auto",
        "height": "auto",
        "style": "padding: var(--space-400);"
      },
      "children": [
        {
          "id": "dollar_index_identity",
          "type": "HStack",
          "props": {
            "space": "var(--space-200)",
            "alignY": "center",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            { "id": "dollar_index_name", "type": "Body", "props": { "text": "US Dollar index", "size": "small" }, "children": [] },
            { "id": "dollar_index_symbol", "type": "Badge", "props": { "text": "DXY", "size": "x-small" }, "children": [] }
          ]
        },
        {
          "id": "dollar_index_value_row",
          "type": "HStack",
          "props": {
            "space": "var(--space-200)",
            "alignY": "center",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            { "id": "dollar_index_value", "type": "Heading", "props": { "text": "101.280 USD", "size": "3", "level": "none" }, "children": [] },
            { "id": "dollar_index_change", "type": "Body", "props": { "text": "+1.61%", "variant": "positive" }, "children": [] }
          ]
        }
      ]
    }
  ]
}
```

Example Financial Bar Chart header with optional economic context:

```json
{
  "id": "inflation_chart",
  "type": "FinancialBarChart",
  "props": {
    "label": "US annual inflation rate",
    "value-format": "percent",
    "height": "24rem",
    "data": [
      { "time": "2026-04-01", "value": 3.8 },
      { "time": "2026-05-01", "value": 4.0 },
      { "time": "2026-06-01", "value": 4.2 }
    ]
  },
  "children": [
    {
      "id": "inflation_header",
      "type": "VStack",
      "props": {
        "slot": "header",
        "space": "var(--space-400)",
        "width": "auto",
        "height": "auto"
      },
      "children": [
        {
          "id": "inflation_title_row",
          "type": "HStack",
          "props": {
            "space": "var(--space-100)",
            "alignY": "center",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            { "id": "inflation_title", "type": "Heading", "props": { "text": "US annual inflation rate", "size": "4", "level": "none" }, "children": [] },
            { "id": "inflation_symbol", "type": "Badge", "props": { "text": "USIRYY", "size": "x-small" }, "children": [] }
          ]
        },
        {
          "id": "inflation_metrics",
          "type": "HStack",
          "props": {
            "space": "var(--space-600)",
            "width": "auto",
            "height": "auto",
            "wrap": true
          },
          "children": [
            {
              "id": "inflation_actual",
              "type": "VStack",
              "props": { "space": "var(--space-000)", "width": "auto", "height": "auto" },
              "children": [
                { "id": "inflation_actual_label", "type": "Body", "props": { "text": "Actual", "size": "x-small", "variant": "secondary" }, "children": [] },
                { "id": "inflation_actual_value", "type": "Heading", "props": { "text": "4.2%", "size": "4", "level": "none" }, "children": [] }
              ]
            },
            {
              "id": "inflation_forecast",
              "type": "VStack",
              "props": { "space": "var(--space-000)", "width": "auto", "height": "auto" },
              "children": [
                { "id": "inflation_forecast_label", "type": "Body", "props": { "text": "Forecast", "size": "x-small", "variant": "secondary" }, "children": [] },
                { "id": "inflation_forecast_value", "type": "Heading", "props": { "text": "4.0%", "size": "4", "level": "none" }, "children": [] }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Example Comparison Chart with a compact legend composed into the header:

```json
{
  "id": "revenue_comparison",
  "type": "ComparisonChart",
  "props": {
    "mode": "absolute",
    "label": "Actual and forecast revenue",
    "value-format": "currency",
    "height": "26rem",
    "series": [
      {
        "id": "actual",
        "label": "Actual revenue",
        "data": [
          { "time": "2026-05-01", "value": 10.8 },
          { "time": "2026-06-01", "value": 11.1 }
        ]
      },
      {
        "id": "forecast",
        "label": "Forecast revenue",
        "data": [
          { "time": "2026-06-01", "value": 11.1 },
          { "time": "2026-07-01", "value": 11.6 }
        ]
      }
    ]
  },
  "children": [
    {
      "id": "revenue_comparison_header",
      "type": "HStack",
      "props": {
        "slot": "header",
        "alignX": "space-between",
        "alignY": "center",
        "space": "var(--space-400)",
        "width": "auto",
        "height": "auto",
        "wrap": true
      },
      "children": [
        {
          "id": "revenue_comparison_title_group",
          "type": "VStack",
          "props": { "space": "var(--space-100)", "width": "auto", "height": "auto" },
          "children": [
            { "id": "revenue_comparison_title", "type": "Heading", "props": { "text": "Actual and forecast revenue", "size": "4", "level": "none" }, "children": [] },
            { "id": "revenue_comparison_unit", "type": "Body", "props": { "text": "USD billions", "size": "small", "variant": "secondary" }, "children": [] }
          ]
        },
        {
          "id": "revenue_comparison_legend",
          "type": "HStack",
          "props": { "space": "var(--space-300)", "width": "auto", "height": "auto", "wrap": true },
          "children": [
            { "id": "actual_legend_badge", "type": "Badge", "props": { "text": "Actual", "size": "x-small", "color": "blue" }, "children": [] },
            { "id": "forecast_legend_badge", "type": "Badge", "props": { "text": "Forecast", "size": "x-small", "color": "green" }, "children": [] }
          ]
        }
      ]
    }
  ]
}
```
