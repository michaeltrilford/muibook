/* myApp */
class appNavbarGroup extends HTMLElement {
  static get observedAttributes() {
    return ["groupname"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        this.keyboardUsed = true;
      }
    });

    window.addEventListener("mousedown", () => {
      this.keyboardUsed = false;
    });
  }

  connectedCallback() {
    let html = /*html*/ `
    <style>
      :host { display: block; background: var(--app-navbar-surface); }
      :host(:last-of-type) { padding-bottom: 6rem; }

      :host(.focused) {
        position: relative;
        z-index: 3;
      }

      mui-accordion-block {
        --surface-elevated-200: var(--app-navbar-accordion-chevron-hover);
      }
    </style>

    <mui-accordion-block size="small" heading="${this.getAttribute("groupname")}" detail-space="none">
      <div slot="detail" style="padding-top: var(--space-400); padding-bottom: var(--space-400);"><slot></slot></div>
    </mui-accordion-block>
    
    `;

    this.shadowRoot.innerHTML = html;

    this.addEventListener("focusin", () => {
      if (this.keyboardUsed) {
        this.classList.add("focused");
      }
    });

    this.addEventListener("focusout", () => {
      this.classList.remove("focused");
    });
  }
}

customElements.define("app-navbar-group", appNavbarGroup);
