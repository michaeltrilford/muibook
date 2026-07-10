import { getComponentDocs } from "../../../utils/story-data";

class StoryContextBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ContextBar");

    const getComposer = (options = {}) => /*html*/ `
      <mui-prompt
        slot="body"
        actions-fan
        preview-loading="auto"
        preview-loading-label="Resolving preview"
        placeholder="${options.placeholder || "Ask the agent to refine the chat composition..."}"
        enter-submit
        context-mode="icon"
        color-top-start="var(--mui-brand-400)"
        color-top-mid="var(--blue-500)"
        color-top-end="var(--green-500)"
        color-top-accent="var(--orange-500)"
        style="--prompt-accent-primary: var(--mui-brand-400); --prompt-accent-secondary: var(--blue-500);"
      >
        ${
          options.previews
            ? /*html*/ `
          <mui-prompt-preview
            slot="preview"
            clickable
            badge="MD"
            animated
            value="Review the agent chat response, tighten the content hierarchy, and keep the prompt components reusable."
          ></mui-prompt-preview>
          <mui-prompt-preview
            slot="preview"
            clickable
            badge="JSON"
            value='{"story":"agent-chat","components":["mui-prompt-message","mui-worker","mui-result-bar","mui-prompt-preview","mui-prompt-toggle"],"status":"draft"}'
          ></mui-prompt-preview>
        `
            : ""
        }
        ${
          options.context === "informational"
            ? /*html*/ `
          <mui-context-bar slot="context">
            <mui-body size="x-small" weight="regular" variant="default">
              Tighten release notes for prompt context, action bars, and agent chat story before publishing
            </mui-body>

            <mui-h-stack slot="actions" aligny="center" space="var(--space-000)">
              <mui-button variant="tertiary" size="x-small">Steer</mui-button>
              <mui-dropdown position="right" style="--dropdown-min-width: 9rem;">
                <mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More">
                  <mui-icon-ellipsis size="x-small" class="mui-icon"></mui-icon-ellipsis>
                </mui-button>
                <mui-button size="x-small">Edit</mui-button>
                <mui-button size="x-small">Delete</mui-button>
              </mui-dropdown>
            </mui-h-stack>

          </mui-context-bar>
        `
            : options.context === "status"
              ? /*html*/ `
          <mui-context-bar slot="context">
            <mui-h-stack aligny="center" space="var(--space-100)">
              <mui-body size="x-small" weight="regular" variant="default">8 files changed</mui-body>
              <mui-body size="x-small" weight="regular" variant="success">+44</mui-body>
              <mui-body size="x-small" weight="regular" variant="error">-20</mui-body>
            </mui-h-stack>
            <mui-responsive slot="actions" variant="container" observe="parent" breakpoint="400">

              <mui-h-stack slot="showAbove" aligny="center" space="var(--space-100)">
                <mui-button variant="tertiary" size="x-small">Undo</mui-button>
                <mui-button variant="tertiary" size="x-small">Review</mui-button>
              </mui-h-stack>

              <mui-dropdown slot="showBelow" position="right" style="--dropdown-min-width: 9rem;">
                <mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More">
                  <mui-icon-ellipsis size="x-small" class="mui-icon"></mui-icon-ellipsis>
                </mui-button>
                <mui-button size="x-small">Undo</mui-button>
                <mui-button size="x-small">Review</mui-button>
              </mui-dropdown>
            </mui-responsive>
          </mui-context-bar>
        `
              : options.context === "approval"
                ? /*html*/ `
          <mui-context-bar slot="context">
            <mui-body size="x-small" weight="regular" variant="default">
              The agent wants to delete 12 unused files
            </mui-body>
            <mui-responsive slot="actions" variant="container" observe="parent" breakpoint="400">

              <mui-h-stack slot="showAbove" aligny="center" space="var(--space-100)">
                <mui-button variant="tertiary" size="x-small">Deny</mui-button>
                <mui-button variant="primary" size="x-small">Allow</mui-button>
              </mui-h-stack>

              <mui-dropdown slot="showBelow" position="right" style="--dropdown-min-width: 9rem;">
                <mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More">
                  <mui-icon-ellipsis size="x-small" class="mui-icon"></mui-icon-ellipsis>
                </mui-button>
                <mui-button size="x-small">Deny</mui-button>
                <mui-button size="x-small">Allow</mui-button>
              </mui-dropdown>
            </mui-responsive>
          </mui-context-bar>
        `
                : ""
        }

        ${
          options.simpleActions
            ? /*html*/ `
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" size="small" aria-label="Toggle web context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-chip context-chip dismiss size="small" hidden>Web</mui-chip>
          </mui-prompt-toggle>

          <mui-button slot="actions" variant="tertiary" size="small" aria-label="Attach files">
            <mui-icon-add size="small"></mui-icon-add>
          </mui-button>
        `
            : /*html*/ `
          <mui-dropdown slot="actions" position="left" vertical-position="up">
            <mui-button slot="action" variant="tertiary" icon-only size="small" aria-label="Attach context">
              <mui-icon-add size="small"></mui-icon-add>
            </mui-button>
            <mui-button variant="tertiary" size="small">Attach File</mui-button>
            <mui-button variant="tertiary" size="small">Add Screenshot</mui-button>
            <mui-button variant="tertiary" size="small">Paste JSON</mui-button>
          </mui-dropdown>

          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle web context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-chip context-chip dismiss size="small" hidden>Web</mui-chip>
          </mui-prompt-toggle>

          <mui-dropdown slot="actions" position="right" vertical-position="up">
            <mui-button slot="action" variant="tertiary" size="small">
              MPT-4
              <mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>
            </mui-button>
            <mui-button variant="tertiary" size="small">MPT-4</mui-button>
            <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
            <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
          </mui-dropdown>
        `
        }
      </mui-prompt>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-context-bar" title="Context Bar"></story-api-types>

      <story-card
        id="in-prompt"
        title="Informational Context"
        usage="Slot Prompt Context into Prompt context when app state has an active task.|||Omit the component entirely when there is no active context.|||Prompt only positions the slotted context; it does not create context chrome."
      >
        ${getComposer({ previews: true, context: "informational", simpleActions: true, placeholder: "Paste, click preview, or submit..." })}
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt&gt;<br />
          &nbsp;&nbsp;&lt;mui-context-bar slot="context"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" weight="regular" variant="default"&gt;Tighten release notes...&lt;/mui-body&gt;<br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="actions" aligny="center" space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" size="x-small"&gt;Steer&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right" style="--dropdown-min-width: 9rem;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="x-small" class="mui-icon"&gt;&lt;/mui-icon-ellipsis&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Edit&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Delete&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-context-bar&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="status-prompt"
        title="Status Context"
        usage="Slot Prompt Context into Prompt context when app state has an active task.|||Swap actions to a dropdown menu below 400px container width to ensure the layout remains compact.|||Omit the component entirely when there is no active context."
      >
        ${getComposer({ previews: true, context: "status", simpleActions: true, placeholder: "Paste, click preview, or submit..." })}
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt&gt;<br />
          &nbsp;&nbsp;&lt;mui-context-bar slot="context"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack aligny="center" space="var(--space-100)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="default"&gt;8 files changed&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="success"&gt;+44&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="error"&gt;-20&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-responsive slot="actions" variant="container" observe="parent" breakpoint="400"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="showAbove" aligny="center" space="var(--space-100)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" size="x-small"&gt;Undo&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" size="x-small"&gt;Review&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown slot="showBelow" position="right" style="--dropdown-min-width: 9rem;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="x-small" class="mui-icon"&gt;&lt;/mui-icon-ellipsis&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Undo&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Review&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-responsive&gt;<br />
          &nbsp;&nbsp;&lt;/mui-context-bar&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="approval-prompt"
        title="Approval Context"
        usage="Slot Prompt Context into Prompt context when app state has an active task.|||Swap actions to a dropdown menu below 400px container width to ensure the layout remains compact.|||Omit the component entirely when there is no active context."
      >
        ${getComposer({ previews: true, context: "approval", simpleActions: true, placeholder: "Paste, click preview, or submit..." })}
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt&gt;<br />
          &nbsp;&nbsp;&lt;mui-context-bar slot="context"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" weight="regular" variant="default"&gt;The agent wants to delete 12 unused files&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-responsive slot="actions" variant="container" observe="parent" breakpoint="400"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="showAbove" aligny="center" space="var(--space-100)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" size="x-small"&gt;Deny&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="primary" size="x-small"&gt;Allow&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown slot="showBelow" position="right" style="--dropdown-min-width: 9rem;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-ellipsis size="x-small" class="mui-icon"&gt;&lt;/mui-icon-ellipsis&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Deny&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button size="x-small"&gt;Allow&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-responsive&gt;<br />
          &nbsp;&nbsp;&lt;/mui-context-bar&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Context Bar"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-context-bar"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="in-prompt::Informational Context|||status-prompt::Status Context|||approval-prompt::Approval Context"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-context-bar", StoryContextBar);
