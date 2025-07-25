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
              <mui-link data-scroll-link="card-desktop">Card: Desktop</mui-link>
              <mui-link data-scroll-link="card-desktop">Card: Responsive</mui-link>
              <mui-link data-scroll-link="card-desktop">Card: Custom</mui-link>
              <mui-link data-scroll-link="custom-row">Custom Row</mui-link>
              <mui-link data-scroll-link="custom-action">Custom Action</mui-link>
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
          title="Card: Desktop Usage" 
          description="Use Card with card-body when composing full-page views on desktop. This allows you to apply a max-width to the inner content, helping constrain layout elements like Slats or grouped sections into manageable columns. The Slat is intentionally flexible, so thoughtful layout and design decisions are still required. See the <mui-link size='small' href='#/wallet'>View the Wallet composition</mui-link> for an example of page-level usage."
          usage=""
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



        <story-card 
          id="card-custom"
          title="Card: Custom Row & Spacing" 
          description="When using Slats inside a Card, you can style the rows as needed. Use your own CSS and the Rule component to add dividers or spacing where appropriate. This gives you control to align with your layout or visual hierarchy."
          usage="Use CSS or target the --slat-radius token to turn off radius on the slat; Then map the local component within the card."
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

              <mui-v-stack space="var(--space-000)">
                <mui-slat variant="action" style="--slat-radius: 0;">
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
                    <mui-body size="small">Food & Drink</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="small">Pending</mui-body>
                    <mui-body size="small">-$8.12</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat variant="action" style="--slat-radius: 0;">
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

              <mui-v-stack space="var(--space-000)">
                <mui-slat variant="action" style="--slat-radius: 0;">
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
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" style="--slat-radius: 0;"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Pending&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;-$8.12&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" style="--slat-radius: 0;"&gt;<br />
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
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" style="--slat-radius: 0;"&gt;<br />
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
          id="custom-row"
          title="Custom Row" 
          description="You can customise the Row variant by overriding design tokens, adding custom styles, or using layout helpers like the Rule component. When composing your experience in your framework with our components, you will be creating local modular components in your app for reuse and should use the styling approach that suits your setup, such as CSS Modules, Shadow DOM styles or another method."
          usage="
            Redefine the provided design tokens under components with values that suit your visual style.;
            In our case, we added a class and mapped the tokens to styles that matched the design.
          "
          usageLink="https://guides.muibook.com/slat">

          <div slot="body">
            <mui-slat variant="row" class="slat">
              <mui-v-stack space="0" slot="start">
                <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
                <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
              </mui-v-stack>
            </mui-slat>
            <mui-slat  variant="row" class="slat">
              <mui-v-stack space="0" slot="start">
                <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
                <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
              </mui-v-stack>
            </mui-slat>
          </div>
          
          <mui-code slot="footer" scrollable>
            // CSS Only Approach
            <br />
            /* =================================== */
            <br />
            <br />
            .slat {
            <br />
            &nbsp;&nbsp;--slat-background: var(--black-opacity-0);
            <br />
            &nbsp;&nbsp;--slat-radius: var(--radius-000);
            <br />
            &nbsp;&nbsp;border-bottom: var(--border-thin);
            <br />
            }
            <br />
            .slat:last-of-type {
            <br />
            &nbsp;&nbsp;border-bottom: none;
            <br />
            }
            <br />
            <br />
            &lt;mui-slat variant="row" class="slat"&gt;
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
            <br />
            <br />
            &lt;mui-slat variant="row" class="slat"&gt;
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
            <br />
            <br />
            <br />
            // CSS & Supporting Components
            <br />
            /* =================================== */
            <br />
            <br />
            // ⚠️ Rule required
            <br />
            <br />
            import "@muibook/components/mui-rule";
            <br />
            <br />
            .slat {
            <br />
            &nbsp;&nbsp;--slat-background: var(--black-opacity-0);
            <br />
            &nbsp;&nbsp;--slat-radius: var(--radius-000);
            }
            <br />
            <br />
            // Slat
            <br />
            <br />
            &lt;mui-slat variant="row" class="slat"&gt;
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
            <br />
            <br />
            &lt;mui-rule&gt;&lt;/mui-rule&gt;
            <br />
            <br />
            &lt;mui-slat variant="row" class="slat"&gt;
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
            <br />
            <br />
            <br />
          </mui-code>

        </story-card>

        <story-card 
          id="custom-action"
          title="Custom Action" 
          description="You can customise actions in a few different ways. This includes using design tokens, composing the default Slat within a Button, or adding your own event handlers and accessibility roles. The last option gives you more control but requires more effort."
          usage="
            Redefine the provided design tokens under components with values that suit your visual style.;
            In our case, we added a class and mapped the tokens to styles that matched the design.
          "
          usageLink="https://guides.muibook.com/slat">

          <mui-slat slot="body" variant="action" class="slat">
            <mui-v-stack space="0" slot="start">
              <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
              <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
            </mui-v-stack>
          </mui-slat>
          <mui-slat slot="body" variant="action" class="slat">
            <mui-v-stack space="0" slot="start">
              <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
              <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
            </mui-v-stack>
          </mui-slat>

          
          <mui-code slot="footer" scrollable>
            // Bespoke styles
            <br />
            <br />
            .slat {
            <br />
            &nbsp;&nbsp;--slat-background: var(--black-opacity-0);
            <br />
            &nbsp;&nbsp;--slat-radius: var(--radius-000);
            <br />
            &nbsp;&nbsp;--slat-background-hover: var(--surface-recessed-alpha);
            <br />
            &nbsp;&nbsp;border-bottom: var(--border-thin);
            <br />
            }
            <br />
            .slat:last-of-type {
            <br />
            &nbsp;&nbsp;border-bottom: none;
            <br />
            }
            <br />
            <br />
            // Slat
            <br />
            <br />
            &lt;mui-slat variant="action" class="slat"&gt;
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
