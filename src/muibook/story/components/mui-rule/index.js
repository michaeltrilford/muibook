class storyRule extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const TableColumns = `1fr 1fr`;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Rule"
        description="A horizontal rule to divide a page"
        github="https://github.com/michaeltrilford/michaeltrilford.github.io/blob/master/mui-rule/index.js"
      >

      <mui-v-stack space="var(--space-700)">

        <story-card title="Horizontal">
          <div slot="body">
            <mui-rule direction="horizontal" length="100%" style="margin: var(--space-700) 0;"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="horizontal"
            <br />
            &nbsp;&nbsp;length="100%"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Vertical">
          <div slot="body">
            <mui-rule direction="vertical" length="100px"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="vertical"
            <br />
            &nbsp;&nbsp;length="100px"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Horizontal">
          <div slot="body">
            <mui-rule direction="horizontal" length="100%" weight="2px" style="margin: var(--space-700) 0;"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="horizontal"
            <br />
            &nbsp;&nbsp;length="100%"&gt;
            <br />
            &nbsp;&nbsp;weight="2px"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Vertical">
          <div slot="body">
            <mui-rule direction="vertical" length="100px" weight="2px"></mui-rule>
          </div>
          <mui-code slot="footer">
            &lt;mui-rule
            <br />
            &nbsp;&nbsp;direction="vertical"
            <br />
            &nbsp;&nbsp;length="100px"&gt;
            <br />
            &nbsp;&nbsp;weight="2px"&gt;
            <br />
            &lt;/mui-rule&gt;
          </mui-code>
        </story-card>

        <story-card title="Props">
          <mui-table slot="body"> 
            <mui-row-group heading> 
              <mui-row columns="${TableColumns}"> 
                <mui-cell heading>Prop</mui-cell> 
                <mui-cell heading>Default</mui-cell> 
              </mui-row> 
            </mui-row-group> 
            <mui-row-group> 
              <mui-row columns="${TableColumns}"> 
                <mui-cell align-y="center"><mui-body size="small">direction</mui-body></mui-cell> 
                <mui-cell align-y="center"><mui-body size="small">"horizontal"</mui-body></mui-cell> 
              </mui-row> 
              <mui-row columns="${TableColumns}"> 
                <mui-cell align-y="center"><mui-body size="small">length</mui-body></mui-cell> 
                <mui-cell align-y="center"><mui-body size="small">"100%"</mui-body></mui-cell> 
              </mui-row> 
              <mui-row columns="${TableColumns}"> 
                <mui-cell align-y="center"><mui-body size="small">weight</mui-body></mui-cell> 
                <mui-cell align-y="center"><mui-body size="small">"1px"</mui-body></mui-cell> 
              </mui-row> 
            </mui-row-group> 
          </mui-table>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-rule", storyRule);
