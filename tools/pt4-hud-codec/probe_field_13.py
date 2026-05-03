#!/usr/bin/env python3
"""Probe per-slot fields [13] and [15] (which had 7 distinct values).

Goal: figure out if these encode a per-slot popup-section pointer.
If yes: a value of N might mean "click opens section index N as the popup".
If those values change between e.g. CBet Flop and 3Bet Preflop, that supports
the hypothesis. If they don't, [13]/[15] encode something else (probably
formatting flags).
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')

p = parse_file(SRC)
container = p['root'][1][1][0][1]

SECTIONS = {2: 'Tools', 3: 'PlayerInfo', 4: 'Statistics',
            6: 'Preflop', 7: 'Flop', 8: 'Turn', 9: 'River'}

# Walk every type-1 slot and report (section, idx, label, field13, field15)
print(f"{'section':12s} {'idx':>4s}  {'label':40s}  {'fld13':>6s} {'fld15':>6s}")
for sec_idx, name in SECTIONS.items():
    sec = container[sec_idx]
    for field in sec[1]:
        if field[0] != 'seq' or not field[1] or field[1][0][0] != 'i':
            continue
        for si, slot in enumerate(field[1][1:], start=1):
            if slot[0] != 'seq' or len(slot[1]) < 23:
                continue
            if slot[1][1][0] != 'i' or slot[1][1][1] != 1:
                continue
            label = slot[1][0][1] if slot[1][0][0] == 'str' else '?'
            f13 = slot[1][13][1] if slot[1][13][0] == 'i' else None
            f15 = slot[1][15][1] if slot[1][15][0] == 'i' else None
            # only print non-zero or main-panel slots so output is readable
            if name == 'Statistics' or (f13 != 0 or f15 != 0):
                print(f"{name:12s} [{si:3d}]  {label[:40]:40s}  {f13!s:>6s} {f15!s:>6s}")
