import { getComponentDocs } from "../../../utils/story-data";

class storyLoader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Loader");

    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
    `;

    ["loading", "animation", "direction", "duration", "delay"];

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slot your UI inside to adopt animation",
      },
      {
        name: "loading",
        type: "boolean",
        options: "",
        default: "",
        description: "Controls the animation behvaiour",
      },
      {
        name: "animation",
        type: "string",
        options: "fade-in, pulsate, translate",
        default: "fade-in",
        description: "Animation type",
      },
      {
        name: "direction",
        type: "string",
        options: "up, right, down, left",
        default: "",
        description: "Direction for translate animation type",
      },
      {
        name: "duration",
        type: "number",
        options: "",
        default: "1s",
        description: "Timing function speed",
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
        `,
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
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
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-loader";<br>
          import "@muibook/components/mui-spinner";<br>
        </mui-code>
      </spec-card>

      <props-card title="Loader">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card
        id="pulsate"
        title="Pulsate"
        usage="Prefer token, rem, and percentage sizing over fixed pixel values for skeleton placeholders.|||Use mui-v-stack, mui-h-stack, and mui-grid to compose loading layouts.|||Keep the skeleton structure aligned to the real content hierarchy for smoother transitions.">
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


      <story-card id="fade-in" title="Fade-In">
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

      <story-card title="Translate: Up" description="Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.">
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

      <story-card title="Translate: Down" description="Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.">
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


      <story-card title="Translate: Left" description="Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.">
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


      <story-card title="Translate: Right" description="Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.">
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

      <story-card id="duration" title="Duration" description="10s animation duration">
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

      <story-card id="loader-spinner" title="Loader + Spinner" description="Use Loader to animate the container while Spinner gives immediate loading feedback.">
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
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="pulsate::Pulsate|||fade-in::Fade-In|||duration::Duration|||loader-spinner::Loader + Spinner">
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
