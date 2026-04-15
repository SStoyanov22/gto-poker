#!/usr/bin/env node
/**
 * PT4 Heat Map Generator
 *
 * Connects to PokerTracker 4 database and generates heat maps
 * showing how players play different hands in various situations.
 *
 * Usage:
 *   node tools/pt4-heatmap/index.js --player "YourName" --stat vpip
 *   node tools/pt4-heatmap/index.js --player "Villain" --stat pfr --position BTN
 *   node tools/pt4-heatmap/index.js --list-players
 */

import pg from 'pg';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Database connection
const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'dbpass',
  database: 'PT4 DB'
});

// 13x13 grid layout
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * Get all players with hand counts
 */
async function listPlayers() {
  const result = await pool.query(`
    SELECT
      p.id_player,
      p.player_name,
      COUNT(DISTINCT s.id_hand) as hands
    FROM player p
    LEFT JOIN cash_hand_player_statistics s ON p.id_player = s.id_player
    GROUP BY p.id_player, p.player_name
    ORDER BY hands DESC
    LIMIT 50
  `);
  return result.rows;
}

/**
 * Get heat map data for a player
 * @param {string} playerName - Player name
 * @param {string} stat - Stat to measure (vpip, pfr, 3bet, etc.)
 * @param {object} filters - Optional filters (position, vs_position, etc.)
 */
async function getHeatMapData(playerName, stat, filters = {}) {
  // Build the stat column based on what we're measuring
  const statColumns = {
    vpip: 'flg_vpip',
    pfr: 'flg_p_raise',
    '3bet': 'cnt_p_raise > 1',
    limp: 'flg_p_limp',
    fold: 'flg_p_fold',
    saw_flop: 'flg_f_saw',
    wtsd: 'flg_showdown',
    cbet: 'flg_f_bet',
    // Add more as needed
  };

  const statCol = statColumns[stat] || 'flg_vpip';

  // Build WHERE clause
  let whereClause = 'WHERE p.player_name = $1';
  const params = [playerName];
  let paramIndex = 2;

  if (filters.position) {
    const posMap = { 'BTN': 0, 'CO': 1, 'MP': 2, 'UTG': 3, 'SB': 9, 'BB': 8 };
    whereClause += ` AND s.position = $${paramIndex}`;
    params.push(posMap[filters.position.toUpperCase()] ?? filters.position);
    paramIndex++;
  }

  if (filters.tablePlayers) {
    whereClause += ` AND s.cnt_players = $${paramIndex}`;
    params.push(filters.tablePlayers);
    paramIndex++;
  }

  const query = `
    SELECT
      h.hole_cards,
      h.id_holecard,
      COUNT(*) as total_hands,
      SUM(CASE WHEN ${statCol} THEN 1 ELSE 0 END) as stat_count,
      ROUND(AVG(CASE WHEN ${statCol} THEN 1.0 ELSE 0.0 END) * 100, 1) as frequency
    FROM cash_hand_player_statistics s
    JOIN player p ON s.id_player = p.id_player
    JOIN lookup_hole_cards h ON s.id_holecard = h.id_holecard AND h.id_gametype = 1
    ${whereClause}
    GROUP BY h.hole_cards, h.id_holecard
    ORDER BY h.id_holecard
  `;

  const result = await pool.query(query, params);
  return result.rows;
}

/**
 * Convert hole card notation to grid position
 * @param {string} holeCards - e.g., "AKs", "JTo", "77"
 * @returns {object} { row, col } or null
 */
function holeCardToGrid(holeCards) {
  if (!holeCards || holeCards.length < 2) return null;

  const card1 = holeCards[0].toUpperCase();
  const card2 = holeCards[1].toUpperCase();
  const suited = holeCards.endsWith('s');

  const row = RANKS.indexOf(card1);
  const col = RANKS.indexOf(card2);

  if (row === -1 || col === -1) return null;

  // Pairs are on diagonal
  // Suited hands are above diagonal (row < col after swap)
  // Offsuit hands are below diagonal
  if (card1 === card2) {
    return { row, col: row }; // Pair - on diagonal
  } else if (suited) {
    // Suited - higher card as row, lower as col (above diagonal)
    return row < col ? { row, col } : { row: col, col: row };
  } else {
    // Offsuit - higher card as col, lower as row (below diagonal)
    return row < col ? { row: col, col: row } : { row, col };
  }
}

