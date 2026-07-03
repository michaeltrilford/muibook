class npmMark extends HTMLElement {
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
    const size = this.getAttribute("size") || "small";
    const rawColor = this.getAttribute("color"); // Raw color

    // Color map for predefined color options
    const colorMap = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the color attribute
    let iconColor = colorMap[rawColor] || rawColor || "var(--icon-color-default)";
    const sizeMap = {
      "xx-small": "1.3rem",
      "x-small": "1.6rem",
      small: "2.1rem",
      medium: "2.4rem",
      large: "2.8rem",
    };
    const sizeStyleMap = sizeMap[size] || sizeMap.small;

    this.classList.add("mui-icon");

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
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21 21"
      >
        <path
          d="M10.5 0C16.299 0 21 4.701 21 10.5S16.299 21 10.5 21 0 16.299 0 10.5 4.701 0 10.5 0M5.25 15.75h5.204V7.898h2.648v7.852h2.648V5.25H5.25z"
        ></path>
      </svg>



    `;
  }
}

customElements.define("npm-mark", npmMark);
