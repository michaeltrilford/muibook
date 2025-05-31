# MUI Create App

A lightweight starter template for building accessible, fast-loading interfaces using native web components and MUI-inspired styling.

This project is powered by [Vite](https://vitejs.dev/) and uses TypeScript to provide a fast,
modern development experience for building and previewing web components.

Create your project and copy over the structure:
npm create vite@latest my-project -- --template vanilla-ts

## Setup

Install dependencies::

`npm install`

Optionally, install Node.js types for TypeScript:

`npm install --save-dev @types/node`

## Run

`npm run dev`

---

## 🚀 Features

- **Zero Dependencies**  
  No need for React, Vue, or complex JavaScript tooling.

- **Accessible by Default**  
  Components follow inclusive design principles and semantic HTML standards.

- **Themeable Architecture**  
  Customise styles using design tokens and native CSS variables.

- **Modular and Flexible**  
  Use only the components you need. All elements work independently and are designed for progressive enhancement.

---

## 📁 Recommended Project Structure

```
RECOMMENDED PROJECT STRUCTURE:

Project Root:
│
- ⚠️ **Note:** You will need to include mui-components and related css files
│
├── css/
│   └── author.css                  # Custom styles for your website or app
│
├── assets/
│   └── create-app-logo.js          # Logo asset
│
├── components/                     # Custom web components
│   └── dark-mode/
│       └── index.js
│
├── index.ts
│
├── public/
│   ├── favicon.ico                # Favicon displayed in browser tabs and bookmarks
│   └── logo192.png                # Icon used when the site is installed as a PWA (Progressive Web App)
│
└── index.html
```

- You will need to import mui-components and mui-css
- Please refer to the latest component source code in the main [component library](#) as the included versions may be outdated.

---

🛠 Usage (This onabording info needs to be adjusted)

1. Clone or download the project.
2. Open a terminal and navigate to the project folder.

```bash
mui-create-app
```

3. Run the following command to start the server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```bash
http://localhost:8000
```

Note: This step is required because some browsers block custom elements and module-based scripts when opened directly from the filesystem (file://). Running a local server ensures everything loads correctly.

---

## 📦 What's Included?

- **Predefined Design Tokens** (spacing, typography, colors)
- **Light/Dark Theming Support**
- **Reset + Base Styles**
- **Starter Components** (heading, body, link, container, stack)
- **Optional JavaScript Features** (under `/js/mui-parts/`)

---

## 📚 Learn More

Refer to the main documentation for guidance on:

- Creating new components
- Using tokens
- Theming and layout strategies

---

## 📄 License

MIT — free to use, modify, and distribute.
