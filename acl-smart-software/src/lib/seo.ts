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
 * Pentru pagini fără variantă EN (paginile legale), `enAvailable: false` omite blocul
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
