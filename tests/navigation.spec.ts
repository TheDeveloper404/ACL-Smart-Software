import { test, expect } from '@playwright/test';

const NAV_LINKS = [
  { label: 'Servicii', href: '/servicii' },
  { label: 'Portofoliu', href: '/portofoliu' },
  { label: 'Echipă', href: '/echipa' },
  { label: 'Perspective', href: '/insights' },
  { label: 'Cariere', href: '/cariere' },
];

test.describe('Navigare desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo duce la homepage', async ({ page }) => {
    await page.click('nav a[aria-label*="acas"]');
    await expect(page).toHaveURL('/');
  });

  for (const link of NAV_LINKS) {
    test(`link "${link.label}" duce la ${link.href}`, async ({ page }) => {
      await page.click(`nav a[href="${link.href}"]`);
      await expect(page).toHaveURL(link.href);
      await expect(page.locator('h1')).toBeVisible();
    });
  }

  test('CTA "Începe un proiect" duce la #contact', async ({ page }) => {
    await page.click('a.nav-cta');
    await expect(page).toHaveURL('/#contact');
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.3 });
  });

  test('link activ este marcat pe pagina curentă', async ({ page }) => {
    await page.goto('/servicii');
    const activeLink = page.locator('nav a.is-active');
    await expect(activeLink).toHaveAttribute('href', '/servicii');
  });

  test('nav devine scrolled după scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 100));
    await expect(page.locator('nav.is-scrolled')).toBeVisible();
  });
});

test.describe('Navigare mobilă', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('meniu mobil se deschide și închide', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('.nav-mobile-toggle');
    await toggle.click();
    await expect(page.locator('.mobile-menu')).toBeVisible();
    await toggle.click();
    await expect(page.locator('.mobile-menu')).not.toBeVisible();
  });

  test('click link din meniu mobil închide meniul', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-mobile-toggle').click();
    await page.locator('.mobile-menu a[href="/servicii"]').click();
    await expect(page.locator('.mobile-menu')).not.toBeVisible();
    await expect(page).toHaveURL('/servicii');
  });
});
