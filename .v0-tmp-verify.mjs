import { Pool } from 'pg'
import { list } from '@vercel/blob'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const { rows } = await pool.query('select id, url, filename, mime_type, size_bytes, width, height, title, category from media_assets order by created_at desc limit 5')
console.log('[neon] rows:', rows.length)
for (const r of rows) console.log('[neon]', r.id.slice(0,8), r.filename, r.mime_type, r.size_bytes+'b', r.width+'x'+r.height, '| title:', JSON.stringify(r.title), '| cat:', r.category, '| url:', r.url.slice(0,55)+'...')
const { blobs } = await list({ prefix: 'media/' })
console.log('[blob] objects under media/:', blobs.length)
for (const b of blobs.slice(0,5)) console.log('[blob]', b.pathname, b.size+'b')
await pool.end()
