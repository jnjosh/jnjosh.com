#!/usr/bin/env node
// Generates the site's icon set into static/ from scripts/j-block.svg.
//
//   node scripts/make-icons.mjs
//
// Dev-only, and macOS-only: it rasterises through Quick Look (`qlmanage`) and resamples with
// `sips`, so it needs no dependencies and no network. Production still builds with `hugo`
// alone — the output is committed. 
//
// Source mark: scripts/j-block.svg, exported from the Noun Project as np_j-shape_853331,
// under a Noun Project Pro plan — royalty-free, no attribution required.

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync, mkdirSync, copyFileSync } from 'node:fs'
import { deflateSync, inflateSync } from 'node:zlib'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const STATIC = join(root, 'static')
const BG = '#0067a9' 
const FG = '#ffffff'

/* ---------------------------------------------------------------- the mark */

// The source is a single path: subpath 0 is the outer contour of the whole J, subpaths 1-6
// are the cube faces punched out of it. Separating them is what lets the icon be a SOLID
// silhouette with the faces painted back on as shading — the hollow original averages out to
// a pale smudge at 16px, which is most of where a favicon is actually looked at.
//
// Each face's `m` is relative to the previous subpath's start (`z` returns the current point
// there), so the chain is walked to turn them into absolute `M`s.
const src = readFileSync(join(root, 'scripts', 'j-block.svg'), 'utf8')
const d = src.match(/\sd="([^"]+)"/)[1].trim()
const subpaths = d.split(/(?=[Mm])/).filter(s => s.trim())
const SILHOUETTE = subpaths[0]
let cur = subpaths[0].match(/^m(-?[\d.]+)\s+(-?[\d.]+)/).slice(1, 3).map(Number)
const FACES = subpaths.slice(1).map(sp => {
  const [, dx, dy, rest] = sp.match(/^m(-?[\d.]+)\s*(-?[\d.]+)(.*)$/s)
  cur = [cur[0] + Number(dx), cur[1] + Number(dy)]
  return `M${round(cur[0])} ${round(cur[1])}${rest}`
}).join('')

// The glyph's bounding box in the source's 100x100 user space, measured off a 1024px render
// rather than eyeballed — every scale and offset below is derived from it.
const BB = { x: 25.586, y: 7.324, w: 49.805, h: 85.352 }

function round(v) { return +v.toFixed(3) }

// `height` is the glyph's height as a fraction of the canvas; `shade` is how strongly the cube
// faces read against the white silhouette. Small sizes want a bigger, flatter glyph — an
// optical size, the same reason a 6pt typeface is not an 11pt one scaled down.
function markSVG({ size, height, shade, radius = 0 }) {
  const s = (size * height) / BB.h
  const tx = (size - BB.w * s) / 2 - BB.x * s
  const ty = (size - BB.h * s) / 2 - BB.y * s
  const rx = radius ? ` rx="${round(size * radius)}"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="jnjosh">
  <rect width="${size}" height="${size}"${rx} fill="${BG}"/>
  <g transform="translate(${round(tx)} ${round(ty)}) scale(${round(s)})">
    <path fill="${FG}" d="${SILHOUETTE}"/>
    <path fill="${BG}" fill-opacity="${shade}" d="${FACES}"/>
  </g>
</svg>
`
}

/* ------------------------------------------------------------------- PNG io */

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
function crc(buf) {
  let c = 0xffffffff
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(body))
  return Buffer.concat([len, body, c])
}

function decodePNG(file) {
  const buf = readFileSync(file)
  let pos = 8, w = 0, h = 0, depth = 0, colorType = 0
  const idat = []
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    const type = buf.toString('ascii', pos + 4, pos + 8)
    const data = buf.subarray(pos + 8, pos + 8 + len)
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4); depth = data[8]; colorType = data[9]
      if (data[12] !== 0) throw new Error('interlaced PNG unsupported')
    } else if (type === 'IDAT') idat.push(data)
    else if (type === 'IEND') break
    pos += 12 + len
  }
  if (depth !== 8) throw new Error(`unsupported bit depth ${depth}`)
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType]
  if (!channels) throw new Error(`unsupported color type ${colorType}`)
  const raw = inflateSync(Buffer.concat(idat))
  const stride = w * channels
  const flat = Buffer.alloc(h * stride)
  const paeth = (a, b, c) => {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
  }
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)]
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1))
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? flat[y * stride + x - channels] : 0
      const b = y > 0 ? flat[(y - 1) * stride + x] : 0
      const c = x >= channels && y > 0 ? flat[(y - 1) * stride + x - channels] : 0
      let v = line[x]
      if (f === 1) v += a
      else if (f === 2) v += b
      else if (f === 3) v += (a + b) >> 1
      else if (f === 4) v += paeth(a, b, c)
      flat[y * stride + x] = v & 0xff
    }
  }
  const rgba = Buffer.alloc(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    const j = i * channels
    let r, g, b, a = 255
    if (channels === 4) { r = flat[j]; g = flat[j + 1]; b = flat[j + 2]; a = flat[j + 3] }
    else if (channels === 3) { r = flat[j]; g = flat[j + 1]; b = flat[j + 2] }
    else if (channels === 2) { r = g = b = flat[j]; a = flat[j + 1] }
    else { r = g = b = flat[j] }
    rgba.set([r, g, b, a], i * 4)
  }
  return { w, h, rgba }
}

