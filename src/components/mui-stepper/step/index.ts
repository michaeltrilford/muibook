class MuiStep extends HTMLElement {
  static get observedAttributes() {
    return ["state", "title", "direction"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const state = this.getAttribute("state") || "upcoming";
    const direction = this.getAttribute("direction") || "horizontal";
    const title = this.getAttribute("title") || "";

    // Content HTML
    const contentHTML = `
    <div class="content">
      <mui-body
        size="small"
        ${state === "active" ? "weight='bold'" : ""}
        class="${state === "active" ? "active" : ""}"
      >
        ${title}
      </mui-body>
      <slot name="secondary"></slot>
    </div>
  `;

    // Dot wrapper HTML
    const dotHTML = `
  <div class="dotwrapper">
    <div class="dot ${state}"></div>
    ${
      direction === "horizontal"
        ? `<div class="line before ${direction}"></div><div class="line after ${direction}"></div>`
        : ""
    }
  </div>
`;

    // Conditional ordering
    const innerHTML =
      direction === "horizontal"
        ? contentHTML + dotHTML // content above
        : dotHTML + contentHTML; // vertical: dot left, content right

    const size = " 1.8rem";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          flex-direction: ${direction === "horizontal" ? "column" : "row"};
          align-items: ${direction === "horizontal" ? "center" : "flex-start"};
          flex: 1;
        }

        .dotwrapper {
          position: relative; /* anchor for lines */
          display: flex;
          align-items: center;
          justify-content: center; /* keeps dot centered */
          width: ${direction === "horizontal" ? "100%" : "auto"};
        }

        /* .dot stays unchanged */
        .dot {
          width: ${size};
          height: ${size};
          border-radius: 50%;
          box-shadow: inset 0 0 0 var(--stroke-size-200) var(--stepper-border-color);
          background: var(--stepper-background-inactive);
          z-index: 1;
        }

        .dot.completed {
          background: var(--stepper-background-active);
          border-color: var(--stepper-border-color);
        }
        .dot.active {
          border-color: var(--stepper-border-color);
          background: var(--stepper-background-active);
        }

        .line {
          position: absolute;
          background: var(--stepper-color);
        }

        .line.before.horizontal {
          top: 50%;
          left: 0%;
          width: 50%;
          height: var(--stroke-size-200);
          transform: translateY(-50%);
        }
        .line.after.horizontal {
          top: 50%;
          right: 0%;
          width: 50%;
          height: var(--stroke-size-200);
          transform: translateY(-50%);
        }

        :host([position="first"]) .line.before {
          display: none;
        }
        :host([position="last"]) .line.after {
          display: none;
        }


        .content {
          display: flex;
          flex-direction: column;
        }

        :host([direction="horizontal"]) .content {
          margin-bottom: var(--space-200);
          align-items: center;
          text-align: center;
        }

        :host([direction="vertical"]) .content {
          margin-left: calc( -1 * ((${size} / 2) + var(--stroke-size-100)));
          padding-left: ${size};
          padding-bottom: ${size};
          align-items: start;
          text-align: left;
          position: relative;
        }

        :host([direction="vertical"]) .content:before {
          content: "";
          width: var(--stroke-size-200);
          height: 100%;
          position: absolute;
          background: var(--stepper-border-color);
          margin-left: calc(-1 * ${size});
          height: calc(100% - ${size});
          bottom: calc(-1 * var(--stroke-size-100));

        }

        :host([direction="vertical"][position="last"]) .content:before {
          display: none;

        }

        :host([direction="vertical"][position="last"]) .content {
          border-color: transparent;
        }


        :host([direction="vertical"]) .dotwrapper {
          margin-top: var(--stroke-size-100);
        }






        .title[active] {
          font-weight: bold;
        }

        mui-body.active::part(color) {
          color: var(--stepper-text-color-active);;
        }

      </style>

      ${innerHTML}

    `;
  }
}

if (!customElements.get("mui-step")) {
  customElements.define("mui-step", MuiStep);
}
