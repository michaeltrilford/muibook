import { getComponentDocs } from "../../../utils/story-data";

class storyLoader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Loader");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Loader"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; }
    `;

    const Skeleton = /*html*/ `
      <mui-grid col="2fr 1fr">
        <mui-v-stack space="var(--space-600);" style="padding: var(--space-600)">
          <mui-v-stack space="var(--space-400);">
            <mui-v-stack space="var(--space-300);" alignx="start">
              <mui-h-stack space="var(--space-400)" aligny="start">
                <mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"></mui-skeleton>
                <mui-skeleton shape="rect" size="x-small" width="var(--space-800)" height="var(--space-500)" radius="var(--badge-radius)" animation="shimmer"></mui-skeleton>
              </mui-h-stack>
            </mui-v-stack>
            <mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"></mui-skeleton>
            </mui-v-stack>
            <mui-h-stack space="var(--space-200)" alignx='start'>
              <mui-skeleton shape="rect" height="var(--space-600)" width="10rem" radius="var(--radius-500)" animation="shimmer"></mui-skeleton>
              <mui-skeleton shape="rect" height="var(--space-600)" width="10rem" radius="var(--radius-500)" animation="shimmer"></mui-skeleton>
          </mui-h-stack>
        </mui-v-stack>
      </mui-grid>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-loader" title="Loader"></story-api-types>

      <story-card id="pulsate" title="${storyMeta["pulsate"].title}" description="${storyMeta["pulsate"].description}" usage="${storyMeta["pulsate"].usage}">
        <mui-loader data-loading loading animation="pulsate" slot="body">
          ${Skeleton}
        </mui-loader>
        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="pulsate"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>
      </story-card>


      <story-card id="fade-in" title="${storyMeta["fade-in"].title}" description="${storyMeta["fade-in"].description}" usage="${storyMeta["fade-in"].usage}">
        <mui-loader data-loading loading animation="fade-in" slot="body">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="fade-in"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>

      <story-card id="translate-up" title="${storyMeta["translate-up"].title}" description="${storyMeta["translate-up"].description}" usage="${storyMeta["translate-up"].usage}">
        <mui-loader data-loading loading animation="translate" slot="body" direction="up">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="translate" direction="up"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>

      <story-card id="translate-down" title="${storyMeta["translate-down"].title}" description="${storyMeta["translate-down"].description}" usage="${storyMeta["translate-down"].usage}">
        <mui-loader data-loading loading animation="translate" slot="body" direction="down">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="translate" direction="down"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>


      <story-card id="translate-left" title="${storyMeta["translate-left"].title}" description="${storyMeta["translate-left"].description}" usage="${storyMeta["translate-left"].usage}">
        <mui-loader data-loading loading animation="translate" slot="body" direction="left">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="translate" direction="left"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>


      <story-card id="translate-right" title="${storyMeta["translate-right"].title}" description="${storyMeta["translate-right"].description}" usage="${storyMeta["translate-right"].usage}">
        <mui-loader data-loading loading animation="translate" slot="body" direction="right">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="translate" direction="right"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>

      <story-card id="duration" title="${storyMeta["duration"].title}" description="${storyMeta["duration"].description}" usage="${storyMeta["duration"].usage}">
        <mui-loader data-loading loading animation="translate" duration="10s" slot="body">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="translate" duration="10s"&gt;<br>
          &nbsp;&nbsp;&lt;mui-grid col="2fr 1fr"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600)" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton shape="line" size="large" width="30rem" height="var(--space-800)" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-skeleton lines="3" line-widths="80%,70%,80%" animation="shimmer"&gt;&lt;/mui-skeleton&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-grid&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>

      <story-card id="spinner" title="${storyMeta["spinner"].title}" description="${storyMeta["spinner"].description}" usage="${storyMeta["spinner"].usage}">
        <mui-loader data-loading loading animation="fade-in" slot="body">
          <mui-v-stack alignX="center" alignY="center" space="var(--space-300)" style="padding: var(--space-700);">
            <mui-spinner size="medium" label="Loading dashboard"></mui-spinner>
            <mui-body size="small">Loading dashboard data...</mui-body>
          </mui-v-stack>
        </mui-loader>
        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation=&quot;fade-in&quot;&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack alignX=&quot;center&quot; alignY=&quot;center&quot; space=&quot;var(--space-300)&quot;&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-spinner size=&quot;medium&quot; label=&quot;Loading dashboard&quot;&gt;&lt;/mui-spinner&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size=&quot;small&quot;&gt;Loading dashboard data...&lt;/mui-body&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-loader&gt;
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

        imports='["@muibook/components/mui-loader"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}">
        </story-quicklinks>
        ${stories}
      </story-template>
    `;

    // --- generic restart logic ---
    function restartAnimation(el) {
      if (!el) return;
      el.removeAttribute("loading");
      requestAnimationFrame(() => {
        el.setAttribute("loading", "");
      });
    }

    // Find ALL restart buttons and hook them to their nearest <mui-loader>
    this.shadowRoot.querySelectorAll("[data-restart]").forEach((btn) => {
      const card = btn.closest("story-card");
      const loadingEl = card?.querySelector("[data-loading]");
      if (loadingEl) {
        btn.addEventListener("click", () => restartAnimation(loadingEl));
      }
    });
  }
}

customElements.define("story-loader", storyLoader);
