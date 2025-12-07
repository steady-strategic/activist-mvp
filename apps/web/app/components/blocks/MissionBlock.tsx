// apps/web/app/components/blocks/MissionBlock.tsx
import React from 'react';
import { Card, Button } from '../../../../../../packages/ui/src/index';
import { PageBlock } from '../../../../../../packages/core/src/types';
import { Calendar, Heart, Globe, Users, Shield, ArrowRight, Circle } from 'lucide-react';

type MissionProps = Extract<PageBlock, { type: 'mission' }>['props'];

const IconMap: Record<string, any> = {
  calendar: Calendar,
  heart: Heart,
  globe: Globe,
  users: Users,
  shield: Shield,
};

export const MissionBlock = ({ title, description, cards, columns = 3 }: MissionProps) => {
  const gridClass = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>}
          {description && <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
        {cards.map((card, idx) => {
          const Icon = card.icon ? IconMap[card.icon] || Circle : Circle;
          
          return (
            <Card key={idx} className="border-t-4 border-[var(--color-accent)] hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="flex items-start gap-4 flex-grow">
                <div className="p-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg shrink-0">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                  <p className="text-slate-600 mt-2 mb-4 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
              
              {card.ctaLabel && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group text-[var(--color-primary)] hover:bg-[var(--color-secondary)]"
                    onClick={() => alert(`Navigating to ${card.href}`)}
                  >
                    {card.ctaLabel} 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
};
