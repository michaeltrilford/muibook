import { getPartMap } from "../../../utils/part-map";

/* Mui H Stack */
class MuiHStack extends HTMLElement {
  static get observedAttributes() {
    return ["space", "aligny", "alignx", "padding", "height", "width", "viewport", "fill", "wrap"];
  }

  private space: string;
  private alignX: string;
  private alignY: string;
  private wrap: string;
  private styles: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.space = `var(--space-500)`;
    this.alignY = `flex-start`;
    this.alignX = `flex-start`;
    this.wrap = `nowrap`;

    this.styles = /*css*/ `
      :host {
        display: block;
        height: var(--stack-height, auto);
        width: var(--stack-width, auto);
      }
      slot {
        display: flex;
        box-sizing: border-box;
        height: auto;
        width: auto;
        gap: var(--space);
        padding: var(--padding);
        align-items: var(--alignY);
        justify-content: var(--alignX);
        flex-wrap: var(--wrap);
      }
      :host([height]) slot,
      :host([viewport]) slot,
      :host([fill]) slot {
        height: 100%;
      }
      :host([width]) slot,
      :host([fill]) slot {
        width: 100%;
      }
    `;
  }

  async connectedCallback() {
    if (!this.shadowRoot) return;
    await this.waitForPartMap();
    this.syncDimensions();

    const partMap = getPartMap("spacing", "layout", "visual");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${this.styles}</style>
      <slot 
        part="${partMap}" 
        style="
          --space: ${this.getAttribute("space") || this.space};
          --padding: ${this.getAttribute("padding") || "var(--space-000)"};
          --alignY: ${this.getAttribute("aligny") || this.alignY};
          --alignX: ${this.getAttribute("alignx") || this.alignX};
          --wrap: ${this.resolveWrap(this.getAttribute("wrap"))};
        ">
      </slot>
    `;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === "height" || name === "width" || name === "viewport" || name === "fill") {
      this.syncDimensions();
    }

    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");

    if (slot) {
      if (name === "space") slot.style.setProperty("--space", newValue || this.space);
      if (name === "padding") slot.style.setProperty("--padding", newValue || "var(--space-000)");
      if (name === "aligny") slot.style.setProperty("--alignY", newValue || this.alignY);
      if (name === "alignx") slot.style.setProperty("--alignX", newValue || this.alignX);
      if (name === "wrap") slot.style.setProperty("--wrap", this.resolveWrap(newValue));
    }
  }

  private syncDimensions() {
    const height = this.getAttribute("height") || (this.hasAttribute("viewport") ? "100dvh" : this.hasAttribute("fill") ? "100%" : "auto");
    const width = this.getAttribute("width") || (this.hasAttribute("fill") ? "100%" : "auto");

    this.style.setProperty("--stack-height", height);
    this.style.setProperty("--stack-width", width);
  }

  private resolveWrap(value: string | null) {
    if (value === null || value === "") return this.hasAttribute("wrap") ? "wrap" : this.wrap;
    return value;
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

if (!customElements.get("mui-h-stack")) {
  customElements.define("mui-h-stack", MuiHStack);
}
