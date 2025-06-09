class storySlat extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Slat"
        description="Slat is a composable component designed to display table data on mobile devices. It provides flexible start and end slots, enabling consumers to tailor how data is presented in a mobile-friendly, stacked format. Slat is ideal for adapting complex table layouts into a clearer, more accessible experience on smaller screens."
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-slat/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-slat";<br>
          </mui-code>
        </spec-card>

        <story-card title="Slat">

          <mui-slat slot="body">
            <mui-heading slot="start" size="5">Heading</mui-heading>
            <mui-h-stack slot="end" space="var(--space-400)" alignX="flex-end">
              <mui-body width="20px">Body</mui-body>
            </mui-h-stack>
          </mui-slat>
          
          <mui-code slot="footer">
            &lt;mui-slat&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-heading slot="start" size="5"&gt;...&lt;/mui-heading&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="end"&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;...&lt;/mui-body&gt;
            <br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;
            <br />
            &lt;/mui-slat&gt;
          </mui-code>

        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-slat", storySlat);
