#!/usr/bin/env python3
"""Survey all slot field values across the file to find any non-trivial content
that could carry per-slot popup config or stack-depth filters.

For each of the 23 slot fields, group every value found across every type-1
slot. If a field is always 0/empty, we know it's unused at the slot level.
If a field has varying values, it might encode something interesting.
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')

p = parse_file(SRC)
container = p['root'][1][1][0][1]


def freeze(node):
    """Hashable rep of a node value (for grouping)."""
    if node[0] in ('str', 'i', 'l', 'b', 'f', 'd'):
        return (node[0], node[1])
    if node[0] == 'seq':
        # represent seq by a digest of its children
        return ('seq', tuple(freeze(c) for c in node[1]))
    return (node[0],)


# Collect all type-1 slots
all_stat_slots = []
for sec in container:
    if sec[0] != 'seq':
        continue
    for field in sec[1]:
        if field[0] != 'seq' or not field[1] or field[1][0][0] != 'i':
            continue
        for slot in field[1][1:]:
            if slot[0] != 'seq' or len(slot[1]) < 23:
                continue
            if slot[1][1][0] == 'i' and slot[1][1][1] == 1:
                all_stat_slots.append(slot)

print(f"Total type-1 slots: {len(all_stat_slots)}")

# For each field index, count distinct values
for fi in range(23):
    values = {}
    for slot in all_stat_slots:
        v = freeze(slot[1][fi])
        values.setdefault(v, 0)
        values[v] += 1
    print(f"\n[{fi:2d}] {len(values)} distinct values")
    for v, count in sorted(values.items(), key=lambda x: -x[1])[:5]:
        # Pretty print
        if v[0] == 'str':
            sample = repr(v[1])[:60]
        elif v[0] == 'l':
            sample = f"l(0x{v[1]:08x})"
        elif v[0] == 'seq':
            sample = f"seq[{len(v[1])}]"
        else:
            sample = f"{v[0]}({v[1] if len(v) > 1 else ''})"
        print(f"     {count:4d}x  {sample}")
