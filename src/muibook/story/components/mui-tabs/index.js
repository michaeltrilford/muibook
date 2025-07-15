class storyTabBar extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
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
    `
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
        `
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
        name: "icon",
        type: "string",
        options: "mui-icon-[name]",
        default: "",
        description: "Pass in optional icon",
      },
      {
        name: "active",
        type: "boolean",
        options: "active",
        default: "",
        description: "Set the active tab state",
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
          `
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
          `
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
      { id: "item1", label: "Message", icon: "mui-icon-message", active: true },
      { id: "item2", label: "Notification", icon: "mui-icon-notification" },
    ];

    const tabItemsHTML = tabData
      .map(({ id, label, icon, active }) => {
        const activeAttr = active ? " active" : "";
        return /*html*/ `<mui-tab-item id="${id}" icon="${icon}"${activeAttr}>${label}</mui-tab-item>`;
      })
      .join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Tab Bar"
        description="Allow users to switch between views or content sections by selecting from a group of tabs."
        github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-tabs"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=126-560&t=ZfvVjZFxH7mQ72pi-1"
        guides="https://guides.muibook.com/tab-bar"
        accessibility="
          Left/Right arrows, Home and End keys let keyboard users navigate between tab-items.; 
          aria-selected and tabindex attributes are updated on each tab-item when it becomes active or inactive.; 
          Each active tab-item can receive focus and shows a focus-visible outline.; 
          tab-bar uses role=tablist to group related tab-items and each tab-item uses role=tab within the tab-bar.
        "

      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Import">
          <mui-code slot="footer" size="small" scrollable>
            import "@muibook/components/mui-tabs";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props: Tab Controller">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${tabBarControllerRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${tabBarControllerAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Tab Bar">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${tabBarRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${tabBarAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Tab Item">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${tabItemRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${tabItemAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <spec-card title="Props: Tab Panel">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${panelRows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${panelAccordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>


        <story-card title="Default">
          <mui-tab-bar slot="body">
            <mui-tab-item active id="item1">Item 1</mui-tab-item>
            <mui-tab-item id="item2">Item 2</mui-tab-item>
            <mui-tab-item id="item3">Item 3</mui-tab-item>
          </mui-tab-bar>
          <mui-code slot="footer" scrollable>
            &lt;mui-tab-bar&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item active id="item1"&gt;Item One&lt;/mui-tab-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item id="item2"&gt;Item two&lt;/mui-tab-item&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-tab-item id="item3"&gt;Item three&lt;/mui-tab-item&gt;
            <br />
            &lt;/mui-tab-bar&gt;
          </mui-code>
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

          <mui-code slot="footer" scrollable>
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
          </mui-code>
        </story-card>

        <story-card title="Animation Speed 500ms">
          <mui-tab-bar slot="body" speed="500">
            ${tabItemsHTML}
          </mui-tab-bar>
          <mui-code slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Message', icon: 'mui-icon-message', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Notification', icon: 'mui-icon-notification' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ label, icon, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}" icon="&#36;{icon}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
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
          </mui-code>
        </story-card>

        <story-card title="Default w/ Icon">
          <mui-tab-bar slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>
          <mui-code slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Message', icon: 'mui-icon-message', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Notification', icon: 'mui-icon-notification' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ label, icon, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}" icon="&#36;{icon}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
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
          </mui-code>
        </story-card>

        <story-card title="Full width">
          <mui-tab-bar full-width slot="body">
            ${tabItemsHTML}
          </mui-tab-bar>

          <mui-code slot="footer" scrollable>
            const tabData = [
            <br />
            &nbsp;&nbsp;{ id: 'item1', label: 'Message', icon: 'mui-icon-message', active: true },
            <br />
            &nbsp;&nbsp;{ id: 'item2', label: 'Notification', icon: 'mui-icon-notification' },
            <br />
            ];
            <br />
            <br />
            const tabItemsHTML = tabData
            <br />
            &nbsp;&nbsp;.map(({ label, icon, active }) => {
              <br />
            &nbsp;&nbsp;const activeAttr = active ? ' active' : '';
            <br />
            &nbsp;&nbsp;return &#96;&lt;mui-tab-item id="&#36;{id}" icon="&#36;{icon}"&#36;{activeAttr}&gt;&#36;{label}&lt;/mui-tab-item&gt;&#96;;
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
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-tab-bar", storyTabBar);
