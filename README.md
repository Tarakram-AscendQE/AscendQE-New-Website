# AscendQE website

All code lives in [`leansite/`](leansite/):

- [`leansite/frontend`](leansite/frontend/) — React 18 + TypeScript + Vite (the site, Insights and the studio).
  See its [README](leansite/frontend/README.md) for structure and notes.
- [`leansite/backend`](leansite/backend/) — Express + TypeScript: serves the built site, the email API (AWS SES)
  and the Insights API (MySQL). Environment variables are listed in
  [`leansite/backend/.env.example`](leansite/backend/.env.example).

## Commands (repo root)

```bash
npm install            # root tooling (concurrently)
npm run dev            # backend :5000 + frontend :3001 (Vite proxies /api and /uploads)
npm run build          # installs and builds leansite/frontend and leansite/backend
npm start              # production server (leansite/backend) on PORT
npm run lint           # ESLint for both apps
npm run format:check   # Prettier for both apps
```

GoDaddy runs `npm run build` and then `npm start` from the repo root.
