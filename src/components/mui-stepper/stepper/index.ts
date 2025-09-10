class MuiStepper extends HTMLElement {
  static get observedAttributes() {
    return ["direction", "active-step"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setAttribute("direction", this.getAttribute("direction") || "horizontal");
    this.setAttribute("active-step", this.getAttribute("active-step") || "0");
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _old: string | null, _new: string | null) {
    if (name === "direction" || name === "active-step") {
      this.render();
    }
  }

  get steps() {
    const slot = this.shadowRoot?.querySelector("slot");
    return slot?.assignedElements() || [];
  }

  render() {
    if (!this.shadowRoot) return;

    const direction = this.getAttribute("direction") || "horizontal";
    const activeStep = parseInt(this.getAttribute("active-step") || "0", 10);

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          flex-direction: ${direction === "horizontal" ? "row" : "column"};
          ${direction === "horizontal" ? "justify-content: space-between;" : ""}
        }

        .step {
          display: flex;
          flex-direction: ${direction === "horizontal" ? "column" : "row"};
          align-items: center;
          position: relative;
        }

        .dot {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          border: 2px solid var(--color-border, #ccc);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg, #fff);
          flex-shrink: 0;
        }

        .dot.completed {
          background: var(--color-success, #4caf50);
          border-color: var(--color-success, #4caf50);
        }
        .dot.active {
          border-color: var(--color-primary, #1976d2);
        }

        .title {
          margin-top: ${direction === "horizontal" ? "var(--space-200)" : "0"};
          margin-left: ${direction === "vertical" ? "var(--space-200)" : "0"};
          text-align: ${direction === "horizontal" ? "center" : "left"};
        }
        .title mui-body[active] {
          font-weight: bold;
        }

        .connector {
          position: absolute;
          background: red;
        }
        .connector.horizontal {
          top: 0.625rem;
          left: 100%;
          width: var(--space-400);
          height: 2px;
        }
        .connector.vertical {
          left: 0.625rem;
          top: 100%;
          height: var(--space-400);
          width: 2px;
        }

      </style>

      <slot></slot>
    `;

    // Post-process slotted steps
    const steps = this.steps;
    steps.forEach((step, i) => {
      const state = i < activeStep ? "completed" : i === activeStep ? "active" : "upcoming";
      step.setAttribute("state", state);
      step.setAttribute("direction", direction);
      step.setAttribute("position", i === 0 ? "first" : i === steps.length - 1 ? "last" : "middle");
    });
  }
}

if (!customElements.get("mui-stepper")) {
  customElements.define("mui-stepper", MuiStepper);
}
