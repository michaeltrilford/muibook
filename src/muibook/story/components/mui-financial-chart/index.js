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
          <mui-financial-chart
            slot="body"
            id="btcCandlestick"
            symbol="BTC/USD"
            currency="USD"
            interval="1D"
            selected-range="3M"
            height="34rem"
          ></mui-financial-chart>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-chart<br />
            &nbsp;&nbsp;id=&quot;btcChart&quot;<br />
            &nbsp;&nbsp;symbol=&quot;BTC/USD&quot;<br />
            &nbsp;&nbsp;currency=&quot;USD&quot;<br />
            &nbsp;&nbsp;interval=&quot;1D&quot;<br />
            &nbsp;&nbsp;selected-range=&quot;3M&quot;<br />
            &nbsp;&nbsp;height=&quot;34rem&quot;<br />
            &gt;&lt;/mui-financial-chart&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;const chart = document.querySelector(&quot;#btcChart&quot;);<br />
            &nbsp;&nbsp;chart.data = marketData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="area" title="${storyMeta.area.title}" usage="${storyMeta.area.usage}">
          <mui-financial-chart
            slot="body"
            id="btcArea"
            type="area"
            symbol="BTC/USD"
            currency="USD"
            interval="1D"
            selected-range="1Y"
            height="28rem"
          ></mui-financial-chart>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-chart<br />
            &nbsp;&nbsp;type=&quot;area&quot;<br />
            &nbsp;&nbsp;symbol=&quot;BTC/USD&quot;<br />
            &nbsp;&nbsp;currency=&quot;USD&quot;<br />
            &nbsp;&nbsp;interval=&quot;1D&quot;<br />
            &nbsp;&nbsp;selected-range=&quot;1Y&quot;<br />
            &gt;&lt;/mui-financial-chart&gt;
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-v-stack slot="body" space="var(--space-400)">
            <mui-financial-chart symbol="BTC/USD" loading height="20rem"></mui-financial-chart>
            <mui-financial-chart symbol="ETH/USD" height="20rem"></mui-financial-chart>
            <mui-financial-chart symbol="SOL/USD" error="Market data could not be loaded" height="20rem"></mui-financial-chart>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-chart symbol=&quot;BTC/USD&quot; loading&gt;&lt;/mui-financial-chart&gt;<br />
            &lt;mui-financial-chart symbol=&quot;ETH/USD&quot;&gt;&lt;/mui-financial-chart&gt;<br />
            &lt;mui-financial-chart symbol=&quot;SOL/USD&quot; error=&quot;Market data could not be loaded&quot;&gt;&lt;/mui-financial-chart&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    const marketData = createMarketData();
    this.shadowRoot.querySelector("#btcCandlestick").data = marketData;
    this.shadowRoot.querySelector("#btcArea").data = marketData;
  }
}

customElements.define("story-financial-chart", StoryFinancialChart);
export { StoryFinancialChart };
