import { notFound } from 'next/navigation';
import Link from 'next/link';
import { POSTS } from '@/data';
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
    description: `${post.title} — articol din categoria ${post.cat} de la ACL Smart Software. Timp de citire: ${post.read}.`,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: `Articol din categoria ${post.cat}. Timp de citire: ${post.read}.`,
      url,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: 0 }}>
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
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '20ch' }}>
              {post.title}
            </h1>
          </div>
        </header>

        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 80 }}>
          <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
            <div style={{
              padding: '32px 36px',
              border: '1px solid var(--hairline)',
              borderRadius: 12,
              background: 'var(--bg-soft)',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 16 }}>
                Articol în pregătire
              </div>
              <p style={{ color: 'var(--fg-muted)', fontSize: 16, lineHeight: 1.6 }}>
                Conținutul complet al acestui articol va fi disponibil în curând.<br />
                Înscrie-te la newsletter sau revino pe <Link href="/insights" style={{ color: 'var(--accent)' }}>pagina Perspective</Link>.
              </p>
            </div>
          </div>
        </div>
      </article>
      <ContactStrip />
    </>
  );
}
