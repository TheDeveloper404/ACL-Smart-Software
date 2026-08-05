'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const COMMAND = 'acl --services';
const SERVICES = {
  ro: ['Software custom', 'Aplicații web', 'Aplicații mobile', 'Cloud & DevOps', 'AI / Machine Learning'],
  en: ['Custom software', 'Web apps', 'Mobile apps', 'Cloud & DevOps', 'AI / Machine Learning'],
};
const QUESTIONS = {
  ro: ['Ce ai avea nevoie?', 'Hai să construim ceva.', 'Începe un proiect →', 'Ai o idee? Să vorbim.'],
  en: ['What do you need?', 'Let’s build something.', 'Start a project →', 'Got an idea? Let’s talk.'],
};

type Phase = 'cmd' | 'services' | 'loop';

export default function HeroTerminal() {
  const locale = useLocale() as 'ro' | 'en';
  const [cmd, setCmd] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('cmd');
  const [loopText, setLoopText] = useState('');

  useEffect(() => {
    let cancelled = false;
    const svcList = SERVICES[locale] ?? SERVICES.ro;
    const questions = QUESTIONS[locale] ?? QUESTIONS.ro;

    const run = async () => {
      await delay(500);

      // 1. tastează comanda
      for (let i = 1; i <= COMMAND.length; i++) {
        if (cancelled) return;
        setCmd(COMMAND.slice(0, i));
        await delay(72);
      }
      await delay(320);

      // 2. afișează serviciile
      setPhase('services');
      for (const svc of svcList) {
        if (cancelled) return;
        setServices(prev => [...prev, svc]);
        await delay(340);
      }
      await delay(600);

      // 3. loop typewriter
      setPhase('loop');
      let qi = 0;
      while (!cancelled) {
        const q = questions[qi % questions.length];

        // scrie
        for (let i = 1; i <= q.length; i++) {
          if (cancelled) return;
          setLoopText(q.slice(0, i));
          await delay(78);
        }

        await delay(1600);

        // șterge
        for (let i = q.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setLoopText(q.slice(0, i));
          await delay(38);
        }

        await delay(350);
        qi++;
      }
    };

    run();
    return () => { cancelled = true; };
  }, [locale]);

  return (
    <div className="hero-terminal" aria-hidden="true">
      <div className="hero-terminal-bar">
        <span className="hero-terminal-dot" style={{ background: '#ff5f57' }} />
        <span className="hero-terminal-dot" style={{ background: '#febc2e' }} />
        <span className="hero-terminal-dot" style={{ background: '#28c840' }} />
        <span className="hero-terminal-label">terminal</span>
      </div>

      {/* comanda */}
      <div className="hero-terminal-line">
        <span className="hero-terminal-prompt">~$</span>
        <span className="hero-terminal-cmd"> {cmd}</span>
        {phase === 'cmd' && cmd.length > 0 && <span className="hero-terminal-cursor" />}
      </div>

      {/* servicii */}
      {services.map((svc, i) => (
        <div key={i} className="hero-terminal-line hero-terminal-out">
          <span className="hero-terminal-ok">✓</span>
          <span> {svc}</span>
        </div>
      ))}

      {/* loop întrebare */}
      {phase === 'loop' && (
        <div className="hero-terminal-line" style={{ marginTop: 10 }}>
          <span className="hero-terminal-prompt">~$</span>
          <span className="hero-terminal-cmd"> {loopText}</span>
          <span className="hero-terminal-cursor" />
        </div>
      )}
    </div>
  );
}

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
