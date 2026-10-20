import type { Service } from '@/types';

// Slug-urile istorice rămân stabile pentru paginile deja indexate.
export const SERVICES: Service[] = [
  {
    "slug": "ai",
    "title": "AI pentru firma ta",
    "short": "Automatizăm munca cu documente și mesaje și adăugăm AI în aplicațiile tale, conectat la datele firmei.",
    "tags": [
      "Procesare documente",
      "Asistent pentru clienți",
      "Agenți AI"
    ],
    "tagline": "AI care lucrează în aplicațiile tale, nu într-o fereastră de chat.",
    "longDesc": "Pornim de la o activitate care îți consumă timp: introducerea datelor din documente, răspunsurile la aceleași întrebări sau un proces cu mulți pași. Conectăm AI la aplicațiile și datele tale, ca să lucreze automat, la volum, fără copiere manuală. Testăm pe exemple reale din activitatea ta și stabilim împreună ce verifică un om.",
    "packages": [
      {
        "id": "document-processing",
        "name": "Procesare automată de documente",
        "from": "La ofertă",
        "duration": "Estimare după analiza documentelor",
        "model": "Documente și câmpuri agreate",
        "includes": [
          "Preluare automată din email, folder sau aplicație",
          "Extragerea câmpurilor de care ai nevoie: furnizor, sume, date, produse",
          "Verificare umană doar pentru cazurile neclare",
          "Datele ajung în Excel, în programul de facturare sau în aplicația ta"
        ],
        "deliverable": "Un flux care preia documentele și pune datele direct unde lucrezi, fără introducere manuală.",
        "priceNote": "La ofertă: costul depinde de tipurile și volumul documentelor, câmpurile de extras și aplicația în care ajung datele."
      },
      {
        "id": "customer-assistant",
        "name": "Asistent pentru clienții tăi",
        "from": "La ofertă",
        "duration": "Estimare după stabilirea canalelor",
        "model": "Canale și subiecte agreate",
        "includes": [
          "Răspunsuri pe site, pe email sau pe WhatsApp",
          "Informații din datele tale: program, prețuri, servicii, status comenzi",
          "Predarea conversației către un om când asistentul nu știe",
          "Istoricul conversațiilor, pentru verificare"
        ],
        "deliverable": "Un asistent care răspunde clienților tăi cu informațiile firmei și știe când să cheme un om.",
        "priceNote": "La ofertă: costul depinde de canale, sursele de date și volumul de conversații. WhatsApp Business și modelele AI au costuri recurente separate."
      },
      {
        "id": "automation-agent",
        "name": "Agent AI pentru un proces",
        "from": "€2.000",
        "duration": "3–6 săptămâni",
        "model": "Un proces agreat",
        "includes": [
          "Definirea pașilor, datelor și regulilor procesului",
          "Conectarea la aplicațiile implicate, în limita accesului disponibil",
          "Confirmare umană pentru acțiunile agreate",
          "Teste, evidența execuțiilor și tratarea erorilor"
        ],
        "deliverable": "Un proces care rulează singur, de exemplu o cerere de ofertă devenită ofertă draft, pe care doar o aprobi.",
        "priceNote": "De la €2.000 pentru un proces delimitat, cu reguli și acces agreate. Procesele suplimentare se estimează separat."
      },
      {
        "id": "ai-feature",
        "name": "AI într-un produs existent",
        "from": "€3.500",
        "duration": "3–5 săptămâni",
        "model": "O funcționalitate agreată",
        "includes": [
          "O funcție: căutare, rezumare, clasificare sau generare de text",
          "Integrare în aplicația și fluxul tău de lucru",
          "Limite de utilizare și urmărirea costurilor",
          "Teste pe exemple reprezentative pentru produs"
        ],
        "deliverable": "O funcționalitate AI integrată în produsul tău, pe care o poți evalua cu utilizatorii.",
        "priceNote": "De la €3.500 pentru o funcționalitate integrată în aplicația existentă. Oferta depinde de accesul la cod și de modificările necesare."
      },
      {
        "id": "ai-assessment",
        "name": "Analiză: unde te ajută AI",
        "from": "La ofertă",
        "duration": "1–2 sesiuni",
        "model": "Analiză înainte de investiție",
        "includes": [
          "Discuție despre activitățile care îți consumă cel mai mult timp",
          "2–3 procese în care AI economisește timp sau bani",
          "Estimare de cost și efort pentru fiecare",
          "Recomandare: ce merită făcut cu AI și ce nu"
        ],
        "deliverable": "O listă scurtă de procese potrivite pentru AI, cu estimări, pe baza căreia decizi ce faci mai departe.",
        "priceNote": "La ofertă: depinde de numărul de procese analizate și de datele disponibile."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Documente fără introducere manuală",
        "desc": "Facturi, avize sau comenzi ajung ca date în aplicația ta, cu verificare umană doar unde e nevoie."
      },
      {
        "title": "Clienți care primesc răspuns imediat",
        "desc": "Un asistent răspunde pe site, email sau WhatsApp cu informațiile firmei tale."
      },
      {
        "title": "Procese care merg singure",
        "desc": "Un agent face pașii repetitivi în aplicațiile tale, iar tu aprobi doar ce contează."
      }
    ],
    "audience": [
      {
        "title": "Pierzi timp cu aceleași sarcini",
        "desc": "Echipa introduce date, răspunde la aceleași întrebări sau pregătește aceleași documente."
      },
      {
        "title": "Ai deja o aplicație",
        "desc": "Vrei să adaugi o funcție AI fără să reconstruiești întregul produs."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€2.000",
      "duration": "Estimarea finală urmează definirea scopului",
      "model": "Proiect cu scop agreat"
    },
    "timeline": "3–6 săptămâni, orientativ",
    "faq": [
      {
        "q": "De ce nu folosesc direct ChatGPT?",
        "a": "ChatGPT e util pentru un document sau o întrebare pusă de mână. Noi conectăm AI la aplicațiile și datele tale, ca să lucreze automat și la volum, fără copiere manuală, să răspundă clienților tăi cu informații reale și să respecte cine are acces la ce."
      },
      {
        "q": "Se poate integra în aplicația existentă?",
        "a": "Da. Mai întâi verificăm cum funcționează aplicația și ce acces avem la cod sau la interfețele ei, apoi stabilim integrarea potrivită."
      },
      {
        "q": "Prețul include costurile modelelor AI?",
        "a": "Prețul de pornire este pentru implementare. Costurile recurente ale modelelor și găzduirii se estimează separat, în funcție de utilizare."
      },
      {
        "q": "Unde ajung datele mele?",
        "a": "Stabilim înainte de implementare ce date pot fi procesate, cine are acces și ce furnizori pot fi folosiți. Alegerea depinde de cerințele proiectului."
      },
      {
        "q": "Agentul poate face acțiuni fără aprobare?",
        "a": "Doar acțiunile agreate explicit. Pentru acțiuni cu impact stabilim confirmări și limite înainte de implementare."
      }
    ]
  },
  {
    "slug": "infrastructura",
    "title": "Integrări API și automatizări",
    "short": "Integrăm prin API aplicațiile pe care le folosești (CRM, plăți, facturare) și automatizăm pașii pe care îi repeți zilnic. Soluții de integrare software la comandă.",
    "tags": [
      "Integrări API",
      "Procese repetitive",
      "Aplicații conectate"
    ],
    "tagline": "Mai puține mutări de date. Un flux de lucru mai simplu.",
    "longDesc": "Alegem un proces clar, identificăm aplicațiile și datele implicate și stabilim regulile. Pentru pași cu reguli clare nu e nevoie de AI: o integrare sau o automatizare obișnuită e mai simplă, mai ieftină și mai previzibilă. Definim ce se întâmplă la erori și ce acțiuni trebuie confirmate de un om.",
    "packages": [
      {
        "id": "integration",
        "name": "Conectarea a două aplicații",
        "from": "€1.500",
        "duration": "1–3 săptămâni",
        "model": "O integrare agreată",
        "includes": [
          "Verificarea interfețelor și accesului disponibil",
          "Transferul datelor necesare între aplicații",
          "Tratarea erorilor și evitarea transferurilor duplicate",
          "Teste pe fluxul principal și documentație"
        ],
        "deliverable": "O integrare funcțională între două aplicații, pentru datele și acțiunile stabilite.",
        "priceNote": "De la €1.500 pentru un flux de date între două aplicații cu interfețe disponibile. Accesul și costurile furnizorilor se verifică înainte."
      },
      {
        "id": "workflow-automation",
        "name": "Automatizarea unui flux de lucru",
        "from": "La ofertă",
        "duration": "Estimare după analiza procesului",
        "model": "Pași și reguli agreate",
        "includes": [
          "Analiza pașilor care se repetă în activitatea ta",
          "Declanșatoare și reguli fără AI, unde sunt suficiente",
          "Notificări, reluarea pașilor și gestionarea erorilor",
          "Teste și instrucțiuni pentru echipă"
        ],
        "deliverable": "Un flux automatizat pentru sarcini repetitive, precum preluarea solicitărilor sau pregătirea documentelor.",
        "priceNote": "La ofertă: numărul de pași, aplicațiile implicate și excepțiile procesului determină scopul și prețul."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Date sincronizate între aplicații",
        "desc": "Comenzile, clienții sau facturile ajung automat dintr-o aplicație în alta, fără introducere dublă."
      },
      {
        "title": "Pași declanșați automat",
        "desc": "Un eveniment, cum ar fi o comandă nouă sau un formular trimis, pornește singur notificările și pașii următori."
      },
      {
        "title": "Aplicații care schimbă date",
        "desc": "Conectăm un site, un CRM, un sistem de plăți sau alte instrumente care oferă acces pentru integrare."
      }
    ],
    "audience": [
      {
        "title": "Repeți aceiași pași",
        "desc": "Copiați date între aplicații sau pregătiți aceleași documente în mod repetat."
      },
      {
        "title": "Folosești mai multe aplicații",
        "desc": "Informația trebuie introdusă manual în fiecare instrument."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1.500",
      "duration": "O integrare: 1–3 săptămâni",
      "model": "Proiect cu scop agreat"
    },
    "timeline": "1–3 săptămâni, orientativ",
    "faq": [
      {
        "q": "Orice automatizare are nevoie de AI?",
        "a": "Nu. Pentru pași cu reguli clare, o automatizare obișnuită e mai simplă și mai potrivită. Când procesul cere înțelegerea unor documente sau mesaje, soluția potrivită e un agent AI, de la AI pentru firma ta."
      },
      {
        "q": "Puteți conecta orice aplicație?",
        "a": "Depinde de accesul oferit de aplicație: API, exporturi, webhooks sau alte interfețe. Verificăm acest lucru înainte de ofertă."
      },
      {
        "q": "Ce se întâmplă dacă un pas eșuează?",
        "a": "Stabilim cum sunt semnalate erorile, ce poate fi reluat și când trebuie să intervină un om. Aceste reguli fac parte din scopul proiectului."
      }
    ]
  },
  {
    "slug": "produse",
    "title": "Site-uri, portaluri și SaaS",
    "short": "De la un site de prezentare la un portal pentru utilizatori sau un produs vândut prin abonament.",
    "tags": [
      "Website-uri",
      "Portaluri",
      "Produse SaaS"
    ],
    "tagline": "Un produs construit pentru ce au nevoie oamenii să facă.",
    "longDesc": "Clarificăm utilizatorii și fluxurile importante, pregătim designul și construim în etape. Vezi produsul pe parcurs și dai feedback înainte de lansare. La predare primești acces la cod și explicațiile necesare pentru folosire și administrare.",
    "packages": [
      {
        "id": "website",
        "name": "Site de prezentare",
        "from": "€1.200",
        "duration": "2–3 săptămâni",
        "model": "Pagini și conținut agreate",
        "includes": [
          "Design adaptat identității tale",
          "Pagini de prezentare și navigație pentru mobil",
          "Formular de contact și elemente de SEO tehnic",
          "Lansare pe domeniul tău și acces la cod"
        ],
        "deliverable": "Un site public care prezintă clar ce faci și cum poți fi contactat.",
        "priceNote": "De la €1.200 pentru un site de prezentare cu paginile agreate. Funcțiile de magazin, portal sau aplicație se estimează separat."
      },
      {
        "id": "app-web",
        "name": "Aplicație web sau portal",
        "from": "€3.500",
        "duration": "5–8 săptămâni",
        "model": "Fluxuri și funcții agreate",
        "includes": [
          "Conturi și roluri pentru utilizatori",
          "Pagini și instrumente pentru fluxurile principale",
          "Integrările definite în ofertă",
          "Teste, lansare și instrucțiuni de administrare"
        ],
        "deliverable": "O aplicație sau un portal pentru clienți, echipă, studenți ori profesori.",
        "priceNote": "De la €3.500 pentru fluxurile principale și rolurile agreate. Extinderile și integrările suplimentare intră într-o ofertă separată."
      },
      {
        "id": "mvp-saas",
        "name": "Produs SaaS",
        "from": "€4.500",
        "duration": "6–10 săptămâni",
        "model": "Prima versiune cu scop agreat",
        "includes": [
          "Funcțiile esențiale pentru prima versiune",
          "Conturi și separarea datelor utilizatorilor",
          "Abonamente și plăți, conform scopului agreat",
          "Panou de administrare, teste și lansare"
        ],
        "deliverable": "O primă versiune a produsului tău SaaS, pregătită pentru a fi folosită de clienți.",
        "priceNote": "De la €4.500 pentru prima versiune SaaS cu funcțiile esențiale agreate. Extinderea produsului după validare se estimează separat."
      },
      {
        "id": "product-mvp",
        "name": "MVP pentru ideea ta",
        "from": "La ofertă",
        "duration": "Estimare după definirea primei versiuni",
        "model": "Funcțiile esențiale pentru validare",
        "includes": [
          "Definirea utilizatorilor și a problemei de rezolvat",
          "Design și implementarea fluxului principal",
          "Funcțiile necesare pentru primii utilizatori",
          "Teste, lansare și pași pentru următoarea versiune"
        ],
        "deliverable": "O primă versiune funcțională prin care poți testa ideea cu utilizatori, înainte să extinzi produsul.",
        "priceNote": "La ofertă: prima versiune poate însemna lucruri diferite. Stabilim fluxul esențial înainte de a fixa bugetul."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Site-uri pentru afaceri",
        "desc": "Serviciile, lucrările și datele de contact sunt ușor de găsit, inclusiv de pe telefon."
      },
      {
        "title": "Portaluri pentru utilizatori",
        "desc": "Un spațiu cu acces pe roluri, pentru cursuri, documente sau operațiuni ale clienților și echipei."
      },
      {
        "title": "Produse SaaS",
        "desc": "Aplicații oferite prin abonament, cu funcțiile de care au nevoie primii utilizatori."
      }
    ],
    "audience": [
      {
        "title": "Ai nevoie de o prezență online",
        "desc": "Vrei să prezinți clar afacerea și să faci contactul mai simplu."
      },
      {
        "title": "Ai un flux care cere o aplicație",
        "desc": "Un portal sau un instrument adaptat poate organiza mai bine activitatea."
      },
      {
        "title": "Vrei să lansezi un produs",
        "desc": "Definim prima versiune în jurul funcțiilor esențiale pentru utilizatori."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1.200",
      "duration": "Site: 2–3 săptămâni; portal sau SaaS: 5–10",
      "model": "Proiect cu scop agreat"
    },
    "timeline": "2–10 săptămâni, orientativ",
    "faq": [
      {
        "q": "Care este diferența dintre site și portal?",
        "a": "Un site prezintă informații publice. Un portal oferă utilizatorilor conturi și acces la funcții sau materiale, în funcție de rol."
      },
      {
        "q": "Codul rămâne al meu?",
        "a": "Da. Predăm codul proiectului și accesul la resursele agreate, împreună cu documentația necesară."
      },
      {
        "q": "Pot vedea produsul înainte de lansare?",
        "a": "Da. Îți prezentăm versiuni de lucru pe parcurs, pentru a putea verifica fluxurile și a da feedback."
      },
      {
        "q": "Ce înseamnă prețul de pornire?",
        "a": "Este un reper pentru un proiect cu scop delimitat. Oferta finală depinde de funcții, conținut, integrări și cerințe. Găzduirea și alte costuri recurente sunt discutate separat."
      },
      {
        "q": "Cum diferă un MVP de un produs SaaS?",
        "a": "MVP-ul este prima versiune cu care testezi o idee și fluxul principal. Un SaaS include și elementele necesare unui produs oferit prin abonament, precum gestionarea conturilor și a plăților. Stabilim funcțiile pentru fiecare proiect."
      }
    ]
  },
  {
    "slug": "consultanta",
    "title": "Consultanță, audit și mentenanță",
    "short": "Definim pașii unui proiect nou, verificăm o aplicație existentă și oferim suport după lansare.",
    "tags": [
      "Planificare de proiect",
      "Audit web și API",
      "Suport după lansare"
    ],
    "tagline": "Înțelegi ce trebuie verificat și ce merită reparat întâi.",
    "longDesc": "Prin consultanță clarificăm funcțiile și pașii de implementare. Pentru audit definim perimetrul și accesul autorizat, verificăm aplicația și documentăm problemele cu dovezi și priorități. Mentenanța acoperă activitățile și intervențiile stabilite în oferta proiectului.",
    "packages": [
      {
        "id": "security-audit",
        "name": "Audit de securitate web și API",
        "from": "€1.500",
        "duration": "1 zi–1 săptămână",
        "model": "Perimetru autorizat și agreat",
        "includes": [
          "Verificări pe perimetrul agreat, cu referințe OWASP ASVS și Top 10",
          "Dovezi pentru problemele identificate",
          "Raport cu impact și priorități de remediere",
          "Discuție despre pașii următori"
        ],
        "deliverable": "Un raport de audit cu probleme documentate și recomandări de remediere.",
        "priceNote": "De la €1.500 pentru perimetrul agreat și raportul de audit. Remedierea problemelor este ofertată separat."
      },
      {
        "id": "maintenance",
        "name": "Mentenanță pentru aplicația ta",
        "from": "€500 / lună",
        "duration": "Colaborare lunară",
        "model": "Intervenții și disponibilitate agreate",
        "includes": [
          "Actualizări și verificări periodice agreate",
          "Remedierea erorilor în limita pachetului stabilit",
          "Suport pentru utilizare și administrare",
          "Prioritizarea intervențiilor și comunicarea progresului"
        ],
        "deliverable": "Un plan de mentenanță cu activități și condiții clare.",
        "priceNote": "De la €500 pe lună. Activitățile, timpul alocat și disponibilitatea se stabilesc în ofertă; nu include intervenții nelimitate."
      },
      {
        "id": "project-consultation",
        "name": "Consultanță pentru proiectul tău",
        "from": "La ofertă",
        "duration": "Sesiuni și livrabile agreate",
        "model": "Planificare sau evaluarea unui produs existent",
        "includes": [
          "Discuție despre obiective, utilizatori și buget",
          "Analiza aplicației existente sau a ideii propuse",
          "Prioritizarea funcțiilor și a integrărilor necesare",
          "Plan de implementare și estimarea etapelor"
        ],
        "deliverable": "O recomandare clară și un plan pentru ce merită construit sau îmbunătățit.",
        "priceNote": "La ofertă: prețul depinde de analiza necesară, numărul de sesiuni și livrabilele agreate."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Un plan pentru proiectul tău",
        "desc": "Clarificăm ideea sau analizăm aplicația existentă, apoi propunem priorități și pași de implementare."
      },
      {
        "title": "Un raport pe care poți acționa",
        "desc": "Primești dovezi, impact și o ordine recomandată a remedierilor, pentru perimetrul verificat."
      },
      {
        "title": "Continuitate după lansare",
        "desc": "Actualizări, corecții și suport organizate într-un plan de mentenanță agreat."
      }
    ],
    "audience": [
      {
        "title": "Ai o aplicație de verificat",
        "desc": "Vrei să înțelegi riscurile înainte de lansare sau pentru un produs existent."
      },
      {
        "title": "Ai nevoie de suport tehnic",
        "desc": "Vrei un punct de contact pentru întreținerea site-ului sau aplicației."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1.500",
      "duration": "Auditul este estimat după definirea perimetrului",
      "model": "Audit fix; mentenanță lunară opțională"
    },
    "timeline": "Audit: 1 zi–1 săptămână, orientativ",
    "faq": [
      {
        "q": "Auditul garantează că nu mai există vulnerabilități?",
        "a": "Nu. Raportul descrie verificările și problemele identificate în perimetrul și intervalul agreat. Nu este o garanție că aplicația nu are alte vulnerabilități."
      },
      {
        "q": "Aveți nevoie de acord pentru testare?",
        "a": "Da. Verificăm doar sistemele pentru care există autorizare și un perimetru stabilit înainte de începere."
      },
      {
        "q": "Remedierea este inclusă în audit?",
        "a": "Auditul livrează raportul și recomandările. Eventualele remedieri se stabilesc separat, pe baza problemelor identificate."
      },
      {
        "q": "Ce include mentenanța?",
        "a": "Activitățile, timpul alocat și disponibilitatea sunt definite în oferta și contractul proiectului, în funcție de aplicație."
      }
    ]
  }
];
