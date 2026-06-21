'use client'

import { useMemo, useRef, useState } from 'react'
import { Upload, Search, Copy, Check } from 'lucide-react'
import { useMedia } from './media-context'
import { checkMediaUsageAction } from '@/app/admin/actions'
import {
  MEDIA_CATEGORIES,
  type MediaAsset,
  type MediaMetadataPatch,
} from '@/lib/media/types'

function formatBytes(bytes: number): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MediaGallery() {
  const { assets, upload, update, remove } = useMedia()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
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

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setMessage(null)
    let failed = 0
    for (const file of Array.from(files)) {
      const result = await upload(file, {
        category: category === 'all' ? 'General' : category,
      })
      if (!result.ok) failed += 1
    }
    setUploading(false)
    setMessage(
      failed > 0
        ? `Uploaded with ${failed} error(s).`
        : `Uploaded ${files.length} image(s).`,
    )
  }

  return (
    <section className="border border-border bg-secondary/30 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-xl font-normal text-foreground">
            Media Gallery
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload and manage images. Selected images render across the public
            site. {assets.length} image(s) stored.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading…' : 'Upload images'}
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, alt text, category or tag…"
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
      </div>

      {message ? (
        <p className="mt-3 border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm text-foreground">
          {message}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.length === 0 ? (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            No images yet. Upload your first image above.
          </p>
        ) : (
          filtered.map((asset) => (
            <article
              key={asset.id}
              className="flex flex-col overflow-hidden border border-border bg-card"
            >
              <span className="relative block aspect-square overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.url || '/placeholder.svg'}
                  alt={asset.altText || asset.title}
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="flex flex-1 flex-col gap-1 p-2.5">
                <p className="truncate text-sm text-foreground">
                  {asset.title || asset.filename}
                </p>
                <p className="text-[0.65rem] text-muted-foreground">
                  {asset.category}
                  {asset.width && asset.height
                    ? ` · ${asset.width}×${asset.height}`
                    : ''}{' '}
                  · {formatBytes(asset.sizeBytes)}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setEditing(editing === asset.id ? null : asset.id)
                  }
                  className="mt-1 self-start text-xs font-medium uppercase tracking-[0.16em] text-foreground hover:text-gold"
                >
                  {editing === asset.id ? 'Close' : 'Edit / details'}
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {editing ? (
        <MediaEditor
          asset={assets.find((a) => a.id === editing)!}
          onClose={() => setEditing(null)}
          onSave={(patch) => update(editing, patch)}
          onDelete={() => remove(editing)}
        />
      ) : null}
    </section>
  )
}

function MediaEditor({
  asset,
  onClose,
  onSave,
  onDelete,
}: {
  asset: MediaAsset
  onClose: () => void
  onSave: (patch: MediaMetadataPatch) => Promise<{ ok: boolean; error?: string }>
  onDelete: () => Promise<{ ok: boolean; error?: string; usage?: string[] }>
}) {
  const [title, setTitle] = useState(asset.title)
  const [altText, setAltText] = useState(asset.altText)
  const [caption, setCaption] = useState(asset.caption)
  const [category, setCategory] = useState(asset.category)
  const [tags, setTags] = useState(asset.tags.join(', '))
  const [status, setStatus] = useState<string | null>(null)
  const [usage, setUsage] = useState<string[] | null>(null)
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)

  async function save() {
    setBusy(true)
    setStatus(null)
    const result = await onSave({
      title,
      altText,
      caption,
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
    setBusy(false)
    setStatus(result.ok ? 'Saved.' : result.error ?? 'Save failed.')
  }

  async function checkUsage() {
    setBusy(true)
    const result = await checkMediaUsageAction(asset.id)
    setBusy(false)
    setUsage(result.usage)
  }

  async function handleDelete() {
    setBusy(true)
    setStatus(null)
    const result = await onDelete()
    setBusy(false)
    if (result.ok) {
      onClose()
      return
    }
    if (result.usage && result.usage.length > 0) {
      setUsage(result.usage)
      setStatus(
        'This image is currently in use. Remove it from those locations before deleting.',
      )
    } else {
      setStatus(result.error ?? 'Delete failed.')
    }
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(asset.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setStatus('Could not copy URL.')
    }
  }

  const inputClass =
    'w-full border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-gold'

  return (
    <div className="mt-4 grid gap-5 border border-border bg-card p-4 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col gap-2">
        <span className="block overflow-hidden border border-border bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.url || '/placeholder.svg'}
            alt={asset.altText || asset.title}
            className="h-auto w-full object-contain"
          />
        </span>
        <p className="text-[0.65rem] text-muted-foreground">
          {asset.originalFilename}
          {asset.width && asset.height
            ? ` · ${asset.width}×${asset.height}px`
            : ''}
        </p>
        <button
          type="button"
          onClick={copyUrl}
          className="inline-flex items-center justify-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground hover:border-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-gold" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? 'Copied' : 'Copy URL'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
            Alt text (default)
          </span>
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
            Caption / description
          </span>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={inputClass}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {MEDIA_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
              Tags (comma separated)
            </span>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {usage ? (
          <div className="border border-border bg-secondary/40 p-3 text-xs">
            {usage.length === 0 ? (
              <p className="text-muted-foreground">
                Not used anywhere. Safe to delete.
              </p>
            ) : (
              <>
                <p className="font-medium text-foreground">
                  Currently used in:
                </p>
                <ul className="mt-1 list-inside list-disc text-muted-foreground">
                  {usage.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : null}

        {status ? (
          <p className="text-sm text-foreground">{status}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            Save details
          </button>
          <button
            type="button"
            onClick={checkUsage}
            disabled={busy}
            className="border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground hover:border-foreground disabled:opacity-50"
          >
            Check usage
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:border-destructive hover:text-destructive disabled:opacity-50"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
