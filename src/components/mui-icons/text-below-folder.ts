class MuiIconTextBelowFolder extends HTMLElement {
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

    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

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
        width="36"
        height="36"
        fill="none"
        viewBox="0 0 36 36"
      >
        <path d="M8.795 20.913c-2.728 0-4.293-1.552-4.293-4.28V4.318C4.502 1.577 6.13 0 8.682 0h3.18c1.413 0 2.027.238 2.99.964l.514.388c.8.6 1.376.813 2.34.813h9.5c2.727 0 4.292 1.552 4.292 4.28v10.188c0 2.728-1.552 4.28-4.18 4.28zm.488-3.141H26.73c1 0 1.627-.538 1.627-1.64V6.96c0-1.114-.626-1.652-1.627-1.652h-10c-1.327 0-1.878-.2-2.754-.877l-.525-.388c-.889-.675-1.54-.9-2.566-.9H9.371c-1.077 0-1.727.7-1.727 1.664V16.12c0 1.114.625 1.652 1.639 1.652m-.075-8.398V8.16c0-.688.313-.964.964-.964h15.656c.651 0 .964.276.964.964v1.214zM6.104 27.171a1.597 1.597 0 0 1-1.602-1.602c0-.889.714-1.602 1.602-1.602h23.792c.889 0 1.602.713 1.602 1.602s-.713 1.602-1.602 1.602zm0 6.258a1.597 1.597 0 0 1-1.602-1.602c0-.889.714-1.602 1.602-1.602h23.792c.889 0 1.602.713 1.602 1.602 0 .888-.713 1.602-1.602 1.602z"></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-text-below-folder")) {
  customElements.define("mui-icon-text-below-folder", MuiIconTextBelowFolder);
}