function encodePNG({ w, h, rgba }) {
  const raw = Buffer.alloc(h * (w * 4 + 1))
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4)
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* --------------------------------------------------------------- rasterising */

const work = mkdtempSync(join(tmpdir(), 'jnjosh-icons-'))

// Quick Look flattens onto white, so the badge is rasterised as a full square and the corner
// radius is cut afterwards in `mask()` — otherwise the rounded corners come back as white
// pips, which is exactly what shows up on a dark tab strip.
//
// It also only honours `-s` faithfully at large sizes: asked for 64 it drew the art a quarter
// scale into the corner and the 16px favicon shipped blank. So everything renders at 512 (1024
// above that) and is resampled down by `sips`, and `corners()` refuses to let that fail quietly
// a second time.
function raster(name, size, opts) {
  const superSize = size > 512 ? 1024 : 512
  const svg = join(work, `${name}.svg`)
  writeFileSync(svg, markSVG({ ...opts, size: superSize, radius: 0 }))
  execFileSync('qlmanage', ['-t', '-s', String(superSize), '-o', work, svg], { stdio: 'ignore' })
  const out = join(work, `${name}.png`)
  copyFileSync(join(work, `${name}.svg.png`), out)
  if (superSize !== size) execFileSync('sips', ['-z', String(size), String(size), out], { stdio: 'ignore' })
  const img = decodePNG(out)
  corners(name, img)
  return img
}

// The badge is full-bleed at this stage, so all four corners must be the accent. Anything else
// means the rasteriser mis-scaled and the icon is quietly wrong.
function corners(name, { w, h, rgba }) {
  const bg = [parseInt(BG.slice(1, 3), 16), parseInt(BG.slice(3, 5), 16), parseInt(BG.slice(5, 7), 16)]
  for (const [x, y] of [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]]) {
    const i = (y * w + x) * 4
    const off = bg.some((c, k) => Math.abs(rgba[i + k] - c) > 12)
    if (off || rgba[i + 3] < 250) {
      throw new Error(`${name}: corner (${x},${y}) is rgba(${[...rgba.subarray(i, i + 4)]}), expected the accent — rasteriser mis-scaled`)
    }
  }
}

// Antialiased rounded-rect alpha, sampled 4x4 per pixel.
function mask(img, radiusRatio) {
  if (!radiusRatio) return img
  const { w, h, rgba } = img
  const r = w * radiusRatio
  const inside = (x, y) => {
    const dx = Math.max(r - x, x - (w - r), 0)
    const dy = Math.max(r - y, y - (h - r), 0)
    return dx * dx + dy * dy <= r * r
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let hits = 0
    for (let sy = 0; sy < 4; sy++) for (let sx = 0; sx < 4; sx++) {
      if (inside(x + (sx + 0.5) / 4, y + (sy + 0.5) / 4)) hits++
    }
    const i = (y * w + x) * 4 + 3
    rgba[i] = Math.round((rgba[i] * hits) / 16)
  }
  return img
}

/* ---------------------------------------------------------------------- ICO */

// PNG-compressed entries: every browser since IE11 reads them, and it keeps the file at ~2KB
// instead of the ~15KB an uncompressed BMP set would cost.
function ico(images) {
  const pngs = images.map(encodePNG)
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + 16 * pngs.length
  const entries = pngs.map((png, i) => {
    const e = Buffer.alloc(16)
    e[0] = images[i].w % 256; e[1] = images[i].h % 256
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6)
    e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12)
    offset += png.length
    return e
  })
  return Buffer.concat([header, ...entries, ...pngs])
}

/* -------------------------------------------------------------------- build */

mkdirSync(STATIC, { recursive: true })

// The vector, used by every modern browser that is handed one.
writeFileSync(join(STATIC, 'icon.svg'), markSVG({ size: 512, height: 0.74, shade: 0.18, radius: 0.22 }))

// The .ico, for Safari and anything older. 16 gets the optical size.
writeFileSync(join(STATIC, 'favicon.ico'), ico([
  mask(raster('ico16', 16, { height: 0.80, shade: 0.12 }), 0.22),
  mask(raster('ico32', 32, { height: 0.74, shade: 0.16 }), 0.22),
  mask(raster('ico48', 48, { height: 0.74, shade: 0.18 }), 0.22),
]))

// Home-screen icons are full-bleed squares with the glyph inside the safe area: iOS applies
// its own squircle, and Android's maskable spec crops 10% off every edge.
writeFileSync(join(STATIC, 'apple-touch-icon.png'), encodePNG(raster('apple', 180, { height: 0.62, shade: 0.18 })))
writeFileSync(join(STATIC, 'icon-192.png'), encodePNG(raster('a192', 192, { height: 0.62, shade: 0.18 })))
writeFileSync(join(STATIC, 'icon-512.png'), encodePNG(raster('a512', 512, { height: 0.62, shade: 0.18 })))

rmSync(work, { recursive: true, force: true })
console.log('wrote icon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png to static/')
