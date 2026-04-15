# PT4 HUD Design - 6-Max NL Cash

## Main HUD Layout (Always Visible)

```
┌──────────────────────────────────────────┐
│  VPIP / PFR / 3Bet  [Hands]              │  ← Line 1: Core preflop
│  AF / WTSD / W$SD                        │  ← Line 2: Postflop tendencies
│  Fold3B / CBet / FCB                     │  ← Line 3: Key exploits
└──────────────────────────────────────────┘
```

### Line 1: Core Preflop Profile
| Stat | Abbreviation | Description | Color Coding |
|------|--------------|-------------|--------------|
| VPIP | V | Voluntarily Put $ In Pot | <22 tight (blue), 22-30 normal (white), >30 loose (red) |
| PFR | P | Preflop Raise % | Gap from VPIP matters: VPIP-PFR > 8 = passive |
| 3Bet | 3B | 3-Bet % | <5 tight (blue), 5-9 normal, >9 aggressive (red) |
| Hands | (n) | Sample size | <100 gray, 100-500 yellow, >500 white |

**Example display:** `26/21/7 (847)`

### Line 2: Postflop Tendencies
| Stat | Abbreviation | Description | Color Coding |
|------|--------------|-------------|--------------|
| AF | AF | Aggression Factor (Bet+Raise)/Call | <1.5 passive (blue), 1.5-3 normal, >3 aggro (red) |
| WTSD | W | Went To Showdown % | <25 rarely (blue), 25-32 normal, >32 station (red) |
| W$SD | $ | Won $ at Showdown % | <48 losing (red), 48-55 normal, >55 winning (green) |

**Example display:** `2.4 / 28 / 52`

### Line 3: Key Exploit Stats
| Stat | Abbreviation | Description | Color Coding |
|------|--------------|-------------|--------------|
| Fold3B | F3 | Fold to 3-Bet % | <55 calls too much (green=bluff less), >65 folds too much (red=3bet more) |
| CBet | CB | Continuation Bet % | <55 passive (blue), 55-75 normal, >75 aggro (red) |
| FCB | FC | Fold to CBet % | <40 floats (red), 40-55 normal, >55 folds too much (green=cbet more) |

**Example display:** `62 / 68 / 48`

---

## Popup 1: Preflop by Position

**Trigger:** Click on VPIP/PFR

```
┌─────────────────────────────────────────────────────────────────┐
│                    PREFLOP BY POSITION                          │
├─────────────┬───────┬───────┬───────┬───────┬───────┬───────────┤
│ Position    │  UTG  │  HJ   │  CO   │  BTN  │  SB   │  BB       │
├─────────────┼───────┼───────┼───────┼───────┼───────┼───────────┤
│ VPIP        │  12   │  15   │  24   │  42   │  35   │  28       │
│ PFR         │  10   │  13   │  22   │  38   │  32   │  12       │
│ RFI         │  10   │  13   │  22   │  38   │  32   │   -       │
│ 3Bet        │   3   │   5   │   7   │   9   │  11   │   8       │
│ Fold to 3B  │  58   │  55   │  52   │  48   │  45   │   -       │
│ 4Bet        │   2   │   2   │   3   │   4   │   5   │   4       │
│ Fold to 4B  │  60   │  58   │  55   │  52   │  50   │  55       │
│ Limp       │   0   │   1   │   2   │   3   │   2   │   -       │
│ Hands       │ (120) │ (135) │ (142) │ (156) │ (148) │ (152)     │
└─────────────┴───────┴───────┴───────┴───────┴───────┴───────────┘
```

### Key Stats in This Popup
| Stat | Full Name | Why It Matters |
|------|-----------|----------------|
| RFI | Raise First In | Shows open-raising range by position |
| 3Bet | 3-Bet % by position | IP vs OOP 3betting tendencies |
| Fold to 3B | Fold to 3-Bet | Who folds too much to 3bets from which positions |
| 4Bet | 4-Bet % | Identifies 4bet bluffing frequency |
| Fold to 4B | Fold to 4-Bet | Target for 4bet bluffs |
| Limp | Limp % | Fish detector + limp-raise awareness |

---

## Popup 2: 3Bet/4Bet Dynamics

**Trigger:** Click on 3Bet%

```
┌─────────────────────────────────────────────────────────────────┐
│                    3BET / 4BET DYNAMICS                         │
├─────────────────────────────────────────────────────────────────┤
│ 3BET STATS                                                      │
├─────────────┬───────────────────────────────────────────────────┤
│ Overall 3B  │  7.2%  (289 opportunities)                        │
│ 3B vs UTG   │  4.1%                                             │
│ 3B vs HJ    │  5.8%                                             │
│ 3B vs CO    │  7.2%                                             │
│ 3B vs BTN   │  9.5%                                             │
│ 3B vs SB    │  8.8%                                             │
│ 3B IP       │  8.4%                                             │
│ 3B OOP      │  5.9%                                             │
├─────────────┴───────────────────────────────────────────────────┤
│ FOLD TO 3BET                                                    │
├─────────────┬───────────────────────────────────────────────────┤
│ Overall F3B │  62%  (87 opportunities)                          │
│ F3B from IP │  58%                                              │
│ F3B from OOP│  68%                                              │
│ Call 3B     │  28%                                              │
│ 4Bet        │  10%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ 4BET STATS                                                      │
├─────────────┬───────────────────────────────────────────────────┤
│ 4Bet %      │  3.2%  (31 opportunities)                         │
│ 4B vs BTN 3B│  4.5%                                             │
│ 4B vs BB 3B │  2.8%                                             │
│ Fold to 4B  │  55%                                              │
│ Call 4B     │  25%                                              │
│ 5Bet        │  20%                                              │
└─────────────┴───────────────────────────────────────────────────┘
```

