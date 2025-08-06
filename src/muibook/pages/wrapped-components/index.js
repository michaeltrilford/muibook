import Image from "../../images/pages/react-wrapper.jpg";

class WrappedComponents extends HTMLElement {
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
        title="Wrapped Components"
        description="Typed wrappers for clean, safe web component usage."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/types/react/wrapped-components"
      >

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">This approach wraps a custom element in a React component, allowing you to define typed props and encapsulate logic using familiar React patterns like props, children, and event handling.</mui-body>
              </mui-v-stack>

             <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Wrap the web component</mui-heading>
                <mui-body size="medium">Create a React wrapper that defines a typed interface for the custom element’s props, then pass those props to the underlying element.</mui-body>
              </mui-v-stack>
             <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Import and use</mui-heading>
                <mui-body size="medium">Use the wrapper in your React app like any other component—now with full type safety, validation, and editor support.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create Wrapped Component" />
              <figcaption slot="caption">components/mui-container</figcaption>
            </mui-image> 
          </mui-grid>

          <mui-rule slot="footer"></mui-rule>

          <mui-code slot="footer" scrollable>
            <br />
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/types/react/typed-elements/index.d.ts" target="_blank">👨‍💻 View file on Github</mui-link>
            <br />
            <br />
            <br />
            // 🛠️ Define Typed Components
            <br />
            <br />
            import&nbsp;*&nbsp;as&nbsp;React&nbsp;from&nbsp;"react";<br><br>
            declare&nbsp;module&nbsp;"react"&nbsp;{<br>
            &nbsp;&nbsp;namespace&nbsp;JSX&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;interface&nbsp;IntrinsicElements&nbsp;{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mui-container":&nbsp;React.DetailedHTMLProps&lt;React.HTMLAttributes&lt;HTMLElement&gt;,&nbsp;HTMLElement&gt;;<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...&nbsp;other&nbsp;custom&nbsp;elements<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;}<br>
            }
            <br />
            <br />
            <br />
            <mui-rule></mui-rule>
            <br />
            <br />
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/types/react/wrapped-components/MuiContainer.tsx" target="_blank">👨‍💻 View file on Github</mui-link>
            <br />
            <br />
            <br />
            // 🛠️ Create Wrapped Component
            <br />
            <br />
            import React from &quot;react&quot;;<br>
            import "@muibook/components/mui-container";<br><br>
            type Size = &quot;small&quot; | &quot;medium&quot; | &quot;large&quot; | &quot;fluid&quot;;<br><br>
            interface MuiContainerProps extends React.HTMLAttributes&lt;HTMLElement&gt; {<br>
            &nbsp;&nbsp;size?: Size;<br>
            &nbsp;&nbsp;center?: boolean;<br>
            }<br><br>
            const MuiContainer: React.FC&lt;MuiContainerProps&gt; = ({ size, center, ...rest }) =&gt; (<br>
            &nbsp;&nbsp;&lt;mui-container {...rest} {...(size ? { [size]: true } : {})} {...(center ? { center: true } : {})} /&gt;<br>
            );<br><br>
            export default MuiContainer;
            <br />
            <br />
            <br />
            <mui-rule></mui-rule>
            <br />
            <br />
            // 📦 Usage (App.tsx)
            <br>
            <br>
            import MuiContainer from "./components/mui-container";
            <br>
            <br>
            &lt;MuiContainer size="large" center&gt;
            <br>
            &nbsp;&nbsp;...
            <br>
            &lt;/MuiContainer&gt;
            <br />
            <br />
          </mui-code>
        </page-card>

      </story-template>
    `;
  }
}

customElements.define("wrapped-components", WrappedComponents);
