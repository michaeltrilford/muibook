import "../../mui-body";
import "../../mui-icons/checkmark";
import "../../mui-icons/exclamationmark";
import "../../mui-icons/notification";

class MuiStep extends HTMLElement {
  static get observedAttributes() {
    return ["state", "resolved-state", "title", "direction", "hide-icon", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const state = this.getAttribute("resolved-state") || this.getAttribute("state") || "upcoming";
    const direction = this.getAttribute("direction") || "horizontal";
    const rawSize = this.getAttribute("size");
    const size = rawSize === "x-small" || rawSize === "small" ? rawSize : "medium";
    const title = this.getAttribute("title") || "";
    const hideIcon = this.hasAttribute("hide-icon");
    const isEmphasisState = state === "active" || state === "error" || state === "pending";
    const iconSize = size === "x-small" ? "xx-small" : size === "small" ? "x-small" : "small";
    const bodySize = size === "medium" ? "small" : "x-small";
    const iconByState: Record<string, string> = {
      success: `<mui-icon-checkmark class="dot-icon" size="${iconSize}" color="var(--stepper-icon-color)"></mui-icon-checkmark>`,
      completed: `<mui-icon-checkmark class="dot-icon" size="${iconSize}" color="var(--stepper-icon-color)"></mui-icon-checkmark>`,
      active: `<mui-icon-notification class="dot-icon" size="${iconSize}" color="var(--stepper-icon-color)"></mui-icon-notification>`,
      error: `<mui-icon-exclamationmark class="dot-icon" size="${iconSize}" color="var(--stepper-icon-color)"></mui-icon-exclamationmark>`,
      pending: `<mui-icon-exclamationmark class="dot-icon" size="${iconSize}" color="var(--stepper-icon-color)"></mui-icon-exclamationmark>`,
      disabled: "",
    };

    // Content HTML
    const contentHTML = `
    <div class="content">
      <mui-body
        size="${bodySize}"
        ${isEmphasisState ? "weight='bold'" : ""}
        class="${state === "active" ? "active" : ""}"
      >
        ${title}
      </mui-body>
      <slot name="secondary"></slot>
    </div>
  `;

    // Dot wrapper HTML
    const dotHTML = `
  <div class="dotwrapper">
    <div class="dot ${state}">
      ${hideIcon ? "" : iconByState[state] || ""}
    </div>
    ${
      direction === "horizontal"
        ? `<div class="line before ${direction}"></div><div class="line after ${direction}"></div>`
        : ""
    }
  </div>
`;

    // Conditional ordering
    const innerHTML =
      direction === "horizontal"
        ? contentHTML + dotHTML // content above
        : dotHTML + contentHTML; // vertical: dot left, content right

    const dotSize =
      size === "x-small"
        ? "var(--stepper-dot-size-x-small)"
        : size === "small"
          ? "var(--stepper-dot-size-small)"
          : "var(--stepper-dot-size)";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          flex-direction: ${direction === "horizontal" ? "column" : "row"};
          align-items: ${direction === "horizontal" ? "center" : "flex-start"};
          flex: 1;
        }

        .dotwrapper {
          position: relative; /* anchor for lines */
          display: flex;
          align-items: center;
          justify-content: center; /* keeps dot centered */
          width: ${direction === "horizontal" ? "100%" : "auto"};
        }

        /* .dot stays unchanged */
        .dot {
          width: ${dotSize};
          height: ${dotSize};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: inset 0 0 0 var(--stroke-size-200) var(--stepper-border-color);
          background: var(--stepper-dot-background, var(--surface-elevated-200));
          z-index: 1;
        }

        .dot.completed {
          background: var(--stepper-background-active);
          box-shadow: inset 0 0 0 var(--stroke-size-200) var(--stepper-background-active);
        }
        .dot.success {
          background: var(--stepper-success-color);
          box-shadow: inset 0 0 0 var(--stroke-size-200) var(--stepper-success-color);
        }
        .dot.active {
          background: var(--stepper-background-active);
        }
        .dot.error {
          background: var(--stepper-error-color);
          box-shadow: inset 0 0 0 var(--stroke-size-200) var(--stepper-error-color);
        }
        .dot-icon {
          display: block;
          line-height: 1;
        }
        .dot.disabled {
          opacity: 1;
          box-shadow: inset 0 0 0 var(--stroke-size-200)
            color-mix(in srgb, var(--stepper-disabled-color) 70%, transparent 30%);
        }
        .dot.pending {
          position: relative;
          overflow: visible;
          background: var(--stepper-warning-color);
          box-shadow: inset 0 0 0 var(--stroke-size-200) var(--stepper-warning-color);
        }
        .dot.pending::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--stepper-warning-color);
          filter: blur(var(--stroke-size-300));
          opacity: 0.1;
          transform: scale(1);
          animation: pending-blur-pulse var(--speed-500) ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }
        .dot.pending .dot-icon {
          filter: drop-shadow(0 0 var(--stroke-size-200) color-mix(in srgb, var(--stepper-warning-color) 60%, transparent 40%));
        }
        .dot.error .dot-icon {
          filter: drop-shadow(0 0 var(--stroke-size-200) color-mix(in srgb, var(--stepper-error-color) 60%, transparent 40%));
        }

        .line {
          position: absolute;
          background: var(--stepper-color);
        }
        :host([resolved-state="completed"]) .line.before,
        :host([resolved-state="completed"]) .line.after,
        :host([resolved-state="active"]) .line.before {
          background: var(--stepper-background-active);
        }
        :host([resolved-state="error"]) .line.before,
        :host([resolved-state="error"]) .line.after {
          background: var(--stepper-error-color);
        }
        :host([resolved-state="success"]) .line.before,
        :host([resolved-state="success"]) .line.after {
          background: var(--stepper-success-color);
        }
        :host([resolved-state="pending"]) .line.before,
        :host([resolved-state="pending"]) .line.after {
          background: var(--stepper-warning-color);
        }
        :host([resolved-state="error"]) .line.before.horizontal {
          background: linear-gradient(90deg, var(--stepper-background-active) 0%, var(--stepper-error-color) 70%, var(--stepper-error-color) 100%);
        }
        :host([resolved-state="success"]) .line.before.horizontal {
          background: linear-gradient(90deg, var(--stepper-background-active) 0%, var(--stepper-success-color) 70%, var(--stepper-success-color) 100%);
        }
        :host([resolved-state="pending"]) .line.before.horizontal {
          background: linear-gradient(
            90deg,
            var(--stepper-background-active) 0%,
            var(--stepper-warning-color) 70%,
            var(--stepper-warning-color) 100%
          );
        }
        :host([resolved-state="disabled"]) .line.before.horizontal {
          background: linear-gradient(
            90deg,
            var(--stepper-background-active) 0%,
            var(--stepper-disabled-color) 70%,
            var(--stepper-disabled-color) 100%
          );
        }
        :host([resolved-state="error"]) .line.after.horizontal {
          background: linear-gradient(
            90deg,
            var(--stepper-error-color) 0%,
            color-mix(in srgb, var(--stepper-error-color) 55%, var(--stepper-color) 45%) 40%,
            var(--stepper-color) 100%
          );
        }
        :host([resolved-state="success"]) .line.after.horizontal {
          background: linear-gradient(
            90deg,
            var(--stepper-success-color) 0%,
            color-mix(in srgb, var(--stepper-success-color) 55%, var(--stepper-color) 45%) 40%,
            var(--stepper-color) 100%
          );
        }
        :host([resolved-state="pending"]) .line.after.horizontal {
          background: linear-gradient(
            90deg,
            var(--stepper-warning-color) 0%,
            color-mix(in srgb, var(--stepper-warning-color) 55%, var(--stepper-color) 45%) 40%,
            var(--stepper-color) 100%
          );
        }
        :host([resolved-state="disabled"]) .line.after.horizontal {
          background: linear-gradient(
            90deg,
            var(--stepper-disabled-color) 0%,
            color-mix(in srgb, var(--stepper-disabled-color) 55%, var(--stepper-color) 45%) 40%,
            var(--stepper-color) 100%
          );
        }

        .line.before.horizontal {
          top: 50%;
          left: 0%;
          width: 50%;
          height: var(--stroke-size-200);
          transform: translateY(-50%);
        }
        .line.after.horizontal {
          top: 50%;
          right: 0%;
          width: 50%;
          height: var(--stroke-size-200);
          transform: translateY(-50%);
        }

        :host([position="first"]) .line.before {
          display: none;
        }
        :host([position="last"]) .line.after {
          display: none;
        }


        .content {
          display: flex;
          flex-direction: column;
        }

        :host([direction="horizontal"]) .content {
          margin-bottom: var(--space-200);
          align-items: center;
          text-align: center;
        }
        :host([size="small"][direction="horizontal"]) .content {
          margin-bottom: var(--space-100);
        }
        :host([size="x-small"][direction="horizontal"]) .content {
          margin-bottom: var(--space-050);
        }

        :host([direction="vertical"]) .content {
          margin-left: calc( -1 * ((${dotSize} / 2) + var(--stroke-size-100)));
          padding-left: ${dotSize};
          padding-bottom: ${dotSize};
          align-items: start;
          text-align: left;
          position: relative;
        }

        :host([direction="vertical"]) .content:before {
          content: "";
          width: var(--stroke-size-200);
          height: 100%;
          position: absolute;
          background: var(--stepper-border-color);
          margin-left: calc(-1 * ${dotSize});
          height: calc(100% - ${dotSize});
          bottom: calc(-1 * var(--stroke-size-100));

        }
        :host([direction="vertical"][resolved-state="error"]) .content:before {
          background: linear-gradient(
            180deg,
            var(--stepper-error-color) 0%,
            color-mix(in srgb, var(--stepper-error-color) 60%, var(--stepper-border-color) 40%) 45%,
            var(--stepper-border-color) 100%
          );
        }
        :host([direction="vertical"][resolved-state="success"]) .content:before {
          background: linear-gradient(
            180deg,
            var(--stepper-success-color) 0%,
            color-mix(in srgb, var(--stepper-success-color) 60%, var(--stepper-border-color) 40%) 45%,
            var(--stepper-border-color) 100%
          );
        }
        :host([direction="vertical"][resolved-state="pending"]) .content:before {
          background: linear-gradient(
            180deg,
            var(--stepper-warning-color) 0%,
            color-mix(in srgb, var(--stepper-warning-color) 60%, var(--stepper-border-color) 40%) 45%,
            var(--stepper-border-color) 100%
          );
        }
        :host([direction="vertical"][resolved-state="disabled"]) .content:before {
          background: linear-gradient(
            180deg,
            var(--stepper-disabled-color) 0%,
            color-mix(in srgb, var(--stepper-disabled-color) 60%, var(--stepper-border-color) 40%) 45%,
            var(--stepper-border-color) 100%
          );
        }

        :host([direction="vertical"][position="last"]) .content:before {
          display: none;
        }

        :host([direction="vertical"][position="last"]) .content {
          border-color: transparent;
        }


        :host([direction="vertical"]) .dotwrapper {
          width: ${dotSize};
          min-width: ${dotSize};
          flex: 0 0 ${dotSize};
          margin-top: var(--space-200);
          margin-bottom: var(--space-200);
        }
        :host([direction="vertical"]) .dotwrapper::before {
          content: "";
          position: absolute;
          top: calc(-1 * var(--space-200));
          left: calc(50% - var(--stroke-size-100));
          width: var(--stroke-size-200);
          height: var(--space-200);
          background: var(--stepper-border-color);
          pointer-events: none;
        }
        :host([direction="vertical"][position="first"]) .dotwrapper::before {
          display: none;
        }
        :host([direction="vertical"][resolved-state="error"]) .dotwrapper::before {
          background: linear-gradient(
            180deg,
            var(--stepper-border-color) 0%,
            color-mix(in srgb, var(--stepper-error-color) 45%, var(--stepper-border-color) 55%) 45%,
            var(--stepper-error-color) 100%
          );
        }
        :host([direction="vertical"][resolved-state="pending"]) .dotwrapper::before {
          background: linear-gradient(
            180deg,
            var(--stepper-border-color) 0%,
            color-mix(in srgb, var(--stepper-warning-color) 45%, var(--stepper-border-color) 55%) 45%,
            var(--stepper-warning-color) 100%
          );
        }

        .title[active] {
          font-weight: bold;
        }

        mui-body.active::part(color) {
          color: var(--stepper-text-color-active);;
        }
        :host([resolved-state="completed"]) mui-body::part(color),
        :host([resolved-state="active"]) mui-body::part(color) {
          color: var(--stepper-text-color-active);
        }
        :host([resolved-state="error"]) mui-body::part(color) {
          color: var(--stepper-error-color);
        }
        :host([resolved-state="success"]) mui-body::part(color) {
          color: var(--stepper-success-color);
        }
        :host([resolved-state="pending"]) mui-body::part(color) {
          color: var(--stepper-warning-color);
        }
        :host([resolved-state="disabled"]) mui-body::part(color) {
          color: var(--stepper-disabled-color);
        }
        :host([resolved-state="disabled"]) {
          cursor: not-allowed;
        }
        :host([role="button"]) {
          cursor: pointer;
        }

        @keyframes pending-blur-pulse {
          0% {
            opacity: 0.08;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.16);
          }
          100% {
            opacity: 0.08;
            transform: scale(1);
          }
        }

      </style>

      ${innerHTML}

    `;
  }
}

if (!customElements.get("mui-step")) {
  customElements.define("mui-step", MuiStep);
}
