class MuiIconMoon extends HTMLElement {
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

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
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

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >

        <path
          d="M24.96 21.953c1.48 0 3.014-.28 3.893-.68.48-.24.894-.36 1.28-.36.56 0 .947.4.947 1.014 0 .32-.093.76-.306 1.253-2.014 4.72-6.854 7.96-12.32 7.96-7.76 0-13.534-5.667-13.534-13.44 0-5.493 3.32-10.56 8.347-12.587.426-.173.813-.253 1.12-.253.666 0 1.066.453 1.066 1.04 0 .346-.12.746-.346 1.2-.52 1-.84 2.827-.84 4.44 0 6.44 4.12 10.413 10.693 10.413"
        ></path>

      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-moon")) {
  customElements.define("mui-icon-moon", MuiIconMoon);
}
