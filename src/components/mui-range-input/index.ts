import "../mui-body";

class MuiRangeInput extends HTMLElement {
  static get observedAttributes() {
    return ["min", "max", "value", "step", "disabled", "bubble", "bubble-format"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bind();
  }

  attributeChangedCallback(oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.bind();
  }

  get value() {
    return Number(this.getAttribute("value") || "0");
  }

  set value(next: number) {
    this.setAttribute("value", String(Number.isFinite(next) ? next : 0));
  }

  private getThumbSize() {
    return Number(this.getAttribute("thumb-size") || "16");
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
    const thumbSize = this.getThumbSize();

    bubble.textContent = this.formatBubble(value);
    bubble.style.left = `calc(${progress * 100}% - ${(progress - 0.5) * thumbSize}px)`;
  }

  private bind() {
    if (!this.shadowRoot) return;
    const wrap = this.shadowRoot.querySelector(".range-wrap") as HTMLElement | null;
    const input = this.shadowRoot.querySelector("input") as HTMLInputElement | null;
    if (!wrap || !input) return;

    const show = () => {
      if (!this.hasAttribute("bubble")) return;
      wrap.classList.add("show-bubble");
      this.updateBubble();
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
      this.updateBubble();
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
      this.updateBubble();
    };

    this.updateBubble();
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
        }
        .range-wrap {
          position: relative;
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: center;
        }
        input[type="range"] {
          width: 100%;
          margin: 0;
          accent-color: var(--range-input-accent-color, var(--grey-1200));
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
        <mui-body data-role="bubble" size="x-small" variant="optional" aria-hidden="true">0</mui-body>
      </div>
    `;
  }
}

if (!customElements.get("mui-range-input")) {
  customElements.define("mui-range-input", MuiRangeInput);
}
