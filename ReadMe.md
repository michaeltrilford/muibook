# Mui Project

This project is powered by [Vite](https://vitejs.dev/) and uses TypeScript to provide a fast, modern development experience for building and previewing web components.

## Start Development Server

`npm run dev`

- Starts Vite in development mode
- Opens the app at http://localhost:5173 (or next available port)
- Supports hot module replacement (HMR) for fast feedback

## Build Project

`npm run build`

- Compiles and bundles the project for production
- Outputs optimized files into the dist/ directory

## Build Muibook

`npm run build:muibook`

- Builds the Muibook package using a custom Vite config (vite.muibook.config.ts)
- Produces a minified CSS and JS build for documentation

## Preview Muibook Build

`npm run preview:muibook`

- Serves the minified Muibook build locally for previewing the compiled output

## Build Create-App

`npm run build:create-app`

- Builds the Create-App package using a custom Vite config (vite.create-app.config.ts)
- Produces a minified CSS and JS build for documentation

## Preview Create-App Build

`npm run preview:create-app`

- Serves the minified Create-App build locally for previewing the compiled output

Setup

Install dependencies:

`npm install`

Optionally, install Node.js types for TypeScript:

`npm install --save-dev @types/node`

Notes

- Add any new components to `vite.config.ts` to include them in builds
- The dist/ folder is published, while source code and src/muibook are excluded
- Use the preview scripts to verify production builds before deployment
