// packages/theme/src/index.ts
import { TenantTheme } from '../../core/src/types';

export const defaultTheme: TenantTheme = {
  primary: '#0f172a', // slate-900
  secondary: '#f1f5f9', // slate-100
  accent: '#3b82f6', // blue-500
};

// Helper to generate inline styles for dynamic theming
export const getThemeStyles = (theme: TenantTheme) => {
  return {
    '--color-primary': theme.primary,
    '--color-secondary': theme.secondary,
    '--color-accent': theme.accent,
  } as React.CSSProperties;
};
