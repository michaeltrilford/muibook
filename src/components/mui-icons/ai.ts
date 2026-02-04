class MuiIconAi extends HTMLElement {
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
      d="M27.122 16.88a.643.643 0 0 1-.638-.566c-.651-4.316-1.154-5.034-5.44-5.6a.664.664 0 0 1-.6-.667c0-.327.245-.604.6-.642 4.163-.553 4.728-1.245 5.44-5.6.049-.34.307-.59.638-.59.32 0 .577.238.626.59.614 4.317 1.203 5.022 5.451 5.6.344.038.59.315.59.642 0 .34-.246.617-.59.667-4.137.692-4.714 1.22-5.45 5.6-.062.327-.308.566-.627.566m-24.324-.403c-1.117 0-1.903-.805-1.903-1.963v-1.573c0-2.995 1.67-4.693 4.592-4.693H19.08c-.43.44-.736 1.07-.736 1.8 0 .88.417 1.648 1.019 2.1H6.003c-.86 0-1.302.403-1.302 1.347v1.02c0 1.157-.786 1.962-1.903 1.962m29.826 2.857a.457.457 0 0 1-.455-.415c-.331-2.14-.282-2.152-2.529-2.567a.48.48 0 0 1-.393-.466c0-.24.16-.44.393-.478 2.235-.327 2.21-.365 2.53-2.542.024-.252.208-.44.454-.44.245 0 .417.176.454.44.307 2.101.282 2.127 2.517 2.542.245.05.405.239.405.478 0 .252-.16.415-.442.466-2.185.352-2.16.402-2.48 2.541-.037.252-.209.44-.454.44M8.408 26.032c-1.044 0-1.646-.604-1.646-1.623 0-.265.074-.642.234-1.158l2.185-6.62c.479-1.522 1.338-2.214 2.701-2.214 1.412 0 2.308.705 2.775 2.215l2.198 6.619c.16.516.22.893.22 1.157 0 1.02-.601 1.624-1.632 1.624-.884 0-1.437-.503-1.658-1.56l-.307-1.032h-3.106l-.307 1.031c-.233 1.058-.773 1.56-1.657 1.56m2.541-5.071h1.94l-.909-3.524h-.122zm-8.151 1.783c-1.252 0-2.284-1.057-2.284-2.34 0-1.284 1.032-2.341 2.284-2.341s2.283 1.057 2.283 2.34c0 1.284-1.03 2.341-2.283 2.341m2.689 10.042c-2.922 0-4.592-1.7-4.592-4.694V26.33c0-1.157.786-1.963 1.903-1.963S4.7 25.173 4.7 26.33v1.22c0 .945.442 1.347 1.301 1.347h17.903c.86 0 1.302-.402 1.302-1.346v-7.588c0-.512.153-.955.421-1.29 0 0 .23.522 1.482.522 1.251 0 1.481-.522 1.481-.522.268.335.422.778.422 1.29v8.129c0 2.995-1.658 4.694-4.592 4.694z"
    ></path>
    <path
      d="M19.194 16.084c0-.92.728-1.667 1.626-1.667.899 0 1.627.747 1.627 1.667l.011 8.28c0 .921-.728 1.668-1.626 1.668-.899 0-1.627-.747-1.627-1.667z"
    ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-ai")) {
  customElements.define("mui-icon-ai", MuiIconAi);
}
