## Avatar Chip Profile Actions

Use AvatarChip when avatar, primary identity, and optional secondary identity should travel as one
profile trigger. AvatarChip owns identity layout; Button owns interaction, Dropdown owns disclosure,
and Menu owns account actions.

### Owned by AvatarChip

- Internal Avatar rendering, including image, initials fallback, label, and background treatment.
- Primary and secondary identity layout, whether supplied through the simple `primary` and
  `secondary` props or the matching named slots.
- The internal gap and alignment between Avatar and identity copy.
- Coordinated Avatar, primary text, and secondary text scaling from AvatarChip size.

### Composed by the consumer

- Button semantics, accessible action label, visual variant, action size, and interaction states.
- Dropdown placement, disclosure state, and propagation of density to its action Button and Menu.
- The optional down-chevron in Button's `after` slot. It is not part of AvatarChip.
- Menu structure and its Profile, Settings, Sign out, or product-specific actions.
- Layout around the control, including its relationship to notification and search actions.
- Responsive replacement with an Avatar-only trigger when the identity copy no longer fits.

Do not add custom HStacks, Avatars, or text wrappers inside Button to reproduce the identity row that
AvatarChip already owns. Conversely, do not expect AvatarChip itself to provide Button, Dropdown,
chevron, Menu, or responsive disclosure behavior.

### Composition rules

- A profile Dropdown must contain one Button with `props.slot: "action"` and one direct Menu child.
  Put AvatarChip inside the action Button; never place AvatarChip directly inside Dropdown.
- Add a down-chevron with `props.slot: "after"` when the trigger needs an explicit menu affordance.
  Omit chevron size so Button can apply its scale.
- Outside HeaderBar, set Dropdown size when a deliberate density is required. Dropdown passes its
  size to the trigger Button and Menu. AvatarChip may match that size explicitly; Button also keeps
  composed AvatarChip density aligned.
- `variant: "secondary"` gives a standalone profile action a visible boundary. `variant: "tertiary"`
  is a valid quieter option and is the demonstrated HeaderBar treatment. Choose emphasis from the
  surrounding action hierarchy rather than treating either variant as mandatory.
- Inside HeaderBar, prefer leaving Dropdown, Button, AvatarChip, chevron, and Menu unsized when they
  should inherit HeaderBar density. HeaderBar applies the contextual usage, Dropdown propagates size,
  and AvatarChip maps its internal Avatar footprint to the matching action token.
- In the demonstrated HeaderBar composition, use `gap: "var(--space-400)"` on the profile Button.
  Button supplies size-aware logical edge spacing for AvatarChip and its trailing chevron.
- When identity copy does not fit, use an Avatar-only action Button inside Dropdown. The Button size
  remains authoritative and the Avatar adopts the matching action footprint. Avatar-only HeaderBar
  actions stay compact rather than stretching to the full HeaderBar height.

General profile Dropdown:

```json
{
  "id": "profile_dropdown",
  "type": "Dropdown",
  "props": { "position": "right", "size": "medium" },
  "children": [
    {
      "id": "profile_action",
      "type": "Button",
      "props": { "slot": "action", "variant": "secondary", "aria-label": "Open profile menu" },
      "children": [
        {
          "id": "profile_identity",
          "type": "AvatarChip",
          "props": { "label": "Alex", "primary": "Alex Hurt", "secondary": "Product Designer" },
          "children": []
        },
        {
          "id": "profile_chevron",
          "type": "_Icon",
          "props": { "icon": "mui-icon-down-chevron", "slot": "after" },
          "children": []
        }
      ]
    },
    {
      "id": "profile_menu",
      "type": "Menu",
      "props": { "width": "16rem" },
      "children": [
        { "id": "profile_item", "type": "Button", "props": { "text": "Profile", "variant": "tertiary", "align": "start" }, "children": [] },
        { "id": "settings_item", "type": "Button", "props": { "text": "Settings", "variant": "tertiary", "align": "start" }, "children": [] },
        { "id": "sign_out_item", "type": "Button", "props": { "text": "Sign out", "variant": "tertiary", "align": "start" }, "children": [] }
      ]
    }
  ]
}
```

Within HeaderBar, use the same tree without authored sizes and normally change the action Button to
`variant: "tertiary"` with `gap: "var(--space-400)"`.
