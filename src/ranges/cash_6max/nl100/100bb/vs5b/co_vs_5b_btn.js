// CO vs 5b BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs 5b BTN",
  description: "CO faces 5-bet from BTN — 6-max, 100bb",
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
        '100bb': "[42.689603129999995]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/42.689603129999995], [88.0468]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/88.0468], [91.75619999999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/91.75619999999999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
