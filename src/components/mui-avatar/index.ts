class MuiAvatar extends HTMLElement {
  private _imageFailed?: boolean;
  static get observedAttributes() {
    return ["label", "image", "size", "background", "background-color"];
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
    };

    return map[background] ?? map["neutral"];
  }

  render() {
    const label = this.getAttribute("label");
    const image = this.getAttribute("image");
    const size = (this.getAttribute("size") || "medium").toLowerCase();
    const background = this.getAttribute("background") || "neutral";
    const backgroundColorAttr = this.getAttribute("background-color");
    const altText = label || "Avatar";

    // Priority: slot content > image > initials
    const hasSlot = this.hasSlottedContent();
    const showImage = image && !this._imageFailed && !hasSlot;
    const showInitials = !showImage && !hasSlot;
    const initials = this.getInitials(label);

    // Token-based size map
    const sizeMap: Record<string, string> = {
      "x-small": "var(--avatar-x-small)",
      small: "var(--avatar-small)",
      medium: "var(--avatar-medium)",
      large: "var(--avatar-large)",
    };
    const resolvedSize = sizeMap[size] ?? sizeMap.medium;

    // Font size map for initials
    const fontSizeMap: Record<string, string> = {
      "x-small": "var(--font-size-15)",
      small: "var(--font-size-200)",
      medium: "var(--font-size-300)",
      large: "var(--font-size-400)",
    };
    const resolvedFontSize = fontSizeMap[size] ?? fontSizeMap.medium;

    // Icon size map for slotted icons
    const iconSizeMap: Record<string, string> = {
      "x-small": "x-small",
      small: "small",
      medium: "medium",
      large: "large",
    };
    const resolvedIconSize = iconSizeMap[size] ?? iconSizeMap.medium;

    // Get background CSS
    const backgroundCSS = this.getBackgroundCSS();

    // Only allow override if background is neutral (default) AND no background-color is set
    const finalBackground =
      background === "neutral" && !backgroundColorAttr
        ? `var(--avatar-background-override, ${backgroundCSS})`
        : backgroundCSS;

    const styles = /*css*/ `
    :host {
      display: inline-flex;
      width: ${resolvedSize};
      height: ${resolvedSize};
      border-radius: ${resolvedSize};
      font-weight: var(--font-weight-bold);
      letter-spacing: -0.05rem;
      font-size: ${resolvedFontSize};
      color: var(--text-color);
      background: ${finalBackground};
      overflow: hidden;
      align-items: center;
      justify-content: center;
      user-select: none;
      box-sizing: border-box;
      padding: ${showInitials || hasSlot ? `calc(${resolvedSize} * 0.1)` : "0"}; 
      flex: none;
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
  `;

    this.shadowRoot!.innerHTML = `
    <style>${styles}</style>
    ${showImage ? `<img src="${image}" alt="${altText}" />` : ""}
    <div class="initials" role="img" aria-label="${altText}">${initials}</div>
    <slot></slot>
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
