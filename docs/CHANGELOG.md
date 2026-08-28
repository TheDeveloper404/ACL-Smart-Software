# Changelog

## 2026-08-28 — Structură repo + UX navigare + secțiune „Ce am livrat"

**Aplatizare repo**
- Mutat tot din `acl-smart-software/` în rădăcina repo-ului (`git mv`, 84 fișiere ca renames,
  istoric păstrat). Cauza nesting-ului: `create-next-app` rulat într-un subfolder al unui repo
  deja inițializat. `.gitignore` fuzionat (varianta app + `/.claude`, `.remember/`).
- **Necesită manual în Vercel:** Project Settings → Root Directory `acl-smart-software` → gol/`.`
  (altfel următorul deploy pică). Folderul gol `acl-smart-software/` a rămas pe disc (handle de
  proces pe Windows) — de șters manual, e git-invizibil.
- `eslint.config.mjs`: ignore pt `.remember/`, `.claude/`, `.ua/` (acum că lint rulează din rădăcină).

**UX navigare**
- Fade discret (~180ms opacity) la schimbarea de pagină — `RouteTransition.tsx`, fără remount
  (nu clipește `RevealOnScroll`), respectă `prefers-reduced-motion`.
- `ScrollReset.tsx` rescris: link înainte → scroll la top; **back/forward → revenire la poziția
  de unde ai plecat** (salvare continuă în `sessionStorage` pe cheie de path, detecție `popstate`).

