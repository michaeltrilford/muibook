class storySlat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .slat {
        --slat-background: var(--black-opacity-0);
        --slat-radius: var(--radius-000);
        --slat-background-hover: var(--surface-recessed-alpha);
        border-bottom: var(--border-thin);
      }
      .slat:last-of-type {
        border-bottom: none;
      }

      .card-slat {
        --slat-radius: var(--radius-000);
        border-bottom: var(--border-thin);
      }
      .card-slat:last-of-type {
        margin-bottom: var(--space-400);
        border-bottom: none;
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

    `;

    const propItems = [
      {
        name: "slot=&#8220;start&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Primary content slot for a slat layout.",
      },
      {
        name: "slot=&#8220;end&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description: "Secondary content slot for a slat layout.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, header, row, action",
        default: "default",
        description:
          "Default allows you to bring your own spacing. The Header, Row and Action work can be used together and have consistent padding for alignment.",
      },
      {
        name: "col",
        type: "string",
        options: "1fr, 1fr auto, etc...",
        default: "",
        description: "Adjust the column rules.",
      },
      {
        name: "space",
        type: "string",
        options: "var(--space-xxx)",
        default: "",
        description: "Adjust the gap between columns.",
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

    const accessoryPropItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "mui-icon-[name], {elements}",
        default: "",
        description: "Add an icon or other suitable elements for the minimal space available and experience.",
      },
    ];

    const accessoryRows = accessoryPropItems
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

    const accessoryAccordions = accessoryPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === accessoryPropItems.length - 1 ? "last-child" : "";

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

    const groupPropItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "mui-slat, mui-rule",
        default: "",
        description:
          "Use within a mui-card-body to align slat items with the card heading. mui-rule will span edge to edge.",
      },
      {
        name: "variant",
        type: "string",
        options: "inset",
        default: "",
        description: "Applies the correct inset for use within mui-card-body to align slats and rules.",
      },
    ];

    const groupRows = groupPropItems
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

    const groupAccordions = groupPropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === groupPropItems.length - 1 ? "last-child" : "";

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
        title="Slat"
        description="Slat is a composable component designed to display table data on mobile devices. It provides flexible start and end slots, enabling consumers to tailor how data is presented in a mobile-friendly, stacked format. Slat is ideal for adapting complex table layouts into a clearer, more accessible experience on smaller screens."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slat/index.ts"
        accessibility="
          mui-slat uses role='row';
          slotted children inherit role='cell'
        "
        guides="https://guides.muibook.com/slat"
      >

          <mui-message heading="Quicklinks" slot="message">
            <mui-h-stack class="token-item-menu" alignY="center">
              <mui-link data-scroll-link="default">Default</mui-link>    
              <mui-link data-scroll-link="header">Header</mui-link>  
              <mui-link data-scroll-link="row">Row</mui-link>  
              <mui-link data-scroll-link="row-accessory">Row Accessory</mui-link>
              <mui-link data-scroll-link="action">Action</mui-link>
              <mui-link data-scroll-link="action-accessory">Action Accessory</mui-link>
              <mui-link data-scroll-link="card-desktop">Card: No Header</mui-link>
              <mui-link data-scroll-link="card-slat-default">Default Card & Slat </mui-link>
              <mui-link data-scroll-link="card-slat-bespoke">Bespoke Card & Slat </mui-link>
              <mui-link data-scroll-link="card-condensed">Card: Condensed</mui-link>
            </mui-h-stack>
          </mui-message>


      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-slat";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props: Slat">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Accessory">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${accessoryRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accessoryAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Group">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${groupRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${groupAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card
          id="default"
          title="Default" 
          description="Slats offer flexibility to surface key content and support custom layouts, or stacking."
          usage="Bring your own padding or margin."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body">
            <mui-heading slot="start" size="5">Heading</mui-heading>
            <mui-h-stack slot="end" space="var(--space-400)" alignX="flex-end">
              <mui-body width="20px">Body</mui-body>
            </mui-h-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-heading slot="start" size="5"&gt;...&lt;/mui-heading&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card
          id="header"
          title="Header" 
          description="Used at the top of a list or repeatable layout to label or introduce the content below."
          usage="Use with Row and Action variants where required.; Use heading size of 6 and choose the appropriate level for accessibility."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="header">
            <mui-heading slot="start" size="6" level="4">Heading</mui-heading>
            <mui-h-stack slot="end" alignX="end">
              <mui-body size="6" level="4">End slot</mui-body>
            </mui-h-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat variant="header"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Heading&lt;/mui-heading&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;End slot&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card
          id="row"
          title="Row" 
          description="The default variant, used to display individual items in a list or repeatable layout."
          usage="Use with Header and Action variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="row">
            <mui-v-stack slot="start" space="0">
              <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
              <mui-body size="small">Food & Drink</mui-body>
            </mui-v-stack>
            <mui-v-stack space="0" slot="end" alignX="end">
              <mui-body size="small">Pending</mui-body>
              <mui-body size="small">-$8.12</mui-body>
            </mui-v-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat variant="row"&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="end" alignX="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card 
          id="action"
          title="Action" 
          description="Used for interactive controls placed within or at the end of a list or repeatable layout."
          usage="Use with Row and Header variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="action">
            <mui-v-stack space="0" slot="start">
              <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
              <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
            </mui-v-stack>
          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat variant="action"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card 
          id="row-accessory"
          title="Row: Accessory" 
          description="Used for interactive controls (e.g. buttons, links) placed within or at the end of a list or repeatable layout."
          usage="Use with Row and Header variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="row">

            <mui-slat-accessory slot="accessory">
              <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
            </mui-slat-accessory>
            <mui-v-stack slot="start" space="0">
              <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
              <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
            </mui-v-stack>

            <mui-v-stack space="0" alignX="end" slot="end">
              <mui-body size="x-small">Pending</mui-body>
              <mui-body size="small" weight="bold">-$8.12</mui-body>
            </mui-v-stack>

          </mui-slat>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-slat variant="row"&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-slat-accessory slot="accessory"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-slat-accessory&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink • Richmond, VIC&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="end" space="0" alignX="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Pending&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;-&#36;8.12&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

        <story-card 
          id="action-accessory"
          title="Action: Accessory" 
          description="Used for interactive controls (e.g. buttons, links) placed within or at the end of a list or repeatable layout."
          usage="Use with Row and Header variants where required."
          usageLink="https://guides.muibook.com/slat">

          <mui-v-stack slot="body">

            <mui-slat variant="action">
              <mui-slat-accessory slot="accessory">
                <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
              </mui-slat-accessory>
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small" weight="bold">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-card>
              <mui-card-body>

                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Today</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">22 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>

                <mui-rule></mui-rule>

                <mui-v-stack space="var(--space-000)" style="margin-top: var(--space-200)">
                  <mui-slat variant="action">
                    <mui-slat-accessory slot="accessory">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-slat-accessory>
                    <mui-v-stack  slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-v-stack>

              </mui-card-body>          
            </mui-card>

            <mui-card>
              <mui-card-body condensed>
                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Today</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">22 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>
                <mui-rule></mui-rule>
                <mui-v-stack space="var(--space-000)">
                  <mui-slat variant="action">
                    <mui-slat-accessory slot="accessory">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-slat-accessory>
                    <mui-v-stack slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-v-stack>
              </mui-card-body>          
            </mui-card>

          </mui-v-stack>
          
          <mui-code slot="footer" scrollable>
            // PAGE USE
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-accessory slot="accessory"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-accessory&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink • Richmond, VIC&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="end" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;-$8.12&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            <br />
            // CARD USE
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)" style="margin-top: var(--space-200)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-accessory slot="accessory"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-accessory&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink • Richmond, VIC&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card&gt;<br />
            <br />
            // CONDENSED CARD USE
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body condensed&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-accessory slot="accessory"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-accessory&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink • Richmond, VIC&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card&gt;<br />
          </mui-code>

        </story-card>

        <story-card 
          id="card-desktop"
          title="Card: No Header" 
          description="Use Card with card-body when composing full-page views on desktop. This allows you to apply a max-width to the inner content, helping constrain layout elements like Slats or grouped sections into manageable columns. The Slat is intentionally flexible, so thoughtful layout and design decisions are still required. See the <mui-link size='small' href='#/wallet'>View the Wallet composition</mui-link> for an example of page-level usage."
          usage="
            Use mui-slat directly inside mui-card-body for simple page layouts.;
            Use mui-slat-group with offset if a heading is present or when tighter alignment is needed with surrounding elements.
          "
          usageLink="https://guides.muibook.com/slat"
          github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-slat/index.js"
          >

          <mui-card slot="body">
            <mui-card-body>
              <mui-slat variant="header">
                <mui-heading slot="start" size="6">Today</mui-heading>
                <mui-h-stack slot="end" alignX="end">
                  <mui-body size="small">22 July 2025</mui-body>
                </mui-h-stack>
              </mui-slat>

              <mui-rule></mui-rule>

              <mui-v-stack space="var(--space-000)" style="margin-top: var(--space-200)">
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
                    <mui-body size="small">Food & Drink</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="small">Pending</mui-body>
                    <mui-body size="small">-$8.12</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="medium" weight="bold">Apple App Store</mui-body>
                    <mui-body size="small">Entertainment</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="small">Pending</mui-body>
                    <mui-body size="small">-$4.99</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-v-stack>

             

              <mui-slat variant="header">
                <mui-heading slot="start" size="6">Yesterday</mui-heading>
                <mui-h-stack slot="end" alignX="end">
                  <mui-body size="small">21 July 2025</mui-body>
                </mui-h-stack>
              </mui-slat>

              <mui-rule></mui-rule>

              <mui-v-stack space="var(--space-000)" style="margin-top: var(--space-200)">
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="medium" weight="bold">IGA South Yarra</mui-body>
                    <mui-body size="small">Groceries</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="small">Pending</mui-body>
                    <mui-body size="medium">-$26.89</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-v-stack>

            </mui-card-body>          
          </mui-card>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)" style="margin-top: var(--space-200)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$8.12&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Apple App Store&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Entertainment&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$4.99&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;br /&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)" style="margin-top: var(--space-200)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;IGA South Yarra&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Groceries&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium"&gt;-$26.89&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;
          </mui-code>

        </story-card>

        <story-card 
          id="card-slat-default"
          title="Card Header & Slat: Default"
          description="
            If a mui-slat is slotted directly into the mui-card-body, 
            if will automatically align the slats with the heading to ensure consistent alignment within a card.
          "
          usage="
            mui-slat-group is added within the mui-card-body to apply an offset for the slat items;
            Place slats directly inside mui-card-body to inherit alignment.;
            Use this layout only for cards with limited width. For wider layouts, consider using a table.
          "
        >
          <mui-card slot="body">

            <mui-card-header>
              <mui-heading size="3">Account Activity</mui-heading>
              <mui-body>Here’s a summary of recent actions on your account.</mui-body>
            </mui-card-header>

            <mui-card-body>
              <!-- Today -->
              <mui-slat-group variant="inset">
                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Today</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">22 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                    <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">10:32 AM</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Password changed</mui-body>
                    <mui-body size="x-small">Security settings updated</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">08:47 AM</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <!-- Yesterday -->
                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Yesterday</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">21 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">2FA code sent</mui-body>
                    <mui-body size="x-small">Method: SMS</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">04:19 PM</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-slat-group>
            </mui-card-body>
            
          </mui-card>
        </story-card>

        <story-card
          id="card-slat-bespoke"
          title="Card Header & Slat: Bespoke"
          usage="
            mui-slat-group is added within the mui-card-body to apply an offset for the slat items;
            Applied padding-bottom of var(--space-500) on the mui-card-body to tighten space.;
            Applied margin-top of var(--space-500) on the mui-rule divider;
            Use this layout only for cards with limited width. For wider layouts, consider using a table.
          "
        >
          <mui-card slot="body">
            <mui-card-header>
              <mui-heading size="3">Account Activity</mui-heading>
              <mui-body>Here’s a summary of recent actions on your account.</mui-body>
            </mui-card-header>
            <mui-rule></mui-rule>
            <mui-card-body style="padding-bottom: var(--space-500);">
              <mui-slat-group variant="inset">
                <!-- Today -->
                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Today</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">22 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Signed in from new device</mui-body>
                    <mui-body size="x-small">Location: Sydney, Australia</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">10:32 AM</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Password changed</mui-body>
                    <mui-body size="x-small">Security settings updated</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">08:47 AM</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-rule style="margin-top: var(--space-500)"></mui-rule>
                <!-- Yesterday -->
                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Yesterday</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">21 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">2FA code sent</mui-body>
                    <mui-body size="x-small">Method: SMS</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">04:19 PM</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-slat-group>
            </mui-card-body>    
          </mui-card>
        </story-card>

        <story-card 
          id="card-condensed"
          title="Card: Condensed Usage" 
          description="For tighter layouts on desktop or <mui-link size='small' href='#/responsive'>mobile responsive views</mui-link>, apply condensed boolean to the card-body. Slats are already condensed, so edge-to-edge layouts work well as the viewport narrows. Again, the Slat is intentionally flexible — good design decisions are still important."
          usage=""
          usageLink="https://guides.muibook.com/slat"
          github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/components/mui-slat/index.js"
          >

          <mui-card slot="body">
            <mui-card-body condensed>
              <mui-slat variant="header">
                <mui-heading slot="start" size="6">Today</mui-heading>
                <mui-h-stack slot="end" alignX="end">
                  <mui-body size="small">22 July 2025</mui-body>
                </mui-h-stack>
              </mui-slat>

              <mui-rule></mui-rule>

              <mui-slat variant="action">
                <mui-v-stack slot="start" space="0">
                  <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
                  <mui-body size="small">Food & Drink</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-body size="small">Pending</mui-body>
                  <mui-body size="small">-$8.12</mui-body>
                </mui-v-stack>
              </mui-slat>
              <mui-rule></mui-rule>
              <mui-slat variant="action">
                <mui-v-stack slot="start" space="0">
                  <mui-body size="medium" weight="bold">Apple App Store</mui-body>
                  <mui-body size="small">Entertainment</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-body size="small">Pending</mui-body>
                  <mui-body size="small">-$4.99</mui-body>
                </mui-v-stack>
              </mui-slat>

              <mui-rule></mui-rule>

              <mui-slat variant="header">
                <mui-heading slot="start" size="6">Yesterday</mui-heading>
                <mui-h-stack slot="end" alignX="end">
                  <mui-body size="small">21 July 2025</mui-body>
                </mui-h-stack>
              </mui-slat>

              <mui-rule></mui-rule>

              <mui-v-stack space="var(--space-025)">
                <mui-slat variant="action">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="medium" weight="bold">IGA South Yarra</mui-body>
                    <mui-body size="small">Groceries</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="small">Pending</mui-body>
                    <mui-body size="medium">-$26.89</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          
          <mui-code slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body condensed&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$8.12&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Apple App Store&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Entertainment&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$4.99&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-025)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;IGA South Yarra&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Groceries&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium"&gt;-$26.89&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;
          </mui-code>

        </story-card>

      </mui-v-stack>

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

customElements.define("story-slat", storySlat);
