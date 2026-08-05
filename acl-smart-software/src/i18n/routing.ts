import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ro', 'en'],
  defaultLocale: 'ro',
  // RO stays unprefixed (acl-smartsoftware.ro/servicii) — every RO URL indexed
  // so far must keep working exactly as-is. EN gets the /en prefix.
  localePrefix: 'as-needed',
});

export type AppLocale = (typeof routing.locales)[number];
