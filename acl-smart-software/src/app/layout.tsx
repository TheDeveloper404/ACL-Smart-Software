// Root layout necesar pentru `app/not-found.tsx` (Next.js cere un layout la fiecare nivel
// unde există un fișier de pagină). <html>/<body> reale sunt definite în
// `app/[locale]/layout.tsx` — acesta doar transmite copiii mai departe.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
