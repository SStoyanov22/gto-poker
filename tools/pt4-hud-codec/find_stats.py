#!/usr/bin/env python3
"""Find type-1 (real-stat) slots matching our target labels."""
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

# Stats we want for the NEW main MTT panel layout
WANT = {
    'VPIP': 'VPIP',
    'PFR': 'PFR',
    '3Bet Preflop': '3Bet',
    'Fold to PF 3Bet After Raise': 'F3B',
    'CBet Flop': 'CB',
    'Fold to F CBet': 'FCB',
    'Att To Steal': 'ATS',         # may be 'Att To Steal' (overall) or '...- LP'
    'Att To Steal - LP': 'ATS-LP',
    'Fold to Steal': 'FS',
    'Went to Showdown': 'WTSD',
    'Won At Showdown': 'W$SD?',    # gtobase docs say W$SD = Won $ at Showdown — may be different name
    'Won $ at Showdown': 'W$SD',
    'Won $ When Saw Showdown': 'W$SD?',
    'Total Aggression Factor': 'AF',
    'Aggression Factor': 'AF',
    'Hands': 'Hands',
    'Total Hands': 'Hands',
    'Hands Played': 'Hands',
}

found = {}  # label -> [(section_name, slot_idx, fg_color, short_label)]

for idx, name in SECTIONS.items():
    sec = container[idx]
    for field in sec[1]:
        if field[0] != 'seq' or not field[1] or field[1][0][0] != 'i':
            continue
        kids = field[1]
        for si, slot in enumerate(kids[1:], start=1):
            if slot[0] != 'seq' or len(slot[1]) < 6:
                continue
            label = slot[1][0][1] if slot[1][0][0] == 'str' else None
            type_tag = slot[1][1][1] if slot[1][1][0] == 'i' else None
            if type_tag != 1:
                continue  # only real stats
            short = slot[1][5][1] if slot[1][5][0] == 'str' else ''
            fg = slot[1][2][1] if slot[1][2][0] == 'l' else 0
            found.setdefault(label, []).append((name, si, fg, short))

# Show all real-stat labels (so we can match unfamiliar names)
all_labels = sorted(set(found.keys()))
print(f"Total distinct real-stat labels in file: {len(all_labels)}")

# Print labels that look relevant
keywords = ['vpip', 'pfr', 'agress', 'hand', 'showdown', 'wtsd', 'wsd', 'won',
            'steal', 'cbet', 'cbcb', '3bet', 'fold to', 'att to', 'limp',
            'check raise', 'wwsf', 'af', 'afq']

print("\n=== Relevant real-stat labels ===")
for lbl in all_labels:
    if any(k in lbl.lower() for k in keywords):
        occs = found[lbl]
        print(f"  {lbl!r}: {len(occs)} occurrences")
        for sec_name, si, fg, short in occs[:3]:
            print(f"    {sec_name}[{si:3d}] fg=0x{fg:08x} short={short!r}")
        if len(occs) > 3:
            print(f"    ... ({len(occs)-3} more)")
