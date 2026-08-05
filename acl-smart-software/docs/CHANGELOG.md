# Changelog

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
