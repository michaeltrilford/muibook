import "../mui-slat/index.js";
import "../mui-stack/index.js";
import "../mui-link/index.js";
import "../mui-body/index.js";

export class MuiFileDiff extends HTMLElement {
  static get observedAttributes() {
    return ["filename", "filepath", "additions", "deletions", "result-slot", "card-slot", "result-slot-last"];
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
    if (!this.shadowRoot) return;

    const filename = this.getAttribute("filename") || "";
    const filepath = this.getAttribute("filepath") || "";
    const additions = this.getAttribute("additions") || "";
    const deletions = this.getAttribute("deletions") || "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
      </style>
      <mui-slat variant="action" col="1fr auto" role="row" file-diff-slot ${this.hasAttribute("result-slot") ? "result-slot" : ""} ${this.hasAttribute("card-slot") ? "card-slot" : ""} ${this.hasAttribute("result-slot-last") ? "result-slot-last" : ""}>
        <mui-h-stack slot="start" space="var(--space-100)" aligny="center" role="cell">
          <slot name="icon"></slot>
          ${filename ? `<mui-link variant="tertiary" size="x-small" weight="regular">${filename}</mui-link>` : ""}
          ${filepath ? `<mui-body variant="tertiary" size="x-small" weight="regular">${filepath}</mui-body>` : ""}
        </mui-h-stack>
        <mui-h-stack slot="end" aligny="center" space="var(--space-100)" role="cell">
          ${additions ? `<mui-body size="x-small" weight="regular" variant="success">${additions}</mui-body>` : ""}
          ${deletions ? `<mui-body size="x-small" weight="regular" variant="error">${deletions}</mui-body>` : ""}
        </mui-h-stack>
      </mui-slat>
    `;
  }
}

if (!customElements.get("mui-file-diff")) {
  customElements.define("mui-file-diff", MuiFileDiff);
}
