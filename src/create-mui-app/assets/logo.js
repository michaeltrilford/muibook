class createMuiAppLogo extends HTMLElement {
  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color" && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const rawColor = this.getAttribute("color"); // Raw color

    // Resolve color based on the provided variant or color attribute
    let iconColor = rawColor;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 200px;
          height: auto;
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
        viewBox="0 0 98 93"
      >
        <path
          d="M1.615 66.906V1.319h16.8v11.914h.357C21.572 5.31 28.72.366 37.477.366c9.412 0 16.084 4.825 18.288 13.403h.357C59.101 5.55 66.964.366 76.495.366 89.362.366 98 9.123 98 22.347v44.559H80.606v-40.21c0-7.684-3.873-11.914-10.961-11.914-6.851 0-11.438 5.004-11.438 12.45v39.674H41.408V26.041c0-7.03-4.05-11.259-10.782-11.259-6.85 0-11.616 5.242-11.616 12.689v39.435zM10.324 74.101c5.123 0 9.353 3.932 9.353 9.115s-4.23 9.054-9.353 9.054c-5.182 0-9.412-3.872-9.412-9.054s4.23-9.115 9.412-9.115"
        ></path>
      </svg>





    `;
  }
}

customElements.define("create-mui-app-logo", createMuiAppLogo);