---

## Popup 3: Postflop - C-Bet Analysis

**Trigger:** Click on CBet%

```
┌─────────────────────────────────────────────────────────────────┐
│                    C-BET ANALYSIS                               │
├─────────────────────────────────────────────────────────────────┤
│ FLOP C-BET (as PFR)                                             │
├─────────────┬───────────────────────────────────────────────────┤
│ Overall     │  68%  (245 opportunities)                         │
│ IP          │  72%                                              │
│ OOP         │  58%                                              │
│ HU          │  70%                                              │
│ Multiway    │  45%                                              │
│ SRP         │  65%                                              │
│ 3Bet Pot    │  75%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ FLOP C-BET SIZING                                               │
├─────────────┬───────────────────────────────────────────────────┤
│ Small (<40%)│  35%  of cbets                                    │
│ Medium      │  50%  of cbets                                    │
│ Large (>75%)│  15%  of cbets                                    │
├─────────────┴───────────────────────────────────────────────────┤
│ TURN C-BET (barreling)                                          │
├─────────────┬───────────────────────────────────────────────────┤
│ Overall     │  52%  (128 opportunities)                         │
│ After Flop CB│ 55%                                              │
│ Delayed CB  │  38%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ RIVER C-BET                                                     │
├─────────────┬───────────────────────────────────────────────────┤
│ Overall     │  42%  (64 opportunities)                          │
│ Triple Barrel│ 28%                                              │
└─────────────┴───────────────────────────────────────────────────┘
```

---

## Popup 4: Facing C-Bets

**Trigger:** Click on Fold to CBet

```
┌─────────────────────────────────────────────────────────────────┐
│                    FACING C-BETS                                │
├─────────────────────────────────────────────────────────────────┤
│ VS FLOP C-BET                                                   │
├─────────────┬───────────────────────────────────────────────────┤
│ Fold        │  48%                                              │
│ Call        │  42%                                              │
│ Raise       │   10%                                             │
│ Fold IP     │  42%                                              │
│ Fold OOP    │  55%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ VS TURN C-BET                                                   │
├─────────────┬───────────────────────────────────────────────────┤
│ Fold        │  52%                                              │
│ Call        │  40%                                              │
│ Raise       │   8%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ VS RIVER C-BET                                                  │
├─────────────┬───────────────────────────────────────────────────┤
│ Fold        │  58%                                              │
│ Call        │  38%                                              │
│ Raise       │   4%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ CHECK-RAISE STATS                                               │
├─────────────┬───────────────────────────────────────────────────┤
│ Flop XR     │   8%                                              │
│ Turn XR     │   6%                                              │
│ River XR    │   4%                                              │
│ Fold to XR  │  52%                                              │
└─────────────┴───────────────────────────────────────────────────┘
```

---

## Popup 5: Steal & Blind Defense

**Trigger:** Click on position indicator or BB stat area

```
┌─────────────────────────────────────────────────────────────────┐
│                    STEAL & BLIND DEFENSE                        │
├─────────────────────────────────────────────────────────────────┤
│ STEAL ATTEMPTS (RFI from CO/BTN/SB)                             │
├─────────────┬───────────────────────────────────────────────────┤
│ CO Steal    │  28%  (open from CO)                              │
│ BTN Steal   │  45%  (open from BTN)                             │
│ SB Steal    │  38%  (open from SB)                              │
├─────────────┴───────────────────────────────────────────────────┤
│ BLIND DEFENSE (from BB)                                         │
├─────────────┬───────────────────────────────────────────────────┤
│ Fold BB     │  58%  overall                                     │
│ Fold vs CO  │  62%                                              │
│ Fold vs BTN │  55%                                              │
│ Fold vs SB  │  48%                                              │
│ Call BB     │  28%  overall                                     │
│ 3Bet BB     │  14%  overall                                     │
│ 3B vs CO    │  10%                                              │
│ 3B vs BTN   │  14%                                              │
│ 3B vs SB    │  18%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ SB DEFENSE                                                      │
├─────────────┬───────────────────────────────────────────────────┤
│ Fold SB     │  72%  overall                                     │
│ Fold vs BTN │  68%                                              │
│ Call SB     │  12%                                              │
│ 3Bet SB     │  16%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ SB vs BB (when folded to SB)                                    │
├─────────────┬───────────────────────────────────────────────────┤
│ SB Open     │  42%                                              │
│ SB Limp     │  15%                                              │
│ BB vs SB Limp│ Raise 65%, Check 35%                             │
└─────────────┴───────────────────────────────────────────────────┘
```

