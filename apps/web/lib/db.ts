// apps/web/lib/db.ts
import { TenantConfig } from '../../../packages/core/src/types';

export const MOCK_TENANTS: Record<string, TenantConfig> = {
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
