// BB vs 4b allin UTG (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BB vs 4b allin UTG",
  description: "BB faces all-in 4-bet from UTG — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      call: {
        '100bb': "",
      },
    },
    '2.25bb': {
      call: {
        '100bb': "",
      },
    },
    '2.5bb': {
      call: {
        '100bb': "[4.5319]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/4.5319], [63.82790000000001]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/63.82790000000001], [73.614]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/73.614], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
