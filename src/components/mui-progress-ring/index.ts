import "../mui-icons/checkmark";

type CenterContent =
  | { text: string; variant: "empty" | "text" }
  | { text: string; value: string; max: string; variant: "fraction" };

type RingColor = "positive" | "warning" | "attention";

class MuiProgressRing extends HTMLElement {
  static get observedAttributes() {
    return [
      "progress",
      "value",
      "max",
      "label",
      "size",
      "display",
      "display-value",
      "color",
      "tooltip",
      "tooltip-trigger",
      "tooltip-placement",
    ];
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
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "medium");
      return;
    }
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

  private getDisplayContent(progress: number, size: string): CenterContent {
    const display = this.getAttribute("display") || "auto";
    const displayValue = this.getAttribute("display-value");
    const valueAttr = this.getAttribute("value");
    const maxAttr = this.getAttribute("max");

    if (display === "none") return { text: "", variant: "empty" };
    if (displayValue !== null) {
      const text = displayValue.trim();
      return text ? { text, variant: "text" } : { text: "", variant: "empty" };
    }
    if (display === "value") {
      if (valueAttr !== null && maxAttr !== null) return this.getFractionContent(valueAttr, maxAttr, size);
      return { text: String(Math.round(progress)), variant: "text" };
    }
    if (display === "fraction" && valueAttr !== null && maxAttr !== null)
      return this.getFractionContent(valueAttr, maxAttr, size);
    if (display === "percent") return { text: String(Math.round(progress)), variant: "text" };

    // Auto keeps the ring quiet; the data still drives progress and tooltip text.
    return { text: "", variant: "empty" };
  }

  private getFractionContent(value: string, max: string, size: string): CenterContent {
    const valueText = value.trim();
    const maxText = max.trim();
    const inlineText = `${valueText}/${maxText}`;
    const isWholeNumberPair = /^\d+$/.test(valueText) && /^\d+$/.test(maxText);

    if (inlineText.length <= 3) {
      return { text: inlineText, variant: "text" };
    }

    if (
      isWholeNumberPair &&
      valueText.length <= 2 &&
      maxText.length <= 2 &&
      (size === "small" || size === "medium" || size === "large")
    ) {
      return { text: inlineText, value: valueText, max: maxText, variant: "fraction" };
    }

    return { text: "", variant: "empty" };
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

  private getIndicatorColor() {
    const color = this.getAttribute("color") as RingColor | null;
    const colorMap: Record<RingColor, string> = {
      positive: "var(--progress-bar-background-positive)",
      warning: "var(--progress-bar-background-warning)",
      attention: "var(--progress-bar-background-attention)",
    };

    return color && colorMap[color] ? colorMap[color] : "var(--progress-bar-background)";
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
        resolved = placementOrder.reduce(
          (best, placement) => (spaces[placement] > spaces[best] ? placement : best),
          resolved,
        );
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
    const hasDisplayValue = this.hasAttribute("display-value") && Boolean(this.getAttribute("display-value")?.trim());
    const isComplete = progress >= 100;
    const displayContent: CenterContent =
      hasCenterContent && (!isComplete || hasDisplayValue)
        ? this.getDisplayContent(progress, size)
        : { text: "", variant: "empty" };
    const showCompleteIcon = isComplete && !(hasCenterContent && hasDisplayValue);
    const strokeWidth = size === "x-small" ? 6 : 5;
    const radius = 21 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const rawIndicatorLength = (progress / 100) * circumference;
    const minimumPathGap = progress > 0 && progress < 100 ? strokeWidth * 1.4 : 0;
    const indicatorLength =
      progress >= 100 ? circumference : Math.max(0, Math.min(rawIndicatorLength, circumference - minimumPathGap));
    const indicatorGap = circumference - indicatorLength;
    const indicatorLinecap = progress <= 0 ? "butt" : "round";
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
    // Tune compact fraction center text per visual size.
    const fractionMap: Record<string, { fontSize: string; lineHeight: string; width: string; dividerMargin: string }> =
      {
        "x-small": {
          fontSize: "0",
          lineHeight: "1",
          width: "0",
          dividerMargin: "0",
        },
        small: {
          fontSize: "var(--font-size-10)",
          lineHeight: "1",
          width: "1em",
          dividerMargin: "var(--stroke-size-100)",
        },
        medium: {
          fontSize: "var(--font-size-15)",
          lineHeight: "1",
          width: "1em",
          dividerMargin: "var(--stroke-size-200)",
        },
        large: {
          fontSize: "var(--font-size-50)",
          lineHeight: "1",
          width: "1.2em",
          dividerMargin: "var(--stroke-size-200)",
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
    const fractionSize = fractionMap[size] || fractionMap.medium;
    const completeIconSize = iconSizeMap[size] || iconSizeMap.medium;
    const tooltip = this.getTooltipText(progress);
    const hasTooltip = Boolean(tooltip);
    const tooltipId = "progress-ring-tooltip";
    const tooltipTrigger = this.getTooltipTrigger();
    const tooltipPlacement = this.getTooltipPlacement();
    const indicatorColor = this.getIndicatorColor();
    let contentHtml = this.escapeHtml(displayContent.text);
    if (showCompleteIcon) {
      contentHtml = `<mui-icon-checkmark class="complete-icon" size="${completeIconSize}" color="currentColor" aria-hidden="true"></mui-icon-checkmark>`;
    } else if (displayContent.variant === "fraction") {
      contentHtml = `<span class="fraction" aria-hidden="true"><span class="fraction__value">${this.escapeHtml(displayContent.value)}</span><span class="fraction__divider"></span><span class="fraction__max">${this.escapeHtml(displayContent.max)}</span></span>`;
    }

    this.syncAria(progress);

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        place-items: center;
        inline-size: ${ringSize};
        block-size: ${ringSize};
        color: var(--text-color);
        --progress-ring-fraction-font-size: ${fractionSize.fontSize};
        --progress-ring-fraction-line-height: ${fractionSize.lineHeight};
        --progress-ring-fraction-width: ${fractionSize.width};
        --progress-ring-fraction-divider-margin: ${fractionSize.dividerMargin};
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
        stroke: ${indicatorColor};
        stroke-linecap: ${indicatorLinecap};
        stroke-dasharray: ${indicatorLength} ${indicatorGap};
        stroke-dashoffset: 0;
        transition: stroke-dasharray var(--speed-300) ease;
      }
      .content {
        position: absolute;
        inset: 0;
        display: ${displayContent.text || showCompleteIcon ? "grid" : "none"};
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
      .fraction {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto auto;
        align-items: center;
        justify-content: center;
        justify-items: center;
        inline-size: min(var(--progress-ring-fraction-width), 100%);
        line-height: var(--progress-ring-fraction-line-height);
        font-size: var(--progress-ring-fraction-font-size);
      }
      .fraction__value {
        justify-self: center;
      }
      .fraction__divider {
        inline-size: 100%;
        block-size: var(--stroke-size-100);
        margin-block: var(--progress-ring-fraction-divider-margin);
        border-radius: var(--radius-500);
        background: currentColor;
        opacity: 0.7;
      }
      .fraction__max {
        justify-self: center;
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
        <div class="content">${contentHtml}</div>
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
