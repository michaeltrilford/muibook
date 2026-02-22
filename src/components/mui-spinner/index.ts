class MuiSpinner extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "duration", "label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("duration")) this.setAttribute("duration", "0.8s");
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "medium";
    const duration = this.getAttribute("duration") || "0.8s";
    const color = this.getAttribute("color") || "var(--icon-color-default)";
    const label = this.getAttribute("label") || "Loading";

    const sizeMap: Record<string, string> = {
      "x-small": "1.6rem",
      small: "2.1rem",
      medium: "2.4rem",
      large: "2.8rem",
    };

    const spinnerSize = sizeMap[size] || sizeMap.medium;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          width: ${spinnerSize};
          height: ${spinnerSize};
          align-items: center;
          justify-content: center;
        }
        .spinner {
          width: 100%;
          height: 100%;
          border-radius: 999px;
          border: var(--stroke-size-200) solid color-mix(in srgb, ${color} 25%, transparent);
          border-top-color: ${color};
          animation: spin ${duration} linear infinite;
          box-sizing: border-box;
        }
        .vh {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .spinner {
            animation-duration: 1.6s;
          }
        }
      </style>
      <span class="vh">${label}</span>
      <span class="spinner" role="status" aria-label="${label}"></span>
    `;
  }
}

if (!customElements.get("mui-spinner")) {
  customElements.define("mui-spinner", MuiSpinner);
}
