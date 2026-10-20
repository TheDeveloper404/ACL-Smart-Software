import type { Metadata } from 'next';
import { Space_Grotesk, Inter_Tight } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import '../rebrand.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ClientOnly from '@/components/layout/ClientOnly';
import RouteTransition from '@/components/ui/RouteTransition';
import ConsentAnalytics from '@/components/layout/ConsentAnalytics';
import { routing, type AppLocale } from '@/i18n/routing';
import { BASE, socialMetadata } from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const interTight = Inter_Tight({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const LAYOUT_METADATA: Record<AppLocale, Metadata> = {
  ro: {
    title: { default: 'ACL Smart Software — Dezvoltare software la comandă | Petroșani', template: '%s | ACL Smart Software' },
    description: 'Dezvoltare software la comandă din Petroșani: site-uri, portaluri, aplicații SaaS, integrări API, AI și automatizări pentru companii din toată România.',
    ...socialMetadata('ro', 'ACL Smart Software — AI, automatizări și produse digitale', 'Construim site-uri, portaluri și SaaS. Integrăm AI și automatizăm procesele companiei tale.'),
  },
  en: {
    title: { default: 'ACL Smart Software — AI, Automation and Digital Products | Romania', template: '%s | ACL Smart Software' },
    description: 'ACL Smart Software is a software development company in Romania. Websites, portals, SaaS products, AI integration and business automation.',
    ...socialMetadata('en', 'ACL Smart Software — AI, Automation and Digital Products', 'We build websites, portals and SaaS products. We integrate AI and automate your business workflows.'),
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  // Fără `alternates` aici, intenționat: canonical e specific fiecărei pagini (auto sau
  // /en, niciodată rădăcina site-ului) — fiecare pagină îl declară pe al ei, vezi
  // `localeAlternates()` din lib/seo.ts. Un canonical implicit la nivel de layout ar
  // "moșteni" greșit spre homepage orice pagină care uită să-l seteze.
  return {
    metadataBase: new URL(BASE),
    ...LAYOUT_METADATA[loc],
    authors: [{ name: 'ACL Smart Software SRL', url: BASE }],
    creator: 'ACL Smart Software SRL',
    publisher: 'ACL Smart Software SRL',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${interTight.variable}`}
    >
      <body suppressHydrationWarning data-palette="lime" data-mode="dark" data-font="grotesk" data-density="comfortable">
        {/* Fără `messages`: nu folosim cataloage de mesaje (useTranslations) — textul e pe
            componente ca `COPY.ro`/`COPY.en`. `messages={null}` oprește auto-inheritance-ul
            din next-intl 4, care altfel aruncă "No messages found" neavând un i18n/request.ts
            care să returneze `messages`. */}
        <NextIntlClientProvider locale={locale} messages={null}>
            <a href="#main-content" className="skip-link">{locale === 'en' ? 'Skip to content' : 'Sari la conținut'}</a>
            <Nav />
            <main id="main-content">
              <RouteTransition>{children}</RouteTransition>
            </main>
            <Footer />
            <ClientOnly />
            <ConsentAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
