type Variant = "neutral" | "positive" | "warning" | "attention";

class MuiBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["variant"];
  }

  connectedCallback() {
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "neutral");
    }
    this.setAttribute("role", "status");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variantAttr = this.getAttribute("variant") || "neutral";
    const variant = variantAttr as Variant;

    const backgroundMap: Record<Variant, string> = {
      neutral: "var(--badge-background-neutral)",
      positive: "var(--badge-background-positive)",
      warning: "var(--badge-background-warning)",
      attention: "var(--badge-background-attention)",
    };

    const ariaLiveMap: Record<Variant, "off" | "polite" | "assertive"> = {
      neutral: "off",
      positive: "polite",
      warning: "assertive",
      attention: "assertive",
    };

    const background = backgroundMap[variant];
    const ariaLive = ariaLiveMap[variant];

    const styles = /*css*/ `
      :host {
        display: inline-block;
        border-radius: var(--badge-radius);
        background: ${background};
        font-size: var(--text-font-size-xs);
        font-weight: var(--badge-font-weight);
        color: var(--badge-text-color);
        padding: var(--space-050) var(--space-200);
      }
    `;

    this.setAttribute("role", "status");
    this.setAttribute("aria-live", ariaLive);

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = /*html*/ `
        <style>${styles}</style>
        <slot></slot>
      `;
    }
  }
}

customElements.define("mui-badge", MuiBadge);
