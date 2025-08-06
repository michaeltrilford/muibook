class storyBody extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-body.part-example::part(gap) { gap: var(--space-100); }
      mui-body.part-example::part(align-items) {align-items: center; }
      mui-body.part-example::part(display) { display: flex; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "{text}, mui-icon-[name]",
        default: "(required)",
        description: "Content for the body element.",
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
        options: "default, success, warning, error",
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
      {
        name: "part",
        type: "CSS",
        options: "mui-body::part(gap)",
        default: "",
        description:
          "Controlled trust-based customisation for modifying internal aspects of a body text. <mui-link href='/#/spacing-part-selectors' size='x-small'>Learn more</mui-link>",
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
              &lt;mui-body variant="success"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="warning"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="error"&gt; ... &lt;/mui-body&gt;
            </story-code-block>

          </story-card>

          <story-card title="Part Selectors" description="This approach extends the mui-body element using the part selector to support validation messaging within the field component.">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Success w/ Icon</mui-heading>
                  <mui-body class="part-example" variant="success"><mui-icon-check></mui-icon-check>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Warning w/ Icon</mui-heading>
                  <mui-body class="part-example" variant="warning"><mui-icon-warning></mui-icon-warning>Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4" style="margin-bottom: var(--space-200)">Error w/ Icon</mui-heading>
                  <mui-body class="part-example" variant="error"><mui-icon-attention></mui-icon-attention>Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <story-code-block slot="footer" scrollable>

              &lt;style&gt;
                <br>
                &nbsp;&nbsp;mui-body::part(gap) { gap: var(--space-100); }
                <br>
                &nbsp;&nbsp;mui-body::part(align-items) {align-items: center; }
                <br>
                &nbsp;&nbsp;mui-body::part(display) { display: flex; }
                <br>
              &lt;/style&gt;
              <br>
              <br>
              &lt;mui-body variant="success"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-check&gt;&lt;/mui-icon-check&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br />
              <br>
              &lt;mui-body variant="warning"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-warningk&gt;&lt;/mui-icon-warningk&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
              <br>
              <br />
              &lt;mui-body variant="error"&gt;
              <br>
              &nbsp;&nbsp;&lt;mui-icon-attention&gt;&lt;/mui-icon-attention&gt;
              <br>
              &nbsp;&nbsp;{text}
              <br>
              &lt;/mui-body&gt;
            </story-code-block>

          </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>


      <story-template
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-body/index.ts"
        title="Body"
        guides="https://guides.muibook.com/body"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-892&t=fSFYVey9aCoE5oQa-1"
        description="Use the Body component for clear and readable paragraph text across the UI. It’s ideal for longer-form content such as descriptions, explanations, or supporting information. Variant styles are also available for status messages and other contextual needs."
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-body", storyBody);
