import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectDetail } from '@/components/project-detail'
import { localeConfig } from '@/lib/i18n'
import { getLocale } from '@/lib/locale-server'
import { getContent } from '@/lib/content/store'
import { visibleProjects, findProject } from '@/lib/content/projects'
import { localizedAlternates, localeOrigin } from '@/lib/seo'
import { defaultContent } from '@/lib/content/defaults'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return defaultContent.projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const content = await getContent(locale)
  const project = findProject(content, slug)
  if (!project) return {}

  const path = `/projects/${slug}`
  return {
    metadataBase: new URL(localeOrigin(locale)),
    title: project.name,
    description: project.summary,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      title: `${project.name} — LMVK Group`,
      description: project.summary,
      url: `${localeConfig[locale].origin}${path}`,
      type: 'website',
      images: [
        {
          url: content.settings.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const locale = await getLocale()
  const content = await getContent(locale)
  const project = findProject(content, slug)
  if (!project) notFound()

  return (
    <>
      <SiteHeader nav={content.nav} locale={locale} />
      <main>
        <ProjectDetail project={project} />
      </main>
      <SiteFooter
        nav={content.nav}
        footer={content.footer}
        projects={visibleProjects(content)}
        locale={locale}
      />
    </>
  )
}
