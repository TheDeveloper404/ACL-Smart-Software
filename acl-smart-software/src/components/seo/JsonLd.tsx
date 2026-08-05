/**
 * Emite un bloc de structured data.
 *
 * Conținutul vine exclusiv din datele proprii ale site-ului (`src/data`) — nu există
 * input de utilizator aici. Escapăm totuși fiecare paranteză unghiulară deschisă în
 * secvența ei Unicode: fără asta, un text care ar conține secvența de închidere a unui
 * tag script ar termina devreme tagul și ar transforma restul JSON-ului în markup
 * executabil. Escaparea e complet transparentă pentru parserele JSON.
 */
function serialize(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
