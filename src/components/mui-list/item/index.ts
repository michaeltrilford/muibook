/* Mui List Item */
class MuiListItem extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "size", "weight"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setAttribute("role", "listitem");

    // Set default attributes if they’re not provided
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "medium");
    }

    if (!this.hasAttribute("weight")) {
      this.setAttribute("weight", "regular");
    }

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

customElements.define("mui-list-item", MuiListItem);
