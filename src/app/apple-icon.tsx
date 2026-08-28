import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0d0d0d',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontSize: 72,
          fontWeight: 700,
          color: '#aaff44',
          letterSpacing: '-0.04em',
        }}
      >
        {'>_'}
      </div>
    ),
    { ...size },
  );
}
