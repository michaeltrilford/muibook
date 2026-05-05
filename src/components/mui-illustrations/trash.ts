class MuiIllustrationTrash extends HTMLElement {
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
    const size = (this.getAttribute("size") || "medium") as "small" | "medium" | "large" | "x-large";
    const rawColor = this.getAttribute("color");

    const colorMap: Record<string, string> = {
      default: "var(--illustration-main-color-default)",
      inverted: "var(--illustration-main-color-inverted)",
    };

    const mainColor = (rawColor && colorMap[rawColor]) || rawColor || colorMap.default;
    const detailColor =
      rawColor === "default" || !rawColor
        ? "color-mix(in srgb, var(--illustration-main-color) 35%, transparent)"
        : rawColor === "inverted"
          ? "color-mix(in srgb, var(--illustration-main-color) 35%, transparent)"
          : "color-mix(in srgb, var(--illustration-main-color) 35%, transparent)";
    const atmosphereColor =
      rawColor === "default" || !rawColor
        ? "color-mix(in srgb, var(--illustration-main-color) 14%, transparent)"
        : rawColor === "inverted"
          ? "color-mix(in srgb, var(--illustration-main-color) 14%, transparent)"
          : "color-mix(in srgb, var(--illustration-main-color) 14%, transparent)";
    const shadowColor =
      rawColor === "inverted"
        ? "var(--illustration-shadow-color-inverted)"
        : "var(--illustration-shadow-color-default)";

    const sizeMap: Record<"small" | "medium" | "large" | "x-large", string> = {
      small: "var(--illustration-size-small)",
      medium: "var(--illustration-size-medium)",
      large: "var(--illustration-size-large)",
      "x-large": "var(--illustration-size-x-large)",
    };

    const resolvedSize = sizeMap[size] ?? sizeMap.medium;

    this.classList.add("mui-illustration");

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          width: ${resolvedSize};
          height: ${resolvedSize};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          --illustration-main-color: ${mainColor};
          --illustration-detail-color: ${detailColor};
          --illustration-atmosphere-color: ${atmosphereColor};
          --illustration-shadow-color: ${shadowColor};
        }

        svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
        <ellipse cx="48" cy="93" fill="var(--illustration-shadow-color)" rx="25" ry="3"></ellipse>
        <path
          fill="var(--illustration-main-color)"
          d="M39.947 69.904q.765 0 1.24-.448.474-.449.448-1.16l-.844-29.057q0-.738-.475-1.16-.474-.422-1.213-.422-.79 0-1.265.448-.45.422-.422 1.16l.79 29.03q.054.739.502 1.187.474.422 1.24.422m8.042 0q.791 0 1.266-.422.5-.448.5-1.186v-29.03q0-.74-.5-1.16-.475-.45-1.266-.449-.764 0-1.265.448-.475.422-.475 1.16v29.03q0 .739.474 1.187.501.422 1.266.422m8.069 0q.764 0 1.212-.422.476-.422.501-1.186l.791-29.03q.027-.74-.448-1.16-.448-.45-1.24-.449-.711 0-1.186.422-.474.422-.5 1.186l-.818 29.03q-.027.739.422 1.187.474.422 1.265.422M35.697 28.742l-.474-5.887q-.228-2.838 1.376-4.608 1.628-1.797 4.65-2.04l9.987-.803q3.022-.242 4.89 1.273 1.893 1.488 2.12 4.327l.474 5.887-4.179.336-.452-5.624q-.089-1.104-.88-1.728-.765-.627-1.947-.532l-9.41.757q-1.181.094-1.863.837-.654.741-.566 1.845l.453 5.624zm-11.764 3.062q-.788.063-1.439-.466a2 2 0 0 1-.692-1.373 1.88 1.88 0 0 1 .468-1.413q.556-.653 1.344-.716l46.967-3.776q.789-.065 1.413.468.626.531.69 1.346a2 2 0 0 1-.464 1.466 1.82 1.82 0 0 1-1.32.688zm11.98 46.116q-2.848 0-4.614-1.688-1.74-1.66-1.872-4.509l-1.872-38.917h40.869l-1.846 38.891q-.131 2.847-1.898 4.535t-4.588 1.688z"
        ></path>
        <path
          fill="var(--illustration-detail-color)"
          d="M84 59a1 1 0 1 0-1 1v1a2 2 0 1 1 0-4 2 2 0 0 1 0 4v-1a1 1 0 0 0 1-1"
        ></path>
        <circle cx="17" cy="50" r="1" fill="var(--illustration-atmosphere-color)"></circle>
        <path
          fill="var(--illustration-detail-color)"
          d="M77 85a1 1 0 1 1-2 0 1 1 0 0 1 2 0M34.5 1.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
        ></path>
        <path
          fill="var(--illustration-detail-color)"
          d="M82 13c.207 0 .375.168.375.375v1.25h1.25a.375.375 0 0 1 0 .75h-1.25v1.25a.375.375 0 0 1-.75 0v-1.25h-1.25a.375.375 0 0 1 0-.75h1.25v-1.25c0-.207.168-.375.375-.375"
        ></path>
        <path
          fill="var(--illustration-detail-color)"
          d="M10.5 75.4c.155 0 .281.126.281.281v.938h.938a.281.281 0 0 1 0 .562h-.938v.938a.281.281 0 0 1-.562 0v-.938H9.28a.281.281 0 1 1 0-.562h.938v-.938c0-.155.126-.28.281-.28"
        ></path>
        <path
          fill="var(--illustration-detail-color)"
          d="M13.508 20.4c.362 0 .656.294.656.656v2.188h2.188a.656.656 0 0 1 0 1.312h-2.188v2.188a.656.656 0 0 1-1.312 0v-2.188h-2.188a.656.656 0 1 1 0-1.312h2.188v-2.188c0-.362.293-.656.656-.656"
        ></path>
        <path
          fill="var(--illustration-atmosphere-color)"
          d="M74.535 64.6c.156 0 .281.127.281.282v.937h.938a.281.281 0 0 1 0 .563h-.938v.937a.281.281 0 0 1-.562 0v-.937h-.938a.281.281 0 0 1 0-.563h.938v-.937c0-.156.126-.281.281-.281"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-illustration-trash")) {
  customElements.define("mui-illustration-trash", MuiIllustrationTrash);
}
