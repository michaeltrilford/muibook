type Variant = "neutral" | "positive" | "warning" | "attention" | "overlay";
type Size = "xx-small" | "x-small" | "small" | "medium" | "large";
type Color =
  | "grey"
  | "purple"
  | "violet"
  | "pink"
  | "magenta"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "cyan"
  | "blue"
  | "indigo";

const normalizeHex = (value: string) => {
  const trimmed = (value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase();
  }
  return "";
};

const readableText = (hex: string) => {
  const value = normalizeHex(hex).slice(1);
  if (!value) return "";
  const channels = [0, 2, 4]
    .map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  const luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  return luminance > 0.179 ? "#000000" : "#ffffff";
};

class MuiBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["variant", "size", "color"];
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
    const variant: Variant =
      variantAttr === "positive" || variantAttr === "warning" || variantAttr === "attention" || variantAttr === "overlay"
        ? variantAttr
        : "neutral";
    const sizeAttr = this.getAttribute("size") || "medium";
    const size = sizeAttr as Size;
    const colorAttr = this.getAttribute("color")?.trim();

    const backgroundMap: Record<Variant, string> = {
      neutral: "var(--badge-background-neutral)",
      positive: "var(--badge-background-positive)",
      warning: "var(--badge-background-warning)",
      attention: "var(--badge-background-attention)",
      overlay: "var(--badge-background-overlay)",
    };

    const colorMap: Record<Color, string> = {
      grey: "var(--badge-background-grey)",
      purple: "var(--badge-background-purple)",
      violet: "var(--badge-background-violet)",
      pink: "var(--badge-background-pink)",
      magenta: "var(--badge-background-magenta)",
      red: "var(--badge-background-red)",
      orange: "var(--badge-background-orange)",
      amber: "var(--badge-background-amber)",
      yellow: "var(--badge-background-yellow)",
      lime: "var(--badge-background-lime)",
      green: "var(--badge-background-green)",
      teal: "var(--badge-background-teal)",
      cyan: "var(--badge-background-cyan)",
      blue: "var(--badge-background-blue)",
      indigo: "var(--badge-background-indigo)",
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

    const namedColor = colorAttr as Color | undefined;
    const background =
      namedColor && colorMap[namedColor]
        ? colorMap[namedColor]
        : colorAttr || "var(--badge-background, " + backgroundMap[variant] + ")";
    const textColor = textColorMap[variant];
    const dynamicTextColor = colorAttr ? readableText(colorAttr) : "";
    const finalTextColor = dynamicTextColor || textColor;
    const border = borderMap[variant];
    const ariaLive = ariaLiveMap[variant];

    const sizeMap: Record<Size, { fontSize: string; lineHeight: string; padding: string; minHeight: string; minWidth: string }> = {
      "xx-small": {
        fontSize: "var(--font-size-10)",
        lineHeight: "1",
        padding: "0 var(--space-050)",
        minHeight: "1.8rem",
        minWidth: "1.8rem",
      },
      "x-small": {
        fontSize: "var(--font-size-15)",
        lineHeight: "1",
        padding: "0 var(--space-100)",
        minHeight: "2rem",
        minWidth: "2rem",
      },
      small: {
        fontSize: "var(--font-size-15)",
        lineHeight: "1",
        padding: "0 var(--space-200)",
        minHeight: "2.2rem",
        minWidth: "2.2rem",
      },
      medium: {
        fontSize: "var(--text-font-size-xs)",
        lineHeight: "1",
        padding: "var(--space-050) var(--space-200)",
        minHeight: "2.4rem",
        minWidth: "2.4rem",
      },
      large: {
        fontSize: "var(--font-size-50)",
        lineHeight: "1",
        padding: "var(--space-100) var(--space-300)",
        minHeight: "2.8rem",
        minWidth: "2.8rem",
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
        justify-content: center;
        box-sizing: border-box;
        border-radius: var(--badge-radius);
        background: ${background};
        border: ${border};
        font-size: ${badgeSize.fontSize};
        line-height: ${badgeSize.lineHeight};
        font-weight: var(--badge-font-weight);
        color: var(--badge-text-color-override, ${finalTextColor});
        padding: ${badgeSize.padding};
        min-height: ${badgeSize.minHeight};
        min-width: ${badgeSize.minWidth};
        text-align: center;
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
