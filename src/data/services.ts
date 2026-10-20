import type { Service } from '@/types';

// Slug-urile istorice rămân stabile pentru paginile deja indexate.
export const SERVICES: Service[] = [
  {
    "slug": "ai",
    "title": "Integrări API și asistenți AI",
    "short": "Legăm aplicațiile pe care le folosești deja — plăți, facturare, calendar, CRM, magazin — și punem un asistent AI să preia cererile clienților.",
    "tags": [
      "Integrări API",
      "Automatizări",
      "Asistenți AI"
    ],
    "tagline": "Aplicații conectate. Cereri preluate. Mai puțină muncă repetitivă.",
    "longDesc": "Conectăm site-ul la Stripe, SmartBill, WhatsApp, Google Calendar sau CRM-ul tău, prin API sau prin platforme ca n8n și Make. Unde ajută, adăugăm un asistent AI care răspunde clienților și duce cererea până la capăt.",
    "packages": [
      {
        "id": "integration",
        "name": "Integrare între aplicații (API, n8n, Make)",
        "from": "Cere ofertă",
        "duration": "Estimare după verificarea aplicațiilor",
        "model": "Integrări API și automatizări",
        "includes": [
          "Conectăm site-ul la plăți, facturare, CRM, curieri sau furnizori",
          "Folosim n8n, Make sau conectori existenți; scriem cod doar unde lipsește o legătură",
          "Testăm fluxul cap-coadă, inclusiv erorile: plată eșuată, date lipsă"
        ],
        "deliverable": "Un flux care rulează singur. Exemplu: plata Stripe confirmată emite factura în SmartBill și o trimite clientului pe email.",
        "priceNote": "Abonamentele serviciilor externe (n8n, Make, facturare) se discută separat."
      },
      {
        "id": "customer-assistant",
        "name": "Asistent AI pentru cereri și programări",
        "from": "Cere ofertă",
        "duration": "Estimare după definirea fluxului",
        "model": "Asistenți AI",
        "includes": [
          "Asistent pe site sau pe WhatsApp Business, instruit cu informațiile despre serviciile tale",
          "Cere detaliile lipsă și salvează programarea în Google Calendar sau o trimite echipei",
          "Predă conversația unui om în situațiile stabilite"
        ],
        "deliverable": "Un asistent care preia cererea, cere detaliile și face programarea — inclusiv seara și în weekend.",
        "priceNote": "Costurile platformei AI și ale WhatsApp Business se estimează separat."
      },
      {
        "id": "shop-assistant",
        "name": "Asistent AI pentru magazinul online",
        "from": "Cere ofertă",
        "duration": "Estimare după verificarea magazinului",
        "model": "Asistenți AI",
        "includes": [
          "Integrat în WooCommerce, Shopify sau platforma magazinului tău",
          "Recomandă produse din catalog și răspunde despre statusul comenzii",
          "Clientul vede doar datele propriei comenzi; excepțiile ajung la echipă"
        ],
        "deliverable": "Un asistent care ajută cumpărătorul să aleagă produsul potrivit și îi spune unde este comanda.",
        "priceNote": "Abonamentele și consumul AI se discută separat."
      }
    ],
    "pricing": {
      "from": "Cere ofertă",
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
    "longDesc": "Construim în etape, cu demo la aproximativ două săptămâni, ca să vezi produsul pe parcurs. La predare primești codul și instrucțiunile de administrare.",
    "packages": [
      {
        "id": "website",
        "name": "Site de prezentare",
        "from": "€1.200",
        "duration": "2–3 săptămâni",
        "model": "Pagini și conținut agreate",
        "includes": [
          "Design pe identitatea ta, gândit întâi pentru mobil",
          "Formular de contact și SEO tehnic",
          "Lansare pe domeniul tău, cu acces la cod"
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
          "Instrumentele pentru fluxurile principale și integrările din ofertă",
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
          "Conturi, cu datele fiecărui client separate",
          "Abonamente și plăți online",
          "Panou de administrare, teste și lansare"
        ],
        "deliverable": "O primă versiune a produsului tău SaaS, pregătită pentru a fi folosită de clienți.",
        "priceNote": "De la €4.500 pentru prima versiune SaaS cu funcțiile esențiale agreate. Extinderea produsului după validare se estimează separat."
      },
      {
        "id": "product-mvp",
        "name": "MVP pentru ideea ta",
        "from": "Cere ofertă",
        "duration": "Estimare după definirea primei versiuni",
        "model": "Funcțiile esențiale pentru validare",
        "includes": [
          "Definim utilizatorii și problema de rezolvat",
          "Construim doar fluxul principal",
          "Lansare pentru primii utilizatori și planul versiunii următoare"
        ],
        "deliverable": "O primă versiune funcțională prin care poți testa ideea cu utilizatori, înainte să extinzi produsul.",
        "priceNote": "Prima versiune poate însemna lucruri diferite. Stabilim fluxul esențial înainte de a fixa bugetul."
      }
    ],
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
    "longDesc": "Verificăm securitatea aplicației după OWASP, o întreținem după lansare sau te ajutăm să planifici ce construiești.",
    "packages": [
      {
        "id": "security-audit",
        "name": "Audit de securitate web și API",
        "from": "€1.500",
        "duration": "1 zi–1 săptămână",
        "model": "Perimetru autorizat și agreat",
        "includes": [
          "Verificări pe perimetrul agreat, după OWASP ASVS și Top 10",
          "Dovezi pentru fiecare problemă găsită",
          "Raport cu impact și ordinea de remediere"
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
          "Actualizări și verificări periodice",
          "Remedierea erorilor în limita pachetului",
          "Suport la utilizare și raportarea progresului"
        ],
        "deliverable": "Un plan de mentenanță cu activități și condiții clare.",
        "priceNote": "De la €500 pe lună. Activitățile, timpul alocat și disponibilitatea se stabilesc în ofertă; nu include intervenții nelimitate."
      },
      {
        "id": "project-consultation",
        "name": "Consultanță pentru proiectul tău",
        "from": "Cere ofertă",
        "duration": "Sesiuni și livrabile agreate",
        "model": "Planificare sau evaluarea unui produs existent",
        "includes": [
          "Obiective, utilizatori și buget",
          "Analiza ideii sau a aplicației existente",
          "Plan de implementare pe etape, cu priorități"
        ],
        "deliverable": "O recomandare clară și un plan pentru ce merită construit sau îmbunătățit.",
        "priceNote": "Prețul depinde de analiza necesară, numărul de sesiuni și livrabilele agreate."
      }
    ],
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
