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
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slide sections and any composable content.",
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
        description: "Optional notes region. In present mode it is hidden until notes-open is enabled.",
      },
      {
        name: "ratio",
        type: "string",
        options: "16:9, 4:3, 1:1, custom",
        default: "16:9",
        description: "Aspect ratio for the slide surface.",
      },
      {
        name: "ratio-width",
        type: "number",
        options: "{number}",
        default: "",
        description: "Used with ratio='custom'.",
      },
      {
        name: "ratio-height",
        type: "number",
        options: "{number}",
        default: "",
        description: "Used with ratio='custom'.",
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
        name: "radius",
        type: "string",
        options: "default, none, small, medium, large",
        default: "default",
        description: "Controls frame corner radius.",
      },
      {
        name: "present",
        type: "boolean",
        options: "present",
        default: "",
        description: "Collapse non-active sections and hide header/footer regions.",
      },
      {
        name: "notes-open",
        type: "boolean",
        options: "notes-open",
        default: "",
        description: "In present mode, shows slot=notes when enabled.",
      },
      {
        name: "active-section",
        type: "number",
        options: "{index}",
        default: "0",
        description: "Current section index in present mode.",
      },
      {
        name: "hide-counter",
        type: "boolean",
        options: "hide-counter",
        default: "",
        description: "Hide built-in footer section counter.",
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-slide-frame";<br>
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

      <story-card title="Default">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-body slot="header-description" size="small" variant="optional">Core metrics and roadmap outcomes.</mui-body>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          ${quarterlyFollowupContent}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" title="Quarterly Product Review" footer-text="Q1 snapshot: growth, adoption, and retention metrics." scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header-description" size="small" variant="optional"&gt;Core metrics and roadmap outcomes.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;!-- compose with cards/stacks/grid as needed --&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Custom Ratio">
        <mui-slide-frame class="shell" slot="body" ratio="custom" ratio-width="3" ratio-height="2" padding="large" scroll title="Quarterly Product Review" footer-text="Custom ratio 3:2 with scrolling enabled.">
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          ${quarterlyFollowupContent}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="custom" ratio-width="3" ratio-height="2" padding="large" scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Variant: Plain">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" variant="plain" padding="small" title="Quarterly Product Review" footer-text="Plain variant." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          ${quarterlyFollowupContent}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame variant="plain"&gt;...&lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Radius: None">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" radius="none" padding="small" title="Quarterly Product Review" footer-text="Radius none." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          ${quarterlyFollowupContent}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame radius="none"&gt;...&lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Radius: Small">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" radius="small" padding="small" title="Quarterly Product Review" footer-text="Radius small." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          ${quarterlyFollowupContent}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame radius="small"&gt;...&lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Radius: Large">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" radius="large" padding="small" title="Quarterly Product Review" footer-text="Radius large." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          ${quarterlyFollowupContent}
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame radius="large"&gt;...&lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Image Composition">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" padding="medium" title="Quarterly Product Review" footer-text="Image composition." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          <mui-v-stack space="var(--space-300)">
            <mui-heading size="4" level="2">Detail Slide</mui-heading>
            <mui-image crop height="20rem" fit="cover" position="center center"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" alt="Detail image" /></mui-image>
          </mui-v-stack>
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" padding="medium" title="Quarterly Product Review" footer-text="Image composition." scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" variant="neutral" size="small"&gt;Q1&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-image crop height="20rem" fit="cover" position="center center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;img src="..." alt="Presentation image" /&gt;<br />
          &nbsp;&nbsp;&lt;/mui-image&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Image Cropped Centered Overflow">
        <mui-slide-frame class="shell" slot="body" ratio="16:9" padding="medium" title="Quarterly Product Review" footer-text="Cropped image with overflow scrolling enabled." scroll>
          <mui-badge slot="header" variant="neutral" size="small">Q1</mui-badge>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            <mui-image crop height="20rem" fit="cover" position="center center">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" alt="Centered crop image" />
            </mui-image>
          </mui-v-stack>
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="16:9" scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-image crop height="20rem" fit="cover" position="center center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;img src="..." alt="Centered crop image" /&gt;<br />
          &nbsp;&nbsp;&lt;/mui-image&gt;<br />
          &lt;/mui-slide-frame&gt;
        </story-code-block>
      </story-card>

      <story-card title="Image: Header + Footer">

        <mui-slide-frame class="shell" slot="body" ratio="4:3" title="Quarterly Product Review" footer-text="Footer metadata and source notes." scroll>
          <mui-badge slot="header" size="large" variant="neutral">Cover</mui-badge>
          <mui-button slot="header-after" size="x-small" variant="tertiary">Sources</mui-button>
          <mui-v-stack space="var(--space-400)" alignx="stretch">
            ${quarterlyBaseContent}
          </mui-v-stack>
          <mui-v-stack space="var(--space-300)">
            <mui-heading size="4" level="2">Follow-up Highlights</mui-heading>
            <mui-body size="small">Second page to validate slide navigation in every story.</mui-body>
          </mui-v-stack>
          <mui-link slot="footer-after" size="x-small" variant="tertiary" weight="regular" href="#">Open source</mui-link>
        </mui-slide-frame>
        <story-code-block slot="footer" scrollable>
          &lt;mui-slide-frame ratio="4:3" title="Quarterly Product Review" footer-text="Footer metadata and source notes." scroll&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="header" size="large" variant="neutral"&gt;Cover&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="header-after" size="x-small" variant="tertiary"&gt;Sources&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-image&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;img src="..." alt="Cover image" /&gt;<br />
          &nbsp;&nbsp;&lt;/mui-image&gt;<br />
          &nbsp;&nbsp;&lt;mui-link slot="footer-after" size="x-small" variant="tertiary" weight="regular" href="#"&gt;Open source&lt;/mui-link&gt;<br />
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

    const frame = this.shadowRoot.querySelector("#slideFramePresentDemo");
    const updateStatus = () => {
      // Counter is now built into mui-slide-frame footer.
    };

    this.shadowRoot.querySelector("#slideFrameAddSectionBtn")?.addEventListener("click", () => {
      frame?.addSection?.(`Section ${((frame?.children?.length || 0) + 1).toString()}: New`);
      updateStatus();
    });
    this.shadowRoot.querySelector("#slideFramePrevSectionBtn")?.addEventListener("click", () => {
      frame?.prevSection?.();
      updateStatus();
    });
    this.shadowRoot.querySelector("#slideFrameNextSectionBtn")?.addEventListener("click", () => {
      frame?.nextSection?.();
      updateStatus();
    });
    this.shadowRoot.querySelector("#slideFrameTogglePresentBtn")?.addEventListener("click", () => {
      if (!frame) return;
      if (frame.hasAttribute("present")) frame.removeAttribute("present");
      else frame.setAttribute("present", "");
    });
    frame?.addEventListener?.("section-change", updateStatus);
    frame?.addEventListener?.("section-add", updateStatus);
    updateStatus();
  }
}

customElements.define("story-slide-frame", storySlideFrame);
