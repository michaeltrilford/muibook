class storyContainer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slot in content to be displayed within the container.",
      },
      {
        name: "size",
        type: "boolean",
        options: "small, medium, large, fluid",
        default: "large",
        description: "Set the width of the container",
      },
      {
        name: "align",
        type: "boolean",
        options: "center",
        default: "left",
        description: "alignment of the container",
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
        title="Container" 
        description="The Container is a layout helper to provide the base page structure for a web experience."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-container/index.ts"
        guides="https://guides.muibook.com/container"
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-container";<br>
            </mui-code>
          </spec-card>

          <props-card title="Container">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>

          <story-card title="Small">
            <mui-container small slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer" scrollable>
              &lt;mui-container small&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Medium">
          <mui-container medium slot="body">
            <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
          </mui-container>
            <mui-code slot="footer" scrollable>
              &lt;mui-container medium&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Large">
            <mui-container large slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer" scrollable>
              &lt;mui-container large&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Fluid">
            <mui-container fluid slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer" scrollable>
              &lt;mui-container fluid&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Center">
            <mui-container small center slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer" scrollable>
              &lt;mui-container center&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-container", storyContainer);
