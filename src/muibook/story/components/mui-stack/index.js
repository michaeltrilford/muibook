import { getComponentDocs } from "../../../utils/story-data";

class storyStack extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Stack");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Stack"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      .vertical-align-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-300);
      }

      .vertical-align-canvas {
        box-sizing: border-box;
        padding: var(--space-300);
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }

      .viewport-preview {
        position: relative;
        height: 36rem;
        overflow: hidden;
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }

      .sidebar-preview {
        position: relative;
        height: 66rem;
        overflow: hidden;
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }

      .viewport-shell {
        position: absolute;
        inset: 0;
      }

      .viewport-child {
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-elevated-100);
      }

      .viewport-child-nested {
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface);
      }

      .wrap-preview {
        max-width: 44rem;
      }

      @media (max-width: 767px) {
        .vertical-align-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    const BlockBox = /*html*/ `
      <mui-card>
        <mui-card-body>{content}</mui-card-body>
      </mui-card>
    `;

    const Box = /*html*/ `
      <mui-card>
        <mui-card-body>{content}</mui-card-body>
      </mui-card>
    `;

    const DefaultHStack = /*html*/ `
      <mui-v-stack slot="body">
        <mui-v-stack space="8px">
          <mui-code style="border-radius: 8px;">
            Default Size: space="var(--space-500)"
          </mui-code>
        </mui-v-stack>
        <mui-h-stack>
          ${Box}
          ${Box}
        </mui-h-stack>
      </mui-v-stack>
    `;

    const DefaultVStack = /*html*/ `
      <mui-v-stack slot="body">
        <mui-v-stack space="8px">
          <mui-code style="border-radius: 8px;">Default Size: space="var(--space-500)"</mui-code>
        </mui-v-stack>
        <mui-v-stack>
          ${BlockBox}
          ${BlockBox}
        </mui-v-stack>
      </mui-v-stack>
  `;

    const HStackSpace = /*html*/ `
    <mui-h-stack  space="var(--space-400)" slot="body">
      ${Box}
      ${Box}
    </mui-h-stack>
  `;

    const VStackSpace = /*html*/ `
    <mui-v-stack slot="body" space="var(--space-400)">
      ${BlockBox}
      ${BlockBox}
    </mui-v-stack>
  `;

    const VStackAlignment = /*html*/ `
      <div class="vertical-align-grid" slot="body">
        <mui-v-stack class="vertical-align-canvas" height="28rem" alignx="stretch" aligny="start" space="var(--space-000)">
          <mui-code>aligny="start"</mui-code>
        </mui-v-stack>
        <mui-v-stack class="vertical-align-canvas" height="28rem" alignx="stretch" aligny="center" space="var(--space-000)">
          <mui-code>aligny="center"</mui-code>
        </mui-v-stack>
        <mui-v-stack class="vertical-align-canvas" height="28rem" alignx="stretch" aligny="end" space="var(--space-000)">
          <mui-code>aligny="end"</mui-code>
        </mui-v-stack>
      </div>
    `;

    const VStackFillChildren = /*html*/ `
      <div class="viewport-preview" slot="body">
        <mui-v-stack class="viewport-shell" fill padding="var(--space-300)" space="var(--space-300)" alignx="stretch" aligny="start">
          <mui-v-stack space="var(--space-300)">
            <mui-v-stack class="viewport-child" padding="var(--space-300)" space="var(--space-200)">
              <mui-body size="small" weight="bold">Nested VStack</mui-body>
              <mui-body size="x-small" variant="secondary">Intrinsic height inside an outer fill stack.</mui-body>
            </mui-v-stack>
            <mui-h-stack class="viewport-child" padding="var(--space-300)" space="var(--space-200)" aligny="center">
              <mui-v-stack class="viewport-child-nested" padding="var(--space-200)" space="var(--space-100)">
                <mui-body size="x-small" weight="bold">Child A</mui-body>
                <mui-body size="x-small" variant="secondary">auto height</mui-body>
              </mui-v-stack>
              <mui-v-stack class="viewport-child-nested" padding="var(--space-200)" space="var(--space-100)">
                <mui-body size="x-small" weight="bold">Child B</mui-body>
                <mui-body size="x-small" variant="secondary">auto height</mui-body>
              </mui-v-stack>
            </mui-h-stack>
          </mui-v-stack>
        </mui-v-stack>
      </div>
    `;

    const HStackWrap = /*html*/ `
      <div class="vertical-align-canvas wrap-preview" slot="body">
        <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center">
          <mui-badge>Design System</mui-badge>
          <mui-badge>Content Model</mui-badge>
          <mui-badge>Documentation</mui-badge>
          <mui-badge>Accessibility</mui-badge>
          <mui-badge>Builder Runtime</mui-badge>
        </mui-h-stack>
      </div>
    `;

    const VStackSidebarNav = /*html*/ `
      <div class="sidebar-preview" slot="body">
        <mui-v-stack class="viewport-shell" fill width="24rem" padding="var(--space-400)" space="var(--space-200)" alignx="stretch" style="border-right: var(--border-thin); background: var(--surface-elevated-100);">
          <mui-v-stack space="var(--space-100)" alignx="stretch" width="auto" height="auto" aligny="start">
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-home slot="before"></mui-icon-home>
              Dashboard
            </mui-button>
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-grid slot="before"></mui-icon-grid>
              Analytics
            </mui-button>
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-text-below-folder slot="before"></mui-icon-text-below-folder>
              Projects
            </mui-button>
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-accessibility slot="before"></mui-icon-accessibility>
              Team
            </mui-button>
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-calendar slot="before"></mui-icon-calendar>
              Calendar
            </mui-button>
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>
              Documents
            </mui-button>
            <mui-button variant="tertiary" align="start" gap="var(--space-200)">
              <mui-icon-gear slot="before"></mui-icon-gear>
              Settings
            </mui-button>
          </mui-v-stack>
          <mui-h-stack space="var(--space-000)" alignx="stretch" aligny="center" width="auto" height="auto" style="align-self: end; width: 100%;">
            <mui-button variant="tertiary" align="start" gap="var(--space-200)" style="width: 100%;">
              <mui-icon-left-arrow slot="before"></mui-icon-left-arrow>
              Sign out
            </mui-button>
          </mui-h-stack>
        </mui-v-stack>
      </div>
    `;

    const stories = /*html*/ `
        <mui-v-stack space="var(--space-100)">
          <story-api-types tag="mui-h-stack" title="HStack"></story-api-types>
          <story-api-types tag="mui-v-stack" title="VStack"></story-api-types>
        </mui-v-stack>

        <story-card id="horizontal-default" title="${storyMeta["horizontal-default"].title}" description="${storyMeta["horizontal-default"].description}" usage="${storyMeta["horizontal-default"].usage}">
          ${DefaultHStack}
          <story-code-block slot="footer" scrollable>
            &lt;mui-h-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-h-stack&gt;
          </story-code-block>
        </story-card>

        <story-card id="vertical-default" title="${storyMeta["vertical-default"].title}" description="${storyMeta["vertical-default"].description}" usage="${storyMeta["vertical-default"].usage}">
          ${DefaultVStack}
          <story-code-block slot="footer" scrollable>
            &lt;mui-v-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-v-stack&gt;
          </story-code-block>
        </story-card>

      <story-card id="horizontal-custom-space" title="${storyMeta["horizontal-custom-space"].title}" description="${storyMeta["horizontal-custom-space"].description}" usage="${storyMeta["horizontal-custom-space"].usage}">
        ${HStackSpace}
        <story-code-block slot="footer" scrollable>
          &lt;mui-h-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-h-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="vertical-custom-space" title="${storyMeta["vertical-custom-space"].title}" description="${storyMeta["vertical-custom-space"].description}" usage="${storyMeta["vertical-custom-space"].usage}">
        ${VStackSpace}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="horizontal-wrap" title="${storyMeta["horizontal-wrap"].title}" description="${storyMeta["horizontal-wrap"].description}" usage="${storyMeta["horizontal-wrap"].usage}">
        ${HStackWrap}
        <story-code-block slot="footer" scrollable>
          &lt;mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Design System&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Content Model&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Documentation&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Accessibility&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Builder Runtime&lt;/mui-badge&gt;<br />
          &lt;/mui-h-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="padding" title="${storyMeta["padding"].title}" description="${storyMeta["padding"].description}" usage="${storyMeta["padding"].usage}">
        <mui-v-stack class="vertical-align-canvas" padding="var(--space-400)" space="var(--space-300)" slot="body">
          <mui-h-stack padding="var(--space-300)" space="var(--space-200)" style="background: var(--surface-elevated-100);">
            ${Box}
            ${Box}
          </mui-h-stack>
          <mui-body size="small">Stacks can inset content without additional wrapper styles.</mui-body>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack padding="var(--space-400)" space="var(--space-300)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack padding="var(--space-300)" space="var(--space-200)"&gt;...&lt;/mui-h-stack&gt;<br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="vertical-alignment-in-a-set-height" title="${storyMeta["vertical-alignment-in-a-set-height"].title}" description="${storyMeta["vertical-alignment-in-a-set-height"].description}" usage="${storyMeta["vertical-alignment-in-a-set-height"].usage}">
        ${VStackAlignment}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack height="28rem" aligny="center"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-code&gt;aligny="center"&lt;/mui-code&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="vertical-fill-with-nested-stacks" title="${storyMeta["vertical-fill-with-nested-stacks"].title}" description="${storyMeta["vertical-fill-with-nested-stacks"].description}" usage="${storyMeta["vertical-fill-with-nested-stacks"].usage}">
        ${VStackFillChildren}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack fill aligny="start" padding="var(--space-300)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack padding="var(--space-300)"&gt;...&lt;/mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack padding="var(--space-300)"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="vertical-sidebar-navigation" title="${storyMeta["vertical-sidebar-navigation"].title}" description="${storyMeta["vertical-sidebar-navigation"].description}" usage="${storyMeta["vertical-sidebar-navigation"].usage}">
        ${VStackSidebarNav}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack fill width="24rem" padding="var(--space-400)" space="var(--space-200)" alignx="stretch" style="border-right: var(--border-thin); background: var(--surface-elevated-100);"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-100)" alignx="stretch" width="auto" height="auto" aligny="start"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-home slot="before"&gt;&lt;/mui-icon-home&gt;Dashboard&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-grid slot="before"&gt;&lt;/mui-icon-grid&gt;Analytics&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-text-below-folder slot="before"&gt;&lt;/mui-icon-text-below-folder&gt;Projects&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-accessibility slot="before"&gt;&lt;/mui-icon-accessibility&gt;Team&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-calendar slot="before"&gt;&lt;/mui-icon-calendar&gt;Calendar&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-rectangle-media-text slot="before"&gt;&lt;/mui-icon-rectangle-media-text&gt;Documents&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-gear slot="before"&gt;&lt;/mui-icon-gear&gt;Settings&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-h-stack space="var(--space-000)" alignx="stretch" aligny="center" width="auto" height="auto" style="align-self: end; width: 100%;"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)" style="width: 100%;"&gt;&lt;mui-icon-left-arrow slot="before"&gt;&lt;/mui-icon-left-arrow&gt;Sign out&lt;/mui-button&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;
          <br />
          &lt;/mui-v-stack&gt;
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

        imports='["@muibook/components/mui-stack"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-stack", storyStack);
