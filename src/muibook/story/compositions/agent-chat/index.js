class CompAgentChat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host {
        display: block;
      }

      .canvas {
        background: var(--surface);
        padding: var(--space-400);
        margin: calc(var(--space-400) * -1);
      }

      .chat-shell {
        max-width: 78rem;
        margin: 0 auto;
        padding-block: var(--space-700);
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

        .context-task {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: var(--space-300);
          min-width: 0;
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
          <div class="canvas" slot="body">
            <mui-v-stack class="chat-shell" space="var(--space-600)" alignX="stretch">
              <mui-v-stack space="var(--space-600)">

                <mui-prompt-message size="medium" align="end" width="medium" footer-position="outside">
                  <mui-body size="medium">
                    Can you turn the agent chat example into a real composition using Prompt Message, Prompt Work, Prompt Result, previews, and the prompt composer?
                  </mui-body>
                  <div slot="footer" class="response-actions" aria-label="Prompt actions">
                    <mui-body variant="tertiary" size="x-small">18:33</mui-body>
                    <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                      <mui-icon-copy size="x-small"></mui-icon-copy>
                    </mui-button>
                  </div>
                </mui-prompt-message>

                <mui-prompt-message id="agentChatLatestMessage" size="medium" variant="ghost">
                  <mui-prompt-work slot="header" label="Worked for 4m 10s" rule>
                    <mui-body size="x-small" variant="tertiary">Reviewed the prompt component APIs and AI & LLM navigation.</mui-body>
                    <mui-body size="x-small" variant="tertiary">Replaced one-off response markup with dedicated prompt components.</mui-body>
                    <mui-body size="x-small" variant="tertiary">Checked the composition against the Prompt Message body rhythm.</mui-body>
                  </mui-prompt-work>

                  <mui-v-stack space="var(--space-200)">
                    <mui-heading level="2" size="6">Built a reusable agent chat composition.</mui-heading>
                    <mui-body size="small">
                      The response now uses the prompt family as a coherent system: Prompt Message owns the message shell, Prompt Work explains what happened, and Prompt Result presents reviewable output.
                    </mui-body>
                  </mui-v-stack>

                  <mui-v-stack space="var(--space-200)">
                    <mui-heading level="3" size="6">Changes</mui-heading>
                    <mui-list as="ul">
                      <mui-list-item size="small"><mui-code inline>mui-prompt-message</mui-code> frames assistant and user turns with alignment, width, header, body, and footer slots.</mui-list-item>
                      <mui-list-item size="small"><mui-code inline>mui-prompt-work</mui-code> provides the collapsible work summary for elapsed time and implementation notes.</mui-list-item>
                      <mui-list-item size="small"><mui-code inline>mui-prompt-result</mui-code> turns generated files or reviewable edits into a consistent action row.</mui-list-item>
                      <mui-list-item size="small">Prompt previews stay attached to the composer so users can inspect context before submitting.</mui-list-item>
                    </mui-list>
                  </mui-v-stack>

                  <mui-prompt-result>
                    <mui-avatar slot="accessory" label="Code" background="neutral">
                      <mui-icon-copy size="small"></mui-icon-copy>
                    </mui-avatar>
                    <mui-v-stack slot="start" space="0">
                      <mui-body size="small" weight="bold">Edited agent-chat/index.js</mui-body>
                      <mui-body size="x-small">Prompt family composition updated</mui-body>
                    </mui-v-stack>
                    <mui-button slot="actions" variant="tertiary" size="x-small">Undo</mui-button>
                    <mui-button slot="actions" variant="secondary" size="x-small">Review</mui-button>
                  </mui-prompt-result>

                  <div slot="footer" class="response-actions" aria-label="Response actions">
                    <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy response">
                      <mui-icon-copy size="x-small"></mui-icon-copy>
                    </mui-button>
                    <mui-body variant="tertiary" size="x-small">18:40</mui-body>
                  </div>
                </mui-prompt-message>





              </mui-v-stack>

              <mui-prompt
                actions-fan
                preview-loading="auto"
                preview-loading-label="Resolving preview"
                placeholder="Ask the agent to refine the chat composition..."
                enter-submit
                context-mode="icon"
                color-top-start="var(--mui-brand-400)"
                color-top-mid="var(--blue-500)"
                color-top-end="var(--green-500)"
                color-top-accent="var(--orange-500)"
                style="--prompt-accent-primary: var(--mui-brand-400); --prompt-accent-secondary: var(--blue-500);"
              >
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
                  value='{"story":"agent-chat","components":["mui-prompt-message","mui-prompt-work","mui-prompt-result","mui-prompt-preview","mui-prompt-toggle"],"status":"draft"}'
                ></mui-prompt-preview>

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
              </mui-prompt>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-prompt-message size=&quot;medium&quot; variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-work slot=&quot;header&quot; label=&quot;Worked for 4m 10s&quot; rule&gt;...work detail...&lt;/mui-prompt-work&gt;<br />
            &nbsp;&nbsp;&lt;mui-heading level=&quot;2&quot; size=&quot;6&quot;&gt;Built a reusable agent chat composition.&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&lt;mui-list as=&quot;ul&quot;&gt;...&lt;/mui-list&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-result&gt;...generated file result...&lt;/mui-prompt-result&gt;<br />
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
          title="Task Context"
          description="A full agent page where the composer carries a compact, editable task context row above the prompt input."
          usage="Use slot='context' for composed task context, selected text, constraints, examples, or attachments.|||Keep the context row compact and truncated so it can stay attached to the composer.|||Use prompt-toggle in the actions slot for app-controlled context state such as Web, Files, or Canvas."
        >
          <div class="canvas" slot="body">
            <mui-v-stack class="chat-shell steering-page" space="var(--space-500)" alignX="stretch">
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
                  <mui-prompt-work slot="header" label="Working for 31s" pending>
                    <mui-prompt-work label="Working for 31s" nested pending>
                      <mui-body size="x-small" variant="tertiary">Checking the release note wording against prompt component changes.</mui-body>
                    </mui-prompt-work>
                    <mui-prompt-work label="Read 4 files" nested>
                      <mui-body size="x-small" variant="tertiary">Reviewed Prompt, Prompt Work, Agent Chat story, and changelog.</mui-body>
                    </mui-prompt-work>
                  </mui-prompt-work>

                  <mui-v-stack space="var(--space-200)">
                    <mui-heading level="2" size="6">I can tighten this before release.</mui-heading>
                    <mui-body size="small">
                      The task context below stays attached to the composer, so the follow-up can preserve the same release scope without repeating the full request.
                    </mui-body>
                  </mui-v-stack>
                </mui-prompt-message>
              </mui-v-stack>

              <mui-prompt
                actions-fan
                context-sheet-label="Task context"
                context-sheet-collapsed
                placeholder="Ask for follow-up changes..."
                enter-submit
                context-mode="icon"
                color-top-start="var(--mui-brand-400)"
                color-top-mid="var(--blue-500)"
                color-top-end="var(--green-500)"
                color-top-accent="var(--orange-500)"
                style="--prompt-accent-primary: var(--mui-brand-400); --prompt-accent-secondary: var(--blue-500);"
              >
                <div slot="context-summary" class="context-task">
                  <mui-h-stack class="context-task-title" alignY="center" space="var(--space-100)">
                    <mui-icon-right-chevron size="xx-small"></mui-icon-right-chevron>
                    <mui-body size="x-small">
                      Tighten release notes for prompt context sheet, action bars, and agent chat story before publishing
                    </mui-body>
                  </mui-h-stack>
                  <mui-h-stack aria-label="Task context actions" space="var(--space-000)">
                    <mui-button variant="tertiary" size="x-small" onclick="event.stopPropagation()">
                      Steer
                    </mui-button>
                    <mui-button variant="tertiary" size="x-small" aria-label="Remove task context" onclick="event.stopPropagation()">
                      <mui-icon-close size="x-small"></mui-icon-close>
                    </mui-button>
                    <mui-dropdown position="right">
                      <mui-button variant="tertiary" slot="action" size="x-small"><mui-icon-ellipsis size="x-small" class="mui-icon"></mui-icon-ellipsis></mui-button>
                      <mui-button size="x-small">Option one</mui-button>
                      <mui-button size="x-small">Option two</mui-button>
                    </mui-dropdown>
                  </mui-h-stack>
                </div>

                <mui-v-stack slot="context" space="var(--space-300)">
                  <mui-rule></mui-rule>
                  <mui-list>
                    <mui-list-item size="x-small" variant="tertiary">Source: public changelog and Agent Chat composition story.</mui-list-item>
                    <mui-list-item size="x-small" variant="tertiary">Keep the scope to wording, docs clarity, and release confidence.</mui-list-item>
                  </mui-list>
                </mui-v-stack>

                <mui-prompt-toggle slot="actions">
                  <mui-button context-toggle variant="tertiary" size="small" aria-label="Toggle web context">
                    <mui-icon-globe size="small"></mui-icon-globe>
                  </mui-button>
                  <mui-chip context-chip dismiss size="small" hidden>Web</mui-chip>
                </mui-prompt-toggle>

                <mui-button slot="actions" variant="tertiary" size="small" aria-label="Attach files">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
              </mui-prompt>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-v-stack class=&quot;steering-page&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-message align=&quot;end&quot;&gt;...user request...&lt;/mui-prompt-message&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-message variant=&quot;ghost&quot;&gt;...agent response...&lt;/mui-prompt-message&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt context-sheet-label=&quot;Task context&quot; enter-submit context-mode=&quot;icon&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;context-summary&quot; class=&quot;context-task&quot;&gt;...truncated task and actions...&lt;/div&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot=&quot;context&quot;&gt;...expanded task details...&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-prompt-toggle slot=&quot;actions&quot;&gt;...web context toggle...&lt;/mui-prompt-toggle&gt;<br />
            &nbsp;&nbsp;&lt;/mui-prompt&gt;<br />
            &lt;/mui-v-stack&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Thinking State"
          description="A response state where the agent is still processing and only the top-level work status is visible."
          usage="Use pending on Prompt Work for active thinking states.|||Omit rule when the work status should sit as a quiet top-level status without a divider."
        >
          <div class="canvas" slot="body">
            <mui-v-stack class="chat-shell" space="var(--space-600)" alignX="stretch">
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
                <mui-prompt-work slot="header" label="Thinking..." status pending></mui-prompt-work>
              </mui-prompt-message>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-prompt-message variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-work slot=&quot;header&quot; label=&quot;Thinking...&quot; status pending&gt;&lt;/mui-prompt-work&gt;<br />
            &lt;/mui-prompt-message&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Working Detail"
          description="A response state where the top-level work row contains nested execution detail such as elapsed work and files read."
          usage="Nest Prompt Work rows to show secondary execution detail inside the parent disclosure.|||Use pending on nested rows that are still in progress.|||Keep nested rows compact so the response body remains the main content."
        >
          <div class="canvas" slot="body">
            <mui-v-stack class="chat-shell" space="var(--space-600)" alignX="stretch">

              <mui-prompt-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you turn the agent chat example into a real composition using Prompt Message, Prompt Work, Prompt Result, previews, and the prompt composer?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">18:33</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-prompt-message>

              <mui-prompt-message size="medium" variant="ghost">
                <mui-prompt-work slot="header" label="Working for 4s" pending>
                  <mui-prompt-work label="Read 4 files">
                    <mui-body size="x-small" variant="tertiary">Checked Prompt, Prompt Work, Agent Chat, and changelog sources.</mui-body>
                  </mui-prompt-work>
                  <mui-prompt-work label="Updating docs" pending>
                    <mui-body size="x-small" variant="tertiary">Refreshing API metadata and examples for release review.</mui-body>
                  </mui-prompt-work>
                </mui-prompt-work>

              </mui-prompt-message>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-prompt-message variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-work slot=&quot;header&quot; label=&quot;Working for 31s&quot; pending&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-work label=&quot;Read 4 files&quot;&gt;...&lt;/mui-prompt-work&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt-work label=&quot;Updating docs&quot; pending&gt;...&lt;/mui-prompt-work&gt;<br />
            &nbsp;&nbsp;&lt;/mui-prompt-work&gt;<br />
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
