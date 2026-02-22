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
        name: "slot=actions",
        type: "slot (named)",
        options: "buttons, icons",
        default: "",
        description: "Floating prompt actions.",
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt";<br>
        </mui-code>
      </spec-card>

      <props-card title="Prompt">
        <story-type-table slot="body">
          ${rows}
        </story-type-table>
      </props-card>

      <story-card
        id="preview-data"
        title="Preview: Data Feed"
        description="Render extracted preview metadata on-page for product logic."
        usage="Use prompt-paste to capture clipboard payloads and append previews.|||Use prompt-preview-open to drive analytics, dialog selection, or routing.|||React expectation: keep value controlled, then map CustomEvent handlers to state updates."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            id="agentDataPrompt"
            placeholder="Paste, click preview, or submit..."
            enter-submit
            actions-fan
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
            <mui-button slot="actions" variant="tertiary" fan-trigger icon-only>
              <mui-icon-toggle rotate size="medium">
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-calendar size="medium"></mui-icon-calendar></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-pin size="medium"></mui-icon-pin></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-translate size="medium"></mui-icon-translate></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar></mui-button>
            <mui-button slot="actions-right" variant="tertiary" id="agentDataSubmitBtn">
              <mui-icon-toggle id="agentDataToggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
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
          &lt;mui-prompt actions-fan enter-submit&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="JSON" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" fan-trigger icon-only&gt;...&lt;/mui-button&gt;<br />
          &lt;/mui-prompt&gt;<br />
          <br />
          prompt.addEventListener("prompt-paste", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail.items);<br />
          });<br />
          prompt.addEventListener("prompt-preview-open", (event) =&gt; {<br />
          &nbsp;&nbsp;console.log(event.detail);<br />
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
            id="promptDemo"
            placeholder="Reply to Mui..."
            enter-submit
            actions-fan
          >
            <mui-button slot="actions" variant="tertiary" fan-trigger icon-only>
              <mui-icon-toggle rotate size="medium">
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only>
              <mui-icon-calendar size="medium"></mui-icon-calendar>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only>
              <mui-icon-pin size="medium"></mui-icon-pin>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only>
              <mui-icon-translate size="medium"></mui-icon-translate>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only>
              <mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar>
            </mui-button>
            <mui-button slot="actions-right" variant="tertiary" id="promptSubmitBtn">
              <mui-icon-toggle id="promptToggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-body id="promptStatus" size="x-small" variant="optional" style="padding-left: var(--space-100); margin-top: var(--space-050);">
            Idle: no submit yet.
          </mui-body>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt placeholder="Reply to Mui..." enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="tertiary" fan-trigger icon-only&gt;...&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions-right" variant="tertiary"&gt;...&lt;/mui-button&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-open-image-dialog" title="Preview: Image" description="Click image preview to open the built-in prompt dialog.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            id="agentImageDialogPrompt"
            placeholder="Use this image..."
            enter-submit
            actions-fan
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
            <mui-button slot="actions" variant="tertiary" fan-trigger icon-only>
              <mui-icon-toggle rotate size="medium">
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-calendar size="medium"></mui-icon-calendar></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-pin size="medium"></mui-icon-pin></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-translate size="medium"></mui-icon-translate></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar></mui-button>
            <mui-button slot="actions-right" variant="tertiary" id="agentImageSubmitBtn">
              <mui-icon-toggle id="agentImageToggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-body id="agentImageStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
            Idle: no submit yet.
          </mui-body>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="IMG" bg-image="{url}" value=""&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" fan-trigger icon-only&gt;...&lt;/mui-button&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-open-dialog" title="Preview: Code" description="Click preview to open the built-in prompt dialog.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            id="agentCodeDialogPrompt"
            placeholder="Review payload..."
            enter-submit
            actions-fan
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
            <mui-button slot="actions" variant="tertiary" fan-trigger icon-only>
              <mui-icon-toggle rotate size="medium">
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-calendar size="medium"></mui-icon-calendar></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-pin size="medium"></mui-icon-pin></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-translate size="medium"></mui-icon-translate></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar></mui-button>
            <mui-button slot="actions-right" variant="tertiary" id="agentCodeSubmitBtn">
              <mui-icon-toggle id="agentCodeToggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-body id="agentCodeStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
            Idle: no submit yet.
          </mui-body>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="JSON" value="{...}"&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" clickable badge="CSS" value=".card{...}"&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

      <story-card id="preview-off" title="Preview: Off" description="Disable preview auto-click so items stay non-interactive.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt
            id="agentPreviewOffPrompt"
            placeholder="Preview is off..."
            enter-submit
            actions-fan
            preview-auto-clickable="false"
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
            <mui-button slot="actions" variant="tertiary" fan-trigger icon-only>
              <mui-icon-toggle rotate size="medium">
                <mui-icon-grid slot="start"></mui-icon-grid>
                <mui-icon-close slot="end"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-calendar size="medium"></mui-icon-calendar></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-pin size="medium"></mui-icon-pin></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-translate size="medium"></mui-icon-translate></mui-button>
            <mui-button slot="actions" variant="tertiary" icon-only><mui-icon-left-sidebar size="medium"></mui-icon-left-sidebar></mui-button>
            <mui-button slot="actions-right" variant="tertiary" id="agentPreviewOffSubmitBtn">
              <mui-icon-toggle id="agentPreviewOffToggle" rotate size="medium">
                <mui-icon-up-arrow slot="start"></mui-icon-up-arrow>
                <mui-icon-stop slot="end"></mui-icon-stop>
              </mui-icon-toggle>
            </mui-button>
          </mui-prompt>
          <mui-body id="agentPreviewOffStatus" size="x-small" variant="optional" style="padding-left: var(--space-100);">
            Idle: preview auto-click is off.
          </mui-body>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt preview-auto-clickable="false" enter-submit actions-fan&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" badge="JSON" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-preview slot="preview" badge="IMG" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;/mui-prompt&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
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

    const prompt = this.shadowRoot.querySelector("#promptDemo");
    const submitBtn = this.shadowRoot.querySelector("#promptSubmitBtn");
    const toggle = this.shadowRoot.querySelector("#promptToggle");
    const status = this.shadowRoot.querySelector("#promptStatus");
    const agentCodeDialogPrompt = this.shadowRoot.querySelector("#agentCodeDialogPrompt");
    const agentCodeSubmitBtn = this.shadowRoot.querySelector("#agentCodeSubmitBtn");
    const agentCodeToggle = this.shadowRoot.querySelector("#agentCodeToggle");
    const agentCodeStatus = this.shadowRoot.querySelector("#agentCodeStatus");
    const agentImageDialogPrompt = this.shadowRoot.querySelector("#agentImageDialogPrompt");
    const agentImageSubmitBtn = this.shadowRoot.querySelector("#agentImageSubmitBtn");
    const agentImageToggle = this.shadowRoot.querySelector("#agentImageToggle");
    const agentImageStatus = this.shadowRoot.querySelector("#agentImageStatus");
    const agentPreviewOffPrompt = this.shadowRoot.querySelector("#agentPreviewOffPrompt");
    const agentPreviewOffSubmitBtn = this.shadowRoot.querySelector("#agentPreviewOffSubmitBtn");
    const agentPreviewOffToggle = this.shadowRoot.querySelector("#agentPreviewOffToggle");
    const agentPreviewOffStatus = this.shadowRoot.querySelector("#agentPreviewOffStatus");
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

    const bindPromptSimulation = ({ promptEl, submitEl, toggleEl, statusEl, label }) => {
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
        pendingSendTimeout = window.setTimeout(() => {
          pendingSendTimeout = undefined;
          setSendingState(false);
          if (statusEl) statusEl.textContent = `Sent JSON (${source})`;
        }, 350);
      };

      submitEl?.addEventListener("click", () => {
        simulateSend("click");
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
      label: "Agent prompt (default)",
    });
    bindPromptSimulation({
      promptEl: agentCodeDialogPrompt,
      submitEl: agentCodeSubmitBtn,
      toggleEl: agentCodeToggle,
      statusEl: agentCodeStatus,
      label: "Agent prompt (code dialog)",
    });
    bindPromptSimulation({
      promptEl: agentImageDialogPrompt,
      submitEl: agentImageSubmitBtn,
      toggleEl: agentImageToggle,
      statusEl: agentImageStatus,
      label: "Agent prompt (image dialog)",
    });
    bindPromptSimulation({
      promptEl: agentPreviewOffPrompt,
      submitEl: agentPreviewOffSubmitBtn,
      toggleEl: agentPreviewOffToggle,
      statusEl: agentPreviewOffStatus,
      label: "Agent prompt (preview off)",
    });
    bindPromptSimulation({
      promptEl: agentDataPrompt,
      submitEl: agentDataSubmitBtn,
      toggleEl: agentDataToggle,
      statusEl: agentDataStatus,
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
