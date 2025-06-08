class storyResponsive extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
      .local-ring {
        height: 6rem;
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .local-ring_text {
        fill: #1b2830;
        font-size: 1.2rem;
        -webkit-transform: translateY(0.34em);
        transform: translateY(0.34em);
        font-weight: bold;
      }
    `;

    const LocalRing = /*html*/ `
      <div class="local-ring">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 42 42" 
          style="text-anchor: middle; width: 100%;"
        >
          <circle class="local-ring__hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
          <circle class="local-ring__ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="4"></circle>
          <circle class="local-ring__segment VE4Mc" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#000000" stroke-width="4" stroke-dasharray="50,50" stroke-dashoffset="25"></circle>
          <g><text x="50%" y="50%" class="local-ring_text">2/4</text></g>
        </svg>
      </div>
    `;

    const ProgressTableColumns = `1fr 1fr 1fr 106px`;

    const ProgressTableView = /*html*/ `
      <mui-table> 
        <mui-row-group heading> 
          <mui-row columns="${ProgressTableColumns}"> 
            <mui-cell heading>File</mui-cell> 
            <mui-cell heading>Due date</mui-cell> 
            <mui-cell heading>Status</mui-cell> 
            <mui-cell heading>Automation</mui-cell> 
          </mui-row> 
        </mui-row-group> 
        <mui-row-group> 
          <mui-row columns="${ProgressTableColumns}"> 
            <mui-cell align-y="center"><mui-body size="small">Alison Max</mui-body></mui-cell> 
            <mui-cell align-y="center"><mui-v-stack space="var(--space-050)"><mui-body size="small">27/07/2020</mui-body><mui-badge>Quarterly</mui-badge></mui-v-stack></mui-cell> 
            <mui-cell align-y="center"><mui-badge>Unlodged</mui-badge></mui-cell> 
            <mui-cell align-y="center">${LocalRing}</mui-cell> 
          </mui-row> 
        </mui-row-group> 
      </mui-table>
    `;

    const ProgressSlatView = /*html*/ `
        <mui-v-stack space="var(--space-400)">
          ${LocalRing}
          <mui-heading 
            size="6" 
            style="width: 100%; text-align: center;"
          >
            Transactions automated
          </mui-heading>
          
          <mui-rule></mui-rule>

          <mui-grid col="1fr 1fr 1fr">
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small"><strong>Client</strong></mui-body>
            <mui-body size="small">Alison Max</mui-body>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small" style="text-align: center;"><strong>Due date</strong></mui-body>
            <mui-body size="small" style="text-align: center;">27/07/2020</mui-body>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100)">
            <mui-body size="small" style="text-align: right;"><strong>Status</strong></mui-body>
            <mui-body size="small" style="text-align: right;">Unlodged</mui-body>
          </mui-v-stack>
        </mui-grid>

        </mui-v-stack>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Responsive"
        description="Dynamically render UI based on viewport size"
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-responsive/index.ts"
      >

      <mui-v-stack space="var(--space-700)">
      
        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-responsive";<br>
          </mui-code>
        </spec-card>

        <story-card title="Basic">
          <mui-responsive slot="body" breakpoint="600">
            <mui-heading slot="showBelow" size="6">Mobile / Below 600</mui-heading>
            <mui-heading slot="showAbove" size="6">Desktop / Above 600</mui-heading>
          </mui-responsive>
          <mui-code slot="footer">
            &lt;mui-responsive breakpoint="600"&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;...&lt;/div&gt;
            <br />
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;...&lt;/div&gt;
            <br />
            &lt;/mui-responsive&gt;
          </mui-code>
        </story-card>

        <story-card title="Table to Mobile Layout">

          <mui-responsive slot="body" breakpoint="1080">
            <mui-h-stack slot="showAbove" space="16px" alignY="center">
              ${ProgressTableView}
            </mui-h-stack>
            <div slot="showBelow">
              ${ProgressSlatView}
            </div>
          </mui-responsive>

          <mui-code slot="footer">
            &lt;mui-responsive breakpoint="600"&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;div slot="showAbove"&gt;
            <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#x24;{ProgressTableView}
            <br />
            &nbsp;&nbsp;&lt;/div&gt;
            <br />
            <br />
            &nbsp;&nbsp;&lt;div slot="showBelow"&gt;
            <br />
             &nbsp;&nbsp;&nbsp;&nbsp; &#x24;{ProgressSlatView}
            <br />
            &nbsp;&nbsp;&lt;/div&gt;
            <br />
            <br />
            &lt;/mui-responsive&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-responsive", storyResponsive);
