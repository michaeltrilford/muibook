## Header Bar With Drawer Region

Treat a global top header plus side drawer as an app-shell fragment. The top header and Drawer are
siblings inside one vertical shell so opening a push Drawer affects only the Drawer page region, not
the global header above it.

- Use a `VStack` shell with zero spacing when the header spans the full application width.
- Place `HeaderBar` first. When the Drawer has an explicit width such as `320px`, use that same value
  for `HeaderBar.props.left-width`. Keep the explicit value on Drawer; do not omit or replace the
  configured Drawer width.
- Use a child with `props.slot: "left"` as the Drawer-aligned header region, commonly containing the
  menu (or “hamburger”) action button with circular shape (`shape: "circle"`, `variant: "tertiary"`)
  and product identity. Use icon-only buttons with `shape: "circle"` for top header bar actions such as
  menu toggle, search, settings, and notifications.
- Set `HeaderBar.props.size` instead of manually assigning height tokens. Use `bottom-border: true`
  when the shell needs the standard separator and let HeaderBar own its surface and column borders.
- Put search, page identity, and primary actions in HeaderBar's default region. Use `props.slot: "right"`
  only for a separately aligned right panel region. Follow the Header Bar Composition Density Guide
  for action, SearchInput, Dropdown, AvatarChip, and responsive choices.
- Place the `Drawer` second. When the shell fills the viewport, set Drawer height to
  `calc(100dvh - var(--header-min-height-medium))` so the combined header and drawer region do not
  exceed the viewport.
- Keep Drawer navigation in its default slot. When using `panel-padding="none"` on Drawer (recommended for custom action stacks), add `padding="var(--space-400)"` to the `VStack` housing the action items so navigation links/buttons have proper inset. For navigation items, use tertiary Button or Link actions with `align: "start"`, `gap: "var(--space-200)"` (for medium buttons), and exact Muibook icons in `props.slot: "before"` when icons are useful. Do not add redundant section titles like "Navigation".
- Wrap adjacent page content in a plain direct `Div` child with `props.slot: "page"`; compose
  Container, Stack, Grid, and product content inside that wrapper.
- Use `hide-header: true` when the global header owns the shell chrome and the Drawer does not need
  its built-in title/close row. Do not also generate a hidden Drawer `title` child.
- Keep every slot only in `props.slot`; never add `slot` beside `id`, `type`, `props`, or `children`.
- If the HeaderBar should move with or belong only to the page region, place it inside the Drawer page
  wrapper instead. If there is no global header, Drawer can remain the root node.

## Header Bar Composition Density Guide

Treat these as starting points for coherent sizing, not fixed recipes. Header Bar content density can
change with the product, available width, action priority, input purpose, and whether identity copy
needs to remain visible. Components inside HeaderBar keep their own public size APIs; HeaderBar size
controls the bar height but does not require every child to use the same size.

### Standard application shell

- Start with `HeaderBar size="medium"` and a primary `SearchInput size="medium"`.
- Use circular icon-only Buttons for menu, search, settings, and notification actions. Tertiary is a
  quiet default; secondary is useful when an action needs a clearer boundary, especially a
  notification action carrying a Badge.
- A common notification composition is a `Button variant="secondary" shape="circle"` with an exact
  notification icon and `Badge slot="badge" variant="attention"`. Badge size and placement are
  inherited from Button; do not set them manually unless the design deliberately departs from the
  automatic scale.
- A common profile composition is an unsized Dropdown containing a tertiary action Button, an
  unsized AvatarChip, and a down-chevron in `slot="after"`. HeaderBar applies `usage="header-bar"`;
  Dropdown inherits HeaderBar size and passes it to Button, which passes it to AvatarChip. Let the
  chevron inherit its size. Follow the Avatar Chip Profile Actions fragment for the complete tree.
  Use `gap="var(--space-400)"` when the identity copy and chevron need the demonstrated Header Bar
  spacing.
- Group the notification Button and profile Dropdown in an `HStack` with
  `space="var(--space-500)"` for the demonstrated standard composition. This is a recommended
  separation between distinct controls, not a required HeaderBar spacing value.
- When that full-height profile Dropdown is the final control in HeaderBar's main region, keep only
  the main region's left inset and let the profile action meet the right edge. If the Dropdown is the
  terminal content of `slot="right"`, its wrapper does not need additional padding.

### Compact shell or constrained main column

- Use `HeaderBar size="x-small"` or `size="small"` when the whole shell is intentionally dense.
- Search may use `SearchInput size="small"`, an icon-only circular search Button, or move into a
  separate surface. Choose based on whether search must remain immediately editable.
- Keep supporting actions at x-small or small density. Tertiary actions reduce visual weight;
  secondary actions retain a visible boundary.
- Use `Dropdown size="x-small"` or `size="small"` with a matching AvatarChip when profile copy still
  fits. Use an avatar-only circular trigger when the compact layout cannot support both identity
  lines.

### Spacious or workspace shell

- Use `HeaderBar size="large"` when the header carries workspace context, larger identity, or a more
  prominent command region.
- Search can remain medium for familiar control density or increase to large when it is the dominant
  task. Do not enlarge it solely because HeaderBar is large.
- Actions and profile controls may remain medium while HeaderBar supplies the extra surrounding
  space. Increase AvatarChip or Dropdown size only when the identity treatment benefits from the
  added emphasis.

### Responsive composition choices

- Use Responsive around complete HeaderBar alternatives when the app-shell structure changes at a
  viewport breakpoint.
- Use nested `Responsive variant="container"` inside the main HeaderBar region when only search and
  action composition should react to the available main-column width.
- A compact alternative can replace an editable SearchInput with a search action and replace an
  AvatarChip Dropdown trigger with an avatar-only trigger. These are options, not mandatory mobile
  substitutions.
- Prefer one live control tree when state must be preserved. Do not duplicate stateful search,
  menus, form controls, IDs, or other state merely to create a visual breakpoint.

Composition options can be mixed. For example, a medium HeaderBar can explicitly use a small profile Dropdown,
a medium SearchInput, and medium circular actions; another valid product may use tertiary actions,
an avatar-only profile trigger, or no search at all.

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
      "type": "HeaderBar",
      "props": {
        "size": "medium",
        "left-width": "320px",
        "bottom-border": true
      },
      "children": [
        {
          "id": "application_drawer_header",
          "type": "HStack",
          "props": {
            "space": "var(--space-200)",
            "alignX": "start",
            "alignY": "center",
            "width": "auto",
            "height": "auto",
            "padding": "0 var(--space-400)",
            "slot": "left"
          },
          "children": [
            {
              "id": "application_menu_action",
              "type": "Button",
              "props": {
                "variant": "tertiary",
                "shape": "circle",
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
            "height": "auto",
            "padding": "0 var(--space-500)"
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
                "align": "start",
                "gap": "var(--space-200)"
              },
              "children": [
                {
                  "id": "application_home_icon",
                  "type": "_Icon",
                  "props": {
                    "icon": "mui-icon-home",
                    "slot": "before"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "application_settings_link",
              "type": "Button",
              "props": {
                "text": "Settings",
                "variant": "tertiary",
                "align": "start",
                "gap": "var(--space-200)"
              },
              "children": [
                {
                  "id": "application_settings_icon",
                  "type": "_Icon",
                  "props": {
                    "icon": "mui-icon-gear",
                    "slot": "before"
                  },
                  "children": []
                }
              ]
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
