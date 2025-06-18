class partsText extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Text Parts"
        description="Allows flexible styling overrides with customisable part names, supporting trusted customisation and scoped CSS in MUI web components."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/utils/part-map/index.ts"
        >
        <mui-v-stack space="var(--space-700)">

          <spec-card title="Color">
            <story-part-slat slot="body" token="part(color)" usage="Link, Button, Select" output="Defines the color of the element." ></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(color) {
              <br />
              &nbsp;&nbsp;color: var(--blue-500);
              <br />
              }
              <br />
              <br />
              mui-link::part(color):hover {
              <br />
              &nbsp;&nbsp;color: var(--blue-600);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Font Family">
            <story-part-slat slot="body" token="part(font-family)" usage="Link, Button, Select" output="Defines the font family of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(font-family) {
              <br />
              &nbsp;&nbsp;font-family: var(--font-family);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Font Size">
            <story-part-slat slot="body" token="part(font-size)" usage="Link, Button, Select" output="Defines the font size of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(font-size) {
              <br />
              &nbsp;&nbsp;font-size: var(--size-100);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Font Weight">
            <story-part-slat slot="body" token="part(font-weight)" usage="Link, Button, Select" output="Defines the font weight of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(font-weight) {
              <br />
              &nbsp;&nbsp;font-weight: var(--font-weight-600);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Letter Spacing">
            <story-part-slat slot="body" token="part(letter-spacing)" usage="Link, Button, Select" output="Defines the letter-spacing of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(letter-spacing) {
              <br />
              &nbsp;&nbsp;letter-spacing: var(--space-100);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Line Height">
            <story-part-slat slot="body" token="part(line-height)" usage="Link, Button, Select" output="Defines the line-height of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(line-height) {
              <br />
              &nbsp;&nbsp;line-height: var(--line-height-100);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Text Transform">
            <story-part-slat slot="body" token="part(text-transform)" usage="Link, Button, Select" output="Defines the case of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(text-transform) {
              <br />
              &nbsp;&nbsp;text-transform: uppercase;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Text Decoration">
            <story-part-slat slot="body" token="part(text-decoration)" usage="Link, Button, Select" output="Controls the text decoration style (e.g., underline, none)."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(text-decoration) {
              <br />
              &nbsp;&nbsp;text-decoration: none;
              <br />
              }
              <br />
              <br />
              mui-link::part(text-decoration):hover {
              <br />
              &nbsp;&nbsp;text-decoration: none;
              <br />
              }

            </mui-code>
          </spec-card>

          <spec-card title="Text Align">
            <story-part-slat slot="body" token="part(text-align)" usage="Link, Button, Select" output="Defines the horizontal alignment of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-link::part(text-align) {
              <br />
              &nbsp;&nbsp;text-align: center;
              <br />
              }
            </mui-code>
          </spec-card>

        </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("parts-text", partsText);
