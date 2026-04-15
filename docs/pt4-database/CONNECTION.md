# PokerTracker 4 Database Connection

## PostgreSQL Installation
- **Location:** `C:\Program Files\PostgreSQL\16`
- **Version:** PostgreSQL 16

## Connection Details
| Parameter | Value |
|-----------|-------|
| Host | localhost |
| Port | 5432 |
| User | postgres |
| Password | dbpass |
| Database | PT4 DB |

## Connection String
```
postgresql://postgres:dbpass@localhost:5432/PT4%20DB
```

## Connecting via psql
```bash
# From PostgreSQL bin directory
cd "C:\Program Files\PostgreSQL\16\bin"
psql -U postgres -h localhost -p 5432

# Or with full path
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost
```

## Connecting via Node.js
```javascript
import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'dbpass',
  database: 'PT4 DB'
});

const result = await pool.query('SELECT * FROM player LIMIT 10');
console.log(result.rows);
```

## Connecting via Python
```python
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    user="postgres",
    password="dbpass",
    database="PT4 DB"  # Update after PT4 creates it
)

cursor = conn.cursor()
cursor.execute("SELECT * FROM player LIMIT 10")
print(cursor.fetchall())
```

## PT4 Database Schema (Key Tables)

| Table | Description |
|-------|-------------|
| `player` | Player information |
| `cash_hand_player_statistics` | Stats per hand per player (cash games) |
| `cash_hand_summary` | Hand summaries for cash games |
| `tourney_hand_player_statistics` | Stats per hand per player (tournaments) |
| `tourney_hand_summary` | Hand summaries for tournaments |
| `lookup_actions` | Action types (fold, call, raise, etc.) |
| `lookup_positions` | Position definitions |

## Common Queries

### List all databases
```sql
SELECT datname FROM pg_database WHERE datistemplate = false;
```

### List all tables in PT4 database
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;
```

### Get player stats
```sql
SELECT
    p.player_name,
    COUNT(*) as hands,
    AVG(s.flg_vpip::int) * 100 as vpip,
    AVG(s.flg_p_raise::int) * 100 as pfr
FROM cash_hand_player_statistics s
JOIN player p ON s.id_player = p.id_player
GROUP BY p.player_name
HAVING COUNT(*) > 100
ORDER BY hands DESC;
```

### Get hands by position
```sql
SELECT
    pos.position,
    COUNT(*) as hands
FROM cash_hand_player_statistics s
JOIN lookup_positions pos ON s.id_position = pos.id_position
WHERE s.id_player = YOUR_PLAYER_ID
GROUP BY pos.position;
```

## Notes
- PT4 creates the database when you first set it up
- Database name is typically something like "PT4_Hold'em" or custom
- Update PT4 DB in connection strings after PT4 creates it
- PT4 must not be running when making schema changes
