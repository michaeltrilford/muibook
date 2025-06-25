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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Badge"
        description="Badges are non-interactive and indicate counts or statuses."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-badge/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-badge";<br>
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
          <div slot="body">
            <mui-badge>New</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Neutral">
          <div slot="body">
            <mui-badge variant="neutral">Offline</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="neutral"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Positive">
          <div slot="body">
            <mui-badge variant="positive">Paid</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="positive"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Warning">
          <div slot="body">
            <mui-badge variant="warning">Busy</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="warning"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention">
          <div slot="body">
            <mui-badge variant="attention">Urgent</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="attention"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-badge", storyBadge);
