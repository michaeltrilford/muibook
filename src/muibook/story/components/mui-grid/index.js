class storyGrid extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `:host { display: block; }`;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slot in content to be displayed in a grid format.",
      },
      {
        name: "col",
        type: "string",
        options: "1fr, 1fr 1fr, etc...",
        default: "",
        description:
          "Only use with 'showBelow' & 'showAbove' named slots. A number that represents a single breakpoint that switches between two 'showAbove' | 'showBelow' views. You are able to nest, so you can be creative.",
      },
      {
        name: "space",
        type: "string",
        options: "var(--space-xxx)",
        default: "",
        description:
          "Only use with 'showBelow' & 'showAbove' named slots. A number that represents a single breakpoint that switches between two 'showAbove' | 'showBelow' views. You are able to nest, so you can be creative.",
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
        type: "CSS",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
      },
      {
        name: "part",
        type: "CSS",
        options: "mui-grid::part(gap)",
        default: "",
        description:
          "Controlled trust-based customisation for modifying internal aspects of a grid. <mui-link href='/#/spacing-part-selectors' size='x-small'>Learn more</mui-link>",
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

    const Box = /*html*/ `
      <mui-card>
        <mui-card-body>.</mui-card-body>
      </mui-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Grid"
        description="Layout component to enable grid layouts"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-grid/index.ts"
        guides="https://guides.muibook.com/grid"
      >

      <mui-v-stack space="var(--space-700)">
      
        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-grid";<br>
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

        <story-card title="Default">
        
          <mui-grid slot="body" space="var(--space-200)">
            ${Box}
            ${Box}
          </mui-grid>
          
          <mui-code slot="footer">
            &lt;mui-grid col="1fr 1fr" space="var(--space-200)"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-grid&gt;
          </mui-code>
        </story-card>

        <story-card title="Three Column">
          <mui-grid col="1fr 1fr 1fr" slot="body" space="var(--space-200)">
            ${Box}
            ${Box}
            ${Box}
          </mui-grid>
          <mui-code slot="footer">
            &lt;mui-grid col="1fr 1fr 1fr" space="var(--space-200)"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-grid&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-grid", storyGrid);
