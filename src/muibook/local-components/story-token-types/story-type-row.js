class storyTypeRow extends HTMLElement {
  static get observedAttributes() {
    return ['token', 'description', 'usage'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styles = /*css*/ `
      :host { 
        display: block;
      }

      .visually-hidden {
        position: absolute;
        inset: 0;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
        border: 0;
        }

    `;

    const token = this.getAttribute('token') || '—';
    const description = this.getAttribute('description') || '';
    const usage = this.getAttribute('usage') || 'undefined';

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-row-group>
        <mui-row columns="1fr 1fr 1fr">
          <mui-cell>
            <mui-body size="x-small">
              <mui-h-stack space="var(--space-050)">
              ${token}
            </mui-h-stack></mui-body>
          </mui-cell>
          <mui-cell><mui-body size="x-small">${description}</mui-body></mui-cell>
          <mui-cell><mui-body size="x-small">${usage}</mui-body></mui-cell>
        </mui-row>
      </mui-row-group>
    `;
  }
}

customElements.define('story-token-type-row', storyTypeRow);
