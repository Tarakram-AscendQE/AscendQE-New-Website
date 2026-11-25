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

## Production / GoDaddy

The site is served by the backend in `../backend` (Express + TypeScript). GoDaddy runs the repo-root scripts:

- `npm run build` (root) → installs and builds this app into `dist/`, then builds the backend.
- `npm start` (root) → the backend serves `dist/` on `PORT`: page URLs get `index.html` (with the right canonical
  URL), old URLs (`*.html`, previous site pages) 301-redirect to the closest page, unknown pages return 404,
  `/health` answers `{"status":"healthy"}`, and `/api/send-mail` / `/api/apply-job` send email through AWS SES.

In development, run `npm run dev` at the repo root (backend on :5000, this app on :3001; Vite proxies `/api`).
Environment variables (AWS SES) are listed in `../backend/.env.example`. The previous site's commands are still in
the root `package.json` as `build:legacy` / `start:legacy` / `dev:legacy`.

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
- The Start page form (`features/start/ProofSprintForm`) emails the enquiry to hello@ascendqe.com through
  `services/contactService` → backend `POST /api/send-mail`. If sending fails, it shows the message as a draft to copy.
