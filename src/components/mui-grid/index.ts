import { getPartMap } from "../../utils/part-map";

class MuiGrid extends HTMLElement {
  static get observedAttributes() {
    return ["col", "space", "alignx", "aligny"];
  }

  private col: string;
  private space: string;
  private alignX: string;
  private alignY: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.col = `1fr 1fr`;
    this.space = `var(--space-000)`;

    this.alignX = `normal`;
    this.alignY = `normal`;
  }

  async connectedCallback() {
    await this.waitForPartMap();
    const col = this.getAttribute("col") || this.col;
    const space = this.getAttribute("space") || this.space;
    const alignX = this.getAttribute("alignx") || this.alignX;
    const alignY = this.getAttribute("aligny") || this.alignY;
    const partMap = getPartMap("layout", "spacing");

    const styles = /*css*/ `
      :host {
        display: block;
      }
      div {
        display: grid;
        grid-template-columns: var(--col);
        gap: var(--gap);
        align-items: var(--alignY);
        justify-items: var(--alignX);
      }
    `;
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div part="${partMap}" style="--col: ${col}; --gap: ${space}; --alignX: ${alignX}; --alignY: ${alignY};">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (!this.shadowRoot) return;

    const div = this.shadowRoot.querySelector("div");
    if (div) {
      if (name === "col") div.style.setProperty("--col", newValue || this.col);
      if (name === "space") div.style.setProperty("--gap", newValue || this.space);
      if (name === "alignx") div.style.setProperty("--alignX", newValue || this.alignX);
      if (name === "aligny") div.style.setProperty("--alignY", newValue || this.alignY);
    }
  }

  waitForPartMap(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof getPartMap === "function") return resolve();
      const check = () => {
        if (typeof getPartMap === "function") {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }
}

if (!customElements.get("mui-grid")) {
  customElements.define("mui-grid", MuiGrid);
}
