/* Mui Code */
class MuiCode extends HTMLElement {
  static get observedAttributes() {
    return ["size", "scrollable", "wrap"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "x-small");
    }
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const isScrollable = this.hasAttribute("scrollable");
    const isWrap = this.hasAttribute("wrap");

    const styles = /*css*/ `
      :host {
        display: grid;
      }
      :host([size="x-small"]) code {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }
      :host([size="small"]) code {
        font-size: var(--text-font-size-s);
        line-height: var(--text-line-height-s);
      }
      :host([size="medium"]) code {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }
      :host([size="large"]) code {
        font-size: var(--text-font-size-l);
        line-height: var(--text-line-height-l);
      }
      code {
        display: block;
        border-radius: inherit;
        font-family: monospace;
        color: var(--text-color);
        background: var(--surface-elevated-200);
        padding: var(--space-400) var(--space-500);
        box-sizing: border-box;
        width: 100%;
        overflow-x: ${isWrap ? "hidden" : isScrollable ? "auto" : "visible"};
        white-space: ${isWrap ? "pre-wrap" : isScrollable ? "nowrap" : "normal"};
        overflow-wrap: ${isWrap ? "anywhere" : "normal"};
        word-break: ${isWrap ? "break-word" : "normal"};
      }

      code:focus-visible {
        outline: ${isScrollable && !isWrap ? "var(--outline-thick)" : "none"};
        outline-offset: ${isScrollable && !isWrap ? "calc(-1 * var(--stroke-size-500))" : "none"};
      }

      @media (min-width: 600px) {
        code {
          padding: var(--space-500) var(--space-600);
        } 
      }

    `;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <code><slot></slot></code>
  `;
  }
}

if (!customElements.get("mui-code")) {
  customElements.define("mui-code", MuiCode);
}
