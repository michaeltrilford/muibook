class compAgentUI extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { 
        display: block;
      }
    `;

    const AgentPrompt = /*html*/ `

      <style>
        .prompt-input { 
          padding: var(--space-400);
          padding-bottom: var(--space-200);
          background: var(--surface-elevated-100);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
        }

        .prompt-toolbar::part(justify-content) {
          justify-content: space-between;
        }
      </style>

      <mui-v-stack class="prompt-input" space="var(--space-200)">
        <mui-input label="Default" hide-label placeholder="Reply to Mui..."></mui-input>
        <mui-h-stack class="prompt-toolbar" space="var(--space-200)">
          <mui-h-stack space="var(--space-000)">
            <mui-button variant="tertiary">
              <mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar>
            </mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-200)">
            <mui-button variant="tertiary" id="submitBtn">
              <mui-icon-toggle id="toggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
        </mui-h-stack>
      </mui-v-stack>

    `;

    const AgentConversationReply = /*html*/ `
      <style>
        mui-grid {
          background: var(--surface-elevated-100);
          padding: var(--space-400);
          width: 100%;
          box-sizing: border-box;
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
        }
        mui-grid::part(display) {
          align-items: center;
        }
      </style> 
      <mui-grid col="auto 1fr" space="var(--space-400)">
        <mui-avatar label="Michael Trilford" background="neutral"></mui-avatar>
        <mui-body size="small">Can you provide me with the CSAT data for the past quarter, broken down by feature area, and highlight any pain points mentioned in customer feedback?</mui-body>
      </mui-grid>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Agent UI"
        description="
          Creating compositions provide the Design 
          System a view of how the system is working and 
          where it needs flexibility.
        "
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/agent-ui/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-agentui--docs"
      >

        <story-card 
          title="Prompt Input" 
          description="
            A dark mode–ready language model prompt built from flexible system blocks."
          >
          <div slot="body">
            ${AgentPrompt}
          </div>
          <story-code-block slot="footer">
            <br />
            <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/semantic-design-tokens">Surface Tokens</mui-link></mui-body>
            <br />
            /* =================================== */
            <br />
            <br />
            mui-button::part(background):hover {
            <br />
            &nbsp;&nbsp;background: var(--surface-recessed-alpha);
            <br />
            }
            <br />
            <br />
            .prompt-input {
            <br />
            &nbsp;&nbsp;background: var(--surface-elevated-alpha);
            <br />
            &nbsp;&nbsp;border-color: var(--form-default-border-color);
            <br />
            &nbsp;&nbsp;...
            <br />
            }
          </story-code-block>
        </story-card>

        <story-card title="Conversation Bubble" description="A dark mode–ready conversation bubble built from flexible system blocks.">
          <div slot="body">
            ${AgentConversationReply}
          </div>
          <story-code-block slot="footer">
            <br />
            <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/semantic-design-tokens">Surface Tokens</mui-link></mui-body>
            <br />
            /* =================================== */
            <br />
            <br />
            .conversation-background {
            <br />
            &nbsp;&nbsp;background: var(--surface);
            <br />
            &nbsp;&nbsp;...
            <br />
            }
            <br />
            <br />
            .conversation-reply {
            <br />
            &nbsp;&nbsp;background: var(--surface-elevated-alpha);
            <br />
            &nbsp;&nbsp;border: var(--border-thin);
            <br />
            &nbsp;&nbsp;...
            <br />
            }
          </story-code-block>
        </story-card>

      </story-template>
    `;

    const submitBtn = shadowRoot.querySelector("#submitBtn");
    const toggle = submitBtn?.querySelector("mui-icon-toggle");

    submitBtn?.addEventListener("click", () => {
      toggle.toggle = !toggle.toggle;
      toggle.setAttribute("aria-pressed", toggle.toggle);
    });
  }
}

customElements.define("comp-agent-ui", compAgentUI);
