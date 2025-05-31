class tokensSurface extends HTMLElement {
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

    `;

    const propItems = [
      {
        token: "--surface",
        description: "Neutral base",
        usage: "Page background",
      },
      {
        token: "--surface-elevated-*",
        description: "Lighter/brighter",
        usage: "Cards, dialogs",
      },
      {
        token: "--surface-recessed-*",
        description: "Darker/deeper",
        usage: "insets, sidebar tracks",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-token-type-row
            token="${prop.token}"
            usage="${prop.usage}" 
            description="${prop.description}">
          </story-token-type-row>
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="medium" 
            heading=${prop.token.charAt(0).toUpperCase() + prop.token.slice(1)} 
            ${isLastChild}>
            <story-token-type-slat
              slot="detail"
              token="${prop.token}"
              usage="${prop.usage}" 
              description="${prop.description}">
            </story-token-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Surface"
        description="Surface tokens set the background layers of the interface. They create depth, support elevation, and provide structure across contexts. Dark mode is not a simple inversion. It is curated to maintain clarity and hierarchy across all surfaces."
        figma="https://github.com/michaeltrilford/muibook/blob/main/src/css/mui-tokens.css"
      >
        <mui-v-stack space="var(--space-700)">

          <spec-card title="Token Details">
            <mui-responsive breakpoint="768" slot="body">
              <story-token-type-table slot="showAbove">
                ${rows}
              </story-token-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <spec-card title="Surface: Light">
            <story-token-slat slot="body" token="--surface" variant="color" output="var(--grey-200)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-elevated-alpha" variant="color" output="var(--white-opacity-50)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-elevated-100" variant="color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-elevated-200" variant="color" output="var(--grey-100)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-recessed-alpha" variant="color" output="var(--black-opacity-10)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-recessed-100" variant="color" output="var(--grey-300)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-recessed-200" variant="color" output="var(--grey-400)"></story-token-slat>
          </spec-card>

          <spec-card title="Surface: Dark">
            <story-token-slat slot="body" token="--surface" variant="color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-elevated-alpha" variant="color" output="var(--white-opacity-10)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-elevated-100" variant="color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-elevated-200" variant="color" output="var(--grey-800)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-recessed-alpha" variant="color" output="var(--black-opacity-30)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-recessed-100" variant="color" output="var(--grey-1000)"></story-token-slat>
            <story-token-slat slot="body" token="--surface-recessed-200" variant="color" output="var(--grey-1100)"></story-token-slat>
          </spec-card>

          <story-card title="Example: Elevated" description="The Surface tokens are tailored to have a great tone for both light and dark settings">
            <div slot="body">
              <div class="surface">
                <div class="surface-elevated"></div>
              </div>
            </div>
            <mui-code slot="footer">
              <br />
              <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/surface-design-tokens">Surface Tokens</mui-link></mui-body>
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

          <story-card title="Example: Recessed" description="The Surface tokens are tailored to have a great tone for both light and dark settings">
            <div slot="body">
              <div class="surface">
                <div class="surface-recessed"></div>
              </div>
            </div>
            <mui-code slot="footer">
              <br />
              <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/#/surface-design-tokens">Surface Tokens</mui-link></mui-body>
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
  }
}

customElements.define("tokens-surface", tokensSurface);
