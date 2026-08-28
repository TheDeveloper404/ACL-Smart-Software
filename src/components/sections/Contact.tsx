'use client';

import { useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  budget: string;
  _hp: string;
};

const EMPTY: FormData = { name: '', email: '', company: '', message: '', budget: '', _hp: '' };

const COPY = {
  ro: {
    idx: '05 / CONTACT', eyebrow: 'Spune-ne despre proiect', h2: <>Hai să <em>vorbim</em>.</>,
    intro: 'Trimite-ne câteva rânduri. Răspundem în 24 de ore lucrătoare, cu o întâlnire scurtă propusă în calendar.',
    email: 'Email', phone: 'Telefon',
    name: 'Nume', namePh: 'Andrei Popescu', emailPh: 'andrei@firma.ro',
    company: 'Companie', companyPh: 'Numele firmei (opțional)',
    budget: 'Buget estimat', budgets: ['< 10k €', '10–30k €', '30–80k €', '80k+ €', 'Discutăm'],
    message: 'Despre proiect', messagePh: 'Ce vrei să construiești? Care e problema reală?',
    hint: '↵ Răspuns în 24h', submit: 'Trimite mesaj',
    thanks: (first: string) => `Mulțumim, ${first}!`,
    received: (email: string) => <>Am primit mesajul. Revenim în maxim 24 de ore lucrătoare la <strong>{email}</strong>.</>,
  },
  en: {
    idx: '05 / CONTACT', eyebrow: 'Tell us about your project', h2: <>Let’s <em>talk</em>.</>,
    intro: 'Send us a few lines. We reply within 24 business hours, with a short call proposed on the calendar.',
    email: 'Email', phone: 'Phone',
    name: 'Name', namePh: 'John Smith', emailPh: 'john@company.com',
    company: 'Company', companyPh: 'Company name (optional)',
    budget: 'Estimated budget', budgets: ['< €10k', '€10–30k', '€30–80k', '€80k+', 'Let’s discuss'],
    message: 'About the project', messagePh: 'What do you want to build? What’s the real problem?',
    hint: '↵ Response within 24h', submit: 'Send message',
    thanks: (first: string) => `Thanks, ${first}!`,
    received: (email: string) => <>We’ve received your message. We’ll get back to you within 24 business hours at <strong>{email}</strong>.</>,
  },
};

export default function Contact() {
  const locale = useLocale() as 'ro' | 'en';
  const t = COPY[locale] ?? COPY.ro;
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
            <div className="idx">{t.idx}</div>
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>{t.h2}</h2>
        </div>

        <div className="contact-grid">
          <div>
            <p style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', color: 'var(--fg-muted)', maxWidth: '44ch' }}>
              {t.intro}
            </p>
            <dl className="contact-info">
              <div>
                <dt>{t.email}</dt>
                <dd><a href="mailto:office@acl-smartsoftware.ro">office@acl-smartsoftware.ro</a></dd>
              </div>
              <div>
                <dt>{t.phone}</dt>
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
                <h4>{t.thanks(form.name.split(' ')[0])}</h4>
                <p>{t.received(form.email)}</p>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="f-name">{t.name}</label>
                    <input id="f-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePh} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">{t.email}</label>
                    <input id="f-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPh} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-company">{t.company}</label>
                  <input id="f-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t.companyPh} />
                </div>
                <div className="field">
                  <label>{t.budget}</label>
                  <div className="budget-pills">
                    {t.budgets.map((b) => (
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
                  <label htmlFor="f-msg">{t.message}</label>
                  <textarea id="f-msg" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.messagePh} />
                </div>
                <div className="submit-row">
                  <span className="hint">{t.hint}</span>
                  <button type="submit" className="btn btn-primary">
                    {t.submit} <span className="arrow">→</span>
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
