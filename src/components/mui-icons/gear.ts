class MuiIconGear extends HTMLElement {
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
          d="M16.648 33c-1.332 0-2.426-.858-2.716-2.124l-.449-1.9-.118-.04-1.662 1.017c-1.12.686-2.466.488-3.415-.449l-1.86-1.86c-.975-.963-1.107-2.335-.435-3.43l1.029-1.636-.04-.106-1.885-.448C3.844 21.72 3 20.612 3 19.293V16.72c0-1.319.83-2.4 2.097-2.717l1.872-.462.04-.106-1.016-1.649c-.685-1.095-.553-2.454.422-3.417l1.873-1.86c.936-.936 2.294-1.134 3.415-.462l1.662 1.016.118-.04.449-1.899C14.222 3.871 15.316 3 16.648 3h2.704c1.331 0 2.426.858 2.716 2.124l.448 1.9.12.04 1.66-1.017c1.122-.686 2.48-.474 3.416.462l1.873 1.86c.975.963 1.107 2.322.422 3.417l-1.016 1.65.04.105 1.872.462C32.17 14.319 33 15.4 33 16.72v2.573c0 1.32-.844 2.427-2.097 2.73l-1.885.45-.04.105 1.029 1.636c.672 1.095.54 2.467-.436 3.43l-1.859 1.86c-.95.937-2.294 1.134-3.415.448l-1.662-1.015-.119.04-.448 1.899C21.778 32.142 20.683 33 19.352 33zm.7-3.47h1.305c.224 0 .303-.105.343-.277l.751-3.18c1.055-.21 1.873-.566 2.783-1.147l2.742 1.689c.159.092.304.105.449-.053l.923-.91c.145-.145.132-.29.04-.436l-1.715-2.77c.54-.844.936-1.808 1.108-2.718l3.191-.752c.172-.04.277-.132.277-.343V17.38c0-.211-.105-.303-.277-.343l-3.191-.752a8.2 8.2 0 0 0-1.095-2.718l1.701-2.77c.093-.145.12-.304-.026-.449l-.936-.91c-.145-.145-.277-.132-.448-.04l-2.756 1.69a7.5 7.5 0 0 0-2.77-1.149l-.751-3.192c-.04-.172-.12-.277-.343-.277h-1.306c-.21 0-.303.105-.343.277l-.751 3.18c-.99.21-2.084.659-2.783 1.147l-2.769-1.702c-.171-.092-.303-.092-.448.053l-.923.897c-.159.158-.132.303-.04.448l1.728 2.797a8.3 8.3 0 0 0-1.108 2.731l-3.165.739c-.185.04-.29.132-.29.343v1.253c0 .211.105.304.29.343l3.178.739c.158.937.554 1.847 1.108 2.73l-1.74 2.798c-.08.145-.106.29.039.435l.923.91c.145.145.29.145.448.04l2.782-1.702c.884.58 1.833.976 2.783 1.148l.738 3.18c.04.17.132.276.343.276m.645-6.61A4.923 4.923 0 0 1 13.062 18a4.923 4.923 0 0 1 4.931-4.92 4.92 4.92 0 0 1 4.92 4.92 4.92 4.92 0 0 1-4.92 4.92m0-2.968c1.082 0 1.952-.87 1.952-1.952s-.87-1.953-1.952-1.953c-1.08 0-1.951.871-1.951 1.953s.87 1.953 1.951 1.953"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-gear")) {
  customElements.define("mui-icon-gear", MuiIconGear);
}
