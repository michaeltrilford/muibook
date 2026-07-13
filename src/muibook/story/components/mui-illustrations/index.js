import { getComponentDocs } from "../../../utils/story-data";

class StoryIllustration extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Illustrations");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Illustrations"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      .swatch-grid::part(internal) {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
      }

      .illustration-shell {
        display: grid;
        place-items: center;
        width: 100%;
        min-height: 18rem;
        padding: var(--space-500);
        box-sizing: border-box;
        border-radius: var(--radius-300);
        background: var(--surface-elevated-100);
      }

      .illustration-shell.contrast {
        background: var(--app-illustration-background-inverse, var(--grey-800));
      }

      :host([data-theme="dark"]) .illustration-shell.contrast {
        background: var(--app-illustration-background-inverse, var(--grey-400));
      }

      .size-grid::part(internal) {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-illustration-trash" title="Illustrations"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <mui-grid slot="body" class="swatch-grid" col="repeat(auto-fit, minmax(28rem, 1fr))" space="var(--space-400)">
          <mui-card>
            <mui-card-body inner-space>
              <div class="illustration-shell">
                <mui-illustration-trash></mui-illustration-trash>
              </div>
            </mui-card-body>
          </mui-card>
          <mui-card>
            <mui-card-body inner-space>
              <div class="illustration-shell contrast">
                <mui-illustration-trash color="inverted"></mui-illustration-trash>
              </div>
            </mui-card-body>
          </mui-card>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-illustration-trash&gt;&lt;/mui-illustration-trash&gt;<br />
          &lt;mui-illustration-trash color="inverted"&gt;&lt;/mui-illustration-trash&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-grid slot="body" class="size-grid" col="repeat(auto-fit, minmax(28rem, 1fr))" space="var(--space-400)">
          <mui-card>
            <mui-card-body inner-space>
              <mui-v-stack space="var(--space-300)" alignx="center">
                <mui-body size="small" variant="secondary">X-Small</mui-body>
                <mui-illustration-trash size="x-small"></mui-illustration-trash>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          <mui-card>
            <mui-card-body inner-space>
              <mui-v-stack space="var(--space-300)" alignx="center">
                <mui-body size="small" variant="secondary">Small</mui-body>
                <mui-illustration-trash size="small"></mui-illustration-trash>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          <mui-card>
            <mui-card-body inner-space>
              <mui-v-stack space="var(--space-300)" alignx="center">
                <mui-body size="small" variant="secondary">Medium</mui-body>
                <mui-illustration-trash size="medium"></mui-illustration-trash>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          <mui-card>
            <mui-card-body inner-space>
              <mui-v-stack space="var(--space-300)" alignx="center">
                <mui-body size="small" variant="secondary">Large</mui-body>
                <mui-illustration-trash size="large"></mui-illustration-trash>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
          <mui-card>
            <mui-card-body inner-space>
              <mui-v-stack space="var(--space-300)" alignx="center">
                <mui-body size="small" variant="secondary">X-Large</mui-body>
                <mui-illustration-trash size="x-large"></mui-illustration-trash>
              </mui-v-stack>
            </mui-card-body>
          </mui-card>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-illustration-trash size="x-small"&gt;&lt;/mui-illustration-trash&gt;<br />
          &lt;mui-illustration-trash size="small"&gt;&lt;/mui-illustration-trash&gt;<br />
          &lt;mui-illustration-trash size="medium"&gt;&lt;/mui-illustration-trash&gt;<br />
          &lt;mui-illustration-trash size="large"&gt;&lt;/mui-illustration-trash&gt;<br />
          &lt;mui-illustration-trash size="x-large"&gt;&lt;/mui-illustration-trash&gt;
        </story-code-block>
      </story-card>

      <story-card id="custom-color" title="${storyMeta["custom-color"].title}" description="${storyMeta["custom-color"].description}" usage="${storyMeta["custom-color"].usage}">
        <mui-grid slot="body" class="swatch-grid" col="repeat(auto-fit, minmax(28rem, 1fr))" space="var(--space-400)">
          <mui-card>
            <mui-card-body inner-space>
              <div class="illustration-shell">
                <mui-illustration-trash color="var(--mui-brand-500)"></mui-illustration-trash>
              </div>
            </mui-card-body>
          </mui-card>
          <mui-card>
            <mui-card-body inner-space>
              <div class="illustration-shell">
                <mui-illustration-trash style="--illustration-main-color-default: var(--green-600); --illustration-detail-color-default: color-mix(in srgb, var(--green-600) 35%, transparent);"></mui-illustration-trash>
              </div>
            </mui-card-body>
          </mui-card>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-illustration-trash color="var(--mui-brand-500)"&gt;&lt;/mui-illustration-trash&gt;<br />
          &lt;mui-illustration-trash style="--illustration-main-color-default: var(--green-600);"&gt;&lt;/mui-illustration-trash&gt;
        </story-code-block>
      </story-card>

      <story-card id="empty-state" title="${storyMeta["empty-state"].title}" description="${storyMeta["empty-state"].description}" usage="${storyMeta["empty-state"].usage}">
        <mui-card slot="body">
          <mui-card-body inner-space>
            <mui-v-stack space="var(--space-600)" alignx="center" style="margin-block-start: var(--space-400); margin-block-end: var(--space-500);">
              <mui-illustration-trash size="large"></mui-illustration-trash>
              <mui-v-stack space="var(--space-100)" alignx="center" style="text-wrap: balance;">
                <mui-heading size="4" level="2">Trash is empty</mui-heading>
                <mui-body size="medium" variant="secondary" style="max-width: 42ch; text-align: center;">
                  Deleted items will appear here until they are permanently removed.
                </mui-body>
              </mui-v-stack>
            </mui-v-stack>
          </mui-card-body>
        </mui-card>
        <story-code-block slot="footer" scrollable>
          &lt;mui-card&gt;<br />
          &nbsp;&nbsp;&lt;mui-card-body inner-space&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400)" alignx="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-illustration-trash size="large"&gt;&lt;/mui-illustration-trash&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="4" level="2"&gt;Trash is empty&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="medium" variant="secondary"&gt;Deleted items will appear here...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="secondary"&gt;Browse items&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
          &lt;/mui-card&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Illustrations"}"
        description="${data?.description || ""}"
        github="${data?.github || ""}"
        figma="${data?.figma || ""}"
        guides="${data?.guides || ""}"
        storybook="${data?.storybook || ""}"
        accessibility="${data?.accessibility?.engineerList?.join("|||") || ""}"
        imports='["@muibook/components/mui-illustrations"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-illustration", StoryIllustration);
