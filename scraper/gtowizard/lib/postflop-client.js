// ── GTO Wizard Postflop Client ──────────────────────────────────────────────
//
// Live API client for postflop solutions.
// Use this in your app to fetch postflop data on-demand.
//
// Usage:
//   import { PostflopClient } from './postflop-client.js'
//
//   const client = new PostflopClient({
//     token: 'eyJ...',
//     gametype: 'Cash6mGeneral_6mNL100R25',
//     depth: 100,
//   })
//
//   // Continue from a preflop spot
//   const flopSolution = await client.getFlop({
//     preflopActions: 'R2.5-F-F-F-R11-C',  // UTG open, folds, SB 3b, BB call
//     board: 'Ah7c2d',
//   })
//
//   // Continue to turn
//   const turnSolution = await client.getTurn({
//     preflopActions: 'R2.5-F-F-F-R11-C',
//     board: 'Ah7c2dKs',
//     flopActions: 'X-B33',
//   })
//
// ─────────────────────────────────────────────────────────────────────────────

import { setToken, getSpotSolution, getHistory, processSpotSolution, arrayToHandMap } from '../../lib/gtowizard.js'

export class PostflopClient {
  constructor({ token, gametype, depth = 100 }) {
    this.token = token
    this.gametype = gametype
    this.depth = depth

    if (token) setToken(token)
  }

  setToken(token) {
    this.token = token
    setToken(token)
  }

  /**
   * Get available actions at a given spot
   */
  async getAvailableActions({ preflopActions = '', board = '', flopActions = '', turnActions = '', riverActions = '' }) {
    const history = await getHistory({
      gametype: this.gametype,
      depth: this.depth,
      preflopActions,
      flopActions,
      turnActions,
      riverActions,
    })
    return history.future_actions || []
  }

  /**
   * Get flop solution
   * @param {object} opts
   * @param {string} opts.preflopActions - Preflop action string (e.g., 'R2.5-F-F-F-C')
   * @param {string} opts.board - Flop cards (e.g., 'Ah7c2d')
   */
  async getFlop({ preflopActions, board }) {
    const raw = await getSpotSolution({
      gametype: this.gametype,
      depth: this.depth,
      preflopActions,
      board,
      flopActions: '',
      turnActions: '',
      riverActions: '',
    })
    return this._processPostflopResponse(raw, 'flop')
  }

  /**
   * Get turn solution
   * @param {object} opts
   * @param {string} opts.preflopActions
   * @param {string} opts.board - Full board including turn (e.g., 'Ah7c2dKs')
   * @param {string} opts.flopActions - Flop action string (e.g., 'X-B33')
   */
  async getTurn({ preflopActions, board, flopActions }) {
    const raw = await getSpotSolution({
      gametype: this.gametype,
      depth: this.depth,
      preflopActions,
      board,
      flopActions,
      turnActions: '',
      riverActions: '',
    })
    return this._processPostflopResponse(raw, 'turn')
  }

  /**
   * Get river solution
   */
  async getRiver({ preflopActions, board, flopActions, turnActions }) {
    const raw = await getSpotSolution({
      gametype: this.gametype,
      depth: this.depth,
      preflopActions,
      board,
      flopActions,
      turnActions,
      riverActions: '',
    })
    return this._processPostflopResponse(raw, 'river')
  }

  /**
   * Generic method to get solution at any street
   */
  async getSolution({ preflopActions, board = '', flopActions = '', turnActions = '', riverActions = '' }) {
    const raw = await getSpotSolution({
      gametype: this.gametype,
      depth: this.depth,
      preflopActions,
      board,
      flopActions,
      turnActions,
      riverActions,
    })

    // Determine street from parameters
    let street = 'preflop'
    if (board && board.length >= 6) street = 'flop'
    if (flopActions) street = 'turn'
    if (turnActions) street = 'river'

    return this._processPostflopResponse(raw, street)
  }

  /**
   * Process postflop API response into a friendly format
   */
  _processPostflopResponse(raw, street) {
    const actions = []

    for (const sol of (raw.action_solutions || [])) {
      const action = sol.action
      const frequency = sol.total_frequency

      // Convert 1326-combo strategy to hand map
      // For postflop we have 1326 combos (not 169 hand types)
      // We'll return both the raw strategy and processed format
      actions.push({
        type: action.type,
        code: action.code,
        displayName: action.display_name,
        betsize: action.betsize,
        betsizeByPot: action.betsize_by_pot,
        allin: action.allin,
        frequency: Math.round(frequency * 1000) / 10, // e.g., 93.1%
        nextPosition: action.next_position,
        isHandEnd: action.is_hand_end,
        // Raw strategy array (1326 values for postflop)
        strategy: sol.strategy,
        // EV array if available
        evs: sol.evs,
      })
    }

    // Get active player info
    const activePlayer = (raw.players_info || []).find(p => p.player?.is_active !== false)

    return {
      street,
      position: activePlayer?.player?.name || null,
      pot: raw.game?.pot || null,
      effectiveStack: raw.game?.effective_stack || null,
      actions,
      // Hand categories (useful for analysis)
      handCategories: raw.hand_categories_range,
      drawCategories: raw.draw_categories_range,
      // Usage/limits info
      usage: raw.usage,
      warning: raw.warning,
      handsLocked: raw.hands_locked,
      // Raw response for advanced use
      _raw: raw,
    }
  }
}

// ── Action code builders ────────────────────────────────────────────────────
// Helper functions to build postflop action strings

/**
 * Build flop action string
 * @param {Array} actions - Array of action objects, e.g.:
 *   [{ type: 'CHECK' }, { type: 'BET', sizePct: 33 }]
 */
export function buildFlopActions(actions) {
  return actions.map(a => actionToCode(a)).join('-')
}

export function buildTurnActions(actions) {
  return actions.map(a => actionToCode(a)).join('-')
}

export function buildRiverActions(actions) {
  return actions.map(a => actionToCode(a)).join('-')
}

/**
 * Convert action object to GTO Wizard code
 */
function actionToCode(action) {
  switch (action.type.toUpperCase()) {
    case 'CHECK':
    case 'X':
      return 'X'
    case 'FOLD':
    case 'F':
      return 'F'
    case 'CALL':
    case 'C':
      return 'C'
    case 'BET':
    case 'RAISE':
    case 'B':
    case 'R':
      // Bet sizes: B33 (33% pot), B50, B75, B100, B150, etc.
      if (action.sizePct) return `B${action.sizePct}`
      if (action.size) return `R${action.size}`
      return 'B50' // default
    case 'ALLIN':
    case 'A':
      return 'A'
    default:
      return action.code || action.type
  }
}

// ── Board string helpers ────────────────────────────────────────────────────

/**
 * Parse board string into cards
 * @param {string} board - e.g., 'Ah7c2dKs'
 * @returns {Array} - ['Ah', '7c', '2d', 'Ks']
 */
export function parseBoard(board) {
  const cards = []
  for (let i = 0; i < board.length; i += 2) {
    cards.push(board.slice(i, i + 2))
  }
  return cards
}

/**
 * Get street from board length
 */
export function getStreetFromBoard(board) {
  const cardCount = board.length / 2
  if (cardCount === 0) return 'preflop'
  if (cardCount === 3) return 'flop'
  if (cardCount === 4) return 'turn'
  if (cardCount === 5) return 'river'
  return 'unknown'
}

export default PostflopClient
