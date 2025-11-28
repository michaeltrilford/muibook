import "../mui-stack/index";
import "../mui-icons/message";
import "../mui-icons/check";
import "../mui-icons/info";
import "../mui-icons/warning";
import "../mui-icons/attention";

type MessageVariant = "neutral" | "positive" | "info" | "warning" | "attention";

const MESSAGE_VARIANTS: MessageVariant[] = ["neutral", "positive", "info", "warning", "attention"];

const variantStyles: Record<MessageVariant, string> = {
  neutral: "background-color: var(--feedback-neutral-background); border: var(--feedback-neutral-border);",
  positive: "background-color: var(--feedback-positive-background); border: var(--feedback-positive-border);",
  info: "background-color: var(--feedback-info-background); border: var(--feedback-info-border);",
  warning: "background-color: var(--feedback-warning-background); border: var(--feedback-warning-border);",
  attention: "background-color: var(--feedback-attention-background); border: var(--feedback-attention-border);",
};

const ariaLiveMap: Record<MessageVariant, "polite" | "assertive"> = {
  neutral: "polite",
  positive: "polite",
  info: "polite",
  warning: "assertive",
  attention: "assertive",
};

const roleMap: Record<MessageVariant, "status" | "alert"> = {
  neutral: "status",
  positive: "status",
  info: "status",
  warning: "alert",
  attention: "alert",
};

const iconColors: Record<MessageVariant, string> = {
  neutral: "--feedback-neutral-icon",
  positive: "--feedback-positive-icon",
  info: "--feedback-info-icon",
  warning: "--feedback-warning-icon",
  attention: "--feedback-attention-icon",
};

const headingColors: Record<MessageVariant, string> = {
  neutral: "color: var(--feedback-neutral-text);",
  positive: "color: var(--feedback-positive-text);",
  info: "color: var(--feedback-info-text);",
  warning: "color: var(--feedback-warning-text);",
  attention: "color: var(--feedback-attention-text);",
};

const iconTags: Record<MessageVariant, string> = {
  neutral: "mui-icon-message",
  positive: "mui-icon-check",
  info: "mui-icon-info",
  warning: "mui-icon-warning",
  attention: "mui-icon-attention",
};

/* Mui Message */
class MuiMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const rawVariant = this.getAttribute("variant") || "neutral";
    const variant: MessageVariant = MESSAGE_VARIANTS.includes(rawVariant as MessageVariant)
      ? (rawVariant as MessageVariant)
      : "neutral";

    const headingText = this.getAttribute("heading") || "Heading...";
    const customIcon = this.getAttribute("icon");

    const iconTag = customIcon || iconTags[variant];
    const iconColor = iconColors[variant];
    const headingColor = headingColors[variant];
    const variantStyle = variantStyles[variant];
    const ariaLive = ariaLiveMap[variant];
    const role = roleMap[variant];

    const styles = /*css*/ `
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      section {
        padding: var(--message-padding);
        border-radius: var(--message-radius);
        ${variantStyle}
      }

      .icon {
        margin-top: var(--space-025);
        display: flex;
      }

      .heading {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-200);
        ${headingColor}
      }
    `;

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${styles}</style>
    
      <section aria-labelledby="message-heading" aria-live="${ariaLive}" role="${role}">
        <mui-h-stack space="var(--message-gap-horizontal)">
          <div class="icon">
            <${iconTag} size="medium" color="var(${iconColor})"></${iconTag}>
          </div>
          <mui-v-stack space="var(--message-gap-vertical)">
            <div class="heading" id="message-heading">${headingText}</div>
            <slot></slot>
          </mui-v-stack>
        </mui-h-stack>
      </section>
      `;
  }
}

if (!customElements.get("mui-message")) {
  customElements.define("mui-message", MuiMessage);
}
