class tokensBase extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .message-primary {
        display: none;
      }
      @media (min-width: 960px) {
        .message-primary {
          display: inline;
        }
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Base"
        description="Base values for core attributes such as color, typography, spacing, and size. These tokens don’t carry meaning or intent — they exist solely to define the brand’s visual foundation."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >
        <mui-message slot="message" variant="info" heading="Theme Behavior on This Page">
          <mui-body>The theme select <span class="message-primary">(top left)</span> will not affect the colors on this page, as it displays tokens from the core <strong>Mui</strong> theme only.</mui-body>
          <mui-body>
            <mui-link href="/#/semantic-design-tokens">Semantic</mui-link>, 
            <mui-link href="/#/contextual-design-tokens">Contextual</mui-link>, 
            <mui-link href="/#/surface-design-tokens">Surface</mui-link>, and 
            <mui-link href="/#/components-design-tokens">Components</mui-link> 
            pages WILL reflect theme examples if selected, since base tokens are mapped to these higher tiers.
          </mui-body>
        </mui-message>

        <mui-v-stack space="var(--space-700)">


          <spec-card title="Font Family">
            <story-token-slat 
              slot="body" 
              token="--font-family"
              variant="font-family">
            </story-token-slat>
          </spec-card>
            
          <spec-card title="Font Scale" description="The font size scale follows a consistent type ramp, using fluid rem values to establish visual hierarchy. Each step in the scale pairs directly with a calculated line-height, enabling predictable, harmonious typography across components and layouts." usage="E.g. --font-size-15 and --line-height-15 is paired.">
            <story-token-slat slot="body" token="--font-size-15" variant="text-size" line-height="--line-height-15"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-25" variant="text-size" line-height="--line-height-25"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-50" variant="text-size" line-height="--line-height-50"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-100" variant="text-size" line-height="--line-height-100"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-200" variant="text-size" line-height="--line-height-200"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-300" variant="text-size" line-height="--line-height-300"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-400" variant="text-size" line-height="--line-height-400"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-500" variant="text-size" line-height="--line-height-500"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-600" variant="text-size" line-height="--line-height-600"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-700" variant="text-size" line-height="--line-height-700"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-800" variant="text-size" line-height="--line-height-800"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-900" variant="text-size" line-height="--line-height-900"></story-token-slat>
            <story-token-slat slot="body" token="--font-size-1000" variant="text-size" line-height="--line-height-1000"></story-token-slat>
          </spec-card>

          <spec-card title="Line-height" description="Line heights are ratio-based and mapped to their corresponding font sizes, ensuring clear vertical rhythm and legibility. This alignment supports scalable, accessible typography that remains balanced at any size." usage="E.g. --font-size-15 and --line-height-15 is paired.">
            <story-token-slat slot="body" token="--line-height-15" variant="line-height" font-size="--font-size-15"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-25" variant="line-height" font-size="--font-size-25"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-50" variant="line-height" font-size="--font-size-50"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-100" variant="line-height" font-size="--font-size-100"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-200" variant="line-height" font-size="--font-size-200"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-300" variant="line-height" font-size="--font-size-300"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-400" variant="line-height" font-size="--font-size-400"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-500" variant="line-height" font-size="--font-size-500"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-600" variant="line-height" font-size="--font-size-600"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-700" variant="line-height" font-size="--font-size-700"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-800" variant="line-height" font-size="--font-size-800"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-900" variant="line-height" font-size="--font-size-900"></story-token-slat>
            <story-token-slat slot="body" token="--line-height-1000" variant="line-height" font-size="--font-size-1000"></story-token-slat>
          </spec-card>

          <spec-card title="Font Weight">
            <story-token-slat slot="body" token="--font-weight-400" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-500" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-600" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-700" variant="font-weight"></story-token-slat>
          </spec-card>

          <spec-card title="Colors / Black">
            <story-token-slat slot="body" token="--black" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-0" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-10" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-20" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-30" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-40" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-50" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-60" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-70" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-80" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-90" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--black-opacity-100" variant="color"></story-token-slat>
          </spec-card>


          <spec-card title="Colors / White">
            <story-token-slat slot="body" token="--white" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-0" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-10" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-20" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-30" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-40" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-50" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-60" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-70" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-80" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-90" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--white-opacity-100" variant="color"></story-token-slat>
          </spec-card>


          <spec-card title="Colors / Grey">

            <story-token-slat slot="body" token="--grey-100" variant="color">
              <div slot="visual" style="width: 16px; height: 16px; background: var(--grey-100); border-radius: 4px;"></div>
            </story-token-slat>

            <story-token-slat slot="body" token="--grey-200" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-300" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-400" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-500" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-600" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-700" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-800" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-900" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--grey-1000" variant="color"></story-token-slat>
          </spec-card>

          <spec-card title="Colors / Red">
            <story-token-slat slot="body" token="--red-100" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-200" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-300" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-400" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-500" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-600" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-700" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-800" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-900" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--red-1000" variant="color"></story-token-slat>
          </spec-card>

          <spec-card title="Colors / Orange">
            <story-token-slat slot="body" token="--orange-100" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-200" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-300" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-400" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-500" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-600" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-700" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-800" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-900" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--orange-1000" variant="color"></story-token-slat>
          </spec-card>

          <spec-card title="Colors / Green">
            <story-token-slat slot="body" token="--green-100" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-200" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-300" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-400" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-500" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-600" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-700" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-800" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-900" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--green-1000" variant="color"></story-token-slat>
          </spec-card>

          <spec-card title="Colors / Blue">
            <story-token-slat slot="body" token="--blue-100" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-200" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-300" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-400" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-500" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-600" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-700" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-800" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--blue-900" variant="color"></story-token-slat> 
            <story-token-slat slot="body" token="--blue-1000" variant="color"></story-token-slat> 
          </spec-card>

          <spec-card title="Radius">
            <story-token-slat slot="body" token="--radius-000" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--radius-100" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--radius-150" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--radius-200" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--radius-300" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--radius-400" variant="radius"></story-token-slat>
          </spec-card>

          <spec-card title="Spacing">
            <story-token-slat slot="body" token="--space-000" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-025" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-050" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-100" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-200" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-300" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-400" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-500" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-600" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-700" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--space-800" variant="size"></story-token-slat>
          </spec-card>

          <spec-card title="Stroke">
            <story-token-slat slot="body" token="--stroke-size-100" variant="border-width"></story-token-slat>
            <story-token-slat slot="body" token="--stroke-size-200" variant="border-width"></story-token-slat>
            <story-token-slat slot="body" token="--stroke-size-300" variant="border-width"></story-token-slat>
            <story-token-slat slot="body" token="--stroke-size-400" variant="border-width"></story-token-slat>
            <story-token-slat slot="body" token="--stroke-size-500" variant="border-width"></story-token-slat>
          </spec-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("tokens-base", tokensBase);
