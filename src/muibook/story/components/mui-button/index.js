class storyButton extends HTMLElement {
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
        options: "{text}, mui-icon-[name]",
        default: "",
        description:
          "Add text or an icon for the call-to-action. If using a custom icon, ensure it includes the mui-icon class to inherit styling.",
      },
      {
        name: "variant",
        type: "string",
        options: "primary, secondary, tertiary, attention",
        default: "primary",
        description: "Describe the intent or mood of a message",
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
      {
        name: "part",
        type: "CSS",
        options: "E.g. mui-link::part(display)",
        default: "",
        description: "Controlled trust-based customisation for modifying internal aspects of a button.",
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

      <story-template title="Button" 
        description="Buttons are essential UI elements that trigger actions when clicked or tapped. They should be easily recognisable, provide clear feedback, and be accessible to all users."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-570&t=fSFYVey9aCoE5oQa-1" 
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-button/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small">
              import "@muibook/components/mui-button";<br>
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

        <story-card title="Primary">
          <mui-button variant="primary" slot="body">Submit</mui-button>
          <mui-code slot="footer">
            &lt;mui-button variant="primary"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Icon Slots">

          <mui-v-stack slot="body" space="var(--space-200)">

            <mui-button 
              variant="primary">
                Add New
                <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>

            <mui-button 
              variant="primary">
                More
                <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>

          </mui-v-stack>
          
          <mui-code slot="footer">
            &lt;mui-button variant="primary"&gt;
            <br />
            &nbsp;&nbsp;Add New
            <br>
            &nbsp;&nbsp;&lt;mui-icon-add slot="before"&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-button&gt;
            <br>
            <br>
            &lt;mui-button variant="primary"&gt;
            <br />
            &nbsp;&nbsp;More
            <br>
            &nbsp;&nbsp;&lt;mui-icon-add slot="after"&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Secondary">
        <mui-button variant="secondary" slot="body">Cancel</mui-button>
          <mui-code slot="footer">
            &lt;mui-button variant="secondary"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Tertiary">
         <mui-button variant="tertiary" slot="body">Cancel</mui-button>
          <mui-code slot="footer">
            &lt;mui-button variant="tertiary"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention">
          <mui-button variant="attention" slot="body">Delete</mui-button>
          <mui-code slot="footer">
            &lt;mui-button variant="attention"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Button Group">
          <mui-button-group right slot="body">
            <mui-button variant="secondary">Cancel</mui-button>
            <mui-button variant="primary">Submit</mui-button>
          </mui-button-group>
          <mui-code slot="footer">
            &lt;mui-button-group right&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;...&lt;/mui-button&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;...&lt;/mui-button&gt;
            <br />
            &lt;/mui-button-group&gt;
          </mui-code>
        </story-card>

        <story-card title="Primary Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-button variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-subtract></mui-icon-subtract>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-grid></mui-icon-grid>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-notification></mui-icon-notification>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-menu></mui-icon-menu>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-message></mui-icon-message>
            </mui-button>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-button variant="primary"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Secondary Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-button variant="secondary">
              <mui-icon-add variant="secondary"></mui-icon-add>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-subtract></mui-icon-subtract>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-grid></mui-icon-grid>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-notification></mui-icon-notification>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-menu></mui-icon-menu>
            </mui-button>
            <mui-button variant="secondary">
              <mui-icon-message></mui-icon-message>
            </mui-button>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-button variant="secondary"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Tertiary Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-button variant="tertiary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-subtract></mui-icon-subtract>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-grid></mui-icon-grid>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-notification></mui-icon-notification>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-menu></mui-icon-menu>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-icon-message></mui-icon-message>
            </mui-button>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-button variant="tertiary"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-button variant="attention">
              <mui-icon-add></mui-icon-add>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-subtract></mui-icon-subtract>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-grid></mui-icon-grid>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-notification></mui-icon-notification>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-menu></mui-icon-menu>
            </mui-button>
            <mui-button variant="attention">
              <mui-icon-message></mui-icon-message>
            </mui-button>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-button variant="attention"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-button", storyButton);
