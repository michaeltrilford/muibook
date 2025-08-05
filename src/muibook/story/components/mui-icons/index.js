class storyIcon extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-grid::part(internal) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 600px) {
        mui-grid::part(internal) {
          grid-template-columns: 1fr 1fr;
        }
      }

      .color-options::part(color) {
        color: var(--app-story-icon-grid-text);
        margin-top: var(--space-100);
      }

      .color-options.inverted::part(color) {
        color: var(--app-story-icon-grid-text-inverted);
        margin-top: var(--space-100);
      }

      .variant.primary::part(color) {
        color: var(--action-primary-text-color);
      }
      .variant.secondary::part(color) {
        color: var(--action-secondary-text-color);
      }
      .variant.tertiary::part(color) { center
        color: var(--action-tertiary-text-color);
      }
      .variant.attention::part(color) {
        color: var(--action-attention-text-color);
      }

    `;

    const propItems = [
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "small",
        description: "Set the size of the icon.",
      },
      {
        name: "color",
        type: "string",
        options: "Valid CSS, inverted",
        default: "--icon-color-default",
        description: "Adjust the color",
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

    const IconTogglePropItems = [
      {
        name: "slot=&#8220;start&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Use to slot in the default icon shown before the toggle is activated.",
      },
      {
        name: "slot=&#8220;end&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Use to slot in the icon shown after the toggle is activated.",
      },
      {
        name: "toggle",
        type: "boolean",
        options: "toggle",
        default: "-",
        description:
          "Toggle is meant to be controlled with state to switch the visible icon, typically used inside a button.",
      },
      {
        name: "rotate",
        type: "boolean",
        options: "rotate",
        default: "-",
        description: "Change the transition to include a rotating effect.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "small",
        description: "Set the size of the icon.",
      },
    ];

    const IconToggleRows = IconTogglePropItems.map(
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
    ).join("");

    const IconToggleAccordions = IconTogglePropItems.map((prop, index) => {
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
    }).join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Icons"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-311&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-icons"
        guides="https://guides.muibook.com/icons"
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-icons";<br>
            </mui-code>
          </spec-card>

          <mui-v-stack space="var(--space-500)">
            <props-card title="Icon">
              <mui-responsive breakpoint="767" slot="body">
                <story-type-table slot="showAbove">
                  ${rows}
                </story-type-table>
                <mui-accordion-group exclusive slot="showBelow">
                  ${accordions}
                </mui-accordion-group>
              </mui-responsive>
            </props-card>
            <props-card title="Icon Toggle" description="A visual alternative to a button, used to control views with a persistent open/close state — such as menus or drawers. Unlike standard buttons, this component is purpose-built for toggling visibility and should not replace buttons used for general actions.">
              <mui-responsive breakpoint="767" slot="body">
                <story-type-table slot="showAbove">
                  ${IconToggleRows}
                </story-type-table>
                <mui-accordion-group exclusive slot="showBelow">
                  ${IconToggleAccordions}
                </mui-accordion-group>
              </mui-responsive>
            </props-card>
          </mui-v-stack>

          <story-card title="Sizes" description="The default size of the icon is size: small">

            <mui-grid col="1fr 1fr" space="var(--space-400)" slot="body">

              <story-icon-grid center>              
                <mui-icon-add slot="body" size="x-small"></mui-icon-add>
                <mui-code slot="footer" scrollable>mui-icon-add size="x-small"</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-add slot="body" size="small"></mui-icon-add>
                <mui-code slot="footer" scrollable>mui-icon-add size="small"</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-add slot="body" size="medium"></mui-icon-add>
                <mui-code slot="footer" scrollable>mui-icon-add size="medium"</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-add slot="body" size="large"></mui-icon-add>
                <mui-code slot="footer" scrollable>mui-icon-add size="large"</mui-code>
              </story-icon-grid>

            </mui-grid> 

          </story-card>

          <story-card title="Default" description="Icons are set to size 'small' by default." >

            <mui-grid space="var(--space-400)" slot="body">

              <story-icon-grid center>              
                <mui-icon-accessibility slot="body"></mui-icon-accessibility>
                <mui-code slot="footer" scrollable>mui-icon-accessibility</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-add slot="body"></mui-icon-add>
                <mui-code slot="footer" scrollable>mui-icon-add</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-close slot="body"></mui-icon-close>
                <mui-code slot="footer" scrollable>mui-icon-close</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-up-chevron slot="body"></mui-icon-up-chevron>
                <mui-code slot="footer" scrollable>mui-icon-up-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-down-chevron slot="body"></mui-icon-down-chevron>
                <mui-code slot="footer" scrollable>mui-icon-down-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-left-sidebar slot="body"></mui-icon-left-sidebar>
                <mui-code slot="footer" scrollable>mui-icon-left-sidebar</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-left-chevron slot="body"></mui-icon-left-chevron>
                <mui-code slot="footer" scrollable>mui-icon-left-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-right-chevron slot="body"></mui-icon-right-chevron>
                <mui-code slot="footer" scrollable>mui-icon-right-chevron</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-grid slot="body"></mui-icon-grid>
                <mui-code slot="footer" scrollable>mui-icon-grid</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-left-arrow slot="body"></mui-icon-left-arrow>
                <mui-code slot="footer" scrollable>mui-icon-left-arrow</mui-code>
              </story-icon-grid>      

              <story-icon-grid center>              
                <mui-icon-menu slot="body"></mui-icon-menu>
                <mui-code slot="footer" scrollable>mui-icon-menu</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-message slot="body"></mui-icon-message>
                <mui-code slot="footer" scrollable>mui-icon-message</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-moon slot="body"></mui-icon-moon>
                <mui-code slot="footer" scrollable>mui-icon-moon</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-sun slot="body"></mui-icon-sun>
                <mui-code slot="footer" scrollable>mui-icon-sun</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-subtract slot="body"></mui-icon-subtract>
                <mui-code slot="footer" scrollable>mui-icon-subtract</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-check slot="body"></mui-icon-check>
                <mui-code slot="footer" scrollable>mui-icon-check</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-info slot="body"></mui-icon-info>
                <mui-code slot="footer" scrollable>mui-icon-info</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-warning slot="body"></mui-icon-warning>
                <mui-code slot="footer" scrollable>mui-icon-warning</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-attention slot="body"></mui-icon-attention>
                <mui-code slot="footer" scrollable>mui-icon-attention</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-globe slot="body"></mui-icon-globe>
                <mui-code slot="footer" scrollable>mui-icon-globe</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-stop slot="body"></mui-icon-stop>
                <mui-code slot="footer" scrollable>mui-icon-stop</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-down-arrow-circle slot="body"></mui-icon-down-arrow-circle>
                <mui-code slot="footer" scrollable>mui-icon-down-arrow-circle</mui-code>
              </story-icon-grid>  
              
              <story-icon-grid center>              
                <mui-icon-ellipsis slot="body"></mui-icon-ellipsis>
                <mui-code slot="footer" scrollable>mui-icon-ellipsis</mui-code>
              </story-icon-grid>  



            </mui-grid> 

          </story-card>

          <story-card title="Color Options" description="The icons have default color of var(--black). The color can be inverted or a custom color applied." >

            <mui-grid col="1fr 1fr" space="var(--space-400)" slot="body">

              <story-icon-grid center>              
                <mui-icon-menu slot="body"></mui-icon-menu>
                <mui-body size="x-small" weight="bold" class="color-options" slot="body">Default Color</mui-body>
                <mui-code slot="footer" scrollable>mui-icon-menu</mui-code>
              </story-icon-grid>

              <story-icon-grid center theme="inverted">              
                <mui-icon-menu slot="body" color="inverted"></mui-icon-menu>
                <mui-body size="x-small" weight="bold" class="color-options inverted" slot="body">Inverted Color</mui-body>
                <mui-code slot="footer" scrollable> color="inverted"</mui-code>
              </story-icon-grid>

              <story-icon-grid center>              
                <mui-icon-menu slot="body" color="var(--blue-500)"></mui-icon-menu>
                <mui-body size="x-small" weight="bold" class="color-options" slot="body">Custom Color</mui-body>
                <mui-code slot="footer" scrollable>color="var(--blue-500)"</mui-code>
              </story-icon-grid>

            </mui-grid> 

          </story-card>

        <story-card title="Icon Toggle: Default">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-button variant="primary">  
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="secondary">  
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="tertiary">  
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="attention">  
              <mui-icon-toggle>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
          <mui-code slot="footer" scrollable>
            const btn = document.getElementById('btn');<br />
            const toggle = btn.querySelector('mui-icon-toggle');<br />
            <br />
            btn.addEventListener('click', () =&gt; {<br />
            &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
            &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
            });
            <br />
            <br />
            &lt;mui-button id="btn" variant="primary"&gt;<br />
            &nbsp;&nbsp;&lt;mui-icon-toggle&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
            &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        <story-card title="Icon Toggle: Rotate">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-button variant="primary">  
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="secondary">  
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="tertiary">  
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-button variant="attention">  
              <mui-icon-toggle rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
          <mui-code slot="footer" scrollable>
            const btn = document.getElementById('btn');<br />
            const toggle = btn.querySelector('mui-icon-toggle');<br />
            <br />
            btn.addEventListener('click', () =&gt; {<br />
            &nbsp;&nbsp;toggle.toggle = !toggle.toggle;<br />
            &nbsp;&nbsp;toggle.setAttribute('aria-pressed', toggle.toggle);<br />
            });
            <br />
            <br />
            &lt;mui-button id="btn" variant="primary"&gt;<br />
            &nbsp;&nbsp;&lt;mui-icon-toggle rotate&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br />
            &nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br />
            &lt;/mui-button&gt;
          </mui-code>
        </story-card>

        </mui-v-stack>

      </story-template>

    `;

    const buttons = this.shadowRoot.querySelectorAll("mui-button");

    buttons.forEach((btn) => {
      const toggle = btn.querySelector("mui-icon-toggle");
      if (!toggle) return;

      btn.addEventListener("click", () => {
        toggle.toggle = !toggle.toggle;
        toggle.setAttribute("aria-pressed", toggle.toggle);
      });
    });
  }
}

customElements.define("story-icon", storyIcon);
