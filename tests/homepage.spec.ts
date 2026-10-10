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

  test('prezentarea firmei este în Despre noi, nu duplicată pe Acasă', async ({ page }) => {
    await expect(page.locator('#despre')).toHaveCount(0);
    await expect(page.locator('.featured-project')).toHaveCount(3);
    await expect(page.locator('.journey-tab')).toHaveCount(6);
  });

  test('secțiunea Servicii există cu carduri', async ({ page }) => {
    const serviceCards = page.locator('.solution-preview');
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
    await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }));
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


// Written for manual-authorised future runs; not executed in this iteration.
test.describe('Proces bento RO/EN', () => {
  for (const locale of ['ro', 'en']) {
    test('cele șase etape afișează livrabile și implicarea clientului (' + locale + ')', async ({ page }) => {
      await page.goto(locale === 'en' ? '/en' : '/');
      const tabs = page.locator('.journey-tab');
      await expect(tabs).toHaveCount(6);
      for (let index = 0; index < 6; index++) {
        await tabs.nth(index).click();
        const panel = page.locator('.journey-panel:visible');
        await expect(panel).toHaveCount(1);
        await expect(panel).toHaveAttribute('id', 'journey-panel-' + String(index + 1).padStart(2, '0'));
        await expect(panel.locator('.journey-client')).toContainText(locale === 'en' ? 'Your involvement' : 'Implicarea ta');
        await expect(panel.locator('.journey-checkpoint')).toContainText(locale === 'en' ? 'What we check' : 'Ce verificăm');
        const actualCount = await panel.locator('.journey-deliver li').count();
        await expect(panel.locator('.journey-deliver-count')).toHaveText(String(actualCount));
      }
      await tabs.last().focus();
      await page.keyboard.press('ArrowRight');
      await expect(tabs.first()).toBeFocused();
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('End');
      await expect(tabs.last()).toBeFocused();
      await page.keyboard.press('Home');
      await expect(tabs.first()).toBeFocused();
      await expect(page.locator('.journey-stage-count')).toHaveText(String(await tabs.count()));
      await expect(page.locator('.journey-demo-frequency')).toHaveText('~2');
      await expect(page.locator('.journey-support-duration')).toHaveText('1');
    });
  }
});


test.describe('Hero și footer mobil RO/EN', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  for (const locale of ['ro', 'en']) {
    test('traseele rămân în canvas, iar footerul este centrat (' + locale + ')', async ({ page }) => {
      await page.goto(locale === 'en' ? '/en' : '/');
      await page.evaluate(() => document.fonts.ready);
      const canvas = page.locator('.flow-canvas');
      const nodes = page.locator('.flow-node');
      const canvasBox = await canvas.boundingBox();
      expect(canvasBox).not.toBeNull();
      for (let index = 0; index < 6; index++) {
        const box = await nodes.nth(index).boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(canvasBox!.x - 1);
        expect(box!.x + box!.width).toBeLessThanOrEqual(canvasBox!.x + canvasBox!.width + 1);
        expect(box!.y + box!.height).toBeLessThanOrEqual(canvasBox!.y + canvasBox!.height + 1);
        await nodes.nth(index).click();
        await expect(nodes.nth(index)).toHaveAttribute('aria-pressed', 'true');
      }
      await expect(page.locator('.flow-connections-mobile')).toBeVisible();
      await expect(page.locator('.home-bento-fact--accent')).toHaveCount(0);
      const brand = await page.locator('.footer-brand').boundingBox();
      const columns = page.locator('.footer-col');
      const solutions = await columns.nth(0).boundingBox();
      const company = await columns.nth(1).boundingBox();
      const contact = await page.locator('.footer-contact').boundingBox();
      expect(solutions!.y).toBeGreaterThan(brand!.y);
      expect(Math.abs(solutions!.y - company!.y)).toBeLessThanOrEqual(1);
      expect(contact!.y).toBeGreaterThan(solutions!.y + solutions!.height);
      await expect(page.locator('.footer-grid')).toHaveCSS('text-align', 'center');
      await expect(page.locator('.footer-bottom')).toHaveCSS('text-align', 'center');
    });
  }
});
