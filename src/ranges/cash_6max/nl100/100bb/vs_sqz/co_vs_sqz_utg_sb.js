// CO vs sqz UTG+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz UTG+SB",
  description: "CO called UTG, faces SB squeeze — 6-max, 100bb",
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
        '100bb': "[4.36673531]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/4.36673531], [9.01784818]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/9.01784818], "
      },
      call: {
        '15bb': "[1.62879075]7h6h, 7d6d, 7s6s, 7c6c[/1.62879075], [4.601148]6h5h, 6d5d, 6s5s, 6c5c[/4.601148], [5.73246544]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.73246544], [5.82406766]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/5.82406766], [6.39497156]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.39497156], [6.60618502]5h4h, 5d4d, 5s4s, 5c4c[/6.60618502], [7.70480134]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/7.70480134], [8.021282020000001]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/8.021282020000001], [11.94289659]AhQh, AdQd, AsQs, AcQc[/11.94289659], [12.24743056]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/12.24743056], [12.88446118]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/12.88446118], [16.07393655]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/16.07393655], "
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
