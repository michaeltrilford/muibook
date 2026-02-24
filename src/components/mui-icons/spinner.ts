class MuiIconSpinner extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if ((name === "size" || name === "color") && oldValue !== newValue) {
      this.render();
    }
  }

  render(): void {
    const size = (this.getAttribute("size") || "small") as "xx-small" | "x-small" | "small" | "medium" | "large";
    const rawColor = this.getAttribute("color");

    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    const sizeMap: Record<"xx-small" | "x-small" | "small" | "medium" | "large", string> = {
      "xx-small": "1.3rem",
      "x-small": "1.6rem",
      small: "2.1rem",
      medium: "2.4rem",
      large: "2.8rem",
    };

    const sizeStyleMap = sizeMap[size] ?? sizeMap.small;

    this.classList.add("mui-icon");

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          width: ${sizeStyleMap};
          height: ${sizeStyleMap};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          fill: ${iconColor};
        }
        svg {
          width: 100%;
          display: block;
          fill: inherit;
        }
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <path
          fill-rule="evenodd"
          d="M18 4a14 14 0 1 0 0 28a14 14 0 1 0 0-28m0 4a10 10 0 1 1 0 20a10 10 0 1 1 0-20"
          opacity="0.24"
        ></path>
        <path
          d="M18 4a14 14 0 0 1 14 14h-4a10 10 0 0 0-10-10z"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-spinner")) {
  customElements.define("mui-icon-spinner", MuiIconSpinner);
}
