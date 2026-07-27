## Top Header With Drawer Region

Treat a global top header plus side drawer as an app-shell fragment. The top header and Drawer are
siblings inside one vertical shell so opening a push Drawer affects only the Drawer page region, not
the global header above it.

- Use a `VStack` shell with zero spacing when the header spans the full application width.
- Place the top header first as a two-column `Grid`. When the Drawer has an explicit width such as
  `320px`, use that same width for the header's first Grid track and its Drawer-aligned first child.
  Keep the same explicit value on Drawer; do not omit or replace the configured Drawer width.
- Use the header Grid's first child as the Drawer-aligned header region, commonly containing the
  menu (or “hamburger”) action and product identity. Use its second child as the page-aligned header
  region for the current page title, search, context, or actions.
- Use `var(--header-min-height-medium)` for the header height and `var(--border-thin)` for the
  separating border unless the product supplies another semantic shell treatment.
- Place the `Drawer` second. When the shell fills the viewport, set Drawer height to
  `calc(100dvh - var(--header-min-height-medium))` so the combined header and drawer region do not
  exceed the viewport.
- Keep Drawer navigation in its default slot. For navigation items, use tertiary Button or Link
  actions with `align: "start"` and exact Muibook icons in `props.slot: "before"` when icons are
  useful.
- Wrap adjacent page content in a plain direct `Div` child with `props.slot: "page"`; compose
  Container, Stack, Grid, and product content inside that wrapper.
- Use `hide-header: true` when the global header owns the shell chrome and the Drawer does not need
  its built-in title/close row. Do not also generate a hidden Drawer `title` child.
- Keep every slot only in `props.slot`; never add `slot` beside `id`, `type`, `props`, or `children`.
- If the header should move with or belong only to the page region, place it inside the Drawer page
  wrapper instead. If there is no global header, Drawer can remain the root node.

Reference fragment (adapt the labels and page content to the requested product):

```json
{
  "id": "application_shell",
  "type": "VStack",
  "props": {
    "space": "var(--space-000)",
    "alignX": "stretch",
    "width": "100%",
    "height": "100dvh"
  },
  "children": [
    {
      "id": "application_header",
      "type": "Grid",
      "props": {
        "col": "320px minmax(0, 1fr)",
        "space": "var(--space-000)",
        "alignY": "center",
        "width": "auto",
        "height": "var(--header-min-height-medium)",
        "style": "border-bottom: var(--border-thin); background: var(--surface-elevated-100);"
      },
      "children": [
        {
          "id": "application_drawer_header",
          "type": "HStack",
          "props": {
            "space": "var(--space-200)",
            "alignX": "start",
            "alignY": "center",
            "width": "320px",
            "height": "100%",
            "style": "padding-inline: var(--space-400); border-right: var(--border-thin);"
          },
          "children": [
            {
              "id": "application_menu_action",
              "type": "Button",
              "props": {
                "variant": "tertiary",
                "aria-label": "Toggle navigation"
              },
              "children": [
                {
                  "id": "application_menu_icon",
                  "type": "_Icon",
                  "props": {
                    "icon": "mui-icon-menu",
                    "size": "medium"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "application_name",
              "type": "Heading",
              "props": {
                "text": "Application",
                "size": "4",
                "level": "1"
              },
              "children": []
            }
          ]
        },
        {
          "id": "application_page_header",
          "type": "HStack",
          "props": {
            "space": "var(--space-300)",
            "alignX": "space-between",
            "alignY": "center",
            "width": "auto",
            "height": "100%",
            "style": "padding-inline: var(--space-500);"
          },
          "children": [
            {
              "id": "application_page_header_title",
              "type": "Heading",
              "props": {
                "text": "Page title",
                "size": "4",
                "level": "2"
              },
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "application_navigation_drawer",
      "type": "Drawer",
      "props": {
        "open": true,
        "variant": "push",
        "side": "left",
        "width": "320px",
        "hide-header": true,
        "height": "calc(100dvh - var(--header-min-height-medium))",
        "panel-padding": "none",
        "style": "background: var(--surface);"
      },
      "children": [
        {
          "id": "application_navigation",
          "type": "VStack",
          "props": {
            "space": "var(--space-100)",
            "padding": "var(--space-300)",
            "alignX": "stretch",
            "width": "auto",
            "height": "auto"
          },
          "children": [
            {
              "id": "application_home_link",
              "type": "Button",
              "props": {
                "text": "Home",
                "variant": "tertiary",
                "align": "start"
              },
              "children": []
            },
            {
              "id": "application_settings_link",
              "type": "Button",
              "props": {
                "text": "Settings",
                "variant": "tertiary",
                "align": "start"
              },
              "children": []
            }
          ]
        },
        {
          "id": "application_page_region",
          "type": "Div",
          "props": {
            "slot": "page"
          },
          "children": [
            {
              "id": "application_page_container",
              "type": "Container",
              "props": {
                "center": true,
                "size": "fluid",
                "style": "padding-block: var(--space-600);"
              },
              "children": [
                {
                  "id": "application_page_content",
                  "type": "VStack",
                  "props": {
                    "space": "var(--space-300)",
                    "alignX": "stretch",
                    "width": "auto",
                    "height": "auto"
                  },
                  "children": [
                    {
                      "id": "application_page_heading",
                      "type": "Heading",
                      "props": {
                        "text": "Page content",
                        "size": "2",
                        "level": "3"
                      },
                      "children": []
                    },
                    {
                      "id": "application_page_description",
                      "type": "Body",
                      "props": {
                        "text": "Compose the requested page content in this region.",
                        "variant": "secondary"
                      },
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