/**
 * Build 13x13 grid from query results
 */
function buildGrid(data) {
  // Initialize grid with nulls
  const grid = Array(13).fill(null).map(() => Array(13).fill(null));

  for (const row of data) {
    const pos = holeCardToGrid(row.hole_cards);
    if (pos) {
      grid[pos.row][pos.col] = {
        hand: row.hole_cards,
        frequency: parseFloat(row.frequency) || 0,
        hands: parseInt(row.total_hands) || 0,
        statCount: parseInt(row.stat_count) || 0
      };
    }
  }

  return grid;
}

/**
 * Generate ASCII heat map
 */
function renderAsciiHeatMap(grid, title = 'Heat Map') {
  const lines = [];
  lines.push(`\n${'='.repeat(60)}`);
  lines.push(title);
  lines.push('='.repeat(60));
  lines.push('');

  // Header row
  lines.push('     ' + RANKS.map(r => r.padStart(4)).join(' '));
  lines.push('    ' + '-'.repeat(57));

  for (let r = 0; r < 13; r++) {
    let row = RANKS[r] + ' | ';
    for (let c = 0; c < 13; c++) {
      const cell = grid[r][c];
      if (cell && cell.hands > 0) {
        const freq = cell.frequency;
        const display = freq.toFixed(0).padStart(3);
        row += ` ${display} `;
      } else {
        row += '   - ';
      }
    }
    lines.push(row);
  }

  lines.push('');
  lines.push('Legend: Numbers show % frequency. "-" = no data');
  lines.push('Diagonal = Pairs, Upper = Suited, Lower = Offsuit');

  return lines.join('\n');
}

/**
 * Generate HTML heat map
 */
function renderHtmlHeatMap(grid, title = 'Heat Map', playerName = '', stat = '') {
  const getColor = (freq) => {
    if (freq === null || freq === undefined) return '#333';
    if (freq >= 80) return '#22c55e'; // green
    if (freq >= 60) return '#84cc16'; // lime
    if (freq >= 40) return '#eab308'; // yellow
    if (freq >= 20) return '#f97316'; // orange
    if (freq > 0) return '#ef4444';   // red
    return '#333';                     // gray for 0
  };

  let html = `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #1a1a1a; color: white; padding: 20px; }
    h1 { text-align: center; }
    .info { text-align: center; margin-bottom: 20px; color: #888; }
    .grid { display: grid; grid-template-columns: 30px repeat(13, 45px); gap: 2px; margin: 0 auto; width: fit-content; }
    .cell { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;
            border-radius: 4px; font-size: 11px; font-weight: bold; position: relative; }
    .cell:hover { outline: 2px solid white; z-index: 1; }
    .cell .tooltip { display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
                     background: black; padding: 5px 8px; border-radius: 4px; white-space: nowrap; z-index: 10; }
    .cell:hover .tooltip { display: block; }
    .header { background: transparent; color: #888; font-weight: normal; }
    .row-header { width: 30px; }
    .legend { display: flex; justify-content: center; gap: 20px; margin-top: 20px; }
    .legend-item { display: flex; align-items: center; gap: 5px; }
    .legend-color { width: 20px; height: 20px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="info">Player: ${playerName} | Stat: ${stat.toUpperCase()}</div>
  <div class="grid">
    <div class="cell header"></div>
`;

  // Header row
  for (const rank of RANKS) {
    html += `    <div class="cell header">${rank}</div>\n`;
  }

  // Data rows
  for (let r = 0; r < 13; r++) {
    html += `    <div class="cell header row-header">${RANKS[r]}</div>\n`;
    for (let c = 0; c < 13; c++) {
      const cell = grid[r][c];
      const freq = cell?.frequency ?? null;
      const hands = cell?.hands ?? 0;
      const hand = cell?.hand ?? '';
      const color = getColor(freq);
      const display = freq !== null && hands > 0 ? freq.toFixed(0) + '%' : '-';

      html += `    <div class="cell" style="background: ${color}">
      ${display}
      <div class="tooltip">${hand}: ${freq?.toFixed(1) ?? 0}% (${hands} hands)</div>
    </div>\n`;
    }
  }

  html += `  </div>
  <div class="legend">
    <div class="legend-item"><div class="legend-color" style="background: #22c55e"></div> 80%+</div>
    <div class="legend-item"><div class="legend-color" style="background: #84cc16"></div> 60-80%</div>
    <div class="legend-item"><div class="legend-color" style="background: #eab308"></div> 40-60%</div>
    <div class="legend-item"><div class="legend-color" style="background: #f97316"></div> 20-40%</div>
    <div class="legend-item"><div class="legend-color" style="background: #ef4444"></div> 1-20%</div>
    <div class="legend-item"><div class="legend-color" style="background: #333"></div> 0% / No data</div>
  </div>
</body>
</html>`;

  return html;
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }

  return args;
}

