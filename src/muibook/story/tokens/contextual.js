class tokensContextual extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .surface {
        background: var(--surface);
        box-sizing: border-box;
        padding: var(--space-400);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }
      .surface-elevated,
      .surface-recessed {
        padding: var(--space-400);
        width: 100%;
        height: 200px;
        box-sizing: border-box;
        border-radius: var(--radius-300);
      }

      .surface-elevated {
        background: var(--surface-elevated-100);
      }

      .surface-recessed {
        background: var(--surface-recessed-200);
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Contextual"
        description="Contextual tokens provide structure to brand values by defining how and where they should be applied within the UI."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >

          <mui-message heading="Quicklinks" slot="message">
            <mui-h-stack class="token-item-menu" alignY="center">
              <mui-link data-scroll-link="text">Text</mui-link>
              <mui-link data-scroll-link="font-weight">Font Weight</mui-link>
              <mui-link data-scroll-link="border">Border</mui-link>
              <mui-link data-scroll-link="outline">Outline</mui-link>
              <mui-link data-scroll-link="surface">Surface</mui-link>
            </mui-h-stack>
          </mui-message>
      
        <mui-v-stack space="var(--space-700)">

          <spec-card id="text" title="Text">
            <story-token-slat slot="body" token="--text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-success" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-warning" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-error" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-optional" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--text-font-size" variant="text-size" line-height="--text-line-height"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height" variant="line-height" font-size="--text-font-size"></story-token-slat>

            <story-token-slat slot="body" token="--text-line-height-xs" variant="line-height" font-size="--text-font-size-xs"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-s" variant="line-height" font-size="--text-font-size-s"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-m" variant="line-height" font-size="--text-font-size-m"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-l" variant="line-height" font-size="--text-font-size-l"></story-token-slat>

            <story-token-slat slot="body" token="--text-font-size-xs" variant="text-size" line-height="--text-line-height-xs"></story-token-slat>
            <story-token-slat slot="body" token="--text-font-size-s" variant="text-size" line-height="--text-line-height-s"></story-token-slat>
            <story-token-slat slot="body" token="--text-font-size-m" variant="text-size" line-height="--text-line-height-m"></story-token-slat>
            <story-token-slat slot="body" token="--text-font-size-l" variant="text-size" line-height="--text-line-height-l"></story-token-slat>
          </spec-card>

          <spec-card id="font-weight" title="Font Weight">
            <story-token-slat slot="body" token="--font-weight-regular" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-medium" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-semi-bold" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-bold" variant="font-weight"></story-token-slat>
          </spec-card>

          <spec-card id="border" title="Border">
          <story-token-slat slot="body" token="--border-color" variant="border-color"></story-token-slat>
          <story-token-slat slot="body" token="--border-thin" variant="border"></story-token-slat>
          <story-token-slat slot="body" token="--border-thick" variant="border"></story-token-slat>
          </spec-card>

          <spec-card id="outline" title="Outline">
           <story-token-slat slot="body" token="--outline-color" variant="outline-color"></story-token-slat>  
          <story-token-slat slot="body" token="--outline-thin" variant="outline"></story-token-slat>
          <story-token-slat slot="body" token="--outline-medium" variant="outline"></story-token-slat>
          <story-token-slat slot="body" token="--outline-thick" variant="outline"></story-token-slat>
          </spec-card>

          <spec-card id="surface" title="Surface" description="Surface tokens define the background layers of the interface. They create depth and support elevation across contexts. Light and dark modes aren’t simple color inversions; they’re carefully designed to preserve consistent elevation and stacking across all surfaces.">

            <story-token-slat slot="body" token="--surface" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-elevated-alpha" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-elevated-100" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-elevated-200" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-recessed-alpha" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-recessed-100" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-recessed-200" variant="color">
            </story-token-slat>

          </spec-card>

          <story-card title="Surface: Elevated" description="The Surface tokens are tailored to have a great tone for both light and dark settings">
            <div slot="body">
              <div class="surface">
                <div class="surface-elevated"></div>
              </div>
            </div>
            <mui-code slot="footer">
              <br />
              <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/contextual-design-tokens">Surface Tokens</mui-link></mui-body>
              <br />
              /* =================================== */
              <br />
              <br />
              .surface {
              <br />
              &nbsp;&nbsp;background: var(--surface);
              <br />
              }
              <br />
              <br />
              .surface-elevated {
              <br />
              &nbsp;&nbsp;background: var(--surface-elevated-200);
              <br />
              }
            </mui-code>
          </story-card>

          <story-card title="Surface: Recessed" description="The Surface tokens are tailored to have a great tone for both light and dark settings">
            <div slot="body">
              <div class="surface">
                <div class="surface-recessed"></div>
              </div>
            </div>
            <mui-code slot="footer">
              <br />
              <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/contextual-design-tokens">Surface Tokens</mui-link></mui-body>
              <br />
              /* =================================== */
              <br />
              <br />
              .surface {
              <br />
              &nbsp;&nbsp;background: var(--surface);
              <br />
              }
              <br />
              <br />
              .surface-recessed {
              <br />
              &nbsp;&nbsp;background: var(--surface-recessed-200);
              <br />
              }
            </mui-code>
          </story-card>

        </mui-v-stack>

      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("tokens-contextual", tokensContextual);
