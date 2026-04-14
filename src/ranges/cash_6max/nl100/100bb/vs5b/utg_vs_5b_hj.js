// UTG vs 5b HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 5b HJ",
  description: "UTG faces 5-bet from HJ — 6-max, 100bb",
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
        '100bb': "[1.9895195300000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.9895195300000001], [7.17777]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/7.17777], [19.09201362]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/19.09201362], [29.26144148]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/29.26144148], [64.77969999999999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/64.77969999999999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
