class figmaMark extends HTMLElement {
  static get observedAttributes() {
    return ["color", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "color" || name === "variant") && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const rawColor = this.getAttribute("color"); // Raw color
    const variant = this.getAttribute("variant"); // Variant name

    // Color map for predefined color options
    const colorMap = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Variant-to-color map for variants
    const variantColorMap = {
      primary: "var(--icon-color-inverted)",
      secondary: "var(--icon-color-default)",
      tertiary: "var(--icon-color-default)",
      attention: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    let iconColor =
      variantColorMap[variant] ||
      colorMap[rawColor] ||
      rawColor ||
      "var(--icon-color-default)";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 21px;
          height: 21px;
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
        viewBox="0 0 21 21"
      >
        <path
        d="M10.5 0C16.299 0 21 4.701 21 10.5S16.299 21 10.5 21 0 16.299 0 10.5 4.701 0 10.5 0M8.397 3.063c-1.496 0-2.71 1.225-2.71 2.737 0 .961.491 1.807 1.233 2.296a2.74 2.74 0 0 0-1.232 2.295c0 .96.49 1.806 1.232 2.294a2.74 2.74 0 0 0-1.232 2.296 2.734 2.734 0 0 0 2.721 2.738 2.76 2.76 0 0 0 2.747-2.763v-2.55a2.7 2.7 0 0 0 1.835.722h.049c1.497 0 2.71-1.226 2.71-2.737 0-.962-.49-1.807-1.232-2.295A2.74 2.74 0 0 0 15.75 5.8c0-1.512-1.213-2.737-2.71-2.737zm1.884 10.065v1.828a1.88 1.88 0 0 1-1.872 1.878 1.854 1.854 0 0 1-1.846-1.853c0-1.02.818-1.85 1.829-1.853zm0-4.59v3.705h-1.89a1.844 1.844 0 0 1-1.828-1.852c0-1.024.821-1.853 1.834-1.853zm2.759 0c1.013 0 1.834.83 1.834 1.853a1.843 1.843 0 0 1-1.834 1.852h-.049a1.844 1.844 0 0 1-1.835-1.852c0-1.024.822-1.853 1.835-1.853zm-2.759-.885H8.397A1.844 1.844 0 0 1 6.563 5.8c0-1.023.822-1.853 1.834-1.853h1.884zm2.759-3.706c1.013 0 1.834.83 1.834 1.853a1.844 1.844 0 0 1-1.834 1.853h-1.884V3.947z"
        ></path>
      </svg>



    `;
  }
}

customElements.define("figma-mark", figmaMark);
