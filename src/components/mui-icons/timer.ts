class MuiIconTimer extends HTMLElement {
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
          d="M17.993 32.585q-3.01 0-5.663-1.146a14.7 14.7 0 0 1-4.64-3.136 14.9 14.9 0 0 1-3.15-4.64Q3.41 21.01 3.409 18q0-2.528.815-4.793a14.6 14.6 0 0 1 2.251-4.115q.594-.83 1.423-.912.842-.097 1.436.47.608.58.539 1.27-.056.69-.566 1.437-1.05 1.38-1.658 3.066A10.4 10.4 0 0 0 7.041 18q0 2.28.842 4.268a11.2 11.2 0 0 0 2.362 3.48 11.1 11.1 0 0 0 3.494 2.348 10.6 10.6 0 0 0 4.254.856q2.28 0 4.254-.856a10.9 10.9 0 0 0 3.494-2.348 11.3 11.3 0 0 0 2.362-3.494q.855-1.989.856-4.254 0-2.28-.814-4.185a10.7 10.7 0 0 0-2.183-3.328 11.2 11.2 0 0 0-3.107-2.307q-1.74-.87-3.605-1.05v1.893q0 .649-.414 1.09-.415.429-1.064.429-.65 0-1.063-.428a1.54 1.54 0 0 1-.415-1.091V5.03q0-.759.456-1.188.47-.428 1.257-.428 3.024 0 5.663 1.133a14.4 14.4 0 0 1 4.64 3.135 14.55 14.55 0 0 1 3.15 4.654Q32.59 14.975 32.591 18q0 3.01-1.147 5.663a14.7 14.7 0 0 1-7.79 7.776q-2.638 1.146-5.662 1.146m0-12.085q-.676 0-1.243-.332a2.86 2.86 0 0 1-.94-.939l-3.866-6.077q-.304-.51-.166-.925a.83.83 0 0 1 .552-.566q.428-.153.926.18l6.09 4.046a2.5 2.5 0 0 1 .857.925q.304.552.304 1.188 0 1.036-.732 1.768a2.42 2.42 0 0 1-1.782.732"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-timer")) {
  customElements.define("mui-icon-timer", MuiIconTimer);
}
