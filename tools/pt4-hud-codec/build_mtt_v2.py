#!/usr/bin/env python3
"""Build mtt-8max-hud-v2.pt4hud with the new MTT main-panel layout:

  Row 1: VPIP / PFR / 3Bet / F3B
  Row 2: CB / FCB / ATS / FS
  Row 3: WTSD / W$SD / AF / Hands

Also adds 3Bet, F3B, CB, FCB to the Player Info section.

How it works: the slot's `field[0]` (label string) IS the PT4 stat lookup key
for type-1 slots. So we clone an existing main-panel slot 12 times and rewrite
field[0] (PT4 stat name) and field[5] (compact display label) per slot.

PT4 stat-name mapping (since some "friendly" names don't exist in this HUD's
stat registry, we substitute the closest available real-stat key):

  Friendly  -> PT4 stat name             | source
  --------  -------------------------    | ---------------------------------
  VPIP      -> 'VPIP'                    | Tools section, real-stat slot
  PFR       -> 'PFR'                     | Tools section
  3Bet      -> '3Bet Preflop'            | already in Statistics[1]
  F3B       -> 'Fold to PF 3Bet After Raise' | already in Statistics[2]
  CB        -> 'CBet Flop'               | already in Statistics[6]
  FCB       -> 'Fold to F CBet'          | already in Statistics[7]
  ATS       -> 'Att To Steal'            | Preflop section (overall, not LP-only)
  FS        -> 'Fold to Steal'           | already in Statistics[12]
  WTSD      -> 'WTSD'                    | Tools section
  W$SD      -> 'WSD'                     | Tools section (Won At Showdown %)
  AF        -> 'Preflop AF'              | Preflop section. Note: there is no
                                            overall AF stat in this HUD's registry;
                                            preflop AF is the closest available.
                                            User can swap to a custom Total AF in
                                            PT4 GUI later.
  Hands     -> 'Hands Abbreviated'       | already in PlayerInfo[3]
                                            (renders as e.g. '5K')
"""
import copy
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file, encode_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')
DST = str(REPO / 'docs/pt4-hud/mtt-8max-hud-v2.pt4hud')
NEW_NAME = 'MTT 8-Max GTO v2'

# (PT4 stat key, short label shown on main panel)
NEW_LAYOUT = [
    # Row 1
    ('VPIP', 'V '),
    ('PFR', 'P '),
    ('3Bet Preflop', '3B '),
    ('Fold to PF 3Bet After Raise', 'F3B '),
    # NewLine
    None,
    # Row 2
    ('CBet Flop', 'CB '),
    ('Fold to F CBet', 'FCB '),
    ('Att To Steal', 'ATS '),
    ('Fold to Steal', 'FS '),
    # NewLine
    None,
    # Row 3
    ('WTSD', 'WTSD '),
    ('WSD', 'W$SD '),
    ('Preflop AF', 'AF '),
    ('Hands Abbreviated', 'H '),
]

# Stats to append to Player Info section (after the existing 6)
PLAYER_INFO_ADD = [
    ('3Bet Preflop', '3B '),
    ('Fold to PF 3Bet After Raise', 'F3B '),
    ('CBet Flop', 'CB '),
    ('Fold to F CBet', 'FCB '),
]


def make_slot(template_slot, stat_key, short_label):
    """Clone a real-stat slot, replacing its label + short label."""
    new = copy.deepcopy(template_slot)
    fields = new[1]
    # field[0] = stat lookup key
    fields[0] = ('str', stat_key)
    # field[5] = compact label rendered on the main panel
    fields[5] = ('str', short_label)
    return new


def make_newline(template_newline):
    return copy.deepcopy(template_newline)


# ---------- Parse cash HUD ----------
p = parse_file(SRC)

# Top-level rename
p['root'] = list(p['root'])
p['root'][0] = ('str', NEW_NAME)

# Drill into the main container
container_seq = list(p['root'][1][1][0][1])
container_seq[0] = ('str', NEW_NAME)

# ---------- Rebuild Statistics section main panel ----------
stats_section = list(container_seq[4][1])
stat_list_seq = list(stats_section[15][1])
assert stat_list_seq[0] == ('i', 14, 4), f"unexpected count: {stat_list_seq[0]}"

# Templates: a real stat (Statistics[1] = '3Bet Preflop') and a NewLine (Statistics[5])
template_stat = stat_list_seq[1]
template_newline = stat_list_seq[5]

new_slots = [stat_list_seq[0]]  # keep the count int; we'll overwrite it
for entry in NEW_LAYOUT:
    if entry is None:
        new_slots.append(make_newline(template_newline))
    else:
        stat_key, short_label = entry
        new_slots.append(make_slot(template_stat, stat_key, short_label))

# Update count to match (14 slots: 12 stats + 2 newlines)
assert len(new_slots) - 1 == 14, f"expected 14 slots, got {len(new_slots)-1}"
new_slots[0] = ('i', 14, 4)

stats_section[15] = ('seq', new_slots)
container_seq[4] = ('seq', stats_section)

# ---------- Rebuild Player Info section ----------
pi_section = list(container_seq[3][1])
pi_list_seq = list(pi_section[15][1])
assert pi_list_seq[0] == ('i', 6, 4), f"unexpected PI count: {pi_list_seq[0]}"

# Reuse the main-panel templates (font/color will match Statistics, which is fine
# since both are panels rendering on the table)
pi_new = list(pi_list_seq)
# Append a NewLine + 4 new stats
pi_new.append(make_newline(template_newline))
for stat_key, short_label in PLAYER_INFO_ADD:
    pi_new.append(make_slot(template_stat, stat_key, short_label))

new_pi_count = (len(pi_new) - 1)  # was 6, now 6 + 1 newline + 4 stats = 11
pi_new[0] = ('i', new_pi_count, 4)

pi_section[15] = ('seq', pi_new)
container_seq[3] = ('seq', pi_section)

# ---------- Sanity check ----------
def slot_summary(slot):
    if slot[0] != 'seq':
        return f"<{slot[0]}>"
    label = slot[1][0][1] if slot[1][0][0] == 'str' else '?'
    type_tag = slot[1][1][1] if slot[1][1][0] == 'i' else '?'
    short = slot[1][5][1] if slot[1][5][0] == 'str' else ''
    kind = {1: 'stat', 2: 'NL', 4: 'lbl'}.get(type_tag, str(type_tag))
    return f"{kind:5s} {label!r:35s} short={short!r}"


print("New Statistics (main panel) layout:")
for i, slot in enumerate(stats_section[15][1]):
    if slot[0] == 'seq':
        print(f"  [{i:2d}] {slot_summary(slot)}")
    elif slot[0] == 'i':
        print(f"  [{i:2d}] count={slot[1]}")

print("\nNew Player Info layout:")
for i, slot in enumerate(pi_section[15][1]):
    if slot[0] == 'seq':
        print(f"  [{i:2d}] {slot_summary(slot)}")
    elif slot[0] == 'i':
        print(f"  [{i:2d}] count={slot[1]}")

# ---------- Encode + write ----------
p['root'][1] = ('seq', [('seq', container_seq)])
out = encode_file(p)
Path(DST).write_bytes(out)
print(f"\nWrote {DST}: {len(out)} bytes (orig {len(p['raw'])} bytes)")

# Round-trip sanity
p2 = parse_file(DST)
out2 = encode_file(p2)
assert out == out2, "Round-trip mismatch on output file"
print("Round-trip on output file: OK")
