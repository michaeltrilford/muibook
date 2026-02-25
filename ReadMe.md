- See [CHANGELOG.md](./CHANGELOG.md) for details on updates.

# NPM Package 📦 – @muibook/components

Leverage reusable vanilla Web Components built with the Mui (MichaelUI) Design System in your project. Simply install the [@muibook/components](https://www.npmjs.com/package/@muibook/components?activeTab=readme) package to access a framework-agnostic, accessible, and customizable component library.

## Usage Policy (Summary)

This repository is **source-available for education and internal use**. Redistribution, repackaging, or resale is **not permitted**. The intended public distribution channel is the NPM package: `@muibook/components`. See `LICENSE` for full terms.

```bash
npm install @muibook/components
```

#### Component Usage

```javascript
import "@muibook/components"; // All
import "@muibook/components/mui-body"; // Individual
```

#### CSS Usage

```javascript
import "@muibook/components/css/mui-brand.css";
import "@muibook/components/css/mui-tokens.css";
import "@muibook/components/css/mui-base.css";
import "@muibook/components/css/mui-reset.css";
```

#### Agent Usage

```javascript
import "@muibook/components/agent/prompts";
import "@muibook/components/agent/keywords";
```

Links •
[npmjs.com](https://www.npmjs.com/package/@muibook/components?activeTab=readme) •
[Docs](https://muibook.com) •
[Usage](https://muibook.com) •
[Components](https://muibook.com)

---

# Create Mui App

Kickstart your project with a lightweight scaffold built on Vite. It comes preloaded with foundational CSS resets, a solid base structure, and design tokens ready to be customised for your brand.

- ⚡ Vite-powered: Lightning-fast development with HMR
- 🎨 Pre-configured theming: Design tokens and CSS custom properties
- 🧱 Component showcase: Curated set of MUI Components in a clean layout
- 📱 Responsive foundation: Mobile-first CSS resets and utilities
- 🔧 Customisable: Easy to adapt for your brand and requirements

Learn more at [Muibook.com](https://muibook.com/#/create-mui-app)

---

# Muibook Repository

Muibook is the home of the Mui Design System (MichaelUI) — native Web Components with clean, composable patterns that help you write less code.

- 📖 Comprehensive guides: From basic usage to advanced customization
- 🎨 Design principles: Learn the MichaelUI design language
- 🔧 API reference: Detailed documentation for every component
- 💡 Best practices: Proven patterns for scalable design systems

Learn more about [Muibook.com](https://muibook.com)

---

### Start Development Server

This project is powered by [Vite](https://vitejs.dev/) and uses TypeScript to provide a fast, modern development experience for building and previewing web components.

```bash
npm run dev
```

- Starts Vite in development mode
- Opens the app at http://localhost:5173 (or next available port)
- Supports hot module replacement (HMR) for fast feedback

---

### Build Project

```bash
npm run build
```

- Compiles and bundles the project for production
- Outputs optimised files into the dist/ directory

---

### Build Muibook

```bash
npm run build:muibook
```

- Builds the Muibook package using a custom Vite config (vite.muibook.config.ts)
- Produces a minified CSS and JS build for documentation

---

### Preview Muibook Build

```bash
npm run preview:muibook
```

- Serves the minified Muibook build locally for previewing the compiled output

---

### Build Create Mui App

```bash
npm run build:create-mui-app
```

- Builds the create-mui-app package using a custom Vite config (vite.create-mui-app.config.ts)
- Produces a minified CSS and JS build for documentation

---

### Preview Create Mui App Build

```bash
npm run preview:create-mui-app
```

- Serves the minified create-mui-app build locally for previewing the compiled output

---

### Setup

#### Install dependencies:

```bash
npm install
```

#### TypeScript Support:

```bash
npm install --save-dev @types/node
```

---

### VS Code Plug-in

Install [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) for better HTML template literal syntax highlighting.

---

## Style Dictionary

- npm run token-build

---

### Publishing

#### Version Management

```bash
npm version patch  # Increment patch version
npm version minor  # Increment minor version
npm version major  # Increment major version
```

#### Test Before Publishing

```bash
npm pack --dry-run  # Preview what will be published
```

#### Publish to NPM

```bash
npm publish
```

---

## NPM Token REFRESH

I have to login everytime it seems.

npm login tokens expire every 90 days When they do, you must log in again before publishing packages. No other setup needs to be repeated.

### Steps:

1. Run `npm login` to refresh your token.
2. Publish normally with `npm publish --access public`
3. Repeat npm login every 90 days when prompted.

---

### Development Notes

- Add any new components to `vite.config.ts` to include them in builds
- The dist/ folder is published, while source code and src/muibook are excluded
- Use the preview scripts to verify production builds before deployment
- Follow semantic versioning for releases

#### Adding new components

When adding new components, there are a couple of areas in the build we need to update.

1. vite.config.ts
   Add the new component’s entry point to the build configuration so it’s bundled into the final output.

2. package.json
   Ensure the new component is added to the exports field so it can be imported by consumers. If you’re using a files field, include the component path there too.

3. src/index.ts (Central export file)
   Add an export \* from "./components/..."; line pointing to your new component’s file or directory. This makes it available through your library’s main entry point.

4. src/muibook/index.ts: (Demo Site)
   If the component relies on global styles or JS utilities for behavior or preview (e.g., for documentation or dev environments), make sure relevant styles or setup files are imported here.

🔍 Note:
If the component uses an internal index.ts to re-export multiple parts (e.g., mui-icons/index.ts), you only need to reference the directory in your central export:

### Slot Implementation Approach (MUI Design System)

When implementing slots in MUI components, we use a consistent approach for styling and interaction:

#### Children Concerns

- We use JavaScript to query and manage slotted elements.
- To apply styles to a slotted item, we append a class in the format: [parent-component]-slot.
- The slotted component detects this class via :host(.parent-component) and applies the relevant styles.

#### Parent Concerns

- If the parent component needs to react to the presence of a specific slotted item, we add an attribute like has-[slottedComponentName] to the host.
- The parent component can then target this via :host([has-slottedComponentName]) for conditional styling.

This method keeps slot behavior declarative and styles predictable across components.

---

### License

- ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
- MIT License - see LICENSE file for details.
