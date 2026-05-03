#!/usr/bin/env python3
"""Dump all 16 fields of the Statistics section to find the popup menu string."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')

p = parse_file(SRC)
container = p['root'][1][1][0][1]


def short(node, max_str=400):
    if node[0] == 'str':
        s = node[1]
        if len(s) > max_str:
            return f"str({len(s)}: {s[:max_str]!r}...)"
        return f"str({s!r})"
    if node[0] == 'i': return f"i({node[1]}, w={node[2]})"
    if node[0] == 'l': return f"l(0x{node[1]:08x})"
    if node[0] == 'b': return f"b({node[1]})"
    if node[0] == 'f': return f"f({node[1]})"
    if node[0] == 'd': return f"d({node[1]})"
    if node[0] == 'seq': return f"seq[{len(node[1])}]"
    return f"<{node[0]}>"


def dump_recursive(node, indent=0, prefix="", max_depth=4):
    pad = "  " * indent
    print(f"{pad}{prefix}{short(node)}")
    if node[0] == 'seq' and indent < max_depth:
        for i, c in enumerate(node[1]):
            dump_recursive(c, indent+1, f"[{i}] ", max_depth)


SECTIONS = {2: 'Tools', 3: 'PlayerInfo', 4: 'Statistics', 5: 'TableStats',
            6: 'Preflop', 7: 'Flop', 8: 'Turn', 9: 'River'}

# Dump non-stat-list fields of every section
for idx, name in SECTIONS.items():
    print(f"\n{'='*60}\n[{idx}] {name}\n{'='*60}")
    sec = container[idx]
    for fi, field in enumerate(sec[1]):
        if fi == 15:
            print(f"  [15] {short(field)}  (stat list — skipped)")
            continue
        print(f"  [{fi:2d}] {short(field)}")
        if field[0] == 'seq' and len(field[1]) <= 10:
            for ci, c in enumerate(field[1]):
                print(f"      [{ci}] {short(c, max_str=300)}")
