class MuiIconRectangleDashed extends HTMLElement {
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
          d="M6.86 22.916v2.117c0 .71.575 1.286 1.285 1.286h3.999v3.857H8.145a5.143 5.143 0 0 1-5.143-5.143v-2.117zm14.425 3.403v3.857h-6.57v-3.857zm11.713-1.286a5.143 5.143 0 0 1-5.143 5.143h-3.999v-3.857h4c.709 0 1.284-.576 1.285-1.286v-2.117h3.857zm0-4.688h-3.857v-4.69h3.857zm-26.139-4.69v4.69H3.002v-4.69zm20.996-9.831a5.143 5.143 0 0 1 5.143 5.143v2.117h-3.857v-2.117c0-.71-.576-1.286-1.286-1.286h-3.999V5.824zM12.144 9.681H8.145c-.71 0-1.286.576-1.286 1.286v2.117H3.002v-2.117a5.143 5.143 0 0 1 5.143-5.143h3.999zm9.14 0h-6.569V5.824h6.57z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-rectangle-dashed")) {
  customElements.define("mui-icon-rectangle-dashed", MuiIconRectangleDashed);
}
