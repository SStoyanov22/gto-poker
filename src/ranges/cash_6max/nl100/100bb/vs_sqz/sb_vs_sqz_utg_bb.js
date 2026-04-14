// SB vs sqz UTG+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz UTG+BB",
  description: "SB called UTG, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[8.00359262]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/8.00359262], [11.8554774]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/11.8554774], [13.16556108]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/13.16556108]"
      },
      call: {
        '12bb': "[0.5341203299999999]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/0.5341203299999999], [1.19191232]5h4h, 5d4d, 5s4s, 5c4c[/1.19191232], [1.30539349]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.30539349], [2.37206301]6h5h, 6d5d, 6s5s, 6c5c[/2.37206301], [4.68352612]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/4.68352612], [4.83501623]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/4.83501623], [5.03585499]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/5.03585499], [5.77648662]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/5.77648662], [5.84809897]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/5.84809897], [15.65896467]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/15.65896467], [28.746024799999997]AhQh, AdQd, AsQs, AcQc[/28.746024799999997]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
