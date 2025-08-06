class partsLayout extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Layout Parts"
        description="Allows flexible styling overrides with customisable part names, supporting trusted customisation and scoped CSS in MUI web components."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/utils/part-map/index.ts"
        >

          <spec-card title="Display">
            <story-part-slat slot="body" token="part(display)" usage="Link, Button, Stack, Grid, Body" output="Defines the display type of the element." ></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(display) {
              <br />
              &nbsp;&nbsp;display: flex;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Flex">
            <story-part-slat slot="body" token="part(flex)" usage="Link, Button, Stack, Grid, Body" output="..."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(flex) {
              <br />
              &nbsp;&nbsp;flex: 1;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Flex Direction">
            <story-part-slat slot="body" token="part(flex-direction)" usage="Link, Button, Stack, Grid, Body" output="..."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(flex-direction) {
              <br />
              &nbsp;&nbsp;flex-direction: column;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Flex Wrap">
            <story-part-slat slot="body" token="part(flex-wrap)" usage="Link, Button, Stack, Grid, Body" output="..."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(flex-wrap) {
              <br />
              &nbsp;&nbsp;flex-wrap: wrap;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Justify Content">
            <story-part-slat slot="body" token="part(justify-content)" usage="Link, Button, Stack, Grid, Body" output="..."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(justify-content) {
              <br />
              &nbsp;&nbsp;justify-content: center);
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Align Items">
            <story-part-slat slot="body" token="part(align-items)" usage="Link, Button, Stack, Grid, Body" output="Defines the line-height of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(align-items) {
              <br />
              &nbsp;&nbsp;align-items: center;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Align Content">
            <story-part-slat slot="body" token="part(align-content)" usage="Link, Button, Stack, Grid, Body" output="Defines the case of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(align-content) {
              <br />
              &nbsp;&nbsp;align-content: center;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Align Self">
            <story-part-slat slot="body" token="part(align-self)" usage="Link, Button, Stack, Grid, Body" output="Controls the text decoration style (e.g., underline, none)."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(align-self) {
              <br />
              &nbsp;&nbsp;align-self: center;
              <br />
              }
              <br />
            </mui-code>
          </spec-card>

          <spec-card title="Grid Template Columns">
            <story-part-slat slot="body" token="part(grid-template-columns)" usage="Link, Button, Stack, Grid, Body" output="Defines the horizontal alignment of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(grid-template-columns) {
              <br />
              &nbsp;&nbsp;grid-template-columns: 1fr 1fr;
              <br />
              }
            </mui-code>
          </spec-card>


          <spec-card title="Grid Template Rows">
            <story-part-slat slot="body" token="part(grid-template-rows)" usage="Link, Button, Stack, Grid, Body" output="Defines the horizontal alignment of the element."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(grid-template-rows) {
              <br />
              &nbsp;&nbsp;grid-template-rows: 1fr 1fr;
              <br />
              }
            </mui-code>
          </spec-card>


          <spec-card title="Grid Column">
            <story-part-slat slot="body" token="part(grid-column)" usage="Link, Button, Stack, Grid, Body" output="grid-column defines a grid item’s horizontal position and span within a CSS Grid layout. It specifies which columns the item starts and ends on."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(grid-column) {
              <br />
              &nbsp;&nbsp;grid-column:  1 / 3;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Grid Row">
            <story-part-slat slot="body" token="part(grid-row)" usage="Link, Button, Stack, Grid, Body" output="grid-row defines a grid item’s vertical position and span within a CSS Grid layout. It sets which rows the item starts and ends on."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(grid-row) {
              <br />
              &nbsp;&nbsp;grid-row:  1 / 3;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Place Items">
            <story-part-slat slot="body" token="part(place-items)" usage="Link, Button, Stack, Grid, Body" output="place-items sets how items are aligned inside their grid or flex container both vertically and horizontally."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(place-items) {
              <br />
              &nbsp;&nbsp;place-items: center;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Place Content">
            <story-part-slat slot="body" token="part(place-content)" usage="Link, Button, Stack, Grid, Body" output="place-content sets how grid content is aligned vertically and horizontally."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(place-content) {
              <br />
              &nbsp;&nbsp;place-content: center;
              <br />
              }
            </mui-code>
          </spec-card>

          <spec-card title="Text Align">
            <story-part-slat slot="body" token="part(text-align)" usage="Link, Button, Stack, Grid, Body" output="Defines the horizontal alignment of the text."></story-part-slat>
            <mui-code slot="footer">
              mui-v-stack::part(text-align) {
              <br />
              &nbsp;&nbsp;text-align: center;
              <br />
              }
            </mui-code>
          </spec-card>

      </story-template>
    `;
  }
}

customElements.define("parts-layout", partsLayout);
