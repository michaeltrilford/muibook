import "../mui-icons/checkmark";

class MuiProgressRing extends HTMLElement {
  static get observedAttributes() {
    return ["progress", "value", "max", "label", "size", "display", "tooltip", "tooltip-trigger", "tooltip-placement"];
  }

  private tooltipOpen = false;
  private boundReposition = () => this.positionTooltip();
  private boundDocPointer = (event: Event) => {
    if (!event.composedPath().includes(this)) this.closeTooltip(true);
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.closeTooltip(true);
  }

  attributeChangedCallback() {
    this.render();
  }

  private getProgress() {
    const progressAttr = this.getAttribute("progress");
    if (progressAttr !== null) {
      return Math.min(Math.max(Number(progressAttr) || 0, 0), 100);
    }

    const value = Number(this.getAttribute("value") || 0);
    const max = Number(this.getAttribute("max") || 100);
    if (!Number.isFinite(max) || max <= 0) return 0;

    return Math.min(Math.max((value / max) * 100, 0), 100);
  }

  private getDisplayText(progress: number) {
    const display = this.getAttribute("display") || "auto";
    const valueAttr = this.getAttribute("value");
    const maxAttr = this.getAttribute("max");

    if (display === "none") return "";
    if (display === "percent") return String(Math.round(progress));
    if (display === "value") return valueAttr || String(Math.round(progress));
    if (display === "fraction" && valueAttr !== null && maxAttr !== null) return `${valueAttr}/${maxAttr}`;

    if (valueAttr !== null && maxAttr !== null) return `${valueAttr}/${maxAttr}`;

    return "";
  }

  private getTooltipText(progress: number) {
    if (this.hasAttribute("tooltip")) return this.getAttribute("tooltip")?.trim() || "";

    const valueAttr = this.getAttribute("value");
    const maxAttr = this.getAttribute("max");
    if (valueAttr !== null && maxAttr !== null) return `${valueAttr} of ${maxAttr}`;
    if (this.hasAttribute("progress")) return `${Math.round(progress)}% complete`;

    return "";
  }

  private escapeHtml(value: string) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  private getTooltipTrigger() {
    const trigger = this.getAttribute("tooltip-trigger") || "hover";
    return trigger === "click" ? "click" : "hover";
  }

  private getTooltipPlacement() {
    const placement = this.getAttribute("tooltip-placement") || "top";
    return ["top", "bottom", "left", "right"].includes(placement) ? placement : "top";
  }

  private hasTooltip() {
    return Boolean(this.getTooltipText(this.getProgress()));
  }

  private syncAria(progress: number) {
    const value = this.getAttribute("value");
    const max = this.getAttribute("max");
    const label = this.getAttribute("label");

    this.setAttribute("role", "progressbar");
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", max || "100");
    this.setAttribute("aria-valuenow", value || String(Math.round(progress)));
    if (label) this.setAttribute("aria-label", label);
  }

  private setupTooltipEvents() {
    const shell = this.shadowRoot?.querySelector(".shell") as HTMLElement | null;
    if (!shell || !this.hasTooltip()) return;

    const trigger = this.getTooltipTrigger();
    if (trigger === "click") {
      shell.addEventListener("click", () => {
        if (this.tooltipOpen) {
          this.closeTooltip(true);
          return;
        }
        this.openTooltip();
      });
    } else {
      shell.addEventListener("mouseenter", () => this.openTooltip());
      shell.addEventListener("mouseleave", () => this.closeTooltip());
      shell.addEventListener("focusin", () => this.openTooltip());
      shell.addEventListener("focusout", () => this.closeTooltip(true));
    }

    shell.addEventListener("keydown", (event) => {
      const key = (event as KeyboardEvent).key;
      if (key === "Escape") {
        this.closeTooltip(true);
        return;
      }
      if (trigger === "click" && (key === "Enter" || key === " ")) {
        event.preventDefault();
        if (this.tooltipOpen) {
          this.closeTooltip(true);
          return;
        }
        this.openTooltip();
      }
    });
  }

  private openTooltip() {
    if (!this.hasTooltip()) return;
    const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;
    if (!tooltip) return;

    this.tooltipOpen = true;
    tooltip.classList.add("is-open");
    requestAnimationFrame(() => this.positionTooltip());
    window.addEventListener("resize", this.boundReposition);
    window.addEventListener("scroll", this.boundReposition, true);
    document.addEventListener("pointerdown", this.boundDocPointer, true);
  }

  private closeTooltip(immediate = false) {
    this.tooltipOpen = false;
    const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;
    if (tooltip) {
      tooltip.classList.toggle("is-immediate", immediate);
      tooltip.classList.remove("is-open");
      if (immediate) requestAnimationFrame(() => tooltip.classList.remove("is-immediate"));
    }
    window.removeEventListener("resize", this.boundReposition);
    window.removeEventListener("scroll", this.boundReposition, true);
    document.removeEventListener("pointerdown", this.boundDocPointer, true);
  }

