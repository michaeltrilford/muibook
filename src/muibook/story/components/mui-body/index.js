class storyBody extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>


      <story-template
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-body/index.ts"
        title="Body"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-892&t=fSFYVey9aCoE5oQa-1"
        description="Use the Body component for clear and readable paragraph text across the UI. It’s ideal for longer-form content such as descriptions, explanations, or supporting information. Variant styles are also available for status messages and other contextual needs."
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small">
              import "@muibook/components/mui-body";<br>
            </mui-code>
          </spec-card>

        <story-card title="Default">

          <div slot="body">
            <mui-body>Risus Mollis Dapibus</mui-body>
          </div>

          <mui-code slot="footer">
            &lt;mui-body&gt; ... &lt;/mui-body&gt;
          </mui-code>

        </story-card>

        <story-card title="Sizes">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4">X-Small</mui-heading>
                  <mui-body size="x-small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Small</mui-heading>
                  <mui-body size="small">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Medium</mui-heading>
                  <mui-body size="medium">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Large</mui-heading>
                  <mui-body size="large">Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <mui-code slot="footer">
              &lt;mui-body size="x-small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="small"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="medium"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body size="large"&gt; ... &lt;/mui-body&gt;
            </mui-code>

          </story-card>

          <story-card title="Variants">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4">Success</mui-heading>
                  <mui-body variant="success">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Warning</mui-heading>
                  <mui-body variant="warning">Risus Mollis Dapibus</mui-body>
                </div>
                <div>
                  <mui-heading size="4">Error</mui-heading>
                  <mui-body variant="error">Risus Mollis Dapibus</mui-body>
                </div>
              </mui-v-stack>
            </div>

            <mui-code slot="footer">
              &lt;mui-body variant="success"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="warning"&gt; ... &lt;/mui-body&gt;
              <br />
              &lt;mui-body variant="error"&gt; ... &lt;/mui-body&gt;
            </mui-code>

          </story-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-body", storyBody);
