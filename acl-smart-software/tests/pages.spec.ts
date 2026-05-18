import { test, expect } from '@playwright/test';

test.describe('Pagina Portofoliu', () => {
  test('se randează cu proiecte', async ({ page }) => {
    await page.goto('/portofoliu');
    await expect(page.locator('h1')).toBeVisible();
    const cards = page.locator('article.case');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBe(6);
  });

  test('fiecare card are titlu și rezultate', async ({ page }) => {
    await page.goto('/portofoliu');
    const cards = page.locator('article.case');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('h3')).toBeVisible();
      await expect(cards.nth(i).locator('.case-result')).toBeVisible();
    }
  });

  test('badge-ul "Realizat" apare pe fiecare card', async ({ page }) => {
    await page.goto('/portofoliu');
    const badges = page.locator('.case-done-badge');
    expect(await badges.count()).toBe(6);
  });
});

test.describe('Pagina Echipă', () => {
  test('se randează cu CEO card', async ({ page }) => {
    await page.goto('/echipa');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.ceo-editorial')).toBeVisible();
    await expect(page.locator('.ceo-heading')).toContainText('ACL');
  });

  test('lista echipei este vizibilă', async ({ page }) => {
    await page.goto('/echipa');
    const rows = page.locator('.team-list-row');
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('link cariere din echipă funcționează', async ({ page }) => {
    await page.goto('/echipa');
    await page.getByRole('link', { name: /Roluri deschise/i }).click();
    await expect(page).toHaveURL('/cariere');
  });
});

test.describe('Pagina Cariere', () => {
  test('se randează cu roluri', async ({ page }) => {
    await page.goto('/cariere');
    await expect(page.locator('h1')).toBeVisible();
    const roles = page.locator('a.role-row');
    await expect(roles.first()).toBeVisible();
    expect(await roles.count()).toBeGreaterThan(0);
  });

  test('fiecare rol are link mailto', async ({ page }) => {
    await page.goto('/cariere');
    const roles = page.locator('a.role-row');
    const count = await roles.count();
    for (let i = 0; i < count; i++) {
      const href = await roles.nth(i).getAttribute('href');
      expect(href).toMatch(/^mailto:/);
    }
  });

  test('beneficii sunt vizibile', async ({ page }) => {
    await page.goto('/cariere');
    await expect(page.getByText('Salariu transparent')).toBeVisible();
    await expect(page.getByText('Remote sau hybrid')).toBeVisible();
  });
});

test.describe('Pagina Insights', () => {
  test('se randează cu articole', async ({ page }) => {
    await page.goto('/insights');
    await expect(page.locator('h1')).toBeVisible();
    const cards = page.locator('article.insight-card, a.insight-card');
    await expect(cards.first()).toBeVisible();
  });

  test('filtrele de categorie funcționează', async ({ page }) => {
    await page.goto('/insights');
    const filterBtns = page.locator('.portfolio-filter button');
    await expect(filterBtns.first()).toBeVisible();
    expect(await filterBtns.count()).toBeGreaterThan(1);
    await filterBtns.nth(1).click();
    await expect(filterBtns.nth(1)).toHaveAttribute('aria-pressed', 'true');
  });

  test('click pe articol duce la pagina de detaliu', async ({ page }) => {
    await page.goto('/insights');
    const firstCard = page.locator('a.insight-card').first();
    const href = await firstCard.getAttribute('href');
    await firstCard.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Pagini legale', () => {
  for (const path of ['/politica-confidentialitate', '/termeni', '/cookies']) {
    test(`${path} se randează`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).not.toBeEmpty();
    });
  }
});

test.describe('Pagina 404', () => {
  test('ruta invalidă arată pagina 404', async ({ page }) => {
    const res = await page.goto('/pagina-care-nu-exista-deloc');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('nu există');
  });

  test('link înapoi acasă funcționează din 404', async ({ page }) => {
    await page.goto('/pagina-care-nu-exista-deloc');
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });
});
