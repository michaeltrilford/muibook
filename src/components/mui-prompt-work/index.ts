import "../mui-accordion/core";
import "../mui-body";
import "../mui-icons/down-chevron";
import "../mui-icons/right-chevron";
import "../mui-icons/toggle";
import "../mui-rule";
import "../mui-stack/hstack";
import "../mui-stack/vstack";

class MuiPromptWork extends HTMLElement {
  static get observedAttributes() {
    return ["label", "open", "rule", "nested", "pending", "status"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("label")) this.setAttribute("label", "Worked");
    if (this.parentElement?.closest("mui-prompt-work")) this.setAttribute("nested", "");
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const label = this.getAttribute("label") || "Worked";
    const open = this.hasAttribute("open");
    const isNested = this.hasAttribute("nested");
    const isPending = this.hasAttribute("pending");
    const isStatus = this.hasAttribute("status");
    const shouldShimmer = isStatus && isPending;
    const isHeader = this.getAttribute("slot") === "header";
    const hasSummaryRule = isHeader && !isNested && !isStatus;
    const hasTrailingRule = this.hasAttribute("rule") && !hasSummaryRule;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          color: var(--text-color-secondary);
        }
        .summary {
          color: var(--text-color-secondary);
          min-height: ${isNested ? "var(--space-500)" : "auto"};
          width: 100%;
        }
        .summary[rule] {
          border-bottom: var(--border-thin);
          padding-block-end: var(--space-200);
        }
        .status-summary {
          color: var(--text-color-secondary);
        }
        .detail {
          padding-block-start: ${isNested ? "var(--space-100)" : "var(--space-400)"};
          padding-block-end: ${isNested ? "var(--space-100)" : "var(--space-400)"};
        }

        .summary-label[pending]::part(color) {
          animation: promptWorkPulse 1.4s ease-in-out infinite;
        }

        @keyframes promptWorkPulse {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .summary-label[pending]::part(color) {
            animation: none;
            opacity: 1;
          }
        }

      </style>

      <mui-v-stack space="${isNested ? "var(--space-100)" : "var(--space-200)"}">
        ${
          isStatus
            ? `<mui-h-stack class="status-summary" alignY="center" space="var(--space-100)">
                <slot name="icon"></slot>
                <mui-body class="summary-label" size="x-small" variant="tertiary" ${shouldShimmer ? "pending" : ""}>${label}</mui-body>
              </mui-h-stack>`
            : `<mui-accordion-core ${open ? "open" : ""}>
                <mui-h-stack slot="summary" class="summary" ${hasSummaryRule ? "rule" : ""} alignY="center" space="var(--space-100)">
                  <slot name="icon"></slot>
                  <mui-body class="summary-label" size="x-small" variant="tertiary" ${shouldShimmer ? "pending" : ""}>${label}</mui-body>
                  <mui-icon-toggle rotate size="xx-small">
                    <mui-icon-right-chevron slot="start"></mui-icon-right-chevron>
                    <mui-icon-down-chevron slot="end"></mui-icon-down-chevron>
                  </mui-icon-toggle>
                </mui-h-stack>
                <mui-v-stack slot="detail" class="detail" space="var(--space-100)">
                  <slot></slot>
                </mui-v-stack>
              </mui-accordion-core>`
        }
        ${hasTrailingRule ? "<mui-rule></mui-rule>" : ""}
      </mui-v-stack>
    `;
  }
}

if (!customElements.get("mui-prompt-work")) {
  customElements.define("mui-prompt-work", MuiPromptWork);
}
