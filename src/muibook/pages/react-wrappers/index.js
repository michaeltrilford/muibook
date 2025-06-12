import Image from "../../images/pages/react-wrapper.jpg";

class ReactWrappers extends HTMLElement {
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
        title="Typed React Wrappers"
        description="Typed React wrappers for clean, safe web component usage."
      >


      <mui-v-stack space="var(--space-700)">

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">Wrapping web components in React makes them easier to use in JSX while bringing the benefits of TypeScript. By defining typed props, you gain autocompletion, compile-time checks, and a smoother developer experience when working with custom elements inside React.</mui-body>
                <mui-body size="large">This approach also lets you handle prop-to-attribute mapping, boolean flags, and any React-specific logic without modifying the original component. It keeps your code clean, predictable, and maintainable—while still leveraging lightweight, framework-agnostic web components.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create Mui App Code" />
              <figcaption slot="caption">components/mui-container.tsx</figcaption>
            </mui-image> 
          </mui-grid>

                    <mui-rule slot="footer"></mui-rule>

          <mui-code slot="footer">
            // WRAP THE COMPONENT (mui-container.tsx)
            <br />
            <br />
            import React from &quot;react&quot;;<br><br>
            type Size = &quot;small&quot; | &quot;medium&quot; | &quot;large&quot; | &quot;fluid&quot;;<br><br>
            interface MuiContainerProps extends React.HTMLAttributes&lt;HTMLElement&gt; {<br>
            &nbsp;&nbsp;size?: Size;<br>
            &nbsp;&nbsp;center?: boolean;<br>
            }<br><br>
            const MuiContainer: React.FC&lt;MuiContainerProps&gt; = ({ size, center, ...rest }) =&gt; (<br>
            &nbsp;&nbsp;&lt;mui-container {...rest} {...(size ? { [size]: true } : {})} {...(center ? { center: true } : {})} /&gt;<br>
            );<br><br>
            export default MuiContainer;
          </mui-code>

          <mui-rule slot="footer"></mui-rule>

          <mui-code slot="footer">
            // IMPORT THE COMPONENT (App.tsx)
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

          </mui-code>

        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("react-wrappers", ReactWrappers);
