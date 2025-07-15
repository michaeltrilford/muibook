class partsVisual extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Visual Parts"
        description="Allows flexible styling overrides with customisable part names, supporting trusted customisation and scoped CSS in MUI web components."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/utils/part-map/index.ts"
        >
        <mui-v-stack space="var(--space-700)">

          <spec-card title="Background">
            <story-part-slat slot="body" token="part(background)" usage="Link, Button, Select" output="Defines the background of the element." ></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(background) {
              <br />
              &nbsp;&nbsp;background: var(--white-opacity-0);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Border">
            <story-part-slat slot="body" token="part(border)" usage="Link, Button, Select" output="Defines the border of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(border) {
              <br />
              &nbsp;&nbsp;border-color: var(--grey-800);
              <br />
              <br />
              &nbsp;&nbsp;border: 4px solid var(--grey-800);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Border Radius">
            <story-part-slat slot="body" token="part(border-radius)" usage="Link, Button, Select" output="Defines the border radius of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(border-radius) {
              <br />
              &nbsp;&nbsp;border-radius: var(--radius-150);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Box Shadow">
            <story-part-slat slot="body" token="part(box-shadow)" usage="Link, Button, Select" output="Defines the box-shadow of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(box-shadow) {
              <br />
              &nbsp;&nbsp;box-shadow: 0 2px 0 0 var(--grey-300);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Opacity">
            <story-part-slat slot="body" token="part(opacity)" usage="Link, Button, Select" output="Defines the opacity of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(opacity) {
              <br />
              &nbsp;&nbsp;opacity: 0;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Transition">
            <story-part-slat slot="body" token="part(transition)" usage="Link, Button, Select" output="Defines the transition of the element when animation is used."></story-part-slat>
            <mui-code slot="footer"  scrollable>
              mui-link::part(transition) {
              <br />
              &nbsp;&nbsp;transition: opacity 400ms ease-in, transform 100ms ease-in;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Outline">
            <story-part-slat slot="body" token="part(outline)" usage="Link, Button, Select" output="Defines the outline of the element, typically for focus states."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(outline) {
              <br />
              &nbsp;&nbsp;outline: var(outline-thin);
              <br />
              }
            </mui-code>
          </spec-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("parts-visual", partsVisual);
