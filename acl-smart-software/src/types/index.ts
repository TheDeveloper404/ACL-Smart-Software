export interface Service {
  slug: string;
  title: string;
  short: string;
  tags: string[];
  tagline: string;
  longDesc: string;
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

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

export interface PostBlock {
  type: 'p' | 'h2' | 'ul' | 'blockquote';
  text?: string;
  items?: string[];
}

export interface Post {
  slug: string;
  date: string;
  cat: string;
  title: string;
  read: string;
  excerpt: string;
  body: PostBlock[];
}

export interface Role {
  slug: string;
  title: string;
  meta: string;
  salary: string;
  stack: string[];
  desc: string;
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
