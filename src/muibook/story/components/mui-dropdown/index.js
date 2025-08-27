import VisaBlack from "../../../images/networks/visa-black.svg";
import LogoPlaceholder from "../../../images/card/image-220.png";

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
        options: "{mui-button}, {mui-rule}, {mui-elements}",
        default: "(required)",
        description:
          "The button will automatically have the correct variants to be visually consistent when used within the dropdown.",
      },
      {
        name: "zindex",
        type: "string",
        options: "",
        default: "1",
        description: "Ability to adjust the z-index",
      },
      {
        name: "position",
        type: "string",
        options: "left, right",
        default: "left",
        description: "Set the default position of the dropdown on the x-axis.",
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

      <story-card title="Ellipsis Action">
        <mui-dropdown slot="body">
          <mui-button slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          <mui-button>Option one</mui-button>
          <mui-button>Option two</mui-button>
        </mui-dropdown>
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

      <story-card title="Z-Index Customisation" description="Use this feature if a fixed navigation or other elements in your application conflict with the default z-index. Adjust the value to ensure your UI layers display correctly.">
        <mui-dropdown slot="body" zindex="999" position="left">
          <mui-button slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          <mui-button>Option one</mui-button>
          <mui-button>Option two</mui-button>
          <mui-button>Option two</mui-button>
          <mui-button>Option two</mui-button>
          <mui-button>Option two</mui-button>
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
        <mui-button-group right slot="body">
          <mui-dropdown>
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

      <story-card title="Position: Left">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="left">
            <mui-button slot="action" variant="secondary">Export<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron></mui-button>
            <mui-button>PDF</mui-button>
            <mui-button>CSV</mui-button>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position="left"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Export&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;PDF&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;CSV&lt;/mui-button&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Position: Right">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="right">
            <mui-button slot="action" variant="secondary">Export<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron></mui-button>
            <mui-button>PDF</mui-button>
            <mui-button>CSV</mui-button>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position="right"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Export&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;PDF&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;CSV&lt;/mui-button&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Position: Center" description="The demo example below demonstrates how other elements can be used within the dropdown slot.">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="center">
            <mui-button slot="action" variant="secondary"><mui-icon-info></mui-icon-info></mui-button>

            <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
                type="Debit"
                number="1234"
                partner="${VisaBlack}"
                logo="${LogoPlaceholder}"
                variant="plain"
              >
              </mui-smart-card>
              </mui-v-stack>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position="center"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;...&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Suspend-Close" description="The demo example below demonstrates how other elements can be used within the dropdown slot.">
        <mui-h-stack slot="body" alignX="center" space="80px">
          <mui-dropdown position="center" suspend-close>

            <mui-button slot="action" variant="secondary">
                Card Artwork
                <mui-icon-add slot="after" size="x-small"></mui-icon-add>
            </mui-button>

            <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
                type="Debit"
                number="1234"
                partner="${VisaBlack}"
                logo="${LogoPlaceholder}"
                variant="plain"
              >
              </mui-smart-card>
              <mui-file-upload
                acceptedFileTypes=".pdf,.jpg,.png"
                currentFileName="Upload Image"></mui-file-upload>
              </mui-v-stack>
          </mui-dropdown>
          <mui-dropdown position="center" suspend-close>

            <mui-button slot="action" variant="secondary">
              <mui-icon-add></mui-icon-add>
            </mui-button>

            <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
                type="Debit"
                number="1234"
                partner="${VisaBlack}"
                logo="${LogoPlaceholder}"
                variant="plain"
              >
              </mui-smart-card>
              <mui-file-upload
                acceptedFileTypes=".pdf,.jpg,.png"
                currentFileName="Upload Artwork"></mui-file-upload>
              </mui-v-stack>
          </mui-dropdown>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position="center"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;...&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;<br>
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Advanced: Suspend-Close" 
        description="Using logic to toggle the suspend-close attribute, users can keep the dropdown open after interacting with slotted items. Combined with the toggle component and button, this creates a unique interactive experience. When active, the default minimise (✕) icon is hidden."
        usage="Users can interact with the content inside the dropdown while it stays open by using the suspend-close attribute.;Users can toggle auxiliary content with buttons (e.g., ➕ / ➖) without closing the dropdown.">
        <mui-h-stack slot="body" alignX="center" space="80px">
          <mui-dropdown id="dropdown-2" position="center">

            <mui-button slot="action" variant="secondary">
              Card Artwork
              <mui-icon-toggle id="toggle-2" slot="after" rotate size="x-small">
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>

            <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
                type="Debit"
                number="1234"
                partner="${VisaBlack}"
                logo="${LogoPlaceholder}"
                variant="plain"
              >
              </mui-smart-card>
              <mui-file-upload
                acceptedFileTypes=".pdf,.jpg,.png"
                currentFileName="Upload Image"></mui-file-upload>
              </mui-v-stack>
          </mui-dropdown>

 <mui-dropdown id="dropdown-1" position="center">

            <mui-button slot="action" variant="secondary">
              <mui-icon-toggle id="toggle-1" rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>

            <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
                type="Debit"
                number="1234"
                partner="${VisaBlack}"
                logo="${LogoPlaceholder}"
                variant="plain"
              >
              </mui-smart-card>
              <mui-file-upload
                acceptedFileTypes=".pdf,.jpg,.png"
                currentFileName="Upload Artwork"></mui-file-upload>
              </mui-v-stack>
          </mui-dropdown>

        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position="center"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;...&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;<br>
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

    function bindDropdownToggle(dropdownId, toggleId) {
      const dropdown = shadowRoot.getElementById(dropdownId);
      const toggle = shadowRoot.getElementById(toggleId);

      if (!dropdown || !toggle) return;

      dropdown.addEventListener("dropdown-toggle", (event) => {
        const open = event.detail.open;

        // Toggle the icon + ARIA state
        toggle.toggle = open;
        toggle.setAttribute("aria-pressed", String(open));

        // Toggle suspend-close dynamically
        dropdown.toggleAttribute("suspend-close", open);
      });
    }

    // Usage
    bindDropdownToggle("dropdown-1", "toggle-1");
    bindDropdownToggle("dropdown-2", "toggle-2");
  }
}

customElements.define("story-dropdown", storyDropdown);
