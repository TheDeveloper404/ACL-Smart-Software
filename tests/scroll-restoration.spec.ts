import { test, expect } from '@playwright/test';

for (const locale of ['ro', 'en']) {
  const home = locale === 'en' ? '/en' : '/';
  const portfolio = locale === 'en' ? '/en/portofoliu' : '/portofoliu';
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    test.describe(`Back restores the source position — ${locale} — ${viewport.width}px`, () => {
      test.use({ viewport });
      for (const sourceHash of ['', '#proiecte']) {
        test(`home → portfolio → Back/Forward with source ${sourceHash || 'without hash'}`, async ({ page }) => {
          // User: „la back, să mă ducă exact în pagina de unde am plecat, nu mai sus sau jos”.
          await page.goto(home + sourceHash);
          await page.evaluate(() => document.fonts.ready);
          await expect.poll(() => page.evaluate(() => history.scrollRestoration)).toBe('auto');
          const card = page.locator('.featured-project').nth(2);
          await expect(card).toHaveAttribute('href', portfolio + '#proiect-meridian-transconstruct');
          await card.scrollIntoViewIfNeeded();
          const sourceY = await page.evaluate(() => window.scrollY);
          await card.click();
          await expect(page).toHaveURL(portfolio + '#proiect-meridian-transconstruct');
          await expect(page.locator('#proiect-meridian-transconstruct')).toBeInViewport({ ratio: 0.2 });
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(() => window.scrollBy({ top: 90, behavior: 'instant' }));
          const destinationY = await page.evaluate(() => window.scrollY);
          await page.goBack();
          await expect(page).toHaveURL(home + sourceHash);
          await expect.poll(() => page.evaluate(source => Math.abs(window.scrollY - source), sourceY)).toBeLessThanOrEqual(1);
          await page.goForward();
          await expect(page).toHaveURL(portfolio + '#proiect-meridian-transconstruct');
          await expect.poll(() => page.evaluate(destination => Math.abs(window.scrollY - destination), destinationY)).toBeLessThanOrEqual(1);
        });
      }

      test('separate visits to Home retain their own positions', async ({ page }) => {
        await page.goto(home);
        await page.evaluate(() => document.fonts.ready);
        const project = page.locator('.featured-project').first();
        await project.scrollIntoViewIfNeeded();
        const originalY = await page.evaluate(() => window.scrollY);
        await project.click();
        await expect(page).toHaveURL(portfolio + '#proiect-detalia');
        await page.locator('nav a.brand').click();
        await expect(page).toHaveURL(home);
        await page.evaluate(() => window.scrollTo({ top: 240, behavior: 'instant' }));
        await page.goBack();
        await expect(page).toHaveURL(portfolio + '#proiect-detalia');
        await page.goBack();
        await expect(page).toHaveURL(home);
        await expect.poll(() => page.evaluate(original => Math.abs(window.scrollY - original), originalY)).toBeLessThanOrEqual(1);
      });
    });
  }
}
