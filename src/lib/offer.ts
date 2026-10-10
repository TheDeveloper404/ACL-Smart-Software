/** Numeric EUR amount for structured offers; an unpriced quote omits price. */
export function offerPrice(label: string): string | undefined {
  const match = label.match(/^€\s*([\d.,]+)/);
  return match ? match[1].replace(/[.,]/g, '') : undefined;
}
