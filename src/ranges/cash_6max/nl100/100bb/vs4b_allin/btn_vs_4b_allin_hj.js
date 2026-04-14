// BTN vs 4b allin HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs 4b allin HJ",
  description: "BTN faces all-in 4-bet from HJ — 6-max, 100bb",
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
        '100bb': "[42.0809]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/42.0809], [49.8179]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/49.8179], [96.321]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/96.321], [96.6122]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/96.6122], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs",
      },
    },
    '3bb': {
      call: {
        '100bb': "",
      },
    },
  }
}
