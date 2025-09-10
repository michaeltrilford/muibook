class storyStepper extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .nav-link {
        width: 100%;
        text-align: left;
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      /* Accordion Core */
      [data-icon-animation="accordion-inline"] {
        transition: var(--speed-200) ease-in-out;
      }

      [data-icon-animation="accordion-inline"][open] {
        transform: rotate(90deg);
      }

      [data-icon-animation="accordion-block"] {
        transition: transform var(--speed-200) ease-in-out;

      }

      [data-icon-animation="accordion-block"][open] {
        transform: rotate(-180deg);
      }



    `;

    const propItems = [
      {
        name: "heading",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Provides the accordion element with a heading",
      },
      {
        name: "slot=&#8220;detail&#8221;",
        required: true,
        type: "slot (named)",
        options: "mui-list, mui-body, {elements}, etc",
        default: "(required)",
        description: "Define the detail content for the expanded section within the Accordion.",
      },
      {
        name: "direction",
        type: "string",
        options: "horizonal, vertical",
        default: "medium",
        description: "Adjust the direction",
      },
      {
        name: "active-step",
        type: "boolean",
        options: "",
        default: "",
        description: "Active step",
      },
      {
        name: "class",
        type: "CSS class",
        options: "card-slot",
        default: "",
        description:
          "By default, when Accordion is slotted into the mui-card, padding is automatically added. However, if the mui-accordion is nested within a shadow dom, you have to apply the class for correct padding",
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

    const stepPropItems = [
      {
        name: "heading",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Provides the accordion element with a heading",
      },
      {
        name: "slot=&#8220;detail&#8221;",
        required: true,
        type: "slot (named)",
        options: "mui-list, mui-body, {elements}, etc",
        default: "(required)",
        description: "Define the detail content for the expanded section within the Accordion.",
      },
    ];

    const stepRows = stepPropItems
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

    const stepAccordions = stepPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === stepPropItems.length - 1 ? "last-child" : "";

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
            import "@muibook/components/mui-stepper";<br>
          </mui-code>
        </spec-card>

        <mui-v-stack space="var(--space-400)">
          <props-card title="Stepper">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>
          <props-card title="Step">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${stepRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${stepAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>
        </mui-v-stack>

        <story-card
          id="horizontal"
          title="Horizontal" 
          description="Horizontal direction"
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="1">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="vertical"
          title="Vertical" 
          description="Vertical direction"
        >
          <div slot="body">
            <mui-stepper direction="vertical" active-step="1">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="horizontal-secondary"
          title="Horizontal: Secondary" 
          description="Horizontal direction"
        >
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="1">
              <mui-step title="Details">
                <mui-body size="x-small" slot="secondary">Additional Info</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Additional Info</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Additional Info</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="vertical-secondary"
          title="Vertical: Secondary" 
          description="Vertical direction"
        >
          <div slot="body">
            <mui-stepper direction="vertical" active-step="1">
              <mui-step title="Details">
                <mui-body size="x-small" slot="secondary">Additional Info</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Additional Info</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Additional Info</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-accordion-inline heading="Heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list as="ul" slot="detail"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;...
            <br />
            &nbsp;&nbsp;&lt;/mui-list&gt;
            <br />
            &lt;/mui-accordion-inline&gt;
          </story-code-block>
        </story-card>

      `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Stepper"
        description="A Stepper component visually represents a sequence of steps in a process. It helps users understand progress and navigate through multi-step workflows. This component supports both horizontal and vertical orientations."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-stepper"
      >
        <mui-message heading="Quicklinks" slot="message">
          <mui-h-stack class="token-item-menu" alignY="center" style="padding-bottom: var(--space-100);">
            <mui-link size="small" data-scroll-link="horizontal">Horizontal</mui-link>
            <mui-link size="small" data-scroll-link="vertical">Vertical</mui-link> 
            <mui-link size="small" data-scroll-link="horizontal-secondary">Horizontal: Secondary</mui-link>
            <mui-link size="small" data-scroll-link="vertical-secondary">Vertical: Secondary</mui-link>           
          </mui-h-stack>
        </mui-message>

        ${stories}

      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-stepper", storyStepper);
