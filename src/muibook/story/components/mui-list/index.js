class storyList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propList = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "mui-list-item",
        default: "(required)",
        description: "Slot in the list item(s)",
      },
      {
        name: "as",
        type: "string",
        options: "ol, ul",
        default: "ul",
        description: "Choose between ordered or unordered list",
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

    const ListRows = propList
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

    const ListAccordions = propList
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propList.length - 1 ? "last-child" : "";

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

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Text for the list-item element.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Set the size of the list-item text.",
      },
      {
        name: "weight",
        type: "string",
        options: "regular, medium, bold",
        default: "regular",
        description: "Set the weight of the list-item text.",
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
        title="List"
        description="The component defines an ordered or unordered list."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-list"
        guides="https://guides.muibook.com/list"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-list";<br>
          </mui-code>
        </spec-card>

          <spec-card title="Props: List">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${ListRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${ListAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

        <spec-card title="Props: List-Item">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

        <story-card title="Sizes">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4" >X-Small</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="x-small">Coffee</mui-list-item>
                    <mui-list-item size="x-small">Tea</mui-list-item>
                    <mui-list-item size="x-small">Milk</mui-list-item>
                  </mui-list>

                </div>
                <div>
                  <mui-heading size="4" >Small</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="small">Coffee</mui-list-item>
                    <mui-list-item size="small">Tea</mui-list-item>
                    <mui-list-item size="small">Milk</mui-list-item>
                  </mui-list>

                </div>
                <div>
                  <mui-heading size="4" >Medium</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="medium">Coffee</mui-list-item>
                    <mui-list-item size="medium">Tea</mui-list-item>
                    <mui-list-item size="medium">Milk</mui-list-item>
                  </mui-list>

                </div>
                <div>
                  <mui-heading size="4" >Large</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="large">Coffee</mui-list-item>
                    <mui-list-item size="large">Tea</mui-list-item>
                    <mui-list-item size="large">Milk</mui-list-item>
                  </mui-list>

                </div>
              </mui-v-stack>
            </div>

            <mui-code slot="footer">
              &lt;mui-list-item size="x-small"&gt;
              <br />
              &nbsp;&nbsp;{text}
              <br />
              &lt;/mui-list-item&gt;
              <br />
              <br />
              &lt;mui-list-item size="small"&gt;
              <br />
              &nbsp;&nbsp;{text}
              <br />
              &lt;/mui-list-item&gt;
              <br />
              <br />
              &lt;mui-list-item size="medium"&gt;
              <br />
              &nbsp;&nbsp;{text}
              <br />
              &lt;/mui-list-item&gt;
              <br />
              <br />
              &lt;mui-list-item size="large"&gt;
              <br />
              &nbsp;&nbsp;{text}
              <br />
              &lt;/mui-list-item&gt;
            </mui-code>

        </story-card>


        <story-card title="Unordered">

          <div slot="body">
          <mui-list as="ol">
            <mui-list-item>Coffee</mui-list-item>
            <mui-list-item>Tea</mui-list-item>
            <mui-list-item>Milk</mui-list-item>
          </mui-list>
          </div>

          <mui-code slot="footer">
            &lt;mui-list as="ol"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
            <br />
            &lt;/mui-list&gt;
          </mui-code>

        </story-card>

        <story-card title="Ordered">

          <div slot="body">
            <mui-list as="ul">
              <mui-list-item>Coffee</mui-list-item>
              <mui-list-item>Tea</mui-list-item>
              <mui-list-item>Milk</mui-list-item>
            </mui-list>
          </div>

          <mui-code slot="footer">
            &lt;mui-list as="ul"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
            <br />
            &lt;/mui-list&gt;
          </mui-code>
          
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-list", storyList);
