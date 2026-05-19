'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Post } from '@/types';

interface Props {
  posts: Post[];
}

export default function InsightsGrid({ posts }: Props) {
  const [filter, setFilter] = useState('toate');
  const categories = ['toate', ...Array.from(new Set(posts.map((p) => p.cat)))];
  const featured = posts[0];
  const filtered = filter === 'toate' ? posts : posts.filter((p) => p.cat === filter);
  const rest = filtered.filter((p) => p.slug !== featured.slug || filter !== 'toate');

  return (
    <section className="section">
      <div className="wrap">
        {filter === 'toate' && (
          <Link
            href={`/insights/${featured.slug}`}
            className="insight-card insight-card--featured"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="meta">
                <span>Featured</span>
                <span className="dot" />
                <span>{featured.date}</span>
                <span className="dot" />
                <span>{featured.read}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0 }}>
                {featured.title}
              </h2>
              <p style={{ color: 'var(--fg-muted)', fontSize: 16 }}>
                De când LLM-urile au devenit accesibile, e tentant să le bagi peste tot. Iată trei semnale clare că adăugarea unui LLM e value real — și trei contraindicații.
              </p>
              <span className="read-more" style={{ marginTop: 8 }}>Citește articolul →</span>
            </div>
            <div style={{ borderRadius: 12, position: 'relative', minHeight: 240, overflow: 'hidden', background: 'var(--bg-soft)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {featured.cat} · {featured.read}
              </div>
            </div>
          </Link>
        )}

        <div className="portfolio-filter" style={{ marginTop: 24 }}>
          {categories.map((c) => (
            <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="insights-grid">
          {rest.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="insight-card" style={{ textDecoration: 'none' }}>
              <div className="meta">
                <span>{p.cat}</span>
                <span className="dot" />
                <span>{p.read}</span>
              </div>
              <h3>{p.title}</h3>
              <div className="meta" style={{ marginTop: 'auto' }}><span>{p.date}</span></div>
              <span className="read-more">Citește →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
