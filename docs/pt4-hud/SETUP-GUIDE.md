# PT4 HUD Setup Guide - 6-Max Cash

## Step 1: Create New HUD Profile

1. Open PokerTracker 4
2. Go to **HUD → Edit HUD Profiles**
3. Click **New Profile** (or duplicate an existing one)
4. Name it: `6-Max Cash GTO`
5. Set **Table Size**: 6-Max
6. Set **Game Type**: Cash / Ring

---

## Step 2: Configure Main Panel

### Panel Settings
- Right-click the default panel → **Panel Options**
- **Rows**: 3
- **Columns**: 4
- **Background**: Dark gray with 70% opacity (#000000, 70%)
- **Border**: 1px gray (#444444)
- **Font**: Segoe UI, 11pt

### Add Stats to Panel

#### Row 1: Core Preflop
| Column | Stat Name (in PT4) | Display |
|--------|-------------------|---------|
| 1 | VPIP | {0:0} |
| 2 | PFR | /{0:0} |
| 3 | Three Bet Preflop | /{0:0} |
| 4 | Hands | ({0}) |

#### Row 2: Postflop Tendencies
| Column | Stat Name (in PT4) | Display |
|--------|-------------------|---------|
| 1 | Aggression Factor | {0:0.0} |
| 2 | Went to SD | /{0:0} |
| 3 | Won $ at SD | /{0:0} |
| 4 | Won When Saw Flop | {0:0} |

#### Row 3: Key Exploits
| Column | Stat Name (in PT4) | Display |
|--------|-------------------|---------|
| 1 | Fold to 3Bet | {0:0} |
| 2 | Flop CBet | /{0:0} |
| 3 | Fold to Flop CBet | /{0:0} |
| 4 | Four Bet Preflop | {0:0} |

---

## Step 3: Set Up Color Coding

For each stat, right-click → **Color Ranges**:

### VPIP
| Range | Color | Meaning |
|-------|-------|---------|
| 0-18 | Blue #6699FF | Nit |
| 19-26 | White | TAG (normal) |
| 27-35 | Yellow | LAG |
| 36+ | Red #FF4444 | Fish |

### PFR
| Range | Color | Meaning |
|-------|-------|---------|
| 0-12 | Blue | Very tight |
| 13-22 | White | Normal |
| 23-32 | Yellow | Aggressive |
| 33+ | Red | Maniac |

### 3Bet
| Range | Color | Meaning |
|-------|-------|---------|
| 0-4 | Blue | Premiums only |
| 5-8 | White | Normal |
| 9-12 | Yellow | Aggressive |
| 13+ | Red | Over-3betting |

### Hands (Sample Size)
| Range | Color | Meaning |
|-------|-------|---------|
| 0-50 | Red | Unreliable |
| 51-150 | Orange #FF9944 | Low confidence |
| 151-500 | Yellow | Moderate |
| 501-1000 | White | Good |
| 1000+ | Green #44FF44 | High confidence |

### Fold to 3Bet
| Range | Color | Meaning |
|-------|-------|---------|
| 0-54 | Green | Calls too much (bluff less) |
| 55-65 | White | Normal |
| 66+ | Red | Overfolds (3bet more) |

### Fold to CBet
| Range | Color | Meaning |
|-------|-------|---------|
| 0-39 | Red | Floats a lot (don't cbet air) |
| 40-55 | White | Normal |
| 56+ | Green | Overfolds (cbet more) |

---

## Step 4: Create Popups

### Popup 1: Preflop by Position
1. Right-click on VPIP stat → **Edit Popup**
2. Create table: 7 rows × 7 columns
3. Add stats:

```
Header Row:  [blank] | UTG | HJ | CO | BTN | SB | BB
Row 1:       VPIP    | VPIP by Position stats...
Row 2:       PFR     | PFR by Position stats...
Row 3:       RFI     | RFI by Position stats...
Row 4:       3Bet    | 3Bet by Position stats...
Row 5:       Fold3B  | Fold to 3Bet by Position...
Row 6:       4Bet    | 4Bet by Position stats...
Row 7:       Hands   | Hands by Position...
```

**PT4 Stats to use:**
- `VPIP - UTG`, `VPIP - HJ`, `VPIP - CO`, etc.
- `Raise First In - UTG`, `Raise First In - HJ`, etc.
- `Three Bet - EP`, `Three Bet - MP`, `Three Bet - CO`, etc.

### Popup 2: 3Bet/4Bet Dynamics
1. Right-click on 3Bet stat → **Edit Popup**
2. Add these stats:

| Stat | PT4 Name |
|------|----------|
| 3Bet Overall | Three Bet Preflop |
| 3Bet vs EP | Three Bet vs EP Open |
| 3Bet vs MP | Three Bet vs MP Open |
| 3Bet vs CO | Three Bet vs CO Open |
| 3Bet vs BTN | Three Bet vs BTN Open |
| 3Bet IP | Three Bet in Position |
| 3Bet OOP | Three Bet Out of Position |
| Fold to 3Bet | Fold to 3Bet |
| Call 3Bet | Call 3Bet |
| 4Bet | Four Bet Preflop |
| Fold to 4Bet | Fold to 4Bet |

### Popup 3: C-Bet Analysis
1. Right-click on CBet stat → **Edit Popup**
2. Add these stats:

| Category | Stats |
|----------|-------|
| Flop CBet | Flop CBet, Flop CBet IP, Flop CBet OOP |
| Flop CBet Situation | Flop CBet HU, Flop CBet in 3Bet Pot |
| Turn CBet | Turn CBet, Turn CBet After Flop CBet |
| River CBet | River CBet |
| Triple Barrel | Triple Barrel |

### Popup 4: Facing C-Bets
1. Right-click on Fold to CBet stat → **Edit Popup**
2. Add these stats:

| Stat | PT4 Name |
|------|----------|
| Fold to Flop CBet | Fold to Flop CBet |
| Call Flop CBet | Call Flop CBet |
| Raise Flop CBet | Raise Flop CBet |
| Fold to Turn CBet | Fold to Turn CBet |
| Fold to River CBet | Fold to River CBet |
| Check-Raise Flop | Check-Raise Flop |
| Fold to Check-Raise | Fold to Flop Check-Raise |

### Popup 5: Steal & Blind Defense
1. Right-click on Hands or create new trigger
2. Add these stats:

| Category | Stats |
|----------|-------|
| Steal | Attempt to Steal, CO Steal, BTN Steal, SB Steal |
| BB Defense | Fold BB to Steal, Call BB vs Steal, 3Bet BB vs Steal |
| SB Defense | Fold SB to Steal, 3Bet SB vs Steal |
| SB vs BB | SB Open vs BB, SB Limp |

### Popup 6: Aggression & Showdown
1. Right-click on AF or WTSD → **Edit Popup**
2. Add these stats:

| Category | Stats |
|----------|-------|
| Aggression | Flop AF, Turn AF, River AF, Aggression % |
| Showdown | WTSD, Won $ at SD, Won When Saw Flop |
| Misc | Donk Bet Flop, Probe Turn, River Bet |

---

## Step 5: Position the HUD

1. Go to **HUD → Configure Table HUD**
2. Launch a play-money or real table
3. Drag the HUD panels to position above each player's avatar
4. **Lock positions** when satisfied

---

## Step 6: Test & Refine

1. Play or review hands with the HUD active
2. Adjust:
   - Font sizes if too small/large
   - Color ranges based on your player pool
   - Popup stats based on what you reference most

---

## Quick Reference: PT4 Stat Names

| What You Want | PT4 Stat Name |
|---------------|---------------|
| VPIP | VPIP |
| PFR | PFR |
| 3Bet | Three Bet Preflop |
| Fold to 3Bet | Fold to Three Bet |
| 4Bet | Four Bet Preflop |
| Fold to 4Bet | Fold to Four Bet |
| CBet Flop | Flop Continuation Bet |
| Fold to CBet | Fold to Flop Continuation Bet |
| AF | Aggression Factor |
| WTSD | Went to Showdown |
| W$SD | Won Money at Showdown |
| WWSF | Won When Saw Flop |
| RFI | Raise First In |
| Steal | Attempt to Steal |
| Check-Raise | Check-Raise Flop |

---

## Import Note

If you want to import the `.pt4hud` file:
1. Go to **HUD → Edit HUD Profiles**
2. Click **Import**
3. Select `6max-cash-hud.pt4hud`
4. Note: PT4 versions vary - manual setup may be needed

The `.pt4hud` file provides the structure but you may need to re-add stats if PT4 version differs.
