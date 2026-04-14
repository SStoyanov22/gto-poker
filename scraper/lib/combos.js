// ── Combo Map ────────────────────────────────────────────────────────────────
//
// gtobase uses a 1326-element array, one entry per unique 2-card combination.
// Cards are ordered LOW to HIGH: 2c, 2d, 2h, 2s, 3c, ..., Kc, ..., Ac, Ad, Ah, As
//   for i in 0..51:
//     for j in i+1..51:
//       combo[k++] = (cards[i], cards[j])
//
// So combo 0 = (2c, 2d), combo 1 = (2c, 2h), ..., combo 1325 = (Ah, As).
// Confirmed by observing that UTG folds combos 0-4 (22/23 = always fold for UTG)
// and BTN raises combos 0-2 (22 pairs) while folding combos 3-4 (23s/23o).
// ─────────────────────────────────────────────────────────────────────────────

const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const SUITS = ['c', 'd', 'h', 's']

// 52 cards in order: Ac Ad Ah As Kc Kd Kh Ks ... 2c 2d 2h 2s
export const CARDS = []
for (const rank of RANKS) {
  for (const suit of SUITS) {
    CARDS.push(rank + suit)
  }
}

// 1326 combos as [card1, card2] pairs
export const COMBOS = []
for (let i = 0; i < 52; i++) {
  for (let j = i + 1; j < 52; j++) {
    COMBOS.push([CARDS[i], CARDS[j]])
  }
}
