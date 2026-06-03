import { getComponentApi, getComponentDynamicAttrs } from "../../utils/story-data";

const escapeHtml = (value = "") =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const codeValue = (value) => (value ? `<story-code-snippet>${escapeHtml(value)}</story-code-snippet>` : "-");
const primitiveTypes = new Set(["string", "number", "boolean", "object", "array", "null", "undefined", "unknown", "any"]);

const typeValue = (value) => {
  if (!value) return "-";

  const types = value.split("|").map((item) => item.trim());
  if (types.length === 1) {
    const literalMatch = value.trim().match(/^["']([^"']+)["']$/);
    if (literalMatch) return codeValue(literalMatch[1]);
    return primitiveTypes.has(value.trim()) ? escapeHtml(value.trim()) : codeValue(value);
  }

  return types
    .map((item) => {
      const literalMatch = item.match(/^["']([^"']+)["']$/);
      if (literalMatch) return codeValue(literalMatch[1]);
      return primitiveTypes.has(item) ? escapeHtml(item) : codeValue(item);
    })
    .join(" ");
};

const dynamicAttributeDescription =
  "In Shadow DOM, :has() can’t cross boundaries, so attributes are the practical way to react to structure. If a slot or type exists, set a host attribute to keep behaviour consistent across preview, builder, and export.";

const normalizeDynamicAttribute = (item) => {
  const name = typeof item === "string" ? item : item?.name;
  if (!name) return null;

  return {
    name,
    description:
      typeof item === "object" && item?.description
        ? item.description
        : `Set when ${name} structural state is present, allowing the component to keep preview, builder, and export styling aligned.`,
  };
};

const uniqueDynamicAttributes = (items = []) => {
  const attrsByName = new Map();

  items.forEach((item) => {
    const attr = normalizeDynamicAttribute(item);
    if (!attr || attrsByName.has(attr.name)) return;
    attrsByName.set(attr.name, attr);
  });

  return Array.from(attrsByName.values());
};

