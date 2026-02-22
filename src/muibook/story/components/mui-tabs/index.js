import { getComponentDocs } from "../../../utils/story-data";

class storyTabBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Tabs");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    // Controller
    const propItemsController = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-tab-bar, mui-tab-panel",
        default: "(required)",
        description:
          "Assigns the elements to a named slot in the Carousel Controller. Required for light DOM content like tabs and panels.",
      },
    ];

    const tabBarControllerRows = propItemsController
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

    const tabBarControllerAccordions = propItemsController
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsController.length - 1 ? "last-child" : "";

        return /*html*/ `
      <mui-accordion-block
        class="card-slot"
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

    const propItemsTabBar = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "tab-item",
        default: "(required)",
        description: "Pass in the tab-item element",
      },
      {
        name: "speed",
        type: "string",
        options: "",
        default: "200ms",
        description: "Adjust the timing of the tab animation",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Controls the tab-item sizing and aligns with button action sizing.",
      },
      {
        name: "full-width",
        type: "boolean",
        options: "full-width",
        default: "",
        description: "Expands the tab bar to the full width of the container.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, dots, ghost",
        default: "default",
        description: "Dots renders circular indicators for compact control patterns such as carousels. Ghost removes outer bar chrome while keeping active-tab styling.",
      },
    ];

    const tabBarRows = propItemsTabBar
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

    const tabBarAccordions = propItemsTabBar
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsTabBar.length - 1 ? "last-child" : "";

        return /*html*/ `
            <mui-accordion-block
              class="card-slot"
              style="position: relative; z-index: 1;" 
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

    const propItemsTabItem = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{text}",
        default: "(required)",
        description: "Pass in text to the tab item",
      },
      {
        name: "slot=before",
        type: "slot (named)",
        options: "{mui-icon-*}, {mui-badge}, {custom}",
        default: "",
        description: "Optional leading content.",
      },
      {
        name: "slot=after",
        type: "slot (named)",
        options: "{mui-icon-*}, {mui-badge}, {custom}",
        default: "",
        description: "Optional trailing content.",
      },
      {
        name: "active",
        type: "boolean",
        options: "active",
        default: "",
        description: "Set the active tab state",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "inherits from tab-bar",
        description: "Optional override. In most cases, set size on tab-bar.",
      },
      {
        name: "id",
        type: "string",
        options: "any",
        default: "",
        description: "Unique identifier for the tab item. Used to link the tab with its corresponding panel.",
      },
    ];

    const tabItemRows = propItemsTabItem
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

    const tabItemAccordions = propItemsTabItem
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsTabItem.length - 1 ? "last-child" : "";

        return /*html*/ `
              <mui-accordion-block
                class="card-slot"
                style="position: relative; z-index: 1;" 
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

    // Panel

    const propItemsPanel = [
      {
        name: "item",
        type: "string",
        options: "any",
        default: "",
        description:
          "Maps to the corresponding id of a tab-item in the tab bar. Controls which panel is shown based on the selected tab.",
      },
    ];

    const panelRows = propItemsPanel
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

    const panelAccordions = propItemsPanel
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsPanel.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block
            class="card-slot"
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

    const tabData = [
      { id: "item1", label: "Message", active: true },
      { id: "item2", label: "Notification" },
    ];

    const tabItemsHTML = tabData
      .map(({ id, label, active }) => {
        const activeAttr = active ? " active" : "";
        return /*html*/ `<mui-tab-item id="${id}"${activeAttr}>${label}</mui-tab-item>`;
      })
      .join("");

    const stories = /*html*/ `
        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-tabs";<br>
          </mui-code>
        </spec-card>

        <mui-v-stack space="var(--space-400)">
          <props-card title="Tab Controller">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${tabBarControllerRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${tabBarControllerAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>

          <props-card title="Tab Bar">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${tabBarRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${tabBarAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>

          <props-card title="Tab Item">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${tabItemRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${tabItemAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>

          <props-card title="Tab Panel">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${panelRows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${panelAccordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>
        </mui-v-stack>


        <story-card title="Default">
          <mui-tab-bar slot="body">
            <mui-tab-item active id="item1">Item 1</mui-tab-item>
            <mui-tab-item id="item2">Item 2</mui-tab-item>
            <mui-tab-item id="item3">Item 3</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="item1"&gt;Item One&lt;/mui-tab-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item id="item2"&gt;Item two&lt;/mui-tab-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item id="item3"&gt;Item three&lt;/mui-tab-item&gt;
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Tab Controller and Tab Panel">
          <mui-tab-controller slot="body">
            <mui-tab-bar>
              <mui-tab-item active id="item1">Item 1</mui-tab-item>
              <mui-tab-item id="item2">Item 2</mui-tab-item>
              <mui-tab-item id="item3">Item 3</mui-tab-item>
            </mui-tab-bar>

            <mui-tab-panel item="item1">Content 1</mui-tab-panel>
            <mui-tab-panel item="item2">Content 2</mui-tab-panel>
            <mui-tab-panel item="item3">Content 3</mui-tab-panel>
          </mui-tab-controller>

          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-controller&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-bar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id="item1"&gt;Item 1&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="item2"&gt;Item 2&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="item3"&gt;Item 3&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item1"&gt;Content 1&lt;/mui-tab-panel&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item2"&gt;Content 2&lt;/mui-tab-panel&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item3"&gt;Content 3&lt;/mui-tab-panel&gt;<br />
            &lt;/mui-tab-controller&gt;
          </story-code-block>
        </story-card>

        <story-card title="Animation Speed 500ms">
          <mui-tab-bar slot="body" speed="500">
            ${tabItemsHTML}
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Message', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Notification' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ id, label, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
            <br />
            })
            <br />
            .join('');
            <br />
            <br />
            &lt;mui-tab-bar full-width&gt;
            <br />
            &nbsp;&#36;{tabItemsHTML}
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Size Variants">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-tab-bar size="x-small">
              <mui-tab-item active id="x-small-1">Overview</mui-tab-item>
              <mui-tab-item id="x-small-2">Details</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="small">
              <mui-tab-item active id="small-1">Overview</mui-tab-item>
              <mui-tab-item id="small-2">Details</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="medium">
              <mui-tab-item active id="medium-1">Overview</mui-tab-item>
              <mui-tab-item id="medium-2">Details</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="large">
              <mui-tab-item active id="large-1">Overview</mui-tab-item>
              <mui-tab-item id="large-2">Details</mui-tab-item>
            </mui-tab-bar>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="small-1"&gt;Overview&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="small-2"&gt;Details&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Size Parity with Button">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="x-small">Action</mui-button>
              <mui-tab-bar size="x-small">
                <mui-tab-item active id="pair-x-1">Tab One</mui-tab-item>
                <mui-tab-item id="pair-x-2">Tab Two</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="small">Action</mui-button>
              <mui-tab-bar size="small">
                <mui-tab-item active id="pair-s-1">Tab One</mui-tab-item>
                <mui-tab-item id="pair-s-2">Tab Two</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="medium">Action</mui-button>
              <mui-tab-bar size="medium">
                <mui-tab-item active id="pair-m-1">Tab One</mui-tab-item>
                <mui-tab-item id="pair-m-2">Tab Two</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="large">Action</mui-button>
              <mui-tab-bar size="large">
                <mui-tab-item active id="pair-l-1">Tab One</mui-tab-item>
                <mui-tab-item id="pair-l-2">Tab Two</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-button size="small"&gt;Action&lt;/mui-button&gt;<br />
            &lt;mui-tab-bar size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="pair-s-1"&gt;Tab One&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="pair-s-2"&gt;Tab Two&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Before and After Slots">
          <mui-v-stack slot="body" space="var(--space-300)" alignx='start'>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="x-small">
                <mui-icon-calendar slot="before"></mui-icon-calendar>
                Action
                <mui-badge slot="after">Beta</mui-badge>
              </mui-button>
              <mui-tab-bar size="x-small">
                <mui-tab-item active id="default-width-x-small-1">
                  <mui-icon-message slot="before"></mui-icon-message>
                  Inbox
                  <mui-badge slot="after" size="x-small">2</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-x-small-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Activity
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="small">
                <mui-icon-calendar slot="before"></mui-icon-calendar>
                Action
                <mui-badge slot="after">Beta</mui-badge>
              </mui-button>
              <mui-tab-bar size="small">
                <mui-tab-item active id="default-width-small-1">
                  <mui-icon-message slot="before"></mui-icon-message>
                  Inbox
                  <mui-badge slot="after" size="small">2</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-small-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Activity
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="medium">
                <mui-icon-calendar slot="before"></mui-icon-calendar>
                Action
                <mui-badge slot="after">Beta</mui-badge>
              </mui-button>
              <mui-tab-bar size="medium">
                <mui-tab-item active id="default-width-medium-1">
                  <mui-icon-message slot="before"></mui-icon-message>
                  Inbox
                  <mui-badge slot="after" size="medium">2</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-medium-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Activity
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="large">
                <mui-icon-calendar slot="before"></mui-icon-calendar>
                Action
                <mui-badge slot="after">Beta</mui-badge>
              </mui-button>
              <mui-tab-bar size="large">
                <mui-tab-item active id="default-width-large-1">
                  <mui-icon-message slot="before"></mui-icon-message>
                  Inbox
                  <mui-badge slot="after" size="large">2</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-large-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Activity
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-button size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-icon-calendar slot="before"&gt;&lt;/mui-icon-calendar&gt;<br />
            &nbsp;&nbsp;Action<br />
            &nbsp;&nbsp;&lt;mui-badge slot="after"&gt;Beta&lt;/mui-badge&gt;<br />
            &lt;/mui-button&gt;<br />
            &lt;mui-tab-bar size="small"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="default-width-small-1"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-message slot="before"&gt;&lt;/mui-icon-message&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Inbox<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="after"&gt;2&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="default-width-small-2"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-calendar slot="before"&gt;&lt;/mui-icon-calendar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Activity<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after"&gt;&lt;/mui-icon-right-chevron&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-item&gt;<br />
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Default Width">
          <mui-tab-bar slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Message', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Notification' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ id, label, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
            <br />
            })
            <br />
            .join('');
            <br />
            <br />
            &lt;mui-tab-bar&gt;
            <br />
            &nbsp;&#36;{tabItemsHTML}
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Dots Variant">
          <mui-tab-bar slot="body" variant="dots">
            <mui-tab-item active id="dots-1">Slide 1</mui-tab-item>
            <mui-tab-item id="dots-2">Slide 2</mui-tab-item>
            <mui-tab-item id="dots-3">Slide 3</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar variant="dots"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="dots-1"&gt;Slide 1&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="dots-2"&gt;Slide 2&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="dots-3"&gt;Slide 3&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Ghost Variant">
          <mui-tab-bar slot="body" variant="ghost">
            <mui-tab-item active id="ghost-1">Overview</mui-tab-item>
            <mui-tab-item id="ghost-2">Activity</mui-tab-item>
            <mui-tab-item id="ghost-3">Settings</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar variant="ghost"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="ghost-1"&gt;Overview&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="ghost-2"&gt;Activity&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="ghost-3"&gt;Settings&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Full width">
          <mui-tab-bar full-width slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>

          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Message', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Notification' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ id, label, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
            <br />
            })
            <br />
            .join('');
            <br />
            <br />
            &lt;mui-tab-bar full-width&gt;
            <br />
            &nbsp;&#36;{tabItemsHTML}
            <br />
            &lt;/mui-tab-bar&gt;
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

customElements.define("story-tab-bar", storyTabBar);
