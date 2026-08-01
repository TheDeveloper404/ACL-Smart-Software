import type { MetadataRoute } from 'next';
import { SERVICES, POSTS } from '@/data';

const BASE = 'https://acl-smartsoftware.ro';
const SITE_LAUNCH = new Date('2026-05-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                    lastModified: SITE_LAUNCH, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servicii`,                      lastModified: SITE_LAUNCH, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portofoliu`,                    lastModified: SITE_LAUNCH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/insights`,                      lastModified: SITE_LAUNCH, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/cariere`,                       lastModified: SITE_LAUNCH, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/politica-confidentialitate`,    lastModified: SITE_LAUNCH, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/termeni`,                       lastModified: SITE_LAUNCH, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/cookies`,                       lastModified: SITE_LAUNCH, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/servicii/${s.slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const insightRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/insights/${p.slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: 'yearly' as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes];
}
