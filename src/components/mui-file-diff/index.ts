import "../mui-slat/index.js";
import "../mui-stack/index.js";
import "../mui-link/index.js";
import "../mui-body/index.js";

export class MuiFileDiff extends HTMLElement {
  static get observedAttributes() {
    return ["filename", "filepath", "additions", "deletions", "result-slot", "card-slot", "result-slot-last"];
  }

  private iconObserver: MutationObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.iconObserver?.disconnect();
    this.iconObserver = null;
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private syncIconSlot() {
    if (!this.shadowRoot) return;

    const slot = this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="icon"]');
    const icons = slot?.assignedElements({ flatten: true }) || [];

    this.iconObserver?.disconnect();
    this.iconObserver = null;

    icons.forEach((icon) => {
      if (icon.tagName.toLowerCase() !== "mui-file-icon") return;
      icon.setAttribute("file-diff-icon", "");
      if (icon.getAttribute("size") !== "small") icon.setAttribute("size", "small");
    });

    const fileIcons = icons.filter((icon) => icon.tagName.toLowerCase() === "mui-file-icon");
    if (!fileIcons.length) return;

    this.iconObserver = new MutationObserver(() => this.syncIconSlot());
    fileIcons.forEach((icon) => {
      this.iconObserver?.observe(icon, { attributes: true, attributeFilter: ["size", "file-diff-icon"] });
    });
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
      <mui-slat variant="action" role="row" file-diff-slot ${this.hasAttribute("result-slot") ? "result-slot" : ""} ${this.hasAttribute("card-slot") ? "card-slot" : ""} ${this.hasAttribute("result-slot-last") ? "result-slot-last" : ""}>
        <mui-h-stack slot="start" space="var(--space-100)" aligny="center" role="cell">
          <slot name="icon"></slot>
          ${filename ? `<mui-body size="x-small" weight="medium">${filename}</mui-body>` : ""}
          ${filepath ? `<mui-body variant="optional" size="x-small" weight="regular" truncate>${filepath}</mui-body>` : ""}
        </mui-h-stack>
        <mui-h-stack slot="end" aligny="center" space="var(--space-100)" role="cell">
          ${additions ? `<mui-body size="x-small" weight="regular" variant="success">${additions}</mui-body>` : ""}
          ${deletions ? `<mui-body size="x-small" weight="regular" variant="error">${deletions}</mui-body>` : ""}
        </mui-h-stack>
      </mui-slat>
    `;

    const iconSlot = this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="icon"]');
    iconSlot?.addEventListener("slotchange", () => this.syncIconSlot());
    this.syncIconSlot();
  }
}

if (!customElements.get("mui-file-diff")) {
  customElements.define("mui-file-diff", MuiFileDiff);
}
