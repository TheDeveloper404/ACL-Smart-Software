import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'ACL Smart Software';

export default async function OGImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const en = locale === 'en';
  const tags = en ? ['AI integration', 'Automation', 'Websites & portals', 'SaaS products'] : ['Integrare AI', 'Automatizări', 'Site-uri și portaluri', 'Produse SaaS'];
  return new ImageResponse(
    <div style={{ width: 1200, height: 630, background: '#0b0c0c', color: '#f4f5f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '58px 68px', fontFamily: 'sans-serif', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 38, right: 40, display: 'flex', width: 300, height: 450, border: '1px solid #273320', borderRadius: 32, background: 'linear-gradient(135deg, #172012, #0b0c0c)', transform: 'rotate(-8deg)' }} />
      <div style={{ position: 'absolute', top: 70, right: 72, display: 'flex', width: 236, height: 388, border: '1px solid #425337', borderRadius: 24, background: '#131912', transform: 'rotate(5deg)', flexDirection: 'column', padding: 30, gap: 26, color: '#d0f66b', fontSize: 32 }}>
        <div style={{ display: 'flex' }}>01 / AI</div><div style={{ display: 'flex', color: '#57773b', fontSize: 20 }}>0101 1010</div><div style={{ display: 'flex', color: '#57773b', fontSize: 20 }}>1010 0101</div><div style={{ display: 'flex', fontSize: 54 }}>{'>_'}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', width: 52, height: 52, alignItems: 'center', justifyContent: 'center', border: '2px solid #d0f66b', borderRadius: 11, color: '#d0f66b', fontSize: 22, fontFamily: 'monospace' }}>{'>_'}</div>
        <span style={{ fontSize: 27, fontWeight: 700 }}>ACL Smart Software</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 820 }}>
        <div style={{ display: 'flex', fontSize: 17, color: '#a5aaa5', letterSpacing: 2 }}>{en ? 'SOFTWARE COMPANY · ROMANIA' : 'COMPANIE SOFTWARE · PETROȘANI'}</div>
        <div style={{ display: 'flex', fontSize: 74, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>{en ? 'AI. Automation.' : 'AI. Automatizări.'}</div>
        <div style={{ display: 'flex', fontSize: 62, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, color: '#d0f66b' }}>{en ? 'Software that works.' : 'Software care lucrează.'}</div>
        <div style={{ display: 'flex', fontSize: 21, color: '#a5aaa5', maxWidth: 760 }}>{en ? 'We build digital products and connect the way you work.' : 'Construim produse digitale și conectăm procesele tale.'}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a3026', paddingTop: 22 }}>
        <span style={{ fontSize: 18, color: '#a5aaa5' }}>acl-smartsoftware.ro</span>
        <div style={{ display: 'flex', gap: 10 }}>{tags.map(tag => <span key={tag} style={{ display: 'flex', border: '1px solid #3a4533', borderRadius: 24, padding: '7px 13px', fontSize: 14, color: '#d2d8d2' }}>{tag}</span>)}</div>
      </div>
    </div>, size,
  );
}