  private positionTooltip() {
    const shell = this.shadowRoot?.querySelector(".shell") as HTMLElement | null;
    const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;
    if (!shell || !tooltip || !this.tooltipOpen) return;

    const desired = this.getTooltipPlacement();
    const triggerRect = shell.getBoundingClientRect();
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
    let resolved = desired as "top" | "bottom" | "left" | "right";
    const opposite = opposites[resolved];

    if (spaces[resolved] < required[resolved]) {
      if (spaces[opposite] >= required[opposite]) {
        resolved = opposite;
      } else {
        resolved = placementOrder.reduce((best, placement) => (spaces[placement] > spaces[best] ? placement : best), resolved);
      }
    }

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

    tooltip.setAttribute("data-placement", resolved);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  render() {
    this.closeTooltip(true);
    const progress = this.getProgress();
    const size = this.getAttribute("size") || "medium";
    const hasCenterContent = size !== "x-small";
    const isComplete = progress >= 100;
    const displayText = hasCenterContent && !isComplete ? this.getDisplayText(progress) : "";
    const showCompleteIcon = isComplete;
    const strokeWidth = size === "x-small" || size === "small" ? 4 : 5;
    const radius = 21 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;
    const sizeMap: Record<string, string> = {
      "x-small": "var(--action-icon-only-size-x-small)",
      small: "var(--action-icon-only-size-small)",
      medium: "var(--action-icon-only-size-medium)",
      large: "var(--action-icon-only-size-large)",
    };
    const textMap: Record<string, { fontSize: string; lineHeight: string }> = {
      "x-small": {
        fontSize: "calc(var(--text-font-size-s) * 0.8)",
        lineHeight: "1",
      },
      small: {
        fontSize: "calc(var(--text-font-size-s) * 0.9)",
        lineHeight: "1",
      },
      medium: {
        fontSize: "var(--text-font-size-s)",
        lineHeight: "1",
      },
      large: {
        fontSize: "var(--text-font-size-s)",
        lineHeight: "1",
      },
    };
    const iconSizeMap: Record<string, string> = {
      "x-small": "xx-small",
      small: "x-small",
      medium: "small",
      large: "medium",
    };
    const ringSize = sizeMap[size] || sizeMap.medium;
    const textSize = textMap[size] || textMap.medium;
    const completeIconSize = iconSizeMap[size] || iconSizeMap.medium;
    const tooltip = this.getTooltipText(progress);
    const hasTooltip = Boolean(tooltip);
    const tooltipId = "progress-ring-tooltip";
    const tooltipTrigger = this.getTooltipTrigger();
    const tooltipPlacement = this.getTooltipPlacement();

    this.syncAria(progress);

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        place-items: center;
        inline-size: ${ringSize};
        block-size: ${ringSize};
        color: var(--text-color);
      }
      .ring {
        inline-size: 100%;
        block-size: 100%;
        overflow: visible;
        transform: rotate(-90deg);
      }
      .track,
      .indicator {
        fill: none;
        stroke-width: ${strokeWidth};
      }
      .track {
        stroke: var(--progress-track-background);
      }
      .indicator {
        stroke: var(--progress-bar-background);
        stroke-linecap: round;
        stroke-dasharray: ${circumference};
        stroke-dashoffset: ${dashOffset};
        transition: stroke-dashoffset var(--speed-300) ease;
      }
      .content {
        position: absolute;
        inset: 0;
        display: ${displayText || showCompleteIcon ? "grid" : "none"};
        place-items: center;
        font-size: ${textSize.fontSize};
        line-height: ${textSize.lineHeight};
        font-weight: var(--font-weight-semi-bold);
        text-align: center;
        pointer-events: none;
        max-inline-size: 64%;
        margin: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      mui-icon-checkmark.complete-icon {
        color: currentColor;
        fill: currentColor;
      }
      .shell {
        position: relative;
        inline-size: 100%;
        block-size: 100%;
        border-radius: 50%;
        outline: none;
        cursor: ${hasTooltip ? (tooltipTrigger === "click" ? "pointer" : "help") : "default"};
      }
      .shell:focus-visible {
        outline: var(--hint-focus-outline, var(--stroke-size-400) var(--stroke-outset) var(--outline-color));
        outline-offset: var(--hint-focus-outline-offset, var(--stroke-size-200));
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
      .tooltip.is-immediate {
        transition-duration: 0ms;
      }
      .tooltip.is-open {
        display: block;
        opacity: 1;
      }
    `;

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="shell" ${hasTooltip ? `tabindex="0" aria-describedby="${tooltipId}"` : ""}>
        <svg class="ring" viewBox="0 0 42 42" aria-hidden="true">
          <circle class="track" cx="21" cy="21" r="${radius}"></circle>
          <circle class="indicator" cx="21" cy="21" r="${radius}"></circle>
        </svg>
        <div class="content">${
          showCompleteIcon
            ? `<mui-icon-checkmark class="complete-icon" size="${completeIconSize}" color="currentColor" aria-hidden="true"></mui-icon-checkmark>`
            : this.escapeHtml(displayText)
        }</div>
      </div>
      ${
        hasTooltip
          ? `<div id="${tooltipId}" class="tooltip" role="tooltip" data-placement="${tooltipPlacement}">${this.escapeHtml(tooltip)}</div>`
          : ""
      }
    `;
    this.setupTooltipEvents();
  }
}

if (!customElements.get("mui-progress-ring")) {
  customElements.define("mui-progress-ring", MuiProgressRing);
}
