import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectDetail } from '@/components/project-detail'
import { getProject } from '@/lib/projects'

const project = getProject('golden-lama-coffee')

export const metadata: Metadata = {
  title: 'Golden Lama Coffee',
  description:
    'Golden Lama Coffee is the first active brand within LMVK Group: a premium mobile coffee concept built around craft, design and genuine hospitality.',
  alternates: { canonical: '/projects/golden-lama-coffee' },
  openGraph: {
    title: 'Golden Lama Coffee — LMVK Group',
    description:
      'The first active brand within LMVK Group: a premium mobile coffee concept built around craft, design and genuine hospitality.',
    url: '/projects/golden-lama-coffee',
    type: 'website',
  },
}

export default function GoldenLamaCoffeePage() {
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
