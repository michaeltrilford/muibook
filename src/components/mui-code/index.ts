/* Mui Code */
class muiCode extends HTMLElement {
  static get observedAttributes() {
    return ["size"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Set defaults
    const size = this.getAttribute("size") || "x-small";
    this.setAttribute("size", size);

    const styles = /*css*/ `
      :host {
        display: block;
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
      }

      @media (min-width: 600px) {
        code {
          padding: var(--space-500) var(--space-600);
        } 
      }

    `;
    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <code><slot></slot></code>
  `;
  }
}

customElements.define("mui-code", muiCode);
