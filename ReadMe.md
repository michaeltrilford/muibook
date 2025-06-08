# Muibook

This project is powered by [Vite](https://vitejs.dev/) and uses TypeScript to provide a fast, modern development experience for building and previewing web components.

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
