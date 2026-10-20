import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const runtimeRequire = createRequire(import.meta.url);

const cache = new Map();
function loadTs(file) {
  const resolved = path.resolve(file);
  if (cache.has(resolved)) return cache.get(resolved);
  const compiledModule = { exports: {} };
  cache.set(resolved, compiledModule.exports);
  const source = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const localRequire = name => {
    if (name.startsWith('.')) {
      const base = path.resolve(path.dirname(resolved), name);
      return loadTs(fs.existsSync(base + '.ts') ? base + '.ts' : path.join(base, 'index.ts'));
    }
    return runtimeRequire(name);
  };
  vm.runInNewContext(source, { module: compiledModule, exports: compiledModule.exports, require: localRequire, URLSearchParams }, { filename: resolved });
  return compiledModule.exports;
}
const { SERVICES } = loadTs('src/data/services.ts');
const { SERVICES_EN } = loadTs('src/data/services.en.ts');
const { CASES, STEPS, getServices, getServiceBySlug } = loadTs('src/data/index.ts');
const { CASES_EN } = loadTs('src/data/portfolio.en.ts');
const { LEGAL } = loadTs('src/data/legal.ts');
const { REVIEWS } = loadTs('src/data/reviews.ts');
const { offerPrice } = loadTs('src/lib/offer.ts');
const { solutionIndex, solutionUrl } = loadTs('src/lib/solution-selection.ts');
const numeric = value => { const match = value.match(/[\d.,]+/); return match ? Number(match[0].replace(/[.,]/g, '')) : null; }

test('Public offers retain the approved prices in both languages', () => {
  // User: "paginile cele doua tirmise in link, alea nu trebuie schimbate, ca ce ofera"
  for (const services of [SERVICES, SERVICES_EN]) {
    const offers = services.flatMap(service => service.packages);
    for (const [id, amount] of [['mvp-saas', 4500], ['security-audit', 1500], ['maintenance', 500]]) {
      assert.equal(numeric(offers.find(offer => offer.id === id).from), amount, id);
    }
    assert.equal(numeric(offers.find(offer => offer.id === 'website').from), 1200);
    assert.equal(numeric(offers.find(offer => offer.id === 'app-web').from), 3500);
  }
});

test('Every solution and package has matching RO/EN identity and numeric prices', () => {
  assert.deepEqual(Array.from(SERVICES, service => service.slug), Array.from(SERVICES_EN, service => service.slug));
  assert.deepEqual(Array.from(SERVICES, service => service.slug).sort(), ['ai', 'consultanta', 'produse']);
  for (const ro of SERVICES) {
    const en = SERVICES_EN.find(service => service.slug === ro.slug);
    assert.deepEqual(Array.from(ro.packages, offer => offer.id), Array.from(en.packages, offer => offer.id));
    assert.equal(new Set(ro.packages.map(offer => offer.id)).size, ro.packages.length);
    for (const offer of ro.packages) assert.equal(numeric(offer.from), numeric(en.packages.find(item => item.id === offer.id).from));
    for (const item of [ro, en]) {
      assert.ok(item.packages.length > 0);
      assert.ok(item.faq.length > 0);
      assert.ok(item.packages.every(offer => offer.includes.length > 0 && offer.deliverable && offer.priceNote));
      assert.ok(item.packages.some(offer => numeric(offer.from) === numeric(item.pricing.from)), 'Category price must be an available offer');
    }
  }
});

test('Historical solution URLs resolve to the correct localized data', () => {
  for (const locale of ['ro', 'en']) {
    for (const service of getServices(locale)) assert.equal(getServiceBySlug(locale, service.slug).title, service.title);
    assert.equal(getServiceBySlug(locale, 'missing'), undefined);
  }
});

test('Seminary is described as the requested portal, without invented results', () => {
  // User: „portal pt studenti/profesori pt cursuri ... nu trebuie rezultate publice”.
  const ro = CASES.find(item => item.slug === 'seminarul-teologic-filadelfia');
  const en = CASES_EN.find(item => item.slug === ro.slug);
  assert.match(ro.desc, /studenți și profesori/);
  assert.match(en.desc, /students and teachers/);
  assert.match(ro.desc, /cursuri/);
  assert.match(en.desc, /courses/);
  assert.equal(ro.link, 'https://seminarulteologicfiladelfia.ro/');
  assert.equal(en.link, ro.link);
  assert.equal(ro.results.length, 0);
  assert.equal(en.results.length, 0);
});

