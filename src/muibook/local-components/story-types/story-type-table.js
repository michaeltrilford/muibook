class storyTypeTable extends HTMLElement {
  static get observedAttributes() {
    return ["type", "name", "options", "required", "description", "default", "columns", "overflow-x"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const columns =
      this.getAttribute("columns") ||
      "minmax(13rem, 0.5fr) minmax(10rem, 1fr) minmax(10rem, 2fr) minmax(5rem, 0.5fr) 2fr";
    const overflowEnabled = this.hasAttribute("overflow-x");

    const styles = /*css*/ `
      :host {
        display: block;
      }
      .table-wrap {
        width: 100%;
      }
      .table-wrap.overflow-x {
        overflow-x: auto;
        overflow-y: hidden;
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="table-wrap ${overflowEnabled ? "overflow-x" : ""}">
        <mui-table>
          <mui-row-group heading>
            <mui-row columns="${columns}">
              <mui-cell class="card-slot" heading>Name</mui-cell>
              <mui-cell class="card-slot" heading>Default</mui-cell>
              <mui-cell class="card-slot" heading>Options</mui-cell>
              <mui-cell class="card-slot" heading>Type</mui-cell>
              <mui-cell class="card-slot" heading>Description</mui-cell>
            </mui-row>
          </mui-row-group>
          <slot></slot>
        </mui-table>
      </div>
    `;
  }
}

customElements.define("story-type-table", storyTypeTable);
