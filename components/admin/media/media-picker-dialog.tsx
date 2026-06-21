'use client'

import { useMemo, useRef, useState } from 'react'
import { X, Upload, Search } from 'lucide-react'
import { useMedia } from './media-context'
import { MEDIA_CATEGORIES, type MediaAsset } from '@/lib/media/types'

export function MediaPickerDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean
  onClose: () => void
  onSelect: (asset: MediaAsset) => void
}) {
  const { assets, upload } = useMedia()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return assets.filter((a) => {
      if (category !== 'all' && a.category !== category) return false
      if (!q) return true
      return (
        a.title.toLowerCase().includes(q) ||
        a.altText.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [assets, query, category])

  if (!open) return null

  async function handleFile(file: File | undefined) {
    if (!file) return
    setUploading(true)
    setError(null)
    const result = await upload(file, { category: category === 'all' ? 'General' : category })
    setUploading(false)
    if (!result.ok) {
      setError(result.error ?? 'Upload failed.')
      return
    }
    if (result.asset) onSelect(result.asset)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose an image"
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-4xl flex-col border border-border bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 className="font-heading text-lg text-foreground">
            Media Gallery
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-col gap-3 border-b border-border px-5 py-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, alt, category, tag…"
              className="w-full border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-gold"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
          >
            <option value="all">All categories</option>
            {MEDIA_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {error ? (
          <p className="border-b border-destructive/40 bg-destructive/10 px-5 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="flex-1 overflow-y-auto p-5">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No images found. Upload one to get started.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => onSelect(asset)}
                  className="group flex flex-col overflow-hidden border border-border bg-card text-left transition-colors hover:border-gold"
                >
                  <span className="relative block aspect-square overflow-hidden bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.url || '/placeholder.svg'}
                      alt={asset.altText || asset.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="truncate px-2 py-1.5 text-xs text-foreground">
                    {asset.title || asset.filename}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
