import { getComponentDocs } from "../../../utils/story-data";

class StoryPrompt extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Prompt");

    const propItems = [
      {
        name: "placeholder",
        type: "string",
        options: "{text}",
        default: "Reply to Mui...",
        description: "Textarea placeholder.",
      },
      { name: "value", type: "string", options: "{text}", default: "", description: "Initial value." },
      {
        name: "rows",
        type: "number",
        options: "{number}",
        default: "3",
        description: "Controls growth range/cap; base visible height remains the default prompt baseline.",
      },
      {
        name: "enter-submit",
        type: "boolean|string",
        options: "true, false",
        default: "true",
        description: "Enter submits; Shift+Enter adds newline.",
      },
      {
        name: "before-submit (event)",
        type: "CustomEvent",
        options: "cancelable",
        default: "",
        description: "Fires before submit. Call event.preventDefault() to block submission.",
      },
      {
        name: "submit(source?)",
        type: "method",
        options: "api, keyboard",
        default: "",
        description: "Programmatically submits with before-submit guard. Returns false when canceled.",
      },
      {
        name: "clear()",
        type: "method",
        options: "",
        default: "",
        description: "Clears value and emits input.",
      },
      {
        name: "focus()",
        type: "method",
        options: "",
        default: "",
        description: "Focuses the internal textarea.",
      },
      {
        name: "actions-fan",
        type: "boolean",
        options: "actions-fan",
        default: "",
        description: "Enables fan-out actions from the trigger action.",
      },
      { name: "fan-open", type: "boolean", options: "fan-open", default: "", description: "Forces fan actions open." },
      { name: "disabled", type: "boolean", options: "disabled", default: "", description: "Disables prompt input." },
      {
        name: "loading",
        type: "boolean",
        options: "loading",
        default: "",
        description: "Shows built-in spinner next to actions-right and blocks submit while active.",
      },
      {
        name: "loading-label",
        type: "string",
        options: "{text}",
        default: "Sending",
        description: "Accessible label used by the built-in loading spinner.",
      },
      {
        name: "slot=preview",
        type: "slot (named)",
        options: "mui-prompt-preview",
        default: "",
        description: "Optional preview block shown above the prompt input.",
      },
      {
        name: "slot=actions-trigger",
        type: "slot (named)",
        options: "button, icons",
        default: "Built-in trigger",
        description:
          "Optional custom trigger action (for fan toggle). If omitted, Prompt renders a default grid/close trigger.",
      },
      {
        name: "slot=actions",
        type: "slot (named)",
        options: "buttons, icons, mui-prompt-toggle",
        default: "",
        description: "Floating prompt actions.",
      },
      {
        name: "context-mode",
        type: "string",
        options: "icon, chip",
        default: "icon",
        description:
          "Controls which content inside <mui-prompt-toggle> is visible. icon shows [context-toggle], chip shows [context-chip].",
      },
      {
        name: "slot=actions-right",
        type: "slot (named)",
        options: "button, toggle",
        default: "Built-in submit toggle",
        description: "Optional override for the right-side submit/state action.",
      },
      {
        name: "preview-dialog-width",
        type: "string",
        options: "{length}",
        default: "560px",
        description: "Width used by internal preview dialog.",
      },
      {
        name: "preview-dialog-title",
        type: "string",
        options: "{text}",
        default: "Pasted Content",
        description: "Fallback title used by internal preview dialog.",
      },
      {
        name: "preview-overflow-to-preview",
        type: "string|boolean",
        options: "true, false",
        default: "true",
        description: "When true, long pasted text is converted to preview items instead of going into textarea.",
      },
      {
        name: "preview-threshold-chars",
        type: "number",
        options: "{number}",
        default: "220",
        description: "Character count at which pasted text overflows into preview items.",
      },
      {
        name: "preview-auto-clickable",
        type: "string|boolean",
        options: "true, false",
        default: "true",
        description: "Auto-applies clickable behavior to slotted previews.",
      },
      {
        name: "preview-loading",
        type: "string|boolean",
        options: "true, auto",
        default: "",
        description: "When set, applies loading state to slotted mui-prompt-preview items. Use auto to mirror prompt loading state.",
      },
      {
        name: "preview-loading-label",
        type: "string",
        options: "{text}",
        default: "Loading preview",
        description: "Accessible loading label passed to slotted previews when preview-loading is active.",
      },
      {
        name: "preview-scrollbar",
        type: "string",
        options: "hidden",
        default: "",
        description: "Set to hidden to keep horizontal preview scrolling but hide the scrollbar chrome.",
      },
      {
        name: "error-message",
        type: "string",
        options: "{text}",
        default: "",
        description: "Direct error copy rendered below prompt.",
      },
      {
        name: "debug",
        type: "boolean",
        options: "debug",
        default: "",
        description: "Renders built-in status + JSON payload output below the prompt for diagnostics.",
      },
      {
        name: "setError(message)",
        type: "method",
        options: "",
        default: "",
        description: "Sets prompt error message programmatically.",
      },
      {
        name: "clearError()",
        type: "method",
        options: "",
        default: "",
        description: "Clears prompt error state and collapses expanded error copy.",
      },
      {
        name: "effects-off",
        type: "boolean",
        options: "effects-off",
        default: "",
        description: "Turns off prompt hover/focus visual effects and keeps a flat surface.",
      },
      {
        name: "--prompt-accent-primary",
        type: "css var",
        options: "{color}",
        default: "var(--prompt-spectrum-start)",
        description: "Primary accent used for prompt hover/focus mesh color synthesis.",
      },
      {
        name: "--prompt-accent-secondary",
        type: "css var",
        options: "{color}",
        default: "auto-derived from primary",
        description: "Optional secondary accent; when omitted Prompt derives an opposite tone internally.",
      },
      {
        name: "color-top-start",
        type: "string",
        options: "{css-color}",
        default: "",
        description: "Optional top mesh start color override (attribute).",
      },
      {
        name: "color-top-mid",
        type: "string",
        options: "{css-color}",
        default: "",
        description: "Optional top mesh middle color override (attribute).",
      },
      {
        name: "color-top-end",
        type: "string",
        options: "{css-color}",
        default: "",
        description: "Optional top mesh end color override (attribute).",
      },
      {
        name: "color-top-accent",
        type: "string",
        options: "{css-color}",
        default: "",
        description: "Optional top mesh accent color override (attribute).",
      },
      {
        name: "color-layout",
        type: "string",
        options: "default, swap",
        default: "default",
        description: "Swap remaps top color positions to an alternate arrangement.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            name="${prop.name}"
            type="${prop.type}"
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `,
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        const isLast = index === propItems.length - 1 ? "last-child" : "";
        return /*html*/ `
          <mui-accordion-block heading="${prop.name}" class="${isLast}">
            <story-type-slat
              slot="detail"
              name="${prop.name}"
              type="${prop.type}"
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt";<br>
        </mui-code>
      </spec-card>

      <props-card title="Prompt">
        <mui-responsive breakpoint="980" slot="body">
          <story-type-table slot="showAbove" overflow-x>
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card
        id="preview-data"
        title="Interactive Prompt Setup"
        description="Canonical interactive setup for this page: paste/upload previews, context toggle, submit, and prompt event telemetry."
        usage="This is the primary interactive story on this page.|||Use prompt-paste to capture clipboard payloads and append previews.|||Use prompt-preview-open to drive analytics, dialog selection, or routing.|||Use context-mode='icon|chip' with slotted <mui-prompt-toggle> (containing [context-toggle] and [context-chip]) to switch toolbar state from app logic.|||Theme the hover/focus mesh using --prompt-accent-primary and optional --prompt-accent-secondary.|||React expectation: keep value controlled, then map CustomEvent handlers to state updates."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            preview-loading="auto"
            preview-loading-label="Resolving preview"
            id="agentDataPrompt"
            placeholder="Paste, click preview, or submit..."
            enter-submit
            actions-fan
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
              badge="JSON"
              animated
              value='{"source":"docs","intent":"summarise","scope":"release-notes"}'
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
       
            <mui-dropdown slot="actions" position="left" vertical-position="up">
              <mui-button slot="action" variant="tertiary" icon-only size="small">
                <mui-icon-add size="small"></mui-icon-add>
              </mui-button>
              <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
              <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
              <mui-button variant="tertiary" size='small'>Upload File</mui-button>
              <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
            </mui-dropdown>
            <mui-prompt-toggle slot="actions">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-globe size="small"></mui-icon-globe>
              </mui-button>
              <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
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
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt<br />
          &nbsp;&nbsp;actions-fan<br />
          &nbsp;&nbsp;enter-submit<br />
          &nbsp;&nbsp;preview-loading="auto"<br />
          &nbsp;&nbsp;preview-loading-label="Resolving preview"<br />
          &nbsp;&nbsp;color-top-start="var(--mui-brand-400)"<br />
          &nbsp;&nbsp;color-top-mid="var(--blue-500)"<br />
          &nbsp;&nbsp;color-top-end="var(--green-500)"<br />
          &nbsp;&nbsp;color-top-accent="var(--orange-500)"<br />
          &nbsp;&nbsp;style="--prompt-accent-primary: var(--mui-brand-400); --prompt-accent-secondary: var(--blue-500);"&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="JSON" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;<br />
          <br />
          prompt.addEventListener("prompt-paste", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail.items);<br />
          });<br />
          prompt.addEventListener("prompt-preview-open", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail);<br />
          });<br />
          prompt.addEventListener("prompt-context-change", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail.mode); // icon | chip<br />
          });<br />
        </story-code-block>
      </story-card>

      <story-card
        id="default"
        title="Empty"
        usage="This is a reusable offering extracted from Agent UI compositions.|||Use it as the shared prompt primitive across products."
      >
        <mui-v-stack slot="body" space="var(--space-100)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="promptDemo"
            placeholder="Reply to Mui..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-button variant="tertiary" size="small">MPT-4</mui-button>
              <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
              <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
            </mui-dropdown>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt placeholder="Reply to Mui..." enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions" vertical-position="up"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit control<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="submit-guard-api"
        title="Submit Guard + API"
        description="Use before-submit to block invalid sends, then call submit/clear/focus from app controls."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="promptApiGuard"
            placeholder="Type at least 5 characters..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size="small">Upload Photo</mui-button>
                <mui-button variant="tertiary" size="small">Take Photo</mui-button>
                <mui-button variant="tertiary" size="small">Upload File</mui-button>
                <mui-button variant="tertiary" size="small">Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-button variant="tertiary" size="small">MPT-4</mui-button>
              <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
              <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
            </mui-dropdown>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptApiSubmitMethodBtn" size="small" variant="secondary">Call submit()</mui-button>
            <mui-button id="promptApiClearBtn" size="small" variant="tertiary">Call clear()</mui-button>
            <mui-button id="promptApiFocusBtn" size="small" variant="tertiary">Call focus()</mui-button>
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
        title="Async Loading"
        description="Show async spinner feedback next to submit while a request is in flight."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            id="promptLoadingDemo"
            preview-scrollbar="hidden"
            placeholder="Send to start loading state..."
            enter-submit
            actions-fan
            context-mode="icon"
            loading-label="Sending request"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size="small">Upload Photo</mui-button>
                <mui-button variant="tertiary" size="small">Take Photo</mui-button>
                <mui-button variant="tertiary" size="small">Upload File</mui-button>
                <mui-button variant="tertiary" size="small">Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-button variant="tertiary" size="small">MPT-4</mui-button>
              <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
              <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
            </mui-dropdown>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptLoadingStartBtn" size="small" variant="secondary">Start Loading</mui-button>
            <mui-button id="promptLoadingStopBtn" size="small" variant="tertiary">Stop Loading</mui-button>
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
        title="Preview Loading Flow"
        description="Working async flow: toggle preview loading based on LLM/tooling lifecycle."
        usage="Typical pattern: set prompt loading during request, and mirror preview loading using preview-loading='auto'.|||If a preview is still being enriched after send completes, force loading with preview-loading='true' and then clear it."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            debug
            id="promptPreviewLoadingFlow"
            placeholder="Ask for summary..."
            enter-submit
            actions-fan
            preview-loading="auto"
            preview-loading-label="Resolving preview"
            context-mode="icon"
          >
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="JSON"
              animated
              value='{"source":"crm","query":"summarise support backlog"}'
            ></mui-prompt-preview>
            <mui-prompt-toggle slot="actions">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-globe size="small"></mui-icon-globe>
              </mui-button>
              <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
            </mui-prompt-toggle>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptPreviewFlowStartBtn" size="small" variant="secondary">LLM Loading</mui-button>
            <mui-button id="promptPreviewFlowReadyBtn" size="small" variant="tertiary">LLM Ready</mui-button>
            <mui-button id="promptPreviewFlowForceBtn" size="small" variant="tertiary">Force Preview Load</mui-button>
            <mui-button id="promptPreviewFlowResetBtn" size="small" variant="tertiary">Reset Auto</mui-button>
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
        title="Error Feedback"
        description="Inject direct error text or custom slot content. Long errors can expand for review."
        usage="Use Bad Data for raw machine/system validation output.|||Use Custom Data for humanised, user-facing guidance copy.|||Use Reset to clear both direct error-message and custom slotted error content."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="promptErrorDemo"
            placeholder="Try submitting bad or clean payload..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size="small">Upload Photo</mui-button>
                <mui-button variant="tertiary" size="small">Take Photo</mui-button>
                <mui-button variant="tertiary" size="small">Upload File</mui-button>
                <mui-button variant="tertiary" size="small">Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
            <mui-dropdown slot="actions" position="right" vertical-position="up">
              <mui-button slot="action" variant="tertiary" size="small">
                MPT-4
                <mui-icon-down-chevron slot="after" size="small"></mui-icon-down-chevron>
              </mui-button>
              <mui-button variant="tertiary" size="small">MPT-4</mui-button>
              <mui-button variant="tertiary" size="small">MPT-4 Mini</mui-button>
              <mui-button variant="tertiary" size="small">MPT-Reasoning</mui-button>
            </mui-dropdown>
          </mui-prompt>
          <mui-h-stack space="var(--space-100)">
            <mui-button id="promptErrorBadBtn" size="small" variant="secondary">Bad Data</mui-button>
            <mui-button id="promptErrorCustomBtn" size="small" variant="tertiary">Custom Data</mui-button>
            <mui-button id="promptErrorResetBtn" size="small" variant="tertiary">Reset</mui-button>
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
        title="Effects Off"
        description="Disable prompt hover/focus visuals for a flatter surface."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            effects-off
            preview-scrollbar="hidden"
            id="effectsOffPrompt"
            placeholder="Flat prompt surface..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
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
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt effects-off enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit control<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="color-swap"
        title="Color Layout Swap"
        description="Remap the top color positions without changing the supplied color values."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="agentColorSwapPrompt"
            color-layout="swap"
            color-top-start="#ff4fbf"
            color-top-mid="#8fd3ff"
            color-top-end="#ff4fbf"
            color-top-accent="#8fd3ff"
            placeholder="Swapped color layout..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
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
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt<br />
          &nbsp;&nbsp;enter-submit<br />
          &nbsp;&nbsp;actions-fan<br />
          &nbsp;&nbsp;color-layout="swap"<br />
          &nbsp;&nbsp;color-top-start="#ff4fbf"<br />
          &nbsp;&nbsp;color-top-mid="#8fd3ff"<br />
          &nbsp;&nbsp;color-top-end="#ff4fbf"<br />
          &nbsp;&nbsp;color-top-accent="#8fd3ff"<br />
          &gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit control<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-open-image-dialog" title="Preview: Image" description="Click image preview to open the built-in prompt dialog.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="agentImageDialogPrompt"
            placeholder="Use this image..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.ctfassets.net/i5uwscj4pkk2/2TaRRm351HyujF9mT2w1wH/3958f69e939d20618751742130dc5f06/GuruSuite-Carousel-Composition.png"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=80"
              value=""
            ></mui-prompt-preview>
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
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
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="IMG" bg-image="{url}" value=""&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-media"
        title="Preview: Media"
        description="Media badge/render check (YouTube, SoundCloud, direct media URLs). For full interactive paste/upload flow, use Interactive Prompt Setup."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            id="promptMediaDetection"
            preview-scrollbar="hidden"
            placeholder="Paste a media URL such as .mp4 or .mp3 ..."
            enter-submit
            actions-fan
          >
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="VIDEO"
              value="https://youtu.be/2HTtfmXkeZQ?si=uM5dXCf3fb2M_9YB"
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="MUSIC"
              value="https://soundcloud.com/atariiiiiiiiii/the-clash-3-prod-rckstr?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
            ></mui-prompt-preview>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt placeholder="Paste YouTube, SoundCloud, .mp4 or .mp3 URL..."&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" badge="VIDEO" value="https://youtu.be/..."&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" badge="MUSIC" value="https://soundcloud.com/..."&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-native-video"
        title="Preview: Native Video"
        description="Prompt preview wired to a direct .mp4 URL so dialog opens with native video controls."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            id="promptNativeVideo"
            preview-scrollbar="hidden"
            placeholder="Paste .mp4 links..."
            enter-submit
            actions-fan
          >
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="VIDEO"
              value="https://www.w3schools.com/html/mov_bbb.mp4"
            ></mui-prompt-preview>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="VIDEO" value="https://www.w3schools.com/html/mov_bbb.mp4"&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="preview-native-audio"
        title="Preview: Native Audio"
        description="Prompt preview wired to a direct .mp3 URL so dialog opens with native audio controls."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            id="promptNativeAudio"
            preview-scrollbar="hidden"
            placeholder="Paste .mp3 links..."
            enter-submit
            actions-fan
          >
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="MUSIC"
              value="https://www.w3schools.com/html/horse.mp3"
            ></mui-prompt-preview>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="MUSIC" value="https://www.w3schools.com/html/horse.mp3"&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-open-dialog" title="Preview: Code" description="Click preview to open the built-in prompt dialog.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="agentCodeDialogPrompt"
            placeholder="Review payload..."
            enter-submit
            actions-fan
            context-mode="icon"
          >
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="JSON"
              animated
              value='{"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment","churn_drivers"]}'
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="CSS"
              animated
              value=".card{display:grid;gap:var(--space-200);padding:var(--space-300);border-radius:var(--radius-200)}"
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="JS"
              animated
              value='const result = items.filter((item) => item.active).map((item) => item.id);'
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="TS"
              animated
              value='type PromptPayload = { source: string; query: string; include: string[] };'
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="MD"
              animated
              value="## Q4 Notes\n- Churn up in SMB\n- CSAT strongest in onboarding\n- Follow-up: improve docs"
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              clickable
              badge="SQL"
              animated
              value='SELECT feature_area, AVG(csat) FROM survey_responses WHERE quarter = "Q4" GROUP BY feature_area;'
            ></mui-prompt-preview>
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
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
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="JSON" value="{...}"&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="CSS" value=".card{...}"&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-off" title="Preview: Off" description="Disable preview auto-click so items stay non-interactive.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt debug
            preview-scrollbar="hidden"
            id="agentPreviewOffPrompt"
            placeholder="Preview is off..."
            enter-submit
            actions-fan
            preview-auto-clickable="false"
            context-mode="icon"
          >
            <mui-prompt-preview
              slot="preview"
              badge="JSON"
              animated
              value='{"source":"crm","query":"CSAT by feature","range":"Q4"}'
            ></mui-prompt-preview>
            <mui-prompt-preview
              slot="preview"
              badge="IMG"
              image-tint="var(--grey-1200)"
              bg-image="https://images.ctfassets.net/i5uwscj4pkk2/2TaRRm351HyujF9mT2w1wH/3958f69e939d20618751742130dc5f06/GuruSuite-Carousel-Composition.png"
              value=""
            ></mui-prompt-preview>
            <mui-h-stack slot="actions" space="var(--space-050)">
              <mui-dropdown position="right" vertical-position="up">
                <mui-button slot="action" variant="tertiary" icon-only size="small">
                  <mui-icon-add size="small"></mui-icon-add>
                </mui-button>
                <mui-button variant="tertiary" size='small'>Upload Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Take Photo</mui-button>
                <mui-button variant="tertiary" size='small'>Upload File</mui-button>
                <mui-button variant="tertiary" size='small'>Screenshot</mui-button>
              </mui-dropdown>
              <mui-prompt-toggle>
                <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                  <mui-icon-globe size="small"></mui-icon-globe>
                </mui-button>
                <mui-chip context-chip dismiss size="small" hidden>Search</mui-chip>
              </mui-prompt-toggle>
            </mui-h-stack>
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
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt preview-auto-clickable="false" enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" badge="JSON" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" badge="IMG" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
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
          padding-block: var(--space-800);
          padding-inline: var(--space-800);
          box-sizing: border-box;
        }
        .prompt-story-shell > * {
          width: 100%;
          max-width: var(--prompt-story-max-width, 92rem);
        }
      </style>
      <story-template
        title="${data?.title || "Prompt"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="preview-data::Interactive Setup|||default::Default|||submit-guard-api::Submit Guard + API|||loading::Async Loading|||preview-loading-flow::Preview Loading Flow|||error-feedback::Error Feedback|||preview-open-dialog::Open Code Dialog|||preview-open-image-dialog::Open Image Dialog|||preview-media::Media Detection|||preview-native-video::Native Video|||preview-native-audio::Native Audio|||preview-off::Preview Off"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.shadowRoot.querySelectorAll("mui-prompt").forEach((promptEl) => {
      if (!promptEl.parentElement || promptEl.parentElement.classList.contains("prompt-story-shell")) return;
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
          const preview = document.createElement("mui-prompt-preview");
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
