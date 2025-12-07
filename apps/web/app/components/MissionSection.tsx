// apps/web/app/components/blocks/MissionSection.tsx

"use client";

import React from "react";
import { Mission } from "@/components/InfoSections";
import { TenantTheme } from "../../../../../packages/core/src/types";
import type { MissionCard } from "./types";

export interface MissionSectionProps {
  title: string;
  description: string;
  cards: MissionCard[];
}

type MinimalLandingPageConfigForMission = {
  theme: {
    accentColor: string;
    secondaryColor: string;
  };
  mission: {
    title: string;
    description: string;
    cards: MissionCard[];
  };
};

interface MissionSectionWrapperProps extends MissionSectionProps {
  theme?: TenantTheme;
}

export const MissionSection: React.FC<MissionSectionWrapperProps> = ({
  title,
  description,
  cards,
  theme,
}) => {
  const accentColor = theme?.accent ?? "#16a34a";
  const secondaryColor = theme?.secondary ?? "#0f766e";

  const config: MinimalLandingPageConfigForMission = {
    theme: {
      accentColor,
      secondaryColor,
    },
    mission: {
      title,
      description,
      cards,
    },
  };

  return <Mission config={config as any} />;
};