import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptWork extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptWork");

    const stories = /*html*/ `
      <story-api-types tag="mui-prompt-work" title="Prompt Work"></story-api-types>

      <story-card
        id="default"
        title="Default"
        usage="Use in the prompt message header slot when an agent response needs a compact work summary.|||Keep detail rows short and supporting, not the main response."
      >
        <mui-prompt-work slot="body" label="Worked for 4m 10s" open rule>
          <mui-body size="x-small" variant="tertiary">Reviewed the composition story structure.</mui-body>
          <mui-body size="x-small" variant="tertiary">Updated prompt-message layout, header, and footer slots.</mui-body>
          <mui-body size="x-small" variant="tertiary">Ran CEM and Muibook build checks.</mui-body>
        </mui-prompt-work>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-work label="Worked for 4m 10s" open rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-body size="x-small" variant="tertiary"&gt;Reviewed the composition story structure.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body size="x-small" variant="tertiary"&gt;Ran CEM and Muibook build checks.&lt;/mui-body&gt;<br />
          &lt;/mui-prompt-work&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="nested"
        title="Nested Work"
        usage="Use pending for active work states.|||Place Prompt Work inside another Prompt Work for secondary rows such as reading files, running checks, or applying changes.|||Nested rows are compact supporting detail."
      >
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-prompt-work label="Thinking" status pending></mui-prompt-work>
          <mui-prompt-work label="Working for 31s" pending>
            <mui-prompt-work label="Read 4 files">
              <mui-body size="x-small" variant="tertiary">Checked Prompt, Prompt Work, Agent Chat, and changelog sources.</mui-body>
            </mui-prompt-work>
          </mui-prompt-work>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-work label="Thinking" status pending&gt;&lt;/mui-prompt-work&gt;<br />
          &lt;mui-prompt-work label="Working for 31s" pending&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-work label="Read 4 files"&gt;...&lt;/mui-prompt-work&gt;<br />
          &lt;/mui-prompt-work&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="in-message"
        title="In Prompt Message"
        usage="Slot Prompt Work into Prompt Message header to keep the response body clean."
      >
        <mui-prompt-message slot="body" size="medium" variant="ghost">
          <mui-prompt-work slot="header" label="Worked for 52s" rule>
            <mui-body size="x-small" variant="tertiary">Checked the component API metadata.</mui-body>
            <mui-body size="x-small" variant="tertiary">Updated the story route and navigation.</mui-body>
          </mui-prompt-work>
          <mui-v-stack space="var(--space-200)">
            <mui-heading level="3" size="6">Added the prompt work component.</mui-heading>
            <mui-body size="small">The work summary stays collapsible while the response content remains readable.</mui-body>
          </mui-v-stack>
        </mui-prompt-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-message variant="ghost"&gt;<br />
          &nbsp;&nbsp;&lt;mui-prompt-work slot="header" label="Worked for 52s" rule&gt;...&lt;/mui-prompt-work&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading level="3" size="6"&gt;Added the prompt work component.&lt;/mui-heading&gt;<br />
          &lt;/mui-prompt-message&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Work"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-prompt-work"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||nested::Nested Work|||in-message::In Prompt Message"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-prompt-work", StoryPromptWork);
