'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  deleteMediaAction,
  updateMediaAction,
  uploadMediaAction,
} from '@/app/admin/actions'
import type { MediaAsset, MediaMetadataPatch } from '@/lib/media/types'
import { MediaPickerDialog } from './media-picker-dialog'

type UploadResult = { ok: boolean; error?: string; asset?: MediaAsset }
type DeleteResult = { ok: boolean; error?: string; usage?: string[] }

type MediaContextValue = {
  assets: MediaAsset[]
  upload: (file: File, meta?: Partial<MediaMetadataPatch>) => Promise<UploadResult>
  update: (
    id: string,
    patch: MediaMetadataPatch,
  ) => Promise<{ ok: boolean; error?: string }>
  remove: (id: string) => Promise<DeleteResult>
  /** Open the shared picker; the callback fires with the chosen asset. */
  openPicker: (onSelect: (asset: MediaAsset) => void) => void
  getAsset: (id: string) => MediaAsset | undefined
}

const MediaContext = createContext<MediaContextValue | null>(null)

export function useMedia(): MediaContextValue {
  const ctx = useContext(MediaContext)
  if (!ctx) throw new Error('useMedia must be used within MediaProvider')
  return ctx
}

export function MediaProvider({
  initialAssets,
  children,
}: {
  initialAssets: MediaAsset[]
  children: ReactNode
}) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [onSelectRef, setOnSelectRef] = useState<
    ((asset: MediaAsset) => void) | null
  >(null)

  const upload = useCallback(
    async (file: File, meta?: Partial<MediaMetadataPatch>) => {
      const fd = new FormData()
      fd.append('file', file)
      if (meta?.title) fd.append('title', meta.title)
      if (meta?.altText) fd.append('altText', meta.altText)
      if (meta?.category) fd.append('category', meta.category)
      const result = await uploadMediaAction(fd)
      if (result.ok && result.asset) {
        const added = result.asset
        setAssets((prev) => [added, ...prev])
      }
      return result
    },
    [],
  )

  const update = useCallback(
    async (id: string, patch: MediaMetadataPatch) => {
      const result = await updateMediaAction(id, patch)
      if (result.ok && result.asset) {
        const updated = result.asset
        setAssets((prev) => prev.map((a) => (a.id === id ? updated : a)))
      }
      return { ok: result.ok, error: result.error }
    },
    [],
  )

  const remove = useCallback(async (id: string) => {
    const result = await deleteMediaAction(id)
    if (result.ok) setAssets((prev) => prev.filter((a) => a.id !== id))
    return result
  }, [])

  const openPicker = useCallback((onSelect: (asset: MediaAsset) => void) => {
    // Wrap in a function so React state doesn't call it as an updater.
    setOnSelectRef(() => onSelect)
    setPickerOpen(true)
  }, [])

  const getAsset = useCallback(
    (id: string) => assets.find((a) => a.id === id),
    [assets],
  )

  const value = useMemo<MediaContextValue>(
    () => ({ assets, upload, update, remove, openPicker, getAsset }),
    [assets, upload, update, remove, openPicker, getAsset],
  )

  return (
    <MediaContext.Provider value={value}>
      {children}
      <MediaPickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(asset) => {
          onSelectRef?.(asset)
          setPickerOpen(false)
        }}
      />
    </MediaContext.Provider>
  )
}
