/* Mui List Item */
class MuiListItem extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "size", "weight"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "listitem");
    this.hasAttribute("size") || this.setAttribute("size", "medium");
    this.hasAttribute("weight") || this.setAttribute("weight", "regular");
    this.hasAttribute("variant") || this.setAttribute("variant", "default");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const styles = /*css*/ `
      :host {
        display: list-item;
        margin: var(--space-000);
        color: var(--text-color);
      }
      :host(:not(:last-child)) {
        margin-bottom: var(--space-025);
      }

      /* Size styles */

      :host([size="x-small"]) {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }

      :host([size="small"]) {
        font-size: var(--text-font-size-s);
        line-height: var(--text-line-height-s);
      }

      :host([size="medium"]) {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }

      :host([size="large"]) {
        font-size: var(--text-font-size-l);
        line-height: var(--text-line-height-l);
      }


      /* Weight styles */
      :host([weight="regular"]) {
        font-weight: var(--font-weight-regular);
      }

      :host([weight="medium"]) {
        font-weight: var(--font-weight-medium);
      }

      :host([weight="bold"]) {
        font-weight: var(--font-weight-bold);
      }
    `;
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-list-item")) {
  customElements.define("mui-list-item", MuiListItem);
}
