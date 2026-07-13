import { getComponentDocs } from "../../../utils/story-data";

class storyStepper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Stepper");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Stepper"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      .nav-link {
        width: 100%;
        text-align: left;
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      /* Accordion Core */
      [data-icon-animation="accordion-inline"] {
        transition: var(--speed-200) ease-in-out;
      }

      [data-icon-animation="accordion-inline"][open] {
        transform: rotate(90deg);
      }

      [data-icon-animation="accordion-block"] {
        transition: transform var(--speed-200) ease-in-out;

      }

      [data-icon-animation="accordion-block"][open] {
        transform: rotate(-180deg);
      }



    `;

    const stories = /*html*/ `
        <mui-v-stack space="var(--space-100)">
          <story-api-types tag="mui-stepper" title="Stepper"></story-api-types>
          <story-api-types tag="mui-step" title="Step"></story-api-types>
        </mui-v-stack>

        <story-card id="horizontal" title="${storyMeta["horizontal"].title}" description="${storyMeta["horizontal"].description}" usage="${storyMeta["horizontal"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="1">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
          </story-code-block>
        </story-card>

        <story-card id="interactive" title="${storyMeta["interactive"].title}" description="${storyMeta["interactive"].description}" usage="${storyMeta["interactive"].usage}">
          <div slot="body">
            <mui-stepper id="stepper-interactive" direction="horizontal" active-step="2" interactive>
              <mui-step title="Details"></mui-step>
              <mui-step title="Items"></mui-step>
              <mui-step title="Review"></mui-step>
              <mui-step title="Pay"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="2" interactive&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Review"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="small" title="${storyMeta["small"].title}" description="${storyMeta["small"].description}" usage="${storyMeta["small"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" size="small" active-step="2">
              <mui-step title="Details"></mui-step>
              <mui-step title="Items"></mui-step>
              <mui-step title="Pay"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" size="small" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="x-small" title="${storyMeta["x-small"].title}" description="${storyMeta["x-small"].description}" usage="${storyMeta["x-small"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" size="x-small" active-step="2">
              <mui-step title="Details"></mui-step>
              <mui-step title="Items"></mui-step>
              <mui-step title="Pay"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" size="x-small" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="error" title="${storyMeta["error"].title}" description="${storyMeta["error"].description}" usage="${storyMeta["error"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Details" state="success"></mui-step>
              <mui-step title="Billing" state="error"></mui-step>
              <mui-step title="Review" state="upcoming"></mui-step>
              <mui-step title="Pay" state="upcoming"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Details" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Billing" state="error"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Review" state="upcoming"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Pay" state="upcoming"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Profile" state="success"></mui-step>
              <mui-step title="Verification" state="pending"></mui-step>
              <mui-step title="Approval" state="disabled"></mui-step>
              <mui-step title="Done" state="disabled"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="2"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Profile" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Verification" state="pending"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Approval" state="disabled"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Done" state="disabled"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="checkout" title="${storyMeta["checkout"].title}" description="${storyMeta["checkout"].description}" usage="${storyMeta["checkout"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="3">
              <mui-step title="Cart" state="success"></mui-step>
              <mui-step title="Address" state="success"></mui-step>
              <mui-step title="Payment" state="pending"></mui-step>
              <mui-step title="Confirm" state="disabled"></mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="3"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Cart" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Address" state="success"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Payment" state="pending"&gt;&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Confirm" state="disabled"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="verification" title="${storyMeta["verification"].title}" description="${storyMeta["verification"].description}" usage="${storyMeta["verification"].usage}">
          <div slot="body">
            <mui-stepper direction="vertical" active-step="3">
              <mui-step title="Identity submitted" state="success">
                <mui-body size="x-small" slot="secondary">Documents uploaded</mui-body>
              </mui-step>
              <mui-step title="Compliance review" state="error">
                <mui-body size="x-small" slot="secondary">Mismatch found</mui-body>
              </mui-step>
              <mui-step title="Resubmission" state="active">
                <mui-body size="x-small" slot="secondary">In progress</mui-body>
              </mui-step>
              <mui-step title="Final approval" state="upcoming">
                <mui-body size="x-small" slot="secondary">Waiting for review</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="3"&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Identity submitted" state="success"&gt;...&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Compliance review" state="error"&gt;...&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Resubmission" state="active"&gt;...&lt;/mui-step&gt;<br />
            &nbsp;&nbsp;&lt;mui-step title="Final approval" state="upcoming"&gt;...&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;
          </story-code-block>
        </story-card>

        <story-card id="vertical" title="${storyMeta["vertical"].title}" description="${storyMeta["vertical"].description}" usage="${storyMeta["vertical"].usage}">
          <div slot="body">
            <mui-stepper direction="vertical" active-step="1">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
          </story-code-block>
        </story-card>

        <story-card id="horizontal-secondary" title="${storyMeta["horizontal-secondary"].title}" description="${storyMeta["horizontal-secondary"].description}" usage="${storyMeta["horizontal-secondary"].usage}">
          <div slot="body">
            <mui-stepper direction="horizontal" active-step="1">
              <mui-step title="Details">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="horizontal" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
          </story-code-block>
        </story-card>

        <story-card id="vertical-secondary" title="${storyMeta["vertical-secondary"].title}" description="${storyMeta["vertical-secondary"].description}" usage="${storyMeta["vertical-secondary"].usage}">
          <div slot="body">
            <mui-stepper direction="vertical" active-step="1">
              <mui-step title="Details">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Items">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
              <mui-step title="Pay">
                <mui-body size="x-small" slot="secondary">Placeholder content</mui-body>
              </mui-step>
            </mui-stepper>
          </div>
          <story-code-block slot="footer">
            &lt;mui-stepper direction="vertical" active-step="1"&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Details"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Items"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
              &nbsp;&nbsp;&lt;mui-step title="Pay"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" slot="secondary"&gt;Placeholder content&lt;/mui-body&gt;<br />
              &nbsp;&nbsp;&lt;/mui-step&gt;<br />
            &lt;/mui-stepper&gt;<br />
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

        imports='["@muibook/components/mui-stepper"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"
        ></story-quicklinks>

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

customElements.define("story-stepper", storyStepper);
