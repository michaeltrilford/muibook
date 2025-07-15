class storyHeading extends HTMLElement {
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
        description: "Text for the heading element.",
      },
      {
        name: "size",
        type: "string",
        options: "1, 2, 3, 4, 5, 6",
        default: "1",
        description: "Set the visual size of the heading.",
      },
      {
        name: "level",
        type: "string",
        options: "1, 2, 3, 4, 5, 6",
        default: "1",
        description: "Set the semantic size of the heading for correct screen reader behaviour.",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Heading" 
        description="The Heading component includes six levels (H1–H6) for structured heading usage, supporting a range of hierarchies in text presentation."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1120&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-heading/index.ts"
        guides="https://guides.muibook.com/heading"
        accessibility="Use the level property (H1–H6) to maintain correct semantic structure.; Follow a logical order — don’t skip heading levels.; Helps screen readers understand and navigate the page hierarchy."
      >
        
        <mui-v-stack space="var(--space-700)">
        
          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-heading";<br>
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

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="1">Heading 1</mui-heading>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-heading size="1"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="2">Heading 2</mui-heading>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-heading size="2"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="3">Heading 3</mui-heading>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-heading size="3"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="4">Heading 4</mui-heading>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-heading size="4"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="5">Heading 5</mui-heading>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-heading size="5"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="6">Heading 6</mui-heading>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-heading size="6"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>
        
        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-heading", storyHeading);
