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
import { del, put } from '@vercel/blob'
import {
  createMediaAsset,
  deleteMediaAssetRow,
  findAssetUsage,
  getMediaAsset,
  listMediaAssets,
  updateMediaAsset,
} from '@/lib/media/store'
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  type MediaAsset,
  type MediaMetadataPatch,
} from '@/lib/media/types'

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

/* -------------------------------------------------------------------------- */
/*  Media Gallery actions                                                     */
/* -------------------------------------------------------------------------- */

const ALLOWED_MIME = new Set<string>(ALLOWED_IMAGE_MIME_TYPES)

function sanitizeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? 'image'
  return (
    base
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'image'
  )
}

/** Return the full, current media library (admin-only). */
export async function listMediaAction(): Promise<MediaAsset[]> {
  if (!(await isAdminAuthenticated())) return []
  return listMediaAssets()
}

/** Upload a new image to Vercel Blob and store its metadata in Neon. */
export async function uploadMediaAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string; asset?: MediaAsset }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Not authenticated.' }
  }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'No file provided.' }
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return {
      ok: false,
      error:
        'Unsupported file type. Allowed: JPG, PNG, WEBP, AVIF, GIF. SVG is not allowed for security reasons.',
    }
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `File is too large. Maximum size is ${Math.floor(
        MAX_UPLOAD_BYTES / (1024 * 1024),
      )} MB.`,
    }
  }

  const title = String(formData.get('title') ?? '').trim()
  const altText = String(formData.get('altText') ?? '').trim()
  const category = String(formData.get('category') ?? 'General').trim()

  try {
    const safeName = sanitizeFilename(file.name)
    const buffer = Buffer.from(await file.arrayBuffer())

    // Best-effort image dimensions via sharp (already a dependency).
    let width: number | null = null
    let height: number | null = null
    try {
      const sharp = (await import('sharp')).default
      const meta = await sharp(buffer).metadata()
      width = meta.width ?? null
      height = meta.height ?? null
    } catch (error) {
      console.error('[v0] dimension probe failed:', error)
    }

    const blob = await put(`media/${safeName}`, buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    })

    const asset = await createMediaAsset({
      url: blob.url,
      pathname: blob.pathname,
      filename: safeName,
      originalFilename: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      width,
      height,
      title: title || safeName,
      altText,
      category: category || 'General',
    })

    return { ok: true, asset }
  } catch (error) {
    console.error('[v0] uploadMediaAction failed:', error)
    return { ok: false, error: 'Upload failed. Please try again.' }
  }
}

/** Update editable metadata for an asset. */
export async function updateMediaAction(
  id: string,
  patch: MediaMetadataPatch,
): Promise<{ ok: boolean; error?: string; asset?: MediaAsset }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Not authenticated.' }
  }
  try {
    const asset = await updateMediaAsset(id, {
      title: patch.title ?? '',
      altText: patch.altText ?? '',
      caption: patch.caption ?? '',
      category: patch.category || 'General',
      tags: Array.isArray(patch.tags)
        ? patch.tags.map((t) => String(t).trim()).filter(Boolean)
        : [],
    })
    if (!asset) return { ok: false, error: 'Asset not found.' }
    return { ok: true, asset }
  } catch (error) {
    console.error('[v0] updateMediaAction failed:', error)
    return { ok: false, error: 'Failed to update. Please try again.' }
  }
}

/** Report where (if anywhere) an asset is currently used. */
export async function checkMediaUsageAction(
  id: string,
): Promise<{ ok: boolean; usage: string[] }> {
  if (!(await isAdminAuthenticated())) return { ok: false, usage: [] }
  const asset = await getMediaAsset(id)
  if (!asset) return { ok: true, usage: [] }
  const usage = await findAssetUsage(asset.id, asset.url)
  return { ok: true, usage }
}

/**
 * Delete an asset from Blob + Neon, but only when it is not referenced by any
 * content. Returns the blocking usage list when deletion is unsafe.
 */
export async function deleteMediaAction(
  id: string,
): Promise<{ ok: boolean; error?: string; usage?: string[] }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Not authenticated.' }
  }
  try {
    const asset = await getMediaAsset(id)
    if (!asset) return { ok: true }

    const usage = await findAssetUsage(asset.id, asset.url)
    if (usage.length > 0) {
      return {
        ok: false,
        error: 'This image is currently in use and cannot be deleted.',
        usage,
      }
    }

    try {
      await del(asset.url)
    } catch (error) {
      // Blob may already be gone; continue to remove the metadata row.
      console.error('[v0] blob delete failed (continuing):', error)
    }
    await deleteMediaAssetRow(id)
    return { ok: true }
  } catch (error) {
    console.error('[v0] deleteMediaAction failed:', error)
    return { ok: false, error: 'Failed to delete. Please try again.' }
  }
}
