class storyBadge extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Badge"
        description="Badges are non-interactive and indicate counts or statuses."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-badge/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-badge";<br>
          </mui-code>
        </spec-card>

        <story-card title="Default">
          <div slot="body">
            <mui-badge>New</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Neutral">
          <div slot="body">
            <mui-badge variant="neutral">Offline</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="neutral"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Positive">
          <div slot="body">
            <mui-badge variant="positive">Paid</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="positive"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Warning">
          <div slot="body">
            <mui-badge variant="warning">Busy</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="warning"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention">
          <div slot="body">
            <mui-badge variant="attention">Urgent</mui-badge>
          </div>
          <mui-code slot="footer">
            &lt;mui-badge variant="attention"&gt;
            <br />
            &nbsp;&nbsp;...
            <br />
            &lt;/mui-badge&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-badge", storyBadge);
