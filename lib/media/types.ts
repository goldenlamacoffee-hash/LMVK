/** A media asset as exposed to client components (dates serialized as ISO). */
export type MediaAsset = {
  id: string
  url: string
  pathname: string
  filename: string
  originalFilename: string
  mimeType: string
  sizeBytes: number
  width: number | null
  height: number | null
  title: string
  altText: string
  caption: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

/** The fixed set of CMS media categories. */
export const MEDIA_CATEGORIES = [
  'Brand',
  'Hero',
  'Featured Project',
  'Portfolio',
  'Project Detail',
  'Golden Lama Coffee',
  'Golden Studio',
  'Future Ventures',
  'Open Graph / Social',
  'Backgrounds',
  'General',
] as const

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]

/** Editable metadata fields for an existing asset. */
export type MediaMetadataPatch = {
  title: string
  altText: string
  caption: string
  category: string
  tags: string[]
}

/** Allowed upload MIME types (SVG intentionally excluded for safety). */
export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
] as const

/** Maximum upload size in bytes (8 MB). */
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
