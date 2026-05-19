import { notFound } from 'next/navigation';
import Link from 'next/link';
import { POSTS } from '@/data';
import type { PostBlock } from '@/types';
import ContactStrip from '@/components/sections/ContactStrip';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `https://acl-smartsoftware.ro/insights/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
    },
  };
}

function renderBlock(block: PostBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.2vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', margin: '48px 0 16px' }}>{block.text}</h2>;
    case 'p':
      return <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--fg)', margin: '0 0 20px' }}>{block.text}</p>;
    case 'ul':
      return (
        <ul key={i} style={{ margin: '0 0 24px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {block.items?.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: 12, fontSize: 16, lineHeight: 1.7, color: 'var(--fg)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'blockquote':
      return (
        <blockquote key={i} style={{ margin: '32px 0', padding: '20px 24px', borderLeft: '3px solid var(--accent)', background: 'var(--bg-soft)', borderRadius: '0 8px 8px 0' }}>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', fontStyle: 'italic' }}>{block.text}</p>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header style={{ borderBottom: '1px solid var(--hairline)' }}>
          <div className="wrap" style={{ paddingTop: 80, paddingBottom: 64 }}>
            <Link href="/insights" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40 }}>
              ← Perspective
            </Link>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)', padding: '4px 10px', borderRadius: 999 }}>
                {post.cat}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.04em' }}>{post.date}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.04em' }}>{post.read} citire</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '22ch', margin: '0 0 24px' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'clamp(17px, 1.4vw, 20px)', color: 'var(--fg-muted)', maxWidth: '60ch', lineHeight: 1.6, margin: 0 }}>
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 96 }}>
          <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
            {post.body.map((block, i) => renderBlock(block, i))}
          </div>
        </div>
      </article>
      <ContactStrip />
    </>
  );
}
