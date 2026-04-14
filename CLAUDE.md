# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

GTO Poker is a React/Vite single-page app that displays preflop GTO (Game Theory Optimal) ranges for 6-max cash games and tournaments. Users select a game type, stake, stack size, and spot scenario, and the app renders a 13×13 hand matrix colored by raise/call/fold frequencies.

## Commands

```bash
npm run dev      # start Vite dev server (hot reload)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

There are no tests and no linter configured.

## Architecture

### Data flow

`src/ranges/index.js` is the central registry. It exports `gameTypes` (the full hierarchy) and `PFR_SIZES`. The hierarchy is:

```
gameTypes[]
  └── stakes[] (cash only; tournaments skip this level)
        └── stackSizes[]
              └── scenarios[]   ← each has a .data property pointing to a range module
```

`makeScenarios(dataMap)` in `index.js` wires `SCENARIO_DEFS` (the master list of all possible spots) to actual range data modules. Each range module (e.g. `src/ranges/cash_6max/nl100/100bb/rfi/btn.js`) exports a default object with `name`, optional `description`, and a `pfrSizes` map:

```js
{
  name: "BTN RFI",
  pfrSizes: {
    '2.5bb': { raise: "<GTO combo string>", call: "<GTO combo string>" }
  }
}
```

The `raise` field can be either a plain string or an object mapping raise sizes to strings (e.g. `{ '3bb': "...", '7bb': "..." }`) for multi-size scenarios.

### Range parsing (`src/utils/rangeUtils.js`)

`parseRangeString()` auto-detects two formats:
- **GTO solver format** (suit-specific combos): `[pct%]Ah9h, Ad9d[/pct%], AhKd, ...` — combos outside brackets are 100%, inside brackets are at `pct/100`. Aggregated per hand type (pairs: 6, suited: 4, offsuit: 12).
- **Hand notation format**: `AA,KK:0.75,AKs,54s-98s` with optional frequency suffix and range expansion.

Both return `{ [handNotation]: frequency }` maps (0–1).

### 13×13 grid rendering (`src/components/RangeGrid.jsx`)

Rows and columns correspond to `RANKS` (A→2). The grid cell at `[row][col]` maps to:
- diagonal → pair (e.g. AA)
- above diagonal → suited (col > row)
- below diagonal → offsuit (row > col)

Each cell renders a CSS hard-stop gradient (fold/call/raise/raise2 left-to-right). Clicking a mixed-frequency cell opens `DecisionModal`, which randomly samples an action weighted by the frequencies — useful for real-time decision training.

### Scenario variants (hidden scenarios)

Some scenarios have toggleable variants that share the same UI slot but load different data:
- **vs 4b all-in**: `vs_4b_allin_` IDs replace `_vs_4b_` in the active scenario ID.
- **vs sqz RFI folds**: appends `_rfi_fold` to the scenario ID.
- **sqz vs 4b type** (RFI 4b / CC fold / CC call): replaces `_rfi_4b_` with `_folds_`/`_calls_` in the ID.

These variant scenarios are marked `hidden: true` in `SCENARIO_DEFS` so they don't appear in the selector UI.

### Scraper (`scraper/`)

A standalone Node.js (ESM) tool (`scraper/index.js`) that navigates the gtobase.com game tree and writes range files compatible with the app format. It is not part of the Vite build.

**Getting a token**: Log in to gtobase.com, open DevTools → Network, trigger any spot, and copy the `Authorization: Bearer eyJ...` header from a request to `api.gtobase.com/v2/get_strategy`.

**Usage:**

```bash
# Scrape all scenarios for a stake/size/stack combination
node scraper/index.js --token eyJ... --stake nl100 --pfr-size 2.5bb --stack 100

# Scrape a single scenario
node scraper/index.js --token eyJ... --scenario rfi_btn

# Inspect the raw API response at the root node (useful for debugging)
node scraper/index.js --token eyJ... --inspect

