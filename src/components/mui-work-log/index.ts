import "../mui-accordion/core";
import "../mui-body";
import "../mui-icons/down-chevron";
import "../mui-icons/right-chevron";
import "../mui-icons/toggle";
import "../mui-rule";
import "../mui-stack/hstack";
import "../mui-stack/vstack";

class MuiWorkLog extends HTMLElement {
  static get observedAttributes() {
    return ["label", "open", "rule", "nested", "pending", "status"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("label")) this.setAttribute("label", "Worked");
    if (this.parentElement?.closest("mui-work-log")) this.setAttribute("nested", "");
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
        }
        :host([nested]:not(:last-child)) {
          margin-block-end: var(--space-300);
        }
        .summary {
          min-height: ${isNested ? "auto" : "auto"};
          width: 100%;
        }
        .summary::part(width) {
          width: 100%;
        }
        .summary[rule] {
          border-bottom: var(--border-thin);
          padding-block-end: var(--space-200);
        }
        .detail {
          padding-block-start: ${isNested ? "var(--space-100)" : "var(--space-400)"};
          padding-block-end: ${isNested ? "var(--space-100)" : "var(--space-400)"};
        }

        .summary-label[pending]::part(content) {
          color: transparent;
          background: linear-gradient(
            90deg,
            var(--work-log-shimmer-color-secondary) 0%,
            var(--work-log-shimmer-color-primary) 50%,
            var(--work-log-shimmer-color-secondary) 100%
          );
          background-size: 200% 100%;
          background-position: 100% 0;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: workLogShimmer 1.6s linear infinite;
        }

        @keyframes workLogShimmer {
          to {
            background-position: -100% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .summary-label[pending]::part(content) {
            animation: none;
            color: var(--work-log-shimmer-color-secondary);
            background: none;
            -webkit-text-fill-color: currentColor;
          }
        }

      </style>

      <mui-v-stack space="${isNested ? "var(--space-100)" : "var(--space-200)"}">
        ${
          isStatus
            ? `<mui-h-stack class="status-summary" alignY="center" space="var(--space-100)">
                <slot name="before"></slot>
                <slot name="icon"></slot>
                <mui-body class="summary-label" size="x-small" ${shouldShimmer ? "pending" : ""}>${label}</mui-body>
                <slot name="after"></slot>
              </mui-h-stack>`
            : `<mui-accordion-core ${open ? "open" : ""}>
                <mui-h-stack slot="summary" class="summary" ${hasSummaryRule ? "rule" : ""} alignY="center" space="var(--space-100)">
                  <slot name="before"></slot>
                  <slot name="icon"></slot>
                  <mui-body class="summary-label" size="x-small" ${shouldShimmer ? "pending" : ""}>${label}</mui-body>
                  <slot name="after"></slot>
                  <mui-icon-toggle rotate size="xx-small">
                    <mui-icon-right-chevron slot="start"></mui-icon-right-chevron>
                    <mui-icon-down-chevron slot="end"></mui-icon-down-chevron>
                  </mui-icon-toggle>
                </mui-h-stack>
                <div slot="detail" class="detail">
                  <slot></slot>
                </div>
              </mui-accordion-core>`
        }
        ${hasTrailingRule ? "<mui-rule></mui-rule>" : ""}
      </mui-v-stack>
    `;
  }
}

if (!customElements.get("mui-work-log")) {
  customElements.define("mui-work-log", MuiWorkLog);
}
