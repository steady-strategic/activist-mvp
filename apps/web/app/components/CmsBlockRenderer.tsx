// apps/web/app/components/CmsBlockRenderer.tsx
import React from 'react';
import { PageBlock } from '../../../../packages/core/src/types';
import { HeroBlock } from './blocks/HeroBlock';
import { MissionBlock } from './blocks/MissionBlock';
import { ImpactBlock } from './blocks/ImpactBlock';

// Map of block types to React components
const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  mission: MissionBlock,
  impact: ImpactBlock,
};

export const CmsBlockRenderer = ({ blocks }: { blocks?: PageBlock[] }) => {
  if (!blocks || blocks.length === 0) {
    return <div className="p-8 text-center text-slate-500">No content blocks configured for this page.</div>;
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        const Component = BLOCK_COMPONENTS[block.type];
        
        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }

        // @ts-ignore - Props are dynamically typed based on block type
        return <Component key={block.id} {...block.props} />;
      })}
    </div>
  );
};
