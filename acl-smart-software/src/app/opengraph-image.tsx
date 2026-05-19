import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: '#0d0d0d',
              border: '2px solid #aaff44',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: '#aaff44',
              letterSpacing: '-1px',
            }}
          >
            {'>_'}
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em' }}>
            ACL Smart Software
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 13, color: '#aaff44', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Studio software independent · Petroșani, România
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontFamily: 'sans-serif',
              maxWidth: 900,
            }}
          >
            Software custom, aplicații web & mobile, AI.
          </div>
          <div style={{ fontSize: 22, color: '#999999', marginTop: 8, fontFamily: 'sans-serif' }}>
            Construim produse care cresc business-uri — nu doar livrabile pe deadline.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, color: '#555555', letterSpacing: '0.04em' }}>
            acl-smartsoftware.ro
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Software Custom', 'Web & Mobile', 'AI / ML', 'Cloud & DevOps'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '6px 14px',
                  border: '1px solid #333',
                  borderRadius: 999,
                  fontSize: 13,
                  color: '#777',
                  fontFamily: 'monospace',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
