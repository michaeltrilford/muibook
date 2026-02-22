import Image from "../../images/pages/react-wrapper.jpg";

class ReactInputHelper extends HTMLElement {
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
          grid-template-columns: minmax(0, 65ch) 500px;
          gap: 9.6rem;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="React Input Helper"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/types/react/readme.md"
      >
        <mui-grid class="config" space="var(--space-600)">
          <mui-v-stack space="var(--space-500)">
            <mui-v-stack space="var(--space-300)">
              <mui-body size="medium">
                Use this helper pattern for controlled mui-input in React to avoid
                focus loss on each keystroke.
              </mui-body>
            </mui-v-stack>

            <mui-v-stack space="var(--space-200)">
              <mui-heading level="3" size="5">Do this</mui-heading>
              <mui-list>
                <mui-list-item>Read value from <strong>event.detail.value</strong>.</mui-list-item>
                <mui-list-item>Split static attrs and value into separate effects.</mui-list-item>
                <mui-list-item>Keep value sync isolated to the value-only effect.</mui-list-item>
              </mui-list>
            </mui-v-stack>

            <mui-v-stack space="var(--space-200)">
              <mui-heading level="3" size="5">Avoid this</mui-heading>
              <mui-list>
                <mui-list-item>Re-applying label/type/placeholder/variant on every key.</mui-list-item>
                <mui-list-item>Reading input from shadow DOM as the primary source.</mui-list-item>
              </mui-list>
            </mui-v-stack>
          </mui-v-stack>

          <mui-image>
            <img slot="image" src="${Image}" alt="React Input Helper" />
          </mui-image>
        </mui-grid>

        <mui-code scrollable>
          <br />
          import React, { useEffect, useRef } from "react";<br />
          import "@muibook/components";<br />
          <br />
          export function MuiInputReactHelper({ label, placeholder, type = "text", variant = "default", value, onValueChange }) {<br />
          &nbsp;&nbsp;const elRef = useRef(null);<br />
          <br />
          &nbsp;&nbsp;// 1) Static attrs only<br />
          &nbsp;&nbsp;useEffect(() =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;const el = elRef.current;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (!el) return;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (label !== undefined) el.setAttribute("label", label);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (placeholder !== undefined) el.setAttribute("placeholder", placeholder);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;el.setAttribute("type", type);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;el.setAttribute("variant", variant);<br />
          &nbsp;&nbsp;}, [label, placeholder, type, variant]);<br />
          <br />
          &nbsp;&nbsp;// 2) Value-only sync<br />
          &nbsp;&nbsp;useEffect(() =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;const el = elRef.current;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (!el) return;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (value !== undefined && value !== "") el.setAttribute("value", value);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;else el.removeAttribute("value");<br />
          &nbsp;&nbsp;}, [value]);<br />
          <br />
          &nbsp;&nbsp;// 3) Consume custom event payload<br />
          &nbsp;&nbsp;useEffect(() =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;const el = elRef.current;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (!el || !onValueChange) return;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;const handler = (event) =&gt; {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const custom = event;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (custom.detail?.value !== undefined) onValueChange(String(custom.detail.value));<br />
          &nbsp;&nbsp;&nbsp;&nbsp;};<br />
          &nbsp;&nbsp;&nbsp;&nbsp;el.addEventListener("input", handler);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;return () =&gt; el.removeEventListener("input", handler);<br />
          &nbsp;&nbsp;}, [onValueChange]);<br />
          <br />
          &nbsp;&nbsp;return &lt;mui-input ref={elRef} /&gt;;<br />
          }<br />
        </mui-code>
      </story-template>
    `;
  }
}

customElements.define("react-input-helper", ReactInputHelper);
