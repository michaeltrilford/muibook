export const muiPrompts = [
  {
    role: "system",
    content: `
You convert UI prompts into MUI-style custom elements.
Supported components:
- Inputs: <mui-addon>, <mui-checkbox>, <mui-field>, <mui-file-upload>, <mui-input>, <mui-progress>, <mui-select>, <mui-switch>
- Content: <mui-accordion>, <mui-heading>, <mui-body>, <mui-code>, <mui-dialog>, <mui-drawer>, <mui-quote>, <mui-slat>, <mui-smart-card>, <mui-table>, <mui-image>, <figcaption>, <img>, <mui-list>, <mui-list-item>, <mui-icon-*>
- Layout: <mui-card>, <mui-container>, <mui-responsive>, <mui-rule>, <mui-v-stack>, <mui-h-stack>, <mui-grid>
- Feedback: <mui-alert>, <mui-badge>, <mui-message>, <mui-loader>
- Actions: <mui-button>, <mui-button-group>, <mui-chip>, <mui-dropdown>, <mui-link>
- Navigation: <mui-carousel-controller>, <mui-stepper>, <mui-step>, <mui-tab-controller>, <mui-tab-bar>, <mui-tab-item>
Rules:
- If 'mui-scan' is detected, convert the mui-scan code to web components. Refer to this prompt file for context on how to use the components.
- For mui-scan, preserve the hierarchy and nesting of elements as in the original design.
- When translating mui-scan code, if you encounter <mui-v-stack>, <mui-h-stack>, or <mui-grid>, append the inline styles like this: <mui-v-stack style="...">.
- All mui-* components should carry over their props, appended like this: <mui-v-stack space="..." alignx="..." aligny="...">.
- Maintain proper closing of all custom elements to avoid HTML parsing issues.
- When responding to a text prompt, strictly follow the user’s directions. Do not include text, content, or components unrelated to the request.
`,
  },
  {
    role: "assistant",
    name: "examples",
    content: JSON.stringify({
      // Inputs
      field: {
        placeholder: `<mui-field label="Email"><mui-input type="email" placeholder="you@example.com" value="..."></mui-input></mui-field>`,
        message: `<mui-field label="Name" message="This field doesn't accept special characters"><mui-input></mui-input></mui-field>`,
        select: `<mui-field label="Brand"><mui-select options='[{ "value": "jpy", "label": "JPY" },{ "value": "usd", "label": "USD" }]'></mui-select></mui-field>`,
        inputAndSelect: `<mui-field label="Amount to transfer" slot="body"><mui-input type="number"><mui-select slot="after" label="Currency" hide-label style="width: 100px;" options='[{ "value": "jpy", "label": "JPY" },{ "value": "usd", "label": "USD" }]'></mui-select></mui-input></mui-field>`,
      },
      addon: `<mui-addon>...</mui-addon>`,
      checkbox: `<mui-checkbox>...</mui-checkbox>`,
      fileUpload: `<mui-file-upload>...</mui-file-upload>`,
      input: `<mui-input>...</mui-input>`,
      progress: `<mui-progress>...</mui-progress>`,
      select: `<mui-select>...</mui-select>`,
      switch: `<mui-switch>...</mui-switch>`,

      // Content
      slat: {
        default: `<mui-slat><mui-heading slot="start" size="5">...</mui-heading><mui-h-stack slot="end"><mui-body>...</mui-body></mui-h-stack></mui-slat>`,
        header: `<mui-slat variant="header"><mui-heading slot="start" size="6">Heading</mui-heading><mui-h-stack slot="end" alignX="end"><mui-body size="small">End slot</mui-body></mui-h-stack></mui-slat>`,
        row: `<mui-slat variant="row"><mui-v-stack slot="start"><mui-body size="medium" weight="bold">...</mui-body><mui-body size="small">...</mui-body></mui-v-stack><mui-v-stack slot="end" alignX="end"><mui-body size="small">...</mui-body><mui-body size="small">...</mui-body></mui-v-stack></mui-slat>`,
        action: `<mui-slat variant="action"><mui-v-stack slot="start"><mui-body size="medium" weight="bold">...</mui-body><mui-body size="small">...</mui-body></mui-v-stack></mui-slat>`,
      },
      table: {
        basic: `<mui-table><mui-row-group heading><mui-row columns="1fr 1fr"><mui-cell>Heading 1</mui-cell><mui-cell>Heading 2</mui-cell></mui-row></mui-row-group><mui-row-group><mui-row columns="1fr 1fr"><mui-cell>Row 1</mui-cell><mui-cell>Row 1</mui-cell></mui-row></mui-row-group></mui-table>`,
      },
      accordion: {
        block: `<mui-accordion-group><mui-accordion-block heading="Section A"><div slot="detail">...</div></mui-accordion-block><mui-accordion-block heading="Section B"><div slot="detail">...</div></mui-accordion-block></mui-accordion-group>`,
        inline: `<mui-accordion-inline heading="..."><mui-list as="ul" slot="detail">...</mui-list></mui-accordion-inline>`,
        exclusiveGroup: `<mui-accordion-group exclusive><mui-accordion-block heading="..."><div slot="detail">...</div></mui-accordion-block><mui-accordion-block heading="..."><div slot="detail">...</div></mui-accordion-block></mui-accordion-group>`,
        withLinks: `<mui-accordion-block heading="..." detail-space="none" style="width:26rem;"><mui-v-stack slot="detail" space="var(--space-000)" style="padding:var(--space-100)"><mui-link variant="tertiary" class="nav-link">...</mui-link><mui-link variant="tertiary" class="nav-link">...</mui-link><mui-link variant="tertiary" class="nav-link">...</mui-link></mui-v-stack></mui-accordion-block>`,
        slat: `<mui-accordion-group exclusive><mui-accordion-block heading="..."><mui-v-stack slot="detail"><mui-body>...</mui-body><mui-slat-group><mui-slat variant="header"><mui-heading slot="start" size="6">...</mui-heading><mui-h-stack slot="end" alignX="end"><mui-body size="small">...</mui-body></mui-h-stack></mui-slat><mui-slat variant="action"><mui-v-stack slot="start" space="0"><mui-body size="small" weight="bold">...</mui-body><mui-body size="x-small">...</mui-body></mui-v-stack><mui-v-stack space="0" slot="end" alignX="end"><mui-body size="x-small">...</mui-body></mui-v-stack></mui-slat><mui-slat variant="action"><mui-v-stack slot="start" space="0"><mui-body size="small" weight="bold">...</mui-body><mui-body size="x-small">...</mui-body></mui-v-stack><mui-v-stack space="0" slot="end" alignX="end"><mui-body size="x-small">...</mui-body></mui-v-stack></mui-slat><mui-rule></mui-rule></mui-slat-group></mui-v-stack></mui-accordion-block><mui-accordion-block heading="..."><mui-v-stack slot="detail" space="var(--space-200)" style="max-width:400px;margin:var(--space-200) auto 0;">...</mui-v-stack></mui-accordion-block></mui-accordion-group>`,
      },
      image: {
        default: `<mui-image><img slot="image" src="https://muibook.com/images/buttercup.png" alt="..."/></mui-image>`,
        caption: `<mui-image><img slot="image" src="https://muibook.com/images/buttercup.png" alt="..."/><figcaption slot="caption">This is a caption</figcaption></mui-image>`,
      },
      heading: `<mui-heading>...</mui-heading>`,
      body: `<mui-body>...</mui-body>`,
      code: `<mui-code>...</mui-code>`,
      dialog: `<mui-dialog>...</mui-dialog>`,
      drawer: `<mui-drawer>...</mui-drawer>`,
      quote: `<mui-quote>...</mui-quote>`,
      list: `<mui-list>...</mui-list>`,
      listItem: `<mui-list-item>...</mui-list-item>`,
      icon: `<mui-icon-...></mui-icon-...>`,

      smartCard: {
        plain: `<mui-smart-card number="1234" type="Debit" logo="https://muibook.com/images/image-220.png" partner="https://muibook.com/images/visa-black.svg" variant="plain"/>`,
      },

      // Layout
      card: `<mui-card>...</mui-card>`,
      container: `<mui-container>...</mui-container>`,
      responsive: `<mui-responsive>...</mui-responsive>`,
      rule: `<mui-rule />`,
      vStack: `<mui-v-stack>...</mui-v-stack>`,
      hStack: `<mui-h-stack>...</mui-h-stack>`,
      grid: `<mui-grid>...</mui-grid>`,

      // Feedback
      alert: {
        success: `<mui-alert variant="success">...</mui-alert>`,
        info: `<mui-alert variant="info">...</mui-alert>`,
        warning: `<mui-alert variant="warning">...</mui-alert>`,
        attention: `<mui-alert variant="attention">...</mui-alert>`,
        errorWithButton: `<mui-alert variant="error"><mui-button slot="action"><mui-icon-close></mui-icon-close></mui-button></mui-alert>`,
        successWithButton: `<mui-alert variant="success"><mui-button slot="action">Undo</mui-button></mui-alert>`,
        warningWithLink: `<mui-alert variant="warning"><mui-link slot="action">Upgrade</mui-link></mui-alert>`,
      },
      badge: `<mui-badge>...</mui-badge>`,
      loader: `<mui-loader>...</mui-loader>`,

      // Actions
      button: {
        primary: `<mui-button variant="primary">...</mui-button>`,
        secondary: `<mui-button variant="secondary">...</mui-button>`,
        tertiary: `<mui-button variant="tertiary">...</mui-button>`,
        attention: `<mui-button variant="attention">...</mui-button>`,
        before: `<mui-button variant="primary">Add New<mui-icon-add slot="before" size="x-small"></mui-icon-add></mui-button>`,
        after: `<mui-button variant="primary">More<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron></mui-button>`,
        iconOnly: `<mui-button variant="primary"><mui-icon-add></mui-icon-add></mui-button>`,
        disabled: `<mui-button disabled>...</mui-button>`,
        toggle: `<mui-button id="btn" variant="primary"><mui-icon-toggle><mui-icon-add slot="start"></mui-icon-add><mui-icon-subtract slot="end"></mui-icon-subtract></mui-icon-toggle></mui-button>`,
        toggleRotate: `<mui-button id="btn" variant="primary"><mui-icon-toggle rotate><mui-icon-add slot="start"></mui-icon-add><mui-icon-subtract slot="end"></mui-icon-subtract></mui-icon-toggle></mui-button>`,
      },
      buttonGroup: {
        default: `<mui-button-group>...</mui-button-group>`,
        alignedRight: `<mui-button-group right>...</mui-button-group>`,
      },
      chip: `<mui-chip>...</mui-chip>`,
      dropdown: `<mui-dropdown>...</mui-dropdown>`,
      link: `<mui-link>...</mui-link>`,

      // Navigation
      carouselController: `<mui-carousel-controller>...</mui-carousel-controller>`,
      stepper: `<mui-stepper>...</mui-stepper>`,
      step: `<mui-step>...</mui-step>`,
      tabController: `<mui-tab-controller>...</mui-tab-controller>`,
      tabBar: `<mui-tab-bar>...</mui-tab-bar>`,
      tabItem: `<mui-tab-item>...</mui-tab-item>`,
    }),
  },
];
