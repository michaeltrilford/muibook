import { getComponentDocs } from "../../../utils/story-data";

class StorySubmenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Submenu");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Submenu"></story-metadata-empty>`;
      return;
    }

    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const menuWidths = {
      "x-small": "min(100%, 17rem)",
      small: "min(100%, 20rem)",
      medium: "min(100%, 24rem)",
      large: "min(100%, 28rem)",
    };
    const nestedWidths = {
      "x-small": "min(100%, 15rem)",
      small: "min(100%, 17rem)",
      medium: "min(100%, 19rem)",
      large: "min(100%, 22rem)",
    };

    const submenu = (size, label = "Speech") => /*html*/ `
      <mui-submenu size="${size}">
        <mui-button>${label}</mui-button>
        <mui-menu width="${nestedWidths[size]}">
          <mui-button>Dictation</mui-button>
          <mui-button>Voice control</mui-button>
          <mui-button>Read aloud</mui-button>
        </mui-menu>
      </mui-submenu>
    `;

    const sizes = [
      {
        size: "x-small",
        actions: `${submenu("x-small")}<mui-button>Writing</mui-button><mui-button>Translation</mui-button>`,
      },
      {
        size: "small",
        actions: `<mui-button>Writing</mui-button>${submenu("small")}<mui-button>Translation</mui-button>`,
      },
      {
        size: "medium",
        actions: `<mui-button>Writing</mui-button><mui-button>Translation</mui-button>${submenu("medium")}`,
      },
      {
        size: "large",
        actions: `<mui-button>Writing</mui-button>${submenu("large")}<mui-button>Translation</mui-button>`,
      },
    ]
      .map(
        ({ size, actions }) => /*html*/ `
          <mui-menu size="${size}" width="${menuWidths[size]}">
            ${actions}
          </mui-menu>
        `,
      )
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-submenu" title="Submenu"></story-api-types>

      <story-card
        id="standalone"
        title="${storyMeta.standalone.title}"
        description="${storyMeta.standalone.description}"
        usage="${storyMeta.standalone.usage}"
      >
        <mui-submenu slot="body" size="medium">
          <mui-button>Speech</mui-button>
          <mui-menu width="min(100%, 19rem)">
            <mui-button>Dictation</mui-button>
            <mui-button>Voice control</mui-button>
            <mui-button>Read aloud</mui-button>
          </mui-menu>
        </mui-submenu>
        <story-code-block slot="footer" scrollable>
          &lt;mui-submenu size=&quot;medium&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Speech&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-menu width=&quot;min(100%, 19rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Dictation&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Voice control&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Read aloud&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-submenu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="composition"
        title="${storyMeta.composition.title}"
        description="${storyMeta.composition.description}"
        usage="${storyMeta.composition.usage}"
      >
        <mui-v-stack slot="body"  space="var(--space-400)">
          <mui-menu size="x-small" width="min(100%, 24rem)">
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="x-small" width="min(100%, 24rem)" inset>
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 24rem)">
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="small" width="min(100%, 24rem)" inset>
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)">
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="medium" width="min(100%, 24rem)" inset>
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 24rem)">
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>

          <mui-menu size="large" width="min(100%, 24rem)" inset>
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>


        </mui-v-stack>

        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Writing&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-submenu&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Speech&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width=&quot;min(100%, 19rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Dictation&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Voice control&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Read aloud&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;/mui-submenu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Translation&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="sizes"
        title="${storyMeta.sizes.title}"
        description="${storyMeta.sizes.description}"
        usage="${storyMeta.sizes.usage}"
      >
        <mui-v-stack slot="body" space="var(--space-400)" alignX="start">
          ${sizes}
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Submenu supplies the trigger treatment and chevron. --&gt;<br />
          &lt;mui-menu size=&quot;small&quot; width=&quot;min(100%, 20rem)&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Writing&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-submenu&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Speech&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width=&quot;min(100%, 17rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Dictation&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Voice control&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Read aloud&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;/mui-submenu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Translation&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="search"
        title="${storyMeta.search.title}"
        description="${storyMeta.search.description}"
        usage="${storyMeta.search.usage}"
      >
        <mui-menu slot="body" size="medium" width="min(100%, 24rem)" inset data-submenu-search-menu>
          <mui-search-input slot="top" label="Search language actions" placeholder="Search..."></mui-search-input>
          <mui-button data-search-option>Writing</mui-button>
          <mui-submenu data-search-option>
            <mui-button>Speech</mui-button>
            <mui-menu width="min(100%, 19rem)">
              <mui-button>Dictation</mui-button>
              <mui-button>Voice control</mui-button>
              <mui-button>Read aloud</mui-button>
            </mui-menu>
          </mui-submenu>
          <mui-button data-search-option>Translation</mui-button>
          <mui-body variant="secondary" role="status" aria-live="polite" hidden data-search-empty>
            No matching language actions
          </mui-body>
        </mui-menu>
        <story-code-block slot="footer" scrollable>
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot; inset&gt;<br />
          &nbsp;&nbsp;&lt;mui-search-input slot=&quot;top&quot; label=&quot;Search language actions&quot; placeholder=&quot;Search...&quot;&gt;&lt;/mui-search-input&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Writing&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-submenu&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Speech&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width=&quot;min(100%, 19rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Dictation&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Voice control&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;/mui-submenu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Translation&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-body variant=&quot;secondary&quot; role=&quot;status&quot; aria-live=&quot;polite&quot; hidden&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;No matching language actions<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="viewport"
        title="${storyMeta.viewport.title}"
        description="${storyMeta.viewport.description}"
        usage="${storyMeta.viewport.usage}"
      >
        <mui-h-stack slot="body" width="100%" alignX="end">
          <mui-menu size="medium" width="min(100%, 24rem)">
            <mui-button>Writing</mui-button>
            ${submenu("medium")}
            <mui-button>Translation</mui-button>
          </mui-menu>
        </mui-h-stack>
        <story-code-block slot="footer" scrollable>
          &lt;!-- Position the parent Menu normally. Submenu chooses the available viewport side. --&gt;<br />
          &lt;mui-menu size=&quot;medium&quot; width=&quot;min(100%, 24rem)&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Writing&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-submenu&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Speech&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width=&quot;min(100%, 19rem)&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Dictation&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&gt;Voice control&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &nbsp;&nbsp;&lt;/mui-submenu&gt;<br />
          &nbsp;&nbsp;&lt;mui-button&gt;Translation&lt;/mui-button&gt;<br />
          &lt;/mui-menu&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }
        [data-search-empty][hidden], [data-search-option][hidden] { display: none; }
      </style>
      <story-template
        title="${data?.title || "Submenu"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-submenu"]'
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    const searchMenu = this.shadowRoot.querySelector("[data-submenu-search-menu]");
    const search = searchMenu?.querySelector(':scope > mui-search-input[slot="top"]');
    const options = Array.from(searchMenu?.querySelectorAll(":scope > [data-search-option]") || []);
    const empty = searchMenu?.querySelector("[data-search-empty]");

    search?.addEventListener("input", (event) => {
      const query = String(event.detail?.value || "")
        .trim()
        .toLowerCase();
      let visible = 0;
      options.forEach((option) => {
        option.hidden = query.length > 0 && !option.textContent.toLowerCase().includes(query);
        if (!option.hidden) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    });
  }
}

customElements.define("story-submenu", StorySubmenu);
