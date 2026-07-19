class MuiIconSun extends HTMLElement {
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
          height: auto;
          display: block;
          fill: inherit; 
        }
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          d="M17.994 8.794c-.959 0-1.768-.81-1.768-1.768v-2.29c0-.972.81-1.793 1.768-1.793.97 0 1.78.821 1.78 1.792v2.291c0 .959-.81 1.768-1.78 1.768m6.536 2.763c-.685-.684-.698-1.854-.038-2.514l1.631-1.631c.672-.672 1.83-.697 2.49-.037.685.684.697 1.842.037 2.514l-1.618 1.631c-.685.685-1.843.697-2.502.037m-13.072 0c-.66.66-1.818.648-2.49-.037L7.35 9.877c-.66-.66-.648-1.818.037-2.502.66-.66 1.818-.635 2.49.037l1.618 1.63c.66.66.648 1.83-.037 2.515m6.536 13.62c-3.922 0-7.158-3.237-7.158-7.17 0-3.935 3.236-7.172 7.158-7.172 3.934 0 7.17 3.237 7.17 7.171s-3.236 7.171-7.17 7.171m9.237-7.17c0-.96.81-1.769 1.768-1.769h2.29c.972 0 1.78.81 1.78 1.768 0 .959-.808 1.768-1.78 1.768H29c-.959 0-1.768-.81-1.768-1.768m-18.45 0c0 .958-.821 1.767-1.792 1.767H4.698c-.959 0-1.768-.81-1.768-1.768s.81-1.768 1.768-1.768h2.29c.972 0 1.793.81 1.793 1.768m15.711 6.498c.685-.685 1.843-.697 2.515-.038l1.63 1.631c.686.672.698 1.83.038 2.49-.684.685-1.842.697-2.515.037l-1.63-1.618c-.685-.685-.698-1.842-.038-2.502m-12.997 0c.66.66.648 1.817-.037 2.502l-1.63 1.618c-.66.66-1.819.648-2.516-.037-.647-.66-.647-1.83.038-2.502l1.643-1.619c.66-.66 1.818-.647 2.502.038m6.499 2.701c.97 0 1.78.81 1.78 1.78v2.291c0 .959-.81 1.78-1.78 1.78-.959 0-1.768-.821-1.768-1.78v-2.29c0-.972.81-1.78 1.768-1.78"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-sun")) {
  customElements.define("mui-icon-sun", MuiIconSun);
}
