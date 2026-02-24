import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptMessage");

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "mui-body, text",
        default: "",
        description: "Message content for the prompt row.",
      },
      {
        name: "slot=&#8220;avatar&#8221;",
        type: "slot (named)",
        options: "mui-avatar",
        default: "",
        description: "Avatar content displayed before message text.",
      },
      {
        name: "size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "medium",
        description: "Scales avatar and body rhythm together.",
      },
      {
        name: "variant",
        type: "string",
        options: "default, ghost",
        default: "default",
        description: "Visual style of the message shell.",
      },
      {
        name: "density",
        type: "string",
        options: "default, compact",
        default: "default",
        description: "Controls inner padding density.",
      },
      {
        name: "style",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "Apply layout styles on host.",
      },
      {
        name: "class",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "Apply class-based layout styles on host.",
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
        `,
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        const isLast = index === propItems.length - 1 ? "last-child" : "";
        return /*html*/ `
          <mui-accordion-block heading="${prop.name}" class="${isLast}">
            <story-type-slat
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

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt-message";<br>
        </mui-code>
      </spec-card>

      <props-card title="Prompt Message">
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
        id="default"
        title="Default"
        usage="Use as the default conversation row shell.|||Set size='medium' for standard chat density."
      >
        <mui-prompt-message slot="body" size="medium">
          <mui-avatar size="small" slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
          <mui-body size="small">Can you provide CSAT data for the past quarter and highlight pain points by feature area?</mui-body>
        </mui-prompt-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-message size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-avatar slot="avatar" label="Michael Trilford" background="neutral"&gt;&lt;/mui-avatar&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;Can you provide CSAT data...&lt;/mui-body&gt;
          <br />
          &lt;/mui-prompt-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="list" title="Conversation List" usage="Mix sizes by speaker priority and layout density.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-message size="small">
            <mui-avatar size="small" slot="avatar" label="Support Agent" background="neutral"></mui-avatar>
            <mui-body size="small">I have reviewed your request and prepared a draft summary.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="medium">
            <mui-avatar size="small" slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
            <mui-body size="small">Great, include sentiment trends and top customer themes.</mui-body>
          </mui-prompt-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-prompt-message size="small"&gt;...&lt;/mui-prompt-message&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-prompt-message size="medium"&gt;...&lt;/mui-prompt-message&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="Sizes" usage="size controls avatar and body scale together.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-message size="x-small">
            <mui-avatar slot="avatar" label="XS"></mui-avatar>
            <mui-body>Compact x-small prompt message.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="small">
            <mui-avatar slot="avatar" label="S"></mui-avatar>
            <mui-body>Small prompt message sizing.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="medium">
            <mui-avatar slot="avatar" label="M"></mui-avatar>
            <mui-body>Medium prompt message sizing (default).</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="large">
            <mui-avatar slot="avatar" label="L"></mui-avatar>
            <mui-body>Large prompt message sizing.</mui-body>
          </mui-prompt-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-message size="x-small"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="small"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="medium"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="large"&gt;...&lt;/mui-prompt-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="ghost" title="Ghost Variant" usage="variant='ghost' removes border and background while preserving structure.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-message size="x-small" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost x-small.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="small" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost small.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="medium" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost medium.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="large" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost large.</mui-body>
          </mui-prompt-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-message size="x-small" variant="ghost"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="small" variant="ghost"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="medium" variant="ghost"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="large" variant="ghost"&gt;...&lt;/mui-prompt-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="compact" title="Compact Density" usage="density='compact' reduces padding to var(--stroke-size-200).">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-message size="x-small" density="compact">
            <mui-avatar slot="avatar" label="C"></mui-avatar>
            <mui-body>Compact x-small.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="small" density="compact">
            <mui-avatar slot="avatar" label="C"></mui-avatar>
            <mui-body>Compact small.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="medium" density="compact">
            <mui-avatar slot="avatar" label="C"></mui-avatar>
            <mui-body>Compact medium.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message size="large" density="compact">
            <mui-avatar slot="avatar" label="C"></mui-avatar>
            <mui-body>Compact large.</mui-body>
          </mui-prompt-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-message size="x-small" density="compact"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="small" density="compact"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="medium" density="compact"&gt;...&lt;/mui-prompt-message&gt;<br />
          &lt;mui-prompt-message size="large" density="compact"&gt;...&lt;/mui-prompt-message&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Message"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||list::Conversation List|||sizes::Sizes|||ghost::Ghost Variant|||compact::Compact Density"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-prompt-message", StoryPromptMessage);
