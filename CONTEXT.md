# ACL Smart Software — Context de business & domeniu

> Referință pentru site-ul firmei ACL Smart Software SRL. Citește acest fișier DOAR când lucrezi
> efectiv pe site — nu se încarcă automat. Proiect tratat **intenționat minimal** (schimbat rar,
> obiectivul e „să fie live"): nu are `CLAUDE.md` de proces propriu, nu are marker
> `HUMAN_RUNS_TESTS`, nu are memorie bogată — toate sunt alegeri asumate, nu găuri de acoperit.

---

## Ce este

Site profesional RO/EN pentru **ACL Smart Software SRL**, studio software în Petroșani.
Proiect la `D:\production_mode\ACL-Smart Software` (repo aplatizat). Run: `npm run dev`, `npm test`.
176 teste Playwright (5 fișiere). Next.js actualizat la 16.3.8 pe 2026-10-04 (alerte de securitate
CRITICAL în 16.2.10).
Redesign-ul din 2026-10-04/05 a fost anulat pe 2026-10-09; codul lui e păstrat în `git stash`
(„redesign ACL 2026-10-04/05 (anulat 2026-10-09)”).

---

## Stack

- Next.js 16.3.8 (Turbopack), React 19.2.7, TypeScript 5, Tailwind CSS 4, next-intl.
- App Router, Server + Client Components, `generateStaticParams` pentru slug-uri.
- Breaking change cheie: `params` în rute dinamice sunt Promises → `await params`.

---

## Pagini (toate returnează 200)

- `/` — Home (Hero → About → ServicesPreview → Process → Tech → Contact); aceleași pagini în engleză sub `/en`.
- `/servicii` — Services index (class: `services-index-card`, NOT `svc-card`)
- `/servicii/[slug]` — 4 arii; slug-urile istorice au redirecturi 301 în `next.config.ts`.
- `/portofoliu`, `/despre-noi`
- `/politica-confidentialitate`, `/termeni`, `/cookies`
- `/api/contact` — Resend; formular de contact.
- `/robots.txt`, `/sitemap.xml` — via `MetadataRoute`
- ȘTERSE: `/echipa`, `/cariere`, `/insights` (insights RO+EN scos 2026-08-28, `POSTS` + tipurile
  `Post`/`PostBlock` eliminate, 301 `/insights*` → `/`)

---

## Structură date servicii (după redefinirea 2026-08-28)

- `src/data/services.ts` = `SERVICES` (RO, 4 arii), `services.en.ts` = `SERVICES_EN`. `index.ts`
  doar re-exportă.
- Tip `Service` are câmp `packages: ServicePackage[]` (`id`, `name`, `from`, `duration`, `model`,
  `includes[]`, `deliverable`).
- Recenzii clienți: `src/data/reviews.ts` (`REVIEWS`, `initialsOf`) — afișate în `despre-noi` (`.reviews-grid`, `.review-card`).
- Pagina de arie randează: hero cu tehnologii (`.svc-tech-pill`) → Pachete (01) → Ce construim (02) → Cui se potrivește (03) → FAQ (04);
  JSON-LD include `OfferCatalog`.

---

## Nume de clase CSS critice pentru teste

- `/servicii` page cards: `.services-index-card`
- FAQ accordion: click `div.faq-item`, answer în `.faq-item[data-open="true"] .faq-a`
- Portfolio cases: `article.case`, badge: `.case-done-badge`
- CEO editorial: `.ceo-editorial`, `.ceo-heading`

---

## Nav mobile

- `.nav-mobile-toggle` este hidden via `globals.css` `display: none` și arătat la `≤880px` via
  media query cu `!important`.
- NU folosi `style={{ display: 'none' }}` — împiedică CSS override.
- NU folosi `<style jsx>` în `Nav.tsx` — interferează cu specificity; toate stilurile nav sunt în
  `globals.css`.
- Nav are clasa `is-menu-open` când meniul e deschis → `pointer-events: none` pe nav,
  `pointer-events: auto` pe toggle.
- La `≤640px`: nav CTA `.nav-links .nav-cta` este ascunsă (CTA-ul e în mobile menu).
- La `≤880px`: brand name font-size redus la 20px.

---

## Note Playwright

- `robots.txt` generează `User-Agent` (capital A) — testul folosește `.toLowerCase()`.
- Desktop nav tests: `test.use({ viewport: { width: 1280, height: 720 } })` în describe block.
- Mobile nav tests: `test.use({ viewport: { width: 375, height: 812 } })`.
- `a[href="/#contact"]` apare în mai multe locuri → scope pe `.hero` sau nav, după fluxul verificat.
- Theme Panel tests: `beforeEach` include `waitForLoadState('networkidle')` pentru hydration.

---

## Mobile responsiveness (implementat)

- Nav: font 20px la ≤880px, CTA ascunsă la ≤640px.
- Hero h1: `.h1-line { display: block }` pentru line breaks corecte.
- About section: padding mic la ≤560px, font-size redus.
- Contact form: submit-row stacks la ≤480px.
- Footer: 2-col la ≤880px, 1-col la ≤560px.

---

## Ce NU e gata

- Livrarea efectivă a emailurilor — depinde de Resend și de configurația destinatarului. La debugging verifică răspunsul real al API-ului/providerului și suppression list înainte de a presupune o problemă DNS/SPF.

---

## Alte fapte de proiect (din memorie)

- **Branching:** se lucrează DIRECT pe `main`, fără `dev`/PR (excepție conștientă de la regula
  globală — e site-ul personal al lui Liviu, o singură persoană). Commit/push le face userul din
  VS Code.
- **Mail:** intrare pe `acl-smartsoftware.ro` la Zoho (DC EU); Cloudflare Email Routing dezactivat
  2026-07-31. Token Cloudflare = read-only pe DNS, record-uri adăugate manual din dashboard.
  Resend/SES separat pe subdomeniul `send.acl-smartsoftware.ro` — nu amesteca cele două SPF.
