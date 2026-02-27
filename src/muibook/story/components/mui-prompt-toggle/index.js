import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptToggle");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt-toggle";<br>
        </mui-code>
      </spec-card>

      <story-card
        id="recommended-prompt"
        title="Recommended Prompt Composition"
        usage="Use mui-prompt-toggle only in slot='actions'.|||Prompt includes a default submit control in actions-right; override only when needed.|||Wire submit and context events from the parent mui-prompt."
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt id="promptToggleInteractive" placeholder="Try toggle + submit..." fan-open context-mode="icon" enter-submit debug>
            <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
            <mui-prompt-toggle slot="actions">
              <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
                <mui-icon-accessibility size="small"></mui-icon-accessibility>
              </mui-button>
              <mui-h-stack context-active space="var(--space-100)" aligny="center" hidden>
                <mui-button variant="secondary" size="x-small">Reduce Motion</mui-button>
                <mui-button context-close variant="tertiary" size="x-small">
                  Close
                  <mui-icon-close slot="after" size="xx-small"></mui-icon-close>
                </mui-button>
              </mui-h-stack>
            </mui-prompt-toggle>
          </mui-prompt>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt enter-submit context-mode="icon"&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;...context-toggle / context-active...&lt;/mui-prompt-toggle&gt;<br />
          &nbsp;&nbsp;// built-in actions-right submit is used by default<br />
          &lt;/mui-prompt&gt;<br /><br />
          prompt.addEventListener("submit", (event) =&gt; { ... });<br />
          prompt.addEventListener("prompt-context-change", (event) =&gt; { ... });
        </story-code-block>
      </story-card>


      <story-card id="toggle-private" title="Private Mode" usage="Toggle into a private-mode chip and dismiss to return to icon mode.">
        <mui-prompt debug slot="body" placeholder="Private Mode" fan-open context-mode="icon">
        <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
        <mui-prompt-toggle slot="actions">
          <mui-hint placement="top">
            <mui-button slot="trigger" context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-attention size="small"></mui-icon-attention>
            </mui-button>
            Private mode
          </mui-hint>
          <mui-chip context-chip dismiss size="small" hidden>Private Mode</mui-chip>
        </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-hint placement="top"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="trigger" context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-hint&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip context-chip dismiss size="small" hidden&gt;Private Mode&lt;/mui-chip&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle-chip" title="Button to Chip" usage="Swap an icon action to a contextual chip state, then dismiss back.">
        <mui-prompt debug slot="body" placeholder="Button > Chip" fan-open context-mode="icon">
          <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-play-rectangle size="small"></mui-icon-play-rectangle>
            </mui-button>
            <mui-chip context-chip dismiss size="small" hidden>Video</mui-chip>
          </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-chip context-chip dismiss size="small" hidden&gt;Video&lt;/mui-chip&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle-spinner" title="Button to Input" usage="Toggle into a spinner action with Stop button.">
        <mui-prompt debug slot="body" placeholder="Button > Spinner" fan-open context-mode="icon">
          <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-search size="small"></mui-icon-search>
            </mui-button>
            <mui-h-stack context-active space="var(--space-100)" aligny="center" hidden>
              <mui-input context-active con size="x-small" label="X-Small" placeholder="Search..." hide-label style="min-width: 10rem"></mui-input>
              <mui-button context-close variant="tertiary" size="x-small">
                <mui-icon-close size="xx-small"></mui-icon-close>
              </mui-button>
            </mui-h-stack>
          </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-active context-close size="x-small" hidden&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-spinner context-spinner slot="before" size="small"&gt;&lt;/mui-spinner&gt; Stop<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle-spinner" title="Button to Spinner" usage="Toggle into a spinner action with Stop button.">
        <mui-prompt debug slot="body" placeholder="Button > Spinner" fan-open context-mode="icon">
          <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="x-small" aria-label="Toggle context">
              Refresh
            </mui-button>
            <mui-button context-active context-close variant="tertiary" size="x-small" hidden>
              <mui-spinner context-spinner slot="before" size="small" label="Loading"></mui-spinner>
              Stop
            </mui-button>
          </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-active context-close size="x-small" hidden&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-spinner context-spinner slot="before" size="small"&gt;&lt;/mui-spinner&gt; Stop<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle-button" title="Button to Button" usage="Toggle to custom action group, then close.">
        <mui-prompt debug slot="body" placeholder="Button > Button" fan-open context-mode="icon">
          <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-globe size="small"></mui-icon-globe>
            </mui-button>
            <mui-h-stack context-active space="var(--space-100)" aligny="center" hidden>
              <mui-button size="x-small" variant="secondary">Apply</mui-button>
              <mui-button context-close variant="tertiary" size="x-small">
                Close
                <mui-icon-close slot="after" size="xx-small"></mui-icon-close>
              </mui-button>
            </mui-h-stack>
          </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack context-active hidden&gt;...&lt;/mui-h-stack&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle-calendar" title="Button to Calendar" usage="Toggle from a calendar icon into date-range actions with a close fallback. Selecting a range updates prompt value.">
        <mui-prompt id="toggleCalendarPrompt" debug slot="body" placeholder="Calendar tools" fan-open context-mode="icon">
          <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-calendar size="small"></mui-icon-calendar>
            </mui-button>
            <mui-h-stack context-active space="var(--space-100)" aligny="center" hidden>
              <mui-dropdown position="right" vertical-position="up">
                <mui-button id="toggleCalendarActionLabel" slot="action" variant="secondary" size="x-small">
                  This Week
                  <mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>
                </mui-button>
                <mui-button data-calendar-range="Today" variant="tertiary" size="small">Today</mui-button>
                <mui-button data-calendar-range="This Week" variant="tertiary" size="small">This Week</mui-button>
                <mui-button data-calendar-range="Last 7 Days" variant="tertiary" size="small">Last 7 Days</mui-button>
                <mui-button data-calendar-range="Pick Range" variant="tertiary" size="small">Pick Range</mui-button>
              </mui-dropdown>
              <mui-button context-close variant="tertiary" size="x-small">
                Close
                <mui-icon-close slot="after" size="xx-small"></mui-icon-close>
              </mui-button>
            </mui-h-stack>
          </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle variant="tertiary" icon-only size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-calendar size="small"&gt;&lt;/mui-icon-calendar&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack context-active hidden&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right" vertical-position="up"&gt;...&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button context-close size="x-small" variant="tertiary"&gt;Close&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

      <story-card id="toggle-dropdown" title="Accessibility tools" usage="Toggle into accessibility controls and close back to icon mode. Menu actions apply live prompt settings.">
        <mui-prompt id="toggleAccessibilityPrompt" debug slot="body" placeholder="Accessibility tools" fan-open context-mode="icon">
          <mui-rule slot="actions" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" style="margin-inline: var(--space-200); pointer-events: none;" aria-hidden="true"></mui-rule>
          <mui-prompt-toggle slot="actions">
            <mui-button context-toggle variant="tertiary" icon-only size="small" aria-label="Toggle context">
              <mui-icon-accessibility size="small"></mui-icon-accessibility>
            </mui-button>
            <mui-h-stack context-active space="var(--space-100)" aligny="center" hidden>
              <mui-dropdown position="right" vertical-position="up">
                <mui-button id="toggleAccessibilityActionLabel" slot="action" variant="secondary" size="x-small">
                  Accessibility
                  <mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>
                </mui-button>
                <mui-button data-accessibility-action="effects" variant="tertiary" size="small">Turn Off Effects</mui-button>
                <mui-button data-accessibility-action="motion" variant="tertiary" size="small">Reduce Motion</mui-button>
                <mui-button data-accessibility-action="contrast" variant="tertiary" size="small">Increase Contrast</mui-button>
              </mui-dropdown>
              <mui-button context-close variant="tertiary" size="x-small">
                Close
                <mui-icon-close slot="after" size="xx-small"></mui-icon-close>
              </mui-button>
            </mui-h-stack>
          </mui-prompt-toggle>
        </mui-prompt>
        <story-code-block slot="footer" scrollable>
          &nbsp;&nbsp;&lt;mui-prompt-toggle slot="actions"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button context-toggle ...&gt;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack context-active hidden&gt;...dropdown...&lt;/mui-h-stack&gt;<br />
          &lt;/mui-prompt-toggle&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Toggle"}"
        description="${data?.description || "Toggle wrapper for context icon/chip states inside Prompt actions."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="recommended-prompt::Recommended Prompt Composition|||toggle-private::Private Mode|||toggle-chip::Button to Chip|||toggle-spinner::Button to Spinner|||toggle-button::Button to Button|||toggle-calendar::Button to Calendar|||toggle-dropdown::Accessibility Tools"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    const setDefaultSubmitState = (promptEl, isSending) => {
      const toggle = promptEl?.shadowRoot?.querySelector("#promptDefaultSubmitAction mui-icon-toggle");
      if (!toggle) return;
      toggle.toggle = isSending;
      toggle.setAttribute("aria-pressed", String(isSending));
    };

    this.shadowRoot.querySelectorAll("mui-prompt").forEach((promptEl) => {
      promptEl.addEventListener("submit", () => {
        setDefaultSubmitState(promptEl, true);
        window.setTimeout(() => setDefaultSubmitState(promptEl, false), 350);
      });
    });

    const calendarPrompt = this.shadowRoot.querySelector("#toggleCalendarPrompt");
    const calendarActionLabel = this.shadowRoot.querySelector("#toggleCalendarActionLabel");
    const accessibilityPrompt = this.shadowRoot.querySelector("#toggleAccessibilityPrompt");
    const accessibilityActionLabel = this.shadowRoot.querySelector("#toggleAccessibilityActionLabel");

    this.shadowRoot.addEventListener("click", (event) => {
      const path = event.composedPath();
      const calendarAction = path.find(
        (node) => node instanceof HTMLElement && node.hasAttribute?.("data-calendar-range"),
      );
      if (calendarAction instanceof HTMLElement) {
        const range = calendarAction.getAttribute("data-calendar-range") || "This Week";
        if (calendarActionLabel) {
          calendarActionLabel.innerHTML = `${range}<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>`;
        }
        if (calendarPrompt) calendarPrompt.setAttribute("value", `Calendar range: ${range}`);
        return;
      }

      const accessibilityAction = path.find(
        (node) => node instanceof HTMLElement && node.hasAttribute?.("data-accessibility-action"),
      );
      if (!(accessibilityAction instanceof HTMLElement) || !accessibilityPrompt) return;
      const action = accessibilityAction.getAttribute("data-accessibility-action") || "";

      if (action === "effects") {
        accessibilityPrompt.toggleAttribute("effects-off");
        const enabled = accessibilityPrompt.hasAttribute("effects-off");
        if (accessibilityActionLabel) {
          accessibilityActionLabel.innerHTML = `Effects ${enabled ? "Off" : "On"}<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>`;
        }
        accessibilityPrompt.setAttribute("value", `Accessibility: effects ${enabled ? "off" : "on"}`);
        return;
      }
      if (action === "motion") {
        const reduced = accessibilityPrompt.style.getPropertyValue("--prompt-hover-sweep-speed") === "var(--speed-900)";
        if (reduced) {
          accessibilityPrompt.style.removeProperty("--prompt-hover-sweep-speed");
          accessibilityPrompt.style.removeProperty("--prompt-focus-pulse-speed");
        } else {
          accessibilityPrompt.style.setProperty("--prompt-hover-sweep-speed", "var(--speed-900)");
          accessibilityPrompt.style.setProperty("--prompt-focus-pulse-speed", "var(--speed-900)");
        }
        if (accessibilityActionLabel) {
          accessibilityActionLabel.innerHTML = `Motion ${reduced ? "Normal" : "Reduced"}<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>`;
        }
        accessibilityPrompt.setAttribute("value", `Accessibility: motion ${reduced ? "normal" : "reduced"}`);
        return;
      }
      if (action === "contrast") {
        const high = accessibilityPrompt.getAttribute("color-layout") === "swap";
        if (high) {
          accessibilityPrompt.removeAttribute("color-layout");
          accessibilityPrompt.style.removeProperty("--prompt-accent-primary");
          accessibilityPrompt.style.removeProperty("--prompt-accent-secondary");
        } else {
          accessibilityPrompt.setAttribute("color-layout", "swap");
          accessibilityPrompt.style.setProperty("--prompt-accent-primary", "var(--yellow-500)");
          accessibilityPrompt.style.setProperty("--prompt-accent-secondary", "var(--blue-500)");
        }
        if (accessibilityActionLabel) {
          accessibilityActionLabel.innerHTML = `Contrast ${high ? "Default" : "High"}<mui-icon-down-chevron slot="after" size="x-small"></mui-icon-down-chevron>`;
        }
        accessibilityPrompt.setAttribute("value", `Accessibility: contrast ${high ? "default" : "high"}`);
      }
    });
  }
}

customElements.define("story-prompt-toggle", StoryPromptToggle);
