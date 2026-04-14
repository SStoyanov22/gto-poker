// SB vs sqz CO+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz CO+BB",
  description: "SB called CO, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[3.06276955]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/3.06276955], [10.21885701]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/10.21885701], [27.38439353]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/27.38439353]"
      },
      call: {
        '12bb': "[0.6056480399999999]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/0.6056480399999999], [2.48069603]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/2.48069603], [4.6818804300000005]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/4.6818804300000005], [9.04481135]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/9.04481135], [9.93293701]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/9.93293701], [11.501828699999999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/11.501828699999999], [12.561738380000001]KhJh, KdJd, KsJs, KcJc[/12.561738380000001], [14.29521962]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/14.29521962], [19.97168154]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/19.97168154], [19.97547576]KhQh, KdQd, KsQs, KcQc[/19.97547576], [30.406302619999998]AhJh, AdJd, AsJs, AcJc[/30.406302619999998]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
