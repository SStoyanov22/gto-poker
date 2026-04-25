# PT4 HUD Design — MTT 8-Max NLHE

Companion to `pt4-hud-design.md` (6-max cash). MTTs play differently: stacks compress, antes widen opens, and steal/resteal dynamics dominate. This profile is built by **cloning `Cash - GTO Cash 6max NL100.pt4hud`** (which already follows an exploit-focused, action-oriented stat philosophy) and reorganising the rows so steal/resteal sits above c-bet.

Importable profile: [`pt4-hud/mtt-8max-hud.pt4hud`](pt4-hud/mtt-8max-hud.pt4hud) — **includes all popups** (Tools, Player Info, Preflop, Flop, Turn, River) inherited from the cash HUD. ~770 stats across the popup tabs.

## Main HUD Layout (Always Visible)

3 rows × 4 columns, exploit-focused. No "overall VPIP/PFR/Hands" row — the philosophy is that every stat on the main HUD should drive a direct in-hand decision.

```
┌────────────────────────────────────┐
│  3B / F3B / 4B+ / F4B              │  ← Row 1: Preflop aggression
│  LPS / FS / 3LPS / S&F             │  ← Row 2: Steal & resteal  (MTT-promoted)
│  CB / FCB / TCB / FTCB             │  ← Row 3: C-bet pressure
└────────────────────────────────────┘
```

The cash HUD has the same lineup with rows 2 and 3 swapped (c-bet above steal). The MTT version promotes steal stats because antes + shorter stacks make late-position pressure the dominant winrate driver in tournaments.

### Row 1 — Preflop Aggression Dynamic
| Label | PT4 stat | Read |
|-------|----------|------|
| 3B   | 3Bet Preflop | How often they 3-bet overall |
| F3B  | Fold to PF 3Bet After Raise | Targets for resteal — the cash bread-and-butter exploit, even bigger in MTT |
| 4B+  | 4Bet+ Preflop After Raising | Catches 4-bet jammers below ~30bb |
| F4B  | Fold to PF 4Bet After 3Bet | Tells you whether 4-bet bluffs work |

### Row 2 — Steal & Resteal (MTT-critical)
| Label | PT4 stat | Read |
|-------|----------|------|
| LPS  | Att To Steal - LP | Their open frequency from CO/BTN/SB |
| FS   | Fold to Steal | Both blinds combined — fold-to-steal target identification |
| 3LPS | 3Bet LP Steal | Catches blind restealers |
| S&F  | Fold to PF 3Bet After Steal | If they open and fold to 3-bets, resteal them light |

### Row 3 — C-Bet Pressure
| Label | PT4 stat | Read |
|-------|----------|------|
| CB   | CBet Flop | Flop c-bet frequency |
| FCB  | Fold to F CBet | Float / probe target identifier |
| TCB  | CBet Turn | Barrel frequency |
| FTCB | Fold to T CBet | Whether to keep barrelling turn |

### What's intentionally NOT on the main HUD
- **VPIP / PFR / Hands** — these are the first three stats most HUDs lead with. This profile drops them on purpose: they describe a player profile but don't directly drive action. They're available in the popup tabs (Player Info / Statistics summary). If you want them on the main panel, see the "Adding stats" section below.
- **WTSD / W$SD / AF** — postflop summary stats. Useful, but they live in the Flop/Turn/River popups where the context matters.

---

## Color Coding

Inherited from the cash HUD — colours are baked into the binary file already, you don't need to set them up.

| Color | Hex | Meaning |
|-------|-----|---------|
| Blue  | `#6699FF` | Too tight / passive |
| White | `#FFFFFF` | Standard |
| Yellow| `#FFFF00` | Aggressive / loose |
| Red   | `#FF4444` | Extreme — exploit hard |
| Green | `#44FF44` | Exploitable-by-you (high fold-to-X) |

The polarised stats (F3B, F4B, FS, S&F, FCB, FTCB) use green→white→red so a red value reads as "they overfold, bluff them" and a green value as "they call too much, value-bet thin."

