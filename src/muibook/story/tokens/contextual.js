class tokensContextual extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Contextual"
        description=
        "
          We add meaning and intent to <mui-link href='/#/base-design-tokens'>base tokens</mui-link> by naming them for specific use cases or UI contexts. Components and custom patterns then reuse these shared tokens for consistency.
          <br><br>
          Theming can be applied at this layer, allowing for light/dark mode or branding variations as we avoid tightly coupling base tokens to individual components. 
        "
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >
        <mui-v-stack space="var(--space-700)">

          <spec-card title="Text">
            <story-token-slat slot="body" token="--text-color" variant="text-color"></story-token-slat>

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

          <spec-card title="Font Weight">
            <story-token-slat slot="body" token="--font-weight-regular" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-medium" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-semi-bold" variant="font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--font-weight-bold" variant="font-weight"></story-token-slat>
          </spec-card>

          <spec-card title="Border">
          <story-token-slat slot="body" token="--border-color" variant="border-color"></story-token-slat>
          <story-token-slat slot="body" token="--border-thin" variant="border"></story-token-slat>
          <story-token-slat slot="body" token="--border-thick" variant="border"></story-token-slat>
          </spec-card>

          <spec-card title="Outline">
           <story-token-slat slot="body" token="--outline-color" variant="outline-color"></story-token-slat>  
          <story-token-slat slot="body" token="--outline-thin" variant="outline"></story-token-slat>
          <story-token-slat slot="body" token="--outline-medium" variant="outline"></story-token-slat>
          <story-token-slat slot="body" token="--outline-thick" variant="outline"></story-token-slat>
          </spec-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("tokens-contextual", tokensContextual);
