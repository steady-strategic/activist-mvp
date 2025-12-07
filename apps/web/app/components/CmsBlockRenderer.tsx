export default async function TenantHome({ searchParams }) {
  const tenantId = searchParams.tenantId;

  const page = await prisma.page.findFirst({
    where: { tenantId, slug: "home" },
  });

  const blocks = (page?.blocks as any[]) || [];

  return (
    <SiteShell>
      {blocks.map((block, i) => (
        <CmsBlockRenderer key={i} block={block} />
      ))}
    </SiteShell>
  );
}
