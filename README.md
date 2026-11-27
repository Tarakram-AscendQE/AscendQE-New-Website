# AscendQE website

The site has two apps:

- [`frontend`](frontend/) — React 18 + TypeScript + Vite (the site, Insights and the studio).
  See its [README](frontend/README.md) for structure and notes.
- [`backend`](backend/) — Express + TypeScript: serves the built site, the email API (AWS SES)
  and the Insights API (MySQL). Environment variables are listed in
  [`backend/.env.example`](backend/.env.example).

## Commands (repo root)

```bash
npm install            # root tooling (concurrently)
npm run dev            # backend :5000 + frontend :3001 (Vite proxies /api and /uploads)
npm run build          # installs and builds frontend/ and backend/
npm start              # production server (backend/) on PORT
npm run lint           # ESLint for both apps
npm run format:check   # Prettier for both apps
```

GoDaddy runs `npm run build` and then `npm start` from the repo root.
