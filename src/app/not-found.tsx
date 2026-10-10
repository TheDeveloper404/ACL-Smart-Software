import { getLocale } from 'next-intl/server';
import './globals.css';
import './rebrand.css';

export default async function GlobalNotFound() {
  const locale = await getLocale();
  const en = locale === 'en';
  return <html lang={locale}><body data-palette="lime" data-mode="dark"><main className="not-found-page">
    <a href={en ? '/en' : '/'} className="brand" aria-label="ACL Smart Software"><div className="brand-mark" aria-hidden="true">&gt;_</div><div className="brand-name"><span className="brand-acl">ACL</span> <span className="sub">Smart Software</span></div></a>
    <p className="eyebrow">404</p><h1>{en ? 'This page doesn’t exist.' : 'Pagina nu există.'}</h1><p>{en ? 'The link may have changed. You can return to our projects and services.' : 'Linkul poate fi schimbat. Te poți întoarce la proiectele și serviciile noastre.'}</p><a className="btn btn-primary" href={en ? '/en' : '/'}>{en ? 'Back home' : 'Înapoi acasă'} <span aria-hidden="true">→</span></a>
  </main></body></html>;
}
