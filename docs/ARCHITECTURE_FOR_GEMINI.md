# Architecture for Gemini: Activist MVP

## 1. Overview
The Activist MVP is a **multi-tenant, template-driven SaaS** designed to empower social movements. It allows organizations (Tenants) to spin up branded sites (Campaigns) using a shared infrastructure (Host).

## 2. Core Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide React Icons
- **State Management**: React Context (for Tenant state)
- **Deployment**: Vercel / Edge Functions

## 3. Multi-Tenancy Strategy
The application serves two distinct contexts based on the resolved domain/path:
1.  **Host Context**: The SaaS marketing and admin platform (e.g., `activist-app.com`).
2.  **Tenant Context**: The public-facing movement pages (e.g., `climate-now.activist-app.com`).

**Data Isolation**:
- Tenants are identified by a unique `slug` or `custom_domain`.
- Components render dynamically based on the injected `TenantConfig`.

## 4. Design System
- **Host Theme**: Neutral, clean, professional (Inter font, slate grays).
- **Tenant Theme**: Configurable primary/secondary colors and fonts.
- **Components**: Atomic design pattern. Shared UI components live in `components/ui`.

## 5. Directory Structure (Simulated in SPA)
- `app/`: Routing logic.
- `components/`: Shared reusable UI.
- `lib/`: Utilities and mock database.
- `features/`: Domain-specific business logic.

## 6. Development Rules
- **DRY**: Do not duplicate pages for tenants; use dynamic routing `[tenantSlug]`.
- **Accessibility**: All interactive elements must have aria-labels and keyboard nav.
- **Performance**: Heavy assets must be lazy-loaded.
