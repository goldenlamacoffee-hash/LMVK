import type { Metadata } from 'next'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getEditableContent } from '@/lib/content/store'
import { listMediaAssets } from '@/lib/media/store'
import { locales, defaultLocale, isLocale } from '@/lib/i18n'
import { AdminLogin } from '@/components/admin/admin-login'
import { AdminEditor } from '@/components/admin/admin-editor'

export const metadata: Metadata = {
  title: 'CMS — LMVK Group',
  robots: { index: false, follow: false },
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>
}) {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    return <AdminLogin />
  }

  const params = await searchParams
  const locale =
    params.locale && isLocale(params.locale) ? params.locale : defaultLocale

  // Load editable content for every locale so the editor can switch instantly.
  const contentByLocale = Object.fromEntries(
    await Promise.all(
      locales.map(async (l) => [l, await getEditableContent(l)] as const),
    ),
  )

  return (
    <AdminEditor
      locales={locales}
      initialLocale={locale}
      contentByLocale={contentByLocale}
    />
  )
}
