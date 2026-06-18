import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectDetail } from '@/components/project-detail'
import { getProject } from '@/lib/projects'

const project = getProject('future-ventures')

export const metadata: Metadata = {
  title: 'Future Ventures',
  description:
    'LMVK Group is building a portfolio of premium brands and practical business projects. Future Ventures is where the next ideas take shape.',
  alternates: { canonical: '/projects/future-ventures' },
  openGraph: {
    title: 'Future Ventures — LMVK Group',
    description:
      'LMVK Group is building a portfolio of premium brands and practical business projects. Future Ventures is where the next ideas take shape.',
    url: '/projects/future-ventures',
    type: 'website',
  },
}

export default function FutureVenturesPage() {
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
