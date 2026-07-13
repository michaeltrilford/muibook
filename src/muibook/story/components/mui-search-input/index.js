import { getComponentDocs } from "../../../utils/story-data";

class StorySearchInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Search Input");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Search Input"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const styles = /*css*/ `
      :host { display: block; }

      .demo-row {
        width: 100%;
      }
    `;

    const sizeExamples = ["x-small", "small", "medium", "large"]
      .map(
        (size) => /*html*/ `
          <mui-search-input label="Search ${size} tabs" size="${size}">
            <mui-button slot="action" variant="tertiary" icon-only aria-label="Search ${size} tabs">
              <mui-icon-search></mui-icon-search>
            </mui-button>
            <mui-tab-bar slot="after" active-inset radius="500" stroke="none" full-width>
              <mui-tab-item active>Overview</mui-tab-item>
              <mui-tab-item>Activity</mui-tab-item>
            </mui-tab-bar>
          </mui-search-input>
        `,
      )
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-search-input" title="Search Input"></story-api-types>

      <story-card canvas-background="var(--surface)" id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <div slot="body" class="demo-row">
          <mui-search-input label="Search projects"></mui-search-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-search-input label="Search projects"&gt;&lt;/mui-search-input&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-background="var(--surface)" id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-300)">
          ${sizeExamples}
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-search-input label=&quot;Search small tabs&quot; size=&quot;small&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; variant=&quot;tertiary&quot; icon-only aria-label=&quot;Search small tabs&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-search&gt;&lt;/mui-icon-search&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-bar slot=&quot;after&quot; active-inset radius=&quot;500&quot; stroke=&quot;none&quot; full-width&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active&gt;Overview&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item&gt;Activity&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &lt;/mui-search-input&gt;<br /><br />
          &lt;!-- Repeat with size=&quot;x-small&quot;, &quot;medium&quot;, and &quot;large&quot;. --&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-background="var(--surface)" id="after-slot-tabs" title="${storyMeta["after-slot-tabs"].title}" description="${storyMeta["after-slot-tabs"].description}" usage="${storyMeta["after-slot-tabs"].usage}">
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

      <story-card canvas-background="var(--surface)" id="after-slot-custom-width" title="${storyMeta["after-slot-custom-width"].title}" description="${storyMeta["after-slot-custom-width"].description}" usage="${storyMeta["after-slot-custom-width"].usage}">
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

      <story-card canvas-background="var(--surface)" id="controlled-open" title="${storyMeta["controlled-open"].title}" description="${storyMeta["controlled-open"].description}" usage="${storyMeta["controlled-open"].usage}">
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
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        imports='["@muibook/components/mui-search-input"]'
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-search-input", StorySearchInput);
