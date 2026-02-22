import { getComponentDocs } from "../../../utils/story-data";

class storyBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Body");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Content for the body element.",
      },
      {
        name: "slot=&#8220;before&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name], mui-badge",
        default: "",
        description: "Places content before the body text.",
      },
      {
        name: "slot=&#8220;after&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name], mui-badge",
        default: "",
        description: "Places content after the body text.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Set the size of the body text.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, optional, success, warning, error",
        default: "default",
        description: "Set the mood of the text for feedback states.",
      },
      {
        name: "weight",
        type: "string",
        options: "regular, medium, bold",
        default: "regular",
        description: "Set the weight of the body text.",
      },
      {
        name: "style",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use styles to add layout based CSS to the host element.",
      },
      {
        name: "class",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
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
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="medium" 
            heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
            ${isLastChild}>
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

    const stories = /*html*/ `
          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-body";<br>
            </mui-code>
          </spec-card>

          <props-card title="Body">
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

          <div slot="body">
            <mui-body>Risus Mollis Dapibus</mui-body>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-body&gt; ... &lt;/mui-body&gt;
          </story-code-block>

        </story-card>

        <story-card title="Sizes">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4">X-Small</mui-heading>
                  <mui-body size="x-small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Small</mui-heading>
                  <mui-body size="small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Medium</mui-heading>
                  <mui-body size="medium">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Large</mui-heading>
                  <mui-body size="large">Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body size="x-small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="medium"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="large"&gt; ... &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Variants">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4">Optional</mui-heading>
                  <mui-body variant="optional">Risus Mollis Dapibus</mui-body>
                  <mui-body>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Success</mui-heading>
                  <mui-body variant="success">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Warning</mui-heading>
                  <mui-body variant="warning">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Error</mui-heading>
                  <mui-body variant="error">Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body variant="optional"&gt; ... &lt;/mui-body&gt;
              <br />
               &lt;mui-body variant="success"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="warning"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="error"&gt; ... &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Before and After Slots" description="Compose icons and inline helpers without part-selector styling.">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">X-Small</mui-heading>
                  <mui-body size="x-small" variant="success"><mui-icon-check slot="before"></mui-icon-check>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Small</mui-heading>
                  <mui-body size="small" variant="warning"><mui-icon-warning slot="before"></mui-icon-warning>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Medium</mui-heading>
                  <mui-body size="medium" variant="error"><mui-icon-attention slot="before"></mui-icon-attention>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Large (After Slot)</mui-heading>
                  <mui-body size="large">Risus Mollis Dapibus<mui-icon-right-chevron slot="after"></mui-icon-right-chevron></mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>
              &lt;mui-body size="x-small" variant="success"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-check slot=&quot;before&quot;&gt;&lt;/mui-icon-check&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br />
              <br>
              &lt;mui-body size="small" variant="warning"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-warning slot=&quot;before&quot;&gt;&lt;/mui-icon-warning&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br />
              &lt;mui-body size="medium" variant="error"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-attention slot=&quot;before&quot;&gt;&lt;/mui-icon-attention&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br />
              &lt;mui-body size="large"&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &nbsp;&nbsp;&lt;mui-icon-right-chevron slot=&quot;after&quot;&gt;&lt;/mui-icon-right-chevron&gt;
              <br>
              &lt;/mui-body&gt;
            </story-code-block>

          </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>


      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-body", storyBody);
