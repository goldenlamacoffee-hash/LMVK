'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Upload, Trash2 } from 'lucide-react'
import { useMedia } from './media-context'
import type { ImageRef } from '@/lib/content/types'
import type { MediaAsset } from '@/lib/media/types'

const inputClass =
  'w-full border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold'

function PickerButtons({
  onChoose,
  onUpload,
  onRemove,
  uploading,
  hasImage,
}: {
  onChoose: () => void
  onUpload: (file: File) => void
  onRemove: () => void
  uploading: boolean
  hasImage: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onChoose}
        className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground hover:border-foreground"
      >
        <ImagePlus className="h-3.5 w-3.5" />
        Choose from Gallery
      </button>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground hover:border-foreground disabled:opacity-50"
      >
        <Upload className="h-3.5 w-3.5" />
        {uploading ? 'Uploading…' : 'Upload new'}
      </button>
      {hasImage ? (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </button>
      ) : null}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onUpload(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}

function Preview({
  url,
  alt,
  title,
}: {
  url: string
  alt: string
  title?: string
}) {
  if (!url) {
    return (
      <div className="flex h-20 w-28 shrink-0 items-center justify-center border border-dashed border-border bg-secondary/40 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        No image
      </div>
    )
  }
  return (
    <div className="shrink-0">
      <span className="block h-20 w-28 overflow-hidden border border-border bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url || '/placeholder.svg'}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </span>
      {title ? (
        <span className="mt-1 block max-w-28 truncate text-[0.65rem] text-muted-foreground">
          {title}
        </span>
      ) : null}
    </div>
  )
}

/**
 * Per-locale image field: preview + gallery picker + upload + remove, plus
 * localized alt text and (optionally) caption. The asset reference is shared
 * across locales; the alt/caption typed here are saved only for this locale.
 */
export function ImagePicker({
  label,
  value,
  onChange,
  hint,
  showCaption = false,
}: {
  label: string
  value: ImageRef
  onChange: (next: ImageRef) => void
  hint?: string
  showCaption?: boolean
}) {
  const { openPicker, upload, getAsset } = useMedia()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const asset = value.assetId ? getAsset(value.assetId) : undefined
  const title = asset?.title

  function select(a: MediaAsset) {
    onChange({
      assetId: a.id,
      url: a.url,
      // Prefill alt from the asset only when this field has none yet.
      alt: value.alt || a.altText,
      caption: value.caption || a.caption,
    })
  }

  async function handleUpload(file: File) {
    setUploading(true)
    setError(null)
    try {
      const result = await upload(file, { category: 'General' })
      if (!result.ok) {
        setError(result.error ?? `Upload failed. [${result.code ?? 'E_?'}]`)
        return
      }
      if (result.asset) select(result.asset)
    } catch (err) {
      console.error('[v0] ImagePicker upload error:', err)
      setError('Unexpected error during upload. Please try again. [E_CLIENT]')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
        {label}
      </span>
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
      <div className="flex items-start gap-4">
        <Preview url={value.url} alt={value.alt} title={title} />
        <div className="flex flex-1 flex-col gap-2">
          <PickerButtons
            onChoose={() => openPicker(select)}
            onUpload={handleUpload}
            onRemove={() => onChange({ assetId: '', url: '', alt: '', caption: '' })}
            uploading={uploading}
            hasImage={Boolean(value.url)}
          />
          {error ? (
            <p className="text-xs text-destructive">{error}</p>
          ) : null}
          {value.url ? (
            <>
              <input
                type="text"
                value={value.alt}
                placeholder="Alt text (localized)"
                onChange={(e) => onChange({ ...value, alt: e.target.value })}
                className={inputClass}
              />
              {showCaption ? (
                <input
                  type="text"
                  value={value.caption}
                  placeholder="Caption (localized)"
                  onChange={(e) =>
                    onChange({ ...value, caption: e.target.value })
                  }
                  className={inputClass}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/**
 * URL-only image picker (e.g. the Open Graph image) that stores just a string
 * URL. No localized alt/caption — OG images are shared metadata.
 */
export function UrlImagePicker({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: string
  onChange: (url: string) => void
  hint?: string
}) {
  const { openPicker, upload } = useMedia()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(file: File) {
    setUploading(true)
    setError(null)
    try {
      const result = await upload(file, { category: 'Open Graph / Social' })
      if (!result.ok) {
        setError(result.error ?? `Upload failed. [${result.code ?? 'E_?'}]`)
        return
      }
      if (result.asset) onChange(result.asset.url)
    } catch (err) {
      console.error('[v0] UrlImagePicker upload error:', err)
      setError('Unexpected error during upload. Please try again. [E_CLIENT]')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-warm-grey">
        {label}
      </span>
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
      <div className="flex items-start gap-4">
        <Preview url={value} alt="Open Graph image" />
        <div className="flex flex-1 flex-col gap-2">
          <PickerButtons
            onChoose={() => openPicker((a) => onChange(a.url))}
            onUpload={handleUpload}
            onRemove={() => onChange('')}
            uploading={uploading}
            hasImage={Boolean(value)}
          />
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
          <input
            type="text"
            value={value}
            placeholder="/og-image.png or https://…"
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}
