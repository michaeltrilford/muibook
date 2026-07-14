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
        imports='["@muibook/components/mui-financial-bar-chart"]'
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        <story-api-types tag="mui-financial-bar-chart" title="Financial Bar Chart"></story-api-types>

        <story-card id="economic-indicator" title="${storyMeta["economic-indicator"].title}" usage="${storyMeta["economic-indicator"].usage}">
          <mui-financial-bar-chart slot="body" id="inflationChart" label="US annual inflation rate" value-format="percent" height="24rem" interactive>
            <mui-v-stack slot="header" space="var(--space-100)">
              <mui-h-stack space="var(--space-100)" aligny="center">
                <mui-body weight="bold">US annual inflation rate</mui-body>
                <mui-badge size="x-small">USIRYY</mui-badge>
              </mui-h-stack>
              <mui-body size="large" weight="bold">4.2%</mui-body>
              <mui-body size="x-small" variant="secondary">Latest monthly release</mui-body>
            </mui-v-stack>
            <mui-h-stack slot="footer" space="var(--space-600)" wrap>
              <mui-v-stack space="var(--space-050)"><mui-body size="x-small" variant="secondary">Actual</mui-body><mui-body weight="bold">4.2%</mui-body></mui-v-stack>
              <mui-v-stack space="var(--space-050)"><mui-body size="x-small" variant="secondary">Forecast</mui-body><mui-body weight="bold">4.0%</mui-body></mui-v-stack>
              <mui-v-stack space="var(--space-050)"><mui-body size="x-small" variant="secondary">Next release</mui-body><mui-body weight="bold">30 July 2026</mui-body></mui-v-stack>
            </mui-h-stack>
          </mui-financial-bar-chart>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-bar-chart<br />
            &nbsp;&nbsp;id=&quot;inflationChart&quot;<br />
            &nbsp;&nbsp;label=&quot;US annual inflation rate&quot;<br />
            &nbsp;&nbsp;value-format=&quot;percent&quot;<br />
            &nbsp;&nbsp;interactive<br />
            &gt;<br />
            &nbsp;&nbsp;&lt;mui-v-stack slot=&quot;header&quot;&gt;...&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;mui-h-stack slot=&quot;footer&quot;&gt;...&lt;/mui-h-stack&gt;<br />
            &lt;/mui-financial-bar-chart&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;document.querySelector(&quot;#inflationChart&quot;).data = indicatorData;<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <story-card id="directional" title="${storyMeta.directional.title}" usage="${storyMeta.directional.usage}">
          <mui-financial-bar-chart slot="body" id="cashFlowChart" variant="directional" label="Monthly net cash flow" value-format="currency" baseline="0" interactive>
            <mui-body slot="header" weight="bold">Monthly net cash flow</mui-body>
          </mui-financial-bar-chart>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-bar-chart variant=&quot;directional&quot; baseline=&quot;0&quot; value-format=&quot;currency&quot; label=&quot;Monthly net cash flow&quot;&gt;&lt;/mui-financial-bar-chart&gt;
          </story-code-block>
        </story-card>

        <story-card id="scale" title="${storyMeta.scale.title}" usage="${storyMeta.scale.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(18rem, 1fr))" space="var(--space-400)">
            <mui-financial-bar-chart id="volumeBoth" label="Trading volume with both scales" value-format="volume" scale="both" height="14rem"><mui-body slot="header" size="small" weight="bold">Both scales</mui-body></mui-financial-bar-chart>
            <mui-financial-bar-chart id="volumeTime" label="Trading volume with time scale" value-format="volume" scale="time" height="14rem"><mui-body slot="header" size="small" weight="bold">Time scale</mui-body></mui-financial-bar-chart>
            <mui-financial-bar-chart id="volumeNone" label="Trading volume without scales" value-format="volume" scale="none" height="14rem"><mui-body slot="header" size="small" weight="bold">No scales</mui-body></mui-financial-bar-chart>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-bar-chart scale=&quot;both&quot; value-format=&quot;volume&quot;&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;mui-financial-bar-chart scale=&quot;time&quot; value-format=&quot;volume&quot;&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;mui-financial-bar-chart scale=&quot;none&quot; value-format=&quot;volume&quot;&gt;&lt;/mui-financial-bar-chart&gt;
          </story-code-block>
        </story-card>

        <story-card id="states" title="${storyMeta.states.title}" usage="${storyMeta.states.usage}">
          <mui-grid slot="body" col="repeat(auto-fit, minmax(16rem, 1fr))" space="var(--space-400)">
            <mui-financial-bar-chart label="Loading indicator" loading height="14rem"></mui-financial-bar-chart>
            <mui-financial-bar-chart label="Empty indicator" height="14rem"></mui-financial-bar-chart>
            <mui-financial-bar-chart label="Unavailable indicator" error="Indicator data could not be loaded" height="14rem"></mui-financial-bar-chart>
          </mui-grid>
          <story-code-block slot="footer" scrollable>
            &lt;mui-financial-bar-chart label=&quot;Loading indicator&quot; loading&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;mui-financial-bar-chart label=&quot;Empty indicator&quot;&gt;&lt;/mui-financial-bar-chart&gt;<br />
            &lt;mui-financial-bar-chart label=&quot;Unavailable indicator&quot; error=&quot;Indicator data could not be loaded&quot;&gt;&lt;/mui-financial-bar-chart&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    this.shadowRoot.querySelector("#inflationChart").data = inflationData;
    this.shadowRoot.querySelector("#cashFlowChart").data = cashFlowData.map((item) => ({ ...item, value: item.value * 1_000_000 }));
    this.shadowRoot.querySelector("#volumeBoth").data = volumeData;
    this.shadowRoot.querySelector("#volumeTime").data = volumeData;
    this.shadowRoot.querySelector("#volumeNone").data = volumeData;
  }
}

customElements.define("story-financial-bar-chart", StoryFinancialBarChart);
export { StoryFinancialBarChart };
