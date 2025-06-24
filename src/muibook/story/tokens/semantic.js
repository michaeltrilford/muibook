class tokensSemantic extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Semantic"
        description=
          "
          Semantic tokens capture design intent and support consistent theming and behavior across related components. They represent purpose such as feedback, interaction, or state rather than specific components. 
          <br><br>
          Theming can be applied at this layer, allowing for light/dark mode or branding variations as we avoid tightly coupling base tokens to individual components.        
          "
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >
        <mui-v-stack space="var(--space-700)">
  
          <spec-card title="Feedback States" description="User feedback (alerts, messages, forms, badges etc.)">
            <story-token-slat slot="body" token="--feedback-neutral-border-color" variant="color" output="var(--grey-600)"></story-token-slat>  
            <story-token-slat slot="body" token="--feedback-positive-border-color" variant="color" output="var(--green-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-border-color" variant="color" output="var(--blue-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-border-color" variant="color" output="var(--orange-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-border-color" variant="color" output="var(--red-600)"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-border" variant="border" output="var(--stroke-size-200) var(--stroke-solid)
            var(--feedback-neutral-border-color)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-border" variant="border" output="var(--stroke-size-200) var(--stroke-solid)
            var(--feedback-positive-border-color)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-border" variant="border" output="var(--stroke-size-200) var(--stroke-solid)
            var(--feedback-info-border-color)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-border" variant="border" output="var(--stroke-size-200) var(--stroke-solid)
            var(--feedback-warning-border-color)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-border" variant="border" output="var(--stroke-size-200) var(--stroke-solid)
            var(--feedback-attention-border-color)"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-background" variant="color" output="var(--grey-100)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-background" variant="color" output="var(--green-100)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-background" variant="color" output="var(--blue-100)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-background" variant="color" output="var(--orange-100)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-background" variant="color" output="var(--red-100)"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-icon" variant="color" output="var(--grey-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-icon" variant="color" output="var(--green-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-icon" variant="color" output="var(--blue-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-icon" variant="color" output="var(--orange-600)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-icon" variant="color" output="var(--red-600)"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-text" variant="text-color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-text" variant="text-color" output="var(--green-900)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-text" variant="text-color" output="var(--blue-900)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-text" variant="text-color" output="var(--orange-900)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-text" variant="text-color" output="var(--red-900)"></story-token-slat>

            <story-token-slat slot="body" token="--feedback-neutral-action-background" variant="color" output="var(--grey-200)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-positive-action-background" variant="color" output="var(--green-200)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-info-action-background" variant="color" output="var(--blue-200)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-warning-action-background" variant="color" output="var(--orange-200)"></story-token-slat>
            <story-token-slat slot="body" token="--feedback-attention-action-background" variant="color" output="var(--red-200)"></story-token-slat>

          </spec-card>

          <spec-card title="Action" description="Defines the visual style and interaction behavior of elements like buttons and links, reflecting their intended purpose.">
            <story-token-slat slot="body" token="--action-font-size" variant="text-size" output="var(--text-font-size)"></story-token-slat>
            <story-token-slat slot="body" token="--action-line-height" variant="line-height" output="var(--text-line-height)"></story-token-slat>
            <story-token-slat slot="body" token="--action-font-weight" variant="font-weight" output="var(--font-weight-medium)"></story-token-slat>
            <story-token-slat slot="body" token="--action-radius" variant="radius" output="var(--radius-100)"></story-token-slat>
          </spec-card>

          <spec-card title="Action / Primary" description="Used for the most important action on a page or UI surface.">
            <story-token-slat slot="body" token="--action-primary-stroke" variant="border-color" output="var(--black-opacity-0)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background" variant="color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background-hover" variant="color" output="var(--grey-1000)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background-focus" variant="color" output="var(--grey-1000)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-background-disabled" variant="color" output="var(--grey-200)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color" variant="text-color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color-hover" variant="text-color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color-focus" variant="text-color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-primary-text-color-disabled" variant="text-color" output="var(--grey-400)"></story-token-slat>
          </spec-card>


          <spec-card title="Action / Secondary" description="Used for supporting actions that aren’t the main focus but are still important.">
            <story-token-slat slot="body" token="--action-secondary-stroke" variant="border-color" output="var(--grey-800)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background" variant="color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background-hover" variant="color" output="var(--grey-100)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background-focus" variant="color" output="var(--grey-100)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-background-disabled" variant="color" output="var(--grey-100)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color" variant="text-color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color-hover" variant="text-color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color-focus" variant="text-color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--action-secondary-text-color-disabled" variant="text-color" output="var(--grey-400)"></story-token-slat>
          </spec-card>

          <spec-card title="Action / Tertiary" description="Minimal styling — usually text-only — used where subtlety is preferred.">
            <story-token-slat slot="body" token="--action-tertiary-stroke" variant="border-color" output="var(--white-opacity-0)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background" variant="color" output="var(--white-opacity-0)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background-hover" variant="color" output="var(--black-opacity-10)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background-focus" variant="color" output="var(--black-opacity-10)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-background-disabled" variant="color" output="var(--grey-100)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color" variant="text-color" output="var(--grey-900)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color-hover" variant="text-color" output="var(--grey-1000)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color-focus" variant="text-color" output="var(--grey-1000)"></story-token-slat>
            <story-token-slat slot="body" token="--action-tertiary-text-color-disabled" variant="text-color" output="var(--grey-400)"></story-token-slat>
          </spec-card>

          <spec-card title="Action / Attention" description="High-visibility actions that require caution, often associated with risk or disruption.">
            <story-token-slat slot="body" token="--action-attention-stroke" variant="border-color" output="var(--black-opacity-0)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background" variant="color" output="var(--red-500)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background-hover" variant="color" output="var(--red-600)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background-focus" variant="color" output="var(--red-600)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-background-disabled" variant="color" output="var(--red-100)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color" variant="text-color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color-hover" variant="text-color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color-focus" variant="text-color" output="var(--white)"></story-token-slat>
            <story-token-slat slot="body" token="--action-attention-text-color-disabled" variant="text-color" output="var(--red-300)"></story-token-slat>
          </spec-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("tokens-semantic", tokensSemantic);
