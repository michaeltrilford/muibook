import { getComponentDocs } from "../../../utils/story-data";

class storySlideFrame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("SlideFrame");
    const attrsReference = JSON.stringify([
      {
        component: "mui-slide-frame",
        parentAttrs: ["has-header", "has-footer", "has-notes", "notes-visible", "has-chrome"],
        childAttrs: ["data-slide-section", "slide-active", "slide-hidden"],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }
      .shell {
        width: 100%;
      }
    `;

    const quarterlyBaseContent = /*html*/ `
      <mui-grid alignx="stretch" col="1fr 1fr 1fr 1fr" space="var(--space-500)">
        <mui-card>
          <mui-card-body>
            <mui-v-stack space="var(--space-200)" alignx="stretch">
              <mui-body size="small">MRR Growth</mui-body>
              <mui-heading level="2" size="2">+18.4%</mui-heading>
            </mui-v-stack>
          </mui-card-body>
        </mui-card>
        <mui-card>
          <mui-card-body>
            <mui-v-stack space="var(--space-200)" alignx="stretch">
              <mui-body size="small">Active Teams</mui-body>
              <mui-heading level="2" size="2">1,284</mui-heading>
            </mui-v-stack>
          </mui-card-body>
        </mui-card>
        <mui-card>
          <mui-card-body>
            <mui-v-stack space="var(--space-200)" alignx="stretch">
              <mui-body size="small">NPS</mui-body>
              <mui-heading level="2" size="2">64</mui-heading>
            </mui-v-stack>
          </mui-card-body>
        </mui-card>
        <mui-card>
          <mui-card-body>
            <mui-v-stack space="var(--space-200)" alignx="stretch">
              <mui-body size="small">Churn</mui-body>
              <mui-heading level="2" size="2">2.1%</mui-heading>
            </mui-v-stack>
          </mui-card-body>
        </mui-card>
      </mui-grid>
      <mui-quote style="max-width: 45ch; text-wrap: pretty;" size="2" level="2">Muibook helped our team ship 2x faster with cleaner UI decisions.</mui-quote>
      <mui-image crop height="20rem" fit="cover" position="center center">
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" alt="Cover image" />
      </mui-image>
    `;
    const quarterlyFollowupContent = /*html*/ `
      <mui-v-stack space="var(--space-400)" alignx="stretch">
        <mui-heading level="2" size="2">Q2 Priorities</mui-heading>
        <mui-grid alignx="stretch" col="1fr 1fr" space="var(--space-400)">
          <mui-card><mui-card-body>Expand self-serve onboarding</mui-card-body></mui-card>
          <mui-card><mui-card-body>Reduce time-to-value under 10 minutes</mui-card-body></mui-card>
        </mui-grid>
      </mui-v-stack>
    `;
    const quarterlyPageOne = /*html*/ `
      <mui-slide-section>
        <mui-v-stack space="var(--space-400)" alignx="stretch">
          ${quarterlyBaseContent}
        </mui-v-stack>
      </mui-slide-section>
    `;
    const quarterlyPageTwo = /*html*/ `
      <mui-slide-section>
        ${quarterlyFollowupContent}
      </mui-slide-section>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-slide-frame" title="Slide Frame"></story-api-types>

      <story-card
        title="Default"
        usage="Each mui-slide-section in the default slot is a slide section/page.|||Use one mui-slide-section per page for clean composition.|||Use active-section (0-based) to control which page is visible.">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="optional">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="optional"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Header Hidden"
        usage="Use hide-header to suppress the header row while preserving slide navigation and footer metadata.">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-header scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="optional">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-header scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="optional"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Footer Hidden"
        usage="Use hide-footer to suppress footer content and counter together.">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-footer scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="optional">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-footer scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="optional"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Notes Hidden in Fullscreen"
        usage="Notes can be open in normal mode for review.|||When entering fullscreen, notes are intentionally hidden so presentation layout stays stable.">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." notes-open scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="optional">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
          <mui-body slot="notes" size="small" variant="optional">Speaker notes: these are visible in normal mode and hidden in fullscreen.</mui-body>
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." notes-open scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="optional"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="notes" size="small" variant="optional"&gt;Speaker notes...&lt;/mui-body&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

            <story-card title="Variant: Plain">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" variant="plain" padding="small" title="Quarterly Product Review" footer-text="Plain variant." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame variant="plain"&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

                      `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Slide Frame"}"
        description="${data?.description || ""}"
        attrs-reference='${attrsReference}'
        github="${data?.github || ""}"
        figma="${data?.figma || ""}"
        guides="${data?.guides || ""}"
        storybook="${data?.storybook || ""}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      
        imports='["@muibook/components/mui-slide-frame", "@muibook/components/mui-slide-section"]'>
        ${stories}
      </story-template>
    `;

  }
}

customElements.define("story-slide-frame", storySlideFrame);
