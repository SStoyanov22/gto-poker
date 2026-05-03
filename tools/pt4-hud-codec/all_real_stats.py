#!/usr/bin/env python3
"""Dump every type-1 stat label across the file (alphabetised, deduped)."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')

p = parse_file(SRC)
container = p['root'][1][1][0][1]

labels = set()
for sec in container:
    if sec[0] != 'seq':
        continue
    for field in sec[1]:
        if field[0] != 'seq' or not field[1] or field[1][0][0] != 'i':
            continue
        for slot in field[1][1:]:
            if slot[0] != 'seq' or len(slot[1]) < 6:
                continue
            if slot[1][1][0] == 'i' and slot[1][1][1] == 1:
                if slot[1][0][0] == 'str':
                    labels.add(slot[1][0][1])

for lbl in sorted(labels):
    print(lbl)
