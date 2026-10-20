import { test, expect } from '@playwright/test';
import { normalizeA11y } from '../src/lib/accessibility';
import { SERVICES } from '../src/data/services';
import { SERVICES_EN } from '../src/data/services.en';

test('preferințele de accesibilitate acceptă doar booleene valide', () => {
  for (const input of [null, 42, 'true', [], { reduceMotion: 'true', largeText: 1 }]) {
    expect(normalizeA11y(input)).toEqual({ reduceMotion: false, largeText: false, highContrast: false });
  }
  expect(normalizeA11y({ reduceMotion: true, highContrast: true, extra: 'ignored' })).toEqual({ reduceMotion: true, largeText: false, highContrast: true });
});

test('oferta RO/EN este coerentă, fără pachetul mobil și cu audit OWASP', () => {
  // Prețuri aprobate: SaaS €4.500, agent €2.000; pachetele noi „La ofertă”.
  // User 2026-10-20: RAG înlocuit, agentul mutat pe AI; „poti cere oferta la 1 si 2”.
  const prices = ['La ofertă', 'La ofertă', '€2.000', '€3.500', 'La ofertă', '€1.500', 'La ofertă', '€1.200', '€3.500', '€4.500', 'La ofertă', '€1.500', '€500 / lună', 'La ofertă'];
  expect(SERVICES.flatMap(s => s.packages.map(p => p.from))).toEqual(prices);
  expect(SERVICES_EN.flatMap(s => s.packages.map(p => p.from))).toEqual(prices.map(p => p.replace('.', ',').replace('lună', 'month').replace('La ofertă', 'On request')));
  expect(SERVICES.find(s => s.slug === 'produse')?.pricing.from).toBe('€1.200');
  expect(SERVICES_EN.find(s => s.slug === 'produse')?.pricing.from).toBe('€1,200');
  expect(SERVICES.map(s => s.slug)).toEqual(SERVICES_EN.map(s => s.slug));
  for (let i = 0; i < SERVICES.length; i++) {
    expect(SERVICES[i].packages.map(p => p.id)).toEqual(SERVICES_EN[i].packages.map(p => p.id));
    for (let j = 0; j < SERVICES[i].packages.length; j++) {
      expect(SERVICES[i].packages[j].from.replace(/[.,]/g, '')).toBe(SERVICES_EN[i].packages[j].from.replace(/[.,]/g, '').replace('month', 'lună').replace('On request', 'La ofertă'));
    }
  }
  expect(JSON.stringify(SERVICES)).not.toMatch(/app-mobile|React Native/);
  expect(JSON.stringify(SERVICES_EN)).not.toMatch(/app-mobile|React Native/);
  expect(SERVICES.find(s => s.slug === 'consultanta')?.packages[0].includes.join(' ')).toContain('OWASP ASVS');
});

for (const locale of ['ro', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  test(`homepage: proiecte reale și diagramă interactivă (${locale})`, async ({ page }) => {
    await page.goto(prefix || '/');
    await expect(page.locator('.featured-project')).toHaveCount(3);
    await expect(page.locator('.featured-project').first()).toHaveAttribute('href', prefix + '/portofoliu#proiect-detalia');
    const detalia = page.locator('.featured-project').first().getByRole('img', { name: locale === 'en' ? 'Community platform for construction execution details' : 'Platformă comunitară pentru detalii de execuție în construcții', exact: true });
    await expect(detalia).toHaveAttribute('src', /detalia-current/);
    await expect.poll(() => detalia.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const ai = page.getByRole('button', { name: locale === 'en' ? 'AI automation' : 'Automatizare AI', exact: true });
    await ai.click();
    await expect(ai).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#flow-description')).toContainText(locale === 'en' ? 'human verification' : 'validare umană');
  });

  test(`servicii: explorare și acces la audit (${locale})`, async ({ page }) => {
    await page.goto(`${prefix}/servicii`);
    const security = page.locator('.services-index-card').last();
    await page.locator('#solution-tab-consultanta').click();
    await expect(page.locator('#solution-tab-consultanta')).toHaveAttribute('aria-selected', 'true');
    await expect(security.locator('.solution-offer')).toHaveCount(3);
    await security.locator('.service-detail-link').click();
    await expect(page).toHaveURL(`${prefix}/servicii/consultanta`);
    const authorization = page.getByRole('button', { name: locale === 'en' ? 'Authorization' : 'Autorizare', exact: true });
    await authorization.click();
    await expect(authorization).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#audit-domain')).toContainText('IDOR');
    await expect(page.locator('#security-audit .pkg-price')).toContainText(locale === 'en' ? '€1,500' : '€1.500');
    await expect(page.locator('#security-audit .pkg-cta')).toHaveText(locale === 'en' ? 'Request a quote →' : 'Cere ofertă →');
    await page.locator('#security-audit .pkg-cta').click();
    await expect(page).toHaveURL(`${prefix || '/'}#contact`);
    await expect(page.locator('#f-name')).toBeInViewport();
  });

  test(`dark pe toate paginile și fără overflow (${locale})`, async ({ page }) => {
    for (const path of ['', '/servicii', '/servicii/produse', '/servicii/ai', '/servicii/infrastructura', '/servicii/consultanta', '/portofoliu', '/despre-noi', '/politica-confidentialitate', '/termeni', '/cookies']) {
      await page.goto(`${prefix}${path}` || '/');
      await expect(page.locator('body')).toHaveAttribute('data-mode', 'dark');
      await expect(page.locator('body')).toHaveAttribute('data-palette', 'lime');
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  });
}

test('contact: eroare de transport, păstrarea datelor și retry confirmat', async ({ page }) => {
  await page.goto('/');
  let calls = 0;
  await page.route('**/api/contact', async route => {
    calls++;
    await route.fulfill({ status: calls === 1 ? 502 : 200, contentType: 'application/json', body: JSON.stringify(calls === 1 ? { error: 'delivery-failed' } : { ok: true }) });
  });
  await page.getByLabel('Nume', { exact: true }).fill('Test Rebranding');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByLabel('Despre proiect', { exact: true }).fill('Un proiect de test, fără email real.');
  await page.getByRole('button', { name: 'Trimite mesaj →', exact: true }).click();
  await expect(page.locator('.contact-form').getByRole('alert')).toContainText('nu a putut fi trimis');
  await expect(page.locator('.form-success')).toHaveCount(0);
  await expect(page.locator('#f-msg')).toHaveValue('Un proiect de test, fără email real.');
  await page.getByRole('button', { name: 'Trimite mesaj →', exact: true }).click();
  await expect(page.locator('.form-success')).toContainText('Test');
});

test('animația respectă preferința sistemului și setarea persistentă', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.flow-trace').first()).toHaveCSS('animation-name', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Setări de accesibilitate', exact: true }).click();
  await page.getByRole('switch', { name: 'Fără animații', exact: true }).click();
  await page.reload();
  await expect(page.locator('body')).toHaveAttribute('data-reduce-motion', 'true');
  await expect(page.locator('.flow-trace').first()).toHaveCSS('animation-name', 'none');
});
