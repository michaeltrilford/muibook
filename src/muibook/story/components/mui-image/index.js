import Image from "../../../images/story/image-1080.png";

class storyImage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot=&#8220;image&#8221;",
        required: true,
        type: "slot (named)",
        options: "img",
        default: "(required)",
        description: "Slot in an image element.",
      },
      {
        name: "slot=&#8220;caption&#8221;",
        required: true,
        type: "slot (named)",
        options: "figcaption",
        default: "(required)",
        description: "Slot in a caption to support the image.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
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
            heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
            ${isLastChild}>
            <story-type-slat
              slot="detail"
              ${prop.required ? "required" : ""}
              name="${prop.name}"
              type="${prop.type}" 
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>


      <story-template 
        title="Image"
        description="Displays an image with a caption using named slots for clear structure and accessibility."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-image/index.ts"
        guides="https://guides.muibook.com/image"
        accessibility="
          Use meaningful alt text that describes the image’s purpose.;
          Use alt=&#8220;&#8221; for decorative images that don’t convey information.;
          Use the caption slot for extended context, especially for diagrams or UI patterns.
        "
      >

        <mui-v-stack space="var(--space-700)">

          <spec-card title="Import">
            <mui-code slot="footer" size="small" scrollable>
              import "@muibook/components/mui-image";<br>
            </mui-code>
          </spec-card>

          <spec-card title="Props">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </spec-card>

          <story-card title="Single image">
            <div slot="body">
              <mui-image>
                <img slot="image" src="${Image}" alt="Spacing scale illustration" />
              </mui-image>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-image&gt;
              <br />
              &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Spacing scale illustration" /&gt;
              <br />
              &lt;/mui-image&gt;
            </mui-code>
          </story-card>

          <story-card title="Image with caption">
            <div slot="body">
              <mui-image>
                <img slot="image" src="${Image}" alt="Spacing scale illustration" />
                <figcaption slot="caption">Example image</figcaption>
              </mui-image>
            </div>
            <mui-code slot="footer" scrollable>
              &lt;mui-image&gt;
              <br />
              &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Spacing scale illustration" /&gt;
              <br />
              &nbsp;&nbsp;&lt;figcaption slot="caption">...&lt;/figcaption&gt;
              <br />
              &lt;/mui-image&gt;
            </mui-code>
          </story-card>

        </mui-v-stack>

      </story-template>

    `;
  }
}

customElements.define("story-image", storyImage);
