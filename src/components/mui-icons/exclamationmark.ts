class MuiIconExclamationmark extends HTMLElement {
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

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path d="M18.013 21.943c-1.554 0-2.357-.917-2.408-2.496l-.28-10.8c-.012-.23-.025-.497-.025-.688 0-1.694 1.031-2.688 2.713-2.688 1.68 0 2.7.994 2.7 2.688 0 .19-.013.458-.026.688l-.267 10.8c-.051 1.58-.866 2.496-2.407 2.496M18 29.7c-1.643 0-2.98-1.26-2.98-2.84s1.337-2.828 2.98-2.828 2.98 1.248 2.98 2.828S19.643 29.7 18 29.7"></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-exclamationmark")) {
  customElements.define("mui-icon-exclamationmark", MuiIconExclamationmark);
}
