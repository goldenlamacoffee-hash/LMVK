/**
 * Idempotent migration that creates the `media_assets` table used by the CMS
 * Media Gallery. Stores only image metadata + the Vercel Blob reference.
 *
 * Run with:
 *   node --env-file=.env.development.local scripts/create-media-table.mjs
 */
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const sql = `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  CREATE TABLE IF NOT EXISTS media_assets (
    id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    url               text NOT NULL,
    pathname          text NOT NULL,
    filename          text NOT NULL,
    original_filename text NOT NULL,
    mime_type         text NOT NULL,
    size_bytes        integer NOT NULL DEFAULT 0,
    width             integer,
    height            integer,
    title             text NOT NULL DEFAULT '',
    alt_text          text NOT NULL DEFAULT '',
    caption           text NOT NULL DEFAULT '',
    category          text NOT NULL DEFAULT 'General',
    tags              jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at        timestamptz NOT NULL DEFAULT now(),
    updated_at        timestamptz NOT NULL DEFAULT now()
  );

  CREATE INDEX IF NOT EXISTS media_assets_category_idx ON media_assets (category);
  CREATE INDEX IF NOT EXISTS media_assets_created_at_idx ON media_assets (created_at DESC);
`

try {
  await pool.query(sql)
  console.log('[migrate] media_assets table is ready.')
} catch (error) {
  console.error('[migrate] failed:', error)
  process.exitCode = 1
} finally {
  await pool.end()
}
