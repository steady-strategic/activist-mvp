// apps/web/app/components/blocks/ImpactBlock.tsx
import React from 'react';
import { PageBlock } from '../../../../../../packages/core/src/types';

type ImpactProps = Extract<PageBlock, { type: 'impact' }>['props'];

export const ImpactBlock = ({ title, stats }: ImpactProps) => {
  return (
    <section className="bg-slate-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-accent)] mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
