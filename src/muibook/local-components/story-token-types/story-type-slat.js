class storyTypeSlat extends HTMLElement {
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

      .title {
        font-weight: var(--font-weight-bold);
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


      <mui-responsive breakpoint="600">

        <mui-v-stack space="var(--space-000)" slot="showAbove">
          <mui-slat style="gap: var(--space-600)">
            <div slot="start">
              <mui-v-stack space="var(--space-200)">
                <mui-body size="medium"><mui-h-stack space="var(--space-050)"><span class="title">Name:</span> ${token} 
                </mui-h-stack></mui-body>
              </mui-v-stack>
            </div>

            <mui-v-stack space="var(--space-100)" slot="end">
              <mui-body size="x-small"><span class="title">Usage:</span> ${usage}</mui-body>
              <mui-body size="x-small"><span class="title">Description:</span> ${description}</mui-body>
            </mui-v-stack>
          </mui-slat>
        </mui-v-stack>

        <mui-v-stack space="var(--space-100)" slot="showBelow">
          <mui-v-stack space="var(--space-200)">
             <mui-body size="medium"><mui-h-stack space="var(--space-050)"><span class="title">Name:</span> ${token}</mui-h-stack></mui-body>
          </mui-v-stack>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="x-small"><span class="title">Usage:</span> ${usage}</mui-body>
            <mui-body size="x-small"><span class="title">Description:</span> ${description}</mui-body>
          </mui-v-stack>

      </mui-responsive>
    `;
  }
}

customElements.define('story-token-type-slat', storyTypeSlat);
