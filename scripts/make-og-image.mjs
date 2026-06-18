import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const logoPath = path.join(root, 'public', 'lmvk-group-logo-transparent.png')
const outPath = path.join(root, 'public', 'og-image.png')

const WIDTH = 1200
const HEIGHT = 630
const IVORY = { r: 246, g: 243, b: 238, alpha: 1 } // #F6F3EE

// Resize the official logo to sit comfortably centered with generous margin.
const logo = await sharp(logoPath)
  .resize({ width: 620, fit: 'inside' })
  .toBuffer()

const canvas = sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: IVORY,
  },
})

await canvas
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toFile(outPath)

console.log('Wrote', outPath)
