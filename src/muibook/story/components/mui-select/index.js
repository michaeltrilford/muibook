import { getComponentDocs } from "../../../utils/story-data";

class storySelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Select");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Select"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
        <story-api-types tag="mui-select" title="Select"></story-api-types>


        <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
          <div slot="body">
            <mui-select
              label="Default"
              options='[
                {"value": "default", "label": "Mui"},
                {"value": "jal", "label": "JAL"},
                {"value": "ana", "label": "ANA"}
              ]'>
            </mui-select>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select label="Default"
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "default", "label": "Mui"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "jal", "label": "JAL"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "ana", "label": "ANA"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </story-code-block>
        </story-card>

        <story-card id="optional-label" title="${storyMeta["optional-label"].title}" description="${storyMeta["optional-label"].description}" usage="${storyMeta["optional-label"].usage}">
          <div slot="body">
            <mui-select
              label="Region"
              optional
              options='[
                {"value": "apac", "label": "APAC"},
                {"value": "emea", "label": "EMEA"},
                {"value": "amer", "label": "Americas"}
              ]'>
            </mui-select>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select label="Region" optional
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"value": "apac", "label": "APAC"},
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"value": "emea", "label": "EMEA"},
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"value": "amer", "label": "Americas"}
              <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;
          </story-code-block>
        </story-card>

        <story-card id="hide-label" title="${storyMeta["hide-label"].title}" description="${storyMeta["hide-label"].description}" usage="${storyMeta["hide-label"].usage}">
          <div slot="body">
            <mui-select
              label="Density"
              hide-label
              options='[
                {"value": "spacious", "label": "Spacious"},
                {"value": "compact", "label": "Compact"}
              ]'>
            </mui-select>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select
            <br />
              &nbsp;&nbsp;label="Brand"
              <br />
              &nbsp;&nbsp;hide-label
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "spacious", "label": "Spacious"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "compact", "label": "Compact"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </story-code-block>
        </story-card>


        <story-card id="value" title="${storyMeta["value"].title}" description="${storyMeta["value"].description}" usage="${storyMeta["value"].usage}">
          <div slot="body">
            <mui-select
              value="compact"
              label="Density"
              hide-label
              options='[
                {"value": "spacious", "label": "Spacious"},
                {"value": "compact", "label": "Compact"}
              ]'>
            </mui-select>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select
            <br />
              &nbsp;&nbsp;label="Brand"
              <br />
              &nbsp;&nbsp;hide-label
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "spacious", "label": "Spacious"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "compact", "label": "Compact"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </story-code-block>
        </story-card>

        <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
          <mui-v-stack slot="body" space="var(--space-200)">
            <mui-select
              size="x-small"
              label="X-Small"
              options='[
                {"value": "one", "label": "Option 1"},
                {"value": "two", "label": "Option 2"}
              ]'>
            </mui-select>
            <mui-select
              size="small"
              label="Small"
              options='[
                {"value": "one", "label": "Option 1"},
                {"value": "two", "label": "Option 2"}
              ]'>
            </mui-select>
            <mui-select
              size="medium"
              label="Medium"
              options='[
                {"value": "one", "label": "Option 1"},
                {"value": "two", "label": "Option 2"}
              ]'>
            </mui-select>
            <mui-select
              size="large"
              label="Large"
              options='[
                {"value": "one", "label": "Option 1"},
                {"value": "two", "label": "Option 2"}
              ]'>
            </mui-select>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select size="x-small" label="X-Small" options='[...]'&gt;&lt;/mui-select&gt;<br />
            &lt;mui-select size="small" label="Small" options='[...]'&gt;&lt;/mui-select&gt;<br />
            &lt;mui-select size="medium" label="Medium" options='[...]'&gt;&lt;/mui-select&gt;<br />
            &lt;mui-select size="large" label="Large" options='[...]'&gt;&lt;/mui-select&gt;
          </story-code-block>
        </story-card>

        <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
          <div slot="body">
            <mui-select
              disabled
              label="Brand"
              hide-label
              options='[
                {"value": "spacious", "label": "Spacious"},
                {"value": "compact", "label": "Compact"}
              ]'>
            </mui-select>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select

            <br />
              &nbsp;&nbsp;disabled
              <br />
              &nbsp;&nbsp;label="Brand"
              <br />
              &nbsp;&nbsp;hide-label
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options='[
              <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "spacious", "label": "Spacious"},
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"value": "compact", "label": "Compact"}
                <br />
              &nbsp;&nbsp;]'&gt;
              <br />
            &lt;/mui-select&gt;

          </story-code-block>
        </story-card>

        <story-card id="before-select" title="${storyMeta["before-select"].title}" description="${storyMeta["before-select"].description}" usage="${storyMeta["before-select"].usage}">
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

        <story-card id="after-select" title="${storyMeta["after-select"].title}" description="${storyMeta["after-select"].description}" usage="${storyMeta["after-select"].usage}">
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


        <story-card id="custom-appearance-vertical" title="${storyMeta["custom-appearance-vertical"].title}" description="${storyMeta["custom-appearance-vertical"].description}" usage="${storyMeta["custom-appearance-vertical"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-select
              label="Team x-small"
              size="x-small"
              appearance="custom"
              padding-block="var(--space-300) var(--space-300)"
              padding-inline="var(--space-300) var(--space-400)"
              space="var(--space-100)">
              <option value="design">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Design" size="x-small" background="green">
                    <mui-icon-rectangle-media-text size="x-small"></mui-icon-rectangle-media-text>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold" size="x-small">Design</mui-body>
                    <mui-body size="xx-small" variant="secondary">Design systems and product polish</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
              <option value="engineering">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Engineering" size="x-small" background="orange">
                    <mui-icon-gear size="x-small"></mui-icon-gear>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold" size="x-small">Engineering</mui-body>
                    <mui-body size="xx-small" variant="secondary">Components, APIs, and releases</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
            </mui-select>
            <mui-select
              label="Team small"
              size="small"
              appearance="custom"
              padding-block="var(--space-300) var(--space-300)"
              padding-inline="var(--space-300) var(--space-400)"
              space="var(--space-100)">
              <option value="design">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Design" size="small" background="green">
                    <mui-icon-rectangle-media-text size="small"></mui-icon-rectangle-media-text>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold" size="small">Design</mui-body>
                    <mui-body size="x-small" variant="secondary">Design systems and product polish</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
              <option value="engineering">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Engineering" size="small" background="orange">
                    <mui-icon-gear size="small"></mui-icon-gear>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold" size="small">Engineering</mui-body>
                    <mui-body size="x-small" variant="secondary">Components, APIs, and releases</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
            </mui-select>
            <mui-select
              label="Team medium"
              size="medium"
              appearance="custom"
              padding-block="var(--space-300) var(--space-300)"
              padding-inline="var(--space-300) var(--space-400)"
              space="var(--space-100)">
              <option value="design">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Design" size="small" background="green">
                    <mui-icon-rectangle-media-text size="small"></mui-icon-rectangle-media-text>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold" size="small">Design</mui-body>
                    <mui-body size="x-small" variant="secondary">Design systems and product polish</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
              <option value="engineering">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Engineering" size="small" background="orange">
                    <mui-icon-gear size="small"></mui-icon-gear>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold" size="small">Engineering</mui-body>
                    <mui-body size="x-small" variant="secondary">Components, APIs, and releases</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
            </mui-select>
            <mui-select
              label="Team large"
              size="large"
              appearance="custom"
              padding-block="var(--space-300) var(--space-300)"
              padding-inline="var(--space-300) var(--space-500)"
              space="var(--space-100)">
              <option value="design">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Design" size="medium" background="green">
                    <mui-icon-rectangle-media-text size="medium"></mui-icon-rectangle-media-text>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold">Design</mui-body>
                    <mui-body size="small" variant="secondary">Design systems and product polish</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
              <option value="engineering">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-avatar label="Engineering" size="medium" background="orange">
                    <mui-icon-gear size="medium"></mui-icon-gear>
                  </mui-avatar>
                  <mui-v-stack space="var(--space-000)">
                    <mui-body weight="bold">Engineering</mui-body>
                    <mui-body size="small" variant="secondary">Components, APIs, and releases</mui-body>
                  </mui-v-stack>
                </mui-h-stack>
              </option>
            </mui-select>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select label="Team x-small" size="x-small" appearance="custom" space="var(--space-100)"&gt;...&lt;/mui-select&gt;<br />
            &lt;mui-select label="Team small" size="small" appearance="custom" space="var(--space-100)"&gt;...&lt;/mui-select&gt;<br />
            &lt;mui-select label="Team medium" size="medium" appearance="custom" space="var(--space-100)"&gt;<br />
            &nbsp;&nbsp;&lt;option value="design"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar label="Design" size="small"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-rectangle-media-text size="small"&gt;&lt;/mui-icon-rectangle-media-text&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/option&gt;<br />
            &nbsp;&nbsp;&lt;option value="engineering"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar label="Engineering" size="small"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-gear size="small"&gt;&lt;/mui-icon-gear&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/option&gt;<br />
            &lt;/mui-select&gt;
            &lt;mui-select label="Team large" size="large" appearance="custom" space="var(--space-100)"&gt;...&lt;/mui-select&gt;
          </story-code-block>
        </story-card>

        <story-card id="custom-appearance-grid" title="${storyMeta["custom-appearance-grid"].title}" description="${storyMeta["custom-appearance-grid"].description}" usage="${storyMeta["custom-appearance-grid"].usage}">
          <mui-v-stack slot="body" space="var(--space-300)">
            <mui-select
              label="Waste x-small"
              size="x-small"
              appearance="custom"
              selected-content="label"
              col="1fr 1fr 1fr 1fr"
              space="var(--space-100)">
              <option value="recyclable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="x-small" color="var(--feedback-positive-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="x-small">Recyclable</mui-body>
                </mui-v-stack>
              </option>
              <option value="waste">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="x-small" color="var(--feedback-info-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="x-small">Waste</mui-body>
                </mui-v-stack>
              </option>
              <option value="organic">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="x-small" color="var(--feedback-warning-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="x-small">Organic</mui-body>
                </mui-v-stack>
              </option>
              <option value="burnable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="x-small" color="var(--feedback-attention-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="x-small">Burnable</mui-body>
                </mui-v-stack>
              </option>
            </mui-select>
            <mui-select
              label="Waste small"
              size="small"
              appearance="custom"
              selected-content="label"
              col="1fr 1fr 1fr 1fr"
              space="var(--space-100)">
              <option value="recyclable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="small" color="var(--feedback-positive-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="small">Recyclable</mui-body>
                </mui-v-stack>
              </option>
              <option value="waste">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="small" color="var(--feedback-info-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="small">Waste</mui-body>
                </mui-v-stack>
              </option>
              <option value="organic">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="small" color="var(--feedback-warning-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="small">Organic</mui-body>
                </mui-v-stack>
              </option>
              <option value="burnable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="small" color="var(--feedback-attention-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="small">Burnable</mui-body>
                </mui-v-stack>
              </option>
            </mui-select>
            <mui-select
              label="Waste medium"
              size="medium"
              appearance="custom"
              selected-content="label"
              col="1fr 1fr"
              space="var(--space-100)">
              <option value="recyclable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="medium" color="var(--feedback-positive-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold">Recyclable</mui-body>
                </mui-v-stack>
              </option>
              <option value="waste">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="medium" color="var(--feedback-info-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold">Waste</mui-body>
                </mui-v-stack>
              </option>
              <option value="organic">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="medium" color="var(--feedback-warning-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold">Organic</mui-body>
                </mui-v-stack>
              </option>
              <option value="burnable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="medium" color="var(--feedback-attention-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold">Burnable</mui-body>
                </mui-v-stack>
              </option>
            </mui-select>
            <mui-select
              label="Waste large"
              size="large"
              appearance="custom"
              selected-content="label"
              col="1fr 1fr"
              space="var(--space-100)">
              <option value="recyclable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="large" color="var(--feedback-positive-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="large">Recyclable</mui-body>
                </mui-v-stack>
              </option>
              <option value="waste">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="large" color="var(--feedback-info-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="large">Waste</mui-body>
                </mui-v-stack>
              </option>
              <option value="organic">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="large" color="var(--feedback-warning-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="large">Organic</mui-body>
                </mui-v-stack>
              </option>
              <option value="burnable">
                <mui-v-stack space="var(--space-100)" alignx="center">
                  <mui-illustration-trash size="large" color="var(--feedback-attention-border-color)"></mui-illustration-trash>
                  <mui-body weight="bold" size="large">Burnable</mui-body>
                </mui-v-stack>
              </option>
            </mui-select>
          </mui-v-stack>
          <story-code-block slot="footer" scrollable>
            &lt;mui-select<br />
            &nbsp;&nbsp;label="Waste x-small"<br />
            &nbsp;&nbsp;size="x-small"<br />
            &nbsp;&nbsp;appearance="custom"<br />
            &nbsp;&nbsp;selected-content="label"<br />
            &nbsp;&nbsp;col="1fr 1fr 1fr 1fr"<br />
            &nbsp;&nbsp;space="var(--space-100)"&gt;<br />
            &nbsp;&nbsp;&lt;option value="recyclable"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-100)" alignx="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-illustration-trash size="x-small" color="var(--feedback-positive-border-color)"&gt;&lt;/mui-illustration-trash&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold" size="x-small"&gt;Recyclable&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;/option&gt;<br />
            &lt;/mui-select&gt;<br />
            &lt;mui-select label="Waste small" size="small" appearance="custom" selected-content="label" col="1fr 1fr 1fr 1fr" space="var(--space-100)"&gt;...&lt;/mui-select&gt;<br />
            &lt;mui-select label="Waste medium" size="medium" appearance="custom" selected-content="label" col="1fr 1fr" space="var(--space-100)"&gt;<br />
            &nbsp;&nbsp;&lt;option value="recyclable"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-100)" alignx="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-illustration-trash size="medium" color="var(--feedback-positive-border-color)"&gt;&lt;/mui-illustration-trash&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Recyclable&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;/option&gt;<br />
            &nbsp;&nbsp;&lt;option value="waste"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-100)" alignx="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-illustration-trash size="medium" color="var(--feedback-info-border-color)"&gt;&lt;/mui-illustration-trash&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Waste&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&lt;/option&gt;<br />
            &lt;/mui-select&gt;<br />
            &lt;mui-select label="Waste large" size="large" appearance="custom" selected-content="label" col="1fr 1fr" space="var(--space-100)"&gt;...&lt;/mui-select&gt;
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

        imports='["@muibook/components/mui-select"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-select", storySelect);
