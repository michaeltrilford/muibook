import { getComponentDocs } from "../../../utils/story-data";

const createSeries = ({ count = 60, start = 100, drift = 0.15, volatility = 1.4, seed = 24 } = {}) => {
  const data = [];
  const startTime = Date.UTC(2026, 4, 1);
  let value = start;
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };
  for (let index = 0; index < count; index += 1) {
    value += drift + (random() - 0.5) * volatility + Math.sin(index / 6) * volatility * 0.15;
    data.push({ time: new Date(startTime + index * 86_400_000).toISOString().slice(0, 10), value });
  }
  return data;
};

class StoryMarketSparkline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("MarketSparkline");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Market Sparkline"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github.join("|||")}"
        figma="${data.figma.join("|||")}"
        guides="${data.guides.join("|||")}"
        storybook="${data.storybook.join("|||")}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        imports='["@muibook/components/mui-market-sparkline"]'
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        <story-api-types tag="mui-market-sparkline" title="Market Sparkline"></story-api-types>

        <story-card id="market-overview" title="${storyMeta["market-overview"].title}" usage="${storyMeta["market-overview"].usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(18rem, 1fr))" space="var(--space-400)">
            ${this.marketCard("marketCap", "Crypto market cap", "TOTAL", "2.13T USD", "-1.30%", "attention", "See all crypto markets")}
            ${this.marketCard("dollarIndex", "US Dollar index", "DXY", "101.280 USD", "+1.61%", "positive", "View index details")}
            ${this.marketCard("treasuryYield", "US 10Y yield", "US10Y", "4.38%", "+0.12%", "positive", "View treasury yields")}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-market-sparkline id=&quot;marketCap&quot; label=&quot;Crypto market cap&quot; currency=&quot;USD&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot;&gt;...&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;mui-link slot=&quot;footer&quot; href=&quot;/markets&quot;&gt;See all markets&lt;/mui-link&gt;<br />
            &lt;/mui-market-sparkline&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#marketCap&quot;).data = marketData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="types" title="${storyMeta.types.title}" usage="${storyMeta.types.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            ${this.typeExample("areaSparkline", "area", "Area")}
            ${this.typeExample("lineSparkline", "line", "Line")}
            ${this.typeExample("baselineSparkline", "baseline", "Baseline", " baseline=\"100\"")}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-market-sparkline type=&quot;area&quot; label=&quot;Area trend&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &lt;mui-market-sparkline type=&quot;line&quot; label=&quot;Line trend&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &lt;mui-market-sparkline type=&quot;baseline&quot; baseline=&quot;100&quot; label=&quot;Baseline trend&quot;&gt;&lt;/mui-market-sparkline&gt;
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            <mui-market-sparkline label="Loading market" loading></mui-market-sparkline>
            <mui-market-sparkline label="Empty market"></mui-market-sparkline>
            <mui-market-sparkline label="Unavailable market" error="Market data could not be loaded"></mui-market-sparkline>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-market-sparkline label=&quot;Loading market&quot; loading&gt;&lt;/mui-market-sparkline&gt;<br />
            &lt;mui-market-sparkline label=&quot;Empty market&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &lt;mui-market-sparkline label=&quot;Unavailable market&quot; error=&quot;Market data could not be loaded&quot;&gt;&lt;/mui-market-sparkline&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    this.shadowRoot.querySelector("#marketCap").data = createSeries({ start: 108, drift: -0.08, volatility: 2.2, seed: 10 });
    this.shadowRoot.querySelector("#dollarIndex").data = createSeries({ start: 96, drift: 0.12, volatility: 1.5, seed: 21 });
    this.shadowRoot.querySelector("#treasuryYield").data = createSeries({ start: 3.8, drift: 0.012, volatility: 0.12, seed: 31 });
    this.shadowRoot.querySelector("#areaSparkline").data = createSeries({ start: 80, drift: 0.18, volatility: 1.8, seed: 4 });
    this.shadowRoot.querySelector("#lineSparkline").data = createSeries({ start: 120, drift: -0.1, volatility: 2, seed: 8 });
    this.shadowRoot.querySelector("#baselineSparkline").data = createSeries({ start: 100, drift: 0, volatility: 2.4, seed: 15 });
  }

  marketCard(id, title, symbol, value, change, variant, action) {
    return `<mui-card><mui-card-body inner-space><mui-market-sparkline id="${id}" label="${title}" height="10rem"><mui-v-stack slot="header" space="var(--space-100)"><mui-h-stack space="var(--space-100)" aligny="center"><mui-body weight="bold">${title}</mui-body><mui-badge size="x-small">${symbol}</mui-badge></mui-h-stack><mui-body size="large" weight="bold">${value}</mui-body><mui-body size="small" variant="${variant}">${change}</mui-body></mui-v-stack><mui-link slot="footer" size="small" variant="tertiary" href="#">${action}</mui-link></mui-market-sparkline></mui-card-body></mui-card>`;
  }

  typeExample(id, type, title, extra = "") {
    return `<mui-market-sparkline id="${id}" type="${type}"${extra} label="${title} trend"><mui-body slot="header" size="small" weight="bold">${title}</mui-body></mui-market-sparkline>`;
  }
}

customElements.define("story-market-sparkline", StoryMarketSparkline);
export { StoryMarketSparkline };
