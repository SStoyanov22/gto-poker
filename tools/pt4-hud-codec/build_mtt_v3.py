#!/usr/bin/env python3
"""Build mtt-8max-hud-v3.pt4hud:

Main panel (Statistics):
  Row 1: 3B  / F3B / 4B+ / F4B   (preflop aggression)
  Row 2: CB  / FCB / ATS / FS    (c-bet + steal)
  Row 3: WTSD / W$SD / AF / Hands (showdown)

Player Info: original 6 slots (Note Editor / Player Name Short / Hands Abbreviated / NewLine / VPIP / PFR).

Focused popup tabs (replacing Tools/Preflop/Flop/Turn content):
  Preflop  - VPIP, PFR, 3Bet, F3B, 4B+, F4B with by-position breakdowns
  Steal    - ATS, Fold-Steal-to-3Bet, Fold-Blind-to-Steal, Call Steal, 3Bet Steal
  C-Bet    - CB, FCB, Call CBet on Flop with IP/OOP and 3-bet pot variants
  Showdown - WTSD, W$SD (WSD), WWSF + Preflop/Flop/Turn/River AF

The popup section[5] menu string at Statistics + PlayerInfo is updated to:
  TTL:Preflop\\tPOP:Tools\\nTTL:Steal\\tPOP:Preflop\\nTTL:C-Bet\\tPOP:Flop\\nTTL:Showdown\\tPOP:Turn\\n

NOTE on architecture: PT4's .pt4hud format has the popup tab list at section
level, not per-slot — verified by surveying all 23 slot fields across 345
type-1 stats. So all main-panel stats share the same shared popup, but with
this build the popup CONTENT is curated per row of the main panel.
"""
import copy
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from codec import parse_file, encode_file

REPO = Path(__file__).resolve().parents[2]
SRC = str(REPO / 'docs/pt4-hud/Cash - GTO Cash 6max NL100.pt4hud')
DST = str(REPO / 'docs/pt4-hud/mtt-8max-hud-v3.pt4hud')
NEW_NAME = 'MTT 8-Max GTO v3'

# Container indices in this HUD's structure
TOOLS, PLAYER_INFO, STATISTICS, _TBL, PREFLOP, FLOP, TURN, RIVER = 2, 3, 4, 5, 6, 7, 8, 9

# New popup menu string (4 focused tabs)
NEW_POPUP_MENU = (
    'TTL:Preflop\tPOP:Tools\n'
    'TTL:Steal\tPOP:Preflop\n'
    'TTL:C-Bet\tPOP:Flop\n'
    'TTL:Showdown\tPOP:Turn\n'
)


def get_stat_list(container, sec_idx):
    """Return (section_seq_field_idx, full stat-list children list)."""
    sec = container[sec_idx]
    for fi, field in enumerate(sec[1]):
        if field[0] == 'seq' and field[1] and field[1][0][0] == 'i':
            return fi, field[1]
    raise ValueError(f"no stat list in section {sec_idx}")


def clone_range(container, sec_idx, lo, hi):
    """Deep-copy slots [lo..hi] inclusive from a section's stat list."""
    _, kids = get_stat_list(container, sec_idx)
    return [copy.deepcopy(kids[i]) for i in range(lo, hi + 1)]


def slot_label(slot):
    if slot[0] == 'seq' and slot[1] and slot[1][0][0] == 'str':
        return slot[1][0][1]
    return '?'


def build_section(container, sec_idx, new_slots):
    """Replace the stat list of section sec_idx with new_slots (excluding count int).
    Updates the count int automatically.
    """
    sec = container[sec_idx]
    fields = list(sec[1])
    field_idx, _ = get_stat_list(container, sec_idx)
    new_list = [('i', len(new_slots), 4)] + new_slots
    fields[field_idx] = ('seq', new_list)
    container[sec_idx] = ('seq', fields)


def set_section_popup_menu(container, sec_idx, menu_str):
    """Replace section[5] (popup tab menu string)."""
    sec = container[sec_idx]
    fields = list(sec[1])
    fields[5] = ('str', menu_str)
    container[sec_idx] = ('seq', fields)


# ---------- Parse cash HUD ----------
p = parse_file(SRC)
p['root'] = list(p['root'])
p['root'][0] = ('str', NEW_NAME)
container = list(p['root'][1][1][0][1])
container[0] = ('str', NEW_NAME)

