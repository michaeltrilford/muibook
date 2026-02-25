class MuiSkeleton extends HTMLElement {
  static get observedAttributes() {
    return ["shape", "size", "width", "height", "radius", "animation", "lines", "gap", "loading", "line-widths", "max-width", "duration"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
  }

  private getSizeHeight(size: string) {
    const map: Record<string, string> = {
      "x-small": "var(--text-font-size-xs)",
      small: "var(--text-font-size-s)",
      medium: "var(--text-font-size-m)",
      large: "var(--text-font-size-l)",
    };
    return map[size] || map.medium;
  }

  private getCircleSize(size: string) {
    const map: Record<string, string> = {
      "x-small": "var(--space-200)",
      small: "var(--space-300)",
      medium: "var(--space-400)",
      large: "var(--space-500)",
    };
    return map[size] || map.medium;
  }

  private getLineWidths(lines: number) {
    const raw = (this.getAttribute("line-widths") || "").trim();
    if (!raw) {
      const defaults: string[] = [];
      for (let i = 0; i < lines; i += 1) {
        if (lines > 1 && i === lines - 1) defaults.push("72%");
        else if (i % 3 === 1) defaults.push("92%");
        else defaults.push("100%");
      }
      return defaults;
    }
    const parsed = raw.split(",").map((item) => item.trim()).filter(Boolean);
    if (parsed.length === 0) return Array.from({ length: lines }).map(() => "100%");
    const widths: string[] = [];
    for (let i = 0; i < lines; i += 1) widths.push(parsed[Math.min(i, parsed.length - 1)]);
    return widths;
  }

  render() {
    if (!this.shadowRoot) return;

    const shape = (this.getAttribute("shape") || "line").toLowerCase();
    const size = (this.getAttribute("size") || "medium").toLowerCase();
    const lines = Math.max(1, Number(this.getAttribute("lines") || "1"));
    const width = this.getAttribute("width") || "100%";
    const maxWidth = this.getAttribute("max-width") || "";
    const gap = this.getAttribute("gap") || "var(--skeleton-gap, var(--space-200))";
    const duration = this.getAttribute("duration") || "var(--skeleton-animation-speed, 2000ms)";
    const isLoading = (this.getAttribute("loading") || "true").toLowerCase() !== "false";

    const baseHeight =
      this.getAttribute("height") ||
      (shape === "circle" ? this.getCircleSize(size) : shape === "rect" ? "var(--space-600)" : this.getSizeHeight(size));
    const radius =
      this.getAttribute("radius") ||
      (shape === "circle" ? "999px" : "var(--skeleton-radius, var(--radius-200))");
    const widths = this.getLineWidths(lines);

    const blocks = Array.from({ length: lines })
      .map((_, index) => {
        const lineWidth = lines > 1 ? widths[index] : width;
        return `<span class="block" style="--block-width: ${lineWidth}; --block-height: ${baseHeight}; --block-radius: ${radius}; --block-max-width: ${maxWidth || "100%"};"></span>`;
      })
      .join("");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        .content[hidden],
        .skeleton-shell[hidden] {
          display: none !important;
        }
        .skeleton-shell {
          display: inline-flex;
          align-items: center;
          gap: var(--space-200);
          width: 100%;
          box-sizing: border-box;
        }
        .stack {
          display: grid;
          gap: ${gap};
          width: 100%;
          min-width: 0;
        }
        .block {
          display: block;
          position: relative;
          width: var(--block-width);
          max-width: var(--block-max-width, 100%);
          height: var(--block-height);
          border-radius: var(--block-radius);
          background: var(--skeleton-background, var(--surface-elevated-200));
          overflow: hidden;
          opacity: 1;
        }
        .block::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            transparent 0%,
            var(--skeleton-highlight, color-mix(in srgb, var(--white) 42%, transparent 58%)) 45%,
            transparent 100%
          );
          transform: translateX(-120%);
          opacity: var(--skeleton-shimmer-opacity, 0.6);
          pointer-events: none;
        }
        :host([animation="shimmer"]) .block::after {
          animation: skeletonShimmer ${duration} linear infinite;
        }
        :host([animation="pulsate"]) .block {
          animation: skeletonPulse ${duration} ease-in-out infinite;
        }
        :host([animation="none"]) .block::after {
          display: none;
        }
        :host([animation="none"]) .block {
          animation: none;
        }
        @keyframes skeletonShimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes skeletonPulse {
          0%, 100% { opacity: var(--skeleton-pulse-min-opacity, 0.55); }
          50% { opacity: var(--skeleton-pulse-max-opacity, 1); }
        }
        @media (prefers-reduced-motion: reduce) {
          :host([animation="shimmer"]) .block::after,
          :host([animation="pulsate"]) .block {
            animation: none !important;
          }
        }
      </style>

      <div class="skeleton-shell" ${isLoading ? "" : "hidden"}>
        <slot name="before"></slot>
        <div class="stack">
          ${blocks}
        </div>
        <slot name="after"></slot>
      </div>

      <div class="content" ${isLoading ? "hidden" : ""}>
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get("mui-skeleton")) {
  customElements.define("mui-skeleton", MuiSkeleton);
}
