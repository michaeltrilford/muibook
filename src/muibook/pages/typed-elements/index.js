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

      mui-image {
        border: var(--border-thin);
        border-color: var(--app-story-banner-border-color);
        border-radius: var(--radius-400);
        overflow: hidden;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 570px;
          gap: 9.6rem;
        }
      }

      @media (min-width: 2000px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 690px;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Typed Elements"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/types/react/typed-elements/index.d.ts"
      >
          
          <mui-grid class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">Directly type custom elements via JSX intrinsic elements augmentation. This approach directly types custom elements by augmenting React's JSX IntrinsicElements, enabling use of your web components with typed props in JSX.</mui-body>
                <mui-body size="medium">In Redactd and Outcomes, this has become the best default for broad product surfaces: keep the Web Component markup intact, preserve slots and attributes, and let React provide type support without forcing every component through a wrapper.</mui-body>
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
                <mui-heading level="3" size="5">Keep generated layouts portable</mui-heading>
                <mui-body size="medium">
                  Typed elements are especially useful for generated or exported layouts because the output stays close to the real component API. Attributes, slots, and design-token hooks remain visible instead of being hidden behind React-only abstractions.
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
            </mui-image>  
          </mui-grid>

          <mui-code scrollable>
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mui-container":&nbsp;React.DetailedHTMLProps&lt;React.HTMLAttributes&lt;HTMLElement&gt;,&nbsp;HTMLElement&gt;&nbsp;&&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;small?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;medium?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;large?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fluid?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;center?:&nbsp;boolean;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mui-input":&nbsp;React.DetailedHTMLProps&lt;React.InputHTMLAttributes&lt;HTMLInputElement&gt;,&nbsp;HTMLInputElement&gt;&nbsp;&&nbsp;{<br>
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

      </story-template>
    `;
  }
}

customElements.define("typed-elements", TypedElements);
