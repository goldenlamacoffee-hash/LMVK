import { Pool } from 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const { rows } = await pool.query("select content from site_content where locale='en'")
const d = typeof rows[0].content === 'string' ? JSON.parse(rows[0].content) : rows[0].content
console.log('[before] featured.image present:', 'image' in (d.featured ?? {}))
console.log('[before] customBlocks:', (d.sections?.customBlocks ?? []).length)
if (d.featured && 'image' in d.featured) delete d.featured.image
await pool.query("update site_content set content=$1, updated_at=now() where locale='en'", [JSON.stringify(d)])
const { rows: after } = await pool.query("select content from site_content where locale='en'")
const d2 = typeof after[0].content === 'string' ? JSON.parse(after[0].content) : after[0].content
console.log('[after] featured.image present:', 'image' in (d2.featured ?? {}))
await pool.end()
