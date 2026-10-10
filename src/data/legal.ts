export interface LegalDocument { title: string; sub: string; sections: { title: string; text: string }[]; }
export const LEGAL: Record<'ro' | 'en', Record<'privacy' | 'terms' | 'cookies', LegalDocument>> = {
  "ro": {
    "privacy": {
      "title": "Politică de confidențialitate",
      "sub": "Cum colectăm, folosim și protejăm datele tale personale.",
      "sections": [
        {
          "title": "1. Cine suntem",
          "text": "ACL Smart Software SRL, cu sediul în Str. Horea 2/31, Petroșani, Hunedoara, CUI 51219715, J2025007081009 — denumit în continuare „ACL”, „noi” sau „compania”. Ne poți contacta la office@acl-smartsoftware.ro."
        },
        {
          "title": "2. Ce date colectăm",
          "text": "Prin formularul de contact colectăm: nume, adresă de email, denumire companie (opțional), buget estimat și descrierea proiectului. Nu solicităm date sensibile sau date ale minorilor."
        },
        {
          "title": "3. De ce le colectăm",
          "text": "Datele transmise prin formular sunt folosite pentru a răspunde solicitării tale și pentru a stabili o discuție despre proiect. Nu folosim datele pentru marketing automat fără acordul tău explicit."
        },
        {
          "title": "4. Temeiul juridic",
          "text": "Prelucrarea se bazează pe interesul legitim (GDPR Art. 6(1)(f)) de a răspunde solicitărilor primite și, acolo unde este cazul, pe consimțământul tău explicit."
        },
        {
          "title": "5. Cât timp păstrăm datele",
          "text": "Datele de contact se păstrează maxim 24 de luni de la ultima comunicare, după care sunt șterse. Datele din contracte se păstrează conform obligațiilor legale (10 ani)."
        },
        {
          "title": "6. Drepturile tale",
          "text": "Conform GDPR ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție. Pentru solicitări, scrie-ne la office@acl-smartsoftware.ro. Ai și dreptul de a depune plângere la ANSPDCP, pe dataprotection.ro."
        },
        {
          "title": "7. Preferințe și măsurarea utilizării",
          "text": "Site-ul reține preferința de limbă, setările de accesibilitate și alegerea din bannerul de cookie-uri. Include Vercel Web Analytics și Speed Insights pentru statistici de utilizare și performanță. Detalii în Politica Cookies."
        },
        {
          "title": "8. Modificări",
          "text": "Această politică poate fi actualizată. Ultima revizuire: octombrie 2026."
        }
      ]
    },
    "terms": {
      "title": "Termeni și condiții",
      "sub": "Termenii de utilizare a site-ului ACL Smart Software.",
      "sections": [
        {
          "title": "1. Acceptarea termenilor",
          "text": "Prin accesarea site-ului acl-smartsoftware.ro accepți acești Termeni și Condiții. Dacă nu ești de acord, te rugăm să nu folosești site-ul."
        },
        {
          "title": "2. Proprietatea intelectuală",
          "text": "Conținutul acestui site — texte, design, cod și grafice — aparține ACL Smart Software SRL și este protejat de legislația privind drepturile de autor. Reproducerea fără acord scris este interzisă."
        },
        {
          "title": "3. Limitarea răspunderii",
          "text": "Site-ul este furnizat „ca atare”. ACL Smart Software nu garantează disponibilitatea neîntreruptă și nu răspunde pentru daune indirecte rezultate din utilizarea site-ului."
        },
        {
          "title": "4. Link-uri externe",
          "text": "Site-ul poate conține link-uri către site-uri terțe. ACL Smart Software nu răspunde pentru conținutul acestora și nu controlează politicile lor de confidențialitate."
        },
        {
          "title": "5. Contracte de prestări servicii",
          "text": "Relația comercială dintre ACL Smart Software și clienți este guvernată de contractele individuale semnate de ambele părți, nu de acești Termeni de utilizare a site-ului."
        },
        {
          "title": "6. Legea aplicabilă",
          "text": "Acești Termeni sunt guvernați de legislația română. Eventualele litigii se vor soluționa pe cale amiabilă sau, în lipsa unui acord, de instanțele competente din România."
        },
        {
          "title": "7. Contact",
          "text": "Pentru întrebări referitoare la acești termeni, ne poți scrie la office@acl-smartsoftware.ro."
        },
        {
          "title": "8. Modificări",
          "text": "ACL Smart Software își rezervă dreptul de a modifica acești termeni. Ultima revizuire: octombrie 2026."
        }
      ]
    },
    "cookies": {
      "title": "Politică Cookies",
      "sub": "Ce preferințe păstrăm în browser și ce instrumente de măsurare folosim.",
      "sections": [
        {
          "title": "Ce sunt cookie-urile",
          "text": "Cookie-urile sunt fișiere text mici păstrate de browser când vizitezi un site. Local Storage este un mecanism separat, prin care site-ul poate reține setări în browser."
        },
        {
          "title": "Preferințele salvate",
          "text": "Reținem limba aleasă într-un cookie tehnic. Setările de accesibilitate și alegerea din banner se păstrează local în browser. Aceste preferințe nu includ conținutul mesajului trimis prin formular."
        },
        {
          "title": "Statistici și performanță",
          "text": "Cu acordul tău din banner, site-ul încarcă Vercel Web Analytics și Speed Insights pentru a măsura utilizarea și performanța paginilor. Alegerea „Doar esențiale” păstrează aceste instrumente oprite. Vercel documentează aceste instrumente ca fiind fără cookie-uri de identificare și oferă statistici agregate."
        },
        {
          "title": "Cum controlezi preferințele",
          "text": "Poți șterge cookie-urile și datele locale ale site-ului din setările browserului. Setările de accesibilitate pot fi schimbate și din panoul dedicat. Ștergerea datelor locale resetează preferințele și afișează din nou bannerul."
        },
        {
          "title": "Contact",
          "text": "Pentru întrebări despre cookie-uri și preferințe: office@acl-smartsoftware.ro."
        }
      ]
    }
  },
  "en": {
    "privacy": {
      "title": "Privacy policy",
      "sub": "How we collect, use and protect your personal data.",
      "sections": [
        {
          "title": "1. Who we are",
          "text": "ACL Smart Software SRL, registered at Str. Horea 2/31, Petroșani, Hunedoara, Romania, company tax ID 51219715, registration J2025007081009 — referred to as “ACL”, “we” or “the company”. Contact us at office@acl-smartsoftware.ro."
        },
        {
          "title": "2. Data we collect",
          "text": "Through the contact form we collect your name, email address, company name (optional), estimated budget and project description. We do not request sensitive data or data about minors."
        },
        {
          "title": "3. Why we collect it",
          "text": "Information submitted through the form is used to respond to your request and arrange a discussion about the project. We do not use it for automated marketing without your explicit consent."
        },
        {
          "title": "4. Legal basis",
          "text": "Processing is based on our legitimate interest (GDPR Article 6(1)(f)) in responding to requests and, where applicable, on your explicit consent."
        },
        {
          "title": "5. Data retention",
          "text": "Contact data is retained for a maximum of 24 months after the last communication and then deleted. Contract data is retained according to legal obligations (10 years)."
        },
        {
          "title": "6. Your rights",
          "text": "Under GDPR you have rights of access, rectification, erasure, restriction, portability and objection. Send requests to office@acl-smartsoftware.ro. You may also complain to the Romanian supervisory authority, ANSPDCP, at dataprotection.ro."
        },
        {
          "title": "7. Preferences and usage measurement",
          "text": "The site remembers your language preference, accessibility settings and cookie-banner choice. It includes Vercel Web Analytics and Speed Insights for usage and performance statistics. See the Cookie Policy for details."
        },
        {
          "title": "8. Changes",
          "text": "This policy may be updated. Last revised: October 2026."
        }
      ]
    },
    "terms": {
      "title": "Terms and conditions",
      "sub": "Terms for using the ACL Smart Software website.",
      "sections": [
        {
          "title": "1. Acceptance",
          "text": "By accessing acl-smartsoftware.ro you accept these Terms and Conditions. If you do not agree, please do not use the site."
        },
        {
          "title": "2. Intellectual property",
          "text": "Content on this site — text, design, code and graphics — belongs to ACL Smart Software SRL and is protected by copyright law. Reproduction without written permission is prohibited."
        },
        {
          "title": "3. Limitation of liability",
          "text": "The site is provided “as is”. ACL Smart Software does not guarantee uninterrupted availability and is not liable for indirect damages arising from use of the site."
        },
        {
          "title": "4. External links",
          "text": "The site may link to third-party websites. ACL Smart Software is not responsible for their content and does not control their privacy policies."
        },
        {
          "title": "5. Service contracts",
          "text": "The commercial relationship between ACL Smart Software and its clients is governed by individual contracts signed by both parties, rather than these website terms."
        },
        {
          "title": "6. Applicable law",
          "text": "These Terms are governed by Romanian law. Disputes will be resolved amicably or, if no agreement is reached, by the competent courts in Romania."
        },
        {
          "title": "7. Contact",
          "text": "For questions about these terms, email office@acl-smartsoftware.ro."
        },
        {
          "title": "8. Changes",
          "text": "ACL Smart Software reserves the right to modify these terms. Last revised: October 2026."
        }
      ]
    },
    "cookies": {
      "title": "Cookie policy",
      "sub": "The preferences stored in your browser and the measurement tools we use.",
      "sections": [
        {
          "title": "What cookies are",
          "text": "Cookies are small text files kept by your browser when you visit a site. Local Storage is a separate mechanism that allows a site to remember settings in your browser."
        },
        {
          "title": "Stored preferences",
          "text": "We remember your selected language in a technical cookie. Accessibility settings and your banner choice are stored locally in your browser. These preferences do not contain the message you submit through the contact form."
        },
        {
          "title": "Usage and performance statistics",
          "text": "With your agreement in the banner, the site loads Vercel Web Analytics and Speed Insights to measure page usage and performance. Choosing “Essential only” keeps these tools disabled. Vercel documents these tools as not using identification cookies and providing aggregated statistics."
        },
        {
          "title": "Controlling preferences",
          "text": "You can remove the site's cookies and local data through your browser settings. Accessibility settings can also be changed in the dedicated panel. Clearing local data resets preferences and displays the banner again."
        },
        {
          "title": "Contact",
          "text": "For questions about cookies and preferences, email office@acl-smartsoftware.ro."
        }
      ]
    }
  }
};
