class MuiIconReload extends HTMLElement {
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
      secondary: "var(--text-color-secondary)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"xx-small" | "x-small" | "small" | "medium" | "large", string> = {
      "xx-small": "1.2rem",
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
          d="M13.948 5.052q.474-.09.946.14l5.59 2.704a.99.99 0 0 1 .596.725q.112.513-.234.923l-3.94 4.79a1.48 1.48 0 0 1-.8.523q-.47.104-.867-.113-.396-.219-.527-.814l-.184-.836-.158-.713q-.969.526-1.754 1.303l-.001-.001a7.6 7.6 0 0 0-1.63 2.427 7.4 7.4 0 0 0-.587 2.952q0 1.571.587 2.95l.155.34a7.7 7.7 0 0 0 1.476 2.087l.268.254a7.8 7.8 0 0 0 2.16 1.378q1.38.588 2.951.588a7.4 7.4 0 0 0 2.95-.587 7.6 7.6 0 0 0 2.428-1.631l.253-.268a7.8 7.8 0 0 0 1.379-2.16q.598-1.38.599-2.951a7.4 7.4 0 0 0-.238-1.909 7 7 0 0 0-.7-1.721 9 9 0 0 0-1.141-1.566l-.005-.005c-.41-.48-.669-1.006-.763-1.577-.1-.618.103-1.178.57-1.661l.002-.001c.42-.428.94-.641 1.543-.633.625.008 1.195.299 1.706.825l.273.286a11.2 11.2 0 0 1 1.582 2.214 12 12 0 0 1 1.113 2.825q.37 1.46.37 2.923.001 2.153-.709 4.08l-.218.546a12.1 12.1 0 0 1-2.563 3.782 11.9 11.9 0 0 1-3.794 2.575q-2.165.929-4.637.928-2.463.001-4.627-.928a12 12 0 0 1-3.377-2.173l-.417-.4a12 12 0 0 1-2.32-3.255l-.243-.529q-.928-2.164-.928-4.626t.928-4.627a12 12 0 0 1 2.563-3.795 11.9 11.9 0 0 1 3.806-2.562l.038-.017-.341-1.554q-.134-.61.132-.988.266-.377.74-.467"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-reload")) {
  customElements.define("mui-icon-reload", MuiIconReload);
}
