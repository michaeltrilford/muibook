class storyChip extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .wrap::part(flex-wrap) {
        flex-wrap: wrap;
        width: 180px;
      }
    `;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{text}",
        default: "",
        description: "Add text to the chip.",
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
            import "@muibook/components/mui-chip";<br>
          </mui-code>
        </spec-card>

        <props-card title="Chip">
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
            <mui-chip>Branding</mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Icon Before">
          <div slot="body">
            <mui-chip> 
              Downloads
              <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Icon After">
          <div slot="body">
            <mui-chip> 
              Downloads
              <mui-icon-down-arrow-circle slot="after"></mui-icon-down-arrow-circle>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Badge: Before">
          <div slot="body">
            <mui-chip> 
              Downloads
              <mui-badge variant="positive" slot="before">10</mui-badge>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Badge: After">
          <div slot="body">
            <mui-chip> 
              Downloads
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>


        <story-card title="Active">
          <div slot="body">
            <mui-chip state="active"> 
              Branding
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>


        <story-card title="Sub Navigation" description="It is often used to view page results for a single category.">
          <mui-h-stack slot="body" space="var(--space-200)">
            <mui-chip> 
              All
            </mui-chip>
            <mui-chip state="active"> 
              Gaming
            </mui-chip>
            <mui-chip> 
              Podcasts
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Filters" description="Return results specific to one or multiple categories the user selects.">
          <mui-h-stack slot="body" space="var(--space-200)">
            <mui-chip id="chip1" close>Branding</mui-chip>
            <mui-chip id="chip2" state="active" close>Web Design</mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Before: Filters" description="Return results specific to one or multiple categories the user selects.">
          <mui-h-stack slot="body" space="var(--space-200)">
            <mui-chip id="chip1" close>
              Branding
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
            </mui-chip>
            <mui-chip id="chip2" state="active" close>
              Web Design
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Badge: After">
          <div slot="body">
            <mui-chip> 
              Offers
              <mui-badge variant="positive" slot="after">10</mui-badge>
            </mui-chip>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

        <story-card title="Multi-Select Groups">
          <mui-h-stack slot="body" space="var(--space-200)" class="wrap">
            <mui-chip> 
              All
            </mui-chip>
            <mui-chip state="active"> 
              Gaming
            </mui-chip>
            <mui-chip> 
              Podcasts
            </mui-chip>
            <mui-chip> 
              All
            </mui-chip>
            <mui-chip state="active"> 
              Gaming
            </mui-chip>
          </mui-h-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-chip&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-chip&gt;
          </story-code-block>
        </story-card>

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Chip (WIP)"
        description="A Chip is a compact, interactive UI element representing an attribute or action. It can include text, icons, avatars, badges, or a dismiss option. Commonly used for displaying choices, filters, or tags, a Chip should provide clear, concise information and support seamless user interaction."
      >
        ${stories}
      </story-template>
    `;
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    if (!shadow) return; // Guard against null

    shadow.addEventListener("close", (e) => {
      const id = e.detail.id;
      const chip = shadow.getElementById(id);
      if (chip) {
        chip.remove();
      }
    });
  }
}

customElements.define("story-chip", storyChip);
