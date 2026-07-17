import { getComponentDocs } from "../../../utils/story-data";

class StoryPrompt extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Prompt");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Prompt"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-prompt",
        parentAttrs: ["has-actions", "has-extra-actions", "has-error"],
        childAttrs: [],
      },
    ]);

    const stories = /*html*/ `
      <story-api-types tag="mui-prompt" title="Prompt"></story-api-types>

      <story-card
        id="preview-data"
        title="${storyMeta["preview-data"].title}"
        description="${storyMeta["preview-data"].description || ""}"
        usage="${storyMeta["preview-data"].usage}"
      > (containing [context-toggle] and [context-chip]) to switch toolbar state from app logic.|||Theme the hover/focus mesh using --prompt-accent-primary and optional --prompt-accent-secondary.|||React expectation: keep value controlled, then map CustomEvent handlers to state updates."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            preview-loading="auto"
            preview-loading-label="Resolving preview"
            id="agentDataPrompt"
            placeholder="Paste, click preview, or submit..."
            enter-submit

            context-mode="icon"
            color-top-start="var(--mui-brand-400)"
            color-top-mid="var(--blue-500)"
            color-top-end="var(--green-500)"
            color-top-accent="var(--orange-500)"
            style="--prompt-accent-primary: var(--mui-brand-400); --prompt-accent-secondary: var(--blue-500);"
          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="JSON"
              animated
              value='{"source":"docs","intent":"summarise","scope":"release-notes"}'
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>


            <mui-dropdown slot="actions" position="left" vertical-position="up" size="small">
              <mui-button slot="action" variant="tertiary" icon-only size="small">
                <mui-icon-add size="small"></mui-icon-add>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-menu>
            </mui-dropdown>
            <mui-action-toggle slot="actions">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-globe size="small"></mui-icon-globe>
              </mui-button>
              <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
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
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt<br />
          &nbsp;&nbsp;          &nbsp;&nbsp;enter-submit<br />
          &nbsp;&nbsp;preview-loading="auto"<br />
          &nbsp;&nbsp;preview-loading-label="Resolving preview"<br />
          &nbsp;&nbsp;color-top-start="var(--mui-brand-400)"<br />
          &nbsp;&nbsp;color-top-mid="var(--blue-500)"<br />
          &nbsp;&nbsp;color-top-end="var(--green-500)"<br />
          &nbsp;&nbsp;color-top-accent="var(--orange-500)"<br />
          &nbsp;&nbsp;style="--prompt-accent-primary: var(--mui-brand-400); --prompt-accent-secondary: var(--blue-500);"&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" clickable badge="JSON" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />

          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;<br />
          <br />
          prompt.addEventListener("prompt-paste", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail.items);<br />
          });<br />
          prompt.addEventListener("preview-chip-open", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail);<br />
          });<br />
          prompt.addEventListener("prompt-context-change", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail.mode); // icon | chip<br />
          });<br />
        </story-code-block>
      </story-card>

      <story-card
        id="context"
        title="${storyMeta["context"].title}"
        description="${storyMeta["context"].description || ""}"
        usage="${storyMeta["context"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            debug
            id="promptContextDemo"
            placeholder="Ask for follow-up changes..."
            enter-submit
            context-mode="icon"
          >
            <mui-context-bar slot="context-above">
              <mui-body size="x-small" weight="regular" variant="default" style="margin-inline-start: var(--space-300);">
                Tighten release notes for prompt context, action bars, and agent chat story before publishing
              </mui-body>
              <mui-button slot="actions" variant="tertiary" size="x-small">Steer</mui-button>
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
            <mui-action-toggle slot="actions">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-globe size="small"></mui-icon-globe>
              </mui-button>
              <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
            </mui-action-toggle>
          </mui-prompt>        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt&gt;<br />
          &nbsp;&nbsp;&lt;mui-context-bar slot="context-above"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" style="margin-inline-start: var(--space-300);"&gt;...active context...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;/mui-context-bar&gt;<br />
          &lt;/mui-prompt&gt;<br />
        </story-code-block>
      </story-card>

      <story-card
        id="default"
        title="${storyMeta["default"].title}"
        description="${storyMeta["default"].description || ""}"
        usage="${storyMeta["default"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-100)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="promptDemo"
            placeholder="Reply to Mui..."
            enter-submit

            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                  <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up" size="small">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary" size="small">MPT-4</mui-button>
                <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
                <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
              </mui-menu>
            </mui-dropdown>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt placeholder="Reply to Mui..." enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />

          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions" vertical-position="up"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit control<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="glowing-ring"
        title="${storyMeta["glowing-ring"].title}"
        description="${storyMeta["glowing-ring"].description || ""}"
        usage="${storyMeta["glowing-ring"].usage}"
      >
        <mui-grid slot="body" col="1fr" space="var(--space-200)">
          <div class="prompt-story-shell">
            <mui-v-stack style="width: 100%; --stack-height: auto; --stack-width: auto;" space="var(--space-400)">
              <mui-heading size="6">Default</mui-heading>
              <mui-prompt ring placeholder="Type at least 5 characters..." context-mode="icon"></mui-prompt>
            </mui-v-stack>
          </div>

          <div class="prompt-story-shell">
            <mui-v-stack style="width: 100%; --stack-height: auto; --stack-width: auto;" space="var(--space-400)">
              <mui-heading size="6">Ring Start: Primary</mui-heading>
              <mui-prompt ring ring-start="var(--prompt-ring-primary)" placeholder="Type at least 5 characters..." context-mode="icon"></mui-prompt>
            </mui-v-stack>
          </div>

          <div class="prompt-story-shell">
            <mui-v-stack style="width: 100%; --stack-height: auto; --stack-width: auto;" space="var(--space-400)">
              <mui-heading size="6">Ring Start: Secondary</mui-heading>
              <mui-prompt ring ring-start="var(--prompt-ring-secondary)" placeholder="Type at least 5 characters..." context-mode="icon"></mui-prompt>
            </mui-v-stack>
          </div>

          <div class="prompt-story-shell">
            <mui-v-stack style="width: 100%; --stack-height: auto; --stack-width: auto;" space="var(--space-400)">
              <mui-heading size="6">Ring Start: Tertiary</mui-heading>
              <mui-prompt ring ring-start="var(--prompt-ring-tertiary)" placeholder="Type at least 5 characters..." context-mode="icon"></mui-prompt>
            </mui-v-stack>
          </div>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt ring placeholder="Type at least 5 characters..."&gt;&lt;/mui-prompt&gt;<br />
          &lt;mui-prompt ring ring-start="var(--prompt-ring-primary)" placeholder="Type at least 5 characters..."&gt;&lt;/mui-prompt&gt;<br />
          &lt;mui-prompt ring ring-start="var(--prompt-ring-secondary)" placeholder="Type at least 5 characters..."&gt;&lt;/mui-prompt&gt;<br />
          &lt;mui-prompt ring ring-start="var(--prompt-ring-tertiary)" placeholder="Type at least 5 characters..."&gt;&lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="submit-guard-api"
        title="${storyMeta["submit-guard-api"].title}"
        description="${storyMeta["submit-guard-api"].description || ""}"
        usage="${storyMeta["submit-guard-api"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="promptApiGuard"
            placeholder="Type at least 5 characters..."
            enter-submit

            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size="small">Upload Photo</mui-button>
                  <mui-button variant="tertiary" size="small">Take Photo</mui-button>
                  <mui-button variant="tertiary" size="small">Upload File</mui-button>
                  <mui-button variant="tertiary" size="small">Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up" size="small">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary" size="small">MPT-4</mui-button>
                <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
                <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
              </mui-menu>
            </mui-dropdown>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptApiSubmitMethodBtn" size="xx-small" variant="secondary">Call submit()</mui-button>
            <mui-button id="promptApiClearBtn" size="xx-small" variant="tertiary">Call clear()</mui-button>
            <mui-button id="promptApiFocusBtn" size="xx-small" variant="tertiary">Call focus()</mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt id="promptApiGuard" enter-submit&gt;...&lt;/mui-prompt&gt;<br />
          prompt.addEventListener("before-submit", (event) =&gt; {<br />
          &nbsp;&nbsp;if ((event.detail.value || "").trim().length &lt; 5) event.preventDefault();<br />
          });<br />
          prompt.submit(); // returns false when canceled<br />
          prompt.clear();<br />
          prompt.focus();
        </story-code-block>
      </story-card>

      <story-card
        id="loading"
        title="${storyMeta["loading"].title}"
        description="${storyMeta["loading"].description || ""}"
        usage="${storyMeta["loading"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            id="promptLoadingDemo"
            preview-scrollbar="hidden"
            placeholder="Send to start loading state..."
            enter-submit

            context-mode="icon"
            loading-label="Sending request"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size="small">Upload Photo</mui-button>
                  <mui-button variant="tertiary" size="small">Take Photo</mui-button>
                  <mui-button variant="tertiary" size="small">Upload File</mui-button>
                  <mui-button variant="tertiary" size="small">Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up" size="small">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary" size="small">MPT-4</mui-button>
                <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
                <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
              </mui-menu>
            </mui-dropdown>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptLoadingStartBtn" size="xx-small" variant="secondary">Start Loading</mui-button>
            <mui-button id="promptLoadingStopBtn" size="xx-small" variant="tertiary">Stop Loading</mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt loading loading-label="Sending request"&gt;...&lt;/mui-prompt&gt;<br />
          prompt.setAttribute("loading", "");<br />
          prompt.removeAttribute("loading");
        </story-code-block>
      </story-card>

      <story-card
        id="preview-loading-flow"
        title="${storyMeta["preview-loading-flow"].title}"
        description="${storyMeta["preview-loading-flow"].description || ""}"
        usage="${storyMeta["preview-loading-flow"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            debug
            id="promptPreviewLoadingFlow"
            placeholder="Ask for summary..."
            enter-submit

            preview-loading="auto"
            preview-loading-label="Resolving preview"
            context-mode="icon"
          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="JSON"
              animated
              value='{"source":"crm","query":"summarise support backlog"}'
            ></mui-preview-chip>
            <mui-action-toggle slot="actions">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-globe size="small"></mui-icon-globe>
              </mui-button>
              <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
            </mui-action-toggle>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptPreviewFlowStartBtn" size="xx-small" variant="secondary">LLM Loading</mui-button>
            <mui-button id="promptPreviewFlowReadyBtn" size="xx-small" variant="tertiary">LLM Ready</mui-button>
            <mui-button id="promptPreviewFlowForceBtn" size="xx-small" variant="tertiary">Force Preview Load</mui-button>
            <mui-button id="promptPreviewFlowResetBtn" size="xx-small" variant="tertiary">Reset Auto</mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt preview-loading="auto" preview-loading-label="Resolving preview"&gt;...&lt;/mui-prompt&gt;<br />
          prompt.setAttribute("loading", ""); // LLM in-flight (mirrors preview loading)<br />
          prompt.removeAttribute("loading"); // LLM done<br />
          prompt.setAttribute("preview-loading", "true"); // optional extended preview enrichment<br />
          prompt.setAttribute("preview-loading", "auto"); // return to mirrored mode
        </story-code-block>
      </story-card>

      <story-card
        id="error-feedback"
        title="${storyMeta["error-feedback"].title}"
        description="${storyMeta["error-feedback"].description || ""}"
        usage="${storyMeta["error-feedback"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="promptErrorDemo"
            placeholder="Try submitting bad or clean payload..."
            enter-submit

            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size="small">Upload Photo</mui-button>
                  <mui-button variant="tertiary" size="small">Take Photo</mui-button>
                  <mui-button variant="tertiary" size="small">Upload File</mui-button>
                  <mui-button variant="tertiary" size="small">Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up" size="small">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu>
                <mui-button variant="tertiary" size="small">MPT-4</mui-button>
                <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
                <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
              </mui-menu>
            </mui-dropdown>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptErrorBadBtn" size="xx-small" variant="secondary">Bad Data</mui-button>
            <mui-button id="promptErrorCustomBtn" size="xx-small" variant="tertiary">Custom Data</mui-button>
            <mui-button id="promptErrorResetBtn" size="xx-small" variant="tertiary">Reset</mui-button>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt id="promptErrorDemo"&gt;...&lt;/mui-prompt&gt;<br />
          prompt.setError("ERR_VALIDATION_422: field 'intent' is required; schema=prompt/v4");<br />
          prompt.setError("We could not process that request. Check the fields and try again.");<br />
          prompt.clearError();<br />
        </story-code-block>
      </story-card>

      <story-card
        id="effects-off"
        title="${storyMeta["effects-off"].title}"
        description="${storyMeta["effects-off"].description || ""}"
        usage="${storyMeta["effects-off"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            effects-off
            preview-scrollbar="hidden"
            id="effectsOffPrompt"
            placeholder="Flat prompt surface..."
            enter-submit

            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                  <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
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
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt effects-off enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit control<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="color-swap"
        title="${storyMeta["color-swap"].title}"
        description="${storyMeta["color-swap"].description || ""}"
        usage="${storyMeta["color-swap"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="agentColorSwapPrompt"
            color-layout="swap"
            color-top-start="#ff4fbf"
            color-top-mid="#8fd3ff"
            color-top-end="#ff4fbf"
            color-top-accent="#8fd3ff"
            placeholder="Swapped color layout..."
            enter-submit

            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                  <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
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
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt<br />
          &nbsp;&nbsp;enter-submit<br />
          &nbsp;&nbsp;          &nbsp;&nbsp;color-layout="swap"<br />
          &nbsp;&nbsp;color-top-start="#ff4fbf"<br />
          &nbsp;&nbsp;color-top-mid="#8fd3ff"<br />
          &nbsp;&nbsp;color-top-end="#ff4fbf"<br />
          &nbsp;&nbsp;color-top-accent="#8fd3ff"<br />
          &gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit control<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-open-image-dialog"
        title="${storyMeta["preview-open-image-dialog"].title}"
        description="${storyMeta["preview-open-image-dialog"].description || ""}"
        usage="${storyMeta["preview-open-image-dialog"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="agentImageDialogPrompt"
            placeholder="Use this image..."
            enter-submit

            context-mode="icon"
          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.ctfassets.net/i5uwscj4pkk2/2TaRRm351HyujF9mT2w1wH/3958f69e939d20618751742130dc5f06/GuruSuite-Carousel-Composition.png"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-preview-chip>
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                  <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
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
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" clickable badge="IMG" bg-image="{url}" value=""&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />

          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-media"
        title="${storyMeta["preview-media"].title}"
        description="${storyMeta["preview-media"].description || ""}"
        usage="${storyMeta["preview-media"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            id="promptMediaDetection"
            preview-scrollbar="hidden"
            placeholder="Paste a media URL such as .mp4 or .mp3 ..."
            enter-submit

          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="VIDEO"
              value="https://youtu.be/2HTtfmXkeZQ?si=uM5dXCf3fb2M_9YB"
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="MUSIC"
              value="https://soundcloud.com/atariiiiiiiiii/the-clash-3-prod-rckstr?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
            ></mui-preview-chip>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt placeholder="Paste YouTube, SoundCloud, .mp4 or .mp3 URL..."&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" badge="VIDEO" value="https://youtu.be/..."&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" badge="MUSIC" value="https://soundcloud.com/..."&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-native-video"
        title="${storyMeta["preview-native-video"].title}"
        description="${storyMeta["preview-native-video"].description || ""}"
        usage="${storyMeta["preview-native-video"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            id="promptNativeVideo"
            preview-scrollbar="hidden"
            placeholder="Paste .mp4 links..."
            enter-submit

          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="VIDEO"
              value="https://www.w3schools.com/html/mov_bbb.mp4"
            ></mui-preview-chip>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" clickable badge="VIDEO" value="https://www.w3schools.com/html/mov_bbb.mp4"&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-native-audio"
        title="${storyMeta["preview-native-audio"].title}"
        description="${storyMeta["preview-native-audio"].description || ""}"
        usage="${storyMeta["preview-native-audio"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            id="promptNativeAudio"
            preview-scrollbar="hidden"
            placeholder="Paste .mp3 links..."
            enter-submit

          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="MUSIC"
              value="https://www.w3schools.com/html/horse.mp3"
            ></mui-preview-chip>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" clickable badge="MUSIC" value="https://www.w3schools.com/html/horse.mp3"&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-open-dialog"
        title="${storyMeta["preview-open-dialog"].title}"
        description="${storyMeta["preview-open-dialog"].description || ""}"
        usage="${storyMeta["preview-open-dialog"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="agentCodeDialogPrompt"
            placeholder="Review payload..."
            enter-submit

            context-mode="icon"
          >
            <mui-preview-chip
              slot="preview"
              clickable
              badge="JSON"
              animated
              value='{"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment","churn_drivers"]}'
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="CSS"
              animated
              value=".card{display:grid;gap:var(--space-200);padding:var(--space-300);border-radius:var(--radius-200)}"
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="JS"
              animated
              value='const result = items.filter((item) => item.active).map((item) => item.id);'
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="TS"
              animated
              value='type PromptPayload = { source: string; query: string; include: string[] };'
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="MD"
              animated
              value="## Q4 Notes\n- Churn up in SMB\n- CSAT strongest in onboarding\n- Follow-up: improve docs"
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              clickable
              badge="SQL"
              animated
              value='SELECT feature_area, AVG(csat) FROM survey_responses WHERE quarter = "Q4" GROUP BY feature_area;'
            ></mui-preview-chip>
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                  <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
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
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" clickable badge="JSON" value="{...}"&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" clickable badge="CSS" value=".card{...}"&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />

          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-off"
        title="${storyMeta["preview-off"].title}"
        description="${storyMeta["preview-off"].description || ""}"
        usage="${storyMeta["preview-off"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt actions-fan debug
            preview-scrollbar="hidden"
            id="agentPreviewOffPrompt"
            placeholder="Preview is off..."
            enter-submit

            preview-auto-clickable="false"
            context-mode="icon"
          >
            <mui-preview-chip
              slot="preview"
              badge="JSON"
              animated
              value='{"source":"crm","query":"CSAT by feature","range":"Q4"}'
            ></mui-preview-chip>
            <mui-preview-chip
              slot="preview"
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.ctfassets.net/i5uwscj4pkk2/2TaRRm351HyujF9mT2w1wH/3958f69e939d20618751742130dc5f06/GuruSuite-Carousel-Composition.png"
              value=""
            ></mui-preview-chip>
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up" size="small">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-menu>
                  <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                  <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                  <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-action-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-action-toggle>
            </mui-h-stack>
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
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt preview-auto-clickable="false" enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" badge="JSON" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-preview-chip slot="preview" badge="IMG" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...add...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-action-toggle slot="actions"&gt;...globe/chip...&lt;/mui-action-toggle&gt;<br />

          &nbsp;&nbsp;&lt;mui-dropdown size=&quot;medium&quot; slot="actions"&gt;&lt;mui-menu&gt;...MPT...&lt;/mui-menu&gt;&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        .prompt-story-shell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-400);
          width: 100%;
          box-sizing: border-box;
        }
        .prompt-story-shell > * {
          width: 100%;
          max-width: var(--prompt-story-max-width, 64rem);
        }

        @media (min-width: 600px) {
          .prompt-story-shell {
            padding-block: var(--space-600);
            padding-inline: var(--space-600);
          }
          .prompt-story-shell > * {
            max-width: var(--prompt-story-max-width, 92rem);
          }
        }
      </style>
      <story-template
        title="${data.title}"
        description="${data.description}"
        attrs-reference='${attrsReference}'
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-prompt"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.shadowRoot.querySelectorAll("mui-prompt").forEach((promptEl) => {
      if (promptEl.closest(".prompt-story-shell")) return;
      const shell = document.createElement("div");
      shell.className = "prompt-story-shell";
      promptEl.parentElement.insertBefore(shell, promptEl);
      shell.appendChild(promptEl);
    });

    const prompt = this.shadowRoot.querySelector("#promptDemo");
    const promptApiGuard = this.shadowRoot.querySelector("#promptApiGuard");
    const promptApiSubmitMethodBtn = this.shadowRoot.querySelector("#promptApiSubmitMethodBtn");
    const promptApiClearBtn = this.shadowRoot.querySelector("#promptApiClearBtn");
    const promptApiFocusBtn = this.shadowRoot.querySelector("#promptApiFocusBtn");
    const promptLoadingDemo = this.shadowRoot.querySelector("#promptLoadingDemo");
    const promptContextSheetDemo = this.shadowRoot.querySelector("#promptContextSheetDemo");
    const promptLoadingStartBtn = this.shadowRoot.querySelector("#promptLoadingStartBtn");
    const promptLoadingStopBtn = this.shadowRoot.querySelector("#promptLoadingStopBtn");
    const promptPreviewLoadingFlow = this.shadowRoot.querySelector("#promptPreviewLoadingFlow");
    const promptPreviewFlowStartBtn = this.shadowRoot.querySelector("#promptPreviewFlowStartBtn");
    const promptPreviewFlowReadyBtn = this.shadowRoot.querySelector("#promptPreviewFlowReadyBtn");
    const promptPreviewFlowForceBtn = this.shadowRoot.querySelector("#promptPreviewFlowForceBtn");
    const promptPreviewFlowResetBtn = this.shadowRoot.querySelector("#promptPreviewFlowResetBtn");
    const effectsOffPrompt = this.shadowRoot.querySelector("#effectsOffPrompt");
    const agentCodeDialogPrompt = this.shadowRoot.querySelector("#agentCodeDialogPrompt");
    const agentImageDialogPrompt = this.shadowRoot.querySelector("#agentImageDialogPrompt");
    const promptMediaDetection = this.shadowRoot.querySelector("#promptMediaDetection");
    const promptNativeVideo = this.shadowRoot.querySelector("#promptNativeVideo");
    const promptNativeAudio = this.shadowRoot.querySelector("#promptNativeAudio");
    const agentPreviewOffPrompt = this.shadowRoot.querySelector("#agentPreviewOffPrompt");
    const agentColorSwapPrompt = this.shadowRoot.querySelector("#agentColorSwapPrompt");
    const agentDataPrompt = this.shadowRoot.querySelector("#agentDataPrompt");
    const promptErrorDemo = this.shadowRoot.querySelector("#promptErrorDemo");
    const promptErrorBadBtn = this.shadowRoot.querySelector("#promptErrorBadBtn");
    const promptErrorCustomBtn = this.shadowRoot.querySelector("#promptErrorCustomBtn");
    const promptErrorResetBtn = this.shadowRoot.querySelector("#promptErrorResetBtn");

    const bindPastePreviews = ({ promptEl, imageTint = "var(--grey-1200)", clickable = true }) => {
      promptEl?.addEventListener("prompt-paste", (event) => {
        const payload = event.detail || {};
        const items = Array.isArray(payload.items) ? payload.items : [];
        if (!items.length) return;

        items.forEach((item) => {
          const preview = document.createElement("mui-preview-chip");
          preview.setAttribute("slot", "preview");
          preview.setAttribute("animated", "");
          if (clickable) preview.setAttribute("clickable", "");
          preview.setAttribute("badge", item.badge || "Insightful");

          if (item.kind === "image") {
            const imageUrl = item.file ? URL.createObjectURL(item.file) : item.preview || item.value || "";
            if (!imageUrl) {
              preview.setAttribute("value", item.value || "");
              promptEl.appendChild(preview);
              return;
            }
            preview.setAttribute("bg-image", imageUrl);
            preview.setAttribute("image-tint", imageTint);
            preview.setAttribute("value", "");
          } else if (item.kind === "video" || item.kind === "audio") {
            const mediaUrl = item.file ? URL.createObjectURL(item.file) : item.preview || item.value || "";
            preview.setAttribute("badge", item.kind === "video" ? "VIDEO" : "MUSIC");
            preview.setAttribute("value", mediaUrl || item.value || "");
          } else {
            preview.setAttribute("value", item.value || "");
          }

          promptEl.appendChild(preview);
        });
      });
    };

    const bindPromptSimulation = ({ promptEl, label }) => {
      const resolveSubmitEl = () => promptEl?.shadowRoot?.querySelector("#promptDefaultSubmitAction") ?? null;
      const resolveToggleEl = () =>
        promptEl?.shadowRoot?.querySelector("#promptDefaultSubmitAction mui-icon-toggle") ?? null;

      let pendingSendTimeout;
      const setSendingState = (isSending) => {
        const activeToggle = resolveToggleEl();
        if (!activeToggle) return;
        activeToggle.toggle = isSending;
        activeToggle.setAttribute("aria-pressed", String(isSending));
      };
      const cancelSimulation = (reason = "Esc: actions closed, send cancelled") => {
        if (pendingSendTimeout) {
          window.clearTimeout(pendingSendTimeout);
          pendingSendTimeout = undefined;
        }
        setSendingState(false);
        console.log(`${label}: ${reason}`);
      };
      const simulateSend = (source) => {
        if (pendingSendTimeout) {
          window.clearTimeout(pendingSendTimeout);
          pendingSendTimeout = undefined;
        }
        const payload = {
          source,
          prompt: promptEl?.getAttribute("value") || "",
          timestamp: new Date().toISOString(),
        };
        console.log(`${label} JSON sending (simulation):`, payload);
        setSendingState(true);
        pendingSendTimeout = window.setTimeout(() => {
          pendingSendTimeout = undefined;
          setSendingState(false);
          console.log(`${label} JSON sent (simulation):`, payload);
        }, 350);
      };

      promptEl?.addEventListener("click", (event) => {
        const activeSubmit = resolveSubmitEl();
        const path = event.composedPath();
        const clickedSubmit = path.some((node) => {
          if (!(node instanceof HTMLElement)) return false;
          if (activeSubmit && node === activeSubmit) return true;
          if (node.id === "promptDefaultSubmitAction") return true;
          return node.getAttribute?.("slot") === "actions-right";
        });
        if (clickedSubmit) simulateSend("click");
      });
      promptEl?.addEventListener("submit", () => {
        simulateSend("enter");
      });
      promptEl?.addEventListener("escape", () => {
        cancelSimulation();
      });
    };

    bindPromptSimulation({
      promptEl: prompt,
      label: "Agent prompt (default)",
    });
    bindPromptSimulation({
      promptEl: promptApiGuard,
      label: "Agent prompt (submit guard + api)",
    });
    bindPromptSimulation({
      promptEl: promptLoadingDemo,
      label: "Agent prompt (async loading)",
    });
    bindPromptSimulation({
      promptEl: promptContextSheetDemo,
      label: "Agent prompt (context sheet)",
    });
    bindPromptSimulation({
      promptEl: promptPreviewLoadingFlow,
      label: "Agent prompt (preview loading flow)",
    });
    bindPromptSimulation({
      promptEl: effectsOffPrompt,
      label: "Agent prompt (effects off)",
    });
    bindPromptSimulation({
      promptEl: agentCodeDialogPrompt,
      label: "Agent prompt (code dialog)",
    });
    bindPromptSimulation({
      promptEl: agentImageDialogPrompt,
      label: "Agent prompt (image dialog)",
    });
    bindPromptSimulation({
      promptEl: promptMediaDetection,
      label: "Agent prompt (media detection)",
    });
    bindPromptSimulation({
      promptEl: promptNativeVideo,
      label: "Agent prompt (native video preview)",
    });
    bindPromptSimulation({
      promptEl: promptNativeAudio,
      label: "Agent prompt (native audio preview)",
    });
    bindPromptSimulation({
      promptEl: agentPreviewOffPrompt,
      label: "Agent prompt (preview off)",
    });
    bindPromptSimulation({
      promptEl: agentColorSwapPrompt,
      label: "Agent prompt (color swap)",
    });
    bindPromptSimulation({
      promptEl: agentDataPrompt,
      label: "Agent prompt (data feed)",
    });
    bindPromptSimulation({
      promptEl: promptErrorDemo,
      label: "Agent prompt (error feedback)",
    });

    bindPastePreviews({
      promptEl: agentCodeDialogPrompt,
    });
    bindPastePreviews({
      promptEl: agentImageDialogPrompt,
    });
    bindPastePreviews({
      promptEl: agentPreviewOffPrompt,
      clickable: false,
    });
    bindPastePreviews({
      promptEl: agentDataPrompt,
    });

    promptApiGuard?.addEventListener("before-submit", (event) => {
      const detail = event.detail || {};
      const value = String(detail.value || "").trim();
      if (value.length >= 5) return;
      event.preventDefault();
      console.log("before-submit:blocked", { reason: "min-length", min: 5, length: value.length });
    });

    promptApiSubmitMethodBtn?.addEventListener("click", () => {
      const ok = promptApiGuard?.submit?.("api");
      if (!ok) console.log("submit(): canceled by before-submit");
    });
    promptApiClearBtn?.addEventListener("click", () => {
      promptApiGuard?.clear?.();
      console.log("clear(): value reset");
    });
    promptApiFocusBtn?.addEventListener("click", () => {
      promptApiGuard?.focus?.();
      console.log("focus(): textarea focused");
    });
    promptLoadingDemo?.addEventListener("submit", () => {
      promptLoadingDemo?.setAttribute("loading", "");
      window.setTimeout(() => {
        promptLoadingDemo?.removeAttribute("loading");
      }, 1200);
    });
    promptLoadingStartBtn?.addEventListener("click", () => {
      promptLoadingDemo?.setAttribute("loading", "");
      console.log("loading:start");
    });
    promptLoadingStopBtn?.addEventListener("click", () => {
      promptLoadingDemo?.removeAttribute("loading");
      console.log("loading:stop");
    });

    promptPreviewFlowStartBtn?.addEventListener("click", () => {
      promptPreviewLoadingFlow?.setAttribute("loading", "");
      promptPreviewLoadingFlow?.setAttribute("preview-loading", "auto");
      console.log("preview-flow:llm-loading");
    });
    promptPreviewFlowReadyBtn?.addEventListener("click", () => {
      promptPreviewLoadingFlow?.removeAttribute("loading");
      promptPreviewLoadingFlow?.setAttribute("preview-loading", "auto");
      console.log("preview-flow:llm-ready");
    });
    promptPreviewFlowForceBtn?.addEventListener("click", () => {
      promptPreviewLoadingFlow?.removeAttribute("loading");
      promptPreviewLoadingFlow?.setAttribute("preview-loading", "true");
      console.log("preview-flow:preview-enrichment");
    });
    promptPreviewFlowResetBtn?.addEventListener("click", () => {
      promptPreviewLoadingFlow?.removeAttribute("loading");
      promptPreviewLoadingFlow?.setAttribute("preview-loading", "auto");
      console.log("preview-flow:reset-auto");
    });

    promptErrorBadBtn?.addEventListener("click", () => {
      const message = "ERR_VALIDATION_422: field 'intent' is required; schema=prompt/v4";
      promptErrorDemo?.setError?.(message);
      console.log("error:set", { reason: "bad-data", message });
    });
    promptErrorCustomBtn?.addEventListener("click", () => {
      const message =
        "We could not process that request. Check the fields and try again. If this keeps happening, contact support with correlation ID #73A.";
      promptErrorDemo?.setError?.(message);
      console.log("error:custom", { mode: "message", message });
    });
    promptErrorResetBtn?.addEventListener("click", () => {
      promptErrorDemo?.clearError?.();
      console.log("error:reset");
    });
    promptErrorDemo?.addEventListener("prompt-error-clear", (event) => {
      const detail = event.detail || {};
      console.log("prompt-error-clear", detail);
    });
  }
}

customElements.define("story-prompt", StoryPrompt);
