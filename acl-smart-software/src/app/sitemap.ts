import type { MetadataRoute } from 'next';
import { SERVICES, POSTS } from '@/data';
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
    ...bilingualEntry('/servicii', { changeFrequency: 'monthly', priority: 0.9 }),
    ...bilingualEntry('/portofoliu', { changeFrequency: 'monthly', priority: 0.8 }),
    ...SERVICES.flatMap((s) => bilingualEntry(`/servicii/${s.slug}`, { changeFrequency: 'monthly', priority: 0.85 })),
  ];

  // Doar RO — fără hreflang, fără variantă /en (vezi lib/seo.ts localeAlternates).
  const roOnlyRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/insights`,                   lastModified: SITE_LAUNCH, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/politica-confidentialitate`, lastModified: SITE_LAUNCH, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/termeni`,                    lastModified: SITE_LAUNCH, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/cookies`,                    lastModified: SITE_LAUNCH, changeFrequency: 'yearly', priority: 0.2 },
    ...POSTS.map((p) => ({
      url: `${BASE}/insights/${p.slug}`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'yearly' as const,
      priority: 0.65,
    })),
  ];

  return [...bilingualRoutes, ...roOnlyRoutes];
}
