class CompAgentChat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host {
        display: block;
      }

      .chat-shell {
        max-width: 78rem;
        margin: 0 auto;
      }

      .response-actions {
        display: flex;
        align-items: center;
        gap: var(--space-100);
      }

        .preview-row {
          display: grid;
          gap: var(--space-200);
        }

        .steering-page {
          min-height: 56rem;
          display: grid;
          grid-template-rows: 1fr auto;
          gap: var(--space-700);
        }

        .context-task-title {
          min-width: 0;
        }

        @container (min-width: 680px) {
          .preview-row {
            grid-template-columns: 1fr 1fr;
        }
      }
    `;

    const getComposer = (options = {}) => /*html*/ `
      <mui-prompt
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
            value='{"story":"agent-chat","components":["mui-prompt-message","mui-work-log","mui-result-bar","mui-prompt-preview","mui-prompt-toggle"],"status":"draft"}'
          ></mui-prompt-preview>
        `
            : ""
        }
        ${
          options.context
            ? /*html*/ `
          <mui-context-bar slot="context">
            <mui-body size="x-small">
              Tighten release notes for prompt context, action bars, and agent chat story before publishing
            </mui-body>
            <mui-button slot="actions" variant="tertiary" size="x-small" onclick="event.stopPropagation()">
              Steer
            </mui-button>
            <mui-dropdown slot="actions" position="right" style="--dropdown-min-width: 9rem;">
              <mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More">
                <mui-icon-ellipsis size="x-small"></mui-icon-ellipsis>
              </mui-button>
              <mui-button size="x-small" variant="tertiary">Edit</mui-button>
              <mui-button size="x-small" variant="tertiary">Delete</mui-button>
            </mui-dropdown>
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Agent Chat"
        description="Composition example for an agent chat surface with response content, generated previews, message framing, and a prompt composer."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/agent-chat/index.js"
        storybook="https://storybook.muibook.com/?path=/story/compositions-agent-chat--agent-chat"
      >
        <story-card
          title="Agent Chat"
          description="A chat layout composed from prompt, prompt message, prompt preview, slats, lists, body text, code, and action controls."
          usage="Use mui-prompt-message for response framing.|||Use mui-prompt-preview for generated or attached context.|||Use mui-prompt-toggle inside the prompt actions slot for app-controlled context state.|||Keep chat content as normal document structure so answers can include headings, paragraphs, lists, code, previews, and controls."
        >

          <mui-v-stack slot="body" class="chat-shell" space="var(--space-600)" alignX="stretch">
            <mui-v-stack space="var(--space-600)">

              <mui-prompt-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you turn the agent chat example into a real composition using Prompt Message, Worker, Result, previews, and the prompt composer?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">18:33</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-prompt-message>

              <mui-prompt-message id="agentChatLatestMessage" size="medium" variant="ghost">
                <mui-work-log slot="header" label="Worked for 4m 10s" rule>
                  <mui-body size="x-small" variant="tertiary">Reviewed the prompt component APIs and AI & LLM navigation.</mui-body>
                  <mui-body size="x-small" variant="tertiary">Replaced one-off response markup with dedicated prompt components.</mui-body>
                  <mui-body size="x-small" variant="tertiary">Checked the composition against the Prompt Message body rhythm.</mui-body>
                </mui-work-log>

                <mui-v-stack space="var(--space-200)">
                  <mui-heading level="2" size="6">Built a reusable agent chat composition.</mui-heading>
                  <mui-body size="small">
                    The response now uses the prompt family as a coherent system: Prompt Message owns the message shell, Worker explains what happened, and Result presents reviewable output.
                  </mui-body>
                </mui-v-stack>

                <mui-v-stack space="var(--space-200)">
                  <mui-heading level="3" size="6">Changes</mui-heading>
                  <mui-list as="ul">
                    <mui-list-item size="small"><mui-code inline>mui-prompt-message</mui-code> frames assistant and user turns with alignment, width, header, body, and footer slots.</mui-list-item>
                    <mui-list-item size="small"><mui-code inline>mui-work-log</mui-code> provides the collapsible work summary for elapsed time and implementation notes.</mui-list-item>
                    <mui-list-item size="small"><mui-code inline>mui-result-bar</mui-code> turns generated files or reviewable edits into a consistent action row.</mui-list-item>
                    <mui-list-item size="small">Prompt previews stay attached to the composer so users can inspect context before submitting.</mui-list-item>
                  </mui-list>
                </mui-v-stack>

                <mui-result-bar>
                  <mui-avatar slot="accessory" label="Code" background="neutral">
                    <mui-icon-copy size="small"></mui-icon-copy>
                  </mui-avatar>
                  <mui-v-stack slot="start" space="0">
                    <mui-body size="small" weight="bold">Edited agent-chat/index.js</mui-body>
                    <mui-body size="x-small">Prompt family composition updated</mui-body>
                  </mui-v-stack>
                  <mui-button slot="actions" variant="tertiary" size="x-small">Undo</mui-button>
                  <mui-button slot="actions" variant="secondary" size="x-small">Review</mui-button>
                </mui-result-bar>

                <div slot="footer" class="response-actions" aria-label="Response actions">
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy response">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                  <mui-body variant="tertiary" size="x-small">18:40</mui-body>
                </div>
              </mui-prompt-message>

            </mui-v-stack>

            ${getComposer({ previews: true })}
          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
            &lt;mui-prompt-message size=&quot;medium&quot; variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log slot=&quot;header&quot; label=&quot;Worked for 4m 10s&quot; rule&gt;...work detail...&lt;/mui-work-log&gt;<br />
            &nbsp;&nbsp;&lt;mui-heading level=&quot;2&quot; size=&quot;6&quot;&gt;Built a reusable agent chat composition.&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&lt;mui-list as=&quot;ul&quot;&gt;...&lt;/mui-list&gt;<br />
            &nbsp;&nbsp;&lt;mui-result-bar&gt;...generated file result...&lt;/mui-result-bar&gt;<br />
            &nbsp;&nbsp;&lt;div slot=&quot;footer&quot;&gt;...copy and timestamp...&lt;/div&gt;<br />
            &lt;/mui-prompt-message&gt;<br /><br />
            &lt;mui-prompt enter-submit context-mode=&quot;icon&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-preview slot=&quot;preview&quot; clickable badge=&quot;MD&quot; ...&gt;&lt;/mui-prompt-preview&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-preview slot=&quot;preview&quot; clickable badge=&quot;JSON&quot; ...&gt;&lt;/mui-prompt-preview&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-toggle slot=&quot;actions&quot;&gt;...icon/chip...&lt;/mui-prompt-toggle&gt;<br />
            &lt;/mui-prompt&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Steer"
          description="A full agent page where the composer carries a compact, editable task context row above the prompt input."
          usage="Use slot='context' for composed task context, selected text, constraints, examples, or attachments.|||Keep the context row compact and truncated so it can stay attached to the composer.|||Use prompt-toggle in the actions slot for app-controlled context state such as Web, Files, or Canvas."
        >

          <mui-v-stack slot="body" class="chat-shell steering-page" space="var(--space-600)" alignX="stretch">
            <mui-v-stack space="var(--space-600)">
              <mui-prompt-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you tighten the release notes and make sure the prompt changes are clear before I publish?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">13:41</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-prompt-message>

              <mui-prompt-message size="medium" variant="ghost">
                <mui-work-log slot="header" label="Working for 31s" pending>
                  <mui-work-log label="Working for 31s" nested pending>
                    <mui-body size="x-small" variant="tertiary">Checking the release note wording against prompt component changes.</mui-body>
                  </mui-work-log>
                  <mui-work-log label="Read 4 files" nested>
                    <mui-body size="x-small" variant="tertiary">Reviewed Prompt, Worker, Agent Chat story, and changelog.</mui-body>
                  </mui-work-log>
                </mui-work-log>

                <mui-v-stack space="var(--space-200)">
                  <mui-heading level="2" size="6">I can tighten this before release.</mui-heading>
                  <mui-body size="small">
                    The task context below stays attached to the composer, so the follow-up can preserve the same release scope without repeating the full request.
                  </mui-body>
                </mui-v-stack>
              </mui-prompt-message>
            </mui-v-stack>

            ${getComposer({
              placeholder: "Ask for follow-up changes...",
              context: true,
              simpleActions: true,
            })}
          </mui-v-stack>


          <story-code-block slot="footer" scrollable>
            &lt;mui-v-stack class=&quot;steering-page&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-message align=&quot;end&quot;&gt;...user request...&lt;/mui-prompt-message&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-message variant=&quot;ghost&quot;&gt;...agent response...&lt;/mui-prompt-message&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt enter-submit context-mode=&quot;icon&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-context-bar slot=&quot;context&quot;&gt;...active task and actions...&lt;/mui-context-bar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-prompt-toggle slot=&quot;actions&quot;&gt;...web context toggle...&lt;/mui-prompt-toggle&gt;<br />
            &nbsp;&nbsp;&lt;/mui-prompt&gt;<br />
            &lt;/mui-v-stack&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Thinking"
          description="A response state where the agent is still processing and only the top-level work status is visible."
          usage="Use pending on Worker for active thinking states.|||Omit rule when the work status should sit as a quiet top-level status without a divider."
        >
          <mui-v-stack class="chat-shell" space="var(--space-600)" alignX="stretch" slot="body">
            <mui-v-stack space="var(--space-600)">
              <mui-prompt-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">Can you audit the release notes before I publish?</mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">13:57</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-prompt-message>

              <mui-prompt-message size="medium" variant="ghost">
                <mui-work-log slot="header" label="Thinking..." status pending></mui-work-log>
              </mui-prompt-message>
            </mui-v-stack>

            ${getComposer()}
          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
            &lt;mui-prompt-message variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log slot=&quot;header&quot; label=&quot;Thinking...&quot; status pending&gt;&lt;/mui-work-log&gt;<br />
            &lt;/mui-prompt-message&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Working"
          description="A response state where the top-level work row contains nested execution detail such as elapsed work and files read."
          usage="Nest Worker rows to show secondary execution detail inside the parent disclosure.|||Use pending on nested rows that are still in progress.|||Keep nested rows compact so the response body remains the main content."
        >
          <mui-v-stack slot="body" class="chat-shell" space="var(--space-600)" alignX="stretch">
            <mui-v-stack space="var(--space-600)">
              <mui-prompt-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you turn the agent chat example into a real composition using Prompt Message, Worker, Result, previews, and the prompt composer?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">18:33</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-prompt-message>

              <mui-prompt-message size="medium" variant="ghost">
                <mui-work-log slot="header" label="Working for 4s" pending>
                  <mui-work-log label="Read 4 files">
                    <mui-body size="x-small" variant="tertiary">Checked Prompt, Worker, Agent Chat, and changelog sources.</mui-body>
                  </mui-work-log>
                  <mui-work-log label="Updating docs" pending>
                    <mui-body size="x-small" variant="tertiary">Refreshing API metadata and examples for release review.</mui-body>
                  </mui-work-log>
                </mui-work-log>
              </mui-prompt-message>

              </mui-v-stack>

              ${getComposer()}
          </mui-v-stack>
              

          <story-code-block slot="footer" scrollable>
            &lt;mui-prompt-message variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log slot=&quot;header&quot; label=&quot;Working for 31s&quot; pending&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log label=&quot;Read 4 files&quot;&gt;...&lt;/mui-work-log&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log label=&quot;Updating docs&quot; pending&gt;...&lt;/mui-work-log&gt;<br />
            &nbsp;&nbsp;&lt;/mui-work-log&gt;<br />
            &lt;/mui-prompt-message&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    const latestMessage = shadowRoot.querySelector("#agentChatLatestMessage");
    if (latestMessage) {
      latestMessage.setAttribute("footer-visibility", "always");
    }
  }
}

customElements.define("comp-agent-chat", CompAgentChat);
