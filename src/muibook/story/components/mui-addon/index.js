import { getComponentDocs } from "../../../utils/story-data";

class storyAddon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("AddOn");

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

        <story-card title="Text"
          description="Use for units, currency, or short static labels"
          usageLink="https://guides.muibook.com/add-on"
        >
          <div slot="body">
            <mui-input label="Enter amount">
              <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
            </mui-input>
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

        <story-card title="Icon"
          description="Use for symbolic cues or clarification of the input’s intent"
          usageLink="${data.guides}"
        >
          <div slot="body">
            <mui-input label="Enter your date">
              <mui-addon slot="after"><mui-icon-info></mui-icon-info></mui-addon>
            </mui-input>
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

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-addon", storyAddon);
