# Architecture for Gemini: Activist MVP (Monorepo)

## 1. Overview
The Activist MVP is structured as a **Turborepo-style Monorepo**. It separates the application into distinct workspaces for better scalability, code sharing, and separation of concerns between the SaaS platform (Host) and the Campaign sites (Tenants).

## 2. Directory Structure
The project root contains the following workspaces:

### `apps/`
- **`web/`**: The main Next.js application.
    - Uses **Route Groups** `(public)` and `(admin)` to separate tenant and platform logic.
    - **Dynamic Routing**: `[domain]` folder handles tenant resolution.
    - **Middleware**: Resolves `hostname` to `tenant_id`.

### `packages/`
- **`ui/`**: Atomic design system (Buttons, Cards, Inputs). Pure presentation.
- **`theme/`**: Design tokens and tenant theming logic (Color injection).
- **`core/`**: Shared types, constants, and business logic helper functions.

## 3. Multi-Tenancy Strategy (Middleware)
- **Domain Resolution**: The app determines context based on the hostname.
    - `app.activist.com` -> Renders `(admin)` routes.
    - `*.activist.com` -> Renders `(public)/[domain]` routes.
- **Data Isolation**: Each tenant is injected via `TenantContext` at the layout level.

## 4. Development Rules
- **Imports**: Use relative imports to simulate monorepo package linking (e.g., `../../packages/ui`).
- **State**: Use `useState` for routing in the SPA preview to avoid `history.pushState` security errors.
- **Strict Boundaries**: `ui` package should not import from `web`.

## 5. Deployment
- In a real environment, this maps to Vercel's multi-project deployment.
- `apps/web` is the primary deploy target.
