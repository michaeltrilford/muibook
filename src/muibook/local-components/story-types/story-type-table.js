class storyTypeTable extends HTMLElement {
  static get observedAttributes() {
    return ["type", "name", "options", "required", "description", "default"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { 
        display: block;
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-table>  
        <mui-row-group heading>
          <mui-row columns="minmax(13rem, 0.5fr) minmax(10rem, 1fr) minmax(10rem, 2fr) minmax(5rem, 0.5fr) 2fr">
            <mui-cell class="card-slot" heading>Name</mui-cell>
            <mui-cell class="card-slot" heading>Default</mui-cell>
            <mui-cell class="card-slot" heading>Options</mui-cell>
            <mui-cell class="card-slot" heading>Type</mui-cell>
            <mui-cell class="card-slot" heading>Description</mui-cell>
          </mui-row>
        </mui-row-group>
        <slot></slot>
      </mui-table>

    `;
  }
}

customElements.define("story-type-table", storyTypeTable);
