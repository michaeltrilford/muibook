class MuiHint extends HTMLElement {
  static get observedAttributes() {
    return ["placement", "open", "delay", "initial-delay"];
  }

  private openTimer: number | null = null;
  private closeTimer: number | null = null;
  private hasOpenedOnce = false;
  private boundReposition = () => this.positionTooltip();
  private boundDocPointer = (event: Event) => {
    const path = event.composedPath();
    if (!path.includes(this)) this.close(true);
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
          display: inline-flex;
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
          position: absolute;
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
        :host([closing-immediate]) .tooltip {
          transition-duration: 0ms;
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
    trigger.addEventListener("focusin", () => this.openWithDelay());
    trigger.addEventListener("focusout", () => this.close(true));

    this.addEventListener("keydown", (event) => {
      if ((event as KeyboardEvent).key === "Escape") this.close(true);
    });
  }

  private getDelay() {
    const raw = Number(this.getAttribute("delay"));
    if (Number.isFinite(raw)) return Math.min(2000, Math.max(1000, raw));
    return 1500;
  }

  private getInitialDelay() {
    const raw = Number(this.getAttribute("initial-delay"));
    if (Number.isFinite(raw)) return Math.min(2000, Math.max(1000, raw));
    return 1500;
  }

  private openWithDelay() {
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    const delay = this.hasOpenedOnce ? this.getDelay() : this.getInitialDelay();
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
    this.hasOpenedOnce = true;
    this.removeAttribute("closing-immediate");
    this.setAttribute("open", "");
    requestAnimationFrame(() => this.positionTooltip());
    window.addEventListener("resize", this.boundReposition);
    window.addEventListener("scroll", this.boundReposition, true);
    document.addEventListener("pointerdown", this.boundDocPointer, true);
  }

  private close(immediate = false) {
    if (this.openTimer) {
      window.clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    if (immediate) this.setAttribute("closing-immediate", "");
    this.removeAttribute("open");
    if (immediate) {
      requestAnimationFrame(() => this.removeAttribute("closing-immediate"));
    }
    window.removeEventListener("resize", this.boundReposition);
    window.removeEventListener("scroll", this.boundReposition, true);
    document.removeEventListener("pointerdown", this.boundDocPointer, true);
  }

  private positionTooltip() {
    const triggerWrapper = this.shadowRoot?.querySelector(".trigger") as HTMLElement | null;
    const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;
    if (!tooltip || !triggerWrapper) return;

    const triggerSlot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
    const slottedTrigger = (triggerSlot?.assignedElements({ flatten: true })?.[0] as HTMLElement | undefined) || null;
    const anchor = slottedTrigger || triggerWrapper;

    const desired = this.getAttribute("placement") || "top";
    const triggerRect = anchor.getBoundingClientRect();
    const hostRect = this.getBoundingClientRect();
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

    let globalTop = 0;
    let globalLeft = 0;

    if (resolved === "top") {
      globalTop = triggerRect.top - tooltipRect.height - gap;
      globalLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (resolved === "bottom") {
      globalTop = triggerRect.bottom + gap;
      globalLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (resolved === "left") {
      globalTop = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      globalLeft = triggerRect.left - tooltipRect.width - gap;
    } else {
      globalTop = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      globalLeft = triggerRect.right + gap;
    }

    globalTop = Math.max(edge, Math.min(globalTop, viewportH - tooltipRect.height - edge));
    globalLeft = Math.max(edge, Math.min(globalLeft, viewportW - tooltipRect.width - edge));

    const localTop = globalTop - hostRect.top;
    const localLeft = globalLeft - hostRect.left;

    tooltip.style.top = `${localTop}px`;
    tooltip.style.left = `${localLeft}px`;
  }
}

if (!customElements.get("mui-hint")) {
  customElements.define("mui-hint", MuiHint);
}