# ---------- Statistics main panel ----------
# Templates from existing Statistics slots: a real stat (slot 1) and NL (slot 5)
_, stats_kids = get_stat_list(container, STATISTICS)
template_stat = stats_kids[1]
template_newline = stats_kids[5]


def make_main_stat(stat_key, short_label):
    s = copy.deepcopy(template_stat)
    fields = s[1]
    fields[0] = ('str', stat_key)
    fields[5] = ('str', short_label)
    return s


def make_newline():
    return copy.deepcopy(template_newline)


MAIN_PANEL_LAYOUT = [
    # Row 1: preflop aggression (the original cash 6max row 1)
    ('3Bet Preflop', '3B '),
    ('Fold to PF 3Bet After Raise', 'F3B '),
    ('4Bet+ Preflop After Raising', '4B+ '),
    ('Fold to PF 4Bet After 3Bet', 'F4B '),
    None,  # NewLine
    # Row 2: c-bet + steal hybrid
    ('CBet Flop', 'CB '),
    ('Fold to F CBet', 'FCB '),
    ('Att To Steal', 'ATS '),
    ('Fold to Steal', 'FS '),
    None,  # NewLine
    # Row 3: showdown summary
    ('WTSD', 'WTSD '),
    ('WSD', 'W$SD '),
    ('Preflop AF', 'AF '),
    ('Hands Abbreviated', 'H '),
]

new_main_slots = []
for entry in MAIN_PANEL_LAYOUT:
    if entry is None:
        new_main_slots.append(make_newline())
    else:
        new_main_slots.append(make_main_stat(*entry))

build_section(container, STATISTICS, new_main_slots)
set_section_popup_menu(container, STATISTICS, NEW_POPUP_MENU)

# ---------- Player Info: revert to ORIGINAL 6 slots ----------
# We re-parse the source file's PlayerInfo (untouched in v2 anyway) and just
# refresh its popup menu string to the new tab list.
set_section_popup_menu(container, PLAYER_INFO, NEW_POPUP_MENU)
# (no slot changes — original 6 slots preserved)

# ---------- Tab 1: "Preflop" (replaces Tools content) ----------
preflop_tab = []
preflop_tab += clone_range(container, TOOLS, 15, 29)   # NL + 'Preflop' header + position columns
preflop_tab += clone_range(container, TOOLS, 30, 38)   # VPIP row (label + overall + 6 pos)
preflop_tab += [make_newline()]
preflop_tab += clone_range(container, TOOLS, 40, 48)   # PFR row
preflop_tab += [make_newline()]
preflop_tab += clone_range(container, TOOLS, 60, 68)   # 3Bet Preflop row
preflop_tab += [make_newline()]
preflop_tab += clone_range(container, TOOLS, 80, 87)   # F3B row (8 slots — no spacer position)
preflop_tab += [make_newline()]
preflop_tab += clone_range(container, TOOLS, 90, 97)   # 4Bet+ row
preflop_tab += [make_newline()]
preflop_tab += clone_range(container, TOOLS, 100, 107) # F4B row
build_section(container, TOOLS, preflop_tab)

# ---------- Tab 2: "Steal" (replaces Preflop section content) ----------
steal_tab = []
# Reuse the existing Preflop section's CO/BTN/SB/BB column header (Preflop[105..112])
steal_tab += clone_range(container, PREFLOP, 100, 112)  # NL + Steal header + CO/BTN/SB/BB columns
steal_tab += clone_range(container, PREFLOP, 113, 117)  # Att To Steal label + overall + 3 pos
steal_tab += [make_newline()]
steal_tab += clone_range(container, PREFLOP, 120, 124)  # Fold-Steal-to-3Bet (S&F)
steal_tab += [make_newline()]
steal_tab += clone_range(container, PREFLOP, 127, 131)  # Fold-Blind-to-Steal
steal_tab += [make_newline()]
steal_tab += clone_range(container, PREFLOP, 133, 137)  # Call Steal
steal_tab += [make_newline()]
steal_tab += clone_range(container, PREFLOP, 139, 143)  # 3Bet Steal (resteal)
build_section(container, PREFLOP, steal_tab)

