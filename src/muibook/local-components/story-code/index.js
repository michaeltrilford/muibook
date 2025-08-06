class StoryCode extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-code {
        border-bottom-right-radius: calc(var(--card-radius) - 1px);
        border-bottom-left-radius: calc(var(--card-radius) - 1px);
      }
      
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-accordion-block
        class="card-slot" 
        slot="footer"
        detail-space="none"
        heading="
          <span 
            style='
              display: inline-flex; 
              font-size: var(--font-size-300);
              margin-right: var(--space-050);
              translate: 0px 2px;
            '
          >👨‍💻</span>
          <span style='display: inline-flex; margin-bottom: var(--space-050);'>View Code</span>" 
      >
        <mui-code slot="detail" scrollable>
          <slot></slot>
        </mui-code>
      </mui-accordion-block>
    `;
  }
}

customElements.define("story-code", StoryCode);
