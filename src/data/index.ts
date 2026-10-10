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
    slug: 'meridian-transconstruct',
    tag: 'Construcții & Prezență online',
    year: '2026',
    label: 'MERIDIAN TRANSCONSTRUCT',
    title: 'Website de prezentare pentru o firmă de construcții',
    desc: 'Website pentru Meridian Transconstruct, firmă de construcții din Petroșani: prezentarea serviciilor, portofoliu de lucrări cu fotografii reale și căi clare de contact pentru cereri de ofertă.',
    services: ['produse'],
    results: [{ n: 'Servicii', l: 'Prezentate pe tipuri de lucrări' }, { n: 'Portofoliu', l: 'Fotografii din proiecte reale' }, { n: 'Contact', l: 'Cereri de ofertă' }],
    image: '/meridian-preview.png',
    link: 'https://meridian-transconstruct.ro/',
  },
  {
    slug: 'detalia',
    tag: 'Comunitate & Arhitectură',
    year: '2026',
    label: 'DETALIA',
    title: 'Platformă comunitară pentru detalii de execuție în construcții',
    desc: 'Comunitate profesională unde arhitecți, constructori și beneficiari dezbat detalii de execuție pe roluri — publici un detaliu, alți profesioniști propun soluții direct peste el, iar comunitatea validează deschis.',
    services: ['produse'],
    results: [{ n: 'Pe roluri', l: 'Arhitect / constructor / beneficiar' }, { n: 'Validare', l: 'Deschisă, cu nume' }, { n: 'Comunitate', l: 'Profesională' }],
    image: '/detalia-current.jpg',
    link: 'https://detalia.ro/',
  },
  {
    slug: 'seminarul-teologic-filadelfia',
    tag: 'Educație & Portal',
    year: '2026',
    label: 'SEMINARUL TEOLOGIC FILADELFIA',
    title: 'Portal pentru studenți și profesori — Seminarul Filadelfia',
    desc: 'Seminarul avea nevoie de un portal pentru studenți și profesori, cu acces la cursuri și materiale educaționale. Am construit un spațiu digital pentru această nevoie.',
    services: ['produse'],
    results: [],
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
    results: [{ n: 'Mobile-first', l: 'Design responsive' }, { n: 'SEO', l: 'Optimizat local' }],
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
    results: [{ n: 'Conturi separate', l: 'Pentru fiecare flotă' }, { n: 'CSV/XLS', l: 'Facturi auto-generate' }, { n: 'EuPlatesc', l: 'Plăți integrate' }],
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
];

export function getCases(locale: string): Case[] {
  return locale === 'en' ? CASES_EN : CASES;
}

export const STEPS: ProcessStep[] = [
  {
    "n": "01",
    "title": "Consultanță",
    "desc": "Discutăm ce vrei să rezolvi, cine va folosi produsul și ce contează în prima versiune. Stabilim scopul înainte de implementare.",
    "deliver": [
      "Nevoia definită clar",
      "Priorități agreate",
      "Estimare inițială"
    ]
  },
  {
    "n": "02",
    "title": "Arhitectură",
    "desc": "Transformăm ideea în fluxuri și un design pe care îl poți discuta. Alegem o soluție tehnică potrivită proiectului.",
    "deliver": [
      "Fluxuri de utilizare",
      "Propunere de interfață",
      "Plan de implementare"
    ]
  },
  {
    "n": "03",
    "title": "Dezvoltare",
    "desc": "Construim în etape și îți arătăm versiuni funcționale în demo-uri la aproximativ două săptămâni. Poți verifica produsul și da feedback în timp ce acesta prinde formă.",
    "deliver": [
      "Versiuni funcționale",
      "Demo-uri și feedback",
      "Progres comunicat"
    ]
  },
  {
    "n": "04",
    "title": "Testare",
    "desc": "Verificăm fluxurile importante, cazurile de eroare și regulile de acces înainte de lansare. Reparăm problemele identificate în scopul agreat.",
    "deliver": [
      "Fluxuri principale verificate",
      "Erori remediate",
      "Versiune pregătită de lansare"
    ]
  },
  {
    "n": "05",
    "title": "Lansare",
    "desc": "Publicăm produsul în mediul stabilit și verificăm că este disponibil. Primești acces și explicațiile necesare pentru a-l folosi.",
    "deliver": [
      "Produs disponibil",
      "Accesurile agreate",
      "Instrucțiuni de utilizare"
    ]
  },
  {
    "n": "06",
    "title": "Mentenanță",
    "desc": "După lansare primești un an de suport gratuit pentru utilizare și remedierea erorilor produsului livrat. Funcționalitățile noi și intervențiile suplimentare se stabilesc separat.",
    "deliver": [
      "Un an de suport gratuit",
      "Ajutor la utilizare și remedieri",
      "Plan separat pentru dezvoltări noi"
    ]
  }
];

export const TECH_ITEMS: string[] = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Java', 'PostgreSQL', 'PHP',
  'Docker', 'AWS', 'Kubernetes', 'Spring Boot', 'Tailwind', 'GraphQL', 'Redis',
];

export const TECH_CATEGORIES: TechCategory[] = [
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'HTML / CSS'] },
  { name: 'Backend', items: ['Node.js', 'Java (Spring)', 'PHP (Laravel)', 'GraphQL', 'REST'] },
  { name: 'Securitate', items: ['OWASP ASVS', 'OWASP Top 10', 'Audit web & API'] },
  { name: 'Cloud & DevOps', items: ['Docker', 'AWS', 'Kubernetes', 'PostgreSQL', 'Redis'] },
];
