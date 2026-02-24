import "../mui-body";
import "../mui-icons/info";

class MuiFormMessage extends HTMLElement {
  static get observedAttributes() {
    return ["size", "weight", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private getIconColor(variant: string): string {
    const variantColorMap: Record<string, string> = {
      optional: "var(--text-color-optional)",
      warning: "var(--text-color-warning)",
      success: "var(--text-color-success)",
      error: "var(--text-color-error)",
    };
    return variantColorMap[variant] || "var(--text-color)";
  }

  private getIconSize(size: string): string {
    const sizeMap: Record<string, string> = {
      "x-small": "x-small",
      small: "small",
      medium: "small",
      large: "medium",
    };
    return sizeMap[size] || "small";
  }

  private syncBeforeIcon() {
    if (!this.shadowRoot) return;
    const beforeSlot = this.shadowRoot.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const iconColor = this.getIconColor(this.getAttribute("variant") || "optional");
    const iconSize = this.getIconSize(this.getAttribute("size") || "small");

    const assigned = beforeSlot?.assignedElements({ flatten: true }) ?? [];
    assigned.forEach((el) => {
      if (el.tagName.toLowerCase().startsWith("mui-icon-")) {
        if (!el.hasAttribute("color")) {
          el.setAttribute("color", iconColor);
        }
        if (!el.hasAttribute("size")) {
          el.setAttribute("size", iconSize);
        }
      }
    });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "small");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "small";
    const weight = this.getAttribute("weight") || "regular";
    const variant = this.getAttribute("variant") || "optional";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          width: 100%;
        }
        mui-body {
          margin-inline-start: var(--stroke-size-100);
          margin-block-start: var(--space-200);
        }
      </style>

      <mui-body size="${size}" weight="${weight}" variant="${variant}">
        <slot slot="before" name="before">
          <mui-icon-info id="default-before-icon" size="${this.getIconSize(size)}" color="${this.getIconColor(variant)}"></mui-icon-info>
        </slot>
        <slot></slot>
        <slot slot="after" name="after"></slot>
      </mui-body>
    `;

    const beforeSlot = this.shadowRoot.querySelector('slot[name="before"]');
    beforeSlot?.addEventListener("slotchange", () => this.syncBeforeIcon());
    this.syncBeforeIcon();
  }
}

if (!customElements.get("mui-form-message")) {
  customElements.define("mui-form-message", MuiFormMessage);
}

// Backward compatibility alias
if (!customElements.get("mui-form-hint")) {
  class MuiFormHintAlias extends MuiFormMessage {}
  customElements.define("mui-form-hint", MuiFormHintAlias);
}
