// UTG vs 5b CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 5b CO",
  description: "UTG faces 5-bet from CO — 6-max, 100bb",
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
        '100bb': "[9.80644058]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.80644058], [10.7369]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/10.7369], [14.104004210000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/14.104004210000001], [37.186099999999996]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/37.186099999999996], [67.489]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/67.489], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
