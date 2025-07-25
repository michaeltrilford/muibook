class storyQuote extends HTMLElement {
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
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Content for the quote element.",
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
        title="Quote"
        description="The mui-quote specifies a section that is quoted from another source."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-quote/index.ts"
        guides="https://guides.muibook.com/quote"
      >

      <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-quote";<br>
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

        <story-card title="Quote">

          <div slot="body">
          
            <mui-body>Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis
            euismod. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu
            leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</mui-body>
            
            <mui-quote>Risus Mollis Dapibus</mui-quote>
            
            <mui-body>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non
            mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor
            id nibh ultricies vehicula ut id elit.</mui-body>
          
          </div>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-quote&gt;...&lt;/mui-quote&gt;
          </mui-code>

        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-quote", storyQuote);
