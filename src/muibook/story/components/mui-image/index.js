import { getComponentDocs } from "../../../utils/story-data";
import Image from "../../../images/story/image-1080.png";

class storyImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Image");

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
      {
        name: "height",
        required: false,
        type: "string",
        options: "{token|rem|px|%}",
        default: "",
        description: "Sets the image frame height.",
      },
      {
        name: "fit",
        required: false,
        type: "string",
        options: "{cover|contain|fill|none|scale-down}",
        default: "contain",
        description: "Maps to object-fit for the slotted image.",
      },
      {
        name: "crop",
        required: false,
        type: "boolean",
        options: "",
        default: "false",
        description: "Enables clipped crop behavior for fixed-height image frames.",
      },
      {
        name: "position",
        required: false,
        type: "string",
        options: "{center|top|left|x y}",
        default: "center center",
        description: "Maps to object-position for focal placement.",
      },
      {
        name: "focal-x",
        required: false,
        type: "number",
        options: "{0-100}",
        default: "",
        description: "Horizontal focal point percentage. Overrides position.",
      },
      {
        name: "focal-y",
        required: false,
        type: "number",
        options: "{0-100}",
        default: "",
        description: "Vertical focal point percentage. Overrides position.",
      },
      {
        name: "zoom",
        required: false,
        type: "number",
        options: "{>0}",
        default: "1",
        description: "Scales the image inside the frame for tighter crops.",
      },
      {
        name: "radius",
        required: false,
        type: "string",
        options: "{token|rem|px}",
        default: "var(--radius-300)",
        description: "Overrides frame border radius.",
      },
      {
        name: "aspect-ratio",
        required: false,
        type: "string",
        options: "{16/9|4/3|1/1}",
        default: "",
        description: "Sets frame aspect ratio.",
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-image";<br>
        </mui-code>
      </spec-card>

      <props-card title="Image">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Single image">
        <div slot="body">
          <mui-image>
            <img slot="image" src="${Image}" alt="Spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Image with caption">
        <div slot="body">
          <mui-image>
            <img slot="image" src="${Image}" alt="Spacing scale illustration" />
            <figcaption slot="caption">Example image</figcaption>
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Spacing scale illustration" /&gt;
          <br />
          &nbsp;&nbsp;&lt;figcaption slot="caption">...&lt;/figcaption&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Cropped Height">
        <div slot="body">
          <mui-image crop height="20rem" fit="cover" focal-x="45" focal-y="32">
            <img slot="image" src="${Image}" alt="Cropped spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image crop height="20rem" fit="cover" focal-x="45" focal-y="32"&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Cropped spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Cropped Centered">
        <div slot="body">
          <mui-image crop height="20rem" fit="cover" position="center center">
            <img slot="image" src="${Image}" alt="Centered crop spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image crop height="20rem" fit="cover" position="center center"&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Centered crop spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Zoom + Aspect Ratio">
        <div slot="body">
          <mui-image crop aspect-ratio="16/9" fit="cover" position="center top" zoom="1.15" radius="var(--radius-400)">
            <img slot="image" src="${Image}" alt="Zoomed spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image crop aspect-ratio="16/9" fit="cover" position="center top" zoom="1.15" radius="var(--radius-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Zoomed spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>


      <story-template 
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
      >
        ${stories}
      </story-template>

    `;
  }
}

customElements.define("story-image", storyImage);
