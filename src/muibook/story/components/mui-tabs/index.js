import { getComponentDocs } from "../../../utils/story-data";

class storyTabBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Tabs");
    const attrsReference = JSON.stringify([
      {
        component: "mui-tab-item",
        parentAttrs: ["has-before", "has-after"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      :host([data-theme="light"]) {
        --custom-canvas: var(--grey-100);
      }

      :host([data-theme="dark"]) {
        --custom-canvas: var(--grey-1000);
      }

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
        name: "stroke",
        type: "string",
        options: "border, none",
        default: "border",
        description: "Controls whether the default tab bar border is rendered.",
      },
      {
        name: "active-inset",
        type: "boolean",
        options: "active-inset",
        default: "",
        description: "Uses an inset shadow recipe for the selected tab surface.",
      },
      {
        name: "radius",
        type: "string",
        options: "000, 100, 150, 200, 300, 400, 500, 600, valid CSS value",
        default: "var(--tab-radius)",
        description:
          "Overrides the tab bar radius. Token values map to radius tokens; raw CSS radius values are also accepted.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, dots, ghost",
        default: "default",
        description:
          "Dots renders circular indicators for compact control patterns such as carousels. Ghost removes outer bar chrome while keeping active-tab styling.",
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
      { id: "item1", label: "Item", active: true },
      { id: "item2", label: "Item" },
    ];

    const tabItemsHTML = tabData
      .map(({ id, label, active }) => {
        const activeAttr = active ? " active" : "";
        return /*html*/ `<mui-tab-item id="${id}"${activeAttr}>${label}</mui-tab-item>`;
      })
      .join("");

    const stories = /*html*/ `
        <mui-v-stack space="var(--space-400)">
          <story-api-types tag="mui-tab-controller" title="Tab Controller"></story-api-types>
          <story-api-types tag="mui-tab-bar" title="Tab Bar"></story-api-types>
          <story-api-types tag="mui-tab-item" title="Tab Item"></story-api-types>
          <story-api-types tag="mui-tab-panel" title="Tab Panel"></story-api-types>
        </mui-v-stack>


        <story-card title="Default" canvas-background="var(--custom-canvas)">
          <mui-tab-bar slot="body">
            <mui-tab-item active id="item1">Item</mui-tab-item>
            <mui-tab-item id="item2">Item</mui-tab-item>
            <mui-tab-item id="item3">Item</mui-tab-item>
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

        <story-card title="Stroke: None" description="Use when the surrounding surface already defines the tab area." canvas-background="var(--custom-canvas)">
          <mui-tab-bar slot="body" stroke="none">
            <mui-tab-item active id="stroke-none-1">Item</mui-tab-item>
            <mui-tab-item id="stroke-none-2">Item</mui-tab-item>
            <mui-tab-item id="stroke-none-3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar stroke=&quot;none&quot;&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id=&quot;stroke-none-1&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;stroke-none-2&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;stroke-none-3&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Inset Tab" description="Use for a more modern, floating pill treatment." canvas-background="var(--custom-canvas)">
          <mui-tab-bar slot="body" stroke="none" active-inset>
            <mui-tab-item active id="active-inset-none-1">Item</mui-tab-item>
            <mui-tab-item id="active-inset-none-2">Item</mui-tab-item>
            <mui-tab-item id="active-inset-none-3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar stroke=&quot;none&quot; active-inset&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id=&quot;active-inset-none-1&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;active-inset-none-2&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id=&quot;active-inset-none-3&quot;&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Radius" description="Use radius to adjust the base tab radius." canvas-background="var(--custom-canvas)">
          <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
            <mui-tab-bar radius="200">
              <mui-tab-item active id="radius-200-1">Radius 200</mui-tab-item>
              <mui-tab-item id="radius-200-2">Item</mui-tab-item>
              <mui-tab-item id="radius-200-3">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar radius="300">
              <mui-tab-item active id="radius-300-1">Radius 300</mui-tab-item>
              <mui-tab-item id="radius-300-2">Item</mui-tab-item>
              <mui-tab-item id="radius-300-3">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar radius="400">
              <mui-tab-item active id="radius-400-1">Radius 400</mui-tab-item>
              <mui-tab-item id="radius-400-2">Item</mui-tab-item>
              <mui-tab-item id="radius-400-3">Item</mui-tab-item>
            </mui-tab-bar>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar radius=&quot;200&quot;&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;mui-tab-bar radius=&quot;300&quot;&gt;...&lt;/mui-tab-bar&gt;<br />
            &lt;mui-tab-bar radius=&quot;400&quot;&gt;...&lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card
          title="Tab Controller & Tab Panel"
          description="Pair a controller with a tab bar and matching panels when tab selection needs to swap visible page content."
          usage="Use active-inset with stroke=&quot;none&quot; for a softer selected tab treatment.|||Use full-width when the tabs should divide the available tab bar width evenly.|||Constrain the tab bar with max-width and auto margins when the controller lives inside a wider content area.|||Use radius to tune the pill shape for the surrounding surface."
          canvas-background="var(--custom-canvas)"
        >
          <mui-tab-controller slot="body">
            <mui-tab-bar active-inset radius="500" stroke="none" full-width style="max-width: 370px; margin: 0 auto;">
              <mui-tab-item active id="item1">Item</mui-tab-item>
              <mui-tab-item id="item2">Item</mui-tab-item>
              <mui-tab-item id="item3">Item</mui-tab-item>
            </mui-tab-bar>

            <mui-tab-panel item="item1">
              <mui-v-stack
                space="var(--space-100)"
                style="border-radius: var(--radius-300); margin-block-start: var(--space-200); background: var(--tab-background); padding: var(--space-600);">
                <mui-heading level="2" size="4">Content 1</mui-heading>
                <mui-body>Secondary content</mui-body>
              </mui-v-stack>
            </mui-tab-panel>

            <mui-tab-panel item="item2">
              <mui-v-stack
                space="var(--space-100)"
                style="border-radius: var(--radius-300); margin-block-start: var(--space-200); background: var(--tab-background); padding: var(--space-600);">
                <mui-heading level="2" size="4">Content 2</mui-heading>
                <mui-body>Secondary content</mui-body>
              </mui-v-stack>
            </mui-tab-panel>

            <mui-tab-panel item="item3">
              <mui-v-stack
                space="var(--space-100)"
                style="border-radius: var(--radius-300); margin-block-start: var(--space-200); background: var(--tab-background); padding: var(--space-600);">
                <mui-heading level="2" size="4">Content 3</mui-heading>
                <mui-body>Secondary content</mui-body>
              </mui-v-stack>
            </mui-tab-panel>

          </mui-tab-controller>

          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-controller&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-bar active-inset radius=&quot;500&quot; stroke=&quot;none&quot; full-width style=&quot;max-width: 370px; margin: 0 auto;&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id="item1"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="item2"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id="item3"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item1"&gt;Content 1&lt;/mui-tab-panel&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item2"&gt;Content 2&lt;/mui-tab-panel&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-panel item="item3"&gt;Content 3&lt;/mui-tab-panel&gt;<br />
            &lt;/mui-tab-controller&gt;
          </story-code-block>
        </story-card>

        <story-card title="Animation Speed 500ms" canvas-background="var(--custom-canvas)">
          <mui-tab-bar slot="body" speed="500">
            ${tabItemsHTML}
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Item', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Item' },
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

        <story-card title="Size Variants" canvas-background="var(--custom-canvas)">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-tab-bar size="x-small">
              <mui-tab-item active id="x-small-1">Item</mui-tab-item>
              <mui-tab-item id="x-small-2">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="small">
              <mui-tab-item active id="small-1">Item</mui-tab-item>
              <mui-tab-item id="small-2">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="medium">
              <mui-tab-item active id="medium-1">Item</mui-tab-item>
              <mui-tab-item id="medium-2">Item</mui-tab-item>
            </mui-tab-bar>
            <mui-tab-bar size="large">
              <mui-tab-item active id="large-1">Item</mui-tab-item>
              <mui-tab-item id="large-2">Item</mui-tab-item>
            </mui-tab-bar>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="small-1"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="small-2"&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Size Parity with Button" canvas-background="var(--custom-canvas)">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="x-small">Action</mui-button>
              <mui-tab-bar size="x-small">
                <mui-tab-item active id="pair-x-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-x-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="small">Action</mui-button>
              <mui-tab-bar size="small">
                <mui-tab-item active id="pair-s-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-s-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="medium">Action</mui-button>
              <mui-tab-bar size="medium">
                <mui-tab-item active id="pair-m-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-m-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-button size="large">Action</mui-button>
              <mui-tab-bar size="large">
                <mui-tab-item active id="pair-l-1">Tab</mui-tab-item>
                <mui-tab-item id="pair-l-2">Tab</mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-button size="small"&gt;Action&lt;/mui-button&gt;<br />
            &lt;mui-tab-bar size="small"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="pair-s-1"&gt;Tab&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="pair-s-2"&gt;Tab&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Before and After Slots" canvas-background="var(--custom-canvas)">
          <mui-v-stack slot="body" space="var(--space-300)" alignx='start'>
            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="x-small">
                <mui-tab-item active id="default-width-x-small-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="x-small">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-x-small-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="small">
                <mui-tab-item active id="default-width-small-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="small">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-small-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="medium">
                <mui-tab-item active id="default-width-medium-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="medium">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-medium-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>

            <mui-h-stack alignY="center" space="var(--space-300)">
              <mui-tab-bar size="large">
                <mui-tab-item active id="default-width-large-1">
                  <mui-icon-Item slot="before"></mui-icon-Item>
                  Item
                  <mui-badge slot="after" size="large">22</mui-badge>
                </mui-tab-item>
                <mui-tab-item id="default-width-large-2">
                  <mui-icon-calendar slot="before"></mui-icon-calendar>
                  Item
                  <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
                </mui-tab-item>
              </mui-tab-bar>
            </mui-h-stack>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar size="small"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="default-width-small-1"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-Item slot="before"&gt;&lt;/mui-icon-Item&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="after"&gt;2&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="default-width-small-2"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-calendar slot="before"&gt;&lt;/mui-icon-calendar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after"&gt;&lt;/mui-icon-right-chevron&gt;<br />
            &nbsp;&nbsp;&lt;/mui-tab-item&gt;<br />
            <br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Default Width" canvas-background="var(--custom-canvas)">
          <mui-tab-bar slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Item', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Item' },
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

        <story-card title="Dots Variant" canvas-background="var(--custom-canvas)">
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

        <story-card title="Ghost Variant" canvas-background="var(--custom-canvas)">
          <mui-tab-bar slot="body" variant="ghost">
            <mui-tab-item active id="ghost-1">Item</mui-tab-item>
            <mui-tab-item id="ghost-2">Item</mui-tab-item>
            <mui-tab-item id="ghost-3">Item</mui-tab-item>
          </mui-tab-bar>
          <story-code-block slot="footer" scrollable>
            &lt;mui-tab-bar variant="ghost"&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="ghost-1"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="ghost-2"&gt;Item&lt;/mui-tab-item&gt;<br />
            &nbsp;&nbsp;&lt;mui-tab-item id="ghost-3"&gt;Item&lt;/mui-tab-item&gt;<br />
            &lt;/mui-tab-bar&gt;
          </story-code-block>
        </story-card>

        <story-card title="Full width" canvas-background="var(--custom-canvas)">
          <mui-tab-bar full-width slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>

          <story-code-block slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Item', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Item' },
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
        attrs-reference='${attrsReference}'
      
        imports='["@muibook/components/mui-tabs"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-tab-bar", storyTabBar);
