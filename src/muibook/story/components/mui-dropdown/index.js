import { getComponentDocs } from "../../../utils/story-data";
import VisaBlack from "../../../images/networks/visa-black.svg";
import LogoPlaceholder from "../../../images/card/image-220.png";

class storyDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Dropdown");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Dropdown"></story-metadata-empty>`;
      return;
    }

    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const attrsReference = JSON.stringify([
      {
        component: "mui-button",
        parentAttrs: [],
        childAttrs: ["menu-slot", "menu-slot-first", "menu-slot-last"],
      },
      {
        component: "mui-link",
        parentAttrs: [],
        childAttrs: ["menu-slot", "menu-slot-first", "menu-slot-last"],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; }

      .card-artwork {
        --menu-radius: var(--radius-400) var(--radius-400) var(--radius-300) var(--radius-300);
      }

      .info {
        --menu-radius: var(--radius-400);
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-dropdown" title="Dropdown"></story-api-types>

      <story-card id="action-sizes" title="${storyMeta["action-sizes"].title}" usage="${storyMeta["action-sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-300)" alignX="start">
          <mui-h-stack width="100%" wrap space="var(--space-300)">
            <mui-dropdown size="x-small">
            <mui-button slot="action" size="x-small"><mui-icon-ellipsis size="x-small"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="x-small">Option one</mui-button>
              <mui-button size="x-small">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
            <mui-dropdown size="small">
            <mui-button slot="action" size="small"><mui-icon-ellipsis size="small"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="small">Option one</mui-button>
              <mui-button size="small">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
            <mui-dropdown size="medium">
            <mui-button slot="action" size="medium"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="medium">Option one</mui-button>
              <mui-button size="medium">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
            <mui-dropdown size="large">
            <mui-button slot="action" size="large"><mui-icon-ellipsis size="large"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="large">Option one</mui-button>
              <mui-button size="large">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
          </mui-h-stack>
          <mui-h-stack width="100%" wrap space="var(--space-300)">
            <mui-dropdown size="x-small">
            <mui-button slot="action" size="x-small"><mui-icon-ellipsis size="x-small"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="x-small" variant="primary">Option active</mui-button>
              <mui-button size="x-small">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
            <mui-dropdown size="small">
            <mui-button slot="action" size="small"><mui-icon-ellipsis size="small"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="small" variant="primary">Option active</mui-button>
              <mui-button size="small">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
            <mui-dropdown size="medium">
            <mui-button slot="action" size="medium"><mui-icon-ellipsis size="medium"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="medium" variant="primary">Option active</mui-button>
              <mui-button size="medium">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
            <mui-dropdown size="large">
            <mui-button slot="action" size="large"><mui-icon-ellipsis size="large"></mui-icon-ellipsis></mui-button>
            <mui-menu>
              <mui-button size="large" variant="primary">Option active</mui-button>
              <mui-button size="large">Option two</mui-button>
            </mui-menu>
            </mui-dropdown>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Default (x-small, small, medium, large) --&gt;<br>
          &lt;mui-dropdown size=&quot;x-small&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221; size=&quot;x-small&quot;&gt;&lt;mui-icon-ellipsis size=&quot;x-small&quot;&gt;&lt;/mui-icon-ellipsis&gt;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size=&quot;x-small&quot;&gt;Option one&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button size=&quot;x-small&quot;&gt;Option two&lt;/mui-button&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;<br><br>
          &lt;!-- Repeat for small / medium / large --&gt;<br><br>

          &lt;!-- Active-first (x-small, small, medium, large) --&gt;<br>
          &lt;mui-dropdown size=&quot;x-small&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221; size=&quot;x-small&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size=&quot;x-small&quot;&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size=&quot;x-small&quot; variant=&quot;primary&quot;&gt;Option active&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button size=&quot;x-small&quot;&gt;Option two&lt;/mui-button&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;<br><br>
          &lt;mui-dropdown size=&quot;small&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221; size=&quot;small&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size=&quot;small&quot;&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size=&quot;small&quot; variant=&quot;primary&quot;&gt;Option active&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button size=&quot;small&quot;&gt;Option two&lt;/mui-button&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;<br><br>
          &lt;mui-dropdown size=&quot;medium&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221; size=&quot;medium&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size=&quot;medium&quot;&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size=&quot;medium&quot; variant=&quot;primary&quot;&gt;Option active&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button size=&quot;medium&quot;&gt;Option two&lt;/mui-button&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;<br><br>
          &lt;mui-dropdown size=&quot;large&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221; size=&quot;large&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size=&quot;large&quot;&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size=&quot;large&quot; variant=&quot;primary&quot;&gt;Option active&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button size=&quot;large&quot;&gt;Option two&lt;/mui-button&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="z-index" title="${storyMeta["z-index"].title}" description="${storyMeta["z-index"].description}" usage="${storyMeta["z-index"].usage}">
        <mui-dropdown slot="body" zindex="999" position="left" size="medium">
          <mui-button slot="action" variant="secondary">Layer<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
          <mui-menu inset>
            <mui-body variant="secondary">Layer order</mui-body>
            <mui-button>Bring to front</mui-button>
            <mui-button>Bring forward</mui-button>
            <mui-button>Send backward</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Open layers panel</mui-link>
          </mui-menu>
        </mui-dropdown>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; zindex="999"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Layer&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu inset&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Layer order&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Bring to front&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Bring forward&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Send backward&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant=&quot;tertiary&quot; href=&quot;#&quot;&gt;Open layers panel&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="custom-offset" title="${storyMeta["custom-offset"].title}" description="${storyMeta["custom-offset"].description}" usage="${storyMeta["custom-offset"].usage}">
        <mui-dropdown slot="body" offset="var(--space-500)" size="medium" persistent>
          <mui-button slot="action" variant="secondary">Assign tags<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
          <mui-menu inset width="min(100%, 32rem)">
            <mui-chip-input slot="top" hide-label label="Tags" value='[{"value":"design","label":"Design"}]' options='[{"value":"design","label":"Design"},{"value":"development","label":"Development"},{"value":"review","label":"Review"}]'></mui-chip-input>
            <mui-button>Apply tags</mui-button>
            <mui-button>Clear selection</mui-button>
          </mui-menu>
        </mui-dropdown>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; persistent offset=&quot;var(--space-500)&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Assign tags&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu inset width=&quot;min(100%, 32rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-chip-input slot=&quot;top&quot; hide-label label=&quot;Tags&quot; value='...' options='...'&gt;&lt;/mui-chip-input&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Apply tags&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Clear selection&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="menu-width" title="${storyMeta["menu-width"].title}" description="${storyMeta["menu-width"].description}" usage="${storyMeta["menu-width"].usage}">
        <mui-dropdown slot="body" size="small">
          <mui-button slot="action" size="small" icon-only aria-label="File actions"><mui-icon-ellipsis size="small"></mui-icon-ellipsis></mui-button>
          <mui-menu width="min(100%, 18rem)">
            <mui-button>Open</mui-button>
            <mui-button>Move</mui-button>
            <mui-rule></mui-rule>
            <mui-button>Delete</mui-button>
          </mui-menu>
        </mui-dropdown>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;small&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221; size="small" icon-only aria-label=&quot;File actions&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis&gt;&lt;/mui-icon-ellipsis&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu width=&quot;min(100%, 18rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Open&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Move&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Delete&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="with-icon" title="${storyMeta["with-icon"].title}" usage="${storyMeta["with-icon"].usage}">
        <mui-button-group align="right" slot="body">
          <mui-dropdown size="medium">
            <mui-button slot="action" variant="secondary">Export<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
            <mui-menu>
              <mui-button>PDF</mui-button>
              <mui-button>CSV</mui-button>
            </mui-menu>
          </mui-dropdown>
          <mui-button variant="primary">New Report</mui-button>
        </mui-button-group>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Export&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;PDF&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;CSV&lt;/mui-button&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="dropdown-position-left" title="${storyMeta["dropdown-position-left"].title}" usage="${storyMeta["dropdown-position-left"].usage}">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="left" size="medium" persistent>
            <mui-button slot="action" variant="secondary">Theme<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
            <mui-menu inset width="min(100%, 32rem)">
              <mui-select slot="top" hide-label label="Theme" options='[{"value":"mui","label":"Mui"},{"value":"sensei","label":"Sensei"},{"value":"paperclip","label":"Paperclip"}]'></mui-select>
              <mui-button>Preview theme</mui-button>
              <mui-button>Set as default</mui-button>
              <mui-button>Export tokens</mui-button>
            </mui-menu>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; position=&quot;left&quot; persistent&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Theme&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu inset&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-select slot=&quot;top&quot; hide-label label=&quot;Theme&quot; options='...'&gt;&lt;/mui-select&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Preview theme&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Set as default&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Export tokens&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="position-up" title="${storyMeta["position-up"].title}" usage="${storyMeta["position-up"].usage}">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="left" vertical-position="up" size="medium" persistent>
            <mui-button slot="action" variant="secondary">Volume<mui-icon-up-chevron slot="after"></mui-icon-up-chevron></mui-button>
            <mui-menu inset>
              <mui-body variant="secondary">Playback</mui-body>
              <mui-button>Mute</mui-button>
              <mui-button>Audio settings</mui-button>
              <mui-v-stack slot="bottom" width="100%" alignX="stretch" style="padding: var(--space-400);">
                <mui-range-input min="0" max="100" value="40" label="Volume"></mui-range-input>
              </mui-v-stack>
            </mui-menu>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; position=&quot;left&quot; vertical-position=&quot;up&quot; persistent&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Volume&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu inset&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Playback&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Mute&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Audio settings&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;bottom&quot; width=&quot;100%&quot; alignX=&quot;stretch&quot; style=&quot;padding: var(--space-400);&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-range-input min=&quot;0&quot; max=&quot;100&quot; value=&quot;40&quot; label=&quot;Volume&quot;&gt;&lt;/mui-range-input&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="dropdown-position-right" title="${storyMeta["dropdown-position-right"].title}" usage="${storyMeta["dropdown-position-right"].usage}">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="right" size="medium" persistent>
            <mui-button slot="action" variant="secondary">Languages<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
            <mui-menu inset width="min(100%, 32rem)">
              <mui-body variant="secondary">Language services</mui-body>
              <mui-button><mui-file-icon slot="before" type="typescript" decorative></mui-file-icon>TypeScript<mui-switch slot="after" label="TypeScript" hide-label></mui-switch></mui-button>
              <mui-button><mui-file-icon slot="before" type="js" decorative></mui-file-icon>JavaScript<mui-switch slot="after" label="JavaScript" hide-label></mui-switch></mui-button>
              <mui-button><mui-file-icon slot="before" type="python" decorative></mui-file-icon>Python<mui-switch slot="after" label="Python" hide-label></mui-switch></mui-button>
            </mui-menu>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; position=&quot;right&quot; persistent&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Languages&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu inset width=&quot;min(100%, 32rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Language services&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;&lt;mui-file-icon slot=&quot;before&quot; type=&quot;typescript&quot; decorative&gt;&lt;/mui-file-icon&gt;TypeScript&lt;mui-switch slot=&quot;after&quot; label=&quot;TypeScript&quot; hide-label&gt;&lt;/mui-switch&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;&lt;mui-file-icon slot=&quot;before&quot; type=&quot;js&quot; decorative&gt;&lt;/mui-file-icon&gt;JavaScript&lt;mui-switch slot=&quot;after&quot; label=&quot;JavaScript&quot; hide-label&gt;&lt;/mui-switch&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;&lt;mui-file-icon slot=&quot;before&quot; type=&quot;python&quot; decorative&gt;&lt;/mui-file-icon&gt;Python&lt;mui-switch slot=&quot;after&quot; label=&quot;Python&quot; hide-label&gt;&lt;/mui-switch&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="position-center" title="${storyMeta["position-center"].title}" usage="${storyMeta["position-center"].usage}">
        <mui-v-stack slot="body" alignX="center">
          <mui-dropdown position="center" class="info" size="medium">
            <mui-button slot="action" variant="secondary">
              Workspace
              <mui-icon-info slot="after" size="small"></mui-icon-info>
            </mui-button>
            <mui-menu inset>
              <mui-body variant="secondary">Workspace details</mui-body>
              <mui-button>View overview</mui-button>
              <mui-button>Recent activity</mui-button>
              <mui-button>Team members</mui-button>
              <mui-rule></mui-rule>
              <mui-link variant="tertiary" href="#">Workspace settings</mui-link>
            </mui-menu>
          </mui-dropdown>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; position="center" class="info"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot=&#8220;action&#8221;&gt;Workspace&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu inset&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Workspace details&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;View overview&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Recent activity&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Team members&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant=&quot;tertiary&quot; href=&quot;#&quot;&gt;Workspace settings&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="dropdown-persistent"
        title="${storyMeta["dropdown-persistent"].title}"
        description="${storyMeta["dropdown-persistent"].description}"
        usage="${storyMeta["dropdown-persistent"].usage}">
        <mui-h-stack slot="body" alignX="center" space="80px">
          <mui-dropdown position="center" persistent data-file-preview="true" class="card-artwork" size="medium">
            <mui-button slot="action" variant="secondary">
                Card Artwork
                <mui-icon-add slot="after"></mui-icon-add>
            </mui-button>
            <mui-menu>
              <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
              type="Debit"
              number="1234"
              partner="${VisaBlack}"
              logo="${LogoPlaceholder}"
              variant="plain"
              >
              </mui-smart-card>
              <mui-file-upload
              acceptedFileTypes=".pdf,.jpg,.png"
              currentFileName="Upload Image"></mui-file-upload>
              </mui-v-stack>
            </mui-menu>
          </mui-dropdown>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; persistent data-file-preview="true" position="center" class="card-artwork"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="action" variant="secondary"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;Card Artwork<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="after"&gt;&lt;/mui-icon-add&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300)" style="padding: var(--space-300)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-smart-card<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type="Debit"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number="1234"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner="./images/networks/visa-black.svg"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo="./images/card/image-220.png"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant="plain"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-smart-card&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-upload acceptedFileTypes=".pdf,.jpg,.png" currentFileName="Upload Artwork"&gt;&lt;/mui-file-upload&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;

          <br><br><br>

          // File Upload Logic<br>
          ///////////////////////////////////////////////////////////////////<br><br>
          shadowRoot.querySelectorAll("[data-file-preview]").forEach((dropdown) =&gt; {<br>
          &nbsp;&nbsp;let currentObjectURL = null;<br>
          &nbsp;&nbsp;const smartCard = dropdown.querySelector("mui-smart-card");<br>
          &nbsp;&nbsp;// Handle file upload<br>
          &nbsp;&nbsp;dropdown.addEventListener("file-upload", function(event) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const file = event.detail.file;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (!file) return;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const objectURL = URL.createObjectURL(file);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;currentObjectURL = objectURL;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const smartCard = dropdown.querySelector("mui-smart-card");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (smartCard) smartCard.setAttribute("bg-image", objectURL);<br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;// Handle reset: Use data-reset-image<br>
          &nbsp;&nbsp;const resetBtn = dropdown.querySelector("[data-reset-image]");<br>
          &nbsp;&nbsp;if (resetBtn) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;resetBtn.addEventListener("click", () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (currentObjectURL) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;URL.revokeObjectURL(currentObjectURL);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentObjectURL = null;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (smartCard) smartCard.removeAttribute("bg-image");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;});<br>
          &nbsp;&nbsp;}<br>
          });<br>

        </story-code-block>
      </story-card>

      <story-card
        id="advanced-persistent"
        title="${storyMeta["advanced-persistent"].title}"
        description="${storyMeta["advanced-persistent"].description}"
        usage="${storyMeta["advanced-persistent"].usage}">
        <mui-h-stack slot="body" alignX="center" space="80px">

          <mui-dropdown data-toggle-dropdown="hook-1" data-file-preview="true" position="center" class="card-artwork" size="medium">
            <mui-button slot="action" variant="secondary">
              Card Artwork
              <mui-icon-toggle data-toggle-control="hook-1" slot="after" rotate>
                <mui-icon-add slot="start"></mui-icon-add>
                <mui-icon-subtract slot="end"></mui-icon-subtract>
              </mui-icon-toggle>
            </mui-button>
            <mui-menu>
              <mui-v-stack space="var(--space-300)" style="padding: var(--space-300)">
              <mui-smart-card
              type="Debit"
              number="1234"
              partner="${VisaBlack}"
              logo="${LogoPlaceholder}"
              variant="plain"
              >
              </mui-smart-card>
              <mui-file-upload
              acceptedFileTypes=".pdf,.jpg,.png"
              currentFileName="Upload Image"></mui-file-upload>
              </mui-v-stack>
            </mui-menu>
          </mui-dropdown>

        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; data-toggle-dropdown="hook-1" data-file-preview="true" position="center" class="card-artwork"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="action" variant="secondary"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;Card Artwork<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-toggle data-toggle-control="hook-1" slot="after" rotate&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-add slot="start"&gt;&lt;/mui-icon-add&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-subtract slot="end"&gt;&lt;/mui-icon-subtract&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-icon-toggle&gt;<br>
          &nbsp;&nbsp;&lt;/mui-button&gt;<br><br />
          &nbsp;&nbsp;&lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300)" style="padding: var(--space-300)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-smart-card<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type="Debit"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number="1234"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner="./images/networks/visa-black.svg"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo="./images/card/image-220.png"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant="plain"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-smart-card&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-upload acceptedFileTypes=".pdf,.jpg,.png" currentFileName="Upload Artwork"&gt;&lt;/mui-file-upload&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>

          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;

          <br><br><br>

          // Persistent Toggle Logic<br>
          ///////////////////////////////////////////////////////////////////<br><br>
          shadowRoot.querySelectorAll("[data-toggle-dropdown]").forEach((dropdown) =&gt; {<br>
          &nbsp;&nbsp;const toggleId = dropdown.getAttribute("data-toggle-dropdown");<br>
          &nbsp;&nbsp;const toggle = shadowRoot.querySelector(&#96;[data-toggle-control="\${toggleId}"]&#96;);<br>
          &nbsp;&nbsp;const menu = dropdown.querySelector("mui-menu");<br>
          &nbsp;&nbsp;if (!toggle) return;<br><br>
          &nbsp;&nbsp;dropdown.addEventListener("dropdown-toggle", (event) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const open = event.detail.open;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Toggle the icon + ARIA state<br>
          &nbsp;&nbsp;&nbsp;&nbsp;toggle.toggle = open;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;toggle.setAttribute("aria-pressed", String(open));<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Toggle persistent dynamically<br>
          &nbsp;&nbsp;&nbsp;&nbsp;dropdown.toggleAttribute("persistent", open);<br>
          &nbsp;&nbsp;});<br><br>

          &nbsp;&nbsp;dropdown.addEventListener("focusout", function(event) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;var relatedTarget = event.relatedTarget;<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;// Ignore focus moving into the portaled Menu<br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (relatedTarget &amp;&amp; (dropdown.contains(relatedTarget) || menu?.contains(relatedTarget))) return;<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;// Otherwise, focus has moved outside<br>
            &nbsp;&nbsp;&nbsp;&nbsp;toggle.toggle = false;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;toggle.setAttribute("aria-pressed", "false");<br>
            &nbsp;&nbsp;&nbsp;&nbsp;dropdown.removeAttribute("persistent"); // or close your menu here<br>
          &nbsp;&nbsp;});

          <br><br><br>

          // File Upload Logic<br>
          ///////////////////////////////////////////////////////////////////<br><br>
          shadowRoot.querySelectorAll("[data-file-preview]").forEach((dropdown) =&gt; {<br>
          &nbsp;&nbsp;let currentObjectURL = null;<br>
          &nbsp;&nbsp;const smartCard = dropdown.querySelector("mui-smart-card");<br>
          &nbsp;&nbsp;// Handle file upload<br>
          &nbsp;&nbsp;dropdown.addEventListener("file-upload", function(event) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const file = event.detail.file;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (!file) return;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const objectURL = URL.createObjectURL(file);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;currentObjectURL = objectURL;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const smartCard = dropdown.querySelector("mui-smart-card");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (smartCard) smartCard.setAttribute("bg-image", objectURL);<br>
          &nbsp;&nbsp;
          &nbsp;&nbsp;// Handle reset: Use data-reset-image<br>
          &nbsp;&nbsp;const resetBtn = dropdown.querySelector("[data-reset-image]");<br>
          &nbsp;&nbsp;if (resetBtn) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;resetBtn.addEventListener("click", () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (currentObjectURL) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;URL.revokeObjectURL(currentObjectURL);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentObjectURL = null;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (smartCard) smartCard.removeAttribute("bg-image");<br>
          &nbsp;&nbsp;&nbsp;&nbsp;});<br>
          &nbsp;&nbsp;}<br>
          });<br>

        </story-code-block>
      </story-card>

      <story-card
        id="grouped-menu-composition"
        title="${storyMeta["grouped-menu-composition"].title}"
        description="${storyMeta["grouped-menu-composition"].description}"
        usage="${storyMeta["grouped-menu-composition"].usage}">
        <mui-h-stack slot="body" alignx="center">
          <mui-dropdown size="medium" position="left">
            <mui-button slot="action" variant="secondary">
              Workspace
              <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
            </mui-button>
            <mui-menu inset>
              <mui-body variant="secondary">Workspace</mui-body>
              <mui-button>Design system</mui-button>
              <mui-button>Product platform</mui-button>
              <mui-rule></mui-rule>
              <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
            </mui-menu>
          </mui-dropdown>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown size=&quot;medium&quot; position=&quot;left&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; variant=&quot;secondary&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Workspace<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron slot=&quot;after&quot;&gt;&lt;/mui-icon-down-chevron&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-menu inset&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Workspace&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Design system&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Product platform&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link variant=&quot;tertiary&quot; href=&quot;#&quot;&gt;Manage workspaces&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
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

        imports='["@muibook/components/mui-dropdown"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    // === Persistent Toggle Logic ===
    this.shadowRoot.querySelectorAll("[data-toggle-dropdown]").forEach((dropdown) => {
      const toggleId = dropdown.getAttribute("data-toggle-dropdown");
      const toggle = this.shadowRoot.querySelector(`[data-toggle-control="${toggleId}"]`);
      const menu = dropdown.querySelector("mui-menu");
      if (!toggle) return;

      dropdown.addEventListener("dropdown-toggle", (event) => {
        const open = event.detail.open;

        // Toggle the icon + ARIA state
        toggle.toggle = open;
        toggle.setAttribute("aria-pressed", String(open));

        // Toggle persistent dynamically
        dropdown.toggleAttribute("persistent", open);
      });

      dropdown.addEventListener("focusout", function (event) {
        var relatedTarget = event.relatedTarget;

        // The Menu is portaled outside the Dropdown host while open.
        if (relatedTarget && (dropdown.contains(relatedTarget) || menu?.contains(relatedTarget))) return;

        // Otherwise, focus has moved outside
        toggle.toggle = false;
        toggle.setAttribute("aria-pressed", "false");
        dropdown.removeAttribute("persistent"); // or close your menu here
      });
    });

    // Removed Section Link Logic

    // === File Upload Logic ===
    this.shadowRoot.querySelectorAll("[data-file-preview]").forEach((dropdown) => {
      let currentObjectURL = null;

      const smartCard = dropdown.querySelector("mui-smart-card");

      // Handle file upload
      dropdown.addEventListener("file-upload", function (event) {
        const file = event.detail.file;
        if (!file) return;

        if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
        const objectURL = URL.createObjectURL(file);
        currentObjectURL = objectURL;

        const smartCard = dropdown.querySelector("mui-smart-card");
        if (smartCard) smartCard.setAttribute("bg-image", objectURL);
      });

      // Handle reset: Use data-reset-image
      const resetBtn = dropdown.querySelector("[data-reset-image]");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (currentObjectURL) {
            URL.revokeObjectURL(currentObjectURL);
            currentObjectURL = null;
          }
          if (smartCard) smartCard.removeAttribute("bg-image");
        });
      }
    });
  }
}

customElements.define("story-dropdown", storyDropdown);
