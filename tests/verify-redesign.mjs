import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.ACL_VERIFY_URL || 'http://localhost:3000';
const routes = ['', '/despre-noi', '/servicii', '/portofoliu', '/servicii/ai', '/servicii/produse', '/servicii/consultanta', '/politica-confidentialitate', '/termeni', '/cookies'];
const reports = [];
function readable(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
}
async function page(route) {
  const response = await fetch(base + route, { signal: AbortSignal.timeout(60000) });
  assert.equal(response.status, 200, route);
  const raw = await response.text();
  const metadata = new Map(Array.from(raw.matchAll(/<meta\b[^>]*>/g), match => {
    const tag = match[0];
    return [tag.match(/(?:property|name)="([^"]+)"/)?.[1], tag.match(/content="([^"]*)"/)?.[1]];
  }));
  const locale = route.startsWith('/en') ? 'en' : 'ro';
  assert.equal(metadata.get('og:url'), 'https://acl-smartsoftware.ro' + route.split('?')[0], route + ' share URL');
  assert.ok(metadata.get('og:title'));
  assert.ok(metadata.get('og:description'));
  assert.equal(metadata.get('twitter:title'), metadata.get('og:title'));
  assert.equal(metadata.get('twitter:description'), metadata.get('og:description'));
  assert.equal(metadata.get('twitter:card'), 'summary_large_image');
  for (const key of ['og:image', 'twitter:image']) {
    const url = new URL(metadata.get(key));
    assert.equal(url.origin, process.env.ACL_VERIFY_SHARE_ORIGIN || new URL(base).origin);
    assert.ok([(locale === 'en' ? '/en' : '') + '/opengraph-image', '/' + locale + '/opengraph-image'].includes(url.pathname));
  }
  assert.equal(metadata.get('og:locale'), locale === 'en' ? 'en_US' : 'ro_RO');
  assert.equal(metadata.get('og:image:width'), '1200');
  assert.equal(metadata.get('og:image:height'), '630');
 
  if (route.includes('/servicii/')) {
    const scripts = Array.from(raw.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g), match => JSON.parse(match[1]));
    const offers = scripts.flatMap(document => (document['@graph'] || []).flatMap(node => node.hasOfferCatalog?.itemListElement || []));
    assert.ok(offers.length >= 3 && offers.length <= 4, route + ' package count');
    for (const offer of offers) { if (Object.hasOwn(offer, 'price')) assert.match(offer.price, /^\d+$/); }
  }
  const html = readable(raw);
  assert.match(html, /<h1[ >]/, route);
  assert.match(html, /CUI 51219715/, route);
  assert.match(html, /0758 154 490/, route);
  return html;
}
(async () => {
  for (const locale of ['ro', 'en']) {
    const prefix = locale === 'en' ? '/en' : '';
    const texts = new Map();
    for (const route of routes) {
      const html = await page(prefix + route);
      assert.match(html, new RegExp('<html[^>]*lang="' + locale + '"'));
      assert.match(html, /Soluții|Solutions/);
      if (route) assert.match(html, new RegExp('rel="canonical" href="https://acl-smartsoftware.ro' + prefix + route + '"'));
      assert.match(html, /hreflang="en"/i);
      texts.set(route, html);
      reports.push({ route: prefix + (route || '/'), status: 200, locale });
    }
    const solutions = texts.get('/servicii');
    // User: "PE LANGA faptul ca e greu de citit si sunt 100 de mii de carduri".
    assert.equal((solutions.match(/class="services-index-card solution-overview"/g) || []).length, 3);
    assert.doesNotMatch(solutions, /solutions-guide-section/);
    // Every offer linked from the overview must have a real destination on its detail page.
    const offerLinks = Array.from(solutions.matchAll(/href="([^"#]*\/servicii\/(ai|produse|consultanta)#([^"#]+))"/g));
    assert.equal(offerLinks.length, 10);
    for (const [, , slug, id] of offerLinks) {
      assert.ok(texts.get('/servicii/' + slug).includes('id="' + id + '"'), 'Missing offer destination: ' + slug + '#' + id);
    }
    // User: "https://www.instagram.com/acl_smartsoftware/" and "https://www.linkedin.com/company/acl-smartsoftware/?viewAsMember=true".
    for (const url of ['https://www.instagram.com/acl_smartsoftware/', 'https://www.linkedin.com/company/acl-smartsoftware/']) {
      assert.ok(solutions.includes('href="' + url + '" target="_blank" rel="noopener noreferrer"'));
    }
    assert.doesNotMatch(solutions, /solutions-context|Nu știi încă|Not sure/);
    const home = texts.get('');
    assert.match(home, /hero-connected/);
    const heroNodes = Array.from(home.matchAll(/<button\b[^>]*class="flow-node flow-node-[^" ]+(?: is-active)?"[^>]*>/g), match => match[0]);
    assert.equal(heroNodes.length, 6);
    assert.equal(heroNodes.filter(node => node.includes('aria-pressed="true"')).length, 1);
    assert.match(home, /flow-wire-base/);
    assert.match(home, /flow-packet/);
    // Regression: connector endpoints must meet node borders in the actual mobile grid.
    const css = fs.readFileSync('src/app/rebrand.css', 'utf8');
    const grid = css.match(/\.connected-process \.flow-canvas \{([^}]+)\}/)[1];
    const height = Number(grid.match(/height: (\d+)px/)[1]);
    const rows = grid.match(/grid-template-rows: repeat\((\d+), (\d+)px\)/);
    const gaps = grid.match(/gap: (\d+)px (\d+)%/);
    const rowCount = Number(rows[1]), rowHeight = Number(rows[2]);
    const rowGap = Number(gaps[1]), columnGap = Number(gaps[2]);
    assert.equal(height, rowCount * rowHeight + (rowCount - 1) * rowGap);
    const mobileSvg = home.match(/<svg\b[^>]*class="flow-connections-mobile"[^>]*>([\s\S]*?)<\/svg>/)[1];
    const edges = Array.from(mobileSvg.matchAll(/<g\b[^>]*data-from="(\d+)"[^>]*data-to="(\d+)"[^>]*>([\s\S]*?)<\/g>/g));
    assert.equal(edges.length, 6);
    const nodeWidth = (100 - columnGap) / 2;
    const box = index => ({ x: (index % 2) * (nodeWidth + columnGap), y: Math.floor(index / 2) * (rowHeight + rowGap), width: nodeWidth, height: rowHeight });
    const border = ([x, y], node) => {
      const within = x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height;
      return within && (x === node.x || x === node.x + node.width || y === node.y || y === node.y + node.height);
    };
    for (const edge of edges) {
      const wire = edge[3].match(/<path\b[^>]*class="flow-wire-base"[^>]*>/)[0];
      const commands = wire.match(/d="([^"]+)"/)[1].match(/[MHV]|-?\d+(?:\.\d+)?/g);
      let x = 0, y = 0, first;
      while (commands.length) {
        const command = commands.shift();
        if (command === 'M') { x = Number(commands.shift()); y = Number(commands.shift()); first = [x, y]; }
        else if (command === 'H') x = Number(commands.shift());
        else if (command === 'V') y = Number(commands.shift());
        else throw new Error('Unexpected mobile connector command');
        assert.ok(x >= 0 && x <= 100 && y >= 0 && y <= height, 'Connector must stay within canvas');
      }
      assert.ok(border(first, box(Number(edge[1]))), 'Connector must start on its source node');
      assert.ok(border([x, y], box(Number(edge[2]))), 'Connector must end on its destination node');
      assert.match(wire, /vector-effect="non-scaling-stroke"/);
    }

    assert.match(home, /contact-terminal/);
    assert.doesNotMatch(home, /og-image\.png/);
    assert.match(home, /terminal-bar/);
    assert.match(home, /contact-direct/);
    assert.match(home, /footer-compact/);
    assert.equal((home.match(/class="featured-project home-project"/g) || []).length, 3);
    assert.equal((home.match(/id="journey-tab-/g) || []).length, 6);
    const processPanels = Array.from(home.matchAll(/<div\b[^>]*id="journey-panel-(\d+)"[^>]*>/g));
    assert.equal(processPanels.length, 6);
    assert.equal(processPanels.filter(panel => !/\bhidden(?:=| )/.test(panel[0])).length, 1);
    for (const [index, panel] of processPanels.entries()) {
      const end = processPanels[index + 1]?.index ?? home.indexOf('<div class="journey-summary"', panel.index);
      const content = home.slice(panel.index, end);
      assert.match(content, /class="journey-client"/);
      assert.match(content, /class="journey-checkpoint"/);
      assert.match(content, locale === 'en' ? /Your involvement/ : /Implicarea ta/);
      assert.match(content, locale === 'en' ? /What we check/ : /Ce verificăm/);
      const deliverables = content.slice(content.indexOf('<ul>'), content.indexOf('</ul>'));
      const count = Number(content.match(/class="journey-deliver-count">(\d+)<\/strong>/)[1]);
      assert.equal(count, (deliverables.match(/<li[ >]/g) || []).length, 'Displayed deliverables must match the actual list');
      assert.ok(count > 0);
    }
    const stageCount = Number(home.match(/class="journey-stage-count">(\d+)<\/strong>/)[1]);
    assert.equal(stageCount, processPanels.length);
    assert.match(home, /class="journey-demo-frequency">~2<\/strong>/);
    assert.match(home, /class="journey-support-duration">1<\/strong>/);
    assert.match(home, locale === 'en' ? /Weeks between demos/ : /Săptămâni între demo-uri/);
    assert.match(home, locale === 'en' ? /Year of free support/ : /An de suport gratuit/);
    assert.match(home, locale === 'en' ? /usage help and bug fixes in the delivered product/ : /utilizare și remedierea erorilor produsului livrat/);
    assert.match(home, locale === 'en' ? /New features and additional work are agreed separately/ : /Funcționalitățile noi și intervențiile suplimentare se stabilesc separat/);


    assert.doesNotMatch(home, /class="tech|class="about/);
    const highlights = Array.from(home.matchAll(/<a\b[^>]*class="featured-project home-project"[^>]*>/g), match => match[0].match(/href="([^"]+)"/)[1]);
    assert.deepEqual(highlights, [prefix + '/portofoliu#proiect-detalia', prefix + '/portofoliu#proiect-seminar', prefix + '/portofoliu#proiect-meridian-transconstruct']);
    assert.equal((home.match(/class="bento-project-image"/g) || []).length, 3);
    assert.match(home, /home-project-grid home-bento/);
    assert.equal((home.match(/class="home-bento-fact(?: home-bento-fact--accent)?"/g) || []).length, 3);
    assert.doesNotMatch(home, /\+40%|project-preview-stage/);
    assert.doesNotMatch(home, /home-bento-fact--accent/);
    assert.match(home, locale === 'en' ? /Real projects. Direct contact./ : /Lucrări reale. Contact direct./);
    const explanations = Array.from(home.matchAll(/<a\b[^>]*class="home-bento-fact(?: home-bento-fact--accent)?"[^>]*>/g), match => match[0].match(/href="([^"]+)"/)[1]);
    assert.deepEqual(explanations, highlights);
    const functions = Array.from(home.matchAll(/<a\b[^>]*class="bento-project-detail"[^>]*>/g), match => match[0].match(/href="([^"]+)"/)[1]);
    assert.deepEqual(functions, highlights);
    assert.equal((home.match(/The need we addressed|Nevoia rezolvată/g) || []).length, 3);
    assert.match(home, locale === "en" ? /3 roles/ : /3 roluri/);
    assert.match(home, locale === "en" ? /Access to courses/ : /Acces la cursuri/);
    assert.match(home, locale === "en" ? /Quote requests/ : /Cereri de ofertă/);
    assert.match(home, locale === 'en' ? /Different roles. Shared solutions./ : /Roluri diferite. Soluții împreună./);
    assert.match(home, locale === 'en' ? /Courses. Materials. One portal./ : /Cursuri. Materiale. Un singur portal./);
    assert.doesNotMatch(home, /device-laptop|device-tablet|device-phone|home-project-arrow/);
    const portfolio = texts.get('/portofoliu');
    assert.equal((portfolio.match(/class="case"/g) || []).length, 6);
    assert.match(portfolio, /id="proiect-detalia"/);
    assert.match(portfolio, /id="proiect-seminar"/);
    assert.match(portfolio, locale === 'en' ? /Student and teacher portal/ : /Portal pentru studenți și profesori/);
    assert.match(portfolio, /href="https:\/\/seminarulteologicfiladelfia.ro\/"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
    assert.match(home, new RegExp('href="' + prefix + '/portofoliu"'));
    assert.match(home, locale === 'en' ? /Professional platform for construction/ : /Platformă profesională pentru construcții/);
    assert.match(home, /class="contact-form-head"/);
    assert.match(home, /<fieldset[^>]*class="field budget-field"/);
    const about = texts.get('/despre-noi');
    assert.doesNotMatch(about, /projects-strip|why-bento|how-cards|journey-tab-|Înființare|Since 2024|Din 2024/);
    assert.equal((about.match(/id="review-tab-/g) || []).length, 4);
    assert.match(about, /review-collaboration/);
    assert.match(about, locale === 'en' ? /the same client, two projects/ : /același client, două proiecte/);
    assert.doesNotMatch(about, /studio|independent|În proiectele noastre|In our projects/i);
    assert.match(about, locale === 'en' ? /IT Custom and FlotaPro/ : /IT Custom și FlotaPro/);
    assert.equal(['ai', 'produse', 'consultanta'].reduce((count, slug) => count + (texts.get('/servicii/' + slug).match(/class="pkg-card rise"/g) || []).length, 0), 10);
    assert.match(texts.get('/servicii/ai'), locale === 'en' ? /Request a quote/ : /Cere ofertă/);
    assert.match(about, locale === 'en' ? /Who we work with/ : /Cu cine lucrăm/);
    assert.match(about, /industry-map/);
    assert.doesNotMatch(about, /industry-orbit/);
    assert.equal((about.match(/class="industry-node-icon"/g) || []).length, 4);
    assert.match(about, /class="industry-hub"[^>]*><strong>ACL<\/strong>/);
    assert.match(about, locale === 'en' ? /individuals and legal entities/ : /persoane fizice și juridice/);
    assert.match(about, locale === 'en' ? /specialising in AI integration/ : /specializată în integrarea AI/);
    const glyphs = about.match(/<pre[^>]*class="hero-glyphs"[^>]*>([\s\S]*?)<\/pre>/);
    assert.ok(glyphs);
    assert.match(glyphs[1], /^[01\s]+$/);
    assert.match(texts.get('/servicii/produse'), locale === 'en' ? /€4,500/ : /€4\.500/);
    assert.match(texts.get('/servicii/ai'), locale === 'en' ? /Request a quote/ : /Cere ofertă/);
    assert.doesNotMatch(texts.get('/servicii'), /FinOps|Kubernetes|DevOps retainer/);
    assert.match(texts.get('/cookies'), /acl-a11y-v1/);
    if (locale === 'en') {
      assert.match(texts.get('/politica-confidentialitate'), /Privacy policy/);
      assert.match(texts.get('/termeni'), /Terms and conditions/);
      assert.match(texts.get('/cookies'), /Cookie policy/);
    }
    // User: "eventual uneste cele doua pagini intr-una, chiar daca sunt mai putine servicii, important e sa fie ce putem livra. Dar cumva sa se deosebeasca ce ineamna integrare API si AI"
    for (const slug of ['ai', 'produse', 'consultanta']) {
      assert.match(solutions, new RegExp('id="solution-' + slug + '"'));
      const backLink = texts.get('/servicii/' + slug).match(/<a\b[^>]*class="svc-back"[^>]*>/)?.[0];
      assert.ok(backLink?.includes('href="' + prefix + '/servicii#solution-' + slug + '"'), 'Back link must reach its visible category');
      assert.ok(solutions.includes('href="' + prefix + '/servicii/' + slug + '"'), 'Overview must link to its detail page');
    }
    assert.doesNotMatch(solutions, /role="tabpanel"|solution-tab-|servicii\/infrastructura/);
    const combined = texts.get('/servicii/ai');
    assert.match(combined, /id="integration-explainer-title"/);
    assert.ok(combined.indexOf('id="integration"') < combined.indexOf('id="integration-explainer-title"'), 'Show the actual offer before the explanation');
    assert.doesNotMatch(combined, /class="wtb-layout"|class="audience-list"/);
    assert.equal((combined.match(/class="integration-group"/g) || []).length, 6);
    assert.equal((combined.match(/class="flow-strip"/g) || []).length, 3);
    assert.match(combined, locale === 'en' ? /API integrations and automation/ : /Integrări API și automatizări/);
    assert.match(combined, locale === 'en' ? /AI assistants/ : /Asistenți AI/);
    for (const id of ['integration', 'customer-assistant', 'shop-assistant']) assert.ok(combined.includes('id="' + id + '"'));
    assert.equal((combined.match(/class="pkg-card rise"/g) || []).length, 3);
    assert.doesNotMatch(combined, /id="(?:document-processing|automation-agent|ai-assessment|ai-feature)"/);
    for (const project of ['flotapro', 'itcustom']) {
      assert.ok(combined.includes('href="' + prefix + '/portofoliu#proiect-' + project + '"'));
      assert.ok(texts.get('/portofoliu').includes('id="proiect-' + project + '"'));
    }
    for (const old of ['infrastructura', 'integrari-api', 'cloud-devops', 'ai-ml']) {
      const response = await fetch(base + prefix + '/servicii/' + old, { redirect: 'manual' });
      assert.equal(response.status, 308, 'Permanent redirect: ' + prefix + '/' + old);
      assert.equal(new URL(response.headers.get('location'), base).pathname, prefix + '/servicii/ai');
    }
    for (const route of ['/servicii', '/despre-noi', '']) {
      const html = texts.get(route);
      const ids = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]));
      for (const match of html.matchAll(/aria-controls="([^"]+)"/g)) assert.ok(ids.has(match[1]), 'Missing controlled panel: ' + match[1]);
    }
  }
  const sitemap = await fetch(base + '/sitemap.xml');
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  for (const route of ['/cookies', '/termeni', '/politica-confidentialitate']) assert.ok(xml.includes('https://acl-smartsoftware.ro/en' + route));
  assert.ok(xml.includes('https://acl-smartsoftware.ro/portofoliu'));
  assert.ok(xml.includes('https://acl-smartsoftware.ro/en/portofoliu'));
  assert.ok(!xml.includes('/servicii/infrastructura'));
  assert.ok(xml.includes('https://acl-smartsoftware.ro/servicii/ai'));
  assert.ok(xml.includes('https://acl-smartsoftware.ro/en/servicii/ai'));
  fs.mkdirSync('.remember/redesign-2026-10-10', { recursive: true });
  fs.writeFileSync('.remember/redesign-2026-10-10/http-verification.json', JSON.stringify({ at: new Date().toISOString(), reports, checks: 'HTTP and server-rendered content only; no browser or Playwright' }, null, 2));
  console.log('PASS: 20 RO/EN pages, three visible solution categories, merged API/AI page with three offers and real portfolio links, eight permanent redirects, localized back links, metadata and sitemap. Existing product and consultation prices, portfolio and process checks passed. No browser used.');
})().catch(error => { console.error(error.message.split('Input:')[0]); process.exitCode = 1; });
