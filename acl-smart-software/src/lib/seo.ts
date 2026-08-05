export const BASE = 'https://acl-smartsoftware.ro';

export const ORG_ID = `${BASE}/#organization`;

/**
 * Nod Organization minimal, de inclus în graful FIECĂREI pagini care îl referențiază.
 *
 * Google rezolvă referințele `@id` doar în interiorul structured data al aceleiași pagini
 * — un `{ '@id': ORG_ID }` care trimite spre nodul complet de pe homepage rămâne o
 * referință moartă, iar câmpuri ca `author.name` apar ca lipsă la validare. Nodul complet
 * (adresă, geo, program) rămâne pe homepage; aici e doar identitatea necesară.
 */
export const ORGANIZATION_NODE = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'ACL Smart Software SRL',
  url: BASE,
  logo: `${BASE}/og-image.png`,
} as const;

/** Lunile în forma folosită de `Post.date` ("15 IUL 2026"), mapate la index ISO. */
const MONTHS_RO: Record<string, string> = {
  IAN: '01', FEB: '02', MAR: '03', APR: '04', MAI: '05', IUN: '06',
  IUL: '07', AUG: '08', SEP: '09', OCT: '10', NOI: '11', DEC: '12',
};

/**
 * Convertește data de afișare a unui articol ("15 IUL 2026") în ISO ("2026-07-15"),
 * formatul cerut de schema.org pentru `datePublished`.
 * Returnează `null` dacă formatul nu e recunoscut, ca să nu emitem structured data invalid.
 */
export function toIsoDate(display: string): string | null {
  const match = /^(\d{1,2})\s+([A-ZĂÂÎȘȚ]+)\s+(\d{4})$/i.exec(display.trim());
  if (!match) return null;

  const [, day, monthRaw, year] = match;
  const month = MONTHS_RO[monthRaw.toUpperCase()];
  if (!month) return null;

  return `${year}-${month}-${day.padStart(2, '0')}`;
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList — apare direct sub titlu în rezultatele Google. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${BASE}${crumb.path}`,
    })),
  };
}

/**
 * Document JSON-LD complet cu doar breadcrumbs — pentru paginile de listare, care nu au
 * altă entitate proprie de descris. Paginile de detaliu își compun singure graful.
 */
export function breadcrumbDocument(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbJsonLd(crumbs)],
  };
}

/**
 * `alternates` (canonical + hreflang) pentru o pagină, dat fiind path-ul ei RO (fără
 * prefix), ex. '/servicii', '/servicii/aplicatii-web', '' pentru homepage.
 *
 * Fiecare pagină trebuie să-și seteze propriul canonical — niciodată moștenit de la layout
 * — altfel Google primește un semnal greșit ("indexează homepage-ul în locul ăsteia").
 * Pentru pagini fără variantă EN (insights, legal), `enAvailable: false` omite blocul
 * `languages`, ca să nu promitem o traducere care nu există.
 */
/** Prefixează un path RO cu `/en` când locale e engleză — folosit pt. breadcrumbs/link-uri. */
export function localePath(locale: string, path: string): string {
  return locale === 'en' ? `/en${path}` : path;
}

export function localeAlternates(path: string, locale: string, opts?: { enAvailable?: boolean }) {
  const enAvailable = opts?.enAvailable ?? true;
  const roUrl = `${BASE}${path}`;

  if (!enAvailable) return { canonical: roUrl };

  const enUrl = `${BASE}/en${path}`;
  return {
    canonical: locale === 'en' ? enUrl : roUrl,
    languages: { ro: roUrl, en: enUrl, 'x-default': roUrl },
  };
}
