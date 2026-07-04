import { getComponentDocs } from "../../../utils/story-data";

class StorySearchInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await getComponentDocs("Search Input");

    const styles = /*css*/ `
      :host { display: block; }

      .demo-row {
        width: 100%;
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-search-input" title="Search Input"></story-api-types>

      <story-card title="Default" usageLink="https://guides.muibook.com/search-input" canvas-background="var(--surface)">
        <div slot="body" class="demo-row">
          <mui-search-input label="Search projects"></mui-search-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-search-input label="Search projects"&gt;&lt;/mui-search-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="After Slot: Tabs" usageLink="https://guides.muibook.com/search-input" canvas-background="var(--surface)">
        <div slot="body" class="demo-row">
          <mui-search-input label="Search tabs" autofocus>
            <mui-button slot="action" variant="tertiary" icon-only aria-label="Search tabs">
              <mui-icon-search></mui-icon-search>
            </mui-button>
            <mui-tab-bar slot="after" active-inset radius="500" stroke="none" full-width>
              <mui-tab-item active>Item 1</mui-tab-item>
              <mui-tab-item>Item 2</mui-tab-item>
            </mui-tab-bar>
          </mui-search-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-search-input label="Search tabs" autofocus&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" icon-only aria-label="Search tabs"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-search&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot="after" active-inset radius="500" stroke="none" full-width&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active&gt;Item 1&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item&gt;Item 2&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &lt;/mui-search-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="After Slot: Custom Width" usageLink="https://guides.muibook.com/search-input" canvas-background="var(--surface)">
        <div slot="body" class="demo-row">
          <mui-search-input label="Search tabs" autofocus>
            <mui-button slot="action" variant="tertiary" icon-only aria-label="Search tabs">
              <mui-icon-search></mui-icon-search>
            </mui-button>
            <mui-h-stack slot="after" alignx="end">
              <mui-tab-bar active-inset radius="500" stroke="none" full-width style="width: 40rem;">
                <mui-tab-item active>Item 1</mui-tab-item>
                <mui-tab-item>Item 2</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-search-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-search-input label="Search tabs" autofocus&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" icon-only aria-label="Search tabs"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-search&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="after" alignx="end"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-bar active-inset radius="500" stroke="none" full-width style="width: 40rem;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active&gt;Item 1&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item&gt;Item 2&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-search-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Controlled Open" usageLink="https://guides.muibook.com/search-input" canvas-background="var(--surface)">
        <div slot="body" class="demo-row">
          <mui-search-input label="Search orders" open value="Button">
            <mui-button slot="action" variant="tertiary" icon-only aria-label="Search tabs">
              <mui-icon-search></mui-icon-search>
            </mui-button>
            <mui-tab-bar slot="after" active-inset radius="500" stroke="none" full-width>
              <mui-tab-item active>Item 1</mui-tab-item>
              <mui-tab-item>Item 2</mui-tab-item>
            </mui-tab-bar>
          </mui-search-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-search-input label="Search orders" open value="Button"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" icon-only aria-label="Search tabs"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-search&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot="after" active-inset radius="500" stroke="none" full-width&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active&gt;Item 1&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item&gt;Item 2&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &lt;/mui-search-input&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="Search Input"
        description="A composed search control that can reveal over slotted trailing content."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-search-input/index.ts"
        guides="https://guides.muibook.com/search-input"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-search-input", StorySearchInput);
