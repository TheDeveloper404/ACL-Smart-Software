import { test, expect } from '@playwright/test';

const SLUGS = [
  'software-custom',
  'aplicatii-web',
  'aplicatii-mobile',
  'ai-ml',
  'cloud-devops',
  'integrari-api',
  'consultanta-it',
  'mentenanta-suport',
];

test.describe('Pagina Servicii', () => {
  test('se randează cu toate serviciile listate', async ({ page }) => {
    await page.goto('/servicii');
    await expect(page.locator('h1')).toBeVisible();
    const cards = page.locator('.services-index-card');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBe(SLUGS.length);
  });

  test('fiecare card are titlu și link', async ({ page }) => {
    await page.goto('/servicii');
    const cards = page.locator('.services-index-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('h3, h2')).toBeVisible();
    }
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

    test(`/servicii/${slug} — WhatWeBuild este interactiv`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      const tabs = page.locator('.wtb-tab');
      await expect(tabs.first()).toBeVisible();
      const count = await tabs.count();
      expect(count).toBeGreaterThan(1);
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveClass(/is-active/);
    });

    test(`/servicii/${slug} — FAQ accordion funcționează`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      const firstItem = page.locator('.faq-item').first();
      await expect(firstItem).toBeVisible();
      await firstItem.click();
      await expect(page.locator('.faq-item[data-open="true"] .faq-a').first()).toBeVisible();
    });

    test(`/servicii/${slug} — back link duce la /servicii`, async ({ page }) => {
      await page.goto(`/servicii/${slug}`);
      await page.click('a.svc-back');
      await expect(page).toHaveURL('/servicii');
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