**Homepage**
- Secțiunea Proof: fără număr de secțiune (doar eyebrow „Ce am livrat"); restul secțiunilor
  revenite la numerotarea originală (DESPRE 01, SERVICII 02, PROCES 03).
- Restilizată discret și uniform: scos h2-ul „Produse live, în producție", scos gridul de
  case-uri bordate. Acum: un rând de linkuri live + două testimoniale scurte, un singur stil
  de card, totul egal.

## 2026-08-28 — Redefinire ofertă: 8 servicii → 4 arii cu pachete productizate

**Poziționare & vânzare**
- Hero rescris pe poziționarea „de la idee la producție în 6–10 săptămâni, cod care rămâne
  al tău" (RO + EN). CTA principal → „Discută proiectul (30 min)".
- Statistica „Proiecte livrate": `10+` → `6` (aliniată la portofoliul real).
- Secțiune nouă `Proof` pe homepage, între Hero și About: 2 case-uri live evidențiate
  (FlotaPro, DETALIA) + 2 testimoniale reale, cu linkuri live.
- Recenziile extrase în `src/data/reviews.ts` (refolosite de homepage și pagina Despre noi).

**Servicii: 4 arii, ~17 pachete cu scope fix + preț „de la"**
- `SERVICES` mutate în `src/data/services.ts` (RO) / `services.en.ts` (EN). Ariile:
  `produse`, `ai`, `infrastructura`, `consultanta`. Tip nou `ServicePackage` + câmp
  `packages` pe `Service`.
- Pagina de arie (`/servicii/[slug]`) are secțiune nouă „Pachete" — tabel cu preț, durată,
  ce include și livrabil per pachet. Aria `ai` are procesul detaliat (Audit → PoC → producție
  → AI Ops) și arhitectura de agenți (planificator → executor → verificator, guardrails).
- `OfferCatalog` + `Offer` (cu `priceCurrency`/`price`) adăugate în JSON-LD-ul fiecărei arii.
- `/servicii` și `ServicesPreview` (homepage) rescrise pe cele 4 arii; badge-urile inventate
  („#1 Enterprise", „Trending 2026") eliminate.
- `CASES[].services` remapate pe noile 4 slug-uri. Footer: linkuri servicii 5 → 4.
- Redirect-uri 301: cele 8 slug-uri vechi (`software-custom`, `aplicatii-web`, `ai-ml` etc.)
  → aria corespunzătoare, RO + `/en`.

**Onestitate (afirmații nesusținute înlocuite cu framing pe capabilitate)**
- Scos „proiecte cu 100k+ utilizatori activi lunar", „mediana clienților: 32% reducere
  factură", „certificați AWS și Azure", „rotație de 3 oameni minim" din FAQ-urile de servicii.
- Articolele Insights `finops-aws-40` și `event-driven-2026`: reformulate din „am făcut X la
  un client" (cu cifre specifice de engagement, ex. „$18.000/lună", „am migrat 3 sisteme în
  2025") în „cum abordăm / tipare din practică".
- Despre noi + About: „companii mari / corporații" → „companii, ONG-uri și startup-uri".
- Stat homepage „8 servicii oferite" → „4 arii de servicii". `foundingDate` din JSON-LD
  aliniat la 2024 (era 2025; About zice 2024 — **de confirmat de Liviu**).

**Secțiunea `/insights` ștearsă complet** (RO + EN)
- Șterse: `app/[locale]/insights/` (listă + `[slug]` + `InsightsGrid`), `POSTS` din `data/index.ts`,
  tipurile `Post`/`PostBlock`, helper-ul `toIsoDate` + `MONTHS_RO` din `lib/seo.ts`, componenta
  neutilizată `HomePreviews.tsx`, CSS-ul `.insight(s)-*` și `.home-preview-*`.
- Scoase linkurile din Nav și Footer (RO + EN); scoase din `sitemap.ts`.
- Redirect-uri 301: `/insights` și `/insights/:slug*` → `/` (RO), `/en/insights*` → `/en`.

**Verificare:** `tsc --noEmit`, `eslint`, `next build` — verzi. Smoke-test pe `next start`:
toate rutele noi 200, cele 8 redirect-uri vechi→arie rezolvă corect (RO + EN), conținut
randat verificat prin grep. Fără e2e (alegere de proiect) — interacțiunea reală (accordion
FAQ, hover carduri) nu a fost testată automat.

## 2026-08-05 — Site multilingv (RO/EN) + SEO tehnic

**Multilingv**
- Adăugat `next-intl`: RO rămâne neschimbat, fără prefix (`acl-smartsoftware.ro/servicii`);
  EN nou sub `/en/...`.
- Traduse: Home, Servicii (index + 8 pagini), Portofoliu, tot chrome-ul global (Nav, Footer,
  Contact, ContactStrip, CookieBanner, ThemePanel, widget WhatsApp).
- Insights (articole) și paginile legale (cookies, termeni, politica de confidențialitate)
  rămân doar RO — decizie explicită, nu are sens tradus conținutul. `/en/insights` și
  `/en/insights/[slug]` dau 404 controlat; legalele rămân accesibile sub `/en/*`, dar cu
  canonical spre versiunea RO (conținut identic, evită duplicat).
- Comutator de limbă RO/EN în navigare (păstrează pagina curentă la switch).
- `<html lang>` corect per pagină, `hreflang` complet (RO ↔ EN ↔ x-default) pe toate paginile
  traduse, atât în `<head>` cât și în sitemap.
- Renumit `middleware.ts` → `proxy.ts` (convenția Next 16; cea veche e deprecated).

**SEO tehnic**
- `Service` + `FAQPage` + `BreadcrumbList` JSON-LD pe paginile de servicii; `BlogPosting` +
  `BreadcrumbList` pe articole; `BreadcrumbList` pe paginile de listare.
- Redirect-uri 301: `www` → apex, `/echipa` → `/`, `/cariere` → `/`, `/contact` → `/#contact`.
- Canonical corectat pe fiecare pagină (nu mai moștenește implicit spre homepage — bug găsit
  și reparat în sesiune).
- `sitemap.xml`: 35 URL-uri (22 bilingve cu hreflang reciproc + 13 doar-RO).
- Scos meta `keywords` (ignorat de Google din 2009); descrieri meta scurtate sub 160 caractere.
- Textele din hero, secțiunea „despre" și „servicii" de pe homepage rescrise — mai puțin
  generice, cu cuvinte cheie de serviciu.

**Curățenie**
- Pagina `/cariere` ștearsă complet (firma nu angajează) — toate referințele (Nav, Footer,
  card homepage, sitemap) eliminate.
- Adresa din footer scurtată la „Petroșani, Hunedoara" (fără strada).

**Bug-uri prinse și reparate în timpul lucrului** (nu doar cosmetice — verificate prin build
și teste live, nu presupuse):
- Canonical implicit din layout indica greșit spre homepage pe orice pagină care nu-l
  suprascria explicit.
- `/en/insights` afișa conținut RO în loc de 404.
- Articolele Insights nu se mai generau static deloc (0 pagini pre-construite) — găsit doar
  verificând fișierele generate efectiv, nu tabelul de output al build-ului.
- Toate paginile rulau server-side la fiecare request în loc de static (lipsea
  `setRequestLocale`).
- `ContactStrip` și `ThemePanel` (widget global de temă/WhatsApp) rămăseseră netraduse pe
  `/en/*` — găsite la un code review separat, cerut explicit după livrare.

**Hook global** (`review-checkpoint.js`, `~/.claude`) — bug de path reparat: starea nu se mai
leagă de directorul curent, ci de rădăcina git, ca reset-ul și incrementul să nu mai scrie în
fișiere diferite. Prag ridicat de la 12 la 20.
