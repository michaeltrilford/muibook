class MuiIconSpeakerMute extends HTMLElement {
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
          d="M19.85 28.929q-.63 0-1.16-.253-.517-.241-1.114-.793l-4.413-4.103a.3.3 0 0 0-.173-.046H9.9q-1.679 0-2.575-.942t-.896-2.678v-4.228q0-1.736.896-2.666.897-.943 2.574-.943h3.103q.069 0 .172-.08l4.402-4.068q.62-.575 1.149-.816.528-.242 1.114-.242.989 0 1.655.678.667.668.667 1.644v17.226q0 .976-.667 1.643-.666.666-1.643.667m7.848-7.203a1.48 1.48 0 0 1-1.105.455q-.625-.008-1.105-.487-.48-.48-.495-1.113 0-.635.463-1.097l5.233-5.233q.471-.472 1.097-.464.633.016 1.113.496t.487 1.105q.017.634-.455 1.105zm-2.242-5.233q-.471-.471-.463-1.097.016-.633.495-1.113.48-.48 1.105-.487.634-.017 1.105.455l5.233 5.233q.464.462.447 1.097 0 .633-.48 1.113-.479.48-1.12.487a1.46 1.46 0 0 1-1.09-.455z"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-speaker-mute")) {
  customElements.define("mui-icon-speaker-mute", MuiIconSpeakerMute);
}
