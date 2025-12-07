// apps/web/app/components/blocks/HeroBlock.tsx
import React from 'react';
import { Button } from '../../../../../../packages/ui/src/index';
import { PageBlock } from '../../../../../../packages/core/src/types';

type HeroProps = Extract<PageBlock, { type: 'hero' }>['props'];

export const HeroBlock = ({ heading, subheading, primaryCta, secondaryCta }: HeroProps) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-10" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-primary)] mb-6 tracking-tight leading-tight">
          {heading}
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryCta && (
            <Button 
              className="px-8 py-4 text-lg shadow-xl shadow-[var(--color-primary)]/20"
              onClick={() => primaryCta.href && (window.location.href = primaryCta.href)}
            >
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
              onClick={() => secondaryCta.href && (window.location.href = secondaryCta.href)}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
