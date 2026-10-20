import type { Service } from '@/types';

// Slug-urile istorice rămân stabile pentru paginile deja indexate.
export const SERVICES: Service[] = [
  {
    "slug": "ai",
    "title": "Integrari API si asistenti AI",
    "short": "Conectam site-ul sau aplicatia ta la serviciile folosite si implementam asistenti AI pentru cereri, programari si magazine online.",
    "tags": [
      "Integrari API",
      "Automatizari",
      "Asistenti AI"
    ],
    "tagline": "Aplicatii conectate. Cereri preluate. Mai putina munca repetitiva.",
    "longDesc": "Pornim de la un rezultat concret: o plata ajunsa in facturare, o programare salvata sau un client ajutat sa aleaga produsul potrivit. Verificam ce pot face instrumentele existente, configuram solutia potrivita si dezvoltam doar integrarile care lipsesc. Testam fluxul complet inainte de predare.",
    "packages": [
      {
        "id": "integration",
        "name": "Conectarea site-ului sau aplicatiei la servicii externe",
        "from": "La oferta",
        "duration": "Estimare dupa verificarea aplicatiilor",
        "model": "Integrari API si automatizari",
        "includes": [
          "Stabilirea datelor si actiunilor care trebuie sa circule intre aplicatii",
          "Configurarea conectorilor existenti sau dezvoltarea integrarii necesare",
          "Automatizarea pasilor stabiliti: plati, facturare, CRM, curieri sau furnizori",
          "Testarea fluxului, tratarea erorilor si instructiuni de utilizare"
        ],
        "deliverable": "Un flux functional intre aplicatiile stabilite. De exemplu: plata confirmata in site genereaza factura in programul de facturare.",
        "priceNote": "Oferta depinde de aplicatiile implicate, accesul disponibil si regulile fluxului. Abonamentele serviciilor externe se discuta separat."
      },
      {
        "id": "customer-assistant",
        "name": "Asistent pentru cereri si programari",
        "from": "La oferta",
        "duration": "Estimare dupa definirea fluxului",
        "model": "Asistenti AI",
        "includes": [
          "Configurarea asistentului pe site sau WhatsApp, pe canalul stabilit",
          "Pregatirea informatiilor despre servicii si a intrebarilor necesare",
          "Conectarea la calendar sau transmiterea cererii completate catre echipa",
          "Testarea conversatiilor si predarea catre un om pentru situatiile stabilite"
        ],
        "deliverable": "Un asistent care afla ce serviciu doreste clientul, colecteaza detaliile si salveaza programarea sau trimite cererea echipei, in functie de integrarea disponibila.",
        "priceNote": "Oferta depinde de canal, sistemul de programari si actiunile necesare. Costurile platformei AI si ale canalului se estimeaza separat."
      },
      {
        "id": "shop-assistant",
        "name": "Asistent pentru magazinul online",
        "from": "La oferta",
        "duration": "Estimare dupa verificarea magazinului",
        "model": "Asistenti AI",
        "includes": [
          "Configurarea unei solutii existente sau integrarea in magazinul tau",
          "Conectarea la catalog, disponibilitate si informatiile comenzilor, dupa accesul oferit",
          "Pregatirea conversatiilor pentru alegerea produselor si intrebari despre comenzi",
          "Verificarea accesului la datele clientului si predarea exceptiilor catre echipa"
        ],
        "deliverable": "Un asistent conectat la magazin, care ajuta cumparatorul sa aleaga produse si sa afle statusul propriei comenzi.",
        "priceNote": "Oferta depinde de platforma magazinului, sursele de date si actiunile stabilite. Abonamentele si consumul AI se discuta separat."
      }
    ],
    "whatWeBuild": [
      {
        "title": "De la plata la factura",
        "desc": "O plata confirmata in site porneste emiterea facturii in aplicatia de facturare. Integrarea API muta datele, iar automatizarea executa pasii stabiliti."
      },
      {
        "title": "De la conversatie la programare",
        "desc": "Clientul descrie ce doreste. AI-ul intelege solicitarea si cere detaliile necesare; integrarea verifica disponibilitatea si salveaza programarea."
      },
      {
        "title": "Ajutor direct in magazin",
        "desc": "Cumparatorul explica ce cauta sau intreaba despre comanda sa. Asistentul foloseste catalogul si datele disponibile, iar echipa preia situatiile care cer interventie."
      }
    ],
    "audience": [
      {
        "title": "Folosesti aplicatii care trebuie conectate",
        "desc": "Site-ul, facturarea, CRM-ul sau furnizorii tai nu schimba informatiile necesare in fluxul de lucru."
      },
      {
        "title": "Primesti cereri si programari",
        "desc": "Vrei sa preiei detaliile clientului si sa le duci pana la programare sau pana la persoana care se ocupa de solicitare."
      },
      {
        "title": "Ai un magazin online",
        "desc": "Clientii au nevoie de ajutor la alegerea produselor si de informatii despre comenzile lor."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "La oferta",
      "duration": "Dupa verificarea aplicatiilor si a fluxului",
      "model": "Implementare cu scop stabilit"
    },
    "timeline": "Stabilita dupa definirea fluxului",
    "faq": [
      {
        "q": "Ce primesc in plus fata de un abonament AI sau un MCP?",
        "a": "Instrumentele pot acoperi deja o parte sau tot fluxul. Verificam intai aceasta varianta. Serviciul nostru acopera alegerea si configurarea solutiei, conectarea la aplicatiile tale, adaptarile necesare si testarea fluxului complet. Daca instrumentul existent iti rezolva cerinta fara implementare, iti spunem."
      },
      {
        "q": "Aveti nevoie de AI pentru orice integrare?",
        "a": "Nu. Transferul datelor si pasii cu reguli stabilite pot functiona prin API si automatizari. Folosim AI pentru interpretarea solicitarilor si conversatiile cu clientii, unde este util."
      },
      {
        "q": "Construiti totul de la zero?",
        "a": "Folosim platforme si conectori existenti cand acopera cerinta. Dezvoltarea personalizata este pentru legaturile sau comportamentul care lipsesc, dupa verificarea alternativelor."
      },
      {
        "q": "Puteti conecta orice aplicatie?",
        "a": "Depinde de accesul oferit de fiecare aplicatie si de actiunile disponibile. Verificam API-urile, conectorii si permisiunile inainte sa confirmam ce putem livra."
      },
      {
        "q": "Ce costuri raman dupa implementare?",
        "a": "Platforma asistentului, consumul AI, WhatsApp, gazduirea sau alte servicii pot avea costuri recurente. Le identificam in oferta. Eventualul suport ulterior se stabileste separat."
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
