class muiLogo extends HTMLElement {
  static get observedAttributes() {
    return ['color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const rawColor = this.getAttribute('color'); // Raw color

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
        viewBox="0 0 202 117"
      >
        <path
          d="M183.801 25.364h17.394v65.587h-17.397zm-18.467 66.54c-9.412 0-16.084-4.825-18.288-13.403h-.358c-2.978 8.22-10.842 13.403-20.373 13.403-12.867 0-21.505-8.757-21.505-21.981V25.364h17.395v40.21c0 7.685 3.872 11.914 10.961 11.914 6.85 0 11.437-5.004 11.437-12.45V25.364h16.799V66.23c0 7.029 4.051 11.258 10.782 11.258 3.535 0 6.515-1.396 8.572-3.77q.138 18.186-15.422 18.186M192.486 18.169c-5.123 0-9.352-3.932-9.352-9.114S187.363 0 192.486 0c5.183 0 9.412 3.872 9.412 9.055s-4.229 9.114-9.412 9.114M.703 90.906V25.319h16.799v11.914h.357c2.8-7.923 9.949-12.867 18.706-12.867 9.412 0 16.083 4.825 18.288 13.403h.357c2.978-8.22 10.842-13.403 20.373-13.403 12.867 0 21.505 8.757 21.505 21.981v44.559H79.693v-40.21c0-7.684-3.872-11.914-10.96-11.914-6.851 0-11.438 5.004-11.438 12.45v39.674H40.496V50.041c0-7.03-4.05-11.259-10.782-11.259-6.85 0-11.616 5.242-11.616 12.689v39.435zM9.412 98.101c5.123 0 9.353 3.932 9.353 9.115s-4.23 9.054-9.353 9.054C4.23 116.27 0 112.398 0 107.216s4.23-9.115 9.412-9.115"
        ></path>
      </svg>





    `;
  }
}

customElements.define('mui-logo', muiLogo);
