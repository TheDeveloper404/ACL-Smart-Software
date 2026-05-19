'use client';

import { useState, type FormEvent } from 'react';

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  budget: string;
  _hp: string;
};

const EMPTY: FormData = { name: '', email: '', company: '', message: '', budget: '', _hp: '' };
const BUDGETS = ['< 10k €', '10–30k €', '30–80k €', '80k+ €', 'Discutăm'];

export default function Contact() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {}
    setSent(true);
  }

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">06 / CONTACT</div>
            <div className="eyebrow">Spune-ne despre proiect</div>
          </div>
          <h2>Hai să <em>vorbim</em>.</h2>
        </div>

        <div className="contact-grid">
          <div>
            <p style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', color: 'var(--fg-muted)', maxWidth: '44ch' }}>
              Trimite-ne câteva rânduri. Răspundem în 24 de ore lucrătoare, cu o întâlnire scurtă propusă în calendar.
            </p>
            <dl className="contact-info">
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:office@acl-smartsoftware.ro">office@acl-smartsoftware.ro</a></dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd><a href="tel:+40758154490">0758 154 490</a></dd>
              </div>
            </dl>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot — ascuns de utilizatori, completat doar de boți */}
                <input type="text" name="_hp" value={form._hp} onChange={(e) => setForm({ ...form, _hp: e.target.value })} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            {sent ? (
              <div className="form-success">
                <div className="check">✓</div>
                <h4>Mulțumim, {form.name.split(' ')[0]}!</h4>
                <p>Am primit mesajul. Revenim în maxim 24 de ore lucrătoare la <strong>{form.email}</strong>.</p>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="f-name">Nume</label>
                    <input id="f-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Andrei Popescu" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email</label>
                    <input id="f-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="andrei@firma.ro" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-company">Companie</label>
                  <input id="f-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Numele firmei (opțional)" />
                </div>
                <div className="field">
                  <label>Buget estimat</label>
                  <div className="budget-pills">
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className="budget-pill"
                        aria-pressed={form.budget === b}
                        onClick={() => setForm({ ...form, budget: b })}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-msg">Despre proiect</label>
                  <textarea id="f-msg" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Ce vrei să construiești? Care e problema reală?" />
                </div>
                <div className="submit-row">
                  <span className="hint">↵ Răspuns în 24h</span>
                  <button type="submit" className="btn btn-primary">
                    Trimite mesaj <span className="arrow">→</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
