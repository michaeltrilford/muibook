class MuiHint extends HTMLElement {
  static get observedAttributes() {
    return ["placement", "open", "delay"];
  }

  private openTimer: number | null = null;
  private closeTimer: number | null = null;
  private boundReposition = () => this.positionTooltip();
  private boundDocPointer = (event: Event) => {
    const path = event.composedPath();
    if (!path.includes(this)) this.close();
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("placement")) this.setAttribute("placement", "top");
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    if (this.hasAttribute("open")) {
      requestAnimationFrame(() => this.positionTooltip());
    }
  }

  render() {
    if (!this.shadowRoot) return;
    const placement = this.getAttribute("placement") || "top";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: max-content;
          position: relative;
          vertical-align: middle;
        }
        .trigger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: help;
        }
        .tooltip {
          position: fixed;
          z-index: 1000;
          min-width: max-content;
          max-width: var(--hint-max-width, 28rem);
          padding: var(--space-200) var(--space-300);
          border-radius: var(--radius-200);
          border: var(--border-thin);
          border-color: var(--border-color);
          background: var(--surface-elevated-100);
          color: var(--text-color);
          box-shadow: var(--shadow-200, 0 6px 20px rgba(0,0,0,0.18));
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--speed-300, 160ms) ease;
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          box-sizing: border-box;
        }
        :host([open]) .tooltip {
          opacity: 1;
          pointer-events: auto;
        }
        .tooltip::before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }
        .tooltip[data-placement="top"]::before {
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          border-width: 6px 6px 0 6px;
          border-color: var(--surface-elevated-100) transparent transparent transparent;
        }
        .tooltip[data-placement="bottom"]::before {
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
          border-width: 0 6px 6px 6px;
          border-color: transparent transparent var(--surface-elevated-100) transparent;
        }
        .tooltip[data-placement="left"]::before {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 0 6px 6px;
          border-color: transparent transparent transparent var(--surface-elevated-100);
        }
        .tooltip[data-placement="right"]::before {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 6px 6px 0;
          border-color: transparent var(--surface-elevated-100) transparent transparent;
        }
      </style>
      <span class="trigger" tabindex="0" aria-describedby="hint-tooltip">
        <slot name="trigger"></slot>
      </span>
      <div id="hint-tooltip" class="tooltip" role="tooltip" data-placement="${placement}">
        <slot></slot>
      </div>
    `;
  }

  private setupEvents() {
    const trigger = this.shadowRoot?.querySelector(".trigger");
    if (!trigger) return;

    trigger.addEventListener("mouseenter", () => this.openWithDelay());
    trigger.addEventListener("mouseleave", () => this.closeWithDelay());
    trigger.addEventListener("focus", () => this.openWithDelay());
    trigger.addEventListener("blur", () => this.closeWithDelay());
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      this.toggle();
    });

    this.addEventListener("keydown", (event) => {
      if ((event as KeyboardEvent).key === "Escape") this.close();
    });
  }

  private getDelay() {
    const raw = Number(this.getAttribute("delay"));
    return Number.isFinite(raw) ? Math.max(raw, 0) : 120;
  }

  private openWithDelay() {
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    const delay = this.getDelay();
    this.openTimer = window.setTimeout(() => this.open(), delay);
  }

  private closeWithDelay() {
    if (this.openTimer) {
      window.clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    this.closeTimer = window.setTimeout(() => this.close(), 80);
  }

  private open() {
    this.setAttribute("open", "");
    requestAnimationFrame(() => this.positionTooltip());
    window.addEventListener("resize", this.boundReposition);
    window.addEventListener("scroll", this.boundReposition, true);
    document.addEventListener("pointerdown", this.boundDocPointer, true);
  }

  private close() {
    this.removeAttribute("open");
    window.removeEventListener("resize", this.boundReposition);
    window.removeEventListener("scroll", this.boundReposition, true);
    document.removeEventListener("pointerdown", this.boundDocPointer, true);
  }

  private toggle() {
    if (this.hasAttribute("open")) this.close();
    else this.open();
  }

  private positionTooltip() {
    const trigger = this.shadowRoot?.querySelector(".trigger") as HTMLElement | null;
    const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;
    if (!tooltip || !trigger) return;

    const desired = this.getAttribute("placement") || "top";
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    const edge = 8;
    const gap = 8;

    let resolved = desired;
    if (desired === "top" && triggerRect.top - tooltipRect.height - gap < edge) resolved = "bottom";
    if (desired === "bottom" && triggerRect.bottom + tooltipRect.height + gap > viewportH - edge) resolved = "top";
    if (desired === "left" && triggerRect.left - tooltipRect.width - gap < edge) resolved = "right";
    if (desired === "right" && triggerRect.right + tooltipRect.width + gap > viewportW - edge) resolved = "left";

    tooltip.setAttribute("data-placement", resolved);

    let top = 0;
    let left = 0;

    if (resolved === "top") {
      top = triggerRect.top - tooltipRect.height - gap;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (resolved === "bottom") {
      top = triggerRect.bottom + gap;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (resolved === "left") {
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width - gap;
    } else {
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + gap;
    }

    top = Math.max(edge, Math.min(top, viewportH - tooltipRect.height - edge));
    left = Math.max(edge, Math.min(left, viewportW - tooltipRect.width - edge));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
}

if (!customElements.get("mui-hint")) {
  customElements.define("mui-hint", MuiHint);
}
