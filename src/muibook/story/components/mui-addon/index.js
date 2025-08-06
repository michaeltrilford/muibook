class storyAddon extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-body, mui-icon-[name], {elements}",
        default: "(required)",
        description: "Slot in text, icons or other appropriate micro compositions to support form experiences.",
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
              style="position: relative; z-index: 1;" 
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
            import "@muibook/components/mui-addon";<br>
          </mui-code>
        </spec-card>

        <props-card title="Add On">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>

        <story-card title="Before: Add On"
          description="Use for units, currency, or short static labels."
          usageLink="https://guides.muibook.com/add-on"
        >
          <div slot="body">
            <mui-input label="Enter amount">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-input label="Enter amount"&gt;
            <br />

            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-addon&gt;
            <br />            

            &lt;/mui-input&gt;
            <br />
          </story-code-block>
        </story-card>

        <story-card title="After: Add On"
          description="Use for units, currency, or short static labels."
          usageLink="https://guides.muibook.com/add-on"
        >
          <div slot="body">
            <mui-input label="Enter amount">
              <mui-addon slot="after"><mui-body>USD</mui-body></mui-input></mui-addon>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-input label="Enter amount"&gt;
            <br />

            &nbsp;&nbsp;&lt;mui-addon slot="after"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-addon&gt;
            <br />            

            &lt;/mui-input&gt;
            <br />
          </story-code-block>
        </story-card>
      `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Add On"
        description="Enhance form inputs by using mui-addon to display supplementary information like units, prefixes, or suffixes."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-addon/index.ts"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=133-588&t=a1UUlxRE4ZIJUKwJ-1"
        guides="https://guides.muibook.com/add-on"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-addon", storyAddon);
