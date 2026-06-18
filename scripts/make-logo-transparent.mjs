import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '..', 'public', 'lmvk-group-logo.png')
const OUT = path.join(__dirname, '..', 'public', 'lmvk-group-logo-transparent.png')

// Pixels brighter than this (near-white) become fully transparent.
const THRESHOLD = 236

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
let minX = width
let minY = height
let maxX = 0
let maxY = 0

for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]

  // Treat near-white as background -> transparent.
  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    data[i + 3] = 0
  } else {
    // Track tight bounding box of the visible artwork for trimming.
    const px = (i / channels) % width
    const py = Math.floor(i / channels / width)
    if (px < minX) minX = px
    if (py < minY) minY = py
    if (px > maxX) maxX = px
    if (py > maxY) maxY = py
  }
}

// Small uniform padding around the trimmed artwork (relative to its size).
const pad = Math.round((maxX - minX) * 0.04)
const left = Math.max(0, minX - pad)
const top = Math.max(0, minY - pad)
const cropW = Math.min(width - left, maxX - minX + pad * 2)
const cropH = Math.min(height - top, maxY - minY + pad * 2)

await sharp(data, { raw: { width, height, channels } })
  .extract({ left, top, width: cropW, height: cropH })
  .png()
  .toFile(OUT)

console.log(
  `[v0] transparent logo written: ${cropW}x${cropH} (from ${width}x${height})`,
)
