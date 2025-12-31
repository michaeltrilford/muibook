## Header [Start]

## v9.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/9.0.0)

## Header [End]

### Added

- Introduced `brand.css` as the base for future JSON → token generation using the Design Token Format Module.
- Added semantic token mapping in `tokens.css` sourced from brand primitives.

### Changed

- Aligned brand primitives to semantic tokens across the system.
- Updated Input, Select, Checkbox, and File Upload to improve event bubbling and React data handling.
- Storefront UI refreshed, theme examples improved, moved to styled dictionary build for serving themes.
- Improved theme loading fallback when non-existent theme is requested.

### Fixed

- Normalised `alignx` and `aligny` to lowercase for safer React prop usage.
- Heading component now responds to attribute changes correctly.
- Dialog wrapper uses display: contents to avoid layout issues when hidden.
- attributeChanged reliability fixes across Alert, Button, Card, Dialog, Grid, Heading, Stacks, Tabs, and others.

---

## Header [Start]

## v8.0.1

[Package](https://www.npmjs.com/package/@muibook/components/v/8.0.0)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Addressed an issue with the --grey-1200 design token.

---

## Header [Start]

## v8.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/8.0.0)

## Header [End]

### Added

- Added a new Avatar component for displaying images, initials, and icons, replacing the mui-slat-accessory component.
- Added new icons to the current icon set.
- Added Avatar support to Button and Slat components with automatic size adjustments.
- Added Avatar detection to Chip component, which automatically applies size="x-small" by default.
- Added Avatar detection to Button and Link components, which automatically set the appropriate avatar size based on action size.
- Added new action-radius tokens for greater control of theme adjustments per action size.
- Added --checkbox-size design token and applied it to the checkbox component.
- Added placeholder text tokens for input elements.
- Added new avatar tokens to provide additional preset background color options for the avatar component.
- Embedded prior guideline data directly in the system, maintaining 100% component parity.
- Added the Custom Element Manifest to the packaged exports.
- Manifest packaged for NPM adoption, making guideline data accessible to tooling.

### Changed

- Updated Drawer and Dialog to use medium-sized icons by default.
- Updated Switch to use size="x-small" by default when an icon is present.
- Updated checkbox icon to use the new checkmark icon and sizing.
- Updated Chip component to control icon size via prop instead of CSS override.
- Updated Dropdown to ensure border radius overrides work with new button sizes.
- Removed height property from addon as it is not required.
- Updated Input and Select to use the default text color tokens.

### Fixed

- Fixed a known Safari bug with web components and the will-change CSS property.
- Fixed semantic HTML errors in the Drawer and Dialog components.
- Fixed hard-coded pixel values in the file upload component.

---

## Header [Start]

## v7.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/7.1.0)

## Header [End]

### Added

- [None]

### Changed

- Updated Alert and Message to use the medium sized icon by default.

### Fixed

- [None]

---

## Header [Start]

## v7.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/7.0.0)

## Header [End]

### Added

- [None]

### Changed

- Reworked the Prompt file for more accurate Model and Agent usage.
- Introduced button sizes | x-small, small, medium, large
- Introduced link button sizes | x-small, small, medium, large
- Updated icon sizes and toggle to support: x-small: 1.6rem | small: 2.1rem | medium: 2.4rem | large: 2.8rem
- Set toggle to default="medium"

### Fixed

- Fixed a width mismatch on the Drawer component.
- Ensured the Drawer `PUSH` & `PERSISTENT` variants are block, not inline.
- Slotted page item inherits overflow: auto and height of 100dvh without user intervention. User is able to override and turn off if required.
- Ensured slotted items in Input don't wrap by default. The parent is flex and causes slotted children to wrap.
- Linked the input background to the Chip component.

---

## Header [Start]

## v6.1.1

[Package](https://www.npmjs.com/package/@muibook/components/v/6.1.1)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Fixed an issue where incorrect CSS targeting caused unexpected behavior. Targeting has been corrected in this release.

---

## Header [Start]

## v6.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/6.1.0)

## Header [End]

### Added

- [None]

### Changed

- Adjusted the CSS Reset to exclude certain design system components from the global box-sizing rule. This prevents layout issues when Web Components are used in traditional light DOM contexts, where those components expect box-sizing: content-box.

### Fixed

- [None]

---

## Header [Start]

## v6.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/6.0.0)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Ensured Rule and Field renders in environments like react.

---

## Header [Start]

## v5.2.1

[Package](https://www.npmjs.com/package/@muibook/components/v/5.2.1)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Ensured the new Drawer background token is applied correctly across relevant parts of the component.

---

## Header [Start]

## v5.2.0

[Package](https://www.npmjs.com/package/@muibook/components/v/5.2.0)

## Header [End]

### Added

- Dialog: Bubbling mui-dialog-open and mui-dialog-close events for external state sync.
- Design tokens: Added tokens for dialog and drawer to allow consistent background color customisation.

### Changed

- [None]

### Fixed

- [None]

---

## Header [Start]

## v5.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/5.1.0)

## Header [End]

### Added

- Drawer: Event bubbling and composition for mui-drawer-open and mui-drawer-close

### Changed

- [None]

### Fixed

- [None]

---

## Header [Start]

## v5.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/5.0.0)

## Header [End]

### Added

- Dropdown Component and stories
- Drawer Component and stories
- Dialog Component and stories
- Progress Component and stories
- Stepper Component and stories
- Design token additions
- Icon additions

### Changed

- Design token adjustments

### Fixed

- Accordion expanded height bugfix

---

## Header [Start]

## v4.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/4.0.0)

## Header [End]

### Added

- Chip Component and stories
- Slat Component and stories
- Checkbox Component and stories

### Changed

- Design token adjustments
- Icon additions

### Fixed

- [None]
