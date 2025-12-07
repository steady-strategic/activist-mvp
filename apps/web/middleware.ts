// apps/web/middleware.ts
import { getTenantBySlug } from './lib/db';
import { TenantConfig } from '../../packages/core/src/types';

export type RouteContext = 
  | { type: 'admin' }
  | { type: 'public'; tenant: TenantConfig }
  | { type: 'public-host' } // The landing page for the SaaS itself
  | { type: '404' };

export function middleware(pathname: string, hostname: string): RouteContext {
  // 1. Admin / Platform Routes
  if (hostname === 'app.activist.com') {
    return { type: 'admin' };
  }

  // 2. SaaS Marketing Site (Host)
  if (hostname === 'activist.com' || hostname === 'www.activist.com') {
    return { type: 'public-host' };
  }

  // 3. Tenant Resolution (Subdomains)
  // Extract subdomain: climate-action.activist.com -> climate-action
  const subdomain = hostname.split('.')[0];
  const tenant = getTenantBySlug(subdomain);

  if (tenant) {
    return { type: 'public', tenant };
  }

  return { type: '404' };
}
