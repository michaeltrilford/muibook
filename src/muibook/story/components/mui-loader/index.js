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
        `
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
      <mui-v-stack space="var(--space-600);" style="padding: var(--space-600)">
        <mui-v-stack space="var(--space-300);">
          <!-- Title -->
          <div style="height: var(--heading-font-size-100); width: 80%; max-width: 200px; background: var(--surface-elevated-100); border-radius: var(--radius-200);"></div>
          <!-- Subtitle -->
          <div style="height: var(--heading-font-size-400); width: 60%; max-width: 350px; background: var(--surface-elevated-100); border-radius: var(--radius-200);"></div>
        </mui-v-stack>
        <mui-v-stack space="var(--space-400);">
          <!-- Content -->
          <div style="height: var(--text-font-size-m); width: 90%; max-width: 400px; background: var(--surface-elevated-100); border-radius: var(--radius-200);"></div>
          <div style="height: var(--text-font-size-m); width: 70%; max-width: 380px; background: var(--surface-elevated-100); border-radius: var(--radius-200);"></div>
          <div style="height: var(--text-font-size-m); width: 90%; max-width: 410px; background: var(--surface-elevated-100); border-radius: var(--radius-200);"></div>
        </mui-v-stack>
        <!-- Actions -->
        <mui-button-group>
          <div style="height: 40px; width: 100%; max-width: 120px; border: var(--border-thin); border-color: transparent; background: var(--surface-elevated-100); border-radius: var(--action-radius);"></div>
          <div style="height: 40px; width: 100%; max-width: 120px; border: var(--border-thin); border-color: var(--surface-elevated-100); border-radius: var(--action-radius);"></div>
        </mui-button-group>
      </mui-v-stack>
    `;

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-loader";<br>
        </mui-code>
      </spec-card>

      <props-card title="Loading">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Pulsate">
        <mui-loader data-loading loading animation="pulsate" slot="body">
          ${Skeleton}
        </mui-loader>
        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="pulsate"&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>
      </story-card>

      <story-card title="Fade-In">
        <mui-loader data-loading loading animation="fade-in" slot="body">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="fade-in"&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
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
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
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
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
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
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
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
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-loader&gt;
        </story-code-block>

      </story-card>

      <story-card title="Duration" description="10s animation duration">
        <mui-loader data-loading loading animation="translate" duration="2s" slot="body">
           ${Skeleton}
        </mui-loader>

        <mui-h-stack alignX="center" slot="footer" style="border-top: var(--border-thin); background: var(--surface-elevated-200); padding: var(--space-100);">
          <mui-button variant="tertiary" data-restart>Reload Story</mui-button>
        </mui-h-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-loader loading animation="translate" duration="10s"&gt;<br>
          &nbsp;&nbsp;&lt;mui-v-stack space="var(--space-600);" style="padding: var(--space-600)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--heading-font-size-400); width:60%; max-width:350px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-400);"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:400px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:70%; max-width:380px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:var(--text-font-size-m); width:90%; max-width:410px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; background:var(--surface-elevated-100); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="height:40px; width:100%; max-width:120px; border:var(--border-thin); border-radius:var(--action-radius);"&gt;&lt;/div&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br>
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
