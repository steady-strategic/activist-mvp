# TEMPLATE_SPEC.md
Landing Page Layout Template & Block Model

This document defines the **canonical page + block model** which is the layout template used by all Tenant landing pages

It is intended for:

- Multi-tenant template design
- Admin UI page editors
- AI-assisted code generation (Gemini)

The spec is derived from the existing Gemini app components:

- `HeroSection.tsx`
- `ImpactSection.tsx` (`Mission`, `Impact`)
- `PandaChat.tsx`
- `MissionSection.tsx`
- `types.ts` (`LandingPageConfig`, `MissionCard`, `StatItem`, etc.)

---

## 1. High-Level Page Structure

The current landing page renders these sections in order:

1. **Navbar**  
2. **Hero** (top hero banner)  
3. **Mission Section** (cards describing “how it works / who we are”)  
4. **Impact Section** (stats / metrics)  
5. **Chat Section** (static “Have questions?” + chat widget)  
6. **Footer**

In the multi-tenant/block world, we treat each section as a **block** in a
`Page.blocks` array. Navbar and basic layout remain **host-level**.

---

## 2. Landing Page Config vs Block Model

The Gemini app uses a single object:

```ts
export interface LandingPageConfig {
  id: string;
  missionDescription: string;
  brandName: string;
  theme: {
    accentColor: string;
    secondaryColor: string;
  };
  hero: { ... };
  mission: { ... };
  impact: { ... };
  footer: { ... };
  chat: { ... };
}
