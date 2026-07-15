import { getComponentDocs } from "../../../utils/story-data";

const createMarketData = (count = 420) => {
  const data = [];
  const start = Date.UTC(2025, 4, 20);
  let close = 103420;
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let index = 0; index < count; index += 1) {
    const cycle = Math.sin(index / 19) * 780 + Math.sin(index / 51) * 1250;
    const movement = (random() - 0.46) * 1650 + cycle * 0.08;
    const open = close;
    close = Math.max(52000, open + movement);
    const high = Math.max(open, close) + random() * 980;
    const low = Math.min(open, close) - random() * 920;
    data.push({
      time: new Date(start + index * 86_400_000).toISOString().slice(0, 10),
      open,
      high,
      low,
      close,
      volume: 8500 + random() * 22000,
    });
  }
  return data;
};

class StoryFinancialChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FinancialChart");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Financial Chart"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Financial Chart"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-financial-chart"]'
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>

        <story-api-types tag="mui-financial-chart" title="Financial Chart"></story-api-types>

        <story-card id="candlestick" title="${storyMeta.candlestick.title}" usage="${storyMeta.candlestick.usage}">
          <mui-card slot="body">
            <mui-card-body size="none">
              <mui-financial-chart
                id="btcCandlestick"
                symbol="BTC/USD"
                currency="USD"
                interval="1D"
                selected-range="3M"
                height="34rem"
                attribution="logo"
              ></mui-financial-chart>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-financial-chart<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id=&quot;btcChart&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;symbol=&quot;BTC/USD&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currency=&quot;USD&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;interval=&quot;1D&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selected-range=&quot;3M&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height=&quot;34rem&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;attribution=&quot;logo&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-financial-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;const chart = document.querySelector(&quot;#btcChart&quot;);<br />
            &nbsp;&nbsp;chart.data = marketData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="area-compact" title="${storyMeta["area-compact"].title}" usage="${storyMeta["area-compact"].usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(24rem, 1fr))" space="var(--space-400)">
            ${this.areaExample("compactPositiveArea", "positive", "BTC/USD", "20rem")}
            ${this.areaExample("compactNegativeArea", "negative", "ETH/USD", "20rem")}
            ${this.areaExample("compactNeutralArea", "neutral", "DXY", "20rem")}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(24rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            ${this.areaCodeExample("compactPositiveArea", "positive", "BTC/USD", "20rem")}<br />
            ${this.areaCodeExample("compactNegativeArea", "negative", "ETH/USD", "20rem")}<br />
            ${this.areaCodeExample("compactNeutralArea", "neutral", "DXY", "20rem")}<br />
            &lt;/mui-grid&gt;<br /><br />
            ${this.areaDataCode(["compactPositiveArea", "compactNegativeArea", "compactNeutralArea"])}
          </story-code-block>
        </story-card>

        <story-card id="area-positive" title="${storyMeta["area-positive"].title}" usage="${storyMeta["area-positive"].usage}">
          ${this.areaExample("positiveArea", "positive", "BTC/USD", "28rem", "body")}
          <story-code-block slot="footer" scrollable>
            ${this.areaCodeExample("positiveArea", "positive", "BTC/USD", "28rem")}<br /><br />
            ${this.areaDataCode(["positiveArea"])}
          </story-code-block>
        </story-card>

        <story-card id="area-negative" title="${storyMeta["area-negative"].title}" usage="${storyMeta["area-negative"].usage}">
          ${this.areaExample("negativeArea", "negative", "ETH/USD", "28rem", "body")}
          <story-code-block slot="footer" scrollable>
            ${this.areaCodeExample("negativeArea", "negative", "ETH/USD", "28rem")}<br /><br />
            ${this.areaDataCode(["negativeArea"])}
          </story-code-block>
        </story-card>

        <story-card id="area-neutral" title="${storyMeta["area-neutral"].title}" usage="${storyMeta["area-neutral"].usage}">
          ${this.areaExample("neutralArea", "neutral", "DXY", "28rem", "body")}
          <story-code-block slot="footer" scrollable>
            ${this.areaCodeExample("neutralArea", "neutral", "DXY", "28rem")}<br /><br />
            ${this.areaDataCode(["neutralArea"])}
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-chart symbol="BTC/USD" loading height="20rem" attribution="none"></mui-financial-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-chart symbol="ETH/USD" height="20rem" attribution="none"></mui-financial-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-chart symbol="SOL/USD" error="Market data could not be loaded" height="20rem" attribution="none"></mui-financial-chart>
              </mui-card-body>
            </mui-card>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-financial-chart symbol=&quot;BTC/USD&quot; loading attribution=&quot;none&quot;&gt;&lt;/mui-financial-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-financial-chart symbol=&quot;ETH/USD&quot; attribution=&quot;none&quot;&gt;&lt;/mui-financial-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-financial-chart symbol=&quot;SOL/USD&quot; error=&quot;Market data could not be loaded&quot; attribution=&quot;none&quot;&gt;&lt;/mui-financial-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    const marketData = createMarketData();
    this.shadowRoot.querySelector("#btcCandlestick").data = marketData;
    ["compactPositiveArea", "compactNegativeArea", "compactNeutralArea", "positiveArea", "negativeArea", "neutralArea"].forEach((id) => {
      this.shadowRoot.querySelector(`#${id}`).data = marketData;
    });
  }

  areaExample(id, trend, symbol, height, slot = "") {
    return `<mui-card${slot ? ` slot="${slot}"` : ""}>
      <mui-card-body size="none">
        <mui-financial-chart id="${id}" type="area" trend="${trend}" symbol="${symbol}" currency="USD" interval="1D" selected-range="1Y" height="${height}" attribution="none" header-stroke="none"></mui-financial-chart>
      </mui-card-body>
    </mui-card>`;
  }

  areaCodeExample(id, trend, symbol, height) {
    return `&lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&lt;mui-financial-chart id=&quot;${id}&quot; type=&quot;area&quot; trend=&quot;${trend}&quot; symbol=&quot;${symbol}&quot; currency=&quot;USD&quot; interval=&quot;1D&quot; selected-range=&quot;1Y&quot; height=&quot;${height}&quot; attribution=&quot;none&quot; header-stroke=&quot;none&quot;&gt;&lt;/mui-financial-chart&gt;<br />
      &lt;/mui-card-body&gt;&lt;/mui-card&gt;`;
  }

  areaDataCode(ids) {
    return `&lt;script&gt;<br />
      &nbsp;&nbsp;const marketData = [<br />
      &nbsp;&nbsp;&nbsp;&nbsp;{ time: &quot;2026-07-01&quot;, open: 104, high: 109, low: 102, close: 108, volume: 18400 },<br />
      &nbsp;&nbsp;&nbsp;&nbsp;{ time: &quot;2026-07-02&quot;, open: 108, high: 112, low: 106, close: 110, volume: 21600 },<br />
      &nbsp;&nbsp;&nbsp;&nbsp;{ time: &quot;2026-07-03&quot;, open: 110, high: 115, low: 109, close: 114, volume: 24800 },<br />
      &nbsp;&nbsp;];<br /><br />
      ${ids.map((id) => `&nbsp;&nbsp;document.querySelector(&quot;#${id}&quot;).data = marketData;`).join("<br />\n      ")}<br />
      &lt;/script&gt;`;
  }
}

customElements.define("story-financial-chart", StoryFinancialChart);
export { StoryFinancialChart };