/**
 * Main
 */
async function main() {
  const args = parseArgs();

  try {
    // List players mode
    if (args['list-players']) {
      const players = await listPlayers();
      console.log('\nPlayers in database:\n');
      console.log('ID'.padEnd(8) + 'Name'.padEnd(30) + 'Hands');
      console.log('-'.repeat(50));
      for (const p of players) {
        console.log(
          String(p.id_player).padEnd(8) +
          p.player_name.padEnd(30) +
          p.hands
        );
      }
      if (players.length === 0) {
        console.log('No players found. Import hand histories into PT4 first.');
      }
      await pool.end();
      return;
    }

    // Heat map mode
    const playerName = args.player;
    const stat = args.stat || 'vpip';

    if (!playerName) {
      console.log(`
PT4 Heat Map Generator

Usage:
  node index.js --list-players              List all players
  node index.js --player "Name" --stat vpip Generate VPIP heat map

Options:
  --player <name>     Player name (required for heat map)
  --stat <stat>       Stat to measure: vpip, pfr, 3bet, limp, fold, saw_flop, wtsd, cbet
  --position <pos>    Filter by position: BTN, CO, MP, UTG, SB, BB
  --table-players <n> Filter by table size (2-10)
  --output <file>     Output HTML file (default: heatmap.html)
  --ascii             Output ASCII instead of HTML
      `);
      await pool.end();
      return;
    }

    const filters = {};
    if (args.position) filters.position = args.position;
    if (args['table-players']) filters.tablePlayers = parseInt(args['table-players']);

    console.log(`Generating ${stat.toUpperCase()} heat map for "${playerName}"...`);

    const data = await getHeatMapData(playerName, stat, filters);

    if (data.length === 0) {
      console.log('No data found for this player. Check the name or import more hands.');
      await pool.end();
      return;
    }

    const grid = buildGrid(data);

    const posStr = filters.position ? ` (${filters.position})` : '';
    const title = `${playerName} - ${stat.toUpperCase()}${posStr}`;

    if (args.ascii) {
      console.log(renderAsciiHeatMap(grid, title));
    } else {
      const html = renderHtmlHeatMap(grid, title, playerName, stat);
      const outputFile = args.output || 'heatmap.html';
      const outputPath = join(__dirname, outputFile);
      writeFileSync(outputPath, html);
      console.log(`Heat map saved to: ${outputPath}`);
    }

    // Summary stats
    let totalHands = 0;
    let totalStat = 0;
    for (const row of data) {
      totalHands += parseInt(row.total_hands) || 0;
      totalStat += parseInt(row.stat_count) || 0;
    }
    console.log(`\nTotal hands: ${totalHands}`);
    console.log(`Overall ${stat.toUpperCase()}: ${((totalStat / totalHands) * 100).toFixed(1)}%`);

  } catch (err) {
    console.error('Error:', err.message);
  }

  await pool.end();
}

main();
