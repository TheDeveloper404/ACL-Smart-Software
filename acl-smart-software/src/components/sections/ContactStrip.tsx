import Link from 'next/link';

export default function ContactStrip() {
  return (
    <section className="contact-strip" aria-label="Contact CTA">
      <div className="wrap contact-strip-inner">
        <div>
          <div className="eyebrow">Hai să vorbim</div>
          <h2>
            Ai un proiect <em>în cap</em>?<br />
            Răspundem în 24h.
          </h2>
        </div>
        <div className="contact-strip-actions">
          <Link href="/#contact" className="btn btn-primary btn-cta">
            Începe un proiect <span className="arrow">→</span>
          </Link>
          <a href="mailto:office@acl-smartsoftware.ro" className="btn btn-ghost">
            office@acl-smartsoftware.ro
          </a>
        </div>
      </div>
    </section>
  );
}
