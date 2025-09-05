class AnaLogo extends HTMLElement {
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
          width: 100%;
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
        viewBox="0 0 129 46"
      >
    <path
      d="M58.25 11.103a.96.96 0 0 1 .916-.749c.391 0 .758.294.89.64l9.395 34.227h15.394L92.688.742H85.91l-6.033 34.249c-.08.431-.438.769-.896.769-.416 0-.771-.3-.88-.685L68.685.742H53.297l-7.84 44.479h6.769zM31.968 30.141l-1.316-19.929c-.011-.442-.307-.862-.75-.98a1.03 1.03 0 0 0-1.182.569L8.65 45.22H.98L26.193.74H41.01l2.965 44.48H32.977l-.322-4.848c-.053-1.036-.83-1.859-1.86-1.859H14.157l3.752-6.635h12.475c.912 0 1.652-.8 1.583-1.739m83.637.094-1.752-19.744a.993.993 0 0 0-1-.91c-.356 0-.674.185-.858.465L93.927 45.22h-7.496L109.258.74h14.818l3.944 44.479h-11.084l-.433-4.85c-.082-1.043-.838-1.852-1.861-1.852H99.044l3.406-6.638h11.559c.945 0 1.689-.811 1.596-1.645"
    ></path>
      </svg>





    `;
  }
}

customElements.define("ana-logo", AnaLogo);
