class MuiIconPin extends HTMLElement {
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
        <path d="M9.321 22.308c0-2.378 1.847-4.642 4.84-5.8l.334-5.027c-1.669-.939-2.837-1.899-3.359-2.556-.323-.407-.5-.855-.5-1.272 0-.856.667-1.482 1.596-1.482h11.536c.929 0 1.596.626 1.596 1.482 0 .417-.177.865-.5 1.272-.522.657-1.69 1.617-3.36 2.556l.335 5.028c2.993 1.157 4.84 3.42 4.84 5.8 0 1.126-.772 1.887-1.93 1.887h-5.372v5.1c0 1.075-1.001 3.047-1.377 3.047-.375 0-1.377-1.972-1.377-3.046v-5.1h-5.372c-1.158 0-1.93-.762-1.93-1.889"></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-pin")) {
  customElements.define("mui-icon-pin", MuiIconPin);
}
