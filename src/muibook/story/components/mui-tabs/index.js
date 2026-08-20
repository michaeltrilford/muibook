import { getComponentDocs } from "../../../utils/story-data";

class storyTabBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Tabs");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Tab Bar"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );
    const attrsReference = JSON.stringify([
      {
        component: "mui-tab-item",
        parentAttrs: ["has-before", "has-after"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const tabData = [
      { id: "item1", label: "Item", active: true },
      { id: "item2", label: "Item" },
    ];

    const tabItemsHTML = tabData
      .map(({ id, label, active }) => {
        const activeAttr = active ? " active" : "";
        return /*html*/ `<mui-tab-item id="${id}"${activeAttr}>${label}</mui-tab-item>`;
      })
      .join("");

    const stories = /*html*/ `
        <mui-v-stack space="var(--space-100)">
          <story-api-types tag="mui-tab-controller" title="Tab Controller"></story-api-types>
          <story-api-types tag="mui-tab-bar" title="Tab Bar"></story-api-types>
          <story-api-types tag="mui-tab-item" title="Tab Item"></story-api-types>
          <story-api-types tag="mui-tab-panel" title="Tab Panel"></story-api-types>
        </mui-v-stack>


        <story-card canvas-background="var(--surface)" id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
          <mui-tab-bar slot="body">
            <mui-tab-item active id="item1">Item</mui-tab-item>
            <mui-tab-item id="item2">Item</mui-tab-item>
            <mui-tab-item id="item3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="item1"&gt;Item One&lt;/mui-tab-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item id="item2"&gt;Item two&lt;/mui-tab-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item id="item3"&gt;Item three&lt;/mui-tab-item&gt;
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="surface-usage" title="${storyMeta["surface-usage"].title}" description="${storyMeta["surface-usage"].description}" usage="${storyMeta["surface-usage"].usage}">
          <mui-card slot="body">
            <mui-card-body>
              <mui-v-stack space="var(--space-500)">
                <mui-v-stack space="var(--space-300)">
                  <mui-v-stack space="var(--space-100)">
                    <mui-body size="small" weight="medium" variant="secondary">Default surface</mui-body>
                    <mui-tab-bar>
                      <mui-tab-item active id="surface-usage-default-1">Overview</mui-tab-item>
                      <mui-tab-item id="surface-usage-default-2">Activity</mui-tab-item>
                      <mui-tab-item id="surface-usage-default-3">Settings</mui-tab-item>
                    </mui-tab-bar>
                  </mui-v-stack>
                  <mui-v-stack space="var(--space-100)">
                    <mui-body size="small" weight="medium" variant="secondary">Inset active surface</mui-body>
                    <mui-tab-bar active-inset>
                      <mui-tab-item active id="surface-usage-inset-1">Overview</mui-tab-item>
                      <mui-tab-item id="surface-usage-inset-2">Activity</mui-tab-item>
                      <mui-tab-item id="surface-usage-inset-3">Settings</mui-tab-item>
                    </mui-tab-bar>
                  </mui-v-stack>
                </mui-v-stack>

                <mui-v-stack space="var(--space-200)">
                  <mui-body size="small" weight="medium" variant="secondary">Check surface use in overlays</mui-body>
                  <mui-h-stack space="var(--space-200)" wrap>
                    <mui-button size="small" variant="secondary" data-surface-dialog="tabs-surface-dialog">Open Dialog</mui-button>
                    <mui-button size="small" variant="secondary" data-surface-drawer="tabs-surface-drawer">Open Drawer</mui-button>
                    <mui-button size="small" variant="secondary" data-surface-remount="tabs-surface-dialog">Remount Dialog Tabs</mui-button>
                  </mui-h-stack>
                </mui-v-stack>
                <mui-dialog data-surface-dialog="tabs-surface-dialog" width="min(90vw, 32rem)" aria-labelledby="tabs-surface-dialog-title">
                  <mui-heading slot="title" id="tabs-surface-dialog-title" level="3" size="4">Account settings</mui-heading>
                  <mui-tab-bar full-width active-inset>
                    <mui-tab-item active id="dialog-profile">Profile</mui-tab-item>
                    <mui-tab-item id="dialog-security">Security</mui-tab-item>
                  </mui-tab-bar>
                </mui-dialog>
                <mui-drawer data-surface-drawer="tabs-surface-drawer" variant="overlay" side="right" width="min(90vw, 32rem)">
                  <mui-heading slot="title" level="3" size="4">Workspace settings</mui-heading>
                  <mui-tab-bar full-width active-inset>
                    <mui-tab-item active id="drawer-general">General</mui-tab-item>
                    <mui-tab-item id="drawer-members">Members</mui-tab-item>
                  </mui-tab-bar>
                </mui-drawer>

              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          <story-code-block slot="footer" scrollable>
            &lt;mui-card&gt;<br />
            &nbsp;&nbsp;&lt;mui-card-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-bar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id=&quot;overview&quot;&gt;Overview&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;activity&quot;&gt;Activity&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;settings&quot;&gt;Settings&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &lt;/mui-card&gt;<br /><br />
            &lt;mui-button data-surface-dialog=&quot;tabs-dialog&quot;&gt;Open Dialog&lt;/mui-button&gt;<br />
            &lt;mui-dialog data-surface-dialog=&quot;tabs-dialog&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-bar full-width active-inset&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;/mui-dialog&gt;<br /><br />
            &lt;mui-button data-surface-drawer=&quot;tabs-drawer&quot;&gt;Open Drawer&lt;/mui-button&gt;<br />
            &lt;mui-drawer data-surface-drawer=&quot;tabs-drawer&quot; variant=&quot;overlay&quot; side=&quot;right&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-bar full-width active-inset&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;/mui-drawer&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="keyed-dialog" title="${storyMeta["keyed-dialog"].title}" description="${storyMeta["keyed-dialog"].description}" usage="${storyMeta["keyed-dialog"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-button data-keyed-dialog-open="tabs-keyed-dialog">Open Dialog</mui-button>
            <mui-body size="small" variant="secondary" data-keyed-dialog-status>Tab key: 0</mui-body>
            <mui-dialog data-keyed-dialog="tabs-keyed-dialog" aria-labelledby="tabs-keyed-dialog-title">
              <mui-heading slot="title" id="tabs-keyed-dialog-title" level="3" size="4">Account settings</mui-heading>
              <mui-v-stack data-keyed-dialog-content space="var(--space-300)" alignx="stretch">
                <mui-tab-bar full-width active-inset data-tab-key="0">
                  <mui-tab-item active id="keyed-profile-0">Profile</mui-tab-item>
                  <mui-tab-item id="keyed-security-0">Security</mui-tab-item>
                </mui-tab-bar>
              </mui-v-stack>
              <mui-button slot="actions" data-keyed-dialog-change>Change Tab Bar Key</mui-button>
            </mui-dialog>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-dialog&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-bar key=&quot;session-&#36;{key}&quot;&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;/mui-dialog&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface-recessed-50)" id="stroke-none" title="${storyMeta["stroke-none"].title}" description="${storyMeta["stroke-none"].description}" usage="${storyMeta["stroke-none"].usage}">
          <mui-tab-bar slot="body" stroke="none">
            <mui-tab-item active id="stroke-none-1">Item</mui-tab-item>
            <mui-tab-item id="stroke-none-2">Item</mui-tab-item>
            <mui-tab-item id="stroke-none-3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar stroke=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id=&quot;stroke-none-1&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;stroke-none-2&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;stroke-none-3&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="inset" title="${storyMeta["inset"].title}" description="${storyMeta["inset"].description}" usage="${storyMeta["inset"].usage}">
          <mui-tab-bar slot="body" stroke="none" active-inset>
            <mui-tab-item active id="active-inset-none-1">Item</mui-tab-item>
            <mui-tab-item id="active-inset-none-2">Item</mui-tab-item>
            <mui-tab-item id="active-inset-none-3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar stroke=&quot;none&quot; active-inset&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id=&quot;active-inset-none-1&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;active-inset-none-2&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;active-inset-none-3&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="radius" title="${storyMeta["radius"].title}" description="${storyMeta["radius"].description}" usage="${storyMeta["radius"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-tab-bar radius="200">
              <mui-tab-item active id="radius-200-1">Radius 200</mui-tab-item>
              <mui-tab-item id="radius-200-2">Item</mui-tab-item>
              <mui-tab-item id="radius-200-3">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar radius="300">
              <mui-tab-item active id="radius-300-1">Radius 300</mui-tab-item>
              <mui-tab-item id="radius-300-2">Item</mui-tab-item>
              <mui-tab-item id="radius-300-3">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar radius="400">
              <mui-tab-item active id="radius-400-1">Radius 400</mui-tab-item>
              <mui-tab-item id="radius-400-2">Item</mui-tab-item>
              <mui-tab-item id="radius-400-3">Item</mui-tab-item>
            </mui-tab-bar>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar radius=&quot;200&quot;&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;mui-tab-bar radius=&quot;300&quot;&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;mui-tab-bar radius=&quot;400&quot;&gt;...&lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="value" title="${storyMeta["value"].title}" description="${storyMeta["value"].description}" usage="${storyMeta["value"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-h-stack space="var(--space-200)" wrap>
              <mui-button size="small" variant="secondary" data-tab-value="account-profile">Show Profile</mui-button>
              <mui-button size="small" variant="secondary" data-tab-value="account-password">Show Password</mui-button>
              <mui-button size="small" variant="secondary" data-tab-value="account-notifications">Show Notifications</mui-button>
            </mui-h-stack>
            <mui-tab-controller style="width: 100%;">
              <mui-tab-bar data-value-tab-bar value="account-profile" active-inset full-width>
                <mui-tab-item id="account-profile">Profile</mui-tab-item>
                <mui-tab-item id="account-password">Password</mui-tab-item>
                <mui-tab-item id="account-notifications">Notifications</mui-tab-item>
              </mui-tab-bar>
              <mui-tab-panel item="account-profile" style="padding-block-start: var(--space-200);"><mui-body>Profile preferences</mui-body></mui-tab-panel>
              <mui-tab-panel item="account-password" style="padding-block-start: var(--space-200);"><mui-body>Password preferences</mui-body></mui-tab-panel>
              <mui-tab-panel item="account-notifications" style="padding-block-start: var(--space-200);"><mui-body>Notification preferences</mui-body></mui-tab-panel>
            </mui-tab-controller>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar value=&quot;account-password&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;account-profile&quot;&gt;Profile&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;account-password&quot;&gt;Password&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;<br /><br />
            tabBar.setAttribute(&quot;value&quot;, &quot;account-password&quot;);
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="active-attribute" title="${storyMeta["active-attribute"].title}" description="${storyMeta["active-attribute"].description}" usage="${storyMeta["active-attribute"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-h-stack space="var(--space-200)" wrap>
              <mui-button size="small" variant="secondary" data-tab-active="framework-overview">Set Overview Active</mui-button>
              <mui-button size="small" variant="secondary" data-tab-active="framework-activity">Set Activity Active</mui-button>
              <mui-button size="small" variant="secondary" data-tab-active="framework-settings">Set Settings Active</mui-button>
            </mui-h-stack>
            <mui-tab-controller style="width: 100%">
              <mui-tab-bar data-active-tab-bar active-inset full-width>
                <mui-tab-item active id="framework-overview">Overview</mui-tab-item>
                <mui-tab-item id="framework-activity">Activity</mui-tab-item>
                <mui-tab-item id="framework-settings">Settings</mui-tab-item>
              </mui-tab-bar>
              <mui-tab-panel item="framework-overview" style="padding-block-start: var(--space-200);"><mui-v-stack space="var(--space-100)"><mui-body>Overview content</mui-body><mui-body size="small" variant="secondary" data-active-state>Selected: framework-overview</mui-body></mui-v-stack></mui-tab-panel>
              <mui-tab-panel item="framework-activity" style="padding-block-start: var(--space-200);"><mui-v-stack space="var(--space-100)"><mui-body>Activity content</mui-body><mui-body size="small" variant="secondary" data-active-state>Selected: framework-overview</mui-body></mui-v-stack></mui-tab-panel>
              <mui-tab-panel item="framework-settings" style="padding-block-start: var(--space-200);"><mui-v-stack space="var(--space-100)"><mui-body>Settings content</mui-body><mui-body size="small" variant="secondary" data-active-state>Selected: framework-overview</mui-body></mui-v-stack></mui-tab-panel>
            </mui-tab-controller>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            tabBar.querySelector(&quot;#framework-activity&quot;)?.setAttribute(&quot;active&quot;, &quot;&quot;);
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-h-stack space="var(--space-200)" wrap>
              <mui-button size="small" variant="secondary" data-disabled-tab-attempt>Try Share Link</mui-button>
              <mui-button size="small" variant="secondary" data-disabled-tab-select="outcomes-settings">Show Settings</mui-button>
            </mui-h-stack>
            <mui-tab-controller style="width: 100%">
              <mui-tab-bar data-disabled-tab-bar active-inset full-width>
                <mui-tab-item active id="outcomes-overview">Overview</mui-tab-item>
                <mui-tab-item disabled id="outcomes-share">Share link</mui-tab-item>
                <mui-tab-item id="outcomes-settings">Settings</mui-tab-item>
              </mui-tab-bar>
              <mui-tab-panel item="outcomes-overview" style="padding-block-start: var(--space-200);"><mui-v-stack space="var(--space-100)"><mui-body>Outcome overview</mui-body><mui-body size="small" variant="secondary" data-disabled-tab-state>Selected: outcomes-overview</mui-body></mui-v-stack></mui-tab-panel>
              <mui-tab-panel item="outcomes-share" style="padding-block-start: var(--space-200);"><mui-v-stack space="var(--space-100)"><mui-body>Share link unavailable</mui-body><mui-body size="small" variant="secondary" data-disabled-tab-state>Selected: outcomes-overview</mui-body></mui-v-stack></mui-tab-panel>
              <mui-tab-panel item="outcomes-settings" style="padding-block-start: var(--space-200);"><mui-v-stack space="var(--space-100)"><mui-body>Outcome settings</mui-body><mui-body size="small" variant="secondary" data-disabled-tab-state>Selected: outcomes-overview</mui-body></mui-v-stack></mui-tab-panel>
            </mui-tab-controller>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-item disabled id=&quot;outcomes-share&quot;&gt;Share link&lt;/mui-tab-item&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="controller" title="${storyMeta["controller"].title}" description="${storyMeta["controller"].description}" usage="${storyMeta["controller"].usage}">
          <mui-tab-controller slot="body">
            <mui-tab-bar active-inset radius="500" stroke="none" full-width style="max-width: 370px; margin: 0 auto; margin-block-end: var(--space-400)">
              <mui-tab-item active id="item1">Item</mui-tab-item>
              <mui-tab-item id="item2">Item</mui-tab-item>
              <mui-tab-item id="item3">Item</mui-tab-item>
            </mui-tab-bar>

            <mui-tab-panel item="item1">
              <mui-card>
                <mui-card-body>
                  <mui-heading level="2" size="4">Content 1</mui-heading>
                  <mui-body>Secondary content</mui-body>
                </mui-card-body>
              </mui-card>
            </mui-tab-panel>

            <mui-tab-panel item="item2">
              <mui-card>
                <mui-card-body>
                  <mui-heading level="2" size="4">Content 2</mui-heading>
                  <mui-body>Secondary content</mui-body>
                </mui-card-body>
              </mui-card>
            </mui-tab-panel>

            <mui-tab-panel item="item3">
              <mui-card>
                <mui-card-body>
                  <mui-heading level="2" size="4">Content 3</mui-heading>
                  <mui-body>Secondary content</mui-body>
                </mui-card-body>
              </mui-card>
            </mui-tab-panel>

          </mui-tab-controller>

          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-controller&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-bar active-inset radius=&quot;500&quot; stroke=&quot;none&quot; full-width style=&quot;max-width: 370px; margin: 0 auto;&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id="item1"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="item2"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="item3"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item1"&gt;Content 1&lt;/mui-tab-panel&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item2"&gt;Content 2&lt;/mui-tab-panel&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item3"&gt;Content 3&lt;/mui-tab-panel&gt;<br />
            &lt;/mui-tab-controller&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="speed" title="${storyMeta["speed"].title}" description="${storyMeta["speed"].description}" usage="${storyMeta["speed"].usage}">
          <mui-tab-bar slot="body" speed="500">
            ${tabItemsHTML}
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Item', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Item' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ id, label, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
            <br />
            })
            <br />
            .join('');
            <br />
            <br />
            &lt;mui-tab-bar full-width&gt;
            <br />
            &nbsp;&#36;{tabItemsHTML}
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-tab-bar size="x-small">
              <mui-tab-item active id="x-small-1">Item</mui-tab-item>
              <mui-tab-item id="x-small-2">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="small">
              <mui-tab-item active id="small-1">Item</mui-tab-item>
              <mui-tab-item id="small-2">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="medium">
              <mui-tab-item active id="medium-1">Item</mui-tab-item>
              <mui-tab-item id="medium-2">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="large">
              <mui-tab-item active id="large-1">Item</mui-tab-item>
              <mui-tab-item id="large-2">Item</mui-tab-item>
            </mui-tab-bar>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="small-1"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="small-2"&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="button-parity" title="${storyMeta["button-parity"].title}" description="${storyMeta["button-parity"].description}" usage="${storyMeta["button-parity"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="x-small">Action</mui-button>
              <mui-tab-bar size="x-small">
                <mui-tab-item active id="pair-x-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-x-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="small">Action</mui-button>
              <mui-tab-bar size="small">
                <mui-tab-item active id="pair-s-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-s-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="medium">Action</mui-button>
              <mui-tab-bar size="medium">
                <mui-tab-item active id="pair-m-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-m-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="large">Action</mui-button>
              <mui-tab-bar size="large">
                <mui-tab-item active id="pair-l-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-l-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-button size="small"&gt;Action&lt;/mui-button&gt;<br />
            &lt;mui-tab-bar size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="pair-s-1"&gt;Tab&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="pair-s-2"&gt;Tab&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="slots" title="${storyMeta["slots"].title}" description="${storyMeta["slots"].description}" usage="${storyMeta["slots"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)" alignx='start'>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="x-small">
                <mui-tab-item active id="default-width-x-small-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="x-small">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-x-small-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="small">
                <mui-tab-item active id="default-width-small-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="small">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-small-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="medium">
                <mui-tab-item active id="default-width-medium-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="medium">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-medium-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="large">
                <mui-tab-item active id="default-width-large-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="large">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-large-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar size="small"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="default-width-small-1"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-Item slot="before"&gt;&lt;/mui-icon-Item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="after"&gt;2&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="default-width-small-2"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-calendar slot="before"&gt;&lt;/mui-icon-calendar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after"&gt;&lt;/mui-icon-right-chevron&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-item&gt;<br />
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="default-width" title="${storyMeta["default-width"].title}" description="${storyMeta["default-width"].description}" usage="${storyMeta["default-width"].usage}">
          <mui-tab-bar slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Item', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Item' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ id, label, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
            <br />
            })
            <br />
            .join('');
            <br />
            <br />
            &lt;mui-tab-bar&gt;
            <br />
            &nbsp;&#36;{tabItemsHTML}
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--carousel-background)" id="dots" title="${storyMeta["dots"].title}" description="${storyMeta["dots"].description}" usage="${storyMeta["dots"].usage}">
          <mui-tab-bar slot="body" variant="dots">
            <mui-tab-item active id="dots-1">Slide 1</mui-tab-item>
            <mui-tab-item id="dots-2">Slide 2</mui-tab-item>
            <mui-tab-item id="dots-3">Slide 3</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar variant="dots"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="dots-1"&gt;Slide 1&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="dots-2"&gt;Slide 2&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="dots-3"&gt;Slide 3&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface-elevated-300)" id="ghost" title="${storyMeta["ghost"].title}" description="${storyMeta["ghost"].description}" usage="${storyMeta["ghost"].usage}">
          <mui-tab-bar slot="body" variant="ghost">
            <mui-tab-item active id="ghost-1">Item</mui-tab-item>
            <mui-tab-item id="ghost-2">Item</mui-tab-item>
            <mui-tab-item id="ghost-3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar variant="ghost"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="ghost-1"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="ghost-2"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="ghost-3"&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card canvas-background="var(--surface)" id="full-width" title="${storyMeta["full-width"].title}" description="${storyMeta["full-width"].description}" usage="${storyMeta["full-width"].usage}">
          <mui-tab-bar full-width slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>

          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Item', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Item' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ id, label, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
            <br />
            })
            <br />
            .join('');
            <br />
            <br />
            &lt;mui-tab-bar full-width&gt;
            <br />
            &nbsp;&#36;{tabItemsHTML}
            <br />
            &lt;/mui-tab-bar&gt;
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

        imports='["@muibook/components/mui-tabs"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.shadowRoot.querySelectorAll("mui-button[data-surface-dialog]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-surface-dialog");
        this.shadowRoot.querySelector(`mui-dialog[data-surface-dialog="${target}"]`)?.setAttribute("open", "");
      });
    });

    this.shadowRoot.querySelectorAll("mui-button[data-surface-drawer]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-surface-drawer");
        this.shadowRoot.querySelector(`mui-drawer[data-surface-drawer="${target}"]`)?.setAttribute("open", "");
      });
    });

    this.shadowRoot.querySelectorAll("mui-button[data-surface-remount]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-surface-remount");
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-surface-dialog="${target}"]`);
        const currentTabBar = dialog?.querySelector("mui-tab-bar");
        if (!currentTabBar) return;

        const tabBar = document.createElement("mui-tab-bar");
        tabBar.setAttribute("full-width", "");
        tabBar.setAttribute("active-inset", "");
        [
          ["dialog-remounted-profile", "Profile"],
          ["dialog-remounted-security", "Security"],
        ].forEach(([id, label], index) => {
          const tab = document.createElement("mui-tab-item");
          tab.id = id;
          tab.textContent = label;
          if (index === 0) tab.setAttribute("active", "");
          tabBar.append(tab);
        });
        currentTabBar.replaceWith(tabBar);
      });
    });

    const keyedDialog = this.shadowRoot.querySelector("mui-dialog[data-keyed-dialog]");
    const keyedContent = this.shadowRoot.querySelector("[data-keyed-dialog-content]");
    const keyedStatus = this.shadowRoot.querySelector("[data-keyed-dialog-status]");
    let tabKey = 0;
    const renderKeyedTabBar = () => {
      tabKey += 1;
      const tabBar = document.createElement("mui-tab-bar");
      tabBar.setAttribute("full-width", "");
      tabBar.setAttribute("active-inset", "");
      tabBar.setAttribute("data-tab-key", String(tabKey));
      [
        [`keyed-profile-${tabKey}`, `Profile ${tabKey}`],
        [`keyed-security-${tabKey}`, `Security ${tabKey}`],
      ].forEach(([id, label], index) => {
        const tab = document.createElement("mui-tab-item");
        tab.id = id;
        tab.textContent = label;
        if (index === 0) tab.setAttribute("active", "");
        tabBar.append(tab);
      });
      keyedContent?.replaceChildren(tabBar);
      if (keyedStatus) keyedStatus.textContent = `Tab key: ${tabKey}`;
    };
    this.shadowRoot.querySelectorAll("mui-button[data-keyed-dialog-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-keyed-dialog-open");
        this.shadowRoot.querySelector(`mui-dialog[data-keyed-dialog="${target}"]`)?.setAttribute("open", "");
      });
    });
    this.shadowRoot.querySelector("mui-button[data-keyed-dialog-change]")?.addEventListener("click", renderKeyedTabBar);

    this.shadowRoot.querySelectorAll("mui-button[data-tab-value]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-tab-value");
        this.shadowRoot.querySelector("mui-tab-bar[data-value-tab-bar]")?.setAttribute("value", value || "");
      });
    });

    const activeTabBar = this.shadowRoot.querySelector("mui-tab-bar[data-active-tab-bar]");
    const activeStates = this.shadowRoot.querySelectorAll("[data-active-state]");
    activeTabBar?.addEventListener("tab-change", (event) => {
      activeStates.forEach((state) => (state.textContent = `Selected: ${event.detail.activeId}`));
    });
    this.shadowRoot.querySelectorAll("mui-button[data-tab-active]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-tab-active");
        activeTabBar?.querySelector(`mui-tab-item#${id}`)?.setAttribute("active", "");
      });
    });

    const disabledTabBar = this.shadowRoot.querySelector("mui-tab-bar[data-disabled-tab-bar]");
    const disabledTabStates = this.shadowRoot.querySelectorAll("[data-disabled-tab-state]");
    disabledTabBar?.addEventListener("tab-change", (event) => {
      disabledTabStates.forEach((state) => (state.textContent = `Selected: ${event.detail.activeId}`));
    });
    this.shadowRoot.querySelector("mui-button[data-disabled-tab-attempt]")?.addEventListener("click", () => {
      const disabledTab = disabledTabBar?.querySelector("mui-tab-item#outcomes-share");
      if (disabledTab) disabledTabBar?.setActiveTab(disabledTab);
    });
    this.shadowRoot.querySelectorAll("mui-button[data-disabled-tab-select]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-disabled-tab-select");
        const tab = disabledTabBar?.querySelector(`mui-tab-item#${id}`);
        if (tab) disabledTabBar?.setActiveTab(tab);
      });
    });
  }
}

customElements.define("story-tab-bar", storyTabBar);
