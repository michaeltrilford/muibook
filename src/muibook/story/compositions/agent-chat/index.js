import { compositionStories } from "../../../../knowledge/compositions";

class CompAgentChat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const compositionDoc = compositionStories.agentChat;
    const storyItems = compositionDoc?.stories?.items;
    if (!storyItems?.length) {
      shadowRoot.innerHTML = `<story-metadata-empty component="Agent Chat" source="src/knowledge/compositions.ts" command=""></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );
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
          <mui-preview-chip
            slot="preview"
            clickable
            badge="MD"
            animated
            value="Review the agent chat response, tighten the content hierarchy, and keep the prompt components reusable."
          ></mui-preview-chip>
          <mui-preview-chip
            slot="preview"
            clickable
            badge="JSON"
            value='{"story":"agent-chat","components":["mui-chat-message","mui-work-log","mui-result-bar","mui-preview-chip","mui-action-toggle"],"status":"draft"}'
          ></mui-preview-chip>
        `
            : ""
        }
        ${
          options.context
            ? /*html*/ `
          <mui-context-bar slot="context-above">
            <mui-body size="x-small" style="margin-inline-start: var(--space-300);">
              Tighten release notes for prompt context, action bars, and agent chat story before publishing
            </mui-body>
            <mui-button slot="actions" variant="tertiary" size="x-small" onclick="event.stopPropagation()">
              Steer
            </mui-button>
            <mui-dropdown slot="actions" position="right" style="--menu-min-width: 9rem;" size="x-small">
              <mui-button variant="tertiary" slot="action" size="x-small" icon-only aria-label="More">
                <mui-icon-ellipsis size="x-small"></mui-icon-ellipsis>
              </mui-button>
              <mui-menu>
                <mui-button size="x-small" variant="tertiary">Edit</mui-button>
                <mui-button size="x-small" variant="tertiary">Delete</mui-button>
              </mui-menu>
            </mui-dropdown>
          </mui-context-bar>
        `
            : ""
        }

        ${
          options.simpleActions
            ? /*html*/ `
          <mui-action-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" size="small" aria-label="Toggle web context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-chip context-chip dismiss size="small" hidden>Web</mui-chip>
          </mui-action-toggle>

          <mui-button slot="actions" variant="tertiary" size="small" aria-label="Attach files">
            <mui-icon-add size="small"></mui-icon-add>
          </mui-button>
        `
            : /*html*/ `
          <mui-dropdown slot="actions" position="left" vertical-position="up" size="small">
            <mui-button slot="action" variant="tertiary" icon-only size="small" aria-label="Attach context">
              <mui-icon-add size="small"></mui-icon-add>
            </mui-button>
            <mui-menu>
              <mui-button variant="tertiary" size="small">Attach File</mui-button>
              <mui-button variant="tertiary" size="small">Add Screenshot</mui-button>
              <mui-button variant="tertiary" size="small">Paste JSON</mui-button>
            </mui-menu>
          </mui-dropdown>

          <mui-action-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle web context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-chip context-chip dismiss size="small" hidden>Web</mui-chip>
          </mui-action-toggle>

          <mui-dropdown slot="actions" position="right" vertical-position="up" size="small">
            <mui-button slot="action" variant="tertiary" size="small">
              MPT-4
              <mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>
            </mui-button>
            <mui-menu>
              <mui-button variant="tertiary" size="small">MPT-4</mui-button>
              <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
              <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
            </mui-menu>
          </mui-dropdown>
        `
        }
      </mui-prompt>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${compositionDoc.title}"
        description="${compositionDoc.description}"
        github="${compositionDoc.github}"
        storybook="${compositionDoc.storybook}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        <story-card
          id="agent-chat"
          title="${storyMeta["agent-chat"].title}"
          description="${storyMeta["agent-chat"].description}"
          usage="${storyMeta["agent-chat"].usage}"
        >

          <mui-v-stack slot="body" class="chat-shell" space="var(--space-600)" alignX="stretch">
            <mui-v-stack space="var(--space-300)">

              <mui-chat-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you turn the agent chat example into a real composition using Chat Message, Worker, Result, previews, and the prompt composer?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">18:33</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-chat-message>

              <mui-chat-message id="agentChatLatestMessage" size="medium" variant="ghost">
                <mui-work-log slot="header" label="Worked for 4m 10s" rule>
                  <mui-list>
                    <mui-list-item size="x-small" variant="tertiary">Reviewed the prompt component APIs and AI & LLM navigation.</mui-list-item>
                    <mui-list-item size="x-small" variant="tertiary">Replaced one-off response markup with dedicated prompt components.</mui-list-item>
                    <mui-list-item size="x-small" variant="tertiary">Checked the composition against the Chat Message body rhythm.</mui-list-item>
                  </mui-list>
                </mui-work-log>

                <mui-v-stack space="var(--space-200)">
                  <mui-heading level="2" size="6">Built a reusable agent chat composition.</mui-heading>
                  <mui-body size="small">
                    The response now uses the prompt family as a coherent system: Chat Message owns the message shell, Worker explains what happened, and Result presents reviewable output.
                  </mui-body>
                </mui-v-stack>

                <mui-v-stack space="var(--space-200)">
                  <mui-heading level="3" size="6">Changes</mui-heading>
                  <mui-list as="ul">
                    <mui-list-item size="small"><mui-code inline>mui-chat-message</mui-code> frames assistant and user turns with alignment, width, header, body, and footer slots.</mui-list-item>
                    <mui-list-item size="small"><mui-code inline>mui-work-log</mui-code> provides the collapsible work summary for elapsed time and implementation notes.</mui-list-item>
                    <mui-list-item size="small"><mui-code inline>mui-result-bar</mui-code> turns generated files or reviewable edits into a consistent action row.</mui-list-item>
                    <mui-list-item size="small">Prompt previews stay attached to the composer so users can inspect context before submitting.</mui-list-item>
                  </mui-list>
                </mui-v-stack>

                <mui-result-bar variant="accordion" label="Edited 4 files" rule open>
                  <mui-h-stack slot="after-label" alignY="center" space="var(--space-100)">
                    <mui-body size="x-small" weight="regular" variant="positive">+251</mui-body>
                    <mui-body size="x-small" weight="regular" variant="attention">-14</mui-body>
                  </mui-h-stack>
                  <mui-button slot="actions" variant="tertiary" size="x-small">Undo</mui-button>
                  <mui-button slot="actions" variant="secondary" size="x-small">Review</mui-button>

                  <div slot="content">
                    <mui-file-diff
                      filename="index.js"
                      filepath="src/muibook/story/compositions/agent-chat/"
                      additions="+142"
                      deletions="-8"
                    >
                      <mui-file-icon slot="icon" icon="javascript"></mui-file-icon>
                    </mui-file-diff>
                    <mui-file-diff
                      filename="index.ts"
                      filepath="src/components/mui-chat-message/"
                      additions="+44"
                      deletions="-2"
                    >
                      <mui-file-icon slot="icon" icon="typescript"></mui-file-icon>
                    </mui-file-diff>
                    <mui-file-diff
                      filename="index.ts"
                      filepath="src/components/mui-work-log/"
                      additions="+38"
                      deletions="-3"
                    >
                      <mui-file-icon slot="icon" icon="typescript"></mui-file-icon>
                    </mui-file-diff>
                    <mui-file-diff
                      filename="index.ts"
                      filepath="src/components/mui-result-bar/"
                      additions="+27"
                      deletions="-1"
                    >
                      <mui-file-icon slot="icon" icon="typescript"></mui-file-icon>
                    </mui-file-diff>
                  </div>
                </mui-result-bar>

                <div slot="footer" class="response-actions" aria-label="Response actions">
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy response">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                  <mui-body variant="tertiary" size="x-small">18:40</mui-body>
                </div>
              </mui-chat-message>

            </mui-v-stack>

            ${getComposer({ previews: true })}
          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
            &lt;mui-chat-message size=&quot;medium&quot; variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log slot=&quot;header&quot; label=&quot;Worked for 4m 10s&quot; rule&gt;...work detail...&lt;/mui-work-log&gt;<br />
            &nbsp;&nbsp;&lt;mui-heading level=&quot;2&quot; size=&quot;6&quot;&gt;Built a reusable agent chat composition.&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&lt;mui-list as=&quot;ul&quot;&gt;...&lt;/mui-list&gt;<br />
            &nbsp;&nbsp;&lt;mui-result-bar variant=&quot;accordion&quot; label=&quot;Edited 4 files&quot; rule open&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot=&quot;after-label&quot; alignY=&quot;center&quot; space=&quot;var(--space-100)&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot; variant=&quot;positive&quot;&gt;+251&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot; variant=&quot;attention&quot;&gt;-14&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot=&quot;actions&quot; variant=&quot;tertiary&quot; size=&quot;x-small&quot;&gt;Undo&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot=&quot;actions&quot; variant=&quot;secondary&quot; size=&quot;x-small&quot;&gt;Review&lt;/mui-button&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot=&quot;content&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename=&quot;index.js&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath=&quot;src/muibook/story/compositions/agent-chat/&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions=&quot;+142&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions=&quot;-8&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;icon&quot; icon=&quot;javascript&quot;&gt;&lt;/mui-file-icon&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename=&quot;index.ts&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath=&quot;src/components/mui-chat-message/&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions=&quot;+44&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions=&quot;-2&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;icon&quot; icon=&quot;typescript&quot;&gt;&lt;/mui-file-icon&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename=&quot;index.ts&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath=&quot;src/components/mui-work-log/&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions=&quot;+38&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions=&quot;-3&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;icon&quot; icon=&quot;typescript&quot;&gt;&lt;/mui-file-icon&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename=&quot;index.ts&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath=&quot;src/components/mui-result-bar/&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions=&quot;+27&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions=&quot;-1&quot;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon slot=&quot;icon&quot; icon=&quot;typescript&quot;&gt;&lt;/mui-file-icon&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
            &nbsp;&nbsp;&lt;/mui-result-bar&gt;<br />
            &nbsp;&nbsp;&lt;div slot=&quot;footer&quot;&gt;...copy and timestamp...&lt;/div&gt;<br />
            &lt;/mui-chat-message&gt;<br /><br />
            &lt;mui-prompt enter-submit context-mode=&quot;icon&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-preview-chip slot=&quot;preview&quot; clickable badge=&quot;MD&quot; ...&gt;&lt;/mui-preview-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-preview-chip slot=&quot;preview&quot; clickable badge=&quot;JSON&quot; ...&gt;&lt;/mui-preview-chip&gt;<br />
            &nbsp;&nbsp;&lt;mui-action-toggle slot=&quot;actions&quot;&gt;...icon/chip...&lt;/mui-action-toggle&gt;<br />
            &lt;/mui-prompt&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="steer"
          title="${storyMeta["steer"].title}"
          description="${storyMeta["steer"].description}"
          usage="${storyMeta["steer"].usage}"
        >

          <mui-v-stack slot="body" class="chat-shell steering-page" space="var(--space-600)" alignX="stretch">
            <mui-v-stack space="var(--space-300)">
              <mui-chat-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you tighten the release notes and make sure the prompt changes are clear before I publish?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">13:41</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-chat-message>

              <mui-chat-message size="medium" variant="ghost">
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
              </mui-chat-message>
            </mui-v-stack>

            ${getComposer({
              placeholder: "Ask for follow-up changes...",
              context: true,
              simpleActions: true,
            })}
          </mui-v-stack>


          <story-code-block slot="footer" scrollable>
            &lt;mui-v-stack class=&quot;steering-page&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-chat-message align=&quot;end&quot;&gt;...user request...&lt;/mui-chat-message&gt;<br />
            &nbsp;&nbsp;&lt;mui-chat-message variant=&quot;ghost&quot;&gt;...agent response...&lt;/mui-chat-message&gt;<br />
            &nbsp;&nbsp;&lt;mui-prompt enter-submit context-mode=&quot;icon&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-context-bar slot=&quot;context-above&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;x-small&quot; style=&quot;margin-inline-start: var(--space-300);&quot;&gt;...active task...&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-context-bar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-action-toggle slot=&quot;actions&quot;&gt;...web context toggle...&lt;/mui-action-toggle&gt;<br />
            &nbsp;&nbsp;&lt;/mui-prompt&gt;<br />
            &lt;/mui-v-stack&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="thinking"
          title="${storyMeta["thinking"].title}"
          description="${storyMeta["thinking"].description}"
          usage="${storyMeta["thinking"].usage}"
        >
          <mui-v-stack class="chat-shell" space="var(--space-600)" alignX="stretch" slot="body">
            <mui-v-stack space="var(--space-300)">
              <mui-chat-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">Can you audit the release notes before I publish?</mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">13:57</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-chat-message>

              <mui-chat-message size="medium" variant="ghost">
                <mui-work-log slot="header" label="Thinking..." status pending></mui-work-log>
              </mui-chat-message>
            </mui-v-stack>

            ${getComposer()}
          </mui-v-stack>

          <story-code-block slot="footer" scrollable>
            &lt;mui-chat-message variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log slot=&quot;header&quot; label=&quot;Thinking...&quot; status pending&gt;&lt;/mui-work-log&gt;<br />
            &lt;/mui-chat-message&gt;
          </story-code-block>
        </story-card>

        <story-card
          id="working"
          title="${storyMeta["working"].title}"
          description="${storyMeta["working"].description}"
          usage="${storyMeta["working"].usage}"
        >
          <mui-v-stack slot="body" class="chat-shell" space="var(--space-600)" alignX="stretch">
            <mui-v-stack space="var(--space-600)">
              <mui-chat-message size="medium" align="end" width="medium" footer-position="outside">
                <mui-body size="medium">
                  Can you turn the agent chat example into a real composition using Chat Message, Worker, Result, previews, and the prompt composer?
                </mui-body>
                <div slot="footer" class="response-actions" aria-label="Prompt actions">
                  <mui-body variant="tertiary" size="x-small">18:33</mui-body>
                  <mui-button variant="tertiary" size="x-small" icon-only aria-label="Copy prompt">
                    <mui-icon-copy size="x-small"></mui-icon-copy>
                  </mui-button>
                </div>
              </mui-chat-message>

              <mui-chat-message size="medium" variant="ghost">
                <mui-work-log slot="header" label="Working for 4s" pending>
                  <mui-work-log label="Read 4 files">
                    <mui-body size="x-small" variant="tertiary">Checked Prompt, Worker, Agent Chat, and changelog sources.</mui-body>
                  </mui-work-log>
                  <mui-work-log label="Updating docs" pending>
                    <mui-body size="x-small" variant="tertiary">Refreshing API metadata and examples for release review.</mui-body>
                  </mui-work-log>
                </mui-work-log>
              </mui-chat-message>

              </mui-v-stack>

              ${getComposer()}
          </mui-v-stack>


          <story-code-block slot="footer" scrollable>
            &lt;mui-chat-message variant=&quot;ghost&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log slot=&quot;header&quot; label=&quot;Working for 31s&quot; pending&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log label=&quot;Read 4 files&quot;&gt;...&lt;/mui-work-log&gt;<br />
            &nbsp;&nbsp;&lt;mui-work-log label=&quot;Updating docs&quot; pending&gt;...&lt;/mui-work-log&gt;<br />
            &nbsp;&nbsp;&lt;/mui-work-log&gt;<br />
            &lt;/mui-chat-message&gt;
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
