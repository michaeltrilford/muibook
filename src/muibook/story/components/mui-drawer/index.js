import C from "../../../images/jal/crystal.png";
import D from "../../../images/jal/diamond.png";
import P from "../../../images/jal/premier.png";
import S from "../../../images/jal/sapphire.png";

class storyDrawer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
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
        background: var(--surface-elevated-100);
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

      .persistent-content {
        padding: var(--space-500) var(--space-500);
        box-sizing: border-box;
        height: calc(100dvh - (7.7rem  + (env(safe-area-inset-top) + env(safe-area-inset-bottom)) ));
        overflow: scroll;
      }

      @media (max-width: 768px) {
        .page-content,
        .persistent-content {
          height: auto;
        }
      }
      
      .filter-action::part(height) { height: 4rem; width: 4rem; } 
      .video-menu-item,
      .video-menu-more,
      .video-menu-group-heading { text-align: left; }

      .video-menu-more {
        margin-top: var(--space-200);
      }

      .video-menu-group-heading {
        margin-bottom: var(--space-200);
      }

      .filter { display: grid; width: 100%; position: relative; }
      .filter_chip-scroll { 
        padding: var(--space-600) 6.4rem var(--space-500) var(--space-500); 
        overflow-x: auto;
        -ms-overflow-style: none; /* IE/Edge */
        scrollbar-width: none;     /* Firefox */
        -webkit-overflow-scrolling: touch;
      }

      .filter_chip-scroll::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
      }
      .filter_chip-group {
        width: max-content; 
      }
      .filter_next { 
        background: var(--surface-elevated-200); 
        position: absolute; 
        right: 0; 
        top: var(--space-600); 
        box-shadow: calc(-1 * var(--space-400)) 0 var(--space-200) 0 var(--surface-elevated-200); 
        padding-right: var(--space-500);
      }  
      
      .card_content { padding-left: var(--space-100); }
      .card:hover {
        background: var(--surface-elevated-100);
        transition: box-shadow var(--speed-100);
        box-shadow: 0 0 0 var(--space-400) var(--surface-elevated-100);
        border-top-left-radius: var(--radius-300);
        border-top-right-radius: var(--radius-300);
        border-bottom-left-radius: var(--radius-100);
        border-bottom-right-radius: var(--radius-100);
        cursor: pointer;
      }

      .video-page {
        height: calc(100dvh - 7.7rem);
        overflow-y: scroll;
      }

      .video_grid {
        width: 100%; 
        padding: var(--space-500); 
        padding-top: var(--space-200);
        box-sizing: border-box;
      }

      .video-menu-group {
        width: 100%;
      }
      .video-menu-group::part(padding) {
        padding: var(--space-300) var(--space-200);
      }


      .filter-action.at-end {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (min-width: 768px) {
        .filter_chip-scroll {
          padding: var(--space-600) 8.8rem var(--space-500) var(--space-700); 
        }

        .filter_next { 
          padding-right: var(--space-700);
        }  

        .video_grid {
          width: 100%;
          padding: var(--space-700); 
          padding-top: var(--space-200);
        }

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
        `
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

    const menuItems = /*html*/ `
      <mui-v-stack alignX="stretch" space="var(--space-100)" style="padding-bottom: var(--space-400);">
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
        <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
      </mui-v-stack>
    `;

    const videos = [
      {
        title: "Urban Photography Tips",
        author: "LensMaster",
        views: "120K views • 2 days ago",
        image: D,
      },
      {
        title: "Beginner Yoga Routine",
        author: "Flex & Flow",
        views: "980K views • 1 week ago",
        image: S,
      },
      {
        title: "Amazing Street Food Tour",
        author: "TasteTravels",
        views: "1.1M views • 3 days ago",
        image: D,
      },
      {
        title: "Ultimate Coding 101",
        author: "Dev Explorer",
        views: "450K views • 9 hours ago",
        image: S,
      },
      {
        title: "Minimalist Home Makeover",
        author: "Cozy Living",
        views: "800K views • 4 days ago",
        image: P,
      },
      {
        title: "History of Samurai",
        author: "Ancient Stories",
        views: "2.2M views • 2 weeks ago",
        image: C,
      },
      {
        title: "Daily Productivity Hacks",
        author: "Focus Lab",
        views: "56K views • 6 hours ago",
        image: D,
      },
      {
        title: "Wildlife of the Amazon",
        author: "EcoVision",
        views: "1.9M views • 1 month ago",
        image: P,
      },
      {
        title: "DIY Woodworking Basics",
        author: "Crafted Corner",
        views: "310K views • 5 days ago",
        image: P,
      },
      {
        title: "Piano Chill Beats",
        author: "LoFi House",
        views: "760K views • 3 hours ago",
        image: D,
      },
      {
        title: "Inside Tokyo Nightlife",
        author: "Travel Pulse",
        views: "1.3M views • 1 week ago",
        image: P,
      },
      {
        title: "Ultimate Gym Routine",
        author: "Fit Nation",
        views: "670K views • 2 days ago",
        image: P,
      },
      {
        title: "Building AI Assistants",
        author: "Tech Forge",
        views: "900K views • 10 hours ago",
        image: C,
      },
      {
        title: "The Secrets of Typography",
        author: "Design Lab",
        views: "140K views • 3 weeks ago",
        image: D,
      },
      {
        title: "Relaxing Rain Sounds",
        author: "Calm Channel",
        views: "3.5M views • 1 month ago",
        image: C,
      },
      {
        title: "Speedrunning 101",
        author: "GameMaster",
        views: "280K views • 4 hours ago",
        image: D,
      },
      {
        title: "How to Grow Indoor Plants",
        author: "GreenSpace",
        views: "510K views • 2 days ago",
        image: P,
      },
      {
        title: "Mastering Colour Grading",
        author: "CinePro",
        views: "820K views • 1 week ago",
        image: D,
      },
      {
        title: "Beginner Meditation Guide",
        author: "Peaceful Mind",
        views: "400K views • 8 hours ago",
        image: S,
      },
      {
        title: "Streetwear Lookbook 2024",
        author: "StyleWorks",
        views: "1.7M views • 2 weeks ago",
        image: D,
      },
      {
        title: "Mountain Biking Adventure",
        author: "Ride Wild",
        views: "230K views • 1 day ago",
        image: C,
      },
      {
        title: "Deep Sea Mysteries",
        author: "OceanX",
        views: "2.9M views • 3 weeks ago",
        image: D,
      },
      {
        title: "Quick & Healthy Recipes",
        author: "FoodLab",
        views: "640K views • 12 hours ago",
        image: C,
      },
      {
        title: "Top 10 Indie Games",
        author: "Pixel Corner",
        views: "520K views • 5 days ago",
        image: P,
      },
      {
        title: "Zen Garden Tutorial",
        author: "CalmScape",
        views: "110K views • 2 days ago",
        image: C,
      },
      {
        title: "Cinematic Drone Shots",
        author: "SkyVision",
        views: "1.4M views • 1 week ago",
        image: S,
      },
      {
        title: "How Planes Really Fly",
        author: "AeroTech",
        views: "870K views • 4 days ago",
        image: P,
      },
      {
        title: "Ultimate Coffee Guide",
        author: "Brew Studio",
        views: "300K views • 9 hours ago",
        image: S,
      },
      {
        title: "Fantasy Worldbuilding Tips",
        author: "LoreCrafter",
        views: "480K views • 3 days ago",
        image: P,
      },
      {
        title: "The Art of Animation",
        author: "Frame by Frame",
        views: "2M views • 1 month ago",
        image: S,
      },
    ];

    const videoPageContent = /*html*/ `
      <mui-v-stack slot="page" class="video-page" space="var(--space-000)" alignx="stretch" aligny="start">
        <div class="filter">
          <div class="filter_next">
            <mui-button variant="tertiary" class="filter-action" aria-label="Next filters">
              <mui-icon-right-chevron size="small"></mui-icon-right-chevron>
            </mui-button>
          </div>
          <div class="filter_chip-scroll">
            <mui-grid 
              class="filter_chip-group"
              col="repeat(14, auto)" 
              alignx="start" 
              aligny="center" 
              space="var(--space-200)"
            >
              <mui-chip active>
                <mui-body size="small" variant="default" weight="bold">All</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Gaming</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Podcasts</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Thrillers</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Marco Pierre White</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Italian cuisine</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Roasting</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Music</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Satire</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Hamburgers</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Japan</mui-body>
              </mui-chip>
            </mui-grid>
          </div>
        </div>
        <mui-grid
          class="video_grid"
          alignx="start"
          aligny="start"
          space="var(--space-600)"
          col="repeat(auto-fit, minmax(268px, 1fr))"
        >
          <mui-v-stack alignx="start" aligny="start" space="var(--space-300)" class="card">
            <mui-image variants="image"><img slot="image" src="${D}" alt="Urban Photography Tips" /></mui-image>
            <mui-h-stack alignx="start" aligny="start" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
              <mui-v-stack class="card_content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%;">
                <mui-body size="large" variant="default" weight="bold">Urban Photography Tips</mui-body>
                <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                  <mui-body size="x-small" variant="default" weight="bold">LensMaster</mui-body>
                  <mui-body size="x-small" variant="default" weight="bold">120K views • 2 days ago</mui-body>
                </mui-v-stack>
              </mui-v-stack>
            </mui-h-stack>
          </mui-v-stack>
          <mui-v-stack alignx="start" aligny="start" space="var(--space-300)" class="card">
            <mui-image variants="image"><img slot="image" src="${C}" alt="Beginner Yoga Routine" /></mui-image>
            <mui-h-stack alignx="start" aligny="start" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
              <mui-v-stack class="card_content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%;">
                <mui-body size="large" variant="default" weight="bold">Beginner Yoga Routine</mui-body>
                <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                  <mui-body size="x-small" variant="default" weight="bold">Flex & Flow</mui-body>
                  <mui-body size="x-small" variant="default" weight="bold">980K views • 1 week ago</mui-body>
                </mui-v-stack>
              </mui-v-stack>
            </mui-h-stack>
          </mui-v-stack>

          ${videos
            .map(
              (v) => /*html*/ `
                <mui-v-stack alignx="start" aligny="start" space="var(--space-300)" class="card">
                  <mui-image variants="image"><img slot="image" src="${v.image}" alt="${v.title}" /></mui-image>
                  <mui-h-stack alignx="start" aligny="start" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                    <mui-v-stack class="card_content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%;">
                      <mui-body size="large" variant="default" weight="bold">${v.title}</mui-body>
                      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                        <mui-body size="x-small" variant="default" weight="bold">${v.author}</mui-body>
                        <mui-body size="x-small" variant="default" weight="bold">${v.views}</mui-body>
                      </mui-v-stack>
                    </mui-v-stack>
                  </mui-h-stack>
                </mui-v-stack>`
            )
            .join("\n")}


        </mui-grid>
      </mui-v-stack>
    `;

    const videoMenuItems = /*html*/ `
      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--surface-elevated-100);">

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
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Library">
            <mui-slat-accessory slot="before">
              <mui-icon-left-sidebar size="x-small"></mui-icon-left-sidebar>
            </mui-slat-accessory>
            Outdoors
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="History">
            <mui-slat-accessory slot="before">
              <mui-icon-music-microphone size="x-small"></mui-icon-music-microphone>
            </mui-slat-accessory>
            Music
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your Videos">
            <mui-slat-accessory slot="before">
              <mui-icon-music-microphone size="x-small"></mui-icon-music-microphone>
            </mui-slat-accessory>
            Sauce
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
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
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Library">
            <mui-icon-list-and-film slot="before"></mui-icon-list-and-film>
            Playlists
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="History">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Your videos
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your Videos">
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
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Trending">
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
        description="The Push Drawer slides in from the left and shifts the page content to the left. It creates a clear separation between the drawer and the main content, keeping focus while ensuring the full page remains accessible. On mobile, the drawer overlays the content."
        usage="
          This variant is intended for full-screen page views rather than smaller page sections.;
          Use layout components or styles to ensure the push/persistent variants span viewport correct.;
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.;
          If an alternative mobile view is required, use state or media queries to swap the drawer out.;
          See the <mui-link size='small' target='_blank' href='#/push-left'>full-screen example</mui-link>
        "
      >
        <div class="canvas" slot="body">  
          <mui-drawer variant="push" data-drawer="drawer-3" width="320px" side="left" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
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
          This variant is intended for full-screen page views rather than smaller page sections.;
          Use layout components or styles to ensure the push/persistent variants span viewport correct.;
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.;
          If an alternative mobile view is required, use state or media queries to swap the drawer out.;
          See the <mui-link size='small' target='_blank' href='#/push-right'>full-screen example</mui-link>
        "

      >
        <div class="canvas" slot="body">
          <mui-drawer slot="body" variant="push" data-drawer="drawer-4" width="320px" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
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
          This variant is intended for full-screen page views rather than smaller page sections.;
          Use layout components or styles to ensure the push/persistent variants span viewport correctly.;
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.;
          See the <mui-link size='small' target='_blank' href='#/persistent-right'>full-screen example</mui-link>
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
          This variant is intended for full-screen page views rather than smaller page sections.;
          Use layout components or styles to ensure the push/persistent variants span viewport correctly.;
          Use dynamic width/height or positioning (left, right, top, bottom) so the UI is edge-to-edge.;
          See the <mui-link size='small' target='_blank' href='#/persistent-left'>full-screen example</mui-link>
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
                    <mui-icon-menu></mui-icon-menu>
                  </mui-button>
                  <mui-heading size="4" level="4">Smart Bills</mui-heading>
                </mui-h-stack>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
              <guides-logo style="width: 24px;"></guides-logo>
              <mui-heading size="4" level="4">Guides</mui-heading>
            </mui-h-stack>

            <mui-v-stack alignX="stretch" space="var(--space-100)" style="padding-bottom: var(--space-400);">
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
              <mui-button class="menu-item" variant="tertiary">Item 1<mui-icon-gear slot="before"></mui-icon-gear></mui-button>
            </mui-v-stack>
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
          Omit the header and using a custom header and action that has 'data-close' to toggle the view;
          Use mui-responsive component to toggle state and components between desktop and mobile.
        "
      >
        <div class="canvas" slot="body">

          <div class="page-header" style="padding-left: var(--space-400);">
            <mui-h-stack space="var(--space-300)" alignY="center">

              <mui-responsive breakpoint="768">
                <mui-button slot="showAbove" variant="tertiary" data-drawer-toggle="custom-header-toggle">
                  <mui-icon-menu></mui-icon-menu>
                </mui-button>
                <mui-button slot="showBelow" variant="tertiary" data-drawer="custom-header-overlay">
                  <mui-icon-menu></mui-icon-menu>
                </mui-button>
              </mui-responsive>

              <mui-h-stack space="var(--space-100)" alignY="center">
                <guides-logo style="width: 24px;"></guides-logo>
                <mui-heading size="4" level="4">Guides</mui-heading>
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
                  <mui-icon-menu></mui-icon-menu>
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
        id="drawer-video" 
        title="VideoTube" 
        usage="
          This example demonstrates a responsive drawer menu for a video platform.;
          On desktop, the drawer uses the 'push' variant to shift content and keep it accessible.;
          See the <mui-link size='small' target='_blank' href='#/drawer-video'>full-screen example</mui-link>
        "
      >

        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" style="background: var(--surface-elevated-200);" slot="body">
          <mui-h-stack style="padding: var(--space-400); border-radius: var(--radius-000); background: var(--surface-elevated-100); border-bottom: var(--stroke-size-100) solid var(--border-color);" alignx="space-between" aligny="center">
            <mui-h-stack alignx="start" aligny="center" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000);">

              <mui-responsive breakpoint="768">
                <mui-button slot="showAbove" variant="tertiary" aria-label="Open menu" size="medium" data-drawer-toggle="video-header-toggle">
                  <mui-icon-menu size="small"></mui-icon-menu>
                </mui-button>
                <mui-button slot="showBelow" variant="tertiary" aria-label="Open menu" size="medium" data-drawer="video-header-overlay">
                  <mui-icon-menu size="small"></mui-icon-menu>
                </mui-button>
              </mui-responsive>

              <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
                <mui-heading level="3" size="3">Premium</mui-heading>
                <mui-badge variant="neutral">AU</mui-badge>
              </mui-h-stack>
            </mui-h-stack>

            <mui-responsive breakpoint="768" style="max-width: 70rem; width: 100%;">
              <mui-h-stack slot="showAbove" alignx="center" aligny="center" space="var(--space-300)" style="padding: var(--space-000) var(--space-300) var(--space-000) var(--space-300); width: 100%;">
                <mui-input content="placeholder" state="default" variant="default" placeholder="Search">
                  <mui-button variant="secondary" slot="after" aria-label="Search">
                    <mui-icon-right-chevron></mui-icon-right-chevron>
                  </mui-button>
                </mui-input>
                <mui-button variant="tertiary" aria-label="Settings">
                  <mui-icon-gear></mui-icon-gear>
                </mui-button>
              </mui-h-stack>
            </mui-responsive>

            <mui-h-stack alignx="start" aligny="center" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000);">
              <mui-button variant="primary">Create</mui-button>
              <mui-button variant="tertiary" aria-label="Notifications">
                <mui-icon-notification></mui-icon-notification>
              </mui-button>
            </mui-h-stack>
          </mui-h-stack>
          
          <mui-responsive breakpoint="768">

            <mui-drawer width="240px" variant="push" data-drawer="default" drawer-space="none" open side="left" slot="showAbove" data-drawer-toggle="video-header-toggle">
              ${videoMenuItems}
              ${videoPageContent}
            </mui-drawer>

            <div slot="showBelow">
              <mui-drawer 
                variant="overlay" 
                width="260px" 
                side="left" 
                z-index="200" 
                data-drawer="video-header-overlay" 
                drawer-space="none"
              >
               
              <mui-h-stack style="padding: var(--space-400); border-radius: var(--radius-000); background: var(--surface-elevated-100); border-bottom: var(--stroke-size-100) solid var(--border-color);" alignx="space-between" aligny="center">
                <mui-h-stack alignx="start" aligny="center" space="var(--space-000)">
                  <mui-button variant="tertiary" aria-label="Open menu" size="medium" data-close>
                    <mui-icon-menu size="small"></mui-icon-menu>
                  </mui-button>
                  <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
                    <mui-heading level="3" size="3">Premium</mui-heading>
                    <mui-badge variant="neutral">AU</mui-badge>
                  </mui-h-stack>
                </mui-h-stack>
              </mui-h-stack>

              ${videoMenuItems}
              </mui-drawer>
              ${videoPageContent}
            </div>
          </mui-responsive>
        </mui-v-stack>
      </story-card>

      <story-card 
        id="drawer-breakpoint"
        title="Breakpoint" 
        description="Adjust the default breakpoint for the mobile view."
        usage="
          If you want to use media queries or state to introudce a completely different mobile view, you can set the breakpoint '0' to avoid the mobile view from appearing.;
          Alternatively, if you need to override the default 768px cutoff, you can provide a custom value for breakpoint (for example, 1024) to control when the drawer switches to its mobile behavior.
        "

      >
        <div class="canvas" slot="body">
          <mui-drawer slot="body" variant="push" breakpoint="1500" data-drawer="breakpoint" width="320px" side="right" z-index="200">
            <div slot="page" class="page-main">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right">
                  <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Drawer" 
        description="A drawer view that prompts users to take a specific action or provide additional information without navigating away from the current context."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-drawer/index.ts"
        guides="https://guides.muibook.com/drawer"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=780-4943&t=KhmyUmaNDWKTGtrH-1"
        storybook="https://stories.muibook.com/?path=/docs/content-drawer--docs"
        accessibility="
          Uses role='dialog' for overlay/push variants and role='complementary' for persistent layout variants.;
          Supports aria-labelledby and aria-describedby for accessible titles and descriptions.;
          The close button includes aria-label='Close drawer'.;
          Footer slot is hidden when empty to reduce screen reader noise.;
          When open, consumers must trap focus in the drawer and apply inert/aria-hidden to the background.;
          Backdrop click and Escape close the drawer in overlay and push variants.;
          The component exposes 'mui-drawer-open' and 'mui-drawer-close' events so external state (e.g. React setDrawerOpen(false)) stays in sync with the drawer’s internal logic.
        "
      >
        <mui-message heading="Quicklinks" slot="message">
          <mui-h-stack class="token-item-menu" alignY="center" style="padding-bottom: var(--space-100);">
            <mui-link size="small" data-scroll-link="drawer-overlay-left">Overlay Left</mui-link>
            <mui-link size="small" data-scroll-link="drawer-overlay-right">Overlay Right</mui-link>
            <mui-link size="small" data-scroll-link="drawer-overlay-no-header">Overlay: No Header</mui-link>
            <mui-link size="small" data-scroll-link="drawer-overlay-no-footer">Overlay: No Footer</mui-link>
            <mui-link size="small" data-scroll-link="drawer-push-left">Push Left</mui-link>
            <mui-link size="small" data-scroll-link="drawer-push-right">Push Right</mui-link>
            <mui-link size="small" data-scroll-link="drawer-persistent-left">Persistent Left</mui-link>
            <mui-link size="small" data-scroll-link="drawer-persistent-right">Persistent Right</mui-link>
            <mui-link size="small" data-scroll-link="drawer-menu">Menu</mui-link>
            <mui-link size="small" data-scroll-link="drawer-advanced-menu">Advanced Menu</mui-link>  
            <mui-link size="small" data-scroll-link="drawer-video">VideoTube</mui-link>     
            <mui-link size="small" data-scroll-link="drawer-breakpoint">Breakpoint</mui-link>         
          </mui-h-stack>
        </mui-message>

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

    // Filter scroll logic
    this.shadowRoot.querySelectorAll(".filter").forEach((filter) => {
      const button = filter.querySelector(".filter-action");
      const scrollContainer = filter.querySelector(".filter_chip-scroll");

      if (!button || !scrollContainer) return;

      function checkEnd() {
        const atEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;
        if (atEnd) {
          button.classList.add("at-end");
        } else {
          button.classList.remove("at-end");
        }
      }

      button.addEventListener("click", () => {
        const scrollAmount = 200; // Adjust as needed
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      });

      scrollContainer.addEventListener("scroll", checkEnd);

      // Initial check
      checkEnd();
    });

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-drawer", storyDrawer);
