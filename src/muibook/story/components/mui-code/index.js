class storyCode extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Code"
        description="The component defines a code view."
        github="https://github.com/michaeltrilford/michaeltrilford.github.io/blob/master/mui-code/index.js"
      >

      <mui-v-stack space="var(--space-700)">

        <story-card title="Large">
          <div slot="body">
            <mui-code size="large">
            Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis
            euismod. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu
            leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </mui-code>
          </div>
          <mui-code slot="footer">
            &lt;mui-code size="large"&gt;...&lt;/mui-code&gt;
          </mui-code>
        </story-card>

       <story-card title="Medium">
          <div slot="body">
            <mui-code size="medium">
            Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis
            euismod. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu
            leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </mui-code>
          </div>
          <mui-code slot="footer">
            &lt;mui-code size="medium"&gt;...&lt;/mui-code&gt;
          </mui-code>
        </story-card>

        <story-card title="Small">
          <div slot="body">
            <mui-code size="small">
            Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis
            euismod. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu
            leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </mui-code>
          </div>
          <mui-code slot="footer">
            &lt;mui-code size="small"&gt;...&lt;/mui-code&gt;
          </mui-code>
        </story-card>

        <story-card title="X-Small">
          <div slot="body">
            <mui-code size="x-small">
            Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis
            euismod. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu
            leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </mui-code>
          </div>
          <mui-code slot="footer">
            &lt;mui-code size="x-small"&gt;...&lt;/mui-code&gt;
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-code", storyCode);
