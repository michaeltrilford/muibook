class storyButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{text}, mui-icon-[name]",
        default: "(required)",
        description:
          "Add text or a single icon to the call-to-action. If using a custom icon, ensure it includes the mui-icon class to inherit styling.",
      },
      {
        name: "slot=&#8220;before&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Slot in an icon to appear before the text inside a button.",
      },
      {
        name: "slot=&#8220;after&#8221;",
        type: "slot (named)",
        options: "mui-icon-[name]",
        default: "",
        description: "Slot in an icon to appear after the text inside a button.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Change the size of the action",
      },
      {
        name: "variant",
        type: "string",
        options: "primary, secondary, tertiary, attention",
        default: "primary",
        description: "Describe the intent or mood of the action.",
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
        options: "mui-button::part(add-css-selector)",
        default: "",
        description:
          "Controlled trust-based customisation for modifying internal aspects of a button. <mui-link href='/#/text-part-selectors' size='x-small'>Learn more</mui-link>",
      },
      {
        name: "aria-label",
        type: "string",
        default: "",
        description:
          "Provides an accessible name for the button when no visible text is present. Required for icon-only buttons to ensure screen reader compatibility.",
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
          import "@muibook/components/mui-button";<br>
        </mui-code>
      </spec-card>

      <props-card title="Button">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Form submissions" id="form-submissions" description="Unfortunately, Web Components can’t rely on type='submit' to handle form submissions due to Shadow DOM boundaries. Instead, manual submission logic needs to be applied to ensure expected behavior.">
        <mui-button variant="primary" slot="body">Sign up</mui-button>
        <story-code-block slot="footer" scrollable>
        <mui-link size="x-small" href="/#/onboarding">👨‍💻 View working file</mui-link>
        <br>
        <br>
        const&nbsp;signUpButton&nbsp;=&nbsp;this.shadowRoot.querySelector("mui-button");<br /><br />
        if&nbsp;(signUpButton)&nbsp;{<br />
        &nbsp;&nbsp;&nbsp;&nbsp;signUpButton.addEventListener("click",&nbsp;()&nbsp;=&gt;&nbsp;this.handleSubmit());<br />
        }<br /><br />
        &lt;mui-button&nbsp;variant="primary"&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;...<br />
        &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="size-x-small"
        title="Size: X-Small" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size.
If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage="
          Micro-interactions that require clear, compact buttons;
          Application toolbars;
          Dense data tables;
          Compact control panels;
          Icon buttons in tight spaces;
          Inline editing actions
        "
      >    

        <mui-v-stack slot="body" alignx="stretch">
          <mui-h-stack alignx="end" alignY="center" space="var(--space-300)">
            <mui-h-stack alignx="start" space="var(--space-050)">
              <mui-button size="x-small" variant="tertiary">Make offer</mui-button>
              <mui-button size="x-small" variant="primary">Buy now</mui-button>
            </mui-h-stack>
            <mui-rule
              direction="vertical"
              length="var(--space-500)">
            </mui-rule>
            <mui-body size='x-small' weight="bold">0.06 GWEI</mui-body>
          </mui-h-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size='x-small' variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>

            <mui-button size='x-small' variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>

            <mui-button size='x-small' variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
          </mui-h-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the x-small toggle button uses (size="x-small") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size="x-small" id="btn" variant="primary">
              <mui-icon-toggle size='small'>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="x-small"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="size-small"
        title="Size: Small" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size.
If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage=" 
          Small/medium form inputs;
          Toolbar actions or discrete filter controls
        "
      >  
        <mui-v-stack slot="body">
          <mui-responsive breakpoint="1280">
            <mui-h-stack alignx="space-between" aligny="center" slot="showAbove" style="border-radius: var(--radius-200); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
              <mui-h-stack space="var(--space-300)">
              <mui-input label="Search" hide-label placeholder="Search by name, email, or ID..." style="min-width: 25rem; max-width: 25rem;"></mui-input>
              <mui-select label="Status" hide-label
                style="min-width: 12rem;"
                  options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              </mui-h-stack>
              <mui-h-stack space="var(--space-400)" aligny="center">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-chip dismiss>
                    Admin
                  </mui-chip>
                </mui-h-stack>
                <mui-button size="small" variant="tertiary">Reset Filter</mui-button>
              </mui-h-stack>
            </mui-h-stack>
            <mui-v-stack alignx="stretch" aligny="center" space="var(--space-300)" slot="showBelow" style="border-radius: var(--radius-100); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
              <mui-input label="Search" hide-label placeholder="Search by name, email, or ID..."></mui-input>
              <mui-select label="Status" hide-label
                  options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              <mui-h-stack space="var(--space-400)" aligny="center" alignx="space-between">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-chip dismiss>
                    Admin
                  </mui-chip>
                </mui-h-stack>
                <mui-button size="small" variant="tertiary">Reset Filter</mui-button>
              </mui-h-stack>
            </mui-v-stack>
          </mui-responsive>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size='small' variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>
            <mui-button size='small' variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button size='small' variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
          </mui-h-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the small toggle button uses (size="small") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size="small" id="btn" variant="primary">
              <mui-icon-toggle size='small'>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="small"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="size-medium"
        title="Size: Medium (Default)" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage=" 
          Standard form inputs (text fields, selects);
          Card components (primary and secondary actions);
          Modal dialogs;
          Navigation elements;
          Default body text context
        "
      >
        <mui-v-stack slot="body">
          <mui-card>
            <mui-card-header>
              <mui-heading size="3">Header</mui-heading>
            </mui-card-header>
            <mui-card-body>Body content...</mui-card-body>
            <mui-card-footer>
              <mui-button-group right>
                <mui-button variant="secondary">Cancel</mui-button>
                <mui-button variant="primary">Submit</mui-button>
              </mui-button-group>
            </mui-card-footer>
          </mui-card>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>
            <mui-button variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button variant="primary">
              <mui-icon-add size="small"></mui-icon-add>
            </mui-button>
          </mui-v-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Input Usage</mui-body>
            <mui-body size="small" style="max-width: 64ch;">Only the medium-sized input supports the before and after slots. These slots are not available for small or large input variants.</mui-body>
          </mui-v-stack>

          <mui-input label="Enter amount">
            <mui-button slot="before">
              Action
              <mui-icon-globe slot="before"></mui-icon-globe>
            </mui-button>
            <mui-button slot="after">
              Action
              <mui-icon-globe slot="after"></mui-icon-globe>
            </mui-button>
          </mui-input>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the medium toggle button uses (size="medium") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size="medium" id="btn" variant="primary">
              <mui-icon-toggle size='medium'>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="medium"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card
        id="size-large"
        title="Size: Large" 
        description="When a button includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the button will respect the value you set."
        usage=" 
          Large headings (H1, H2);
          Hero sections;
          Large form inputs (search bars, prominent forms);
          Empty states with calls-to-action;
          Marketing/landing page content
        "
      >
        <mui-v-stack slot="body">
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="medium"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>
          <mui-v-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-button size='large' variant="primary">
              Add New
              <mui-icon-add slot="before"></mui-icon-add>
            </mui-button>
            <mui-button size='large' variant="primary">
              More
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button size='large' variant="primary">
              <mui-icon-add></mui-icon-add>
            </mui-button>
          </mui-v-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Toggle Button / Icon-Only</mui-body>
            <mui-body size="small" style="max-width: 60ch;">Authors can provide a custom icon size when needed. In the example below, the large toggle button uses (size="large") to maintain visual balance.</mui-body>
          </mui-v-stack>
          <mui-button size="large" id="btn" variant="primary">
            <mui-icon-toggle size="large">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button size="large"&gt;...&lt;/mui-button&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card title="Primary" id="primary">
        <mui-button variant="primary" slot="body">Submit</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Secondary" id="secondary">
        <mui-button variant="secondary" slot="body">Cancel</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Tertiary" id="tertiary">
        <mui-button variant="tertiary" slot="body">Cancel</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="tertiary"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Attention" id="attention">
        <mui-button variant="attention" slot="body">Delete</mui-button>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="attention"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>


      <story-card title="Disabled" id="disabled">
        <mui-v-stack slot="body" space="var(--space-200)" alignX="start">
          <mui-button disabled>Submit</mui-button>
          <mui-button disabled variant="primary">Submit</mui-button>
          <mui-button disabled variant="secondary">Submit</mui-button>
          <mui-button disabled variant="tertiary">Submit</mui-button>
          <mui-button disabled variant="attention">Submit</mui-button>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button disabled&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="button-group"
        title="Header: Button-Group" 
        description="Example of actions that are present at the top of a page or card use."
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-button-group right slot="body">
          <mui-button variant="secondary">
            Export
            <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-button variant="primary">
              New Report
            </mui-button>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button-group right&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;...&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;...&lt;/mui-button&gt;
          <br />
          &lt;/mui-button-group&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="footer-button-group"
        title="Footer: Button-Group" 
        description="Example of actions in a card, dialog or drawer."
      >
        <mui-button-group right slot="body">
          <mui-button variant="secondary">Cancel</mui-button>
          <mui-button variant="primary">Submit</mui-button>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button-group right&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;...&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="primary"&gt;...&lt;/mui-button&gt;
          <br />
          &lt;/mui-button-group&gt;
        </story-code-block>
      </story-card>

      <story-card title="Icon (Before & After)"
        id="icon-before-after"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >

        <mui-v-stack slot="body" space="var(--space-200)" alignX="start">
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
        
        <story-code-block slot="footer" scrollable>
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
          &nbsp;&nbsp;&lt;mui-icon-down-chevron slot="after"&gt;&lt;/mui-icon-down-chevron&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Primary: Icon-Only"
        id="primary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="primary">Share</mui-button>
            <mui-button variant="primary"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="primary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Secondary: Icon-Only"
        id="secondary-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="secondary">Share</mui-button>
            <mui-button variant="secondary"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="secondary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="tertiary-icon-only"
        title="Tertiary: Icon-Only" 
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="tertiary">Share</mui-button>
            <mui-button variant="tertiary"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="tertiary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="tertiary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Attention: Icon-Only"
        id="attention-icon-only"
        usage='
          Use small (default) size icon when paired with text-based action is used in a button group.;
          Use medium size icon when the icon-only action appears on its own. E.g. Menu
        '
        usageLink="https://guides.muibook.com/button"
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-button variant="attention">Share</mui-button>
            <mui-button variant="attention"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-button variant="attention" >
            <mui-icon-warning size="medium"></mui-icon-warning>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="attention"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-button&gt;
        </story-code-block>
      </story-card>

      <story-card title="Icon Toggle: Default" id="icon-toggle-default"
        usage='
          Use medium size icon when the icon-only action appears on its own. E.g. Menu;
          Use small (default) size icon when paired with text-based action is used in a button group.
        '
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button variant="primary">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="secondary">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="tertiary">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="attention">  
            <mui-icon-toggle size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>

      <story-card title="Icon Toggle: Rotate" id="icon-toggle-rotate"
        usage='
          Use medium size icon when the icon-only action appears on its own. E.g. Menu;
          Use small (default) size icon when paired with text-based action is used in a button group.
        '
      >
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button variant="primary">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="secondary">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="tertiary">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
          <mui-button variant="attention">  
            <mui-icon-toggle rotate size="medium">
              <mui-icon-add slot="start"></mui-icon-add>
              <mui-icon-subtract slot="end"></mui-icon-subtract>
            </mui-icon-toggle>
          </mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
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
        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template title="Button" 
        description="Buttons are essential UI elements that trigger actions when clicked or tapped. They should be easily recognisable, provide clear feedback, and be accessible to all users."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-570&t=fSFYVey9aCoE5oQa-1" 
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-button/index.ts"
        guides="https://guides.muibook.com/button"
        storybook="https://stories.muibook.com/?path=/docs/actions-button--docs"
      >
        <mui-message heading="Quicklinks" slot="message">
          <mui-h-stack class="token-item-menu" alignY="center" style="padding-bottom: var(--space-100);">
            <mui-link size="small" data-scroll-link="form-submissions">Form submissions</mui-link>  
            <mui-link size="small" data-scroll-link="size-x-small">Size: X-Small</mui-link>
            <mui-link size="small" data-scroll-link="size-small">Size: Small</mui-link>
            <mui-link size="small" data-scroll-link="size-medium">Size: Medium</mui-link>
            <mui-link size="small" data-scroll-link="size-large">Size: Large</mui-link>
            <mui-link size="small" data-scroll-link="primary">Primary</mui-link>
            <mui-link size="small" data-scroll-link="secondary">Secondary</mui-link>
            <mui-link size="small" data-scroll-link="tertiary">Tertiary</mui-link>
            <mui-link size="small" data-scroll-link="attention">Attention</mui-link>
            <mui-link size="small" data-scroll-link="disabled">Disabled</mui-link>
            <mui-link size="small" data-scroll-link="primary-icon-only">Primary: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="secondary-icon-only">Secondary: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="tertiary-icon-only">Tertiary: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="attention-icon-only">Attention: Icon-Only</mui-link>
            <mui-link size="small" data-scroll-link="icon-toggle-default">Icon Toggle: Default</mui-link>
            <mui-link size="small" data-scroll-link="icon-toggle-rotate">Icon Toggle: Rotate</mui-link>
            
          </mui-h-stack>
        </mui-message>

        ${stories}
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

customElements.define("story-button", storyButton);
