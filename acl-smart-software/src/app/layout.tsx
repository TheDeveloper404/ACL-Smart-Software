import type { Metadata } from 'next';
import { Space_Grotesk, Inter_Tight, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import ClientOnly from '@/components/layout/ClientOnly';
import ScrollReset from '@/components/ui/ScrollReset';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://acl-smartsoftware.ro'),
  title: {
    default: 'ACL Smart Software — Software custom, aplicații web & mobile, AI | Petroșani',
    template: '%s | ACL Smart Software',
  },
  description: 'Studio software independent din Petroșani, România. Dezvoltare software custom, aplicații web și mobile, AI & Machine Learning, Cloud & DevOps — pentru companii care vor rezultate reale.',
  keywords: 'software custom Romania, aplicatii web Petrosani, aplicatii mobile, AI machine learning, cloud devops, consultanta IT, dezvoltare software, ACL Smart Software',
  authors: [{ name: 'ACL Smart Software SRL', url: 'https://acl-smartsoftware.ro' }],
  creator: 'ACL Smart Software SRL',
  publisher: 'ACL Smart Software SRL',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: 'ACL Smart Software — Software custom, aplicații web & mobile, AI',
    description: 'Studio software independent din Petroșani. Construim produse digitale care cresc business-uri — software custom, web, mobile, AI, Cloud & DevOps.',
    url: 'https://acl-smartsoftware.ro',
    siteName: 'ACL Smart Software',
    type: 'website',
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACL Smart Software — Software custom & AI | Petroșani',
    description: 'Studio software independent din Petroșani. Software custom, aplicații web & mobile, AI, Cloud & DevOps.',
  },
  alternates: {
    canonical: 'https://acl-smartsoftware.ro',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ro"
      className={`${spaceGrotesk.className} ${interTight.className} ${jetbrainsMono.className} ${instrumentSerif.className}`}
    >
      <body suppressHydrationWarning data-palette="lime" data-mode="light" data-font="grotesk" data-density="comfortable">
        {/* Blocking script — runs before first paint, eliminates theme flash + fixes scroll restoration */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{history.scrollRestoration='manual';if(!window.location.hash)window.scrollTo(0,0);}catch(e){}try{var s=localStorage.getItem('acl-tweaks-v2');if(!s)return;var t=JSON.parse(s);var b=document.body;if(t.palette)b.dataset.palette=t.palette;if(t.mode)b.dataset.mode=t.mode;if(t.fontPair)b.dataset.font=t.fontPair;if(t.density)b.dataset.density=t.density;}catch(e){}})();` }} />
        <ThemeProvider>
          <ScrollReset />
          <a href="#main-content" className="skip-link">Sari la conținut</a>
          <Nav />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <ClientOnly />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