test('The six project stages retain a defined output', () => {
  assert.deepEqual(Array.from(STEPS, step => step.n), ['01', '02', '03', '04', '05', '06']);
  assert.ok(STEPS.every(step => step.title && step.desc && step.deliver.length > 0));
});

test('Portfolio assets and project links have RO/EN parity', () => {
  assert.deepEqual(Array.from(CASES, item => item.slug), Array.from(CASES_EN, item => item.slug));
  for (const ro of CASES) {
    const en = CASES_EN.find(item => item.slug === ro.slug);
    assert.equal(en.image, ro.image);
    assert.equal(en.link, ro.link);
    assert.ok(fs.existsSync(path.join('public', ro.image)), ro.image);
  }
});

test('All three legal pages have an English version with matching sections', () => {
  for (const type of ['privacy', 'terms', 'cookies']) {
    assert.equal(LEGAL.ro[type].sections.length, LEGAL.en[type].sections.length);
    assert.notEqual(LEGAL.ro[type].title, LEGAL.en[type].title);
    assert.ok(LEGAL.en[type].sections.every(section => section.title && section.text));
  }
});

test('Real testimonials are preserved for every client in RO and EN', () => {
  assert.equal(REVIEWS.ro.length, 4);
  assert.deepEqual(Array.from(REVIEWS.ro, review => review.name), Array.from(REVIEWS.en, review => review.name));
  assert.ok(REVIEWS.ro.every(review => review.quote && review.role));
});

test('The merged category has one integration offer and the two approved AI assistants', () => {
  // User: "pentru pagina de AI, da 1 si 2, 3 e mai greu."
  // User: "eventual uneste cele doua pagini intr-una, chiar daca sunt mai putine servicii, important e sa fie ce putem livra. Dar cumva sa se deosebeasca ce ineamna integrare API si AI"
  const counts = { ai: 3, produse: 4, consultanta: 3 };
  for (const [locale, services] of [['ro', SERVICES], ['en', SERVICES_EN]]) {
    for (const service of services) assert.equal(service.packages.length, counts[service.slug]);
    const combined = services.find(service => service.slug === 'ai');
    assert.deepEqual(Array.from(combined.packages, offer => offer.id), ['integration', 'customer-assistant', 'shop-assistant']);
    assert.notEqual(combined.packages[0].model, combined.packages[1].model);
    assert.equal(combined.packages[1].model, combined.packages[2].model);
    for (const offer of combined.packages) {
      assert.equal(offer.from, locale === 'ro' ? 'La oferta' : 'On request');
      assert.equal(offerPrice(offer.from), undefined);
    }
    assert.equal(services.some(service => service.slug === 'infrastructura'), false);
    assert.doesNotMatch(JSON.stringify(combined), /document-processing|automation-agent|ai-assessment|ai-feature|\bvoice\b|\bvocal\b/i);
  }
});

test('Portfolio service references point to categories still available after the merge', () => {
  for (const [locale, cases] of [['ro', CASES], ['en', CASES_EN]]) {
    for (const project of cases) {
      for (const slug of project.services) assert.ok(getServiceBySlug(locale, slug), project.slug + ': ' + slug);
    }
  }
});

test('Structured offers parse public EUR prices and omit unpriced quotes', () => {
  assert.equal(offerPrice('€4.500'), '4500');
  assert.equal(offerPrice('€4,500'), '4500');
  assert.equal(offerPrice('€500 / lună'), '500');
  assert.equal(offerPrice('La ofertă'), undefined);
  assert.equal(offerPrice('On request'), undefined);
  assert.equal(offerPrice(''), undefined);
});

test('Dani attribution includes IT Custom and FlotaPro without altering his quote', () => {
  for (const locale of ['ro', 'en']) {
    const review = REVIEWS[locale].find(item => item.name === 'Dani N.');
    assert.match(review.role, /IT Custom/);
    assert.match(review.role, /FlotaPro/);
  }
});

