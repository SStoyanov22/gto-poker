# PT4 Heat Map Generator

Generate visual heat maps from your PokerTracker 4 database showing how players play different hands.

## Setup

```bash
cd tools/pt4-heatmap
npm install
```

## Usage

### List all players
```bash
node index.js --list-players
```

### Generate VPIP heat map
```bash
node index.js --player "YourName" --stat vpip
```

### Generate PFR heat map for BTN only
```bash
node index.js --player "YourName" --stat pfr --position BTN
```

### ASCII output (terminal)
```bash
node index.js --player "YourName" --stat vpip --ascii
```

## Available Stats

| Stat | Description |
|------|-------------|
| `vpip` | Voluntarily Put $ In Pot |
| `pfr` | Preflop Raise |
| `3bet` | 3-Bet frequency |
| `limp` | Limp frequency |
| `fold` | Fold frequency |
| `saw_flop` | Saw flop frequency |
| `wtsd` | Went to showdown |
| `cbet` | Continuation bet |

## Filters

| Filter | Description |
|--------|-------------|
| `--position <POS>` | BTN, CO, MP, UTG, SB, BB |
| `--table-players <N>` | Filter by table size (2-10) |
| `--output <file>` | Output filename (default: heatmap.html) |
| `--ascii` | Output ASCII art instead of HTML |

## Output

By default, generates an HTML file with:
- Color-coded 13×13 grid
- Hover tooltips with exact stats
- Legend showing frequency ranges

### Color Scale
- 🟢 Green (80%+): Very high frequency
- 🟡 Yellow (40-60%): Medium frequency
- 🔴 Red (1-20%): Low frequency
- ⬛ Gray: No data or 0%

## Examples

```bash
# Your VPIP range from the button
node index.js --player "Hero" --stat vpip --position BTN

# Villain's 3bet range
node index.js --player "RegPlayer" --stat 3bet

# Compare positions
node index.js --player "Hero" --stat pfr --position UTG --output pfr-utg.html
node index.js --player "Hero" --stat pfr --position BTN --output pfr-btn.html
```

## Database Connection

Connects to PT4's PostgreSQL database:
- Host: localhost
- Port: 5432
- User: postgres
- Password: dbpass
- Database: PT4 DB

Update `index.js` if your settings differ.
