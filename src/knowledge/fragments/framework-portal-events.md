# Framework integration: portalled Menu actions

`mui-dropdown` portals its open `mui-menu` outside the Dropdown's authored DOM
tree so the overlay can escape stacking contexts and overflow clipping. In
framework integrations, this means delegated synthetic handlers (for example,
React `onClick` handlers attached through the component tree) may not receive
clicks from Menu actions.

When a portalled Menu action must call application logic:

- Prefer a native listener on the component host or an appropriate document
  boundary, using `event.composedPath()` to find the clicked action.
- Mark actions with a stable action name and the owning record ID, then ignore
  events whose ID does not belong to the current card/list item. Without this
  scoping, every mounted card listener can respond to the same portalled click.
- Keep the Menu action itself as a normal Muibook Button or Link and let the
  application adapter translate the native event into its framework callback.
- Clean up the native listener when the framework component unmounts.

This is an integration concern, not a reason to reimplement Dropdown or Menu
positioning, focus, dismissal, or portal behavior in the framework wrapper.
