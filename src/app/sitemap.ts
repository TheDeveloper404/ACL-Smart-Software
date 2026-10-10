import type { MetadataRoute } from 'next';
import { SERVICES } from '@/data';
import { BASE } from '@/lib/seo';

const SITE_LAUNCH = new Date('2026-05-01');

/**
 * Pentru fiecare path tradus (RO + EN), generăm DOUĂ intrări — una per limbă — fiecare cu
 * `alternates.languages` reciproc. E convenția standard pt. hreflang în sitemap: fiecare
 * variantă își declară pe sine + toate celelalte, nu doar limba implicită le declară pe ele.
 */
function bilingualEntry(
  path: string,
  meta: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }
): MetadataRoute.Sitemap {
  const roUrl = `${BASE}${path}`;
  const enUrl = `${BASE}/en${path}`;
  const languages = { ro: roUrl, en: enUrl, 'x-default': roUrl };
  return [
    { url: roUrl, lastModified: SITE_LAUNCH, alternates: { languages }, ...meta },
    { url: enUrl, lastModified: SITE_LAUNCH, alternates: { languages }, ...meta },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const bilingualRoutes: MetadataRoute.Sitemap = [
    ...bilingualEntry('', { changeFrequency: 'weekly', priority: 1.0 }),
    ...bilingualEntry('/despre-noi', { changeFrequency: 'monthly', priority: 0.7 }),
    ...bilingualEntry('/servicii', { changeFrequency: 'monthly', priority: 0.9 }),
    ...bilingualEntry('/portofoliu', { changeFrequency: 'monthly', priority: 0.8 }),
    ...SERVICES.flatMap((s) => bilingualEntry(`/servicii/${s.slug}`, { changeFrequency: 'monthly', priority: 0.85 })),
  ];

  const legalRoutes = ['/politica-confidentialitate', '/termeni', '/cookies'].flatMap(path => bilingualEntry(path, { changeFrequency: 'yearly', priority: 0.2 }));
  return [...bilingualRoutes, ...legalRoutes];
}
