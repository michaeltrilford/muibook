import { getComponentDocs } from "../../../utils/story-data";

const createPerformance = ({ start, drift, volatility, seed, count = 90 }) => {
  const data = [];
  const startTime = Date.UTC(2026, 0, 1);
  let value = start;
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };
  for (let index = 0; index < count; index += 1) {
    value = Math.max(1, value + drift + (random() - 0.5) * volatility);
    data.push({ time: new Date(startTime + index * 86_400_000).toISOString().slice(0, 10), value });
  }
  return data;
};

const assetSeries = [
  { id: "btc", label: "Bitcoin", data: createPerformance({ start: 94000, drift: 430, volatility: 4200, seed: 4 }) },
  { id: "eth", label: "Ethereum", data: createPerformance({ start: 3200, drift: 11, volatility: 180, seed: 12 }) },
  { id: "ndx", label: "Nasdaq 100", data: createPerformance({ start: 19500, drift: 34, volatility: 240, seed: 27 }) },
];

const forecastDates = Array.from({ length: 12 }, (_, index) =>
  new Date(Date.UTC(2026, index, 1)).toISOString().slice(0, 10),
);
const forecastSeries = [
  {
    id: "actual",
    label: "Actual revenue",
    data: forecastDates
      .slice(0, 8)
      .map((time, index) => ({ time, value: 8.4 + index * 0.42 + Math.sin(index) * 0.25 })),
  },
  {
    id: "forecast",
    label: "Forecast revenue",
    data: forecastDates.slice(7).map((time, index) => ({ time, value: 11.1 + index * 0.48 })),
  },
];

class StoryComparisonChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ComparisonChart");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Comparison Chart"></story-metadata-empty>`;
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
        imports='["@muibook/components/mui-comparison-chart"]'
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        <story-api-types tag="mui-comparison-chart" title="Comparison Chart"></story-api-types>

        <story-card id="indexed-performance" title="${storyMeta["indexed-performance"].title}" usage="${storyMeta["indexed-performance"].usage}">
          <mui-card slot="body">
            <mui-card-body size="none">
              <mui-comparison-chart id="assetComparison" mode="indexed" label="Three month asset performance" height="30rem" attribution="logo" interactive>
                <mui-h-stack slot="header" alignX="space-between" alignY="center" wrap>
                  <mui-v-stack space="var(--space-100)">
                    <mui-heading size="4" level="none">Three month asset performance</mui-heading>
                    <mui-body size="small" variant="secondary">Indexed to 100 at the start of the period</mui-body>
                  </mui-v-stack>
                  ${this.assetLegend()}
                </mui-h-stack>
              </mui-comparison-chart>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-comparison-chart id=&quot;assetComparison&quot; mode=&quot;indexed&quot; label=&quot;Three month asset performance&quot; height=&quot;30rem&quot; attribution=&quot;logo&quot; interactive&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;header&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot; wrap&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-100)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;Three month asset performance&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;Indexed to 100 at the start of the period&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-300)&quot; wrap&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;blue&quot;&gt;BTC&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Bitcoin&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;green&quot;&gt;ETH&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Ethereum&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;magenta&quot;&gt;NDX&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Nasdaq 100&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-comparison-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#assetComparison&quot;).series = assetSeries;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="actual-forecast" title="${storyMeta["actual-forecast"].title}" usage="${storyMeta["actual-forecast"].usage}">
          <mui-card slot="body">
            <mui-card-body size="none">
              <mui-comparison-chart id="forecastComparison" mode="absolute" value-format="currency" label="Actual and forecast revenue" height="26rem" attribution="none" interactive>
                <mui-h-stack slot="header" alignx="space-between" aligny="center" wrap>
                  <mui-v-stack space="var(--space-100)">
                    <mui-heading size="4" level="none">Actual and forecast revenue</mui-heading>
                    <mui-body size="small" variant="secondary">USD billions</mui-body>
                  </mui-v-stack>
                  <mui-h-stack space="var(--space-300)" wrap>
                    <mui-h-stack space="var(--space-100)" aligny="center"><mui-badge size="x-small" color="blue">Actual</mui-badge><mui-body size="x-small">Reported</mui-body></mui-h-stack>
                    <mui-h-stack space="var(--space-100)" aligny="center"><mui-badge size="x-small" color="green">Forecast</mui-badge><mui-body size="x-small">Projected</mui-body></mui-h-stack>
                  </mui-h-stack>
                </mui-h-stack>
              </mui-comparison-chart>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-comparison-chart id=&quot;forecastComparison&quot; mode=&quot;absolute&quot; value-format=&quot;currency&quot; label=&quot;Actual and forecast revenue&quot; height=&quot;26rem&quot; attribution=&quot;none&quot; interactive&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;header&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot; wrap&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-100)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;Actual and forecast revenue&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;USD billions&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-300)&quot; wrap&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;blue&quot;&gt;Actual&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Reported&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;green&quot;&gt;Forecast&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Projected&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-comparison-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#forecastComparison&quot;).series = forecastSeries;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="modes" title="${storyMeta.modes.title}" usage="${storyMeta.modes.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(18rem, 1fr))" space="var(--space-400)">
            <mui-card>
              <mui-card-body size="none">${this.modeExample("absoluteComparison", "absolute", "Absolute")}</mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">${this.modeExample("indexedComparison", "indexed", "Indexed")}</mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">${this.modeExample("percentComparison", "percent", "Percent")}</mui-card-body>
            </mui-card>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(18rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            ${this.modeCodeExample("absoluteComparison", "absolute", "Absolute")}<br />
            ${this.modeCodeExample("indexedComparison", "indexed", "Indexed")}<br />
            ${this.modeCodeExample("percentComparison", "percent", "Percent")}<br />
            &lt;/mui-grid&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#absoluteComparison&quot;).series = assetSeries;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#indexedComparison&quot;).series = assetSeries;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#percentComparison&quot;).series = assetSeries;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            <mui-card>
              <mui-card-body size="none">
                <mui-comparison-chart label="Loading comparison" loading height="14rem" attribution="none"></mui-comparison-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-comparison-chart label="Empty comparison" height="14rem" attribution="none"></mui-comparison-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-comparison-chart label="Unavailable comparison" error="Data could not be loaded" height="14rem" attribution="none"></mui-comparison-chart>
              </mui-card-body>
            </mui-card>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(16rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-comparison-chart label=&quot;Loading comparison&quot; loading height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-comparison-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br />
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-comparison-chart label=&quot;Empty comparison&quot; height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-comparison-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br />
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-comparison-chart label=&quot;Unavailable comparison&quot; error=&quot;Data could not be loaded&quot; height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-comparison-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br />
            &lt;/mui-grid&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    this.shadowRoot.querySelector("#assetComparison").series = assetSeries;
    this.shadowRoot.querySelector("#forecastComparison").series = forecastSeries;
    this.shadowRoot.querySelector("#absoluteComparison").series = assetSeries;
    this.shadowRoot.querySelector("#indexedComparison").series = assetSeries;
    this.shadowRoot.querySelector("#percentComparison").series = assetSeries;
  }

  assetLegend() {
    return `<mui-h-stack space="var(--space-300)" wrap><mui-h-stack space="var(--space-100)" aligny="center"><mui-badge size="x-small" color="blue">BTC</mui-badge><mui-body size="x-small">Bitcoin</mui-body></mui-h-stack><mui-h-stack space="var(--space-100)" aligny="center"><mui-badge size="x-small" color="green">ETH</mui-badge><mui-body size="x-small">Ethereum</mui-body></mui-h-stack><mui-h-stack space="var(--space-100)" aligny="center"><mui-badge size="x-small" color="magenta">NDX</mui-badge><mui-body size="x-small">Nasdaq 100</mui-body></mui-h-stack></mui-h-stack>`;
  }

  modeExample(id, mode, title) {
    return `
      <mui-comparison-chart id="${id}" mode="${mode}" label="${title} asset comparison" scale="time" height="16rem" attribution="none">
        <mui-h-stack slot="header" alignx="space-between" aligny="center" wrap>
          <mui-v-stack space="var(--space-000)">
            <mui-heading size="4" level="none">${title}</mui-heading>
            <mui-body size="small" variant="secondary">Three month view</mui-body>
          </mui-v-stack>
          ${this.assetLegend()}
        </mui-h-stack>
      </mui-comparison-chart>`;
  }

  modeCodeExample(id, mode, title) {
    return `&lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&lt;mui-comparison-chart id=&quot;${id}&quot; mode=&quot;${mode}&quot; label=&quot;${title} asset comparison&quot; scale=&quot;time&quot; height=&quot;16rem&quot; attribution=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;header&quot; alignX=&quot;space-between&quot; alignY=&quot;center&quot; wrap&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-000)&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;${title}&lt;/mui-heading&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot; variant=&quot;secondary&quot;&gt;Three month view&lt;/mui-body&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-300)&quot; wrap&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;blue&quot;&gt;BTC&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Bitcoin&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;green&quot;&gt;ETH&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Ethereum&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;&lt;mui-badge size=&quot;x-small&quot; color=&quot;magenta&quot;&gt;NDX&lt;/mui-badge&gt;&lt;mui-body size=&quot;x-small&quot;&gt;Nasdaq 100&lt;/mui-body&gt;&lt;/mui-h-stack&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
      &nbsp;&nbsp;&lt;/mui-comparison-chart&gt;<br />
      &lt;/mui-card-body&gt;&lt;/mui-card&gt;`;
  }
}

customElements.define("story-comparison-chart", StoryComparisonChart);
export { StoryComparisonChart };
