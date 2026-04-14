// BTN vs sqz UTG+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz UTG+SB",
  description: "BTN called UTG, faces SB squeeze — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: "",
      call: "",
    },
    '2.25bb': {
      raise: "",
      call: "",
    },
    '2.5bb': {
      raise: {
        '100bb': "[13.04075107]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/13.04075107], [22.3128939]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/22.3128939], "
      },
      call: {
        '15bb': "[0.6957324699999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/0.6957324699999999], [3.4411310299999998]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.4411310299999998], [4.9746676]6h5h, 6d5d, 6s5s, 6c5c[/4.9746676], [6.665850399999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.665850399999999], [8.75402036]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/8.75402036], [8.83431652]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/8.83431652], [9.59493898]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/9.59493898], [12.23387108]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/12.23387108], [16.846216480000002]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/16.846216480000002], [30.821796759999998]AhQh, AdQd, AsQs, AcQc[/30.821796759999998], [37.78520513]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/37.78520513], ",
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
