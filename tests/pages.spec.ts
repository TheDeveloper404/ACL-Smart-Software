import { test, expect } from '@playwright/test';

test.describe('Portofoliu și proiectele din Acasă', () => {
  for (const locale of ['ro', 'en']) {
    const prefix = locale === 'en' ? '/en' : '';
    test(`trei proiecte bento duc către detaliile din Portofoliu (${locale})`, async ({ page }) => {
      await page.goto(prefix || '/');
      const highlights = page.locator('.featured-project');
      await expect(highlights).toHaveCount(3);
      await expect(highlights.first()).toHaveAttribute('href', prefix + '/portofoliu#proiect-detalia');
      await expect(highlights.nth(1)).toHaveAttribute('href', prefix + '/portofoliu#proiect-seminar');
      await expect(highlights.nth(2)).toHaveAttribute('href', prefix + '/portofoliu#proiect-meridian-transconstruct');
      await expect(page.locator('.bento-project-image')).toHaveCount(3);
      const functions = page.locator('.bento-project-detail');
      await expect(functions).toHaveCount(3);
      await expect(functions.first()).toContainText(locale === 'en' ? '3 roles' : '3 roluri');
      for (let index = 0; index < 3; index++) await expect(functions.nth(index)).toHaveAttribute('href', await highlights.nth(index).getAttribute('href') as string);
      const explanations = page.locator('.home-bento-fact');
      await expect(explanations).toHaveCount(3);
      await expect(explanations.nth(2)).toHaveAttribute('href', prefix + '/portofoliu#proiect-meridian-transconstruct');
      await expect(explanations.nth(2)).toContainText(locale === 'en' ? 'Real projects. Direct contact.' : 'Lucrări reale. Contact direct.');
      await expect(page.locator('.device-laptop, .device-tablet, .device-phone')).toHaveCount(0);
      await highlights.nth(1).click();
      await expect(page).toHaveURL(prefix + '/portofoliu#proiect-seminar');
      await expect(page.locator('#proiect-seminar')).toBeInViewport({ ratio: 0.2 });
      await expect(page.locator('#proiect-seminar .case-result')).toHaveCount(0);
      await expect(page.locator('#proiect-seminar a[target="_blank"]')).toHaveAttribute('href', 'https://seminarulteologicfiladelfia.ro/');
    });

    test(`toate proiectele sunt prezentate complet pe pagina proprie (${locale})`, async ({ page }) => {
      await page.goto(prefix + '/portofoliu');
      await expect(page).toHaveURL(prefix + '/portofoliu');
      const cards = page.locator('article.case');
      await expect(cards).toHaveCount(6);
      for (const [index, slug] of ['meridian-transconstruct', 'detalia', 'seminarul-teologic-filadelfia', 'flotapro', 'filadelfia', 'itcustom'].entries()) {
        await expect(cards.nth(index)).toHaveAttribute('data-slug', slug);
        await expect(cards.nth(index).locator('h3')).toBeVisible();
        await expect(cards.nth(index).locator('p')).toBeVisible();
        await expect(cards.nth(index).getByRole('link')).toHaveAttribute('target', '_blank');
        await expect(cards.nth(index).getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
      }
      await expect(page.locator('.case-done-badge')).toHaveCount(6);
    });
  }
});

test.describe('Despre noi și rute istorice', () => {
  test('fără poza fondatorului; cele 4 recenzii reale, inclusiv Meridian', async ({ page }) => {
    await page.goto('/despre-noi');
    await expect(page.getByRole('img', { name: 'Liviu Băncilă', exact: true })).toHaveCount(0);
    await expect(page.locator('.review-selector')).toHaveCount(4);
    const meridian = page.getByRole('tab', { name: /Meridian Transconstruct/ });
    await meridian.click();
    await expect(meridian).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.review-spotlight:visible')).toContainText('exact ce aveam nevoie pentru o firmă de construcții');
  });

  test('colaborarea este explicată clar, iar recenziile se selectează cu tastatura', async ({ page }) => {
    await page.goto('/despre-noi');
    await expect(page.locator('.collaboration-item')).toHaveCount(3);
    await expect(page.locator('.collaboration-item').first()).toContainText('Știi ce construim și cât costă');
    await expect(page.locator('.how-cards, .why-bento, .projects-strip')).toHaveCount(0);
    const clients = page.locator('.review-selector');
    await clients.first().focus();
    await page.keyboard.press('ArrowDown');
    await expect(clients.nth(1)).toBeFocused();
    await expect(clients.nth(1)).toHaveAttribute('aria-selected', 'true');
  });
  for (const path of ['/echipa', '/cariere', '/insights']) {
    test(path + ' redirecționează spre homepage', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL('/');
      await expect(page.locator('.hero h1')).toBeVisible();
    });
  }
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
    await page.locator('main a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });
});
