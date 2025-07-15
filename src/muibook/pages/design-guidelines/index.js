class DesignGuidelines extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
      .panel {
        padding: var(--space-600);
        border: var(--border-thin);
        border-radius: var(--radius-400);
        background: var(--surface-elevated-200);
      }
    
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template title="Guidelines" description="Access the UX Guidelines in browser or direct within Figma, powered by <mui-link href='https://gurusuite.xyz/home'>Guru Guides</mui-link>." guides="https://guides.muibook.com">
        <mui-v-stack space="var(--space-700)">
          <page-banner-browser></page-banner-browser>
          <page-banner></page-banner>    
        </mui-v-stack>
      </story-template>
    `;
  }
}

customElements.define("design-guidelines", DesignGuidelines);
