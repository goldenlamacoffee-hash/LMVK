'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyPassword,
} from '@/lib/admin-auth'
import { saveContent } from '@/lib/content/store'
import { isLocale, type Locale } from '@/lib/i18n'
import type { SiteContent } from '@/lib/content/types'

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get('password') ?? '')
  if (!verifyPassword(password)) {
    return { error: 'Incorrect password.' }
  }
  await createAdminSession()
  redirect('/admin')
}

export async function logoutAction(): Promise<void> {
  await destroyAdminSession()
  redirect('/admin')
}

export async function saveContentAction(
  locale: Locale,
  content: SiteContent,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Not authenticated.' }
  }
  if (!isLocale(locale)) {
    return { ok: false, error: 'Invalid locale.' }
  }

  try {
    await saveContent(locale, content)
  } catch (error) {
    console.error('[v0] saveContentAction failed:', error)
    return { ok: false, error: 'Failed to save. Please try again.' }
  }

  // Revalidate the public site (all locale domains share the same routes).
  revalidatePath('/', 'layout')
  return { ok: true }
}
