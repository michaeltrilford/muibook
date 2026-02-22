import "../mui-body";

class MuiPromptMessage extends HTMLElement {
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindLayoutSync();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        .bubble {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: var(--space-300);
          width: 100%;
          box-sizing: border-box;
          padding: var(--space-400);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
          background: var(--surface-elevated-100);
        }
        .content {
          min-width: 0;
        }
        :host([multi-line]) .bubble {
          align-items: start;
        }
        :host([multi-line]) .content {
          margin-top: var(--space-050);
        }
      </style>

      <div class="bubble">
        <slot name="avatar"></slot>
        <div class="content">
          <slot>
            <mui-body size="small"></mui-body>
          </slot>
        </div>
      </div>
    `;
  }

  private bindLayoutSync() {
    if (!this.shadowRoot) return;

    const content = this.shadowRoot.querySelector(".content") as HTMLElement | null;
    const defaultSlot = this.shadowRoot.querySelector("slot:not([name])") as HTMLSlotElement | null;
    if (!content || !defaultSlot) return;

    const syncLineState = () => {
      requestAnimationFrame(() => {
        const assigned = defaultSlot.assignedElements({ flatten: true });
        const lineHeightSource = (assigned[0] as HTMLElement | undefined) || content;
        const lineHeightValue = getComputedStyle(lineHeightSource).lineHeight || "0";
        const parsedLineHeight = Number.parseFloat(lineHeightValue);
        const lineHeight = Number.isFinite(parsedLineHeight) && parsedLineHeight > 0 ? parsedLineHeight : 20;
        const lines = Math.round(content.getBoundingClientRect().height / lineHeight);
        this.toggleAttribute("multi-line", lines > 1);
      });
    };

    defaultSlot.addEventListener("slotchange", syncLineState);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => syncLineState());
      this.resizeObserver.observe(content);
      this.resizeObserver.observe(this);
    }

    syncLineState();
  }
}

if (!customElements.get("mui-prompt-message")) {
  customElements.define("mui-prompt-message", MuiPromptMessage);
}
