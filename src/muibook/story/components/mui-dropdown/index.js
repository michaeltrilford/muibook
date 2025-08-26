class storyDropdown extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
    `;

    const propItems = [
      {
        name: "slot=&#8220;action&#8221;",
        required: true,
        type: "slot (named)",
        options: "{mui-button}",
        default: "(required)",
        description: "The main button is flexible and can inherit any variants, text-only, icon-only or a combination.",
      },
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{mui-button} {mui-rule}",
        default: "(required)",
        description:
          "The button will automatically have the correct variants to be visually consistent when used within the dropdown.",
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
          import "@muibook/components/mui-dropdown";<br>
        </mui-code>
      </spec-card>

      <props-card title="Dropdown">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Dropdown w/ Ellipsis">
      <mui-button-group right  slot="body">
        <mui-dropdown small>
          <mui-button slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          <mui-button>Option one</mui-button>
          <mui-button>Option two</mui-button>
        </mui-dropdown>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Option one&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Option two&lt;/mui-button&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Adjust Z-Index">
        <mui-dropdown small slot="body" zindex="999">
          <mui-button slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          <mui-button>Option one</mui-button>
          <mui-button>Option two</mui-button>
        </mui-dropdown>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown zindex="999"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Option one&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Option two&lt;/mui-button&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Dropdown w/ Icon">
        <mui-button-group right  slot="body">
          <mui-dropdown small>
            <mui-button slot="action" variant="secondary">Export<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron></mui-button>
            <mui-button>PDF</mui-button>
            <mui-button>CSV</mui-button>
          </mui-dropdown>
          <mui-button variant="primary">New Report</mui-button>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Export&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;PDF&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;CSV&lt;/mui-button&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Dropdown (Beta)" 
        description="The dropdown has a trigger action and an overlay menu. The action can use any mui-button variant, while menu options follow a predefined style. The menu auto-positions to stay within the viewport."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dropdown/index.ts"
        guides="https://guides.muibook.com"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-dropdown", storyDropdown);
