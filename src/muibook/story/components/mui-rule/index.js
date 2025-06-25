class storyRule extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "direction",
        type: "string",
        options: "horizontal, vertical",
        default: "horizontal",
        description: "Direction of the rule",
      },
      {
        name: "length",
        type: "string",
        options: "100px, 100%, etc",
        default: "",
        description: "Easily add a length of the line.",
      },
      {
        name: "weight",
        type: "string",
        options: "1px, 4px, etc",
        default: "",
        description: "Easily add a weight of the line.",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Rule"
        description="A horizontal rule to divide a page"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-rule/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-rule";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Horizontal">
          <div slot="body">
            <mui-rule direction="horizontal" length="100%" style="margin: var(--space-700) 0;"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="horizontal"
            <br />
            &nbsp;&nbsp;length="100%"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Vertical">
          <div slot="body">
            <mui-rule direction="vertical" length="100px"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="vertical"
            <br />
            &nbsp;&nbsp;length="100px"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Horizontal">
          <div slot="body">
            <mui-rule direction="horizontal" length="100%" weight="2px" style="margin: var(--space-700) 0;"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="horizontal"
            <br />
            &nbsp;&nbsp;length="100%"&gt;
            <br />
            &nbsp;&nbsp;weight="2px"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Vertical">
          <div slot="body">
            <mui-rule direction="vertical" length="100px" weight="2px"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="vertical"
            <br />
            &nbsp;&nbsp;length="100px"&gt;
            <br />
            &nbsp;&nbsp;weight="2px"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-rule", storyRule);
