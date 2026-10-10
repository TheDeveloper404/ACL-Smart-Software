import PageHero from '@/components/sections/PageHero';
import ContactStrip from '@/components/sections/ContactStrip';
import LegalContent from '@/components/sections/LegalContent';
import { LEGAL } from '@/data/legal';
import { localeAlternates, socialMetadata } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const document = LEGAL[locale === 'en' ? 'en' : 'ro'].privacy;
  return { title: { absolute: document.title + ' — ACL Smart Software' }, description: document.sub, alternates: localeAlternates('/politica-confidentialitate', locale), ...socialMetadata(locale, document.title + ' — ACL Smart Software', document.sub, '/politica-confidentialitate') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const document = LEGAL[locale === 'en' ? 'en' : 'ro'].privacy;
  return <>
    <PageHero idx="LEGAL" title={document.title} sub={document.sub} centered />
    <LegalContent document={document} locale={locale} />
    <ContactStrip />
  </>;
}
