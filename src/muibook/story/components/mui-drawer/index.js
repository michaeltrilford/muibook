import { getComponentDocs } from "../../../utils/story-data";

import MaxAvatar from "../../../images/mui/avatar-max.png";
import JulieAvatar from "../../../images/mui/avatar-julie.png";

class storyDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Drawer");
    const styles = /*css*/ `
      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      :host { display: block; }

      .canvas {
        background: var(--surface);
        padding: 1px;
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

      mui-container { min-width: initial; } 

      .menu-item {
        text-align: left;
      }
      .menu-item::part(padding) {
        padding: var(--space-300) var(--space-500);
        border-radius: 0;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }

      .page-header {
        background: var(--drawer-background);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
        min-height: 7.7rem;
      }

      .page-main {
        background: var(--surface-elevated-200);
      }

      .page-content {
        padding: var(--space-500) var(--space-500);
        box-sizing: border-box;
        overflow: scroll;
      }

      @media (max-width: 768px) {
        .page-content {
          height: auto;
        }
      }
      
      .video-menu-item,
      .video-menu-more,
      .video-menu-group-heading { text-align: left; }

      .video-menu-more {
        margin: var(--space-100);
      }

      .video-menu-more_hero {
        margin-left: calc(var(--space-300) + var(--space-025));
        margin-right: calc(var(--space-300) + var(--space-025));
      }

      mui-avatar { margin-right: var(--space-050); }

      .video-menu-group-heading {
        margin-bottom: var(--space-200);
      }

      .video-menu-group {
        width: 100%;
      }
      .video-menu-group::part(padding) {
        padding: var(--space-300) var(--space-200);
      }

    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{mui-body}, {mui-elements}, {elements}",
        default: "(required)",
        description: "Slot in content to be displayed within the drawer.",
      },
      {
        name: "slot=&#8220;title&#8221;",
        type: "slot (named)",
        options: "{mui-heading}, {mui-elements}, {elements}",
        default: "",
        description: "Slot in a heading element to title the drawer.",
      },
      {
        name: "slot=&#8220;page&#8221;",
        type: "slot (named)",
        options: "{mui-elements}, {elements}",
        default: "",
        description:
          "Used for the Persistent or Push drawer variants. The page content is slotted here, and the drawer sits alongside it (either left or right depending on the side attribute).",
      },
      {
        name: "slot=&#8220;actions&#8221;",
        type: "slot (named)",
        options: "Cancel/Save, etc.",
        default: "",
        description:
          "Slot in action buttons for the drawer, always placed in the footer. refer to mui-button documentation for use.",
      },
      {
        name: "side",
        type: "string",
        options: "left, right",
        default: "left",
        description: "Choose the position of the drawer",
      },
      {
        name: "breakpoint",
        type: "string",
        options: "0 or higher",
        default: "768",
        description: "Adjust the breakpoint. Set it to 0 if you want to turn it off completely.",
      },
      {
        name: "variant",
        type: "string",
        options: "overlay, persistent, push",
        default: "overlay",
        description: "Choose the type of drawer",
      },
      {
        name: "width",
        type: "string",
        options: "px, %, em, rem, etc.",
        default: "350px",
        description: "Set the width of the drawer.",
      },
      {
        name: "z-index",
        type: "string",
        options: "",
        default: "110",
        description:
          "Adjust the z-index to adjust the placwement when using with other local components, such as navigation.",
      },
      {
        name: "open",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Pair with state to toggle the visibility of the drawer. Alternatively, use an element with the same data-drawer value to open the drawer.",
      },
      {
        name: "data-drawer",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Recommended to pair with an element that has the same data-drawer value to open the drawer. Refer to code examples.",
      },
      {
        name: "drawer-space",
        required: false,
        type: "string",
        options: "none",
        default: "",
        description: "Turn off the padding inside the body of the drawer body section.",
      },
      {
        name: "aria-labelledby",
        type: "boolean",
        options: "drawer-title-2",
        default: "",
        description:
          "Add an element with the same id as the value to provide an accessible name for the drawer. Refer to code examples.",
      },
      {
        name: "aria-describedby",
        type: "boolean",
        options: "drawer-desc-2",
        default: "",
        description:
          "Add an element with the same id as the value to provide an accessible description for the drawer. Refer to code examples.",
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
        `,
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

    const closePropItems = [
      {
        name: "data-close",
        type: "boolean",
        options: "",
        default: "",
        description:
          "Add the boolean and state to an action within the footer that closes the drawer. Refer to code examples.",
      },
    ];

    const closeRows = closePropItems
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
        `,
      )
      .join("");

    const closeAccordions = closePropItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === closePropItems.length - 1 ? "last-child" : "";

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

    const invoiceHeader = /*html*/ `
      <mui-h-stack space="var(--space-300)" alignY="center">
        <mui-heading size="4" level="4">New Invoice</mui-heading>
        <mui-badge>Preview</mui-badge>
      </mui-h-stack>
    `;

    const content = /*html*/ `
      <mui-v-stack space="var(--space-300);">
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>  
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
      </mui-v-stack>
    `;

    const invoice = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">
      
        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>  
            <div style="height:var(--heading-font-size-100); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-100); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);">
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const bill = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">

        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);" alignX="end">
            <div style="height: 0.8rem; width: 40px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 30px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-grid col="1fr auto">
          <mui-v-stack space="var(--space-300);" alignX="end">
            <div style="height: 9.6rem; width: 180px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-grid>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height: 1.6rem; width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>

          <mui-v-stack space="var(--space-100);">
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const reviewStepper = /*html*/ `
        <mui-v-stack space="0" style="margin-bottom: var(--space-400);">
          <div 
            style="
              background: var(--surface-elevated-200);
              padding: var(--space-400);
              border-top-left-radius: var(--radius-300); 
              border-top-right-radius: var(--radius-300); 
              border: var(--border-thin);
            "
          >
            <mui-body size="small" weight="bold">Guru has prefilled the fields</mui-body>
            <mui-body size="small">Review the items and proceed</mui-body>
          </div>
          <div 
            style="
              background: var(--surface-elevated-200);
              padding: var(--space-400) 0 var(--space-500);
              border-bottom-left-radius: var(--radius-300); 
              border-bottom-right-radius: var(--radius-300); 
              border: var(--border-thin);
                border-top: none;
            "
          >
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
        </mui-v-stack>
      `;

    const menuBillItems = /*html*/ `
      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--drawer-background);">
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Home">
            <mui-icon-home slot="before"></mui-icon-home>
            Home
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Shorts">
            <mui-icon-play-stack slot="before"></mui-icon-play-stack>
            Shorts
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            Subscriptions
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Real Estate">        
            <mui-avatar slot="before" size="small" image="${MaxAvatar}" label="Real Estate Profile Image"></mui-avatar>
            Real Estate
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Jazz Beats">        
            <mui-avatar slot="before" size="small" label="Jazz Beats"></mui-avatar>
            Jazz Beats
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Julie Cooks">
            <mui-avatar slot="before" size="small" image="${JulieAvatar}" label="Julie Cooks Profile Image"></mui-avatar>
            Julie Cooks
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Sidebar Court">        
            <mui-avatar slot="before" size="small" label="Sidebar Court">
              <mui-icon-left-sidebar></mui-icon-left-sidebar>
            </mui-avatar>
            Sidebar Court
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Hot Grill">        
            <mui-avatar slot="before" size="small" label="Hot Grill" background="attention">
              <mui-icon-sun></mui-icon-sun>
            </mui-avatar>
            Hot Grill
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more video-menu-more_hero" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            You
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Playlists">
            <mui-icon-list-and-film slot="before"></mui-icon-list-and-film>
            Playlists
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your videos">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Your videos
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Downloads">
            <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
            Downloads
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Explore">
            Explore
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Music">
            <mui-icon-music-microphone slot="before"></mui-icon-music-microphone>
            Music
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Movies & TV">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Movies & TV
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Gaming">
            <mui-icon-game-controller slot="before"></mui-icon-game-controller>
            Gaming
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
      </mui-v-stack>
    `;

    const menuItems = /*html*/ `
      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--drawer-background);">
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Home">
            <mui-icon-home slot="before"></mui-icon-home>
            Home
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Shorts">
            <mui-icon-play-stack slot="before"></mui-icon-play-stack>
            Shorts
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            Subscriptions
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Real Estate">        
            <mui-avatar slot="before" size="small" image="${MaxAvatar}" label="Real Estate Profile Image"></mui-avatar>
            Real Estate
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Jazz Beats">        
            <mui-avatar slot="before" size="small" label="Jazz Beats"></mui-avatar>
            Jazz Beats
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Julie Cooks">
            <mui-avatar slot="before" size="small" image="${JulieAvatar}" label="Julie Cooks Profile Image"></mui-avatar>
            Julie Cooks
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Sidebar Court">        
            <mui-avatar slot="before" size="small" label="Sidebar Court">
              <mui-icon-left-sidebar></mui-icon-left-sidebar>
            </mui-avatar>
            Sidebar Court
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Hot Grill">        
            <mui-avatar slot="before" size="small" label="Hot Grill" background="attention">
              <mui-icon-sun></mui-icon-sun>
            </mui-avatar>
            Hot Grill
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more video-menu-more_hero" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            You
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Playlists">
            <mui-icon-list-and-film slot="before"></mui-icon-list-and-film>
            Playlists
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your videos">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Your videos
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Downloads">
            <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
            Downloads
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Explore">
            Explore
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Music">
            <mui-icon-music-microphone slot="before"></mui-icon-music-microphone>
            Music
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Movies & TV">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Movies & TV
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Gaming">
            <mui-icon-game-controller slot="before"></mui-icon-game-controller>
            Gaming
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
      </mui-v-stack>
    `;

    const stories = /*html*/ `
    
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-drawer";<br>
        </mui-code>
      </spec-card>

      <mui-v-stack space="var(--space-400)">
        <props-card title="Drawer">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>
        <props-card title="Close">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${closeRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${closeAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </props-card>
      </mui-v-stack>

      <story-card id="drawer-overlay-left" title="Overlay Left" description="The drawer is positioned fixed to the viewport edge">
        <mui-button variant="primary" data-drawer="drawer-1" slot="body">Open</mui-button>
        
        <mui-drawer variant="overlay" data-drawer="drawer-1" side="left" slot="body" z-index="200">
            <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
              <guides-logo style="width: 24px;"></guides-logo>
              <mui-heading size="4" level="4">Guides</mui-heading>
            </mui-h-stack>
            ${content}
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="left"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Overlay Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card id="drawer-overlay-right" title="Overlay Right" description="The drawer is positioned fixed to the viewport edge">
        <mui-button variant="primary" data-drawer="drawer-2" slot="body">Open</mui-button>
        
        <mui-drawer variant="overlay" data-drawer="drawer-2" width="400px" side="right" slot="body" z-index="200">
          <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
            <guides-logo style="width: 24px;"></guides-logo>
            <mui-heading size="4" level="4">Guides</mui-heading>
          </mui-h-stack>
          ${content}
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="right"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Overlay Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card id="drawer-overlay-no-header" title="Overlay: No Header" description="If no header if used, ensure there is a way for the user to cancel out of the view, especially on mobile.">
        <mui-button variant="primary" data-drawer="overlay-no-header" slot="body">Open</mui-button>
        
        <mui-drawer variant="overlay" data-drawer="overlay-no-header" width="400px" side="left" slot="body" z-index="200">
          ${content}
          <mui-button slot="actions" variant="secondary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="left"&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card id="drawer-overlay-no-footer" title="Overlay: No Footer" description="If no footer if used, ensure there is a way for the user to cancel out of the view, especially on mobile.">
        <mui-button variant="primary" data-drawer="overlay-no-footer" slot="body">Open</mui-button>
        
        <mui-drawer variant="overlay" data-drawer="overlay-no-footer" width="400px" side="left" slot="body" z-index="200">
          <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
            <guides-logo style="width: 24px;"></guides-logo>
            <mui-heading size="4" level="4">Guides</mui-heading>
          </mui-h-stack>
          ${content}
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="left"&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-push-left"
        title="Push Left" 
        description="The Push Drawer slides in from the left and shifts the page content to the right. It creates a clear separation between the drawer and the main content, keeping focus while ensuring the full page remains accessible. On mobile, the drawer overlays the content."
        usage="
          This variant is intended for full-screen page views rather than smaller page sections.|||
          Use layout components or styles to ensure the push/persistent variants span viewport correct.|||
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.|||
          If an alternative mobile view is required, use state or media queries to swap the drawer out.|||
          See the <mui-link size='x-small' target='_blank' href='#/push-left'>full-screen example</mui-link>
        "
      >
        <div class="canvas" slot="body">  
          <mui-drawer variant="push" data-drawer="drawer-3" width="320px" side="left" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-menu size="medium"></mui-icon-menu></mui-button>
                  <mui-button variant="tertiary" data-drawer="drawer-3">Edit Details</mui-button>
                  <mui-button disabled variant="tertiary">Add line-item</mui-button>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close>Cancel</mui-button>
            <mui-button slot="actions" variant="primary">Save</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="push" data-drawer="hook" width="320px" side="left"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card 
        id="drawer-push-right"
        title="Push Right" 
        description="The Push Drawer slides in from the right and shifts the page content to the left. It creates a clear separation between the drawer and the main content, keeping focus while ensuring the full page remains accessible. On mobile, the drawer overlays the content."
        usage="
          This variant is intended for full-screen page views rather than smaller page sections.|||
          Use layout components or styles to ensure the push/persistent variants span viewport correct.|||
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.|||
          If an alternative mobile view is required, use state or media queries to swap the drawer out.|||
          See the <mui-link size='x-small' target='_blank' href='#/push-right'>full-screen example</mui-link>
        "
      >
        <div class="canvas" slot="body">
          <mui-drawer slot="body" variant="push" data-drawer="drawer-4" width="320px" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-menu size="medium"></mui-icon-menu></mui-button>
                  <mui-button variant="tertiary" data-drawer="drawer-4">Edit Details</mui-button>
                  <mui-button disabled variant="tertiary">Add line-item</mui-button>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close>Cancel</mui-button>
            <mui-button slot="actions" variant="primary">Save</mui-button>
          </mui-drawer>
        </div>  
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="push" data-drawer="hook" width="320px" side="right"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card 
        id="drawer-persistent-right"
        title="Persistent Right" 
        description="The Persistent Drawer remains fixed in place without sliding in or out. It is positioned on the right side of the main content and becomes part of the layout itself. On mobile, the view naturally stacks vertically."
        usage="
          This variant is intended for full-screen page views rather than smaller page sections.|||
          Use layout components or styles to ensure the push/persistent variants span viewport correctly.|||
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.|||
          See the <mui-link size='x-small' target='_blank' href='#/persistent-right'>full-screen example</mui-link>
        "
      >
        <div class="canvas" slot="body">
          <mui-drawer variant="persistent" width="320px" slot="body" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                <mui-heading size="4" level="4">Smart Bills</mui-heading>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>

            ${reviewStepper}

            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Item" value="Hank Barry"></mui-input>
                <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
                <mui-input label="Allocate to" value="Internet"></mui-input>
                <mui-input label="Qty" value="1"></mui-input>
                <mui-input label="Unit price" value="85.50"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary">Back</mui-button>
            <mui-button slot="actions" variant="primary">Next</mui-button>
          </mui-drawer>
        </div>  
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="persistent" width="320px" side="right"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
       id="drawer-persistent-left"
        title="Persistent Left"
        description="The Persistent Drawer remains fixed in place without sliding in or out. It is positioned on the left side of the main content and becomes part of the layout itself. On mobile, the view naturally stacks vertically."
        usage="
          This variant is intended for full-screen page views rather than smaller page sections.|||
          Use layout components or styles to ensure the push/persistent variants span viewport correctly.|||
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.|||
          See the <mui-link size='x-small' target='_blank' href='#/persistent-left'>full-screen example</mui-link>
        "
      >
        <div class="canvas" slot="body">
          <mui-drawer variant="persistent" width="320px" slot="body" side="left" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                <mui-heading size="4" level="4">Smart Bills</mui-heading>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>

            ${reviewStepper}

            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Item" value="Hank Barry"></mui-input>
                <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
                <mui-input label="Allocate to" value="Internet"></mui-input>
                <mui-input label="Qty" value="1"></mui-input>
                <mui-input label="Unit price" value="85.50"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary">Back</mui-button>
            <mui-button slot="actions" variant="primary">Next</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="persistent" width="320px" side="left"&gt;<br>
            &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
       id="drawer-menu"
        title="Menu"
        description="Uses the built-in heading and close button to provide a clear way to close the panel, while also presenting additional context through the header section."
      >
        <div class="canvas" slot="body">
          <mui-drawer variant="push" width="260px" side="left" z-index="200" data-drawer="hook" drawer-space="none">
            <div slot="page" class="page-main">
              <div class="page-header">
                <mui-h-stack space="var(--space-200)" alignY="center">
                  <mui-button variant="tertiary" data-drawer="hook">
                    <mui-icon-menu size="medium"></mui-icon-menu>
                  </mui-button>
                  <mui-heading size="4" level="4">Premium</mui-heading>
                </mui-h-stack>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
              <guides-logo style="width: 24px;"></guides-logo>
              <mui-heading size="4" level="4">Guru</mui-heading>
            </mui-h-stack>

            ${menuBillItems}
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="push" width="320px" side="left" data-drawer="hook" drawer-space="none"&gt;<br>
            &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
       id="drawer-advanced-menu"
        title="Advanced Menu"
        description="Crafting the responsive behaviour using mui-responsive and alternative variants."
        usage="
          Omit the header and using a custom header and action that has 'data-close' to toggle the view|||
          Use mui-responsive component to toggle state and components between desktop and mobile.
        "
      >
        <div class="canvas" slot="body">

          <div class="page-header" style="padding-left: var(--space-400);">
            <mui-h-stack space="var(--space-300)" alignY="center">

              <mui-responsive breakpoint="768">
                <mui-button slot="showAbove" variant="tertiary" data-drawer-toggle="custom-header-toggle">
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
                <mui-button slot="showBelow" variant="tertiary" data-drawer="custom-header-overlay">
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
              </mui-responsive>

              <mui-h-stack space="var(--space-100)" alignY="center">
                <guides-logo style="width: 24px;"></guides-logo>
                <mui-heading size="4" level="4">Guru</mui-heading>
              </mui-h-stack>
            </mui-h-stack>
          </div>

          <mui-responsive breakpoint="768">

            <mui-drawer 
              slot="showAbove" 
              variant="push" 
              width="260px" 
              side="left" 
              data-drawer-toggle="custom-header-toggle" 
              drawer-space="none"
            >
              ${menuItems}
              <div slot="page" class="page-main">
                <div class="page-content">
                  ${bill}
                </div>
              </div>
              
            </mui-drawer>

            <div slot="showBelow">
              <mui-drawer 
                variant="overlay" 
                width="260px" 
                side="left" 
                z-index="200" 
                data-drawer="custom-header-overlay" 
                drawer-space="none"
              >
                
              <mui-h-stack space="var(--space-300)" alignY="center" style="padding: var(--space-300) var(--space-500) var(--space-300) var(--space-400)">
                <mui-button variant="tertiary" data-close>
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
                <mui-h-stack space="var(--space-100)" alignY="center">
                  <guides-logo style="width: 24px;"></guides-logo>
                  <mui-heading size="4" level="4">Guides</mui-heading>
                </mui-h-stack>
              </mui-h-stack>

                ${menuItems}
              </mui-drawer>
              <div class="page-main">
                <div class="page-content">
                  ${bill}
                </div>
              </div>
            </div>

          </mui-responsive>

        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="push" width="320px" side="left" data-drawer-toggle="hook" drawer-space="none"&gt;<br>
            &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card 
        id="drawer-breakpoint"
        title="Breakpoint" 
        description="Adjust the default breakpoint for the mobile view."
        usage="
          If you want to use media queries or state to introudce a completely different mobile view, you can set the breakpoint '0' to avoid the mobile view from appearing.|||
          Alternatively, if you need to override the default 768px cutoff, you can provide a custom value for breakpoint (for example, 1024) to control when the drawer switches to its mobile behavior.
        "

      >
        <div class="canvas" slot="body">
          <mui-drawer slot="body" variant="push" breakpoint="1500" data-drawer="breakpoint" width="320px" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-menu size="medium"></mui-icon-menu></mui-button>
                  <mui-button variant="tertiary" data-drawer="breakpoint">Edit Details</mui-button>
                  <mui-button disabled variant="tertiary">Add line-item</mui-button>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close>Cancel</mui-button>
            <mui-button slot="actions" variant="primary">Save</mui-button>
          </mui-drawer>
        </div>  
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="push" data-drawer="hook" width="320px" side="right"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
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
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="drawer-overlay-left::Overlay Left|||drawer-overlay-right::Overlay Right|||drawer-overlay-no-header::Overlay: No Header|||drawer-overlay-no-footer::Overlay: No Footer|||drawer-push-left::Push Left|||drawer-push-right::Push Right|||drawer-persistent-left::Persistent Left|||drawer-persistent-right::Persistent Right|||drawer-menu::Menu|||drawer-advanced-menu::Advanced Menu|||drawer-breakpoint::Breakpoint"
        ></story-quicklinks>

        ${stories}
      </story-template>
    `;

    // Open drawer buttons
    this.shadowRoot.querySelectorAll("mui-button[data-drawer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-drawer");
        const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer="${target}"]`);
        if (drawer) drawer.setAttribute("open", "");
      });
    });

    // Close buttons inside each drawer
    this.shadowRoot.querySelectorAll("mui-drawer[data-drawer]").forEach((drawer) => {
      drawer.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => drawer.removeAttribute("open"));
      });
    });

    // Toggle drawer buttons
    this.shadowRoot.querySelectorAll("mui-button[data-drawer-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-drawer-toggle");
        const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer-toggle="${target}"]`);
        if (!drawer) return;

        if (drawer.hasAttribute("open")) {
          drawer.removeAttribute("open");
        } else {
          drawer.setAttribute("open", "");
        }
      });
    });

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    this.shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = this.shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-drawer", storyDrawer);
