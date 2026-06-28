class MuiProgressRing extends HTMLElement {
  static get observedAttributes() {
    return ["progress", "value", "max", "label", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
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

  render() {
    const progress = this.getProgress();
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;
    const size = this.getAttribute("size") || "medium";
    const strokeWidth = size === "small" ? 3 : 4;
    const sizeMap: Record<string, string> = {
      small: "3.2rem",
      medium: "4.8rem",
      large: "5.6rem",
    };
    const ringSize = sizeMap[size] || sizeMap.medium;

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
        display: grid;
        place-items: center;
        font-size: var(--text-font-size-s);
        line-height: var(--text-line-height-s);
        font-weight: var(--font-weight-bold);
        text-align: center;
        pointer-events: none;
      }
      :host([size="small"]) .content {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }
      :host([size="medium"]) .content {
        font-size: var(--text-font-size-s);
        line-height: var(--text-line-height-s);
      }
      :host([size="large"]) .content {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }
      .shell {
        position: relative;
        inline-size: 100%;
        block-size: 100%;
      }
    `;

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="shell">
        <svg class="ring" viewBox="0 0 42 42" aria-hidden="true">
          <circle class="track" cx="21" cy="21" r="${radius}"></circle>
          <circle class="indicator" cx="21" cy="21" r="${radius}"></circle>
        </svg>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }
}

if (!customElements.get("mui-progress-ring")) {
  customElements.define("mui-progress-ring", MuiProgressRing);
}
