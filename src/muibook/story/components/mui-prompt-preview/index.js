import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptPreview");
    const propItems = [
      { name: "value", type: "string", options: "{text}", default: "", description: "Preview content used for title/snippet when text is visible." },
      { name: "badge", type: "string", options: "{text}", default: "Auto", description: "Badge label. Auto-detects when not provided." },
      { name: "label", type: "string", options: "{text}", default: "Pasted Content", description: "Fallback title when value is empty." },
      {
        name: "bg-image",
        type: "string",
        options: "{url}",
        default: "",
        description: "Background image URL. Image mode hides text by default.",
      },
      { name: "image-tint", type: "string", options: "{color}", default: "", description: "Tint overlay color used in image mode." },
      { name: "accent", type: "string", options: "{color}", default: "", description: "Accent tone used for non-image surfaces." },
      { name: "inverted", type: "boolean", options: "inverted", default: "", description: "Inverted contrast treatment." },
      { name: "show-text", type: "boolean", options: "show-text", default: "", description: "Force text visible when bg-image is present." },
      { name: "badge-only", type: "boolean", options: "badge-only", default: "", description: "Force badge-only mode." },
      { name: "animated", type: "boolean", options: "animated", default: "", description: "Enable scanline/pulse animation (unless off mode)." },
      {
        name: "clickable",
        type: "boolean",
        options: "clickable",
        default: "",
        description: "Dispatches prompt-preview-open on click/Enter/Space for consumer-managed dialog flows.",
      },
      {
        name: "animation-mode",
        type: "string",
        options: "loop, once, off",
        default: "loop",
        description: "Controls animation loop behavior.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            name="${prop.name}"
            type="${prop.type}"
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt-preview";<br>
        </mui-code>
      </spec-card>

      <props-card title="Prompt Preview">
        <story-type-table slot="body">
          ${rows}
        </story-type-table>
      </props-card>

      <story-card id="predropped" title="Pre-dropped Preview" description="Shows long pasted input before submit.">
        <mui-prompt-preview
          slot="body"
          badge="JSON"
          animated
          value='{"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment"]}'
        ></mui-prompt-preview>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-preview<br />
          &nbsp;&nbsp;badge="JSON"<br />
          &nbsp;&nbsp;value='{"source":"crm","query":"CSAT by feature"}'<br />
          &gt;&lt;/mui-prompt-preview&gt;
        </story-code-block>
      </story-card>

      <story-card id="types" title="Payload Types" description="Set badge directly or let the component infer it from value.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-preview
            badge="JSON"
            animated
            value='{"name":"dashboard","version":"2.0.0","mode":"compact"}'
          ></mui-prompt-preview>
          <mui-prompt-preview
            badge="CSS"
            animated
            value=":root { --surface: #111; --text: #f5f5f5; --radius: 8px; }"
          ></mui-prompt-preview>
          <mui-prompt-preview
            badge="JS"
            animated
            value="const summary = data.filter(active).map(normalize).slice(0, 10);"
          ></mui-prompt-preview>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-preview badge="JSON" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;mui-prompt-preview badge="CSS" ...&gt;&lt;/mui-prompt-preview&gt;<br />
          &lt;mui-prompt-preview badge="JS" ...&gt;&lt;/mui-prompt-preview&gt;
        </story-code-block>
      </story-card>

      <story-card id="pasted-image" title="Pasted Image" description="Image previews default to badge-only, with no text overlay.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-preview
            badge="IMG"
            bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
            image-tint="var(--grey-1200)"
            value=""
          ></mui-prompt-preview>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-preview badge="IMG" bg-image="{url}" image-tint="var(--grey-1200)"&gt;&lt;/mui-prompt-preview&gt;
        </story-code-block>
      </story-card>

      <story-card id="dismiss-tracking" title="Dismiss Tracking" description="Capture dismiss payloads for API calls and analytics before removing.">
        <mui-v-stack slot="body" space="var(--space-100)">
          <mui-prompt-preview
            id="trackingPreview"
            badge="JSON"
            animated
            value='{"query":"Retention risk users","window":"30d"}'
          ></mui-prompt-preview>
          <mui-body id="trackingStatus" size="x-small" variant="optional">Waiting for dismiss…</mui-body>
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

      <story-card id="open-dialog" title="Click to Open Dialog" description="Use the prompt-preview-open event to open a dialog with full pasted content.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-preview
            id="dialogTriggerPreview"
            clickable
            badge="JSON"
            animated
            value='{"source":"crm","query":"CSAT by feature","range":"Q4","include":["pain_points","sentiment","churn_drivers"]}'
          ></mui-prompt-preview>
          <mui-dialog id="previewDialog" width="560px" content-padding="none">
            <mui-heading slot="title" size="5">Pasted Content</mui-heading>
            <mui-code id="previewDialogCode" size="small" wrap></mui-code>
          </mui-dialog>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          preview.addEventListener("prompt-preview-open", (event) =&gt; {<br />
          &nbsp;&nbsp;dialogCode.textContent = event.detail.value;<br />
          &nbsp;&nbsp;dialog.open();<br />
          });<br /><br />
          &lt;mui-prompt-preview clickable ...&gt;&lt;/mui-prompt-preview&gt;
        </story-code-block>
      </story-card>

      <story-card id="open-dialog-image" title="Click Image to Open Dialog" description="Open a dialog with the full pasted image preview.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-preview
            id="dialogImageTriggerPreview"
            clickable
            badge="IMG"
            bg-image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
            image-tint="var(--grey-1200)"
            value=""
          ></mui-prompt-preview>
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
          preview.addEventListener("prompt-preview-open", (event) =&gt; {<br />
          &nbsp;&nbsp;dialogImage.src = event.detail.bgImage;<br />
          &nbsp;&nbsp;dialog.open();<br />
          });<br /><br />
          &lt;mui-prompt-preview clickable badge="IMG" bg-image="{url}" ...&gt;&lt;/mui-prompt-preview&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Preview"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="predropped::Pre-dropped Preview|||types::Payload Types|||pasted-image::Pasted Image|||dismiss-tracking::Dismiss Tracking|||open-dialog::Open Dialog|||open-dialog-image::Open Image Dialog"></story-quicklinks>
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

      const preview = document.createElement("mui-prompt-preview");
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

    dialogTriggerPreview?.addEventListener("prompt-preview-open", (event) => {
      const payload = event.detail || {};
      if (previewDialogCode) {
        previewDialogCode.textContent = payload.value || "";
      }
      previewDialog?.open();
    });

    dialogImageTriggerPreview?.addEventListener("prompt-preview-open", (event) => {
      const payload = event.detail || {};
      if (previewDialogImage) {
        previewDialogImage.setAttribute("src", payload.bgImage || "");
      }
      previewImageDialog?.open();
    });
  }
}

customElements.define("story-prompt-preview", StoryPromptPreview);
