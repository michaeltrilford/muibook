/* Mui Image */
class MuiImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    if (!this.shadowRoot) return;

    let html = /*html*/ `

    <style>


      :host {
        display: flex;
      }
      figure {
        background: var(--surface-elevated-200);
        display: block;
        width: 100%;
        margin: var(--space-000);
        border-radius: var(--radius-300);
        overflow: hidden;
      }
      ::slotted(img) {
        width: 100%;
        height: auto;
        display: block;
        border-style: none;
        -ms-interpolation-mode: bicubic;
        vertical-align: middle;
      }
      ::slotted(figcaption) {
        padding: var(--space-500);
        color: var( --text-color);
        text-align: center;
        display: block;
      }
    </style>

    <figure>
      <slot name="image"></slot>
      <slot name="caption"></slot>
    </figure>`;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("mui-image", MuiImage);
