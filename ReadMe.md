# Muibook

## Muibook/Components (NPM)

A library of reusable vanilla Web Components designed with the MichaelUI design language. Perfect for building consistent, framework-agnostic design systems inspired by MichaelUI’s principles.

- 📦 View on [npmjs.com](https://www.npmjs.com/package/@muibook/components?activeTab=readme)
- 🔌 Framework-agnostic: works in any modern JavaScript environment
- 🎨 Styled and structured according to MichaelUI guidelines
- ✨ Lightweight, fast, and customisable
- 🧱 Built for scalable and maintainable design systems

---

## Create Mui App

- Kickstart your project with a lightweight scaffold built on Vite. It comes preloaded with foundational CSS resets, a solid base structure, and design tokens ready to be customised for your brand.
- Access a curated set of MUI Components, wrapped in a clean layout that highlights the Design System’s core building blocks—so you can start designing and building immediately.
- Learn more at [Muibook.com](https://muibook.com/#/create-mui-app)

---

## Muibook Documentation

- Muibook is the home of the Mui Design System (MichaelUI) — native Web Components with clean, composable patterns that help you write less code
- Learn more about [Muibook.com](https://muibook.com)
- This project is powered by [Vite](https://vitejs.dev/) and uses TypeScript to provide a fast, modern development experience for building and previewing web components.

---

## Start Development Server

`npm run dev`

- Starts Vite in development mode
- Opens the app at http://localhost:5173 (or next available port)
- Supports hot module replacement (HMR) for fast feedback

---

## Build Project

`npm run build`

- Compiles and bundles the project for production
- Outputs optimized files into the dist/ directory

---

## Build Muibook

`npm run build:muibook`

- Builds the Muibook package using a custom Vite config (vite.muibook.config.ts)
- Produces a minified CSS and JS build for documentation

---

## Preview Muibook Build

`npm run preview:muibook`

- Serves the minified Muibook build locally for previewing the compiled output

---

## Build Create Mui App

`npm run build:create-mui-app`

- Builds the create-mui-app package using a custom Vite config (vite.create-mui-app.config.ts)
- Produces a minified CSS and JS build for documentation

---

## Preview Create Mui App Build

`npm run preview:create-mui-app`

- Serves the minified create-mui-app build locally for previewing the compiled output

---

## Setup

Install dependencies:

`npm install`

TypeScript Support:

`npm install --save-dev @types/node`

---

## VS Code Plug-in

Install [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)

---

## Packages

Publish

`npm publish`

Version Patch

`npm version patch`

Dry run

`npm pack --dry-run`

---

## Notes

- Add any new components to `vite.config.ts` to include them in builds
- The dist/ folder is published, while source code and src/muibook are excluded
- Use the preview scripts to verify production builds before deployment

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
