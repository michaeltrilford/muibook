import { getComponentDocs } from "../../../utils/story-data";

class storySlideFrame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("SlideFrame");

    const styles = /*css*/ `
      :host { display: block; }
      .shell {
        width: 100%;
      }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-slide-section (recommended)",
        default: "(required)",
        description: "Slide pages. Prefer one mui-slide-section per page.",
      },
      {
        name: "mui-slide-section",
        type: "child component",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Composable page container for each slide section.",
      },
      {
        name: "title",
        type: "string",
        options: "{text}",
        default: "",
        description: "Built-in header title rendered as mui-heading.",
      },
      {
        name: "footer-text",
        type: "string",
        options: "{text}",
        default: "",
        description: "Built-in footer copy rendered as mui-body size=medium.",
      },
      {
        name: "slot=header",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Optional leading content beside title in header row.",
      },
      {
        name: "slot=header-after",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Optional trailing content in header row.",
      },
      {
        name: "slot=header-description",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Optional content line below header row.",
      },
      {
        name: "slot=footer",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Optional leading content beside footer-text in footer row.",
      },
      {
        name: "slot=footer-after",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Optional trailing content in footer row.",
      },
      {
        name: "slot=notes",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Optional notes region. Hidden by default until notes-open is enabled.",
      },
      {
        name: "ratio",
        type: "string",
        options: "16:9, 4:3, 3:2, 1:1, 9:16",
        default: "16:9",
        description: "Aspect ratio for the slide surface.",
      },
      {
        name: "padding",
        type: "string",
        options: "none, small, medium, large",
        default: "medium",
        description: "Inner surface padding.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, plain",
        default: "default",
        description: "Controls frame chrome (border/background/shadow).",
      },
      {
        name: "fullscreen",
        type: "boolean",
        options: "fullscreen",
        default: "",
        description: "Enable fullscreen presentation state.",
      },
      {
        name: "notes-open",
        type: "boolean",
        options: "notes-open",
        default: "",
        description: "Shows slot=notes when enabled.",
      },
      {
        name: "active-section",
        type: "number",
        options: "{index}",
        default: "0",
        description: "Current section index (0-based).",
      },
      {
        name: "hide-header",
        type: "boolean",
        options: "hide-header",
        default: "",
        description: "Hide header region and slotted header content.",
      },
      {
        name: "hide-footer",
        type: "boolean",
        options: "hide-footer",
        default: "",
        description: "Hide footer region and slotted footer content.",
      },
      {
        name: "scroll",
        type: "boolean",
        options: "scroll",
        default: "",
        description: "Opt in to surface scrolling when content overflows.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}"
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `,
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";
        return /*html*/ `
          <mui-accordion-block size="medium" heading="${prop.name}" ${isLastChild}>
            <story-type-slat
              slot="detail"
              ${prop.required ? "required" : ""}
              name="${prop.name}"
              type="${prop.type}"
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

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
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-slide-frame";<br>
          import "@muibook/components/mui-slide-section";<br>
        </mui-code>
      </spec-card>

      <props-card title="Slide Frame">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

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
        github="${data?.github || ""}"
        figma="${data?.figma || ""}"
        guides="${data?.guides || ""}"
        storybook="${data?.storybook || ""}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        ${stories}
      </story-template>
    `;

  }
}

customElements.define("story-slide-frame", storySlideFrame);
