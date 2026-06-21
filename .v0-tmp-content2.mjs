import { Pool } from 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const cols = await pool.query("select column_name from information_schema.columns where table_name='site_content'")
console.log('[cols]', cols.rows.map(r=>r.column_name).join(', '))
const r = await pool.query('select * from site_content')
for (const row of r.rows) {
  const locale = row.locale ?? row.id ?? '?'
  const data = row.content ?? row.data ?? row.document
  let feat = '(no data col)'
  try { const d = typeof data === 'string' ? JSON.parse(data) : data; feat = JSON.stringify(d?.featured?.image ?? '(absent)') } catch(e) { feat = 'parse-err' }
  console.log('[row]', locale, '-> featured.image:', feat)
}
await pool.end()
