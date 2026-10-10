import type { Service } from '@/types';

// Slug-urile istorice rămân stabile pentru paginile deja indexate.
export const SERVICES: Service[] = [
  {
    "slug": "ai",
    "title": "AI în aplicația ta",
    "short": "Adăugăm AI într-un produs existent sau construim un asistent care caută în documentele tale.",
    "tags": [
      "Asistenți AI",
      "Căutare în documente",
      "AI în produse"
    ],
    "tagline": "O funcție utilă pentru oamenii care folosesc deja produsul tău.",
    "longDesc": "Pornim de la o nevoie concretă: găsirea unei informații, rezumarea unui document sau pregătirea unui răspuns. Alegem sursele, construim funcția și verificăm răspunsurile pe exemple din activitatea ta. Stabilim împreună limitele și când este necesară verificarea de către un om.",
    "packages": [
      {
        "id": "rag-assistant",
        "name": "Asistent pe documentele tale",
        "from": "€2.500",
        "duration": "3–4 săptămâni",
        "model": "Scop agreat",
        "includes": [
          "Căutare și întrebări peste documentele agreate",
          "Răspunsuri cu trimiteri la sursele disponibile",
          "Acces stabilit pentru utilizatorii tăi",
          "Verificare pe un set de întrebări reale"
        ],
        "deliverable": "Un asistent pentru documentele tale, cu surse și limite de utilizare explicate.",
        "priceNote": "De la €2.500 pentru un asistent pe o bază de documente agreată. OCR, mai multe surse și integrări suplimentare se estimează separat."
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
        "id": "document-extraction",
        "name": "Extragere de date din documente",
        "from": "La ofertă",
        "duration": "Estimare după analiza documentelor",
        "model": "Documente și câmpuri agreate",
        "includes": [
          "Extragere din tipurile de documente stabilite",
          "Structurarea datelor în câmpurile de care ai nevoie",
          "Verificare umană pentru informațiile neclare",
          "Export sau integrare în aplicația agreată"
        ],
        "deliverable": "Un flux care transformă documentele în date structurate, cu posibilitatea de verificare.",
        "priceNote": "La ofertă: costul depinde de formate, calitatea documentelor, câmpurile de extras și pasul de verificare."
      },
      {
        "id": "ai-prototype",
        "name": "Prototip pentru o idee AI",
        "from": "La ofertă",
        "duration": "Estimare după definirea ideii",
        "model": "Validare înainte de implementare",
        "includes": [
          "Alegerea unui caz de utilizare concret",
          "Prototip cu date și exemple reprezentative",
          "Evaluarea răspunsurilor și a costurilor de utilizare",
          "Recomandare pentru continuare și limite explicate"
        ],
        "deliverable": "Un prototip și o evaluare pe care poți baza decizia de a investi în funcția AI.",
        "priceNote": "La ofertă: stabilim mai întâi ipoteza de testat, datele disponibile și criteriile de evaluare. Prototipul nu este un produs lansat."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Găsești informația în documente",
        "desc": "Un asistent caută în manuale, proceduri sau materiale interne și indică sursele folosite."
      },
      {
        "title": "Lucrezi mai ușor cu texte",
        "desc": "Rezumate, propuneri de răspuns și clasificarea mesajelor, în aplicația în care lucrezi deja."
      },
      {
        "title": "Extragi informații din documente",
        "desc": "Transformăm informații din documente în date utile, cu verificare umană unde este nevoie."
      }
    ],
    "audience": [
      {
        "title": "Ai deja o aplicație",
        "desc": "Vrei să adaugi o funcție AI fără să reconstruiești întregul produs."
      },
      {
        "title": "Informația e răspândită în documente",
        "desc": "Echipa pierde timp căutând răspunsuri în mai multe fișiere."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€2.500",
      "duration": "Estimarea finală urmează definirea scopului",
      "model": "Proiect cu scop agreat"
    },
    "timeline": "3–5 săptămâni, orientativ",
    "faq": [
      {
        "q": "Ce înseamnă un asistent RAG?",
        "a": "Este un asistent AI care caută informații în documentele tale înainte de a formula un răspuns. Poate indica sursele, dar poate greși; verificăm calitatea și stabilim limitele de utilizare."
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
        "q": "Unde ajung documentele mele?",
        "a": "Stabilim înainte de implementare ce date pot fi procesate, cine are acces și ce furnizori pot fi folosiți. Alegerea depinde de cerințele proiectului."
      }
    ]
  },
  {
    "slug": "infrastructura",
    "title": "Automatizări și integrări",
    "short": "Legăm aplicațiile pe care le folosești și automatizăm pașii pe care îi repeți în fiecare zi.",
    "tags": [
      "Procese repetitive",
      "Documente și email",
      "Aplicații conectate"
    ],
    "tagline": "Mai puține mutări de date. Un flux de lucru mai simplu.",
    "longDesc": "Alegem un proces clar, identificăm aplicațiile și datele implicate și stabilim regulile. Automatizarea poate folosi AI când este util sau reguli obișnuite când acestea sunt suficiente. Definim ce se întâmplă la erori și ce acțiuni trebuie confirmate de un om.",
    "packages": [
      {
        "id": "automation-agent",
        "name": "Agent pentru un proces",
        "from": "€2.000",
        "duration": "3–6 săptămâni",
        "model": "Un proces agreat",
        "includes": [
          "Definirea pașilor, datelor și regulilor procesului",
          "Conectarea la aplicațiile implicate, în limita accesului disponibil",
          "Confirmare umană pentru acțiunile agreate",
          "Teste, evidența execuțiilor și tratarea erorilor"
        ],
        "deliverable": "Un proces automatizat, cu limite clare și instrucțiuni de utilizare.",
        "priceNote": "De la €2.000 pentru un proces delimitat, cu reguli și acces agreate. Procesele suplimentare se estimează separat."
      },
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
        "title": "Din document în aplicație",
        "desc": "Preluăm informații din documente și le pregătim pentru sistemul în care ai nevoie de ele."
      },
      {
        "title": "Mesaje organizate și direcționate",
        "desc": "Sortăm solicitările după reguli agreate și pregătim răspunsuri pentru verificare."
      },
      {
        "title": "Aplicații care schimbă date",
        "desc": "Conectăm un site, un CRM, un sistem de plăți sau alte instrumente care oferă acces pentru integrare."
      }
    ],
    "audience": [
      {
        "title": "Repeți aceiași pași",
        "desc": "Copiați date, sortați mesaje sau pregătiți aceleași documente în mod repetat."
      },
      {
        "title": "Folosești mai multe aplicații",
        "desc": "Informația trebuie introdusă manual în fiecare instrument."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1.500",
      "duration": "O integrare: 1–3 săptămâni; un agent: 3–6",
      "model": "Proiect cu scop agreat"
    },
    "timeline": "1–6 săptămâni, orientativ",
    "faq": [
      {
        "q": "Orice automatizare are nevoie de AI?",
        "a": "Nu. Pentru pași cu reguli clare, o automatizare obișnuită poate fi mai simplă și mai potrivită. Folosim AI când procesul chiar beneficiază de el."
      },
      {
        "q": "Puteți conecta orice aplicație?",
        "a": "Depinde de accesul oferit de aplicație: API, exporturi, webhooks sau alte interfețe. Verificăm acest lucru înainte de ofertă."
      },
      {
        "q": "Ce se întâmplă dacă un pas eșuează?",
        "a": "Stabilim cum sunt semnalate erorile, ce poate fi reluat și când trebuie să intervină un om. Aceste reguli fac parte din scopul proiectului."
      },
      {
        "q": "Agentul poate face acțiuni fără aprobare?",
        "a": "Doar acțiunile agreate explicit. Pentru acțiuni cu impact stabilim confirmări și limite înainte de implementare."
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
