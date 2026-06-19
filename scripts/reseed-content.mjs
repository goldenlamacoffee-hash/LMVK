import { Pool } from 'pg'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesDir = join(__dirname, '..', 'lib', 'content', 'locales')
const locales = ['sk', 'cs', 'en']

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  for (const locale of locales) {
    const raw = readFileSync(join(localesDir, `${locale}.json`), 'utf8')
    const content = JSON.parse(raw)
    await pool.query(
      `INSERT INTO site_content (locale, content, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (locale)
       DO UPDATE SET content = EXCLUDED.content, updated_at = now()`,
      [locale, JSON.stringify(content)],
    )
    console.log(`[v0] reseeded ${locale} (${content.hero.title})`)
  }
  await pool.end()
}

main().catch((error) => {
  console.error('[v0] reseed failed:', error)
  process.exit(1)
})
