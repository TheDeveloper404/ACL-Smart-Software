import Image from 'next/image';
import type { Case } from '@/types';

interface Props { cases: Case[]; }

export default function PortofoliuGrid({ cases }: Props) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cases">
          {cases.map((c) => (
            <article key={c.slug} className="case" data-slug={c.slug}>
              <div className="case-img">
                {c.image
                  ? <Image src={c.image} alt={c.title} fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  : <CaseVisual slug={c.slug} />}
                <span className="case-done-badge">✓ Realizat</span>
              </div>
              <div className="case-body">
                <div className="case-meta">
                  <span>{c.tag}</span>
                  <span className="dot" />
                  <span>{c.year}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="case-result">
                  {c.results.map((r) => (
                    <div key={r.l}>
                      <div className="r-num">{r.n}</div>
                      <div className="r-lbl">{r.l}</div>
                    </div>
                  ))}
                </div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="read-more" style={{ marginTop: 16, display: 'inline-block' }}>
                    Vezi site-ul live →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseVisual({ slug }: { slug: string }) {
  const a = 'var(--accent)';

  const visuals: Record<string, React.ReactNode> = {

    'flotapro': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* spreadsheet grid */}
        <rect x="60" y="30" width="360" height="220" rx="6" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"/>
        {/* header row */}
        <rect x="60" y="30" width="360" height="28" rx="6" fill="currentColor" opacity="0.07"/>
        <rect x="60" y="52" width="360" height="6" rx="0" fill="currentColor" opacity="0.07"/>
        {/* header cells */}
        {[0,1,2,3,4].map(i => (
          <rect key={`h${i}`} x={72 + i*70} y="40" width={[50,60,55,50,45][i]} height="8" rx="2" fill="currentColor" opacity="0.25"/>
        ))}
        {/* column dividers */}
        {[1,2,3,4].map(i => (
          <line key={`d${i}`} x1={60 + i*72} y1="30" x2={60 + i*72} y2="250" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
        ))}
        {/* data rows */}
        {[0,1,2,3,4].map(row => (
          <g key={`r${row}`}>
            <line x1="60" y1={68 + row*36} x2="420" y2={68 + row*36} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08"/>
            {[0,1,2,3,4].map(col => (
              <rect key={`c${col}`} x={72 + col*72} y={74 + row*36} width={[45,55,40,48,36][col]} height="6" rx="2"
                fill={row === 1 && col === 4 ? a : 'currentColor'}
                opacity={row === 1 && col === 4 ? 0.6 : 0.1}
              />
            ))}
          </g>
        ))}
        {/* accent highlight row */}
        <rect x="60" y="106" width="360" height="34" fill={a} opacity="0.06"/>
        <rect x="60" y="106" width="4" height="34" fill={a} opacity="0.7"/>
        {/* download arrow top right */}
        <g opacity="0.5">
          <rect x="380" y="262" width="36" height="14" rx="3" fill={a} opacity="0.8"/>
          <text x="384" y="273" fontFamily="monospace" fontSize="8" fill="#000" fontWeight="700">XLS ↓</text>
        </g>
        <text x="40" y="274" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">FLEET INVOICING SAAS</text>
      </svg>
    ),

    'dispatch-os': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* grid */}
        {[0,1,2,3,4,5].map(i => (
          <line key={`v${i}`} x1={80 + i*64} y1="40" x2={80 + i*64} y2="240" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
        ))}
        {[0,1,2,3].map(i => (
          <line key={`h${i}`} x1="80" y1={40 + i*66} x2="400" y2={40 + i*66} stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
        ))}
        {/* route lines */}
        <polyline points="112,200 176,120 240,150 304,90 368,130" stroke={a} strokeWidth="2" opacity="0.6" fill="none" strokeLinejoin="round"/>
        <polyline points="112,200 160,180 240,150 320,160 368,130" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" strokeLinejoin="round"/>
        {/* nodes */}
        {[[112,200],[176,120],[240,150],[304,90],[368,130]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill="var(--bg)" stroke={a} strokeWidth="1.5" opacity="0.8"/>
            <circle cx={x} cy={y} r="3" fill={a}/>
          </g>
        ))}
        {/* label */}
        <text x="40" y="260" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">DISPATCH / ROUTING</text>
      </svg>
    ),

    'retail-hub': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* product grid */}
        {[0,1,2,3,4].map(col =>
          [0,1,2].map(row => {
            const x = 60 + col * 76;
            const y = 40 + row * 70;
            const highlight = (col === 2 && row === 1) || (col === 4 && row === 0);
            return (
              <rect key={`${col}-${row}`} x={x} y={y} width="56" height="52" rx="4"
                fill={highlight ? a : 'currentColor'}
                opacity={highlight ? 0.15 : 0.05}
                stroke={highlight ? a : 'currentColor'}
                strokeWidth={highlight ? 1.5 : 0.5}
                strokeOpacity={highlight ? 0.6 : 0.15}
              />
            );
          })
        )}
        {/* bar chart bottom */}
        {[28,44,36,52,40,60,48].map((h, i) => (
          <rect key={i} x={60 + i * 52} y={260 - h} width="28" height={h} rx="2" fill={a} opacity={i === 5 ? 0.7 : 0.2}/>
        ))}
        <text x="40" y="274" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">B2B MARKETPLACE</text>
      </svg>
    ),

    'edu-platform': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* concentric arcs — progress */}
        {[100, 76, 52, 28].map((r, i) => (
          <circle key={i} cx="240" cy="160" r={r}
            stroke={i === 0 ? a : 'currentColor'}
            strokeWidth={i === 0 ? 2 : 1}
            opacity={i === 0 ? 0.5 : 0.1}
            strokeDasharray={i === 0 ? `${2*Math.PI*r*0.72} ${2*Math.PI*r*0.28}` : undefined}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 240 160)"
          />
        ))}
        {/* center dot */}
        <circle cx="240" cy="160" r="6" fill={a} opacity="0.8"/>
        {/* horizontal lines left */}
        {[80,100,120,140,160].map((y,i) => (
          <rect key={i} x="60" y={y} width={[80,60,90,50,70][i]} height="4" rx="2" fill="currentColor" opacity="0.12"/>
        ))}
        {/* horizontal lines right */}
        {[80,100,120,140,160].map((y,i) => (
          <rect key={i} x="360" y={y} width={[60,80,50,70,40][i]} height="4" rx="2" fill="currentColor" opacity="0.12"/>
        ))}
        <text x="40" y="260" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">LMS / AI FEEDBACK</text>
      </svg>
    ),

    'internal-tools': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* sidebar */}
        <rect x="40" y="30" width="72" height="220" rx="4" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="52" y={50 + i*38} width="48" height="20" rx="3"
            fill={i === 1 ? a : 'currentColor'}
            opacity={i === 1 ? 0.2 : 0.06}
            stroke={i === 1 ? a : 'none'}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        ))}
        {/* main panel — cards */}
        {[[130,30,160,80],[310,30,120,80],[130,126,340,60],[130,202,340,48]].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4"
            fill="currentColor" opacity="0.05"
            stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"/>
        ))}
        {/* accent bar in first card */}
        <rect x="130" y="30" width="160" height="4" rx="2" fill={a} opacity="0.5"/>
        <text x="40" y="274" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">INTERNAL SUITE</text>
      </svg>
    ),

    'field-ops': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* phone outline centered */}
        <rect x="180" y="20" width="120" height="240" rx="16" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"/>
        <rect x="190" y="34" width="100" height="200" rx="8" fill="currentColor" opacity="0.04"/>
        {/* screen lines */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="200" y={54 + i*32} width={[80,60,72,50,66][i]} height="6" rx="2" fill="currentColor" opacity="0.12"/>
        ))}
        {/* accent line */}
        <rect x="200" y="54" width="80" height="6" rx="2" fill={a} opacity="0.4"/>
        {/* signal arcs left */}
        {[30,50,70].map((r,i) => (
          <path key={i} d={`M ${140 - r/2} 140 A ${r} ${r} 0 0 1 ${140 + r/2} 140`}
            stroke={a} strokeWidth="1.5" opacity={0.15 + i*0.1} fill="none" strokeLinecap="round"/>
        ))}
        {/* signal arcs right */}
        {[30,50,70].map((r,i) => (
          <path key={i} d={`M ${340 - r/2} 140 A ${r} ${r} 0 0 0 ${340 + r/2} 140`}
            stroke={a} strokeWidth="1.5" opacity={0.15 + i*0.1} fill="none" strokeLinecap="round"/>
        ))}
        <circle cx="140" cy="140" r="5" fill={a} opacity="0.5"/>
        <circle cx="340" cy="140" r="5" fill={a} opacity="0.5"/>
        <text x="40" y="274" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">OFFLINE-FIRST MOBILE</text>
      </svg>
    ),

    'doc-copilot': (
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="case-svg">
        {/* document stack */}
        <rect x="60" y="50" width="160" height="200" rx="6" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"/>
        <rect x="68" y="42" width="160" height="200" rx="6" fill="currentColor" opacity="0.03" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
        {/* text lines on doc */}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x="76" y={72 + i*22} width={[120,90,110,70,100,80,60][i]} height="5" rx="2" fill="currentColor" opacity="0.15"/>
        ))}
        {/* highlight */}
        <rect x="76" y="116" width="110" height="14" rx="2" fill={a} opacity="0.15"/>
        <rect x="76" y="116" width="110" height="14" rx="2" fill="none" stroke={a} strokeWidth="1" opacity="0.4"/>
        {/* chat panel */}
        <rect x="260" y="50" width="180" height="200" rx="6" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"/>
        {/* chat bubbles */}
        <rect x="272" y="70" width="120" height="28" rx="4" fill="currentColor" opacity="0.08"/>
        <rect x="272" y="112" width="150" height="40" rx="4" fill={a} opacity="0.1" stroke={a} strokeWidth="1" strokeOpacity="0.3"/>
        <rect x="272" y="166" width="110" height="28" rx="4" fill="currentColor" opacity="0.08"/>
        <rect x="272" y="208" width="130" height="28" rx="4" fill={a} opacity="0.08" stroke={a} strokeWidth="1" strokeOpacity="0.2"/>
        <text x="40" y="274" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.3" letterSpacing="2">AI / RAG DOCUMENTS</text>
      </svg>
    ),
  };

  return visuals[slug] ?? (
    <div className="case-img-stripes" />
  );
}
