import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptToggle");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt-toggle";<br>
        </mui-code>
      </spec-card>

      <story-card id="default" title="Default">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-body size="small" variant="optional">Icon mode (default)</mui-body>
          <mui-prompt-toggle>
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
          </mui-prompt-toggle>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-toggle&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle variant="tertiary" icon-only size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-globe size="small"&gt;&lt;/mui-icon-globe&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip context-chip dismiss size="small" hidden&gt;Search&lt;/mui-chip&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="chip-mode" title="Chip Mode">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-body size="small" variant="optional">Set mode='chip' to render the active chip state.</mui-body>
          <mui-prompt-toggle mode="chip">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-chip context-chip dismiss size="small">Search</mui-chip>
          </mui-prompt-toggle>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-toggle mode="chip"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip context-chip dismiss size="small"&gt;Search&lt;/mui-chip&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="inside-prompt" title="Inside Prompt">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt placeholder="Reply to Mui..." actions-fan context-mode="icon">
            <mui-prompt-toggle slot="actions" style="margin-inline: var(--space-200) var(--space-025);">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-globe size="small"></mui-icon-globe>
              </mui-button>
              <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
            </mui-prompt-toggle>
            <mui-button slot="actions-right" variant="tertiary" icon-only size="small">
              <mui-icon-up-arrow size="small"></mui-icon-up-arrow>
            </mui-button>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt context-mode="icon"&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-chip context-chip dismiss ... hidden&gt;Search&lt;/mui-chip&gt;<br />
          &nbsp;&nbsp;&lt;/mui-prompt-toggle&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Toggle"}"
        description="${data?.description || "Toggle wrapper for context icon/chip states inside Prompt actions."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||chip-mode::Chip Mode|||inside-prompt::Inside Prompt"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-prompt-toggle", StoryPromptToggle);
