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
        type: "HTML attribute",
        options: "mui-body, mui-icons-[name], elements",
        default: "",
        description:
          "Slot in text, icons or other appropriate micro compositions to support form experiences.",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Add On"
        description="Enhance form inputs by using mui-addon to display supplementary information like units, prefixes, or suffixes."
        github="https://github.com/michaeltrilford/michaeltrilford.github.io/blob/master/mui-addon/index.js"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=133-588&t=a1UUlxRE4ZIJUKwJ-1"
      >

      <mui-v-stack space="var(--space-700)">

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

        <story-card title="Before: Add On">
          <div slot="body">
            <mui-input label="Enter amount">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
          </div>
          <mui-code slot="footer">
            &lt;mui-input label="Enter amount"&gt;
            <br />

            &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-addon&gt;
            <br />            

            &lt;mui-input&gt;
            <br />
          </mui-code>
        </story-card>

        <story-card title="After: Add On">
          <div slot="body">
            <mui-input label="Enter amount">
              <mui-addon slot="after"><mui-body>USD</mui-body></mui-input></mui-addon>
          </div>
          <mui-code slot="footer">
            &lt;mui-input label="Enter amount"&gt;
            <br />

            &nbsp;&nbsp;&lt;mui-addon slot="after"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-addon&gt;
            <br />            

            &lt;mui-input&gt;
            <br />
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-addon", storyAddon);
