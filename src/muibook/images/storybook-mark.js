class storybookMark extends HTMLElement {
  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color" && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const rawColor = this.getAttribute("color"); // Raw color

    // Color map for predefined color options
    const colorMap = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the color attribute
    let iconColor = colorMap[rawColor] || rawColor || "var(--icon-color-default)";

    this.classList.add("mui-icon");

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
          d="M17.407.5c.596 0 .994.4 1.093.9v18.1c0 .6-.497 1-.994 1L4.09 19.9a1 1 0 0 1-.994-1L2.5 2.4c0-.5.397-1 .894-1zM10.847 4C8.264 4 6.773 5.5 6.773 7.6c0 2.2 1.69 3.1 3.08 3.9.994.6 1.89 1.1 1.89 2q-.001.9-.896.9c-.794 0-1.092-.4-1.092-1.8-.003-.3-2.98-.4-3.08 0-.2 3.3 1.887 4.3 4.272 4.3 2.286 0 4.074-1.3 4.075-3.5 0-2.3-1.79-3.2-3.18-4-.995-.5-1.888-1-1.888-1.8s.496-.9.893-.9c.398 0 1.094.1.994 1.6 0 .4 2.583.2 2.982-.1 0-2.7-1.491-4.1-3.976-4.2M14.426.7l-.1 2.3v.1c.1.1.1.1.199 0l.895-.7.695.6h.1c.099 0 .098-.1.098-.2V.6z"
        ></path>
      </svg>



    `;
  }
}

customElements.define("storybook-mark", storybookMark);
