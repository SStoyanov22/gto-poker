// HJ vs sqz UTG+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+BTN",
  description: "HJ called UTG, faces BTN squeeze — 6-max, 100bb",
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
        '100bb': "[7.91939604]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.91939604], [15.724337550000001]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/15.724337550000001]"
      },
      call: {
        '11bb': "[1.3920622299999998]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.3920622299999998], [1.5938491]8h7h, 8d7d, 8s7s, 8c7c[/1.5938491], [2.36689125]Ah4h, Ad4d, As4s, Ac4c[/2.36689125], [3.50614322]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/3.50614322], [4.06848008]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/4.06848008], [5.51601204]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.51601204], [6.3409615299999995]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.3409615299999995], [8.1333589]7h6h, 7d6d, 7s6s, 7c6c[/8.1333589], [8.86556327]6h5h, 6d5d, 6s5s, 6c5c[/8.86556327], [9.28753185]5h4h, 5d4d, 5s4s, 5c4c[/9.28753185], [11.53070777]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/11.53070777], [16.5456068]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/16.5456068], [16.67921989]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/16.67921989], [27.05971962]AhQh, AdQd, AsQs, AcQc[/27.05971962], [28.411193439999998]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/28.411193439999998], [32.55347038]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/32.55347038]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
