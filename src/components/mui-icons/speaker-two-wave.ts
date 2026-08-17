class MuiIconSpeakerTwoWave extends HTMLElement {
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
          d="M19.85 28.929q-.63 0-1.16-.253-.517-.241-1.114-.793l-4.413-4.103a.3.3 0 0 0-.173-.046H9.9q-1.679 0-2.575-.942t-.896-2.678v-4.228q0-1.736.896-2.666.897-.943 2.574-.943h3.103q.069 0 .172-.08l4.402-4.068q.62-.575 1.149-.816.528-.242 1.114-.242.989 0 1.655.678.667.668.667 1.644v17.226q0 .976-.667 1.643-.666.666-1.643.667m4.873-4.919a1.74 1.74 0 0 1-.862-1.253q-.137-.815.472-1.884.368-.632.563-1.368.195-.734.195-1.517 0-.78-.195-1.516a5.3 5.3 0 0 0-.563-1.368q-.621-1.068-.483-1.884.15-.828.873-1.253.679-.414 1.402-.276.736.138 1.138.69.827 1.183 1.287 2.62.471 1.425.471 2.987a9.5 9.5 0 0 1-.471 2.988 9.6 9.6 0 0 1-1.287 2.598q-.402.574-1.138.712-.723.126-1.402-.276m6.09 3.402q-.803-.45-.907-1.299-.103-.862.414-1.735.816-1.38 1.264-3.01.448-1.633.448-3.38 0-1.758-.448-3.378a12.5 12.5 0 0 0-1.264-3.022q-.517-.863-.414-1.724.104-.863.908-1.299.7-.39 1.448-.23.746.161 1.184.84a16 16 0 0 1 1.85 4.148q.643 2.241.643 4.665t-.643 4.666a15.8 15.8 0 0 1-1.85 4.137q-.438.678-1.184.839-.747.172-1.448-.218"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-speaker-two-wave")) {
  customElements.define("mui-icon-speaker-two-wave", MuiIconSpeakerTwoWave);
}
