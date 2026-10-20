import { test, expect } from '@playwright/test';

const SLUGS = [
  'produse',
  'ai',
  'consultanta',
];

test.describe('Pagina Soluții', () => {
  test('se randează cu toate serviciile listate', async ({ page }) => {
    await page.goto('/servicii');
    await expect(page.locator('h1')).toBeVisible();
    const cards = page.locator('.services-index-card');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBe(SLUGS.length);
  });

  test('toate categoriile sunt vizibile si au link spre detalii', async ({ page }) => {
    await page.goto('/servicii');
    for (const slug of SLUGS) {
      const card = page.locator('#solution-' + slug);
      await expect(card).toBeVisible();
      await expect(card.getByRole('heading', { level: 2 })).toBeVisible();
      await expect(card.locator('.service-detail-link')).toHaveAttribute('href', '/servicii/' + slug);
    }
    await expect(page.locator('.solution-tab')).toHaveCount(0);
  });
});

test.describe('Pagini detaliu servicii', () => {
  for (const slug of SLUGS) {
    test(`/servicii/${slug} se randează corect`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      await expect(page).not.toHaveURL('/404');
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.svc-pricing-card')).toBeVisible();
    });

    // User: "poti face si cele 2 pagini neatinse" — exemple concrete (fluxuri) in locul textului general.
    test(`/servicii/${slug} — arata trei fluxuri concrete`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      await expect(page.locator('.integration-example .flow-strip')).toHaveCount(3);
      await expect(page.locator('.integration-example .flow-strip').first().locator('li')).toHaveCount(3);
      await expect(page.locator('.wtb-layout, .audience-list')).toHaveCount(0);
    });

    test(`/servicii/${slug} — FAQ accordion funcționează`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      const firstItem = page.locator('.faq-item').first();
      await expect(firstItem).toBeVisible();
      await firstItem.getByRole('button').click();
      await expect(page.locator('.faq-item[data-open="true"] .faq-a').first()).toBeVisible();
    });

    test(`/servicii/${slug} — back link duce la /servicii`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      await page.click('a.svc-back');
      await expect(page).toHaveURL('/servicii#solution-' + slug);
      await expect(page.locator('#solution-' + slug)).toBeVisible();
    });
  }
});

test.describe('Slug invalid', () => {
  test('/servicii/inexistent returnează 404', async ({ page }) => {
    const response = await page.goto('/servicii/inexistent');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('nu există');
  });
});

for (const prefix of ['', '/en']) {
  // User: "eventual uneste cele doua pagini intr-una, chiar daca sunt mai putine servicii, important e sa fie ce putem livra. Dar cumva sa se deosebeasca ce ineamna integrare API si AI"
  test('pagina comuna explica API si AI si duce spre servicii si portofoliu ' + (prefix || 'ro'), async ({ page }) => {
    await page.goto(prefix + '/servicii');
    await expect(page.locator('.services-index-card')).toHaveCount(3);
    await page.locator('#solution-ai .service-detail-link').click();
    await expect(page).toHaveURL(prefix + '/servicii/ai');
    await expect(page.locator('h1')).toContainText(prefix ? 'API integrations' : 'Integrări API');
    await expect(page.locator('.integration-group')).toHaveCount(6);
    await expect(page.locator('.integration-example .flow-strip')).toHaveCount(3);
    await expect(page.locator('.svc-offer-group').first().locator('.pkg-card')).toHaveCount(1);
    await expect(page.locator('.svc-offer-group').nth(1).locator('.pkg-card')).toHaveCount(2);
    for (const id of ['integration', 'customer-assistant', 'shop-assistant']) {
      await expect(page.locator('#' + id)).toBeVisible();
    }
    await expect(page.locator('.integration-projects a').first()).toHaveAttribute('href', prefix + '/portofoliu#proiect-flotapro');
    await page.locator('.svc-back').click();
    await expect(page).toHaveURL(prefix + '/servicii#solution-ai');
    await expect(page.locator('#solution-ai')).toBeVisible();
  });

  test('vechea pagina de integrari redirectioneaza permanent ' + (prefix || 'ro'), async ({ request }) => {
    const response = await request.get(prefix + '/servicii/infrastructura', { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(prefix + '/servicii/ai');
  });
}

for (const prefix of ['', '/en']) {
  // User: "serviciile nu sunt clare"; "https://diffco.us/services/".
  test('lista de servicii duce direct la oferta selectata ' + (prefix || 'ro'), async ({ page }) => {
    await page.goto(prefix + '/servicii');
    await page.locator('#solution-produse a[href$="#website"]').click();
    await expect(page).toHaveURL(prefix + '/servicii/produse#website');
    await expect(page.locator('#website')).toBeVisible();
    await expect(page.locator('#website .pkg-price')).toContainText(prefix ? '€1,200' : '€1.200');
    // User: "in footer trebuie iconitele de la cele doua pagini linkedin si instagram".
    await expect(page.locator('footer').getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/acl_smartsoftware/');
    await expect(page.locator('footer').getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/company/acl-smartsoftware/');
  });
}
