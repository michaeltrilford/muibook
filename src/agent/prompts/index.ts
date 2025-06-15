export const muiPrompts = [
  {
    role: "system",
    content:
      "You are an assistant that converts UI prompts into MUI-style web components using custom tags like <mui-v-stack> and <mui-button>. Each user message may include tags like [button], [card], etc. Use these to help determine intent.",
  },
  { role: "user", content: "[card] Create a vertical stack with two cards" },
  {
    role: "assistant",
    content:
      '<mui-v-stack space="var(--space-400)">\n  <mui-card>...</mui-card>\n  <mui-card>...</mui-card>\n</mui-v-stack>',
  },
  // CONTAINER
  { role: "user", content: "[layout] Create a small container" },
  { role: "assistant", content: "<mui-container small>...</mui-container>" },
  { role: "user", content: "[layout] Create a medium container" },
  { role: "assistant", content: "<mui-container medium>...</mui-container>" },
  { role: "user", content: "[layout] Create a large container" },
  { role: "assistant", content: "<mui-container large>...</mui-container>" },
  { role: "user", content: "[layout] Create a fluid container" },
  { role: "assistant", content: "<mui-container fluid>...</mui-container>" },
  { role: "user", content: "[layout] Create a small container and centered" },
  { role: "assistant", content: "<mui-container small center>...</mui-container>" },
  { role: "user", content: "[button] Create a primary button" },
  { role: "assistant", content: "<mui-button variant='primary'>...</mui-button>" },

  // NEW TAGGED PROMPTS
  {
    role: "user",
    content: "[input] Add a field to enter an email address",
  },
  {
    role: "assistant",
    content: `<mui-field label="Email">\n  <mui-input type="email" placeholder="you@example.com"></mui-input>\n</mui-field>`,
  },
  {
    role: "user",
    content: "[table] Show a table with 3 columns and 2 rows",
  },
  {
    role: "assistant",
    content: `<mui-table>
  <mui-row-group heading>
    <mui-row columns="1fr 1fr 1fr">
      <mui-cell>Heading 1</mui-cell>
      <mui-cell>Heading 2</mui-cell>
      <mui-cell>Heading 3</mui-cell>
    </mui-row>
  </mui-row-group>
  <mui-row-group>
    <mui-row columns="1fr 1fr 1fr">
      <mui-cell>Row 1</mui-cell>
      <mui-cell>Row 1</mui-cell>
      <mui-cell>Row 1</mui-cell>
    </mui-row>
    <mui-row columns="1fr 1fr 1fr">
      <mui-cell>Row 2</mui-cell>
      <mui-cell>Row 2</mui-cell>
      <mui-cell>Row 2</mui-cell>
    </mui-row>
  </mui-row-group>
</mui-table>`,
  },
  {
    role: "user",
    content: "[accordion] Add a block accordion with two sections",
  },
  {
    role: "assistant",
    content: `<mui-accordion-group>
  <mui-accordion-block heading="Section A">
    <div slot="detail">Details A</div>
  </mui-accordion-block>
  <mui-accordion-block heading="Section B">
    <div slot="detail">Details B</div>
  </mui-accordion-block>
</mui-accordion-group>`,
  },
  {
    role: "user",
    content: "[icon] Add an accessibility icon",
  },
  {
    role: "assistant",
    content: "<mui-icon-accessibility></mui-icon-accessibility>",
  },
  {
    role: "user",
    content: "[image] Show an image with a caption",
  },
  {
    role: "assistant",
    content: `<mui-image>
  <img slot="image" src="..." alt="Descriptive alt text" />
  <figcaption slot="caption">This is a caption</figcaption>
</mui-image>`,
  },

  {
    role: "user",
    content: "[stack] Create a horizontal stack with two cards and spacing",
  },
  {
    role: "assistant",
    content: `<mui-h-stack space="var(--space-500)">\n  <mui-card>...</mui-card>\n  <mui-card>...</mui-card>\n</mui-h-stack>`,
  },

  {
    role: "user",
    content: "[stack] Create a vertical stack with two cards and spacing",
  },
  {
    role: "assistant",
    content: `<mui-v-stack space="var(--space-500)">\n  <mui-card>...</mui-card>\n  <mui-card>...</mui-card>\n</mui-v-stack>`,
  },

  {
    role: "user",
    content: "[layout] Create a grid with 2 columns and card content",
  },
  {
    role: "assistant",
    content: `<mui-grid col="1fr 1fr" space="var(--space-200)">\n  <mui-card>...</mui-card>\n  <mui-card>...</mui-card>\n</mui-grid>`,
  },

  {
    role: "user",
    content: "[responsive] Show a div above 600px and a different one below",
  },
  {
    role: "assistant",
    content: `<mui-responsive breakpoint="600">\n  <div slot="showAbove">...</div>\n  <div slot="showBelow">...</div>\n</mui-responsive>`,
  },

  {
    role: "user",
    content: "[rule] Insert a horizontal divider",
  },
  {
    role: "assistant",
    content: `<mui-rule direction="horizontal" length="100%"></mui-rule>`,
  },

  {
    role: "user",
    content: "[rule] Insert a vertical rule of 100px",
  },
  {
    role: "assistant",
    content: `<mui-rule direction="vertical" length="100px"></mui-rule>`,
  },

  {
    role: "user",
    content: "[card] Create a card with heading and footer actions",
  },
  {
    role: "assistant",
    content: `<mui-card>
  <mui-card-header>
    <mui-heading size="3">...</mui-heading>
  </mui-card-header>
  <mui-card-body>...</mui-card-body>
  <mui-card-footer>
    <mui-button-group right>
      <mui-button variant="secondary">Cancel</mui-button>
      <mui-button variant="primary">Submit</mui-button>
    </mui-button-group>
  </mui-card-footer>
</mui-card>`,
  },

  {
    role: "user",
    content: "[table] Show a table with heading row and add buttons",
  },
  {
    role: "assistant",
    content: `<mui-card>
  <mui-card-header>
    <mui-heading size="3">Title</mui-heading>
  </mui-card-header>
  <mui-rule></mui-rule>
  <mui-card-body>
    <mui-table>
      <mui-row-group heading>
        <mui-row columns="1fr 1fr 1fr auto">
          <mui-cell heading>Office</mui-cell>
          <mui-cell heading>Revenue</mui-cell>
          <mui-cell heading>Cost</mui-cell>
          <mui-cell heading action></mui-cell>
        </mui-row>
      </mui-row-group>
      <mui-row-group>
        <mui-row columns="1fr 1fr 1fr auto">
          <mui-cell>Whalen</mui-cell>
          <mui-cell>$4,400.00</mui-cell>
          <mui-cell>$1,100.00</mui-cell>
          <mui-cell action>
            <mui-button variant="tertiary">
              <mui-icon-add size="small"></mui-icon-add>
            </mui-button>
          </mui-cell>
        </mui-row>
      </mui-row-group>
    </mui-table>
  </mui-card-body>
</mui-card>`,
  },
  {
    role: "system",
    content:
      "You are an assistant that converts UI prompts into MUI-style web components using custom tags like <mui-button>, <mui-alert>, <mui-message>, <mui-badge>, <mui-tab-controller>, and <mui-carousel-controller>. Each user message may include tags like [button], [alert], [tab], etc. Use these to help determine intent.",
  },

  // Alerts
  { role: "user", content: "[alert] Show a success alert" },
  { role: "assistant", content: `<mui-alert variant="success">...</mui-alert>` },

  { role: "user", content: "[alert] Show an error alert" },
  { role: "assistant", content: `<mui-alert variant="error">...</mui-alert>` },

  // Messages
  { role: "user", content: "[message] Create an info message with heading and body" },
  {
    role: "assistant",
    content: `<mui-message heading="Message heading" variant="info">
  <mui-body>...</mui-body>
</mui-message>`,
  },

  { role: "user", content: "[message] Create a positive message with link" },
  {
    role: "assistant",
    content: `<mui-message heading="Message heading" variant="positive">
  <mui-body>The report has been...</mui-body>
  <mui-link>Download Your Report</mui-link>
</mui-message>`,
  },

  { role: "user", content: "[message] Create a message with a list" },
  {
    role: "assistant",
    content: `<mui-message heading="Message heading">
  <mui-list as="ul">
    <mui-list-item size="small">Item 1</mui-list-item>
    <mui-list-item size="small">Item 2</mui-list-item>
  </mui-list>
</mui-message>`,
  },

  // Badges
  { role: "user", content: "[badge] Show a warning badge" },
  { role: "assistant", content: `<mui-badge variant="warning">...</mui-badge>` },

  // Buttons
  { role: "user", content: "[button] Create a primary button" },
  { role: "assistant", content: `<mui-button variant="primary">...</mui-button>` },

  { role: "user", content: "[button-group] Create a right-aligned button group with cancel and submit" },
  {
    role: "assistant",
    content: `<mui-button-group right>
  <mui-button variant="secondary">Cancel</mui-button>
  <mui-button variant="primary">Submit</mui-button>
</mui-button-group>`,
  },

  { role: "user", content: "[button] Create a tertiary button with add icon" },
  {
    role: "assistant",
    content: `<mui-button variant="tertiary">
  <mui-icon-add></mui-icon-add>
</mui-button>`,
  },

  // Links
  { role: "user", content: "[link] Create a primary link" },
  { role: "assistant", content: `<mui-link variant="primary" href="links.html">...</mui-link>` },

  { role: "user", content: "[link] Create a small sized link" },
  { role: "assistant", content: `<mui-link size="small">Link text</mui-link>` },

  // Tabs
  { role: "user", content: "[tab] Create a tab controller with three tabs" },
  {
    role: "assistant",
    content: `<mui-tab-controller>
  <mui-tab-bar>
    <mui-tab-item active id="item1">Item 1</mui-tab-item>
    <mui-tab-item id="item2">Item 2</mui-tab-item>
    <mui-tab-item id="item3">Item 3</mui-tab-item>
  </mui-tab-bar>
  <mui-tab-panel item="item1">Content 1</mui-tab-panel>
  <mui-tab-panel item="item2">Content 2</mui-tab-panel>
  <mui-tab-panel item="item3">Content 3</mui-tab-panel>
</mui-tab-controller>`,
  },

  // Carousel
  { role: "user", content: "[carousel] Create a carousel controller with tabs and panels" },
  {
    role: "assistant",
    content: `<mui-carousel-controller>
  <mui-tab-bar slot="controls">
    <mui-tab-item active id="one">1</mui-tab-item>
    <!-- Add other tabs -->
  </mui-tab-bar>
  <mui-carousel-panel slot="item" item="one">
    <mui-grid col="1fr" style="padding-bottom: var(--carousel-tab-offset);">
      <mui-v-stack style="padding: var(--space-500) var(--space-600);">
        <mui-heading level="3" size="2">Item 1</mui-heading>
        <mui-body>Content...</mui-body>
      </mui-v-stack>
    </mui-grid>
  </mui-carousel-panel>
  <!-- Add other panels -->
</mui-carousel-controller>`,
  },
];
