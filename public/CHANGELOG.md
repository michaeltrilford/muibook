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

[View on Github](https://github.com/michaeltrilford/muibook/commit/ef174e3ac30df271d274b44bddeedf6854902181)

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
