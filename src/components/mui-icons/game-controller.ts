class MuiIconGameController extends HTMLElement {
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
          d="M1.003 24.077c0-1.323.245-2.78.712-4.337.7-2.335 1.901-5.47 3.024-7.84.99-2.057 1.635-3.29 4.326-3.903 2.29-.511 5.327-.822 8.93-.822 3.613 0 6.65.31 8.929.822 2.702.612 3.347 1.846 4.337 3.904 1.123 2.368 2.324 5.504 3.024 7.84.468 1.556.712 3.013.712 4.336 0 3.025-2.013 4.749-4.692 4.749-1.958 0-3.403-.812-4.582-1.969l-1.868-1.901c-.267-.267-.434-.39-.812-.39H12.957c-.378 0-.545.123-.812.39l-1.868 1.901c-1.168 1.168-2.624 1.969-4.581 1.969-2.68 0-4.693-1.724-4.693-4.749m3.191-.256c0 1.112.779 1.746 1.78 1.746.656 0 1.367-.311 1.957-.923l2.624-2.568c.567-.579 1.012-.812 1.79-.812h11.298c.79 0 1.235.233 1.802.812l2.624 2.568c.6.6 1.301.923 1.957.923 1.001 0 1.78-.634 1.78-1.746 0-.6-.134-1.323-.456-2.39-.779-2.636-2.046-5.96-3.147-8.352-.523-1.112-.8-1.59-1.757-1.812-2.124-.512-4.97-.79-8.452-.79-3.469 0-6.316.278-8.44.79-.956.222-1.245.7-1.757 1.812-1.112 2.391-2.38 5.705-3.147 8.352-.311 1.067-.456 1.79-.456 2.39m4.504-7.795c0-.756.5-1.234 1.279-1.234h1.49V13.39c0-.79.511-1.324 1.29-1.324.778 0 1.279.534 1.279 1.324v1.4h1.39c.834 0 1.368.479 1.368 1.235s-.534 1.246-1.368 1.246h-1.39v1.4c0 .79-.5 1.313-1.28 1.313-.777 0-1.29-.523-1.29-1.312v-1.401h-1.49c-.778 0-1.278-.49-1.278-1.246m16.347.022c-1.001 0-1.79-.778-1.79-1.779 0-1.012.789-1.801 1.79-1.801s1.79.79 1.79 1.801c0 1.001-.79 1.78-1.79 1.78m-3.403 3.481c-.99 0-1.79-.79-1.79-1.78 0-1.011.8-1.8 1.79-1.8 1.012 0 1.79.789 1.79 1.8 0 .99-.778 1.78-1.79 1.78"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-game-controller")) {
  customElements.define("mui-icon-game-controller", MuiIconGameController);
}
