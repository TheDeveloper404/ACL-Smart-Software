import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude api, fișiere Next interne și orice cale cu extensie (sitemap.xml, robots.txt,
  // og-image.png etc.) — acestea trebuie să rămână accesibile fără prefix de locale.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
