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
        name: "actions-fan",
        type: "boolean",
        options: "actions-fan",
        default: "",
        description: "Enables fan-out actions from the trigger action.",
      },
      { name: "fan-open", type: "boolean", options: "fan-open", default: "", description: "Forces fan actions open." },
      { name: "disabled", type: "boolean", options: "disabled", default: "", description: "Disables prompt input." },
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
        default: "",
        description: "Right-side submit/state action.",
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
        name: "preview-scrollbar",
        type: "string",
        options: "hidden",
        default: "",
        description: "Set to hidden to keep horizontal preview scrolling but hide the scrollbar chrome.",
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
        title="Preview: Data Feed"
        description="Render extracted preview metadata on-page for product logic."
        usage="Use prompt-paste to capture clipboard payloads and append previews.|||Use prompt-preview-open to drive analytics, dialog selection, or routing.|||Use context-mode='icon|chip' with slotted <mui-prompt-toggle> (containing [context-toggle] and [context-chip]) to switch toolbar state from app logic.|||Theme the hover/focus mesh using --prompt-accent-primary and optional --prompt-accent-secondary.|||React expectation: keep value controlled, then map CustomEvent handlers to state updates."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            preview-scrollbar="hidden"
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
            <mui-button slot="actions-right" variant="tertiary" id="agentDataSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="agentDataToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="agentDataStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: waiting for prompt data events.
            </mui-body>
            <mui-body id="agentDataPayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt<br />
          &nbsp;&nbsp;actions-fan<br />
          &nbsp;&nbsp;enter-submit<br />
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
          <mui-prompt
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
              <mui-prompt-toggle style="margin-inline: var(--space-200) var(--space-025);">
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
            <mui-button slot="actions-right" variant="tertiary" id="promptSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="promptToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="promptStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: no submit yet.
            </mui-body>
            <mui-body id="promptPayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt placeholder="Reply to Mui..." enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions" vertical-position="up"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions-right" variant="tertiary"&gt;...&lt;/mui-button&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="effects-off"
        title="Effects Off"
        description="Disable prompt hover/focus visuals for a flatter surface."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
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
              <mui-prompt-toggle style="margin-inline: var(--space-200) var(--space-025);">
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
            <mui-button slot="actions-right" variant="tertiary" id="effectsOffSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="effectsOffToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="effectsOffStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: no submit yet.
            </mui-body>
            <mui-body id="effectsOffPayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt effects-off enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...add...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...globe/chip...&lt;/mui-prompt-toggle&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot="actions"&gt;...MPT...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions-right" variant="tertiary"&gt;...&lt;/mui-button&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="color-swap"
        title="Color Layout Swap"
        description="Remap the top color positions without changing the supplied color values."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
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
              <mui-prompt-toggle style="margin-inline: var(--space-200) var(--space-025);">
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
            <mui-button slot="actions-right" variant="tertiary" id="agentColorSwapSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="agentColorSwapToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="agentColorSwapStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: no submit yet.
            </mui-body>
            <mui-body id="agentColorSwapPayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
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
          &nbsp;&nbsp;&lt;mui-button slot="actions-right" variant="tertiary"&gt;...&lt;/mui-button&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-open-image-dialog" title="Preview: Image" description="Click image preview to open the built-in prompt dialog.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
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
              <mui-prompt-toggle style="margin-inline: var(--space-200) var(--space-025);">
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
                        <mui-button slot="actions-right" variant="tertiary" id="agentImageSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="agentImageToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="agentImageStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: no submit yet.
            </mui-body>
            <mui-body id="agentImagePayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
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

      <story-card id="preview-open-dialog" title="Preview: Code" description="Click preview to open the built-in prompt dialog.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
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
              <mui-prompt-toggle style="margin-inline: var(--space-200) var(--space-025);">
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
                        <mui-button slot="actions-right" variant="tertiary" id="agentCodeSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="agentCodeToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="agentCodeStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: no submit yet.
            </mui-body>
            <mui-body id="agentCodePayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
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
          <mui-prompt
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
              <mui-prompt-toggle style="margin-inline: var(--space-200) var(--space-025);">
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
                        <mui-button slot="actions-right" variant="tertiary" id="agentPreviewOffSubmitBtn" size="small" icon-only>
              <mui-icon-toggle id="agentPreviewOffToggle" rotate size="small">
                <mui-icon-up-arrow slot="start" size="small"></mui-icon-up-arrow>
                <mui-icon-stop slot="end" size="small"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-v-stack space="var(--space-050)">
            <mui-body id="agentPreviewOffStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              Idle: preview auto-click is off.
            </mui-body>
            <mui-body id="agentPreviewOffPayload" size="x-small" variant="optional" style="padding-left: var(--space-100);">
              {"event":"idle"}
            </mui-body>
          </mui-v-stack>
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
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||preview-open-dialog::Open Code Dialog|||preview-open-image-dialog::Open Image Dialog|||preview-off::Preview Off|||preview-data::Preview Data Feed"></story-quicklinks>
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

    const agentDataPromptEl = this.shadowRoot.querySelector("#agentDataPrompt");
    const agentDataStatusEl = this.shadowRoot.querySelector("#agentDataStatus");
    const agentDataShell = agentDataPromptEl?.closest(".prompt-story-shell");
    const agentDataMeta = agentDataStatusEl?.parentElement;
    if (agentDataShell && agentDataMeta && agentDataMeta.parentElement !== agentDataShell) {
      agentDataShell.appendChild(agentDataMeta);
    }
    const moveStatusUnderPrompt = (promptId, statusId) => {
      const promptEl = this.shadowRoot.querySelector(`#${promptId}`);
      const statusEl = this.shadowRoot.querySelector(`#${statusId}`);
      const shell = promptEl?.closest(".prompt-story-shell");
      const statusContainer = statusEl?.parentElement;
      if (
        shell &&
        statusContainer &&
        statusContainer.parentElement !== shell &&
        !statusContainer.contains(shell)
      ) {
        shell.appendChild(statusContainer);
      }
    };
    moveStatusUnderPrompt("promptDemo", "promptStatus");
    moveStatusUnderPrompt("effectsOffPrompt", "effectsOffStatus");
    moveStatusUnderPrompt("agentCodeDialogPrompt", "agentCodeStatus");
    moveStatusUnderPrompt("agentImageDialogPrompt", "agentImageStatus");
    moveStatusUnderPrompt("agentPreviewOffPrompt", "agentPreviewOffStatus");
    moveStatusUnderPrompt("agentColorSwapPrompt", "agentColorSwapStatus");

    const prompt = this.shadowRoot.querySelector("#promptDemo");
    const submitBtn = this.shadowRoot.querySelector("#promptSubmitBtn");
    const toggle = this.shadowRoot.querySelector("#promptToggle");
    const status = this.shadowRoot.querySelector("#promptStatus");
    const promptPayload = this.shadowRoot.querySelector("#promptPayload");
    const effectsOffPrompt = this.shadowRoot.querySelector("#effectsOffPrompt");
    const effectsOffSubmitBtn = this.shadowRoot.querySelector("#effectsOffSubmitBtn");
    const effectsOffToggle = this.shadowRoot.querySelector("#effectsOffToggle");
    const effectsOffStatus = this.shadowRoot.querySelector("#effectsOffStatus");
    const effectsOffPayload = this.shadowRoot.querySelector("#effectsOffPayload");
    const agentCodeDialogPrompt = this.shadowRoot.querySelector("#agentCodeDialogPrompt");
    const agentCodeSubmitBtn = this.shadowRoot.querySelector("#agentCodeSubmitBtn");
    const agentCodeToggle = this.shadowRoot.querySelector("#agentCodeToggle");
    const agentCodeStatus = this.shadowRoot.querySelector("#agentCodeStatus");
    const agentCodePayload = this.shadowRoot.querySelector("#agentCodePayload");
    const agentImageDialogPrompt = this.shadowRoot.querySelector("#agentImageDialogPrompt");
    const agentImageSubmitBtn = this.shadowRoot.querySelector("#agentImageSubmitBtn");
    const agentImageToggle = this.shadowRoot.querySelector("#agentImageToggle");
    const agentImageStatus = this.shadowRoot.querySelector("#agentImageStatus");
    const agentImagePayload = this.shadowRoot.querySelector("#agentImagePayload");
    const agentPreviewOffPrompt = this.shadowRoot.querySelector("#agentPreviewOffPrompt");
    const agentPreviewOffSubmitBtn = this.shadowRoot.querySelector("#agentPreviewOffSubmitBtn");
    const agentPreviewOffToggle = this.shadowRoot.querySelector("#agentPreviewOffToggle");
    const agentPreviewOffStatus = this.shadowRoot.querySelector("#agentPreviewOffStatus");
    const agentPreviewOffPayload = this.shadowRoot.querySelector("#agentPreviewOffPayload");
    const agentColorSwapPrompt = this.shadowRoot.querySelector("#agentColorSwapPrompt");
    const agentColorSwapSubmitBtn = this.shadowRoot.querySelector("#agentColorSwapSubmitBtn");
    const agentColorSwapToggle = this.shadowRoot.querySelector("#agentColorSwapToggle");
    const agentColorSwapStatus = this.shadowRoot.querySelector("#agentColorSwapStatus");
    const agentColorSwapPayload = this.shadowRoot.querySelector("#agentColorSwapPayload");
    const agentDataPrompt = this.shadowRoot.querySelector("#agentDataPrompt");
    const agentDataSubmitBtn = this.shadowRoot.querySelector("#agentDataSubmitBtn");
    const agentDataToggle = this.shadowRoot.querySelector("#agentDataToggle");
    const agentDataStatus = this.shadowRoot.querySelector("#agentDataStatus");
    const agentDataPayload = this.shadowRoot.querySelector("#agentDataPayload");

    const bindPastePreviews = ({ promptEl, statusEl, imageTint = "var(--grey-1200)", clickable = true }) => {
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
          } else {
            preview.setAttribute("value", item.value || "");
          }

          promptEl.appendChild(preview);
        });

        if (statusEl) {
          statusEl.textContent = `Pasted ${items.length} item${items.length > 1 ? "s" : ""} • preview added`;
        }
      });
    };

    const bindPromptSimulation = ({ promptEl, submitEl, toggleEl, statusEl, payloadEl, label }) => {
      let pendingSendTimeout;
      const setSendingState = (isSending) => {
        if (!toggleEl) return;
        toggleEl.toggle = isSending;
        toggleEl.setAttribute("aria-pressed", String(isSending));
      };
      const cancelSimulation = (reason = "Esc: actions closed, send cancelled") => {
        if (pendingSendTimeout) {
          window.clearTimeout(pendingSendTimeout);
          pendingSendTimeout = undefined;
        }
        setSendingState(false);
        if (statusEl) statusEl.textContent = reason;
        if (payloadEl) payloadEl.textContent = JSON.stringify({ event: "cancelled" });
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
        if (statusEl) statusEl.textContent = `Sending JSON (${source})... ${JSON.stringify(payload)}`;
        if (payloadEl) payloadEl.textContent = JSON.stringify({ event: "sending", ...payload });
        pendingSendTimeout = window.setTimeout(() => {
          pendingSendTimeout = undefined;
          setSendingState(false);
          if (statusEl) statusEl.textContent = `Sent JSON (${source})`;
          if (payloadEl) payloadEl.textContent = JSON.stringify({ event: "sent", ...payload });
        }, 350);
      };

      promptEl?.addEventListener("click", (event) => {
        const path = event.composedPath();
        const clickedSubmit = path.some((node) => {
          if (!(node instanceof HTMLElement)) return false;
          if (submitEl && node === submitEl) return true;
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
      submitEl: submitBtn,
      toggleEl: toggle,
      statusEl: status,
      payloadEl: promptPayload,
      label: "Agent prompt (default)",
    });
    bindPromptSimulation({
      promptEl: effectsOffPrompt,
      submitEl: effectsOffSubmitBtn,
      toggleEl: effectsOffToggle,
      statusEl: effectsOffStatus,
      payloadEl: effectsOffPayload,
      label: "Agent prompt (effects off)",
    });
    bindPromptSimulation({
      promptEl: agentCodeDialogPrompt,
      submitEl: agentCodeSubmitBtn,
      toggleEl: agentCodeToggle,
      statusEl: agentCodeStatus,
      payloadEl: agentCodePayload,
      label: "Agent prompt (code dialog)",
    });
    bindPromptSimulation({
      promptEl: agentImageDialogPrompt,
      submitEl: agentImageSubmitBtn,
      toggleEl: agentImageToggle,
      statusEl: agentImageStatus,
      payloadEl: agentImagePayload,
      label: "Agent prompt (image dialog)",
    });
    bindPromptSimulation({
      promptEl: agentPreviewOffPrompt,
      submitEl: agentPreviewOffSubmitBtn,
      toggleEl: agentPreviewOffToggle,
      statusEl: agentPreviewOffStatus,
      payloadEl: agentPreviewOffPayload,
      label: "Agent prompt (preview off)",
    });
    bindPromptSimulation({
      promptEl: agentColorSwapPrompt,
      submitEl: agentColorSwapSubmitBtn,
      toggleEl: agentColorSwapToggle,
      statusEl: agentColorSwapStatus,
      payloadEl: agentColorSwapPayload,
      label: "Agent prompt (color swap)",
    });
    bindPromptSimulation({
      promptEl: agentDataPrompt,
      submitEl: agentDataSubmitBtn,
      toggleEl: agentDataToggle,
      statusEl: agentDataStatus,
      payloadEl: agentDataPayload,
      label: "Agent prompt (data feed)",
    });

    bindPastePreviews({
      promptEl: agentCodeDialogPrompt,
      statusEl: agentCodeStatus,
    });
    bindPastePreviews({
      promptEl: agentImageDialogPrompt,
      statusEl: agentImageStatus,
    });
    bindPastePreviews({
      promptEl: agentPreviewOffPrompt,
      statusEl: agentPreviewOffStatus,
      clickable: false,
    });
    bindPastePreviews({
      promptEl: agentDataPrompt,
      statusEl: agentDataStatus,
    });

    const setDataFeed = (data) => {
      if (agentDataPayload) agentDataPayload.textContent = JSON.stringify(data, null, 2);
      if (agentDataStatus) agentDataStatus.textContent = data.summary || "Event received";
    };

    agentDataPrompt?.addEventListener("prompt-paste", (event) => {
      const detail = event.detail || {};
      const items = Array.isArray(detail.items) ? detail.items : [];
      setDataFeed({
        event: "prompt-paste",
        itemCount: items.length,
        badges: items.map((item) => item.badge),
        timestamp: detail.timestamp || "",
        summary: `Paste event: ${items.length} item${items.length === 1 ? "" : "s"} detected`,
      });
    });

    agentDataPrompt?.addEventListener("prompt-preview-open", (event) => {
      const detail = event.detail || {};
      setDataFeed({
        event: "prompt-preview-open",
        badge: detail.badge || "",
        label: detail.label || "",
        hasImage: Boolean(detail.bgImage),
        valuePreview: String(detail.value || "").slice(0, 80),
        summary: `Preview opened: ${detail.badge || "UNKNOWN"}`,
      });
    });
  }
}

customElements.define("story-prompt", StoryPrompt);
