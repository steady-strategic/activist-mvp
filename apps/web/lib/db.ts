// apps/web/lib/db.ts
import { TenantConfig } from '../../../packages/core/src/types';

const STORAGE_KEY = 'activist_app_tenants_v2';

// Initial Mock Data with Blocks
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
    landingPageBlocks: [
      {
        type: 'hero',
        id: 'hero_01',
        props: {
          heading: 'Mobilizing communities for a sustainable future.',
          subheading: 'We are building a movement. Join Climate Action Now today and help us create lasting change in our community.',
          primaryCta: { label: 'Join the Movement', href: '/join', variant: 'primary' },
          secondaryCta: { label: 'Learn More', href: '/about', variant: 'outline' }
        }
      },
      {
        type: 'mission',
        id: 'features_01',
        props: {
          title: 'How You Can Help',
          description: 'Take action directly from your neighborhood.',
          columns: 2,
          cards: [
            {
              title: 'Upcoming Events',
              description: "From town halls to street rallies, find out where we'll be next.",
              icon: 'calendar',
              ctaLabel: 'View Calendar',
              href: '/events'
            },
            {
              title: 'Donate to the Cause',
              description: 'Your contribution fuels our operations. We rely on people like you.',
              icon: 'heart',
              ctaLabel: 'Donate Now',
              href: '/donate'
            }
          ]
        }
      },
      {
        type: 'impact',
        id: 'impact_01',
        props: {
          title: 'Our Impact So Far',
          stats: [
            { value: '12k', label: 'Supporters' },
            { value: '$45k', label: 'Raised' },
            { value: '150+', label: 'Events Hosted' }
          ]
        }
      }
    ]
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
    landingPageBlocks: [
      {
        type: 'hero',
        id: 'hero_02',
        props: {
          heading: 'Reclaiming our streets for safer cycling.',
          subheading: 'Safe streets are happy streets. We advocate for protected bike lanes and pedestrian safety.',
          primaryCta: { label: 'Sign the Petition', href: '/sign', variant: 'primary' }
        }
      },
      {
        type: 'mission',
        id: 'mission_02',
        props: {
          title: 'Our Core Mission',
          cards: [
            {
              title: 'Infrastructure',
              description: 'Building protected lanes in downtown corridors.',
              icon: 'globe'
            },
            {
              title: 'Education',
              description: 'Teaching safe riding to kids and adults.',
              icon: 'users'
            },
            {
              title: 'Advocacy',
              description: 'Working with city council to pass safety laws.',
              icon: 'shield'
            }
          ]
        }
      }
    ]
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
  // Ensure new tenants have default blocks if none provided
  if (!tenant.landingPageBlocks || tenant.landingPageBlocks.length === 0) {
    tenant.landingPageBlocks = [
      {
        type: 'hero',
        id: `hero_${Date.now()}`,
        props: {
          heading: tenant.description || `Welcome to ${tenant.name}`,
          subheading: 'Join us to make a difference.',
          primaryCta: { label: 'Get Involved', href: '#', variant: 'primary' }
        }
      }
    ];
  }
  
  tenantStore[tenant.slug] = tenant;
  saveStore();
};

export const deleteTenant = (slug: string) => {
  delete tenantStore[slug];
  saveStore();
};
