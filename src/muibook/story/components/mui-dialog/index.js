import { getComponentDocs } from "../../../utils/story-data";
import VisaBlack from "../../../images/networks/visa-black.svg";
import Guides from "../../../images/guru/guides.svg";

class storyDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.storyActionBindings = [];
    this.handleStoryActionClick = this.handleStoryActionClick.bind(this);
  }

  handleStoryActionClick(event) {
    const action = this.storyActionBindings.find(({ target }) => target === event.currentTarget)?.action;
    if (!action) return;

    const target = action.getAttribute("data-dialog");
    if (target) {
      const story = action.closest("story-card");
      const dialog = story?.querySelector(`mui-dialog[data-dialog="${CSS.escape(target)}"]`);
      dialog?.open();
      return;
    }

    if (action.hasAttribute("data-close")) {
      action.closest("mui-dialog")?.close();
      return;
    }
  }

  disconnectedCallback() {
    this.storyActionBindings.forEach(({ target }) => target.removeEventListener("click", this.handleStoryActionClick));
    this.storyActionBindings = [];
  }

  async connectedCallback() {
    const data = await getComponentDocs("Dialog");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Dialog"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; }

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
    `;

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-dialog" title="Dialog"></story-api-types>
      </mui-v-stack>

      <!-- Dialog with Actions -->
      <story-card id="confirmation" title="${storyMeta["confirmation"].title}" description="${storyMeta["confirmation"].description}" usage="${storyMeta["confirmation"].usage}">
        <mui-button variant="primary" data-dialog="hook-1" slot="body">Open Dialog</mui-button>
        <mui-dialog data-dialog="hook-1" width="400px" slot="body" aria-labelledby="dialog-title-1" aria-describedby="dialog-desc-1">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-1">Dialog Title</mui-heading>
          <mui-body id="dialog-desc-1">This is some dialog content</mui-body>
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Confirm</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-1"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-1" width="400px" aria-labelledby="dialog-title-1" aria-describedby="dialog-desc-1"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-1"&gt;Dialog Title&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body id="dialog-desc-1"&gt;This is some dialog content&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary" size="small"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>
          <br>
          &lt;!-- Close buttons inside each dialog --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-dialog[data-dialog]&quot;).forEach((dialog) =&gt; {<br>
          &nbsp;&nbsp;dialog.querySelectorAll(&quot;mui-button[data-close]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; dialog.removeAttribute(&quot;open&quot;));<br>
          &nbsp;&nbsp;});<br>
          });<br>

        </story-code-block>
      </story-card>

      <story-card id="max-height" title="${storyMeta["max-height"].title}" description="${storyMeta["max-height"].description}" usage="${storyMeta["max-height"].usage}">
        <mui-button variant="primary" data-dialog="hook-sizing" slot="body">Open</mui-button>
        <mui-dialog data-dialog="hook-sizing" width="min(90vw, 60rem)" max-height="62.7rem" slot="body" aria-label="Product canvas">
          <mui-tab-controller>
            <mui-v-stack space="var(--space-400)" width="auto" height="auto">
              <mui-heading size="3" level="2">Product canvas</mui-heading>
              <mui-body>Define, refine, and share product strategy in one place, with AI-assisted roadmap and objective generation.</mui-body>

              <mui-tab-bar full-width active-inset usage="surface" aria-label="Product canvas sections">
                <mui-tab-item active id="max-height-overview">Overview</mui-tab-item>
                <mui-tab-item id="max-height-strategy">Strategy</mui-tab-item>
                <mui-tab-item id="max-height-direction">Direction</mui-tab-item>
                <mui-tab-item id="max-height-validation">Validation</mui-tab-item>
              </mui-tab-bar>

              <mui-tab-panel item="max-height-overview">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Overview</mui-heading>
                  <mui-input label="Problem Title" placeholder="Freelancer Cash Flow Management"></mui-input>
                  <mui-input label="Strategy tag" placeholder="Freelance Cash Flow"></mui-input>
                  <mui-textarea label="Problem Description" placeholder="Explore how independent workers manage irregular income, plan expenses, and decide which financial tools are worth trusting." rows="3"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>

              <mui-tab-panel item="max-height-strategy">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Customer &amp; Problem</mui-heading>
                  <mui-textarea label="Target users or segments" placeholder="Freelancers with uneven monthly income" rows="2"></mui-textarea>
                  <mui-textarea label="Problems and pain points" placeholder="Income arrives unpredictably, making bills, tax, and savings hard to plan." rows="2"></mui-textarea>
                  <mui-textarea label="Context" placeholder="End of month planning, late invoices, and quarterly tax periods." rows="2"></mui-textarea>
                  <mui-textarea label="Frequency and impact" placeholder="Monthly stress, missed savings goals, and reactive spending decisions." rows="2"></mui-textarea>
                  <mui-textarea label="Current behaviours or workarounds" placeholder="Spreadsheets, bank balances, invoice reminders, and mental math." rows="2"></mui-textarea>
                  <mui-textarea label="Key insights" placeholder="Trust grows when forecasts explain the assumptions behind them." rows="2"></mui-textarea>
                  <mui-heading size="4" level="3">Outcomes &amp; Value</mui-heading>
                  <mui-textarea label="Desired user outcomes" placeholder="Freelancers can see whether they are safe for the next 30 days." rows="2"></mui-textarea>
                  <mui-textarea label="Business outcomes" placeholder="Increase activation and repeat use of planning features." rows="2"></mui-textarea>
                  <mui-textarea label="Success metrics" placeholder="Weekly forecast views, completed plans, and retained active users." rows="2"></mui-textarea>
                  <mui-textarea label="Value created" placeholder="Less manual planning, fewer surprises, and higher financial confidence." rows="2"></mui-textarea>
                  <mui-textarea label="Leading indicators" placeholder="Users connect invoices, add recurring costs, and return within 7 days." rows="2"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>

              <mui-tab-panel item="max-height-direction">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Product Direction</mui-heading>
                  <mui-textarea label="Product or initiative definition" placeholder="A cash flow forecast that combines invoices, bills, tax, and savings goals." rows="2"></mui-textarea>
                  <mui-textarea label="Core value proposition" placeholder="Know what is safe to spend before the next payment arrives." rows="2"></mui-textarea>
                  <mui-textarea label="Key experiences or journeys" placeholder="Invoice follow-up, monthly planning, tax set-aside, and emergency buffers." rows="2"></mui-textarea>
                  <mui-textarea label="Differentiation" placeholder="Plain-language forecasts that show why a month looks risky." rows="2"></mui-textarea>
                  <mui-textarea label="Non-goals or boundaries" placeholder="Full accounting, payroll, lending, or automated tax filing." rows="2"></mui-textarea>
                  <mui-heading size="4" level="2">Confidence Check</mui-heading>
                  <mui-textarea label="Viability" placeholder="Planning confidence could support premium conversion." rows="2"></mui-textarea>
                  <mui-textarea label="Feasibility" placeholder="Forecast quality depends on invoice, bank, and recurring cost data." rows="2"></mui-textarea>
                  <mui-textarea label="Usability" placeholder="Users need a clear forecast without needing finance expertise." rows="2"></mui-textarea>
                  <mui-textarea label="Desirability" placeholder="Strong pull during tax season, late payment cycles, and quiet months." rows="2"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>

              <mui-tab-panel item="max-height-validation">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Risks &amp; Validation</mui-heading>
                  <mui-textarea label="Key assumptions" placeholder="Freelancers trust forecasts if they can inspect and adjust assumptions." rows="2"></mui-textarea>
                  <mui-textarea label="Risks and unknowns" placeholder="Poor data quality may make forecasts feel unreliable." rows="2"></mui-textarea>
                  <mui-textarea label="Dependencies" placeholder="Invoice import, recurring cost capture, and bank connection coverage." rows="2"></mui-textarea>
                  <mui-textarea label="Constraints" placeholder="Avoid regulated financial advice and keep guidance explainable." rows="2"></mui-textarea>
                  <mui-textarea label="Smallest testable version" placeholder="Manual 30-day forecast from invoices and recurring expenses." rows="2"></mui-textarea>
                  <mui-textarea label="Validation criteria" placeholder="Users return weekly and say the forecast changed a spending decision." rows="2"></mui-textarea>
                  <mui-textarea label="Next steps" placeholder="Interview freelancers, prototype the forecast, and test with real invoice data." rows="2"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>
            </mui-v-stack>
          </mui-tab-controller>
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Save</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dialog<br />
          &nbsp;&nbsp;width=&quot;min(90vw, 60rem)&quot;<br />
          &nbsp;&nbsp;max-height=&quot;62.7rem&quot;<br />
          &nbsp;&nbsp;aria-label=&quot;Product canvas&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-controller&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading&gt;Product canvas&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Define, refine, and share product strategy...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-bar full-width active-inset usage=&quot;surface&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id=&quot;overview&quot;&gt;Overview&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;strategy&quot;&gt;Strategy&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;direction&quot;&gt;Direction&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;validation&quot;&gt;Validation&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;overview&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;strategy&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;direction&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;validation&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&lt;/mui-tab-controller&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;actions&quot; variant=&quot;secondary&quot;&gt;Cancel&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;actions&quot; variant=&quot;primary&quot;&gt;Save&lt;/mui-button&gt;<br />
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card id="default-height" title="${storyMeta["default-height"].title}" description="${storyMeta["default-height"].description}" usage="${storyMeta["default-height"].usage}">
        <mui-button variant="primary" data-dialog="hook-default-height" slot="body">Open</mui-button>
        <mui-dialog data-dialog="hook-default-height" width="min(90vw, 60rem)" slot="body" aria-label="Product canvas">
          <mui-tab-controller>
            <mui-v-stack space="var(--space-400)" width="auto" height="auto">
              <mui-heading size="3" level="2">Product canvas</mui-heading>
              <mui-body>Define, refine, and share product strategy in one place, with AI-assisted roadmap and objective generation.</mui-body>

              <mui-tab-bar full-width active-inset usage="surface" aria-label="Product canvas sections">
                <mui-tab-item active id="default-height-overview">Overview</mui-tab-item>
                <mui-tab-item id="default-height-strategy">Strategy</mui-tab-item>
                <mui-tab-item id="default-height-direction">Direction</mui-tab-item>
                <mui-tab-item id="default-height-validation">Validation</mui-tab-item>
              </mui-tab-bar>

              <mui-tab-panel item="default-height-overview">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Overview</mui-heading>
                  <mui-input label="Problem Title" placeholder="Freelancer Cash Flow Management"></mui-input>
                  <mui-input label="Strategy tag" placeholder="Freelance Cash Flow"></mui-input>
                  <mui-textarea label="Problem Description" placeholder="Explore how independent workers manage irregular income, plan expenses, and decide which financial tools are worth trusting." rows="3"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>

              <mui-tab-panel item="default-height-strategy">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Customer &amp; Problem</mui-heading>
                  <mui-textarea label="Target users or segments" placeholder="Freelancers with uneven monthly income" rows="2"></mui-textarea>
                  <mui-textarea label="Problems and pain points" placeholder="Income arrives unpredictably, making bills, tax, and savings hard to plan." rows="2"></mui-textarea>
                  <mui-textarea label="Context" placeholder="End of month planning, late invoices, and quarterly tax periods." rows="2"></mui-textarea>
                  <mui-textarea label="Frequency and impact" placeholder="Monthly stress, missed savings goals, and reactive spending decisions." rows="2"></mui-textarea>
                  <mui-textarea label="Current behaviours or workarounds" placeholder="Spreadsheets, bank balances, invoice reminders, and mental math." rows="2"></mui-textarea>
                  <mui-textarea label="Key insights" placeholder="Trust grows when forecasts explain the assumptions behind them." rows="2"></mui-textarea>
                  <mui-heading size="4" level="3">Outcomes &amp; Value</mui-heading>
                  <mui-textarea label="Desired user outcomes" placeholder="Freelancers can see whether they are safe for the next 30 days." rows="2"></mui-textarea>
                  <mui-textarea label="Business outcomes" placeholder="Increase activation and repeat use of planning features." rows="2"></mui-textarea>
                  <mui-textarea label="Success metrics" placeholder="Weekly forecast views, completed plans, and retained active users." rows="2"></mui-textarea>
                  <mui-textarea label="Value created" placeholder="Less manual planning, fewer surprises, and higher financial confidence." rows="2"></mui-textarea>
                  <mui-textarea label="Leading indicators" placeholder="Users connect invoices, add recurring costs, and return within 7 days." rows="2"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>

              <mui-tab-panel item="default-height-direction">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Product Direction</mui-heading>
                  <mui-textarea label="Product or initiative definition" placeholder="A cash flow forecast that combines invoices, bills, tax, and savings goals." rows="2"></mui-textarea>
                  <mui-textarea label="Core value proposition" placeholder="Know what is safe to spend before the next payment arrives." rows="2"></mui-textarea>
                  <mui-textarea label="Key experiences or journeys" placeholder="Invoice follow-up, monthly planning, tax set-aside, and emergency buffers." rows="2"></mui-textarea>
                  <mui-textarea label="Differentiation" placeholder="Plain-language forecasts that show why a month looks risky." rows="2"></mui-textarea>
                  <mui-textarea label="Non-goals or boundaries" placeholder="Full accounting, payroll, lending, or automated tax filing." rows="2"></mui-textarea>
                  <mui-heading size="4" level="2">Confidence Check</mui-heading>
                  <mui-textarea label="Viability" placeholder="Planning confidence could support premium conversion." rows="2"></mui-textarea>
                  <mui-textarea label="Feasibility" placeholder="Forecast quality depends on invoice, bank, and recurring cost data." rows="2"></mui-textarea>
                  <mui-textarea label="Usability" placeholder="Users need a clear forecast without needing finance expertise." rows="2"></mui-textarea>
                  <mui-textarea label="Desirability" placeholder="Strong pull during tax season, late payment cycles, and quiet months." rows="2"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>

              <mui-tab-panel item="default-height-validation">
                <mui-v-stack space="var(--space-400)" width="auto" height="auto">
                  <mui-heading size="4" level="3">Risks &amp; Validation</mui-heading>
                  <mui-textarea label="Key assumptions" placeholder="Freelancers trust forecasts if they can inspect and adjust assumptions." rows="2"></mui-textarea>
                  <mui-textarea label="Risks and unknowns" placeholder="Poor data quality may make forecasts feel unreliable." rows="2"></mui-textarea>
                  <mui-textarea label="Dependencies" placeholder="Invoice import, recurring cost capture, and bank connection coverage." rows="2"></mui-textarea>
                  <mui-textarea label="Constraints" placeholder="Avoid regulated financial advice and keep guidance explainable." rows="2"></mui-textarea>
                  <mui-textarea label="Smallest testable version" placeholder="Manual 30-day forecast from invoices and recurring expenses." rows="2"></mui-textarea>
                  <mui-textarea label="Validation criteria" placeholder="Users return weekly and say the forecast changed a spending decision." rows="2"></mui-textarea>
                  <mui-textarea label="Next steps" placeholder="Interview freelancers, prototype the forecast, and test with real invoice data." rows="2"></mui-textarea>
                </mui-v-stack>
              </mui-tab-panel>
            </mui-v-stack>
          </mui-tab-controller>
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Save</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dialog<br />
          &nbsp;&nbsp;width=&quot;min(90vw, 60rem)&quot;<br />
          &nbsp;&nbsp;aria-label=&quot;Product canvas&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-tab-controller&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading&gt;Product canvas&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body&gt;Define, refine, and share product strategy...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-bar full-width active-inset usage=&quot;surface&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item active id=&quot;overview&quot;&gt;Overview&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;strategy&quot;&gt;Strategy&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;direction&quot;&gt;Direction&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-item id=&quot;validation&quot;&gt;Validation&lt;/mui-tab-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-tab-bar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;overview&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;strategy&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;direction&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-tab-panel item=&quot;validation&quot;&gt;...&lt;/mui-tab-panel&gt;<br />
          &nbsp;&nbsp;&lt;/mui-tab-controller&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;actions&quot; variant=&quot;secondary&quot;&gt;Cancel&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot=&quot;actions&quot; variant=&quot;primary&quot;&gt;Save&lt;/mui-button&gt;<br />
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card id="dropdown-portal" title="${storyMeta["dropdown-portal"].title}" description="${storyMeta["dropdown-portal"].description}" usage="${storyMeta["dropdown-portal"].usage}">
        <mui-button variant="primary" data-dialog="hook-dropdown-portal" slot="body">Open</mui-button>
        <mui-dialog data-dialog="hook-dropdown-portal" width="min(90vw, 32rem)" slot="body" aria-labelledby="dialog-title-dropdown-portal">
          <mui-heading size="4" level="2" slot="title" id="dialog-title-dropdown-portal">Dropdown portal</mui-heading>
          <mui-v-stack space="var(--space-400)" alignX="start">
            <mui-body variant="secondary">Open either Menu to verify body and footer Dropdowns remain visible and interactive above the modal surface.</mui-body>
            <mui-dropdown position="left" size="medium">
              <mui-button slot="action" variant="secondary">Open Menu<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
              <mui-menu inset width="min(100%, 18rem)">
                <mui-button>View details</mui-button>
                <mui-button>Duplicate item</mui-button>
                <mui-link variant="tertiary" href="#">Open settings</mui-link>
              </mui-menu>
            </mui-dropdown>
          </mui-v-stack>
          <mui-dropdown slot="actions" position="right" vertical-position="up" size="small">
            <mui-button slot="action" variant="secondary">More actions<mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
            <mui-menu inset width="min(100%, 14rem)">
              <mui-button>Save draft</mui-button>
              <mui-button>Duplicate</mui-button>
              <mui-link variant="tertiary" href="#">Open settings</mui-link>
            </mui-menu>
          </mui-dropdown>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dialog&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading slot=&quot;title&quot;&gt;Dropdown portal&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; variant=&quot;secondary&quot;&gt;Open Menu&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu inset width=&quot;min(100%, 18rem)&quot;&gt;...&lt;/mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-dropdown slot=&quot;actions&quot; position=&quot;right&quot; vertical-position=&quot;up&quot; size=&quot;small&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot=&quot;action&quot; variant=&quot;secondary&quot;&gt;More actions&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu inset width=&quot;min(100%, 14rem)&quot;&gt;...&lt;/mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
          &lt;/mui-dialog&gt;<br /><br />
          &lt;!-- Dropdown resolves mui-dialog's internal native dialog as its portal root. --&gt;
        </story-code-block>
      </story-card>

      <story-card id="bordered" title="${storyMeta["bordered"].title}" description="${storyMeta["bordered"].description}" usage="${storyMeta["bordered"].usage}">
        <mui-button variant="secondary" data-dialog="hook-border" slot="body">Open Bordered Dialog</mui-button>
        <mui-dialog
          data-dialog="hook-border"
          width="400px"
          slot="body"
          aria-labelledby="dialog-title-border"
          aria-describedby="dialog-desc-border"
          style="--dialog-border: var(--border-thin);"
        >
          <mui-heading size="4" level="4" slot="title" id="dialog-title-border">Bordered Surface</mui-heading>
          <mui-body id="dialog-desc-border">Apply a dialog border through the public surface token.</mui-body>
          <mui-button slot="actions" variant="secondary" data-close size="small">Close</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dialog style="--dialog-border: var(--border-thin);"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Bordered Surface&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-body&gt;Apply a dialog border through the public surface token.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Close&lt;/mui-button&gt;<br>
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card id="headerless" title="${storyMeta["headerless"].title}" description="${storyMeta["headerless"].description}" usage="${storyMeta["headerless"].usage}">
        <mui-button variant="secondary" data-dialog="hook-headerless" slot="body">Open Headerless</mui-button>
        <mui-dialog
          data-dialog="hook-headerless"
          width="400px"
          slot="body"
          aria-describedby="dialog-desc-headerless"
        >
          <mui-body id="dialog-desc-headerless">
            This dialog has no title slot, so the header row and built-in close action are not rendered.
          </mui-body>
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Confirm</mui-button>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="secondary" data-dialog="hook-headerless"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-headerless" width="400px" aria-describedby="dialog-desc-headerless"&gt;<br>
          &nbsp;&nbsp;&lt;mui-body id="dialog-desc-headerless"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;This dialog has no title slot, so the header row and built-in close action are not rendered.<br>
          &nbsp;&nbsp;&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary" size="small"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card id="delete-confirmation" title="${storyMeta["delete-confirmation"].title}" description="${storyMeta["delete-confirmation"].description}" usage="${storyMeta["delete-confirmation"].usage}">
        <mui-button data-dialog="hook-2" slot="body" variant="attention">Delete</mui-button>

        <mui-dialog data-dialog="hook-2" width="400px" slot="body" aria-labelledby="dialog-title-2" aria-describedby="dialog-desc-2">
          <mui-heading size="4" level="4" slot="title"id="dialog-title-2">Delete repository?</mui-heading>
          <mui-body id="dialog-desc-2">Are you sure you want to delete this item? This action cannot be undone.</mui-body>
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="attention" size="small">Delete</mui-button>
        </mui-dialog>

        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="attention" data-dialog="hook-2"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-2" width="400px" aria-labelledby="dialog-title-2" aria-describedby="dialog-desc-2"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-2"&gt;Delete repository?&lt;/mui-heading&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body id="dialog-desc-2"&gt;Are you sure you want to delete this item? This action cannot be undone.&lt;/mui-body&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
            &nbsp;&nbsp;&lt;mui-button slot="actions" variant="attention" size="small"&gt;Delete&lt;/mui-button&gt;<br>
          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          &nbsp;&nbsp;this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;});<br>
          &nbsp;&nbsp;});<br>
          <br>
          &lt;!-- Close buttons inside each dialog --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-dialog[data-dialog]&quot;).forEach((dialog) =&gt; {<br>
          &nbsp;&nbsp;dialog.querySelectorAll(&quot;mui-button[data-close]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; dialog.removeAttribute(&quot;open&quot;));<br>
          &nbsp;&nbsp;});<br>
          });<br>


        </story-code-block>
      </story-card>

      <!-- Tip / Guidance Dialog -->
      <story-card id="tip" title="${storyMeta["tip"].title}" description="${storyMeta["tip"].description}" usage="${storyMeta["tip"].usage}">
        <mui-button data-dialog="hook-3" slot="body">Show Tip</mui-button>
        <mui-dialog data-dialog="hook-3" width="400px" slot="body" aria-labelledby="dialog-title-3" aria-describedby="dialog-desc-3">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-3">Keyboard Shortcuts</mui-heading>

          <span id="dialog-desc-3" class="visually-hidden">
            This dialog lists available keyboard shortcuts for saving and undoing actions.
          </span>

          <mui-list as="ul">
            <mui-list-item>'Ctrl + S' to save</mui-list-item>
            <mui-list-item>'Ctrl + Z' to undo your last action.</mui-list-item>
          </mui-list>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          .visually-hidden {<br>
          &nbsp;&nbsp;position: absolute;<br>
          &nbsp;&nbsp;width: 1px;<br>
          &nbsp;&nbsp;height: 1px;<br>
          &nbsp;&nbsp;padding: 0;<br>
          &nbsp;&nbsp;margin: -1px;<br>
          &nbsp;&nbsp;overflow: hidden;<br>
          &nbsp;&nbsp;clip: rect(0,0,0,0);<br>
          &nbsp;&nbsp;white-space: nowrap;<br>
          &nbsp;&nbsp;border: 0;<br>
          }<br>
          <br>

          &lt;mui-button variant="primary" data-dialog="hook-3"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-3" width="400px" aria-labelledby="dialog-title-3" aria-describedby="dialog-desc-3"&gt;<br>
            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-3"&gt;Keyboard Shortcuts&lt;/mui-heading&gt;<br>


            <br>

            &nbsp;&nbsp;&lt;span id="dialog-desc-3" class="visually-hidden"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;This dialog lists available keyboard shortcuts for saving and undoing actions.<br>
            &nbsp;&nbsp;&lt;/span&gt;<br>

            <br>
            &nbsp;&nbsp;&lt;mui-list as="ul"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item&gt;'Ctrl + S' to save&lt;/mui-list-item&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item&gt;'Ctrl + Z' to undo your last action.&lt;/mui-list-item&gt;<br>
            &nbsp;&nbsp;&lt;/mui-list&gt;<br>
            <br>

          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>
          <br>

        </story-code-block>
      </story-card>

      <!-- Media Dialog with Close Action -->
      <story-card id="media" title="${storyMeta["media"].title}" description="${storyMeta["media"].description}" usage="${storyMeta["media"].usage}">
        <mui-button data-dialog="hook-4" slot="body">Open Preview</mui-button>
        <mui-dialog data-dialog="hook-4" width="600px" slot="body" aria-labelledby="dialog-title-4" aria-describedby="dialog-desc-4">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-4">Preview Card</mui-heading>

          <span id="dialog-desc-4" class="visually-hidden">
            This card preview shows a Visa Debit card with masked number ending 1234.
          </span>

          <mui-v-stack space="var(--space-200)" alignX="center" style="padding: var(--space-800) 0;">
            <mui-smart-card
              variant="plain"
              partner="${VisaBlack}"
              type="Debit"
              number="1234"
              logo="${Guides}"
              logo-height="80"
              bg-color="#a4fc67"
            >
            </mui-smart-card>
          </mui-v-stack>

        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          .visually-hidden {<br>
          &nbsp;&nbsp;position: absolute;<br>
          &nbsp;&nbsp;width: 1px;<br>
          &nbsp;&nbsp;height: 1px;<br>
          &nbsp;&nbsp;padding: 0;<br>
          &nbsp;&nbsp;margin: -1px;<br>
          &nbsp;&nbsp;overflow: hidden;<br>
          &nbsp;&nbsp;clip: rect(0,0,0,0);<br>
          &nbsp;&nbsp;white-space: nowrap;<br>
          &nbsp;&nbsp;border: 0;<br>
          }<br>
          <br>

          &lt;mui-button variant="primary" data-dialog="hook-4"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-4" width="600px" aria-labelledby="dialog-title-4" aria-describedby="dialog-desc-4"&gt;<br>

            <br>

            &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-4"&gt;Preview Card&lt;/mui-heading&gt;<br>

            <br>

            &nbsp;&nbsp;&lt;span id="dialog-desc-4" class="visually-hidden"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;This card preview shows a Visa Debit card with masked number ending 1234.<br>
            &nbsp;&nbsp;&lt;/span&gt;<br>

            <br>

            &nbsp;&nbsp;&lt;mui-v-stack&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-smart-card&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-smart-card&gt;<br>
            &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>
          <br>

        </story-code-block>
      </story-card>

      <!-- Loading / Progress Dialog -->
      <story-card id="loading" title="${storyMeta["loading"].title}" description="${storyMeta["loading"].description}" usage="${storyMeta["loading"].usage}">
        <mui-button data-dialog="hook-5" slot="body">Start Upload</mui-button>
        <mui-dialog data-dialog="hook-5" width="500px" slot="body" aria-labelledby="dialog-title-5" aria-describedby="dialog-desc-5">
          <mui-heading size="4" level="4" slot="title" id="dialog-title-5">Uploading</mui-heading>
          <mui-v-stack space="var(--space-400)" alignX="center" style="padding: var(--space-800) 0;">
            <mui-progress style="width: 55%" state="pending"></mui-progress>
            <mui-loader loading animation="pulsate" duration="3s">
              <mui-body size="small" id="dialog-desc-5">Uploading your files… please wait.</mui-body>
            </mui-loader>
          </mui-v-stack>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>

          &lt;mui-button variant="primary" data-dialog="hook-5"&gt;...&lt;/mui-button&gt;<br><br>

          &lt;mui-dialog data-dialog="hook-5" width="300px" aria-labelledby="dialog-title-5" aria-describedby="dialog-desc-5"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title" id="dialog-title-5"&gt;Uploading&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-loader loading animation="pulsate" duration="1.5s"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body id="dialog-desc-5"&gt;Uploading your files… please wait.&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-loader&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-dialog&gt;

          <br><br>

          &lt;!-- Open dialog buttons --&gt;<br>
          this.shadowRoot.querySelectorAll(&quot;mui-button[data-dialog]&quot;).forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener(&quot;click&quot;, () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute(&quot;data-dialog&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const dialog = this.shadowRoot.querySelector(&quot;mui-dialog[data-dialog=&quot; + target + &quot;]&quot;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (dialog) dialog.setAttribute(&quot;open&quot;, &quot;&quot;);<br>
          &nbsp;&nbsp;});<br>
          });<br>

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

        imports='["@muibook/components/mui-dialog"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.storyActionBindings.forEach(({ target }) => target.removeEventListener("click", this.handleStoryActionClick));
    const storyActions = Array.from(
      this.shadowRoot.querySelectorAll("mui-button[data-dialog], mui-button[data-close]"),
    );
    await customElements.whenDefined("mui-button");
    this.storyActionBindings = await Promise.all(
      storyActions.map(async (action) => {
        for (let frame = 0; frame < 10; frame += 1) {
          const target = action.shadowRoot?.querySelector("button");
          if (target) return { action, target };
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        return { action, target: action };
      }),
    );
    this.storyActionBindings.forEach(({ target }) => target.addEventListener("click", this.handleStoryActionClick));
  }
}

customElements.define("story-dialog", storyDialog);