---

## Popup 6: Aggression & Showdown

**Trigger:** Click on AF or WTSD

```
┌─────────────────────────────────────────────────────────────────┐
│                    AGGRESSION & SHOWDOWN                        │
├─────────────────────────────────────────────────────────────────┤
│ AGGRESSION BY STREET                                            │
├─────────────┬───────────────────────────────────────────────────┤
│ Flop AF     │  2.8                                              │
│ Turn AF     │  2.2                                              │
│ River AF    │  1.8                                              │
│ Total AF    │  2.4                                              │
│ Agg%        │  42%  (Bet+Raise / all actions)                   │
├─────────────┴───────────────────────────────────────────────────┤
│ SHOWDOWN STATS                                                  │
├─────────────┬───────────────────────────────────────────────────┤
│ WTSD        │  28%  (went to SD when saw flop)                  │
│ W$SD        │  52%  (won $ at showdown)                         │
│ WSD         │  48%  (won at showdown - different calc)          │
│ WWSF        │  45%  (won when saw flop)                         │
├─────────────┴───────────────────────────────────────────────────┤
│ DONK & PROBE STATS                                              │
├─────────────┬───────────────────────────────────────────────────┤
│ Donk Bet Flop│  8%                                              │
│ Donk Bet Turn│  6%                                              │
│ Probe Turn  │  35%  (bet when PFR checks flop)                  │
│ Probe River │  28%                                              │
├─────────────┴───────────────────────────────────────────────────┤
│ THIN VALUE & BLUFF INDICATORS                                   │
├─────────────┬───────────────────────────────────────────────────┤
│ River Bet   │  38%  (when checked to)                           │
│ River Call  │  45%  (facing bet)                                │
│ Overbet %   │  5%   (bets > pot)                                │
└─────────────┴───────────────────────────────────────────────────┘
```

---

## Color Coding Reference

### VPIP Colors
| Value | Color | Interpretation |
|-------|-------|----------------|
| 0-18 | Blue | Very tight / Nit |
| 19-26 | White | Normal / TAG |
| 27-35 | Yellow | Loose / LAG |
| 36+ | Red | Very loose / Fish |

### PFR Gap (VPIP - PFR)
| Gap | Color | Interpretation |
|-----|-------|----------------|
| 0-4 | Green | Aggressive (mostly raising) |
| 5-8 | White | Normal |
| 9-15 | Yellow | Passive (lots of limping/calling) |
| 16+ | Red | Very passive / Limp-call fish |

### 3Bet%
| Value | Color | Interpretation |
|-------|-------|----------------|
| 0-4 | Blue | Only premiums |
| 5-8 | White | Normal |
| 9-12 | Yellow | Aggressive |
| 13+ | Red | Maniac / Over-3betting |

### Sample Size Confidence
| Hands | Color | Reliability |
|-------|-------|-------------|
| 0-50 | Red | Very unreliable |
| 51-150 | Orange | Low confidence |
| 151-500 | Yellow | Moderate confidence |
| 501-1000 | White | Good confidence |
| 1000+ | Green | High confidence |

---

## Quick Player Type Identification

Use the main HUD line to quickly categorize:

| VPIP/PFR | Type | Strategy Adjustment |
|----------|------|---------------------|
| 12/10 | Nit | Respect raises, steal blinds, don't bluff |
| 22/18 | TAG | Standard play, respect 3bets |
| 28/22 | LAG | Call wider, trap more, 4bet bluff less |
| 35/8 | Fish (passive) | Value bet thin, don't bluff, isolate |
| 45/35 | Maniac | Call down lighter, let them bluff, trap |
| 28/26/2 | Tight 3better | 4bet or fold vs 3bet |
| 25/20/12 | 3bet happy | Call 3bets more, trap AA/KK |

---

## PT4 Implementation Notes

### Creating the Main HUD
1. Go to HUD > Edit HUD Profiles
2. Create new profile: "6max Cash"
3. Add a new panel with 3 rows
4. Add stats to each row as defined above
5. Set font size: 10-11pt for readability
6. Enable "Show decimal places" for key stats

### Creating Popups
1. Right-click stat > "Edit Popup"
2. Create table layout matching designs above
3. Add relevant stats to each cell
4. Set popup trigger: Left-click or Hover

### Recommended Settings
- Background: Semi-transparent dark (70% opacity)
- Text: White with colored stat values
- Border: 1px subtle gray
- Position: Above player avatar, centered

### Stat Abbreviations in PT4
| Design | PT4 Stat Name |
|--------|---------------|
| VPIP | VPIP |
| PFR | PFR |
| 3Bet | Three Bet Preflop |
| F3B | Fold to 3Bet |
| AF | Aggression Factor |
| WTSD | Went to Showdown |
| W$SD | Won $ at Showdown |
| CBet | Flop C-Bet |
| FCB | Fold to Flop C-Bet |
| RFI | Raise First In |
