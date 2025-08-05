class storySwitch extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "label",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description:
          "Provide the switch with a unique label. If without, a console warning will remind you to add label.",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disable the switch",
      },
      {
        name: "checked",
        type: "boolean",
        options: "checked",
        default: "",
        description: "On / Off state",
      },
      {
        name: "slot=&#8220;on-icon&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Slot an icon in for the on state",
      },
      {
        name: "slot=&#8220;off-icon&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Slot an icon in for the off state",
      },
    ];

    const rows = propItems
      .map(
        (prop) => `
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Switch"
        description="A component that allows users to switch a setting on or off with immediate effect."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-switch/index.ts"
        guides="https://guides.muibook.com/switch"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=147-1003&t=FSv3FEahG8VQW1FZ-1"
        accessibility="
          A label is required and applied as aria-label to describe the switch’s purpose.;
          Uses role='switch' and updates aria-checked for assistive tech.;
          The label isn’t shown visually—context is provided through icons or nearby text.;
          disabled sets aria-disabled and blocks interaction.;
          Supports keyboard navigation with visible focus styles.
        "
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-switch";<br>
          </mui-code>
        </spec-card>

        <props-card title="Switch">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>


        <story-card title="Unchecked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Unchecked"></mui-switch>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-switch label="Unchecked"&gt;&lt;/mui-switch&gt;
          </mui-code>
        </story-card>

        <story-card title="Checked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="On Example" checked></mui-switch>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-switch checked label="On Example"&gt;&lt;/mui-switch&gt;
          </mui-code>
        </story-card>

        <story-card title="Disabled w/ Unchecked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Unchecked w/ Disabled" disabled></mui-switch>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-switch label="Unchecked w/ Disabled"&gt;&lt;/mui-switch&gt;
          </mui-code>
        </story-card>

        <story-card title="Disabled w/ Checked"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch disabled label="Checked w/ Disabled" checked></mui-switch>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-switch checked disabled label="Checked w/ Disabled"&gt;&lt;/mui-switch&gt;
          </mui-code>
        </story-card>

        <story-card title="Icons: Off"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Dark mode toggle">
              <mui-icon-sun slot="off-icon"></mui-icon-sun>
              <mui-icon-moon slot="on-icon"></mui-icon-moon>
            </mui-switch>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-switch label="Dark mode toggle"&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-sun slot="off-icon"&gt;&lt;/mui-icon-sun&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-moon slot="on-icon"&gt;&lt;/mui-icon-moon&gt;
              <br />
            &lt;/mui-switch&gt;
          </mui-code>
        </story-card>

        <story-card title="Icons: On"
          usageLink="https://guides.muibook.com/switch"
        >
          <div slot="body">
            <mui-switch label="Dark mode toggle" checked>
              <mui-icon-sun slot="off-icon"></mui-icon-sun>
              <mui-icon-moon slot="on-icon"></mui-icon-moon>
            </mui-switch>
          </div>
          <mui-code slot="footer" scrollable>
            &lt;mui-switch label="Dark mode toggle" checked&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-sun slot="off-icon"&gt;&lt;/mui-icon-sun&gt;
              <br />
              &nbsp;&nbsp;&lt;mui-icon-moon slot="on-icon"&gt;&lt;/mui-icon-moon&gt;
              <br />
            &lt;/mui-switch&gt;
          </mui-code>
        </story-card>


      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-switch", storySwitch);
