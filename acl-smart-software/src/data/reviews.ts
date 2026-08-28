/**
 * Recenzii reale de la clienți, folosite pe pagina Despre noi și în secțiunea de dovadă
 * de pe homepage. Fiecare intrare corespunde unui client real, cu acordul lui pentru
 * publicare. Lista nu conține niciodată mărturii inventate — dacă e goală, secțiunile care
 * o folosesc nu se randează.
 */
export interface Review {
  quote: string;
  name: string;
  role: string;
  /** Inițiale pentru avatar; dacă lipsesc, se derivă din `name`. */
  initials?: string;
}

export const REVIEWS: Record<'ro' | 'en', Review[]> = {
  ro: [
    {
      // Mărturie primită în scris, în engleză, de la fondatorul Detalia.ro. Textul de mai jos e
      // varianta condensată (5 fraze) + tradusă a originalului — fără afirmații adăugate.
      quote: 'Ce m-a impresionat cel mai mult nu a fost doar stăpânirea codului — care e excelentă — ci disciplina din jurul lui. Liviu nu doar scrie software; construiește cu fluxuri de lucru bine așezate, structură clară și un nivel de organizare care face colaborarea fără efort. Tot ce am stabilit a fost livrat prompt și exact cum am discutat, iar genul ăsta de predictibilitate e rar. Dincolo de partea tehnică, e pur și simplu un om cu care e o plăcere să lucrezi: deschis și ușor de abordat chiar și pe subiecte complexe. Îl recomand din toată inima pentru orice proiect.',
      name: 'Eduard N.',
      role: 'Fondator, Detalia.ro',
      initials: 'E',
    },
    {
      quote: 'O experiență foarte bună de la început până la final. Site-ul este modern, rapid și bine structurat, iar atenția la detalii se vede în fiecare aspect. Comunicarea a fost promptă, iar cerințele au fost înțelese și implementate exact cum am dorit. Recomand pentru oricine caută servicii de dezvoltare web de calitate.',
      name: 'Biserica Filadelfia Petroșani',
      role: 'Client',
      initials: 'BF',
    },
    {
      quote: 'Sunt foarte mulțumit de colaborare. Tot procesul a decurs fără probleme, iar rezultatul a fost peste așteptări. Site-ul arată excelent, se mișcă foarte bine și este ușor de administrat. Recomand cu încredere!',
      name: 'Dani N.',
      role: 'Fondator, IT Custom',
      initials: 'D',
    },
  ],
  en: [
    {
      quote: 'What impressed me most wasn’t just his command of the code — which is excellent — but the discipline around it. Liviu doesn’t just write software; he builds with well-established workflows, clear structure, and a level of organization that makes collaboration effortless. Everything we agreed on was delivered promptly and exactly as discussed, and that kind of reliability is rare. Beyond the technical side, he’s simply a great person to work with: open and easy to communicate with even on complex topics. I recommend him wholeheartedly for any project.',
      name: 'Eduard N.',
      role: 'Founder, Detalia.ro',
      initials: 'E',
    },
    {
      quote: 'A very good experience from start to finish. The website is modern, fast, and well structured, and the attention to detail shows in every aspect. Communication was prompt, and our requirements were understood and implemented exactly as we wanted. I recommend this for anyone looking for quality web development services.',
      name: 'Biserica Filadelfia Petroșani',
      role: 'Client',
      initials: 'BF',
    },
    {
      quote: 'I’m very happy with the collaboration. The whole process went smoothly, and the result exceeded expectations. The website looks excellent, runs very well, and is easy to manage. I recommend it with confidence!',
      name: 'Dani N.',
      role: 'Founder, IT Custom',
      initials: 'D',
    },
  ],
};

export function initialsOf(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}
