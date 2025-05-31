class muiIconStop extends HTMLElement {
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

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if ((name === "size" || name === "color") && oldValue !== newValue) {
      this.render();
    }
  }

  render(): void {
    const size = (this.getAttribute("size") || "small") as
      | "x-small"
      | "small"
      | "medium"
      | "large";
    const rawColor = this.getAttribute("color");

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string =
      (rawColor && colorMap[rawColor]) ||
      rawColor ||
      "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"x-small" | "small" | "medium" | "large", string> = {
      "x-small": "1.6rem",
      small: "2.4rem",
      medium: "3.6rem",
      large: "4.8rem",
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
          d="M17.992 35.5C8.65 35.5 1 27.85 1 18.508S8.65 1.5 17.992 1.5 35 9.166 35 18.508 27.334 35.5 17.992 35.5m0-4.932c6.686 0 12.06-5.39 12.06-12.06 0-6.686-5.39-12.06-12.06-12.06s-12.06 5.374-12.06 12.06c0 6.67 5.39 12.06 12.06 12.06m-3.92-6.37c-1.09 0-1.802-.648-1.802-1.675v-8.077c0-1.012.711-1.66 1.802-1.66h7.824c1.091 0 1.802.648 1.802 1.66v8.077c0 1.027-.711 1.675-1.802 1.675z"
        ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-stop", muiIconStop);