class StoryApiTypes extends HTMLElement {
  static get observedAttributes() {
    return ["tag", "title", "open", "attrs-reference"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  async render() {
    const tagName = this.getAttribute("tag");
    const title = this.getAttribute("title") || this.displayTitle || tagName || "API";
    this.displayTitle = title;
    if (this.hasAttribute("title")) this.removeAttribute("title");
    const declaration = tagName ? await getComponentApi(tagName) : null;
    const dynamicAttrsDefinition = tagName ? await getComponentDynamicAttrs(tagName) : null;

    if (!declaration) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    const attributeColumns = "minmax(6rem, 1fr) minmax(6rem, 1fr) minmax(12rem, 1.1fr) minmax(13rem, 2fr)";
    const dynamicAttributeColumns = "minmax(10rem, 1fr) minmax(13rem, 2fr)";
    const slotColumns = "minmax(10rem, 1fr) minmax(7rem, 0.65fr) minmax(13rem, 2fr)";
    const cssPropertyColumns = "minmax(10rem, 1fr) minmax(13rem, 2fr)";
    const dynamicAttributesFromReference = (() => {
      const raw = this.getAttribute("attrs-reference");
      if (!raw || !tagName) return [];

      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return parsed
          .filter((item) => item?.component === tagName)
          .flatMap((item) => [
            ...(Array.isArray(item.parentAttrs) ? item.parentAttrs : []),
            ...(Array.isArray(item.childAttrs) ? item.childAttrs : []),
          ])
          .filter((attr, index, attrs) => attr && attrs.indexOf(attr) === index);
      } catch {
        return [];
      }
    })();
    const dynamicAttributes = uniqueDynamicAttributes([
      ...(Array.isArray(dynamicAttrsDefinition?.attributes) ? dynamicAttrsDefinition.attributes : []),
      ...dynamicAttributesFromReference,
    ]);

    const dynamicAttributeSection = dynamicAttributes.length
      ? /*html*/ `
        <section>
          <mui-heading class="section-heading" size="5" level="3">Dynamic Attributes</mui-heading>
          <mui-v-stack class="section-note" space="var(--space-200)">
            <mui-body size="x-small">${dynamicAttributeDescription}</mui-body>
            <mui-h-stack class="section-note-link" space="var(--space-025)">
              <mui-body size="x-small">See it in action •</mui-body>
              <mui-link size="x-small" target="_blank" href="https://redactd.xyz">Attributes</mui-link>
            </mui-h-stack>
          </mui-v-stack>
          <mui-responsive breakpoint="560">
            <mui-table slot="showAbove">
              <mui-row-group heading>
                <mui-row columns="${dynamicAttributeColumns}" size="small">
                  <mui-cell class="card-slot" heading>Type</mui-cell>
                  <mui-cell class="card-slot" heading>Description</mui-cell>
                </mui-row>
              </mui-row-group>
              ${dynamicAttributes
                .map(
                  (attr) => {
                    return /*html*/ `
                    <mui-row-group>
                      <mui-row columns="${dynamicAttributeColumns}" size="small">
                        <mui-cell class="card-slot"><mui-body size="x-small">${codeValue(attr.name)}</mui-body></mui-cell>
                        <mui-cell class="card-slot"><mui-body size="x-small">${escapeHtml(attr.description)}</mui-body></mui-cell>
                      </mui-row>
                    </mui-row-group>
                  `;
                  },
                )
                .join("")}
            </mui-table>
            <div class="mobile-api-list" slot="showBelow">
              ${dynamicAttributes
                .map(
                  (attr) => {
                    return /*html*/ `
                    <div class="mobile-api-row">
                      <mui-v-stack space="var(--space-200)">
                        <mui-body size="small" weight="bold">${codeValue(attr.name)}</mui-body>
                        <mui-body size="x-small">${escapeHtml(attr.description)}</mui-body>
                      </mui-v-stack>
                    </div>
                  `;
                  },
                )
                .join("")}
            </div>
          </mui-responsive>
        </section>
      `
      : "";

    const renderAttributeSection = (heading, items = []) => {
      if (!items.length) return "";

      const rows = items
        .map((attribute) => {
          const name = escapeHtml(attribute.name);
          const type = typeValue(attribute.type?.text);
          const defaultValue = codeValue(attribute.default);
          const required = attribute.required
            ? '<span class="required" aria-hidden="true">*</span><span class="visually-hidden">(required)</span>'
            : "";
          const description = escapeHtml(
            attribute.appliesTo
              ? `${attribute.description} Applies to ${attribute.appliesTo}.`
              : attribute.description,
          );

          return /*html*/ `
            <mui-row-group>
              <mui-row columns="${attributeColumns}" size="small">
                <mui-cell class="card-slot"><mui-body size="x-small">${name}${required}</mui-body></mui-cell>
                <mui-cell class="card-slot"><mui-body size="x-small">${defaultValue}</mui-body></mui-cell>
                <mui-cell class="card-slot"><mui-body size="x-small">${type}</mui-body></mui-cell>
                <mui-cell class="card-slot"><mui-body size="x-small">${description}</mui-body></mui-cell>
              </mui-row>
            </mui-row-group>
          `;
        })
        .join("");

      const mobileRows = items
        .map((attribute) => {
          const name = escapeHtml(attribute.name);
          const required = attribute.required
            ? '<span class="required" aria-hidden="true">*</span><span class="visually-hidden">(required)</span>'
            : "";
          const description = escapeHtml(
            attribute.appliesTo
              ? `${attribute.description} Applies to ${attribute.appliesTo}.`
              : attribute.description,
          );

          return /*html*/ `
            <div class="mobile-api-row">
              <mui-v-stack space="var(--space-200)">
                <mui-body size="small" weight="bold">${name}${required}</mui-body>
                <mui-body size="x-small">${description}</mui-body>
                <mui-v-stack class="mobile-api-detail" space="var(--space-100)">
                  <mui-body size="x-small" weight="bold">Default</mui-body>
                  <mui-body size="x-small">${codeValue(attribute.default)}</mui-body>
                  <mui-body size="x-small" weight="bold">Type</mui-body>
                  <div class="type-values">${typeValue(attribute.type?.text)}</div>
                </mui-v-stack>
              </mui-v-stack>
            </div>
          `;
        })
        .join("");

      return /*html*/ `
        <section>
          <mui-heading class="section-heading" size="5" level="3">${heading}</mui-heading>
          <mui-responsive breakpoint="560">
            <mui-table slot="showAbove">
              <mui-row-group heading>
                <mui-row columns="${attributeColumns}" size="small">
                  <mui-cell class="card-slot" heading>Name</mui-cell>
                  <mui-cell class="card-slot" heading>Default</mui-cell>
                  <mui-cell class="card-slot" heading>Type</mui-cell>
                  <mui-cell class="card-slot" heading>Description</mui-cell>
                </mui-row>
              </mui-row-group>
              ${rows}
            </mui-table>
            <div class="mobile-api-list" slot="showBelow">
              ${mobileRows}
            </div>
          </mui-responsive>
        </section>
      `;
    };

    const slots = declaration.slots || [];
    const slotSection = slots.length
      ? /*html*/ `
        <section>
          <mui-heading class="section-heading" size="5" level="3">Slots</mui-heading>
          <mui-responsive breakpoint="560">
            <mui-table slot="showAbove">
              <mui-row-group heading>
                <mui-row columns="${slotColumns}" size="small">
                  <mui-cell class="card-slot" heading>Name</mui-cell>
                  <mui-cell class="card-slot" heading>Type</mui-cell>
                  <mui-cell class="card-slot" heading>Description</mui-cell>
                </mui-row>
              </mui-row-group>
              ${slots
                .map(
                  (slot) => /*html*/ `
                    <mui-row-group>
                      <mui-row columns="${slotColumns}" size="small">
                        <mui-cell class="card-slot"><mui-body size="x-small">${codeValue(
                          slot.name ? `slot="${slot.name}"` : "default",
                        )}</mui-body></mui-cell>
                        <mui-cell class="card-slot"><mui-body size="x-small">${codeValue("slot")}</mui-body></mui-cell>
                        <mui-cell class="card-slot"><mui-body size="x-small">${escapeHtml(
                          slot.description,
                        )}</mui-body></mui-cell>
                      </mui-row>
                    </mui-row-group>
                  `,
                )
                .join("")}
            </mui-table>
            <div class="mobile-api-list" slot="showBelow">
              ${slots
                .map(
                  (slot) => /*html*/ `
                    <div class="mobile-api-row">
                      <mui-v-stack space="var(--space-200)">
                        <mui-body size="small">${codeValue(slot.name ? `slot="${slot.name}"` : "default")}</mui-body>
                        <mui-body size="x-small">${escapeHtml(slot.description)}</mui-body>
                        <mui-v-stack class="mobile-api-detail" space="var(--space-100)">
                          <mui-body size="x-small" weight="bold">Type</mui-body>
                          <div class="type-values">${codeValue("slot")}</div>
                        </mui-v-stack>
                      </mui-v-stack>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </mui-responsive>
        </section>
      `
      : "";

    const cssProperties = declaration.cssProperties || [];
    const cssPropertySection = cssProperties.length
      ? /*html*/ `
        <section>
          <mui-heading class="section-heading" size="5" level="3">CSS Properties</mui-heading>
          <mui-responsive breakpoint="560">
            <mui-table slot="showAbove">
              <mui-row-group heading>
                <mui-row columns="${cssPropertyColumns}" size="small">
                  <mui-cell class="card-slot" heading>Name</mui-cell>
                  <mui-cell class="card-slot" heading>Description</mui-cell>
                </mui-row>
              </mui-row-group>
              ${cssProperties
                .map(
                  (property) => /*html*/ `
                    <mui-row-group>
                      <mui-row columns="${cssPropertyColumns}" size="small">
                        <mui-cell class="card-slot"><mui-body size="x-small">${codeValue(property.name)}</mui-body></mui-cell>
                        <mui-cell class="card-slot"><mui-body size="x-small">${escapeHtml(
                          property.description,
                        )}</mui-body></mui-cell>
                      </mui-row>
                    </mui-row-group>
                  `,
                )
                .join("")}
            </mui-table>
            <div class="mobile-api-list" slot="showBelow">
              ${cssProperties
                .map(
                  (property) => /*html*/ `
                    <div class="mobile-api-row">
                      <mui-v-stack space="var(--space-200)">
                        <mui-body size="small">${codeValue(property.name)}</mui-body>
                        <mui-body size="x-small">${escapeHtml(property.description)}</mui-body>
                      </mui-v-stack>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </mui-responsive>
        </section>
      `
      : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }
        .required { color: var(--red-500); padding-left: var(--space-050); }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
        }
        .api-groups, section {
          display: flex;
          flex-direction: column;
        }
        .api-groups { gap: var(--space-400); }
        section:not(:first-child) { border-top: var(--border-thin); }
        .section-heading {
          padding-inline: var(--space-500);
          padding-block: var(--space-300);
          border-bottom: var(--border-thin);
          background: var(--app-story-type-header-background)
        }
        .section-note {
          padding: var(--space-400) var(--space-500);
          border-bottom: var(--border-thin);
          text-wrap: pretty;
        }
        .section-note-link::part(flex-wrap) {
          flex-wrap: wrap;
        }
        .mobile-api-list {
          display: flex;
          flex-direction: column;
        }
        .mobile-api-row {
          padding: var(--space-500) var(--space-500);
        }
        .mobile-api-row:not(:first-child) {
          border-top: var(--border-thin);
        }
        .mobile-api-detail {
          padding-block-start: var(--space-100);
        }
        .type-values {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-050);
        }

      @media (min-width: 767px) {
        .section-heading {
          padding-inline: var(--space-600);
          padding-block: var(--space-400);
        }
        .section-note {
          padding-inline: var(--space-600);
        }
        .mobile-api-row {
          padding: var(--space-300) var(--space-400);
        }
      }

        @media (min-width: 560px) {
        .mobile-api-row {
          padding: var(--space-300) var(--space-400);
        }
      }

      </style>
      <props-card title="${escapeHtml(title)}" ${this.hasAttribute("open") ? "open" : ""}>
        <mui-v-stack class="api-groups" slot="body" space="var(--space-000)">
          ${dynamicAttributeSection}
          ${renderAttributeSection("Attributes", declaration.attributes || [])}
          ${slotSection}
          ${cssPropertySection}
          ${renderAttributeSection("Contextual", declaration.contextualAttributes || [])}
        </mui-v-stack>
      </props-card>
    `;
  }
}

customElements.define("story-api-types", StoryApiTypes);
