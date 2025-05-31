class storyTokens extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const Columns = `1fr 1fr`;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Design Tokens"
        description="Design tokens are all the values needed to construct and maintain a design system — spacing, color, typography, object styles, animation, etc"
      >

        <mui-rule></mui-rule>

        <mui-v-stack space="var(--space-100)">
          <mui-heading size="2" style="margin-top: var(--space-500); margin-bottom: var(--space-100)">Base tokens</mui-heading>
          <mui-body style="margin-bottom: var(--space-500)">Base tokens are the foundational values of a design system. They represent raw, unchanging definitions for core design attributes such as colors, typography, spacing, and sizes.</mui-body>
        </mui-v-stack>

        <mui-v-stack space="var(--space-100)">
          <mui-heading size="2" style="margin-top: var(--space-800); margin-bottom: var(--space-100)">Contextual tokens</mui-heading>
          <mui-body style="margin-bottom: var(--space-500)">Contextual tokens bridge the gap between raw base tokens and specific use cases. They are tied to a particular context or element, reflecting how a base token is applied in a specific environment or scenario.</mui-body>
        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define('story-tokens', storyTokens);
