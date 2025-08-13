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
      small: "2.4rem",
      medium: "3.6rem",
      large: "4.8rem",
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
          d="M17.25 33.5c-1.332 0-2.427-.858-2.717-2.124l-.448-1.9-.119-.04-1.661 1.017c-1.121.686-2.466.488-3.416-.449l-1.859-1.86c-.976-.963-1.108-2.335-.435-3.43l1.029-1.636-.04-.106-1.886-.448c-1.252-.304-2.096-1.412-2.096-2.731V17.22c0-1.319.83-2.4 2.096-2.717l1.873-.462.04-.106-1.016-1.649c-.686-1.095-.554-2.454.422-3.417l1.872-1.86c.937-.936 2.295-1.134 3.416-.462l1.661 1.016.12-.04.447-1.899c.29-1.253 1.385-2.124 2.717-2.124h2.703c1.332 0 2.427.858 2.717 2.124l.448 1.9.119.04 1.661-1.017c1.121-.686 2.48-.474 3.416.462l1.872 1.86c.976.963 1.108 2.322.422 3.417l-1.015 1.65.04.105 1.872.462c1.266.316 2.097 1.398 2.097 2.717v2.573c0 1.32-.844 2.427-2.097 2.73l-1.886.45-.04.105 1.03 1.636c.672 1.095.54 2.467-.436 3.43l-1.86 1.86c-.949.937-2.294 1.134-3.415.448l-1.661-1.015-.119.04-.448 1.899c-.29 1.266-1.385 2.124-2.717 2.124zm.699-3.47h1.305c.224 0 .304-.105.343-.277l.752-3.18c1.055-.21 1.872-.566 2.782-1.147l2.743 1.689c.158.092.303.105.448-.053l.924-.91c.145-.145.131-.29.04-.436l-1.715-2.77c.54-.844.936-1.808 1.107-2.718l3.192-.752c.171-.04.277-.132.277-.343V17.88c0-.211-.106-.303-.277-.343l-3.192-.752a8.2 8.2 0 0 0-1.094-2.718l1.701-2.77c.092-.145.119-.304-.026-.449l-.937-.91c-.145-.145-.276-.132-.448-.04l-2.756 1.69a7.5 7.5 0 0 0-2.77-1.149l-.75-3.192c-.04-.172-.12-.277-.344-.277H17.95c-.211 0-.304.105-.343.277l-.752 3.18c-.989.21-2.083.659-2.782 1.147l-2.77-1.702c-.17-.092-.303-.092-.448.053l-.923.897c-.158.158-.132.303-.04.448l1.728 2.797a8.3 8.3 0 0 0-1.107 2.731l-3.165.739c-.185.04-.29.132-.29.343v1.253c0 .211.105.304.29.343l3.178.739c.158.937.553 1.847 1.107 2.73l-1.74 2.798c-.08.145-.106.29.04.435l.922.91c.145.145.29.145.449.04l2.782-1.702c.884.58 1.833.976 2.782 1.148l.739 3.18c.04.17.132.276.343.276m.646-6.61a4.923 4.923 0 0 1-4.932-4.92 4.923 4.923 0 0 1 4.932-4.92 4.92 4.92 0 0 1 4.919 4.92 4.92 4.92 0 0 1-4.919 4.92m0-2.968c1.081 0 1.952-.87 1.952-1.952s-.87-1.953-1.952-1.953-1.952.871-1.952 1.953.87 1.953 1.952 1.953"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-gear")) {
  customElements.define("mui-icon-gear", MuiIconGear);
}
