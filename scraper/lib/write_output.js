// ── Output Writer ─────────────────────────────────────────────────────────────
//
// Writes scraped range data as a JS module compatible with the app's format.
//
// Output format (nested, with actual sizes as keys):
//
//   export default {
//     name: "BB vs UTG",
//     pfrSizes: {
//       '2.5bb': {
//         raise: { '13bb': "...", '100bb': "..." },
//         call:  { '2.5bb': "..." },
//       },
//     }
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

import { writeFile, mkdir } from 'fs/promises'
import { dirname } from 'path'
import { pathToFileURL } from 'url'

const SIZE_ORDER = ['2bb', '2.25bb', '2.5bb', '3bb']

/**
 * Serialize raise/call fields to JS source (indented at the `entry` level).
 * entry: { raise?: { 'Xbb': "..." }, call?: { 'Ybb': "..." } }
 */
function serializeRaiseCall(entry, indent = '      ') {
  const lines = []
  for (const key of ['raise', 'call']) {
    const val = entry[key]
    if (!val) continue
    if (typeof val === 'string') {
      lines.push(`${indent}${key}: ${JSON.stringify(val)},`)
    } else {
      const inner = Object.entries(val)
        .map(([k, v]) => `${indent}  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
        .join('\n')
      lines.push(`${indent}${key}: {\n${inner}\n${indent}},`)
    }
  }
  return lines.join('\n')
}

/**
 * Serialize a single pfrSize entry to indented JS source.
 * Handles both standard { raise, call } and variant { rfi_4b, cc_fold, cc_call } formats.
 */
function serializeEntry(entry) {
  const VARIANT_KEYS = ['rfi_4b', 'cc_fold', 'cc_call']
  const isVariant = VARIANT_KEYS.some(k => k in entry)

  if (isVariant) {
    const lines = []
    for (const vk of VARIANT_KEYS) {
      if (!entry[vk]) continue
      const inner = serializeRaiseCall(entry[vk], '        ')
      lines.push(`      ${vk}: {\n${inner}\n      },`)
    }
    return lines.join('\n')
  }

  return serializeRaiseCall(entry)
}

/**
 * Write (or merge into) a range file.
 * If the file already exists, new pfrData entries are merged in,
 * preserving any previously scraped pfr sizes.
 *
 * @param {string}  filePath  - absolute path to write
 * @param {string}  name      - human-readable scenario name
 * @param {object}  pfrData   - { '2.5bb': { raise: { 'Xbb': "..." }, call: { 'Ybb': "..." } } }
 */
export async function writeRangeFile(filePath, name, pfrData) {
  await mkdir(dirname(filePath), { recursive: true })

  // Read existing pfrSizes if the file exists (via dynamic import — handles any valid format)
  let existing = {}
  try {
    const mod = await import(pathToFileURL(filePath).href + `?t=${Date.now()}`)
    existing = mod.default?.pfrSizes ?? {}
  } catch {
    // File doesn't exist yet or can't be imported — start fresh
  }

  // Merge: new data overrides existing for the same pfr size
  const merged = { ...existing, ...pfrData }

  // Serialise in canonical size order
  const sizeEntries = SIZE_ORDER
    .filter(s => merged[s])
    .map(size => {
      const body = serializeEntry(merged[size])
      return `    ${JSON.stringify(size)}: {\n${body}\n    },`
    })
    .join('\n')

  const content = `export default {\n  name: ${JSON.stringify(name)},\n  pfrSizes: {\n${sizeEntries}\n  }\n}\n`
  await writeFile(filePath, content, 'utf8')
}
