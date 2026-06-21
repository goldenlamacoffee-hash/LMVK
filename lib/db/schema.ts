import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import type { SiteContent } from '@/lib/content/types'

/** One row per locale; the full content document lives in `content`. */
export const siteContent = pgTable('site_content', {
  locale: text('locale').primaryKey(),
  content: jsonb('content').$type<SiteContent>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

/**
 * Media library. Stores only metadata + the Vercel Blob reference/URL.
 * The binary itself lives in Vercel Blob, never in the database.
 */
export const mediaAssets = pgTable('media_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  /** Public Vercel Blob URL used directly in <img>/<Image>. */
  url: text('url').notNull(),
  /** Blob pathname / key (used for deletion). */
  pathname: text('pathname').notNull(),
  /** Sanitized stored filename. */
  filename: text('filename').notNull(),
  /** Original filename as uploaded. */
  originalFilename: text('original_filename').notNull(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: integer('size_bytes').notNull().default(0),
  width: integer('width'),
  height: integer('height'),
  title: text('title').notNull().default(''),
  altText: text('alt_text').notNull().default(''),
  caption: text('caption').notNull().default(''),
  category: text('category').notNull().default('General'),
  /** Free-form usage tags. */
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type MediaAssetRow = typeof mediaAssets.$inferSelect
