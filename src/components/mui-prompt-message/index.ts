import "../mui-body";

class MuiPromptMessage extends HTMLElement {
  private avatarSlotEl: HTMLSlotElement | null = null;
  private contentSlotEl: HTMLSlotElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["size", "variant", "density"];
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("variant")) this.setAttribute("variant", "default");
    if (!this.hasAttribute("density")) this.setAttribute("density", "default");
    this.render();
    this.bindSlotSync();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.bindSlotSync();
  }

  disconnectedCallback() {
    this.avatarSlotEl = null;
    this.contentSlotEl = null;
  }

  render() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "medium";
    const spacingMap: Record<string, { gap: string; padding: string }> = {
      "x-small": { gap: "var(--space-100)", padding: "var(--space-200)" },
      small: { gap: "var(--space-200)", padding: "var(--space-300)" },
      medium: { gap: "var(--space-300)", padding: "var(--space-400)" },
      large: { gap: "var(--space-400)", padding: "var(--space-500)" },
    };
    const spacing = spacingMap[size] || spacingMap.medium;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        .bubble {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: start;
          gap: ${spacing.gap};
          width: 100%;
          box-sizing: border-box;
          padding: ${spacing.padding};
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
          background: var(--surface-elevated-100);
        }
        :host([density="compact"]) .bubble {
          padding: var(--stroke-size-100);
          border-top-left-radius: var(--avatar-medium);
          border-bottom-left-radius: var(--avatar-medium);
        }
        :host([variant="ghost"]) .bubble {
          border: none;
          background: transparent;
        }
        .content {
          min-width: 0;
        }
        :host([size="x-small"]) .content { margin-top: calc(var(--space-025) + var(--stroke-size-100)); }
        :host([size="small"]) .content { margin-top: var(--space-200); }
        :host([size="medium"]) .content { margin-top: var(--space-200); }
        :host([size="large"]) .content { margin-top: var(--space-300); }
      </style>

      <div class="bubble">
        <slot name="avatar" id="avatarSlot"></slot>
        <div class="content">
          <slot id="contentSlot">
            <mui-body size="small"></mui-body>
          </slot>
        </div>
      </div>
    `;
  }

  private bindSlotSync() {
    if (!this.shadowRoot) return;
    this.avatarSlotEl = this.shadowRoot.querySelector("#avatarSlot") as HTMLSlotElement | null;
    this.contentSlotEl = this.shadowRoot.querySelector("#contentSlot") as HTMLSlotElement | null;
    if (!this.avatarSlotEl || !this.contentSlotEl) return;

    const sync = () => {
      const size = this.getAttribute("size") || "medium";
      const avatarSizeMap: Record<string, string> = {
        "x-small": "x-small",
        small: "small",
        medium: "small",
        large: "medium",
      };
      const bodySizeMap: Record<string, string> = {
        "x-small": "x-small",
        small: "small",
        medium: "small",
        large: "medium",
      };
      const avatarSize = avatarSizeMap[size] || "small";
      const bodySize = bodySizeMap[size] || "small";

      const avatars = this.avatarSlotEl?.assignedElements({ flatten: true }) || [];
      avatars.forEach((el) => {
        if (el.tagName.toLowerCase() === "mui-avatar") {
          el.setAttribute("size", avatarSize);
        }
      });

      const contentEls = this.contentSlotEl?.assignedElements({ flatten: true }) || [];
      contentEls.forEach((el) => {
        if (el.tagName.toLowerCase() === "mui-body") {
          el.setAttribute("size", bodySize);
        }
      });
    };

    this.avatarSlotEl.addEventListener("slotchange", sync);
    this.contentSlotEl.addEventListener("slotchange", sync);
    sync();
  }
}

if (!customElements.get("mui-prompt-message")) {
  customElements.define("mui-prompt-message", MuiPromptMessage);
}
