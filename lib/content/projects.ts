import type { ProjectContent, SiteContent } from './types'

/** Visible projects sorted by their configured order. */
export function visibleProjects(content: SiteContent): ProjectContent[] {
  return [...content.projects]
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order)
}

/** Find a single project by slug (regardless of visibility). */
export function findProject(
  content: SiteContent,
  slug: string,
): ProjectContent | undefined {
  return content.projects.find((p) => p.slug === slug)
}

/** All project slugs — used for static params on detail routes. */
export function allProjectSlugs(content: SiteContent): string[] {
  return content.projects.map((p) => p.slug)
}
