class MuiIconHome extends HTMLElement {
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
          d="M4.399 19.038c-1.108 0-1.828-.72-1.828-1.734 0-.507.272-1.06.743-1.462L15.601 5.537c.719-.613 1.568-.92 2.393-.92.837 0 1.674.307 2.406.92l4.457 3.75V7.871c0-.566.389-.932.954-.932h2.654c.566 0 .931.366.931.932v5.211l3.29 2.76c.471.4.743.954.743 1.461 0 1.014-.72 1.734-1.828 1.734-.483 0-.99-.224-1.415-.59l-.79-.66v10.305c0 2.016-1.273 3.29-3.42 3.29H10.024c-2.146 0-3.419-1.274-3.419-3.29V17.788l-.802.66c-.413.366-.92.59-1.403.59m16.967 2.11v6.58h3.325c.672 0 1.062-.39 1.062-1.062V14.734l-6.98-5.848c-.248-.213-.52-.33-.779-.33-.26 0-.519.117-.766.33l-6.98 5.848v11.932c0 .672.377 1.062 1.06 1.062h3.326v-6.58c0-.578.377-.955.955-.955h4.834c.566 0 .943.377.943.955"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-home")) {
  customElements.define("mui-icon-home", MuiIconHome);
}
