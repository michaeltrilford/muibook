class storyTokenSlat extends HTMLElement {
  static get observedAttributes() {
    return ["token", "variant", "font-size", "line-height", "font-weight"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.update();

    // Observe data-theme changes
    this.themeObserver = new MutationObserver(() => {
      this.update();
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  disconnectedCallback() {
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  update() {
    const token = this.getAttribute("token");
    const variant = this.getAttribute("variant");
    const fontSize = this.getAttribute("font-size");
    const lineHeight = this.getAttribute("line-height");
    const fontWeight = this.getAttribute("font-weight");

    const computed = getComputedStyle(document.documentElement);
    const resolvedToken = computed.getPropertyValue(token)?.trim();

    const output = resolvedToken;

    const styles = /*css*/ `
      :host {
        display: block;
        padding: var(--space-400) var(--space-500);
        border-top: var(--border-thin);
      }

      @media (min-width: 768px) {
        :host {
          padding: var(--space-400) var(--space-600);
        }
      }

      :host(:first-of-type) {
        border-top: none;
      }

      :host(:last-of-type) {
        border-bottom: none;
      }

      mui-slat {
        align-items: start;
      }

      .swatch {
        width: var(--space-700);
        height: var(--space-700);
        border-radius: var(--radius-100);
      }

      .text-preview {
        font-size: var(--font-size-300);
        color: var(--text-color);
      }

      .spacer {
        height: 16px;
        width: 100%;
        background: var(--mui-brand-300);
        border-radius: var(--radius-200);
      }

      .radius-preview {
        width: var(--space-700);
        height: var(--space-700);
        background: var(--mui-brand-300);
      }

      .border-preview,
      .outline-preview { width: var(--space-700); }

      .line-height-preview { }

      mui-grid::part(align-items) { align-items: center; }
    `;

    // Create preview element depending on variant
    let visualPreview = "";
    switch (variant) {
      case "color":
        visualPreview = /*html*/ `<div class="swatch" style="background: var(${token});"></div>`;
        break;
      case "text-color":
        visualPreview = /*html*/ `<div class="text-preview" style="color: var(${token});">Aa</div>`;
        break;
      case "text-size":
        visualPreview = /*html*/ `
            <div 
              class="text-preview" 
              style="font-size: var(${token}); line-height: var(${lineHeight}); font-weight: var(${fontWeight});"
            >
              Aa
            </div>`;
        break;

      case "line-height":
        visualPreview = /*html*/ `
            <div 
              class="line-height-preview" 
              style="line-height: var(${token}); font-size: var(${fontSize}); font-weight: var(${fontWeight});"
            >
              Aa
            </div>`;
        break;

      case "font-weight":
        visualPreview = /*html*/ `<div class="text-preview" style="font-weight: var(${token});">Aa</div>`;
        break;
      case "font-family":
        visualPreview = /*html*/ `<div class="text-preview" style="font-family: var(${token});">Aa</div>`;
        break;
      case "size":
        visualPreview = /*html*/ `<div class="spacer" style="height: ${output}; width: var(${token});"></div>`;
        break;
      case "radius":
        visualPreview = /*html*/ `<div class="radius-preview" style="border-radius: var(${token});"></div>`;
        break;
      case "border-width":
        visualPreview = /*html*/ `<div class="border-preview" style="border: var(--border-thin); border-width: var(${token});"></div>`;
        break;
      case "border-color":
        visualPreview = /*html*/ `<div class="border-preview" style="border: var(--border-thin); border-color: var(${token});"></div>`;
        break;
      case "border":
        visualPreview = /*html*/ `<div class="border-preview" style="border: var(${token});"></div>`;
        break;
      case "outline-width":
        visualPreview = /*html*/ `<div class="outline-preview" style="outline: var(--outline-thin); outline-width: var(${token});"></div>`;
        break;
      case "outline-color":
        visualPreview = /*html*/ `<div class="outline-preview" style="outline: var(--outline-thin); outline-color: var(${token});"></div>`;
        break;
      case "outline":
        visualPreview = /*html*/ `<div class="outline-preview" style="outline: var(${token});"></div>`;
        break;
    }

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-responsive breakpoint="767">
        <mui-slat slot="showAbove" style="grid-template-columns: 0.8fr 1.2fr; align-items: center;">
          <mui-body slot="start" size="x-small">
            <story-code-snippet>${token}</story-code-snippet>
          </mui-body>
          <div slot="end">
            <mui-grid col="1fr 1fr">
              ${visualPreview}
              <mui-body size="x-small">${output}</mui-body>
            </mui-grid>
          </div>
        </mui-slat>


        <mui-h-stack slot="showBelow" space="var(--space-200)" alignX="space-between" alignY="center" >
          <mui-v-stack space="var(--space-200)">
            <mui-body size="x-small"><story-code-snippet>${token}</story-code-snippet></mui-body>
            <mui-body size="x-small">${output}</mui-body>
          </mui-v-stack>
          <mui-h-stack>
            ${visualPreview}
          </mui-h-stack>
        </mui-h-stack>

      </mui-responsive>

    `;
  }
}

customElements.define("story-token-slat", storyTokenSlat);
