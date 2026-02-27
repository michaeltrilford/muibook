/* Mui Image */
class MuiImage extends HTMLElement {
  static get observedAttributes() {
    return ["height", "fit", "crop", "position", "zoom", "focal-x", "focal-y", "radius", "aspect-ratio"];
  }

  private observer: MutationObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private syncChildSlots() {
    const children = Array.from(this.children) as HTMLElement[];
    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag === "img" && !child.hasAttribute("slot")) child.setAttribute("slot", "image");
      if (tag === "figcaption" && !child.hasAttribute("slot")) child.setAttribute("slot", "caption");
    });
  }

  connectedCallback() {
    this.syncChildSlots();
    this.render();

    this.observer = new MutationObserver(() => this.syncChildSlots());
    this.observer.observe(this, { childList: true, subtree: false });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.observer = null;
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
  }

  private clampPercent(value: string | null, fallback: number) {
    const parsed = Number.parseFloat(value || "");
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(100, Math.max(0, parsed));
  }

  private getPosition() {
    const focalX = this.getAttribute("focal-x");
    const focalY = this.getAttribute("focal-y");
    if (focalX != null || focalY != null) {
      const x = this.clampPercent(focalX, 50);
      const y = this.clampPercent(focalY, 50);
      return `${x}% ${y}%`;
    }
    return this.getAttribute("position") || "center center";
  }

  private getZoom() {
    const parsed = Number.parseFloat(this.getAttribute("zoom") || "1");
    if (!Number.isFinite(parsed) || parsed <= 0) return 1;
    return parsed;
  }

  private render() {
    if (!this.shadowRoot) return;

    const height = this.getAttribute("height") || "";
    const fit = this.getAttribute("fit") || (this.hasAttribute("crop") ? "cover" : "contain");
    const position = this.getPosition();
    const zoom = this.getZoom();
    const radius = this.getAttribute("radius") || "var(--radius-300)";
    const aspectRatio = this.getAttribute("aspect-ratio") || "";
    const crop = this.hasAttribute("crop");

    this.style.setProperty("--mui-image-radius-active", radius);
    this.style.setProperty("--mui-image-overflow-active", crop ? "hidden" : "clip");
    this.style.setProperty("--mui-image-fit-active", fit);
    this.style.setProperty("--mui-image-position-active", position);
    this.style.setProperty("--mui-image-zoom-active", String(zoom));
    this.style.setProperty("--mui-image-height-active", height || "auto");
    this.style.setProperty("--mui-image-aspect-ratio-active", aspectRatio || "auto");
    this.style.setProperty("--mui-image-image-height-active", height || aspectRatio ? "100%" : "auto");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          width: 100%;
          --mui-image-radius-active: var(--radius-300);
          --mui-image-overflow-active: clip;
          --mui-image-fit-active: contain;
          --mui-image-position-active: center center;
          --mui-image-zoom-active: 1;
          --mui-image-height-active: auto;
          --mui-image-aspect-ratio-active: auto;
          --mui-image-image-height-active: auto;
        }
        figure {
          background: var(--surface-elevated-200);
          display: block;
          width: 100%;
          margin: var(--space-000);
          box-sizing: border-box;
          border-radius: var(--mui-image-radius-active);
          overflow: var(--mui-image-overflow-active);
          height: var(--mui-image-height-active);
          aspect-ratio: var(--mui-image-aspect-ratio-active);
        }
        ::slotted([slot="image"]) {
          width: 100%;
          height: var(--mui-image-image-height-active);
          object-fit: var(--mui-image-fit-active);
          object-position: var(--mui-image-position-active);
          display: block;
          border-style: none;
          -ms-interpolation-mode: bicubic;
          vertical-align: middle;
          transform-origin: center;
          transform: scale(var(--mui-image-zoom-active));
        }
        ::slotted([slot="caption"]) {
          padding: var(--space-500);
          color: var(--text-color);
          text-align: center;
          display: block;
        }
      </style>

      <figure>
        <slot name="image"></slot>
        <slot name="caption"></slot>
      </figure>
    `;
  }
}

if (!customElements.get("mui-image")) {
  customElements.define("mui-image", MuiImage);
}
