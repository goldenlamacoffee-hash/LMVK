import { Pool } from 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const { rows } = await pool.query('select title, alt_text, caption, category, tags from media_assets order by created_at desc limit 1')
console.log('[meta]', JSON.stringify(rows[0]))
await pool.end()
