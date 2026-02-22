class compAgentUI extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { 
        display: block;
      }
    `;

    const Prompt = /*html*/ `

      <style>
        .prompt-input {
          width: 100%;
        }
      </style>

      <mui-prompt class="prompt-input" id="agentPrompt" placeholder="Reply to Mui..." enter-submit>
        <mui-h-stack slot="actions" space="var(--space-200)">
          <mui-h-stack space="var(--space-000)" aligny="center">
            <mui-button variant="tertiary">
              <mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar>
            </mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-200)" aligny="center">
            <mui-button variant="tertiary" id="submitBtn">
              <mui-icon-toggle id="toggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-h-stack>
        </mui-h-stack>
      </mui-prompt>

    `;

    const PromptMessage = /*html*/ `
      <mui-prompt-message>
        <mui-avatar slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
        <mui-body size="small">Can you provide me with the CSAT data for the past quarter, broken down by feature area, and highlight any pain points mentioned in customer feedback?</mui-body>
      </mui-prompt-message>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Agent UI"
        description="
          Compositions validate real-world flows, while reusable primitives
          (Prompt and Prompt Message) capture shared interaction patterns.
        "
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/agent-ui/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-agentui--docs"
      >

        <story-card 
          title="Prompt Input" 
          description="
            A dark mode–ready language model prompt built from reusable components with Enter-to-submit."
          >
          <div slot="body">
            ${Prompt}
          </div>
          <story-code-block slot="footer">
            <br />
            <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/semantic-design-tokens">Surface Tokens</mui-link></mui-body>
            <br />
            /* =================================== */
            <br />
            <br />
            &lt;mui-prompt enter-submit&gt;...&lt;/mui-prompt&gt;
            <br />
            /* Enter submits. Shift+Enter creates a newline. */
            <br />
          </story-code-block>
        </story-card>

        <story-card title="Conversation Bubble" description="A dark mode–ready conversation bubble built from reusable components.">
          <div slot="body">
            ${PromptMessage}
          </div>
          <story-code-block slot="footer">
            <br />
            <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/semantic-design-tokens">Surface Tokens</mui-link></mui-body>
            <br />
            /* =================================== */
            <br />
            <br />
            &lt;mui-prompt-message&gt;...&lt;/mui-prompt-message&gt;
          </story-code-block>
        </story-card>

      </story-template>
    `;

    const submitBtn = shadowRoot.querySelector("#submitBtn");
    const toggle = submitBtn?.querySelector("mui-icon-toggle");
    const prompt = shadowRoot.querySelector("#agentPrompt");
    const setToggleState = () => {
      if (!toggle) return;
      toggle.toggle = !toggle.toggle;
      toggle.setAttribute("aria-pressed", toggle.toggle);
    };

    submitBtn?.addEventListener("click", () => {
      setToggleState();
    });

    prompt?.addEventListener("submit", () => {
      setToggleState();
    });
  }
}

customElements.define("comp-agent-ui", compAgentUI);
