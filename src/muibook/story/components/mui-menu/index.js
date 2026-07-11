import { getComponentDocs } from "../../../utils/story-data";

class StoryMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Menu");

    const styles = /*css*/ `
      :host { display: block; }

      mui-menu[size="x-small"] {
        width: min(100%, 32rem);
      }

      mui-menu[size="small"] {
        width: min(100%, 40rem);
      }

      mui-menu[size="medium"] {
        width: min(100%, 48rem);
      }

      mui-menu[size="large"] {
        width: min(100%, 55rem);
      }

      .search-menu {
        max-height: 42rem;
        overflow-y: auto;
      }

      #menuSearchEmpty[hidden] {
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
    const metricActions = () => /*html*/ `
      <mui-body variant="secondary">Metrics</mui-body>
      <mui-button>Ending headcount</mui-button>
      <mui-button>Seats per team</mui-button>
      <mui-button variant="primary">Expansion seats</mui-button>
      <mui-button>Productivity measure</mui-button>
      <mui-button>Compatibility index</mui-button>
      <mui-button>Assurance of compliance</mui-button>
      <mui-button disabled>Spatial awareness</mui-button>
    `;
    const selectMenus = menuSizes.map((size) => /*html*/ `
      <mui-menu size="${size}" class="select-menu">
        <mui-select
          hide-label
          label="Theme"
          options='[{"value":"mui","label":"Mui"},{"value":"jal","label":"JAL"},{"value":"ana","label":"ANA"}]'
        ></mui-select>
        ${metricActions()}
      </mui-menu>
    `).join("");
    const dateMenus = menuSizes.map((size) => /*html*/ `
      <mui-menu size="${size}" class="date-menu">
        <mui-date-picker hide-label label="Select date" value="2026-07-09"></mui-date-picker>
        ${metricActions()}
      </mui-menu>
    `).join("");
    const rangeMenus = menuSizes.map((size) => /*html*/ `
      <mui-menu size="${size}" class="range-input-menu">
        <mui-v-stack width="100%" style="padding: var(--action-padding); box-sizing: border-box;" space="var(--space-050)">
          <mui-h-stack alignx="space-between" width="100%">
            <mui-button variant="tertiary" size="${size}">
              Advanced
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
            </mui-button>
            <mui-dropdown size="${size}" position="right">
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
          <mui-range-input size="${size}" min="0" max="100" value="40" step="1" label="Volume"></mui-range-input>
        </mui-v-stack>
      </mui-menu>
    `).join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-menu" title="Menu"></story-api-types>

      <story-card
        id="action-menu"
        title="Action Menu"
        usage="Use Menu to provide the visual surface and vertical layout for a related set of actions.|||Compose Menu inside Dropdown when the surface needs trigger, portal, positioning, focus, and dismissal behaviour."
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
        title="Searchable Menu"
        usage="Place search and filtering controls before a scrollable action set when menus contain many options.|||Keep filtering in application state; Menu provides the visual surface and composition boundary."
      >

        <mui-v-stack slot="body">

          <mui-menu size="x-small" class="search-menu">
            <mui-input id="menuSearch" type="search" label="Search metrics" hide-label placeholder="Search..." size="x-small">
              <mui-icon-search slot="inside-before"></mui-icon-search>
            </mui-input>
            <mui-body variant="secondary">Metrics</mui-body>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option variant="primary">Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option disabled>Spatial awareness</mui-button>
            <mui-body id="menuSearchEmpty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

          <mui-menu size="small" class="search-menu">
            <mui-input id="menuSearch" type="search" label="Search metrics" hide-label placeholder="Search..." size="small">
              <mui-icon-search slot="inside-before"></mui-icon-search>
            </mui-input>
            <mui-body variant="secondary">Metrics</mui-body>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option variant="primary">Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option disabled>Spatial awareness</mui-button>
            <mui-body id="menuSearchEmpty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

          <mui-menu size="medium" class="search-menu">
            <mui-input id="menuSearch" type="search" label="Search metrics" hide-label placeholder="Search..." size="medium">
              <mui-icon-search slot="inside-before"></mui-icon-search>
            </mui-input>
            <mui-body variant="secondary">Metrics</mui-body>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option variant="primary">Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option disabled>Spatial awareness</mui-button>
            <mui-body id="menuSearchEmpty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

          <mui-menu size="large" class="search-menu">
            <mui-input id="menuSearch" type="search" label="Search metrics" hide-label placeholder="Search..." size="large">
              <mui-icon-search slot="inside-before"></mui-icon-search>
            </mui-input>
            <mui-body variant="secondary">Metrics</mui-body>
            <mui-button data-search-option>Ending headcount</mui-button>
            <mui-button data-search-option>Seats per team</mui-button>
            <mui-button data-search-option variant="primary">Expansion seats</mui-button>
            <mui-button data-search-option>Productivity measure</mui-button>
            <mui-button data-search-option>Compatibility index</mui-button>
            <mui-button data-search-option>Assurance of compliance</mui-button>
            <mui-button data-search-option disabled>Spatial awareness</mui-button>
            <mui-body id="menuSearchEmpty" variant="secondary" role="status" aria-live="polite" hidden>
              No matching metrics
            </mui-body>
          </mui-menu>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-input type=&quot;search&quot; label=&quot;Search metrics&quot; hide-label placeholder=&quot;Search...&quot; size=&quot;small&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-search slot=&quot;inside-before&quot;&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;/mui-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Metrics&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Ending headcount&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Seats per team&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;primary&quot;&gt;Expansion seats&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Productivity measure&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Compatibility index&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Assurance of compliance&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button disabled&gt;Spatial awareness&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;No matching metrics&lt;/mui-body&gt;<br />
          &lt;/mui-menu&gt;<br /><br />
          search.addEventListener(&quot;input&quot;, (event) =&gt; {<br />
          &nbsp;&nbsp;const query = event.detail.value.trim().toLowerCase();<br />
          &nbsp;&nbsp;options.forEach((option) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;option.hidden = query &amp;&amp; !option.textContent.toLowerCase().includes(query);<br />
          &nbsp;&nbsp;});<br />
          });
        </story-code-block>
      </story-card>

      <story-card
        id="select-menu"
        title="Select Menu"
        usage="Use a direct Select to provide scope or mode selection before a related action set.|||Set size on Menu only; Menu enforces the same size and inset treatment on the Select and direct actions."
      >
        <mui-v-stack slot="body">${selectMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-select hide-label label=&quot;Theme&quot; options='[{&quot;value&quot;:&quot;mui&quot;,&quot;label&quot;:&quot;Mui&quot;},{&quot;value&quot;:&quot;jal&quot;,&quot;label&quot;:&quot;JAL&quot;}]'&gt;&lt;/mui-select&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Metrics&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Ending headcount&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;primary&quot;&gt;Expansion seats&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="date-menu"
        title="Date Menu"
        usage="Use a direct Date Picker when menu actions should operate on a selected date or period.|||Menu propagates its size and inset field radius to the Date Picker and its composed calendar action."
      >
        <mui-v-stack slot="body">${dateMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-date-picker hide-label label=&quot;Select date&quot; value=&quot;2026-07-09&quot;&gt;&lt;/mui-date-picker&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Metrics&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Ending headcount&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;primary&quot;&gt;Expansion seats&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="range-input-menu"
        title="Range Input Menu"
        usage="Use Range Input for an adjustable value within a compact settings or playback menu.|||Nested controls are sized explicitly from the same Menu size because only direct Menu children inherit size automatically."
      >
        <mui-v-stack slot="body">${rangeMenus}</mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;small&quot;&gt;<br />
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
        id="language-toggles"
        title="Language Toggles"
        usage="Use composed rows for independent settings rather than menu commands.|||File Icon adds fast language recognition while Switch owns each boolean selection."
      >

        <mui-v-stack slot="body">

          <mui-menu size="x-small">
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

          <mui-menu size="small">
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

          <mui-menu size="medium">
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

          <mui-menu size="large">
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
          &lt;mui-menu size=&quot;small&quot;&gt;<br />
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
        id="sizes"
        title="Sizes"
        usage="Menu supports x-small, small, medium, and large.|||The selected size controls the surface radius and is enforced on direct button and link actions."
      >
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-menu size="x-small">
            <mui-button>Rename</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
          <mui-menu size="small">
            <mui-button>Rename</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
          <mui-menu size="medium">
            <mui-button>Rename</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
          <mui-menu size="large">
            <mui-button>Rename</mui-button>
            <mui-button>Duplicate</mui-button>
          </mui-menu>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;x-small&quot;&gt;...&lt;/mui-menu&gt;<br />
          &lt;mui-menu size=&quot;small&quot;&gt;...&lt;/mui-menu&gt;<br />
          &lt;mui-menu size=&quot;medium&quot;&gt;...&lt;/mui-menu&gt;<br />
          &lt;mui-menu size=&quot;large&quot;&gt;...&lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="grouped-content"
        title="Grouped Content"
        usage="Use concise headings and rules to separate related groups without turning the menu into a full page layout.|||Menu accepts composed content, but interactive actions should remain easy to scan and operate."
      >
        <mui-menu slot="body">
          <mui-body variant="secondary">Workspace</mui-body>
          <mui-button variant="tertiary">Design system</mui-button>
          <mui-button variant="tertiary">Product platform</mui-button>
          <mui-rule></mui-rule>
          <mui-link variant="tertiary" href="#">Manage workspaces</mui-link>
        </mui-menu>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot;&gt;Workspace&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Design system&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Product platform&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-link variant=&quot;tertiary&quot; href=&quot;#&quot;&gt;Manage workspaces&lt;/mui-link&gt;<br />
          &lt;/mui-menu&gt;
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
          links="action-menu::Action Menu|||sizes::Sizes|||searchable-menu::Searchable Menu|||select-menu::Select Menu|||date-menu::Date Menu|||range-input-menu::Range Input Menu|||language-toggles::Language Toggles|||grouped-content::Grouped Content"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    const search = this.shadowRoot.querySelector("#menuSearch");
    const options = Array.from(this.shadowRoot.querySelectorAll("[data-search-option]"));
    const empty = this.shadowRoot.querySelector("#menuSearchEmpty");
    search?.addEventListener("input", (event) => {
      const query = String(event.detail?.value || "")
        .trim()
        .toLowerCase();
      let visibleCount = 0;
      options.forEach((option) => {
        const hidden = query.length > 0 && !option.textContent.toLowerCase().includes(query);
        option.hidden = hidden;
        if (!hidden) visibleCount += 1;
      });
      empty.hidden = visibleCount > 0;
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (option.hasAttribute("disabled")) return;
        options.forEach((item) => {
          if (!item.hasAttribute("disabled")) item.setAttribute("variant", item === option ? "primary" : "tertiary");
        });
      });
    });
  }
}

customElements.define("story-menu", StoryMenu);
