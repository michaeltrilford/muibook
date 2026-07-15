import { getComponentDocs } from "../../../utils/story-data";

class storySlat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Slat");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Slat"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-slat",
        parentAttrs: [],
        childAttrs: ["card-slot", "card-body-size-none-slot"],
      },
      {
        component: "mui-slat-group",
        parentAttrs: [],
        childAttrs: ['usage="card"'],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

    `;

    const stories = /*html*/ `
        <mui-v-stack space="var(--space-100)">
          <story-api-types tag="mui-slat" title="Slat"></story-api-types>
          <story-api-types tag="mui-slat-group" title="Slat Group"></story-api-types>
        </mui-v-stack>

        <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">

          <mui-slat slot="body">
            <mui-heading slot="start" size="5">Heading</mui-heading>
            <mui-h-stack slot="end" space="var(--space-400)" alignX="flex-end">
              <mui-body width="20px">Body</mui-body>
            </mui-h-stack>
          </mui-slat>

          <story-code-block slot="footer" scrollable>
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
          </story-code-block>

        </story-card>

        <story-card id="header" title="${storyMeta["header"].title}" description="${storyMeta["header"].description}" usage="${storyMeta["header"].usage}">

          <mui-slat slot="body" variant="header">
            <mui-heading slot="start" size="6" level="4">Heading</mui-heading>
            <mui-h-stack slot="end" alignX="end">
              <mui-body size="6" level="4">End slot</mui-body>
            </mui-h-stack>
          </mui-slat>

          <story-code-block slot="footer" scrollable>
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
          </story-code-block>

        </story-card>

        <story-card id="row" title="${storyMeta["row"].title}" description="${storyMeta["row"].description}" usage="${storyMeta["row"].usage}">

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

          <story-code-block slot="footer" scrollable>
            &lt;mui-slat variant="row"&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="end" alignX="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            <br />
            &lt;/mui-slat&gt;
          </story-code-block>

        </story-card>

        <story-card id="action" title="${storyMeta["action"].title}" description="${storyMeta["action"].description}" usage="${storyMeta["action"].usage}">

          <mui-slat slot="body" variant="action">
            <mui-v-stack space="0" slot="start">
              <mui-body size="medium" weight="bold">Get a Transactions Report</mui-body>
              <mui-body size="small">Generate a PDF of your recent transactions</mui-body>
            </mui-v-stack>
            <mui-badge slot="end">PDF</mui-badge>
          </mui-slat>

          <story-code-block slot="footer" scrollable>
            &lt;mui-slat variant="action"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-badge slot="end"&gt;PDF&lt;/mui-badge&gt;
            <br />
            &lt;/mui-slat&gt;
          </story-code-block>

        </story-card>

        <story-card id="truncation-file-diff" title="${storyMeta["truncation-file-diff"].title}" description="${storyMeta["truncation-file-diff"].description}" usage="${storyMeta["truncation-file-diff"].usage}">

          <mui-slat slot="body" variant="action" col="minmax(0, 1fr) auto">
            <mui-h-stack slot="start" space="var(--space-100)" aligny="center" style="min-width: 0;">
              <mui-file-icon slot="icon" icon="javascript" size="small"></mui-file-icon>
              <mui-body size="x-small" weight="medium" style="text-wrap: nowrap;">file-name.ts</mui-body>
              <mui-body variant="secondary" size="x-small" weight="regular" truncate>src/components/very/long/path/to/some/nested/file-name.ts</mui-body>
            </mui-h-stack>
            <mui-h-stack slot="end" aligny="center" space="var(--space-100)">
              <mui-body size="x-small" weight="regular" variant="positive">+120</mui-body>
              <mui-body size="x-small" weight="regular" variant="attention">-34</mui-body>
            </mui-h-stack>
          </mui-slat>

          <story-code-block slot="footer" scrollable>
            &lt;mui-slat variant="action" col="minmax(0, 1fr) auto"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="start" style="min-width: 0;"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" weight="medium" style="text-wrap: nowrap;"&gt;file-name.ts&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant="secondary" size="x-small" weight="regular" truncate&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant="positive"&gt;+120&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant="attention"&gt;-34&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </story-code-block>

        </story-card>

        <story-card id="action-custom-columns-and-space" title="${storyMeta["action-custom-columns-and-space"].title}" description="${storyMeta["action-custom-columns-and-space"].description}" usage="${storyMeta["action-custom-columns-and-space"].usage}">

          <mui-slat-group slot="body">
            <mui-slat variant="action" col="1fr auto" space="var(--space-800)">
              <mui-v-stack space="0" slot="start">
                <mui-body size="medium" weight="bold">Billing Details</mui-body>
                <mui-body size="small" variant="secondary">Manage invoice address and payment metadata</mui-body>
              </mui-v-stack>
            </mui-slat>
            <mui-slat variant="action" col="1fr auto" space="var(--space-800)">
              <mui-v-stack space="0" slot="start">
                <mui-body size="medium" weight="bold">Team Seats</mui-body>
                <mui-body size="small" variant="secondary">Review active seats before renewal</mui-body>
              </mui-v-stack>
              <mui-status slot="end" size="small" variant="warning">Review</mui-status>
            </mui-slat>
          </mui-slat-group>

          <story-code-block slot="footer" scrollable>
            &lt;mui-slat-group&gt;
            <br />
            <br />
            &lt;mui-slat
            <br />
            &nbsp;&nbsp;variant="action"
            <br />
            &nbsp;&nbsp;col="1fr auto"
            <br />
            &nbsp;&nbsp;space="var(--space-800)"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;...&lt;/mui-v-stack&gt;
            <br />
            &lt;/mui-slat&gt;
            <br />
            <br />
            &lt;mui-slat
            <br />
            &nbsp;&nbsp;variant="action"
            <br />
            &nbsp;&nbsp;col="1fr auto"
            <br />
            &nbsp;&nbsp;space="var(--space-800)"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;...&lt;/mui-v-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-status slot="end" size="small" variant="warning"&gt;Review&lt;/mui-status&gt;
            <br />
            &lt;/mui-slat&gt;
            <br />
            <br />
            &lt;/mui-slat-group&gt;
          </story-code-block>

        </story-card>

        <story-card id="row-accessory" title="${storyMeta["row-accessory"].title}" description="${storyMeta["row-accessory"].description}" usage="${storyMeta["row-accessory"].usage}">

          <mui-slat slot="body" variant="row">

            <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar">
              <mui-icon-left-sidebar></mui-icon-left-sidebar>
            </mui-avatar>

            <mui-v-stack slot="start" space="0">
              <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
              <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
            </mui-v-stack>

            <mui-v-stack space="0" alignX="end" slot="end">
              <mui-body size="x-small">Pending</mui-body>
              <mui-body size="small" weight="bold">-$8.12</mui-body>
            </mui-v-stack>

          </mui-slat>

          <story-code-block slot="footer" scrollable>
            &lt;mui-slat variant="row"&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-avatar slot="accessory"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-avatar&gt;
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
          </story-code-block>

        </story-card>

        <story-card id="action-accessory" title="${storyMeta["action-accessory"].title}" description="${storyMeta["action-accessory"].description}" usage="${storyMeta["action-accessory"].usage}">

          <mui-v-stack slot="body">

            <mui-slat variant="action">
              <mui-avatar slot="accessory" size="small" label="Espresso & Muffin Bar" background="neutral">
                <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
              </mui-avatar>
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
              <mui-card-header>
                <mui-heading size="3">Transactions</mui-heading>
                <mui-body>Here’s a summary of recent transactions on your account.</mui-body>
              </mui-card-header>
              <mui-card-body>
                <mui-slat-group>
                  <mui-rule></mui-rule>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Today</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">22 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-avatar slot="accessory" size="small" label="Espresso & Muffin Bar" background="neutral">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-avatar>
                    <mui-v-stack  slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-slat-group>
              </mui-card-body>
            </mui-card>

            <mui-card>
              <mui-card-body size="none">
                <mui-slat variant="header">
                  <mui-heading slot="start" size="6">Today</mui-heading>
                  <mui-h-stack slot="end" alignX="end">
                    <mui-body size="small">22 July 2025</mui-body>
                  </mui-h-stack>
                </mui-slat>
                <mui-rule></mui-rule>
                <mui-v-stack space="var(--space-000)">
                  <mui-slat variant="action" radius="none">
                    <mui-avatar slot="accessory" size="small" label="Espresso & Muffin Bar" background="attention">
                      <mui-icon-left-sidebar size="small"></mui-icon-left-sidebar>
                    </mui-avatar>
                    <mui-v-stack slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-v-stack>
              </mui-card-body>
            </mui-card>

          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
            // PAGE USE
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar slot="accessory"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar&gt;<br /><br />
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
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Transactions&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Here&rsquo;s a summary of recent transactions on your account.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;header&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot=&quot;start&quot; size=&quot;6&quot;&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar slot=&quot;accessory&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size=&quot;small&quot;&gt;&lt;/mui-icon-left-sidebar&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;medium&quot; weight=&quot;bold&quot;&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;Food &amp; Drink &bull; Richmond, VIC&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;<br />
            <br />
            // CARD BODY SIZE NONE
            <br />
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" radius="none"&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar slot="accessory"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-left-sidebar size="small"&gt;&lt;/mui-icon-left-sidebar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" weight="bold"&gt;Espresso &amp; Muffin Bar&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;Food &amp; Drink • Richmond, VIC&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card&gt;<br />
          </story-code-block>

        </story-card>

        <story-card
          id="slat-and-group"
          title="${storyMeta["slat-and-group"].title}"
          description="${storyMeta["slat-and-group"].description}"
          usage="${storyMeta["slat-and-group"].usage}"
        >

          <mui-v-stack slot="body" space="var(--space-400)">

            <mui-slat-group>
              <mui-slat>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="small" weight="bold">Name</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-body size="x-small">Figma</mui-body>
                </mui-v-stack>
              </mui-slat>
              <mui-slat>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="small" weight="bold">Billed</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-status size="small" color="blue">Monthly</mui-status>
                </mui-v-stack>
              </mui-slat>
              <mui-slat>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="small" weight="bold">Cost</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-body size="x-small">$20.00</mui-body>
                </mui-v-stack>
              </mui-slat>
            </mui-slat-group>
            <mui-rule></mui-rule>
            <mui-slat-group>
              <mui-slat>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="small" weight="bold">Name</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-body size="x-small">Sketch</mui-body>
                </mui-v-stack>
              </mui-slat>
              <mui-slat>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="small" weight="bold">Billed</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-status size="small" color="blue">Monthly</mui-status>
                </mui-v-stack>
              </mui-slat>
              <mui-slat>
                <mui-v-stack slot="start" space="0">
                  <mui-body size="small" weight="bold">Cost</mui-body>
                </mui-v-stack>
                <mui-v-stack space="0" slot="end" alignX="end">
                  <mui-body size="x-small">$12.00</mui-body>
                </mui-v-stack>
              </mui-slat>
            </mui-slat-group>

          </mui-v-stack>


          <story-code-block slot="footer" scrollable>
            &lt;mui-v-stack space=&quot;var(--space-400)&quot;&gt;<br>
            &nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Name&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Figma&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Billed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-status size=&quot;small&quot; color=&quot;blue&quot;&gt;Monthly&lt;/mui-status&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Cost&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;$20.00&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Name&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Sketch&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Billed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-status size=&quot;small&quot; color=&quot;blue&quot;&gt;Monthly&lt;/mui-status&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Cost&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;$12.00&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &lt;/mui-v-stack&gt;
          </story-code-block>


        </story-card>

        <story-card
          id="card-slat-and-group"
          title="${storyMeta["card-slat-and-group"].title}"
          description="${storyMeta["card-slat-and-group"].description}"
          usage="${storyMeta["card-slat-and-group"].usage}"
        >
          <mui-card slot="body">
            <mui-card-header>
              <mui-heading size="3">Design Tools</mui-heading>
              <mui-body>Comparison list of pricing for popular design tooling</mui-body>
            </mui-card-header>
            <mui-rule></mui-rule>
            <mui-card-body>
            <mui-v-stack space="var(--space-400)" style="padding-top: var(--space-500); padding-bottom: var(--space-200);">
              <mui-slat-group>
                <mui-slat>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Name</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">Figma</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Billed</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-status size="small" color="blue">Monthly</mui-status>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Cost</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">$20.00</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-slat-group>
              <mui-rule></mui-rule>
              <mui-slat-group>
                <mui-slat>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Name</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">Sketch</mui-body>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Billed</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-status size="small" color="blue">Monthly</mui-status>
                  </mui-v-stack>
                </mui-slat>
                <mui-slat>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Cost</mui-body>
                  </mui-v-stack>
                  <mui-v-stack space="0" slot="end" alignX="end">
                    <mui-body size="x-small">$12.00</mui-body>
                  </mui-v-stack>
                </mui-slat>
              </mui-slat-group>
            </mui-v-stack>
            </mui-card-body>
          </mui-card>

          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Design Tools&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Comparison list of pricing for popular design tooling&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;var(--space-400)&quot; style=&quot;padding-top: var(--space-500); padding-bottom: var(--space-200);&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Name&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Figma&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Billed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-status size=&quot;small&quot; color=&quot;blue&quot;&gt;Monthly&lt;/mui-status&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Cost&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;$20.00&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Name&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Sketch&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Billed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-status size=&quot;small&quot; color=&quot;blue&quot;&gt;Monthly&lt;/mui-status&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Cost&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;$12.00&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>


        </story-card>

        <story-card id="card-variant-slat-and-group" title="${storyMeta["card-variant-slat-and-group"].title}" description="${storyMeta["card-variant-slat-and-group"].description}" usage="${storyMeta["card-variant-slat-and-group"].usage}">
          <mui-card slot="body">
            <mui-card-header>
              <mui-heading size="3">Account Activity</mui-heading>
              <mui-body>Here’s a summary of recent actions on your account.</mui-body>
            </mui-card-header>
            <mui-card-body>
              <!-- Today -->
              <mui-slat-group>
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

          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Account Activity&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Here’s a summary of recent actions on your account.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br><br>

            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Today --&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Yesterday --&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;2FA code sent&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Method: SMS&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;04:19 PM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>


        </story-card>


        <story-card id="card-slat-group-dividers" title="${storyMeta["card-slat-group-dividers"].title}" description="${storyMeta["card-slat-group-dividers"].description}" usage="${storyMeta["card-slat-group-dividers"].usage}">
          <mui-card slot="body">

            <mui-card-header>
              <mui-heading size="3">Account Activity</mui-heading>
              <mui-body>Here’s a summary of recent actions on your account.</mui-body>
            </mui-card-header>

            <mui-card-body>
              <!-- Today -->
              <mui-slat-group>
                <mui-rule></mui-rule>
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
                <mui-rule></mui-rule>
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

          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3"&gt;Account Activity&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Here’s a summary of recent actions on your account.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br><br>

            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Today --&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Yesterday --&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Yesterday&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;21 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="bold"&gt;2FA code sent&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Method: SMS&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="0" slot="end" alignX="end"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;04:19 PM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>

        </story-card>

        <story-card id="card-slat-group-and-accordion" title="${storyMeta["card-slat-group-and-accordion"].title}" description="${storyMeta["card-slat-group-and-accordion"].description}" usage="${storyMeta["card-slat-group-and-accordion"].usage}">
            <mui-card slot="body">
              <mui-card-header>
                <mui-heading size="3">Title</mui-heading>
              </mui-card-header>
              <mui-rule></mui-rule>
              <mui-card-body>
                <mui-accordion-group exclusive>
                  <mui-accordion-block heading="Heading">
                    <mui-slat-group slot="detail">
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
                      <mui-rule></mui-rule>
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
                  </mui-accordion-block>
                  <mui-accordion-block heading="Heading">
                    <mui-slat-group slot="detail">
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
                      <mui-rule></mui-rule>
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
                  </mui-accordion-block>
                </mui-accordion-group>
              </mui-card-body>
            </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-header&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size=&quot;3&quot;&gt;Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-header&gt;<br>
            &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-group exclusive&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading=&quot;Heading&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group slot=&quot;detail&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;header&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot=&quot;start&quot; size=&quot;6&quot;&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Yesterday --&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;header&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot=&quot;start&quot; size=&quot;6&quot;&gt;Yesterday&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;21 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;2FA code sent&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Method: SMS&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;04:19 PM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-accordion-block heading=&quot;Heading&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat-group slot=&quot;detail&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;header&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot=&quot;start&quot; size=&quot;6&quot;&gt;Today&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;22 July 2025&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Signed in from new device&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Location: Sydney, Australia&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;10:32 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;start&quot; space=&quot;0&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot; weight=&quot;bold&quot;&gt;Password changed&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;Security settings updated&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space=&quot;0&quot; slot=&quot;end&quot; alignX=&quot;end&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot;&gt;08:47 AM&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Yesterday --&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;header&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant=&quot;action&quot;&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat-group&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-block&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-accordion-group&gt;<br>
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br>
            &lt;/mui-card&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="card-size-none"
          title="${storyMeta["card-size-none"].title}"
          description="${storyMeta["card-size-none"].description}"
          usage="${storyMeta["card-size-none"].usage}"
        >

          <mui-card slot="body">
            <mui-card-body size="none">
              <mui-slat variant="header">
                <mui-heading slot="start" size="6">Today</mui-heading>
                <mui-h-stack slot="end" alignX="end">
                  <mui-body size="small">22 July 2025</mui-body>
                </mui-h-stack>
              </mui-slat>

              <mui-rule></mui-rule>

              <mui-slat variant="action" radius="none">
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
              <mui-slat variant="action" radius="none">
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
                <mui-slat variant="action" radius="none">
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

          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body size=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="header"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading slot="start" size="6"&gt;Today&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="end" alignX="end"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small"&gt;22 July 2025&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-slat&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" radius="none"&gt;<br />
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
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" radius="none"&gt;<br />
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-slat variant="action" radius="none"&gt;<br />
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
          </story-code-block>

        </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        attrs-reference='${attrsReference}'

        imports='["@muibook/components/mui-slat"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>

        ${stories}

      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    this.shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = this.shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-slat", storySlat);
