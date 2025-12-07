// apps/web/app/components/blocks/ImpactSection.tsx

"use client";

import React from "react";
import { Impact } from "@/components/InfoSections";
import type { TenantTheme } from "./CmsBlockRenderer";
import type { StatItem } from "@/types"; // adjust path

export interface ImpactSectionProps {
  title: string;
  description: string;
  stats: StatItem[];
}

type MinimalLandingPageConfigForImpact = {
  theme: {
    accentColor: string;
    secondaryColor: string;
  };
  impact: {
    title: string;
    description: string;
    stats: StatItem[];
  };
};

interface ImpactSectionWrapperProps extends ImpactSectionProps {
  theme?: TenantTheme;
}

export const ImpactSection: React.FC<ImpactSectionWrapperProps> = ({
  title,
  description,
  stats,
  theme,
}) => {
  const accentColor = theme?.accentColor ?? "#16a34a";
  const secondaryColor = theme?.secondaryColor ?? "#0f766e";

  const config: MinimalLandingPageConfigForImpact = {
    theme: {
      accentColor,
      secondaryColor,
    },
    impact: {
      title,
      description,
      stats,
    },
  };

  return <Impact config={config as any} />;
};
