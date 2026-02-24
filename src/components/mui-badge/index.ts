type Variant = "neutral" | "positive" | "warning" | "attention" | "overlay";
type Size = "xx-small" | "x-small" | "small" | "medium" | "large";

class MuiBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["variant", "size"];
  }

  connectedCallback() {
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "neutral");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "medium");
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
    const sizeAttr = this.getAttribute("size") || "medium";
    const size = sizeAttr as Size;

    const backgroundMap: Record<Variant, string> = {
      neutral: "var(--badge-background-neutral)",
      positive: "var(--badge-background-positive)",
      warning: "var(--badge-background-warning)",
      attention: "var(--badge-background-attention)",
      overlay: "var(--badge-background-overlay)",
    };

    const textColorMap: Record<Variant, string> = {
      neutral: "var(--badge-text-color)",
      positive: "var(--badge-text-color)",
      warning: "var(--badge-text-color)",
      attention: "var(--badge-text-color)",
      overlay: "var(--badge-text-color-overlay)",
    };

    const borderMap: Record<Variant, string> = {
      neutral: "none",
      positive: "none",
      warning: "none",
      attention: "none",
      overlay: "var(--badge-border-overlay)",
    };

    const ariaLiveMap: Record<Variant, "off" | "polite" | "assertive"> = {
      neutral: "off",
      positive: "polite",
      warning: "assertive",
      attention: "assertive",
      overlay: "off",
    };

    const background = backgroundMap[variant];
    const textColor = textColorMap[variant];
    const border = borderMap[variant];
    const ariaLive = ariaLiveMap[variant];

    const sizeMap: Record<Size, { fontSize: string; lineHeight: string; padding: string; minHeight?: string }> = {
      "xx-small": {
        fontSize: "var(--font-size-15)",
        lineHeight: "1",
        padding: "0 var(--space-050)",
        minHeight: "1.6rem",
      },
      "x-small": {
        fontSize: "var(--font-size-15)",
        lineHeight: "1",
        padding: "0 var(--space-100)",
        minHeight: "2rem",
      },
      small: {
        fontSize: "var(--font-size-15)",
        lineHeight: "1",
        padding: "0 var(--space-200)",
        minHeight: "2.2rem",
      },
      medium: {
        fontSize: "var(--text-font-size-xs)",
        lineHeight: "1",
        padding: "var(--space-100) var(--space-200)",
      },
      large: {
        fontSize: "var(--font-size-50)",
        lineHeight: "1",
        padding: "var(--space-100) var(--space-300)",
      },
    };

    const badgeSize = sizeMap[size] || sizeMap.medium;

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        box-sizing: border-box;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: var(--badge-radius);
        background: ${background};
        border: ${border};
        font-size: ${badgeSize.fontSize};
        line-height: ${badgeSize.lineHeight};
        font-weight: var(--badge-font-weight);
        color: ${textColor};
        padding: ${badgeSize.padding};
        min-height: ${badgeSize.minHeight || "auto"};
      }

      :host([usage="slat-end"]) {
        margin-right: calc(-1 * var(--space-200));
      }
    `;

    this.setAttribute("role", "status");
    this.setAttribute("aria-live", ariaLive);

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = /*html*/ `
        <style>${styles}</style>
        <span class="badge">
          <slot></slot>
        </span>
      `;
    }
  }
}

if (!customElements.get("mui-badge")) {
  customElements.define("mui-badge", MuiBadge);
}
