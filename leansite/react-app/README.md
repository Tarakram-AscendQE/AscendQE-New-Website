# AscendQE Lean site — React + TypeScript

The Lean site, converted from static HTML to the AscendQE stack: React 18, TypeScript (strict), Vite 5,
Tailwind CSS 3 and React Router 6. The UI and behaviour match the HTML version.

## Commands

```bash
npm install
npm run dev            # http://localhost:3001
npm run build          # type-check (tsc -b) + production build into dist/
npm run preview        # serve dist/ locally
npm run lint           # ESLint
npm run format:check   # Prettier
```

## Structure

```
src/
  main.tsx, App.tsx       entry + router provider
  routes/index.tsx        all routes (/, /services, /gcc, /method, /about, /standard, /start),
                          old *.html names redirect to them, anything else shows the 404 page
  layouts/SiteLayout.tsx  skip link, header, <main>, footer, scroll handling
  components/layout/      SiteHeader (desktop nav + mobile menu), SiteFooter, SiteLogo, scroll-to-top
  components/seo/         HeadMeta (title, description, canonical per page)
  pages/                  thin route screens: HeadMeta + the page's content
  features/<page>/        page content, plus the interactive parts:
                          method/ProofLevelCheck, services/DriftChart, standard/Citation, start/ProofSprintForm
  styles/                 site.css + lean.css (the original stylesheets, unchanged) and tailwind.css
  assets/                 images
public/                   favicons
```

## Notes

- `styles/site.css` and `styles/lean.css` are the original Lean site stylesheets, unchanged; `format:check` only
  covers the TypeScript files so they stay that way. Prettier settings are in `package.json`.
- The Start page form works like the HTML version: it validates the fields and prepares an email draft for the
  visitor to copy. Nothing is sent from the website.
- When deployed behind a server, all routes must fall back to `index.html` (single-page app).
