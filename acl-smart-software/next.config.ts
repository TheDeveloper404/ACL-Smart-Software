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
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
