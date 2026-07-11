class tokensSemantic extends HTMLElement {
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
      .surface-elevated-200,
      .surface-elevated-300,
      .surface-recessed,
      .surface-recessed-200,
      .surface-recessed-300 {
        padding: var(--space-400);
        width: 100%;
        height: 200px;
        box-sizing: border-box;
      }

      .surface-elevated-200,
      .surface-elevated-300,
      .surface-recessed-200,
      .surface-recessed-300 {
        height: 100%;
      }

      .surface-elevated,
      .surface-recessed {
        border-radius: var(--radius-400);
      }

      .surface-elevated-200,
      .surface-recessed-200 {
        border-radius: var(--radius-300);
      }

      .surface-elevated-300,
      .surface-recessed-300 {
        border-radius: var(--radius-200);
      }

      .surface-elevated {
        background: var(--surface-elevated-100);
      }

      .surface-elevated-200 {
        background: var(--surface-elevated-200);
      }

      .surface-elevated-300 {
        background: var(--surface-elevated-300);
      }

      .surface-recessed {
        background: var(--surface-recessed-100);
      }

      .surface-recessed-200 {
        background: var(--surface-recessed-200);
      }

      .surface-recessed-300 {
        background: var(--surface-recessed-300);
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
        title="Semantic"
        description="Tokens that translate raw values into meaningful, context-aware design decisions, guiding component behavior and visual emphasis."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >

        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="surface::Surface|||text::Text|||font-weight::Font Weight|||border::Border|||shadow::Shadow|||outline::Outline|||backdrop::Backdrop|||categorical::Categorical|||feedback::Feedback|||form::Form|||action::Action"
        ></story-quicklinks>

          <spec-card id="surface" title="Surface" description="Surface tokens define the background layers of the interface. The base surface represents the app or page level, with elevated surfaces moving forward and recessed surfaces moving backwards. Use surface tokens primarily for components that sit flush with the background, such as cards or slats, rather than on every element. This ensures typography is easily adjusted and allows users to craft color contrast through themes and brand ranges. Light and dark modes aren’t simple color inversions; they’re carefully designed to preserve consistent elevation and stacking across all surfaces.">

            <story-token-slat slot="body" token="--surface-recessed-300" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-recessed-200" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-recessed-100" variant="color">
            </story-token-slat>


            <story-token-slat slot="body" token="--surface" variant="color">
            </story-token-slat>


            <story-token-slat slot="body" token="--surface-elevated-100" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-elevated-200" variant="color">
            </story-token-slat>

            <story-token-slat slot="body" token="--surface-elevated-300" variant="color">
            </story-token-slat>

          </spec-card>

          <story-card title="Surface: Elevated" description="The Surface tokens are tailored to have a great tone for both light and dark settings">
            <div slot="body">
              <div class="surface">
                <div class="surface-elevated">
                  <div class="surface-elevated-200">
                    <div class="surface-elevated-300"></div>
                  </div>
                </div>
              </div>
            </div>
            <mui-code slot="footer">
              <br />
              <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/semantic-design-tokens">Surface Tokens</mui-link></mui-body>
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
              &nbsp;&nbsp;background: var(--surface-elevated-100);
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-400);
              <br />
              }
              <br />
              <br />
              .surface-elevated-200 {
              <br />
              &nbsp;&nbsp;background: var(--surface-elevated-200);
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-300);
              <br />
              }
              <br />
              <br />
              .surface-elevated-300 {
              <br />
              &nbsp;&nbsp;background: var(--surface-elevated-300);
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-200);
              <br />
              }
            </mui-code>
          </story-card>

          <story-card title="Surface: Recessed" description="The Surface tokens are tailored to have a great tone for both light and dark settings">
            <div slot="body">
              <div class="surface">
                <div class="surface-recessed">
                  <div class="surface-recessed-200">
                    <div class="surface-recessed-300"></div>
                  </div>
                </div>
              </div>
            </div>
            <mui-code slot="footer">
              <br />
              <mui-body size="x-small">Learn about <mui-Link size="x-small" href="/semantic-design-tokens">Surface Tokens</mui-link></mui-body>
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
              &nbsp;&nbsp;background: var(--surface-recessed-100);
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-400);
              <br />
              }
              <br />
              <br />
              .surface-recessed-200 {
              <br />
              &nbsp;&nbsp;background: var(--surface-recessed-200);
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-300);
              <br />
              }
              <br />
              <br />
              .surface-recessed-300 {
              <br />
              &nbsp;&nbsp;background: var(--surface-recessed-300);
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-200);
              <br />
              }
            </mui-code>
          </story-card>

          <spec-card id="text" title="Text">
            <story-token-slat slot="body" token="--text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-secondary" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-positive" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-warning" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--text-color-attention" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--text-font-size" variant="text-size" line-height="--text-line-height"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height" variant="line-height" font-size="--text-font-size"></story-token-slat>

            <story-token-slat slot="body" token="--text-line-height-xxs" variant="line-height" font-size="--text-font-size-xxs"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-xs" variant="line-height" font-size="--text-font-size-xs"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-s" variant="line-height" font-size="--text-font-size-s"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-m" variant="line-height" font-size="--text-font-size-m"></story-token-slat>
            <story-token-slat slot="body" token="--text-line-height-l" variant="line-height" font-size="--text-font-size-l"></story-token-slat>

            <story-token-slat slot="body" token="--text-font-size-xxs" variant="text-size" line-height="--text-line-height-xxs"></story-token-slat>
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

          <spec-card id="shadow" title="Shadow">
          <story-token-slat slot="body" token="--shadow-thin" variant="shadow"></story-token-slat>
          <story-token-slat slot="body" token="--shadow-medium" variant="shadow"></story-token-slat>
          <story-token-slat slot="body" token="--shadow-thick" variant="shadow"></story-token-slat>
          </spec-card>

          <spec-card id="outline" title="Outline">
           <story-token-slat slot="body" token="--outline-color" variant="outline-color"></story-token-slat>  
          <story-token-slat slot="body" token="--outline-thin" variant="outline"></story-token-slat>
          <story-token-slat slot="body" token="--outline-medium" variant="outline"></story-token-slat>
          <story-token-slat slot="body" token="--outline-thick" variant="outline"></story-token-slat>
          </spec-card>

          <spec-card id="backdrop" title="Backdrop">
           <story-token-slat slot="body" token="--backdrop-overlay" variant="color"></story-token-slat>  
          </spec-card>

          <spec-card id="categorical" title="Categorical" description="Theme-aware category colours for labels, avatars, statuses, and other categorized UI. Component tokens should reference these aliases instead of consuming theme-specific colour steps directly.">
            <story-token-slat slot="body" token="--categorical-purple" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-violet" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-pink" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-magenta" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-red" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-orange" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-amber" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-yellow" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-lime" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-green" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-teal" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-cyan" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-blue" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--categorical-indigo" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="feedback" title="Feedback" description="User feedback (alerts, messages)">
            <story-token-slat slot="body" token="--feedback-neutral-border-color" variant="color"></story-token-slat>  
            <story-token-slat slot="body" token="--feedback-positive-border-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-border-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-border-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-border-color" variant="color"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-border" variant="border"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-background" variant="color"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-icon" variant="color"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-text" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-text" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-text" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-text" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-text" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-action-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-action-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-action-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-action-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-action-background" variant="color"></story-token-slat>

          </spec-card>

          <spec-card id="form" title="Form" description="Tokens for form feedback include default styles, message states, and validation indicators.">
            <story-token-slat slot="body" token="--form-default-text-color" variant="text-color"></story-token-slat>  
            <story-token-slat slot="body" token="--form-success-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-warning-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-error-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-default-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-success-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-warning-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-error-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-default-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-success-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-warning-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-error-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-default-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-success-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-warning-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-error-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--form-radius-x-small" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--form-radius-small" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--form-radius-medium" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--form-radius-large" variant="radius"></story-token-slat>
          </spec-card>

          <spec-card id="action" title="Action" description="Defines the visual style and interaction behavior of elements like buttons and links, reflecting their intended purpose.">
            <story-token-slat slot="body" token="--action-font-size" variant="text-size"></story-token-slat>
            <story-token-slat slot="body" token="--action-line-height" variant="line-height"></story-token-slat>
            <story-token-slat slot="body" token="--action-font-weight" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--action-size-xx-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--action-size-x-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--action-size-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--action-size-medium" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--action-size-large" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--action-radius-x-small" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--action-radius-small" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--action-radius-medium" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--action-radius-large" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--action-avatar-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-avatar-background-hover" variant="color"></story-token-slat>
          </spec-card>

          <spec-card title="Action / Primary" description="Used for the most important action on a page or UI surface.">
            <story-token-slat slot="body" token="--action-primary-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background-focus" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color-focus" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color-disabled" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--action-primary-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border-color-focus" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border-color-disabled" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border-hover" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border-focus" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-border-disabled" variant="border"></story-token-slat>
          </spec-card>


          <spec-card title="Action / Secondary" description="Used for supporting actions that aren’t the main focus but are still important.">
            <story-token-slat slot="body" token="--action-secondary-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background-focus" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color-focus" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color-disabled" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--action-secondary-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border-color-focus" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border-color-disabled" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border-hover" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border-focus" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-border-disabled" variant="border"></story-token-slat>
          </spec-card>

          <spec-card title="Action / Tertiary" description="Minimal styling — usually text-only — used where subtlety is preferred.">
            <story-token-slat slot="body" token="--action-tertiary-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background-focus" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color-focus" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color-disabled" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--action-tertiary-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border-color-focus" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border-color-disabled" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border-hover" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border-focus" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-border-disabled" variant="border"></story-token-slat>
          </spec-card>

          <spec-card title="Action / Attention" description="High-visibility actions that require caution, often associated with risk or disruption.">
            <story-token-slat slot="body" token="--action-attention-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background-focus" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color-focus" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color-disabled" variant="text-color"></story-token-slat>

            <story-token-slat slot="body" token="--action-attention-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border-color-focus" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border-color-disabled" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border-hover" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border-focus" variant="border"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-border-disabled" variant="border"></story-token-slat>
          </spec-card>

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

customElements.define("tokens-semantic", tokensSemantic);
