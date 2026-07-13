import { getComponentDocs } from "../../../utils/story-data";

class storyAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Alert");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Alert"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );
    const attrsReference = JSON.stringify([
      {
        component: "mui-button",
        parentAttrs: [],
        childAttrs: ["alert-slot", "alert-positive-slot", "alert-info-slot", "alert-warning-slot", "alert-attention-slot"],
      },
    ]);
    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-alert" title="Alert"></story-api-types>

      <story-card id="success" title="${storyMeta["success"].title}" description="${storyMeta["success"].description}" usage="${storyMeta["success"].usage}">
        <div slot="body">
          <mui-alert variant="success" size="medium">Your message has been sent successfully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="positive" size="medium"&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card id="info" title="${storyMeta["info"].title}" description="${storyMeta["info"].description}" usage="${storyMeta["info"].usage}">
        <div slot="body">
          <mui-alert variant="info" size="medium">Please read the comments carefully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="medium"&gt;
        <br />
        &nbsp;&nbsp;...
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="warning" title="${storyMeta["warning"].title}" description="${storyMeta["warning"].description}" usage="${storyMeta["warning"].usage}">
        <div slot="body">
          <mui-alert variant="warning" size="medium">There was a problem with your network connection. <mui-link href="#">Learn more</mui-link></mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="warning" size="medium"&gt;
        <br />
        &nbsp;&nbsp;...
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="error" title="${storyMeta["error"].title}" description="${storyMeta["error"].description}" usage="${storyMeta["error"].usage}">
        <div slot="body">
          <mui-alert variant="error" size="medium">Please read the comments carefully. <mui-link href="#">Learn more</mui-link></mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="attention" size="medium"&gt;
        <br />
        &nbsp;&nbsp;...
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="custom-label" title="${storyMeta["custom-label"].title}" description="${storyMeta["custom-label"].description}" usage="${storyMeta["custom-label"].usage}">
        <div slot="body">
          <mui-alert variant="warning" size="medium" label="Maintenance:">Scheduled downtime starts at 11:30 PM.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="warning" size="medium" label="Maintenance:"&gt;
        <br />
        &nbsp;&nbsp;Scheduled downtime starts at 11:30 PM.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="label-hidden" title="${storyMeta["label-hidden"].title}" description="${storyMeta["label-hidden"].description}" usage="${storyMeta["label-hidden"].usage}">
        <div slot="body">
          <mui-alert variant="info" size="medium" hide-label>System status updated successfully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="medium" hide-label&gt;
        <br />
        &nbsp;&nbsp;System status updated successfully.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="large" title="${storyMeta["large"].title}" description="${storyMeta["large"].description}" usage="${storyMeta["large"].usage}">
        <div slot="body">
          <mui-alert variant="info" size="large">Please read the comments carefully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="large"&gt;
        <br />
        &nbsp;&nbsp;Please read the comments carefully.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="medium" title="${storyMeta["medium"].title}" description="${storyMeta["medium"].description}" usage="${storyMeta["medium"].usage}">
        <div slot="body">
          <mui-alert variant="info" size="medium">Please read the comments carefully.</mui-alert>
        </div>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="medium"&gt;
        <br />
        &nbsp;&nbsp;Please read the comments carefully.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="small" title="${storyMeta["small"].title}" description="${storyMeta["small"].description}" usage="${storyMeta["small"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="small">Saved successfully.</mui-alert>
          <mui-alert variant="info" size="small">Your settings were updated.</mui-alert>
          <mui-alert variant="warning" size="small">Session expires in 2 minutes.</mui-alert>
          <mui-alert variant="error" size="small">We could not sync your data.</mui-alert>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="small"&gt;
        <br />
          &nbsp;&nbsp;Your settings were updated.
        <br />
        &lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="size-scale" title="${storyMeta["size-scale"].title}" description="${storyMeta["size-scale"].description}" usage="${storyMeta["size-scale"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="info" size="large">Large alert size.</mui-alert>
          <mui-alert variant="info" size="medium">Medium alert size.</mui-alert>
          <mui-alert variant="info" size="small">Small alert size.</mui-alert>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
        &lt;mui-alert variant="info" size="large"&gt;Large alert size.&lt;/mui-alert&gt;
        <br />
        &lt;mui-alert variant="info" size="medium"&gt;Medium alert size.&lt;/mui-alert&gt;
        <br />
        &lt;mui-alert variant="info" size="small"&gt;Small alert size.&lt;/mui-alert&gt;
      </story-code-block>
      </story-card>

      <story-card id="small-undo" title="${storyMeta["small-undo"].title}" description="${storyMeta["small-undo"].description}" usage="${storyMeta["small-undo"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="small">
            Message sent.
            <mui-button slot="action">Undo</mui-button>
          </mui-alert>
          <mui-alert variant="info" size="small">
            Draft saved.
            <mui-button slot="action">Undo</mui-button>
          </mui-alert>
          <mui-alert variant="warning" size="small">
            Network unstable.
            <mui-button slot="action">Retry</mui-button>
          </mui-alert>
          <mui-alert variant="error" size="small">
            Sync failed.
            <mui-button slot="action">Retry</mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="positive" size="small"&gt;
          <br />
          &nbsp;&nbsp;Message sent.
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action"&gt;Undo&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card id="link-sizes" title="${storyMeta["link-sizes"].title}" description="${storyMeta["link-sizes"].description}" usage="${storyMeta["link-sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="large">
            Large success alert with link action.
            <mui-link slot="action">View</mui-link>
          </mui-alert>
          <mui-alert variant="info" size="large">
            Large info alert with link action.
            <mui-link slot="action">Details</mui-link>
          </mui-alert>
          <mui-alert variant="warning" size="large">
            Large warning alert with link action.
            <mui-link slot="action">Update</mui-link>
          </mui-alert>
          <mui-alert variant="error" size="large">
            Large error alert with link action.
            <mui-link slot="action">Learn more</mui-link>
          </mui-alert>

          <mui-alert variant="success" size="medium">
            Medium success alert with link action.
            <mui-link slot="action">View</mui-link>
          </mui-alert>
          <mui-alert variant="info" size="medium">
            Medium info alert with link action.
            <mui-link slot="action">Details</mui-link>
          </mui-alert>
          <mui-alert variant="warning" size="medium">
            Medium warning alert with link action.
            <mui-link slot="action">Update</mui-link>
          </mui-alert>
          <mui-alert variant="error" size="medium">
            Medium error alert with link action.
            <mui-link slot="action">Learn more</mui-link>
          </mui-alert>

          <mui-alert variant="success" size="small">
            Plan updated.
            <mui-link slot="action">View</mui-link>
          </mui-alert>
          <mui-alert variant="info" size="small">
            New version available.
            <mui-link slot="action">Details</mui-link>
          </mui-alert>
          <mui-alert variant="warning" size="small">
            Payment expires soon.
            <mui-link slot="action">Update</mui-link>
          </mui-alert>
          <mui-alert variant="error" size="small">
            Action failed.
            <mui-link slot="action">Learn more</mui-link>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="positive" size="large"&gt;
          <br />
          &nbsp;&nbsp;Large success alert with link action.
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;View&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
          <br /><br />
          &lt;mui-alert variant="info" size="medium"&gt;
          <br />
          &nbsp;&nbsp;Medium info alert with link action.
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;Details&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
          <br /><br />
          &lt;mui-alert variant="warning" size="small"&gt;
          <br />
          &nbsp;&nbsp;Payment expires soon.
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;Update&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card id="small-icon" title="${storyMeta["small-icon"].title}" description="${storyMeta["small-icon"].description}" usage="${storyMeta["small-icon"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="small">
            Saved successfully.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="info" size="small">
            New update available.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="warning" size="small">
            Session expires soon.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="error" size="small">
            Sync failed.
            <mui-button slot="action" icon-only>
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="info" size="small"&gt;
          <br />
          &nbsp;&nbsp;New update available.
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action" icon-only&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-close size="x-small"&gt;&lt;/mui-icon-close&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card id="close-action" title="${storyMeta["close-action"].title}" description="${storyMeta["close-action"].description}" usage="${storyMeta["close-action"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="large">
            Large alert with close action. <mui-link href="#">Learn more</mui-link>
            <mui-button slot="action">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="info" size="medium">
            Medium alert with close action. <mui-link href="#">Learn more</mui-link>
            <mui-button slot="action">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>

          <mui-alert variant="warning" size="small">
            Small alert with close action. <mui-link href="#">Learn more</mui-link>
            <mui-button slot="action">
              <mui-icon-close></mui-icon-close>
            </mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="info" size="medium"&gt;
          <br />
          &nbsp;&nbsp;Medium alert with close action. &lt;mui-link href="#"&gt;Learn more&lt;/mui-link&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-close&gt;&lt;/mui-icon-close&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>

      <story-card id="undo-action" title="${storyMeta["undo-action"].title}" description="${storyMeta["undo-action"].description}" usage="${storyMeta["undo-action"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-alert variant="success" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>

          <mui-alert variant="info" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>

          <mui-alert variant="warning" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>

          <mui-alert variant="error" size="medium">
            Your message has been sent successfully.
            <mui-button slot="action">
              Undo
            </mui-button>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="positive" size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="action"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Undo
          <br />
          &nbsp;&nbsp;&lt;/mui-button&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>


      <story-card id="link-action" title="${storyMeta["link-action"].title}" description="${storyMeta["link-action"].description}" usage="${storyMeta["link-action"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">

          <mui-alert variant="success" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>

          <mui-alert variant="info" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>

          <mui-alert variant="warning" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>

          <mui-alert variant="error" size="medium">
            Your subscription will expire today.
            <mui-link slot="action">
              Upgrade
            </mui-link>
          </mui-alert>
        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-alert variant="warning" size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link slot="action"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Upgrade
          <br />
          &nbsp;&nbsp;&lt;/mui-link&gt;
          <br />
          &lt;/mui-alert&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        attrs-reference='${attrsReference}'
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-alert"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-alert", storyAlert);
