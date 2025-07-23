/* Mui Wrapper */
class MuiContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    let html = /*html*/ `
    <style>

      :host {
        display: block;
        width: 95%;
        width: calc( 100% - 4.8rem );
        max-width: 118.0rem;
        padding-top: 2.4rem;
        padding-bottom: 2.4rem;
        min-width: 27.2rem;
        margin: 0 2.4rem; }

      /* Center
      ========================================= */
      :host([center]) {
        margin: 0 auto; }
      /* ===================================== */

      /* Fluid
      ========================================= */
      :host([fluid]) {
        max-width: 100%; }
      /* ===================================== */

      /* Small
      ========================================= */
      :host([small]) {
        max-width: 54.0rem; }
      /* ===================================== */

      /* Medium
      ========================================= */
      :host([medium]) {
        max-width: 70.0rem; }
      /* ===================================== */

      /* Large
      ========================================= */
      :host([large]) {
        max-width: 118.0rem; }
      /* ===================================== */
    </style>
    <slot></slot>
    `;
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = html;
  }
}

if (!customElements.get("mui-container")) {
  customElements.define("mui-container", MuiContainer);
}
