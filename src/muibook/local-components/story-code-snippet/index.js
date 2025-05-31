class storyCodeSnippet extends HTMLElement {
  static get observedAttributes() {
    return ['token', 'output', 'usage'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styles = /*css*/ `
      :host { 
        display: inline-flex;
        margin:  var(--space-025) var(--space-000);
      }

      code {
        background: var(--app-story-snippet-code-bg);
        border-radius: var(--radius-100);
        color: var(--app-story-snippet-code-text);
        padding: var(--space-025) var(--space-100);
        font-size: var(--font-size-15);
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <code><slot></slot></code>
       
    `;
  }
}

customElements.define('story-code-snippet', storyCodeSnippet);
