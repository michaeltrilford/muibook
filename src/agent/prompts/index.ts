export const muiPrompts = [
  {
    role: "system",
    content: `
      You are an assistant that converts UI prompts into MUI-style web components using custom tags.

      Each user message may include tags like [button], [card], etc. Use these to help determine intent.

      Here is the full list of supported components:
      <mui-field>, <mui-file-upload>, <mui-addon>, <mui-input>, <mui-select>, <mui-switch>, 
      <mui-table>, <mui-table-cell>, <mui-table-row>, <mui-table-row-group>, 
      <mui-slat>, <mui-slat-accessory>, 
      <mui-accordion-group>, <mui-accordion-inline>, <mui-accordion-block>, 
      <mui-heading>, <mui-body>, <mui-quote>, <mui-code>, <mui-image>, 
      <mui-smart-card>, 
      <mui-list>, <mui-list-item>, 
      <mui-icon-accessibility>, <mui-icon-add>, <mui-icon-attention>, <mui-icon-check>, 
      <mui-icon-close>, <mui-icon-down-chevron>, <mui-icon-globe>, <mui-icon-grid>, 
      <mui-icon-info>, <mui-icon-left-arrow>, <mui-icon-left-sidebar>, <mui-icon-left-chevron>, 
      <mui-icon-menu>, <mui-icon-message>, <mui-icon-moon>, <mui-icon-notification>, 
      <mui-icon-right-chevron>, <mui-icon-stop>, <mui-icon-subtract>, <mui-icon-sun>, 
      <mui-icon-toggle>, <mui-icon-up-arrow>, <mui-icon-up-chevron>, <mui-icon-warning>, 
      <mui-icon-down-arrow-circle>, <mui-icon-ellipsis>, 
      <mui-h-stack>, <mui-v-stack>, <mui-grid>, <mui-responsive>, <mui-container>, <mui-rule>, 
      <mui-card>, <mui-card-header>, <mui-card-body>, <mui-card-footer>, 
      <mui-alert>, <mui-message>, <mui-badge>, 
      <mui-button>, <mui-button-group>, <mui-link>, 
      <mui-tabs-controller>, <mui-tabs-item>, <mui-tabs-panel>, <mui-tabs-tab-bar>, 
      <mui-carousel-controller>, <mui-carousel-panel>

      Use only these components when constructing UIs. When helpful, you may suggest new components, but clearly mark them with a comment like:
      <!-- 🚧 Not yet in system, consider adding -->

      Structure layouts using primitives like <mui-v-stack>, <mui-h-stack>, <mui-grid> or <mui-card-body> when composing forms or groups of fields.
    `,
  },

  // FIELD
  {
    role: "user",
    content: "[input] Add a field to enter an email address",
  },
  {
    role: "assistant",
    content: `<mui-field label="Email">\n  <mui-input type="email" placeholder="you@example.com"></mui-input>\n</mui-field>`,
  },

  // SLAT
  {
    role: "user",
    content: "[slat] Create a default slat with heading and body",
  },
  {
    role: "assistant",
    content: `
      <mui-slat>
        <mui-heading slot="start" size="5">...</mui-heading>
        <mui-h-stack slot="end">
          <mui-body>...</mui-body>
        </mui-h-stack>
      </mui-slat>
    `,
  },
  {
    role: "user",
    content: "[slat] Create a header slat",
  },
  {
    role: "assistant",
    content: `<mui-slat variant="header">
  <mui-heading slot="start" size="6">Heading</mui-heading>
  <mui-h-stack slot="end" alignX="end">
    <mui-body size="small">End slot</mui-body>
  </mui-h-stack>
</mui-slat>`,
  },
  {
    role: "user",
    content: "[slat] Create a row slat with vertical stacks",
  },
  {
    role: "assistant",
    content: `<mui-slat variant="row">
  <mui-v-stack slot="start">
    <mui-body size="medium" weight="bold">...</mui-body>
    <mui-body size="small">...</mui-body>
  </mui-v-stack>
  <mui-v-stack slot="end" alignX="end">
    <mui-body size="small">...</mui-body>
    <mui-body size="small">...</mui-body>
  </mui-v-stack>
</mui-slat>`,
  },
  {
    role: "user",
    content: "[slat] Create a row slat with an icon accessory",
  },
  {
    role: "assistant",
    content: `<mui-slat variant="row">
  <mui-slat-accessory slot="accessory">
    <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
  </mui-slat-accessory>
  <mui-v-stack slot="start" space="0">
    <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
    <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
  </mui-v-stack>
  <mui-v-stack slot="end" space="0" alignX="end">
    <mui-body size="x-small">Pending</mui-body>
    <mui-body size="small" weight="bold">-$8.12</mui-body>
  </mui-v-stack>
</mui-slat>`,
  },
  {
    role: "user",
    content: "[card] Create a card with a slat header and action rows",
  },
  {
    role: "assistant",
    content: `<mui-card>
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
        <mui-v-stack slot="start" space="0">
          <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
          <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
        </mui-v-stack>
        <mui-v-stack slot="end" space="0">
          <mui-body size="x-small">Pending</mui-body>
          <mui-body size="small" weight="bold">-$8.12</mui-body>
        </mui-v-stack>
      </mui-slat>
    </mui-v-stack>
  </mui-card-body>
</mui-card>`,
  },

  // TABLE
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

  // ACCORDION
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

  // ICONS
  { role: "user", content: "[icon] Add an accessibility icon" },
  { role: "assistant", content: "<mui-icon-accessibility></mui-icon-accessibility>" },

  { role: "user", content: "[icon] Add an add icon" },
  { role: "assistant", content: "<mui-icon-add></mui-icon-add>" },

  { role: "user", content: "[icon] Add a close icon" },
  { role: "assistant", content: "<mui-icon-close></mui-icon-close>" },

  { role: "user", content: "[icon] Add an up chevron icon" },
  { role: "assistant", content: "<mui-icon-up-chevron></mui-icon-up-chevron>" },

  { role: "user", content: "[icon] Add a down chevron icon" },
  { role: "assistant", content: "<mui-icon-down-chevron></mui-icon-down-chevron>" },

  { role: "user", content: "[icon] Add a left sidebar icon" },
  { role: "assistant", content: "<mui-icon-left-sidebar></mui-icon-left-sidebar>" },

  { role: "user", content: "[icon] Add a left chevron icon" },
  { role: "assistant", content: "<mui-icon-left-chevron></mui-icon-left-chevron>" },

  { role: "user", content: "[icon] Add a right chevron icon" },
  { role: "assistant", content: "<mui-icon-right-chevron></mui-icon-right-chevron>" },

  { role: "user", content: "[icon] Add a grid icon" },
  { role: "assistant", content: "<mui-icon-grid></mui-icon-grid>" },

  { role: "user", content: "[icon] Add a left arrow icon" },
  { role: "assistant", content: "<mui-icon-left-arrow></mui-icon-left-arrow>" },

  { role: "user", content: "[icon] Add a menu icon" },
  { role: "assistant", content: "<mui-icon-menu></mui-icon-menu>" },

  { role: "user", content: "[icon] Add a message icon" },
  { role: "assistant", content: "<mui-icon-message></mui-icon-message>" },

  { role: "user", content: "[icon] Add a moon icon" },
  { role: "assistant", content: "<mui-icon-moon></mui-icon-moon>" },

  { role: "user", content: "[icon] Add a sun icon" },
  { role: "assistant", content: "<mui-icon-sun></mui-icon-sun>" },

  { role: "user", content: "[icon] Add a subtract icon" },
  { role: "assistant", content: "<mui-icon-subtract></mui-icon-subtract>" },

  { role: "user", content: "[icon] Add a check icon" },
  { role: "assistant", content: "<mui-icon-check></mui-icon-check>" },

  { role: "user", content: "[icon] Add an info icon" },
  { role: "assistant", content: "<mui-icon-info></mui-icon-info>" },

  { role: "user", content: "[icon] Add a warning icon" },
  { role: "assistant", content: "<mui-icon-warning></mui-icon-warning>" },

  { role: "user", content: "[icon] Add an attention icon" },
  { role: "assistant", content: "<mui-icon-attention></mui-icon-attention>" },

  { role: "user", content: "[icon] Add a globe icon" },
  { role: "assistant", content: "<mui-icon-globe></mui-icon-globe>" },

  { role: "user", content: "[icon] Add a stop icon" },
  { role: "assistant", content: "<mui-icon-stop></mui-icon-stop>" },

  { role: "user", content: "[icon] Add a down arrow circle icon" },
  { role: "assistant", content: "<mui-icon-down-arrow-circle></mui-icon-down-arrow-circle>" },

  { role: "user", content: "[icon] Add an ellipsis icon" },
  { role: "assistant", content: "<mui-icon-ellipsis></mui-icon-ellipsis>" },

  // IMAGE
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

  // SMART CARD

  { role: "user", content: "[smart-card] Basic plain card with number and logo" },
  {
    role: "assistant",
    content: `<mui-smart-card
  number="1234"
  type="Debit"
  logo="./images/card/image-220.png"
  partner="./images/networks/visa-black.svg"
  variant="plain"
/>`,
  },
  { role: "user", content: "[smart-card] Plain card with inverted style" },
  {
    role: "assistant",
    content: `<mui-smart-card
  inverted
  number="1234"
  type="Debit"
  logo="./images/card/image-220.png"
  partner="./images/card/visa-white.svg"
  variant="plain"
/>`,
  },

  { role: "user", content: "[smart-card] Animated card with background image" },
  {
    role: "assistant",
    content: `<mui-smart-card
  number="1234"
  type="Debit"
  bg-image="./images/mesh/buttercup.png"
  logo="./images/card/image-220.png"
  partner="./images/networks/visa-black.svg"
  variant="animated"
/>`,
  },

  { role: "user", content: "[smart-card] Card with custom logo size" },
  {
    role: "assistant",
    content: `<mui-smart-card
  logo="./images/guru/guides.svg"
  logo-height="80"
/>`,
  },

  { role: "user", content: "[smart-card] Frozen card state" },
  {
    role: "assistant",
    content: `<mui-smart-card
  state="frozen"
  number="1234"
  type="Debit"
  logo="./images/card/image-220.png"
  partner="./images/networks/visa-black.svg"
  variant="plain"
/>`,
  },

  { role: "user", content: "[smart-card] Card with background color" },
  {
    role: "assistant",
    content: `<mui-smart-card
  variant="plain"
  bg-color="#a4fc67"
  number="1234"
  type="Debit"
  logo="./images/card/image-220.png"
  partner="./images/networks/visa-black.svg"
/>`,
  },

  { role: "user", content: "[smart-card] Card with background image (non-animated)" },
  {
    role: "assistant",
    content: `<mui-smart-card
  variant="plain"
  bg-image="./images/card/image-395.png"
  number="1234"
  type="Debit"
  logo="./images/card/image-220.png"
  partner="./images/networks/visa-black.svg"
/>`,
  },

  { role: "user", content: "[smart-card] Premier reward card" },
  {
    role: "assistant",
    content: `<mui-smart-card
  type="Premier"
  partner="/emerald.svg"
  bg-image="./images/jal/premier.png"
/>`,
  },

  { role: "user", content: "[smart-card] Diamond reward card (inverted)" },
  {
    role: "assistant",
    content: `<mui-smart-card
  inverted
  type="Diamond"
  partner="/emerald.svg"
  bg-image="./images/jal/diamond.png"
/>`,
  },

  // STACK
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

  // GRID
  {
    role: "user",
    content: "[layout] Create a grid with 2 columns and card content",
  },
  {
    role: "assistant",
    content: `<mui-grid col="1fr 1fr" space="var(--space-200)">\n  <mui-card>...</mui-card>\n  <mui-card>...</mui-card>\n</mui-grid>`,
  },

  // RESPONSIVE
  {
    role: "user",
    content: "[responsive] Show a div above 600px and a different one below",
  },
  {
    role: "assistant",
    content: `<mui-responsive breakpoint="600">\n  <div slot="showAbove">...</div>\n  <div slot="showBelow">...</div>\n</mui-responsive>`,
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

  // RULE
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

  // CARD
  { role: "user", content: "[card] Create a vertical stack with two cards" },
  {
    role: "assistant",
    content:
      '<mui-v-stack space="var(--space-400)">\n  <mui-card>...</mui-card>\n  <mui-card>...</mui-card>\n</mui-v-stack>',
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

  // ALERTS
  { role: "user", content: "[alert] Show a success alert" },
  { role: "assistant", content: `<mui-alert variant="success">...</mui-alert>` },

  { role: "user", content: "[alert] Show an error alert" },
  { role: "assistant", content: `<mui-alert variant="error">...</mui-alert>` },

  // MESSAGES
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

  // BADGES
  { role: "user", content: "[badge] Show a warning badge" },
  { role: "assistant", content: `<mui-badge variant="warning">...</mui-badge>` },

  // BUTTON
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

  // LINK
  { role: "user", content: "[link] Create a primary link" },
  { role: "assistant", content: `<mui-link variant="primary" href="links.html">...</mui-link>` },

  { role: "user", content: "[link] Create a small sized link" },
  { role: "assistant", content: `<mui-link size="small">Link text</mui-link>` },

  // TABS
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

  // CAROUSEL
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

  // WALLET COMPOSITION
  {
    role: "user",
    content: "[wallet] Create a wallet layout with a smart card and tabbed transactions",
  },
  {
    role: "assistant",
    content: `<mui-v-stack alignX="stretch" slot="body" style="max-width: 365px; margin: 0 auto; padding-top: var(--space-700); padding-bottom: var(--space-700)">
  <mui-smart-card
    variant="animated"
    partner="\${Visa}"
    type="Debit"
    number="1234"
    logo="\${Mui}"
    logo-height="100"
    bg-image="\${Snow}"
  ></mui-smart-card>

  <mui-tab-controller>
    <mui-v-stack alignX="stretch" style="max-width: 100%;" space="var(--space-300)">
      <mui-tab-bar>
        <mui-tab-item active id="item1">Transactions</mui-tab-item>
        <mui-tab-item id="item2">Statements</mui-tab-item>
      </mui-tab-bar>

      <mui-tab-panel item="item1">
        <mui-v-stack alignX="stretch" space="var(--space-000)">
          <mui-slat variant="header">
            <mui-heading slot="start" size="6">Today</mui-heading>
            <mui-h-stack slot="end" alignX="end">
              <mui-body size="small">22 July 2025</mui-body>
            </mui-h-stack>
          </mui-slat>

          <mui-v-stack space="var(--space-025)">
            <mui-slat variant="row">
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Espresso Bar</mui-body>
                <mui-body size="small">Food & Drink</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end" alignX="end">
                <mui-body size="small">Pending</mui-body>
                <mui-body size="small">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>
            <mui-slat variant="row">
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

          <mui-v-stack space="var(--space-025)">
            <mui-slat variant="row">
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
        </mui-v-stack>
      </mui-tab-panel>

      <mui-tab-panel item="item2">
        <mui-v-stack alignX="stretch" space="var(--space-000)">
          <mui-slat variant="header">
            <mui-heading size="6" slot="start">Recents</mui-heading>
          </mui-slat>
          <mui-v-stack space="var(--space-025)">
            <mui-slat variant="action">
              <mui-v-stack space="0" slot="start">
                <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
                <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
              </mui-v-stack>
            </mui-slat>
            <mui-slat variant="action">
              <mui-body size="medium" weight="bold" slot="start">21 Mar 2025</mui-body>
            </mui-slat>
          </mui-v-stack>
          <mui-slat variant="header">
            <mui-heading size="6" slot="start">All</mui-heading>
          </mui-slat>
          <mui-v-stack space="var(--space-025)">
            <mui-slat variant="action">
              <mui-body size="medium" weight="bold" slot="start">2025</mui-body>
            </mui-slat>
            <mui-slat variant="action">
              <mui-body size="medium" weight="bold" slot="start">2024</mui-body>
            </mui-slat>
          </mui-v-stack>
        </mui-v-stack>
      </mui-tab-panel>
    </mui-v-stack>
  </mui-tab-controller>
</mui-v-stack>`,
  },
  {
    role: "user",
    content:
      "[composition] Create a sign-up form with fields for first name, last name, email, password, confirm password, a checkbox to agree to terms, and a submit button.",
  },
  {
    role: "assistant",
    content: `<mui-container small center>
  <mui-card>
    <mui-card-header>
      <mui-heading size="3">Sign up for our product!</mui-heading>
    </mui-card-header>
    <mui-card-body>
      <form>
        <mui-v-stack space="var(--space-400)">
          <mui-field id="firstNameField" label="First Name">
            <mui-input type="text" placeholder="John" />
          </mui-field>
          <mui-field id="lastNameField" label="Last Name">
            <mui-input type="text" placeholder="Doe" />
          </mui-field>
          <mui-field id="emailField" label="Email">
            <mui-input type="email" placeholder="john@example.com" />
          </mui-field>
          <mui-field id="passwordField" label="Password">
            <mui-input type="password" />
          </mui-field>
          <mui-field id="confirmPasswordField" label="Confirm Password">
            <mui-input type="password" />
          </mui-field>
          <mui-field id="termsField">
            <mui-checkbox id="agreeTerms">I agree to the <mui-link href="/terms">terms and conditions</mui-link></mui-checkbox>
          </mui-field>
          <mui-button-group right>
            <mui-button variant="primary">Sign up</mui-button>
          </mui-button-group>
        </mui-v-stack>
      </form>
    </mui-card-body>
  </mui-card>
</mui-container>`,
  },
];
