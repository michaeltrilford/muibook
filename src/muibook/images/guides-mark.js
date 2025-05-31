class guidesMark extends HTMLElement {
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
        d="M10.5 0C16.299 0 21 4.701 21 10.5S16.299 21 10.5 21 0 16.299 0 10.5 4.701 0 10.5 0m6.04 8.897a1.653 1.653 0 0 0-2.338 0l-3.7 3.7-3.7-3.7a1.653 1.653 0 0 0-2.336 2.337l4.85 4.85.017.02c.323.322.746.482 1.169.482s.847-.16 1.17-.482l.016-.02 4.851-4.85a1.653 1.653 0 0 0 0-2.337m-6.169-4.96a2.547 2.547 0 0 0-2.547 2.548c0 1.398 2.514 3.552 2.547 3.58.027-.022 2.548-2.18 2.548-3.58a2.55 2.55 0 0 0-2.548-2.548"
        ></path>
      </svg>



    `;
  }
}

customElements.define("guides-mark", guidesMark);
