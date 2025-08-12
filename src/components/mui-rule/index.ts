class MuiRule extends HTMLElement {
  static get observedAttributes() {
    return ["length", "weight", "direction"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setAttribute("role", "presentation");

    if (!this.hasAttribute("direction")) {
      this.setAttribute("direction", "horizontal");
    }

    this.updateStyles();
  }

  attributeChangedCallback() {
    this.updateStyles();
  }

  updateStyles() {
    const length = this.getAttribute("length") || "100%";
    const weight = this.getAttribute("weight") || "1px";

    const styles = /*css*/ `
      :host {
        display: block;
        background: var(--border-color);
      }
      :host([direction="horizontal"]) {
        width: ${length};
        height: ${weight};
      }
      :host([direction="vertical"]) {
        height: ${length};
        width: ${weight};
      }
    `;

    this.shadowRoot!.innerHTML = `<style>${styles}</style>`;
  }
}

if (!customElements.get("mui-rule")) {
  customElements.define("mui-rule", MuiRule);
}
