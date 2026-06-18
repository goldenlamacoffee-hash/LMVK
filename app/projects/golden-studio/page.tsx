import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectDetail } from '@/components/project-detail'
import { getProject } from '@/lib/projects'

const project = getProject('golden-studio')

export const metadata: Metadata = {
  title: 'Golden Studio',
  description:
    'Golden Studio is a digital product studio in preparation under LMVK Group, helping small businesses build websites, apps, CMS systems and AI-assisted workflows.',
  alternates: { canonical: '/projects/golden-studio' },
  openGraph: {
    title: 'Golden Studio — LMVK Group',
    description:
      'A digital product studio in preparation under LMVK Group, helping small businesses build websites, apps, CMS systems and AI-assisted workflows.',
    url: '/projects/golden-studio',
    type: 'website',
  },
}

export default function GoldenStudioPage() {
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
