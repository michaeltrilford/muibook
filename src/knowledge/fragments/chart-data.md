When composing Muibook charts in Redactd, populate the structured **Data** field through
`props.data`, or the **Series** field through `props.series` for Comparison Chart. Redactd owns
passing that structured value to the underlying Muibook component. Do not stringify the array or
generate JavaScript assignment code.

- `FinancialChart.props.data`: `[{ time, open, high, low, close, volume? }]`
- `MarketSparkline.props.data`: `[{ time, value }]`
- `FinancialBarChart.props.data`: `[{ time, value }]`
- `ComparisonChart.props.series`: `[{ id, label, color?, data: [{ time, value }] }]`

Use ISO `YYYY-MM-DD` dates for daily illustrative data unless the user provides another valid time
format. Keep numeric fields as numbers, sort points chronologically, and generate enough coherent
illustrative points to make the requested trend visible when the user does not supply data.

Example Financial Chart tree:

```json
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
```

For Sparkline and Financial Bar Chart, the Data field uses the simpler time/value shape:

```json
"data": [
  { "time": "2026-06-01", "value": 101.2 },
  { "time": "2026-06-02", "value": 103.8 },
  { "time": "2026-06-03", "value": 102.9 }
]
```

Comparison Chart uses the Series field:

```json
"series": [
  {
    "id": "actual",
    "label": "Actual",
    "data": [
      { "time": "2026-06-01", "value": 101.2 },
      { "time": "2026-06-02", "value": 103.8 }
    ]
  },
  {
    "id": "forecast",
    "label": "Forecast",
    "data": [
      { "time": "2026-06-01", "value": 100.8 },
      { "time": "2026-06-02", "value": 104.1 }
    ]
  }
]
```
