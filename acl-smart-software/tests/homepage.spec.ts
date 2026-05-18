import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('titlul paginii este corect', async ({ page }) => {
    await expect(page).toHaveTitle(/ACL Smart Software/);
  });

  test('hero se randează cu titlu și CTA', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('.hero a[href="/#contact"]')).toBeVisible();
  });

  test('secțiunea Despre există', async ({ page }) => {
    await expect(page.locator('#despre')).toBeVisible();
  });

  test('secțiunea Servicii există cu carduri', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards.first()).toBeVisible();
    expect(await serviceCards.count()).toBeGreaterThan(0);
  });

  test('secțiunea Contact există cu formular', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('form.contact-form')).toBeVisible();
  });

  test('formular de contact are câmpuri obligatorii', async ({ page }) => {
    const nameInput = page.locator('#f-name');
    const emailInput = page.locator('#f-email');
    const msgInput = page.locator('#f-msg');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(msgInput).toBeVisible();
  });

  test('formular nu se trimite fără câmpuri completate', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.form-success')).not.toBeVisible();
  });

  test('formular arată mesaj de succes după completare', async ({ page }) => {
    await page.fill('#f-name', 'Ion Popescu');
    await page.fill('#f-email', 'ion@firma.ro');
    await page.fill('#f-msg', 'Vreau să construim ceva împreună.');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.form-success')).toBeVisible();
    await expect(page.locator('.form-success')).toContainText('Ion');
  });

  test('footer este vizibil cu date firmă', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('ACL');
    await expect(page.locator('footer')).toContainText('office@acl-smartsoftware.ro');
  });

  test('lang atribut este ro', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  });
});
