# Muibook

## @muibook/components NPM Package

```bash
npm install @muibook/components
```

Import All

```javascript
import "@muibook/components";
```

Import Individually

```javascript
import "@muibook/components/mui-body";
```

✨ Key Features

- 🔌 Framework-agnostic: Works seamlessly with React, Vue, Angular, Svelte, or vanilla JavaScript
- 🎨 MUI Design System: Consistent styling and behavior across all components
- ♿ Accessible by default: Built with ARIA standards and keyboard navigation
- 🎯 TypeScript support: Full type definitions included
- 📱 Responsive: Mobile-first design with flexible layouts
- 🎨 Customizable: CSS custom properties for easy theming
- ⚡ Lightweight: Tree-shakeable with minimal bundle impact
- 🧱 Composable: Mix and match components to build complex interfaces

🔗 Links

📦 View on [npmjs.com](https://www.npmjs.com/package/@muibook/components?activeTab=readme)
📚 [Full Documentation](https://muibook.com)
🎮 [Interactive Examples](https://muibook.com)
📦 [View Components](https://muibook.com)

---

## Create Mui App

Kickstart your project with a lightweight scaffold built on Vite. It comes preloaded with foundational CSS resets, a solid base structure, and design tokens ready to be customised for your brand.

- ⚡ Vite-powered: Lightning-fast development with HMR
- 🎨 Pre-configured theming: Design tokens and CSS custom properties
- 🧱 Component showcase: Curated set of MUI Components in a clean layout
- 📱 Responsive foundation: Mobile-first CSS resets and utilities
- 🔧 Customisable: Easy to adapt for your brand and requirements

Learn more at [Muibook.com](https://muibook.com/#/create-mui-app)

---

## Muibook Documentation

Muibook is the home of the Mui Design System (MichaelUI) — native Web Components with clean, composable patterns that help you write less code.

- 📖 Comprehensive guides: From basic usage to advanced customization
- 🎨 Design principles: Learn the MichaelUI design language
- 🔧 API reference: Detailed documentation for every component
- 💡 Best practices: Proven patterns for scalable design systems

Learn more about [Muibook.com](https://muibook.com)

---

## Start Development Server

This project is powered by [Vite](https://vitejs.dev/) and uses TypeScript to provide a fast, modern development experience for building and previewing web components.

```bash
npm run dev
```

- Starts Vite in development mode
- Opens the app at http://localhost:5173 (or next available port)
- Supports hot module replacement (HMR) for fast feedback

---

## Build Project

```bash
npm run build
```

- Compiles and bundles the project for production
- Outputs optimised files into the dist/ directory

---

## Build Muibook

```bash
npm run build:muibook
```

- Builds the Muibook package using a custom Vite config (vite.muibook.config.ts)
- Produces a minified CSS and JS build for documentation

---

## Preview Muibook Build

```bash
npm run preview:muibook
```

- Serves the minified Muibook build locally for previewing the compiled output

---

## Build Create Mui App

```bash
npm run build:create-mui-app
```

- Builds the create-mui-app package using a custom Vite config (vite.create-mui-app.config.ts)
- Produces a minified CSS and JS build for documentation

---

## Preview Create Mui App Build

```bash
npm run preview:create-mui-app
```

- Serves the minified create-mui-app build locally for previewing the compiled output

---

## Setup

Install dependencies:

```bash
npm install
```

TypeScript Support:

```bash
npm install --save-dev @types/node
```

---

## VS Code Plug-in

Install [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) for better HTML template literal syntax highlighting.

---

## Publishing

Publish to NPM

```bash
npm publish
```

Version Management

```bash
npm version patch  # Increment patch version
npm version minor  # Increment minor version
npm version major  # Increment major version
```

Test Before Publishing

```bash
npm pack --dry-run  # Preview what will be published
```

---

## Development Notes

- Add any new components to `vite.config.ts` to include them in builds
- The dist/ folder is published, while source code and src/muibook are excluded
- Use the preview scripts to verify production builds before deployment
- Follow semantic versioning for releases

---

License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
MIT License - see LICENSE file for details.