If you want to retune ranges per stat for MTT pools (slightly tighter VPIPs, looser ATS norms), do it in PT4: right-click the stat → **Color Ranges**.

---

## Popups (already wired into the file)

Click any main-panel stat → tabbed popup with these sections:

| Tab | Stat count | What's there |
|-----|-----------|--------------|
| **Tools**     | ~193 | Player meta: hands, BB/100, all-in equity-adjusted winrate, sample-size confidence, etc. |
| **Player Info** | 6 | Compact identity panel — VPIP/PFR/3Bet/Hands summary if you want a profile-style read |
| **Preflop**   | ~161 | VPIP / PFR / 3Bet / 4Bet / Steal / Limp by position + vs each opener. This is the popup that replaces the "Preflop by Position" and "3Bet/4Bet Dynamics" tables I'd originally sketched. |
| **Flop**      | ~136 | C-bet, fold-to-c-bet, donk, check-raise, float — split by IP/OOP, HU/multiway, SRP/3-bet-pot |
| **Turn**      | ~136 | Same structure as Flop, applied to turn barrelling |
| **River**     | ~136 | Triple barrel, river bet/call frequencies, overbets, showdown win rate |

Total: ~770 stats spread across the popup tabs. The Preflop tab is where most MTT-relevant reads live — open it to find specific by-position frequencies and steal/resteal splits beyond what the main panel shows.

The tab list at the top of every popup is set by the menu string `TTL:Tools\tPOP:Tools\nTTL:Preflop\tPOP:Preflop\n…` baked into each main-panel stat's config. If you want to add an MTT-specific tab (e.g. "Push/Fold"), build the popup section in PT4 and add it to that menu string.

---

## Importing

1. PT4 → **HUD → Edit HUD Profiles → Import** → select `mtt-8max-hud.pt4hud`.
2. After import, in PT4's HUD Profiles dialog, set the profile's filter to **Tournament / 8-max** so it auto-applies.
3. Pop-up tabs (Tools / Preflop / Flop / Turn / River) are already wired in — clicking any main-panel stat opens the tabbed pop-up.

## How this file was built

The binary `.pt4hud` format is a custom type-tagged serialization (UTF-16BE strings, variable-width ints, ARGB color longs, `<…>` composites). It's not zip/XML/JSON. To produce a working file with popups, I parsed the cash NL100 HUD into a tree, swapped rows 2 and 3 of the main panel, renamed the profile to "MTT 8-Max GTO", and re-emitted the bytes. The codec round-trips byte-for-byte on the source file, so the structure PT4 expects is preserved.

If you want to regenerate or further tweak: the parser/encoder is at `tools/pt4-hud-codec/codec.py` and the build script is `tools/pt4-hud-codec/build_mtt.py`. Run `python3 tools/pt4-hud-codec/build_mtt.py` from the repo root to rebuild.

## Adding or replacing stats on the main panel

The build script swaps existing stat slots between rows. Adding a *new* stat (e.g. a leading VPIP/PFR row) requires constructing a new 23-field stat slot from scratch — colors, font block, format string, etc. Easier path: open the imported HUD in PT4, right-click the main panel, **Add Stat**, then export from PT4 to capture the result. PT4's exporter handles the schema details.

To swap rows 2 and 3 back (c-bet above steal, the cash default), edit `tools/pt4-hud-codec/build_mtt.py` and remove the two slice swaps.

## Known limitations

- **No 8-max-specific structural change.** PT4's HUD layout file doesn't encode table size or game type — those are filters applied at use-time. The 8-max designation is purely a metadata tag set in PT4's profile dialog, not in the file.
- Position naming: PT4 sometimes uses **EP / MP / CO / BTN / SB / BB** even on 8-max tables, collapsing UTG/UTG+1/MP into "EP". The popups handle this fine.
- ICM-aware stats (push/fold equity, bubble factor) aren't in PT4. For those, lean on a separate solver (HoldemResources, ICMIZER) and keep this HUD focused on opponent-tendency reads.
- Sample sizes build slowly per opponent in MTTs. The `Hands` popup tab shows reliability; weight position-specific stats only once you have a few hundred hands on a player.
