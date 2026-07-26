When composing Muibook charts in Redactd, populate the structured **Data** field through
`props.data`, or the **Series** field through `props.series` for Comparison Chart. Redactd owns
passing that structured value to the underlying Muibook component. Do not stringify the array,
place JSON inside an HTML attribute, or generate JavaScript assignment code.

## Data contracts

- `FinancialChart.props.data`: `[{ time, open, high, low, close, volume? }]`
- `MarketSparkline.props.data`: `[{ time, value }]`
- `FinancialBarChart.props.data`: `[{ time, value }]`
- `ComparisonChart.props.series`: `[{ id, label, color?, data: [{ time, value }] }]`

For every generated dataset:

- Keep all measurements as finite JSON numbers, not formatted strings. Use `4.2`, `101.28`, or
  `18400000`, not `"4.2%"`, `"$101.28"`, or `"18.4M"`. Formatting belongs in component props and
  composed labels.
- Use one unique `time` value per datum within a dataset or comparison series. Sort points from
  oldest to newest even though the components defensively sort copied input arrays.
- Prefer ISO `YYYY-MM-DD` strings for daily and periodic illustrative data. Unix timestamps in
  seconds or milliseconds are also accepted when supplied by the user. Do not mix time formats in
  one generated dataset.
- Match the cadence to the subject: daily points for illustrative market performance, monthly or
  quarterly points for economic and business reporting, and the user's supplied cadence when one
  exists.
- Generate enough coherent points to make the requested pattern visible. Avoid random-looking
  values, impossible OHLC relationships, duplicate dates, and placeholder sequences such as
  `1, 2, 3` unless that sequence is genuinely meaningful.
- Treat generated values as illustrative data. Preserve user-supplied data exactly apart from
  chronological ordering; do not silently change units, normalize values, or invent missing facts.

## Financial Chart: OHLCV market data

Use Financial Chart for open/high/low/close market observations. Candlestick and area presentations
both consume the complete OHLC shape; area charts plot each datum's `close`. `volume` is optional
and should be non-negative when supplied.

For every datum:

- `high` must be greater than or equal to both `open` and `close`.
- `low` must be less than or equal to both `open` and `close`.
- Keep all price fields in the same unit and use the matching `currency` label.
- Keep consecutive points plausible for the requested market and interval. The next `open` may
  differ from the previous `close`, but unexplained extreme gaps should not appear in illustrative
  data.

Example Financial Chart tree:

```json
{
  "id": "btc_price_chart",
  "type": "FinancialChart",
  "props": {
    "symbol": "BTC/USD",
    "currency": "USD",
    "type": "candlestick",
    "interval": "1D",
    "data": [
      { "time": "2026-06-01", "open": 102400, "high": 104800, "low": 101700, "close": 103900, "volume": 18400000 },
      { "time": "2026-06-02", "open": 103900, "high": 105200, "low": 102800, "close": 104500, "volume": 16900000 },
      { "time": "2026-06-03", "open": 104500, "high": 106100, "low": 103600, "close": 105800, "volume": 21300000 }
    ]
  },
  "children": []
}
```

## Market Sparkline: compact time/value trends

Use Market Sparkline for compact prices, indexes, yields, rates, totals, and KPI trends when shape
and direction matter more than dense inspection. Supply raw numeric values and keep currency, visible
labels, `trend`, `baseline`, and `scale` as component or composition props rather than embedding them
inside the data.

- A price or index trend can use ordinary positive values.
- A yield or rate uses the numeric rate value, such as `4.38`; a visible header can render `4.38%`.
- A baseline series still uses `{ time, value }`; set the comparison point through `props.baseline`.
- `trend: "auto"` compares the first and latest values. Do not pre-color individual data points.

Example Market Sparkline tree for a yield trend:

```json
{
  "id": "treasury_yield_sparkline",
  "type": "MarketSparkline",
  "props": {
    "label": "US 10-year Treasury yield",
    "trend": "auto",
    "scale": "none",
    "data": [
      { "time": "2026-06-01", "value": 4.31 },
      { "time": "2026-06-02", "value": 4.35 },
      { "time": "2026-06-03", "value": 4.38 }
    ]
  },
  "children": []
}
```

## Financial Bar Chart: periodic magnitudes and signed values

Use Financial Bar Chart for periodic economic or financial values such as inflation, interest rates,
volume, revenue, returns, and cash flow. Match formatting and color semantics to the data:

