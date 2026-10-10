/** Category is encoded in the listing URL so returning from details restores it. */
export function solutionIndex(services: readonly { slug: string }[], slug: string | null): number {
  const index = services.findIndex(service => service.slug === slug);
  return index >= 0 ? index : 0;
}

export function solutionUrl(pathname: string, search: string, hash: string, slug: string): string {
  const params = new URLSearchParams(search);
  params.set('solutie', slug);
  return `${pathname}?${params.toString()}${hash}`;
}
