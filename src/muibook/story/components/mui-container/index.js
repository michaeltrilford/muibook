class storyContainer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Container" 
        description="The Container is a layout helper to provide the base page structure for a web experience."
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-container/index.ts"
      >

        <mui-v-stack space="var(--space-700)">

          <story-card title="Small">
            <mui-container small slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer">
              &lt;mui-container small&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Medium">
          <mui-container medium slot="body">
            <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
          </mui-container>
            <mui-code slot="footer">
              &lt;mui-container medium&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Large">
            <mui-container large slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer">
              &lt;mui-container large&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Fluid">
            <mui-container fluid slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer">
              &lt;mui-container fluid&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

          <story-card title="Center">
            <mui-container small center slot="body">
              <mui-card><mui-card-body>{Content}</mui-card-body></mui-card>
            </mui-container>
            <mui-code slot="footer">
              &lt;mui-container center&gt;...&lt;/mui-container&gt;
            </mui-code>
          </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-container", storyContainer);
