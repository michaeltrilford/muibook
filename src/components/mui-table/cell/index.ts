class MuiCell extends HTMLElement {
  static get observedAttributes() {
    return ["aligny", "alignx"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "cell");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const alignX = this.getAttribute("alignx") || this.getAttribute("align-x");
    const justify =
      alignX === "end" || alignX === "right"
        ? "flex-end"
        : alignX === "start" || alignX === "left"
          ? "flex-start"
          : alignX || "space-between";
    const textAlign =
      alignX === "end" || alignX === "right"
        ? "right"
        : alignX === "center"
          ? "center"
          : "left";

    this.shadowRoot!.innerHTML = /*html*/ `
    <style>
    :host {
      display: flex;
      justify-content: ${justify};
      align-self: ${this.getAttribute("aligny") || this.getAttribute("align-y") || "initial"};
      text-align: ${textAlign};
      font-size: var(--row-cell-font-size, var(--text-font-size-m));
      line-height: var(--row-cell-line-height, var(--text-line-height-m));
      min-width: 0;
    }
    .inner {
      display: inherit;
      width: 100%;
      min-width: 0;
      align-items: inherit;
      justify-content: inherit;
    }
    :host([checkbox]) {
      width: auto;
      text-align: center;
    }
    :host([action]) {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
    }
    :host([action]) .inner {
      width: var(--row-action-size);
      height: var(--row-action-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin-left: auto;
    }
    </style>
     <div class="inner"><slot></slot></div>
  `;
  }
}

if (!customElements.get("mui-cell")) {
  customElements.define("mui-cell", MuiCell);
}
