class storyList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="List"
        description="The component defines an ordered or unordered list."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-list"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-list";<br>
          </mui-code>
        </spec-card>

        <story-card title="Sizes">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4" >X-Small</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="x-small">Coffee</mui-list-item>
                    <mui-list-item size="x-small">Tea</mui-list-item>
                    <mui-list-item size="x-small">Milk</mui-list-item>
                  </mui-list>

                </div>
                <div>
                  <mui-heading size="4" >Small</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="small">Coffee</mui-list-item>
                    <mui-list-item size="small">Tea</mui-list-item>
                    <mui-list-item size="small">Milk</mui-list-item>
                  </mui-list>

                </div>
                <div>
                  <mui-heading size="4" >Medium</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="medium">Coffee</mui-list-item>
                    <mui-list-item size="medium">Tea</mui-list-item>
                    <mui-list-item size="medium">Milk</mui-list-item>
                  </mui-list>

                </div>
                <div>
                  <mui-heading size="4" >Large</mui-heading>

                  <mui-list as="ol">
                    <mui-list-item size="large">Coffee</mui-list-item>
                    <mui-list-item size="large">Tea</mui-list-item>
                    <mui-list-item size="large">Milk</mui-list-item>
                  </mui-list>

                </div>
              </mui-v-stack>
            </div>

            <mui-code slot="footer">
              &lt;mui-list-item size="x-small"&gt;
              <br />
              &nbsp;&nbsp;List item text
              <br />
              &lt;/mui-list-item&gt;
              <br />
              <br />
              &lt;mui-list-item size="small"&gt;
              <br />
              &nbsp;&nbsp;List item text
              <br />
              &lt;/mui-list-item&gt;
              <br />
              <br />
              &lt;mui-list-item size="medium"&gt;
              <br />
              &nbsp;&nbsp;List item text
              <br />
              &lt;/mui-list-item&gt;
              <br />
              <br />
              &lt;mui-list-item size="large"&gt;
              <br />
              &nbsp;&nbsp;List item text
              <br />
              &lt;/mui-list-item&gt;
            </mui-code>

        </story-card>


        <story-card title="Unordered">

          <div slot="body">
          <mui-list as="ol">
            <mui-list-item>Coffee</mui-list-item>
            <mui-list-item>Tea</mui-list-item>
            <mui-list-item>Milk</mui-list-item>
          </mui-list>
          </div>

          <mui-code slot="footer">
            &lt;mui-list as="li"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;...&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;...&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;...&lt;/mui-list-item&gt;
            <br />
            &lt;/mui-list&gt;
          </mui-code>

        </story-card>

        <story-card title="Ordered">

          <div slot="body">
            <mui-list as="ul">
              <mui-list-item>Coffee</mui-list-item>
              <mui-list-item>Tea</mui-list-item>
              <mui-list-item>Milk</mui-list-item>
            </mui-list>
          </div>

          <mui-code slot="footer">
            &lt;mui-list as="ul"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;...&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;...&lt;/mui-list-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-list-item&gt;...&lt;/mui-list-item&gt;
            <br />
            &lt;/mui-list&gt;
          </mui-code>
          
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-list", storyList);
