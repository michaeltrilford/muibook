import { getComponentDocs } from "../../../utils/story-data";

class StoryPreviewChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PreviewChip");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Preview Chip"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-preview-chip" title="Preview Chip"></story-api-types>

      <story-card
        id="predropped"
        title="${storyMeta["predropped"].title}"
        description="${storyMeta["predropped"].description || ""}"
        usage="${storyMeta["predropped"].usage}"
      >
        <mui-preview-chip
          slot="body"
          badge="JSON"
          animated
          value='{"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment"]}'
        ></mui-preview-chip>
        <story-code-block slot="footer" scrollable>
          &lt;mui-preview-chip<br />
          &nbsp;&nbsp;badge="JSON"<br />
          &nbsp;&nbsp;value='{"source":"crm","query":"CSAT by feature"}'<br />
          &gt;&lt;/mui-preview-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="types"
        title="${storyMeta["types"].title}"
        description="${storyMeta["types"].description || ""}"
        usage="${storyMeta["types"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-preview-chip
            badge="JSON"
            animated
            value='{"name":"dashboard","version":"2.0.0","mode":"compact"}'
          ></mui-preview-chip>
          <mui-preview-chip
            badge="CSS"
            animated
            value=":root { --surface: #111; --text: #f5f5f5; --radius: 8px; }"
          ></mui-preview-chip>
          <mui-preview-chip
            badge="JS"
            animated
            value="const summary = data.filter(active).map(normalize).slice(0, 10);"
          ></mui-preview-chip>
          <mui-preview-chip
            badge="TS"
            animated
            value="type PromptPayload = { source: string; query: string; include: string[] };"
          ></mui-preview-chip>
          <mui-preview-chip
            badge="MD"
            animated
            value="## Q4 Notes\n- Churn up in SMB\n- CSAT strongest in onboarding"
          ></mui-preview-chip>
          <mui-preview-chip
            badge="SQL"
            animated
            value="SELECT feature_area, AVG(csat) FROM survey_responses GROUP BY feature_area;"
          ></mui-preview-chip>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-preview-chip badge="JSON" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;mui-preview-chip badge="CSS" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;mui-preview-chip badge="JS" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;mui-preview-chip badge="TS" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;mui-preview-chip badge="MD" ...&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;mui-preview-chip badge="SQL" ...&gt;&lt;/mui-preview-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="loading"
        title="${storyMeta["loading"].title}"
        description="${storyMeta["loading"].description || ""}"
        usage="${storyMeta["loading"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-preview-chip
            badge="JSON"
            value='{"source":"crm","query":"CSAT by feature","range":"Q4"}'
          ></mui-preview-chip>
          <mui-preview-chip
            badge="JSON"
            loading
            loading-label="Resolving preview"
            value='{"source":"crm","query":"CSAT by feature","range":"Q4"}'
          ></mui-preview-chip>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-preview-chip badge="JSON" value='{"source":"crm","query":"CSAT"}'&gt;&lt;/mui-preview-chip&gt;<br />
          &lt;mui-preview-chip badge="JSON" loading loading-label="Resolving preview" value='{"source":"crm","query":"CSAT"}'&gt;&lt;/mui-preview-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="pasted-image"
        title="${storyMeta["pasted-image"].title}"
        description="${storyMeta["pasted-image"].description || ""}"
        usage="${storyMeta["pasted-image"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-preview-chip
            badge="IMG"
            bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
            image-tint="var(--grey-1200)"
            value=""
          ></mui-preview-chip>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-preview-chip badge="IMG" bg-image="{url}" image-tint="var(--grey-1200)"&gt;&lt;/mui-preview-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="dismiss-tracking"
        title="${storyMeta["dismiss-tracking"].title}"
        description="${storyMeta["dismiss-tracking"].description || ""}"
        usage="${storyMeta["dismiss-tracking"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-100)">
          <mui-preview-chip
            id="trackingPreview"
            badge="JSON"
            animated
            value='{"query":"Retention risk users","window":"30d"}'
          ></mui-preview-chip>
          <mui-body id="trackingStatus" size="x-small" variant="secondary">Waiting for dismiss…</mui-body>
          <mui-button id="trackingReset" size="x-small" variant="primary">Reset Example</mui-button>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          preview.addEventListener("dismiss", async (event) =&gt; {<br />
          &nbsp;&nbsp;event.preventDefault();<br />
          &nbsp;&nbsp;// send event.detail to API / analytics<br />
          &nbsp;&nbsp;preview.remove();<br />
          });
        </story-code-block>
      </story-card>

      <story-card
        id="open-dialog"
        title="${storyMeta["open-dialog"].title}"
        description="${storyMeta["open-dialog"].description || ""}"
        usage="${storyMeta["open-dialog"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-preview-chip
            id="dialogTriggerPreview"
            clickable
            badge="JSON"
            animated
            value='{"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment","churn_drivers"]}'
          ></mui-preview-chip>
          <mui-dialog id="previewDialog" width="560px" content-padding="none">
            <mui-heading slot="title" size="5">Pasted Content</mui-heading>
            <mui-code id="previewDialogCode" size="small" wrap></mui-code>
          </mui-dialog>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          preview.addEventListener("preview-chip-open", (event) =&gt; {<br />
          &nbsp;&nbsp;dialogCode.textContent = JSON.stringify(JSON.parse(event.detail.value), null, 2);<br />
          &nbsp;&nbsp;dialog.open();<br />
          });<br /><br />
          &lt;mui-preview-chip clickable ...&gt;&lt;/mui-preview-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="open-dialog-image"
        title="${storyMeta["open-dialog-image"].title}"
        description="${storyMeta["open-dialog-image"].description || ""}"
        usage="${storyMeta["open-dialog-image"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-preview-chip
            id="dialogImageTriggerPreview"
            clickable
            badge="IMG"
            bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
            image-tint="var(--grey-1200)"
            value=""
          ></mui-preview-chip>
          <mui-dialog id="previewImageDialog" width="640px" content-padding="none">
            <mui-heading slot="title" size="5">Pasted Image</mui-heading>
            <img
              id="previewDialogImage"
              alt="Pasted preview"
              style="display:block; width:100%; height:auto; border-radius: var(--radius-100);"
            />
          </mui-dialog>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          preview.addEventListener("preview-chip-open", (event) =&gt; {<br />
          &nbsp;&nbsp;dialogImage.src = event.detail.bgImage;<br />
          &nbsp;&nbsp;dialog.open();<br />
          });<br /><br />
          &lt;mui-preview-chip clickable badge="IMG" bg-image="{url}" ...&gt;&lt;/mui-preview-chip&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-preview-chip"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;

    const trackingPreview = this.shadowRoot.querySelector("#trackingPreview");
    const trackingStatus = this.shadowRoot.querySelector("#trackingStatus");
    const trackingReset = this.shadowRoot.querySelector("#trackingReset");
    let latestPayload = { query: "Retention risk users", window: "30d" };

    const bindTrackingDismiss = (previewEl) => {
      previewEl?.addEventListener("dismiss", (event) => {
        event.preventDefault();
        const payload = event.detail || {};
        latestPayload = { ...latestPayload, ...payload };
        if (trackingStatus) {
          trackingStatus.textContent = `Tracked dismiss: ${JSON.stringify(payload)}`;
        }
        window.setTimeout(() => {
          previewEl.remove();
        }, 250);
      });
    };

    bindTrackingDismiss(trackingPreview);

    trackingReset?.addEventListener("click", () => {
      const stack = this.shadowRoot.querySelector("#dismiss-tracking [slot=\"body\"]");
      if (!stack || this.shadowRoot.querySelector("#trackingPreview")) return;

      const preview = document.createElement("mui-preview-chip");
      preview.id = "trackingPreview";
      preview.setAttribute("badge", "JSON");
      preview.setAttribute("animated", "");
      preview.setAttribute("value", JSON.stringify({ query: latestPayload.query, window: latestPayload.window }));
      stack.insertBefore(preview, trackingStatus);
      bindTrackingDismiss(preview);
      if (trackingStatus) trackingStatus.textContent = "Waiting for dismiss…";
    });

    const dialogTriggerPreview = this.shadowRoot.querySelector("#dialogTriggerPreview");
    const previewDialog = this.shadowRoot.querySelector("#previewDialog");
    const previewDialogCode = this.shadowRoot.querySelector("#previewDialogCode");
    const dialogImageTriggerPreview = this.shadowRoot.querySelector("#dialogImageTriggerPreview");
    const previewImageDialog = this.shadowRoot.querySelector("#previewImageDialog");
    const previewDialogImage = this.shadowRoot.querySelector("#previewDialogImage");

    dialogTriggerPreview?.addEventListener("preview-chip-open", (event) => {
      const payload = event.detail || {};
      if (previewDialogCode) {
        try {
          previewDialogCode.textContent = JSON.stringify(JSON.parse(payload.value || ""), null, 2);
        } catch {
          previewDialogCode.textContent = payload.value || "";
        }
      }
      previewDialog?.open();
    });

    dialogImageTriggerPreview?.addEventListener("preview-chip-open", (event) => {
      const payload = event.detail || {};
      if (previewDialogImage) {
        previewDialogImage.setAttribute("src", payload.bgImage || "");
      }
      previewImageDialog?.open();
    });
  }
}

customElements.define("story-preview-chip", StoryPreviewChip);
