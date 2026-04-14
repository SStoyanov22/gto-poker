// UTG vs 5b SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 5b SB",
  description: "UTG faces 5-bet from SB — 6-max, 100bb",
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
        '100bb': "[0.99129]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/0.99129], [1.2490899999999998]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.2490899999999998], [10.54798225]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/10.54798225], [41.1171]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/41.1171], [96.8887]AhKh, AdKd, AsKs, AcKc[/96.8887], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
