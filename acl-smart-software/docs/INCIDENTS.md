# Incidents

## 2026-08-01 — Formularul de contact nu livra niciun mesaj (~6 săptămâni)

**Ce s-a întâmplat:** Toate mesajele trimise prin formularul de contact către
`office@acl-smartsoftware.ro` au fost blocate de Resend cu `last_event: suppressed`.
Formularul răspundea „trimis cu succes" utilizatorului.

**Cauză (verificată, nu presupusă):** Adresa `office@acl-smartsoftware.ro` a intrat pe
suppression list-ul Resend pe **2026-06-16**, `origin: bounce`, în urma a 3 bounce-uri
consecutive (cutia nu era funcțională atunci). Resend refuză tăcut orice trimitere către o
adresă suprimată. Nu a avut legătură cu migrarea mailului pe Zoho din 2026-07-31.

Problema a rămas ascunsă pentru că ruta `/api/contact` ignora răspunsul Resend și returna
`{ok:true}` necondiționat — SDK-ul Resend nu aruncă la eroare, o întoarce în `error`.

**Impact:** Cel puțin un lead real pierdut (31 iulie, firmă de construcții, contactat
ulterior manual). Emailuri de test din 16 iunie și 10 iulie de asemenea nelivrate.

**Fix:** (1) Intrarea din suppression list ștearsă via `DELETE /suppressions/{id}`; livrare
confirmată `delivered`. (2) Ruta verifică acum `error` din răspunsul Resend și întoarce 502
în loc de succes fals; `data.id` e logat la fiecare trimitere reușită.
