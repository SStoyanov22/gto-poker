#!/usr/bin/env python3
"""Inspect the cash NL100 HUD."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')

p = parse_file(SRC)

container = p['root'][1][1][0][1]

SECTIONS = {2: 'Tools', 3: 'PlayerInfo', 4: 'Statistics', 5: 'TableStats',
            6: 'Preflop', 7: 'Flop', 8: 'Turn', 9: 'River'}


def find_stat_list(section_seq):
    for fi, field in enumerate(section_seq[1]):
        if field[0] != 'seq' or not field[1]:
            continue
        first = field[1][0]
        if first[0] == 'i' and len(field[1]) >= 2:
            return fi, first[1], field[1]
    return None


def slot_label(slot):
    try:
        if slot[0] == 'seq':
            inner = slot[1][0]
            if inner[0] == 'str':
                return inner[1]
    except (IndexError, TypeError):
        pass
    return None


def slot_child_count(slot):
    if slot[0] == 'seq':
        return len(slot[1])
    return 0


# For each section, group slots by child-count to spot the real stats
for idx, name in SECTIONS.items():
    sec = container[idx]
    info = find_stat_list(sec)
    if not info:
        continue
    field_idx, count, kids = info

    # Stats vs separators by child count
    by_count = {}
    for si, slot in enumerate(kids[1:], start=1):
        n = slot_child_count(slot)
        by_count.setdefault(n, []).append((si, slot_label(slot)))

    print(f"\n[{idx}] {name}: count={count}")
    for n, entries in sorted(by_count.items()):
        print(f"  child_count={n}: {len(entries)} slots")
        # show first few labels for each child-count bucket
        for si, label in entries[:5]:
            print(f"    [{si:3d}] {label!r}")
        if len(entries) > 5:
            print(f"    ... ({len(entries)-5} more)")
