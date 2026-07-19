import { getComponentDocs } from "../../../utils/story-data";

class StoryMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Menu");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Menu"></story-metadata-empty>`;
      return;
    }

    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const styles = /*css*/ `
      :host { display: block; }

      .menu-search-empty[hidden] {
        display: none;
      }

      mui-menu > mui-button[hidden],
      mui-menu > mui-body[data-search-section][hidden] {
        display: none;
      }

      .language-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: var(--space-200);
        padding: var(--action-padding);
      }

    `;

    const menuSizes = ["x-small", "small", "medium", "large"];
    const menuWidths = {
      "x-small": "min(100%, 17rem)",
      small: "min(100%, 20rem)",
      medium: "min(100%, 24rem)",
      large: "min(100%, 40rem)",
    };
    const chipInputMenuWidths = {
      "x-small": "min(100%, 28rem)",
      small: "min(100%, 32rem)",
      medium: "min(100%, 36rem)",
      large: "min(100%, 40rem)",
    };
    const themeActions = () => /*html*/ `
      <mui-button>Preview theme</mui-button>
      <mui-button>Set as default</mui-button>
      <mui-button>Edit design tokens</mui-button>
      <mui-button>Duplicate theme</mui-button>
      <mui-button>Export theme</mui-button>
    `;
    const dateActions = () => /*html*/ `
      <mui-button>View schedule</mui-button>
      <mui-button>Create event</mui-button>
      <mui-button>Copy date</mui-button>
      <mui-button>Export day</mui-button>
      <mui-button>Clear schedule</mui-button>
    `;
    const inputActions = () => /*html*/ `
      <mui-button>Home</mui-button>
      <mui-button>About</mui-button>
      <mui-button>Contact</mui-button>
    `;
    const selectMenus = menuSizes
      .map(
        (size) => /*html*/ `
      <mui-menu size="${size}" width="${menuWidths[size]}" class="select-menu" inset>
        <mui-select
          slot="top"
          hide-label
          label="Theme"
          options='[{"value":"mui","label":"Mui"},{"value":"jal","label":"JAL"},{"value":"ana","label":"ANA"}]'
        ></mui-select>
        ${themeActions()}
      </mui-menu>
    `,
      )
      .join("");
    const dateMenus = menuSizes
      .map(
        (size) => /*html*/ `
      <mui-menu size="${size}" width="${menuWidths[size]}" class="date-menu" inset>
        ${dateActions()}
        <mui-date-picker slot="bottom" hide-label label="Select date" value="2026-07-09"></mui-date-picker>
      </mui-menu>
    `,
      )
      .join("");
    const inputMenus = menuSizes
      .map(
        (size) => /*html*/ `
      <mui-menu size="${size}" width="${menuWidths[size]}" class="input-menu" inset>
        ${inputActions()}
        <mui-input slot="bottom" hide-label label="Input" placeholder="Type to add..."></mui-input>
      </mui-menu>
    `,
      )
      .join("");
    const timeMenus = menuSizes
      .map(
        (size) => /*html*/ `
      <mui-menu size="${size}" width="${menuWidths[size]}" class="time-menu" inset>
        <mui-button>View availability</mui-button>
        <mui-button>Create reminder</mui-button>
        <mui-button>Copy time</mui-button>
        <mui-time-picker slot="bottom" hide-label label="Select time" value="09:30"></mui-time-picker>
      </mui-menu>
    `,
      )
      .join("");
    const chipInputMenus = menuSizes
      .map(
        (size) => /*html*/ `
      <mui-menu size="${size}" width="${chipInputMenuWidths[size]}" class="chip-input-menu" inset>
        <mui-chip-input
          slot="top"
          hide-label
          label="Select tags"
          value='[{"value":"design","label":"Design"}]'
          options='[{"value":"design","label":"Design"},{"value":"development","label":"Development"},{"value":"marketing","label":"Marketing"}]'
        ></mui-chip-input>
        <mui-button>Save changes</mui-button>
        <mui-button>Clear tags</mui-button>
      </mui-menu>
    `,
      )
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-menu" title="Menu"></story-api-types>

      <story-card
        id="action-menu"
        title="${storyMeta["action-menu"].title}"
        usage="${storyMeta["action-menu"].usage}"
      >
        <mui-menu slot="body">
          <mui-button variant="tertiary">Rename</mui-button>
          <mui-button variant="tertiary">Duplicate</mui-button>
          <mui-rule></mui-rule>
          <mui-button variant="tertiary">Archive</mui-button>
        </mui-menu>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Rename&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Duplicate&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Archive&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="searchable-menu"
        title="${storyMeta["searchable-menu"].title}"
        usage="${storyMeta["searchable-menu"].usage}"
      >

        <mui-v-stack slot="body">

          <mui-menu size="x-small" width="min(100%, 17rem)" class="search-menu" inset>
            <mui-search-input slot="top" label="Search metrics" placeholder="Search..." size="x-small"></mui-search-input>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option>Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option>Spatial awareness</mui-button>
            <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 20rem)" class="search-menu" inset>
            <mui-search-input slot="top" label="Search metrics" placeholder="Search..." size="small"></mui-search-input>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option>Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option>Spatial awareness</mui-button>
            <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)" class="search-menu" inset>
            <mui-search-input slot="top" label="Search metrics" placeholder="Search..." size="medium"></mui-search-input>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option>Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option>Spatial awareness</mui-button>
            <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 40rem)" class="search-menu" inset>
            <mui-search-input slot="top" label="Search metrics" placeholder="Search..." size="large"></mui-search-input>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option>Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option>Spatial awareness</mui-button>
            <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-search-input slot=&quot;top&quot; label=&quot;Search metrics&quot; placeholder=&quot;Search...&quot; size=&quot;small&quot;&gt;&lt;/mui-search-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Ending headcount&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Seats per team&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Expansion seats&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Productivity measure&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Compatibility index&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Assurance of compliance&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Spatial awareness&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;No matching metrics&lt;/mui-body&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          const menu = document.querySelector(&quot;mui-menu&quot;);<br />
          const search = menu.querySelector(&quot;mui-search-input&quot;);<br />
          const options = menu.querySelectorAll(&quot;mui-button&quot;);<br />
          const empty = menu.querySelector(&quot;mui-body[role='status']&quot;);<br /><br />
          search.addEventListener(&quot;input&quot;, (event) =&gt; {<br />
          &nbsp;&nbsp;const query = event.detail.value.trim().toLowerCase();<br />
          &nbsp;&nbsp;let visibleCount = 0;<br />
          &nbsp;&nbsp;options.forEach((option) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;const hidden = query &amp;&amp; !option.textContent.toLowerCase().includes(query);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;option.hidden = hidden;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (!hidden) visibleCount += 1;<br />
          &nbsp;&nbsp;});<br />
          &nbsp;&nbsp;empty.hidden = visibleCount &gt; 0;<br />
          });
        </story-code-block>
      </story-card>

      <story-card
        id="inset"
        title="${storyMeta.inset.title}"
        usage="${storyMeta.inset.usage}"
      >
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-menu size="x-small" width="min(100%, 17rem)" inset data-filter-menu>
            <mui-search-input slot="top" label="Search files" placeholder="Search files..."></mui-search-input>
            <mui-button data-search-option>Create new file</mui-button>
            <mui-button data-search-option>Upload file</mui-button>
            <mui-button data-search-option>New folder</mui-button>
            <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching files
            </mui-body>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 20rem)" inset>
            <mui-button>Create new file</mui-button>
            <mui-button>Upload file</mui-button>
            <mui-button>New folder</mui-button>
            <mui-input slot="bottom" label="Add tag" hide-label placeholder="Add tag"></mui-input>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)" inset data-filter-menu>
            <mui-search-input slot="top" label="Search" placeholder="Search..."></mui-search-input>
            <mui-button data-search-option>Create new file</mui-button>
            <mui-button data-search-option>Upload file</mui-button>
            <mui-button data-search-option>New folder</mui-button>
            <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching files
            </mui-body>
            <mui-date-picker slot="bottom" hide-label label="Select date" value="2026-07-12"></mui-date-picker>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 40rem)" inset>
            <mui-chip-input slot="top" hide-label label="Select tags" value='[{"value":"design","label":"Design"}]' options='[{"value":"design","label":"Design"},{"value":"development","label":"Development"}]'></mui-chip-input>
            <mui-button>Create new file</mui-button>
            <mui-button>Upload file</mui-button>
            <mui-button>New folder</mui-button>
            <mui-time-picker slot="bottom" hide-label label="Select time" value="09:30"></mui-time-picker>
          </mui-menu>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;x-small&quot; width=&quot;min(100%, 17rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-search-input slot=&quot;top&quot; label=&quot;Search files&quot; placeholder=&quot;Search files...&quot;&gt;&lt;/mui-search-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Create new file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Upload file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;New folder&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot; role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;No matching files&lt;/mui-body&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Create new file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Upload file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;New folder&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot; role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;No matching files&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-input slot=&quot;bottom&quot; label=&quot;Add tag&quot; hide-label placeholder=&quot;Add tag&quot;&gt;&lt;/mui-input&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-search-input slot=&quot;top&quot; label=&quot;Search&quot; placeholder=&quot;Search...&quot;&gt;&lt;/mui-search-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Create new file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Upload file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;New folder&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-date-picker slot=&quot;bottom&quot; hide-label label=&quot;Select date&quot; value=&quot;2026-07-12&quot;&gt;&lt;/mui-date-picker&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          &lt;mui-menu size=&quot;large&quot; width=&quot;min(100%, 40rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip-input slot=&quot;top&quot; hide-label label=&quot;Select tags&quot; value='...' options='...'&gt;&lt;/mui-chip-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Create new file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Upload file&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;New folder&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-time-picker slot=&quot;bottom&quot; hide-label label=&quot;Select time&quot; value=&quot;09:30&quot;&gt;&lt;/mui-time-picker&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="sections"
        title="${storyMeta.sections.title}"
        usage="${storyMeta.sections.usage}"
      >
        <mui-v-stack slot="body" space="var(--space-400)">
        <mui-menu size="x-small" width="min(100%, 17rem)" inset>
          <mui-search-input slot="top" label="Search files" placeholder="Search files..."></mui-search-input>
          <mui-body variant="secondary">Source</mui-body>
          <mui-button><mui-file-icon slot="before" type="typescript" decorative></mui-file-icon>app.ts</mui-button>
          <mui-button><mui-file-icon slot="before" type="js" decorative></mui-file-icon>index.js</mui-button>
          <mui-button><mui-file-icon slot="before" type="css" decorative></mui-file-icon>styles.css</mui-button>
          <mui-body variant="secondary">Project files</mui-body>
          <mui-button><mui-file-icon slot="before" type="markdown" decorative></mui-file-icon>README.md</mui-button>
          <mui-button><mui-file-icon slot="before" type="json" decorative></mui-file-icon>package.json</mui-button>
          <mui-button><mui-file-icon slot="before" type="yaml" decorative></mui-file-icon>workflow.yml</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching files</mui-body>
        </mui-menu>
        <mui-menu size="small" width="min(100%, 20rem)" inset>
          <mui-search-input slot="top" label="Search files" placeholder="Search files..."></mui-search-input>
          <mui-body variant="secondary">Source</mui-body>
          <mui-button><mui-file-icon slot="before" type="typescript" decorative></mui-file-icon>app.ts</mui-button>
          <mui-button><mui-file-icon slot="before" type="js" decorative></mui-file-icon>index.js</mui-button>
          <mui-button><mui-file-icon slot="before" type="css" decorative></mui-file-icon>styles.css</mui-button>
          <mui-body variant="secondary">Project files</mui-body>
          <mui-button><mui-file-icon slot="before" type="markdown" decorative></mui-file-icon>README.md</mui-button>
          <mui-button><mui-file-icon slot="before" type="json" decorative></mui-file-icon>package.json</mui-button>
          <mui-button><mui-file-icon slot="before" type="yaml" decorative></mui-file-icon>workflow.yml</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching files</mui-body>
        </mui-menu>
        <mui-menu size="medium" width="min(100%, 24rem)" inset>
          <mui-search-input slot="top" label="Search files" placeholder="Search files..."></mui-search-input>
          <mui-body variant="secondary">Source</mui-body>
          <mui-button><mui-file-icon slot="before" type="typescript" decorative></mui-file-icon>app.ts</mui-button>
          <mui-button><mui-file-icon slot="before" type="js" decorative></mui-file-icon>index.js</mui-button>
          <mui-button><mui-file-icon slot="before" type="css" decorative></mui-file-icon>styles.css</mui-button>
          <mui-body variant="secondary">Project files</mui-body>
          <mui-button><mui-file-icon slot="before" type="markdown" decorative></mui-file-icon>README.md</mui-button>
          <mui-button><mui-file-icon slot="before" type="json" decorative></mui-file-icon>package.json</mui-button>
          <mui-button><mui-file-icon slot="before" type="yaml" decorative></mui-file-icon>workflow.yml</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching files</mui-body>
        </mui-menu>
        <mui-menu size="large" width="min(100%, 40rem)" inset>
          <mui-search-input slot="top" label="Search files" placeholder="Search files..."></mui-search-input>
          <mui-body variant="secondary">Source</mui-body>
          <mui-button><mui-file-icon slot="before" type="typescript" decorative></mui-file-icon>app.ts</mui-button>
          <mui-button><mui-file-icon slot="before" type="js" decorative></mui-file-icon>index.js</mui-button>
          <mui-button><mui-file-icon slot="before" type="css" decorative></mui-file-icon>styles.css</mui-button>
          <mui-body variant="secondary">Project files</mui-body>
          <mui-button><mui-file-icon slot="before" type="markdown" decorative></mui-file-icon>README.md</mui-button>
          <mui-button><mui-file-icon slot="before" type="json" decorative></mui-file-icon>package.json</mui-button>
          <mui-button><mui-file-icon slot="before" type="yaml" decorative></mui-file-icon>workflow.yml</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching files</mui-body>
        </mui-menu>
        <mui-menu size="x-small" width="min(100%, 17rem)" inset>
          <mui-search-input slot="top" label="Search actions" placeholder="Search actions..."></mui-search-input>
          <mui-body variant="secondary">Workspace</mui-body>
          <mui-button><mui-icon-home slot="before"></mui-icon-home>Overview</mui-button>
          <mui-button><mui-icon-reload slot="before"></mui-icon-reload>Recent activity</mui-button>
          <mui-button><mui-icon-copy slot="before"></mui-icon-copy>Duplicate workspace</mui-button>
          <mui-body variant="secondary">Preferences</mui-body>
          <mui-button><mui-icon-notification slot="before"></mui-icon-notification>Notifications</mui-button>
          <mui-button><mui-icon-accessibility slot="before"></mui-icon-accessibility>Accessibility</mui-button>
          <mui-button><mui-icon-gear slot="before"></mui-icon-gear>Settings</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching actions</mui-body>
        </mui-menu>
        <mui-menu size="small" width="min(100%, 20rem)" inset>
          <mui-search-input slot="top" label="Search actions" placeholder="Search actions..."></mui-search-input>
          <mui-body variant="secondary">Workspace</mui-body>
          <mui-button><mui-icon-home slot="before"></mui-icon-home>Overview</mui-button>
          <mui-button><mui-icon-reload slot="before"></mui-icon-reload>Recent activity</mui-button>
          <mui-button><mui-icon-copy slot="before"></mui-icon-copy>Duplicate workspace</mui-button>
          <mui-body variant="secondary">Preferences</mui-body>
          <mui-button><mui-icon-notification slot="before"></mui-icon-notification>Notifications</mui-button>
          <mui-button><mui-icon-accessibility slot="before"></mui-icon-accessibility>Accessibility</mui-button>
          <mui-button><mui-icon-gear slot="before"></mui-icon-gear>Settings</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching actions</mui-body>
        </mui-menu>
        <mui-menu size="medium" width="min(100%, 24rem)" inset>
          <mui-search-input slot="top" label="Search actions" placeholder="Search actions..."></mui-search-input>
          <mui-body variant="secondary">Workspace</mui-body>
          <mui-button><mui-icon-home slot="before"></mui-icon-home>Overview</mui-button>
          <mui-button><mui-icon-reload slot="before"></mui-icon-reload>Recent activity</mui-button>
          <mui-button><mui-icon-copy slot="before"></mui-icon-copy>Duplicate workspace</mui-button>
          <mui-body variant="secondary">Preferences</mui-body>
          <mui-button><mui-icon-notification slot="before"></mui-icon-notification>Notifications</mui-button>
          <mui-button><mui-icon-accessibility slot="before"></mui-icon-accessibility>Accessibility</mui-button>
          <mui-button><mui-icon-gear slot="before"></mui-icon-gear>Settings</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching actions</mui-body>
        </mui-menu>
        <mui-menu size="large" width="min(100%, 40rem)" inset>
          <mui-search-input slot="top" label="Search actions" placeholder="Search actions..."></mui-search-input>
          <mui-body variant="secondary">Workspace</mui-body>
          <mui-button><mui-icon-home slot="before"></mui-icon-home>Overview</mui-button>
          <mui-button><mui-icon-reload slot="before"></mui-icon-reload>Recent activity</mui-button>
          <mui-button><mui-icon-copy slot="before"></mui-icon-copy>Duplicate workspace</mui-button>
          <mui-body variant="secondary">Preferences</mui-body>
          <mui-button><mui-icon-notification slot="before"></mui-icon-notification>Notifications</mui-button>
          <mui-button><mui-icon-accessibility slot="before"></mui-icon-accessibility>Accessibility</mui-button>
          <mui-button><mui-icon-gear slot="before"></mui-icon-gear>Settings</mui-button>
          <mui-body class="menu-search-empty" variant="secondary" role="status" aria-live="polite" hidden>No matching actions</mui-body>
        </mui-menu>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-search-input slot=&quot;top&quot; label=&quot;Search files&quot; placeholder=&quot;Search files...&quot;&gt;&lt;/mui-search-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Source&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;before&quot; type=&quot;typescript&quot; decorative&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;app.ts<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Project files&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;before&quot; type=&quot;json&quot; decorative&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;package.json<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot; role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;No matching files&lt;/mui-body&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-search-input slot=&quot;top&quot; label=&quot;Search actions&quot; placeholder=&quot;Search actions...&quot;&gt;&lt;/mui-search-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Workspace&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-home slot=&quot;before&quot;&gt;&lt;/mui-icon-home&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Overview<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Preferences&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-gear slot=&quot;before&quot;&gt;&lt;/mui-icon-gear&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Settings<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot; role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;No matching actions&lt;/mui-body&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="select-menu"
        title="${storyMeta["select-menu"].title}"
        usage="${storyMeta["select-menu"].usage}"
      >
        <mui-v-stack slot="body">${selectMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-select slot=&quot;top&quot; hide-label label=&quot;Theme&quot; options='[{&quot;value&quot;:&quot;mui&quot;,&quot;label&quot;:&quot;Mui&quot;},{&quot;value&quot;:&quot;jal&quot;,&quot;label&quot;:&quot;JAL&quot;}]'&gt;&lt;/mui-select&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Preview theme&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Set as default&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Edit design tokens&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Export theme&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="date-menu"
        title="${storyMeta["date-menu"].title}"
        usage="${storyMeta["date-menu"].usage}"
      >
        <mui-v-stack slot="body">${dateMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;View schedule&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Create event&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Copy date&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Export day&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-date-picker slot=&quot;bottom&quot; hide-label label=&quot;Select date&quot; value=&quot;2026-07-09&quot;&gt;&lt;/mui-date-picker&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="input-menu"
        title="${storyMeta["input-menu"].title}"
        usage="${storyMeta["input-menu"].usage}"
      >
        <mui-v-stack slot="body">${inputMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Home&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;About&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Contact&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-input slot=&quot;bottom&quot; hide-label label=&quot;Input&quot; placeholder=&quot;Type to add...&quot;&gt;&lt;/mui-input&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="time-menu"
        title="${storyMeta["time-menu"].title}"
        usage="${storyMeta["time-menu"].usage}"
      >
        <mui-v-stack slot="body">${timeMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;View availability&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Create reminder&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Copy time&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-time-picker slot=&quot;bottom&quot; hide-label label=&quot;Select time&quot; value=&quot;09:30&quot;&gt;&lt;/mui-time-picker&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="chip-input-menu"
        title="${storyMeta["chip-input-menu"].title}"
        usage="${storyMeta["chip-input-menu"].usage}"
      >
        <mui-v-stack slot="body">${chipInputMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 32rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip-input slot=&quot;top&quot; hide-label label=&quot;Select tags&quot; value=&quot;...&quot; options=&quot;...&quot;&gt;&lt;/mui-chip-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Save changes&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Clear tags&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="language-toggles"
        title="${storyMeta["language-toggles"].title}"
        usage="${storyMeta["language-toggles"].usage}"
      >

        <mui-v-stack slot="body">

          <mui-menu size="x-small" width="min(100%, 17rem)">
            <mui-body variant="secondary">Languages</mui-body>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="javascript" decorative></mui-file-icon>
              <mui-body size="small">JavaScript</mui-body>
              <mui-switch slot="after" label="Enable JavaScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="typescript" decorative></mui-file-icon>
              <mui-body size="small">TypeScript</mui-body>
              <mui-switch slot="after" label="Enable TypeScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="python" decorative></mui-file-icon>
              <mui-body size="small">Python</mui-body>
              <mui-switch slot="after" label="Enable Python"></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="rust" decorative></mui-file-icon>
              <mui-body size="small">Rust</mui-body>
              <mui-switch slot="after" label="Enable Rust"></mui-switch>
            </mui-button>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 20rem)">
            <mui-body variant="secondary">Languages</mui-body>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="javascript" decorative></mui-file-icon>
              <mui-body size="small">JavaScript</mui-body>
              <mui-switch slot="after" label="Enable JavaScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="typescript" decorative></mui-file-icon>
              <mui-body size="small">TypeScript</mui-body>
              <mui-switch slot="after" label="Enable TypeScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="python" decorative></mui-file-icon>
              <mui-body size="small">Python</mui-body>
              <mui-switch slot="after" label="Enable Python"></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="rust" decorative></mui-file-icon>
              <mui-body size="small">Rust</mui-body>
              <mui-switch slot="after" label="Enable Rust"></mui-switch>
            </mui-button>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)">
            <mui-body variant="secondary">Languages</mui-body>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="javascript" decorative></mui-file-icon>
              <mui-body size="medium">JavaScript</mui-body>
              <mui-switch slot="after" label="Enable JavaScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="typescript" decorative></mui-file-icon>
              <mui-body size="medium">TypeScript</mui-body>
              <mui-switch slot="after" label="Enable TypeScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="python" decorative></mui-file-icon>
              <mui-body size="medium">Python</mui-body>
              <mui-switch slot="after" label="Enable Python"></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="rust" decorative></mui-file-icon>
              <mui-body size="medium">Rust</mui-body>
              <mui-switch slot="after" label="Enable Rust"></mui-switch>
            </mui-button>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 40rem)">
            <mui-body variant="secondary">Languages</mui-body>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="javascript" decorative></mui-file-icon>
              <mui-body size="large">JavaScript</mui-body>
              <mui-switch slot="after" label="Enable JavaScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="typescript" decorative></mui-file-icon>
              <mui-body size="large">TypeScript</mui-body>
              <mui-switch slot="after" label="Enable TypeScript" checked></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="python" decorative></mui-file-icon>
              <mui-body size="large">Python</mui-body>
              <mui-switch slot="after" label="Enable Python"></mui-switch>
            </mui-button>
            <mui-button variant="tertiary">
              <mui-file-icon slot="before" icon="rust" decorative></mui-file-icon>
              <mui-body size="large">Rust</mui-body>
              <mui-switch slot="after" label="Enable Rust"></mui-switch>
            </mui-button>
          </mui-menu>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Languages&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;before&quot; icon=&quot;typescript&quot; decorative&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;TypeScript&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-switch slot=&quot;after&quot; label=&quot;Enable TypeScript&quot; checked&gt;&lt;/mui-switch&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;!-- Repeat for additional languages. --&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="range-input-menu"
        title="${storyMeta["range-input-menu"].title}"
        usage="${storyMeta["range-input-menu"].usage}"
      >
        <mui-v-stack slot="body">
        
        <mui-menu size="small" width="min(100%, 20rem)" class="range-input-menu">
          <mui-v-stack width="100%" style="padding: var(--space-200) var(--space-200); box-sizing: border-box;" space="var(--space-050)">
            <mui-h-stack alignx="space-between" width="100%">
              <mui-button variant="tertiary" size="x-small">
                Advanced
                <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
              </mui-button>
              <mui-dropdown  position="right" size="x-small">
                <mui-button slot="action" variant="tertiary" aria-label="Playback speed">
                  <mui-icon-ellipsis></mui-icon-ellipsis>
                </mui-button>
                <mui-menu>
                  <mui-button>1.5x Speed</mui-button>
                  <mui-button>3x Speed</mui-button>
                  <mui-button>6x Speed</mui-button>
                </mui-menu>
              </mui-dropdown>
            </mui-h-stack>
            <mui-range-input min="0" max="100" value="40" step="1" label="Volume"></mui-range-input>
          </mui-v-stack>
        </mui-menu>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack width=&quot;100%&quot; style=&quot;padding: var(--action-padding); box-sizing: border-box;&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack alignx=&quot;space-between&quot; width=&quot;100%&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot; size=&quot;small&quot;&gt;Advanced&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown size=&quot;small&quot; position=&quot;right&quot;&gt;...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-range-input size=&quot;small&quot; min=&quot;0&quot; max=&quot;100&quot; value=&quot;40&quot; label=&quot;Volume&quot;&gt;&lt;/mui-range-input&gt;<br />
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="sizes"
        title="${storyMeta.sizes.title}"
        usage="${storyMeta.sizes.usage}"
      >
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-menu size="x-small" width="min(100%, 17rem)">
            <mui-button>Rename</mui-button>
            <mui-button>Copy</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
          <mui-menu size="small" width="min(100%, 20rem)">
            <mui-button>Rename</mui-button>
            <mui-button>Copy</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
          <mui-menu size="medium" width="min(100%, 24rem)">
            <mui-button>Rename</mui-button>
            <mui-button>Copy</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
          <mui-menu size="large" width="min(100%, 40rem)">
            <mui-button>Rename</mui-button>
            <mui-button>Copy</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;x-small&quot; width=&quot;min(100%, 17rem)&quot;&gt;...&lt;/mui-menu&gt;<br />
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot;&gt;...&lt;/mui-menu&gt;<br />
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot;&gt;...&lt;/mui-menu&gt;<br />
          &lt;mui-menu size=&quot;large&quot; width=&quot;min(100%, 40rem)&quot;&gt;...&lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="grouped-content"
        title="${storyMeta["grouped-content"].title}"
        usage="${storyMeta["grouped-content"].usage}"
      >

        <mui-v-stack slot="body" space="var(--space-400)">

          <mui-menu size="x-small" width="min(100%, 17rem)">
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 20rem)">
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)">
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 40rem)">
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="x-small" width="min(100%, 17rem)" inset>
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 20rem)" inset>
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)" inset>
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 40rem)" inset>
            <mui-body variant="secondary">Workspace</mui-body>
            <mui-button variant="tertiary">Design system</mui-button>
            <mui-button variant="tertiary">Product platform</mui-button>
            <mui-rule></mui-rule>
            <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
          </mui-menu>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Workspace&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Design system&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Product platform&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-link variant=&quot;tertiary&quot; href=&quot;#&quot;&gt;Manage workspaces&lt;/mui-link&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          &lt;mui-menu inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Workspace&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Design system&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Product platform&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-link variant=&quot;tertiary&quot; href=&quot;#&quot;&gt;Manage workspaces&lt;/mui-link&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="selectable-actions"
        title="${storyMeta["selectable-actions"].title}"
        description="${storyMeta["selectable-actions"].description}"
        usage="${storyMeta["selectable-actions"].usage}"
      >
        <mui-menu slot="body" size="medium" width="min(100%, 24rem)" data-selectable-menu>
          <mui-body variant="secondary">Editor mode</mui-body>
          <mui-button data-selectable-action aria-pressed="false">Write</mui-button>
          <mui-button data-selectable-action variant="primary" aria-pressed="true">Review</mui-button>
          <mui-button data-selectable-action aria-pressed="false">Preview</mui-button>
          <mui-button disabled>Unavailable mode</mui-button>
        </mui-menu>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot; data-selectable-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Editor mode&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button data-selectable-action aria-pressed=&quot;false&quot;&gt;Write&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button data-selectable-action variant=&quot;primary&quot; aria-pressed=&quot;true&quot;&gt;Review&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button data-selectable-action aria-pressed=&quot;false&quot;&gt;Preview&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button disabled&gt;Unavailable mode&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          &lt;script&gt;<br />
          &nbsp;&nbsp;const menu = document.querySelector(&quot;[data-selectable-menu]&quot;);<br />
          &nbsp;&nbsp;const actions = menu.querySelectorAll(&quot;[data-selectable-action]&quot;);<br /><br />
          &nbsp;&nbsp;actions.forEach((action) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;action.addEventListener(&quot;click&quot;, () =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;actions.forEach((item) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const selected = item === action;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item.setAttribute(&quot;variant&quot;, selected ? &quot;primary&quot; : &quot;tertiary&quot;);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item.setAttribute(&quot;aria-pressed&quot;, String(selected));<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br />
          &nbsp;&nbsp;&nbsp;&nbsp;});<br />
          &nbsp;&nbsp;});<br />
          &lt;/script&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Menu"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-menu"]'
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.shadowRoot.querySelectorAll("mui-menu").forEach((menu) => {
      const search = menu.querySelector(':scope > mui-search-input[slot="top"]');
      if (!search) return;

      const menuOptions = [
        ...Array.from(menu.querySelectorAll(":scope > mui-button")),
        ...Array.from(menu.querySelectorAll(":scope > mui-submenu > mui-button")),
      ];
      const sectionHeadings = Array.from(menu.querySelectorAll(":scope > mui-body:not(.menu-search-empty)"));
      const empty = menu.querySelector(".menu-search-empty");

      sectionHeadings.forEach((heading) => heading.setAttribute("data-search-section", ""));

      search?.addEventListener("input", (event) => {
        const query = String(event.detail?.value || "")
          .trim()
          .toLowerCase();
        let visibleCount = 0;
        menuOptions.forEach((option) => {
          const hidden = query.length > 0 && !option.textContent.toLowerCase().includes(query);
          option.hidden = hidden;
          const submenu = option.parentElement?.tagName.toLowerCase() === "mui-submenu" ? option.parentElement : null;
          if (submenu?.parentElement === menu) submenu.hidden = hidden;
          if (!hidden) visibleCount += 1;
        });

        sectionHeadings.forEach((heading) => {
          const sectionOptions = [];
          let sibling = heading.nextElementSibling;
          while (sibling && sibling.tagName.toLowerCase() !== "mui-body") {
            if (sibling.tagName.toLowerCase() === "mui-button") sectionOptions.push(sibling);
            sibling = sibling.nextElementSibling;
          }
          heading.hidden = sectionOptions.length > 0 && sectionOptions.every((option) => option.hidden);
        });

        if (empty) empty.hidden = visibleCount > 0;
      });
    });

    this.shadowRoot.querySelectorAll("[data-selectable-menu]").forEach((menu) => {
      const actions = Array.from(menu.querySelectorAll(":scope > [data-selectable-action]"));
      actions.forEach((action) => {
        action.addEventListener("click", () => {
          actions.forEach((item) => {
            const selected = item === action;
            item.setAttribute("variant", selected ? "primary" : "tertiary");
            item.setAttribute("aria-pressed", String(selected));
          });
        });
      });
    });
  }
}

customElements.define("story-menu", StoryMenu);
