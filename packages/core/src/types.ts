// packages/core/src/types.ts

export interface TenantTheme {
  primary: string;
  secondary: string;
  accent: string;
}

// --- BLOCK SCHEMA DEFINITIONS ---

export interface BlockCta {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface BlockCard {
  title: string;
  description: string;
  icon?: string; // e.g. 'calendar', 'heart', 'globe'
  href?: string;
  ctaLabel?: string;
}

export interface BlockStat {
  value: string;
  label: string;
}

export type PageBlock =
  | {
      type: 'hero';
      id: string;
      props: {
        heading: string;
        subheading: string;
        primaryCta?: BlockCta;
        secondaryCta?: BlockCta;
      };
    }
  | {
      type: 'mission'; // Used for features/grid sections
      id: string;
      props: {
        title?: string;
        description?: string;
        cards: BlockCard[];
        columns?: number;
      };
    }
  | {
      type: 'impact';
      id: string;
      props: {
        title: string;
        description?: string;
        stats: BlockStat[];
      };
    };

export interface TenantConfig {
  id: string;
  name: string;
  slug: string;
  customDomain?: string;
  description: string;
  theme: TenantTheme;
  features: string[];
  landingPageBlocks: PageBlock[]; // New field for block-driven layout
}

export type UserRole = 'admin' | 'organizer' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
