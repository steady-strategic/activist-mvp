// packages/core/src/types.ts

export interface TenantTheme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface TenantConfig {
  id: string;
  name: string;
  slug: string;
  customDomain?: string;
  description: string;
  theme: TenantTheme;
  features: string[];
}

export type UserRole = 'admin' | 'organizer' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
