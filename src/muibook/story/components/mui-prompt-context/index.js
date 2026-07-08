import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptContext extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptContext");

    const stories = /*html*/ `
      <story-api-types tag="mui-prompt-context" title="Prompt Context"></story-api-types>

      <story-card
        id="default"
        title="Default"
        usage="Use Prompt Context for a compact active task or selected context row.|||Slot actions separately so product code can wire Steer, Remove, and More behavior.|||Long Body text truncates by default."
      >
        <mui-prompt-context slot="body">
          <mui-body size="x-small">
            Tighten release notes for prompt context, action bars, and the agent chat composition before publishing
          </mui-body>
          <mui-button slot="actions" variant="tertiary" size="x-small">Steer</mui-button>
          <mui-dropdown slot="actions" position="right" style="--dropdown-min-width: 9rem;">
            <mui-button variant="tertiary" slot="action" size="x-small" aria-label="More context actions">
              <mui-icon-ellipsis size="x-small"></mui-icon-ellipsis>
            </mui-button>
            <mui-button size="x-small">Edit</mui-button>
            <mui-button size="x-small">Delete</mui-button>
          </mui-dropdown>
        </mui-prompt-context>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-context&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack alignY="center" space="var(--space-100)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron size="xx-small"&gt;&lt;/mui-icon-right-chevron&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small"&gt;Tighten release notes...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="tertiary" size="x-small"&gt;Steer&lt;/mui-button&gt;<br />
          &lt;/mui-prompt-context&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="in-prompt"
        title="In Prompt"
        usage="Slot Prompt Context into Prompt context when app state has an active task.|||Omit the component entirely when there is no active context.|||Prompt only positions the slotted context; it does not create context chrome."
      >
        <mui-prompt slot="body" placeholder="Ask for follow-up changes..." enter-submit>
          <mui-prompt-context slot="context">
            <mui-body size="x-small">
              Tighten release notes for prompt context, action bars, and the agent chat composition before publishing
            </mui-body>
            <mui-button slot="actions" variant="tertiary" size="x-small">Steer</mui-button>
            <mui-dropdown slot="actions" position="right" style="--dropdown-min-width: 9rem;">
              <mui-button variant="tertiary" slot="action" size="x-small" aria-label="More context actions">
                <mui-icon-ellipsis size="x-small"></mui-icon-ellipsis>
              </mui-button>
              <mui-button size="x-small">Edit</mui-button>
              <mui-button size="x-small">Delete</mui-button>
            </mui-dropdown>
          </mui-prompt-context>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-context slot="context"&gt;...active task...&lt;/mui-prompt-context&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Context"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-prompt-context"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||in-prompt::In Prompt"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-prompt-context", StoryPromptContext);
