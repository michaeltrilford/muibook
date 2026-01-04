import { getComponentDocs } from "../../../utils/story-data";

class storyStepper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Stepper");

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
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-step",
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
        options: "",
        default: "",
        description: "",
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
        name: "title",
        type: "string",
        options: "{text}",
        default: "",
        description: "Provides the step with a title",
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
            &lt;mui-stepper direction="horizontal" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
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
            &lt;mui-stepper direction="vertical" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
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
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
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
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
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
        accessibility="${data.accessibility.engineerList.join("|||")}"
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
    this.shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = this.shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-stepper", storyStepper);
