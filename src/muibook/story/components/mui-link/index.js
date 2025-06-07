class storyLink extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-link.custom-wc::part(color) {
        color: var(--red-600);
      }

      mui-link.custom-wc::part(color):hover {
        color: var(--red-800);
      }

      mui-link.custom-wc::part(font-weight) {
        font-weight: var(--font-weight-700);
      }

      mui-link.custom-wc::part(text-decoration) {
        text-decoration: none;
      }
      mui-link.custom-wc::part(text-decoration):hover {
        text-decoration: underline;
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Links"
        description="The mui-link defines a hyperlink, which is used to link from one page to another."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-663&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-link/index.ts"
      >

      <mui-v-stack space="var(--space-700)">

        <story-card title="Sizes">

            <div slot="body">
              <mui-v-stack space="var(--space-500)">
                <div>
                  <mui-heading size="4" >X-Small</mui-heading>
                  <mui-link size="x-small">Link text</mui-link>
                </div>
                <div>
                  <mui-heading size="4" >Small</mui-heading>
                  <mui-link size="small">Link text</mui-link>
                </div>
                <div>
                  <mui-heading size="4" >Medium</mui-heading>
                  <mui-link size="medium">Link text</mui-link>
                </div>
                <div>
                  <mui-heading size="4" >Large</mui-heading>
                  <mui-link size="large">Link text</mui-link>
                </div>
              </mui-v-stack>
            </div>

            <mui-code slot="footer">
              &lt;mui-link size="x-small"&gt;
              <br />
              &nbsp;&nbsp;Link text
              <br />
              &lt;/mui-link&gt;
              <br />
              <br />
              &lt;mui-link size="small"&gt;
              <br />
              &nbsp;&nbsp;Link text
              <br />
              &lt;/mui-link&gt;
              <br />
              <br />
              &lt;mui-link size="medium"&gt;
              <br />
              &nbsp;&nbsp;Link text
              <br />
              &lt;/mui-link&gt;
              <br />
              <br />
              &lt;mui-link size="large"&gt;
              <br />
              &nbsp;&nbsp;Link text
              <br />
              &lt;/mui-link&gt;
            </mui-code>

        </story-card>




        <story-card title="URL">
          <div slot="body">
            <mui-link target="_blank" href="links.html">Unsubscribe</mui-link>
          </div>
          <mui-code slot="footer">
            &lt;mui-link href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="External link">
          <div slot="body">
            <mui-link target="_blank">Unsubscribe</mui-link>
          </div>
          <mui-code slot="footer">
            &lt;mui-link target="_blank" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Primary Link">
          <div slot="body">
            <mui-link target="_blank" variant="primary">Fork Github</mui-link>
          </div>
          <mui-code slot="footer">
            &lt;mui-link variant="primary" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Secondary Link">
          <div slot="body">
            <mui-link target="_blank" variant="secondary">View report</mui-link>
          </div>
          <mui-code slot="footer">
            &lt;mui-link variant="secondary" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Tertiary Link">
          <div slot="body">
            <mui-link target="_blank" variant="tertiary">View report</mui-link>
          </div>
          <mui-code slot="footer">
            &lt;mui-link variant="tertiary" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention Link">
          <div slot="body">
            <mui-link target="_blank" variant="attention">Fork Github</mui-link>
          </div>
          <mui-code slot="footer">
            &lt;mui-link variant="attention" href="links.html"&gt;...&lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Primary Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="primary" >
              <mui-icon-add></mui-icon-add>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="primary" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-link variant="primary" &gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Secondary Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="secondary" >
              <mui-icon-add variant="secondary" size="small"></mui-icon-add>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="secondary" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-link variant="secondary" &gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Tertiary Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="tertiary" >
              <mui-icon-add></mui-icon-add>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="tertiary" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-link variant="tertiary" &gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Attention Icon-Only">
          <mui-h-stack slot="body" space="var(--space-100)">
            <mui-link variant="attention" >
              <mui-icon-add></mui-icon-add>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-subtract></mui-icon-subtract>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-grid></mui-icon-grid>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-notification></mui-icon-notification>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-menu></mui-icon-menu>
            </mui-link>
            <mui-link variant="attention" >
              <mui-icon-message></mui-icon-message>
            </mui-link>
          </mui-h-stack>
          <mui-code slot="footer">
            &lt;mui-link variant="attention" &gt;
            <br />
            &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
            <br />
            &lt;/mui-link&gt;
          </mui-code>
        </story-card>

        <story-card title="Part Selectors" description="Ideal for building custom web-component compositions using MUI and scoped CSS styles.">
          <div slot="body">
            <mui-link class="custom-wc" target="_blank" href="links.html">Unsubscribe</mui-link>
          </div>
          <mui-code slot="footer">
      
            // Scoped CSS (Web component)
            <br />
            <br />

            class customUI extends HTMLElement {<br>
            &nbsp;&nbsp;static get observedAttributes() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;return [...];<br>
            &nbsp;&nbsp;}<br><br>

            &nbsp;&nbsp;constructor() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;super();<br>
            &nbsp;&nbsp;&nbsp;&nbsp;const shadowRoot = this.attachShadow({
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mode: "open"
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;});
            <br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;const styles = &#96;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:host { ... }<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Part Selector<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////
            <br />
            <br />

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(color) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: var(--red-600);<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(color):hover {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: var(--red-700);<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(font-weight) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;font-weight: var(--font-weight-700);<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(text-decoration) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-decoration: none;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(text-decoration):hover {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-decoration: underline;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&#96;;<br><br>

            &nbsp;&nbsp;&nbsp;&nbsp;shadowRoot.innerHTML = &#96;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;style&gt;&#36;{styles}&lt;/style&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="..."&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&#96;;<br>
            &nbsp;&nbsp;}<br>
            }<br><br>

            customElements.define("custom-ui", customUI);


          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-link", storyLink);
