import { test, expect } from '@playwright/test';

test.describe('Theme Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('butonul de personalizare este vizibil', async ({ page }) => {
    await expect(page.locator('.theme-panel-toggle')).toBeVisible();
  });

  test('panoul se deschide și închide', async ({ page }) => {
    await page.locator('.theme-panel-toggle').click();
    await expect(page.locator('.theme-panel')).toBeVisible();
    await page.locator('.theme-panel button[aria-label="Închide"]').click();
    await expect(page.locator('.theme-panel')).not.toBeVisible();
  });

  test('schimbarea paletei la orange modifică data-palette', async ({ page }) => {
    await page.locator('.theme-panel-toggle').click();
    await page.locator('.palette-swatch[title="Orange"]').click();
    await expect(page.locator('body')).toHaveAttribute('data-palette', 'orange');
  });

  test('toggle dark mode modifică data-mode', async ({ page }) => {
    await page.locator('.theme-panel-toggle').click();
    await page.locator('.theme-radio', { hasText: 'Întunecat' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-mode', 'dark');
  });

  test('toggle light mode modifică data-mode', async ({ page }) => {
    await page.locator('.theme-panel-toggle').click();
    await page.locator('.theme-radio', { hasText: 'Luminos' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-mode', 'light');
  });

  test('toggle reduce motion funcționează', async ({ page }) => {
    await page.locator('.theme-panel-toggle').click();
    await page.locator('.theme-panel').waitFor({ state: 'visible' });
    const toggle = page.locator('.a11y-toggle').first();
    await toggle.click();
    await expect(toggle).toHaveClass(/is-on/);
    await expect(page.locator('body')).toHaveAttribute('data-reduce-motion', 'true');
  });
});

test.describe('Accesibilitate', () => {
  test('skip-to-content link există și este focusabil', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test('toate imaginile au atribut alt', async ({ page }) => {
    await page.goto('/');
    const imgs = page.locator('img');
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const alt = await imgs.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('formular de contact are labels asociate', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('label[for="f-name"]')).toBeVisible();
    await expect(page.locator('label[for="f-email"]')).toBeVisible();
    await expect(page.locator('label[for="f-msg"]')).toBeVisible();
  });

  test('nav are aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label]')).toBeVisible();
  });

  test('WhatsApp button are aria-label', async ({ page }) => {
    await page.goto('/');
    const waBtn = page.locator('a.wa-btn');
    await expect(waBtn).toHaveAttribute('aria-label');
    await expect(waBtn).toHaveAttribute('rel', /noopener/);
  });
});

test.describe('SEO & Meta', () => {
  test('homepage are title și description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ACL Smart Software/);
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.+/);
  });

  test('pagina servicii are title specific', async ({ page }) => {
    await page.goto('/servicii/software-custom');
    await expect(page).toHaveTitle(/Software.*ACL/i);
  });

  test('robots.txt este accesibil', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
    const body = await res?.text();
    expect(body?.toLowerCase()).toContain('user-agent');
  });

  test('sitemap.xml este accesibil', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBe(200);
    const body = await res?.text();
    expect(body).toContain('<urlset');
  });
});
