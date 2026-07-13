import { getComponentDocs } from "../../../utils/story-data";

class storyInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Input");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Input"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-input",
        parentAttrs: [],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-input" title="Input"></story-api-types>


      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <div slot="body">
          <mui-input label="Default"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Default"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" label="X-Small"></mui-input>
          <mui-input size="small" label="Small"></mui-input>
          <mui-input size="medium" label="Medium"></mui-input>
          <mui-input size="large" label="Large"></mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" label="X-Small"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="small" label="Small"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="medium" label="Medium"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="large" label="Large"&gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="variant-success" title="${storyMeta["variant-success"].title}" description="${storyMeta["variant-success"].description}" usage="${storyMeta["variant-success"].usage}">
        <div slot="body">
          <mui-input variant="success"  value="value" type="password" label="Password"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input variant="positive" value="value" type="password" label="Password"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="variant-warning" title="${storyMeta["variant-warning"].title}" description="${storyMeta["variant-warning"].description}" usage="${storyMeta["variant-warning"].usage}">
        <div slot="body">
          <mui-input variant="warning" value="michael.mui.com" label="Email"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input variant="warning" value="michael.mui.com" label="Email"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="variant-error" title="${storyMeta["variant-error"].title}" description="${storyMeta["variant-error"].description}" usage="${storyMeta["variant-error"].usage}">
        <div slot="body">
          <mui-input variant="error" value="michael.mui.com" label="Email"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input variant="attention" value="michael.mui.com" label="Email"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="hide-label" title="${storyMeta["hide-label"].title}" description="${storyMeta["hide-label"].description}" usage="${storyMeta["hide-label"].usage}">
        <div slot="body">
          <mui-input label="Hide Label" hide-label></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Hide Label" hide-label&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
        <div slot="body">
          <mui-input label="Disabled" disabled></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Disabled" disabled&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="optional-label" title="${storyMeta["optional-label"].title}" description="${storyMeta["optional-label"].description}" usage="${storyMeta["optional-label"].usage}">
        <div slot="body">
          <mui-input label="Company Website" optional placeholder="https://"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Company Website" optional placeholder="https://"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="character-count" title="${storyMeta["character-count"].title}" description="${storyMeta["character-count"].description}" usage="${storyMeta["character-count"].usage}">
        <div slot="body">
          <mui-input label="Username" max-length="24" placeholder="up to 24 characters"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Username" max-length="24" placeholder="up to 24 characters"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="before-add-on" title="${storyMeta["before-add-on"].title}" description="${storyMeta["before-add-on"].description}" usage="${storyMeta["before-add-on"].usage}">
        <div slot="body">
          <mui-input label="Enter amount">
            <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Enter amount"&gt;
          <br />

          &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-addon&gt;
          <br />

          &lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="after-add-on" title="${storyMeta["after-add-on"].title}" description="${storyMeta["after-add-on"].description}" usage="${storyMeta["after-add-on"].usage}">
        <div slot="body">
          <mui-input label="Enter amount">
            <mui-addon slot="after"><mui-body>USD</mui-body></mui-input></mui-addon>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Enter amount"&gt;
          <br />

          &nbsp;&nbsp;&lt;mui-addon slot="after"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-addon&gt;
          <br />

          &lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="before-select" title="${storyMeta["before-select"].title}" description="${storyMeta["before-select"].description}" usage="${storyMeta["before-select"].usage}">
        <div slot="body">
          <mui-input type="search" label="Search">
            <mui-select
              style="width: 120px;"
              slot="before"
              label="Filter"
              hide-label
                options='[
                {"value": "all", "label": "All"},
                {"value": "images", "label": "Images"},
                {"value": "video", "label": "Video"}
              ]'>
            </mui-select>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input type="search" label="Search"&gt;<br>
          &nbsp;&nbsp;&lt;mui-select<br>
          &nbsp;&nbsp;&nbsp;&nbsp;slot="before"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;label="Filter"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="width: 120px;"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "all", "label": "All" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "images", "label": "Images" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "video", "label": "Video" }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
          &nbsp;&nbsp;&lt;/mui-select&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="after-select" title="${storyMeta["after-select"].title}" description="${storyMeta["after-select"].description}" usage="${storyMeta["after-select"].usage}">
        <div slot="body">
          <mui-input type="number" label="Amount to transfer">
            <mui-select
              style="width: 100px;"
              slot="after"
              label="Currency"
              hide-label
                options='[
                {"value": "jpy", "label": "JPY"},
                {"value": "usd", "label": "USD"}
              ]'>
            </mui-select>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input type="number" label="Amount to transfer"&gt;<br>
          &nbsp;&nbsp;&lt;mui-select<br>
          &nbsp;&nbsp;&nbsp;&nbsp;slot="after"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;label="Currency"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="width: 100px;"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "jpy", "label": "JPY" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "usd", "label": "USD" }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
          &nbsp;&nbsp;&lt;/mui-select&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="button-before-and-after" title="${storyMeta["button-before-and-after"].title}" description="${storyMeta["button-before-and-after"].description}" usage="${storyMeta["button-before-and-after"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" type="search" label="Search docs">
            <mui-button slot="before">Search</mui-button>
          </mui-input>
          <mui-input size="small" type="search" label="Search docs">
            <mui-button slot="before">Search</mui-button>
          </mui-input>
          <mui-input size="medium" type="search" label="Search docs">
            <mui-button slot="before">Search</mui-button>
          </mui-input>
          <mui-input size="large" type="search" label="Search docs">
            <mui-button slot="before">Search</mui-button>
          </mui-input>
          <mui-input size="x-small" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-button slot="after">Copy</mui-button>
          </mui-input>
          <mui-input size="small" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-button slot="after">Copy</mui-button>
          </mui-input>
          <mui-input size="medium" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-button slot="after">Copy</mui-button>
          </mui-input>
          <mui-input size="large" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-button slot="after">Copy</mui-button>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" type="search" label="Search docs"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="before"&gt;Search&lt;/mui-button&gt;<br>
          &lt;/mui-input&gt;<br><br>
          &lt;mui-input size="large" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="link-before-and-after" title="${storyMeta["link-before-and-after"].title}" description="${storyMeta["link-before-and-after"].description}" usage="${storyMeta["link-before-and-after"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" type="search" label="Search docs">
            <mui-link href="/input" slot="before">Docs</mui-link>
          </mui-input>
          <mui-input size="small" type="search" label="Search docs">
            <mui-link href="/input" slot="before">Docs</mui-link>
          </mui-input>
          <mui-input size="medium" type="search" label="Search docs">
            <mui-link href="/input" slot="before">Docs</mui-link>
          </mui-input>
          <mui-input size="large" type="search" label="Search docs">
            <mui-link href="/input" slot="before">Docs</mui-link>
          </mui-input>
          <mui-input size="x-small" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-link href="/input" slot="after">Help</mui-link>
          </mui-input>
          <mui-input size="small" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-link href="/input" slot="after">Help</mui-link>
          </mui-input>
          <mui-input size="medium" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-link href="/input" slot="after">Help</mui-link>
          </mui-input>
          <mui-input size="large" type="email" label="Email" value="mui-web-components@proton.me">
            <mui-link href="/input" slot="after">Help</mui-link>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" type="search" label="Search docs"&gt;<br>
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="before"&gt;Docs&lt;/mui-link&gt;<br>
          &lt;/mui-input&gt;<br><br>
          &lt;mui-input size="large" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br>
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="after"&gt;Help&lt;/mui-link&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="before-chip" title="${storyMeta["before-chip"].title}" description="${storyMeta["before-chip"].description}" usage="${storyMeta["before-chip"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" label="Search tags">
            <mui-chip slot="before" dismiss>Tag</mui-chip>
          </mui-input>
          <mui-input size="small" label="Search tags">
            <mui-chip slot="before" dismiss>Tag</mui-chip>
          </mui-input>
          <mui-input size="medium" label="Search tags">
            <mui-chip slot="before" dismiss>Tag</mui-chip>
          </mui-input>
          <mui-input size="large" label="Search tags">
            <mui-chip slot="before" dismiss>Tag</mui-chip>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="before" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="after-chip" title="${storyMeta["after-chip"].title}" description="${storyMeta["after-chip"].description}" usage="${storyMeta["after-chip"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" label="Search tags">
            <mui-chip slot="after" dismiss>Tag</mui-chip>
          </mui-input>
          <mui-input size="small" label="Search tags">
            <mui-chip slot="after" dismiss>Tag</mui-chip>
          </mui-input>
          <mui-input size="medium" label="Search tags">
            <mui-chip slot="after" dismiss>Tag</mui-chip>
          </mui-input>
          <mui-input size="large" label="Search tags">
            <mui-chip slot="after" dismiss>Tag</mui-chip>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="after" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="hint-overlay" title="${storyMeta["hint-overlay"].title}" description="${storyMeta["hint-overlay"].description}" usage="${storyMeta["hint-overlay"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" label="Username" placeholder="Enter your username">
            <mui-hint slot="hint" placement="top">
              <mui-icon-info slot="trigger" size="xx-small"></mui-icon-info>
              Username is visible to your team.
            </mui-hint>
          </mui-input>
          <mui-input size="small" label="Referral Code" placeholder="Optional">
            <mui-hint slot="hint" placement="top">
              <mui-badge slot="trigger" size="x-small">NEW</mui-badge>
              Referral codes are optional.
            </mui-hint>
          </mui-input>
          <mui-input size="medium" label="Website" placeholder="https://">
            <mui-hint slot="hint" placement="top">
              <mui-icon-warning slot="trigger" size="x-small"></mui-icon-warning>
              Include https:// in your URL.
            </mui-hint>
          </mui-input>
          <mui-input size="large" label="Profile ID" placeholder="ID">
            <mui-hint slot="hint" placement="top">
              <mui-badge slot="trigger" size="small">BETA</mui-badge>
              Profile IDs are generated after verification.
            </mui-hint>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Username"&gt;<br />
          &nbsp;&nbsp;&lt;mui-hint slot="hint" placement="top"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-info slot="trigger" size="xx-small"&gt;&lt;/mui-icon-info&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Username is visible to your team.<br />
          &nbsp;&nbsp;&lt;/mui-hint&gt;<br />
          &lt;/mui-input&gt;
          <br /><br />
          &lt;mui-input label="Website"&gt;<br />
          &nbsp;&nbsp;&lt;mui-hint slot="hint" placement="top"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-warning slot="trigger" size="x-small"&gt;&lt;/mui-icon-warning&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Include https:// in your URL.<br />
          &nbsp;&nbsp;&lt;/mui-hint&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="inside-before-icons" title="${storyMeta["inside-before-icons"].title}" description="${storyMeta["inside-before-icons"].description}" usage="${storyMeta["inside-before-icons"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" label="Search">
            <mui-icon-search slot="inside-before"></mui-icon-search>
          </mui-input>
          <mui-input size="small" label="Search">
            <mui-icon-search slot="inside-before"></mui-icon-search>
          </mui-input>
          <mui-input size="medium" label="Search">
            <mui-icon-search slot="inside-before"></mui-icon-search>
          </mui-input>
          <mui-input size="large" label="Search">
            <mui-icon-search slot="inside-before"></mui-icon-search>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="medium" label="Search"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-search slot="inside-before"&gt;&lt;/mui-icon-search&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="inside-after-icons" title="${storyMeta["inside-after-icons"].title}" description="${storyMeta["inside-after-icons"].description}" usage="${storyMeta["inside-after-icons"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-input size="x-small" label="Search">
            <mui-icon-calendar slot="inside-after"></mui-icon-calendar>
          </mui-input>
          <mui-input size="small" label="Search">
            <mui-icon-calendar slot="inside-after"></mui-icon-calendar>
          </mui-input>
          <mui-input size="medium" label="Search">
            <mui-icon-calendar slot="inside-after"></mui-icon-calendar>
          </mui-input>
          <mui-input size="large" label="Search">
            <mui-icon-calendar slot="inside-after"></mui-icon-calendar>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="medium" label="Search"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-calendar slot="inside-after"&gt;&lt;/mui-icon-calendar&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-text" title="${storyMeta["type-text"].title}" description="${storyMeta["type-text"].description}" usage="${storyMeta["type-text"].usage}">
        <div slot="body">
          <mui-input label="Name" type="text" id="name-input" name="name" value="John Doe"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Name"
          <br />
          &nbsp;&nbsp;type="text"
          <br />
          &nbsp;&nbsp;id="name-input"
          <br />
          &nbsp;&nbsp;name="name"
          <br />
          &nbsp;&nbsp;value="John Doe"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-email" title="${storyMeta["type-email"].title}" description="${storyMeta["type-email"].description}" usage="${storyMeta["type-email"].usage}">
        <div slot="body">
          <mui-input label="Email" type="email" id="email-input" name="email" value="user@example.com"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Email"
          <br />
          &nbsp;&nbsp;type="email"
          <br />
          &nbsp;&nbsp;id="email-input"
          <br />
          &nbsp;&nbsp;name="email"
          <br />
          &nbsp;&nbsp;value="user@example.com"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-password" title="${storyMeta["type-password"].title}" description="${storyMeta["type-password"].description}" usage="${storyMeta["type-password"].usage}">
        <div slot="body">
          <mui-input label="Password" type="password" id="password-input" name="password" value="abcde1234"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Password"
          <br />
          &nbsp;&nbsp;type="password"
          <br />
          &nbsp;&nbsp;id="password-input"
          <br />
          &nbsp;&nbsp;name="password"
          <br />
          &nbsp;&nbsp;value="abcde1234"
          <br />
          &gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card id="type-number" title="${storyMeta["type-number"].title}" description="${storyMeta["type-number"].description}" usage="${storyMeta["type-number"].usage}">
        <div slot="body">
          <mui-input label="Age" type="number" id="age-input" name="age" value="30"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Age"
          <br />
          &nbsp;&nbsp;type="number"
          <br />
          &nbsp;&nbsp;id="age-input"
          <br />
          &nbsp;&nbsp;name="age"
          <br />
          &nbsp;&nbsp;value="30"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-url" title="${storyMeta["type-url"].title}" description="${storyMeta["type-url"].description}" usage="${storyMeta["type-url"].usage}">
        <div slot="body">
          <mui-input label="Website" type="url" id="url-input" name="website" value="https://example.com"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Website"
          <br />
          &nbsp;&nbsp;type="url"
          <br />
          &nbsp;&nbsp;id="url-input"
          <br />
          &nbsp;&nbsp;name="website"
          <br />
          &nbsp;&nbsp;value="https://example.com"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-tel" title="${storyMeta["type-tel"].title}" description="${storyMeta["type-tel"].description}" usage="${storyMeta["type-tel"].usage}">
        <div slot="body">
          <mui-input label="Phone" type="tel" id="phone-input" name="phone" value="+1234567890"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Phone"
          <br />
          &nbsp;&nbsp;type="tel"
          <br />
          &nbsp;&nbsp;id="phone-input"
          <br />
          &nbsp;&nbsp;name="phone"
          <br />
          &nbsp;&nbsp;value="+1234567890"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-search" title="${storyMeta["type-search"].title}" description="${storyMeta["type-search"].description}" usage="${storyMeta["type-search"].usage}">
        <div slot="body">
          <mui-input label="Search" type="search" id="search-input" name="search" value="Query"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input
          <br />
          &nbsp;&nbsp;label="Search"
          <br />
          &nbsp;&nbsp;type="search"
          <br />
          &nbsp;&nbsp;id="search-input"
          <br />
          &nbsp;&nbsp;name="search"
          <br />
          &nbsp;&nbsp;value="Query"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        attrs-reference='${attrsReference}'
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-input"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-input", storyInput);
