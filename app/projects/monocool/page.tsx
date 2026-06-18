import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectDetail } from '@/components/project-detail'
import { getProject } from '@/lib/projects'

const project = getProject('monocool')

export const metadata: Metadata = {
  title: 'MonoCool',
  description:
    'MonoCool is a B2B cooling and installation brand in preparation under LMVK Group, built on reliable engineering, clean installation and dependable service.',
  alternates: { canonical: '/projects/monocool' },
  openGraph: {
    title: 'MonoCool — LMVK Group',
    description:
      'A B2B cooling and installation brand in preparation under LMVK Group, built on reliable engineering, clean installation and dependable service.',
    url: '/projects/monocool',
    type: 'website',
  },
}

export default function MonoCoolPage() {
  if (!project) notFound()
  return (
    <>
      <SiteHeader />
      <main>
        <ProjectDetail project={project} />
      </main>
      <SiteFooter />
    </>
  )
}
