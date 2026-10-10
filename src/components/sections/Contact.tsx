'use client';

import { useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';
import MotionSurface from '@/components/ui/MotionSurface';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';

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
    idx: '04 / CONTACT', eyebrow: 'Spune-ne despre proiect', h2: <>Hai să <em>vorbim</em>.</>,
    intro: 'Ai o idee, un proces de automatizat sau o aplicație de îmbunătățit? Spune-ne ce vrei să rezolvi. Răspundem în 24 de ore lucrătoare.',
    formTitle: 'Povestește-ne despre proiect', formNote: 'Câteva detalii sunt suficiente pentru a începe discuția.',
    email: 'Email', phone: 'Telefon',
    name: 'Nume', namePh: 'Andrei Popescu', emailPh: 'andrei@firma.ro',
    company: 'Companie', companyPh: 'Numele firmei (opțional)',
    budget: 'Buget estimat', budgets: ['1.200–2.500 €', '2.500–5.000 €', '5.000–10.000 €', '10.000+ €', 'Discutăm'],
    message: 'Despre proiect', messagePh: 'Ce vrei să construiești? Care e problema reală?',
    hint: '↵ Răspuns în 24h', submit: 'Trimite mesaj',
    thanks: (first: string) => `Mulțumim, ${first}!`,
    received: (email: string) => <>Am primit mesajul. Revenim în maxim 24 de ore lucrătoare la <strong>{email}</strong>.</>,
  },
  en: {
    idx: '04 / CONTACT', eyebrow: 'Tell us about your project', h2: <>Let’s <em>talk</em>.</>,
    intro: 'Have an idea, a process to automate or an application to improve? Tell us what you need to solve. We reply within 24 business hours.',
    formTitle: 'Tell us about your project', formNote: 'A few details are enough to start the conversation.',
    email: 'Email', phone: 'Phone',
    name: 'Name', namePh: 'John Smith', emailPh: 'john@company.com',
    company: 'Company', companyPh: 'Company name (optional)',
    budget: 'Estimated budget', budgets: ['€1,200–2,500', '€2,500–5,000', '€5,000–10,000', '€10,000+', 'Let’s discuss'],
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!form.name.trim() || !form.email || !form.message.trim()) {
      setError(locale === 'en' ? 'Please enter your name, email and project details.' : 'Completează numele, emailul și detaliile proiectului.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('contact-failed');
      setSent(true);
    } catch {
      setError(locale === 'en' ? 'Your message could not be sent. Please try again or contact us by email.' : 'Mesajul nu a putut fi trimis. Încearcă din nou sau contactează-ne pe email.');
    } finally { setSending(false); }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div className="label-col">
            <div className="idx">{t.idx}</div>
            <div className="eyebrow">{t.eyebrow}</div>
          </div>
          <h2>{t.h2}</h2>
        </div>

        <p className="contact-intro">{t.intro}</p>
        <MotionSurface className="contact-grid">
          <form className="contact-form contact-terminal" onSubmit={handleSubmit} aria-busy={sending}>
            <div className="terminal-bar"><span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span><span className="terminal-title">acl / {locale === 'en' ? 'new message' : 'mesaj nou'}</span><span className="terminal-locale" aria-hidden="true">{locale.toUpperCase()}</span></div>
            {!sent && <div className="contact-form-head"><div><span className="terminal-prompt" aria-hidden="true">acl &gt; <span className="terminal-cursor" /></span><h3>{t.formTitle}</h3><p>{t.formNote}</p></div><span className="terminal-mark" aria-hidden="true">&gt;_</span></div>}
                {/* Honeypot — ascuns de utilizatori, completat doar de boți */}
                <input type="text" name="_hp" value={form._hp} onChange={(e) => setForm({ ...form, _hp: e.target.value })} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            {sent ? (
              <div className="form-success" role="status">
                <div className="check">✓</div>
                <h4>{t.thanks(form.name.split(' ')[0])}</h4>
                <p>{t.received(form.email)}</p>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="f-name">{t.name}</label>
                    <input id="f-name" name="name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePh} />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">{t.email}</label>
                    <input id="f-email" name="email" autoComplete="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPh} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-company">{t.company}</label>
                  <input id="f-company" name="company" autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t.companyPh} />
                </div>
                <fieldset className="field budget-field">
                  <legend>{t.budget}</legend>
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
                </fieldset>
                <div className="field">
                  <label htmlFor="f-msg">{t.message}</label>
                  <textarea id="f-msg" name="message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.messagePh} />
                </div>
                <div className="submit-row">
                  <span className="hint">{t.hint}</span>
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? (locale === 'en' ? 'Sending…' : 'Se trimite…') : t.submit} <span className="arrow">→</span>
                  </button>
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
              </>
            )}
          <div className="contact-direct"><p>{locale === 'en' ? 'Prefer to contact us directly?' : 'Preferi să ne contactezi direct?'}</p><dl className="contact-info">
              <div>
                <dt>{t.email}</dt>
                <dd><a href="mailto:office@acl-smartsoftware.ro">office@acl-smartsoftware.ro<ArrowUpRightIcon size={18} aria-hidden="true" /></a></dd>
              </div>
              <div>
                <dt>{t.phone}</dt>
                <dd><a href="tel:+40758154490">0758 154 490<ArrowUpRightIcon size={18} aria-hidden="true" /></a></dd>
              </div>
            </dl></div>
          </form>
        </MotionSurface>
      </div>
    </section>
  );
}
