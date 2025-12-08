class storyInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "variant",
        type: "string",
        options: "default, success, warning, error",
        default: "default",
        description: "",
      },
      {
        name: "types",
        type: "string",
        options: "text, password, email, number, search, tel, url, date, time",
        default: "text",
        description: "Define the data context that the input supports",
      },
      {
        name: "id",
        type: "string",
        options: "{text}",
        default: "",
        description:
          "Identifier to group the label and input to allow user to focus on the input by clicking the label.",
      },
      {
        name: "label",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description:
          "Provide the input with a unique label.  If without, a console warning will remind you to add label.",
      },
      {
        name: "hide-label",
        type: "boolean",
        options: "hide-label",
        default: "",
        description: "Hides the label but it is still present for screen readers",
      },
      {
        name: "disabled",
        type: "boolean",
        options: "disabled",
        default: "",
        description: "Disable the input",
      },
      {
        name: "name",
        type: "string",
        options: "{text}",
        default: "",
        description: "The name attribute is used when submitting forms.",
      },
      {
        name: "value",
        type: "string",
        options: "{text}",
        default: "",
        description: "Sets the current value of the input field.",
      },
      {
        name: "placeholder",
        type: "string",
        options: "{text}",
        default: "",
        description: "You want the input to start with pre-filled content.",
      },
      {
        name: "slot=&#8220;before&#8221;",
        type: "slot (named)",
        options: "mui-addon, mui-select, mui-button",
        default: "",
        description: "Primary content slot for a slat layout.",
      },
      {
        name: "slot=&#8220;after&#8221;",
        type: "slot (named)",
        options: "mui-addon, mui-select, mui-button",
        default: "",
        description: "Slot in elements to appear flush next to the input",
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

    const stories = /*html*/ `
        
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-input";<br>
        </mui-code>
      </spec-card>

      <props-card title="Input">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>


      <story-card title="Default" description="The label is required, if not set there will be a console warning."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Default"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Default"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Variant: Success" description="The label is required, if not set there will be a console warning."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input variant="success"  value="value" type="password" label="Password"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input variant="success" value="value" type="password" label="Password"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Variant: Warning" description="The label is required, if not set there will be a console warning."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input variant="warning" value="michael.mui.com" label="Email"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input variant="warning" value="michael.mui.com" label="Email"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Variant: Error" description="The label is required, if not set there will be a console warning."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input variant="error" value="michael.mui.com" label="Email"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input variant="error" value="michael.mui.com" label="Email"&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Hide Label" description="The visible label is hidden and an aria-label is generated from the label to maintain screen reader support."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Hide Label" hide-label></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Hide Label" hide-label&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Disabled"
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Disabled" disabled></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Disabled" disabled&gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Before: Add On"
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Enter amount">
            <mui-addon slot="before"><mui-body>USD</mui-body></mui-addon>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Enter amount"&gt;
          <br />

          &nbsp;&nbsp;&lt;mui-addon slot="before"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-addon&gt;
          <br />            

          &lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="After: Add On"
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Enter amount">
            <mui-addon slot="after"><mui-body>USD</mui-body></mui-input></mui-addon>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input label="Enter amount"&gt;
          <br />

          &nbsp;&nbsp;&lt;mui-addon slot="after"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;USD&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-addon&gt;
          <br />            

          &lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Before: Select"
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input type="search" label="Search">
            <mui-select
              style="width: 120px;"
              slot="before"
              label="Filter"
              hide-label
                options='[
                {"value": "all", "label": "All"},
                {"value": "images", "label": "Images"},
                {"value": "video", "label": "Video"}
              ]'>
            </mui-select>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input type="search" label="Search"&gt;<br>
          &nbsp;&nbsp;&lt;mui-select<br>
          &nbsp;&nbsp;&nbsp;&nbsp;slot="before"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;label="Filter"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="width: 120px;"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "all", "label": "All" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "images", "label": "Images" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "video", "label": "Video" }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
          &nbsp;&nbsp;&lt;/mui-select&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="After: Select"
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input type="number" label="Amount to transfer">
            <mui-select
              style="width: 100px;"
              slot="after"
              label="Currency"
              hide-label
                options='[
                {"value": "jpy", "label": "JPY"},
                {"value": "usd", "label": "USD"}
              ]'>
            </mui-select>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input type="number" label="Amount to transfer"&gt;<br>
          &nbsp;&nbsp;&lt;mui-select<br>
          &nbsp;&nbsp;&nbsp;&nbsp;slot="after"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;label="Currency"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hide-label<br>
          &nbsp;&nbsp;&nbsp;&nbsp;style="width: 100px;"<br>
          &nbsp;&nbsp;&nbsp;&nbsp;options='[<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "jpy", "label": "JPY" },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "value": "usd", "label": "USD" }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;]'&gt;<br>
          &nbsp;&nbsp;&lt;/mui-select&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="After: Button" 
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input type="email" label="Email" value="mui-web-components@proton.me">
            <mui-button slot="after">Copy</mui-button>
          </mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;type="email" 
          <br />
          &nbsp;&nbsp;label="Email" 
          <br />
          &nbsp;&nbsp;value="mui-web-components@proton.me"
          <br />
          &gt;
          <br>
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="After: Link" 
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input type="email" label="Email" value="mui-web-components@proton.me">
            <mui-link href="/#/input" slot="after">Help</mui-link>
          </mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;type="email" 
          <br />
          &nbsp;&nbsp;label="Email" 
          <br />
          &nbsp;&nbsp;value="mui-web-components@proton.me"
          <br />
          &gt;
          <br>
          &nbsp;&nbsp;&lt;mui-button slot="after"&gt;Copy&lt;/mui-button&gt;<br>
          &lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Text" description="The default input type for plain text."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Name" type="text" id="name-input" name="name" value="John Doe"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Name"
          <br />
          &nbsp;&nbsp;type="text" 
          <br />
          &nbsp;&nbsp;id="name-input" 
          <br />
          &nbsp;&nbsp;name="name"
          <br />
          &nbsp;&nbsp;value="John Doe"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Email" description="Ensures the entered value follows email format."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Email" type="email" id="email-input" name="email" value="user@example.com"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Email"
          <br />
          &nbsp;&nbsp;type="email" 
          <br />
          &nbsp;&nbsp;id="email-input" 
          <br />
          &nbsp;&nbsp;name="email"
          <br />
          &nbsp;&nbsp;value="user@example.com"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Password" description="Using type password masks the user-filled content."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Password" type="password" id="password-input" name="password" value="abcde1234"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Password"
          <br />
          &nbsp;&nbsp;type="password" 
          <br />
          &nbsp;&nbsp;id="password-input" 
          <br />
          &nbsp;&nbsp;name="password"
          <br />
          &nbsp;&nbsp;value="abcde1234"
          <br />
          &gt;&lt;/mui-input&gt;
          <br />
        </story-code-block>
      </story-card>

      <story-card title="Type: Number" description="Restricts input to numeric values."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Age" type="number" id="age-input" name="age" value="30"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Age"
          <br />
          &nbsp;&nbsp;type="number" 
          <br />
          &nbsp;&nbsp;id="age-input" 
          <br />
          &nbsp;&nbsp;name="age"
          <br />
          &nbsp;&nbsp;value="30"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: URL" description="Validates URL format."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Website" type="url" id="url-input" name="website" value="https://example.com"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Website"
          <br />
          &nbsp;&nbsp;type="url" 
          <br />
          &nbsp;&nbsp;id="url-input" 
          <br />
          &nbsp;&nbsp;name="website"
          <br />
          &nbsp;&nbsp;value="https://example.com"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Tel" description="Input for telephone numbers, no formatting enforced."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Phone" type="tel" id="phone-input" name="phone" value="+1234567890"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Phone"
          <br />
          &nbsp;&nbsp;type="tel" 
          <br />
          &nbsp;&nbsp;id="phone-input" 
          <br />
          &nbsp;&nbsp;name="phone"
          <br />
          &nbsp;&nbsp;value="+1234567890"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Search" description="Styled and optimized for search fields."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Search" type="search" id="search-input" name="search" value="Query"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Search"
          <br />
          &nbsp;&nbsp;type="search" 
          <br />
          &nbsp;&nbsp;id="search-input" 
          <br />
          &nbsp;&nbsp;name="search"
          <br />
          &nbsp;&nbsp;value="Query"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Date" description="Allows the user to pick a calendar date."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Birthdate" type="date" id="birthdate-input" name="birthdate" value="1990-01-01"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Birthdate"
          <br />
          &nbsp;&nbsp;type="date" 
          <br />
          &nbsp;&nbsp;id="birthdate-input" 
          <br />
          &nbsp;&nbsp;name="birthdate"
          <br />
          &nbsp;&nbsp;value="1990-01-01"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>

      <story-card title="Type: Time" description="Provides a time picker for hour and minute selection."
        usageLink="https://guides.muibook.com/input"
      >
        <div slot="body">
          <mui-input label="Meeting Time" type="time" id="meeting-time-input" name="meetingTime" value="14:30"></mui-input>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-input 
          <br />
          &nbsp;&nbsp;label="Meeting Time"
          <br />
          &nbsp;&nbsp;type="time" 
          <br />
          &nbsp;&nbsp;id="meeting-time-input" 
          <br />
          &nbsp;&nbsp;name="meetingTime"
          <br />
          &nbsp;&nbsp;value="14:30"
          <br />
          &gt;&lt;/mui-input&gt;
        </story-code-block>
      </story-card>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Input"
        description="An input component for capturing user text, styled for consistency across your UI."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts"
        guides="https://guides.muibook.com/input"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-795&t=GMqx21isUVAMpLJp-1"
        storybook="https://stories.muibook.com/?path=/docs/inputs-input--docs"
        accessibility="
          A label is required for screen reader support to describe the input's purpose.|||
          If hide-label is used, the label is visually hidden but accessible via aria-label.|||
          The label and input are linked via for and id. If no id is provided, one is generated.|||
          Clear focus styles are shown for keyboard users.|||
          The native disabled attribute is fully supported by assistive tech.
        "
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-input", storyInput);
