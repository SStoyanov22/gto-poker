// SB vs sqz HJ+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz HJ+BB (RFI fold)",
  description: "SB cold called HJ, faces BB squeeze, HJ folded — 6-max, 100bb",
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
        '100bb': "[2.86253608]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/2.86253608], [3.01707162]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/3.01707162], [4.583776090000001]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/4.583776090000001], [18.54960258]AhQh, AdQd, AsQs, AcQc[/18.54960258], [33.93592598]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/33.93592598]"
      },
      call: {
        '12bb': "[0.5545494]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/0.5545494], [0.68928699]6h5h, 6d5d, 6s5s, 6c5c[/0.68928699], [0.80789669]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/0.80789669], [0.81598734]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/0.81598734], [1.0118556399999998]5h4h, 5d4d, 5s4s, 5c4c[/1.0118556399999998], [1.49813841]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.49813841], [2.09027969]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/2.09027969], [2.5867228499999997]AhJh, AdJd, AsJs, AcJc[/2.5867228499999997], [2.88386297]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/2.88386297], [5.32582472]KhQh, KdQd, KsQs, KcQc[/5.32582472], [8.09649742]AhQh, AdQd, AsQs, AcQc[/8.09649742]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
