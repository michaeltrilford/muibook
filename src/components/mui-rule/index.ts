class MuiRule extends HTMLElement {
  static get observedAttributes() {
    return ["length", "weight", "direction"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    if (!this.hasAttribute("direction")) {
      this.setAttribute("direction", "horizontal");
    }

    this.setAttribute("role", "presentation");

    this.syncContextAttributes();
    this.updateStyles();
  }

  attributeChangedCallback() {
    this.updateStyles();
  }

  private syncContextAttributes() {
    const inCard = Boolean(this.closest("mui-card"));
    const inFormSection = Boolean(this.closest("mui-form-section"));
    this.toggleAttribute("in-card", inCard);
    this.toggleAttribute("in-form-section", inFormSection);
  }

  updateStyles() {
    const length = this.getAttribute("length") || "100%";
    const weight = this.getAttribute("weight") || "1px";

    const styles = /*css*/ `
      :host {
        display: block;
        background: var(--border-color);
      }
      :host([in-card]),
      :host([in-form-section]) {
        background: color-mix(in srgb, var(--border-color) 50%, transparent);
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
