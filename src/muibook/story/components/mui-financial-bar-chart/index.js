import { getComponentDocs } from "../../../utils/story-data";

const inflationData = [2.4, 2.7, 2.7, 2.9, 3.0, 2.7, 2.7, 2.4, 2.4, 3.3, 3.8, 4.2].map((value, index) => ({
  time: new Date(Date.UTC(2025, 4 + index, 1)).toISOString().slice(0, 10),
  value,
}));

const cashFlowData = [4.2, -2.1, 3.6, 5.4, -1.8, -3.2, 2.9, 4.8, -0.9, 6.1, 3.2, -2.4].map((value, index) => ({
  time: new Date(Date.UTC(2025, index, 1)).toISOString().slice(0, 10),
  value,
}));

const volumeData = [18, 22, 15, 31, 28, 42, 37, 25, 48, 53, 39, 61].map((value, index) => ({
  time: new Date(Date.UTC(2026, 0, index + 1)).toISOString().slice(0, 10),
  value: value * 1_000_000,
}));

const positiveBarData = volumeData.map((item) => ({ ...item, value: item.value / 1_000_000 }));
const negativeBarData = positiveBarData.map((item) => ({ ...item, value: -item.value }));

class StoryFinancialBarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FinancialBarChart");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Financial Bar Chart"></story-metadata-empty>`;
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
        imports='["@muibook/components/mui-financial-bar-chart"]'
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        <story-api-types tag="mui-financial-bar-chart" title="Financial Bar Chart"></story-api-types>

        <story-card id="economic-indicator" title="${storyMeta["economic-indicator"].title}" usage="${storyMeta["economic-indicator"].usage}">
          <mui-card slot="body">
            <mui-card-body size="none">
              <mui-financial-bar-chart id="inflationChart" label="US annual inflation rate" value-format="percent" height="24rem" attribution="logo" interactive>

              <mui-v-stack slot="header" space="var(--space-000)">
                <mui-h-stack space="var(--space-100)" aligny="center">
                  <mui-heading size="4" level="none">US annual inflation rate</mui-heading>
                  <mui-badge size="x-small">USIRYY</mui-badge>
                </mui-h-stack>
                <mui-h-stack space="var(--space-600)" wrap style="margin-top: var(--space-500);">
                  <mui-v-stack space="var(--space-000)"><mui-body size="x-small" variant="secondary">Actual</mui-body><mui-heading size="4" level="none">4.2%</mui-heading></mui-v-stack>
                  <mui-v-stack space="var(--space-000)"><mui-body size="x-small" variant="secondary">Forecast</mui-body><mui-heading size="4" level="none">4.0%</mui-heading></mui-v-stack>
                  <mui-v-stack space="var(--space-000)"><mui-body size="x-small" variant="secondary">Next release</mui-body><mui-heading size="4" level="none">30 July 2026</mui-heading></mui-v-stack>
                </mui-h-stack>
              </mui-v-stack>

              </mui-financial-bar-chart>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-financial-bar-chart<br />
            &nbsp;&nbsp;id=&quot;inflationChart&quot;<br />
            &nbsp;&nbsp;label=&quot;US annual inflation rate&quot;<br />
            &nbsp;&nbsp;value-format=&quot;percent&quot;<br />
            &nbsp;&nbsp;height=&quot;24rem&quot;<br />
            &nbsp;&nbsp;attribution=&quot;logo&quot;<br />
            &nbsp;&nbsp;interactive<br />
            &gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space=&quot;var(--space-100)&quot; alignY=&quot;center&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;US annual inflation rate&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge size=&quot;x-small&quot;&gt;USIRYY&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-100)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;4.2%&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;Latest monthly release&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;footer&quot; space=&quot;var(--space-600)&quot; wrap&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-100)&quot;&gt;&lt;mui-body size=&quot;x-small&quot; variant=&quot;secondary&quot;&gt;Actual&lt;/mui-body&gt;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;4.2%&lt;/mui-heading&gt;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-100)&quot;&gt;&lt;mui-body size=&quot;x-small&quot; variant=&quot;secondary&quot;&gt;Forecast&lt;/mui-body&gt;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;4.0%&lt;/mui-heading&gt;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-100)&quot;&gt;&lt;mui-body size=&quot;x-small&quot; variant=&quot;secondary&quot;&gt;Next release&lt;/mui-body&gt;&lt;mui-heading size=&quot;3&quot; level=&quot;none&quot;&gt;30 July 2026&lt;/mui-heading&gt;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-financial-bar-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#inflationChart&quot;).data = inflationData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="directional" title="${storyMeta.directional.title}" usage="${storyMeta.directional.usage}">
          <mui-card slot="body">
            <mui-card-body size="none">
              <mui-financial-bar-chart id="cashFlowChart" variant="directional" label="Monthly net cash flow" value-format="currency" baseline="0" attribution="none" interactive>
            <mui-v-stack slot="header" space="var(--space-100)">
              <mui-heading size="4" level="none">Monthly net cash flow</mui-heading>
              <mui-body size="x-small" variant="secondary">USD, monthly net movement</mui-body>
            </mui-v-stack>
              </mui-financial-bar-chart>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-financial-bar-chart id=&quot;cashFlowChart&quot; variant=&quot;directional&quot; label=&quot;Monthly net cash flow&quot; value-format=&quot;currency&quot; baseline=&quot;0&quot; attribution=&quot;none&quot; interactive&gt;<br />
            &nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot; space=&quot;var(--space-100)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;Monthly net cash flow&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot; variant=&quot;secondary&quot;&gt;USD, monthly net movement&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-financial-bar-chart&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#cashFlowChart&quot;).data = cashFlowData.map((item) =&gt; ({<br />
            &nbsp;&nbsp;&nbsp;&nbsp;...item,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;value: item.value * 1_000_000,<br />
            &nbsp;&nbsp;}));<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="colour-treatments" title="${storyMeta["colour-treatments"].title}" usage="${storyMeta["colour-treatments"].usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            ${this.colourExample("neutralBarChart", "neutral", "Neutral", "Values without directional status")}
            ${this.colourExample("positiveBarChart", "directional", "Positive", "Values above the baseline")}
            ${this.colourExample("negativeBarChart", "directional", "Negative", "Values below the baseline")}
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(16rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            ${this.colourCodeExample("neutralBarChart", "neutral", "Neutral", "Values without directional status")}<br />
            ${this.colourCodeExample("positiveBarChart", "directional", "Positive", "Values above the baseline")}<br />
            ${this.colourCodeExample("negativeBarChart", "directional", "Negative", "Values below the baseline")}<br />
            &lt;/mui-grid&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#neutralBarChart&quot;).data = positiveBarData;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#positiveBarChart&quot;).data = positiveBarData;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#negativeBarChart&quot;).data = negativeBarData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="scale" title="${storyMeta.scale.title}" usage="${storyMeta.scale.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(18rem, 1fr))" space="var(--space-400)">
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-bar-chart id="volumeBoth" label="Trading volume with both scales" value-format="volume" scale="both" height="14rem" attribution="none">
                  <mui-v-stack slot="header" space="var(--space-000)">
                    <mui-heading size="4" level="none">Both scales</mui-heading>
                    <mui-body size="small" variant="secondary">Time and value</mui-body>
                  </mui-v-stack>
                </mui-financial-bar-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-bar-chart id="volumeTime" label="Trading volume with time scale" value-format="volume" scale="time" height="14rem" attribution="none">
                  <mui-v-stack slot="header" space="var(--space-000)">
                    <mui-heading size="4" level="none">Time scale</mui-heading>
                    <mui-body size="small" variant="secondary">Time only</mui-body>
                  </mui-v-stack>
                </mui-financial-bar-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-bar-chart id="volumeNone" label="Trading volume without scales" value-format="volume" scale="none" height="14rem" attribution="none">
                  <mui-v-stack slot="header" space="var(--space-000)">
                    <mui-heading size="4" level="none">No scales</mui-heading>
                    <mui-body size="small" variant="secondary">Trend only</mui-body>
                  </mui-v-stack>
                </mui-financial-bar-chart>
              </mui-card-body>
            </mui-card>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(18rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            ${this.scaleCodeExample("volumeBoth", "Trading volume with both scales", "both", "Both scales", "Time and value")}<br />
            ${this.scaleCodeExample("volumeTime", "Trading volume with time scale", "time", "Time scale", "Time only")}<br />
            ${this.scaleCodeExample("volumeNone", "Trading volume without scales", "none", "No scales", "Trend only")}<br />
            &lt;/mui-grid&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#volumeBoth&quot;).data = volumeData;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#volumeTime&quot;).data = volumeData;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#volumeNone&quot;).data = volumeData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-bar-chart label="Loading indicator" loading height="14rem" attribution="none"></mui-financial-bar-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-bar-chart label="Empty indicator" height="14rem" attribution="none"></mui-financial-bar-chart>
              </mui-card-body>
            </mui-card>
            <mui-card>
              <mui-card-body size="none">
                <mui-financial-bar-chart label="Unavailable indicator" error="Data could not be loaded" height="14rem" attribution="none"></mui-financial-bar-chart>
              </mui-card-body>
            </mui-card>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-grid col=&quot;repeat(auto-fit, minmax(16rem, 1fr))&quot; space=&quot;var(--space-400)&quot;&gt;<br />
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-financial-bar-chart label=&quot;Loading indicator&quot; loading height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br />
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-financial-bar-chart label=&quot;Empty indicator&quot; height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br />
            &lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-financial-bar-chart label=&quot;Unavailable indicator&quot; error=&quot;Data could not be loaded&quot; height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;/mui-card-body&gt;&lt;/mui-card&gt;<br />
            &lt;/mui-grid&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    this.shadowRoot.querySelector("#inflationChart").data = inflationData;
    this.shadowRoot.querySelector("#cashFlowChart").data = cashFlowData.map((item) => ({
      ...item,
      value: item.value * 1_000_000,
    }));
    this.shadowRoot.querySelector("#neutralBarChart").data = positiveBarData;
    this.shadowRoot.querySelector("#positiveBarChart").data = positiveBarData;
    this.shadowRoot.querySelector("#negativeBarChart").data = negativeBarData;
    this.shadowRoot.querySelector("#volumeBoth").data = volumeData;
    this.shadowRoot.querySelector("#volumeTime").data = volumeData;
    this.shadowRoot.querySelector("#volumeNone").data = volumeData;
  }

  scaleCodeExample(id, label, scale, title, description) {
    return `&lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&lt;mui-financial-bar-chart id=&quot;${id}&quot; label=&quot;${label}&quot; value-format=&quot;volume&quot; scale=&quot;${scale}&quot; height=&quot;14rem&quot; attribution=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot; space=&quot;var(--space-000)&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;${title}&lt;/mui-heading&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;${description}&lt;/mui-body&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
      &nbsp;&nbsp;&lt;/mui-financial-bar-chart&gt;<br />
      &lt;/mui-card-body&gt;&lt;/mui-card&gt;`;
  }

  colourExample(id, variant, title, description) {
    return `<mui-card>
      <mui-card-body size="none">
        <mui-financial-bar-chart id="${id}" variant="${variant}" baseline="0" label="${title} bar treatment" scale="both" height="12rem" attribution="none">
          <mui-v-stack slot="header" space="var(--space-050)">
            <mui-heading size="4" level="none">${title}</mui-heading>
            <mui-body size="small" variant="secondary">${description}</mui-body>
          </mui-v-stack>
        </mui-financial-bar-chart>
      </mui-card-body>
    </mui-card>`;
  }

  colourCodeExample(id, variant, title, description) {
    return `&lt;mui-card&gt;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&lt;mui-financial-bar-chart id=&quot;${id}&quot; variant=&quot;${variant}&quot; baseline=&quot;0&quot; label=&quot;${title} bar treatment&quot; scale=&quot;both&quot; height=&quot;12rem&quot; attribution=&quot;none&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot; space=&quot;var(--space-050)&quot;&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;4&quot; level=&quot;none&quot;&gt;${title}&lt;/mui-heading&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; variant=&quot;secondary&quot;&gt;${description}&lt;/mui-body&gt;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
      &nbsp;&nbsp;&lt;/mui-financial-bar-chart&gt;<br />
      &lt;/mui-card-body&gt;&lt;/mui-card&gt;`;
  }
}

customElements.define("story-financial-bar-chart", StoryFinancialBarChart);
export { StoryFinancialBarChart };
