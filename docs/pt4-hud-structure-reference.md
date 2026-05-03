# PT4 HUD Structure Reference

## Binary Format (from `tools/pt4-hud-codec/codec.py`)

- **Header**: 4-byte length + UTF-16BE string (profile name)
- **Version**: 4 bytes
- **Body**: Tagged values with types:
  - `s` = string (UTF-16BE)
  - `i` = variable-width int
  - `l` = 32-bit (ARGB colors)
  - `b` = bool
  - `f` = float, `d` = double
  - `<...>` = sequence (nested structure)

## Tree Structure (from `tools/pt4-hud-codec/build_mtt.py`)

```
root[0] = profile name (str)
root[1] = seq containing main container

Container sections (container_seq indices):
  [0] = Profile name again
  [1] = Tools popup (~193 stats)
  [2] = Player Info popup (6 stats)
  [3] = Statistics section (MAIN HUD PANEL)
  [4] = Table Stats
  [5] = Preflop popup (~161 stats)
  [6] = Flop popup (~136 stats)
  [7] = Turn popup (~136 stats)
  [8] = River popup (~136 stats)
```

Note: The build script accesses `container_seq[4]` for Statistics — indexing may be off-by-one from the comment. Verify by parsing.

## Main Panel Stat Structure (Statistics Section)

```
stats_section[15] = stat list sequence
stat_list_seq[0] = count (int, value=14 for 12 stats + 2 newlines)

Layout indices:
  [1..4]  = Row 1 stats
  [5]     = NewLine separator
  [6..9]  = Row 2 stats
  [10]    = NewLine separator
  [11..14] = Row 3 stats
```

**Each stat slot** is a sequence where:
- `slot[1][0][1]` = stat name/label

## Current Main HUD Layout (Cash 6max NL100)

```
Row 1: 3B / F3B / 4B+ / F4B      (preflop aggression)
Row 2: CB / FCB / TCB / FTCB     (c-bet)
Row 3: LPS / FS / 3LPS / S&F     (steal)
```

## Current MTT 8-Max Layout (rows 2 & 3 swapped)

```
Row 1: 3B / F3B / 4B+ / F4B
Row 2: LPS / FS / 3LPS / S&F     (steal - promoted)
Row 3: CB / FCB / TCB / FTCB     (c-bet)
```

## Desired New MTT Layout

```
Row 1: VPIP / PFR / 3Bet / F3B
Row 2: CB / FCB / ATS / FS
Row 3: WTSD / W$SD / AF / Hands
```

## Additional Requirements

1. **Per-stat popups**: Each main stat should have its own focused popup with related stats + stack-size breakdowns (instead of shared tabbed popups)

2. **Player Info section**: Add 3Bet, F3B, CB, FCB

3. **Stack-size breakdowns in popups**: Each popup should include that stat split by stack depth (e.g., 10-20bb, 20-30bb, 30-50bb, 50bb+)

## Key Challenges

1. **Stats not in main panel**: VPIP, PFR, WTSD, W$SD, Hands, AF exist in popup sections, not the main panel. Need to extract their definitions from popups and copy to main panel.

2. **Popup structure**: Each main panel stat has a popup menu string like `TTL:Tools\tPOP:Tools\nTTL:Preflop\tPOP:Preflop\n...` that defines which tabs appear. Need to rewire these for per-stat focused popups.

3. **Stat definition fields**: Each stat slot has ~23 fields (colors, font, format string, etc.). Need to preserve these when moving stats.

## Available Tools

- `tools/pt4-hud-codec/codec.py` - parses and encodes the binary format (round-trips byte-for-byte)
- `tools/pt4-hud-codec/build_mtt.py` - current build script that swaps rows
- **Node.js v24 available** (Python is NOT available on this system)
- Could port codec to JavaScript for manipulation

## File Locations

- Source HUD: `docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud`
- Current MTT HUD: `docs/pt4-hud/mtt-8max-hud.pt4hud`
- Design doc: `docs/pt4-mtt-hud-design.md`
