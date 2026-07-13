import { getComponentDocs } from "../../../utils/story-data";

class storySlideFrame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("SlideFrame");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Slide Frame"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
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

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="secondary">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="secondary"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card id="header-hidden" title="${storyMeta["header-hidden"].title}" description="${storyMeta["header-hidden"].description}" usage="${storyMeta["header-hidden"].usage}">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-header scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="secondary">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-header scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="secondary"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card id="footer-hidden" title="${storyMeta["footer-hidden"].title}" description="${storyMeta["footer-hidden"].description}" usage="${storyMeta["footer-hidden"].usage}">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-footer scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="secondary">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." hide-footer scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="secondary"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card id="notes-hidden-in-fullscreen" title="${storyMeta["notes-hidden-in-fullscreen"].title}" description="${storyMeta["notes-hidden-in-fullscreen"].description}" usage="${storyMeta["notes-hidden-in-fullscreen"].usage}">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." notes-open scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="secondary">Core metrics and roadmap outcomes.</mui-body>
          ${quarterlyPageOne}
          ${quarterlyPageTwo}
          <mui-body slot="notes" size="small" variant="secondary">Speaker notes: these are visible in normal mode and hidden in fullscreen.</mui-body>
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." notes-open scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="secondary"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 1 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;!-- Page 2 --&gt;<br />
          &nbsp;&nbsp;&lt;mui-slide-section&gt;...&lt;/mui-slide-section&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="notes" size="small" variant="secondary"&gt;Speaker notes...&lt;/mui-body&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

            <story-card id="variant-plain" title="${storyMeta["variant-plain"].title}" description="${storyMeta["variant-plain"].description}" usage="${storyMeta["variant-plain"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

  }
}

customElements.define("story-slide-frame", storySlideFrame);
