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
            style={{ display: 'block' }}
          >
            <div className="meta">
              <span>Featured</span>
              <span className="dot" />
              <span>{featured.date}</span>
              <span className="dot" />
              <span>{featured.read}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '14px 0' }}>
              {featured.title}
            </h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: 16, maxWidth: '70ch', margin: 0 }}>
              {featured.excerpt}
            </p>
            <span className="read-more" style={{ marginTop: 20, display: 'inline-block' }}>Citește articolul →</span>
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
