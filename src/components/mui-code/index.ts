/* Mui Code */
class MuiCode extends HTMLElement {
  static get observedAttributes() {
    return ["size", "scrollable", "wrap", "inline"];
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
    const isInProse = Boolean(this.closest("mui-body, mui-list-item"));
    this.toggleAttribute("prose-slot", isInProse);

    const styles = /*css*/ `
      :host {
        display: grid;
        --code-background: var(--surface-elevated-100);
      }
      :host([inline]) {
        display: inline;
      }
      :host([card-slot]) {
        --code-background: var(--surface-elevated-200);
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
        color: var(--code-text-color, var(--text-color));
        background: var(--code-background);
        box-sizing: border-box;
        width: 100%;
        overflow-x: ${isWrap ? "hidden" : isScrollable ? "auto" : "visible"};
        white-space: ${isWrap ? "pre-wrap" : isScrollable ? "nowrap" : "normal"};
        overflow-wrap: ${isWrap ? "anywhere" : "normal"};
        word-break: ${isWrap ? "break-word" : "normal"};
      }

      :host(:not([inline])) code {
        padding: var(--space-400) var(--space-500);
      }

      :host([inline]) code {
        display: inline-block;
        vertical-align: baseline;
        padding: var(--space-050) var(--space-100);
        width: auto;
        overflow-x: visible;
        white-space: ${isWrap ? "pre-wrap" : "nowrap"};
      }
      :host([inline][prose-slot]) code {
        padding: var(--space-000) var(--space-100);
      }

      code:focus-visible {
        outline: ${isScrollable && !isWrap ? "var(--outline-thick)" : "none"};
        outline-offset: ${isScrollable && !isWrap ? "calc(-1 * var(--stroke-size-500))" : "none"};
      }

      @media (min-width: 600px) {
        :host(:not([inline])) code {
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
