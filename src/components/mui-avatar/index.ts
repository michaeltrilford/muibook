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

class MuiAvatar extends HTMLElement {
  private _imageFailed?: boolean;
  static get observedAttributes() {
    return ["label", "image", "size", "background", "background-color", "status", "status-label", "usage"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this._imageFailed === undefined) this._imageFailed = false;
    this.render();
  }

  attributeChangedCallback() {
    if (this._imageFailed === undefined) this._imageFailed = false;
    this.render();
  }

  // Check if slot has content
  hasSlottedContent() {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return false;
    const nodes = slot.assignedNodes({ flatten: true });
    return nodes.some(
      (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    );
  }

  // Generate initials from label
  getInitials(label: string | null) {
    if (!label) return "?";
    const parts = label.trim().split(/\s+/);
    let initials = parts[0][0] ?? "";
    if (parts.length > 1) initials += parts[parts.length - 1][0] ?? "";
    return initials.toUpperCase();
  }

  // Map background prop to token or app-supplied colour
  getBackgroundCSS() {
    const background = this.getAttribute("background") || "neutral";
    const customColor = this.getAttribute("background-color");

    // If background-color is provided, use it directly
    if (customColor) {
      return customColor;
    }

    // Use preset background tokens
    const map: Record<string, string> = {
      neutral: "var(--avatar-background-neutral)",
      positive: "var(--avatar-background-positive)",
      warning: "var(--avatar-background-warning)",
      attention: "var(--avatar-background-attention)",

      // Random-use profile colours
      purple: "var(--avatar-background-purple)",
      violet: "var(--avatar-background-violet)",
      pink: "var(--avatar-background-pink)",
      magenta: "var(--avatar-background-magenta)",
      red: "var(--avatar-background-red)",
      orange: "var(--avatar-background-orange)",
      amber: "var(--avatar-background-amber)",
      yellow: "var(--avatar-background-yellow)",
      lime: "var(--avatar-background-lime)",
      green: "var(--avatar-background-green)",
      teal: "var(--avatar-background-teal)",
      cyan: "var(--avatar-background-cyan)",
      blue: "var(--avatar-background-blue)",
      indigo: "var(--avatar-background-indigo)",
    };

    return map[background] ?? map["neutral"];
  }

  getStatusLabel(status: string) {
    const label = this.getAttribute("status-label");
    if (label) return label;

    const map: Record<string, string> = {
      online: "Online",
      active: "Online",
      away: "Away",
      busy: "Busy",
      dnd: "Do not disturb",
      offline: "Offline",
      positive: "Online",
      warning: "Away",
      attention: "Do not disturb",
      neutral: "Offline",
    };

    return map[status] || status;
  }

  getStatusBackground(status: string) {
    const map: Record<string, string> = {
      online: "var(--avatar-status-background-positive, var(--badge-background-positive))",
      active: "var(--avatar-status-background-positive, var(--badge-background-positive))",
      away: "var(--avatar-status-background-warning, var(--badge-background-warning))",
      busy: "var(--avatar-status-background-attention, var(--badge-background-attention))",
      dnd: "var(--avatar-status-background-attention, var(--badge-background-attention))",
      offline: "var(--avatar-status-background-neutral, var(--badge-background-neutral))",
      positive: "var(--avatar-status-background-positive, var(--badge-background-positive))",
      warning: "var(--avatar-status-background-warning, var(--badge-background-warning))",
      attention: "var(--avatar-status-background-attention, var(--badge-background-attention))",
      neutral: "var(--avatar-status-background-neutral, var(--badge-background-neutral))",
    };

    return map[status] || map.neutral;
  }

  render() {
    const label = this.getAttribute("label");
    const image = this.getAttribute("image");
    const size = (this.getAttribute("size") || "medium").toLowerCase();
    const usage = this.getAttribute("usage")?.toLowerCase() || "default";
    const isInputUsage = usage === "color-input" || usage === "input";
    const background = this.getAttribute("background") || "neutral";
    const backgroundColorAttr = this.getAttribute("background-color");
    const status = this.getAttribute("status")?.trim().toLowerCase() || "";
    const altText = label || "Avatar";

    // Priority: slot content > image > initials
    const hasSlot = this.hasSlottedContent();
    const showImage = image && !this._imageFailed && !hasSlot;
    const showInitials = !showImage && !hasSlot;
    const initials = this.getInitials(label);

    // Token-based size map
    const sizeMap: Record<string, string> = {
      "xxx-small": "var(--avatar-xxx-small)",
      "xx-small": "var(--avatar-xx-small)",
      "x-small": "var(--avatar-x-small)",
      small: "var(--avatar-small)",
      medium: "var(--avatar-medium)",
      large: "var(--avatar-large)",
    };
    const inputSizeMap: Record<string, string> = {
      "x-small": "var(--action-size-x-small)",
      small: "var(--action-size-small)",
      medium: "var(--action-size-medium)",
      large: "var(--action-size-large)",
    };
    const resolvedSize = isInputUsage
      ? inputSizeMap[size] ?? inputSizeMap.medium
      : sizeMap[size] ?? sizeMap.medium;

    // Font size map for initials
    const fontSizeMap: Record<string, string> = {
      "xxx-small": "var(--font-size-10)",
      "xx-small": "var(--font-size-15)",
      "x-small": "var(--font-size-100)",
      small: "var(--font-size-200)",
      medium: "var(--font-size-300)",
      large: "var(--font-size-400)",
    };
    const inputFontSizeMap: Record<string, string> = {
      "x-small": "var(--font-size-100)",
      small: "var(--font-size-200)",
      medium: "var(--font-size-300)",
      large: "var(--font-size-400)",
    };
    const resolvedFontSize = isInputUsage
      ? inputFontSizeMap[size] ?? inputFontSizeMap.medium
      : fontSizeMap[size] ?? fontSizeMap.medium;

    // Icon size map for slotted icons
    const iconSizeMap: Record<string, string> = {
      "xxx-small": "xx-small",
      "xx-small": "x-small",
      "x-small": "x-small",
      small: "small",
      medium: "medium",
      large: "large",
    };
    const resolvedIconSize = iconSizeMap[size] ?? iconSizeMap.medium;

    // Get background CSS
    const backgroundCSS = this.getBackgroundCSS();
    const statusBackground = this.getStatusBackground(status);
    const statusLabel = status ? this.getStatusLabel(status) : "";

    // Only allow override if background is neutral (default) AND no background-color is set
    const finalBackground =
      background === "neutral" && !backgroundColorAttr
        ? `var(--avatar-background-override, ${backgroundCSS})`
        : backgroundCSS;

    const dynamicTextColor = backgroundColorAttr ? readableText(backgroundColorAttr) : "";
    const fallbackTextColor = dynamicTextColor || "var(--text-color)";

    const styles = /*css*/ `
    :host {
      display: inline-flex;
      position: relative;
      width: ${resolvedSize};
      height: ${resolvedSize};
      border-radius: ${resolvedSize};
      flex: none;
    }
    .avatar-frame {
      display: inline-flex;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      font-weight: var(--font-weight-bold);
      letter-spacing: -0.05rem;
      font-size: ${resolvedFontSize};
      color: var(--avatar-text-color, ${fallbackTextColor});
      background: ${finalBackground};
      overflow: hidden;
      align-items: center;
      justify-content: center;
      user-select: none;
      box-sizing: border-box;
      padding: ${showInitials || hasSlot ? `calc(${resolvedSize} * 0.1)` : "0"}; 
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: ${showImage ? "block" : "none"};
    }
    .initials {
      display: ${showInitials ? "flex" : "none"};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-transform: uppercase;
      text-decoration: none;
    }
    slot {
      display: ${hasSlot ? "flex" : "none"};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    ::slotted([class*="mui-icon"]) {
      fill: var(--avatar-icon-color, currentColor);
    }
    .status {
      display: ${status ? "block" : "none"};
      position: absolute;
      right: var(--avatar-status-offset, 0);
      bottom: var(--avatar-status-offset, 0);
      width: var(--avatar-status-size, max(0.8rem, calc(${resolvedSize} * 0.28)));
      height: var(--avatar-status-size, max(0.8rem, calc(${resolvedSize} * 0.28)));
      border-radius: 999px;
      background: ${statusBackground};
      border: var(--avatar-status-border, var(--stroke-size-200) solid var(--surface));
      box-sizing: border-box;
      pointer-events: none;
    }
  `;

    this.shadowRoot!.innerHTML = `
    <style>${styles}</style>
    <span class="avatar-frame">
      ${showImage ? `<img src="${image}" alt="${altText}" />` : ""}
      <div class="initials" role="img" aria-label="${altText}">${initials}</div>
      <slot></slot>
    </span>
    <span class="status" aria-label="${statusLabel}" title="${statusLabel}"></span>
  `;

    // Enforce size on slotted icon elements based on avatar size
    if (hasSlot) {
      const slot = this.shadowRoot!.querySelector("slot")!;
      const slottedElements = slot.assignedElements();
      slottedElements.forEach((el) => {
        if (el.tagName.toLowerCase().startsWith("mui-icon-")) {
          el.setAttribute("size", resolvedIconSize);
        }
      });
    }

    // Attach onerror after render to catch failed image
    if (showImage && image) {
      const imgEl = this.shadowRoot!.querySelector("img")!;
      imgEl.onerror = () => {
        this._imageFailed = true;
        this.render();
      };
    }
  }
}

// Define custom element
if (!customElements.get("mui-avatar")) {
  customElements.define("mui-avatar", MuiAvatar);
}