test('Category state resolves valid URLs and falls back safely for unknown categories', () => {
  for (const [index, service] of SERVICES.entries()) assert.equal(solutionIndex(SERVICES, service.slug), index);
  assert.equal(solutionIndex(SERVICES, null), 0);
  assert.equal(solutionIndex(SERVICES, 'unknown'), 0);
  assert.equal(solutionIndex([], 'produse'), 0);
});

test('Selection replaces the category while preserving locale, other query parameters and hash', () => {
  assert.equal(solutionUrl('/servicii', '', '', 'produse'), '/servicii?solutie=produse');
  assert.equal(solutionUrl('/en/servicii', 'source=mail&solutie=ai', '#oferte', 'infrastructura'), '/en/servicii?source=mail&solutie=infrastructura#oferte');
  assert.equal(solutionUrl('/servicii', 'source=a%26b', '', 'consultanta'), '/servicii?source=a%26b&solutie=consultanta');
});

const { orderedProjects, homeProjects, projectAnchor } = loadTs('src/lib/project-selection.ts');

test('Portfolio retains all six projects and the approved leading order in both languages', () => {
  for (const cases of [CASES, CASES_EN]) {
    const ordered = orderedProjects(cases);
    assert.deepEqual(Array.from(ordered.slice(0, 4), item => item.slug),
      ['meridian-transconstruct', 'detalia', 'seminarul-teologic-filadelfia', 'flotapro']);
    assert.equal(ordered.length, cases.length);
    assert.equal(new Set(ordered.map(item => item.slug)).size, cases.length);
  }
  const future = { slug: 'future-project' };
  assert.equal(orderedProjects([...CASES, future]).at(-1), future);
});

test('Home highlights Detalia, the Seminary and Meridian with their real localized data', () => {
  // User: „mai adaugă și Meridian tot în Acasă”; păstrăm Detalia și Seminarul.
  for (const cases of [CASES, CASES_EN]) {
    const highlights = homeProjects(cases);
    assert.deepEqual(Array.from(highlights, item => item.slug), ['detalia', 'seminarul-teologic-filadelfia', 'meridian-transconstruct']);
    for (const project of highlights) assert.equal(project, cases.find(item => item.slug === project.slug));
    assert.equal(highlights[1].results.length, 0);
  }
  assert.equal(homeProjects([]).length, 0);
});

test('Portfolio detail anchors are unique and language independent', () => {
  assert.equal(projectAnchor('seminarul-teologic-filadelfia'), 'proiect-seminar');
  const anchors = Array.from(CASES, project => projectAnchor(project.slug));
  assert.equal(new Set(anchors).size, CASES.length);
  assert.deepEqual(anchors, Array.from(CASES_EN, project => projectAnchor(project.slug)));
});


test('Process retains the approved demo cadence and free support scope', () => {
  // User: „demo-uri cam la 2 saptamani ... un an gratis suport”.
  // Scope approved: „Ajutor la utilizare și remedierea erorilor produsului livrat”.
  const development = STEPS.find(step => step.n === '03');
  const support = STEPS.find(step => step.n === '06');
  assert.match(development.desc, /aproximativ două săptămâni/);
  assert.match(support.desc, /un an de suport gratuit/);
  assert.match(support.desc, /utilizare și remedierea erorilor produsului livrat/);
  assert.match(support.desc, /Funcționalitățile noi .* se stabilesc separat/);
  assert.ok(support.deliver.includes('Un an de suport gratuit'));
});

test('Filadelfia church and seminary are explained as the same returning client', () => {
  // User: church site first, then the satisfied client returned for the Seminary portal.
  const ro = REVIEWS.ro.find(review => review.name === 'Biserica Filadelfia Petroșani');
  const en = REVIEWS.en.find(review => review.name === ro.name);
  assert.match(ro.role, /bisericii.*Seminarului/);
  assert.match(ro.context, /mai întâi.*Bisericii.*din nou.*Seminarului/);
  assert.match(en.context, /first.*website.*returned.*Seminary/);
  assert.match(ro.quote, /O experiență foarte bună/);
});
