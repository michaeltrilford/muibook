class storyDemo extends HTMLElement {
  static get observedAttributes() {
    return ['width', 'height', 'description'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    let width = `24px`;
    let height = `24px`;
    const styles = /*css*/ `
      :host { display: block; }
      slot {
        display: flex;
        padding: var(--space-050) var(--space-400);
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        background: var(--grey-200);
        border-radius: var(--radius-200);
        width: var(--width); 
        height: var(--height);
      }
    `;
    const description = /*html*/ `<mui-body size="small">${this.getAttribute(
      'description',
    )}</mui-body>`;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <slot style="--width: ${this.getAttribute('width') ||
        width}; --height: ${this.getAttribute('height') || height};">
        ${description}
      </slot>
    `;
  }
}

customElements.define('story-demo', storyDemo);
