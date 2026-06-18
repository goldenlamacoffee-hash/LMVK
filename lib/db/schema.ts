import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import type { SiteContent } from '@/lib/content/types'

/** One row per locale; the full content document lives in `content`. */
export const siteContent = pgTable('site_content', {
  locale: text('locale').primaryKey(),
  content: jsonb('content').$type<SiteContent>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
