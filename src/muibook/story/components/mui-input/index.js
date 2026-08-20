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
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );
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

      <story-card id="supporting-description" title="${storyMeta["supporting-description"].title}" description="${storyMeta["supporting-description"].description}" usage="${storyMeta["supporting-description"].usage}">
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-input size="x-small" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"></mui-input>
          <mui-input size="small" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"></mui-input>
          <mui-input size="medium" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"></mui-input>
          <mui-input size="large" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"></mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="small" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="medium" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="large" type="email" label="Email" description="Used for account updates and sign-in recovery." placeholder="you@example.com"&gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="slotted-supporting-description" title="${storyMeta["slotted-supporting-description"].title}" description="${storyMeta["slotted-supporting-description"].description}" usage="${storyMeta["slotted-supporting-description"].usage}">
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-input size="x-small" type="email" label="Email" placeholder="you@example.com">
            <mui-body slot="description" variant="secondary" size="xx-small">Used for account updates. Read our <mui-link href="#privacy-policy">privacy policy</mui-link>.</mui-body>
          </mui-input>
          <mui-input size="small" type="email" label="Email" placeholder="you@example.com">
            <mui-body slot="description" variant="secondary" size="x-small">Used for account updates. Read our <mui-link href="#privacy-policy">privacy policy</mui-link>.</mui-body>
          </mui-input>
          <mui-input size="medium" type="email" label="Email" placeholder="you@example.com">
            <mui-body slot="description" variant="secondary" size="small">Used for account updates. Read our <mui-link href="#privacy-policy">privacy policy</mui-link>.</mui-body>
          </mui-input>
          <mui-input size="large" type="email" label="Email" placeholder="you@example.com">
            <mui-body slot="description" variant="secondary" size="medium">Used for account updates. Read our <mui-link href="#privacy-policy">privacy policy</mui-link>.</mui-body>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="medium" type="email" label="Email" placeholder="you@example.com"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="description" variant="secondary" size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Used for account updates. Read our &lt;mui-link href="/privacy"&gt;privacy policy&lt;/mui-link&gt;.<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-input&gt;
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

      <story-card id="required-feedback" title="${storyMeta["required-feedback"].title}" description="${storyMeta["required-feedback"].description}" usage="${storyMeta["required-feedback"].usage}">
        <mui-v-stack slot="body" space="var(--space-300)" alignX="stretch">
          <mui-field label="Work email" required data-required-field>
            <mui-input data-required-input type="email" autocomplete="email" placeholder="you@company.com"></mui-input>
          </mui-field>
          <mui-button data-check-required variant="secondary" align="start">Validate email</mui-button>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-field label="Work email" required&gt;<br />
          &nbsp;&nbsp;&lt;mui-input type="email" autocomplete="email"&gt;&lt;/mui-input&gt;<br />
          &lt;/mui-field&gt;
        </story-code-block>
      </story-card>

      <story-card id="native-target-attributes" title="${storyMeta["native-target-attributes"].title}" description="${storyMeta["native-target-attributes"].description}" usage="${storyMeta["native-target-attributes"].usage}">
        <mui-v-stack slot="body" space="var(--space-300)">
          <mui-input label="One-time code" autocomplete="one-time-code" autocorrect="off" autocapitalize="none" spellcheck="false" input-mode="numeric" placeholder="123456"></mui-input>
          <mui-input label="Share URL" readonly value="https://muibook.com/share/project-42" spellcheck="false"></mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input autocomplete="one-time-code" autocorrect="off" autocapitalize="none" spellcheck="false"&gt;&lt;/mui-input&gt;<br /><br />
          &lt;mui-input readonly value="https://muibook.com/share/project-42" spellcheck="false"&gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="character-count" title="${storyMeta["character-count"].title}" description="${storyMeta["character-count"].description}" usage="${storyMeta["character-count"].usage}">
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-input size="x-small" label="Username" max-length="24" placeholder="up to 24 characters"></mui-input>
          <mui-input size="small" label="Username" max-length="24" placeholder="up to 24 characters"></mui-input>
          <mui-input size="medium" label="Username" max-length="24" placeholder="up to 24 characters"></mui-input>
          <mui-input size="large" label="Username" max-length="24" placeholder="up to 24 characters"></mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="x-small" label="Username" max-length="24" placeholder="up to 24 characters"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="small" label="Username" max-length="24" placeholder="up to 24 characters"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="medium" label="Username" max-length="24" placeholder="up to 24 characters"&gt;&lt;/mui-input&gt;<br />
          &lt;mui-input size="large" label="Username" max-length="24" placeholder="up to 24 characters"&gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="slotted-add-on" title="${storyMeta["slotted-add-on"].title}" description="${storyMeta["slotted-add-on"].description}" usage="${storyMeta["slotted-add-on"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-input label="Enter amount">
            <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
          </mui-input>
          <mui-input label="Enter amount">
            <mui-addon slot="after"><mui-body>USD</mui-body></mui-addon>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Enter amount"&gt;<br>
          &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;/mui-addon&gt;<br>
          &lt;/mui-input&gt;<br><br>
          &lt;mui-input label="Enter amount"&gt;<br>
          &nbsp;&nbsp;&lt;mui-addon slot="after"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;/mui-addon&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="slotted-select" title="${storyMeta["slotted-select"].title}" description="${storyMeta["slotted-select"].description}" usage="${storyMeta["slotted-select"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-input type="search" label="Search">
            <mui-select
              slot="before"
              label="Filter"
              hide-label
              style="width: 100px;"
              options='[
                { "value": "all", "label": "All" },
                { "value": "images", "label": "Images" },
                { "value": "video", "label": "Video" }
              ]'>
            </mui-select>
          </mui-input>

          <mui-input size="medium" align="end" input-mode="decimal" value="1,250.00" label="Amount to transfer">
            <mui-body slot="inside-start" variant="secondary" size="medium">$</mui-body>
            <mui-select
              slot="after"
              label="Currency"
              hide-label
              value="aud"
              style="width: 80px;"
              options='[
                { "value": "aud", "label": "AUD" },
                { "value": "usd", "label": "USD" },
                { "value": "jpy", "label": "JPY" }
              ]'>
            </mui-select>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input type="search" label="Search"&gt;<br>
          &nbsp;&nbsp;&lt;mui-select<br>
          &nbsp;&nbsp;&nbsp;&nbsp;slot="before"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;label="Filter"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="width: 100px;"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "all", "label": "All" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "images", "label": "Images" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "video", "label": "Video" }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
          &nbsp;&nbsp;&lt;/mui-select&gt;<br>
          &lt;/mui-input&gt;<br><br>
          &lt;mui-input size="medium" align="end" input-mode="decimal" value="1,250.00" label="Amount to transfer"&gt;<br>
          &nbsp;&nbsp;&lt;mui-body slot="inside-start" variant="secondary" size="medium"&gt;$&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;mui-select<br>
          &nbsp;&nbsp;&nbsp;&nbsp;slot="after"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;label="Currency"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
          &nbsp;&nbsp;&nbsp;&nbsp;value="aud"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="width: 80px;"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "aud", "label": "AUD" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "usd", "label": "USD" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "jpy", "label": "JPY" }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
          &nbsp;&nbsp;&lt;/mui-select&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="slotted-button" title="${storyMeta["slotted-button"].title}" description="${storyMeta["slotted-button"].description}" usage="${storyMeta["slotted-button"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-v-stack space="var(--space-200)">
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
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
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
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Leading slotted button --&gt;<br />
          &lt;mui-input size="x-small" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="before"&gt;Search&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="before"&gt;Search&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="before"&gt;Search&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="before"&gt;Search&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;!-- Trailing slotted button --&gt;<br />
          &lt;mui-input size="x-small" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="slotted-link" title="${storyMeta["slotted-link"].title}" description="${storyMeta["slotted-link"].description}" usage="${storyMeta["slotted-link"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-v-stack space="var(--space-200)">
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
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
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
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Leading slotted link --&gt;<br />
          &lt;mui-input size="x-small" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="before"&gt;Docs&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="before"&gt;Docs&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="before"&gt;Docs&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" type="search" label="Search docs"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="before"&gt;Docs&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;!-- Trailing slotted link --&gt;<br />
          &lt;mui-input size="x-small" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="after"&gt;Help&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="after"&gt;Help&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="after"&gt;Help&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" type="email" label="Email" value="mui-web-components@proton.me"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="/input" slot="after"&gt;Help&lt;/mui-link&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="slotted-chip" title="${storyMeta["slotted-chip"].title}" description="${storyMeta["slotted-chip"].description}" usage="${storyMeta["slotted-chip"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-v-stack space="var(--space-200)">
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

          <mui-v-stack space="var(--space-200)">
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
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Leading slotted chip --&gt;<br />
          &lt;mui-input size="x-small" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="before" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="before" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="before" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="before" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;!-- Trailing slotted chip --&gt;<br />
          &lt;mui-input size="x-small" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="after" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="after" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" label="Search tags"&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip slot="after" dismiss&gt;Tag&lt;/mui-chip&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" label="Search tags"&gt;<br />
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

      <story-card id="aligned-end" title="${storyMeta["aligned-end"].title}" description="${storyMeta["aligned-end"].description}" usage="${storyMeta["aligned-end"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-input size="small" align="end" input-mode="decimal" label="Transfer Amount — s">
            <mui-body slot="inside-start" variant="secondary" size="small">$</mui-body>
            <mui-body slot="inside-end" variant="secondary" size="small">AUD</mui-body>
          </mui-input>
          <mui-input size="medium" align="end" input-mode="decimal" value="1,250.00" label="Transfer Amount — m">
            <mui-body slot="inside-start" variant="secondary" size="medium">$</mui-body>
            <mui-body slot="inside-end" variant="secondary" size="medium">AUD</mui-body>
          </mui-input>
          <mui-input size="large" align="end" input-mode="decimal" value="1,250.00" label="Transfer Amount — l">
            <mui-body slot="inside-start" variant="secondary" size="large">$</mui-body>
            <mui-body slot="inside-end" variant="secondary" size="large">AUD</mui-body>
          </mui-input>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input size="small" align="end" input-mode="decimal" label="Transfer Amount — s"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="inside-start" variant="secondary" size="small"&gt;$&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="inside-end" variant="secondary" size="small"&gt;AUD&lt;/mui-body&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" align="end" input-mode="decimal" value="1,250.00" label="Transfer Amount — m"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="inside-start" variant="secondary" size="medium"&gt;$&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="inside-end" variant="secondary" size="medium"&gt;AUD&lt;/mui-body&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" align="end" input-mode="decimal" value="1,250.00" label="Transfer Amount — l"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="inside-start" variant="secondary" size="large"&gt;$&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="inside-end" variant="secondary" size="large"&gt;AUD&lt;/mui-body&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="inside-slotted-icons" title="${storyMeta["inside-slotted-icons"].title}" description="${storyMeta["inside-slotted-icons"].description}" usage="${storyMeta["inside-slotted-icons"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-v-stack space="var(--space-200)">
            <mui-input size="x-small" label="Search">
              <mui-icon-search slot="inside-before"></mui-icon-search>
              <mui-badge slot="inside-after" variant="neutral">⌘K</mui-badge>
            </mui-input>
            <mui-input size="small" label="Search">
              <mui-icon-search slot="inside-before"></mui-icon-search>
              <mui-badge slot="inside-after" variant="neutral">⌘K</mui-badge>
            </mui-input>
            <mui-input size="medium" label="Search">
              <mui-icon-search slot="inside-before"></mui-icon-search>
              <mui-badge slot="inside-after" variant="neutral">⌘K</mui-badge>
            </mui-input>
            <mui-input size="large" label="Search">
              <mui-icon-search slot="inside-before"></mui-icon-search>
              <mui-badge slot="inside-after" variant="neutral">⌘K</mui-badge>
            </mui-input>
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
            <mui-input size="x-small" label="Search" variant="success">
              <mui-icon-check color="success" slot="inside-after"></mui-icon-check>
            </mui-input>
            <mui-input size="small" label="Search" variant="warning">
              <mui-icon-warning color="warning" slot="inside-after"></mui-icon-warning>
            </mui-input>
            <mui-input size="medium" label="Search" variant="error">
              <mui-icon-attention color="error" slot="inside-after"></mui-icon-attention>
            </mui-input>
            <mui-input size="large" label="Search" variant="success">
              <mui-icon-check color="success" slot="inside-after"></mui-icon-check>
            </mui-input>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Leading icon with trailing shortcut badge --&gt;<br />
          &lt;mui-input size="x-small" label="Search"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-search slot="inside-before"&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="neutral"&gt;⌘K&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" label="Search"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-search slot="inside-before"&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="neutral"&gt;⌘K&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" label="Search"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-search slot="inside-before"&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="neutral"&gt;⌘K&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" label="Search"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-search slot="inside-before"&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="neutral"&gt;⌘K&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;!-- Trailing state validation icons --&gt;<br />
          &lt;mui-input size="x-small" label="Search" variant="success"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-check color="success" slot="inside-after"&gt;&lt;/mui-icon-check&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" label="Search" variant="warning"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-warning color="warning" slot="inside-after"&gt;&lt;/mui-icon-warning&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" label="Search" variant="error"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-attention color="error" slot="inside-after"&gt;&lt;/mui-icon-attention&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" label="Search" variant="success"&gt;<br />
          &nbsp;&nbsp;&lt;mui-icon-check color="success" slot="inside-after"&gt;&lt;/mui-icon-check&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="inside-slotted-badges" title="${storyMeta["inside-slotted-badges"].title}" description="${storyMeta["inside-slotted-badges"].description}" usage="${storyMeta["inside-slotted-badges"].usage}">
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-v-stack space="var(--space-200)">
            <mui-input size="x-small" label="Amount" align="end" input-mode="decimal" value="50.00">
              <mui-badge slot="inside-before" variant="neutral">NZD</mui-badge>
            </mui-input>
            <mui-input size="small" label="Amount" align="end" input-mode="decimal" value="50.00">
              <mui-badge slot="inside-before" variant="neutral">NZD</mui-badge>
            </mui-input>
            <mui-input size="medium" label="Amount" align="end" input-mode="decimal" value="50.00">
              <mui-badge slot="inside-before" variant="neutral">NZD</mui-badge>
            </mui-input>
            <mui-input size="large" label="Amount" align="end" input-mode="decimal" value="50.00">
              <mui-badge slot="inside-before" variant="neutral">NZD</mui-badge>
            </mui-input>
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
            <mui-input size="x-small" label="Payment reference" value="INV-2026-0849">
              <mui-badge slot="inside-after" variant="positive" color="green">Paid</mui-badge>
            </mui-input>
            <mui-input size="small" label="Payment reference" value="INV-2026-0849">
              <mui-badge slot="inside-after" variant="positive" color="green">Paid</mui-badge>
            </mui-input>
            <mui-input size="medium" label="Payment reference" value="INV-2026-0849">
              <mui-badge slot="inside-after" variant="positive" color="green">Paid</mui-badge>
            </mui-input>
            <mui-input size="large" label="Payment reference" value="INV-2026-0849">
              <mui-badge slot="inside-after" variant="positive" color="green">Paid</mui-badge>
            </mui-input>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Leading currency/locale badge --&gt;<br />
          &lt;mui-input size="x-small" label="Amount" align="end" input-mode="decimal" value="50.00"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-before" variant="neutral"&gt;NZD&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" label="Amount" align="end" input-mode="decimal" value="50.00"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-before" variant="neutral"&gt;NZD&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" label="Amount" align="end" input-mode="decimal" value="50.00"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-before" variant="neutral"&gt;NZD&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" label="Amount" align="end" input-mode="decimal" value="50.00"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-before" variant="neutral"&gt;NZD&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;!-- Trailing status badge --&gt;<br />
          &lt;mui-input size="x-small" label="Payment reference" value="INV-2026-0849"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="positive" color="green"&gt;Paid&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="small" label="Payment reference" value="INV-2026-0849"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="positive" color="green"&gt;Paid&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="medium" label="Payment reference" value="INV-2026-0849"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="positive" color="green"&gt;Paid&lt;/mui-badge&gt;<br />
          &lt;/mui-input&gt;<br /><br />
          &lt;mui-input size="large" label="Payment reference" value="INV-2026-0849"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge slot="inside-after" variant="positive" color="green"&gt;Paid&lt;/mui-badge&gt;<br />
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
          <mui-input label="Email" type="email" id="email-input" name="email" value="user@example.com">
            <mui-button slot="after">Copy</mui-button>
          </mui-input>
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
          &gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card id="type-password" title="${storyMeta["type-password"].title}" description="${storyMeta["type-password"].description}" usage="${storyMeta["type-password"].usage}">
        <div slot="body">
          <mui-input label="Password" type="password" id="password-input" name="password" value="abcde1234">
            <mui-button slot="after">Show</mui-button>
          </mui-input>
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
          &gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Show&lt;/mui-button&gt;<br />
          &lt;/mui-input&gt;
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

    const slottedSelectCard = this.shadowRoot.querySelector("#slotted-select");
    const selectEl = slottedSelectCard?.querySelector('mui-select[slot="after"]');
    const symbolBody = slottedSelectCard?.querySelector('mui-body[slot="inside-start"]');

    if (selectEl && symbolBody) {
      const currencySymbolMap = {
        aud: "$",
        usd: "$",
        jpy: "¥",
      };
      selectEl.addEventListener("change", (e) => {
        const val = (e.detail?.value || selectEl.getAttribute("value") || "aud").toLowerCase();
        symbolBody.textContent = currencySymbolMap[val] || "$";
      });
    }

    const emailCard = this.shadowRoot.querySelector("#type-email");
    const emailInput = emailCard?.querySelector("#email-input");
    const copyBtn = emailCard?.querySelector('mui-button[slot="after"]');

    if (emailInput && copyBtn) {
      copyBtn.addEventListener("click", () => {
        const innerInput = emailInput.shadowRoot?.querySelector("input");
        const val = innerInput ? innerInput.value : emailInput.getAttribute("value") || "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(val);
        }
        copyBtn.textContent = "Copied";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      });
    }

    const passwordCard = this.shadowRoot.querySelector("#type-password");
    const passwordInput = passwordCard?.querySelector("#password-input");
    const showBtn = passwordCard?.querySelector('mui-button[slot="after"]');

    if (passwordInput && showBtn) {
      showBtn.addEventListener("click", () => {
        const isPassword = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPassword ? "text" : "password");
        showBtn.textContent = isPassword ? "Hide" : "Show";
      });
    }

    const requiredCard = this.shadowRoot.querySelector("#required-feedback");
    const requiredField = requiredCard?.querySelector("[data-required-field]");
    const requiredInput = requiredCard?.querySelector("[data-required-input]");
    const requiredButton = requiredCard?.querySelector("[data-check-required]");

    requiredButton?.addEventListener("click", () => {
      const nativeInput = requiredInput?.shadowRoot?.querySelector("input");
      const valid = nativeInput?.reportValidity();
      if (!requiredField) return;
      requiredField.setAttribute("variant", valid ? "success" : "error");
      requiredField.setAttribute("message", valid ? "Email address is valid." : "Enter a valid work email address to continue.");
    });
  }
}

customElements.define("story-input", storyInput);
