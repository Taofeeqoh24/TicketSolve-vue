## TicketSolve (Vue 3 + Vite)

This is the frontend for TicketSolve — a ticket management web application built with Vue 3 and Vite. The app includes a public landing page, authentication pages, a protected dashboard, and screens for creating and viewing tickets.

Use this README to get the project running locally and to understand the high-level structure.

## Tech stack

- Vue 3
- Vite
- Vue Router
- Plain CSS (styles in `style.css`) — adapt to Tailwind or other frameworks if desired

Exact dependency versions are listed in `package.json`.

## Requirements

- Node.js (LTS recommended) and npm (or yarn/pnpm)

## Quick start (Windows PowerShell)

From the project root:

```powershell
npm install
npm run dev
```

Available scripts (from `package.json`):

- `npm run dev` — start dev server (Vite)
- `npm run build` — build production assets
- `npm run preview` — locally preview the production build

If you use a different package manager, replace `npm` with `yarn` or `pnpm`.

## Project structure (important files)

Top-level:

- `index.html` — Vite entry
- `package.json` — scripts & dependencies
- `vite.config.js` — Vite config

src/ (frontend source):

- `App.vue` — root component and router outlet
- `main.js` — app bootstrap (createApp, router mounting)
- `style.css` — global styles
- `assets/` — static images and assets
- `auth/`
	- `login.vue` — login page
	- `register.vue` — registration page
- `components/`
	- `landing.vue` — public landing page
	- `dashboard.vue` — protected dashboard
	- `mytickets.vue` — ticket list
	- `ticketform.vue` — create/edit ticket form
	- `ticketpage.vue` — single ticket details
- `router/`
	- `index.js` — route definitions
	- `authGuard.js` — simple route guard for protected routes

This repo follows a small, component-centric structure appropriate for a single-page frontend.

## Environment & backend

This project is frontend-only. By default it may use mocked/localStorage data for demo purposes. To connect to a real backend, update the API base URL usage in the code (search for `/api` or the service file you use for requests) and provide any required auth tokens via localStorage or a store.

If you add environment variables, create a `.env` file at the project root and document the variables here (example):

```
VITE_API_BASE_URL=https://api.example.com
```

## Accessibility notes

Keep these in mind while working on the UI:

- Use semantic elements (header, main, nav, form, label) and visible focus styles for keyboard users.
- Ensure form fields have associated labels.
- Use `aria-live` or `role="status"` for dynamic status messages (success/error).

## Development tips

- Keep components small and focused.
- Centralize API calls in a single service module for easier swapping between mock and real backends.
- Add unit tests for form validation and core components when possible.

## Contributing

1. Fork the repo and create a feature branch.
2. Make changes and ensure linting passes (if applicable).
3. Open a pull request describing the change.

## License

See `package.json` for license information (or add a LICENSE file).

---