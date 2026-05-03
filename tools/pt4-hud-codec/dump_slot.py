#!/usr/bin/env python3
"""Recursive dump of full slot contents."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')

p = parse_file(SRC)
container = p['root'][1][1][0][1]


def get_stat_list(section_idx):
    sec = container[section_idx]
    for field in sec[1]:
        if field[0] == 'seq' and field[1] and field[1][0][0] == 'i':
            return field[1]
    return None


def short(node, max_str=200):
    if node[0] == 'str':
        s = node[1]
        if len(s) > max_str:
            return f"str({len(s)}: {s[:max_str]!r}...)"
        return f"str({s!r})"
    if node[0] == 'i':
        return f"i({node[1]}, w={node[2]})"
    if node[0] == 'l':
        return f"l(0x{node[1]:08x})"
    if node[0] == 'b':
        return f"b({node[1]})"
    if node[0] == 'f':
        return f"f({node[1]})"
    if node[0] == 'd':
        return f"d({node[1]})"
    if node[0] == 'seq':
        return f"seq[{len(node[1])}]"
    return f"<{node[0]}>"


def dump_recursive(node, indent=0, prefix=""):
    pad = "  " * indent
    print(f"{pad}{prefix}{short(node)}")
    if node[0] == 'seq':
        for i, c in enumerate(node[1]):
            dump_recursive(c, indent+1, f"[{i}] ")


stats_list = get_stat_list(4)
tools_list = get_stat_list(2)
preflop_list = get_stat_list(6)


print("=== Statistics[1] '3Bet Preflop' FULL ===")
dump_recursive(stats_list[1])

print("\n=== Tools[31] 'VPIP' FULL ===")
dump_recursive(tools_list[31])

print("\n=== Statistics[5] 'New Line' FULL ===")
dump_recursive(stats_list[5])

print("\n=== Preflop[9] 'Preflop' header FULL ===")
dump_recursive(preflop_list[9])
