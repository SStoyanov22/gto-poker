#!/usr/bin/env python3
"""Build mtt-8max-hud.pt4hud by cloning the cash NL100 HUD and:
  1. Renaming the profile to "MTT 8-Max GTO"
  2. Swapping rows 2 and 3 of the main HUD panel (Statistics section)
     so steal/resteal pressure sits above c-bet stats.

Original layout:
  Row 1: 3B / F3B / 4B+ / F4B    (preflop aggression)
  Row 2: CB / FCB / TCB / FTCB   (c-bet)
  Row 3: LPS / FS / 3LPS / S&F   (steal)

New MTT layout:
  Row 1: 3B / F3B / 4B+ / F4B
  Row 2: LPS / FS / 3LPS / S&F   <-- promoted
  Row 3: CB / FCB / TCB / FTCB
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file, encode_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')
DST = str(REPO / 'docs/pt4-hud/mtt-8max-hud.pt4hud')
NEW_NAME = 'MTT 8-Max GTO'

p = parse_file(SRC)

# Rename in the two places it appears
assert p['root'][0][0] == 'str'
p['root'] = list(p['root'])
p['root'][0] = ('str', NEW_NAME)

# Drill: root[1] -> seq[0] -> seq[0] is the container with sections
container_seq = p['root'][1][1][0][1]
container_seq = list(container_seq)
assert container_seq[0][0] == 'str'
container_seq[0] = ('str', NEW_NAME)

# Statistics section is index 4 (0-indexed: Tools, Player Info, Statistics, Table Stats, Preflop, Flop, Turn, River)
stats_section = list(container_seq[4][1])
# field [15] is the stat-list seq
stat_list_seq = list(stats_section[15][1])
assert stat_list_seq[0] == ('i', 14, 4), f"unexpected count: {stat_list_seq[0]}"

# Indices 1..14 are the 14 stat slots (with NewLine separators at 5 and 10).
# Original: [1..4]=row1 [5]=NL [6..9]=row2 [10]=NL [11..14]=row3
# Target:   [1..4]=row1 [5]=NL [11..14]=row2 [10]=NL [6..9]=row3
new_list = stat_list_seq[:]
new_list[6:10] = stat_list_seq[11:15]   # row2 <- old row3
new_list[11:15] = stat_list_seq[6:10]   # row3 <- old row2

# Sanity: confirm slot names are correct
def slot_name(slot):
    return slot[1][0][1] if slot[0] == 'seq' else '?'

print("New stat order:")
for i, slot in enumerate(new_list):
    if slot[0] == 'seq':
        print(f"  [{i:2d}] {slot_name(slot)!r}")
    elif slot[0] == 'i':
        print(f"  [{i:2d}] count={slot[1]}")

# Rebuild tree: list -> tuple
stats_section[15] = ('seq', new_list)
container_seq[4] = ('seq', stats_section)

# Push lists back as tuples (encoder expects tuple-like)
p['root'][1] = ('seq', [('seq', container_seq)])

out = encode_file(p)
Path(DST).write_bytes(out)
print(f"\nWrote {DST}: {len(out)} bytes (orig {len(p['raw'])} bytes)")

# Round-trip sanity: re-parse and confirm clean
p2 = parse_file(DST)
out2 = encode_file(p2)
assert out == out2, "Round-trip mismatch on output file"
print("Round-trip on output file: OK")
