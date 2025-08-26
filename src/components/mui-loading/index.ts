class MuiLoading extends HTMLElement {
  static get observedAttributes() {
    return ["loading", "animation", "direction", "duration"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const loading = this.hasAttribute("loading");
    const animation = this.getAttribute("animation") || "fade-in";
    const direction = this.getAttribute("direction") || "up";
    const duration = this.getAttribute("duration") || "1s";

    // pick class based on animation type
    let animationClass = "";
    if (animation === "translate") {
      animationClass = `translate-${direction}`;
    } else {
      animationClass = animation;
    }

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulsate {
          0% { opacity: 0.1; }
          50% { opacity: 1; }
          100% { opacity: 0.1; }
        }

        @keyframes translate-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes translate-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes translate-left {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes translate-right {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .fade-in {
          animation: fadeIn var(--fade-duration, ${duration}) ease-in-out;
        }

        .pulsate {
          animation: pulsate var(--pulsate-duration, ${duration}) ease-in-out infinite;
        }

        .translate-up {
          animation: translate-up var(--translate-duration, ${duration}) ease-out forwards;
        }

        .translate-down {
          animation: translate-down var(--translate-duration, ${duration}) ease-out forwards;
        }

        .translate-left {
          animation: translate-left var(--translate-duration, ${duration}) ease-out forwards;
        }

        .translate-right {
          animation: translate-right var(--translate-duration, ${duration}) ease-out forwards;
        }

        .loadingFullHeight {
          height: 100vh;
        }
      </style>

      <div class="${loading ? animationClass : ""}">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get("mui-loading")) {
  customElements.define("mui-loading", MuiLoading);
}
