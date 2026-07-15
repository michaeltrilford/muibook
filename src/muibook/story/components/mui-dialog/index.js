import { getComponentDocs } from "../../../utils/story-data";
import VisaBlack from "../../../images/networks/visa-black.svg";
import Guides from "../../../images/guru/guides.svg";

class storyDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

    // Open dialog buttons
    this.shadowRoot.querySelectorAll("mui-button[data-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-dialog");
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-dialog="${target}"]`);
        if (dialog) dialog.setAttribute("open", "");
      });
    });

    // Close buttons inside each dialog
    this.shadowRoot.querySelectorAll("mui-dialog[data-dialog]").forEach((dialog) => {
      dialog.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => dialog.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-dialog", storyDialog);
