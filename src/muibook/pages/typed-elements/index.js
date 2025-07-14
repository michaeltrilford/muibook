import Image from "../../images/pages/typed-components.jpg";

class TypedElements extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 500px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Typed Elements"
        description="Directly type custom elements via JSX intrinsic elements augmentation."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/types/react/typed-elements/index.d.ts"
      >


      <mui-v-stack space="var(--space-700)">

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">This approach directly types custom elements by augmenting React's JSX IntrinsicElements, enabling use of your web components with typed props in JSX.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Augment JSX Intrinsic Elements</mui-heading>
                <mui-body size="medium">
                  Extend React’s JSX namespace with your custom elements and their typed props via module augmentation.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Define Prop Types</mui-heading>
                <mui-body size="medium">
                  Specify attribute types such as strings, booleans, and enums directly on the intrinsic elements interface.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Use Custom Elements Directly</mui-heading>
                <mui-body size="medium">
                  Use your typed custom elements in JSX without wrappers, enjoying full autocompletion and type checking.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Minimal Boilerplate</mui-heading>
                <mui-body size="medium">
                  Avoid the need for React wrapper components by typing elements directly, reducing code overhead.
                </mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Typed Components" />
              <figcaption slot="caption">types/typed-elements</figcaption>
            </mui-image>  
          </mui-grid>


          <mui-rule slot="footer"></mui-rule>

          <mui-code slot="footer">
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/types/react/typed-elements/index.d.ts" target="_blank">👨‍💻 View file on Github</mui-link>
            <br />
            <br />
            <br />
            // 🛠️ Define Typed Components
            <br />
            <br />
            import&nbsp;React&nbsp;from&nbsp;"react";<br><br>
            declare&nbsp;global&nbsp;{<br>
            &nbsp;&nbsp;namespace&nbsp;JSX&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;interface&nbsp;IntrinsicElements&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mui-container":
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React.DetailedHTMLProps
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;React.HTMLAttributes
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;HTMLElement&gt;,&nbsp;HTMLElement&gt;&nbsp;
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;small?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;medium?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;large?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fluid?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;center?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mui-input":
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React.DetailedHTMLProps
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;React.InputHTMLAttributes
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;HTMLInputElement&gt;,&nbsp;HTMLInputElement&gt;&nbsp;
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variant?:&nbsp;"default"&nbsp;|&nbsp;"success"&nbsp;|&nbsp;"warning"&nbsp;|&nbsp;"error";<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type?:&nbsp;"text"&nbsp;|&nbsp;"password"&nbsp;|&nbsp;"email"&nbsp;|&nbsp;"number"&nbsp;|&nbsp;"search"&nbsp;|&nbsp;"tel"&nbsp;|&nbsp;"url"&nbsp;|&nbsp;"date"&nbsp;|&nbsp;"time";<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id?:&nbsp;string;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label:&nbsp;string;&nbsp;//&nbsp;required<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hide-label"?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...&nbsp;other&nbsp;custom&nbsp;elements<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;}<br>
            }
          </mui-code>

        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("typed-elements", TypedElements);