# Navigate without writing files
node scraper/index.js --token eyJ... --dry-run
```

Options: `--stake` (nl50|nl100|nl200|nl500, default nl100), `--pfr-size` (2bb|2.25bb|2.5bb|3bb, default 2.5bb), `--stack` (default 100), `--out-dir` (default `scraper/out`).

**How the scraper works:**

- `scraper/lib/paths.js` maps every scenario ID to a sequence of game-tree steps (`'f'`/`'c'`/`'r'`/`'r2'`/`'r3'`) that navigate from the root to the decision point. The path helpers (`rfiPath`, `vs3bPath`, `sqzPath`, etc.) derive these mechanically from position indices.
- `scraper/lib/navigate.js` walks the tree step by step via the API, then calls `extractAllActions()` at the terminal node to collect every non-Fold action's `played` array (1326 per-combo frequencies).
- `scraper/lib/format.js` converts a `played` array into the bracket-format range string (`[pct]combo, ...[/pct]`).
- `scraper/lib/write_output.js` writes (or merges into) the output JS file. If a file already exists it merges new pfr-size entries, preserving previously scraped sizes.
- `scraper/lib/spot_ids.js` maps `(stake, pfrSize)` → numeric API `id`. The id encodes rake + default open sizing.

**Output location:** `scraper/out/<stake>/<stack>bb/<subdir>/<scenario_id>.js`

Subdirectory is inferred from the scenario ID pattern (e.g. `rfi_` → `rfi/`, `_vs_3b_` → `vs3b/`, `_vs_sqz_` → `vs_sqz/`).

**Rate limits:** Two separate limits apply:
- *Per-second*: 220 ms between requests (~5 req/s), enforced per-process. Do **not** run multiple scraper instances in parallel — each has its own timer and they will race on the same API quota.
- *Account quota* (429 "Out of limits"): gtobase enforces a daily/session usage cap. A full 224-scenario run costs ~500–700 API calls (some scenarios require multiple tree hops). Scraping 100bb + 50bb + 40bb consecutively (~800 calls total) hit the quota midway through the 70bb run. Wait for the quota to reset (typically 24h) before resuming.

**Expected failures at short stacks:** Some scenarios don't exist below certain stack depths — the tree only offers Fold/All-in (no non-all-in raise). These error as `No raise(1) in: Fold,Call Xbb` and are expected:
- 50bb: `sqz_rfi_4b` scenarios (20 total)
- 40bb: `sqz_rfi_4b` + `vs_5b` scenarios (29 total)

**Currently scraped data (nl100, 2.5bb):**

| Stack | Scenarios | Notes |
|-------|-----------|-------|
| 100bb | 224/224   | Complete |
| 50bb  | 203/224   | 21 stack-depth failures (expected) |
| 40bb  | 195/224   | 29 stack-depth failures (expected) |
| 70bb  | 178/224   | 46 failures: some stack-depth + quota hit mid-run |
| 150bb | 0/224     | Quota exhausted — not scraped yet |
| 200bb | 0/224     | Quota exhausted — not scraped yet |

The scraper has an in-memory cache so repeated navigations to the same node within a single run don't re-fetch.

**Wiring scraped files into the app:** `src/ranges/index.js` imports can point directly at `scraper/out/` — no copy needed. Vite resolves all imports at build time regardless of location. The only naming difference is RFI files (`scraper/out/.../rfi/rfi_btn.js`), but since you write the import path explicitly that's not an issue.

## Adding new range data

**Via scraper (recommended):**

1. Run the scraper for the target stake/size/stack. Output lands in `scraper/out/`.
2. In `src/ranges/index.js`, add import statements pointing directly at `scraper/out/`:
   ```js
   import nl100_150_rfi_btn from '../../scraper/out/nl100/150bb/rfi/rfi_btn.js'
   import nl100_150_bb_vs_utg from '../../scraper/out/nl100/150bb/vs_rfi/bb_vs_utg.js'
   // ...
   ```
3. Add a `{ id: '150bb', label: '150bb', scenarios: makeScenarios({...}) }` entry to the nl100 `stackSizes` array in `index.js`, following the existing 100bb/50bb pattern.

**Manually:**

1. Create a range file under `src/ranges/<game_type>/<stake>/<stack>/<scenario_type>/` following the existing format.
2. Import it in `src/ranges/index.js` and wire it into `makeScenarios(dataMap)`.
3. If it's a new scenario type, add entries to `SCENARIO_DEFS` at the top of `index.js` first.

**Adding a new stake or pfr-size to the scraper:** add the `(stake, pfrSize) → id` mapping to `scraper/lib/spot_ids.js`. The id can be found by inspecting a live request in gtobase.com DevTools.
