import type { Metadata } from 'next';
import { Space_Grotesk, Inter_Tight, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import ClientOnly from '@/components/layout/ClientOnly';
import ScrollReset from '@/components/ui/ScrollReset';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing, type AppLocale } from '@/i18n/routing';
import { BASE } from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const LAYOUT_METADATA: Record<AppLocale, Metadata> = {
  ro: {
    title: {
      default: 'ACL Smart Software — Software custom, aplicații web & mobile, AI | Petroșani',
      template: '%s | ACL Smart Software',
    },
    description: 'Firmă de software din Petroșani: dezvoltare software la comandă, aplicații web și mobile, AI & Machine Learning, Cloud & DevOps pentru companii din România.',
    openGraph: {
      title: 'ACL Smart Software — Software custom, aplicații web & mobile, AI',
      description: 'Firmă de software din Petroșani. Construim software la comandă, aplicații web și mobile, AI, Cloud & DevOps.',
      url: BASE,
      siteName: 'ACL Smart Software',
      type: 'website',
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ACL Smart Software — Software custom & AI | Petroșani',
      description: 'Firmă de software din Petroșani. Software la comandă, aplicații web & mobile, AI, Cloud & DevOps.',
    },
  },
  en: {
    title: {
      default: 'ACL Smart Software — Custom Software, Web & Mobile Apps, AI | Romania',
      template: '%s | ACL Smart Software',
    },
    description: 'Software company based in Romania: custom software development, web and mobile apps, AI & Machine Learning, Cloud & DevOps for businesses worldwide.',
    openGraph: {
      title: 'ACL Smart Software — Custom Software, Web & Mobile Apps, AI',
      description: 'Software company based in Romania. We build custom software, web and mobile apps, AI, Cloud & DevOps.',
      url: `${BASE}/en`,
      siteName: 'ACL Smart Software',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ACL Smart Software — Custom Software & AI | Romania',
      description: 'Software company based in Romania. Custom software, web & mobile apps, AI, Cloud & DevOps.',
    },
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
      className={`${spaceGrotesk.className} ${interTight.className} ${jetbrainsMono.className} ${instrumentSerif.className}`}
    >
      {/* Atributele de temă rămân aici ca valori implicite corecte pentru SSR / primul paint.
          ATENȚIE: fiind randate de React pe <body>, ele sunt REAPLICATE la orice re-randare de
          layout — inclusiv la schimbarea de limbă, care schimbă segmentul `[locale]`. De aceea
          ThemeProvider le restaurează într-un `useLayoutEffect` (sincron, înainte de paint) și
          nu într-un `useEffect` pasiv: altfel un utilizator pe tema dark vedea un flash alb de
          ~25ms la fiecare switch RO↔EN. */}
      <body suppressHydrationWarning data-palette="lime" data-mode="light" data-font="grotesk" data-density="comfortable">
        {/* Blocking script — runs before first paint, eliminates theme flash + fixes scroll restoration */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{history.scrollRestoration='manual';if(!window.location.hash)window.scrollTo(0,0);}catch(e){}try{var s=localStorage.getItem('acl-tweaks-v2');if(!s)return;var t=JSON.parse(s);var b=document.body;if(t.palette)b.dataset.palette=t.palette;if(t.mode)b.dataset.mode=t.mode;if(t.fontPair)b.dataset.font=t.fontPair;if(t.density)b.dataset.density=t.density;}catch(e){}})();` }} />
        {/* Fără `messages`: nu folosim cataloage de mesaje (useTranslations) — textul e pe
            componente ca `COPY.ro`/`COPY.en`. `messages={null}` oprește auto-inheritance-ul
            din next-intl 4, care altfel aruncă "No messages found" neavând un i18n/request.ts
            care să returneze `messages`. */}
        <NextIntlClientProvider locale={locale} messages={null}>
          <ThemeProvider>
            <ScrollReset />
            <a href="#main-content" className="skip-link">{locale === 'en' ? 'Skip to content' : 'Sari la conținut'}</a>
            <Nav />
            <main id="main-content">
              {children}
            </main>
            <Footer />
            <ClientOnly />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
