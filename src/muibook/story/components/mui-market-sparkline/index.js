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

const positiveTrendData = createSeries({ start: 80, drift: 0.2, volatility: 1.6, seed: 18 });
const negativeTrendData = createSeries({ start: 120, drift: -0.2, volatility: 1.6, seed: 18 });
const neutralTrendData = createSeries({ start: 100, drift: 0, volatility: 1.6, seed: 18 });

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
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

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
            ${this.marketCard("marketCap", "Crypto market cap", "TOTAL", "2.13T USD", "-1.30%", "attention", "See all crypto markets", "none")}
            ${this.marketCard("dollarIndex", "US Dollar index", "DXY", "101.280 USD", "+1.61%", "positive", "View index details", "none")}
            ${this.marketCard("treasuryYield", "US 10Y yield", "US10Y", "4.38%", "+0.12%", "positive", "View treasury yields", "none")}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline id=&quot;marketCap&quot; label=&quot;Crypto market cap&quot; height=&quot;10rem&quot; attribution=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot; space=&quot;var(--space-000)&quot; style=&quot;padding: var(--space-400);&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;Crypto market cap&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge size=&quot;x-small&quot;&gt;TOTAL&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;2.13T USD&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;attention&quot;&gt;-1.30%&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;footer&quot; space=&quot;var(--space-000)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule direction=&quot;horizontal&quot; length=&quot;100%&quot;&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link size=&quot;small&quot; variant=&quot;tertiary&quot; href=&quot;/markets&quot; style=&quot;padding: var(--space-050);&quot;&gt;See all crypto markets&lt;/mui-link&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;const marketCap = document.querySelector(&quot;#marketCap&quot;);<br />
            &nbsp;&nbsp;marketCap.data = marketData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="small-card" title="${storyMeta["small-card"].title}" usage="${storyMeta["small-card"].usage}">
          <mui-h-stack slot="body" space="var(--space-400)" wrap width="100%" aligny="stretch">
            <mui-link variant="unstyled" href="/markets/dxy" style="flex: 1 1 50rem;">
              <mui-card>
                <mui-card-body size="small">
                  <mui-grid col="repeat(2, minmax(0, 1fr))" space="var(--space-500)" aligny="center">
                    <mui-market-sparkline id="smallCardSparkline" type="area" label="US Dollar index three month trend" height="12rem" attribution="none"></mui-market-sparkline>
                    <mui-v-stack space="var(--space-300)">
                      <mui-v-stack space="var(--space-000)">
                        <mui-h-stack space="var(--space-200)" aligny="center">
                          <mui-body size="small">US Dollar index</mui-body>
                          <mui-badge size="x-small">DXY</mui-badge>
                        </mui-h-stack>
                        <mui-h-stack space="var(--space-200)" aligny="center">
                          <mui-heading size="3" level="none">101.280 USD</mui-heading>
                          <mui-body variant="positive">+1.61%</mui-body>
                        </mui-h-stack>
                      </mui-v-stack>
                      <mui-body size="small" variant="secondary">Three-month performance against a basket of major currencies.</mui-body>
                    </mui-v-stack>
                  </mui-grid>
                </mui-card-body>
              </mui-card>
            </mui-link>
            <mui-link variant="unstyled" href="/markets/eurusd" style="flex: 1 1 50rem;">
              <mui-card>
                <mui-card-body size="small">
                  <mui-grid col="repeat(2, minmax(0, 1fr))" space="var(--space-500)" aligny="center">
                    <mui-market-sparkline id="smallCardEuroSparkline" type="area" label="Euro US Dollar three month trend" height="12rem" attribution="none"></mui-market-sparkline>
                    <mui-v-stack space="var(--space-300)">
                      <mui-v-stack space="var(--space-000)">
                        <mui-h-stack space="var(--space-200)" aligny="center">
                          <mui-body size="small">Euro / US Dollar</mui-body>
                          <mui-badge size="x-small">EURUSD</mui-badge>
                        </mui-h-stack>
                        <mui-h-stack space="var(--space-200)" aligny="center">
                          <mui-heading size="3" level="none">1.1684 USD</mui-heading>
                          <mui-body variant="attention">-0.42%</mui-body>
                        </mui-h-stack>
                      </mui-v-stack>
                      <mui-body size="small" variant="secondary">Three-month exchange-rate movement against the US Dollar.</mui-body>
                    </mui-v-stack>
                  </mui-grid>
                </mui-card-body>
              </mui-card>
            </mui-link>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-h-stack space=&quot;var(--space-400)&quot; wrap width=&quot;100%&quot; alignY=&quot;stretch&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-link variant=&quot;unstyled&quot; href=&quot;/markets/dxy&quot; style=&quot;flex: 1 1 38rem;&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body size=&quot;small&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col=&quot;repeat(2, minmax(0, 1fr))&quot; space=&quot;var(--space-500)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline id=&quot;smallCardSparkline&quot; type=&quot;area&quot; label=&quot;US Dollar index three month trend&quot; height=&quot;12rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-300)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-000)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;US Dollar index&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge size=&quot;x-small&quot;&gt;DXY&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;101.280 USD&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;positive&quot;&gt;+1.61%&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;Three-month performance against a basket of major currencies.&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card&gt;<br />
            &nbsp;&nbsp;&lt;/mui-link&gt;<br />
            &nbsp;&nbsp;&lt;mui-link variant=&quot;unstyled&quot; href=&quot;/markets/eurusd&quot; style=&quot;flex: 1 1 38rem;&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body size=&quot;small&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col=&quot;repeat(2, minmax(0, 1fr))&quot; space=&quot;var(--space-500)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline id=&quot;smallCardEuroSparkline&quot; type=&quot;area&quot; label=&quot;Euro US Dollar three month trend&quot; height=&quot;12rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-300)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-000)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;Euro / US Dollar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge size=&quot;x-small&quot;&gt;EURUSD&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-200)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;1.1684 USD&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;attention&quot;&gt;-0.42%&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;Three-month exchange-rate movement against the US Dollar.&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card&gt;<br />
            &nbsp;&nbsp;&lt;/mui-link&gt;<br />
            &lt;/mui-h-stack&gt;
          </story-code-block>
        </story-card>

        <story-card id="large-card" title="${storyMeta["large-card"].title}" usage="${storyMeta["large-card"].usage}">
          <mui-card slot="body" style="width: 100%;">
            <mui-card-body size="medium">
              <mui-v-stack space="var(--space-500)">
                <mui-h-stack alignx="space-between" aligny="start" space="var(--space-400)" wrap>
                  <mui-v-stack space="var(--space-000)">
                    <mui-h-stack space="var(--space-400)" aligny="center">
                      <mui-heading size="2" level="none">US Dollar index</mui-heading>
                      <mui-badge size="large" style="padding-top: var(--space-050)">DXY</mui-badge>
                    </mui-h-stack>
                  </mui-v-stack>
                  <mui-v-stack space="var(--space-000)" alignx="end">
                    <mui-heading size="2" level="none">101.280 USD</mui-heading>
                    <mui-body variant="positive" size="large">+1.61%</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
                <mui-market-sparkline id="largeCardSparkline" type="area" label="US Dollar index three month trend" height="16rem" attribution="none"></mui-market-sparkline>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card style=&quot;width: 100%;&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;medium&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-500)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack alignX=&quot;space-between&quot; alignY=&quot;start&quot; space=&quot;var(--space-400)&quot; wrap&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-000)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-400)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;2&quot; level=&quot;none&quot;&gt;US Dollar index&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge size=&quot;large&quot; style=&quot;padding-top: var(--space-050)&quot;&gt;DXY&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-000)&quot; alignX=&quot;end&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;2&quot; level=&quot;none&quot;&gt;101.280 USD&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;positive&quot; size=&quot;large&quot;&gt;+1.61%&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline id=&quot;largeCardSparkline&quot; type=&quot;area&quot; label=&quot;US Dollar index three month trend&quot; height=&quot;16rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>

        <story-card id="trend-colours" title="${storyMeta["trend-colours"].title}" usage="${storyMeta["trend-colours"].usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            ${this.trendExample("positiveTrendSparkline", "positive", "Positive", "Increasing performance")}
            ${this.trendExample("negativeTrendSparkline", "negative", "Negative", "Decreasing performance")}
            ${this.trendExample("neutralTrendSparkline", "neutral", "Neutral", "Direction without status")}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(16rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            ${this.trendCodeExample("positiveTrendSparkline", "positive", "Positive", "Increasing performance")}<br />
            ${this.trendCodeExample("negativeTrendSparkline", "negative", "Negative", "Decreasing performance")}<br />
            ${this.trendCodeExample("neutralTrendSparkline", "neutral", "Neutral", "Direction without status")}<br />
            &lt;/mui-grid&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#positiveTrendSparkline&quot;).data = positiveTrendData;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#negativeTrendSparkline&quot;).data = negativeTrendData;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#neutralTrendSparkline&quot;).data = neutralTrendData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="types" title="${storyMeta.types.title}" usage="${storyMeta.types.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            ${this.typeExample("areaSparkline", "area", "Area")}
            ${this.typeExample("lineSparkline", "line", "Line")}
            ${this.typeExample("baselineSparkline", "baseline", "Baseline", ' baseline="100"')}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(16rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            ${this.typeCodeExample("areaSparkline", "area", "Area")}<br />
            ${this.typeCodeExample("lineSparkline", "line", "Line")}<br />
            ${this.typeCodeExample("baselineSparkline", "baseline", "Baseline", ' baseline=&quot;100&quot;')}<br />
            &lt;/mui-grid&gt;
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            <mui-card>
              <mui-card-body size="medium">
                <mui-market-sparkline label="Loading market" loading attribution="none"></mui-market-sparkline>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="medium">
                <mui-market-sparkline label="Empty market" attribution="none"></mui-market-sparkline>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="medium">
                <mui-market-sparkline label="Unavailable market" error="Market data could not be loaded" attribution="none"></mui-market-sparkline>
              </mui-card-body>
            </mui-card>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;medium&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline label=&quot;Loading market&quot; loading attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;medium&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline label=&quot;Empty market&quot; attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;medium&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline label=&quot;Unavailable market&quot; error=&quot;Market data could not be loaded&quot; attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    this.shadowRoot.querySelector("#marketCap").data = createSeries({
      start: 108,
      drift: -0.08,
      volatility: 2.2,
      seed: 10,
    });
    this.shadowRoot.querySelector("#dollarIndex").data = createSeries({
      start: 96,
      drift: 0.12,
      volatility: 1.5,
      seed: 21,
    });
    this.shadowRoot.querySelector("#treasuryYield").data = createSeries({
      start: 3.8,
      drift: 0.012,
      volatility: 0.12,
      seed: 31,
    });
    this.shadowRoot.querySelector("#smallCardSparkline").data = createSeries({
      start: 96,
      drift: 0.12,
      volatility: 1.5,
      seed: 21,
    });
    this.shadowRoot.querySelector("#smallCardEuroSparkline").data = createSeries({
      start: 1.19,
      drift: -0.002,
      volatility: 0.012,
      seed: 26,
    });
    this.shadowRoot.querySelector("#largeCardSparkline").data = createSeries({
      start: 96,
      drift: 0.12,
      volatility: 1.5,
      seed: 21,
    });
    this.shadowRoot.querySelector("#positiveTrendSparkline").data = positiveTrendData;
    this.shadowRoot.querySelector("#negativeTrendSparkline").data = negativeTrendData;
    this.shadowRoot.querySelector("#neutralTrendSparkline").data = neutralTrendData;
    this.shadowRoot.querySelector("#areaSparkline").data = createSeries({
      start: 80,
      drift: 0.18,
      volatility: 1.8,
      seed: 4,
    });
    this.shadowRoot.querySelector("#lineSparkline").data = createSeries({
      start: 120,
      drift: -0.1,
      volatility: 2,
      seed: 8,
    });
    this.shadowRoot.querySelector("#baselineSparkline").data = createSeries({
      start: 100,
      drift: 0,
      volatility: 2.4,
      seed: 15,
    });
  }

  marketCard(id, title, symbol, value, change, variant, action, attribution) {
    return `<mui-card>
      <mui-card-body size="none">
        <mui-market-sparkline id="${id}" label="${title}" height="10rem" attribution="${attribution}">
          <mui-v-stack slot="header" space="var(--space-000)" style="padding: var(--space-400);">
            <mui-h-stack space="var(--space-200)" aligny="center">
              <mui-body size="small">${title}</mui-body>
              <mui-badge size="x-small">${symbol}</mui-badge>
            </mui-h-stack>
            <mui-h-stack space="var(--space-200)" aligny="center">
              <mui-heading size="3" level="none">${value}</mui-heading>
              <mui-body variant="${variant}">${change}</mui-body>
            </mui-h-stack>
          </mui-v-stack>
          <mui-v-stack slot="footer" space="var(--space-000)">
            <mui-rule
              direction="horizontal"
              length="100%">
            </mui-rule>
            <mui-link size="small" variant="tertiary" href="/markets" style="padding: var(--space-050);">${action}</mui-link>
          </mui-v-stack>
        </mui-market-sparkline>
      </mui-card-body>
    </mui-card>`;
  }

  typeExample(id, type, title, extra = "") {
    return `<mui-card>
      <mui-card-body size="small">
        <mui-market-sparkline id="${id}" type="${type}"${extra} label="${title} trend" attribution="none">
          <mui-v-stack slot="header" space="var(--space-000)" style="padding-block-end: var(--space-200);">
            <mui-heading size="4" level="none">${title}</mui-heading>
            <mui-body size="small" variant="secondary">Compact trend</mui-body>
          </mui-v-stack>
        </mui-market-sparkline>
      </mui-card-body>
    </mui-card>`;
  }

  typeCodeExample(id, type, title, extra = "") {
    return `&lt;mui-card&gt;&lt;mui-card-body size=&quot;small&quot;&gt;<br />
      &nbsp;&nbsp;&lt;mui-market-sparkline id=&quot;${id}&quot; type=&quot;${type}&quot;${extra} label=&quot;${title} trend&quot; attribution=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot; space=&quot;var(--space-000)&quot; style=&quot;padding-block-end: var(--space-200);&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;${title}&lt;/mui-heading&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;Compact trend&lt;/mui-body&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
      &nbsp;&nbsp;&lt;/mui-market-sparkline&gt;<br />
      &lt;/mui-card-body&gt;&lt;/mui-card&gt;`;
  }

  trendExample(id, trend, title, description) {
    return `<mui-card>
      <mui-card-body size="small">
        <mui-v-stack space="var(--space-200)">
          <mui-v-stack space="var(--space-000)">
            <mui-heading size="4" level="none">${title}</mui-heading>
            <mui-body size="small" variant="secondary">${description}</mui-body>
          </mui-v-stack>
          <mui-market-sparkline id="${id}" type="area" trend="${trend}" label="${title} market trend" height="10rem" attribution="none"></mui-market-sparkline>
        </mui-v-stack>
      </mui-card-body>
    </mui-card>`;
  }

  trendCodeExample(id, trend, title, description) {
    return `&lt;mui-card&gt;&lt;mui-card-body size=&quot;small&quot;&gt;<br />
      &nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-200)&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-000)&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;${title}&lt;/mui-heading&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;${description}&lt;/mui-body&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-market-sparkline id=&quot;${id}&quot; type=&quot;area&quot; trend=&quot;${trend}&quot; label=&quot;${title} market trend&quot; height=&quot;10rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-market-sparkline&gt;<br />
      &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
      &lt;/mui-card-body&gt;&lt;/mui-card&gt;`;
  }
}

customElements.define("story-market-sparkline", StoryMarketSparkline);
export { StoryMarketSparkline };
