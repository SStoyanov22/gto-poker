// SB vs 4b allin HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs 4b allin HJ",
  description: "SB faces all-in 4-bet from HJ — 6-max, 100bb",
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
        '100bb': "[35.643828709999994]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/35.643828709999994], [63.17950502000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/63.17950502000001], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
