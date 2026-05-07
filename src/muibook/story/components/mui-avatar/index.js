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
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Adjusts the avatar size and any slotted icon sizing to match.",
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
        title="Avatar-only Dropdown"
        description="When a button only contains an Avatar, the button collapses to a primitive wrapper and the avatar drives the final size. This example uses that pattern as a dropdown trigger."
        usage="Use this when the avatar itself is the interactive target.|||The button keeps interaction semantics and states, while the avatar controls the footprint.|||This works well for profile menus and compact account actions."
        usageLink=""
        accessibility=""
      >
        <div slot="body" class="canvas">
          <mui-h-stack alignY="center">
            <mui-dropdown position="left">
              <mui-button slot="action" aria-label="Open Julie profile menu">
                <mui-avatar size="x-small" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              </mui-button>
              <mui-button variant="tertiary">Profile</mui-button>
              <mui-button variant="tertiary">Settings</mui-button>
              <mui-button variant="tertiary">Sign out</mui-button>
            </mui-dropdown>

            <mui-dropdown position="left">
              <mui-button slot="action" aria-label="Open Max profile menu">
                <mui-avatar size="small" image="${MaxAvatar}" label="Max AI"></mui-avatar>
              </mui-button>
              <mui-button variant="tertiary">Profile</mui-button>
              <mui-button variant="tertiary">Billing</mui-button>
              <mui-button variant="tertiary">Sign out</mui-button>
            </mui-dropdown>

            <mui-dropdown position="left">
              <mui-button slot="action" aria-label="Open Julie profile menu">
                <mui-avatar size="medium" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
              </mui-button>
              <mui-button variant="tertiary">Profile</mui-button>
              <mui-button variant="tertiary">Notifications</mui-button>
              <mui-button variant="tertiary">Sign out</mui-button>
            </mui-dropdown>

            <mui-dropdown position="left">
              <mui-button slot="action" aria-label="Open team calendar menu">
                <mui-avatar size="large" label="Team calendar">
                  <mui-icon-calendar size="large"></mui-icon-calendar>
                </mui-avatar>
              </mui-button>
              <mui-button variant="tertiary">Calendar</mui-button>
              <mui-button variant="tertiary">Availability</mui-button>
              <mui-button variant="tertiary">Close</mui-button>
            </mui-dropdown>
          </mui-h-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position=&quot;left&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; aria-label=&quot;Open Julie profile menu&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size=&quot;medium&quot; image=&quot;${JulieAvatar}&quot; label=&quot;Julie AI&quot;&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Profile&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Settings&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot;&gt;Sign out&lt;/mui-button&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card
        title="Avatar-only Button"
        description="Avatar-only buttons also work as standalone actions. This example opens a dialog using the avatar as the trigger."
        usage="Use this when the avatar itself is the only visible action.|||The button keeps semantics and focus behavior, while the avatar defines the final size."
        usageLink=""
        accessibility=""
      >
        <div slot="body" class="canvas">
          <mui-h-stack alignY="center">
            <mui-button data-dialog="avatar-profile-dialog" aria-label="Open Julie profile dialog">
              <mui-avatar size="medium" image="${JulieAvatar}" label="Julie AI"></mui-avatar>
            </mui-button>
          </mui-h-stack>

          <mui-dialog
            data-dialog="avatar-profile-dialog"
            width="400px"
            aria-labelledby="avatar-profile-dialog-title"
            aria-describedby="avatar-profile-dialog-desc"
          >
            <mui-heading size="4" level="4" slot="title" id="avatar-profile-dialog-title">Julie AI</mui-heading>
            <mui-body id="avatar-profile-dialog-desc">
              This dialog shows how an avatar-only button can act as a compact trigger for profile and account actions.
            </mui-body>
            <mui-button slot="footer" variant="tertiary" data-close>Close</mui-button>
          </mui-dialog>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button data-dialog=&quot;avatar-profile-dialog&quot; aria-label=&quot;Open Julie profile dialog&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar size=&quot;medium&quot; image=&quot;${JulieAvatar}&quot; label=&quot;Julie AI&quot;&gt;&lt;/mui-avatar&gt;<br />
          &lt;/mui-button&gt;<br />
          <br />
          &lt;mui-dialog data-dialog=&quot;avatar-profile-dialog&quot; width=&quot;400px&quot; aria-labelledby=&quot;avatar-profile-dialog-title&quot; aria-describedby=&quot;avatar-profile-dialog-desc&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading slot=&quot;title&quot; id=&quot;avatar-profile-dialog-title&quot;&gt;Julie AI&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-body id=&quot;avatar-profile-dialog-desc&quot;&gt;...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;footer&quot; variant=&quot;tertiary&quot; data-close&gt;Close&lt;/mui-button&gt;<br />
          &lt;/mui-dialog&gt;
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
      
        imports='["@muibook/components/mui-avatar"]'>
        ${stories}
      </story-template>
    `;

    this.addDialogEventListeners();
  }

  addDialogEventListeners() {
    this.shadowRoot.querySelectorAll("mui-button[data-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-dialog");
        if (!target) return;
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-dialog="${target}"]`);
        dialog?.setAttribute("open", "");
      });
    });

    this.shadowRoot.querySelectorAll("mui-dialog[data-dialog]").forEach((dialog) => {
      dialog.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => dialog.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-avatar", storyAvatar);
