class storyPartSlat extends HTMLElement {
  static get observedAttributes() {
    return ['token', 'output', 'usage'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styles = /*css*/ `
      :host { 
        display: block;
        padding: var(--space-500) var(--space-500);
        border-bottom: var(--border-thin);
      }

      @media (min-width: 768px) {
        :host {
          padding: var(--space-500) var(--space-600);
        }
      }

      :host(:last-of-type) { 
        border-bottom: none;
      }

      mui-slat {
        align-items: start;
      }

      mui-h-stack::part(align-items) {
        align-items: end;
      }

    `;

    const usageAttr = this.getAttribute('usage') || '';
    const usageItems = usageAttr
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const usageLinks = usageItems
      .map((label) => {
        const url = `#/${label.toLowerCase().replace(/\s+/g, '')}`;
        return /*html*/ `<mui-link size="x-small" weight="bold" href="${url}">${label}</mui-link>`;
      })
      .join('');

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-v-stack space="var(--space-100)">

        <mui-body size="x-small">
          <story-code-snippet>${this.getAttribute('token')}</story-code-snippet>
        </mui-body>

        <mui-body size="x-small">
          ${this.getAttribute('output')}
        </mui-body>

        <mui-h-stack space="var(--space-100)">
          <mui-body size="x-small">Usage:</mui-body>
          ${usageLinks ||
            `<mui-body size="x-small" weight="bold">None</mui-body>`}
        </mui-h-stack>

      </mui-v-stack>
    `;
  }
}

customElements.define('story-part-slat', storyPartSlat);
