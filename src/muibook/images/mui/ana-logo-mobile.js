class AnaLogoMobile extends HTMLElement {
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
        viewBox="0 0 98 35"
      >
    <path
      d="M44.228 8.653a.73.73 0 0 1 .7-.572c.298 0 .578.224.678.489l7.175 26.133h11.753L70.522.742h-5.175l-4.606 26.15a.7.7 0 0 1-.684.588.71.71 0 0 1-.672-.523L52.195.742H40.446L34.46 34.703h5.168zM24.16 23.19 23.155 7.973a.795.795 0 0 0-.572-.749.785.785 0 0 0-.902.434L6.355 34.704H.5L19.75.74h11.315l2.264 33.963h-8.398l-.246-3.702c-.041-.79-.633-1.419-1.421-1.419H10.562l2.865-5.066h9.525c.696 0 1.26-.611 1.208-1.327m63.86.072L86.684 8.186a.76.76 0 0 0-.764-.695.79.79 0 0 0-.655.355L71.47 34.702h-5.724L83.175.742h11.314l3.011 33.96h-8.463L88.707 31c-.063-.796-.64-1.414-1.421-1.414h-11.91l2.6-5.068h8.826c.721 0 1.29-.62 1.219-1.256"
    ></path>
      </svg>





    `;
  }
}

customElements.define("ana-logo-mobile", AnaLogoMobile);