# ---------- Tab 3: "C-Bet" (replaces Flop section content) ----------
cbet_tab = []
# Aggression factor headers + "Flop / Bets / Calls / Folds" header row from Flop section
cbet_tab += clone_range(container, FLOP, 1, 14)   # Player + AF / AFq + bets/calls/folds row
# Flop CBet / Call / Fold row (overall)
cbet_tab += clone_range(container, FLOP, 22, 27)  # CBet / Call CBet / Fold to CBet
cbet_tab += [make_newline()]
# IP / OOP CBet variants
cbet_tab += clone_range(container, FLOP, 78, 86)  # CBet IP/OOP + Call CBet IP/OOP
cbet_tab += [make_newline()]
# 3Bet Pot vs Non-3Bet Pot variants
cbet_tab += clone_range(container, FLOP, 90, 92)  # 3Bet+ Pots / Non-3Bet Pots column header
cbet_tab += [make_newline()]
cbet_tab += [make_newline()]
cbet_tab += clone_range(container, FLOP, 96, 100) # CBet 3bet+ vs non-3bet+
cbet_tab += [make_newline()]
cbet_tab += clone_range(container, FLOP, 102, 106) # Call CBet 3bet+ vs non-3bet+
cbet_tab += [make_newline()]
cbet_tab += clone_range(container, FLOP, 114, 118) # Fold to CBet 3bet+ vs non-3bet+
build_section(container, FLOP, cbet_tab)

# ---------- Tab 4: "Showdown" (replaces Turn section content) ----------
# Compose: WWSF / WTSD / WSD from Tools[8..14] + AF stats per street
showdown_tab = []
showdown_tab += clone_range(container, TOOLS, 1, 14)  # Player + BB/100 + WWSF / WTSD / WSD
showdown_tab += [make_newline()]
showdown_tab += [make_newline()]
# AF / AFq from each street section
showdown_tab += clone_range(container, PREFLOP, 1, 5)  # Preflop AF + AFq
showdown_tab += [make_newline()]
showdown_tab += clone_range(container, FLOP, 1, 5)     # (this references the freshly-rebuilt
# Flop section so it works after we already rebuilt FLOP. But we already replaced FLOP[1..14]
# with our cbet_tab content — the new Flop[1..5] is "Player + Flop AF + Flop AFq" since we
# cloned Flop[1..14] from the original. Verify with print.)
showdown_tab += [make_newline()]
showdown_tab += clone_range(container, TURN, 1, 5)
showdown_tab += [make_newline()]
showdown_tab += clone_range(container, RIVER, 1, 5)
build_section(container, TURN, showdown_tab)

# ---------- Print summary ----------
def slot_summary(slot):
    if slot[0] != 'seq':
        return f"<{slot[0]}>"
    label = slot_label(slot)
    type_tag = slot[1][1][1] if slot[1][1][0] == 'i' else '?'
    short = slot[1][5][1] if slot[1][5][0] == 'str' else ''
    kind = {1:'stat', 2:'NL', 4:'lbl'}.get(type_tag, str(type_tag))
    return f"{kind:5s} {label!r:35s} short={short!r}"


def print_section(name, sec_idx):
    _, kids = get_stat_list(container, sec_idx)
    print(f"\n--- {name} (section {sec_idx}, {len(kids)-1} slots) ---")
    for i, slot in enumerate(kids):
        if slot[0] == 'seq':
            print(f"  [{i:3d}] {slot_summary(slot)}")
        elif slot[0] == 'i':
            print(f"  [{i:3d}] count={slot[1]}")


print_section("Statistics (main panel)", STATISTICS)
print_section("Player Info", PLAYER_INFO)
# popups can be long — only summarize counts
for name, idx in [("Tools (= Preflop tab)", TOOLS),
                  ("Preflop (= Steal tab)", PREFLOP),
                  ("Flop (= C-Bet tab)", FLOP),
                  ("Turn (= Showdown tab)", TURN)]:
    _, kids = get_stat_list(container, idx)
    real = sum(1 for s in kids[1:] if s[0]=='seq' and s[1][1][0]=='i' and s[1][1][1]==1)
    print(f"\n[{name}] {len(kids)-1} total slots, {real} real stats")

# ---------- Encode + write ----------
p['root'][1] = ('seq', [('seq', container)])
out = encode_file(p)
Path(DST).write_bytes(out)
print(f"\nWrote {DST}: {len(out)} bytes (orig {len(p['raw'])} bytes)")

# Round-trip sanity
p2 = parse_file(DST)
out2 = encode_file(p2)
assert out == out2, "Round-trip mismatch on output file"
print("Round-trip on output file: OK")
