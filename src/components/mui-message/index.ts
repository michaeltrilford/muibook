import "../mui-stack/index";
import "../mui-icons/message";
import "../mui-icons/check";
import "../mui-icons/info";
import "../mui-icons/warning";
import "../mui-icons/attention";

type MessageVariant = "neutral" | "positive" | "info" | "warning" | "attention";
type MessageSize = "small" | "medium" | "large";

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
  private contentSlotListener: (() => void) | null = null;

  static get observedAttributes() {
    return ["variant", "heading", "icon", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (name === "variant" || name === "heading" || name === "icon" || name === "size") {
      this.render();
    }
  }

  private getMessageSize(): MessageSize {
    const size = this.getAttribute("size");
    if (size === "small" || size === "medium") return size;
    return "large";
  }

  private getInlineContentSize(size: MessageSize): string {
    if (size === "small") return "x-small";
    if (size === "medium") return "small";
    return "medium";
  }

  private setupContentSlot(size: MessageSize) {
    const contentSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
    if (!contentSlot) return;

    if (this.contentSlotListener) {
      contentSlot.removeEventListener("slotchange", this.contentSlotListener);
    }

    const syncContentSizes = () => {
      const inlineSize = this.getInlineContentSize(size);
      const nodes = contentSlot.assignedElements({ flatten: true });

      nodes.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        if (tag === "mui-body" || tag === "mui-link") {
          el.setAttribute("size", inlineSize);
        }
      });
    };

    this.contentSlotListener = syncContentSizes;
    contentSlot.addEventListener("slotchange", this.contentSlotListener);
    requestAnimationFrame(syncContentSizes);
  }

  private render() {
    const rawVariant = this.getAttribute("variant") || "neutral";
    const variant: MessageVariant = MESSAGE_VARIANTS.includes(rawVariant as MessageVariant)
      ? (rawVariant as MessageVariant)
      : "neutral";
    const size = this.getMessageSize();

    const headingText = this.getAttribute("heading") || "Heading...";
    const customIcon = this.getAttribute("icon");

    const iconTag = customIcon || iconTags[variant];
    const iconColor = iconColors[variant];
    const headingColor = headingColors[variant];
    const variantStyle = variantStyles[variant];
    const ariaLive = ariaLiveMap[variant];
    const role = roleMap[variant];
    const horizontalGap =
      size === "large" ? "var(--message-gap-horizontal)" : size === "medium" ? "var(--space-200)" : "var(--space-100)";
    const verticalGap =
      size === "large" ? "var(--message-gap-vertical)" : size === "medium" ? "var(--space-100)" : "var(--space-050)";
    const headingFontSize = size === "large" ? "var(--font-size-200)" : "var(--font-size-100)";
    const iconSize = size === "large" ? "medium" : "small";

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
        font-size: ${headingFontSize};
        ${headingColor}
      }
    `;

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${styles}</style>
    
      <section aria-labelledby="message-heading" aria-live="${ariaLive}" role="${role}">
        <mui-h-stack space="${horizontalGap}">
          <div class="icon">
            <${iconTag} size="${iconSize}" color="var(${iconColor})"></${iconTag}>
          </div>
          <mui-v-stack space="${verticalGap}">
            <div class="heading" id="message-heading">${headingText}</div>
            <slot></slot>
          </mui-v-stack>
        </mui-h-stack>
      </section>
      `;

    this.setupContentSlot(size);
  }
}

if (!customElements.get("mui-message")) {
  customElements.define("mui-message", MuiMessage);
}
