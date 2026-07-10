type Variant = "info" | "positive" | "warning" | "attention";
type Size = "x-small" | "small" | "medium";
type StatusColor =
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

class MuiStatus extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "size", "color", "action"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.addEventListener("keydown", this.handleActionKeyDown);
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this.handleActionKeyDown);
  }

  attributeChangedCallback() {
    this.render();
  }

  private handleActionKeyDown = (event: KeyboardEvent) => {
    if (!this.hasAttribute("action")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    if (this.getAttribute("slot") === "action" && this.closest("mui-dropdown")) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    this.click();
  };

  private getAriaLive(variant: Variant | null): "off" | "polite" | "assertive" {
    if (!variant) return "off";
    if (variant === "warning" || variant === "attention") return "assertive";
    if (variant === "positive" || variant === "info") return "polite";
    return "off";
  }

  private syncSlotIcons() {
    if (!this.shadowRoot) return;
    const beforeSlot = this.shadowRoot.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const afterSlot = this.shadowRoot.querySelector('slot[name="after"]') as HTMLSlotElement | null;
    const beforeElements = beforeSlot?.assignedElements({ flatten: true }) as HTMLElement[] | undefined;
    const afterElements = afterSlot?.assignedElements({ flatten: true }) as HTMLElement[] | undefined;

    this.toggleAttribute("has-before", Boolean(beforeElements?.length));
    this.toggleAttribute("has-after", Boolean(afterElements?.length));

    [beforeElements, afterElements].forEach((elements) => {
      elements?.forEach((element) => {
        const nodes = [element, ...(Array.from(element.querySelectorAll("*")) as HTMLElement[])];
        nodes.forEach((node) => {
          if (node.tagName.toLowerCase().startsWith("mui-icon-")) {
            node.setAttribute("size", "xx-small");
            if (!node.hasAttribute("color")) node.setAttribute("color", "currentColor");
          }
        });
      });
    });
  }

  render() {
    const variant = this.getAttribute("variant") as Variant | null;
    const size = (this.getAttribute("size") || "medium") as Size;
    const color = this.getAttribute("color") as StatusColor | null;
    const isAction = this.hasAttribute("action");

    const defaultStyle = {
      background: "var(--status-grey-background)",
      color: "var(--status-grey-text-color)",
      border: "var(--stroke-size-100) var(--stroke-solid) var(--status-grey-border-color)",
    };
    const variantMap: Record<Variant, { background: string; color: string; border: string }> = {
      info: {
        background: "var(--status-info-background)",
        color: "var(--status-info-text-color)",
        border: "var(--stroke-size-100) var(--stroke-solid) var(--status-info-border-color)",
      },
      positive: {
        background: "var(--status-positive-background)",
        color: "var(--status-positive-text-color)",
        border: "var(--stroke-size-100) var(--stroke-solid) var(--status-positive-border-color)",
      },
      warning: {
        background: "var(--status-warning-background)",
        color: "var(--status-warning-text-color)",
        border: "var(--stroke-size-100) var(--stroke-solid) var(--status-warning-border-color)",
      },
      attention: {
        background: "var(--status-attention-background)",
        color: "var(--status-attention-text-color)",
        border: "var(--stroke-size-100) var(--stroke-solid) var(--status-attention-border-color)",
      },
    };

    const sizeMap: Record<Size, { fontSize: string; minHeight: string; padding: string; gap: string }> = {
      "x-small": {
        fontSize: "var(--font-size-15)",
        minHeight: "2rem",
        padding: "0 var(--space-100)",
        gap: "var(--space-050)",
      },
      small: {
        fontSize: "var(--text-font-size-xs)",
        minHeight: "2.2rem",
        padding: "0 var(--space-050)",
        gap: "var(--space-050)",
      },
      medium: {
        fontSize: "var(--text-font-size-xs)",
        minHeight: "2.6rem",
        padding: "0 var(--space-100)",
        gap: "var(--space-050)",
      },
    };

    const currentVariant = variant && variantMap[variant] ? variantMap[variant] : defaultStyle;
    const currentSize = sizeMap[size] || sizeMap.medium;
    const colorMap: Record<StatusColor, { background: string; borderColor: string; color: string }> = {
      grey: {
        background: "var(--status-grey-background)",
        borderColor: "var(--status-grey-border-color)",
        color: "var(--status-grey-text-color)",
      },
      purple: {
        background: "var(--status-purple-background)",
        borderColor: "var(--status-purple-border-color)",
        color: "var(--status-purple-text-color)",
      },
      violet: {
        background: "var(--status-violet-background)",
        borderColor: "var(--status-violet-border-color)",
        color: "var(--status-violet-text-color)",
      },
      pink: {
        background: "var(--status-pink-background)",
        borderColor: "var(--status-pink-border-color)",
        color: "var(--status-pink-text-color)",
      },
      magenta: {
        background: "var(--status-magenta-background)",
        borderColor: "var(--status-magenta-border-color)",
        color: "var(--status-magenta-text-color)",
      },
      red: {
        background: "var(--status-red-background)",
        borderColor: "var(--status-red-border-color)",
        color: "var(--status-red-text-color)",
      },
      orange: {
        background: "var(--status-orange-background)",
        borderColor: "var(--status-orange-border-color)",
        color: "var(--status-orange-text-color)",
      },
      amber: {
        background: "var(--status-amber-background)",
        borderColor: "var(--status-amber-border-color)",
        color: "var(--status-amber-text-color)",
      },
      yellow: {
        background: "var(--status-yellow-background)",
        borderColor: "var(--status-yellow-border-color)",
        color: "var(--status-yellow-text-color)",
      },
      lime: {
        background: "var(--status-lime-background)",
        borderColor: "var(--status-lime-border-color)",
        color: "var(--status-lime-text-color)",
      },
      green: {
        background: "var(--status-green-background)",
        borderColor: "var(--status-green-border-color)",
        color: "var(--status-green-text-color)",
      },
      teal: {
        background: "var(--status-teal-background)",
        borderColor: "var(--status-teal-border-color)",
        color: "var(--status-teal-text-color)",
      },
      cyan: {
        background: "var(--status-cyan-background)",
        borderColor: "var(--status-cyan-border-color)",
        color: "var(--status-cyan-text-color)",
      },
      blue: {
        background: "var(--status-blue-background)",
        borderColor: "var(--status-blue-border-color)",
        color: "var(--status-blue-text-color)",
      },
      indigo: {
        background: "var(--status-indigo-background)",
        borderColor: "var(--status-indigo-border-color)",
        color: "var(--status-indigo-text-color)",
      },
    };
    const standaloneColor = color ? colorMap[color] : null;
    const ariaLive = this.getAriaLive(variant && variantMap[variant] ? variant : null);

    if (isAction) {
      this.setAttribute("role", "button");
      if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
      this.removeAttribute("aria-live");
    } else {
      this.setAttribute("role", "status");
      this.setAttribute("aria-live", ariaLive);
      if (this.getAttribute("tabindex") === "0") this.removeAttribute("tabindex");
    }

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        box-sizing: border-box;
        vertical-align: middle;
      }

      .status {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 0;
        min-height: ${currentSize.minHeight};
        gap: ${currentSize.gap};
        padding: ${currentSize.padding};
        border: ${standaloneColor ? `var(--stroke-size-100) var(--stroke-solid) ${standaloneColor.borderColor}` : currentVariant.border};
        border-radius: var(--radius-100);
        background: ${standaloneColor?.background || currentVariant.background};
        color: ${standaloneColor?.color || currentVariant.color};
        font-family: var(--font-family);
        font-size: ${currentSize.fontSize};
        font-weight: var(--font-weight-medium);
        line-height: 1;
        white-space: nowrap;
      }

      :host([action]) .status {
        cursor: pointer;
      }

      :host([action]:hover) .status {
        filter: brightness(1.04);
      }

      :host([action]:focus-visible) {
        outline: none;
      }

      :host([action]:focus-visible) .status {
        outline: var(--outline-thick);
        outline-offset: var(--space-050);
      }

      :host([size="medium"][has-before]:not([has-after])) .status {
        padding-inline-end: calc(var(--space-100) + var(--space-050));
      }

      :host([size="small"][has-before]:not([has-after])) .status {
        padding-inline-end: var(--space-100);
      }

      :host([size="medium"][has-after]:not([has-before])) .status {
        padding-inline-start: calc(var(--space-100) + var(--space-050));
      }

      :host([size="small"][has-after]:not([has-before])) .status {
        padding-inline-start: var(--space-100);
      }

      slot[name="before"],
      slot[name="after"] {
        display: contents;
      }

      ::slotted([slot="before"]),
      ::slotted([slot="after"]) {
        flex: none;
      }

      ::slotted(.mui-icon) {
        color: currentColor;
        fill: currentColor;
      }
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = /*html*/ `
        <style>${styles}</style>
        <span class="status" part="status">
          <slot name="before"></slot>
          <slot></slot>
          <slot name="after"></slot>
        </span>
      `;
      const slots = this.shadowRoot.querySelectorAll('slot[name="before"], slot[name="after"]');
      slots.forEach((slot) => slot.addEventListener("slotchange", () => this.syncSlotIcons()));
      this.syncSlotIcons();
    }
  }
}

if (!customElements.get("mui-status")) {
  customElements.define("mui-status", MuiStatus);
}
