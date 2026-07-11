import "../mui-body";

class MuiRangeInput extends HTMLElement {
  static get observedAttributes() {
    return ["min", "max", "value", "step", "disabled", "bubble", "bubble-format", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.render();
    this.bind();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (name === "value") {
      const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
      if (input && input.value !== (newValue || "0")) input.value = newValue || "0";
      this.updateVisuals();
      return;
    }
    this.render();
    this.bind();
  }

  get value() {
    return Number(this.getAttribute("value") || "0");
  }

  set value(next: number) {
    this.setAttribute("value", String(Number.isFinite(next) ? next : 0));
  }

  focus(options?: FocusOptions) {
    const input = this.shadowRoot?.querySelector("input");
    if (input) {
      input.focus(options);
    } else {
      super.focus(options);
    }
  }

  private getThumbSize(input: HTMLInputElement) {
    const value = getComputedStyle(input).getPropertyValue("--range-input-thumb-size-current").trim();
    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount)) return 16;
    if (value.endsWith("rem")) {
      return amount * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    if (value.endsWith("em")) {
      return amount * Number.parseFloat(getComputedStyle(input).fontSize);
    }
    return amount;
  }

  private formatTime(seconds: number) {
    const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  private formatBubble(value: number) {
    const mode = (this.getAttribute("bubble-format") || "number").toLowerCase();
    if (mode === "time") return this.formatTime(value);
    return String(Math.round(value * 100) / 100);
  }

  private updateBubble() {
    if (!this.shadowRoot) return;
    const input = this.shadowRoot.querySelector("input") as HTMLInputElement | null;
    const bubble = this.shadowRoot.querySelector('[data-role="bubble"]') as HTMLElement | null;
    if (!input || !bubble) return;

    const min = Number(input.min || "0");
    const max = Number(input.max || "0");
    const value = Number(input.value || "0");
    const range = Math.max(0, max - min);
    const progress = range > 0 ? Math.max(0, Math.min(1, (value - min) / range)) : 0;
    const thumbSize = this.getThumbSize(input);

    bubble.textContent = this.formatBubble(value);
    bubble.style.left = `calc(${progress * 100}% - ${(progress - 0.5) * thumbSize}px)`;
  }

  private updateVisuals() {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    if (!input) return;
    const min = Number(input.min || "0");
    const max = Number(input.max || "100");
    const value = Number(input.value || "0");
    const range = Math.max(0, max - min);
    const progress = range > 0 ? Math.max(0, Math.min(1, (value - min) / range)) : 0;
    input.style.setProperty("--range-input-progress", `${progress * 100}%`);
    this.updateBubble();
  }

  private bind() {
    if (!this.shadowRoot) return;
    const wrap = this.shadowRoot.querySelector(".range-wrap") as HTMLElement | null;
    const input = this.shadowRoot.querySelector("input") as HTMLInputElement | null;
    if (!wrap || !input) return;

    const show = () => {
      if (!this.hasAttribute("bubble")) return;
      wrap.classList.add("show-bubble");
      this.updateVisuals();
    };
    const hide = () => wrap.classList.remove("show-bubble");

    input.oninput = () => {
      this.setAttribute("value", input.value);
      show();
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: { value: Number(input.value || "0") },
          bubbles: true,
          composed: true,
        }),
      );
      this.updateVisuals();
    };
    input.onchange = () => {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: Number(input.value || "0") },
          bubbles: true,
          composed: true,
        }),
      );
    };
    input.onpointerdown = show;
    input.onpointerup = hide;
    input.onfocus = show;
    input.onblur = hide;
    input.onmouseenter = show;
    input.onmouseleave = hide;
    input.onmousemove = () => {
      if (!wrap.classList.contains("show-bubble")) return;
      this.updateVisuals();
    };

    this.updateVisuals();
  }

  render() {
    if (!this.shadowRoot) return;
    const min = this.getAttribute("min") || "0";
    const max = this.getAttribute("max") || "100";
    const value = this.getAttribute("value") || "0";
    const step = this.getAttribute("step") || "1";
    const disabled = this.hasAttribute("disabled");
    const label = this.getAttribute("label") || "Range input";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          width: 100%;
          --range-input-thumb-size-current: var(--range-input-thumb-size);
          --range-input-track-height-current: var(--range-input-track-height);
        }
        :host([size="x-small"]) {
          --range-input-thumb-size-current: calc(var(--range-input-thumb-size) - var(--space-200));
          --range-input-track-height-current: var(--stroke-size-100);
        }
        :host([size="small"]) {
          --range-input-thumb-size-current: calc(var(--range-input-thumb-size) - var(--space-100));
          --range-input-track-height-current: var(--stroke-size-200);
        }
        :host([size="large"]) {
          --range-input-thumb-size-current: calc(var(--range-input-thumb-size) + var(--space-200));
          --range-input-track-height-current: calc(var(--range-input-track-height) + var(--stroke-size-200));
        }
        .range-wrap {
          position: relative;
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: center;
        }
        input[type="range"] {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          height: var(--range-input-thumb-size-current);
          margin: 0;
          padding: 0;
          border: 0;
          background:
            linear-gradient(
              to right,
              var(--range-input-accent-color) 0 var(--range-input-progress),
              var(--range-input-track-color) var(--range-input-progress) 100%
            ) center / 100% var(--range-input-track-height-current) no-repeat;
          cursor: grab;
          touch-action: none;
        }
        input[type="range"]:active {
          cursor: grabbing;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: var(--range-input-track-height-current);
          border-radius: var(--range-input-track-radius);
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: var(--range-input-thumb-size-current);
          height: var(--range-input-thumb-size-current);
          margin-top: calc((var(--range-input-track-height-current) - var(--range-input-thumb-size-current)) / 2);
          border: 0;
          border-radius: 50%;
          background: var(--range-input-thumb-color);
        }
        input[type="range"]::-moz-range-track {
          height: var(--range-input-track-height-current);
          border-radius: var(--range-input-track-radius);
          background: var(--range-input-track-color);
        }
        input[type="range"]::-moz-range-progress {
          height: var(--range-input-track-height-current);
          border-radius: var(--range-input-track-radius);
          background: var(--range-input-accent-color);
        }
        input[type="range"]::-moz-range-thumb {
          width: var(--range-input-thumb-size-current);
          height: var(--range-input-thumb-size-current);
          border: 0;
          border-radius: 50%;
          background: var(--range-input-thumb-color);
        }
        input[type="range"]:focus-visible {
          outline: none;
        }
        input[type="range"]:focus-visible::-webkit-slider-thumb {
          outline: var(--outline-thick);
          outline-offset: var(--stroke-size-200);
        }
        input[type="range"]:focus-visible::-moz-range-thumb {
          outline: var(--outline-thick);
          outline-offset: var(--stroke-size-200);
        }
        input[type="range"]:disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }
        [data-role="bubble"] {
          position: absolute;
          bottom: calc(100% + var(--space-100));
          left: 0;
          transform: translateX(-50%);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity var(--speed-200) ease;
          border: var(--border-thin);
          border-color: var(--range-input-bubble-border-color, var(--border-color));
          border-radius: var(--radius-100);
          background: var(--range-input-bubble-background, var(--surface-elevated-100));
          padding: var(--space-025) var(--space-100);
          z-index: 2;
        }
        .range-wrap.show-bubble [data-role="bubble"] {
          opacity: 1;
        }
      </style>
      <div class="range-wrap">
        <input
          type="range"
          min="${min}"
          max="${max}"
          value="${value}"
          step="${step}"
          aria-label="${label.replace(/"/g, "&quot;")}"
          ${disabled ? "disabled" : ""}
        />
        <mui-body data-role="bubble" size="x-small" variant="secondary" aria-hidden="true">0</mui-body>
      </div>
    `;
  }
}

if (!customElements.get("mui-range-input")) {
  customElements.define("mui-range-input", MuiRangeInput);
}
