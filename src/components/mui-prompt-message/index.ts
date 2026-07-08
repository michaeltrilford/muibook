import "../mui-body";

class MuiPromptMessage extends HTMLElement {
  private avatarSlotEl: HTMLSlotElement | null = null;
  private headerSlotEl: HTMLSlotElement | null = null;
  private contentSlotEl: HTMLSlotElement | null = null;
  private footerSlotEl: HTMLSlotElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["size", "variant", "align", "width", "footer-position", "footer-visibility"];
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("variant")) this.setAttribute("variant", "default");
    if (!this.hasAttribute("align")) this.setAttribute("align", "start");
    if (!this.hasAttribute("width")) this.setAttribute("width", "full");
    if (!this.hasAttribute("footer-position")) this.setAttribute("footer-position", "inside");
    if (!this.hasAttribute("footer-visibility")) this.setAttribute("footer-visibility", "hover");
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
    this.headerSlotEl = null;
    this.contentSlotEl = null;
    this.footerSlotEl = null;
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
    const footerPosition = this.getAttribute("footer-position") === "outside" ? "outside" : "inside";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          max-width: 100%;
        }
        :host([align="end"]) {
          margin-inline-start: auto;
        }
        :host([width="medium"]) {
          width: min(100%, var(--prompt-message-width-medium, 62rem));
        }
        :host([width="content"]) {
          width: fit-content;
        }
        .message {
          display: block;
          width: 100%;
        }
        .bubble {
          display: grid;
          grid-template-columns: 1fr;
          align-items: start;
          gap: ${spacing.gap};
          width: 100%;
          box-sizing: border-box;
          padding: ${spacing.padding};
          border-radius: var(--radius-300);
          background: var(--surface-elevated-100);
          text-align: start;
        }
        .bubble[data-has-avatar] {
          grid-template-columns: auto 1fr;
        }
        :host([variant="ghost"]) .bubble {
          padding: 0;
          background: transparent;
        }
        .bubble:not([data-has-avatar]) slot[name="avatar"] {
          display: none;
        }
        .bubble[data-has-avatar] slot[name="avatar"] {
          display: contents;
        }
        .content {
          display: grid;
          gap: ${spacing.gap};
          min-width: 0;
          text-align: start;
        }
        .body {
          display: grid;
          gap: var(--prompt-message-body-space, var(--space-500));
          min-width: 0;
          text-align: start;
        }
        slot[name="header"],
        .content slot[name="footer"] {
          display: none;
        }
        .content[data-has-header] slot[name="header"] {
          display: contents;
        }
        .footer-bar {
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--speed-200) ease;
        }
        :host(:hover) .footer-bar,
        :host(:focus-within) .footer-bar,
        :host([footer-visibility="always"]) .footer-bar {
          opacity: 1;
          pointer-events: auto;
        }
        .inside-footer {
          display: none;
          justify-content: flex-start;
        }
        .message[data-has-footer] .inside-footer {
          display: flex;
        }
        .inside-footer slot[name="footer"] {
          display: contents;
        }
        .outside-footer {
          display: none;
          justify-content: flex-end;
          margin-block-start: var(--space-100);
        }
        .message[data-has-footer] .outside-footer {
          display: flex;
        }
        .outside-footer slot[name="footer"] {
          display: contents;
        }
        .bubble[data-has-avatar] .content { margin-top: var(--space-200); }
        :host([size="x-small"]) .bubble[data-has-avatar] .content { margin-top: calc(var(--space-025) + var(--stroke-size-100)); }
        :host([size="large"]) .bubble[data-has-avatar] .content { margin-top: var(--space-300); }
      </style>

      <div class="message" data-footer-position="${footerPosition}">
        <div class="bubble">
          <slot name="avatar" id="avatarSlot"></slot>
          <div class="content">
            <slot name="header" id="headerSlot"></slot>
            <div class="body">
              <slot id="contentSlot">
                <mui-body size="small"></mui-body>
              </slot>
            </div>
            ${
              footerPosition === "inside"
                ? `
                <div class="inside-footer footer-bar">
                  <slot name="footer" id="footerSlot"></slot>
                </div>
              `
                : ""
            }
          </div>
        </div>
        ${
          footerPosition === "outside"
            ? `
            <div class="outside-footer footer-bar">
              <slot name="footer" id="footerSlot"></slot>
            </div>
          `
            : ""
        }
      </div>
    `;
  }

  private bindSlotSync() {
    if (!this.shadowRoot) return;
    this.avatarSlotEl = this.shadowRoot.querySelector("#avatarSlot") as HTMLSlotElement | null;
    this.headerSlotEl = this.shadowRoot.querySelector("#headerSlot") as HTMLSlotElement | null;
    this.contentSlotEl = this.shadowRoot.querySelector("#contentSlot") as HTMLSlotElement | null;
    this.footerSlotEl = this.shadowRoot.querySelector("#footerSlot") as HTMLSlotElement | null;
    if (!this.avatarSlotEl || !this.headerSlotEl || !this.contentSlotEl || !this.footerSlotEl) return;

    const sync = () => {
      const size = this.getAttribute("size") || "medium";
      const avatarSizeMap: Record<string, string> = {
        "x-small": "xx-small",
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
      const message = this.shadowRoot?.querySelector(".message") as HTMLElement | null;
      const bubble = this.shadowRoot?.querySelector(".bubble") as HTMLElement | null;
      const content = this.shadowRoot?.querySelector(".content") as HTMLElement | null;
      const headers = this.headerSlotEl?.assignedElements({ flatten: true }) || [];
      const footers = this.footerSlotEl?.assignedElements({ flatten: true }) || [];
      message?.toggleAttribute("data-has-footer", footers.length > 0);
      bubble?.toggleAttribute("data-has-avatar", avatars.length > 0);
      content?.toggleAttribute("data-has-header", headers.length > 0);
      content?.toggleAttribute("data-has-footer", footers.length > 0);
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
    this.headerSlotEl.addEventListener("slotchange", sync);
    this.contentSlotEl.addEventListener("slotchange", sync);
    this.footerSlotEl.addEventListener("slotchange", sync);
    sync();
  }
}

if (!customElements.get("mui-prompt-message")) {
  customElements.define("mui-prompt-message", MuiPromptMessage);
}
