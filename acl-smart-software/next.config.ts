import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // `www` → apex. Ambele variante răspundeau cu 200, iar Google raporta duplicatele
      // ca "Pagină alternativă cu etichetă canonică corespunzătoare". Canonical-ul le plia
      // deja corect, dar redirectul elimină ambiguitatea la sursă.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.acl-smartsoftware.ro' }],
        destination: 'https://acl-smartsoftware.ro/:path*',
        permanent: true,
      },
      // Pagini scoase din site, dar rămase în indexul Google (raportate ca 404).
      // Le trimitem spre cel mai apropiat conținut relevant ca să nu pierdem semnalele.
      {
        source: '/echipa',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cariere',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      // Secțiunea `/insights` ștearsă (RO + EN). Articolele rămân în indexul Google — le
      // pliem 301 spre homepage ca să nu dea 404.
      { source: '/insights', destination: '/', permanent: true },
      { source: '/insights/:slug*', destination: '/', permanent: true },
      { source: '/en/insights', destination: '/en', permanent: true },
      { source: '/en/insights/:slug*', destination: '/en', permanent: true },
      // Restructurare servicii: 8 pagini individuale → 4 arii cu pachete productizate.
      // Vechile slug-uri rămân în indexul Google; le pliem 301 spre aria corespunzătoare
      // (RO neprefixat + varianta /en).
      ...[
        { from: 'software-custom', to: 'produse' },
        { from: 'aplicatii-web', to: 'produse' },
        { from: 'aplicatii-mobile', to: 'produse' },
        { from: 'ai-ml', to: 'ai' },
        { from: 'cloud-devops', to: 'infrastructura' },
        { from: 'integrari-api', to: 'infrastructura' },
        { from: 'consultanta-it', to: 'consultanta' },
        { from: 'mentenanta-suport', to: 'consultanta' },
      ].flatMap(({ from, to }) => [
        { source: `/servicii/${from}`, destination: `/servicii/${to}`, permanent: true },
        { source: `/en/servicii/${from}`, destination: `/en/servicii/${to}`, permanent: true },
      ]),
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
