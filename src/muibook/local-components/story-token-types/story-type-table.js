class storyTypeTable extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'name', 'options', 'required', 'description', 'default'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styles = /*css*/ `
      :host { 
        display: block;
      }
    `;

    const name = this.getAttribute('name') || '—';
    const options = this.getAttribute('options') || '—';
    const required = this.hasAttribute('required');
    const type = this.getAttribute('type') || 'undefined';
    const defaultVal = this.getAttribute('default') || '-';
    const description = this.getAttribute('description') || '';

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-table>  
        <mui-row-group heading>
          <mui-row columns="1fr 1fr 1fr">
            <mui-cell heading>Token</mui-cell>
            <mui-cell heading>Usage</mui-cell>
            <mui-cell heading>Description</mui-cell>
          </mui-row>
        </mui-row-group>
        <slot></slot>
      </mui-table>

    `;
  }
}

customElements.define('story-token-type-table', storyTypeTable);
