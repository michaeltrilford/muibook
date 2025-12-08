import { getComponentDocs } from "../../../utils/story-data";
import MaxAvatar from "../../../images/mui/avatar-max.png";
import JulieAvatar from "../../../images/mui/avatar-julie.png";

class storyAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Avatar");

    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface-elevated-100);
        padding: var(--space-600);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

      .group-item { text-align: left; }

      .group {
        width: 100%;
        margin: 0 auto;
        padding: var(--space-100);
        box-sizing: border-box;
        background: var(--surface-elevated-100);
      } 

    `;

    const propItems = [
      {
        name: "background",
        type: "string",
        options:
          "neutral, positive, warning, attention, purple, violet, pink, magenta, red, orange, amber, yellow, lime, green, teal, cyan, blue, indigo",
        default: "neutral",
        description: "Background color variant to use inside the avatar. Includes semantic and random profile colors.",
      },
      {
        name: "background-color",
        type: "string",
        options: "-",
        default: "-",
        description: "Escape hatch to use a custom background color inside the avatar.",
      },
      {
        name: "image",
        type: "string",
        options: "-",
        default: "-",
        description: "Path to image to be used inside the avatar.",
      },
      {
        name: "label",
        type: "string",
        options: "-",
        default: "-",
        description: "Accessible label for the avatar, used for screen readers and initials variant.",
      },
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{text}, mui-icon-[name], {elements}",
        default: "(required)",
        description: "Content placed inside the component. Can include mui-links and text nodes, or both.",
      },
      {
        name: "style",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use styles to add layout based CSS to the host element.",
      },
      {
        name: "class",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
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
          import "@muibook/components/mui-avatar";<br>
        </mui-code>
      </spec-card>

      <props-card title="Avatar">
        <mui-responsive breakpoint="768" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card 
        title="Image" 
        description="" 
        usage=""
        usageLink=""
        accessibility=""
      >
        <div class="canvas" slot="body">
          <mui-h-stack alignY="center">
            <mui-avatar size="x-small" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
            <mui-avatar size="small" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
            <mui-avatar size="medium" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
            <mui-avatar size="large" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
          </mui-h-stack>
        </div>
        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card 
        title="Icon" 
        description="" 
        usage=""
        usageLink=""
        accessibility=""
      >

        <div class="canvas" slot="body">
          <mui-v-stack>
            <mui-h-stack alignY="center">
              <mui-avatar size="x-small" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="small" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="medium" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="large" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
            </mui-h-stack>
          </mui-v-stack>
        </div>

        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card 
        title="Size" 
        description="" 
        usage=""
        usageLink=""
        accessibility=""
      >

        <div class="canvas" slot="body">
          <mui-v-stack>

            <mui-h-stack alignY="start">
              <mui-avatar size="x-small" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              <mui-avatar size="small" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              <mui-avatar size="medium" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              <mui-avatar size="large" image="${MaxAvatar}" label="Max AI"></mui-avatar>
            </mui-h-stack>

            <mui-h-stack alignY="center">
              <mui-avatar size="x-small" label="Max AI"></mui-avatar>
              <mui-avatar size="small" label="Max AI"></mui-avatar>
              <mui-avatar size="medium" label="Max AI"></mui-avatar>
              <mui-avatar size="large" label="Max AI"></mui-avatar>
            </mui-h-stack>
            
            <mui-h-stack alignY="end">
              <mui-avatar size="x-small" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="small" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="medium" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
              <mui-avatar size="large" label="Max AI">
                <mui-icon-calendar size="large"></mui-icon-calendar>
              </mui-avatar>
            </mui-h-stack>

          </mui-v-stack>
        </div>

        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card
        title="Chip Avatars" 
        description="When an Avatar is used within a Chip, it inherits the size x-small to help reduce configuration and adopt design decisions." 
        usage=""
        usageLink=""
        accessibility=""
      >
        <div slot="body" class="canvas">
          <mui-v-stack>
            <mui-grid space="var(--space-100)" col="min-content min-content min-content">
              <mui-chip>
                <mui-avatar slot="before" size="x-small" label="Espresso & Muffin Bar" background="neutral">
                  <mui-icon-left-sidebar></mui-icon-left-sidebar>
                </mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="before" label="Espresso & Muffin Bar" background="neutral"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="before" label="Max AI" background="neutral" image="${MaxAvatar}"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="after" label="Espresso & Muffin Bar" background="neutral">
                  <mui-icon-left-sidebar></mui-icon-left-sidebar>
                </mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="after" label="Espresso & Muffin Bar" background="neutral"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip>
                <mui-avatar slot="after" label="Max AI" background="neutral" image="${MaxAvatar}"></mui-avatar>
                Videos
              </mui-chip>
            </mui-grid>

            <mui-grid space="var(--space-100)" col="min-content min-content min-content">
              <mui-chip dismiss>
                <mui-avatar slot="before" size="x-small" label="Espresso & Muffin Bar" background="neutral">
                  <mui-icon-left-sidebar></mui-icon-left-sidebar>
                </mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss>
                <mui-avatar slot="before" label="Espresso & Muffin Bar" background="neutral"></mui-avatar>
                Videos
              </mui-chip>
              <mui-chip dismiss>
                <mui-avatar slot="before" label="Max AI" background="neutral" image="${MaxAvatar}"></mui-avatar>
                Videos
              </mui-chip>
            </mui-grid>
          </mui-v-stack>
        </div>
      </story-card>

      <story-card 
        title="Background" 
        description="Escape hatch to use a custom background color inside the avatar. Ensure the background color stays accessible with the design system text color in all themes." 
        usage=""
        usageLink=""
        accessibility=""
      >
        <mui-grid col="repeat(auto-fill, minmax(48px, 1fr))" space="var(--space-400) var(--space-400)" slot="body" class="canvas">
          <mui-avatar label="Max AI" background="neutral"></mui-avatar>
          <mui-avatar label="Max AI" background="positive"></mui-avatar>
          <mui-avatar label="Max AI" background="warning"></mui-avatar>
          <mui-avatar label="Max AI" background="attention"></mui-avatar>
          <mui-avatar label="Max AI" background="purple"></mui-avatar>
          <mui-avatar label="Max AI" background="violet"></mui-avatar>
          <mui-avatar label="Max AI" background="pink"></mui-avatar>
          <mui-avatar label="Max AI" background="magenta"></mui-avatar>
          <mui-avatar label="Max AI" background="red"></mui-avatar>
          <mui-avatar label="Max AI" background="orange"></mui-avatar>
          <mui-avatar label="Max AI" background="amber"></mui-avatar>
          <mui-avatar label="Max AI" background="yellow"></mui-avatar>
          <mui-avatar label="Max AI" background="lime"></mui-avatar>
          <mui-avatar label="Max AI" background="green"></mui-avatar>
          <mui-avatar label="Max AI" background="teal"></mui-avatar>
          <mui-avatar label="Max AI" background="cyan"></mui-avatar>
          <mui-avatar label="Max AI" background="blue"></mui-avatar>
          <mui-avatar label="Max AI" background="indigo"></mui-avatar>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card 
        title="Background Colors" 
        description="Escape hatch to use a custom background color inside the avatar. Ensure the background color stays accessible with the design system text color in all themes." 
        usage=""
        usageLink=""
        accessibility=""
      >
        <div slot="body" class="canvas">
          <mui-avatar label="Max AI" background-color="var(--surface)"></mui-avatar>
        </div>
        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card 
        title="Buttons" 
        description="Buttons can include avatars to represent user actions, they will automatically adjust the size of the avatar based on the button size." 
        usage=""
        usageLink=""
        accessibility=""
      >
        <mui-v-stack slot="body">

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button variant="secondary" size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button disabled variant="tertiary" size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button variant="secondary" size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button disabled variant="tertiary" size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button variant="secondary" size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button disabled variant="tertiary" size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-button variant="primary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button variant="secondary" size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-button>
            <mui-button disabled variant="tertiary" size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-button>
            <mui-button variant="tertiary" size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-button>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card 
        title="Links" 
        description="Links can include avatars to represent user actions, they will automatically adjust the size of the avatar based on the button size." 
        usage=""
        usageLink=""
        accessibility=""
      >
        <mui-v-stack slot="body">

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI (Not recommended)
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link disabled size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI (Not recommended)
            </mui-link>
            <mui-link size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>
        
          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI (Not recommended)
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link disabled size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI (Not recommended)
            </mui-link>
            <mui-link size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI (Not recommended)
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link disabled size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI (Not recommended)
            </mui-link>
            <mui-link size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI (Not recommended)
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link disabled size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI (Not recommended)
            </mui-link>
            <mui-link size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link variant="secondary" size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="x-small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link disabled variant="tertiary" size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="x-small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link variant="secondary" size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="small" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link disabled variant="tertiary" size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="small" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link variant="secondary" size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="medium" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link disabled variant="tertiary" size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="medium" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

          <mui-v-stack alignx="start" aligny="start" space="var(--space-100)" class="group">
            <mui-link variant="primary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link variant="secondary" size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="large" class="group-item" aria-label="Library">
              <mui-avatar slot="before" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              Julie AI
            </mui-link>
            <mui-link disabled variant="tertiary" size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Max AI"></mui-avatar>
              Max AI
            </mui-link>
            <mui-link variant="tertiary" size="large" class="group-item" aria-label="History">        
              <mui-avatar slot="before" label="Hot Grill">
                <mui-icon-calendar></mui-icon-calendar>
              </mui-avatar>
              Hot Grill
            </mui-link>
          </mui-v-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
        </story-code-block>
      </story-card>

      <story-card 
        title="Slat & Card Avatars" 
        description="" 
        usage=""
        usageLink=""
        accessibility=""
      >
        <div slot="body">
          <mui-v-stack slot="body">

            <mui-slat variant="action">
              <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
                <mui-icon-left-sidebar></mui-icon-left-sidebar>
              </mui-avatar>
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small" weight="bold">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Transactions</mui-heading>
                <mui-body>Here’s a summary of recent transactions on your account.</mui-body>
              </mui-card-header>
              <mui-card-body>
                <mui-slat-group>
                  <mui-rule></mui-rule>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Today</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">22 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
                      <mui-icon-left-sidebar></mui-icon-left-sidebar>
                    </mui-avatar>
                    <mui-v-stack  slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-slat-group>
              </mui-card-body>          
            </mui-card>

            <mui-slat variant="action">
              <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
              </mui-avatar>
              <mui-v-stack slot="start" space="0">
                <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
              </mui-v-stack>
              <mui-v-stack space="0" slot="end">
                <mui-body size="x-small">Pending</mui-body>
                <mui-body size="small" weight="bold">-$8.12</mui-body>
              </mui-v-stack>
            </mui-slat>

            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Transactions</mui-heading>
                <mui-body>Here’s a summary of recent transactions on your account.</mui-body>
              </mui-card-header>
              <mui-card-body>
                <mui-slat-group>
                  <mui-rule></mui-rule>
                  <mui-slat variant="header">
                    <mui-heading slot="start" size="6">Today</mui-heading>
                    <mui-h-stack slot="end" alignX="end">
                      <mui-body size="small">22 July 2025</mui-body>
                    </mui-h-stack>
                  </mui-slat>
                  <mui-slat variant="action">
                    <mui-avatar slot="accessory" size="medium" label="Espresso & Muffin Bar" background="neutral">
                    </mui-avatar>
                    <mui-v-stack  slot="start" space="0">
                      <mui-body size="medium" weight="bold">Espresso & Muffin Bar</mui-body>
                      <mui-body size="small">Food & Drink • Richmond, VIC</mui-body>
                    </mui-v-stack>
                  </mui-slat>
                </mui-slat-group>
              </mui-card-body>          
            </mui-card>

          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
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

customElements.define("story-avatar", storyAvatar);
