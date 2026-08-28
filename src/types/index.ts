/**
 * Un pachet productizat din interiorul unei arii de servicii — scope fix, preț „de la",
 * durată și livrabil clar. Afișat ca tabel pe pagina de arie; alimentează și nodurile
 * `Offer` din structured data.
 */
export interface ServicePackage {
  /** Slug local, unic în cadrul ariei — folosit ca ancoră (#) și cheie de listă. */
  id: string;
  name: string;
  /** Preț de pornire formatat, ex. „€4.500" sau „€600 / lună". */
  from: string;
  /** Durată formatată, ex. „5–8 săpt" sau „continuu". */
  duration: string;
  /** Model comercial, ex. „Scope fix" / „Retainer lunar" / „Preț fix pe livrabil". */
  model: string;
  /** 3–5 puncte: ce include pachetul. */
  includes: string[];
  /** O propoziție: ce rămâne clientul cu în mână la final. */
  deliverable: string;
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  tags: string[];
  tagline: string;
  longDesc: string;
  packages: ServicePackage[];
  whatWeBuild: { title: string; desc: string }[];
  audience: { title: string; desc: string }[];
  technologies: { cat: string; items: string[] }[];
  pricing: { from: string; duration: string; model: string };
  timeline: string;
  faq: { q: string; a: string }[];
}

export interface Case {
  slug: string;
  tag: string;
  year: string;
  label: string;
  title: string;
  desc: string;
  services: string[];
  results: { n: string; l: string }[];
  image?: string;
  link?: string;
}

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
  deliver: string[];
}

export interface TechCategory {
  name: string;
  items: string[];
}

export type Palette = 'lime' | 'blue' | 'orange' | 'violet';
export type Mode = 'dark' | 'light';
export type FontPair = 'grotesk' | 'geist' | 'serif' | 'plex';
export type Density = 'comfortable' | 'compact';

export interface Theme {
  palette: Palette;
  mode: Mode;
  fontPair: FontPair;
  density: Density;
}
