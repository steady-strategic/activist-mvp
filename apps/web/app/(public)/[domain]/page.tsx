// apps/web/app/(public)/[domain]/page.tsx
import React from 'react';
import { TenantConfig } from '../../../../../packages/core/src/types';
import { CmsBlockRenderer } from '../../components/CmsBlockRenderer';

export default function TenantPage({ tenant }: { tenant: TenantConfig }) {
  return (
    <>
      <CmsBlockRenderer blocks={tenant.landingPageBlocks} />
    </>
  );
}
