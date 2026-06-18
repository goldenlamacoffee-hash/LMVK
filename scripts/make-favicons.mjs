import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pub = path.join(__dirname, '..', 'public')
const app = path.join(__dirname, '..', 'app')

const LOGO = path.join(pub, 'lmvk-group-logo-transparent.png')
const IVORY = { r: 246, g: 243, b: 238, alpha: 1 } // #F6F3EE

/**
 * Build a square icon: the official logo, contained with padding, centered on
 * an ivory tile (matching the logo's native black-on-light treatment).
 */
async function buildIcon(outPath, tile) {
  const inner = Math.round(tile * 0.82)
  const logo = await sharp(LOGO)
    .resize({ width: inner, fit: 'inside' })
    .toBuffer()

  await sharp({
    create: {
      width: tile,
      height: tile,
      channels: 4,
      background: IVORY,
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(outPath)

  console.log(`[v0] icon written: ${outPath} (${tile}x${tile})`)
}

await buildIcon(path.join(app, 'icon.png'), 64)
await buildIcon(path.join(app, 'apple-icon.png'), 180)
