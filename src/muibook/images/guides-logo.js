class guidesLogo extends HTMLElement {
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

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "size" || name === "color") && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const size = this.getAttribute("size") || "small"; // Default size
    const rawColor = this.getAttribute("color"); // Raw color

    // Color map for predefined color options
    const colorMap = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    let iconColor = colorMap[rawColor] || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap = {
      small: "2.8rem",
      medium: "3.8rem",
    };

    const sizeStyleMap = sizeMap[size] || sizeMap.small;

    this.shadowRoot.innerHTML = `
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
        .opac {
          opacity: 0.5;
        }
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 38 38"
      >
        <path
          d="M25.227 9.266c0 3.628-6.57 9.234-6.57 9.234s-6.57-5.606-6.57-9.234a6.57 6.57 0 1 1 13.14 0"
        ></path>
        <path class="opac"
          d="M9.454 15.486a4.262 4.262 0 1 0-6.027 6.027l12.556 12.556a4.262 4.262 0 0 0 6.027-6.027z"
        ></path>
        <path class="opac"
          d="M28.536 15.486a4.262 4.262 0 0 1 6.026 6.027L22.007 34.069a4.262 4.262 0 1 1-6.027-6.027z"
        ></path>
        <path
          d="m19 25.028 3.012 3.013a4.261 4.261 0 1 1-6.026 0z"
        ></path>
      </svg>

    `;
  }
}

customElements.define("guides-logo", guidesLogo);
