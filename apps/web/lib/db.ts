// apps/web/lib/db.ts
import { TenantConfig } from '../../../packages/core/src/types';

const STORAGE_KEY = 'activist_app_tenants_v1';

// Initial Mock Data
const DEFAULT_TENANTS: Record<string, TenantConfig> = {
  'climate-action': {
    id: 't_01',
    name: 'Climate Action Now',
    slug: 'climate-action',
    description: 'Mobilizing communities for a sustainable future.',
    theme: {
      primary: '#15803d', // green-700
      secondary: '#dcfce7', // green-100
      accent: '#22c55e', // green-500
    },
    features: ['events', 'donations'],
  },
  'city-bikes': {
    id: 't_02',
    name: 'City Bike Initiative',
    slug: 'city-bikes',
    description: 'Reclaiming our streets for safer cycling.',
    theme: {
      primary: '#1d4ed8', // blue-700
      secondary: '#dbeafe', // blue-100
      accent: '#3b82f6', // blue-500
    },
    features: ['events', 'volunteers'],
  },
};

// Internal Store
let tenantStore: Record<string, TenantConfig> = {};

// Initialize from Storage or Default
const initStore = () => {
  if (typeof window === 'undefined') {
    tenantStore = { ...DEFAULT_TENANTS };
    return;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      tenantStore = JSON.parse(stored);
    } else {
      tenantStore = { ...DEFAULT_TENANTS };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tenantStore));
    }
  } catch (e) {
    console.warn('Failed to load tenants from storage', e);
    tenantStore = { ...DEFAULT_TENANTS };
  }
};

const saveStore = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tenantStore));
  } catch (e) {
    console.error('Failed to save tenants', e);
  }
};

// Initialize immediately
initStore();

// --- PUBLIC API ---

export const getTenants = (): TenantConfig[] => {
  return Object.values(tenantStore);
};

export const getTenantBySlug = (slug: string): TenantConfig | undefined => {
  return tenantStore[slug];
};

export const createTenant = (tenant: TenantConfig) => {
  tenantStore[tenant.slug] = tenant;
  saveStore();
};

export const deleteTenant = (slug: string) => {
  delete tenantStore[slug];
  saveStore();
};

// Backward compatibility for static imports if any
export const MOCK_TENANTS = tenantStore;
