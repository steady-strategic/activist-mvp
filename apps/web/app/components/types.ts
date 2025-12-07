export interface StatItem {
  value: string;
  label: string;
}

export interface MissionCard {
  iconName: 'globe' | 'leaf' | 'heart' | 'users' | 'shield' | 'sun';
  title: string;
  description: string;
}

type BlockBase = {
  id?: string;            // stable ID for Admin UI (optional)
  type: string;           // discriminator, e.g. "hero", "missionSection"
  variant?: string;       // e.g. "default", "compact", "centered"
  enabled?: boolean;      // default true
  background?: "default" | "subtle" | "accent" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
};
