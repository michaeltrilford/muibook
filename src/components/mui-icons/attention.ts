class MuiIconAttention extends HTMLElement {
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
    const size = (this.getAttribute("size") || "small") as "x-small" | "small" | "medium" | "large";
    const rawColor = this.getAttribute("color");

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"x-small" | "small" | "medium" | "large", string> = {
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
          d="M13.75 32.5c-1.856 0-3.196-.697-4.279-1.954l-5.104-5.959C3.271 23.317 3 22.51 3 20.815v-5.63c0-1.695.27-2.501 1.367-3.772l5.104-5.945C10.554 4.197 11.894 3.5 13.75 3.5h8.502c1.855 0 3.235.67 4.278 1.968l4.86 5.945C32.553 12.834 33 13.49 33 15.185v5.63c0 1.695-.27 2.501-1.367 3.772l-5.104 5.959c-1.083 1.257-2.423 1.954-4.278 1.954zm4.277-12.723c1.07 0 1.692-.588 1.76-1.709l.244-5.084c.054-1.188-.772-1.981-2.031-1.981-1.245 0-2.071.793-2.004 1.981l.23 5.098c.068 1.093.704 1.695 1.801 1.695m0 5.138c1.205 0 2.112-.71 2.112-1.886 0-1.134-.893-1.858-2.112-1.858-1.218 0-2.139.71-2.139 1.858 0 1.175.92 1.886 2.14 1.886"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-attention")) {
  customElements.define("mui-icon-attention", MuiIconAttention);
}
