// apps/web/app/components/blocks/HeroSection.tsx

"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import type { TenantTheme, TenantIdentity } from "./CmsBlockRenderer";
// ^ same types we defined in CmsBlockRenderer

// Match the block props spec from TEMPLATE_SPEC
export interface HeroSectionProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  primaryCta?: { label: string; href?: string; action?: string };
  secondaryCta?: { label: string; href?: string; action?: string };
  alignment?: "left" | "center";
  image?: { url: string; alt?: string; aspectRatio?: "16:9" | "4:3" | "1:1" };
  badgeText?: string;
  tagList?: string[];
}

// Minimal shape of your original LandingPageConfig.
// Only include what Hero actually uses.
type MinimalLandingPageConfig = {
  brandName: string;
  missionDescription?: string;
  theme: {
    accentColor: string;
    secondaryColor: string;
  };
  hero: {
    headline: string;
    subheadline?: string;
    eyebrow?: string;
    badgeText?: string;
    tagList?: string[];
    ctaText?: string;
    secondaryCtaText?: string;
    alignment?: "left" | "center";
    image?: {
      url: string;
      alt?: string;
      aspectRatio?: string;
    };
  };
};

interface HeroSectionWrapperProps extends HeroSectionProps {
  theme?: TenantTheme;
  missionDescription?: string;
  brandName?: string;
}

export const HeroSection: React.FC<HeroSectionWrapperProps> = ({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  alignment,
  image,
  badgeText,
  tagList,
  theme,
  missionDescription,
  brandName,
}) => {
  const accentColor = theme?.accentColor ?? "#16a34a";
  const secondaryColor = theme?.secondaryColor ?? "#0f766e";

  const config: MinimalLandingPageConfig = {
    brandName: brandName ?? "Save The Pandas",
    missionDescription,
    theme: {
      accentColor,
      secondaryColor,
    },
    hero: {
      headline: heading,
      subheadline,
      eyebrow,
      badgeText,
      tagList,
      ctaText: primaryCta?.label,
      secondaryCtaText: secondaryCta?.label,
      alignment,
      image: image && {
        url: image.url,
        alt: image.alt,
        aspectRatio: image.aspectRatio,
      },
    },
  };

  return <Hero config={config as any} />;
};
