class storyGrid extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `:host { display: block; }`;

    const Box = /*html*/ `
      <mui-card>
        <mui-card-body>.</mui-card-body>
      </mui-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Grid"
        description="Layout component to enable grid layouts"
        github="https://github.com/michaeltrilford/michaeltrilford.github.io/blob/master/mui-grid/index.js"
      >

      <mui-v-stack space="var(--space-700)">
      
        <story-card title="Default">
        
          <mui-grid slot="body" space="var(--space-200)">
            ${Box}
            ${Box}
          </mui-grid>
          
          <mui-code slot="footer">
            &lt;mui-grid col="1fr 1fr" space="var(--space-200)"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-grid&gt;
          </mui-code>
        </story-card>

        <story-card title="Three Column">
          <mui-grid col="1fr 1fr 1fr" slot="body" space="var(--space-200)">
            ${Box}
            ${Box}
            ${Box}
          </mui-grid>
          <mui-code slot="footer">
            &lt;mui-grid col="1fr 1fr 1fr" space="var(--space-200)"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-grid&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-grid", storyGrid);
