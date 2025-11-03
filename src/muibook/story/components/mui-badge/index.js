class storyBadge extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{text}",
        default: "",
        description: "Add text to the badge.",
      },
      {
        name: "variant",
        type: "string",
        options: "neutral, positive, warning, attention",
        default: "neutral",
        description: "Describe the intent or mood of the badge.",
      },
      {
        name: "usage",
        type: "string",
        options: "slat-end",
        default: "",
        description: "A layout helper to offset the badge when used in the end position within a mui-slat.",
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
            import "@muibook/components/mui-badge";<br>
          </mui-code>
        </spec-card>

        <props-card title="Badge">
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
            <mui-badge>New</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Neutral">
          <div slot="body">
            <mui-badge variant="neutral">Offline</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="neutral"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Positive">
          <div slot="body">
            <mui-badge variant="positive">Paid</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="positive"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Warning">
          <div slot="body">
            <mui-badge variant="warning">Busy</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="warning"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>

        <story-card title="Attention">
          <div slot="body">
            <mui-badge variant="attention">Urgent</mui-badge>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-badge variant="attention"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </story-code-block>
        </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Badge"
        description="Badges are non-interactive and indicate counts or statuses."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-badge/index.ts"
        guides="https://guides.muibook.com/badge"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1108&t=FSv3FEahG8VQW1FZ-1"
        storybook="https://stories.muibook.com/?path=/docs/feedback-badge--docs"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-badge", storyBadge);
