import 'server-only'
import { headers } from 'next/headers'
import { localeFromHost, type Locale } from '@/lib/i18n'

/** Resolve the active locale for the current request from its host header. */
export async function getLocale(): Promise<Locale> {
  const headerList = await headers()
  const host =
    headerList.get('x-forwarded-host') ?? headerList.get('host') ?? null
  return localeFromHost(host)
}
