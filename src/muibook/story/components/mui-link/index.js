import { getComponentDocs } from "../../../utils/story-data";

class storyLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Link");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Link"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-link",
        parentAttrs: ["has-before", "has-after", "icon-only"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      mui-link.custom-wc::part(color) {
        color: var(--red-600);
      }

      mui-link.custom-wc::part(color):hover {
        color: var(--red-800);
      }

      mui-link.custom-wc::part(font-weight) {
        font-weight: var(--font-weight-700);
      }

      mui-link.custom-wc::part(text-decoration) {
        text-decoration: none;
      }
      mui-link.custom-wc::part(text-decoration):hover {
        text-decoration: underline;
      }

      .overlay-canvas {
        position: relative;
        min-height: calc(var(--space-800) + var(--space-700));
        border-radius: var(--radius-200);
        border: var(--border-thin);
        border-color: var(--form-default-border-color);
        overflow: hidden;
        box-shadow: var(--shadow-medium);
        display: flex;
        align-items: end;
        justify-content: start;
        padding: var(--space-200);
        box-sizing: border-box;
      }

      .overlay-canvas::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(
            180deg,
            color-mix(in srgb, var(--canvas-tint, var(--grey-1200)) 20%, transparent) 0%,
            color-mix(in srgb, var(--canvas-tint, var(--grey-1200)) 58%, transparent) 100%
          ),
          var(--canvas-image) center / cover no-repeat;
        filter: saturate(0.9);
      }

      .overlay-canvas > * {
        position: relative;
        z-index: 1;
      }

    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-link" title="Link"></story-api-types>

      <story-card id="link-sizes" title="${storyMeta["link-sizes"].title}" description="${storyMeta["link-sizes"].description}" usage="${storyMeta["link-sizes"].usage}">

          <div slot="body">
            <mui-v-stack space="var(--space-500)">
              <div>
                <mui-heading size="4" >XX-Small</mui-heading>
                <mui-link size="xx-small">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >X-Small</mui-heading>
                <mui-link size="x-small">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >Small</mui-heading>
                <mui-link size="small">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >Medium</mui-heading>
                <mui-link size="medium">Link text</mui-link>
              </div>
              <div>
                <mui-heading size="4" >Large</mui-heading>
                <mui-link size="large">Link text</mui-link>
              </div>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-link size="xx-small"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="x-small"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="small"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="medium"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
            <br />
            <br />
            &lt;mui-link size="large"&gt;
            <br />
            &nbsp;&nbsp;Link text
            <br />
            &lt;/mui-link&gt;
          </story-code-block>

      </story-card>

      <story-card id="link-button-x-small" title="${storyMeta["link-button-x-small"].title}" description="${storyMeta["link-button-x-small"].description}" usage="${storyMeta["link-button-x-small"].usage}">

        <mui-v-stack slot="body" alignx="stretch">
          <mui-h-stack alignx="end" alignY="center" space="var(--space-050)">
            <mui-link size="x-small" variant="primary">Email us</mui-link>
            <mui-link size="x-small" variant="tertiary">Learn more</mui-link>
          </mui-h-stack>
          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into a button, it automatically inherits the button’s default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link size='x-small' variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link size='x-small' variant="primary">
              <mui-icon-info></mui-icon-info>
            </mui-link>
          </mui-h-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="x-small"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card id="link-button-small" title="${storyMeta["link-button-small"].title}" description="${storyMeta["link-button-small"].description}" usage="${storyMeta["link-button-small"].usage}">
        <mui-v-stack slot="body">

          <mui-responsive breakpoint="1280">
            <mui-h-stack alignx="space-between" aligny="center" slot="showAbove" style="border-radius: var(--radius-200); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
              <mui-h-stack space="var(--space-300)">
              <mui-input label="Search" hide-label placeholder="Search by name, email, or ID..." style="min-width: 25rem; max-width: 25rem;"></mui-input>
              <mui-select label="Status" hide-label
                style="min-width: 12rem;"
                  options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              </mui-h-stack>
              <mui-h-stack space="var(--space-400)" aligny="center">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-chip dismiss>
                    Admin
                  </mui-chip>
                </mui-h-stack>
                <mui-link size="small" variant="tertiary">Need Help?</mui-link>
              </mui-h-stack>
            </mui-h-stack>
            <mui-v-stack alignx="stretch" aligny="center" space="var(--space-300)" slot="showBelow" style="border-radius: var(--radius-100); background: var(--surface-elevated-100); padding: var(--space-400); padding-right: var(--space-500);">
              <mui-input label="Search" hide-label placeholder="Search by name, email, or ID..."></mui-input>
              <mui-select label="Status" hide-label
                  options='[
                  {"value": "default", "label": "Pending"},
                  {"value": "active", "label": "Active"}
                ]'>
              </mui-select>
              <mui-h-stack space="var(--space-400)" aligny="center" alignx="space-between">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-chip dismiss>
                    Admin
                  </mui-chip>
                </mui-h-stack>
                <mui-link size="small" variant="tertiary">Need Help?</mui-link>
              </mui-h-stack>
            </mui-v-stack>
          </mui-responsive>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into an action, it automatically inherits the action's default icon size (size="x-small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>

          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link size='small' variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link size='small' variant="primary">
              <mui-icon-info></mui-icon-info>
            </mui-link>
          </mui-h-stack>

        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="small"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card id="link-button-medium-default" title="${storyMeta["link-button-medium-default"].title}" description="${storyMeta["link-button-medium-default"].description}" usage="${storyMeta["link-button-medium-default"].usage}">
        <mui-v-stack slot="body">
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into an action, it automatically inherits the action's default icon size (size="small"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>
          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link variant="primary">
              <mui-icon-info size="small"></mui-icon-info>
            </mui-link>
          </mui-h-stack>

          <mui-rule
            direction="horizontal"
            length="100%">
          </mui-rule>

          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Input Usage</mui-body>
            <mui-body size="small" style="max-width: 64ch;">Only the medium-sized input supports the before and after slots. These slots are not available for small or large input variants.</mui-body>
          </mui-v-stack>

          <mui-input label="Enter amount">
            <mui-link slot="before">
              Action
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link slot="after">
              Action
              <mui-icon-info slot="after"></mui-icon-info>
            </mui-link>
          </mui-input>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="medium"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card id="link-button-large" title="${storyMeta["link-button-large"].title}" description="${storyMeta["link-button-large"].description}" usage="${storyMeta["link-button-large"].usage}">
        <mui-v-stack slot="body">
          <mui-v-stack space="var(--space-050)">
            <mui-body size="medium" weight="bold">Default Icon Size</mui-body>
            <mui-body size="small" style="max-width: 64ch;">When an icon is slotted into an action, it automatically inherits the action's default icon size (size="medium"). If you need a different look or emphasis, you can override the size as required.</mui-body>
          </mui-v-stack>
          <mui-h-stack alignx="start" alignY="center" space="var(--space-300)">
            <mui-link size='large' variant="primary">
              Learn more
              <mui-icon-info slot="before"></mui-icon-info>
            </mui-link>
            <mui-link size='large' variant="primary">
              <mui-icon-info></mui-icon-info>
            </mui-link>
          </mui-h-stack>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="large"&gt;...&lt;/mui-link&gt;<br /><br />
        </story-code-block>
      </story-card>

      <story-card id="url" title="${storyMeta["url"].title}" description="${storyMeta["url"].description}" usage="${storyMeta["url"].usage}">
        <div slot="body">
          <mui-link target="_blank" href="links.html">Unsubscribe</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="external-link" title="${storyMeta["external-link"].title}" description="${storyMeta["external-link"].description}" usage="${storyMeta["external-link"].usage}">
        <div slot="body">
          <mui-link target="_blank">Unsubscribe</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link target="_blank" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="primary-link" title="${storyMeta["primary-link"].title}" description="${storyMeta["primary-link"].description}" usage="${storyMeta["primary-link"].usage}">
        <div slot="body">
          <mui-link target="_blank" variant="primary">Fork Github</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="primary" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="secondary-link" title="${storyMeta["secondary-link"].title}" description="${storyMeta["secondary-link"].description}" usage="${storyMeta["secondary-link"].usage}">
        <div slot="body">
          <mui-link target="_blank" variant="secondary">View report</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="secondary" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="stroke-ring" title="${storyMeta["stroke-ring"].title}" description="${storyMeta["stroke-ring"].description}" usage="${storyMeta["stroke-ring"].usage}">
        <mui-v-stack slot="body" space="var(--space-300)" alignx="start">
          <mui-link size="xx-small" variant="secondary" stroke="ring">XX-Small</mui-link>
          <mui-link size="x-small" variant="secondary" stroke="ring">X-Small</mui-link>
          <mui-link size="small" variant="secondary" stroke="ring">Small</mui-link>
          <mui-link size="medium" variant="secondary" stroke="ring">Medium</mui-link>
          <mui-link size="large" variant="secondary" stroke="ring">Large</mui-link>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start" wrap="wrap">
            <mui-link variant="primary" stroke="ring">Primary</mui-link>
            <mui-link variant="secondary" stroke="ring">Secondary</mui-link>
            <mui-link variant="tertiary" stroke="ring">Tertiary</mui-link>
            <mui-link variant="attention" stroke="ring">Attention</mui-link>
          </mui-h-stack>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="start" wrap="wrap">
            <mui-link variant="secondary" stroke="ring" stroke-ring-size="100">100</mui-link>
            <mui-link variant="secondary" stroke="ring" stroke-ring-size="200">200</mui-link>
            <mui-link variant="secondary" stroke="ring" stroke-ring-size="300">300</mui-link>
            <mui-link variant="secondary" stroke="ring" stroke-ring-size="400">400</mui-link>
            <mui-link variant="secondary" stroke="ring" stroke-ring-size="500">500</mui-link>
          </mui-h-stack>
          <mui-rule direction="horizontal" length="100%"></mui-rule>
          <div
            class="overlay-canvas"
            style="
              --canvas-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80');
              --canvas-tint: var(--grey-1200);
              padding: var(--space-300);
            "
          >
            <mui-h-stack space="var(--space-200)" aligny="center" alignx="start">
              <mui-link variant="overlay" stroke="ring">Overlay</mui-link>
            </mui-h-stack>
          </div>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link size="xx-small" variant="secondary" stroke="ring"&gt;XX-Small&lt;/mui-link&gt;<br />
          &lt;mui-link size="x-small" variant="secondary" stroke="ring"&gt;X-Small&lt;/mui-link&gt;<br />
          &lt;mui-link size="small" variant="secondary" stroke="ring"&gt;Small&lt;/mui-link&gt;<br />
          &lt;mui-link size="medium" variant="secondary" stroke="ring"&gt;Medium&lt;/mui-link&gt;<br />
          &lt;mui-link size="large" variant="secondary" stroke="ring"&gt;Large&lt;/mui-link&gt;<br /><br />
          &lt;mui-link variant="primary" stroke="ring"&gt;Primary&lt;/mui-link&gt;<br />
          &lt;mui-link variant="secondary" stroke="ring"&gt;Secondary&lt;/mui-link&gt;<br />
          &lt;mui-link variant="tertiary" stroke="ring"&gt;Tertiary&lt;/mui-link&gt;<br />
          &lt;mui-link variant="attention" stroke="ring"&gt;Attention&lt;/mui-link&gt;<br />
          &lt;mui-link variant="secondary" stroke="ring" stroke-ring-size="100"&gt;100&lt;/mui-link&gt;<br />
          &lt;mui-link variant="secondary" stroke="ring" stroke-ring-size="500"&gt;500&lt;/mui-link&gt;<br />
          &lt;mui-link variant="overlay" stroke="ring"&gt;Overlay&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="tertiary-link" title="${storyMeta["tertiary-link"].title}" description="${storyMeta["tertiary-link"].description}" usage="${storyMeta["tertiary-link"].usage}">
        <div slot="body">
          <mui-link target="_blank" variant="tertiary">View report</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="tertiary" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="attention-link" title="${storyMeta["attention-link"].title}" description="${storyMeta["attention-link"].description}" usage="${storyMeta["attention-link"].usage}">
        <div slot="body">
          <mui-link target="_blank" variant="attention">Fork Github</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="attention" href="links.html"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="overlay-link" title="${storyMeta["overlay-link"].title}" description="${storyMeta["overlay-link"].description}" usage="${storyMeta["overlay-link"].usage}">
        <mui-grid slot="body" col="1fr 1fr" space="var(--space-200)">
          <div
            class="overlay-canvas"
            style="
              --canvas-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80');
              --canvas-tint: var(--grey-1200);
            "
          >
            <mui-link variant="overlay">Dismiss</mui-link>
          </div>

          <div
            class="overlay-canvas"
            style="
              --canvas-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80');
              --canvas-tint: var(--grey-1100);
            "
          >
            <mui-link variant="overlay" icon-only aria-label="Close">
              <mui-icon-close></mui-icon-close>
            </mui-link>
          </div>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="overlay"&gt;Dismiss&lt;/mui-link&gt;<br />
          &lt;mui-link variant="overlay" icon-only aria-label="Close"&gt;...&lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="link-before-and-after" title="${storyMeta["link-before-and-after"].title}" description="${storyMeta["link-before-and-after"].description}" usage="${storyMeta["link-before-and-after"].usage}">

        <mui-v-stack slot="body" space="var(--space-400)" alignX="start">

          <mui-link>
            Download
            <mui-icon-down-arrow-circle slot="before" size="x-small"></mui-icon-down-arrow-circle>
          </mui-link>

          <mui-link>
            View more
            <mui-icon-right-chevron slot="after" size="x-small"></mui-icon-right-chevron>
          </mui-link>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-link&gt;
          <br />
          &nbsp;&nbsp;Download
          <br>
          &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="before"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;size="x-small"&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-icon-down-arrow-circle&gt;
          <br />
          &lt;/mui-link&gt;
          <br>
          <br>
          &lt;mui-link&gt;
          <br />
          &nbsp;&nbsp;View more
          <br>
          &nbsp;&nbsp;&lt;mui-icon-right-chevron
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="after"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;size="x-small"&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-icon-right-chevron&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="link-button-before-and-after" title="${storyMeta["link-button-before-and-after"].title}" description="${storyMeta["link-button-before-and-after"].description}" usage="${storyMeta["link-button-before-and-after"].usage}">

        <mui-v-stack slot="body" space="var(--space-200)" alignX="start">

          <mui-link
            variant="primary">
              Download
              <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
          </mui-link>

          <mui-link
            variant="primary">
              View more
              <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-link>

        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="primary"&gt;
          <br />
          &nbsp;&nbsp;Download
          <br>
          &nbsp;&nbsp;&lt;mui-icon-down-arrow-circle slot="before"&gt;&lt;/mui-icon-down-arrow-circle&gt;
          <br />
          &lt;/mui-link&gt;
          <br>
          <br>
          &lt;mui-link variant="primary"&gt;
          <br />
          &nbsp;&nbsp;View more
          <br>
          &nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after"&gt;&lt;/mui-icon-right-chevron&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="primary-icon-only" title="${storyMeta["primary-icon-only"].title}" description="${storyMeta["primary-icon-only"].description}" usage="${storyMeta["primary-icon-only"].usage}">
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="primary">Share</mui-link>
            <mui-link variant="primary"><mui-icon-menu></mui-icon-menu></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="primary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="primary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="secondary-icon-only" title="${storyMeta["secondary-icon-only"].title}" description="${storyMeta["secondary-icon-only"].description}" usage="${storyMeta["secondary-icon-only"].usage}">
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="secondary">Share</mui-link>
            <mui-link variant="secondary"><mui-icon-menu></mui-icon-menu></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="secondary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="tertiary-icon-only" title="${storyMeta["tertiary-icon-only"].title}" description="${storyMeta["tertiary-icon-only"].description}" usage="${storyMeta["tertiary-icon-only"].usage}">
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="tertiary">Share</mui-link>
            <mui-link variant="tertiary"><mui-icon-menu></mui-icon-menu></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="tertiary" >
            <mui-icon-menu size="medium"></mui-icon-menu>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="tertiary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="attention-icon-only" title="${storyMeta["attention-icon-only"].title}" description="${storyMeta["attention-icon-only"].description}" usage="${storyMeta["attention-icon-only"].usage}">
        <mui-h-stack slot="body" space="var(--space-100)">
          <mui-button-group>
            <mui-link variant="attention">Share</mui-link>
            <mui-link variant="attention"><mui-icon-menu></mui-icon-menu></mui-link>
          </mui-button-group>
          <mui-badge style="align-self: center; margin: 0 var(--space-400);">VS</mui-badge>
          <mui-link variant="attention" >
            <mui-icon-warning size="medium"></mui-icon-warning>
          </mui-link>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-link variant="attention"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-add&gt;&lt;/mui-icon-add&gt;
          <br />
          &lt;/mui-link&gt;
        </story-code-block>
      </story-card>

      <story-card id="part-selectors" title="${storyMeta["part-selectors"].title}" description="${storyMeta["part-selectors"].description}" usage="${storyMeta["part-selectors"].usage}">
        <div slot="body">
          <mui-link class="custom-wc" target="_blank" href="links.html">Unsubscribe</mui-link>
        </div>
        <story-code-block slot="footer" scrollable>

          // Scoped CSS (Web component)
          <br />
          <br />

          class customUI extends HTMLElement {<br>
          &nbsp;&nbsp;static get observedAttributes() {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;return [...];<br>
          &nbsp;&nbsp;}<br><br>

          &nbsp;&nbsp;constructor() {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;super();<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const shadowRoot = this.attachShadow({
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mode: "open"
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;});
          <br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;const styles = &#96;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:host { ... }<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Part Selector<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/////////////////////////////
          <br />
          <br />

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(color) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: var(--red-600);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(color):hover {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: var(--red-700);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(font-weight) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;font-weight: var(--font-weight-700);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(text-decoration) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-decoration: none;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mui-link::part(text-decoration):hover {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-decoration: underline;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&#96;;<br><br>

          &nbsp;&nbsp;&nbsp;&nbsp;shadowRoot.innerHTML = &#96;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;style&gt;&#36;{styles}&lt;/style&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="..."&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&#96;;<br>
          &nbsp;&nbsp;}<br>
          }<br><br>

          customElements.define("custom-ui", customUI);


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

        imports='["@muibook/components/mui-link"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>

        ${stories}
      </story-template>
    `;

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

customElements.define("story-link", storyLink);
