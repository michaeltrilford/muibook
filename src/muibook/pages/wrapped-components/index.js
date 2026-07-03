import Image from "../../images/pages/react-wrapper.jpg";

class WrappedComponents extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .content-container {
        container-type: inline-size;
        display: grid;
        gap: var(--space-600);
      }

      .config::part(display) {
        grid-template-columns: 1fr;
      }

      mui-image {
        border: var(--border-thin);
        border-color: var(--app-story-banner-border-color);
        border-radius: var(--radius-400);
        overflow: hidden;
      }

      @container (min-width: 960px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @container (min-width: 1120px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 570px;
          gap: 9.6rem;
        }
      }

      @container (min-width: 1730px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 690px;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Wrapped Components"
        github="https://github.com/michaeltrilford/muibook/tree/main/src/types/react/wrapped-components"
        x-large
      >
          
          <div class="content-container resource-page">
          <mui-grid class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">This approach wraps a custom element in a React component, allowing you to define typed props and encapsulate logic using familiar React patterns like props, children, and event handling.</mui-body>
                <mui-body size="medium">What we have learnt from Redactd and Outcomes is that wrappers are most useful as adapters, not as the default way to consume every component. Use them when React needs to coordinate state, refs, events, or opinionated composition around an underlying Web Component.</mui-body>
              </mui-v-stack>

             <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Wrap the web component</mui-heading>
                <mui-body size="medium">Create a React wrapper that defines a typed interface for the custom element’s props, then pass those props to the underlying element.</mui-body>
              </mui-v-stack>
             <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Import and use</mui-heading>
                <mui-body size="medium">Use the wrapper in your React app like any other component—now with full type safety, validation, and editor support.</mui-body>
              </mui-v-stack>

             <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Wrap only the friction</mui-heading>
                <mui-body size="medium">Prefer typed custom elements for simple usage. Reach for a wrapper when you need to translate React props into attributes, normalize custom events, forward refs, or protect a product-specific pattern from being rebuilt across screens.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create Wrapped Component" />
            </mui-image> 
          </mui-grid>


          <mui-code scrollable>
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
            type Size = &quot;small&quot; | &quot;medium&quot; | &quot;large&quot; | &quot;x-large&quot; | &quot;fluid&quot;;<br><br>
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
            &lt;MuiContainer size="x-large" center&gt;
            <br>
            &nbsp;&nbsp;...
            <br>
            &lt;/MuiContainer&gt;
            <br />
            <br />
          </mui-code>

      </story-template>
    `;
  }
}

customElements.define("wrapped-components", WrappedComponents);
