import type { Service, Case, ProcessStep, TechCategory } from '@/types';
import { SERVICES } from './services';
import { SERVICES_EN } from './services.en';
import { CASES_EN } from './portfolio.en';

export { SERVICES };

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map(s => [s.slug, s]));
const SERVICE_BY_SLUG_EN = Object.fromEntries(SERVICES_EN.map(s => [s.slug, s]));

export function getServices(locale: string): Service[] {
  return locale === 'en' ? SERVICES_EN : SERVICES;
}

export function getServiceBySlug(locale: string, slug: string): Service | undefined {
  return locale === 'en' ? SERVICE_BY_SLUG_EN[slug] : SERVICE_BY_SLUG[slug];
}

export const CASES: Case[] = [
  {
    slug: 'detalia',
    tag: 'Comunitate & Arhitectură',
    year: '2026',
    label: 'DETALIA',
    title: 'Platformă comunitară pentru detalii de execuție în construcții',
    desc: 'Comunitate profesională unde arhitecți, constructori și beneficiari dezbat detalii de execuție pe roluri — publici un detaliu, alți profesioniști propun soluții direct peste el, iar comunitatea validează deschis.',
    services: ['produse'],
    results: [{ n: 'Pe roluri', l: 'Arhitect / constructor / beneficiar' }, { n: 'Validare', l: 'Deschisă, cu nume' }, { n: 'Comunitate', l: 'Profesională' }],
    image: '/detalia-preview.png',
    link: 'https://detalia.ro/',
  },
  {
    slug: 'seminarul-teologic-filadelfia',
    tag: 'Educație & Instituțional',
    year: '2026',
    label: 'SEMINARUL TEOLOGIC FILADELFIA',
    title: 'Site instituțional — Seminarul Teologic Penticostal Filadelfia',
    desc: 'Prezență online completă pentru o instituție de învățământ teologic: admitere, programă educațională, profesori, studenți, absolvenți și arhivă foto/video — totul structurat și ușor de navigat.',
    services: ['produse'],
    results: [{ n: 'Multi-secțiune', l: 'Admitere, programă, absolvenți' }, { n: 'Mobile-first', l: 'Design responsive' }, { n: 'SEO', l: 'Optimizat' }],
    image: '/seminarul-teologic-preview.png',
    link: 'https://seminarulteologicfiladelfia.ro/',
  },
  {
    slug: 'filadelfia',
    tag: 'Non-profit & Religie',
    year: '2025',
    label: 'FILADELFIA',
    title: 'Site instituțional — Biserica Penticostală Filadelfia Petroșani',
    desc: 'Prezență online modernă pentru o comunitate locală din Petroșani. Design curat, conținut editorial, optimizat pentru mobil și motoare de căutare.',
    services: ['produse'],
    results: [{ n: 'Mobile-first', l: 'Design responsive' }, { n: 'SEO', l: 'Optimizat local' }, { n: 'Performanță', l: 'Lighthouse 95+' }],
    image: '/filadelfia-preview.png',
    link: 'https://www.filadelfia-petrosani.ro/',
  },
  {
    slug: 'flotapro',
    tag: 'Transport & SaaS',
    year: '2025',
    label: 'FLOTAPRO',
    title: 'Platformă SaaS pentru gestionarea facturilor Uber Fleet',
    desc: 'Aplicație multi-tenant pentru Uber Fleet Partners: import CSV din rapoartele Uber, generare facturi în format CSV/XLS, abonamente cu plăți online prin EuPlatesc și securitate avansată cu audit logging.',
    services: ['produse', 'infrastructura'],
    results: [{ n: 'Multi-tenant', l: 'Flote izolate' }, { n: 'CSV/XLS', l: 'Facturi auto-generate' }, { n: 'EuPlatesc', l: 'Plăți integrate' }],
    image: '/flotapro-preview.png',
    link: 'https://flotapro.ro/',
  },
  {
    slug: 'itcustom',
    tag: 'E-commerce & Automatizări',
    year: '2024',
    label: 'IT CUSTOM',
    title: 'Platformă e-commerce, dropshipping și automatizări pentru afaceri',
    desc: 'Soluții complete pentru antreprenori: magazine online, integrări cu furnizori, feed-uri XML, automatizări de procese și consultanță digitală pentru scalarea afacerilor.',
    services: ['produse', 'infrastructura'],
    results: [{ n: 'E-commerce', l: 'Magazine online' }, { n: 'XML feeds', l: 'Integrări furnizori' }, { n: 'Automatizări', l: 'Procese digitalizate' }],
    image: '/itcustom-preview.png',
    link: 'https://itcustom.ro/',
  },
  {
    slug: 'ebike',
    tag: 'E-commerce',
    year: '2024',
    label: 'E-BIKE.RO',
    title: 'Magazin online biciclete electrice și accesorii',
    desc: 'Platformă e-commerce pentru vânzarea de biciclete electrice și accesorii. Design modern, catalog de produse, coș de cumpărături și experiență de cumpărare optimizată.',
    services: ['produse'],
    results: [{ n: 'E-commerce', l: 'Vânzări online' }, { n: 'Mobile-first', l: 'Design responsive' }, { n: 'SEO', l: 'Optimizat' }],
    image: '/bikewebsite-preview.png',
  },
];

