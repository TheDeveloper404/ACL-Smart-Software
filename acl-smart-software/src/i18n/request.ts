import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// Nu folosim cataloage de mesaje JSON — textul rămâne pe componente, ca și în RO,
// doar că fiecare componentă primește acum ce variantă de copy să afișeze.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return { locale };
});
