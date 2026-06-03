class MuiHint extends HTMLElement {
  private static portalStylesInjected = false;

  static get observedAttributes() {
    return ["placement", "open", "delay", "initial-delay", "size"];
  }

  private openTimer: number | null = null;
  private closeTimer: number | null = null;
  private hasOpenedOnce = false;
  private ignoreNextFocus = false;
  private portalTooltipElement: HTMLElement | null = null;
  private hintId = `hint-${Math.random().toString(36).slice(2)}`;
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
    this.syncTriggerSize();
    this.syncTriggerFocus();
  }

  disconnectedCallback() {
    this.restoreTooltip();
    window.removeEventListener("resize", this.boundReposition);
    window.removeEventListener("scroll", this.boundReposition, true);
    document.removeEventListener("pointerdown", this.boundDocPointer, true);
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this.syncTriggerSize();
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
          --hint-focus-outline: var(--stroke-size-400) var(--stroke-outset) var(--outline-color);
          --hint-focus-outline-offset: var(--stroke-size-200);
          --hint-focus-radius: var(--radius-200);
        }
        .trigger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: help;
          border-radius: var(--hint-focus-radius);
          outline: none;
        }
        .trigger:focus-visible {
          outline: var(--hint-focus-outline);
          outline-offset: var(--hint-focus-outline-offset);
        }
        .tooltip {
          display: none;
          position: fixed;
          z-index: 1000;
          min-width: max-content;
          max-width: var(--hint-max-width, 28rem);
          padding: var(--space-200) var(--space-300);
          border-radius: var(--radius-200);
          border: var(--border-thin);
          border-color: var(--hint-border-color, var(--border-color));
          background: var(--hint-background, var(--surface-elevated-100));
          color: var(--hint-text-color, var(--text-color));
          box-shadow: var(--hint-shadow, var(--shadow-medium, 0 6px 20px rgba(0,0,0,0.18)));
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--speed-300, 160ms) ease;
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          box-sizing: border-box;
          top: 0;
          left: 0;
        }
        :host([closing-immediate]) .tooltip {
          transition-duration: 0ms;
        }
        :host([open]) .tooltip {
          display: block;
          opacity: 1;
          pointer-events: auto;
        }
        :host([portaled]) .tooltip {
          visibility: hidden;
        }
      </style>
      <span class="trigger" tabindex="0" aria-describedby="hint-tooltip">
        <slot name="trigger"></slot>
      </span>
      <div id="hint-tooltip" class="tooltip" role="tooltip" data-placement="${placement}" data-owner="${this.hintId}">
        <slot></slot>
      </div>
    `;
  }

  private setupEvents() {
    const trigger = this.shadowRoot?.querySelector(".trigger");
    if (!trigger) return;
    const triggerSlot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;

    trigger.addEventListener("mouseenter", () => this.openWithDelay());
    trigger.addEventListener("mouseleave", () => this.closeWithDelay());
    trigger.addEventListener("pointerdown", (event) => {
      if ((event as PointerEvent).pointerType !== "touch") return;
      this.ignoreNextFocus = true;
      this.close(true);
      window.setTimeout(() => {
        this.ignoreNextFocus = false;
      }, 0);
    });
    trigger.addEventListener("focusin", () => {
      if (this.ignoreNextFocus) return;
      this.openWithDelay();
    });
    trigger.addEventListener("focusout", () => this.close(true));
    triggerSlot?.addEventListener("slotchange", () => {
      this.syncTriggerSize();
      this.syncTriggerFocus();
    });

    this.addEventListener("keydown", (event) => {
      if ((event as KeyboardEvent).key === "Escape") this.close(true);
    });
  }

  private syncTriggerSize() {
    const triggerSlot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
    if (!triggerSlot) return;

    const size = this.getAttribute("size") || this.closest("mui-body")?.getAttribute("size") || "medium";
    const iconSizeMap: Record<string, string> = {
      "x-small": "x-small",
      small: "small",
      medium: "small",
      large: "medium",
    };
    const badgeSizeMap: Record<string, string> = {
      "x-small": "xx-small",
      small: "x-small",
      medium: "small",
      large: "medium",
    };

    const iconSize = iconSizeMap[size] || "small";
    const badgeSize = badgeSizeMap[size] || "small";
    const triggerEls = triggerSlot.assignedElements({ flatten: true });

    triggerEls.forEach((el) => {
      if (el.tagName.startsWith("MUI-ICON-") && !el.hasAttribute("size")) {
        el.setAttribute("size", iconSize);
      }
      if (el.tagName === "MUI-BADGE" && !el.hasAttribute("size")) {
        el.setAttribute("size", badgeSize);
      }
    });
  }

  private syncTriggerFocus() {
    const trigger = this.shadowRoot?.querySelector(".trigger") as HTMLElement | null;
    const triggerSlot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
    if (!trigger || !triggerSlot) return;

    const hasFocusableTrigger = triggerSlot.assignedElements({ flatten: true }).some((el) => this.isFocusableTrigger(el));

    if (hasFocusableTrigger) {
      trigger.removeAttribute("tabindex");
      return;
    }

    trigger.setAttribute("tabindex", "0");
  }

  private isFocusableTrigger(el: Element): boolean {
    if (!(el instanceof HTMLElement)) return false;
    if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") return false;

    const tagName = el.tagName.toLowerCase();
    const tabindex = el.getAttribute("tabindex");
    if (tabindex !== null && tabindex !== "-1") return true;
    if (tagName === "a" && el.hasAttribute("href")) return true;
    if (["button", "input", "select", "textarea", "summary"].includes(tagName)) return true;
    if (tagName === "mui-button" || tagName === "mui-link") return true;

    return Boolean(
      el.querySelector(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"]), mui-button, mui-link',
      ),
    );
  }

  private getDelay() {
    const raw = Number(this.getAttribute("delay"));
    if (Number.isFinite(raw)) return Math.min(2000, Math.max(250, raw));
    return 500;
  }

  private getInitialDelay() {
    const raw = Number(this.getAttribute("initial-delay"));
    if (Number.isFinite(raw)) return Math.min(2000, Math.max(250, raw));
    return 500;
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
    this.portalTooltip();
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
    this.restoreTooltip();
    window.removeEventListener("resize", this.boundReposition);
    window.removeEventListener("scroll", this.boundReposition, true);
    document.removeEventListener("pointerdown", this.boundDocPointer, true);
  }

  private portalTooltip() {
    const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;
    const contentSlot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!tooltip || !contentSlot) return;

    this.ensurePortalStyles();
    if (!this.portalTooltipElement) {
      this.portalTooltipElement = document.createElement("div");
      this.portalTooltipElement.className = "mui-hint-portal";
      this.portalTooltipElement.setAttribute("role", "tooltip");
      this.portalTooltipElement.dataset.owner = this.hintId;
      document.body.appendChild(this.portalTooltipElement);
    }

    this.portalTooltipElement.innerHTML = "";
    contentSlot.assignedNodes({ flatten: true }).forEach((node) => {
      this.portalTooltipElement?.appendChild(node.cloneNode(true));
    });
    this.syncPortalStyles(this.portalTooltipElement);
    this.portalTooltipElement.classList.add("is-open");
    this.setAttribute("portaled", "");
  }

  private restoreTooltip() {
    this.removeAttribute("portaled");
    this.portalTooltipElement?.remove();
    this.portalTooltipElement = null;
  }

  private ensurePortalStyles() {
    if (MuiHint.portalStylesInjected) return;

    const style = document.createElement("style");
    style.textContent = `
      .mui-hint-portal {
        display: block;
        position: fixed;
        z-index: 1000;
        min-width: max-content;
        max-width: var(--hint-max-width, 28rem);
        padding: var(--space-200) var(--space-300);
        border-radius: var(--radius-200);
        border: var(--border-thin);
        border-color: var(--hint-border-color, var(--border-color));
        background: var(--hint-background, var(--surface-elevated-100));
        color: var(--hint-text-color, var(--text-color));
        box-shadow: var(--hint-shadow, var(--shadow-medium, 0 6px 20px rgba(0,0,0,0.18)));
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--speed-300, 160ms) ease;
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
        box-sizing: border-box;
        top: 0;
        left: 0;
      }
      .mui-hint-portal.is-open {
        opacity: 1;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);
    MuiHint.portalStylesInjected = true;
  }

  private syncPortalStyles(tooltip: HTMLElement) {
    const styles = window.getComputedStyle(this);
    ["--hint-background", "--hint-border-color", "--hint-max-width", "--hint-shadow", "--hint-text-color"].forEach((property) => {
      const value = styles.getPropertyValue(property);
      if (value) tooltip.style.setProperty(property, value);
    });
  }

  private positionTooltip() {
    const triggerWrapper = this.shadowRoot?.querySelector(".trigger") as HTMLElement | null;
    const tooltip =
      this.portalTooltipElement ||
      (this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null);
    if (!tooltip || !triggerWrapper) return;

    const triggerSlot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
    const slottedTrigger = (triggerSlot?.assignedElements({ flatten: true })?.[0] as HTMLElement | undefined) || null;
    const anchor = slottedTrigger || triggerWrapper;

    const desired = this.getAttribute("placement") || "top";
    const triggerRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    const edge = 8;
    const gap = 8;
    const spaces = {
      top: triggerRect.top - edge,
      bottom: viewportH - triggerRect.bottom - edge,
      left: triggerRect.left - edge,
      right: viewportW - triggerRect.right - edge,
    };
    const required = {
      top: tooltipRect.height + gap,
      bottom: tooltipRect.height + gap,
      left: tooltipRect.width + gap,
      right: tooltipRect.width + gap,
    };
    const opposites: Record<string, "top" | "bottom" | "left" | "right"> = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    };
    const placementOrder: ("top" | "bottom" | "left" | "right")[] = ["top", "bottom", "right", "left"];
    const preferred = placementOrder.includes(desired as "top" | "bottom" | "left" | "right")
      ? (desired as "top" | "bottom" | "left" | "right")
      : "top";

    let resolved = preferred;
    const opposite = opposites[preferred];
    if (spaces[preferred] < required[preferred]) {
      if (spaces[opposite] >= required[opposite]) {
        resolved = opposite;
      } else {
        resolved = placementOrder.reduce((best, placement) =>
          spaces[placement] > spaces[best] ? placement : best
        , preferred);
      }
    }

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

    tooltip.style.top = `${globalTop}px`;
    tooltip.style.left = `${globalLeft}px`;
  }
}

if (!customElements.get("mui-hint")) {
  customElements.define("mui-hint", MuiHint);
}
