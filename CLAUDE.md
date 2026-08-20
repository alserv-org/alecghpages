# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Alec Chamberland, built with React, TypeScript, and Vite, and hosted on GitHub Pages. Dark theme by default, light theme opt-in, English and Canadian French. It showcases four products, all in the private `alserv-org` GitHub org: ListKeeper, What Are The Odds and Pixel Wrangler (on Google Play) and Ore to Orbit (in development).

## Commands

### Development
- `npm run dev` - Start development server with hot module replacement (HMR)
- `npm run build` - Compile TypeScript, build for production (outputs to `docs/`), then prerender one `index.html` per route via `tool/prerender.mjs`
- `npm run preview` - Preview production build locally

### Important Notes
- The build output goes to `docs/` directory (not `dist/`) as configured in vite.config.js - this is required for GitHub Pages deployment
- Build minification is disabled (`minify: false` in vite.config.js)
- Entry point is `/src/main.tsx`, referenced from index.html
- `docs/` is committed: it *is* the deployed site, so a source change is only live once the build output is committed too

## Architecture

### Routing & Navigation
- Uses `react-router-dom` v7 with `BrowserRouter`
- Single-page application with client-side routing
- Routes are defined in `src/App.tsx`, but there is only one product route: `/:slug` renders `ProjectPage`, which looks the slug up in `src/data/projects.ts`. `/pixelfarm` redirects to `/pixel-wrangler` (pre-rename URL)
- GitHub Pages has no SPA rewrite, so every route also needs an entry in `tool/prerender.mjs`, which writes a real `index.html` (with its own title/description) at each path. The script fails the build if a product has no route or a shipped product has no privacy policy
- Navigation component (`src/components/Navbar.tsx`) provides consistent header across all pages, and lists every product automatically

### Project Structure
- `src/pages/` - Page components (Home, ProjectPage, NotFound)
- `src/components/` - Navbar, Footer, StatusPill, ErrorBoundary, OreToOrbitTeaser
- `src/contexts/` - Theme and language providers
- `src/data/` - Static data (`projects.ts`, plus site-wide constants in `site.ts`)
- `src/locales/` - `en.json` and `fr-CA.json`; copy for a product lives under its `id`
- `src/styles/` - Global CSS
- `tool/` - Build-time scripts (`prerender.mjs`)
- `docs/` - Production build output for GitHub Pages
- `public/` - Static assets (app icons, screenshots, privacy policies)

### Data Layer
Project information is stored in `src/data/projects.ts` as typed objects with the `Project` interface: id, slug, title, icon, status (`live` / `soon` / `dev`), accent variable, platform, engine, Play URL, privacy policy URL, and optional logo, screenshots and teaser component. All prose — tagline, description, features — lives in the locale files under the project's `id`, never in the data file.

### Styling
- Mix of global CSS and component-specific CSS files
- Custom CSS in `src/styles/globals.css` plus a CSS file next to the components that need one
- Every colour is a custom property defined twice in `globals.css`: once on `:root` (dark) and once under `[data-theme='light']`. Adding a token means adding it to both
- Each product has an `--accent-*` token; `ProjectPage` sets `--accent` from it, so cards and pages tint themselves
- Uses Lucide React icons (`lucide-react` package)

### TypeScript Configuration
- Target: ES2020
- Strict mode enabled
- `noUnusedLocals` is disabled
- JSX mode: react-jsx
- Bundler module resolution

## Development Guidelines

### Adding New Projects
No new component is needed — a product is data plus copy:
1. Add an entry to `src/data/projects.ts` following the `Project` interface
2. Add its copy under the matching `id` in **both** `src/locales/en.json` and `src/locales/fr-CA.json`
3. Add a route (and, once it ships, a privacy policy) in `tool/prerender.mjs` — the build fails otherwise
4. Add an `--accent-<id>` token to both theme blocks in `src/styles/globals.css`
5. Drop the app icon in `public/logos/` and any screenshots in `public/screenshots/<slug>/`

Nav and footer links, the home grid and the project page all follow from step 1.

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx` **above** the `/:slug` route, which otherwise swallows it
3. Add the path to `tool/prerender.mjs`

### Build Configuration
The Vite build is configured with custom output naming (no hashes in filenames) for consistency:
- Entry files: `assets/[name].js`
- Chunks: `assets/[name].js`
- Assets: `assets/[name][extname]`
