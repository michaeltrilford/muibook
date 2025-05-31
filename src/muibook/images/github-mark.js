class githubMark extends HTMLElement {
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
        <path d="M10.509 0C4.698 0 0 4.812 0 10.766c0 4.76 3.01 8.788 7.186 10.214.522.107.713-.232.713-.517 0-.25-.017-1.105-.017-1.997-2.924.642-3.532-1.283-3.532-1.283-.47-1.248-1.166-1.569-1.166-1.569-.957-.659.07-.659.07-.659 1.06.071 1.618 1.105 1.618 1.105.939 1.64 2.453 1.177 3.062.891.087-.695.365-1.176.66-1.443-2.33-.25-4.784-1.177-4.784-5.312 0-1.177.418-2.14 1.079-2.888-.104-.267-.47-1.372.104-2.852 0 0 .888-.285 2.888 1.105a10 10 0 0 1 2.628-.356c.887 0 1.791.125 2.627.356 2-1.39 2.888-1.105 2.888-1.105.574 1.48.209 2.585.104 2.852.679.749 1.079 1.711 1.079 2.888 0 4.135-2.453 5.044-4.802 5.312.383.338.713.98.713 1.996 0 1.444-.017 2.602-.017 2.959 0 .285.192.624.713.517C17.99 19.553 21 15.525 21 10.766 21.017 4.812 16.302 0 10.509 0"
        ></path>
      </svg>



    `;
  }
}

customElements.define("github-mark", githubMark);
