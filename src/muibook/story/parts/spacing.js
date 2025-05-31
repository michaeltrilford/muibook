class partsSpacing extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Spacing Parts"
        description="Allows flexible styling overrides with customisable part names, supporting trusted customisation and scoped CSS in MUI web components."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/utils/part-map/index.ts"
        >
        <mui-v-stack space="var(--space-700)">

          <spec-card title="Padding">
            <story-part-slat slot="body" token="part(padding)" usage="Links, Buttons, Stacks, Grid, Body" output="Defines the padding of the element." ></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(padding) {
              <br />
              &nbsp;&nbsp;padding: var(--space-100);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Margin">
            <story-part-slat slot="body" token="part(margin)" usage="Links, Buttons, Stacks, Grid, Body" output="Defines the margin of the element." ></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(margin) {
              <br />
              &nbsp;&nbsp;margin: var(--space-100);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Gap">
            <story-part-slat slot="body" token="part(gap)" usage="Links, Buttons, Stacks, Grid, Body" output="Defines the gap between items when using Flex or Grid" ></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(gap) {
              <br />
              &nbsp;&nbsp;gap: var(--space-100);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Width">
            <story-part-slat slot="body" token="part(width)" usage="Links, Buttons, Stacks, Grid, Body" output="Defines the width of elements"></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(width) {
              <br />
              &nbsp;&nbsp;width: 50rem;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Height">
            <story-part-slat slot="body" token="part(height)" usage="Links, Buttons, Stacks, Grid, Body" output="Defines the height of elements"></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(height) {
              <br />
              &nbsp;&nbsp;height: 50rem;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Box Sizing">
            <story-part-slat slot="body" token="part(box-sizing)" usage="Links, Buttons, Stacks, Grid, Body" output="Defines how the object reacts to padding."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(box-sizing) {
              <br />
              &nbsp;&nbsp;box-sizing: border-box;
              <br />
              }
            </mui-code>
          </spec-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("parts-spacing", partsSpacing);
