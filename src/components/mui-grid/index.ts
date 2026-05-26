import { getPartMap } from "../../utils/part-map";

class MuiGrid extends HTMLElement {
  static get observedAttributes() {
    return ["col", "space", "alignx", "aligny", "padding", "height", "width", "viewport", "fill"];
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
    this.syncDimensions();

    const styles = /*css*/ `
      :host {
        display: block;
        height: var(--grid-height, auto);
        width: var(--grid-width, auto);
      }
      div {
        display: grid;
        grid-template-columns: var(--col);
        gap: var(--gap);
        padding: var(--padding);
        box-sizing: border-box;
        align-items: var(--alignY);
        justify-items: var(--alignX);
      }
      :host([height]) div,
      :host([viewport]) div,
      :host([fill]) div {
        height: 100%;
      }
      :host([width]) div,
      :host([fill]) div {
        width: 100%;
      }
    `;
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div part="${partMap}" style="--col: ${col}; --gap: ${space}; --padding: ${this.getAttribute("padding") || "var(--space-000)"}; --alignX: ${alignX}; --alignY: ${alignY};">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (!this.shadowRoot) return;

    if (name === "height" || name === "width" || name === "viewport" || name === "fill") {
      this.syncDimensions();
    }

    const div = this.shadowRoot.querySelector("div");
    if (div) {
      if (name === "col") div.style.setProperty("--col", newValue || this.col);
      if (name === "space") div.style.setProperty("--gap", newValue || this.space);
      if (name === "padding") div.style.setProperty("--padding", newValue || "var(--space-000)");
      if (name === "alignx") div.style.setProperty("--alignX", newValue || this.alignX);
      if (name === "aligny") div.style.setProperty("--alignY", newValue || this.alignY);
    }
  }

  private syncDimensions() {
    const height = this.getAttribute("height") || (this.hasAttribute("viewport") ? "100dvh" : this.hasAttribute("fill") ? "100%" : "auto");
    const width = this.getAttribute("width") || (this.hasAttribute("fill") ? "100%" : "auto");

    this.style.setProperty("--grid-height", height);
    this.style.setProperty("--grid-width", width);
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
