import { Pool } from 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
// discover content table
const t = await pool.query("select table_name from information_schema.tables where table_schema='public' and table_name like '%content%'")
console.log('[tables]', t.rows.map(r=>r.table_name).join(', '))
await pool.end()
