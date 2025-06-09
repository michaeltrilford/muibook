class storyHeading extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Heading" 
        description="The Heading component includes six levels (H1–H6) for structured heading usage, supporting a range of hierarchies in text presentation."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1120&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-heading/index.ts"
      >
        
        <mui-v-stack space="var(--space-700)">
        
          <spec-card title="Import">
            <mui-code slot="footer" size="small">
              import "@muibook/components/mui-heading";<br>
            </mui-code>
          </spec-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="1">Heading 1</mui-heading>
            </div>
            <mui-code slot="footer">
              &lt;mui-heading size="1"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="2">Heading 2</mui-heading>
            </div>
            <mui-code slot="footer">
              &lt;mui-heading size="2"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="3">Heading 3</mui-heading>
            </div>
            <mui-code slot="footer">
              &lt;mui-heading size="3"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="4">Heading 4</mui-heading>
            </div>
            <mui-code slot="footer">
              &lt;mui-heading size="4"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="5">Heading 5</mui-heading>
            </div>
            <mui-code slot="footer">
              &lt;mui-heading size="5"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>

          <story-card noHeader>
            <div slot="body">
              <mui-heading size="6">Heading 6</mui-heading>
            </div>
            <mui-code slot="footer">
              &lt;mui-heading size="6"&gt; ... &lt;/mui-heading&gt;
            </mui-code>
          </story-card>
        
        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-heading", storyHeading);
