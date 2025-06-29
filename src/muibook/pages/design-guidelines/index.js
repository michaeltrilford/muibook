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

    const figmaContent = /*html*/ `
      <mui-v-stack space="var(--space-200)" class="panel">
        <mui-heading size="4" level="4">Figma Plugin</mui-heading>  
        <mui-body size="medium">Install via <mui-link size="medium" weight="bold" href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Figma</mui-link> and login to access MUI Guidelines in Figma.</mui-body>
      </mui-v-stack>
    `;
    const websiteContent = /*html*/ `
      <mui-v-stack space="var(--space-200)" class="panel">
        <mui-heading size="4" level="4">Website</mui-heading>
        <mui-body size="medium">Visit <mui-link size="medium" weight="bold" href="https://guides.muibook.com" target="_blank">guides.muibook.com</mui-link> and view Mui Guides in-browser.</mui-body>
      </mui-v-stack>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template title="Design Guidelines" guides="https://guides.muibook.com">
        <mui-v-stack space="var(--space-700)">
          <mui-v-stack space="var(--space-500)">
            <page-banner-browser></page-banner-browser>
            <page-banner></page-banner>
          </mui-v-stack>        
        </mui-v-stack>
      </story-template>
    `;
  }
}

customElements.define("design-guidelines", DesignGuidelines);
