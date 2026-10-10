export const PROJECT_ORDER = [
  'meridian-transconstruct', 'detalia', 'seminarul-teologic-filadelfia',
  'flotapro', 'filadelfia', 'itcustom',
] as const;
export const HOME_PROJECT_SLUGS = ['detalia', 'seminarul-teologic-filadelfia', 'meridian-transconstruct'] as const;

export function orderedProjects<T extends { slug: string }>(projects: T[]): T[] {
  return [
    ...PROJECT_ORDER.flatMap(slug => projects.filter(project => project.slug === slug)),
    ...projects.filter(project => !(PROJECT_ORDER as readonly string[]).includes(project.slug)),
  ];
}

export function homeProjects<T extends { slug: string }>(projects: T[]): T[] {
  return HOME_PROJECT_SLUGS.flatMap(slug => projects.filter(project => project.slug === slug));
}

export function projectAnchor(slug: string): string {
  return `proiect-${slug === 'seminarul-teologic-filadelfia' ? 'seminar' : slug}`;
}