- `value-format: "percent"` expects ordinary percentage values such as `4.2`, not decimal fractions
  such as `0.042` and not strings such as `"4.2%"`.
- `value-format: "currency"` expects full numeric currency values and uses `currency` for display.
- `value-format: "volume"` expects full numeric quantities such as `18400000`; do not abbreviate the
  stored number to `18.4` merely because the rendered label uses compact notation.
- Use `variant: "neutral"` when magnitude is the main message. Use `variant: "directional"` when
  values above and below `baseline` carry positive/negative meaning. Negative values are valid.

Example monthly inflation data:

```json
{
  "id": "inflation_bar_chart",
  "type": "FinancialBarChart",
  "props": {
    "label": "Annual inflation rate",
    "value-format": "percent",
    "variant": "neutral",
    "data": [
      { "time": "2026-01-01", "value": 3.3 },
      { "time": "2026-02-01", "value": 3.8 },
      { "time": "2026-03-01", "value": 4.2 }
    ]
  },
  "children": []
}
```

Example signed cash-flow data:

```json
{
  "id": "cash_flow_bar_chart",
  "type": "FinancialBarChart",
  "props": {
    "label": "Monthly net cash flow",
    "value-format": "currency",
    "currency": "USD",
    "variant": "directional",
    "baseline": 0,
    "data": [
      { "time": "2026-01-01", "value": 4200000 },
      { "time": "2026-02-01", "value": -2100000 },
      { "time": "2026-03-01", "value": 3600000 }
    ]
  },
  "children": []
}
```

## Comparison Chart: named collections of time/value series

Comparison Chart uses `props.series`, never `props.data`. Every series needs a unique stable `id`, a
human-readable `label`, and its own chronological `data` array. Omit `color` to use the component's
theme-aware automatic series palette unless the user supplies an explicit series-color requirement.

Choose the mode before generating values:

- `mode: "absolute"` preserves supplied values. Use it when all series share the same unit and scale,
  such as actual versus forecast revenue. Set `value-format` and `currency` to match that unit.
- `mode: "indexed"` rebases each series to 100 from its own first value. Supply the original raw
  values—even when series have very different price levels—and let the component normalize them.
- `mode: "percent"` calculates percentage change from each series' own first value. Supply raw values,
  not precomputed percentage changes.
- Indexed and percent series need a finite, non-zero first value so the component can calculate the
  transformation.
- Series may cover different date ranges. Align dates when point-for-point comparison matters; for
  actual-versus-forecast data, sharing the handoff date can make continuity explicit.

Example indexed comparison using raw values with different magnitudes:

```json
{
  "id": "asset_performance_comparison",
  "type": "ComparisonChart",
  "props": {
    "mode": "indexed",
    "label": "Three-asset relative performance",
    "series": [
      {
        "id": "btc",
        "label": "Bitcoin",
        "data": [
          { "time": "2026-06-01", "value": 102400 },
          { "time": "2026-06-02", "value": 104500 },
          { "time": "2026-06-03", "value": 105800 }
        ]
      },
      {
        "id": "eth",
        "label": "Ethereum",
        "data": [
          { "time": "2026-06-01", "value": 3200 },
          { "time": "2026-06-02", "value": 3180 },
          { "time": "2026-06-03", "value": 3290 }
        ]
      },
      {
        "id": "ndx",
        "label": "Nasdaq 100",
        "data": [
          { "time": "2026-06-01", "value": 19500 },
          { "time": "2026-06-02", "value": 19640 },
          { "time": "2026-06-03", "value": 19720 }
        ]
      }
    ]
  },
  "children": []
}
```

Example actual-versus-forecast series for `mode: "absolute"`:

```json
{
  "id": "revenue_forecast_comparison",
  "type": "ComparisonChart",
  "props": {
    "mode": "absolute",
    "label": "Actual and forecast revenue",
    "value-format": "currency",
    "currency": "USD",
    "series": [
      {
        "id": "actual",
        "label": "Actual revenue",
        "data": [
          { "time": "2026-01-01", "value": 8400000 },
          { "time": "2026-02-01", "value": 8900000 },
          { "time": "2026-03-01", "value": 9300000 }
        ]
      },
      {
        "id": "forecast",
        "label": "Forecast revenue",
        "data": [
          { "time": "2026-03-01", "value": 9300000 },
          { "time": "2026-04-01", "value": 9700000 },
          { "time": "2026-05-01", "value": 10100000 }
        ]
      }
    ]
  },
  "children": []
}
```
