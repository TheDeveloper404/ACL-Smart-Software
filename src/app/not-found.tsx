// Fallback pentru cereri care nu ajung deloc la un segment de locale (ex. căi complet
// malformate, excluse din matcher-ul middleware-ului). Cazul normal — /pagina-inexistenta,
// /en/pagina-inexistenta — e prins de app/[locale]/not-found.tsx, cu Nav/Footer complete.
export default function GlobalNotFound() {
  return (
    <html lang="ro">
      <body>
        <p>404 — Pagina nu a fost găsită.</p>
      </body>
    </html>
  );
}