export function getCases(locale: string): Case[] {
  return locale === 'en' ? CASES_EN : CASES;
}

export const STEPS: ProcessStep[] = [
  { n: '01', title: 'Consultanță', desc: 'Înțelegem problema înainte de soluție. Audit tehnic, discovery sprint, validare cu utilizatori reali. Nu sărim peste asta — niciodată.', deliver: ['Audit tehnic', 'Foaie de drum', 'Estimare onestă'] },
  { n: '02', title: 'Arhitectură', desc: 'Stack-ul, fluxurile, modelul de date, UI-ul. Tot ce contează e decis înainte să se scrie linia 1 de cod.', deliver: ['Prototipuri & UI', 'Schemă bază de date', 'Arhitectură cloud'] },
  { n: '03', title: 'Dezvoltare', desc: 'Sprint-uri de 2 săptămâni, demo la final, feedback rapid. Integrare continuă din ziua 1. Tu vezi progresul în timp real.', deliver: ['Demo bi-săptămânal', 'Mediu de testare', 'Revizuire cod'] },
  { n: '04', title: 'Testare', desc: 'QA dedicat înainte de orice lansare: teste unitare, integrare, end-to-end și un audit de securitate. Nimic nu ajunge în producție netestat.', deliver: ['Teste automate', 'Audit securitate', 'Raport de calitate'] },
  { n: '05', title: 'Lansare', desc: 'Punere în producție cu plan de rollback, monitorizare activă și suport intens. Primele 30 de zile suntem la o tastă distanță.', deliver: ['Lansare în producție', 'Monitorizare & alerte', 'Documentație live'] },
  { n: '06', title: 'Mentenanță', desc: 'Optimizări, funcționalități noi, actualizări de securitate. Produsul tău crește — și noi creștem cu el. SLA-uri clare, fără surprize.', deliver: ['SLA dedicat', 'Foaie de drum continuă', 'Audit tehnic anual'] },
];

export const TECH_ITEMS: string[] = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Java', 'PostgreSQL', 'PHP',
  'React Native', 'Docker', 'AWS', 'Kubernetes', 'Spring Boot', 'Tailwind', 'GraphQL', 'Redis',
];

export const TECH_CATEGORIES: TechCategory[] = [
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'HTML / CSS'] },
  { name: 'Backend', items: ['Node.js', 'Java (Spring)', 'PHP (Laravel)', 'GraphQL', 'REST'] },
  { name: 'Mobile', items: ['React Native', 'TypeScript', 'Expo'] },
  { name: 'Cloud & DevOps', items: ['Docker', 'AWS', 'Kubernetes', 'PostgreSQL', 'Redis'] },
];
